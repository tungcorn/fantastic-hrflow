import { useState } from 'react'
import { Calendar, CircleUserRound } from 'lucide-react'
import { ContractModalShell } from './ContractModalShell'
import { ContractField, ContractFileUpload, ContractInputBox, ContractSelectBox } from './modalParts'
import { StatusBadge } from '../StatusBadge'
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog'
import { useContractStore } from '../../../store/contractStore'
import { contractPersonnelOptions, contractTypeOptions, unitOptions } from '../options'
import { deriveContractState } from '../contracts.utils'

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

export function CreateContractModal({ onClose }: { onClose: () => void }) {
  const { addContract } = useContractStore()
  const [submitted, setSubmitted] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const [personnel, setPersonnel] = useState('CB2022-0118 · Trần Thị Bình')
  const [type, setType] = useState('Xác định thời hạn')
  const [number, setNumber] = useState('HĐLĐ-2026-0168')
  const [start, setStart] = useState('01/07/2026')
  const [end, setEnd] = useState('30/06/2029')
  const [unit, setUnit] = useState('Khoa Công nghệ thông tin')

  const isValid =
    personnel.trim().length > 0 &&
    type.trim().length > 0 &&
    number.trim().length > 0 &&
    start.trim().length > 0 &&
    end.trim().length > 0 &&
    unit.trim().length > 0

  const handleCreateClick = () => {
    setSubmitted(true)
    if (isValid) setConfirmOpen(true)
  }

  const handleConfirm = () => {
    const [code, ...nameParts] = personnel.split('·').map((part) => part.trim())
    const name = nameParts.join(' · ')
    const { status, remaining } = deriveContractState(end)
    addContract({ number, code, name, unit, type, start, end, status, remaining })
    setConfirmOpen(false)
    onClose()
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
                error={submitted && !personnel.trim() ? 'Vui lòng chọn nhân sự liên kết.' : undefined}
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
                error={submitted && !type.trim() ? 'Vui lòng chọn loại hợp đồng.' : undefined}
              >
                <ContractSelectBox value={type} options={contractTypeOptions} label="Loại" onChange={setType} />
              </ContractField>
              <ContractField
                label="Số hợp đồng"
                required
                error={submitted && !number.trim() ? 'Vui lòng nhập số hợp đồng.' : undefined}
              >
                <ContractInputBox value={number} onChange={setNumber} />
              </ContractField>
              <ContractField label="Ngày ký" required>
                <ContractInputBox value="30/05/2026" icon={<Calendar size={15} />} />
              </ContractField>
              <ContractField
                label="Ngày bắt đầu"
                required
                error={submitted && !start.trim() ? 'Vui lòng nhập ngày bắt đầu.' : undefined}
              >
                <ContractInputBox value={start} icon={<Calendar size={15} />} onChange={setStart} />
              </ContractField>
              <ContractField
                label="Ngày kết thúc"
                required
                error={submitted && !end.trim() ? 'Vui lòng nhập ngày kết thúc.' : undefined}
              >
                <ContractInputBox value={end} icon={<Calendar size={15} />} onChange={setEnd} />
              </ContractField>
              <ContractField label="Hệ số lương áp dụng" required>
                <ContractInputBox value="3.00" />
              </ContractField>
              <ContractField label="Phụ cấp">
                <ContractInputBox value="0.30 phụ cấp chức vụ" />
              </ContractField>
              <div className="col-span-2">
                <ContractField
                  label="Đơn vị công tác theo hợp đồng"
                  required
                  error={submitted && !unit.trim() ? 'Vui lòng chọn đơn vị công tác theo hợp đồng.' : undefined}
                >
                  <ContractSelectBox value={unit} options={unitOptions} searchable label="Đơn vị" onChange={setUnit} />
                </ContractField>
              </div>
              <div className="col-span-2">
                <ContractField label="Upload file hợp đồng PDF" required>
                  <ContractFileUpload label="Tải file hợp đồng PDF" />
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
