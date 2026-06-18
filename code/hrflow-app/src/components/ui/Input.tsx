import type { ReactNode } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import type { FieldState } from './types'

export function Input({
  value,
  placeholder,
  icon,
  type = 'text',
  state = 'default',
  readOnly,
  onChange,
}: {
  value?: string
  placeholder?: string
  icon?: ReactNode
  type?: string
  state?: FieldState
  readOnly?: boolean
  onChange?: (value: string) => void
}) {
  const ring =
    state === 'error'
      ? 'border-red-300 focus-within:ring-red-200'
      : state === 'success'
        ? 'border-emerald-300 focus-within:ring-emerald-200'
        : 'border-slate-200 focus-within:ring-blue-200'
  return (
    <div
      className={`flex h-9 items-center gap-2 rounded-lg border bg-white px-2.5 transition focus-within:ring-4 ${ring}`}
    >
      {icon ? <span className="text-slate-400">{icon}</span> : null}
      <input
        type={type}
        defaultValue={onChange ? undefined : value}
        value={onChange ? (value ?? '') : undefined}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={(event) => onChange?.(event.target.value)}
        className="min-w-0 flex-1 bg-transparent text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
      />
      {state === 'success' ? <CheckCircle2 size={16} className="text-emerald-500" /> : null}
      {state === 'error' ? <AlertCircle size={16} className="text-red-500" /> : null}
    </div>
  )
}
