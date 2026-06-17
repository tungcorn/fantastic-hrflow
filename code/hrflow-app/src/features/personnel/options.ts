import type { CredentialItem } from './types'

export const generalEducationOptions = [
  '12/12',
  '11/12',
  '10/12',
  '9/12',
  '8/12',
  '7/12',
  '6/12',
  '5/12',
  '4/12',
  '3/12',
  '2/12',
  '1/12',
  '10/10',
  '9/10',
  'Khác',
]

export const trainingLevelOptions = ['Sơ cấp', 'Trung cấp', 'Cao đẳng', 'Đại học', 'Thạc sĩ', 'Tiến sĩ']

export const professionalTitleOptions = [
  'Trợ giảng',
  'Giảng viên hạng III',
  'Giảng viên chính hạng II',
  'Giảng viên cao cấp hạng I',
  'Chuyên viên',
  'Chuyên viên chính',
  'Chuyên viên cao cấp',
  'Kế toán viên',
  'Kế toán viên chính',
  'Thư viện viên',
  'Thư viện viên chính',
  'Nghiên cứu viên',
  'Nghiên cứu viên chính',
  'Nghiên cứu viên cao cấp',
  'Khác',
]

export const academicRankDegreeOptions = [
  'Không có',
  'Cử nhân',
  'Kỹ sư',
  'Thạc sĩ',
  'Tiến sĩ',
  'Phó Giáo sư',
  'Giáo sư',
]

export const defaultDegrees: CredentialItem[] = [
  { name: 'Bằng Cử nhân chuyên ngành Kỹ thuật phần mềm', place: 'Trường Đại học Thủy lợi' },
  { name: 'Bằng Kỹ sư Khoa học máy tính', place: 'Trường Đại học Thủy lợi' },
]

export const defaultCerts: CredentialItem[] = [{ name: 'IELTS 7.5', place: 'British Council' }]
