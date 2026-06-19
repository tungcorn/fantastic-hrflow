export type PersonnelRow = [string, string, string, string, string, string, string]

export type PersonnelRecord = {
  code: string
  name: string
  unit: string
  degree: string
  role: string
  contract: string
  status: string
  gender?: string
  governmentId?: string
  department?: string
  birthDate?: string
  hometown?: string
  taxCode?: string
  bhxhCode?: string
  bhytCode?: string
  email?: string
  phone?: string
  address?: string
  foreigner?: boolean
  visaNumber?: string
  visaExpiry?: string
  passportNumber?: string
  passportExpiry?: string
  personnelType?: string
  startDate?: string
  professionalRank?: string
  salaryGrade?: string
  salaryCoeff?: string
  positionAllowance?: string
  seniorityAllowance?: string
  paymentSource?: string
  generalEdu?: string
  professionalTitle?: string
  academicDegree?: string
  degrees?: CredentialItem[]
  certs?: CredentialItem[]
  requiredDocuments?: Partial<Record<RequiredDocumentKey, UploadedFileMeta>>
  avatarFileName?: string
}

export type UploadedFileMeta = { name: string; type: string; size: number }

export type RequiredDocumentKey = 'identityDocument' | 'recruitmentDecision' | 'curriculumVitae' | 'healthCertificate'

export type CredentialItem = { name: string; place: string; fileName?: string }

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
