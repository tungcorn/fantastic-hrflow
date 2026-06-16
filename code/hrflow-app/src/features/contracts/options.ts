import type { ContractFiltersState, DropdownOption } from './types'

export const CONTRACT_PAGE_SIZE = 5

export const initialContractFilters: ContractFiltersState = {
  keyword: '',
  contractType: '',
  status: '',
  expiryDate: '',
  unit: '',
}

export const contractTypeOptions: DropdownOption[] = [
  { label: 'Xác định thời hạn', description: 'Áp dụng 12–36 tháng', tone: 'success' },
  { label: 'Không xác định thời hạn', description: 'Không yêu cầu ngày kết thúc', tone: 'success' },
  { label: 'Thử việc', description: 'Ngừng sử dụng cho hợp đồng mới' },
]

export const statusOptions: DropdownOption[] = [
  { label: 'Chưa có hiệu lực', description: 'Ngày hiệu lực ở tương lai' },
  { label: 'Còn hiệu lực', description: 'Đang áp dụng', tone: 'success' },
  { label: 'Sắp hết hạn', description: 'Còn dưới 30 ngày', tone: 'warning' },
  { label: 'Chờ gia hạn', description: 'Đang trong thời gian xử lý', tone: 'warning' },
  { label: 'Hết hiệu lực', description: 'Đã kết thúc', tone: 'danger' },
]

export const unitOptions: DropdownOption[] = [
  { label: 'Ban Giám hiệu', description: 'Khối điều hành' },
  { label: 'Phòng Tổ chức - Cán bộ', description: 'Khối hành chính' },
  { label: 'Phòng Tài chính - Kế toán', description: 'Khối hành chính' },
  { label: 'Khoa Công nghệ thông tin', description: 'Đơn vị đào tạo' },
  { label: 'Khoa Kinh tế và Quản lý', description: 'Đơn vị đào tạo' },
]

export const contractPersonnelOptions: DropdownOption[] = [
  { label: 'CB2022-0118 · Trần Thị Bình', description: 'Khoa CNTT · Hợp đồng sắp hết hạn', tone: 'warning' },
  { label: 'CB2024-0190 · Hoàng Văn Em', description: 'Khoa Kinh tế · Chưa có hợp đồng mới', tone: 'success' },
  { label: 'CB2019-0015 · Phạm Thị Dung', description: 'Đã hết hiệu lực · cần kiểm tra hồ sơ', tone: 'danger' },
]

export const reasonOptions: DropdownOption[] = [
  { label: 'Theo quyết định của Nhà trường', description: 'Có file quyết định kèm theo' },
  { label: 'Theo thỏa thuận hai bên', description: 'Cần biên bản xác nhận' },
  { label: 'Nhân sự xin nghỉ việc', description: 'Kiểm tra hồ sơ thôi việc', tone: 'warning' },
]
