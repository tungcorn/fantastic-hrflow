import type { ContractStatus } from './types'

export function StatusBadge({ value }: { value: ContractStatus | string }) {
  const tone =
    value === 'Đã thôi việc' || value === 'Hết hiệu lực'
      ? 'bg-rose-50 text-rose-600'
      : value === 'Chờ gia hạn'
        ? 'bg-amber-50 text-amber-700'
        : value === 'Sắp hết hạn'
          ? 'bg-orange-50 text-orange-600'
          : 'bg-emerald-50 text-emerald-600'

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${tone}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {value}
    </span>
  )
}
