import { useRef, useState, type ChangeEvent } from 'react'
import { AlertCircle, CheckCircle2, FileText, Upload, X } from 'lucide-react'
import * as XLSX from 'xlsx'
import {
  analyzePersonnelWorkbook,
  buildPersonnelImportAnalysis,
  PERSONNEL_IMPORT_HEADERS,
} from './personnelImport'
import type { PersonnelImportAnalysis } from './types'

export function ExcelImportDialog({
  onClose,
  existingRows,
  unitOptions,
  degreeOptions,
  roleOptions,
  contractOptions,
  statusOptions,
  onImport,
}: {
  onClose: () => void
  existingRows: string[][]
  unitOptions: string[]
  degreeOptions: string[]
  contractOptions: string[]
  statusOptions: string[]
  roleOptions: string[]
  onImport: (rows: string[][]) => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [analysis, setAnalysis] = useState<PersonnelImportAnalysis | null>(null)
  const [isParsing, setIsParsing] = useState(false)
  const [importSummary, setImportSummary] = useState<{ fileName: string; importedCount: number } | null>(null)
  const fileUploaded = analysis !== null
  const allValid = analysis?.allValid ?? false
  const validCount = analysis?.validCount ?? 0
  const invalidCount = analysis?.invalidCount ?? 0
  const errorCount = analysis?.errorCount ?? 0
  const invalidRows = analysis?.invalidRows ?? []
  const totalRows = analysis?.totalRows ?? 0

  const resetSelection = () => {
    setAnalysis(null)
    setImportSummary(null)
    setIsParsing(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const openFileChooser = () => {
    if (isParsing) return
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
      fileInputRef.current.click()
    }
  }

  // Build the import template in the browser and download it. The example row
  // uses values present in the current option lists so it imports cleanly.
  const downloadTemplate = () => {
    const exampleByHeader: Record<string, string> = {
      'Mã cán bộ': 'CB2026-9001',
      'Họ và tên': 'Nguyễn Văn Mẫu',
      'Giới tính': 'Nam',
      'Ngày sinh': '1990-01-15',
      'Quê quán': 'Hà Nội',
      'Số CCCD': '001090123456',
      'Mã số thuế': '0101234567',
      'Số BHXH': '0123456789',
      'Số BHYT': 'DN4010123456789',
      Email: 'nguyenvanmau@tlu.edu.vn',
      'Số điện thoại': '0987654321',
      'Địa chỉ thường trú': 'Thanh Trì, Hà Nội',
      'Là người nước ngoài': 'Không',
      'Đơn vị': unitOptions[0] ?? 'Ban Giám hiệu',
      'Bộ môn / phòng ban': 'Phòng Tổ chức cán bộ',
      'Chức vụ': roleOptions[0] ?? 'Chuyên viên',
      'Hợp đồng': contractOptions[0] ?? '',
      'Loại nhân sự': 'Chuyên viên',
      'Ngày bắt đầu công tác': '2020-09-01',
      'Trạng thái hồ sơ': statusOptions[0] ?? 'Đang hoạt động',
      'Ngạch / hạng chức danh': 'Chuyên viên',
      'Bậc lương': 'Bậc 1',
      'Hệ số lương': '2.34',
      'Phụ cấp chức vụ': '0',
      'Phụ cấp thâm niên (%)': '5',
      'Nguồn chi trả': 'Ngân sách nhà trường',
      'Trình độ văn hóa': '12/12',
      'Trình độ đào tạo': 'Đại học',
      'Chức danh nghề nghiệp': 'Chuyên viên',
      'Học hàm / Học vị': 'Cử nhân',
    }
    const worksheet = XLSX.utils.aoa_to_sheet([
      [...PERSONNEL_IMPORT_HEADERS],
      PERSONNEL_IMPORT_HEADERS.map((header) => exampleByHeader[header] ?? ''),
    ])
    worksheet['!cols'] = PERSONNEL_IMPORT_HEADERS.map((header) => ({ wch: Math.max(16, Math.min(28, header.length + 4)) }))
    worksheet['!autofilter'] = { ref: `A1:AH2` }

    const optionalHeaders = new Set(['Số Visa', 'Ngày hết hạn Visa', 'Số Hộ chiếu', 'Ngày hết hạn Hộ chiếu', 'Hợp đồng', 'Phụ cấp chức vụ', 'Phụ cấp thâm niên (%)'])
    const guideRows = [
      ['Tên cột', 'Bắt buộc', 'Hướng dẫn'],
      ...PERSONNEL_IMPORT_HEADERS.map((header) => [
        header,
        optionalHeaders.has(header) ? 'Không / có điều kiện' : 'Có',
        header.includes('Ngày') ? 'Nhập theo định dạng YYYY-MM-DD.'
          : header === 'Là người nước ngoài' ? 'Chỉ nhập Có hoặc Không. Visa và Hộ chiếu bắt buộc khi chọn Có.'
            : header === 'Số CCCD' ? 'Đúng 12 chữ số và không được trùng.'
              : ['Mã cán bộ', 'Mã số thuế', 'Số BHXH', 'Số BHYT', 'Số điện thoại'].includes(header) ? 'Nên đặt định dạng ô là Text để giữ số 0 ở đầu.'
              : header.includes('Phụ cấp') ? 'Nhập số, không kèm ký hiệu % hoặc đơn vị.'
                : 'Không thay đổi tên hoặc thứ tự cột.',
      ]),
      ['', '', 'Ảnh hồ sơ, tài liệu bắt buộc và file bằng cấp không thể nhúng qua mẫu Excel; cần bổ sung sau khi nhập.'],
    ]
    const guideSheet = XLSX.utils.aoa_to_sheet(guideRows)
    guideSheet['!cols'] = [{ wch: 30 }, { wch: 20 }, { wch: 85 }]
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'HoSoNhanSu')
    XLSX.utils.book_append_sheet(workbook, guideSheet, 'HuongDan')
    XLSX.writeFile(workbook, 'personnel-import-template.xlsx')
  }

  const loadFile = (file: File) => {
    setIsParsing(true)
    const reader = new FileReader()

    reader.onload = () => {
      try {
        const result = reader.result
        if (!(result instanceof ArrayBuffer)) {
          throw new Error('Không đọc được dữ liệu nhị phân từ file Excel.')
        }

        const workbook = XLSX.read(result, { type: 'array' })
        const nextAnalysis = analyzePersonnelWorkbook(workbook, file.name, existingRows, {
          unitOptions,
          degreeOptions,
          roleOptions,
          contractOptions,
          statusOptions,
        })
        setAnalysis(nextAnalysis)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Không thể phân tích file Excel đã chọn.'
        setAnalysis(
          buildPersonnelImportAnalysis({
            fileName: file.name,
            totalRows: 0,
            validRows: [],
            invalidRows: [
              {
                row: 'Toàn file',
                name: file.name,
                field: 'Tệp Excel',
                issue: message,
                type: 'Sai cấu trúc',
              },
            ],
          }),
        )
      } finally {
        setIsParsing(false)
      }
    }

    reader.onerror = () => {
      setAnalysis(
        buildPersonnelImportAnalysis({
          fileName: file.name,
          totalRows: 0,
          validRows: [],
          invalidRows: [
            {
              row: 'Toàn file',
              name: file.name,
              field: 'Tệp Excel',
              issue: 'Không thể đọc file đã chọn. Vui lòng chọn lại file Excel hợp lệ.',
              type: 'Sai cấu trúc',
            },
          ],
        }),
      )
      setIsParsing(false)
    }

    reader.readAsArrayBuffer(file)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    loadFile(file)
  }

  const handleImport = () => {
    if (!analysis || !analysis.allValid) return
    onImport(analysis.validRows)
    setImportSummary({ fileName: analysis.fileName, importedCount: analysis.validRows.length })
  }

  if (importSummary) {
    return (
      <section className="w-full max-w-[620px] overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-2xl">
        <header className="flex justify-end px-5 pt-5">
          <button onClick={onClose} className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </header>
        <div className="px-8 pb-8 text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-blue-50 text-blue-700">
            <CheckCircle2 size={34} />
          </div>
          <h1 className="mt-5 text-[21px] font-semibold text-slate-950">Nhập hồ sơ từ Excel thành công</h1>
          <p className="mx-auto mt-2 max-w-[460px] text-[13px] leading-6 text-slate-500">
            Hệ thống đã tạo {importSummary.importedCount} hồ sơ hợp lệ từ file {importSummary.fileName}. Toàn bộ dữ liệu
            đã được nhập.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 text-left">
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-blue-700">Đã nhập</div>
              <div className="mt-1 text-[24px] font-bold text-blue-900">{importSummary.importedCount}</div>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-700">Chưa nhập</div>
              <div className="mt-1 text-[24px] font-bold text-amber-900">0</div>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-blue-700">Tổng dòng</div>
              <div className="mt-1 text-[24px] font-bold text-blue-900">{importSummary.importedCount}</div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
            >
              Về danh sách
            </button>
            <button
              onClick={() => {
                resetSelection()
              }}
              className="rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-semibold text-white hover:bg-blue-800"
            >
              Nhập file khác
            </button>
          </div>
        </div>
      </section>
    )
  }

  if (!fileUploaded) {
    return (
      <section className="w-full max-w-[680px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <input ref={fileInputRef} type="file" accept=".xlsx,.xls" onChange={handleFileChange} className="hidden" />
        <header className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
              <FileText size={20} />
            </div>
            <div>
              <h1 className="text-[18px] font-semibold text-slate-950">Nhập hồ sơ từ Excel</h1>
              <p className="mt-0.5 text-[12.5px] text-slate-500">
                Chọn file Excel theo mẫu để kiểm tra dữ liệu trước khi nhập hàng loạt.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </header>

        <div className="space-y-4 px-6 py-5">
          <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[13px] font-semibold text-blue-900">File mẫu nhập hồ sơ</div>
                <p className="mt-1 text-[12px] leading-5 text-blue-800">
                  Mẫu chi tiết gồm {PERSONNEL_IMPORT_HEADERS.length} cột về định danh, liên hệ, công tác, lương và học vấn.
                  Ảnh cùng file đính kèm được bổ sung sau khi nhập.
                </p>
              </div>
              <button
                onClick={downloadTemplate}
                className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 text-[12.5px] font-semibold text-blue-700 hover:bg-blue-50"
              >
                <FileText size={15} /> Tải file mẫu
              </button>
            </div>
          </div>

          <button
            onClick={openFileChooser}
            className="flex min-h-[220px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 text-center hover:border-blue-300 hover:bg-blue-50/40"
          >
            <div className="grid size-14 place-items-center rounded-full bg-white text-blue-700 shadow-sm">
              <Upload size={24} />
            </div>
            <div className="mt-4 text-[15px] font-semibold text-slate-950">Chọn file Excel để tải lên</div>
            <div className="mt-1 text-[12.5px] text-slate-500">
              Hỗ trợ .xlsx, tối đa 200 hồ sơ/lần. Dữ liệu sẽ được kiểm tra trước khi nhập.
            </div>
            <span className="mt-4 rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-semibold text-white">
              {isParsing ? 'Đang kiểm tra file...' : 'Chọn file Excel'}
            </span>
          </button>
        </div>

        <footer className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
          <div className="text-[12px] text-slate-500">
            {isParsing ? 'Đang đọc file Excel và kiểm tra dữ liệu.' : 'Chưa có file nào được chọn.'}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
            >
              Hủy
            </button>
            <button className="cursor-not-allowed rounded-lg bg-slate-300 px-4 py-2 text-[13px] font-semibold text-white">
              Kiểm tra file
            </button>
          </div>
        </footer>
      </section>
    )
  }

  return (
    <section className="flex h-[calc(100vh-96px)] w-full max-w-[760px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
      <input ref={fileInputRef} type="file" accept=".xlsx,.xls" onChange={handleFileChange} className="hidden" />
      <header className="shrink-0 flex items-start justify-between border-b border-slate-200 px-6 py-5">
        <div className="flex gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600">
            <FileText size={20} />
          </div>
          <div>
            <h1 className="text-[18px] font-semibold text-slate-950">Nhập hồ sơ từ Excel</h1>
            <p className="mt-0.5 text-[12.5px] text-slate-500">
              Tạo nhiều hồ sơ nhân sự bằng file mẫu của Phòng Tổ chức cán bộ.
            </p>
          </div>
        </div>
        <button onClick={onClose} className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100">
          <X size={18} />
        </button>
      </header>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex min-h-[132px] rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex w-full flex-col justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">File mẫu</div>
                <div className="mt-0.5 text-[13.5px] font-semibold text-slate-950">Mẫu nhập hồ sơ nhân sự</div>
                <p className="mt-1 text-[12px] leading-5 text-slate-600">
                  Mẫu gồm {PERSONNEL_IMPORT_HEADERS.length} cột hồ sơ chi tiết và một sheet hướng dẫn cách nhập.
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={downloadTemplate}
                  className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[12.5px] font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <FileText size={15} /> Tải mẫu
                </button>
              </div>
            </div>
          </div>

          <div className="flex min-h-[132px] rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
            <div className="flex w-full flex-col justify-center gap-3">
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">File đã chọn</div>
                <div className="mt-0.5 truncate text-[13.5px] font-semibold text-slate-950">{analysis?.fileName}</div>
                <p className="mt-1 text-[12px] leading-5 text-slate-600">
                  {isParsing
                    ? 'Hệ thống đang đọc dữ liệu và kiểm tra tính hợp lệ của file Excel.'
                    : `Đã chọn file Excel gồm ${totalRows} dòng dữ liệu để kiểm tra trước khi nhập.`}
                </p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-slate-500">
                  <Upload size={13} /> {analysis?.fileName.toLowerCase().endsWith('.xls') ? '.xls' : '.xlsx'}
                </span>
                <button
                  onClick={openFileChooser}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-slate-50"
                >
                  Chọn file Excel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`overflow-hidden rounded-xl border bg-white ${allValid ? 'border-blue-200' : 'border-slate-200'}`}>
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div>
              <div className="text-[13px] font-semibold text-slate-900">Kết quả kiểm tra file</div>
              <div className="text-[11.5px] text-slate-500">
                {allValid
                  ? 'File đạt điều kiện nhập toàn bộ hồ sơ.'
                  : 'File đang có lỗi dữ liệu; cần sửa toàn bộ lỗi trước khi nhập.'}
              </div>
            </div>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${
                allValid ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
              }`}
            >
              {allValid ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
              {allValid ? 'Sẵn sàng nhập' : `${errorCount} lỗi cần xử lý`}
            </span>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[26px] font-bold text-slate-950">
                    {validCount}/{totalRows}
                  </span>
                  <span className="text-[12.5px] font-medium text-slate-600">dòng hợp lệ</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${allValid ? 'bg-blue-700' : 'bg-amber-500'}`}
                    style={{
                      width: `${totalRows > 0 ? Math.max(0, Math.min(100, (validCount / totalRows) * 100)) : 0}%`,
                    }}
                  />
                </div>
                <div className="mt-2 flex items-center gap-4 text-[11.5px] text-slate-500">
                  <span>Tổng {totalRows} dòng dữ liệu</span>
                  {!allValid ? <span>{invalidCount} dòng cần sửa</span> : <span>Không phát hiện dòng lỗi</span>}
                </div>
              </div>

              <div
                className={`min-w-[168px] rounded-xl border px-4 py-3 ${
                  allValid ? 'border-blue-200 bg-blue-50' : 'border-slate-200 bg-white'
                }`}
              >
                <div className={`text-[11px] font-semibold uppercase tracking-wide ${allValid ? 'text-blue-700' : 'text-slate-500'}`}>
                  {allValid ? 'Trạng thái' : 'Cần xử lý'}
                </div>
                <div className={`mt-1 text-[18px] font-bold ${allValid ? 'text-blue-900' : 'text-amber-900'}`}>
                  {allValid ? 'Hợp lệ' : `${errorCount} lỗi`}
                </div>
                <div>
                  <span className={`text-[11.5px] ${allValid ? 'text-blue-700' : 'text-slate-500'}`}>
                    {allValid ? 'Sẵn sàng nhập' : 'Xem bảng lỗi bên dưới'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {allValid ? (
          <div className="overflow-hidden rounded-xl border border-blue-200 bg-white">
            <div className="border-b border-blue-100 bg-blue-50 px-4 py-3">
              <div className="text-[13px] font-semibold text-blue-900">Các kiểm tra đã đạt</div>
              <div className="text-[11.5px] text-blue-700">File đã sẵn sàng để nhập toàn bộ hồ sơ.</div>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4">
              {[
                'Đủ các trường hồ sơ bắt buộc',
                'Không vượt quá 200 hồ sơ trong một file',
                'Đơn vị, chức vụ và trình độ khớp danh mục',
                'Mã cán bộ và CCCD không bị trùng',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50/70 px-3 py-2.5 text-[12.5px] font-medium text-blue-800"
                >
                  <CheckCircle2 size={15} className="shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
              <div>
                <div className="text-[13px] font-semibold text-slate-900">Thông tin không hợp lệ</div>
                <div className="text-[11.5px] text-slate-600">Cần sửa trước khi nhập toàn bộ file.</div>
              </div>
              <button
                onClick={openFileChooser}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-700 hover:bg-slate-50"
              >
                Chọn lại file
              </button>
            </div>
            <div className="grid grid-cols-[0.68fr_1.05fr_1fr_1fr_1.45fr] bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
              <span>Dòng</span>
              <span>Họ tên</span>
              <span>Trường lỗi</span>
              <span>Loại lỗi</span>
              <span>Nội dung lỗi</span>
            </div>
            {invalidRows.map((row) => (
              <div
                key={`${row.row}-${row.field}`}
                className="grid grid-cols-[0.68fr_1.05fr_1fr_1fr_1.45fr] items-center border-t border-slate-100 px-4 py-2.5 text-[12px]"
              >
                <span className="font-semibold text-slate-900">{row.row}</span>
                <span className="font-medium text-slate-900">{row.name}</span>
                <span className="text-slate-700">{row.field}</span>
                <span className="w-fit rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                  {row.type}
                </span>
                <span className="text-slate-600">{row.issue}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="shrink-0 flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
        <div className="text-[12px] text-slate-500">
          {allValid
            ? 'Hệ thống sẽ tạo hồ sơ sau khi xác nhận nhập file.'
            : 'File chỉ được nhập khi toàn bộ dòng dữ liệu đều hợp lệ.'}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
          >
            Hủy
          </button>
          <button
            onClick={handleImport}
            disabled={!allValid || isParsing}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-semibold text-white ${
              allValid && !isParsing ? 'bg-blue-700 hover:bg-blue-800' : 'cursor-not-allowed bg-slate-300'
            }`}
          >
            <CheckCircle2 size={15} /> {allValid ? 'Nhập toàn bộ hồ sơ' : 'Cần sửa file trước khi nhập'}
          </button>
        </div>
      </footer>
    </section>
  )
}
