import { parseContractDate } from '../../lib/utils'
import type { ContractRow, ContractStatus } from './types'

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
