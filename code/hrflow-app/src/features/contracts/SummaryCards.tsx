import { AlertCircle, Clock3, FileText, RotateCcw } from 'lucide-react'

const summaryCards = [
  { label: 'Hợp đồng còn hiệu lực', value: '328', tone: 'emerald', icon: <FileText size={18} /> },
  { label: 'Sắp hết hạn trong 30 ngày', value: '12', tone: 'amber', icon: <Clock3 size={18} /> },
  { label: 'Chờ gia hạn', value: '7', tone: 'orange', icon: <RotateCcw size={18} /> },
  { label: 'Đã hết hiệu lực', value: '45', tone: 'slate', icon: <AlertCircle size={18} /> },
]

export function SummaryCards() {
  const toneMap: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    amber: 'bg-amber-50 text-amber-700 ring-amber-100',
    orange: 'bg-orange-50 text-orange-700 ring-orange-100',
    slate: 'bg-slate-100 text-slate-600 ring-slate-200',
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {summaryCards.map((card) => (
        <section key={card.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[12px] font-medium text-slate-500">{card.label}</p>
              <div className="mt-2 text-[26px] font-semibold leading-none text-slate-950">{card.value}</div>
            </div>
            <div className={`grid size-10 place-items-center rounded-xl ring-1 ${toneMap[card.tone]}`}>{card.icon}</div>
          </div>
        </section>
      ))}
    </div>
  )
}
