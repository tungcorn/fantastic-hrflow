import type { ReactNode } from 'react'
import { Upload } from 'lucide-react'
import { ExpandedSelect } from '../ExpandedSelect'
import type { DropdownOption } from '../types'

export function ContractField({
  label,
  required,
  children,
  hint,
  error,
}: {
  label: string
  required?: boolean
  children: ReactNode
  hint?: string
  error?: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex flex-wrap items-start gap-x-1 gap-y-0.5 text-[13px] font-medium leading-5 text-slate-700">
        {label}
        {required ? <span className="text-red-600">*</span> : null}
      </label>
      {children}
      {error ? (
        <p className="text-[12px] font-medium leading-5 text-rose-600">{error}</p>
      ) : hint ? (
        <div className="text-[12px] text-slate-500">{hint}</div>
      ) : null}
    </div>
  )
}

export function ContractInputBox({
  value,
  placeholder,
  icon,
  onChange,
}: {
  value?: string
  placeholder?: string
  icon?: ReactNode
  onChange?: (value: string) => void
}) {
  return (
    <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 transition focus-within:ring-4 focus-within:ring-blue-100">
      {icon ? <span className="text-slate-400">{icon}</span> : null}
      <input
        defaultValue={onChange ? undefined : value}
        value={onChange ? (value ?? '') : undefined}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
      />
    </div>
  )
}

export function ContractSelectBox({
  value,
  options,
  searchable,
  label = 'Đã chọn',
  onChange,
}: {
  value: string
  options: DropdownOption[]
  searchable?: boolean
  label?: string
  onChange?: (value: string) => void
}) {
  return (
    <ExpandedSelect
      label={label}
      value={value}
      options={options}
      searchable={searchable}
      width="w-full"
      hideLabelWhenSelected
      onChange={onChange}
    />
  )
}

export function ContractFileUpload({ label, error }: { label: string; error?: string }) {
  return (
    <div className={`rounded-lg border border-dashed p-3 ${error ? 'border-rose-200 bg-white' : 'border-blue-200 bg-blue-50/50'}`}>
      <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 text-[13px] font-medium text-blue-700 hover:bg-blue-50">
        <Upload size={15} /> {label}
      </button>
      <p className="mt-2 text-[12px] text-slate-500">Chấp nhận PDF, tối đa 10MB.</p>
      {error ? <p className="mt-1.5 text-[12px] font-medium leading-5 text-rose-600">{error}</p> : null}
    </div>
  )
}
