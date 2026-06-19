import * as XLSX from 'xlsx'
import { academicRankDegreeOptions, generalEducationOptions, professionalTitleOptions, trainingLevelOptions } from './options'
import { toPersonnelRecord, toPersonnelRow } from './personnel.utils'
import type { PersonnelImportInvalidRow, PersonnelImportAnalysis, PersonnelRecord } from './types'

export const PERSONNEL_IMPORT_HEADERS = [
  'Mã cán bộ',
  'Họ và tên',
  'Giới tính',
  'Ngày sinh',
  'Quê quán',
  'Số CCCD',
  'Mã số thuế',
  'Số BHXH',
  'Số BHYT',
  'Email',
  'Số điện thoại',
  'Địa chỉ thường trú',
  'Là người nước ngoài',
  'Số Visa',
  'Ngày hết hạn Visa',
  'Số Hộ chiếu',
  'Ngày hết hạn Hộ chiếu',
  'Đơn vị',
  'Bộ môn / phòng ban',
  'Chức vụ',
  'Hợp đồng',
  'Loại nhân sự',
  'Ngày bắt đầu công tác',
  'Trạng thái hồ sơ',
  'Ngạch / hạng chức danh',
  'Bậc lương',
  'Hệ số lương',
  'Phụ cấp chức vụ',
  'Phụ cấp thâm niên (%)',
  'Nguồn chi trả',
  'Trình độ văn hóa',
  'Trình độ đào tạo',
  'Chức danh nghề nghiệp',
  'Học hàm / Học vị',
] as const

export const PERSONNEL_IMPORT_TEMPLATE_PATH = '/templates/personnel-import-template.xlsx'
export const PERSONNEL_IMPORT_MAX_ROWS = 200

