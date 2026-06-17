import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import type { DropdownOption } from './types'

function optionToneClass() {
  return 'border-transparent bg-white text-slate-700 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950'
}

export function ExpandedSelect({
  label,
  value,
  options,
  width = 'w-[220px]',
  searchable,
  hideLabelWhenSelected,
  activeWhenSelected,
  onChange,
}: {
  label: string
  value: string
  options: DropdownOption[]
  width?: string
  searchable?: boolean
  hideLabelWhenSelected?: boolean
  activeWhenSelected?: boolean
  onChange?: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(value)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const hasSelectedValue = selected.trim().length > 0
  const activeTrigger = activeWhenSelected && hasSelectedValue
  const visibleOptions = searchable
    ? options.filter((option) =>
        `${option.label} ${option.description ?? ''}`.toLowerCase().includes(query.toLowerCase()),
      )
    : options

  useEffect(() => {
    setSelected(value)
  }, [value])

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: MouseEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className={`relative ${open ? 'z-50' : 'z-0'} ${width} shrink-0`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`flex min-h-9 w-full items-start justify-between gap-2 border bg-white px-3 py-2 text-left text-[12px] shadow-sm ${
          activeTrigger ? 'rounded-2xl border-[#8EC5FF] font-semibold text-[#1447E6]' : 'rounded-lg text-slate-700'
        } ${open ? 'border-blue-300 ring-4 ring-blue-100' : activeTrigger ? '' : 'border-slate-300'}`}
      >
        <span className="min-w-0 flex-1 whitespace-normal break-words leading-5">
          {!hideLabelWhenSelected || !hasSelectedValue ? <span className="text-slate-400">{label}: </span> : null}
          {selected}
        </span>
        <ChevronDown size={14} className={`mt-0.5 shrink-0 text-slate-400 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open ? (
        <div className="absolute left-0 top-[42px] z-50 w-full rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
          {searchable ? (
            <div className="mb-2 flex h-8 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2">
              <Search size={13} className="text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-[12px] placeholder:text-slate-400 focus:outline-none"
                placeholder="Gõ để tìm..."
              />
            </div>
          ) : null}
          <div className="space-y-1">
            {visibleOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => {
                  setSelected(option.label)
                  onChange?.(option.label)
                  setOpen(false)
                  setQuery('')
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-lg border px-2.5 py-2 text-left text-[12px] ${optionToneClass()}`}
              >
                <span className="min-w-0 flex-1 whitespace-normal break-words font-medium">{option.label}</span>
              </button>
            ))}
            {visibleOptions.length === 0 ? (
              <div className="rounded-lg bg-slate-50 px-2.5 py-2 text-[12px] text-slate-500">
                Không có kết quả phù hợp.
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
