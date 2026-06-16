import type { ReactNode } from 'react'

export function SectionCard({
  title,
  description,
  icon,
  optional,
  children,
  action,
  headerClassName = '',
  sectionId,
}: {
  title: string
  description?: string
  icon: ReactNode
  optional?: boolean
  children: ReactNode
  action?: ReactNode
  headerClassName?: string
  sectionId?: string
}) {
  return (
    <section id={sectionId} className="rounded-xl border border-slate-200 bg-white">
      <header className={`flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3 ${headerClassName}`}>
        <div className="flex gap-2.5">
          <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700">{icon}</div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[14px] font-semibold text-slate-900">{title}</h3>
              {optional ? (
                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-500">
                  Không bắt buộc
                </span>
              ) : null}
            </div>
            {description ? <p className="mt-0.5 text-[12px] text-slate-500">{description}</p> : null}
          </div>
        </div>
        {action}
      </header>
      <div className="px-4 py-4">{children}</div>
    </section>
  )
}
