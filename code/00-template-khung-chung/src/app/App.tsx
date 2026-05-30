import type { ReactNode } from "react";
import {
  BadgeCheck,
  Banknote,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  ClipboardList,
  Download,
  FileBadge,
  FileText,
  Filter,
  GraduationCap,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
} from "lucide-react";

type SidebarItem = {
  id: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
};

const sidebarItems: SidebarItem[] = [
  { id: "ho-so", label: "Hồ sơ nhân sự", icon: <CircleUserRound size={18} />, active: true },
  { id: "co-cau", label: "Cơ cấu tổ chức", icon: <Building2 size={18} /> },
  { id: "luong", label: "Lương & phụ cấp", icon: <Banknote size={18} /> },
  { id: "hop-dong", label: "Hợp đồng", icon: <FileText size={18} /> },
  { id: "dao-tao", label: "Đào tạo", icon: <GraduationCap size={18} /> },
  { id: "bao-cao", label: "Báo cáo", icon: <BookOpen size={18} /> },
];

const employees = [
  ["CB2026-0048", "Nguyễn Văn A", "Khoa CNTT", "Giảng viên", "Đang hoàn thiện"],
  ["CB2024-0112", "Trần Thị B", "Phòng TCCB", "Chuyên viên", "Đang hoạt động"],
  ["CB2023-0089", "Lê Minh C", "Khoa Cơ khí", "Giảng viên", "Sắp hết hợp đồng"],
  ["CB2022-0141", "Phạm Khánh D", "Phòng TCKT", "Kế toán viên", "Đang hoạt động"],
  ["CB2021-0065", "Hoàng Văn E", "Khoa Kinh tế", "Trưởng bộ môn", "Đang hoạt động"],
];

function Sidebar() {
  return (
    <aside className="flex w-[240px] shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-3 px-5 py-4">
        <div className="grid size-10 place-items-center rounded-xl bg-blue-700 text-white">
          <ShieldCheck size={19} />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-slate-900">Quản lý nhân sự</div>
          <div className="text-[11px] text-slate-500">Trường Đại học Thủy lợi</div>
        </div>
      </div>

      <nav className="flex-1 px-2 py-2">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            className={`mb-1 flex h-10 w-full items-center gap-2.5 rounded-lg px-3 text-left text-[13px] transition ${
              item.active
                ? "bg-blue-50 font-semibold text-blue-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="border-t border-slate-100 p-4">
        <div className="rounded-lg bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-700">
            <BadgeCheck size={14} className="text-blue-700" />
            TCCB
          </div>
          <p className="mt-1 text-[11px] leading-4 text-slate-500">Quyền nhập, duyệt và tra cứu hồ sơ.</p>
        </div>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <header className="flex h-[65px] items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-2 text-[13px] text-slate-500">
        <span>HRMS</span>
        <ChevronRight size={13} />
        <span>Hồ sơ nhân sự</span>
        <ChevronRight size={13} />
        <span className="font-semibold text-slate-800">Màn hình nhiệm vụ</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
          <Bell size={17} />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" />
        </button>
        <div className="text-right">
          <div className="text-[13px] font-semibold text-slate-900">Trưởng phòng TCCB</div>
          <div className="text-[11px] text-slate-500">Nhân sự phòng TCCB</div>
        </div>
        <div className="grid size-10 place-items-center rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100">
          <CircleUserRound size={21} />
        </div>
      </div>
    </header>
  );
}

function StatCard({
  label,
  value,
  tone,
  icon,
}: {
  label: string;
  value: string;
  tone: "blue" | "emerald" | "amber" | "slate";
  icon: ReactNode;
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
    slate: "bg-slate-50 text-slate-700 ring-slate-100",
  };
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[12px] font-medium text-slate-500">{label}</div>
          <div className="mt-1 text-[24px] font-semibold leading-none text-slate-900">{value}</div>
        </div>
        <div className={`grid size-10 place-items-center rounded-lg ring-1 ${tones[tone]}`}>{icon}</div>
      </div>
    </section>
  );
}

function FieldShell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[12px] font-semibold text-slate-600">{label}</label>
      {children}
    </div>
  );
}

function SelectLike({ value }: { value: string }) {
  return (
    <button className="flex h-10 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 text-[13px] text-slate-800">
      <span>{value}</span>
      <ChevronDown size={15} className="text-slate-400" />
    </button>
  );
}

function StatusBadge({ value }: { value: string }) {
  const className =
    value === "Sắp hết hợp đồng"
      ? "bg-amber-50 text-amber-700 ring-amber-100"
      : value === "Đang hoàn thiện"
        ? "bg-blue-50 text-blue-700 ring-blue-100"
        : "bg-emerald-50 text-emerald-700 ring-emerald-100";
  return <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ring-1 ${className}`}>{value}</span>;
}

function MainTable() {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="grid grid-cols-[1fr_1.4fr_1.2fr_1fr_1fr_44px] border-b border-slate-200 bg-slate-50 px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-500">
        <span>Mã CB</span>
        <span>Họ tên</span>
        <span>Đơn vị</span>
        <span>Chức vụ</span>
        <span>Trạng thái</span>
        <span />
      </div>
      {employees.map(([code, name, unit, role, status]) => (
        <div
          key={code}
          className="grid grid-cols-[1fr_1.4fr_1.2fr_1fr_1fr_44px] items-center border-b border-slate-100 px-4 py-3 text-[13px] text-slate-700 last:border-0"
        >
          <span className="font-mono text-[12px] font-semibold text-slate-600">{code}</span>
          <span className="font-semibold text-slate-900">{name}</span>
          <span>{unit}</span>
          <span>{role}</span>
          <span>
            <StatusBadge value={status} />
          </span>
          <button className="grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700">
            <MoreHorizontal size={17} />
          </button>
        </div>
      ))}
    </section>
  );
}

