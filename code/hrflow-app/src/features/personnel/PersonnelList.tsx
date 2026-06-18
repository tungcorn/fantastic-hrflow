import { useState } from 'react'
import { Edit3, RotateCcw, Search } from 'lucide-react'
import { SelectFilter } from '../../components/ui/SelectFilter'
import { StatusBadge } from '../contracts/StatusBadge'
import { normalizeSearch } from '../../lib/utils'
import { AddPersonnelButton } from './AddPersonnelButton'
import { PERSONNEL_PAGE_SIZE, toPersonnelRecord } from './personnel.utils'
import type { PersonnelRecord } from './types'

export function PersonnelList({
  rows,
  unitOptions,
  degreeOptions,
  contractOptions,
  statusOptions,
  addMenuOpen,
  onToggleAddMenu,
  onManualAdd,
  onExcelImport,
  onEditPersonnel,
}: {
  rows: string[][]
  unitOptions: string[]
  degreeOptions: string[]
  contractOptions: string[]
  statusOptions: string[]
  addMenuOpen?: boolean
  onToggleAddMenu?: () => void
  onManualAdd?: () => void
  onExcelImport?: () => void
  onEditPersonnel?: (personnel: PersonnelRecord) => void
}) {
  const [keyword, setKeyword] = useState('')
  const [unit, setUnit] = useState('')
  const [degree, setDegree] = useState('')
  const [contract, setContract] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const filteredRows = rows.filter((row) => {
    const record = toPersonnelRecord(row)
    const keywordValue = normalizeSearch(keyword)

    if (keywordValue) {
      const haystack = normalizeSearch(
        `${record.code} ${record.name} ${record.unit} ${record.degree} ${record.role} ${record.contract} ${record.status}`,
      )
      if (!haystack.includes(keywordValue)) return false
    }
    if (unit && record.unit !== unit) return false
    if (degree && record.degree !== degree) return false
    if (contract && record.contract !== contract) return false
    if (status && record.status !== status) return false

    return true
  })
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PERSONNEL_PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * PERSONNEL_PAGE_SIZE
  const paginatedRows = filteredRows.slice(pageStart, pageStart + PERSONNEL_PAGE_SIZE)
  const visibleStart = filteredRows.length === 0 ? 0 : pageStart + 1
  const visibleEnd = pageStart + paginatedRows.length
  const hasActiveFilters = [keyword, unit, degree, contract, status].some((item) => item.trim().length > 0)
  const updateKeyword = (value: string) => {
    setKeyword(value)
    setPage(1)
  }
  const updateUnit = (value: string) => {
    setUnit(value)
    setPage(1)
  }
  const updateDegree = (value: string) => {
    setDegree(value)
    setPage(1)
  }
  const updateContract = (value: string) => {
    setContract(value)
    setPage(1)
  }
  const updateStatus = (value: string) => {
    setStatus(value)
    setPage(1)
  }
  const clearFilters = () => {
    setKeyword('')
    setUnit('')
    setDegree('')
    setContract('')
    setStatus('')
    setPage(1)
  }

  return (
    <div className="select-none px-6 py-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-[170px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 shadow-sm">
            <Search size={14} className="text-slate-400" />
            <input
              value={keyword}
              onChange={(event) => updateKeyword(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[12px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
              placeholder="Tìm kiếm"
            />
          </div>
          <SelectFilter label="Đơn vị công tác" value={unit} options={unitOptions} onChange={updateUnit} />
          <SelectFilter label="Học hàm/học vị" value={degree} options={degreeOptions} onChange={updateDegree} />
          <SelectFilter label="Hợp đồng" value={contract} options={contractOptions} onChange={updateContract} />
          <SelectFilter label="Trạng thái" value={status} options={statusOptions} onChange={updateStatus} />
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-semibold text-slate-600 shadow-sm hover:bg-slate-50"
            >
              <RotateCcw size={13} /> Xóa lọc
            </button>
          ) : null}
        </div>
        <AddPersonnelButton
          withMenu={!!onToggleAddMenu}
          menuOpen={addMenuOpen}
          onToggleMenu={onToggleAddMenu}
          onManualAdd={onManualAdd}
          onExcelImport={onExcelImport}
        />
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="grid grid-cols-[0.7fr_1.2fr_1.35fr_1fr_1fr_1fr_1fr_44px] bg-blue-100 px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-800">
          <span>Mã NS</span>
          <span>Họ tên</span>
          <span>Đơn vị công tác</span>
          <span>Học hàm/học vị</span>
          <span>Chức vụ</span>
          <span>Hợp đồng</span>
          <span>Trạng thái</span>
          <span />
        </div>

        {paginatedRows.map(([code, name, rowUnit, rowDegree, role, rowContract, rowStatus]) => (
          <div
            key={code}
            className="grid h-[58px] grid-cols-[0.7fr_1.2fr_1.35fr_1fr_1fr_1fr_1fr_44px] items-center border-b border-slate-100 px-4 text-[12px] text-slate-800 last:border-0"
          >
            <span className="font-mono text-[11px] font-semibold text-slate-700">{code}</span>
            <span className="font-medium">{name}</span>
            <span>{rowUnit}</span>
            <span>{rowDegree}</span>
            <span>{role}</span>
            <span>
              <StatusBadge value={rowContract} />
            </span>
            <span>
              <StatusBadge value={rowStatus} />
            </span>
            <button
              type="button"
              disabled
              className="grid size-8 cursor-not-allowed place-items-center rounded-lg text-slate-300"
              aria-label={`Sửa hồ sơ ${name}`}
            >
              <Edit3 size={14} />
            </button>
          </div>
        ))}
        {filteredRows.length === 0 ? (
          <div className="px-4 py-8 text-center text-[13px] text-slate-500">
            Không có hồ sơ nhân sự phù hợp với bộ lọc hiện tại.
          </div>
        ) : null}
      </section>

      <div className="mt-4 flex items-center justify-between text-[12px] text-slate-500">
        <span>
          Hiển thị {visibleStart}-{visibleEnd} / {filteredRows.length} hồ sơ nhân sự
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
