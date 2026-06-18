import { ChevronDown, FileText, Plus } from 'lucide-react'

export function AddPersonnelButton({
  withMenu,
  menuOpen,
  onToggleMenu,
  onManualAdd,
  onExcelImport,
}: {
  withMenu?: boolean
  menuOpen?: boolean
  onToggleMenu?: () => void
  onManualAdd?: () => void
  onExcelImport?: () => void
}) {
  return (
    <div className="relative flex items-center justify-end">
      <button
        type="button"
        onClick={withMenu ? onToggleMenu : onManualAdd}
        className="flex h-9 items-center gap-2 rounded-lg bg-blue-700 px-3.5 text-[12px] font-semibold text-white shadow-sm hover:bg-blue-800"
      >
        <Plus size={14} />
        Thêm hồ sơ nhân sự
        {withMenu ? <ChevronDown size={14} className={menuOpen ? 'rotate-180' : ''} /> : null}
      </button>

      {withMenu && menuOpen ? (
        <div className="absolute right-0 top-10 z-30 w-[218px] overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 text-left shadow-xl">
          <button
            type="button"
            onClick={onManualAdd}
            className="flex w-full items-start gap-3 px-3.5 py-2.5 text-left hover:bg-blue-50"
          >
            <span className="mt-0.5 grid size-7 place-items-center rounded-lg bg-blue-50 text-blue-700">
              <Plus size={14} />
            </span>
            <span>
              <span className="block text-[12.5px] font-semibold text-slate-900">Thêm thủ công</span>
              <span className="block text-[11px] text-slate-500">Nhập và hoàn thiện từng hồ sơ</span>
            </span>
          </button>
          <button
            type="button"
            onClick={onExcelImport}
            className="flex w-full items-start gap-3 px-3.5 py-2.5 text-left hover:bg-blue-50"
          >
            <span className="mt-0.5 grid size-7 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
              <FileText size={14} />
            </span>
            <span>
              <span className="block text-[12.5px] font-semibold text-slate-900">Nhập từ Excel</span>
              <span className="block text-[11px] text-slate-500">Tạo nhiều hồ sơ từ file mẫu</span>
            </span>
          </button>
        </div>
      ) : null}
    </div>
  )
}
