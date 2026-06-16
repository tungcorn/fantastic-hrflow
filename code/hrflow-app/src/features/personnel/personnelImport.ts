import * as XLSX from 'xlsx'
import type { PersonnelRow, PersonnelImportInvalidRow, PersonnelImportAnalysis } from './types'

export const PERSONNEL_IMPORT_HEADERS = [
  'Mã cán bộ',
  'Họ và tên',
  'Đơn vị',
  'Trình độ',
  'Chức danh',
  'Hợp đồng',
  'Trạng thái',
] as const
export const PERSONNEL_IMPORT_TEMPLATE_PATH = '/templates/personnel-import-template.xlsx'
export const PERSONNEL_IMPORT_MAX_ROWS = 200

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
  validRows: PersonnelRow[]
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
      invalidRows: [
        {
          row: 'Toàn file',
          name: fileName,
          field: 'Worksheet',
          issue: 'Không tìm thấy sheet dữ liệu trong file Excel.',
          type: 'Sai cấu trúc',
        },
      ],
    })
  }

  const sheetRows = XLSX.utils.sheet_to_json<(string | number | boolean | null)[]>(worksheet, {
    header: 1,
    raw: false,
    defval: '',
    blankrows: false,
  })
  const headerRow = (sheetRows[0] ?? []).slice(0, PERSONNEL_IMPORT_HEADERS.length).map(normalizeExcelCell)
  const headersValid =
    headerRow.length === PERSONNEL_IMPORT_HEADERS.length &&
    PERSONNEL_IMPORT_HEADERS.every((header, index) => headerRow[index] === header)
  const dataRows = sheetRows.slice(1)

  if (!headersValid) {
    return buildPersonnelImportAnalysis({
      fileName,
      totalRows: dataRows.length,
      validRows: [],
      invalidRows: [
        {
          row: 'Dòng 1',
          name: fileName,
          field: 'Tiêu đề cột',
          issue: `Tiêu đề phải đúng thứ tự: ${PERSONNEL_IMPORT_HEADERS.join(', ')}.`,
          type: 'Sai cấu trúc',
        },
      ],
    })
  }

  if (dataRows.length === 0) {
    return buildPersonnelImportAnalysis({
      fileName,
      totalRows: 0,
      validRows: [],
      invalidRows: [
        {
          row: 'Toàn file',
          name: fileName,
          field: 'Dữ liệu',
          issue: 'File chưa có dòng hồ sơ nhân sự nào để nhập.',
          type: 'Thiếu dữ liệu',
        },
      ],
    })
  }

  if (dataRows.length > PERSONNEL_IMPORT_MAX_ROWS) {
    return buildPersonnelImportAnalysis({
      fileName,
      totalRows: dataRows.length,
      validRows: [],
      invalidRows: [
        {
          row: 'Toàn file',
          name: fileName,
          field: 'Số lượng hồ sơ',
          issue: `Mỗi lần chỉ nhập tối đa ${PERSONNEL_IMPORT_MAX_ROWS} hồ sơ. File hiện có ${dataRows.length} dòng dữ liệu.`,
          type: 'Vượt giới hạn',
        },
      ],
    })
  }

  const existingCodes = new Set(existingRows.map((row) => normalizeExcelCell(row[0])))
  const allowedUnits = new Set(options.unitOptions.map(normalizeExcelCell))
  const allowedDegrees = new Set(options.degreeOptions.map(normalizeExcelCell))
  const allowedContracts = new Set(options.contractOptions.map(normalizeExcelCell))
  const allowedStatuses = new Set(options.statusOptions.map(normalizeExcelCell))
  const firstSeenCodeRow = new Map<string, number>()
  const invalidRows: PersonnelImportInvalidRow[] = []
  const validRows: PersonnelRow[] = []

  dataRows.forEach((rawRow, rowIndex) => {
    const excelRowNumber = rowIndex + 2
    const normalizedRow = PERSONNEL_IMPORT_HEADERS.map((_, columnIndex) =>
      normalizeExcelCell(rawRow[columnIndex]),
    ) as PersonnelRow
    const [code, name, unit, degree, , contract, status] = normalizedRow
    const rowErrors: PersonnelImportInvalidRow[] = []
    const rowLabel = `Dòng ${excelRowNumber}`
    const displayName = name || code || 'Chưa có họ tên'

    normalizedRow.forEach((value, columnIndex) => {
      if (value) return
      rowErrors.push({
        row: rowLabel,
        name: displayName,
        field: PERSONNEL_IMPORT_HEADERS[columnIndex],
        issue: 'Để trống trường bắt buộc.',
        type: 'Thiếu bắt buộc',
      })
    })

    if (code) {
      if (existingCodes.has(code)) {
        rowErrors.push({
          row: rowLabel,
          name: displayName,
          field: 'Mã cán bộ',
          issue: `Mã cán bộ ${code} đã tồn tại trong danh sách hiện có.`,
          type: 'Trùng dữ liệu',
        })
      }

      const firstSeenRow = firstSeenCodeRow.get(code)
      if (firstSeenRow) {
        rowErrors.push({
          row: rowLabel,
          name: displayName,
          field: 'Mã cán bộ',
          issue: `Mã cán bộ ${code} bị lặp trong file, trùng với dòng ${firstSeenRow}.`,
          type: 'Trùng dữ liệu',
        })
      } else {
        firstSeenCodeRow.set(code, excelRowNumber)
      }
    }

    if (unit && !allowedUnits.has(unit)) {
      rowErrors.push({
        row: rowLabel,
        name: displayName,
        field: 'Đơn vị',
        issue: `Đơn vị ${unit} chưa có trong danh mục hiện tại.`,
        type: 'Sai danh mục',
      })
    }

    if (degree && !allowedDegrees.has(degree)) {
      rowErrors.push({
        row: rowLabel,
        name: displayName,
        field: 'Trình độ',
        issue: `Trình độ ${degree} chưa có trong danh mục hiện tại.`,
        type: 'Sai danh mục',
      })
    }

    if (contract && !allowedContracts.has(contract)) {
      rowErrors.push({
        row: rowLabel,
        name: displayName,
        field: 'Hợp đồng',
        issue: `Giá trị ${contract} không khớp các trạng thái hợp đồng đang dùng.`,
        type: 'Sai danh mục',
      })
    }

    if (status && !allowedStatuses.has(status)) {
      rowErrors.push({
        row: rowLabel,
        name: displayName,
        field: 'Trạng thái',
        issue: `Giá trị ${status} không khớp các trạng thái hồ sơ đang dùng.`,
        type: 'Sai danh mục',
      })
    }

    if (rowErrors.length > 0) {
      invalidRows.push(...rowErrors)
      return
    }

    validRows.push(normalizedRow)
  })

  return buildPersonnelImportAnalysis({
    fileName,
    totalRows: dataRows.length,
    validRows,
    invalidRows,
  })
}
