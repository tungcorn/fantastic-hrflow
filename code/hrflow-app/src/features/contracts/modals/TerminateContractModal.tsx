import { useState } from 'react'
import { Calendar } from 'lucide-react'
import { ContractModalShell } from './ContractModalShell'
import { ContractField, ContractFileUpload, ContractInputBox, ContractSelectBox } from './modalParts'
import { StatusBadge } from '../StatusBadge'
import { reasonOptions } from '../options'

export function TerminateContractModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)

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
            onClick={() => setSubmitted(true)}
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
              <div className="mt-0.5 font-mono text-[13px] font-semibold text-slate-900">HĐLĐ-2026-0142</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <div className="text-[11px] text-slate-500">Nhân sự</div>
              <div className="mt-0.5 text-[13px] font-semibold text-slate-900">Nguyễn Văn An</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <div className="text-[11px] text-slate-500">Trạng thái hiện tại</div>
              <div className="mt-1">
                <StatusBadge value="Còn hiệu lực" />
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
              error={submitted ? 'Ngày chấm dứt phải nằm trong thời gian hiệu lực của hợp đồng.' : undefined}
            >
              <ContractInputBox value="30/06/2026" icon={<Calendar size={15} />} />
            </ContractField>
            <ContractField label="Lý do chấm dứt" required error={submitted ? 'Vui lòng chọn lý do chấm dứt.' : undefined}>
              <ContractSelectBox value="Theo quyết định của Nhà trường" options={reasonOptions} label="Lý do" />
            </ContractField>
            <div className="col-span-2">
              <ContractField label="Tài liệu xác nhận chấm dứt" required>
                <ContractFileUpload
                  label="Tải quyết định / biên bản xác nhận"
                  error={submitted ? 'Vui lòng tải tài liệu xác nhận chấm dứt.' : undefined}
                />
              </ContractField>
            </div>
          </div>
        </section>
      </div>
    </ContractModalShell>
  )
}
