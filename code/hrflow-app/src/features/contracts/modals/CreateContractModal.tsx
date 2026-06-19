import { useState } from 'react'
import { Calendar, CircleUserRound } from 'lucide-react'
import { ContractModalShell } from './ContractModalShell'
import { ContractField, ContractFileUpload, ContractInputBox, ContractSelectBox } from './modalParts'
import { StatusBadge } from '../StatusBadge'
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog'
import { useContractStore } from '../../../store/contractStore'
import { contractPersonnelOptions, contractTypeOptions, unitOptions } from '../options'
import { deriveContractState } from '../contracts.utils'
import type { ContractSuccess } from '../types'
import { parseContractDate } from '../../../lib/utils'

type ValidationErrors = Partial<
  Record<'personnel' | 'type' | 'number' | 'signed' | 'start' | 'end' | 'salary' | 'allowance' | 'unit' | 'file', string>
>

const contractNumberPattern = /^HĐLĐ-\d{4}-\d{4}$/i
const decimalPattern = /^\d+(?:[.,]\d{1,2})?$/
const strictDatePattern = /^\d{2}\/\d{2}\/\d{4}$/
const MAX_PDF_SIZE = 10 * 1024 * 1024

function getDate(value: string) {
  return strictDatePattern.test(value.trim()) ? parseContractDate(value.trim()) : null
}

function PersonnelPreview({ personnel, unit }: { personnel: string; unit: string }) {
  const [code, ...nameParts] = personnel.split('·').map((part) => part.trim())
  const name = nameParts.join(' · ') || 'Chưa chọn nhân sự'
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-col items-center text-center">
        <div className="grid size-20 place-items-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
          <CircleUserRound size={38} />
        </div>
        <h3 className="mt-3 text-[16px] font-semibold text-slate-950">{name}</h3>
        <p className="font-mono text-[12px] font-semibold text-slate-500">{code}</p>
      </div>
      <dl className="mt-5 space-y-3 text-[13px]">
        <div>
          <dt className="text-[12px] text-slate-500">Đơn vị</dt>
          <dd className="font-medium text-slate-900">{unit || '—'}</dd>
        </div>
        <div>
          <dt className="text-[12px] text-slate-500">Chức vụ</dt>
          <dd className="font-medium text-slate-900">Giảng viên chính</dd>
        </div>
        <div>
          <dt className="text-[12px] text-slate-500">Hợp đồng hiện tại</dt>
          <dd className="mt-1">
            <StatusBadge value="Sắp hết hạn" />
          </dd>
        </div>
      </dl>
    </aside>
  )
}

