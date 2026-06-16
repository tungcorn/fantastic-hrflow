import { useState } from 'react'
import { Calendar } from 'lucide-react'
import { ContractModalShell } from './ContractModalShell'
import { ContractField, ContractFileUpload, ContractInputBox, ContractSelectBox } from './modalParts'
import { StatusBadge } from '../StatusBadge'
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog'
import { useContractStore } from '../../../store/contractStore'
import { reasonOptions } from '../options'
import type { ContractRow } from '../types'

export function TerminateContractModal({ contract, onClose }: { contract: ContractRow | null; onClose: () => void }) {
  const { updateContract } = useContractStore()
  const [submitted, setSubmitted] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const [endDate, setEndDate] = useState('30/06/2026')
  const [reason, setReason] = useState('Theo quyết định của Nhà trường')

  const isValid = endDate.trim().length > 0 && reason.trim().length > 0

  const handleTerminateClick = () => {
    setSubmitted(true)
    if (isValid) setConfirmOpen(true)
  }

  const handleConfirm = () => {
    if (contract) {
      updateContract(contract.number, { status: 'Hết hiệu lực', remaining: 'Đã chấm dứt', end: endDate })
    }
    setConfirmOpen(false)
    onClose()
  }

  return (
    <ContractModalShell
      title="Chấm dứt hợp đồng trước hạn"
      danger
      maxWidth="max-w-[940px]"
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
            onClick={handleTerminateClick}
            className="rounded-lg bg-rose-600 px-4 py-2 text-[13px] font-medium text-white hover:bg-rose-700"
          >
            Xác nhận chấm dứt
          </button>
        </>
      }
    >
      <div className="mx-auto max-w-[860px] space-y-4">
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-slate-950">Thông tin hợp đồng bị chấm dứt</h3>
            <span className="inline-flex h-6 items-center rounded-full bg-rose-50 px-2.5 text-[11px] font-semibold text-rose-700">
              Cần kiểm tra kỹ
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-[13px]">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <div className="text-[11px] text-slate-500">Số hợp đồng</div>
              <div className="mt-0.5 font-mono text-[13px] font-semibold text-slate-900">{contract?.number ?? '—'}</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <div className="text-[11px] text-slate-500">Nhân sự</div>
              <div className="mt-0.5 text-[13px] font-semibold text-slate-900">{contract?.name ?? '—'}</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <div className="text-[11px] text-slate-500">Trạng thái hiện tại</div>
              <div className="mt-1">
                <StatusBadge value={contract?.status ?? 'Còn hiệu lực'} />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-rose-200 bg-white p-5">
          <h3 className="mb-4 text-[15px] font-semibold text-slate-950">Xác nhận chấm dứt</h3>
          <div className="grid grid-cols-2 gap-4">
            <ContractField
              label="Ngày chấm dứt hiệu lực"
              required
              error={submitted && !endDate.trim() ? 'Vui lòng nhập ngày chấm dứt.' : undefined}
            >
              <ContractInputBox value={endDate} icon={<Calendar size={15} />} onChange={setEndDate} />
            </ContractField>
            <ContractField
              label="Lý do chấm dứt"
              required
              error={submitted && !reason.trim() ? 'Vui lòng chọn lý do chấm dứt.' : undefined}
            >
              <ContractSelectBox value={reason} options={reasonOptions} label="Lý do" onChange={setReason} />
            </ContractField>
            <div className="col-span-2">
              <ContractField label="Tài liệu xác nhận chấm dứt" required>
                <ContractFileUpload label="Tải quyết định / biên bản xác nhận" />
              </ContractField>
            </div>
          </div>
        </section>
      </div>

      {confirmOpen ? (
        <ConfirmDialog
          title="Xác nhận chấm dứt hợp đồng"
          danger
          description={`Chấm dứt hợp đồng ${contract?.number ?? ''} của ${
            contract?.name ?? 'nhân sự'
          }? Hành động này sẽ chuyển hợp đồng sang trạng thái "Hết hiệu lực".`}
          confirmLabel="Xác nhận chấm dứt"
          onConfirm={handleConfirm}
          onCancel={() => setConfirmOpen(false)}
        />
      ) : null}
    </ContractModalShell>
  )
}
