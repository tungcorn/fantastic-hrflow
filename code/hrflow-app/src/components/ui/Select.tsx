import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FieldState } from './types'

export function Select({
  value,
  state = 'default',
  options,
  placeholder,
  onChange,
}: {
  value: string
  state?: FieldState
  options?: string[]
  placeholder?: string
  onChange?: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  const rootRef = useRef<HTMLDivElement>(null)
  const selectable = !!options?.length
  const baseRing =
    state === 'error'
      ? 'border-red-300'
      : state === 'success'
        ? 'border-emerald-300'
        : 'border-slate-200'
  const openRing =
    state === 'error'
      ? 'border-red-300 ring-4 ring-red-100'
      : state === 'success'
        ? 'border-emerald-300 ring-4 ring-emerald-100'
        : 'border-blue-300 ring-4 ring-blue-100'
  const currentValue = onChange ? value : localValue
  const selectableOptions = options ? Array.from(new Set(currentValue ? [currentValue, ...options] : options)) : []
  const displayValue = currentValue || placeholder || ''
  const mutedText = !currentValue

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: MouseEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className={`relative ${open ? 'z-50' : 'z-0'}`}>
      <button
        type="button"
        onClick={selectable ? () => setOpen((current) => !current) : undefined}
        className={`relative flex h-10 w-full items-center justify-between gap-2 rounded-[18px] border bg-white py-0 pl-3 pr-2.5 text-left text-[13px] font-normal leading-5 shadow-sm shadow-slate-200/70 transition hover:border-blue-200 focus:outline-none focus:ring-4 ${
          open ? openRing : baseRing
        } ${mutedText ? 'text-slate-400' : 'text-slate-900'} ${selectable ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <span className="min-w-0 flex-1 truncate">{displayValue}</span>
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">
          <ChevronDown size={14} className={`transition ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>

      {selectable && open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-[80] max-h-64 overflow-y-auto rounded-[18px] border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-300/40">
          {selectableOptions.map((option) => {
            const selected = option === currentValue
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  if (onChange) {
                    onChange(option)
                  } else {
                    setLocalValue(option)
                  }
                  setOpen(false)
                }}
                className={`flex min-h-8 w-full items-center rounded-[14px] px-3 text-left text-[13px] font-normal leading-5 transition ${
                  selected ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="truncate">{option}</span>
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
