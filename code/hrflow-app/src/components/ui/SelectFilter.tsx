import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function SelectFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: MouseEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [open])

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`flex h-9 min-w-[142px] items-center justify-between rounded-lg border bg-white px-3 text-[12px] shadow-sm ${
          value ? 'border-[#8EC5FF] font-semibold text-[#1447E6]' : 'border-slate-300 text-slate-500'
        }`}
      >
        <span>{value || label}</span>
        <ChevronDown size={14} className={`text-slate-400 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open ? (
        <div className="absolute left-0 top-10 z-40 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-xl ring-1 ring-slate-100">
          <button
            type="button"
            onClick={() => {
              onChange('')
              setOpen(false)
            }}
            className="w-full rounded-lg px-2.5 py-2 text-left text-[12px] font-medium text-slate-500 hover:bg-slate-50"
          >
            Tất cả {label.toLowerCase()}
          </button>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option)
                setOpen(false)
              }}
              className="w-full rounded-lg px-2.5 py-2 text-left text-[12px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