export function CreateContractModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void
  onSuccess: (success: ContractSuccess) => void
}) {
  const { contracts, addContract } = useContractStore()
  const [submitted, setSubmitted] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const [personnel, setPersonnel] = useState('CB2022-0118 · Trần Thị Bình')
  const [type, setType] = useState('Xác định thời hạn')
  const [number, setNumber] = useState('HĐLĐ-2026-0168')
  const [signed, setSigned] = useState('30/05/2026')
  const [start, setStart] = useState('01/07/2026')
  const [end, setEnd] = useState('30/06/2029')
  const [salary, setSalary] = useState('3.00')
  const [allowance, setAllowance] = useState('0.30')
  const [unit, setUnit] = useState('Khoa Công nghệ thông tin')
  const [file, setFile] = useState<File | null>(null)

  const validateForm = (): ValidationErrors => {
    const errors: ValidationErrors = {}
    const normalizedNumber = number.trim().toUpperCase()
    const signedDate = getDate(signed)
    const startDate = getDate(start)
    const endDate = getDate(end)
    const personnelCode = personnel.split('·')[0]?.trim()

    if (!personnel.trim()) errors.personnel = 'Vui lòng chọn nhân sự liên kết.'
    if (!type.trim()) errors.type = 'Vui lòng chọn loại hợp đồng.'
    if (!number.trim()) errors.number = 'Vui lòng nhập số hợp đồng.'
    else if (!contractNumberPattern.test(normalizedNumber)) errors.number = 'Số hợp đồng phải theo mẫu HĐLĐ-YYYY-NNNN.'
    else if (contracts.some((contract) => contract.number.trim().toUpperCase() === normalizedNumber)) errors.number = 'Số hợp đồng đã tồn tại.'

    if (!signed.trim()) errors.signed = 'Vui lòng nhập ngày ký.'
    else if (!signedDate) errors.signed = 'Ngày ký phải đúng định dạng DD/MM/YYYY.'
    if (!start.trim()) errors.start = 'Vui lòng nhập ngày bắt đầu.'
    else if (!startDate) errors.start = 'Ngày bắt đầu phải đúng định dạng DD/MM/YYYY.'
    if (!end.trim()) errors.end = 'Vui lòng nhập ngày kết thúc.'
    else if (!endDate) errors.end = 'Ngày kết thúc phải đúng định dạng DD/MM/YYYY.'

    if (signedDate && startDate && signedDate > startDate) errors.signed = 'Ngày ký không được sau ngày bắt đầu.'
    if (startDate && endDate && endDate <= startDate) errors.end = 'Ngày kết thúc phải sau ngày bắt đầu.'
    if (personnelCode && startDate && endDate) {
      const overlaps = contracts.some((contract) => {
        if (contract.code !== personnelCode) return false
        const existingStart = getDate(contract.start)
        const existingEnd = getDate(contract.end)
        return Boolean(existingStart && existingEnd && startDate <= existingEnd && endDate >= existingStart)
      })
      if (overlaps) errors.start = 'Thời gian hợp đồng bị chồng lấn với hợp đồng đã có của nhân sự.'
    }

    const validateDecimal = (value: string, required: boolean) => {
      const normalized = value.trim().replace(',', '.')
      if (!normalized) return required ? 'Vui lòng nhập giá trị.' : undefined
      if (!decimalPattern.test(value.trim()) || Number(normalized) < 0 || (required && Number(normalized) === 0)) {
        return required ? 'Hệ số lương phải là số dương, tối đa 2 chữ số thập phân.' : 'Phụ cấp phải là số không âm, tối đa 2 chữ số thập phân.'
      }
      if (Number(normalized) > 20) return 'Giá trị không được lớn hơn 20.'
      return undefined
    }
    errors.salary = validateDecimal(salary, true)
    errors.allowance = validateDecimal(allowance, false)
    if (!unit.trim()) errors.unit = 'Vui lòng chọn đơn vị công tác theo hợp đồng.'
    if (!file) errors.file = 'Vui lòng tải file hợp đồng PDF.'
    else if (
      !file.name.toLowerCase().endsWith('.pdf') ||
      (file.type.length > 0 && file.type !== 'application/pdf')
    ) {
      errors.file = 'Tệp hợp đồng phải có định dạng PDF.'
    }
    else if (file.size > MAX_PDF_SIZE) errors.file = 'Tệp PDF không được vượt quá 10MB.'

    return Object.fromEntries(Object.entries(errors).filter(([, message]) => message)) as ValidationErrors
  }

  const validationErrors = submitted ? validateForm() : {}

  const handleCreateClick = () => {
    setSubmitted(true)
    if (Object.keys(validateForm()).length === 0) setConfirmOpen(true)
  }

  const handleConfirm = () => {
    const [code, ...nameParts] = personnel.split('·').map((part) => part.trim())
    const name = nameParts.join(' · ')
    const cleanNumber = number.trim().toUpperCase()
    const { status, remaining } = deriveContractState(end.trim())
    addContract({ number: cleanNumber, code, name, unit, type, start: start.trim(), end: end.trim(), status, remaining })
    setConfirmOpen(false)
    onSuccess({
      title: 'Tạo hợp đồng thành công',
      description: `Hợp đồng cho ${name} đã được tạo và thêm vào danh sách hợp đồng lao động.`,
      highlightLabel: 'Số hợp đồng',
      highlightValue: cleanNumber,
    })
  }

  return (
    <ContractModalShell
      title="Tạo hợp đồng"
      subtitle="Nhập thông tin hợp đồng mới và kiểm tra điều kiện hiệu lực trước khi tạo."
      onClose={onClose}
      footer={
        <>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
          >
            Hủy
          </button>
          <button
            onClick={handleCreateClick}
            className="rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-medium text-white hover:bg-blue-800"
          >
            Tạo hợp đồng
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-[minmax(0,1fr)_360px] gap-6">
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="grid grid-cols-2 gap-4">
              <ContractField
                label="Nhân sự liên kết"
                required
                error={validationErrors.personnel}
              >
                <ContractSelectBox
                  value={personnel}
                  options={contractPersonnelOptions}
                  searchable
                  label="Nhân sự"
                  onChange={setPersonnel}
                />
              </ContractField>
              <ContractField
                label="Loại hợp đồng"
                required
                error={validationErrors.type}
              >
                <ContractSelectBox value={type} options={contractTypeOptions} label="Loại" onChange={setType} />
              </ContractField>
              <ContractField
                label="Số hợp đồng"
                required
                error={validationErrors.number}
              >
                <ContractInputBox
                  value={number}
                  onChange={setNumber}
                  maxLength={16}
                  invalid={!!validationErrors.number}
                />
              </ContractField>
              <ContractField label="Ngày ký" required error={validationErrors.signed}>
                <ContractInputBox
                  value={signed}
                  icon={<Calendar size={15} />}
                  onChange={setSigned}
                  placeholder="DD/MM/YYYY"
                  maxLength={10}
                  inputMode="numeric"
                  invalid={!!validationErrors.signed}
                />
              </ContractField>
              <ContractField
                label="Ngày bắt đầu"
                required
                error={validationErrors.start}
              >
                <ContractInputBox
                  value={start}
                  icon={<Calendar size={15} />}
                  onChange={setStart}
                  placeholder="DD/MM/YYYY"
                  maxLength={10}
                  inputMode="numeric"
                  invalid={!!validationErrors.start}
                />
              </ContractField>
              <ContractField
                label="Ngày kết thúc"
                required
                error={validationErrors.end}
              >
                <ContractInputBox
                  value={end}
                  icon={<Calendar size={15} />}
                  onChange={setEnd}
                  placeholder="DD/MM/YYYY"
                  maxLength={10}
                  inputMode="numeric"
                  invalid={!!validationErrors.end}
                />
              </ContractField>
              <ContractField label="Hệ số lương áp dụng" required error={validationErrors.salary}>
                <ContractInputBox
                  value={salary}
                  onChange={setSalary}
                  inputMode="decimal"
                  maxLength={5}
                  invalid={!!validationErrors.salary}
                />
              </ContractField>
              <ContractField
                label="Phụ cấp"
                hint="Nhập hệ số phụ cấp (ví dụ: 0.30)."
                error={validationErrors.allowance}
              >
                <ContractInputBox
                  value={allowance}
                  onChange={setAllowance}
                  inputMode="decimal"
                  maxLength={5}
                  invalid={!!validationErrors.allowance}
                />
              </ContractField>
              <div className="col-span-2">
                <ContractField
                  label="Đơn vị công tác theo hợp đồng"
                  required
                  error={validationErrors.unit}
                >
                  <ContractSelectBox value={unit} options={unitOptions} searchable label="Đơn vị" onChange={setUnit} />
                </ContractField>
              </div>
              <div className="col-span-2">
                <ContractField label="Upload file hợp đồng PDF" required>
                  <ContractFileUpload
                    label="Tải file hợp đồng PDF"
                    file={file}
                    onChange={setFile}
                    error={validationErrors.file}
                  />
                </ContractField>
              </div>
            </div>
          </section>
          <PersonnelPreview personnel={personnel} unit={unit} />
        </div>
      </div>

      {confirmOpen ? (
        <ConfirmDialog
          title="Xác nhận tạo hợp đồng"
          description={`Tạo hợp đồng ${number} cho nhân sự đã chọn? Hợp đồng sẽ được thêm vào danh sách.`}
          confirmLabel="Xác nhận tạo"
          onConfirm={handleConfirm}
          onCancel={() => setConfirmOpen(false)}
        />
      ) : null}
    </ContractModalShell>
  )
}
