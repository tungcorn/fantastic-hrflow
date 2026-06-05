import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AlertCircle,
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  Calendar,
  ChevronDown,
  CircleUserRound,
  Clock3,
  Download,
  Eye,
  FileText,
  GraduationCap,
  History,
  LayoutDashboard,
  LayoutList,
  Plus,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";

type Frame = "list" | "create" | "renew" | "terminate";
type ContractStatus = "Còn hiệu lực" | "Sắp hết hạn" | "Chờ gia hạn" | "Hết hiệu lực";
type OptionTone = "default" | "success" | "warning" | "danger" | "disabled";
type DropdownOption = { label: string; description?: string; tone?: OptionTone; disabled?: boolean };

const tluLogoIcon = new URL("./tlu-logo-icon.png", import.meta.url).href;

const frameOptions: { id: Frame; label: string }[] = [
  { id: "list", label: "01 Danh sách" },
  { id: "create", label: "02 Tạo hợp đồng" },
  { id: "renew", label: "03 Gia hạn" },
  { id: "terminate", label: "04 Chấm dứt" },
];

type SidebarItem = { label: string; icon: ReactNode; active?: boolean };

const sidebarItems: SidebarItem[] = [
  { label: "Tổng quan", icon: <LayoutDashboard size={17} /> },
  { label: "Hồ sơ nhân sự", icon: <CircleUserRound size={17} /> },
  { label: "Hợp đồng lao động", icon: <FileText size={17} />, active: true },
  { label: "Cơ cấu tổ chức", icon: <Building2 size={17} /> },
  { label: "Tài khoản & phân quyền", icon: <ShieldCheck size={17} /> },
  { label: "Đào tạo", icon: <GraduationCap size={17} /> },
  { label: "Báo cáo", icon: <BarChart3 size={17} /> },
  { label: "Nhật ký hệ thống", icon: <History size={17} /> },
  { label: "Cài đặt", icon: <Settings size={17} /> },
];

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
  { label: "Thử việc", description: "Ngừng sử dụng cho hợp đồng mới", tone: "disabled", disabled: true },
];

const statusOptions: DropdownOption[] = [
  { label: "Chưa có hiệu lực", description: "Ngày hiệu lực ở tương lai" },
  { label: "Còn hiệu lực", description: "Đang áp dụng", tone: "success" },
  { label: "Sắp hết hạn", description: "Còn dưới 30 ngày", tone: "warning" },
  { label: "Chờ gia hạn", description: "Đang trong thời gian xử lý", tone: "warning" },
  { label: "Hết hiệu lực", description: "Đã kết thúc", tone: "danger" },
];

