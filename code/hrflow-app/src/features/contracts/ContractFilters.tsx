import { Search } from 'lucide-react'
import { ExpandedSelect } from './ExpandedSelect'
import { ContractExpiryDateFilter } from './ContractExpiryDateFilter'
import { contractTypeOptions, statusOptions, unitOptions } from './options'
import type { ContractFiltersState } from './types'

export function ContractFilters({
  filters,
  onChange,
  onClear,
}: {
  filters: ContractFiltersState
  onChange: (filters: ContractFiltersState) => void
  onClear: () => void
}) {
  const hasActiveFilters = Object.values(filters).some((item) => item.trim().length > 0)
  const updateFilter = (key: keyof ContractFiltersState, value: string) => onChange({ ...filters, [key]: value })

  return (
    <section className="relative z-20">
      <div className="flex flex-wrap items-center gap-2">
        <div
          className={`flex h-9 w-[310px] items-center gap-2 border bg-white px-3 shadow-sm ${
            filters.keyword.trim().length > 0 ? 'rounded-2xl border-[#8EC5FF]' : 'rounded-lg border-slate-300'
          }`}
        >
          <Search size={14} className="text-slate-400" />
          <input
            value={filters.keyword}
            onChange={(event) => updateFilter('keyword', event.target.value)}
            className={`min-w-0 flex-1 bg-transparent text-[12px] placeholder:text-slate-400 focus:outline-none ${
              filters.keyword.trim().length > 0 ? 'font-semibold text-[#1447E6]' : 'text-slate-900'
            }`}
            placeholder="Tìm theo mã cán bộ, họ tên, số hợp đồng..."
          />
        </div>
        <ExpandedSelect
          label="Loại hợp đồng"
          value={filters.contractType}
          options={contractTypeOptions}
          width="w-[185px]"
          hideLabelWhenSelected
          activeWhenSelected
          onChange={(value) => updateFilter('contractType', value)}
        />
        <ExpandedSelect
          label="Trạng thái"
          value={filters.status}
          options={statusOptions}
          width="w-[155px]"
          hideLabelWhenSelected
          activeWhenSelected
          onChange={(value) => updateFilter('status', value)}
        />
        <ContractExpiryDateFilter value={filters.expiryDate} onChange={(value) => updateFilter('expiryDate', value)} />
        <ExpandedSelect
          label="Đơn vị"
          value={filters.unit}
          options={unitOptions}
          width="w-[260px]"
          searchable
          hideLabelWhenSelected
          activeWhenSelected
          onChange={(value) => updateFilter('unit', value)}
        />
        {hasActiveFilters ? (
          <button
            onClick={onClear}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 text-[12px] font-semibold text-slate-600 shadow-sm hover:bg-slate-50"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                d="M1.625 6.5C1.625 7.46418 1.91091 8.40672 2.44659 9.2084C2.98226 10.0101 3.74363 10.6349 4.63442 11.0039C5.52521 11.3729 6.50541 11.4694 7.45107 11.2813C8.39672 11.0932 9.26536 10.6289 9.94715 9.94715C10.6289 9.26536 11.0932 8.39672 11.2813 7.45107C11.4694 6.50541 11.3729 5.52521 11.0039 4.63442C10.6349 3.74363 10.0101 2.98226 9.2084 2.44659C8.40672 1.91091 7.46418 1.625 6.5 1.625C5.13714 1.63013 3.82903 2.16191 2.84917 3.10917L1.625 4.33333"
                stroke="#45556C"
                strokeWidth="1.08333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.625 1.625V4.33333H4.33333"
                stroke="#45556C"
                strokeWidth="1.08333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Xóa lọc
          </button>
        ) : null}
      </div>
    </section>
  )
}
