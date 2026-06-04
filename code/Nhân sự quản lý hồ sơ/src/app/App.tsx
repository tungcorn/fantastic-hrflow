import { useState, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  Banknote,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Edit3,
  FileBadge,
  FileText,
  Flag,
  GraduationCap,
  Info,
  LayoutList,
  Mail,
  MapPin,
  Phone,
  Plus,
  Save,
  Search,
  Trash2,
  Upload,
  UserPlus,
  X,
} from "lucide-react";
import tluLogoIcon from "./tlu-logo-icon.png";

type SidebarItem = { id: string; label: string; icon: ReactNode };

const sidebarItems: SidebarItem[] = [
  { id: "ho-so", label: "Hồ sơ nhân sự", icon: <CircleUserRound size={18} /> },
  { id: "luong", label: "Hệ số lương", icon: <Banknote size={18} /> },
  { id: "phu-cap", label: "Phụ cấp", icon: <FileBadge size={18} /> },
  { id: "hop-dong", label: "Hợp đồng", icon: <FileText size={18} /> },
  { id: "thong-ke", label: "Thống kê", icon: <BookOpen size={18} /> },
];

type StepId = "ca-nhan" | "lien-he" | "cong-tac" | "hoc-van" | "tai-lieu" | "xac-nhan";

const wizardSteps: { id: StepId; label: string; desc: string; icon: ReactNode }[] = [
  { id: "ca-nhan", label: "Thông tin định danh", desc: "Họ tên, ngày sinh, CCCD", icon: <CircleUserRound size={16} /> },
  { id: "lien-he", label: "Liên hệ & quốc tịch", desc: "Email, địa chỉ, visa", icon: <Flag size={16} /> },
  { id: "cong-tac", label: "Công tác & lương", desc: "Đơn vị, chức vụ, hệ số", icon: <Building2 size={16} /> },
  { id: "hoc-van", label: "Trình độ học vấn", desc: "Văn hóa, học vị", icon: <GraduationCap size={16} /> },
  { id: "tai-lieu", label: "Tài liệu đính kèm", desc: "Bằng cấp, quyết định, CCCD", icon: <Award size={16} /> },
  { id: "xac-nhan", label: "Xem lại & xác nhận", desc: "Sinh mã cán bộ", icon: <CheckCircle2 size={16} /> },
];

type FieldState = "default" | "error" | "success";

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="flex items-center gap-1 text-[12px] font-medium text-slate-700">
        {label}
        {required ? <span className="text-red-600">*</span> : null}
      </label>
      {children}
      {error ? (
        <div className="flex items-start gap-1.5 text-[11.5px] text-red-600">
          <AlertCircle size={12} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : hint ? (
        <div className="text-[11.5px] text-slate-500">{hint}</div>
      ) : null}
    </div>
  );
}

function Input({
  value,
  placeholder,
  icon,
  state = "default",
  readOnly,
}: {
  value?: string;
  placeholder?: string;
  icon?: ReactNode;
  state?: FieldState;
  readOnly?: boolean;
}) {
  const ring =
    state === "error"
      ? "border-red-300 focus-within:ring-red-200"
      : state === "success"
      ? "border-emerald-300 focus-within:ring-emerald-200"
      : "border-slate-200 focus-within:ring-blue-200";
  return (
    <div
      className={`flex h-9 items-center gap-2 rounded-lg border bg-white px-2.5 transition focus-within:ring-4 ${ring}`}
    >
      {icon ? <span className="text-slate-400">{icon}</span> : null}
      <input
        defaultValue={value}
        placeholder={placeholder}
        readOnly={readOnly}
        className="min-w-0 flex-1 bg-transparent text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
      />
      {state === "success" ? <CheckCircle2 size={16} className="text-emerald-500" /> : null}
      {state === "error" ? <AlertCircle size={16} className="text-red-500" /> : null}
    </div>
  );
}

function Select({ value, state = "default" }: { value: string; state?: FieldState }) {
  const ring =
    state === "error" ? "border-red-300" : state === "success" ? "border-emerald-300" : "border-slate-200";
  return (
    <button
      type="button"
      className={`flex h-9 w-full items-center justify-between rounded-lg border bg-white px-2.5 text-[13px] text-slate-900 ${ring}`}
    >
      <span>{value}</span>
      <ChevronRight size={16} className="rotate-90 text-slate-400" />
    </button>
  );
}

function FileButton({ label = "Tải PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-2.5 text-[12px] font-medium text-blue-700 hover:bg-blue-100"
    >
      <Upload size={15} /> {label}
    </button>
  );
}

function SectionCard({
  title,
  description,
  icon,
  optional,
  children,
  action,
}: {
  title: string;
  description?: string;
  icon: ReactNode;
  optional?: boolean;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3">
        <div className="flex gap-2.5">
          <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[14px] font-semibold text-slate-900">{title}</h3>
              {optional ? (
                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-500">
                  Không bắt buộc
                </span>
              ) : null}
            </div>
            {description ? (
              <p className="mt-0.5 text-[12px] text-slate-500">{description}</p>
            ) : null}
          </div>
        </div>
        {action}
      </header>
      <div className="px-4 py-4">{children}</div>
    </section>
  );
}

const personnelRows = [
  ["NS001", "Nguyễn Văn An", "Ban Giám hiệu", "Giáo sư", "Hiệu trưởng", "Đang hoạt động", "Đang hoạt động"],
  ["NS002", "Trần Thị Bình", "Khoa CNTT", "Thạc sĩ", "Trưởng khoa", "Đang hoạt động", "Đang hoạt động"],
  ["NS003", "Lê Văn Cường", "Phòng Tổ chức cán bộ", "Phó Giáo sư", "Trợ lý", "Đã thôi việc", "Đã thôi việc"],
  ["NS004", "Phạm Thị Dung", "Ban Giám hiệu", "Tiến sĩ", "Trợ lý", "Chờ gia hạn", "Đang hoạt động"],
  ["NS005", "Hoàng Văn Em", "Khoa Kinh tế", "Phó Giáo sư", "Trưởng khoa", "Đang hoạt động", "Đang hoạt động"],
  ["NS006", "Ngô Thị Phương", "Khoa CNTT", "Tiến sĩ", "Phó trưởng khoa", "Đang hoạt động", "Đang hoạt động"],
  ["NS007", "Đỗ Văn Giang", "Khoa Kinh tế", "Tiến sĩ", "Giảng viên chính", "Chờ gia hạn", "Đang hoạt động"],
  ["NS008", "Vũ Thị Hạnh", "Khoa Kinh tế", "Phó Giáo sư", "Giảng viên", "Đang hoạt động", "Đang hoạt động"],
  ["NS009", "Bùi Văn Khôi", "Khoa CNTT", "Thạc sĩ", "Giảng viên chính", "Đã thôi việc", "Đã thôi việc"],
  ["NS010", "Lý Thị Mai", "Khoa Kinh tế", "Thạc sĩ", "Giảng viên cao cấp", "Đang hoạt động", "Đang hoạt động"],
];

function SelectFilter({ label }: { label: string }) {
  return (
    <button className="flex h-9 min-w-[142px] items-center justify-between rounded-lg border border-slate-300 bg-white px-3 text-[12px] text-slate-500 shadow-sm">
      <span>{label}</span>
      <ChevronDown size={14} className="text-slate-400" />
    </button>
  );
}

function StatusBadge({ value }: { value: string }) {
  const tone =
    value === "Đã thôi việc"
      ? "bg-rose-50 text-rose-600"
      : value === "Chờ gia hạn"
      ? "bg-orange-50 text-orange-600"
      : "bg-emerald-50 text-emerald-600";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${tone}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {value}
    </span>
  );
}

