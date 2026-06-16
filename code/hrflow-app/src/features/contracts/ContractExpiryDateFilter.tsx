import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Calendar, ChevronDown } from 'lucide-react'
import { formatContractDate, isSameCalendarDate, parseContractDate } from '../../lib/utils'
import { useContractStore } from '../../store/contractStore'

export function ContractExpiryDateFilter({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const { contracts } = useContractStore()
  const selectedDate = parseContractDate(value)
  const [open, setOpen] = useState(false)
  const [visibleMonth, setVisibleMonth] = useState(() => selectedDate ?? new Date(2026, 5, 1))
  const rootRef = useRef<HTMLDivElement>(null)
  const hasSelectedValue = value.trim().length > 0
  const monthStart = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1)
  const calendarStartOffset = (monthStart.getDay() + 6) % 7
  const calendarStart = new Date(monthStart.getFullYear(), monthStart.getMonth(), 1 - calendarStartOffset)
  const calendarDays = Array.from(
    { length: 42 },
    (_, index) => new Date(calendarStart.getFullYear(), calendarStart.getMonth(), calendarStart.getDate() + index),
  )
  const today = new Date()
  const expiryDates = useMemo(() => new Set(contracts.map((row) => row.end)), [contracts])

  useEffect(() => {
    const parsedDate = parseContractDate(value)
    if (parsedDate) {
      setVisibleMonth(new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1))
    }
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

  const shiftMonth = (offset: number) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1))
  }

  return (
    <div ref={rootRef} className={`relative ${open ? 'z-50' : 'z-0'} w-[165px] shrink-0`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`flex min-h-9 w-full items-center justify-between gap-2 border bg-white px-3 py-2 text-left text-[12px] shadow-sm ${
          hasSelectedValue
            ? 'rounded-2xl border-[#8EC5FF] font-semibold text-[#1447E6]'
            : 'rounded-lg border-slate-300 text-slate-700'
        } ${open ? 'border-blue-300 ring-4 ring-blue-100' : ''}`}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2">
          <Calendar size={14} className={hasSelectedValue ? 'shrink-0 text-[#1447E6]' : 'shrink-0 text-slate-400'} />
          <span className={`truncate ${hasSelectedValue ? '' : 'text-slate-400'}`}>{value || 'Ngày hết hạn'}</span>
        </span>
        <ChevronDown size={14} className={`shrink-0 text-slate-400 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open ? (
        <div className="absolute left-0 top-[42px] z-50 w-[286px] rounded-xl border border-slate-200 bg-white p-3 text-left shadow-xl ring-1 ring-slate-100">
          <div className="mb-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-blue-700"
              aria-label="Tháng trước"
            >
              <ArrowLeft size={14} />
            </button>
            <div>
              <div className="text-center text-[11px] font-bold uppercase tracking-wide text-slate-500">
                Chọn ngày hết hạn
              </div>
              <div className="mt-0.5 text-center text-[13px] font-semibold capitalize text-slate-900">
                {visibleMonth.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
              </div>
            </div>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-blue-700"
              aria-label="Tháng sau"
            >
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase text-slate-400">
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((weekday) => (
              <span key={weekday} className="py-1">
                {weekday}
              </span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {calendarDays.map((day) => {
              const formattedDay = formatContractDate(day)
              const isCurrentMonth = day.getMonth() === visibleMonth.getMonth()
              const isSelected = isSameCalendarDate(selectedDate, day)
              const isToday = isSameCalendarDate(today, day)
              const hasExpiry = expiryDates.has(formattedDay)

              return (
                <button
                  key={formattedDay}
                  type="button"
                  onClick={() => {
                    onChange(formattedDay)
                    setOpen(false)
                  }}
                  className={`relative grid size-8 place-items-center rounded-lg text-[12px] font-semibold transition ${
                    isSelected
                      ? 'bg-blue-700 text-white shadow-sm'
                      : isCurrentMonth
                        ? 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                        : 'text-slate-300 hover:bg-slate-50'
                  } ${isToday && !isSelected ? 'ring-1 ring-blue-200' : ''}`}
                  aria-label={`Chọn ngày ${formattedDay}`}
                >
                  {day.getDate()}
                  {hasExpiry && !isSelected ? (
                    <span className="absolute bottom-1 size-1 rounded-full bg-blue-500" />
                  ) : null}
                </button>
              )
            })}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2">
            <span className="text-[11px] text-slate-500">Chấm xanh: có hợp đồng hết hạn</span>
            {hasSelectedValue ? (
              <button
                type="button"
                onClick={() => {
                  onChange('')
                  setOpen(false)
                }}
                className="rounded-lg px-2 py-1.5 text-[12px] font-semibold text-slate-600 hover:bg-slate-50"
              >
                Xóa ngày
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
