import type { ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'

export function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-1">
      <label className="flex items-center gap-1 text-[12px] font-medium text-slate-700">
        {label}
        {required ? <span className="text-red-600">*</span> : null}
      </label>
      {children}
      {error ? (
        <div className="flex items-start gap-1.5 text-[11.5px] text-red-600">
          <AlertCircle size={12} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : hint ? (
        <div className="text-[11.5px] text-slate-500">{hint}</div>
      ) : null}
    </div>
  )
}
