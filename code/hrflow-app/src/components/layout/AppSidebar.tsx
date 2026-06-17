import tluLogoIcon from '../../assets/tlu-logo-icon.png'
import { sidebarItems, type View } from './navItems'

export function AppSidebar({ activeView, onViewChange }: { activeView: View; onViewChange: (view: View) => void }) {
  return (
    <aside className="w-[252px] shrink-0 border-r border-slate-200 bg-white">
      <div className="flex items-center gap-3 px-5 py-4">
        <div className="grid size-9 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-blue-100">
          <img src={tluLogoIcon} alt="TLU" className="size-8 object-contain" />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-slate-950">TLU HRMS</div>
          <div className="text-[11px] text-slate-500">Trường Đại học Thủy Lợi</div>
        </div>
      </div>

      <nav className="px-3 py-2">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onViewChange(item.view)}
            className={`mb-1 flex h-9 w-full items-center gap-2 rounded-lg px-3 text-left text-[13px] transition ${
              item.view === activeView ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            {item.icon}
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
