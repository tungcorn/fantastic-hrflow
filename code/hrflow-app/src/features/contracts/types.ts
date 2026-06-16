export type ContractFrame = 'list' | 'create' | 'renew' | 'terminate'

export type ContractStatus = 'Còn hiệu lực' | 'Sắp hết hạn' | 'Chờ gia hạn' | 'Hết hiệu lực'

export type OptionTone = 'default' | 'success' | 'warning' | 'danger' | 'disabled'

export type DropdownOption = {
  label: string
  description?: string
  tone?: OptionTone
  disabled?: boolean
}

export type ContractRow = {
  number: string
  code: string
  name: string
  unit: string
  type: string
  start: string
  end: string
  status: ContractStatus
  remaining: string
}

export type ContractFiltersState = {
  keyword: string
  contractType: string
  status: string
  expiryDate: string
  unit: string
}
