import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { loadJSON, saveJSON } from '../lib/storage'
import { CONTRACT_SEED_ROWS } from '../data/contracts.seed'
import type { ContractRow } from '../features/contracts/types'

const STORAGE_KEY = 'contracts'

type ContractStore = {
  contracts: ContractRow[]
  expiring: ContractRow[]
  setContracts: (rows: ContractRow[]) => void
  addContract: (row: ContractRow) => void
  updateContract: (number: string, patch: Partial<ContractRow>) => void
  resetToSeed: () => void
}

const ContractContext = createContext<ContractStore | null>(null)

export function ContractProvider({ children }: { children: ReactNode }) {
  const [contracts, setContractsState] = useState<ContractRow[]>(() => loadJSON(STORAGE_KEY, CONTRACT_SEED_ROWS))

  useEffect(() => {
    saveJSON(STORAGE_KEY, contracts)
  }, [contracts])

  const setContracts = useCallback((rows: ContractRow[]) => {
    setContractsState(rows)
  }, [])

  const addContract = useCallback((row: ContractRow) => {
    setContractsState((current) => [row, ...current])
  }, [])

  const updateContract = useCallback((number: string, patch: Partial<ContractRow>) => {
    setContractsState((current) => current.map((row) => (row.number === number ? { ...row, ...patch } : row)))
  }, [])

  const resetToSeed = useCallback(() => {
    setContractsState(CONTRACT_SEED_ROWS)
  }, [])

  const expiring = useMemo(
    () => contracts.filter((contract) => contract.status === 'Sắp hết hạn' || contract.status === 'Chờ gia hạn'),
    [contracts],
  )

  const value = useMemo<ContractStore>(
    () => ({ contracts, expiring, setContracts, addContract, updateContract, resetToSeed }),
    [contracts, expiring, setContracts, addContract, updateContract, resetToSeed],
  )

  return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>
}

export function useContractStore() {
  const store = useContext(ContractContext)
  if (!store) throw new Error('useContractStore must be used within a ContractProvider')
  return store
}
