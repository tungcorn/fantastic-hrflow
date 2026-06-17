import type { ReactNode } from 'react'
import { X } from 'lucide-react'

export function ContractModalShell({
  title,
  subtitle,
  children,
  footer,
  danger,
  maxWidth = 'max-w-[1440px]',
  onClose,
}: {
  title: string
  subtitle?: string
  children: ReactNode
  footer: ReactNode
  danger?: boolean
  maxWidth?: string
  onClose: () => void
}) {
  return (
    <div className="absolute inset-0 flex items-start justify-center bg-slate-950/10 p-8">
      <section
        className={`flex max-h-[calc(100vh-122px)] w-full ${maxWidth} flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200`}
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-8 py-4">
          <div>
            <h2 className={`text-[18px] font-semibold ${danger ? 'text-rose-700' : 'text-slate-950'}`}>{title}</h2>
            {subtitle ? <p className="mt-0.5 text-[12px] text-slate-500">{subtitle}</p> : null}
          </div>
          <button onClick={onClose} className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50/60 p-6">{children}</div>
        <footer className="flex items-center justify-end gap-2 border-t border-slate-200 bg-white px-8 py-3.5">
          {footer}
        </footer>
      </section>
    </div>
  )
}
