import { useState, type ReactNode } from "react";
import {
  Banknote,
  BookOpen,
  ChevronDown,
  Check,
  CircleUserRound,
  Edit3,
  FileBadge,
  FileText,
  LayoutList,
  Plus,
  RotateCcw,
  Search,
} from "lucide-react";
import tluLogoIcon from "./tlu-logo-icon.png";

type MenuItem = {
  label: string;
  icon: ReactNode;
  active?: boolean;
};

const menuItems: MenuItem[] = [
  { label: "Hồ sơ nhân sự", icon: <CircleUserRound size={16} />, active: true },
  { label: "Hệ số lương", icon: <Banknote size={16} /> },
  { label: "Phụ cấp", icon: <FileBadge size={16} /> },
  { label: "Hợp đồng", icon: <FileText size={16} /> },
  { label: "Thống kê", icon: <BookOpen size={16} /> },
];

type PersonnelRow = [string, string, string, string, string, string, string];

const rows: PersonnelRow[] = [
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

function Sidebar() {
  return (
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
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`mb-1 flex h-9 w-full items-center gap-2 rounded-lg px-3 text-[13px] transition ${
              item.active
                ? "bg-blue-50 font-semibold text-blue-700"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function SelectFilter({
  label,
  value,
  options,
  open,
  onToggle,
  onSelect,
}: {
  label: string;
  value: string;
  options: string[];
  open: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-col">
      <button
        onClick={onToggle}
        className={`flex h-9 min-w-[142px] items-center justify-between rounded-lg border bg-white px-3 text-[12px] shadow-sm ${
          value === "Tất cả" ? "border-slate-300 text-slate-500" : "border-blue-300 text-blue-700"
        }`}
      >
        <span>{value === "Tất cả" ? label : value}</span>
        <ChevronDown size={14} className={open ? "rotate-180 text-blue-500" : "text-slate-400"} />
      </button>

      {open ? (
        <div className="relative z-20 mt-1 mb-[-166px] w-[210px] overflow-hidden rounded-lg border border-slate-200 bg-white py-0.5 shadow-lg">
          {["Tất cả", ...options].map((option) => {
            const active = option === value;
            return (
              <button
                key={option}
                onClick={() => onSelect(option)}
                className={`flex h-8 w-full items-center justify-between px-3 text-left text-[12px] ${
                  active ? "bg-blue-50 font-semibold text-blue-700" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{option}</span>
                {active ? <Check size={14} /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
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

function AddPersonnelButton() {
  return (
    <button className="flex h-9 items-center gap-2 rounded-lg bg-blue-700 px-3.5 text-[12px] font-semibold text-white shadow-sm hover:bg-blue-800">
      <Plus size={14} />
      Thêm hồ sơ nhân sự
    </button>
  );
}

function Header() {
  return (
    <header className="flex h-[58px] items-center justify-between border-b border-slate-200 px-6">
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
  );
}

function PersonnelTable({ data }: { data: PersonnelRow[] }) {
  return (
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

      {data.length > 0 ? data.map(([code, name, unit, degree, role, contract, status]) => (
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
      )) : (
        <div className="px-4 py-10 text-center text-[13px] text-slate-500">
          Không có hồ sơ phù hợp với bộ lọc hiện tại.
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [openFilter, setOpenFilter] = useState<string | null>("unit");
  const [unit, setUnit] = useState("Tất cả");
  const [degree, setDegree] = useState("Tất cả");
  const [contract, setContract] = useState("Tất cả");
  const [status, setStatus] = useState("Tất cả");

  const unitOptions = Array.from(new Set(rows.map((row) => row[2])));
  const degreeOptions = Array.from(new Set(rows.map((row) => row[3])));
  const contractOptions = Array.from(new Set(rows.map((row) => row[5])));
  const statusOptions = Array.from(new Set(rows.map((row) => row[6])));

  const filteredRows = rows.filter(([code, name, rowUnit, rowDegree, role, rowContract, rowStatus]) => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery =
      !normalizedQuery ||
      [code, name, rowUnit, rowDegree, role, rowContract, rowStatus].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      );
    return (
      matchesQuery &&
      (unit === "Tất cả" || rowUnit === unit) &&
      (degree === "Tất cả" || rowDegree === degree) &&
      (contract === "Tất cả" || rowContract === contract) &&
      (status === "Tất cả" || rowStatus === status)
    );
  });

  const hasFilter =
    query.trim() || unit !== "Tất cả" || degree !== "Tất cả" || contract !== "Tất cả" || status !== "Tất cả";

  const resetFilters = () => {
    setQuery("");
    setUnit("Tất cả");
    setDegree("Tất cả");
    setContract("Tất cả");
    setStatus("Tất cả");
    setOpenFilter(null);
  };

  return (
    <div className="min-h-screen bg-white font-['Be_Vietnam_Pro'] text-slate-900">
      <div className="flex min-h-screen overflow-hidden bg-white">
        <Sidebar />

        <main className="min-w-0 flex-1 bg-slate-50">
          <div className="m-0 min-h-full rounded-l-none bg-white shadow-sm">
            <Header />

            <div className="px-6 py-5">
              <div className="mb-3 flex items-start justify-between gap-4">
                <div className="flex items-start gap-2">
                  <div className="flex h-9 w-[170px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 shadow-sm">
                    <Search size={14} className="text-slate-400" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      className="min-w-0 flex-1 bg-transparent text-[12px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
                      placeholder="Tìm kiếm"
                    />
                  </div>
                  <SelectFilter
                    label="Đơn vị công tác"
                    value={unit}
                    options={unitOptions}
                    open={openFilter === "unit"}
                    onToggle={() => setOpenFilter((current) => (current === "unit" ? null : "unit"))}
                    onSelect={(value) => {
                      setUnit(value);
                      setOpenFilter(null);
                    }}
                  />
                  <SelectFilter
                    label="Học hàm/học vị"
                    value={degree}
                    options={degreeOptions}
                    open={openFilter === "degree"}
                    onToggle={() => setOpenFilter((current) => (current === "degree" ? null : "degree"))}
                    onSelect={(value) => {
                      setDegree(value);
                      setOpenFilter(null);
                    }}
                  />
                  <SelectFilter
                    label="Hợp đồng"
                    value={contract}
                    options={contractOptions}
                    open={openFilter === "contract"}
                    onToggle={() => setOpenFilter((current) => (current === "contract" ? null : "contract"))}
                    onSelect={(value) => {
                      setContract(value);
                      setOpenFilter(null);
                    }}
                  />
                  <SelectFilter
                    label="Trạng thái"
                    value={status}
                    options={statusOptions}
                    open={openFilter === "status"}
                    onToggle={() => setOpenFilter((current) => (current === "status" ? null : "status"))}
                    onSelect={(value) => {
                      setStatus(value);
                      setOpenFilter(null);
                    }}
                  />
                  {hasFilter ? (
                    <button
                      onClick={resetFilters}
                      className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-semibold text-slate-600 shadow-sm hover:bg-slate-50"
                    >
                      <RotateCcw size={13} />
                      Xóa lọc
                    </button>
                  ) : null}
                </div>

                <div className="pt-0">
                  <AddPersonnelButton />
                </div>
              </div>

              <PersonnelTable data={filteredRows} />

              <div className="mt-4 flex items-center justify-between text-[12px] text-slate-500">
                <span>Hiển thị {filteredRows.length} / {rows.length} hồ sơ nhân sự</span>
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
          </div>
        </main>
      </div>
    </div>
  );
}
