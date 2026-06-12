import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  Banknote,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Download,
  Edit3,
  Eye,
  FileBadge,
  FileText,
  Flag,
  GraduationCap,
  LayoutList,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Plus,
  RotateCcw,
  Save,
  Search,
  ShieldCheck,
  Trash2,
  Upload,
  UserPlus,
  X,
} from "lucide-react";
import tluLogoIcon from "./tlu-logo-icon.png";

type View = "ho-so" | "hop-dong" | "co-cau" | "luong-phu-cap" | "tai-khoan";
type SidebarItem = { id: View; label: string; icon: ReactNode };

const sidebarItems: SidebarItem[] = [
  { id: "ho-so", label: "Hồ sơ nhân sự", icon: <CircleUserRound size={17} /> },
  { id: "hop-dong", label: "Hợp đồng lao động", icon: <FileText size={17} /> },
  { id: "co-cau", label: "Cơ cấu tổ chức", icon: <Building2 size={17} /> },
  { id: "luong-phu-cap", label: "Phụ cấp và hệ số lương", icon: <BarChart3 size={17} /> },
  { id: "tai-khoan", label: "Tài khoản", icon: <ShieldCheck size={17} /> },
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
      className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-[12px] font-medium text-slate-700 hover:bg-slate-50"
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

type ContractFrame = "list" | "create" | "renew" | "terminate";
type ContractStatus = "Còn hiệu lực" | "Sắp hết hạn" | "Chờ gia hạn" | "Hết hiệu lực";
type OptionTone = "default" | "success" | "warning" | "danger" | "disabled";
type DropdownOption = { label: string; description?: string; tone?: OptionTone; disabled?: boolean };

const summaryCards = [
  { label: "Hợp đồng còn hiệu lực", value: "328", tone: "emerald", icon: <FileText size={18} /> },
  { label: "Sắp hết hạn trong 30 ngày", value: "12", tone: "amber", icon: <Clock3 size={18} /> },
  { label: "Chờ gia hạn", value: "7", tone: "orange", icon: <RotateCcw size={18} /> },
  { label: "Đã hết hiệu lực", value: "45", tone: "slate", icon: <AlertCircle size={18} /> },
];

type ContractRow = {
  number: string;
  code: string;
  name: string;
  type: string;
  start: string;
  end: string;
  status: ContractStatus;
  remaining: string;
};

const contractRows: ContractRow[] = [
  {
    number: "HĐLĐ-2026-0142",
    code: "CB2021-0034",
    name: "Nguyễn Văn An",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "31/12/2026",
    status: "Còn hiệu lực",
    remaining: "216 ngày",
  },
  {
    number: "HĐLĐ-2025-0098",
    code: "CB2022-0118",
    name: "Trần Thị Bình",
    type: "Xác định thời hạn 36 tháng",
    start: "01/07/2023",
    end: "30/06/2026",
    status: "Sắp hết hạn",
    remaining: "26 ngày",
  },
  {
    number: "HĐLĐ-2024-0211",
    code: "CB2020-0072",
    name: "Lê Văn Cường",
    type: "Xác định thời hạn 24 tháng",
    start: "15/06/2024",
    end: "14/06/2026",
    status: "Chờ gia hạn",
    remaining: "10 ngày",
  },
  {
    number: "HĐLĐ-2023-0047",
    code: "CB2019-0015",
    name: "Phạm Thị Dung",
    type: "Hợp đồng thử việc",
    start: "01/03/2023",
    end: "31/05/2023",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-0031",
    code: "CB2024-0190",
    name: "Hoàng Văn Em",
    type: "Xác định thời hạn 12 tháng",
    start: "01/02/2026",
    end: "31/01/2027",
    status: "Còn hiệu lực",
    remaining: "245 ngày",
  },
];

const contractTypeOptions: DropdownOption[] = [
  { label: "Xác định thời hạn", description: "Áp dụng 12–36 tháng", tone: "success" },
  { label: "Không xác định thời hạn", description: "Không yêu cầu ngày kết thúc", tone: "success" },
  { label: "Thử việc", description: "Ngừng sử dụng cho hợp đồng mới" },
];

const statusOptions: DropdownOption[] = [
  { label: "Chưa có hiệu lực", description: "Ngày hiệu lực ở tương lai" },
  { label: "Còn hiệu lực", description: "Đang áp dụng", tone: "success" },
  { label: "Sắp hết hạn", description: "Còn dưới 30 ngày", tone: "warning" },
  { label: "Chờ gia hạn", description: "Đang trong thời gian xử lý", tone: "warning" },
  { label: "Hết hiệu lực", description: "Đã kết thúc", tone: "danger" },
];

const unitOptions: DropdownOption[] = [
  { label: "Phòng Tổ chức - Cán bộ", description: "Khối hành chính" },
  { label: "Phòng Tài chính - Kế toán", description: "Khối hành chính" },
  { label: "Khoa Công nghệ thông tin", description: "Đơn vị đào tạo" },
  { label: "Khoa Kinh tế và Quản lý", description: "Đơn vị đào tạo" },
];

const personnelOptions: DropdownOption[] = [
  { label: "CB2022-0118 · Trần Thị Bình", description: "Khoa CNTT · Hợp đồng sắp hết hạn", tone: "warning" },
  { label: "CB2024-0190 · Hoàng Văn Em", description: "Khoa Kinh tế · Chưa có hợp đồng mới", tone: "success" },
  { label: "CB2019-0015 · Phạm Thị Dung", description: "Đã hết hiệu lực · cần kiểm tra hồ sơ", tone: "danger" },
];

const reasonOptions: DropdownOption[] = [
  { label: "Theo quyết định của Nhà trường", description: "Có file quyết định kèm theo" },
  { label: "Theo thỏa thuận hai bên", description: "Cần biên bản xác nhận" },
  { label: "Nhân sự xin nghỉ việc", description: "Kiểm tra hồ sơ thôi việc", tone: "warning" },
];

function StatusBadge({ value }: { value: ContractStatus | string }) {
  const tone =
    value === "Đã thôi việc" || value === "Hết hiệu lực"
      ? "bg-rose-50 text-rose-600"
      : value === "Chờ gia hạn"
      ? "bg-amber-50 text-amber-700"
      : value === "Sắp hết hạn"
      ? "bg-orange-50 text-orange-600"
      : "bg-emerald-50 text-emerald-600";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${tone}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {value}
    </span>
  );
}

function optionToneClass() {
  return "border-transparent bg-white text-slate-700 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950";
}