const OPTIONAL_HEADERS = new Set([
  'Số Visa',
  'Ngày hết hạn Visa',
  'Số Hộ chiếu',
  'Ngày hết hạn Hộ chiếu',
  'Hợp đồng',
  'Phụ cấp chức vụ',
  'Phụ cấp thâm niên (%)',
])
const namePattern = /^[\p{L}][\p{L}\s.'’\-]{1,99}$/u
const emailPattern = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i
const datePattern = /^\d{4}-\d{2}-\d{2}$/
const localToday = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}
const isValidIsoDate = (value: string) => {
  if (!datePattern.test(value)) return false
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return false
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` === value
}

function normalizeExcelCell(value: unknown) {
  if (value === null || value === undefined) return ''
  return String(value).trim()
}

export function buildPersonnelImportAnalysis({
  fileName,
  totalRows,
  validRows,
  invalidRows,
}: {
  fileName: string
  totalRows: number
  validRows: string[][]
  invalidRows: PersonnelImportInvalidRow[]
}): PersonnelImportAnalysis {
  const distinctInvalidRows = new Set(invalidRows.map((row) => row.row))
  return {
    fileName,
    totalRows,
    validRows,
    invalidRows,
    validCount: validRows.length,
    invalidCount: distinctInvalidRows.size,
    errorCount: invalidRows.length,
    allValid: invalidRows.length === 0 && validRows.length > 0,
  }
}

export function analyzePersonnelWorkbook(
  workbook: XLSX.WorkBook,
  fileName: string,
  existingRows: string[][],
  options: {
    unitOptions: string[]
    degreeOptions: string[]
    roleOptions: string[]
    contractOptions: string[]
    statusOptions: string[]
  },
): PersonnelImportAnalysis {
  const firstSheetName = workbook.SheetNames[0]
  const worksheet = firstSheetName ? workbook.Sheets[firstSheetName] : undefined
  if (!worksheet) {
    return buildPersonnelImportAnalysis({
      fileName,
      totalRows: 0,
      validRows: [],
      invalidRows: [{ row: 'Toàn file', name: fileName, field: 'Worksheet', issue: 'Không tìm thấy sheet dữ liệu trong file Excel.', type: 'Sai cấu trúc' }],
    })
  }

  const sheetRows = XLSX.utils.sheet_to_json<(string | number | boolean | null)[]>(worksheet, {
    header: 1,
    raw: false,
    defval: '',
    blankrows: false,
  })
  const headerRow = (sheetRows[0] ?? []).slice(0, PERSONNEL_IMPORT_HEADERS.length).map(normalizeExcelCell)
  const headersValid = headerRow.length === PERSONNEL_IMPORT_HEADERS.length &&
    PERSONNEL_IMPORT_HEADERS.every((header, index) => headerRow[index] === header)
  const dataRows = sheetRows.slice(1)

  if (!headersValid) {
    return buildPersonnelImportAnalysis({
      fileName,
      totalRows: dataRows.length,
      validRows: [],
      invalidRows: [{ row: 'Dòng 1', name: fileName, field: 'Tiêu đề cột', issue: `Tiêu đề phải đúng ${PERSONNEL_IMPORT_HEADERS.length} cột và đúng thứ tự của file mẫu.`, type: 'Sai cấu trúc' }],
    })
  }
  if (dataRows.length === 0) {
    return buildPersonnelImportAnalysis({
      fileName,
      totalRows: 0,
      validRows: [],
      invalidRows: [{ row: 'Toàn file', name: fileName, field: 'Dữ liệu', issue: 'File chưa có dòng hồ sơ nhân sự nào để nhập.', type: 'Thiếu dữ liệu' }],
    })
  }
  if (dataRows.length > PERSONNEL_IMPORT_MAX_ROWS) {
    return buildPersonnelImportAnalysis({
      fileName,
      totalRows: dataRows.length,
      validRows: [],
      invalidRows: [{ row: 'Toàn file', name: fileName, field: 'Số lượng hồ sơ', issue: `Mỗi lần chỉ nhập tối đa ${PERSONNEL_IMPORT_MAX_ROWS} hồ sơ.`, type: 'Vượt giới hạn' }],
    })
  }

  const existingRecords = existingRows.map(toPersonnelRecord)
  const existingCodes = new Set(existingRecords.map((record) => record.code.trim()))
  const existingGovernmentIds = new Set(existingRecords.map((record) => record.governmentId?.trim()).filter(Boolean))
  const allowedUnits = new Set(options.unitOptions.map(normalizeExcelCell))
  const allowedDegrees = new Set([...trainingLevelOptions, ...options.degreeOptions].map(normalizeExcelCell))
  const allowedRoles = new Set(options.roleOptions.map(normalizeExcelCell))
  const allowedContracts = new Set(options.contractOptions.map(normalizeExcelCell))
  const allowedStatuses = new Set(options.statusOptions.map(normalizeExcelCell))
  const firstSeenCodeRow = new Map<string, number>()
  const firstSeenGovernmentIdRow = new Map<string, number>()
  const invalidRows: PersonnelImportInvalidRow[] = []
  const validRows: string[][] = []
  const today = localToday()

  dataRows.forEach((rawRow, rowIndex) => {
    const excelRowNumber = rowIndex + 2
    const values = PERSONNEL_IMPORT_HEADERS.map((_, columnIndex) => normalizeExcelCell(rawRow[columnIndex]))
    const data = Object.fromEntries(PERSONNEL_IMPORT_HEADERS.map((header, index) => [header, values[index]])) as Record<(typeof PERSONNEL_IMPORT_HEADERS)[number], string>
    const rowErrors: PersonnelImportInvalidRow[] = []
    const rowLabel = `Dòng ${excelRowNumber}`
    const displayName = data['Họ và tên'] || data['Mã cán bộ'] || 'Chưa có họ tên'
    const addError = (field: string, issue: string, type = 'Không hợp lệ') => rowErrors.push({ row: rowLabel, name: displayName, field, issue, type })

    PERSONNEL_IMPORT_HEADERS.forEach((header) => {
      if (!OPTIONAL_HEADERS.has(header) && !data[header]) addError(header, 'Để trống trường bắt buộc.', 'Thiếu bắt buộc')
    })

    const code = data['Mã cán bộ']
    const governmentId = data['Số CCCD']
    if (code) {
      if (existingCodes.has(code)) addError('Mã cán bộ', `Mã cán bộ ${code} đã tồn tại.`, 'Trùng dữ liệu')
      const firstRow = firstSeenCodeRow.get(code)
      if (firstRow) addError('Mã cán bộ', `Mã cán bộ bị lặp với dòng ${firstRow}.`, 'Trùng dữ liệu')
      else firstSeenCodeRow.set(code, excelRowNumber)
    }
    if (governmentId) {
      if (!/^\d{12}$/.test(governmentId)) addError('Số CCCD', 'CCCD phải gồm đúng 12 chữ số.')
      if (existingGovernmentIds.has(governmentId)) addError('Số CCCD', 'CCCD đã tồn tại trong danh sách.', 'Trùng dữ liệu')
      const firstRow = firstSeenGovernmentIdRow.get(governmentId)
      if (firstRow) addError('Số CCCD', `CCCD bị lặp với dòng ${firstRow}.`, 'Trùng dữ liệu')
      else firstSeenGovernmentIdRow.set(governmentId, excelRowNumber)
    }

    if (data['Họ và tên'] && !namePattern.test(data['Họ và tên'])) addError('Họ và tên', 'Họ tên phải có từ 2–100 ký tự và không chứa chữ số.')
    if (data['Giới tính'] && !['Nam', 'Nữ', 'Khác'].includes(data['Giới tính'])) addError('Giới tính', 'Chỉ chấp nhận Nam, Nữ hoặc Khác.', 'Sai danh mục')
    if (data['Ngày sinh'] && (!isValidIsoDate(data['Ngày sinh']) || data['Ngày sinh'] >= today)) addError('Ngày sinh', 'Ngày sinh phải có dạng YYYY-MM-DD, là ngày hợp lệ và nhỏ hơn ngày hiện tại.')
    if (data['Ngày sinh'] && isValidIsoDate(data['Ngày sinh'])) {
      const adultDate = new Date(`${data['Ngày sinh']}T00:00:00`)
      adultDate.setFullYear(adultDate.getFullYear() + 18)
      const adultDateText = `${adultDate.getFullYear()}-${String(adultDate.getMonth() + 1).padStart(2, '0')}-${String(adultDate.getDate()).padStart(2, '0')}`
      if (adultDateText > today) addError('Ngày sinh', 'Nhân sự phải đủ 18 tuổi.')
      if (data['Ngày bắt đầu công tác'] && data['Ngày bắt đầu công tác'] < adultDateText) addError('Ngày bắt đầu công tác', 'Ngày bắt đầu công tác phải sau ngày đủ 18 tuổi.')
    }
    if (data['Mã số thuế'] && !/^\d{10}(?:-\d{3})?$/.test(data['Mã số thuế'])) addError('Mã số thuế', 'Mã số thuế phải có dạng 10 chữ số hoặc 10 chữ số-3 chữ số.')
    if (data['Số BHXH'] && !/^\d{10}$/.test(data['Số BHXH'])) addError('Số BHXH', 'Số BHXH phải gồm đúng 10 chữ số.')
    if (data['Số BHYT'] && !/^[A-Z0-9]{15}$/i.test(data['Số BHYT'])) addError('Số BHYT', 'Số BHYT phải gồm đúng 15 ký tự chữ hoặc số.')
    if (data.Email) {
      const localPart = data.Email.split('@')[0]
      if (data.Email.length > 254 || !emailPattern.test(data.Email) || localPart.startsWith('.') || localPart.endsWith('.') || localPart.includes('..')) addError('Email', 'Email không đúng định dạng.')
    }
    if (data['Số điện thoại'] && !/^(?:03|05|07|08|09)\d{8}$/.test(data['Số điện thoại'])) addError('Số điện thoại', 'Số điện thoại phải gồm 10 chữ số và đúng đầu số Việt Nam.')

    const foreigner = data['Là người nước ngoài'] === 'Có'
    if (data['Là người nước ngoài'] && !['Có', 'Không'].includes(data['Là người nước ngoài'])) addError('Là người nước ngoài', 'Chỉ chấp nhận Có hoặc Không.', 'Sai danh mục')
    if (foreigner) {
      for (const field of ['Số Visa', 'Ngày hết hạn Visa', 'Số Hộ chiếu', 'Ngày hết hạn Hộ chiếu'] as const) {
        if (!data[field]) addError(field, 'Bắt buộc đối với nhân sự nước ngoài.', 'Thiếu bắt buộc')
      }
      if (data['Số Visa'] && !/^[A-Z0-9-]{5,20}$/i.test(data['Số Visa'])) addError('Số Visa', 'Số Visa phải gồm 5–20 ký tự chữ, số hoặc dấu gạch ngang.')
      if (data['Số Hộ chiếu'] && !/^[A-Z0-9-]{5,20}$/i.test(data['Số Hộ chiếu'])) addError('Số Hộ chiếu', 'Số Hộ chiếu phải gồm 5–20 ký tự chữ, số hoặc dấu gạch ngang.')
      if (data['Ngày hết hạn Visa'] && (!isValidIsoDate(data['Ngày hết hạn Visa']) || data['Ngày hết hạn Visa'] <= today)) addError('Ngày hết hạn Visa', 'Ngày hết hạn Visa phải có dạng YYYY-MM-DD và còn hiệu lực.')
      if (data['Ngày hết hạn Hộ chiếu'] && (!isValidIsoDate(data['Ngày hết hạn Hộ chiếu']) || data['Ngày hết hạn Hộ chiếu'] <= today)) addError('Ngày hết hạn Hộ chiếu', 'Ngày hết hạn Hộ chiếu phải có dạng YYYY-MM-DD và còn hiệu lực.')
    }

    if (data['Đơn vị'] && !allowedUnits.has(data['Đơn vị'])) addError('Đơn vị', `Đơn vị ${data['Đơn vị']} chưa có trong danh mục.`, 'Sai danh mục')
    if (data['Chức vụ'] && !allowedRoles.has(data['Chức vụ'])) addError('Chức vụ', `Chức vụ ${data['Chức vụ']} chưa có trong danh mục.`, 'Sai danh mục')
    if (data['Hợp đồng'] && !allowedContracts.has(data['Hợp đồng'])) addError('Hợp đồng', `Hợp đồng ${data['Hợp đồng']} chưa có trong danh mục.`, 'Sai danh mục')
    if (data['Trạng thái hồ sơ'] && !allowedStatuses.has(data['Trạng thái hồ sơ'])) addError('Trạng thái hồ sơ', `Trạng thái ${data['Trạng thái hồ sơ']} chưa có trong danh mục.`, 'Sai danh mục')
    if (data['Loại nhân sự'] && !['Giảng viên cơ hữu', 'Giảng viên thỉnh giảng', 'Chuyên viên'].includes(data['Loại nhân sự'])) addError('Loại nhân sự', 'Giá trị chưa có trong danh mục.', 'Sai danh mục')
    if (data['Ngạch / hạng chức danh'] && !['Giảng viên hạng III', 'Giảng viên hạng II', 'Chuyên viên'].includes(data['Ngạch / hạng chức danh'])) addError('Ngạch / hạng chức danh', 'Giá trị chưa có trong danh mục.', 'Sai danh mục')
    if (data['Bậc lương'] && !['Bậc 1', 'Bậc 2', 'Bậc 3'].includes(data['Bậc lương'])) addError('Bậc lương', 'Giá trị chưa có trong danh mục.', 'Sai danh mục')
    if (data['Nguồn chi trả'] && !['Ngân sách nhà trường', 'Nguồn dự án', 'Nguồn tự chủ'].includes(data['Nguồn chi trả'])) addError('Nguồn chi trả', 'Giá trị chưa có trong danh mục.', 'Sai danh mục')
    if (data['Trình độ văn hóa'] && !generalEducationOptions.includes(data['Trình độ văn hóa'])) addError('Trình độ văn hóa', 'Giá trị chưa có trong danh mục.', 'Sai danh mục')
    if (data['Trình độ đào tạo'] && !allowedDegrees.has(data['Trình độ đào tạo'])) addError('Trình độ đào tạo', 'Giá trị chưa có trong danh mục.', 'Sai danh mục')
    if (data['Chức danh nghề nghiệp'] && !professionalTitleOptions.includes(data['Chức danh nghề nghiệp'])) addError('Chức danh nghề nghiệp', 'Giá trị chưa có trong danh mục.', 'Sai danh mục')
    if (data['Học hàm / Học vị'] && !academicRankDegreeOptions.includes(data['Học hàm / Học vị'])) addError('Học hàm / Học vị', 'Giá trị chưa có trong danh mục.', 'Sai danh mục')
    if (data['Ngày bắt đầu công tác'] && !isValidIsoDate(data['Ngày bắt đầu công tác'])) addError('Ngày bắt đầu công tác', 'Ngày phải có dạng YYYY-MM-DD và là ngày hợp lệ.')
    if (data['Hệ số lương'] && (!/^\d+(?:\.\d{1,2})?$/.test(data['Hệ số lương']) || Number(data['Hệ số lương']) <= 0 || Number(data['Hệ số lương']) > 20)) addError('Hệ số lương', 'Hệ số lương phải lớn hơn 0, không quá 20.')
    if (data['Phụ cấp chức vụ'] && (!/^\d+(?:\.\d{1,2})?$/.test(data['Phụ cấp chức vụ']) || Number(data['Phụ cấp chức vụ']) < 0)) addError('Phụ cấp chức vụ', 'Phụ cấp chức vụ phải là số không âm.')
    if (data['Phụ cấp thâm niên (%)'] && (!/^\d+(?:\.\d{1,2})?$/.test(data['Phụ cấp thâm niên (%)']) || Number(data['Phụ cấp thâm niên (%)']) < 0 || Number(data['Phụ cấp thâm niên (%)']) > 100)) addError('Phụ cấp thâm niên (%)', 'Phụ cấp thâm niên phải nằm trong khoảng 0–100.')

    if (rowErrors.length > 0) {
      invalidRows.push(...rowErrors)
      return
    }

    const record: PersonnelRecord = {
      code,
      name: data['Họ và tên'],
      unit: data['Đơn vị'],
      degree: data['Trình độ đào tạo'],
      role: data['Chức vụ'],
      contract: data['Hợp đồng'],
      status: data['Trạng thái hồ sơ'],
      gender: data['Giới tính'],
      birthDate: data['Ngày sinh'],
      hometown: data['Quê quán'],
      governmentId,
      taxCode: data['Mã số thuế'],
      bhxhCode: data['Số BHXH'],
      bhytCode: data['Số BHYT'].toUpperCase(),
      email: data.Email.toLowerCase(),
      phone: data['Số điện thoại'],
      address: data['Địa chỉ thường trú'],
      foreigner,
      visaNumber: data['Số Visa'].toUpperCase(),
      visaExpiry: data['Ngày hết hạn Visa'],
      passportNumber: data['Số Hộ chiếu'].toUpperCase(),
      passportExpiry: data['Ngày hết hạn Hộ chiếu'],
      department: data['Bộ môn / phòng ban'],
      personnelType: data['Loại nhân sự'],
      startDate: data['Ngày bắt đầu công tác'],
      professionalRank: data['Ngạch / hạng chức danh'],
      salaryGrade: data['Bậc lương'],
      salaryCoeff: data['Hệ số lương'],
      positionAllowance: data['Phụ cấp chức vụ'],
      seniorityAllowance: data['Phụ cấp thâm niên (%)'],
      paymentSource: data['Nguồn chi trả'],
      generalEdu: data['Trình độ văn hóa'],
      professionalTitle: data['Chức danh nghề nghiệp'],
      academicDegree: data['Học hàm / Học vị'],
    }
    validRows.push(toPersonnelRow(record))
  })

  return buildPersonnelImportAnalysis({ fileName, totalRows: dataRows.length, validRows, invalidRows })
}
