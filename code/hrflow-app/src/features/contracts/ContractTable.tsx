import { useState } from 'react'
import { Eye, MoreHorizontal, RotateCcw, X } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import type { ContractFrame, ContractRow } from './types'

export function ContractTable({
  rows,
  compact = false,
  onOpenFrame,
  onViewContract,
}: {
  rows: ContractRow[]
  compact?: boolean
  onOpenFrame?: (frame: ContractFrame, contract?: ContractRow) => void
  onViewContract?: (contract: ContractRow) => void
}) {
  const [openActionFor, setOpenActionFor] = useState<string | null>(null)

  return (
    <section className="relative z-0 rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-[1.15fr_0.8fr_1.1fr_1.15fr_0.85fr_0.85fr_0.95fr_0.8fr_1fr] rounded-t-xl bg-blue-100 px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-800">
        <span>Số hợp đồng</span>
        <span>Mã cán bộ</span>
        <span>Họ tên</span>
        <span>Loại hợp đồng</span>
        <span>Ngày hiệu lực</span>
        <span>Ngày hết hạn</span>
        <span>Trạng thái</span>
        <span className="text-center">Số ngày còn lại</span>
        <span className="text-center">Thao tác</span>
      </div>

      {rows.map((row) => {
        const isActionMenuOpen = openActionFor === row.number

        return (
          <div
            key={row.number}
            className={`relative grid min-h-[58px] grid-cols-[1.15fr_0.8fr_1.1fr_1.15fr_0.85fr_0.85fr_0.95fr_0.8fr_1fr] items-center border-b border-slate-100 px-4 text-[12px] text-slate-800 last:border-0 ${
              isActionMenuOpen ? 'z-20 bg-white' : ''
            }`}
          >
            <span className="font-mono text-[11px] font-semibold text-slate-700">{row.number}</span>
            <span className="font-mono text-[11px] font-semibold text-slate-600">{row.code}</span>
            <span className="font-medium text-slate-900">{row.name}</span>
            <span>{row.type}</span>
            <span>{row.start}</span>
            <span>{row.end}</span>
            <span>
              <StatusBadge value={row.status} />
            </span>
            <span
              className={`text-center ${row.remaining === 'Quá hạn' ? 'font-medium text-rose-600' : 'text-slate-600'}`}
            >
              {row.remaining}
            </span>
            <div className="flex items-center justify-center gap-1.5">
              <button
                onClick={() => onViewContract?.(row)}
                className="inline-flex h-7 items-center gap-1 rounded-lg px-2 text-[11px] font-medium text-blue-700 hover:bg-blue-50"
              >
                <Eye size={13} /> Xem
              </button>
              {!compact ? (
                <div className="relative">
                  <button
                    aria-label={`Mở menu thao tác cho ${row.number}`}
                    onClick={() => setOpenActionFor(isActionMenuOpen ? null : row.number)}
                    className={`grid size-7 place-items-center rounded-lg border text-slate-600 transition ${
                      isActionMenuOpen
                        ? 'border-blue-200 bg-blue-50 text-blue-700'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <MoreHorizontal size={15} />
                  </button>
                  {isActionMenuOpen ? (
                    <div className="absolute right-0 top-8 z-30 w-52 rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-xl ring-1 ring-slate-100">
                      <button
                        onClick={() => {
                          setOpenActionFor(null)
                          onOpenFrame?.('renew', row)
                        }}
                        className="flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] text-slate-700 hover:bg-amber-50 hover:text-amber-800"
                      >
                        <RotateCcw size={14} className="mt-0.5 shrink-0" />
                        <span>
                          <span className="block font-semibold">Gia hạn</span>
                          <span className="block text-[11px] text-slate-500">Tạo hợp đồng kế tiếp</span>
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setOpenActionFor(null)
                          onOpenFrame?.('terminate', row)
                        }}
                        className="flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] text-rose-700 hover:bg-rose-50"
                      >
                        <X size={14} className="mt-0.5 shrink-0" />
                        <span>
                          <span className="block font-semibold">Chấm dứt</span>
                          <span className="block text-[11px] text-rose-500">Yêu cầu xác nhận riêng</span>
                        </span>
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        )
      })}
      {rows.length === 0 ? (
        <div className="px-4 py-8 text-center text-[13px] text-slate-500">
          Không có hợp đồng phù hợp với bộ lọc hiện tại.
        </div>
      ) : null}
    </section>
  )
}
