import { useState } from 'react'
import { Download, Plus } from 'lucide-react'
import { normalizeSearch } from '../../lib/utils'
import { SummaryCards } from './SummaryCards'
import { ContractFilters } from './ContractFilters'
import { ContractTable } from './ContractTable'
import { CONTRACT_PAGE_SIZE, initialContractFilters } from './options'
import type { ContractFiltersState, ContractFrame, ContractRow } from './types'

export function ContractListContent({
  contracts,
  dimmed = false,
  onOpenFrame,
  onViewContract,
}: {
  contracts: ContractRow[]
  dimmed?: boolean
  onOpenFrame?: (frame: ContractFrame, contract?: ContractRow) => void
  onViewContract?: (contract: ContractRow) => void
}) {
  const [filters, setFilters] = useState<ContractFiltersState>(initialContractFilters)
  const [page, setPage] = useState(1)
  const filteredRows = contracts.filter((row) => {
    const keyword = normalizeSearch(filters.keyword)
    const contractType = normalizeSearch(filters.contractType)
    const expiryDate = filters.expiryDate.trim()

    if (keyword) {
      const haystack = normalizeSearch(
        `${row.number} ${row.code} ${row.name} ${row.unit} ${row.type} ${row.status} ${row.end}`,
      )
      if (!haystack.includes(keyword)) return false
    }
    if (contractType && !normalizeSearch(row.type).includes(contractType)) return false
    if (filters.status && row.status !== filters.status) return false
    if (expiryDate && !row.end.includes(expiryDate)) return false
    if (filters.unit && row.unit !== filters.unit) return false

    return true
  })
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / CONTRACT_PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * CONTRACT_PAGE_SIZE
  const paginatedRows = filteredRows.slice(pageStart, pageStart + CONTRACT_PAGE_SIZE)
  const visibleStart = filteredRows.length === 0 ? 0 : pageStart + 1
  const visibleEnd = pageStart + paginatedRows.length
  const handleFiltersChange = (nextFilters: ContractFiltersState) => {
    setFilters(nextFilters)
    setPage(1)
  }
  const clearFilters = () => {
    setFilters(initialContractFilters)
    setPage(1)
  }

  return (
    <div className={`px-6 py-5 ${dimmed ? 'select-none opacity-25' : ''}`}>
      <div className="space-y-4">
        <SummaryCards />
        <ContractFilters filters={filters} onChange={handleFiltersChange} onClear={clearFilters} />
        <div className="flex items-center justify-end gap-2">
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 text-[12px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            <Download size={14} /> Xuất danh sách
          </button>
          <button
            onClick={() => onOpenFrame?.('create')}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-700 px-3.5 text-[12px] font-semibold text-white shadow-sm hover:bg-blue-800"
          >
            <Plus size={14} /> Tạo hợp đồng
          </button>
        </div>
        <ContractTable rows={paginatedRows} compact={dimmed} onOpenFrame={onOpenFrame} onViewContract={onViewContract} />
      </div>

      <div className="mt-4 flex items-center justify-between text-[12px] text-slate-500">
        <span>
          Hiển thị {visibleStart}-{visibleEnd} / {filteredRows.length} hợp đồng lao động
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            className={`h-8 rounded-lg border border-slate-300 bg-white px-3 text-[12px] ${
              currentPage === 1 ? 'cursor-not-allowed text-slate-400' : 'font-medium text-slate-700 hover:bg-slate-50'
            }`}
          >
            Trước
          </button>
          <span className="font-medium text-slate-700">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
            className={`h-8 rounded-lg border border-slate-300 bg-white px-3 text-[12px] ${
              currentPage >= totalPages
                ? 'cursor-not-allowed text-slate-400'
                : 'font-medium text-slate-700 hover:bg-slate-50'
            }`}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  )
}