function ExpandedSelect({
  label,
  value,
  options,
  width = "w-[220px]",
  searchable,
  hideLabelWhenSelected,
  activeWhenSelected,
  onChange,
}: {
  label: string;
  value: string;
  options: DropdownOption[];
  width?: string;
  searchable?: boolean;
  hideLabelWhenSelected?: boolean;
  activeWhenSelected?: boolean;
  onChange?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const hasSelectedValue = selected.trim().length > 0;
  const activeTrigger = activeWhenSelected && hasSelectedValue;
  const visibleOptions = searchable
    ? options.filter((option) => `${option.label} ${option.description ?? ""}`.toLowerCase().includes(query.toLowerCase()))
    : options;

  useEffect(() => {
    setSelected(value);
  }, [value]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${open ? "z-50" : "z-0"} ${width} shrink-0`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`flex min-h-9 w-full items-start justify-between gap-2 border bg-white px-3 py-2 text-left text-[12px] shadow-sm ${
          activeTrigger
            ? "rounded-2xl border-[#8EC5FF] font-semibold text-[#1447E6]"
            : "rounded-lg text-slate-700"
        } ${
          open ? "border-blue-300 ring-4 ring-blue-100" : activeTrigger ? "" : "border-slate-300"
        }`}
      >
        <span className="min-w-0 flex-1 whitespace-normal break-words leading-5">
          {!hideLabelWhenSelected || !hasSelectedValue ? <span className="text-slate-400">{label}: </span> : null}
          {selected}
        </span>
        <ChevronDown size={14} className={`mt-0.5 shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
      <div className="absolute left-0 top-[42px] z-50 w-full rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
        {searchable ? (
          <div className="mb-2 flex h-8 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2">
            <Search size={13} className="text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[12px] placeholder:text-slate-400 focus:outline-none"
              placeholder="Gõ để tìm..."
            />
          </div>
        ) : null}
        <div className="space-y-1">
          {visibleOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => {
                setSelected(option.label);
                onChange?.(option.label);
                setOpen(false);
                setQuery("");
              }}
              className={`flex w-full items-center justify-between gap-3 rounded-lg border px-2.5 py-2 text-left text-[12px] ${optionToneClass()}`}
            >
              <span className="min-w-0 flex-1 whitespace-normal break-words font-medium">{option.label}</span>
            </button>
          ))}
          {visibleOptions.length === 0 ? <div className="rounded-lg bg-slate-50 px-2.5 py-2 text-[12px] text-slate-500">Không có kết quả phù hợp.</div> : null}
        </div>
      </div>
      ) : null}
    </div>
  );
}

function SummaryCards() {
  const toneMap: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
    orange: "bg-orange-50 text-orange-700 ring-orange-100",
    slate: "bg-slate-100 text-slate-600 ring-slate-200",
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {summaryCards.map((card) => (
        <section key={card.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[12px] font-medium text-slate-500">{card.label}</p>
              <div className="mt-2 text-[26px] font-semibold leading-none text-slate-950">{card.value}</div>
            </div>
            <div className={`grid size-10 place-items-center rounded-xl ring-1 ${toneMap[card.tone]}`}>{card.icon}</div>
          </div>
        </section>
      ))}
    </div>
  );
}

function ContractFilters() {
  const [keyword, setKeyword] = useState("");
  const [contractType, setContractType] = useState("Xác định thời hạn");
  const [status, setStatus] = useState("Sắp hết hạn");
  const [expiryDate, setExpiryDate] = useState("30/06/2026");
  const [unit, setUnit] = useState("Khoa CNTT");
  const hasActiveFilters = [keyword, contractType, status, expiryDate, unit].some((item) => item.trim().length > 0);

  const clearFilters = () => {
    setKeyword("");
    setContractType("");
    setStatus("");
    setExpiryDate("");
    setUnit("");
  };

  return (
    <section className="relative z-20">
      <div className="flex flex-wrap items-center gap-2">
        <div
          className={`flex h-9 w-[310px] items-center gap-2 border bg-white px-3 shadow-sm ${
            keyword.trim().length > 0 ? "rounded-2xl border-[#8EC5FF]" : "rounded-lg border-slate-300"
          }`}
        >
          <Search size={14} className="text-slate-400" />
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            className={`min-w-0 flex-1 bg-transparent text-[12px] placeholder:text-slate-400 focus:outline-none ${
              keyword.trim().length > 0 ? "font-semibold text-[#1447E6]" : "text-slate-900"
            }`}
            placeholder="Tìm theo mã cán bộ, họ tên, số hợp đồng..."
          />
        </div>
        <ExpandedSelect label="Loại hợp đồng" value={contractType} options={contractTypeOptions} width="w-[185px]" hideLabelWhenSelected activeWhenSelected onChange={setContractType} />
        <ExpandedSelect label="Trạng thái" value={status} options={statusOptions} width="w-[155px]" hideLabelWhenSelected activeWhenSelected onChange={setStatus} />
        <div
          className={`flex h-9 w-[145px] items-center gap-2 border bg-white px-3 shadow-sm ${
            expiryDate.trim().length > 0 ? "rounded-2xl border-[#8EC5FF]" : "rounded-lg border-slate-300"
          }`}
        >
          <Calendar size={14} className="text-slate-400" />
          <input
            value={expiryDate}
            onChange={(event) => setExpiryDate(event.target.value)}
            className={`min-w-0 flex-1 bg-transparent text-[12px] placeholder:text-slate-400 focus:outline-none ${
              expiryDate.trim().length > 0 ? "font-semibold text-[#1447E6]" : "text-slate-900"
            }`}
            placeholder="Ngày hết hạn"
          />
        </div>
        <ExpandedSelect label="Đơn vị" value={unit} options={unitOptions} width="w-[260px]" searchable hideLabelWhenSelected activeWhenSelected onChange={setUnit} />
        {hasActiveFilters ? (
          <button onClick={clearFilters} className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 text-[12px] font-semibold text-slate-600 shadow-sm hover:bg-slate-50">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M1.625 6.5C1.625 7.46418 1.91091 8.40672 2.44659 9.2084C2.98226 10.0101 3.74363 10.6349 4.63442 11.0039C5.52521 11.3729 6.50541 11.4694 7.45107 11.2813C8.39672 11.0932 9.26536 10.6289 9.94715 9.94715C10.6289 9.26536 11.0932 8.39672 11.2813 7.45107C11.4694 6.50541 11.3729 5.52521 11.0039 4.63442C10.6349 3.74363 10.0101 2.98226 9.2084 2.44659C8.40672 1.91091 7.46418 1.625 6.5 1.625C5.13714 1.63013 3.82903 2.16191 2.84917 3.10917L1.625 4.33333" stroke="#45556C" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1.625 1.625V4.33333H4.33333" stroke="#45556C" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Xóa lọc
          </button>
        ) : null}
      </div>
    </section>
  );
}