function AddPersonnelButton({
  withMenu,
  menuOpen,
  onToggleMenu,
  onManualAdd,
  onExcelImport,
}: {
  withMenu?: boolean;
  menuOpen?: boolean;
  onToggleMenu?: () => void;
  onManualAdd?: () => void;
  onExcelImport?: () => void;
}) {
  return (
    <div className="flex flex-col items-end">
      <button
        onClick={withMenu ? onToggleMenu : onManualAdd}
        className="flex h-9 items-center gap-2 rounded-lg bg-blue-700 px-3.5 text-[12px] font-semibold text-white shadow-sm hover:bg-blue-800"
      >
        <Plus size={14} />
        Thêm hồ sơ nhân sự
        {withMenu ? <ChevronDown size={14} className={menuOpen ? "rotate-180" : ""} /> : null}
      </button>

      {withMenu && menuOpen ? (
        <div className="relative z-30 mt-1 mb-[-98px] w-[218px] overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 text-left shadow-xl">
          <button
            onClick={onManualAdd}
            className="flex w-full items-start gap-3 px-3.5 py-2.5 text-left hover:bg-blue-50"
          >
            <span className="mt-0.5 grid size-7 place-items-center rounded-lg bg-blue-50 text-blue-700">
              <Plus size={14} />
            </span>
            <span>
              <span className="block text-[12.5px] font-semibold text-slate-900">Thêm thủ công</span>
              <span className="block text-[11px] text-slate-500">Nhập từng hồ sơ qua 6 bước</span>
            </span>
          </button>
          <button
            onClick={onExcelImport}
            className="flex w-full items-start gap-3 px-3.5 py-2.5 text-left hover:bg-blue-50"
          >
            <span className="mt-0.5 grid size-7 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
              <FileText size={14} />
            </span>
            <span>
              <span className="block text-[12.5px] font-semibold text-slate-900">Nhập từ Excel</span>
              <span className="block text-[11px] text-slate-500">Tạo nhiều hồ sơ từ file mẫu</span>
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}

function OrgTree() {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50/40 p-3">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-[13px] font-semibold text-slate-900">Cây đơn vị công tác</div>
          <div className="text-[11.5px] text-slate-500">Chọn đơn vị theo cơ cấu tổ chức</div>
        </div>
        <span className="rounded-full bg-blue-100 px-2 py-1 text-[11px] font-semibold text-blue-700">
          Đã chọn
        </span>
      </div>

      <div className="space-y-1.5 text-[12.5px]">
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 font-semibold text-slate-800">
          <ChevronDown size={14} className="text-slate-500" />
          Trường Đại học Thủy Lợi
        </div>
        <div className="ml-5 space-y-1 border-l border-slate-200 pl-3">
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-slate-600">
            <ChevronRight size={14} className="text-slate-400" />
            Ban Giám hiệu
          </div>
          <div className="rounded-md bg-white p-1.5 ring-1 ring-blue-200">
            <div className="flex items-center gap-2 rounded-md px-2 py-1.5 font-semibold text-blue-700">
              <ChevronDown size={14} />
              Khoa Công nghệ thông tin
            </div>
            <div className="ml-5 mt-1 space-y-1 border-l border-blue-100 pl-3">
              <div className="rounded-md bg-blue-700 px-2 py-1.5 font-semibold text-white">
                Bộ môn Công nghệ phần mềm
              </div>
              <div className="rounded-md px-2 py-1.5 text-slate-600">
                Bộ môn Hệ thống thông tin
              </div>
              <div className="rounded-md px-2 py-1.5 text-slate-600">
                Bộ môn Khoa học máy tính
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-slate-600">
            <ChevronRight size={14} className="text-slate-400" />
            Phòng Tổ chức cán bộ
          </div>
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-slate-600">
            <ChevronRight size={14} className="text-slate-400" />
            Phòng Tài chính - Kế toán
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonnelListBackground({
  addMenuOpen,
  onToggleAddMenu,
  onManualAdd,
  onExcelImport,
}: {
  addMenuOpen?: boolean;
  onToggleAddMenu?: () => void;
  onManualAdd?: () => void;
  onExcelImport?: () => void;
}) {
  return (
    <div className="select-none px-6 py-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-[170px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 shadow-sm">
            <Search size={14} className="text-slate-400" />
            <input
              className="min-w-0 flex-1 bg-transparent text-[12px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
              placeholder="Tìm kiếm"
            />
          </div>
          <SelectFilter label="Đơn vị công tác" />
          <SelectFilter label="Học hàm/học vị" />
          <SelectFilter label="Hợp đồng" />
          <SelectFilter label="Trạng thái" />
        </div>
        <AddPersonnelButton
          withMenu={!!onToggleAddMenu}
          menuOpen={addMenuOpen}
          onToggleMenu={onToggleAddMenu}
          onManualAdd={onManualAdd}
          onExcelImport={onExcelImport}
        />
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="grid grid-cols-[0.7fr_1.2fr_1.35fr_1fr_1fr_1fr_1fr_44px] bg-blue-100 px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-800">
          <span>Mã NS</span>
          <span>Họ tên</span>
          <span>Đơn vị công tác</span>
          <span>Học hàm/học vị</span>
          <span>Chức vụ</span>
          <span>Hợp đồng</span>
          <span>Trạng thái</span>
          <span />
        </div>

        {personnelRows.map(([code, name, unit, degree, role, contract, status]) => (
          <div
            key={code}
            className="grid h-[58px] grid-cols-[0.7fr_1.2fr_1.35fr_1fr_1fr_1fr_1fr_44px] items-center border-b border-slate-100 px-4 text-[12px] text-slate-800 last:border-0"
          >
            <span className="font-mono text-[11px] font-semibold text-slate-700">{code}</span>
            <span className="font-medium">{name}</span>
            <span>{unit}</span>
            <span>{degree}</span>
            <span>{role}</span>
            <span>
              <StatusBadge value={contract} />
            </span>
            <span>
              <StatusBadge value={status} />
            </span>
            <button className="grid size-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-50">
              <Edit3 size={14} />
            </button>
          </div>
        ))}
      </section>

      <div className="mt-4 flex items-center justify-between text-[12px] text-slate-500">
        <span>Hiển thị 10 / 20 hồ sơ nhân sự</span>
        <div className="flex items-center gap-3">
          <button className="h-8 rounded-lg border border-slate-300 bg-white px-3 text-[12px] text-slate-500">
            Trước
          </button>
          <span className="font-medium text-slate-700">Trang 1 / 2</span>
          <button className="h-8 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700">
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}

function ExcelImportDialog({ onClose }: { onClose: () => void }) {
  const [imported, setImported] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [allValid, setAllValid] = useState(false);
  const invalidRows = [
    {
      row: "Dòng 18",
      name: "Phạm Đức Long",
      field: "Số CCCD",
      issue: "Để trống trường bắt buộc",
      type: "Thiếu bắt buộc",
    },
    {
      row: "Dòng 18",
      name: "Phạm Đức Long",
      field: "Ngày sinh",
      issue: "Sai định dạng ngày",
      type: "Sai định dạng",
    },
    {
      row: "Dòng 24",
      name: "Đỗ Mai Anh",
      field: "Email",
      issue: "Email không đúng định dạng",
      type: "Sai định dạng",
    },
    {
      row: "Dòng 24",
      name: "Đỗ Mai Anh",
      field: "Đơn vị công tác",
      issue: "Không khớp danh mục đơn vị",
      type: "Sai danh mục",
    },
    {
      row: "Dòng 31",
      name: "Lê Quốc Bảo",
      field: "Số CCCD",
      issue: "Trùng với hồ sơ NS009",
      type: "Trùng dữ liệu",
    },
  ];
  const validCount = allValid ? 38 : 35;
  const invalidCount = allValid ? 0 : 3;
  const errorCount = allValid ? 0 : 5;

  if (imported) {
    return (
      <section className="w-full max-w-[620px] overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-2xl">
        <header className="flex justify-end px-5 pt-5">
          <button
            onClick={onClose}
            className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </header>
        <div className="px-8 pb-8 text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={34} />
          </div>
          <h1 className="mt-5 text-[21px] font-semibold text-slate-950">
            Nhập hồ sơ từ Excel thành công
          </h1>
          <p className="mx-auto mt-2 max-w-[460px] text-[13px] leading-6 text-slate-500">
            Hệ thống đã tạo {validCount} hồ sơ hợp lệ từ file Danh_sach_nhan_su_moi.xlsx.
            {invalidCount > 0 ? ` ${invalidCount} dòng chưa được nhập do còn ${errorCount} lỗi dữ liệu.` : " Toàn bộ dữ liệu đã được nhập."}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 text-left">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">Đã nhập</div>
              <div className="mt-1 text-[24px] font-bold text-emerald-900">{validCount}</div>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-700">Chưa nhập</div>
              <div className="mt-1 text-[24px] font-bold text-amber-900">{invalidCount}</div>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-blue-700">Tổng dòng</div>
              <div className="mt-1 text-[24px] font-bold text-blue-900">38</div>
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
                setImported(false);
                setFileUploaded(false);
                setAllValid(false);
              }}
              className="rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-semibold text-white hover:bg-blue-800"
            >
              Nhập file khác
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!fileUploaded) {
    return (
      <section className="w-full max-w-[680px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <header className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
              <FileText size={20} />
            </div>
            <div>
              <h1 className="text-[18px] font-semibold text-slate-950">Nhập hồ sơ từ Excel</h1>
              <p className="mt-0.5 text-[12.5px] text-slate-500">
                Chọn file Excel theo mẫu để kiểm tra dữ liệu trước khi nhập hàng loạt.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </header>

        <div className="space-y-4 px-6 py-5">
          <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[13px] font-semibold text-blue-900">File mẫu nhập hồ sơ</div>
                <p className="mt-1 text-[12px] leading-5 text-blue-800">
                  File mẫu giúp thống nhất các cột bắt buộc như họ tên, CCCD, ngày sinh, đơn vị công tác và chức vụ.
                </p>
              </div>
              <button className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 text-[12.5px] font-semibold text-blue-700 hover:bg-blue-50">
                <FileText size={15} /> Tải file mẫu
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              setFileUploaded(true);
              setAllValid(false);
            }}
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
              Chọn file Excel
            </span>
          </button>
        </div>

        <footer className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
          <div className="text-[12px] text-slate-500">Chưa có file nào được chọn.</div>
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
    );
  }

  return (
    <section className="flex h-[calc(100vh-96px)] w-full max-w-[760px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
      <header className="shrink-0 flex items-start justify-between border-b border-slate-200 px-6 py-5">
        <div className="flex gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
            <FileText size={20} />
          </div>
          <div>
            <h1 className="text-[18px] font-semibold text-slate-950">Nhập hồ sơ từ Excel</h1>
            <p className="mt-0.5 text-[12.5px] text-slate-500">
              Tạo nhiều hồ sơ nhân sự bằng file mẫu của Phòng Tổ chức cán bộ.
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
        >
          <X size={18} />
        </button>
      </header>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-5">
        <div className="grid grid-cols-[1fr_1.1fr] gap-4">
          <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[13px] font-semibold text-blue-900">File mẫu</div>
                <p className="mt-1 text-[12px] leading-5 text-blue-800">
                  Mẫu gồm định danh, đơn vị công tác, học vị, hợp đồng và tài liệu cần bổ sung.
                </p>
              </div>
              <button className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 text-[12.5px] font-semibold text-blue-700 hover:bg-blue-50">
                <FileText size={15} /> Tải mẫu
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4">
            <div className="flex min-h-[112px] items-center gap-4 rounded-lg bg-slate-50 px-4">
              <div className="grid size-10 place-items-center rounded-full bg-white text-slate-500 shadow-sm">
                <Upload size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold text-slate-900">
                  Danh_sach_nhan_su_moi.xlsx
                </div>
                <div className="mt-1 text-[11.5px] text-slate-500">Đã chọn · 38 dòng dữ liệu</div>
              </div>
              <button
                onClick={() => setAllValid(true)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-slate-50"
              >
                {allValid ? "Chọn file khác" : "Chọn file đã sửa"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Tổng dòng</div>
            <div className="mt-1 text-[24px] font-bold text-slate-950">38</div>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">Hợp lệ</div>
            <div className="mt-1 text-[24px] font-bold text-emerald-900">{validCount}/38</div>
          </div>
          <div
            className={`rounded-xl border p-4 ${
              allValid ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"
            }`}
          >
            <div
              className={`text-[11px] font-semibold uppercase tracking-wide ${
                allValid ? "text-emerald-700" : "text-amber-700"
              }`}
            >
              Dòng lỗi
            </div>
            <div
              className={`mt-1 text-[24px] font-bold ${
                allValid ? "text-emerald-900" : "text-amber-900"
              }`}
            >
              {invalidCount}
            </div>
          </div>
          <div
            className={`rounded-xl border p-4 ${
              allValid ? "border-emerald-200 bg-emerald-50" : "border-blue-200 bg-blue-50"
            }`}
          >
            <div
              className={`text-[11px] font-semibold uppercase tracking-wide ${
                allValid ? "text-emerald-700" : "text-blue-700"
              }`}
            >
              Tổng lỗi
            </div>
            <div
              className={`mt-1 text-[24px] font-bold ${
                allValid ? "text-emerald-900" : "text-blue-900"
              }`}
            >
              {errorCount}
            </div>
          </div>
        </div>

        <div
          className={`overflow-hidden rounded-xl border bg-white ${
            allValid ? "border-emerald-200" : "border-slate-200"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div>
              <div className="text-[13px] font-semibold text-slate-900">Kết quả kiểm tra file</div>
              <div className="text-[11.5px] text-slate-500">
                {allValid
                  ? "Toàn bộ 38 hồ sơ đạt điều kiện nhập vào hệ thống."
                  : "File có thể nhập một phần, nhưng cần sửa lỗi nếu muốn nhập đủ 38 hồ sơ."}
              </div>
            </div>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${
                allValid ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
              }`}
            >
              {allValid ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
              {allValid ? "Sẵn sàng nhập" : "5 lỗi cần xử lý"}
            </span>
          </div>

          <div className="grid grid-cols-[1fr_1fr] gap-4 p-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="flex items-start gap-3">
                <div className="grid size-9 place-items-center rounded-full bg-white text-emerald-700 shadow-sm">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-emerald-900">Có thể nhập ngay</div>
                  <p className="mt-1 text-[12px] leading-5 text-emerald-800">
                    {allValid
                      ? "38 hồ sơ hợp lệ sẽ được tạo sau khi xác nhận nhập file."
                      : "35 hồ sơ hợp lệ sẽ được tạo nếu chọn nhập phần hợp lệ. Các dòng lỗi không được đưa vào hệ thống."}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`rounded-xl border p-4 ${
                allValid ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`grid size-9 place-items-center rounded-full bg-white shadow-sm ${
                    allValid ? "text-emerald-700" : "text-amber-700"
                  }`}
                >
                  {allValid ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                </div>
                <div>
                  <div className={`text-[13px] font-semibold ${allValid ? "text-emerald-900" : "text-amber-900"}`}>
                    {allValid ? "Không còn lỗi dữ liệu" : "Cần sửa trong file"}
                  </div>
                  <p className={`mt-1 text-[12px] leading-5 ${allValid ? "text-emerald-800" : "text-amber-800"}`}>
                    {allValid
                      ? "Không phát hiện thiếu trường bắt buộc, sai định dạng, sai danh mục hoặc trùng dữ liệu."
                      : "3 dòng đang có lỗi. Xuất danh sách lỗi, sửa file Excel, rồi chọn lại file để kiểm tra lần nữa."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {allValid ? (
          <div className="overflow-hidden rounded-xl border border-emerald-200 bg-white">
            <div className="border-b border-emerald-100 bg-emerald-50 px-4 py-3">
              <div className="text-[13px] font-semibold text-emerald-900">Các kiểm tra đã đạt</div>
              <div className="text-[11.5px] text-emerald-700">File đã sẵn sàng để nhập toàn bộ hồ sơ.</div>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4">
              {[
                "Đủ trường bắt buộc",
                "Định dạng ngày, email, số điện thoại hợp lệ",
                "Đơn vị công tác khớp danh mục",
                "Không phát hiện CCCD trùng",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50/70 px-3 py-2.5 text-[12.5px] font-medium text-emerald-800">
                  <CheckCircle2 size={15} className="shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-amber-200 bg-white">
            <div className="flex items-center justify-between border-b border-amber-100 bg-amber-50 px-4 py-3">
              <div>
                <div className="text-[13px] font-semibold text-amber-900">Thông tin không hợp lệ</div>
                <div className="text-[11.5px] text-amber-700">Cần sửa trước khi nhập toàn bộ file.</div>
              </div>
              <button className="rounded-lg border border-amber-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-amber-700 hover:bg-amber-50">
                Xuất danh sách lỗi
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
                className="grid grid-cols-[0.68fr_1.05fr_1fr_1fr_1.45fr] items-center border-t border-amber-100 px-4 py-2.5 text-[12px]"
              >
                <span className="font-semibold text-amber-800">{row.row}</span>
                <span className="font-medium text-slate-900">{row.name}</span>
                <span className="text-slate-700">{row.field}</span>
                <span className="w-fit rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
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
            ? "Hệ thống sẽ nhập toàn bộ 38 hồ sơ sau khi xác nhận."
            : "Hệ thống chỉ nhập 35 dòng hợp lệ; 3 dòng lỗi được giữ lại để xuất và sửa."}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
          >
            Hủy
          </button>
          <button
            onClick={() => setImported(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-semibold text-white hover:bg-blue-800"
          >
            <CheckCircle2 size={15} /> Nhập {validCount} hồ sơ hợp lệ
          </button>
        </div>
      </footer>
    </section>
  );
}

function LargePersonnelForm({
  foreigner,
  setForeigner,
  duplicateId,
  setDuplicateId,
  showErrors,
  setShowErrors,
  degrees,
  setDegrees,
  certs,
  setCerts,
  onClose,
  onSave,
}: {
  foreigner: boolean;
  setForeigner: (value: boolean | ((value: boolean) => boolean)) => void;
  duplicateId: boolean;
  setDuplicateId: (value: boolean) => void;
  showErrors: boolean;
  setShowErrors: (value: boolean) => void;
  degrees: { name: string; place: string }[];
  setDegrees: (value: { name: string; place: string }[] | ((value: { name: string; place: string }[]) => { name: string; place: string }[])) => void;
  certs: { name: string; place: string }[];
  setCerts: (value: { name: string; place: string }[] | ((value: { name: string; place: string }[]) => { name: string; place: string }[])) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  const hasErrors = showErrors || duplicateId;
  const sections = [
    { id: "identity", label: "Thông tin cá nhân", icon: <CircleUserRound size={15} />, state: hasErrors ? "error" : "done" },
    { id: "contact", label: "Liên hệ & quốc tịch", icon: <Mail size={15} />, state: showErrors ? "error" : "done" },
    { id: "work", label: "Công tác & lương", icon: <Building2 size={15} />, state: showErrors ? "error" : "done" },
    { id: "education", label: "Học vấn", icon: <GraduationCap size={15} />, state: "done" },
    { id: "documents", label: "Tài liệu", icon: <FileText size={15} />, state: showErrors ? "warning" : "done" },
  ];

  return (
    <div className="flex h-[calc(100vh-96px)] w-full max-w-[1260px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
          >
            <ArrowLeft size={17} />
          </button>
          <div>
            <h1 className="text-[17px] font-semibold text-slate-900">Thêm hồ sơ nhân sự</h1>
            <p className="text-[12px] text-slate-500">Form nhập liệu một trang · chia nhóm theo nghiệp vụ hồ sơ</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-medium text-emerald-700 md:inline-flex">
            <CheckCircle2 size={13} /> Đã lưu nháp lúc 09:42
          </span>
          <button
            onClick={onClose}
            className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 bg-slate-50/60">
        <div className="grid h-full grid-cols-[196px_minmax(0,1fr)] gap-4 p-4">
          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-2.5">
            <div className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Nhóm thông tin
            </div>
            <div className="space-y-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2">
                    {section.icon}
                    {section.label}
                  </span>
                  {section.state === "error" ? (
                    <AlertCircle size={14} className="text-red-600" />
                  ) : section.state === "warning" ? (
                    <AlertCircle size={14} className="text-amber-600" />
                  ) : (
                    <CheckCircle2 size={14} className="text-emerald-600" />
                  )}
                </a>
              ))}
            </div>
          </aside>

          <main className="min-h-0 space-y-4 overflow-y-auto overflow-x-hidden pr-1">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-2.5">
              <div className="flex items-center gap-3">
                <div className={`grid size-8 place-items-center rounded-lg ${hasErrors ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
                  {hasErrors ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                </div>
                <div>
                  <div className="text-[12.5px] font-semibold text-slate-900">
                    {hasErrors ? "Còn lỗi cần sửa" : "Sẵn sàng lưu hồ sơ"}
                  </div>
                  <div className="text-[11.5px] text-slate-500">
                    {hasErrors
                      ? "Lỗi được đánh dấu tại trường nhập và nhóm thông tin tương ứng."
                      : "Thông tin đã đủ điều kiện để lưu chính thức."}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 px-3 py-1.5 ring-1 ring-blue-100">
                  <div className="text-[10.5px] font-semibold uppercase tracking-wide text-blue-700">Mã dự kiến</div>
                  <div className="font-mono text-[14px] font-bold text-blue-900">CB2026-0048</div>
                </div>
                <button
                  onClick={() => {
                    setShowErrors(true);
                    setDuplicateId(true);
                  }}
                  className="rounded-lg border border-amber-200 bg-white px-3 py-1.5 text-[12.5px] font-semibold text-amber-700 hover:bg-amber-50"
                >
                  Kiểm tra dữ liệu
                </button>
              </div>
            </div>
            <section id="identity">
              <SectionCard
                title="Thông tin cá nhân"
                description="Thông tin định danh chính theo CCCD và hồ sơ giấy."
                icon={<CircleUserRound size={18} />}
              >
                <div className="grid grid-cols-[112px_1fr] gap-4">
                  <div className="space-y-2">
                    <div className="grid h-[128px] place-items-center rounded-lg border-2 border-dashed border-slate-300 bg-white text-slate-400">
                      <div className="text-center">
                        <Upload size={20} className="mx-auto" />
                        <div className="mt-1 text-[11px]">Tải ảnh 3x4</div>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500">JPG/PNG, tối đa 2MB.</p>
                  </div>
                  <div className="grid min-w-0 grid-cols-2 gap-3">
                    <Field label="Họ và tên" required error={showErrors ? "Họ và tên là trường bắt buộc." : undefined}>
                      <Input value={showErrors ? "" : "Nguyễn Văn A"} state={showErrors ? "error" : "success"} />
                    </Field>
                    <Field label="Giới tính" required>
                      <Select value="Nam" />
                    </Field>
                    <Field label="Ngày sinh" required error={showErrors ? "Ngày sinh không hợp lệ." : undefined}>
                      <Input value={showErrors ? "32/13/2000" : "01/01/2000"} icon={<Calendar size={15} />} state={showErrors ? "error" : "default"} />
                    </Field>
                    <Field label="Quê quán" required>
                      <Input value="Hà Nội" icon={<MapPin size={15} />} />
                    </Field>
                    <div className="col-span-2">
                      <Field
                        label="Số CCCD"
                        required
                        error={hasErrors ? "Đã tồn tại hồ sơ với CCCD này hoặc dữ liệu chưa hợp lệ." : undefined}
                      >
                        <div className="flex gap-2">
                          <div className="min-w-0 flex-1">
                            <Input value={hasErrors ? "001200001900" : "001200001901"} state={hasErrors ? "error" : "success"} />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              if (hasErrors) {
                                setDuplicateId(false);
                                setShowErrors(false);
                              } else {
                                setDuplicateId(true);
                              }
                            }}
                            className="h-10 shrink-0 rounded-lg border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            {hasErrors ? "Dùng CCCD hợp lệ" : "Kiểm tra trùng"}
                          </button>
                        </div>
                      </Field>
                    </div>
                    <Field label="Mã số thuế" required>
                      <Input value="1200001900" />
                    </Field>
                    <Field label="Số BHXH" required>
                      <Input value="00120019" />
                    </Field>
                    <Field label="Số BHYT" required>
                      <Input value="00120019" />
                    </Field>
                  </div>
                </div>
              </SectionCard>
            </section>

            <section id="contact">
              <SectionCard
                title="Liên hệ & quốc tịch"
                description="Thông tin liên hệ và trường bổ sung nếu là cán bộ nước ngoài."
                icon={<Mail size={18} />}
                action={
                  <button
                    type="button"
                    onClick={() => setForeigner((value) => !value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      foreigner ? "bg-blue-700" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block size-5 transform rounded-full bg-white shadow transition ${
                        foreigner ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                }
              >
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Email" required error={showErrors ? "Email không đúng định dạng." : undefined}>
                    <Input value={showErrors ? "nguyenvana@" : "nguyenvana@tlu.edu.vn"} icon={<Mail size={15} />} state={showErrors ? "error" : "default"} />
                  </Field>
                  <Field label="Số điện thoại" required error={showErrors ? "Số điện thoại là trường bắt buộc." : undefined}>
                    <Input value={showErrors ? "" : "0987654321"} icon={<Phone size={15} />} state={showErrors ? "error" : "default"} />
                  </Field>
                  <div className="col-span-2">
                    <Field label="Địa chỉ thường trú" required error={showErrors ? "Vui lòng nhập địa chỉ thường trú." : undefined}>
                      <Input value={showErrors ? "" : "Thanh Trì, Hà Nội"} icon={<MapPin size={15} />} state={showErrors ? "error" : "default"} />
                    </Field>
                  </div>
                  {foreigner ? (
                    <>
                      <Field label="Số Visa" required>
                        <Input placeholder="00-120-019" />
                      </Field>
                      <Field label="Ngày hết hạn Visa" required>
                        <Input placeholder="01/01/2030" icon={<Calendar size={15} />} />
                      </Field>
                      <Field label="Số Hộ chiếu" required>
                        <Input placeholder="00-120-019" />
                      </Field>
                      <Field label="Ngày hết hạn Hộ chiếu" required>
                        <Input placeholder="01/01/2030" icon={<Calendar size={15} />} />
                      </Field>
                    </>
                  ) : (
                    <div className="col-span-2 rounded-lg border border-dashed border-slate-200 bg-white/60 px-4 py-3 text-[13px] text-slate-500">
                      Cán bộ là người Việt Nam, không cần khai thông tin Visa và Hộ chiếu.
                    </div>
                  )}
                </div>
              </SectionCard>
            </section>

            <section id="work">
              <div className="space-y-5">
                <SectionCard
                  title="Công tác"
                  description="Gắn cán bộ mới vào đúng đơn vị, chức vụ và loại nhân sự."
                  icon={<Building2 size={18} />}
                >
                  <div className="grid grid-cols-[260px_1fr] gap-4">
                    <OrgTree />
                    <div className="grid min-w-0 grid-cols-3 gap-3">
                      <Field label="Đơn vị công tác" required hint="Được chọn từ cây tổ chức bên trái">
                        <Select value="Khoa Công nghệ thông tin" state="success" />
                      </Field>
                      <Field label="Bộ môn / phòng ban trực thuộc">
                        <Select value="Bộ môn Công nghệ phần mềm" state="success" />
                      </Field>
                      <Field label="Chức vụ hiện tại" required error={showErrors ? "Vui lòng chọn chức vụ hiện tại." : undefined}>
                        <Select value={showErrors ? "Chưa chọn" : "Giảng viên"} state={showErrors ? "error" : "default"} />
                      </Field>
                      <Field label="Loại nhân sự" required>
                        <Select value="Giảng viên cơ hữu" />
                      </Field>
                      <Field label="Ngày bắt đầu công tác" required>
                        <Input value="01/06/2026" icon={<Calendar size={15} />} />
                      </Field>
                      <Field label="Trạng thái hồ sơ" required>
                        <Select value="Đang hoàn thiện" />
                      </Field>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Lương và phụ cấp dự kiến" icon={<Banknote size={18} />}>
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Ngạch / hạng chức danh" required>
                      <Select value="Giảng viên hạng III" />
                    </Field>
                    <Field label="Bậc lương" required>
                      <Select value="Bậc 1" />
                    </Field>
                    <Field label="Hệ số lương" required error={showErrors ? "Hệ số lương phải là số lớn hơn 0." : undefined}>
                      <Input value={showErrors ? "abc" : "2.34"} state={showErrors ? "error" : "success"} />
                    </Field>
                    <Field label="Phụ cấp chức vụ">
                      <Input value="0.00" />
                    </Field>
                    <Field label="Phụ cấp thâm niên">
                      <Input value="0%" />
                    </Field>
                    <Field label="Nguồn chi trả" required>
                      <Select value="Ngân sách nhà trường" />
                    </Field>
                  </div>
                </SectionCard>
              </div>
            </section>

            <section id="education">
              <SectionCard title="Trình độ học vấn" icon={<GraduationCap size={18} />}>
                <div className="grid grid-cols-4 gap-3">
                  <Field label="Trình độ văn hóa" required>
                    <Select value="12/12" />
                  </Field>
                  <Field label="Trình độ đào tạo" required>
                    <Select value="Tiến sĩ" />
                  </Field>
                  <Field label="Chức danh nghề nghiệp" required>
                    <Input value="Tiến sĩ" />
                  </Field>
                  <Field label="Học hàm / Học vị" required>
                    <Input value="Tiến sĩ" />
                  </Field>
                </div>
              </SectionCard>
            </section>

            <section id="documents">
              <div className="space-y-5">
                <SectionCard
                  title="Tài liệu bắt buộc"
                  description="Các tài liệu phải có trước khi lưu hồ sơ chính thức."
                  icon={<FileText size={18} />}
                >
                  <div className="grid grid-cols-4 gap-2.5">
                    {[
                      ["CCCD/CMND bản scan", "Đã tải lên", "success"],
                      ["Quyết định tuyển dụng", showErrors ? "Chưa có" : "Đã tải lên", showErrors ? "warn" : "success"],
                      ["Sơ yếu lý lịch", "Đã tải lên", "success"],
                      ["Ảnh thẻ 3x4", "Đã tải lên", "success"],
                    ].map(([name, status, tone]) => (
                      <div
                        key={name}
                        className={`rounded-lg border px-3 py-2.5 ${
                          tone === "success" ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"
                        }`}
                      >
                        <div className="text-[12.5px] font-semibold text-slate-900">{name}</div>
                        <div className={`mt-0.5 text-[12px] ${tone === "success" ? "text-emerald-700" : "text-amber-700"}`}>
                          {status}
                        </div>
                        <div className="mt-2">
                          <FileButton label={tone === "success" ? "Thay file" : "Tải lên"} />
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                  <div className="grid grid-cols-2 gap-4">
                  <SectionCard
                    title="Bằng cấp"
                    icon={<Award size={18} />}
                    action={
                      <button
                        type="button"
                        onClick={() => setDegrees((items) => [...items, { name: "", place: "" }])}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-blue-700 hover:bg-blue-50"
                      >
                        <Plus size={13} /> Thêm
                      </button>
                    }
                  >
                    <div className="overflow-hidden rounded-lg border border-slate-200">
                      <div className="grid grid-cols-[1.1fr_1fr_64px_40px] bg-slate-50 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                        <span>Tên bằng</span>
                        <span>Nơi cấp</span>
                        <span>File</span>
                        <span />
                      </div>
                      {degrees.map((d, i) => (
                        <div key={`${d.name}-${i}`} className="grid grid-cols-[1.1fr_1fr_64px_40px] items-center border-t border-slate-100 px-3 py-2.5 text-[12px]">
                          <span className="font-medium text-slate-900">{d.name || "Bằng mới"}</span>
                          <span className="text-slate-600">{d.place || "Chưa nhập"}</span>
                          <button className="inline-flex h-8 items-center justify-center rounded-md bg-blue-50 px-2 text-[11px] font-semibold text-blue-700">
                            PDF
                          </button>
                          <button
                            onClick={() => setDegrees((items) => items.filter((_, idx) => idx !== i))}
                            className="grid size-8 place-items-center rounded-md text-red-500 hover:bg-red-50"
                            aria-label="Xóa bằng cấp"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </SectionCard>

                  <SectionCard
                    title="Chứng chỉ"
                    icon={<FileBadge size={18} />}
                    optional
                    action={
                      <button
                        type="button"
                        onClick={() => setCerts((items) => [...items, { name: "", place: "" }])}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-blue-700 hover:bg-blue-50"
                      >
                        <Plus size={13} /> Thêm
                      </button>
                    }
                  >
                    <div className="overflow-hidden rounded-lg border border-slate-200">
                      <div className="grid grid-cols-[1.1fr_1fr_64px_40px] bg-slate-50 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                        <span>Tên chứng chỉ</span>
                        <span>Nơi cấp</span>
                        <span>File</span>
                        <span />
                      </div>
                      {certs.map((c, i) => (
                        <div key={`${c.name}-${i}`} className="grid grid-cols-[1.1fr_1fr_64px_40px] items-center border-t border-slate-100 px-3 py-2.5 text-[12px]">
                          <span className="font-medium text-slate-900">{c.name || "Chứng chỉ mới"}</span>
                          <span className="text-slate-600">{c.place || "Chưa nhập"}</span>
                          <button className="inline-flex h-8 items-center justify-center rounded-md bg-blue-50 px-2 text-[11px] font-semibold text-blue-700">
                            PDF
                          </button>
                          <button
                            onClick={() => setCerts((items) => items.filter((_, idx) => idx !== i))}
                            className="grid size-8 place-items-center rounded-md text-red-500 hover:bg-red-50"
                            aria-label="Xóa chứng chỉ"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                </div>
              </div>
            </section>
          </main>

        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-white px-6 py-3.5">
        <div className="flex items-center gap-2 text-[12.5px] text-slate-500">
          {hasErrors ? (
            <span className="inline-flex items-center gap-1 text-red-700">
              <AlertCircle size={14} /> Vui lòng sửa các trường đang báo lỗi trước khi lưu chính thức.
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-emerald-700">
              <CheckCircle2 size={14} /> Form đã được kiểm tra, có thể lưu hồ sơ.
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
          >
            Hủy
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50">
            <Save size={15} /> Lưu nháp
          </button>
          <button
            onClick={() => {
              if (!hasErrors) {
                onSave();
              }
            }}
            disabled={hasErrors}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-semibold text-white ${
              hasErrors ? "cursor-not-allowed bg-slate-300" : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            <UserPlus size={15} /> Lưu hồ sơ chính thức
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewBlock({
  title,
  stepIndex,
  onEdit,
  rows,
}: {
  title: string;
  stepIndex: number;
  onEdit: () => void;
  rows: { label: string; value: string; warn?: string }[];
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full bg-blue-700 text-[11px] font-bold text-white">
            {stepIndex}
          </span>
          <h3 className="text-[14px] font-semibold text-slate-900">{title}</h3>
        </div>
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-1 text-[12.5px] font-medium text-blue-700 hover:text-blue-800"
        >
          <Edit3 size={13} /> Sửa
        </button>
      </div>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-3 px-5 py-4 text-[13px]">
        {rows.map((r) => (
          <div key={r.label} className="flex flex-col">
            <dt className="text-[12px] text-slate-500">{r.label}</dt>
            <dd className="font-medium text-slate-900">{r.value}</dd>
            {r.warn ? (
              <div className="mt-0.5 flex items-center gap-1 text-[11.5px] text-amber-700">
                <AlertCircle size={12} /> {r.warn}
              </div>
            ) : null}
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function App() {
  const [foreigner, setForeigner] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const [duplicateId, setDuplicateId] = useState(false);
  const [validationAttempted, setValidationAttempted] = useState<Record<number, boolean>>({});
  const [saved, setSaved] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [addMenuOpen, setAddMenuOpen] = useState(true);
  const [excelImportOpen, setExcelImportOpen] = useState(false);
  const [degrees, setDegrees] = useState([
    { name: "Bằng Cử nhân chuyên ngành Kỹ thuật phần mềm", place: "Trường Đại học Thủy lợi" },
    { name: "Bằng Kỹ sư Khoa học máy tính", place: "Trường Đại học Thủy lợi" },
  ]);
  const [certs, setCerts] = useState([{ name: "IELTS 7.5", place: "British Council" }]);

  const goto = (idx: number) => {
    if (idx <= currentStep || completed[idx - 1]) setCurrentStep(idx);
  };
  const next = () => {
    if (!validationAttempted[currentStep] && currentStep < wizardSteps.length - 1) {
      setValidationAttempted((v) => ({ ...v, [currentStep]: true }));
      return;
    }
    setCompleted((c) => ({ ...c, [currentStep]: true }));
    setCurrentStep((s) => Math.min(s + 1, wizardSteps.length - 1));
  };
  const back = () => setCurrentStep((s) => Math.max(s - 1, 0));
  const openManualAdd = () => {
    setModalOpen(true);
    setAddMenuOpen(false);
    setExcelImportOpen(false);
  };
  const closeModal = () => {
    setModalOpen(false);
    setAddMenuOpen(true);
    setExcelImportOpen(false);
  };
  const openExcelImport = () => {
    setModalOpen(false);
    setAddMenuOpen(false);
    setExcelImportOpen(true);
  };
  const closeExcelImport = () => {
    setExcelImportOpen(false);
    setAddMenuOpen(true);
  };

  const isLast = currentStep === wizardSteps.length - 1;
  const showStepError = !!validationAttempted[currentStep];
  const validationMessage =
    currentStep === 0
      ? "Có 3 lỗi ở thông tin định danh: thiếu họ tên, sai ngày sinh, CCCD trùng."
      : currentStep === 1
      ? "Có lỗi ở thông tin liên hệ. Vui lòng kiểm tra email, số điện thoại và địa chỉ."
      : currentStep === 2
      ? "Có lỗi ở công tác & lương. Vui lòng chọn chức vụ và nhập hệ số lương hợp lệ."
      : currentStep === 3
      ? "Có lỗi ở trình độ học vấn. Vui lòng chọn trình độ đào tạo."
      : currentStep === 4
      ? "Thiếu tài liệu bắt buộc: Quyết định tuyển dụng."
      : "";

  if (saved) {
    return (
      <div className="min-h-screen bg-white font-['Be_Vietnam_Pro'] text-slate-900">
        <div className="flex min-h-screen overflow-hidden bg-white">
          <aside className="w-[252px] shrink-0 border-r border-slate-200 bg-white">
            <div className="flex items-center gap-3 px-5 py-4">
              <div className="grid size-9 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-blue-100">
                <img src={tluLogoIcon} alt="TLU" className="size-8 object-contain" />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-slate-950">Quản lý nhân sự</div>
                <div className="text-[11px] text-slate-500">Trường Đại học Thủy Lợi</div>
              </div>
            </div>
            <nav className="px-3 py-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  className={`mb-1 flex h-9 w-full items-center gap-2 rounded-lg px-3 text-[13px] transition ${
                    item.id === "ho-so"
                      ? "bg-blue-50 font-semibold text-blue-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 flex-1 bg-slate-50">
            <header className="flex h-[58px] items-center justify-between border-b border-slate-200 bg-white px-6">
              <div className="flex items-center gap-3 text-[13px] font-medium text-slate-800">
                <LayoutList size={16} />
                <span>Hồ sơ nhân sự</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-px bg-slate-200" />
                <div className="grid size-9 place-items-center rounded-lg border border-slate-300 bg-white text-slate-700">
                  <CircleUserRound size={19} />
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-slate-950">Trưởng phòng TCCB</div>
                  <div className="text-[11px] text-slate-500">Nhân sự phòng TCCB</div>
                </div>
                <ChevronDown size={14} className="text-slate-500" />
              </div>
            </header>

            <div className="relative min-h-[calc(100vh-58px)] overflow-hidden bg-white">
              <div className="opacity-25">
                <PersonnelListBackground />
              </div>
              <div className="absolute inset-0 grid place-items-center p-6">
                <section className="w-full max-w-[620px] rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-2xl">
                  <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={34} />
                  </div>
                  <h1 className="mt-5 text-[22px] font-semibold text-slate-950">
                    Hồ sơ nhân sự đã được tạo
                  </h1>
                  <p className="mt-2 text-[13px] leading-6 text-slate-500">
                    Hệ thống đã lưu hồ sơ của Nguyễn Văn A và sinh mã cán bộ chính thức.
                  </p>
                  <div className="mx-auto mt-5 w-fit rounded-xl bg-blue-50 px-5 py-3 ring-1 ring-blue-100">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-blue-700">
                      Mã cán bộ
                    </div>
                    <div className="mt-1 font-mono text-[20px] font-bold text-blue-900">
                      CB2026-0048
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center gap-3">
                    <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 hover:bg-slate-50">
                      Xem hồ sơ
                    </button>
                    <button
                      onClick={() => {
                        setSaved(false);
                        setCurrentStep(0);
                        setCompleted({});
                        setDuplicateId(false);
                        setValidationAttempted({});
                        setModalOpen(true);
                        setAddMenuOpen(false);
                        setExcelImportOpen(false);
                      }}
                      className="rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-semibold text-white hover:bg-blue-800"
                    >
                      Thêm hồ sơ khác
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Be_Vietnam_Pro'] text-slate-900">
      <div className="flex min-h-screen overflow-hidden bg-white">
        {/* App sidebar */}
        <aside className="w-[252px] shrink-0 border-r border-slate-200 bg-white">
          <div className="flex items-center gap-3 px-5 py-4">
            <div className="grid size-9 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-blue-100">
              <img src={tluLogoIcon} alt="TLU" className="size-8 object-contain" />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-slate-950">Quản lý nhân sự</div>
              <div className="text-[11px] text-slate-500">Trường Đại học Thủy Lợi</div>
            </div>
          </div>
          <nav className="px-3 py-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                className={`mb-1 flex h-9 w-full items-center gap-2 rounded-lg px-3 text-[13px] transition ${
                  item.id === "ho-so"
                    ? "bg-blue-50 font-semibold text-blue-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1 bg-slate-50">
          <header className="flex h-[58px] items-center justify-between border-b border-slate-200 bg-white px-6">
            <div className="flex items-center gap-3 text-[13px] font-medium text-slate-800">
              <LayoutList size={16} />
              <span>Hồ sơ nhân sự</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-px bg-slate-200" />
              <div className="grid size-9 place-items-center rounded-lg border border-slate-300 bg-white text-slate-700">
                <CircleUserRound size={19} />
              </div>
              <div>
                <div className="text-[12px] font-semibold text-slate-950">Trưởng phòng TCCB</div>
                <div className="text-[11px] text-slate-500">Nhân sự phòng TCCB</div>
              </div>
              <ChevronDown size={14} className="text-slate-500" />
            </div>
          </header>

          <div className="relative min-h-[calc(100vh-58px)] overflow-hidden bg-white">
            {modalOpen ? (
              <>
                <div className="opacity-25">
                  <PersonnelListBackground />
                </div>

                <div className="absolute inset-0 flex items-start justify-center p-6 pt-7">
                  <LargePersonnelForm
                    foreigner={foreigner}
                    setForeigner={setForeigner}
                    duplicateId={duplicateId}
                    setDuplicateId={setDuplicateId}
                    showErrors={!!validationAttempted[0]}
                    setShowErrors={(value) =>
                      setValidationAttempted((current) => ({
                        ...current,
                        0: value,
                        1: value,
                        2: value,
                        3: value,
                        4: value,
                      }))
                    }
                    degrees={degrees}
                    setDegrees={setDegrees}
                    certs={certs}
                    setCerts={setCerts}
                    onClose={closeModal}
                    onSave={() => setSaved(true)}
                  />
                  {false ? (
              <div className="flex h-[calc(100vh-112px)] w-full max-w-[1180px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
                {/* Modal header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={closeModal}
                      className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
                    >
                      <ArrowLeft size={17} />
                    </button>
                    <div>
                      <h1 className="text-[18px] font-semibold text-slate-900">Thêm hồ sơ nhân sự</h1>
                      <p className="text-[12px] text-slate-500">
                        Bước {currentStep + 1}/{wizardSteps.length} · {wizardSteps[currentStep].label}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-medium text-emerald-700 md:inline-flex">
                      <CheckCircle2 size={13} /> Đã lưu nháp lúc 09:42
                    </span>
                    <button
                      onClick={closeModal}
                      className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Stepper bar */}
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                  <div className="flex items-center">
                    {wizardSteps.map((s, i) => {
                      const done = !!completed[i];
                      const active = i === currentStep;
                      const reachable = i <= currentStep || completed[i - 1];
                      return (
                        <div key={s.id} className="flex flex-1 items-center">
                          <button
                            onClick={() => goto(i)}
                            disabled={!reachable}
                            className={`group flex items-center gap-2.5 text-left ${
                              reachable ? "cursor-pointer" : "cursor-not-allowed opacity-60"
                            }`}
                          >
                            <span
                              className={`grid size-8 shrink-0 place-items-center rounded-full text-[12px] font-bold transition ${
                                active
                                  ? "bg-blue-700 text-white ring-4 ring-blue-100"
                                  : done
                                  ? "bg-emerald-500 text-white"
                                  : "bg-white text-slate-500 ring-1 ring-slate-300"
                              }`}
                            >
                              {done ? <CheckCircle2 size={16} /> : i + 1}
                            </span>
                            <div className="hidden md:block">
                              <div
                                className={`text-[12.5px] font-semibold ${
                                  active ? "text-blue-700" : done ? "text-slate-800" : "text-slate-500"
                                }`}
                              >
                                {s.label}
                              </div>
                              <div className="text-[11px] text-slate-500">{s.desc}</div>
                            </div>
                          </button>
                          {i < wizardSteps.length - 1 ? (
                            <div
                              className={`mx-3 h-px flex-1 ${
                                completed[i] ? "bg-emerald-300" : "bg-slate-200"
                              }`}
                            />
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step body */}
                <div className="min-h-0 flex-1 space-y-5 overflow-y-auto bg-slate-50/50 p-5">
                  {currentStep === 0 ? (
                    <>
                      <SectionCard
                        title="Thông tin định danh"
                        description="Các thông tin nhận diện chính theo hồ sơ giấy."
                        icon={<CircleUserRound size={18} />}
                      >
                        <div className="flex gap-5">
                          <div className="w-[140px] shrink-0 space-y-2">
                            <div className="grid h-[160px] place-items-center rounded-lg border-2 border-dashed border-slate-300 bg-white text-slate-400">
                              <div className="text-center">
                                <Upload size={20} className="mx-auto" />
                                <div className="mt-1 text-[11px]">Tải ảnh 3x4</div>
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-500">JPG/PNG, tối đa 2MB.</p>
                          </div>
                          <div className="grid flex-1 grid-cols-2 gap-4">
                            <Field label="Họ và tên" required>
                              <Input value={showStepError ? "" : "Nguyễn Văn A"} state={showStepError ? "error" : "success"} />
                              {showStepError ? (
                                <div className="flex items-start gap-1.5 text-[12px] text-red-600">
                                  <AlertCircle size={13} className="mt-0.5 shrink-0" />
                                  <span>Họ và tên là trường bắt buộc.</span>
                                </div>
                              ) : null}
                            </Field>
                            <Field label="Giới tính" required>
                              <Select value="Nam" />
                            </Field>
                            <Field
                              label="Ngày sinh"
                              required
                              hint={showStepError ? undefined : "Định dạng dd/mm/yyyy"}
                              error={showStepError ? "Ngày sinh không hợp lệ." : undefined}
                            >
                              <Input value={showStepError ? "32/13/2000" : "01/01/2000"} icon={<Calendar size={15} />} state={showStepError ? "error" : "default"} />
                            </Field>
                            <Field label="Quê quán" required>
                              <Input value="Hà Nội" icon={<MapPin size={15} />} />
                            </Field>
                            <Field
                              label="Số CCCD"
                              required
                              error={duplicateId || showStepError ? "Đã tồn tại hồ sơ với CCCD này. Vui lòng kiểm tra lại." : undefined}
                            >
                              <div className="flex gap-2">
                                <div className="min-w-0 flex-1">
                                  <Input
                                    value={duplicateId || showStepError ? "001200001900" : "001200001901"}
                                    state={duplicateId || showStepError ? "error" : "success"}
                                  />
                                </div>
                                <button
                                  type="button"
                                  className={`h-10 shrink-0 rounded-lg border px-3 text-[12px] font-semibold ${
                                    duplicateId || showStepError
                                      ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                      : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                                  }`}
                                  onClick={() => {
                                    if (duplicateId || showStepError) {
                                      setDuplicateId(false);
                                      setValidationAttempted((v) => ({ ...v, 0: false }));
                                    } else {
                                      setDuplicateId(true);
                                    }
                                  }}
                                >
                                  {duplicateId || showStepError ? "Dùng CCCD hợp lệ" : "Kiểm tra trùng"}
                                </button>
                              </div>
                            </Field>
                            <Field label="Mã số thuế" required>
                              <Input value="1200001900" />
                            </Field>
                            <Field label="Số bảo hiểm xã hội" required>
                              <Input value="00120019" />
                            </Field>
                            <Field label="Số bảo hiểm y tế" required>
                              <Input value="00120019" />
                            </Field>
                          </div>
                        </div>
                      </SectionCard>
                    </>
                  ) : null}

                  {currentStep === 1 ? (
                    <>
                      <SectionCard
                        title="Thông tin liên hệ"
                        description="Thông tin dùng để liên lạc và gửi thông báo từ hệ thống."
                        icon={<Mail size={18} />}
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <Field
                            label="Email"
                            required
                            error={showStepError ? "Email không đúng định dạng." : undefined}
                          >
                            <Input value={showStepError ? "nguyenvana@" : "nguyenvana@tlu.edu.vn"} icon={<Mail size={15} />} state={showStepError ? "error" : "default"} />
                          </Field>
                          <Field
                            label="Số điện thoại"
                            required
                            error={showStepError ? "Số điện thoại là trường bắt buộc." : undefined}
                          >
                            <Input value={showStepError ? "" : "0987654321"} icon={<Phone size={15} />} state={showStepError ? "error" : "default"} />
                          </Field>
                          <div className="col-span-2">
                            <Field
                              label="Địa chỉ thường trú"
                              required
                              error={showStepError ? "Vui lòng nhập địa chỉ thường trú." : undefined}
                            >
                              <Input value={showStepError ? "" : "Thanh Trì, Hà Nội"} icon={<MapPin size={15} />} state={showStepError ? "error" : "default"} />
                            </Field>
                          </div>
                        </div>
                      </SectionCard>

                      <SectionCard
                        title="Người nước ngoài"
                        description="Bật khi cán bộ mang quốc tịch nước ngoài."
                        icon={<Flag size={18} />}
                        optional
                        action={
                          <button
                            type="button"
                            onClick={() => setForeigner((v) => !v)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                              foreigner ? "bg-blue-700" : "bg-slate-300"
                            }`}
                          >
                            <span
                              className={`inline-block size-5 transform rounded-full bg-white shadow transition ${
                                foreigner ? "translate-x-5" : "translate-x-0.5"
                              }`}
                            />
                          </button>
                        }
                      >
                        {foreigner ? (
                          <div className="grid grid-cols-2 gap-4">
                            <Field label="Số Visa" required error={showStepError ? "Số Visa là trường bắt buộc." : undefined}>
                              <Input placeholder="00-120-019" state={showStepError ? "error" : "default"} />
                            </Field>
                            <Field label="Ngày hết hạn Visa" required>
                              <Input placeholder="01/01/2030" icon={<Calendar size={15} />} />
                            </Field>
                            <Field label="Số Hộ chiếu" required>
                              <Input placeholder="00-120-019" />
                            </Field>
                            <Field label="Ngày hết hạn Hộ chiếu" required>
                              <Input placeholder="01/01/2030" icon={<Calendar size={15} />} />
                            </Field>
                            <div className="col-span-2 flex items-end gap-3">
                              <div className="flex-1">
                                <Field label="Số giấy phép lao động" required>
                                  <Input placeholder="00-120-019" />
                                </Field>
                              </div>
                              <div className="flex-1">
                                <Field label="Ngày hết hạn giấy phép lao động" required>
                                  <Input placeholder="01/01/2030" icon={<Calendar size={15} />} />
                                </Field>
                              </div>
                              <FileButton />
                            </div>
                          </div>
                        ) : (
                          <div className="rounded-lg border border-dashed border-slate-200 bg-white/60 px-4 py-3 text-[13px] text-slate-500">
                            Cán bộ là người Việt Nam — không cần khai thông tin Visa, Hộ chiếu, Giấy
                            phép lao động.
                          </div>
                        )}
                      </SectionCard>
                    </>
                  ) : null}

                  {currentStep === 2 ? (
                    <>
                      <SectionCard
                        title="Thông tin công tác"
                        description="Gắn cán bộ mới vào đúng đơn vị, chức vụ và loại nhân sự."
                        icon={<Building2 size={18} />}
                      >
                        <div className="grid grid-cols-[320px_1fr] gap-5">
                          <OrgTree />
                          <div className="grid grid-cols-2 gap-4">
                            <Field label="Đơn vị công tác" required hint="Được chọn từ cây tổ chức bên trái">
                              <Select value="Khoa Công nghệ thông tin" state="success" />
                            </Field>
                            <Field label="Bộ môn / phòng ban trực thuộc">
                              <Select value="Bộ môn Công nghệ phần mềm" state="success" />
                            </Field>
                            <Field
                              label="Chức vụ hiện tại"
                              required
                              error={showStepError ? "Vui lòng chọn chức vụ hiện tại." : undefined}
                            >
                              <Select value={showStepError ? "Chưa chọn" : "Giảng viên"} state={showStepError ? "error" : "default"} />
                            </Field>
                            <Field label="Loại nhân sự" required>
                              <Select value="Giảng viên cơ hữu" />
                            </Field>
                            <Field label="Ngày bắt đầu công tác" required>
                              <Input value="01/06/2026" icon={<Calendar size={15} />} />
                            </Field>
                            <Field label="Trạng thái hồ sơ" required>
                              <Select value="Đang hoàn thiện" />
                            </Field>
                          </div>
                        </div>
                      </SectionCard>
                      <SectionCard
                        title="Lương và phụ cấp dự kiến"
                        description="Dữ liệu này giúp Phòng TCKT có thể tra cứu ngay sau khi hồ sơ được duyệt."
                        icon={<Banknote size={18} />}
                      >
                        <div className="grid grid-cols-3 gap-4">
                          <Field label="Ngạch / hạng chức danh" required>
                            <Select value="Giảng viên hạng III" />
                          </Field>
                          <Field label="Bậc lương" required>
                            <Select value="Bậc 1" />
                          </Field>
                          <Field
                            label="Hệ số lương"
                            required
                            error={showStepError ? "Hệ số lương phải là số lớn hơn 0." : undefined}
                          >
                            <Input value={showStepError ? "abc" : "2.34"} state={showStepError ? "error" : "success"} />
                          </Field>
                          <Field label="Phụ cấp chức vụ">
                            <Input value="0.00" />
                          </Field>
                          <Field label="Phụ cấp thâm niên">
                            <Input value="0%" />
                          </Field>
                          <Field label="Nguồn chi trả" required>
                            <Select value="Ngân sách nhà trường" />
                          </Field>
                        </div>
                      </SectionCard>
                    </>
                  ) : null}

                  {currentStep === 3 ? (
                    <SectionCard title="Trình độ học vấn" icon={<GraduationCap size={18} />}>
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Trình độ văn hóa" required>
                          <Select value="12/12" />
                        </Field>
                        <Field
                          label="Trình độ đào tạo"
                          required
                          error={showStepError ? "Vui lòng chọn trình độ đào tạo." : undefined}
                        >
                          <Select value={showStepError ? "Chưa chọn" : "Tiến sĩ"} state={showStepError ? "error" : "default"} />
                        </Field>
                        <Field label="Chức danh nghề nghiệp" required>
                          <Input value="Tiến sĩ" />
                        </Field>
                        <Field label="Học hàm / Học vị" required>
                          <Input value="Tiến sĩ" />
                        </Field>
                      </div>
                    </SectionCard>
                  ) : null}

                  {currentStep === 4 ? (
                    <>
                      <SectionCard
                        title="Tài liệu bắt buộc"
                        description="Các tài liệu này phải có trước khi lưu hồ sơ chính thức."
                        icon={<FileText size={18} />}
                      >
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            ["CCCD/CMND bản scan", "Đã tải lên", "success"],
                            ["Quyết định tuyển dụng", showStepError ? "Chưa có" : "Đã tải lên", showStepError ? "warn" : "success"],
                            ["Sơ yếu lý lịch", "Đã tải lên", "success"],
                            ["Ảnh thẻ 3x4", "Đã tải lên", "success"],
                          ].map(([name, status, tone]) => (
                            <div
                              key={name}
                              className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
                                tone === "success"
                                  ? "border-emerald-200 bg-emerald-50"
                                  : "border-amber-200 bg-amber-50"
                              }`}
                            >
                              <div>
                                <div className="text-[13px] font-semibold text-slate-900">{name}</div>
                                <div
                                  className={`text-[12px] ${
                                    tone === "success" ? "text-emerald-700" : "text-amber-700"
                                  }`}
                                >
                                  {status}
                                </div>
                              </div>
                              <FileButton label={tone === "success" ? "Thay file" : "Tải lên"} />
                            </div>
                          ))}
                        </div>
                      </SectionCard>

                      <div className="grid grid-cols-2 gap-5">
                        <SectionCard
                          title="Thông tin bằng cấp"
                          description="Danh sách bằng cấp đã đính kèm."
                          icon={<Award size={18} />}
                          action={
                            <button
                              type="button"
                              onClick={() => setDegrees((d) => [...d, { name: "", place: "" }])}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-blue-700 hover:bg-blue-50"
                            >
                              <Plus size={13} /> Thêm
                            </button>
                          }
                        >
                          <div className="overflow-hidden rounded-lg border border-slate-200">
                            <div className="grid grid-cols-[1.1fr_1fr_64px_40px] bg-slate-50 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                              <span>Tên bằng</span>
                              <span>Nơi cấp</span>
                              <span>File</span>
                              <span />
                            </div>
                            {degrees.map((d, i) => (
                              <div
                                key={`${d.name}-${i}`}
                                className="grid grid-cols-[1.1fr_1fr_64px_40px] items-center border-t border-slate-100 px-3 py-2.5 text-[12px]"
                              >
                                <span className="font-medium text-slate-900">{d.name || "Bằng mới"}</span>
                                <span className="text-slate-600">{d.place || "Chưa nhập"}</span>
                                <button className="inline-flex h-8 items-center justify-center rounded-md bg-blue-50 px-2 text-[11px] font-semibold text-blue-700">
                                  PDF
                                </button>
                                {degrees.length > 1 ? (
                                  <button
                                    onClick={() => setDegrees((arr) => arr.filter((_, idx) => idx !== i))}
                                    className="grid size-8 place-items-center rounded-md text-red-500 hover:bg-red-50"
                                    aria-label="Xóa bằng cấp"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                ) : (
                                  <span />
                                )}
                              </div>
                            ))}
                          </div>
                        </SectionCard>

                        <SectionCard
                          title="Thông tin chứng chỉ"
                          description="Các chứng chỉ chuyên môn hoặc ngoại ngữ."
                          icon={<FileBadge size={18} />}
                          optional
                          action={
                            <button
                              type="button"
                              onClick={() => setCerts((c) => [...c, { name: "", place: "" }])}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-blue-700 hover:bg-blue-50"
                            >
                              <Plus size={13} /> Thêm
                            </button>
                          }
                        >
                          <div className="overflow-hidden rounded-lg border border-slate-200">
                            <div className="grid grid-cols-[1.1fr_1fr_64px_40px] bg-slate-50 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                              <span>Tên chứng chỉ</span>
                              <span>Nơi cấp</span>
                              <span>File</span>
                              <span />
                            </div>
                            {certs.map((c, i) => (
                              <div
                                key={`${c.name}-${i}`}
                                className="grid grid-cols-[1.1fr_1fr_64px_40px] items-center border-t border-slate-100 px-3 py-2.5 text-[12px]"
                              >
                                <span className="font-medium text-slate-900">{c.name || "Chứng chỉ mới"}</span>
                                <span className="text-slate-600">{c.place || "Chưa nhập"}</span>
                                <button className="inline-flex h-8 items-center justify-center rounded-md bg-blue-50 px-2 text-[11px] font-semibold text-blue-700">
                                  PDF
                                </button>
                                {certs.length > 1 ? (
                                  <button
                                    onClick={() => setCerts((arr) => arr.filter((_, idx) => idx !== i))}
                                    className="grid size-8 place-items-center rounded-md text-red-500 hover:bg-red-50"
                                    aria-label="Xóa chứng chỉ"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                ) : (
                                  <span />
                                )}
                              </div>
                            ))}
                          </div>
                        </SectionCard>
                      </div>
                    </>
                  ) : null}

                  {currentStep === 5 ? (
                    <>
                      <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4">
                        <div className="flex items-start gap-3">
                          <Info size={18} className="mt-0.5 text-blue-700" />
                          <div className="flex-1">
                            <div className="text-[14px] font-semibold text-blue-900">
                              Xem lại trước khi lưu chính thức
                            </div>
                            <p className="mt-0.5 text-[12.5px] text-blue-800">
                              Kiểm tra lại các thông tin bên dưới. Nhấn <b>Sửa</b> để quay lại bước
                              tương ứng. Sau khi lưu, mã cán bộ chính thức sẽ được sinh.
                            </p>
                          </div>
                          <div className="rounded-lg bg-white px-3 py-2 text-center ring-1 ring-blue-200">
                            <div className="text-[10.5px] font-medium uppercase tracking-wide text-blue-700">
                              Mã dự kiến
                            </div>
                            <div className="font-mono text-[15px] font-bold text-blue-900">
                              CB2026-0048
                            </div>
                          </div>
                        </div>
                      </div>

                      <ReviewBlock
                        title="Thông tin định danh"
                        stepIndex={1}
                        onEdit={() => setCurrentStep(0)}
                        rows={[
                          { label: "Họ và tên", value: "Nguyễn Văn A" },
                          { label: "Giới tính", value: "Nam" },
                          { label: "Ngày sinh", value: "01/01/2000" },
                          { label: "Quê quán", value: "Hà Nội" },
                          {
                            label: "Số CCCD",
                            value: duplicateId ? "001200001900" : "001200001901",
                            warn: duplicateId ? "CCCD đang trùng — cần xác nhận trước khi lưu" : undefined,
                          },
                          { label: "Mã số thuế", value: "1200001900" },
                        ]}
                      />
                      <ReviewBlock
                        title="Liên hệ & quốc tịch"
                        stepIndex={2}
                        onEdit={() => setCurrentStep(1)}
                        rows={[
                          { label: "Email", value: "nguyenvana@tlu.edu.vn" },
                          { label: "Số điện thoại", value: "0987654321" },
                          { label: "Địa chỉ", value: "Thanh Trì, Hà Nội" },
                          { label: "Quốc tịch", value: foreigner ? "Nước ngoài" : "Việt Nam" },
                        ]}
                      />
                      <ReviewBlock
                        title="Công tác & lương"
                        stepIndex={3}
                        onEdit={() => setCurrentStep(2)}
                        rows={[
                          { label: "Đơn vị công tác", value: "Khoa Công nghệ thông tin" },
                          { label: "Bộ môn", value: "Bộ môn Công nghệ phần mềm" },
                          { label: "Chức vụ", value: "Giảng viên" },
                          { label: "Loại nhân sự", value: "Giảng viên cơ hữu" },
                          { label: "Hệ số lương", value: "2.34" },
                          { label: "Nguồn chi trả", value: "Ngân sách nhà trường" },
                        ]}
                      />
                      <ReviewBlock
                        title="Trình độ học vấn"
                        stepIndex={4}
                        onEdit={() => setCurrentStep(3)}
                        rows={[
                          { label: "Trình độ văn hóa", value: "12/12" },
                          { label: "Trình độ đào tạo", value: "Tiến sĩ" },
                          { label: "Chức danh nghề nghiệp", value: "Tiến sĩ" },
                          { label: "Học hàm / Học vị", value: "Tiến sĩ" },
                        ]}
                      />
                      <ReviewBlock
                        title="Tài liệu đính kèm"
                        stepIndex={5}
                        onEdit={() => setCurrentStep(4)}
                        rows={[
                          { label: "Tài liệu bắt buộc", value: "4/4 đã tải lên" },
                          { label: "Số bằng cấp", value: `${degrees.length} bằng đã đính kèm` },
                          { label: "Số chứng chỉ", value: `${certs.length} chứng chỉ` },
                        ]}
                      />
                    </>
                  ) : null}
                </div>

                {/* Sticky footer */}
                <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-white px-6 py-3.5">
                  <div className="flex items-center gap-2 text-[12.5px] text-slate-500">
                    {showStepError ? (
                      <span className="inline-flex items-center gap-1 text-red-700">
                        <AlertCircle size={14} /> {validationMessage}
                      </span>
                    ) : isLast ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700">
                        <CheckCircle2 size={14} /> Thông tin đã sẵn sàng để lưu chính thức.
                      </span>
                    ) : (
                      <>
                        Bước {currentStep + 1}/{wizardSteps.length} ·{" "}
                        <button className="font-medium text-blue-700 hover:underline">Lưu nháp</button>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {currentStep > 0 ? (
                      <button
                        onClick={back}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <ArrowLeft size={15} /> Quay lại
                      </button>
                    ) : (
                      <button
                        onClick={closeModal}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Hủy
                      </button>
                    )}
                    <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50">
                      <Save size={15} /> Lưu nháp
                    </button>
                    {isLast ? (
                      <button
                        onClick={() => {
                          if (!duplicateId) setSaved(true);
                        }}
                        disabled={duplicateId}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium text-white ${
                          duplicateId
                            ? "cursor-not-allowed bg-slate-300"
                            : "bg-blue-700 hover:bg-blue-800"
                        }`}
                      >
                        <UserPlus size={15} /> Lưu hồ sơ chính thức
                      </button>
                    ) : (
                      <button
                        onClick={next}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-medium text-white hover:bg-blue-800"
                      >
                        Tiếp tục <ArrowRight size={15} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
                  ) : null}
                </div>
              </>
            ) : (
              <PersonnelListBackground
                addMenuOpen={addMenuOpen}
                onToggleAddMenu={() => setAddMenuOpen((open) => !open)}
                onManualAdd={openManualAdd}
                onExcelImport={openExcelImport}
              />
            )}
            {excelImportOpen ? (
              <>
                <div className="absolute inset-0 bg-white/70" />
                <div className="absolute inset-0 grid place-items-center p-6">
                  <ExcelImportDialog onClose={closeExcelImport} />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
