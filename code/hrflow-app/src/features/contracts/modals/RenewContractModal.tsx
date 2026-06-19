import { useState } from 'react'
import { Calendar } from 'lucide-react'
import { ContractModalShell } from './ContractModalShell'
import { ContractField, ContractFileUpload, ContractInputBox, ContractSelectBox } from './modalParts'
import { StatusBadge } from '../StatusBadge'
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog'
import { useContractStore } from '../../../store/contractStore'
import { contractTypeOptions } from '../options'
import {
  deriveContractState,
  getContractDate,
  nextContractNumber,
  validateContractDecimal,
  validateContractPdf,
} from '../contracts.utils'
import type { ContractRow, ContractSuccess } from '../types'

type RenewErrors = Partial<Record<'type' | 'start' | 'end' | 'salary' | 'allowance' | 'file', string>>

export function RenewContractModal({
  contract,
  onClose,
  onSuccess,
}: {
  contract: ContractRow | null
  onClose: () => void
  onSuccess: (success: ContractSuccess) => void
}) {
  const { contracts, addContract, updateContract } = useContractStore()
  const [submitted, setSubmitted] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const [type, setType] = useState(contract?.type ?? 'Xác định thời hạn')
  const [start, setStart] = useState('01/07/2026')
  const [end, setEnd] = useState('30/06/2029')
  const [salary, setSalary] = useState('3.33')
  const [allowance, setAllowance] = useState('0.30')
  const [file, setFile] = useState<File | null>(null)

  const validateForm = (): RenewErrors => {
    const errors: RenewErrors = {}
    const startDate = getContractDate(start)
    const endDate = getContractDate(end)
    const oldEndDate = contract ? getContractDate(contract.end) : null

    if (!type.trim()) errors.type = 'Vui lòng chọn loại hợp đồng.'

    if (!start.trim()) errors.start = 'Vui lòng nhập ngày bắt đầu mới.'
    else if (!startDate) errors.start = 'Ngày bắt đầu phải đúng định dạng DD/MM/YYYY.'
    if (!end.trim()) errors.end = 'Vui lòng nhập ngày kết thúc mới.'
    else if (!endDate) errors.end = 'Ngày kết thúc phải đúng định dạng DD/MM/YYYY.'

    if (startDate && endDate && endDate <= startDate) errors.end = 'Ngày kết thúc phải sau ngày bắt đầu.'
    if (startDate && oldEndDate && startDate <= oldEndDate)
      errors.start = 'Ngày bắt đầu mới phải sau ngày hết hạn của hợp đồng cũ.'

    errors.salary = validateContractDecimal(salary, 'salary')
    errors.allowance = validateContractDecimal(allowance, 'allowance')
    errors.file = validateContractPdf(file)

    return Object.fromEntries(Object.entries(errors).filter(([, message]) => message)) as RenewErrors
  }

  const validationErrors = submitted ? validateForm() : {}

  const handleRenewClick = () => {
    setSubmitted(true)
    if (Object.keys(validateForm()).length === 0) setConfirmOpen(true)
  }

  const handleConfirm = () => {
    if (!contract) {
      setConfirmOpen(false)
      onClose()
      return
    }
    const newNumber = nextContractNumber(contracts, contract.number)
    const { status, remaining } = deriveContractState(end)
    addContract({
      ...contract,
      number: newNumber,
      type,
      start,
      end,
      status,
      remaining,
    })
    updateContract(contract.number, { status: 'Hết hiệu lực', remaining: 'Đã gia hạn' })
    setConfirmOpen(false)
    onSuccess({
      title: 'Gia hạn hợp đồng thành công',
      description: `Đã tạo hợp đồng gia hạn cho ${contract.name} và đánh dấu hợp đồng cũ ${contract.number} là đã gia hạn.`,
      highlightLabel: 'Số hợp đồng mới',
      highlightValue: newNumber,
    })
  }

  const oldFields: [string, string][] = [
    ['Số hợp đồng', contract?.number ?? '—'],
    ['Loại hợp đồng', contract?.type ?? '—'],
    ['Ngày bắt đầu', contract?.start ?? '—'],
    ['Ngày hết hạn', contract?.end ?? '—'],
  ]

  return (
    <ContractModalShell
      title="Gia hạn hợp đồng"
      subtitle="Tạo hợp đồng kế tiếp dựa trên thông tin hợp đồng hiện tại."
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
            onClick={handleRenewClick}
            className="rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-medium text-white hover:bg-blue-800"
          >
            Xác nhận gia hạn
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <section className="rounded-xl border border-slate-200 bg-slate-50 p-5 ring-1 ring-slate-100">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[15px] font-semibold text-slate-950">Hợp đồng cũ</h3>
              <p className="mt-1 text-[12px] leading-5 text-slate-500">
                Thông tin tham chiếu chỉ xem, dùng để đối chiếu trước khi tạo hợp đồng gia hạn.
              </p>
            </div>
            <span className="inline-flex h-6 items-center rounded-full border border-slate-200 bg-white px-2.5 text-[11px] font-semibold text-slate-500">
              Chỉ xem
            </span>
          </div>
          <div className="grid grid-cols-5 gap-3 text-[13px]">
            {oldFields.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                <div className="text-[11px] text-slate-500">{label}</div>
                <div className="mt-0.5 font-medium text-slate-900">{value}</div>
              </div>
            ))}
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
              <div className="text-[11px] text-slate-500">Trạng thái</div>
              <div className="mt-1">
                <StatusBadge value={contract?.status ?? 'Sắp hết hạn'} />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-[15px] font-semibold text-slate-950">Thông tin gia hạn</h3>
          <div className="grid grid-cols-2 gap-4">
            <ContractField label="Loại hợp đồng mới" required error={validationErrors.type}>
              <ContractSelectBox value={type} options={contractTypeOptions} label="Loại" onChange={setType} />
            </ContractField>
            <ContractField
              label="Ngày bắt đầu mới"
              required
              hint="Ngày bắt đầu mới được đề xuất dựa trên ngày hết hạn hợp đồng hiện tại."
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
            <ContractField label="Ngày kết thúc mới" required error={validationErrors.end}>
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
            <ContractField label="Hệ số lương" required error={validationErrors.salary}>
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
            <ContractField label="Upload file hợp đồng gia hạn" required>
              <ContractFileUpload
                label="Tải file gia hạn"
                file={file}
                onChange={setFile}
                error={validationErrors.file}
              />
            </ContractField>
          </div>
        </section>
      </div>

      {confirmOpen ? (
        <ConfirmDialog
          title="Xác nhận gia hạn hợp đồng"
          description={`Tạo hợp đồng gia hạn cho ${contract?.name ?? 'nhân sự'} và đánh dấu hợp đồng ${
            contract?.number ?? ''
          } là đã gia hạn?`}
          confirmLabel="Xác nhận gia hạn"
          onConfirm={handleConfirm}
          onCancel={() => setConfirmOpen(false)}
        />
      ) : null}
    </ContractModalShell>
  )
}
