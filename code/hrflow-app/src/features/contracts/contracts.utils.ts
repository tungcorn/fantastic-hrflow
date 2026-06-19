import { parseContractDate } from '../../lib/utils'
import type { ContractRow, ContractStatus } from './types'

/** Số hợp đồng theo mẫu HĐLĐ-YYYY-NNNN. */
export const contractNumberPattern = /^HĐLĐ-\d{4}-\d{4}$/i
const decimalPattern = /^\d+(?:[.,]\d{1,2})?$/
const strictDatePattern = /^\d{2}\/\d{2}\/\d{4}$/
/** Kích thước tối đa cho file hợp đồng PDF (10MB). */
export const MAX_PDF_SIZE = 10 * 1024 * 1024

/** Parse a strict DD/MM/YYYY string into a Date, or null when malformed. */
export function getContractDate(value: string): Date | null {
  return strictDatePattern.test(value.trim()) ? parseContractDate(value.trim()) : null
}

/**
 * Validate a contract coefficient field (hệ số lương / phụ cấp).
 * `kind` controls whether the value is required and the wording of the message.
 */
export function validateContractDecimal(value: string, kind: 'salary' | 'allowance'): string | undefined {
  const required = kind === 'salary'
  const normalized = value.trim().replace(',', '.')
  if (!normalized) return required ? 'Vui lòng nhập giá trị.' : undefined
  if (!decimalPattern.test(value.trim()) || Number(normalized) < 0 || (required && Number(normalized) === 0)) {
    return required
      ? 'Hệ số lương phải là số dương, tối đa 2 chữ số thập phân.'
      : 'Phụ cấp phải là số không âm, tối đa 2 chữ số thập phân.'
  }
  if (Number(normalized) > 20) return 'Giá trị không được lớn hơn 20.'
  return undefined
}

/** Validate an uploaded contract file: required, PDF only, ≤ 10MB. */
export function validateContractPdf(file: File | null): string | undefined {
  if (!file) return 'Vui lòng tải file hợp đồng PDF.'
  if (!file.name.toLowerCase().endsWith('.pdf') || (file.type.length > 0 && file.type !== 'application/pdf')) {
    return 'Tệp hợp đồng phải có định dạng PDF.'
  }
  if (file.size > MAX_PDF_SIZE) return 'Tệp PDF không được vượt quá 10MB.'
  return undefined
}

/** Derive a contract's status + "days remaining" label from its end date. */
export function deriveContractState(end: string): { status: ContractStatus; remaining: string } {
  const endDate = parseContractDate(end)
  if (!endDate) return { status: 'Còn hiệu lực', remaining: '—' }

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const days = Math.round((endDate.getTime() - today.getTime()) / 86_400_000)

  if (days < 0) return { status: 'Hết hiệu lực', remaining: 'Quá hạn' }
  if (days <= 30) return { status: 'Sắp hết hạn', remaining: `${days} ngày` }
  return { status: 'Còn hiệu lực', remaining: `${days} ngày` }
}

/**
 * Produce a contract number that is not already in use, by incrementing the
 * trailing numeric group of `base` (e.g. HĐLĐ-2026-0142 → HĐLĐ-2026-0143).
 */
export function nextContractNumber(existing: ContractRow[], base: string): string {
  const used = new Set(existing.map((row) => row.number))
  const match = /^(.*?)(\d+)$/.exec(base)
  if (!match) {
    let suffix = 2
    let candidate = `${base}-${suffix}`
    while (used.has(candidate)) candidate = `${base}-${++suffix}`
    return candidate
  }

  const [, prefix, digits] = match
  let value = Number(digits) + 1
  let candidate = `${prefix}${String(value).padStart(digits.length, '0')}`
  while (used.has(candidate)) {
    value += 1
    candidate = `${prefix}${String(value).padStart(digits.length, '0')}`
  }
  return candidate
}