const dateRangeOptions: DropdownOption[] = [
  { label: "7 ngày tới", description: "Ưu tiên xử lý ngay", tone: "danger" },
  { label: "30 ngày tới", description: "Theo cảnh báo mặc định", tone: "warning" },
  { label: "Quý hiện tại", description: "Lọc theo kỳ báo cáo" },
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

function Sidebar() {
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
            key={item.label}
            className={`mb-1 flex h-9 w-full items-center gap-2 rounded-lg px-3 text-left text-[13px] transition ${
              item.active ? "bg-blue-50 font-semibold text-blue-700" : "text-slate-700 hover:bg-slate-50"
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

function FrameSwitcher({ currentFrame, onFrameChange }: { currentFrame: Frame; onFrameChange: (frame: Frame) => void }) {
  return (
    <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
      {frameOptions.map((frame) => (
        <button
          key={frame.id}
          onClick={() => onFrameChange(frame.id)}
          className={`h-7 rounded-md px-2.5 text-[11.5px] font-semibold transition ${
            currentFrame === frame.id
              ? "bg-blue-700 text-white shadow-sm"
              : "text-slate-600 hover:bg-white hover:text-blue-700"
          }`}
        >
          {frame.label}
        </button>
      ))}
    </div>
  );
}

function Header({ currentFrame, onFrameChange }: { currentFrame: Frame; onFrameChange: (frame: Frame) => void }) {
  return (
    <header className="flex h-[58px] items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-2 text-[13px] font-medium text-slate-800">
        <LayoutList size={16} />
        <span className="text-slate-500">Trang chủ</span>
        <span className="text-slate-300">/</span>
        <span>Hợp đồng lao động</span>
      </div>
      <div className="flex items-center gap-3">
        <FrameSwitcher currentFrame={currentFrame} onFrameChange={onFrameChange} />
        <div className="flex h-9 w-[240px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 shadow-sm">
          <Search size={14} className="text-slate-400" />
          <input
            className="min-w-0 flex-1 bg-transparent text-[12px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
            placeholder="Tìm kiếm nhanh"
          />
        </div>
        <button className="relative grid size-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
          <Bell size={17} />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-rose-500" />
        </button>
        <div className="h-8 w-px bg-slate-200" />
        <div className="grid size-9 place-items-center rounded-lg border border-slate-300 bg-white text-slate-700">
          <CircleUserRound size={19} />
        </div>
        <div>
          <div className="text-[12px] font-semibold text-slate-950">Nguyễn Hải Ninh</div>
          <div className="text-[11px] text-slate-500">Phòng TCCB</div>
        </div>
        <ChevronDown size={14} className="text-slate-500" />
      </div>
    </header>
  );
}

function optionToneClass(option: DropdownOption) {
  if (option.disabled || option.tone === "disabled") return "border-slate-100 bg-slate-50 text-slate-400";
  if (option.tone === "success") return "border-emerald-100 bg-emerald-50/60 text-emerald-800";
  if (option.tone === "warning") return "border-amber-100 bg-amber-50/70 text-amber-800";
  if (option.tone === "danger") return "border-rose-100 bg-rose-50/70 text-rose-700";
  return "border-slate-100 bg-white text-slate-800";
}

function ExpandedSelect({
  label,
  value,
  options,
  width = "w-[220px]",
  searchable,
}: {
  label: string;
  value: string;
  options: DropdownOption[];
  width?: string;
  searchable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
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
    <div ref={rootRef} className={`relative ${width} shrink-0`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`flex h-9 w-full items-center justify-between rounded-lg border bg-white px-3 text-left text-[12px] text-slate-700 shadow-sm ${
          open ? "border-blue-300 ring-4 ring-blue-100" : "border-slate-300"
        }`}
      >
        <span className="truncate">
          <span className="text-slate-400">{label}: </span>
          {selected}
        </span>
        <ChevronDown size={14} className={`text-slate-400 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
      <div className="absolute left-0 top-[42px] z-30 w-full rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
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
              disabled={option.disabled}
              onClick={() => {
                if (option.disabled) return;
                setSelected(option.label);
                setOpen(false);
                setQuery("");
              }}
              className={`flex w-full items-start justify-between gap-3 rounded-lg border px-2.5 py-2 text-left text-[12px] ${optionToneClass(option)}`}
            >
              <span>
                <span className="block font-semibold">{option.label}</span>
                {option.description ? <span className="mt-0.5 block text-[11px] opacity-80">{option.description}</span> : null}
              </span>
              {option.disabled ? <span className="rounded-full bg-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">Khóa</span> : null}
            </button>
          ))}
          {visibleOptions.length === 0 ? <div className="rounded-lg bg-slate-50 px-2.5 py-2 text-[12px] text-slate-500">Không có kết quả phù hợp.</div> : null}
        </div>
      </div>
      ) : null}
    </div>
  );
}

function ExceptionCard({ title, message, tone = "warning" }: { title: string; message: string; tone?: "warning" | "danger" | "info" }) {
  const toneClass =
    tone === "danger"
      ? "border-rose-200 bg-rose-50 text-rose-700"
      : tone === "info"
        ? "border-blue-200 bg-blue-50 text-blue-800"
        : "border-amber-200 bg-amber-50 text-amber-800";

  return (
    <div className={`flex items-start gap-2 rounded-lg border px-3 py-2.5 text-[12.5px] ${toneClass}`}>
      <AlertTriangle size={15} className="mt-0.5 shrink-0" />
      <div>
        <div className="font-semibold">{title}</div>
        <p className="mt-0.5 opacity-90">{message}</p>
      </div>
    </div>
  );
}

