import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { loadJSON, saveJSON } from '../lib/storage'
import { PERSONNEL_SEED_ROWS } from '../data/personnel.seed'
import { derivePersonnelOptions, type PersonnelOptions } from '../features/personnel/personnel.utils'

const STORAGE_KEY = 'personnel-rows'

type PersonnelStore = {
  rows: string[][]
  options: PersonnelOptions
  addRow: (row: string[]) => void
  addRows: (rows: string[][]) => void
  updateRowByCode: (code: string, row: string[]) => void
  resetToSeed: () => void
}

const PersonnelContext = createContext<PersonnelStore | null>(null)

export function PersonnelProvider({ children }: { children: ReactNode }) {
  const [rows, setRows] = useState<string[][]>(() => loadJSON(STORAGE_KEY, PERSONNEL_SEED_ROWS))

  // Persist on every change. Idempotent, so React StrictMode's double-invoke is harmless.
  useEffect(() => {
    saveJSON(STORAGE_KEY, rows)
  }, [rows])

  const addRow = useCallback((row: string[]) => {
    setRows((current) => [...current, row])
  }, [])

  const addRows = useCallback((newRows: string[][]) => {
    setRows((current) => [...current, ...newRows])
  }, [])

  const updateRowByCode = useCallback((code: string, row: string[]) => {
    setRows((current) => current.map((existing) => (existing[0] === code ? row : existing)))
  }, [])

  const resetToSeed = useCallback(() => {
    setRows(PERSONNEL_SEED_ROWS)
  }, [])

  const options = useMemo(() => derivePersonnelOptions(rows), [rows])

  const value = useMemo<PersonnelStore>(
    () => ({ rows, options, addRow, addRows, updateRowByCode, resetToSeed }),
    [rows, options, addRow, addRows, updateRowByCode, resetToSeed],
  )

  return <PersonnelContext.Provider value={value}>{children}</PersonnelContext.Provider>
}

export function usePersonnelStore() {
  const store = useContext(PersonnelContext)
  if (!store) throw new Error('usePersonnelStore must be used within a PersonnelProvider')
  return store
}