function ContractTable({ compact = false, onOpenFrame, onViewContract }: { compact?: boolean; onOpenFrame?: (frame: ContractFrame) => void; onViewContract?: (contract: ContractRow) => void }) {
  const [openActionFor, setOpenActionFor] = useState<string | null>(null);

  return (
    <section className="relative z-0 rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-[1.15fr_0.8fr_1.1fr_1.15fr_0.85fr_0.85fr_0.95fr_0.8fr_1fr] rounded-t-xl bg-blue-100 px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-800">
        <span>Số hợp đồng</span>
        <span>Mã cán bộ</span>
        <span>Họ tên</span>
        <span>Loại hợp đồng</span>
        <span>Ngày hiệu lực</span>
        <span>Ngày hết hạn</span>
        <span>Trạng thái</span>
        <span className="text-center">Số ngày còn lại</span>
        <span className="text-center">Thao tác</span>
      </div>

      {contractRows.map((row) => {
        const isActionMenuOpen = openActionFor === row.number;

        return (
          <div
            key={row.number}
            className={`relative grid min-h-[58px] grid-cols-[1.15fr_0.8fr_1.1fr_1.15fr_0.85fr_0.85fr_0.95fr_0.8fr_1fr] items-center border-b border-slate-100 px-4 text-[12px] text-slate-800 last:border-0 ${
              isActionMenuOpen ? "z-20 bg-white" : ""
            }`}
          >
            <span className="font-mono text-[11px] font-semibold text-slate-700">{row.number}</span>
            <span className="font-mono text-[11px] font-semibold text-slate-600">{row.code}</span>
            <span className="font-medium text-slate-900">{row.name}</span>
            <span>{row.type}</span>
            <span>{row.start}</span>
            <span>{row.end}</span>
            <span>
              <StatusBadge value={row.status} />
            </span>
            <span className={`text-center ${row.remaining === "Quá hạn" ? "font-medium text-rose-600" : "text-slate-600"}`}>{row.remaining}</span>
            <div className="flex items-center justify-center gap-1.5">
              <button onClick={() => onViewContract?.(row)} className="inline-flex h-7 items-center gap-1 rounded-lg px-2 text-[11px] font-medium text-blue-700 hover:bg-blue-50">
                <Eye size={13} /> Xem
              </button>
              {!compact ? (
                <div className="relative">
                  <button
                    aria-label={`Mở menu thao tác cho ${row.number}`}
                    onClick={() => setOpenActionFor(isActionMenuOpen ? null : row.number)}
                    className={`grid size-7 place-items-center rounded-lg border text-slate-600 transition ${
                      isActionMenuOpen ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <MoreHorizontal size={15} />
                  </button>
                  {isActionMenuOpen ? (
                    <div className="absolute right-0 top-8 z-30 w-52 rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-xl ring-1 ring-slate-100">
                      <button
                        onClick={() => {
                          setOpenActionFor(null);
                          onOpenFrame?.("renew");
                        }}
                        className="flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] text-slate-700 hover:bg-amber-50 hover:text-amber-800"
                      >
                        <RotateCcw size={14} className="mt-0.5 shrink-0" />
                        <span>
                          <span className="block font-semibold">Gia hạn</span>
                          <span className="block text-[11px] text-slate-500">Tạo hợp đồng kế tiếp</span>
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setOpenActionFor(null);
                          onOpenFrame?.("terminate");
                        }}
                        className="flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] text-rose-700 hover:bg-rose-50"
                      >
                        <X size={14} className="mt-0.5 shrink-0" />
                        <span>
                          <span className="block font-semibold">Chấm dứt</span>
                          <span className="block text-[11px] text-rose-500">Yêu cầu xác nhận riêng</span>
                        </span>
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </section>
  );
}

function ContractListContent({ dimmed = false, onOpenFrame, onViewContract }: { dimmed?: boolean; onOpenFrame?: (frame: ContractFrame) => void; onViewContract?: (contract: ContractRow) => void }) {
  return (
    <div className={`px-6 py-5 ${dimmed ? "select-none opacity-25" : ""}`}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-semibold leading-tight text-slate-950">Hợp đồng lao động</h1>
          <p className="mt-1 text-[13px] text-slate-500">Theo dõi hiệu lực hợp đồng, tạo mới và gia hạn hợp đồng cho nhân sự.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 text-[12px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            <Download size={14} /> Xuất danh sách
          </button>
          <button
            onClick={() => onOpenFrame?.("create")}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-700 px-3.5 text-[12px] font-semibold text-white shadow-sm hover:bg-blue-800"
          >
            <Plus size={14} /> Tạo hợp đồng
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <SummaryCards />
        <ContractFilters />
        <ContractTable compact={dimmed} onOpenFrame={onOpenFrame} onViewContract={onViewContract} />
      </div>

      <div className="mt-4 flex items-center justify-between text-[12px] text-slate-500">
        <span>Hiển thị 5 / 392 hợp đồng lao động</span>
        <div className="flex items-center gap-3">
          <button className="h-8 rounded-lg border border-slate-300 bg-white px-3 text-[12px] text-slate-500">Trước</button>
          <span className="font-medium text-slate-700">Trang 1 / 40</span>
          <button className="h-8 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700">Sau</button>
        </div>
      </div>
    </div>
  );
}

function ContractField({
  label,
  required,
  children,
  hint,
  error,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
  hint?: string;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex flex-wrap items-start gap-x-1 gap-y-0.5 text-[13px] font-medium leading-5 text-slate-700">
        {label}
        {required ? <span className="text-red-600">*</span> : null}
      </label>
      {children}
      {error ? <p className="text-[12px] font-medium leading-5 text-rose-600">{error}</p> : hint ? <div className="text-[12px] text-slate-500">{hint}</div> : null}
    </div>
  );
}

function ContractInputBox({ value, placeholder, icon }: { value?: string; placeholder?: string; icon?: ReactNode }) {
  return (
    <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 transition focus-within:ring-4 focus-within:ring-blue-100">
      {icon ? <span className="text-slate-400">{icon}</span> : null}
      <input
        defaultValue={value}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
      />
    </div>
  );
}

function ContractSelectBox({
  value,
  options,
  searchable,
  label = "Đã chọn",
}: {
  value: string;
  options: DropdownOption[];
  searchable?: boolean;
  label?: string;
}) {
  return (
    <ExpandedSelect label={label} value={value} options={options} searchable={searchable} width="w-full" hideLabelWhenSelected />
  );
}

function ContractFileUpload({ label, error }: { label: string; error?: string }) {
  return (
    <div className={`rounded-lg border border-dashed p-3 ${error ? "border-rose-200 bg-white" : "border-blue-200 bg-blue-50/50"}`}>
      <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 text-[13px] font-medium text-blue-700 hover:bg-blue-50">
        <Upload size={15} /> {label}
      </button>
      <p className="mt-2 text-[12px] text-slate-500">Chấp nhận PDF, tối đa 10MB.</p>
      {error ? <p className="mt-1.5 text-[12px] font-medium leading-5 text-rose-600">{error}</p> : null}
    </div>
  );
}

function ContractModalShell({
  title,
  subtitle,
  children,
  footer,
  danger,
  maxWidth = "max-w-[1440px]",
  onClose,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer: ReactNode;
  danger?: boolean;
  maxWidth?: string;
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 flex items-start justify-center bg-slate-950/10 p-8">
      <section className={`flex max-h-[calc(100vh-122px)] w-full ${maxWidth} flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200`}>
        <header className="flex items-center justify-between border-b border-slate-200 px-8 py-4">
          <div>
            <h2 className={`text-[18px] font-semibold ${danger ? "text-rose-700" : "text-slate-950"}`}>{title}</h2>
            {subtitle ? <p className="mt-0.5 text-[12px] text-slate-500">{subtitle}</p> : null}
          </div>
          <button onClick={onClose} className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50/60 p-6">{children}</div>
        <footer className="flex items-center justify-end gap-2 border-t border-slate-200 bg-white px-8 py-3.5">{footer}</footer>
      </section>
    </div>
  );
}

function CreateContractModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <ContractModalShell
      title="Tạo hợp đồng"
      subtitle="Nhập thông tin hợp đồng mới và kiểm tra điều kiện hiệu lực trước khi tạo."
      onClose={onClose}
      footer={
        <>
          <button onClick={onClose} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50">Hủy</button>
          <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50">Lưu nháp</button>
          <button onClick={() => setSubmitted(true)} className="rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-medium text-white hover:bg-blue-800">Tạo hợp đồng</button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-[minmax(0,1fr)_360px] gap-6">
          <section className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="grid grid-cols-2 gap-4">
            <ContractField label="Nhân sự liên kết" required error={submitted ? "Nhân sự chưa đủ điều kiện tạo hợp đồng mới." : undefined}>
              <ContractSelectBox value="CB2022-0118 · Trần Thị Bình" options={personnelOptions} searchable label="Nhân sự" />
            </ContractField>
            <ContractField label="Loại hợp đồng" required error={submitted ? "Loại hợp đồng này đã ngừng sử dụng cho hợp đồng mới." : undefined}>
              <ContractSelectBox value="Xác định thời hạn" options={contractTypeOptions} label="Loại" />
            </ContractField>
            <ContractField label="Số hợp đồng" required error={submitted ? "Số hợp đồng đã tồn tại." : undefined}>
              <ContractInputBox value="HĐLĐ-2026-0168" />
            </ContractField>
            <ContractField label="Ngày ký" required error={submitted ? "Ngày ký không được sau ngày bắt đầu hợp đồng." : undefined}>
              <ContractInputBox value="30/05/2026" icon={<Calendar size={15} />} />
            </ContractField>
            <ContractField label="Ngày bắt đầu" required error={submitted ? "Khoảng thời gian hợp đồng bị chồng lấn với hợp đồng hiện có." : undefined}>
              <ContractInputBox value="01/07/2026" icon={<Calendar size={15} />} />
            </ContractField>
            <ContractField label="Ngày kết thúc" required error={submitted ? "Ngày kết thúc phải sau ngày bắt đầu và phù hợp với loại hợp đồng đã chọn." : undefined}>
              <ContractInputBox value="30/06/2029" icon={<Calendar size={15} />} />
            </ContractField>
            <ContractField label="Hệ số lương áp dụng" required error={submitted ? "Vui lòng nhập hệ số lương hợp lệ." : undefined}>
              <ContractInputBox value="3.00" />
            </ContractField>
            <ContractField label="Phụ cấp">
              <ContractInputBox value="0.30 phụ cấp chức vụ" />
            </ContractField>
            <div className="col-span-2">
              <ContractField label="Đơn vị công tác theo hợp đồng" required error={submitted ? "Vui lòng chọn đơn vị công tác theo hợp đồng." : undefined}>
                <ContractSelectBox value="Khoa Công nghệ thông tin" options={unitOptions} searchable label="Đơn vị" />
              </ContractField>
            </div>
            <div className="col-span-2">
              <ContractField label="Upload file hợp đồng PDF" required>
                <ContractFileUpload label="Tải file hợp đồng PDF" error={submitted ? "Vui lòng tải file hợp đồng PDF." : undefined} />
              </ContractField>
            </div>
          </div>
          </section>
          <PersonnelPreview />
        </div>
      </div>
    </ContractModalShell>
  );
}

function PersonnelPreview() {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-col items-center text-center">
        <div className="grid size-20 place-items-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
          <CircleUserRound size={38} />
        </div>
        <h3 className="mt-3 text-[16px] font-semibold text-slate-950">Trần Thị Bình</h3>
        <p className="font-mono text-[12px] font-semibold text-slate-500">CB2022-0118</p>
      </div>
      <dl className="mt-5 space-y-3 text-[13px]">
        <div>
          <dt className="text-[12px] text-slate-500">Đơn vị</dt>
          <dd className="font-medium text-slate-900">Khoa Công nghệ thông tin</dd>
        </div>
        <div>
          <dt className="text-[12px] text-slate-500">Chức vụ</dt>
          <dd className="font-medium text-slate-900">Giảng viên chính</dd>
        </div>
        <div>
          <dt className="text-[12px] text-slate-500">Hợp đồng hiện tại</dt>
          <dd className="mt-1"><StatusBadge value="Sắp hết hạn" /></dd>
        </div>
      </dl>
    </aside>
  );
}

function RenewContractModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <ContractModalShell
      title="Gia hạn hợp đồng"
      subtitle="Tạo hợp đồng kế tiếp dựa trên thông tin hợp đồng hiện tại."
      onClose={onClose}
      footer={
        <>
          <button onClick={onClose} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50">Hủy</button>
          <button onClick={() => setSubmitted(true)} className="rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-medium text-white hover:bg-blue-800">Xác nhận gia hạn</button>
        </>
      }
    >
      <div className="space-y-4">
        <section className="rounded-xl border border-slate-200 bg-slate-50 p-5 ring-1 ring-slate-100">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[15px] font-semibold text-slate-950">Hợp đồng cũ</h3>
              <p className="mt-1 text-[12px] leading-5 text-slate-500">Thông tin tham chiếu chỉ xem, dùng để đối chiếu trước khi tạo hợp đồng gia hạn.</p>
            </div>
            <span className="inline-flex h-6 items-center rounded-full border border-slate-200 bg-white px-2.5 text-[11px] font-semibold text-slate-500">Chỉ xem</span>
          </div>
          <div className="grid grid-cols-5 gap-3 text-[13px]">
            {["HĐLĐ-2025-0098", "Xác định thời hạn 36 tháng", "01/07/2023", "30/06/2026"].map((value, index) => (
              <div key={value} className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                <div className="text-[11px] text-slate-500">{["Số hợp đồng", "Loại hợp đồng", "Ngày bắt đầu", "Ngày hết hạn"][index]}</div>
                <div className="mt-0.5 font-medium text-slate-900">{value}</div>
              </div>
            ))}
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
              <div className="text-[11px] text-slate-500">Trạng thái</div>
              <div className="mt-1"><StatusBadge value="Sắp hết hạn" /></div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-[15px] font-semibold text-slate-950">Thông tin gia hạn</h3>
          <div className="grid grid-cols-2 gap-4">
            <ContractField label="Loại hợp đồng mới" required error={submitted ? "Loại hợp đồng này đã ngừng sử dụng cho hợp đồng mới." : undefined}>
              <ContractSelectBox value="Xác định thời hạn" options={contractTypeOptions} label="Loại" />
            </ContractField>
            <ContractField label="Ngày bắt đầu mới" required hint="Ngày bắt đầu mới được đề xuất dựa trên ngày hết hạn hợp đồng hiện tại." error={submitted ? "Ngày bắt đầu mới phải liền sau ngày hết hạn hiện tại." : undefined}>
              <ContractInputBox value="01/07/2026" icon={<Calendar size={15} />} />
            </ContractField>
            <ContractField label="Ngày kết thúc mới" required error={submitted ? "Ngày kết thúc mới phải sau ngày bắt đầu mới và phù hợp với loại hợp đồng đã chọn." : undefined}>
              <ContractInputBox value="30/06/2029" icon={<Calendar size={15} />} />
            </ContractField>
            <ContractField label="Hệ số lương" required error={submitted ? "Vui lòng nhập hệ số lương hợp lệ." : undefined}>
              <ContractInputBox value="3.33" />
            </ContractField>
            <ContractField label="Phụ cấp">
              <ContractInputBox value="0.30 phụ cấp trách nhiệm" />
            </ContractField>
            <ContractField label="Upload file hợp đồng gia hạn" required>
              <ContractFileUpload label="Tải file gia hạn" error={submitted ? "Vui lòng tải file hợp đồng gia hạn." : undefined} />
            </ContractField>
          </div>
        </section>

      </div>
    </ContractModalShell>
  );
}

function TerminateContractModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <ContractModalShell
      title="Chấm dứt hợp đồng trước hạn"
      danger
      maxWidth="max-w-[940px]"
      onClose={onClose}
      footer={
        <>
          <button onClick={onClose} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50">Hủy</button>
          <button onClick={() => setSubmitted(true)} className="rounded-lg bg-rose-600 px-4 py-2 text-[13px] font-medium text-white hover:bg-rose-700">Xác nhận chấm dứt</button>
        </>
      }
    >
      <div className="mx-auto max-w-[860px] space-y-4">
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-slate-950">Thông tin hợp đồng bị chấm dứt</h3>
            <span className="inline-flex h-6 items-center rounded-full bg-rose-50 px-2.5 text-[11px] font-semibold text-rose-700">Cần kiểm tra kỹ</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-[13px]">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <div className="text-[11px] text-slate-500">Số hợp đồng</div>
              <div className="mt-0.5 font-mono text-[13px] font-semibold text-slate-900">HĐLĐ-2026-0142</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <div className="text-[11px] text-slate-500">Nhân sự</div>
              <div className="mt-0.5 text-[13px] font-semibold text-slate-900">Nguyễn Văn An</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <div className="text-[11px] text-slate-500">Trạng thái hiện tại</div>
              <div className="mt-1"><StatusBadge value="Còn hiệu lực" /></div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-rose-200 bg-white p-5">
          <h3 className="mb-4 text-[15px] font-semibold text-slate-950">Xác nhận chấm dứt</h3>
          <div className="grid grid-cols-2 gap-4">
            <ContractField label="Ngày chấm dứt hiệu lực" required error={submitted ? "Ngày chấm dứt phải nằm trong thời gian hiệu lực của hợp đồng." : undefined}>
              <ContractInputBox value="30/06/2026" icon={<Calendar size={15} />} />
            </ContractField>
            <ContractField label="Lý do chấm dứt" required error={submitted ? "Vui lòng chọn lý do chấm dứt." : undefined}>
              <ContractSelectBox value="Theo quyết định của Nhà trường" options={reasonOptions} label="Lý do" />
            </ContractField>
            <div className="col-span-2">
              <ContractField label="Tài liệu xác nhận chấm dứt" required>
                <ContractFileUpload label="Tải quyết định / biên bản xác nhận" error={submitted ? "Vui lòng tải tài liệu xác nhận chấm dứt." : undefined} />
              </ContractField>
            </div>
          </div>
        </section>

      </div>
    </ContractModalShell>
  );
}

function ActiveFrameOverlay({ currentFrame, onClose }: { currentFrame: ContractFrame; onClose: () => void }) {
  if (currentFrame === "create") return <CreateContractModal onClose={onClose} />;
  if (currentFrame === "renew") return <RenewContractModal onClose={onClose} />;
  if (currentFrame === "terminate") return <TerminateContractModal onClose={onClose} />;
  return null;
}

function ViewContractModal({ contract, onClose }: { contract: ContractRow; onClose: () => void }) {
  const details = [
    ["Số hợp đồng", contract.number],
    ["Mã cán bộ", contract.code],
    ["Họ tên", contract.name],
    ["Loại hợp đồng", contract.type],
    ["Ngày hiệu lực", contract.start],
    ["Ngày hết hạn", contract.end],
    ["Số ngày còn lại", contract.remaining],
  ];

  return (
    <ContractModalShell
      title="Chi tiết hợp đồng"
      subtitle="Xem thông tin hợp đồng lao động đã lưu trong hệ thống."
      maxWidth="max-w-[760px]"
      onClose={onClose}
      footer={
        <button onClick={onClose} className="rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-medium text-white hover:bg-blue-800">
          Đóng
        </button>
      }
    >
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-[15px] font-semibold text-slate-950">{contract.number}</h3>
            <p className="mt-1 text-[12px] text-slate-500">{contract.name} · {contract.code}</p>
          </div>
          <StatusBadge value={contract.status} />
        </div>
        <dl className="grid grid-cols-2 gap-3 text-[13px]">
          {details.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <dt className="text-[11px] text-slate-500">{label}</dt>
              <dd className="mt-0.5 font-medium text-slate-900">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </ContractModalShell>
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
      <section className="w-full max-w-[620px] overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-2xl">
        <header className="flex justify-end px-5 pt-5">
          <button
            onClick={onClose}
            className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </header>
        <div className="px-8 pb-8 text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-blue-50 text-blue-700">
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
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-blue-700">Đã nhập</div>
              <div className="mt-1 text-[24px] font-bold text-blue-900">{validCount}</div>
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
        <button
          onClick={onClose}
          className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
        >
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
                  Mẫu gồm định danh, đơn vị công tác, học vị, hợp đồng và tài liệu cần bổ sung.
                </p>
              </div>
              <div className="flex justify-end">
                <button className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[12.5px] font-semibold text-slate-700 hover:bg-slate-50">
                  <FileText size={15} /> Tải mẫu
                </button>
              </div>
            </div>
          </div>

          <div className="flex min-h-[132px] rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
            <div className="flex w-full flex-col justify-center gap-3">
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">File đã chọn</div>
                <div className="mt-0.5 truncate text-[13.5px] font-semibold text-slate-950">
                  Danh_sach_nhan_su_moi.xlsx
                </div>
                <p className="mt-1 text-[12px] leading-5 text-slate-600">
                  Đã chọn file Excel gồm 38 dòng dữ liệu để kiểm tra trước khi nhập.
                </p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-slate-500">
                  <Upload size={13} /> .xlsx
                </span>
                <button
                  onClick={() => setAllValid(true)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-slate-50"
                >
                  Chọn file Excel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`overflow-hidden rounded-xl border bg-white ${
            allValid ? "border-blue-200" : "border-slate-200"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div>
              <div className="text-[13px] font-semibold text-slate-900">Kết quả kiểm tra file</div>
              <div className="text-[11.5px] text-slate-500">
                {allValid
                  ? "File đạt điều kiện nhập toàn bộ hồ sơ."
                  : "File có thể nhập phần hợp lệ; các dòng lỗi cần sửa trong Excel."}
              </div>
            </div>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${
                allValid ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"
              }`}
            >
              {allValid ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
              {allValid ? "Sẵn sàng nhập" : "5 lỗi cần xử lý"}
            </span>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[26px] font-bold text-slate-950">
                    {validCount}/38
                  </span>
                  <span className="text-[12.5px] font-medium text-slate-600">dòng hợp lệ</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${allValid ? "bg-blue-700" : "bg-amber-500"}`}
                    style={{ width: allValid ? "100%" : "92%" }}
                  />
                </div>
                <div className="mt-2 flex items-center gap-4 text-[11.5px] text-slate-500">
                  <span>Tổng 38 dòng dữ liệu</span>
                  {!allValid ? <span>3 dòng cần sửa</span> : <span>Không phát hiện dòng lỗi</span>}
                </div>
              </div>

              <div
                className={`min-w-[168px] rounded-xl border px-4 py-3 ${
                  allValid ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white"
                }`}
              >
                <div className={`text-[11px] font-semibold uppercase tracking-wide ${allValid ? "text-blue-700" : "text-slate-500"}`}>
                  {allValid ? "Trạng thái" : "Cần xử lý"}
                </div>
                <div className={`mt-1 text-[18px] font-bold ${allValid ? "text-blue-900" : "text-amber-900"}`}>
                  {allValid ? "Hợp lệ" : `${errorCount} lỗi`}
                </div>
                <div>
                  <span className={`text-[11.5px] ${allValid ? "text-blue-700" : "text-slate-500"}`}>
                    {allValid ? "Sẵn sàng nhập" : "Xem bảng lỗi bên dưới"}
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
                "Đủ trường bắt buộc",
                "Định dạng ngày, email, số điện thoại hợp lệ",
                "Đơn vị công tác khớp danh mục",
                "Không phát hiện CCCD trùng",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50/70 px-3 py-2.5 text-[12.5px] font-medium text-blue-800">
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
              <button className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-700 hover:bg-slate-50">
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
            ? "Hệ thống sẽ tạo hồ sơ sau khi xác nhận nhập file."
            : "Dòng hợp lệ được nhập trước; dòng lỗi được giữ lại để xuất và sửa."}
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
            <CheckCircle2 size={15} /> {allValid ? "Nhập toàn bộ hồ sơ" : "Nhập phần hợp lệ"}
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
  figmaCopyMode,
  setFigmaCopyMode,
  validationStarted,
  setValidationStarted,
  captureSection,
  setCaptureSection,
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
  figmaCopyMode: boolean;
  setFigmaCopyMode: (value: boolean) => void;
  validationStarted: boolean;
  setValidationStarted: (value: boolean) => void;
  captureSection: string | null;
  setCaptureSection: (value: string | null) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  const hasErrors = showErrors || duplicateId;
  const formScrollRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState("identity");
  const [captureOffset, setCaptureOffset] = useState(0);
  const captureViewport = !!captureSection && !figmaCopyMode;
  const validationState = !validationStarted ? "idle" : hasErrors ? "error" : "valid";
  const errorCount = showErrors ? 9 : duplicateId ? 1 : 0;
  const errorGroups = [
    hasErrors ? "Thông tin cá nhân" : null,
    showErrors ? "Liên hệ & quốc tịch" : null,
    showErrors ? "Công tác & lương" : null,
    showErrors ? "Tài liệu" : null,
  ].filter(Boolean);
  const sections = [
    { id: "identity", label: "Thông tin cá nhân", icon: <CircleUserRound size={15} />, state: validationState === "idle" ? "idle" : hasErrors ? "error" : "done" },
    { id: "contact", label: "Liên hệ & quốc tịch", icon: <Mail size={15} />, state: validationState === "idle" ? "idle" : showErrors ? "error" : "done" },
    { id: "work", label: "Công tác & lương", icon: <Building2 size={15} />, state: validationState === "idle" ? "idle" : showErrors ? "error" : "done" },
    { id: "education", label: "Học vấn", icon: <GraduationCap size={15} />, state: validationState === "idle" ? "idle" : "done" },
    { id: "documents", label: "Tài liệu", icon: <FileText size={15} />, state: validationState === "idle" ? "idle" : showErrors ? "error" : "done" },
  ];
  const scrollToSection = (id: string) => {
    setCaptureSection(null);
    const container = formScrollRef.current;
    const target = container?.querySelector<HTMLElement>(`#${id}`);
    if (!container || !target) return;
    setActiveSection(id);
    container.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  };
  const syncActiveSection = () => {
    const container = formScrollRef.current;
    if (!container) return;
    const current = sections.reduce((active, section) => {
      const element = container.querySelector<HTMLElement>(`#${section.id}`);
      return element && element.offsetTop <= container.scrollTop + 72 ? section.id : active;
    }, sections[0].id);
    setActiveSection(current);
  };
  useEffect(() => {
    if (!captureViewport || !captureSection) {
      setCaptureOffset(0);
      return;
    }

    const element = formScrollRef.current?.querySelector<HTMLElement>(`#${captureSection}`);
    if (!element) return;
    setActiveSection(captureSection);
    setCaptureOffset(Math.max(0, element.offsetTop - 8));
  }, [captureViewport, captureSection, showErrors, duplicateId, foreigner, degrees.length, certs.length]);

  return (
    <div
      className={`relative flex w-full max-w-[1260px] flex-col rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 ${
        figmaCopyMode ? "overflow-visible" : "h-[calc(100vh-96px)] overflow-hidden"
      }`}
    >
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
          <span className="hidden items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[12px] font-medium text-slate-600 md:inline-flex">
            <Save size={13} /> Bản nháp đã lưu lúc 09:42
          </span>
          <button
            onClick={onClose}
            className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {hasErrors ? (
        <div className="border-b border-slate-200 bg-white px-5 py-3">
          <div className="flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50/70 px-4 py-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-white text-red-600">
                <AlertCircle size={17} />
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-slate-950">
                  Chưa thể lưu hồ sơ chính thức
                </div>
                <p className="mt-0.5 text-[12px] leading-5 text-slate-600">
                  Có {errorCount} trường cần kiểm tra lại trước khi lưu hồ sơ chính thức.
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {errorGroups.map((group) => (
                    <span
                      key={group}
                      className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-slate-700 ring-1 ring-red-100"
                    >
                      {group}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection("identity")}
              className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-700 hover:bg-slate-50"
            >
              Đến lỗi đầu tiên
            </button>
          </div>
        </div>
      ) : null}

      <div className={`${figmaCopyMode ? "" : "min-h-0 flex-1"} bg-slate-50/60`}>
        <div
          className={`grid grid-cols-[196px_minmax(0,1fr)] gap-4 p-4 ${
            figmaCopyMode ? "" : "h-full"
          }`}
        >
          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-2.5">
            <div className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Nhóm thông tin
            </div>
            <div className="space-y-1">
              {sections.map((section) => {
                const active = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-[12px] font-medium transition ${
                      active
                        ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {section.icon}
                      {section.label}
                    </span>
                    {section.state === "idle" ? (
                      <ChevronRight size={14} className={active ? "text-blue-600" : "text-slate-300"} />
                    ) : section.state === "error" ? (
                      <AlertCircle size={14} className={active ? "text-red-600" : "text-red-600"} />
                    ) : section.state === "warning" ? (
                      <AlertCircle size={14} className={active ? "text-amber-600" : "text-amber-600"} />
                    ) : (
                      <CheckCircle2 size={14} className={active ? "text-blue-700" : "text-slate-400"} />
                    )}
                  </button>
                );
              })}
            </div>
          </aside>

          <main
            ref={formScrollRef}
            onScroll={syncActiveSection}
            className={`space-y-4 pr-1 ${
              figmaCopyMode
                ? "overflow-visible"
                : captureViewport
                ? "relative min-h-0 overflow-hidden"
                : "min-h-0 overflow-y-auto overflow-x-hidden"
            }`}
          >
            <div
              className="space-y-4"
              style={captureViewport ? { transform: `translateY(-${captureOffset}px)` } : undefined}
            >
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
                      <Input value={showErrors ? "" : "Nguyễn Văn A"} state={showErrors ? "error" : "default"} />
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
                            <Input value={hasErrors ? "001200001900" : "001200001901"} state={hasErrors ? "error" : "default"} />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              if (hasErrors) {
                                setDuplicateId(false);
                                setShowErrors(false);
                                setValidationStarted(true);
                              } else {
                                setDuplicateId(true);
                                setValidationStarted(true);
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
                  <div className="grid min-w-0 grid-cols-3 gap-3">
                      <Field label="Đơn vị công tác" required>
                        <Select value="Khoa Công nghệ thông tin" />
                      </Field>
                      <Field label="Bộ môn / phòng ban trực thuộc">
                        <Select value="Bộ môn Công nghệ phần mềm" />
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
                      <div className="col-span-3 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-[12px] text-blue-800">
                        Đường dẫn đơn vị: Trường Đại học Thủy Lợi / Khoa Công nghệ thông tin / Bộ môn Công nghệ phần mềm
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
                      <Input value={showErrors ? "abc" : "2.34"} state={showErrors ? "error" : "default"} />
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
                      ["CCCD/CMND bản scan", "Đã tải lên", "default"],
                      ["Quyết định tuyển dụng", showErrors ? "Thiếu tài liệu" : "Đã tải lên", showErrors ? "error" : "default"],
                      ["Sơ yếu lý lịch", "Đã tải lên", "default"],
                      ["Ảnh thẻ 3x4", "Đã tải lên", "default"],
                    ].map(([name, status, tone]) => (
                      <div
                        key={name}
                        className={`rounded-lg border px-3 py-2.5 ${
                          tone === "error" ? "border-red-200 bg-red-50" : "border-slate-200 bg-white"
                        }`}
                      >
                        <div className="text-[12.5px] font-semibold text-slate-900">{name}</div>
                        <div className={`mt-0.5 text-[12px] ${tone === "error" ? "text-red-700" : "text-slate-500"}`}>
                          {status}
                        </div>
                        <div className="mt-2">
                          <FileButton label={tone === "error" ? "Tải lên" : "Thay file"} />
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
                      <div className="grid grid-cols-[1.1fr_1fr_64px_56px] bg-slate-50 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                        <span>Tên bằng</span>
                        <span>Nơi cấp</span>
                        <span className="text-center">File</span>
                        <span className="text-center">Thao tác</span>
                      </div>
                      {degrees.map((d, i) => (
                        <div key={`${d.name}-${i}`} className="grid grid-cols-[1.1fr_1fr_64px_56px] items-center border-t border-slate-100 px-3 py-2.5 text-[12px]">
                          <span className="font-medium text-slate-900">{d.name || "Bằng mới"}</span>
                          <span className="text-slate-600">{d.place || "Chưa nhập"}</span>
                          <button className="inline-flex h-8 w-11 items-center justify-center justify-self-center rounded-md bg-blue-50 px-2 text-[11px] font-semibold text-blue-700">
                            PDF
                          </button>
                          <button
                            onClick={() => setDegrees((items) => items.filter((_, idx) => idx !== i))}
                            className="grid size-8 place-items-center justify-self-center rounded-md text-red-500 hover:bg-red-50"
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
                      <div className="grid grid-cols-[1.1fr_1fr_64px_56px] bg-slate-50 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                        <span>Tên chứng chỉ</span>
                        <span>Nơi cấp</span>
                        <span className="text-center">File</span>
                        <span className="text-center">Thao tác</span>
                      </div>
                      {certs.map((c, i) => (
                        <div key={`${c.name}-${i}`} className="grid grid-cols-[1.1fr_1fr_64px_56px] items-center border-t border-slate-100 px-3 py-2.5 text-[12px]">
                          <span className="font-medium text-slate-900">{c.name || "Chứng chỉ mới"}</span>
                          <span className="text-slate-600">{c.place || "Chưa nhập"}</span>
                          <button className="inline-flex h-8 w-11 items-center justify-center justify-self-center rounded-md bg-blue-50 px-2 text-[11px] font-semibold text-blue-700">
                            PDF
                          </button>
                          <button
                            onClick={() => setCerts((items) => items.filter((_, idx) => idx !== i))}
                            className="grid size-8 place-items-center justify-self-center rounded-md text-red-500 hover:bg-red-50"
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
            </div>
            {captureViewport ? (
              <div className="pointer-events-none absolute right-0 top-0 h-full w-2 rounded-full bg-slate-100">
                <div
                  className="absolute right-0.5 h-28 w-1 rounded-full bg-slate-400"
                  style={{
                    top:
                      captureSection === "documents"
                        ? "72%"
                        : captureSection === "work"
                        ? "42%"
                        : captureSection === "contact"
                        ? "22%"
                        : "4%",
                  }}
                />
              </div>
            ) : null}
          </main>

        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-white px-6 py-3.5">
        <div className="flex items-center gap-2 text-[12.5px] text-slate-500">
          {hasErrors ? (
            <span className="inline-flex items-center gap-1 text-slate-500">
              <AlertCircle size={14} className="text-red-600" /> Còn lỗi cần sửa
            </span>
          ) : !validationStarted ? (
            <span className="inline-flex items-center gap-1 text-slate-500">
              Nhấn lưu để hệ thống kiểm tra và tạo hồ sơ chính thức.
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-slate-500">
              Sẵn sàng lưu hồ sơ chính thức.
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
              setValidationStarted(true);
              if (!validationStarted || hasErrors) {
                setShowErrors(true);
                setDuplicateId(true);
                setCaptureSection(null);
                setActiveSection("identity");
                formScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                return;
              }
              onSave();
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-semibold text-white hover:bg-blue-800"
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

function AppSidebar({ activeView, onViewChange }: { activeView: View; onViewChange: (view: View) => void }) {
  return (
    <aside className="w-[252px] shrink-0 border-r border-slate-200 bg-white">
      <div className="flex items-center gap-3 px-5 py-4">
        <div className="grid size-9 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-blue-100">
          <img src={tluLogoIcon} alt="TLU" className="size-8 object-contain" />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-slate-950">TLU HRMS</div>
          <div className="text-[11px] text-slate-500">Trường Đại học Thủy Lợi</div>
        </div>
      </div>

      <nav className="px-3 py-2">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`mb-1 flex h-9 w-full items-center gap-2 rounded-lg px-3 text-left text-[13px] transition ${
              item.id === activeView ? "bg-blue-50 font-semibold text-blue-700" : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            {item.icon}
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function AppHeader({ label }: { label: string }) {
  return (
    <header className="flex h-[58px] items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-3 text-[13px] font-medium text-slate-800">
        <LayoutList size={16} />
        <span>{label}</span>
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
  );
}

function PlaceholderView({ title }: { title: string }) {
  return (
    <div className="px-6 py-5">
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid size-12 place-items-center rounded-xl bg-blue-50 text-blue-700">
          <Building2 size={24} />
        </div>
        <h1 className="mt-4 text-[24px] font-semibold text-slate-950">{title}</h1>
        <p className="mt-1 max-w-2xl text-[13px] leading-6 text-slate-500">
          Màn hình đang dùng chung khung TLU HRMS và sẵn sàng kết nối dữ liệu hồ sơ nhân sự, hợp đồng lao động.
        </p>
      </section>
    </div>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState<View>("ho-so");
  const [foreigner, setForeigner] = useState(false);
  const [duplicateId, setDuplicateId] = useState(false);
  const [validationAttempted, setValidationAttempted] = useState<Record<number, boolean>>({});
  const [saved, setSaved] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [addMenuOpen, setAddMenuOpen] = useState(true);
  const [excelImportOpen, setExcelImportOpen] = useState(false);
  const [figmaCopyMode, setFigmaCopyMode] = useState(false);
  const [formValidationStarted, setFormValidationStarted] = useState(false);
  const [captureSection, setCaptureSection] = useState<string | null>(null);
  const [currentContractFrame, setCurrentContractFrame] = useState<ContractFrame>("list");
  const [viewedContract, setViewedContract] = useState<ContractRow | null>(null);
  const [degrees, setDegrees] = useState([
    { name: "Bằng Cử nhân chuyên ngành Kỹ thuật phần mềm", place: "Trường Đại học Thủy lợi" },
    { name: "Bằng Kỹ sư Khoa học máy tính", place: "Trường Đại học Thủy lợi" },
  ]);
  const [certs, setCerts] = useState([{ name: "IELTS 7.5", place: "British Council" }]);

  useEffect(() => {
    const handlePrototypeShortcut = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFigmaCopyMode(false);
        setCaptureSection(null);
        return;
      }
      if (!event.altKey) return;

      if (event.key.toLowerCase() === "c") {
        setCaptureSection(null);
        setFigmaCopyMode(true);
        return;
      }

      const showErrorFrame = (section: string | null) => {
        setActiveView("ho-so");
        setSaved(false);
        setModalOpen(true);
        setAddMenuOpen(false);
        setExcelImportOpen(false);
        setFigmaCopyMode(false);
        setFormValidationStarted(true);
        setDuplicateId(true);
        setValidationAttempted({ 0: true, 1: true, 2: true, 3: true, 4: true });
        setCaptureSection(section);
      };

      if (event.key === "1") {
        setFormValidationStarted(false);
        setDuplicateId(false);
        setValidationAttempted({});
        setCaptureSection(null);
      }
      if (event.key === "2") showErrorFrame(null);
      if (event.key === "3") showErrorFrame("work");
      if (event.key === "4") showErrorFrame("documents");
      if (event.key === "5") {
        setActiveView("ho-so");
        setSaved(false);
        setModalOpen(true);
        setAddMenuOpen(false);
        setExcelImportOpen(false);
        setFigmaCopyMode(false);
        setFormValidationStarted(true);
        setDuplicateId(false);
        setValidationAttempted({});
        setCaptureSection(null);
      }
    };
    window.addEventListener("keydown", handlePrototypeShortcut);
    return () => window.removeEventListener("keydown", handlePrototypeShortcut);
  }, []);

  const activeLabel = sidebarItems.find((item) => item.id === activeView)?.label ?? "Hồ sơ nhân sự";
  const showContractOverlay = currentContractFrame !== "list" || viewedContract !== null;

  const handleViewChange = (view: View) => {
    setActiveView(view);
    setCurrentContractFrame("list");
    setViewedContract(null);
    if (view !== "ho-so") {
      setSaved(false);
      setExcelImportOpen(false);
    }
  };

  const openManualAdd = () => {
    setActiveView("ho-so");
    setModalOpen(true);
    setAddMenuOpen(false);
    setExcelImportOpen(false);
    setFormValidationStarted(false);
    setDuplicateId(false);
    setValidationAttempted({});
    setCaptureSection(null);
  };
  const closeModal = () => {
    setModalOpen(false);
    setAddMenuOpen(true);
    setExcelImportOpen(false);
    setFigmaCopyMode(false);
    setCaptureSection(null);
  };
  const openExcelImport = () => {
    setActiveView("ho-so");
    setModalOpen(false);
    setAddMenuOpen(false);
    setExcelImportOpen(true);
    setFigmaCopyMode(false);
    setCaptureSection(null);
  };
  const closeExcelImport = () => {
    setExcelImportOpen(false);
    setAddMenuOpen(true);
  };

  const resetForAnotherProfile = () => {
    setSaved(false);
    setDuplicateId(false);
    setValidationAttempted({});
    setFormValidationStarted(false);
    setCaptureSection(null);
    setModalOpen(true);
    setAddMenuOpen(false);
    setExcelImportOpen(false);
  };

  if (saved && activeView === "ho-so") {
    return (
      <div className="min-h-screen bg-white font-['Be_Vietnam_Pro'] text-slate-900">
        <div className="flex min-h-screen overflow-hidden bg-white">
          <AppSidebar activeView={activeView} onViewChange={handleViewChange} />
          <div className="min-w-0 flex-1 bg-slate-50">
            <AppHeader label="Hồ sơ nhân sự" />
            <div className="relative min-h-[calc(100vh-58px)] overflow-hidden bg-white">
              <div className="opacity-25">
                <PersonnelListBackground />
              </div>
              <div className="absolute inset-0 grid place-items-center p-6">
                <section className="w-full max-w-[620px] rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-2xl">
                  <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={34} />
                  </div>
                  <h1 className="mt-5 text-[22px] font-semibold text-slate-950">Hồ sơ nhân sự đã được tạo</h1>
                  <p className="mt-2 text-[13px] leading-6 text-slate-500">
                    Hệ thống đã lưu hồ sơ của Nguyễn Văn A và sinh mã cán bộ chính thức.
                  </p>
                  <div className="mx-auto mt-5 w-fit rounded-xl bg-blue-50 px-5 py-3 ring-1 ring-blue-100">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-blue-700">Mã cán bộ</div>
                    <div className="mt-1 font-mono text-[20px] font-bold text-blue-900">CB2026-0048</div>
                  </div>
                  <div className="mt-6 flex justify-center gap-3">
                    <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 hover:bg-slate-50">
                      Xem hồ sơ
                    </button>
                    <button onClick={resetForAnotherProfile} className="rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-semibold text-white hover:bg-blue-800">
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

  const personnelContent = (
    <div className={`relative min-h-[calc(100vh-58px)] bg-white ${figmaCopyMode ? "overflow-visible" : "overflow-hidden"}`}>
      {modalOpen ? (
        <>
          <div className={`opacity-25 ${figmaCopyMode ? "pointer-events-none absolute inset-0" : ""}`}>
            <PersonnelListBackground />
          </div>
          <div className={`flex items-start justify-center p-6 pt-7 ${figmaCopyMode ? "relative" : "absolute inset-0"}`}>
            <LargePersonnelForm
              foreigner={foreigner}
              setForeigner={setForeigner}
              duplicateId={duplicateId}
              setDuplicateId={setDuplicateId}
              showErrors={!!validationAttempted[0]}
              setShowErrors={(value) => {
                if (value) setFormValidationStarted(true);
                setValidationAttempted((current) => ({ ...current, 0: value, 1: value, 2: value, 3: value, 4: value }));
              }}
              degrees={degrees}
              setDegrees={setDegrees}
              certs={certs}
              setCerts={setCerts}
              figmaCopyMode={figmaCopyMode}
              setFigmaCopyMode={setFigmaCopyMode}
              validationStarted={formValidationStarted}
              setValidationStarted={setFormValidationStarted}
              captureSection={captureSection}
              setCaptureSection={setCaptureSection}
              onClose={closeModal}
              onSave={() => {
                setActiveView("ho-so");
                setSaved(true);
              }}
            />
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
  );

  const contractContent = (
    <div className="relative min-h-[calc(100vh-58px)] overflow-hidden bg-white">
      <ContractListContent dimmed={showContractOverlay} onOpenFrame={setCurrentContractFrame} onViewContract={setViewedContract} />
      <ActiveFrameOverlay currentFrame={currentContractFrame} onClose={() => setCurrentContractFrame("list")} />
      {viewedContract ? <ViewContractModal contract={viewedContract} onClose={() => setViewedContract(null)} /> : null}
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-['Be_Vietnam_Pro'] text-slate-900">
      <div className={`flex min-h-screen bg-white ${figmaCopyMode ? "overflow-visible" : "overflow-hidden"}`}>
        <AppSidebar activeView={activeView} onViewChange={handleViewChange} />
        <div className="min-w-0 flex-1 bg-slate-50">
          <AppHeader label={activeLabel} />
          {activeView === "ho-so"
            ? personnelContent
            : activeView === "hop-dong"
            ? contractContent
            : <PlaceholderView title={activeLabel} />}
        </div>
      </div>
    </div>
  );
}
