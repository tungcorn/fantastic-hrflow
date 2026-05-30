import type { ReactNode } from "react";
import {
  Banknote,
  BookOpen,
  ChevronDown,
  CircleUserRound,
  Edit3,
  FileBadge,
  FileText,
  LayoutList,
  Plus,
  Search,
  ShieldCheck,
  Table2,
} from "lucide-react";

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

const rows = [
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
    <aside className="w-[245px] shrink-0 border-r border-slate-200 bg-white">
      <div className="flex items-center gap-3 px-5 py-4">
        <div className="grid size-9 place-items-center rounded-xl bg-blue-700 text-white">
          <ShieldCheck size={17} />
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

function AddPersonnelButton() {
  return (
    <div className="relative">
      <button className="flex h-9 items-center gap-2 rounded-lg bg-blue-700 px-3.5 text-[12px] font-semibold text-white shadow-sm hover:bg-blue-800">
        <Plus size={14} />
        Thêm hồ sơ nhân sự
        <ChevronDown size={14} />
      </button>
      <div className="absolute right-0 top-10 z-10 w-[184px] overflow-hidden rounded-lg bg-blue-700 py-1 text-white shadow-xl ring-1 ring-blue-500">
        <button className="flex h-9 w-full items-center gap-2 px-3 text-left text-[12px] hover:bg-blue-600">
          <Plus size={14} />
          Thêm thủ công
        </button>
        <button className="flex h-9 w-full items-center gap-2 px-3 text-left text-[12px] hover:bg-blue-600">
          <Table2 size={14} />
          Thêm bằng Excel
        </button>
      </div>
    </div>
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

function PersonnelTable() {
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

      {rows.map(([code, name, unit, degree, role, contract, status]) => (
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
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-900 p-4 font-['Be_Vietnam_Pro'] text-slate-900">
      <div className="mx-auto flex min-h-[calc(100vh-32px)] max-w-[1420px] overflow-hidden rounded-lg bg-white">
        <Sidebar />

        <main className="min-w-0 flex-1 bg-slate-50">
          <div className="m-0 min-h-full rounded-l-none bg-white shadow-sm">
            <Header />

            <div className="px-6 py-5">
              <div className="mb-5 flex items-center justify-between gap-4">
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

                <AddPersonnelButton />
              </div>

              <PersonnelTable />

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
          </div>
        </main>
      </div>
    </div>
  );
}
