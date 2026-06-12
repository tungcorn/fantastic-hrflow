import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AlertCircle,
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
  LayoutList,
  MoreHorizontal,
  Plus,
  RotateCcw,
  Search,
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
  { label: "Hồ sơ nhân sự", icon: <CircleUserRound size={17} /> },
  { label: "Hợp đồng lao động", icon: <FileText size={17} />, active: true },
  { label: "Cơ cấu tổ chức", icon: <Building2 size={17} /> },
  { label: "Phụ cấp và hệ số lương", icon: <BarChart3 size={17} /> },
  { label: "Tài khoản", icon: <ShieldCheck size={17} /> },
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

function ContractTable({ compact = false, onOpenFrame }: { compact?: boolean; onOpenFrame?: (frame: Frame) => void }) {
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
              <button className="inline-flex h-7 items-center gap-1 rounded-lg px-2 text-[11px] font-medium text-blue-700 hover:bg-blue-50">
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
      <label className="flex flex-wrap items-start gap-x-1 gap-y-0.5 text-[13px] font-medium leading-5 text-slate-700">
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
    <ExpandedSelect label={label} value={value} options={options} searchable={searchable} width="w-full" hideLabelWhenSelected />
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
            <Field label="Ngày chấm dứt hiệu lực" required error={submitted ? "Ngày chấm dứt phải nằm trong thời gian hiệu lực của hợp đồng." : undefined}>
              <InputBox value="30/06/2026" icon={<Calendar size={15} />} />
            </Field>
            <Field label="Lý do chấm dứt" required error={submitted ? "Vui lòng chọn lý do chấm dứt." : undefined}>
              <SelectBox value="Theo quyết định của Nhà trường" options={reasonOptions} label="Lý do" />
            </Field>
            <div className="col-span-2">
              <Field label="Tài liệu xác nhận chấm dứt" required>
                <FileUpload label="Tải quyết định / biên bản xác nhận" error={submitted ? "Vui lòng tải tài liệu xác nhận chấm dứt." : undefined} />
              </Field>
            </div>
          </div>
        </section>

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
