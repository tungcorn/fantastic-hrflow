import { Bell, ChevronDown, CircleUserRound, LayoutList } from 'lucide-react'
import type { ContractRow } from '../../features/contracts/types'

export function AppHeader({
  label,
  notifications,
  notificationOpen,
  onToggleNotifications,
}: {
  label: string
  notifications: ContractRow[]
  notificationOpen: boolean
  onToggleNotifications: () => void
}) {
  return (
    <header className="flex h-[58px] items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-3 text-[13px] font-medium text-slate-800">
        <LayoutList size={16} />
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            type="button"
            onClick={onToggleNotifications}
            className="relative grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            aria-label="Thông báo hợp đồng"
          >
            <Bell size={17} />
            {notifications.length > 0 ? (
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-rose-500" />
            ) : null}
          </button>
          {notificationOpen ? (
            <div className="absolute right-0 top-11 z-50 w-80 rounded-xl border border-slate-200 bg-white p-2 text-left shadow-xl ring-1 ring-slate-100">
              <div className="px-2.5 py-2">
                <div className="text-[12px] font-bold uppercase tracking-wide text-slate-500">Thông báo</div>
                <div className="mt-0.5 text-[13px] font-semibold text-slate-950">
                  {notifications.length} hợp đồng cần xử lý
                </div>
              </div>
              <div className="space-y-1">
                {notifications.map((contract) => (
                  <div key={contract.number} className="rounded-lg px-2.5 py-2 hover:bg-blue-50">
                    <div className="text-[12px] font-semibold text-slate-900">{contract.name}</div>
                    <div className="mt-0.5 text-[11px] text-slate-500">
                      {contract.number} · {contract.status} · hết hạn {contract.end}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="h-8 w-px bg-slate-200" />
        <div className="grid size-9 place-items-center rounded-lg border border-slate-300 bg-white text-slate-700">
          <CircleUserRound size={19} />
        </div>
        <div>
          <div className="text-[12px] font-semibold text-slate-950">Trưởng phòng TCCB</div>
          <div className="text-[11px] text-slate-500">Nhân sự phòng TCCB</div>
        </div>
        <ChevronDown size={14} className="text-slate-500" />
      </div>
    </header>
  )
}