function RightPanel() {
  return (
    <aside className="w-[300px] shrink-0 space-y-4">
      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] font-semibold text-slate-900">Trạng thái cần chú ý</h3>
          <ClipboardList size={16} className="text-slate-400" />
        </div>
        <div className="mt-4 space-y-3">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <div className="text-[13px] font-semibold text-amber-900">12 hợp đồng sắp hết hạn</div>
            <div className="mt-1 text-[12px] text-amber-700">Cần xử lý trong 30 ngày tới.</div>
          </div>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <div className="text-[13px] font-semibold text-blue-900">8 hồ sơ đang hoàn thiện</div>
            <div className="mt-1 text-[12px] text-blue-700">Thiếu tài liệu hoặc chờ duyệt.</div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <h3 className="text-[14px] font-semibold text-slate-900">Tác vụ nhanh</h3>
        <div className="mt-4 grid gap-2">
          <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-[13px] font-semibold text-slate-700 hover:bg-slate-50">
            <Plus size={15} /> Thêm hồ sơ
          </button>
          <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-[13px] font-semibold text-slate-700 hover:bg-slate-50">
            <Download size={15} /> Xuất Excel
          </button>
        </div>
      </section>
    </aside>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 font-['Be_Vietnam_Pro'] text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <Header />
          <div className="p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-[24px] font-semibold leading-tight text-slate-950">Màn hình nhiệm vụ HRMS</h1>
                <p className="mt-1 text-[13px] text-slate-500">Khung giao diện chung cho các màn hình Figma Make của nhóm.</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[13px] font-semibold text-slate-700 hover:bg-slate-50">
                  <Filter size={15} /> Bộ lọc
                </button>
                <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-700 px-3 text-[13px] font-semibold text-white hover:bg-blue-800">
                  <Plus size={15} /> Tạo mới
                </button>
              </div>
            </div>

            <div className="mb-5 grid grid-cols-4 gap-4">
              <StatCard label="Tổng hồ sơ" value="1.248" tone="blue" icon={<CircleUserRound size={18} />} />
              <StatCard label="Đang hoạt động" value="1.186" tone="emerald" icon={<CheckCircle2 size={18} />} />
              <StatCard label="Sắp hết hạn" value="12" tone="amber" icon={<FileBadge size={18} />} />
              <StatCard label="Đào tạo đang mở" value="05" tone="slate" icon={<GraduationCap size={18} />} />
            </div>

            <div className="flex gap-5">
              <section className="min-w-0 flex-1 space-y-4">
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="grid grid-cols-[1.4fr_1fr_1fr_auto] items-end gap-3">
                    <FieldShell label="Tìm kiếm">
                      <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                        <Search size={15} className="text-slate-400" />
                        <input
                          className="min-w-0 flex-1 bg-transparent text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
                          placeholder="Tìm theo mã, họ tên, CCCD"
                        />
                      </div>
                    </FieldShell>
                    <FieldShell label="Đơn vị">
                      <SelectLike value="Tất cả đơn vị" />
                    </FieldShell>
                    <FieldShell label="Trạng thái">
                      <SelectLike value="Tất cả trạng thái" />
                    </FieldShell>
                    <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[13px] font-semibold text-slate-700 hover:bg-slate-50">
                      <CalendarDays size={15} /> Tháng này
                    </button>
                  </div>
                </div>

                <MainTable />
              </section>

              <RightPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