function ExceptionSection({ children, title = "Thông báo xử lý" }: { children: ReactNode; title?: string }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-[14px] font-semibold text-slate-950">{title}</h3>
          <p className="text-[12px] text-slate-500">Vui lòng xử lý các cảnh báo bên dưới trước khi tiếp tục.</p>
        </div>
      </div>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function StatusBadge({ value }: { value: ContractStatus | string }) {
  const tone =
    value === "Hết hiệu lực"
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

function ExpiryAlertCard() {
  return (
    <section className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-white text-amber-700 ring-1 ring-amber-200">
            <AlertTriangle size={18} />
          </div>
          <div>
            <div className="text-[14px] font-semibold text-amber-900">12 hợp đồng sắp hết hạn trong 30 ngày</div>
            <p className="text-[12px] text-amber-800">Ưu tiên rà soát và lập kế hoạch gia hạn cho các đơn vị liên quan.</p>
          </div>
        </div>
        <button className="h-9 rounded-lg bg-amber-600 px-3.5 text-[12px] font-semibold text-white shadow-sm hover:bg-amber-700">
          Xem danh sách
        </button>
      </div>
    </section>
  );
}

function ContractFilters() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex h-9 w-[310px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 shadow-sm">
          <Search size={14} className="text-slate-400" />
          <input
            className="min-w-0 flex-1 bg-transparent text-[12px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
            placeholder="Tìm theo mã cán bộ, họ tên, số hợp đồng..."
          />
        </div>
        <ExpandedSelect label="Loại hợp đồng" value="Xác định thời hạn" options={contractTypeOptions} width="w-[230px]" />
        <ExpandedSelect label="Trạng thái" value="Sắp hết hạn" options={statusOptions} width="w-[235px]" />
        <ExpandedSelect label="Ngày hết hạn" value="30 ngày tới" options={dateRangeOptions} width="w-[220px]" />
        <ExpandedSelect label="Đơn vị" value="Khoa CNTT" options={unitOptions} width="w-[245px]" searchable />
        <button className="h-9 rounded-lg bg-blue-700 px-3.5 text-[12px] font-semibold text-white shadow-sm hover:bg-blue-800">
          Tìm kiếm
        </button>
        <button className="h-9 rounded-lg border border-slate-300 bg-white px-3.5 text-[12px] font-semibold text-slate-600 shadow-sm hover:bg-slate-50">
          Xóa lọc
        </button>
      </div>
    </section>
  );
}

function ContractTable({ compact = false, onOpenFrame }: { compact?: boolean; onOpenFrame?: (frame: Frame) => void }) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-[1.15fr_0.8fr_1.1fr_1.15fr_0.85fr_0.85fr_0.95fr_0.8fr_1fr] bg-blue-100 px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-800">
        <span>Số hợp đồng</span>
        <span>Mã cán bộ</span>
        <span>Họ tên</span>
        <span>Loại hợp đồng</span>
        <span>Ngày hiệu lực</span>
        <span>Ngày hết hạn</span>
        <span>Trạng thái</span>
        <span>Số ngày còn lại</span>
        <span>Thao tác</span>
      </div>

      {contractRows.map((row) => (
        <div
          key={row.number}
          className="grid min-h-[58px] grid-cols-[1.15fr_0.8fr_1.1fr_1.15fr_0.85fr_0.85fr_0.95fr_0.8fr_1fr] items-center border-b border-slate-100 px-4 text-[12px] text-slate-800 last:border-0"
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
          <span className={row.remaining === "Quá hạn" ? "font-medium text-rose-600" : "text-slate-600"}>{row.remaining}</span>
          <div className="flex items-center gap-1.5">
            <button className="inline-flex h-7 items-center gap-1 rounded-lg px-2 text-[11px] font-medium text-blue-700 hover:bg-blue-50">
              <Eye size={13} /> Xem
            </button>
            <button
              onClick={() => onOpenFrame?.("renew")}
              className="inline-flex h-7 items-center gap-1 rounded-lg px-2 text-[11px] font-medium text-amber-700 hover:bg-amber-50"
            >
              <RotateCcw size={13} /> Gia hạn
            </button>
            {!compact ? (
              <button
                onClick={() => onOpenFrame?.("terminate")}
                className="inline-flex h-7 items-center gap-1 rounded-lg px-2 text-[11px] font-medium text-rose-600 hover:bg-rose-50"
              >
                <X size={13} /> Chấm dứt
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </section>
  );
}

function ContractListContent({ dimmed = false, onOpenFrame }: { dimmed?: boolean; onOpenFrame?: (frame: Frame) => void }) {
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
        <ExpiryAlertCard />
        <ContractFilters />
        <ContractTable compact={dimmed} onOpenFrame={onOpenFrame} />
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

function Field({
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
      <label className="flex items-center gap-1 text-[13px] font-medium text-slate-700">
        {label}
        {required ? <span className="text-red-600">*</span> : null}
      </label>
      {children}
      {error ? <p className="text-[12px] font-medium leading-5 text-rose-600">{error}</p> : hint ? <div className="text-[12px] text-slate-500">{hint}</div> : null}
    </div>
  );
}

function InputBox({ value, placeholder, icon }: { value?: string; placeholder?: string; icon?: ReactNode }) {
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

function SelectBox({
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
    <ExpandedSelect label={label} value={value} options={options} searchable={searchable} width="w-full" />
  );
}

function FileUpload({ label, error }: { label: string; error?: string }) {
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

function ModalShell({
  title,
  subtitle,
  children,
  footer,
  danger,
  onClose,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
  danger?: boolean;
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 flex items-start justify-center bg-slate-950/10 p-8">
      <section className="flex max-h-[calc(100vh-122px)] w-full max-w-[1440px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
        <header className="flex items-center justify-between border-b border-slate-200 px-8 py-4">
          <div>
            <h2 className={`text-[18px] font-semibold ${danger ? "text-rose-700" : "text-slate-950"}`}>{title}</h2>
            <p className="mt-0.5 text-[12px] text-slate-500">{subtitle}</p>
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
    <ModalShell
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
        {submitted ? (
          <ExceptionSection title="Không thể tạo hợp đồng">
            <ExceptionCard title="Thời gian hợp đồng bị chồng lấn" message="Khoảng thời gian hợp đồng bị chồng lấn với hợp đồng hiện có." tone="danger" />
            <ExceptionCard title="Loại hợp đồng không khả dụng" message="Vui lòng chọn loại hợp đồng khác nếu option trong danh sách đang bị khóa." />
          </ExceptionSection>
        ) : null}

        <div className="grid grid-cols-[minmax(0,1fr)_360px] gap-6">
          <section className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nhân sự liên kết" required error={submitted ? "Nhân sự chưa đủ điều kiện tạo hợp đồng mới." : undefined}>
              <SelectBox value="CB2022-0118 · Trần Thị Bình" options={personnelOptions} searchable label="Nhân sự" />
            </Field>
            <Field label="Loại hợp đồng" required error={submitted ? "Loại hợp đồng này đã ngừng sử dụng cho hợp đồng mới." : undefined}>
              <SelectBox value="Xác định thời hạn" options={contractTypeOptions} label="Loại" />
            </Field>
            <Field label="Số hợp đồng" required error={submitted ? "Số hợp đồng đã tồn tại." : undefined}>
              <InputBox value="HĐLĐ-2026-0168" />
            </Field>
            <Field label="Ngày ký" required error={submitted ? "Ngày ký không được sau ngày bắt đầu hợp đồng." : undefined}>
              <InputBox value="30/05/2026" icon={<Calendar size={15} />} />
            </Field>
            <Field label="Ngày bắt đầu" required error={submitted ? "Khoảng thời gian hợp đồng bị chồng lấn với hợp đồng hiện có." : undefined}>
              <InputBox value="01/07/2026" icon={<Calendar size={15} />} />
            </Field>
            <Field label="Ngày kết thúc" required error={submitted ? "Ngày kết thúc phải sau ngày bắt đầu và phù hợp với loại hợp đồng đã chọn." : undefined}>
              <InputBox value="30/06/2029" icon={<Calendar size={15} />} />
            </Field>
            <Field label="Hệ số lương áp dụng" required error={submitted ? "Vui lòng nhập hệ số lương hợp lệ." : undefined}>
              <InputBox value="3.00" />
            </Field>
            <Field label="Phụ cấp">
              <InputBox value="0.30 phụ cấp chức vụ" />
            </Field>
            <div className="col-span-2">
              <Field label="Đơn vị công tác theo hợp đồng" required error={submitted ? "Vui lòng chọn đơn vị công tác theo hợp đồng." : undefined}>
                <SelectBox value="Khoa Công nghệ thông tin" options={unitOptions} searchable label="Đơn vị" />
              </Field>
            </div>
            <div className="col-span-2">
              <Field label="Upload file hợp đồng PDF" required>
                <FileUpload label="Tải file hợp đồng PDF" error={submitted ? "Vui lòng tải file hợp đồng PDF." : undefined} />
              </Field>
            </div>
          </div>
          </section>
          <PersonnelPreview />
        </div>
      </div>
    </ModalShell>
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
    <ModalShell
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
        {submitted ? (
          <ExceptionSection title="Không thể gia hạn hợp đồng">
            <ExceptionCard title="Chưa đủ điều kiện gia hạn" message="Hợp đồng hiện tại chưa nằm trong thời gian chờ gia hạn nên không thể tạo hợp đồng kế tiếp." tone="danger" />
            <ExceptionCard title="Kiểm tra lại thời gian" message="Ngày bắt đầu mới cần liền sau ngày hết hạn hiện tại và không trùng với hợp đồng khác." />
          </ExceptionSection>
        ) : null}

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-[15px] font-semibold text-slate-950">Hợp đồng cũ</h3>
          <div className="grid grid-cols-5 gap-3 text-[13px]">
            {["HĐLĐ-2025-0098", "Xác định thời hạn 36 tháng", "01/07/2023", "30/06/2026"].map((value, index) => (
              <div key={value} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
                <div className="text-[11px] text-slate-500">{["Số hợp đồng", "Loại hợp đồng", "Ngày bắt đầu", "Ngày hết hạn"][index]}</div>
                <div className="mt-0.5 font-medium text-slate-900">{value}</div>
              </div>
            ))}
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <div className="text-[11px] text-slate-500">Trạng thái</div>
              <div className="mt-1"><StatusBadge value="Sắp hết hạn" /></div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-[15px] font-semibold text-slate-950">Thông tin gia hạn</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Loại hợp đồng mới" required error={submitted ? "Loại hợp đồng này đã ngừng sử dụng cho hợp đồng mới." : undefined}>
              <SelectBox value="Xác định thời hạn" options={contractTypeOptions} label="Loại" />
            </Field>
            <Field label="Ngày bắt đầu mới" required hint="Ngày bắt đầu mới được đề xuất dựa trên ngày hết hạn hợp đồng hiện tại." error={submitted ? "Ngày bắt đầu mới phải liền sau ngày hết hạn hiện tại." : undefined}>
              <InputBox value="01/07/2026" icon={<Calendar size={15} />} />
            </Field>
            <Field label="Ngày kết thúc mới" required error={submitted ? "Ngày kết thúc mới phải sau ngày bắt đầu mới và phù hợp với loại hợp đồng đã chọn." : undefined}>
              <InputBox value="30/06/2029" icon={<Calendar size={15} />} />
            </Field>
            <Field label="Hệ số lương" required error={submitted ? "Vui lòng nhập hệ số lương hợp lệ." : undefined}>
              <InputBox value="3.33" />
            </Field>
            <Field label="Phụ cấp">
              <InputBox value="0.30 phụ cấp trách nhiệm" />
            </Field>
            <Field label="Upload file hợp đồng gia hạn" required>
              <FileUpload label="Tải file gia hạn" error={submitted ? "Vui lòng tải file hợp đồng gia hạn." : undefined} />
            </Field>
          </div>
        </section>

      </div>
    </ModalShell>
  );
}

function TerminateContractModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <ModalShell
      title="Chấm dứt hợp đồng trước hạn"
      subtitle="Thao tác nguy hiểm cần có quyết định kèm theo trước khi xác nhận."
      danger
      onClose={onClose}
      footer={
        <>
          <button onClick={onClose} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50">Hủy</button>
          <button onClick={() => setSubmitted(true)} className="rounded-lg bg-rose-600 px-4 py-2 text-[13px] font-medium text-white hover:bg-rose-700">Xác nhận chấm dứt</button>
        </>
      }
    >
      <div className="mx-auto max-w-[860px] space-y-4">
        <section className="rounded-xl border border-rose-200 bg-white p-5">
          <div className="mb-4 flex items-start gap-3 rounded-lg bg-rose-50 px-3 py-3 text-rose-700">
            <AlertTriangle size={18} className="mt-0.5 shrink-0" />
            <div>
              <div className="text-[14px] font-semibold">Hợp đồng sẽ chuyển sang trạng thái Hết hiệu lực.</div>
              <p className="mt-0.5 text-[12px] text-rose-600">Vui lòng kiểm tra số hợp đồng, nhân sự và ngày chấm dứt trước khi xác nhận.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <div className="text-[11px] text-slate-500">Số hợp đồng</div>
              <div className="mt-0.5 font-mono text-[13px] font-semibold text-slate-900">HĐLĐ-2026-0142</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <div className="text-[11px] text-slate-500">Họ tên nhân sự</div>
              <div className="mt-0.5 text-[13px] font-semibold text-slate-900">Nguyễn Văn An</div>
            </div>
            <Field label="Ngày chấm dứt" required error={submitted ? "Ngày chấm dứt phải nằm trong thời gian hiệu lực của hợp đồng." : undefined}>
              <InputBox value="30/06/2026" icon={<Calendar size={15} />} />
            </Field>
            <Field label="Lý do chấm dứt" required error={submitted ? "Vui lòng chọn lý do chấm dứt." : undefined}>
              <SelectBox value="Theo quyết định của Nhà trường" options={reasonOptions} label="Lý do" />
            </Field>
            <div className="col-span-2">
              <Field label="Upload file quyết định" required>
                <FileUpload label="Tải file quyết định" error={submitted ? "Vui lòng tải file quyết định." : undefined} />
              </Field>
            </div>
          </div>
        </section>

        {submitted ? (
          <ExceptionSection title="Cần xác nhận thêm">
            <ExceptionCard title="Hợp đồng hiệu lực cuối cùng" message="Đây là hợp đồng còn hiệu lực cuối cùng của nhân sự. Cần xem xét luồng Đánh dấu thôi việc nhân sự trước khi hoàn tất." />
            <ExceptionCard title="Điều kiện chấm dứt" message="Chỉ được chấm dứt trước hạn khi hợp đồng đang ở trạng thái Còn hiệu lực." tone="info" />
          </ExceptionSection>
        ) : null}
      </div>
    </ModalShell>
  );
}

function ActiveFrameOverlay({ currentFrame, onClose }: { currentFrame: Frame; onClose: () => void }) {
  if (currentFrame === "create") return <CreateContractModal onClose={onClose} />;
  if (currentFrame === "renew") return <RenewContractModal onClose={onClose} />;
  if (currentFrame === "terminate") return <TerminateContractModal onClose={onClose} />;
  return null;
}

export default function App() {
  const [currentFrame, setCurrentFrame] = useState<Frame>("list");
  const showOverlay = currentFrame !== "list";

  return (
    <div className="min-h-screen bg-white font-['Be_Vietnam_Pro'] text-slate-900">
      <div className="flex min-h-screen overflow-hidden bg-white">
        <Sidebar />
        <main className="min-w-0 flex-1 bg-slate-50">
          <div className="m-0 min-h-full bg-white shadow-sm">
            <Header currentFrame={currentFrame} onFrameChange={setCurrentFrame} />
            <div className="relative min-h-[calc(100vh-58px)] overflow-hidden bg-white">
              <ContractListContent dimmed={showOverlay} onOpenFrame={setCurrentFrame} />
              <ActiveFrameOverlay currentFrame={currentFrame} onClose={() => setCurrentFrame("list")} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
