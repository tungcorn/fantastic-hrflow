import type { PersonnelRecord } from './types'

export const PERSONNEL_PAGE_SIZE = 10

/**
 * Generate the next personnel code (Mã cán bộ) of the form `CB2026-####`,
 * one past the highest numeric suffix currently in use.
 */
export function generatePersonnelCode(rows: string[][]): string {
  let max = 0
  for (const row of rows) {
    const match = /-(\d+)$/.exec(row[0] ?? '')
    if (match) {
      const value = Number(match[1])
      if (Number.isFinite(value) && value > max) max = value
    }
  }
  return `CB2026-${String(max + 1).padStart(4, '0')}`
}

/** Map a row into a named record. Column 8 stores optional JSON details while preserving the legacy 7-column format. */
export function toPersonnelRecord([code, name, unit, degree, role, contract, status, details]: string[]): PersonnelRecord {
  let parsedDetails: Partial<PersonnelRecord> = {}
  if (details) {
    try {
      parsedDetails = JSON.parse(details) as Partial<PersonnelRecord>
    } catch {
      parsedDetails = {}
    }
  }
  return { ...parsedDetails, code, name, unit, degree, role, contract, status }
}

export function toPersonnelRow(record: PersonnelRecord): string[] {
  const { code, name, unit, degree, role, contract, status, ...details } = record
  return [code, name, unit, degree, role, contract, status, JSON.stringify(details)]
}

/** Derive the distinct filter/select option lists from the current rows. */
export function derivePersonnelOptions(rows: string[][]) {
  return {
    unitOptions: Array.from(new Set(rows.map((row) => row[2]))),
    degreeOptions: Array.from(new Set(rows.map((row) => row[3]))),
    roleOptions: Array.from(new Set(rows.map((row) => row[4]))),
    contractOptions: Array.from(new Set(rows.map((row) => row[5]))),
    statusOptions: Array.from(new Set(rows.map((row) => row[6]))),
  }
}

export type PersonnelOptions = ReturnType<typeof derivePersonnelOptions>
