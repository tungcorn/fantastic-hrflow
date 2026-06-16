export type PersonnelRow = [string, string, string, string, string, string, string]

export type PersonnelRecord = {
  code: string
  name: string
  unit: string
  degree: string
  role: string
  contract: string
  status: string
}

export type CredentialItem = { name: string; place: string }

export type PersonnelImportInvalidRow = {
  row: string
  name: string
  field: string
  issue: string
  type: string
}

export type PersonnelImportAnalysis = {
  fileName: string
  totalRows: number
  validRows: PersonnelRow[]
  invalidRows: PersonnelImportInvalidRow[]
  validCount: number
  invalidCount: number
  errorCount: number
  allValid: boolean
}
