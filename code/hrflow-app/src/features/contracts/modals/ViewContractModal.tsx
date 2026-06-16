import { ContractModalShell } from './ContractModalShell'
import { StatusBadge } from '../StatusBadge'
import type { ContractRow } from '../types'

export function ViewContractModal({ contract, onClose }: { contract: ContractRow; onClose: () => void }) {
  const details: [string, string][] = [
    ['Số hợp đồng', contract.number],
    ['Mã cán bộ', contract.code],
    ['Họ tên', contract.name],
    ['Loại hợp đồng', contract.type],
    ['Ngày hiệu lực', contract.start],
    ['Ngày hết hạn', contract.end],
    ['Số ngày còn lại', contract.remaining],
  ]

  return (
    <ContractModalShell
      title="Chi tiết hợp đồng"
      subtitle="Xem thông tin hợp đồng lao động đã lưu trong hệ thống."
      maxWidth="max-w-[760px]"
      onClose={onClose}
      footer={
        <button
          onClick={onClose}
          className="rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-medium text-white hover:bg-blue-800"
        >
          Đóng
        </button>
      }
    >
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-[15px] font-semibold text-slate-950">{contract.number}</h3>
            <p className="mt-1 text-[12px] text-slate-500">
              {contract.name} · {contract.code}
            </p>
          </div>
          <StatusBadge value={contract.status} />
        </div>
        <dl className="grid grid-cols-2 gap-3 text-[13px]">
          {details.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <dt className="text-[11px] text-slate-500">{label}</dt>
              <dd className="mt-0.5 font-medium text-slate-900">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </ContractModalShell>
  )
}
