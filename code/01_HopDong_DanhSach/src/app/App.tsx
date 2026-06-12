import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  CircleUserRound,
  ClipboardList,
  Clock3,
  Download,
  FileSpreadsheet,
  FileText,
  LayoutDashboard,
  Mail,
  Phone,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  UserPlus,
  X,
} from "lucide-react";
import tluLogoIcon from "./tlu-logo-icon.png";

type ModuleId = "overview" | "personnel" | "contracts";
type EmployeeStatus = "Đang hoạt động" | "Chờ duyệt" | "Đã thôi việc";
type ContractStatus = "Còn hiệu lực" | "Sắp hết hạn" | "Chờ gia hạn" | "Hết hiệu lực";

type Employee = {
  id: string;
  name: string;
  unit: string;
  degree: string;
  role: string;
  email: string;
  phone: string;
  status: EmployeeStatus;
  contractStatus: ContractStatus;
  salaryCoefficient: string;
  startDate: string;
};

type Contract = {
  id: string;
  employeeId: string;
  employeeName: string;
  unit: string;
  type: string;
  startDate: string;
  endDate: string;
  status: ContractStatus;
  salaryCoefficient: string;
  allowance: string;
};

type Activity = {
  id: string;
  time: string;
  title: string;
  description: string;
};

type AppData = {
  employees: Employee[];
  contracts: Contract[];
  activity: Activity[];
};

type EmployeeDraft = {
  name: string;
  unit: string;
  degree: string;
  role: string;
  email: string;
  phone: string;
  salaryCoefficient: string;
};

type ContractDraft = {
  employeeId: string;
  type: string;
  startDate: string;
  endDate: string;
  status: ContractStatus;
  salaryCoefficient: string;
  allowance: string;
};

const STORAGE_KEY = "hrflow-live-presentation-data-v1";

const units = [
  "Khoa Công nghệ thông tin",
  "Khoa Kinh tế và Quản lý",
  "Phòng Tổ chức - Cán bộ",
  "Phòng Tài chính - Kế toán",
  "Ban Giám hiệu",
];

const degrees = ["Cử nhân", "Thạc sĩ", "Tiến sĩ", "Phó Giáo sư", "Giáo sư"];

const contractTypes = [
  "Không xác định thời hạn",
  "Xác định thời hạn 36 tháng",
  "Xác định thời hạn 24 tháng",
  "Xác định thời hạn 12 tháng",
  "Hợp đồng thử việc",
];

const statusOrder: ContractStatus[] = ["Còn hiệu lực", "Sắp hết hạn", "Chờ gia hạn", "Hết hiệu lực"];

const seedEmployees: Employee[] = [
  {
    id: "CB2021-0034",
    name: "Nguyễn Văn An",
    unit: "Ban Giám hiệu",
    degree: "Giáo sư",
    role: "Hiệu trưởng",
    email: "an.nv@tlu.edu.vn",
    phone: "0987654301",
    status: "Đang hoạt động",
    contractStatus: "Còn hiệu lực",
    salaryCoefficient: "6.20",
    startDate: "01/01/2021",
  },
  {
    id: "CB2022-0118",
    name: "Trần Thị Bình",
    unit: "Khoa Công nghệ thông tin",
    degree: "Thạc sĩ",
    role: "Trưởng khoa",
    email: "binh.tt@tlu.edu.vn",
    phone: "0987654302",
    status: "Đang hoạt động",
    contractStatus: "Sắp hết hạn",
    salaryCoefficient: "4.40",
    startDate: "01/07/2022",
  },
  {
    id: "CB2020-0072",
    name: "Lê Văn Cường",
    unit: "Phòng Tổ chức - Cán bộ",
    degree: "Phó Giáo sư",
    role: "Chuyên viên chính",
    email: "cuong.lv@tlu.edu.vn",
    phone: "0987654303",
    status: "Chờ duyệt",
    contractStatus: "Chờ gia hạn",
    salaryCoefficient: "4.74",
    startDate: "15/06/2020",
  },
  {
    id: "CB2019-0015",
    name: "Phạm Thị Dung",
    unit: "Ban Giám hiệu",
    degree: "Tiến sĩ",
    role: "Trợ lý",
    email: "dung.pt@tlu.edu.vn",
    phone: "0987654304",
    status: "Đã thôi việc",
    contractStatus: "Hết hiệu lực",
    salaryCoefficient: "3.66",
    startDate: "01/03/2019",
  },
  {
    id: "CB2024-0190",
    name: "Hoàng Văn Em",
    unit: "Khoa Kinh tế và Quản lý",
    degree: "Phó Giáo sư",
    role: "Trưởng khoa",
    email: "em.hv@tlu.edu.vn",
    phone: "0987654305",
    status: "Đang hoạt động",
    contractStatus: "Còn hiệu lực",
    salaryCoefficient: "4.74",
    startDate: "01/02/2024",
  },
  {
    id: "CB2024-0196",
    name: "Ngô Thị Phương",
    unit: "Khoa Công nghệ thông tin",
    degree: "Tiến sĩ",
    role: "Phó trưởng khoa",
    email: "phuong.nt@tlu.edu.vn",
    phone: "0987654306",
    status: "Đang hoạt động",
    contractStatus: "Còn hiệu lực",
    salaryCoefficient: "4.40",
    startDate: "01/09/2024",
  },
  {
    id: "CB2023-0144",
    name: "Đỗ Văn Giang",
    unit: "Khoa Kinh tế và Quản lý",
    degree: "Tiến sĩ",
    role: "Giảng viên chính",
    email: "giang.dv@tlu.edu.vn",
    phone: "0987654307",
    status: "Chờ duyệt",
    contractStatus: "Chờ gia hạn",
    salaryCoefficient: "3.99",
    startDate: "01/09/2023",
  },
  {
    id: "CB2025-0021",
    name: "Lý Thị Mai",
    unit: "Khoa Kinh tế và Quản lý",
    degree: "Thạc sĩ",
    role: "Giảng viên cao cấp",
    email: "mai.lt@tlu.edu.vn",
    phone: "0987654308",
    status: "Đang hoạt động",
    contractStatus: "Còn hiệu lực",
    salaryCoefficient: "3.66",
    startDate: "02/01/2025",
  },
];

const seedContracts: Contract[] = [
  {
    id: "HĐLĐ-2026-0142",
    employeeId: "CB2021-0034",
    employeeName: "Nguyễn Văn An",
    unit: "Ban Giám hiệu",
    type: "Không xác định thời hạn",
    startDate: "01/01/2024",
    endDate: "31/12/2026",
    status: "Còn hiệu lực",
    salaryCoefficient: "6.20",
    allowance: "0.50 chức vụ",
  },
  {
    id: "HĐLĐ-2025-0098",
    employeeId: "CB2022-0118",
    employeeName: "Trần Thị Bình",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 36 tháng",
    startDate: "01/07/2023",
    endDate: "30/06/2026",
    status: "Sắp hết hạn",
    salaryCoefficient: "4.40",
    allowance: "0.30 trách nhiệm",
  },
  {
    id: "HĐLĐ-2024-0211",
    employeeId: "CB2020-0072",
    employeeName: "Lê Văn Cường",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    startDate: "15/06/2024",
    endDate: "14/06/2026",
    status: "Chờ gia hạn",
    salaryCoefficient: "4.74",
    allowance: "0.20 chuyên môn",
  },
  {
    id: "HĐLĐ-2023-0047",
    employeeId: "CB2019-0015",
    employeeName: "Phạm Thị Dung",
    unit: "Ban Giám hiệu",
    type: "Hợp đồng thử việc",
    startDate: "01/03/2023",
    endDate: "31/05/2023",
    status: "Hết hiệu lực",
    salaryCoefficient: "3.66",
    allowance: "0.00",
  },
  {
    id: "HĐLĐ-2026-0031",
    employeeId: "CB2024-0190",
    employeeName: "Hoàng Văn Em",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    startDate: "01/02/2026",
    endDate: "31/01/2027",
    status: "Còn hiệu lực",
    salaryCoefficient: "4.74",
    allowance: "0.30 chức vụ",
  },
];

const seedActivity: Activity[] = [
  {
    id: "ACT-001",
    time: "09:42",
    title: "Đồng bộ hồ sơ nhân sự",
    description: "8 hồ sơ mẫu đã được nạp vào hệ thống trình bày.",
  },
  {
    id: "ACT-002",
    time: "10:05",
    title: "Cảnh báo hợp đồng sắp hết hạn",
    description: "Trần Thị Bình còn hợp đồng cần xử lý trước 30/06/2026.",
  },
  {
    id: "ACT-003",
    time: "10:18",
    title: "Mở luồng gia hạn",
    description: "Hệ thống đã sẵn sàng tạo hợp đồng kế tiếp cho cán bộ chờ gia hạn.",
  },
];

const seedData: AppData = {
  employees: seedEmployees,
  contracts: seedContracts,
  activity: seedActivity,
};

const initialEmployeeDraft: EmployeeDraft = {
  name: "",
  unit: "Khoa Công nghệ thông tin",
  degree: "Thạc sĩ",
  role: "Giảng viên",
  email: "",
  phone: "",
  salaryCoefficient: "3.00",
};

const initialContractDraft: ContractDraft = {
  employeeId: seedEmployees[1].id,
  type: "Xác định thời hạn 36 tháng",
  startDate: "01/07/2026",
  endDate: "30/06/2029",
  status: "Còn hiệu lực",
  salaryCoefficient: "3.00",
  allowance: "0.30 trách nhiệm",
};

function readStoredData(): AppData {
  if (typeof window === "undefined") return seedData;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return seedData;

  try {
    const parsed = JSON.parse(raw) as Partial<AppData>;
    if (Array.isArray(parsed.employees) && Array.isArray(parsed.contracts) && Array.isArray(parsed.activity)) {
      return {
        employees: parsed.employees,
        contracts: parsed.contracts,
        activity: parsed.activity,
      };
    }
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return seedData;
}

function makeEmployeeCode(count: number) {
  return `CB2026-${String(count + 101).padStart(4, "0")}`;
}

function makeContractCode(count: number) {
  return `HĐLĐ-2026-${String(count + 168).padStart(4, "0")}`;
}

function timeNow() {
  return new Intl.DateTimeFormat("vi-VN", { hour: "2-digit", minute: "2-digit" }).format(new Date());
}

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function addActivity(activity: Activity[], title: string, description: string): Activity[] {
  return [
    {
      id: `ACT-${Date.now()}`,
      time: timeNow(),
      title,
      description,
    },
    ...activity,
  ].slice(0, 6);
}

function statusTone(status: EmployeeStatus | ContractStatus) {
  if (status === "Hết hiệu lực" || status === "Đã thôi việc") return "bg-rose-50 text-rose-700 ring-rose-100";
  if (status === "Sắp hết hạn" || status === "Chờ gia hạn" || status === "Chờ duyệt") {
    return "bg-amber-50 text-amber-700 ring-amber-100";
  }
  return "bg-emerald-50 text-emerald-700 ring-emerald-100";
}

function StatusBadge({ value }: { value: EmployeeStatus | ContractStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${statusTone(value)}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {value}
    </span>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
      <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-white text-slate-500 shadow-sm">
        <Search size={20} />
      </div>
      <h3 className="mt-4 text-[15px] font-semibold text-slate-950">{title}</h3>
      <p className="mt-1 text-[12px] text-slate-500">{description}</p>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  icon,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="space-y-1.5">
      <span className="flex items-center gap-1 text-[12px] font-semibold text-slate-700">
        {label}
        {required ? <span className="text-rose-600">*</span> : null}
      </span>
      <span className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 shadow-sm transition focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100">
        {icon ? <span className="text-slate-400">{icon}</span> : null}
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
      </span>
    </label>
  );
}

function SelectField<TValue extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: TValue;
  options: readonly TValue[];
  onChange: (value: TValue) => void;
}) {
  return (
    <label className="space-y-1.5">
      <span className="text-[12px] font-semibold text-slate-700">{label}</span>
      <span className="relative block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value as TValue)}
          className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-[13px] font-medium text-slate-800 shadow-sm outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
      </span>
    </label>
  );
}

function Sidebar({ activeModule, onModuleChange }: { activeModule: ModuleId; onModuleChange: (module: ModuleId) => void }) {
  const items: { id: ModuleId; label: string; helper: string; icon: ReactNode }[] = [
    { id: "overview", label: "Tổng quan", helper: "Dashboard live", icon: <LayoutDashboard size={17} /> },
    { id: "personnel", label: "Hồ sơ nhân sự", helper: "Danh sách & thêm mới", icon: <CircleUserRound size={17} /> },
    { id: "contracts", label: "Hợp đồng lao động", helper: "Tạo, gia hạn, chấm dứt", icon: <FileText size={17} /> },
  ];

  return (
    <aside className="flex w-[272px] shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-3 px-5 py-4">
        <div className="grid size-10 place-items-center overflow-hidden rounded-2xl bg-white ring-1 ring-blue-100">
          <img src={tluLogoIcon} alt="TLU" className="size-9 object-contain" />
        </div>
        <div>
          <div className="text-[13px] font-bold text-slate-950">TLU HRFlow</div>
          <div className="text-[11px] text-slate-500">Hồ sơ + Hợp đồng</div>
        </div>
      </div>

      <nav className="space-y-1 px-3 py-2">
        {items.map((item) => {
          const active = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onModuleChange(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                active ? "bg-blue-700 text-white shadow-sm shadow-blue-200" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span className={`grid size-8 place-items-center rounded-lg ${active ? "bg-white/15" : "bg-blue-50 text-blue-700"}`}>
                {item.icon}
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold">{item.label}</span>
                <span className={`block truncate text-[11px] ${active ? "text-blue-100" : "text-slate-500"}`}>{item.helper}</span>
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto p-4">
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-blue-900">
          <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-blue-700">
            <Sparkles size={14} /> Chế độ trình bày
          </div>
          <p className="mt-2 text-[12px] leading-5 text-blue-800">
            Dữ liệu thay đổi ngay trên giao diện và được lưu ở trình duyệt để demo liên tục.
          </p>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ onReset }: { onReset: () => void }) {
  return (
    <header className="flex h-[60px] items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-2 text-[13px] font-medium text-slate-700">
        <BookOpen size={16} />
        <span className="text-slate-500">Trang chủ</span>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-slate-950">HRFlow Live App</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-semibold text-emerald-700 ring-1 ring-emerald-100 md:inline-flex">
          Live data: đang bật
        </span>
        <button
          onClick={onReset}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-700 hover:bg-slate-50"
        >
          <RefreshCw size={14} /> Khôi phục dữ liệu mẫu
        </button>
        <button className="relative grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
          <Bell size={17} />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-rose-500" />
        </button>
        <div className="h-8 w-px bg-slate-200" />
        <div className="grid size-9 place-items-center rounded-lg border border-slate-300 text-slate-700">
          <CircleUserRound size={19} />
        </div>
        <div>
          <div className="text-[12px] font-semibold text-slate-950">Nguyễn Hải Ninh</div>
          <div className="text-[11px] text-slate-500">Phòng TCCB</div>
        </div>
      </div>
    </header>
  );
}

function StatCard({ label, value, icon, tone, detail }: { label: string; value: string; icon: ReactNode; tone: string; detail: string }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold text-slate-500">{label}</p>
          <div className="mt-2 text-[28px] font-bold leading-none text-slate-950">{value}</div>
        </div>
        <div className={`grid size-11 place-items-center rounded-2xl ring-1 ${tone}`}>{icon}</div>
      </div>
      <p className="mt-3 text-[12px] leading-5 text-slate-500">{detail}</p>
    </section>
  );
}

function Overview({ data, onModuleChange }: { data: AppData; onModuleChange: (module: ModuleId) => void }) {
  const activeEmployees = data.employees.filter((employee) => employee.status === "Đang hoạt động").length;
  const activeContracts = data.contracts.filter((contract) => contract.status === "Còn hiệu lực").length;
  const expiringContracts = data.contracts.filter((contract) => contract.status === "Sắp hết hạn" || contract.status === "Chờ gia hạn").length;
  const pendingProfiles = data.employees.filter((employee) => employee.status === "Chờ duyệt").length;
  const contractCoverage = Math.round((data.contracts.length / Math.max(data.employees.length, 1)) * 100);

  return (
    <div className="space-y-5 p-6">
      <div className="grid gap-4 xl:grid-cols-4">
        <StatCard
          label="Nhân sự đang quản lý"
          value={String(data.employees.length)}
          icon={<CircleUserRound size={20} />}
          tone="bg-blue-50 text-blue-700 ring-blue-100"
          detail={`${activeEmployees} hồ sơ đang hoạt động trong dữ liệu live.`}
        />
        <StatCard
          label="Hợp đồng còn hiệu lực"
          value={String(activeContracts)}
          icon={<FileText size={20} />}
          tone="bg-emerald-50 text-emerald-700 ring-emerald-100"
          detail={`${contractCoverage}% hồ sơ đã liên kết hợp đồng.`}
        />
        <StatCard
          label="Cần xử lý hợp đồng"
          value={String(expiringContracts)}
          icon={<Clock3 size={20} />}
          tone="bg-amber-50 text-amber-700 ring-amber-100"
          detail="Bao gồm sắp hết hạn và chờ gia hạn."
        />
        <StatCard
          label="Hồ sơ chờ duyệt"
          value={String(pendingProfiles)}
          icon={<ShieldCheck size={20} />}
          tone="bg-slate-100 text-slate-700 ring-slate-200"
          detail="Cần xác nhận thông tin trước khi lưu chính thức."
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
            <div>
              <h1 className="text-[22px] font-bold text-slate-950">Ứng dụng quản lý hồ sơ và hợp đồng</h1>
              <p className="mt-1 text-[13px] leading-6 text-slate-500">
                Hai màn hình nguồn đã được gom thành một app có dữ liệu dùng chung: tạo hồ sơ mới, lập hợp đồng, gia hạn và chấm dứt đều cập nhật bảng và chỉ số ngay lập tức.
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-[12px] font-bold text-blue-700 ring-1 ring-blue-100">
              Demo-ready
            </span>
          </div>
          <div className="grid gap-4 p-5 md:grid-cols-2">
            <button
              onClick={() => onModuleChange("personnel")}
              className="group rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-100"
            >
              <div className="grid size-12 place-items-center rounded-2xl bg-blue-700 text-white shadow-sm">
                <UserPlus size={22} />
              </div>
              <h2 className="mt-4 text-[17px] font-bold text-slate-950">Quản lý hồ sơ nhân sự</h2>
              <p className="mt-2 text-[13px] leading-6 text-slate-600">
                Tìm kiếm, lọc, thêm hồ sơ và xem trạng thái hợp đồng theo từng cán bộ.
              </p>
              <span className="mt-4 inline-flex text-[12px] font-bold text-blue-700 group-hover:underline">Mở danh sách hồ sơ</span>
            </button>
            <button
              onClick={() => onModuleChange("contracts")}
              className="group rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-100"
            >
              <div className="grid size-12 place-items-center rounded-2xl bg-emerald-600 text-white shadow-sm">
                <ClipboardList size={22} />
              </div>
              <h2 className="mt-4 text-[17px] font-bold text-slate-950">Quản lý hợp đồng lao động</h2>
              <p className="mt-2 text-[13px] leading-6 text-slate-600">
                Lập hợp đồng mới, chuyển trạng thái gia hạn hoặc kết thúc và đồng bộ về hồ sơ.
              </p>
              <span className="mt-4 inline-flex text-[12px] font-bold text-emerald-700 group-hover:underline">Mở danh sách hợp đồng</span>
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[15px] font-bold text-slate-950">Luồng dữ liệu gần đây</h2>
              <p className="mt-0.5 text-[12px] text-slate-500">Các thao tác demo sẽ xuất hiện ở đây.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">{data.activity.length} mục</span>
          </div>
          <div className="mt-4 space-y-3">
            {data.activity.map((activity) => (
              <div key={activity.id} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-[13px] font-bold text-slate-900">{activity.title}</div>
                  <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-500 ring-1 ring-slate-100">{activity.time}</span>
                </div>
                <p className="mt-1 text-[12px] leading-5 text-slate-500">{activity.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function PersonnelView({
  employees,
  onOpenCreate,
}: {
  employees: Employee[];
  onOpenCreate: () => void;
}) {
  const [query, setQuery] = useState("");
  const [unitFilter, setUnitFilter] = useState("Tất cả đơn vị");
  const [statusFilter, setStatusFilter] = useState("Tất cả trạng thái");
  const filteredEmployees = useMemo(() => {
    const normalizedQuery = normalizeText(query);
    return employees.filter((employee) => {
      const matchesQuery = normalizeText(`${employee.id} ${employee.name} ${employee.unit} ${employee.role}`).includes(normalizedQuery);
      const matchesUnit = unitFilter === "Tất cả đơn vị" || employee.unit === unitFilter;
      const matchesStatus = statusFilter === "Tất cả trạng thái" || employee.status === statusFilter;
      return matchesQuery && matchesUnit && matchesStatus;
    });
  }, [employees, query, statusFilter, unitFilter]);

  return (
    <div className="space-y-4 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold leading-tight text-slate-950">Hồ sơ nhân sự</h1>
          <p className="mt-1 text-[13px] text-slate-500">Dữ liệu hồ sơ dùng chung với module hợp đồng lao động.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 text-[12px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            <Download size={14} /> Xuất danh sách
          </button>
          <button
            onClick={onOpenCreate}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-700 px-3.5 text-[12px] font-semibold text-white shadow-sm hover:bg-blue-800"
          >
            <Plus size={14} /> Thêm hồ sơ nhân sự
          </button>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex h-9 w-[320px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 shadow-sm focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100">
            <Search size={14} className="text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[12px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
              placeholder="Tìm mã cán bộ, họ tên, đơn vị..."
            />
          </div>
          <select
            value={unitFilter}
            onChange={(event) => setUnitFilter(event.target.value)}
            className="h-9 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 shadow-sm outline-none"
          >
            <option>Tất cả đơn vị</option>
            {units.map((unit) => (
              <option key={unit}>{unit}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-9 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 shadow-sm outline-none"
          >
            <option>Tất cả trạng thái</option>
            {(["Đang hoạt động", "Chờ duyệt", "Đã thôi việc"] satisfies EmployeeStatus[]).map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
          {(query || unitFilter !== "Tất cả đơn vị" || statusFilter !== "Tất cả trạng thái") ? (
            <button
              onClick={() => {
                setQuery("");
                setUnitFilter("Tất cả đơn vị");
                setStatusFilter("Tất cả trạng thái");
              }}
              className="h-9 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-semibold text-slate-600 shadow-sm hover:bg-slate-50"
            >
              Xóa lọc
            </button>
          ) : null}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-[0.85fr_1.25fr_1.35fr_0.9fr_1fr_1fr_1fr_1fr] bg-blue-100 px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-800">
          <span>Mã NS</span>
          <span>Họ tên</span>
          <span>Đơn vị công tác</span>
          <span>Học vị</span>
          <span>Chức vụ</span>
          <span>Hợp đồng</span>
          <span>Trạng thái</span>
          <span>Liên hệ</span>
        </div>
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className="grid min-h-[62px] grid-cols-[0.85fr_1.25fr_1.35fr_0.9fr_1fr_1fr_1fr_1fr] items-center border-b border-slate-100 px-4 text-[12px] text-slate-800 last:border-0"
            >
              <span className="font-mono text-[11px] font-bold text-slate-700">{employee.id}</span>
              <span className="font-semibold text-slate-950">{employee.name}</span>
              <span>{employee.unit}</span>
              <span>{employee.degree}</span>
              <span>{employee.role}</span>
              <span>
                <StatusBadge value={employee.contractStatus} />
              </span>
              <span>
                <StatusBadge value={employee.status} />
              </span>
              <span className="space-y-0.5 text-[11px] text-slate-500">
                <span className="block truncate">{employee.email}</span>
                <span className="block">{employee.phone}</span>
              </span>
            </div>
          ))
        ) : (
          <div className="p-4">
            <EmptyState title="Không tìm thấy hồ sơ" description="Thử đổi bộ lọc hoặc thêm hồ sơ nhân sự mới." />
          </div>
        )}
      </section>

      <div className="flex items-center justify-between text-[12px] text-slate-500">
        <span>
          Hiển thị {filteredEmployees.length} / {employees.length} hồ sơ nhân sự
        </span>
        <span className="font-medium text-slate-700">Dữ liệu cập nhật trực tiếp</span>
      </div>
    </div>
  );
}

function ContractView({
  contracts,
  onOpenCreate,
  onRenew,
  onTerminate,
}: {
  contracts: Contract[];
  onOpenCreate: () => void;
  onRenew: (contractId: string) => void;
  onTerminate: (contractId: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả trạng thái");
  const filteredContracts = useMemo(() => {
    const normalizedQuery = normalizeText(query);
    return contracts.filter((contract) => {
      const matchesQuery = normalizeText(`${contract.id} ${contract.employeeId} ${contract.employeeName} ${contract.unit}`).includes(normalizedQuery);
      const matchesStatus = statusFilter === "Tất cả trạng thái" || contract.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [contracts, query, statusFilter]);

  return (
    <div className="space-y-4 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold leading-tight text-slate-950">Hợp đồng lao động</h1>
          <p className="mt-1 text-[13px] text-slate-500">Theo dõi hiệu lực hợp đồng, tạo mới và đồng bộ trạng thái về hồ sơ nhân sự.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 text-[12px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            <FileSpreadsheet size={14} /> Xuất Excel
          </button>
          <button
            onClick={onOpenCreate}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-700 px-3.5 text-[12px] font-semibold text-white shadow-sm hover:bg-blue-800"
          >
            <Plus size={14} /> Tạo hợp đồng
          </button>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex h-9 w-[340px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 shadow-sm focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100">
            <Search size={14} className="text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[12px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
              placeholder="Tìm mã cán bộ, họ tên, số hợp đồng..."
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-9 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 shadow-sm outline-none"
          >
            <option>Tất cả trạng thái</option>
            {statusOrder.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
          {(query || statusFilter !== "Tất cả trạng thái") ? (
            <button
              onClick={() => {
                setQuery("");
                setStatusFilter("Tất cả trạng thái");
              }}
              className="h-9 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-semibold text-slate-600 shadow-sm hover:bg-slate-50"
            >
              Xóa lọc
            </button>
          ) : null}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-[1.05fr_0.9fr_1.05fr_1.2fr_0.9fr_0.9fr_1fr_0.8fr_1.3fr] bg-blue-100 px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-800">
          <span>Số hợp đồng</span>
          <span>Mã cán bộ</span>
          <span>Họ tên</span>
          <span>Loại hợp đồng</span>
          <span>Ngày hiệu lực</span>
          <span>Ngày hết hạn</span>
          <span>Trạng thái</span>
          <span>Hệ số</span>
          <span className="text-center">Thao tác</span>
        </div>
        {filteredContracts.length > 0 ? (
          filteredContracts.map((contract) => (
            <div
              key={contract.id}
              className="grid min-h-[62px] grid-cols-[1.05fr_0.9fr_1.05fr_1.2fr_0.9fr_0.9fr_1fr_0.8fr_1.3fr] items-center border-b border-slate-100 px-4 text-[12px] text-slate-800 last:border-0"
            >
              <span className="font-mono text-[11px] font-bold text-slate-700">{contract.id}</span>
              <span className="font-mono text-[11px] font-bold text-slate-600">{contract.employeeId}</span>
              <span className="font-semibold text-slate-950">{contract.employeeName}</span>
              <span>{contract.type}</span>
              <span>{contract.startDate}</span>
              <span>{contract.endDate}</span>
              <span>
                <StatusBadge value={contract.status} />
              </span>
              <span>{contract.salaryCoefficient}</span>
              <div className="flex items-center justify-center gap-1.5">
                <button
                  onClick={() => onRenew(contract.id)}
                  className="h-8 rounded-lg border border-amber-200 bg-amber-50 px-2.5 text-[11px] font-bold text-amber-800 hover:bg-amber-100"
                >
                  Gia hạn
                </button>
                <button
                  onClick={() => onTerminate(contract.id)}
                  className="h-8 rounded-lg border border-rose-200 bg-rose-50 px-2.5 text-[11px] font-bold text-rose-700 hover:bg-rose-100"
                >
                  Chấm dứt
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4">
            <EmptyState title="Không tìm thấy hợp đồng" description="Thử đổi bộ lọc hoặc tạo hợp đồng mới cho nhân sự." />
          </div>
        )}
      </section>

      <div className="flex items-center justify-between text-[12px] text-slate-500">
        <span>
          Hiển thị {filteredContracts.length} / {contracts.length} hợp đồng lao động
        </span>
        <span className="font-medium text-slate-700">Gia hạn và chấm dứt cập nhật live</span>
      </div>
    </div>
  );
}

function ModalShell({ title, subtitle, children, onClose }: { title: string; subtitle: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/30 p-6 backdrop-blur-sm">
      <section className="mt-6 w-full max-w-[860px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-[18px] font-bold text-slate-950">{title}</h2>
            <p className="mt-1 text-[12px] leading-5 text-slate-500">{subtitle}</p>
          </div>
          <button onClick={onClose} className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}

function EmployeeModal({
  draft,
  error,
  onChange,
  onClose,
  onSubmit,
}: {
  draft: EmployeeDraft;
  error: string;
  onChange: (draft: EmployeeDraft) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <ModalShell title="Thêm hồ sơ nhân sự" subtitle="Nhập hồ sơ mới; sau khi lưu, bảng nhân sự và chỉ số tổng quan cập nhật ngay." onClose={onClose}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4 bg-slate-50/70 px-6 py-5 md:grid-cols-2">
          <TextField label="Họ và tên" required value={draft.name} onChange={(name) => onChange({ ...draft, name })} placeholder="Ví dụ: Nguyễn Minh Anh" />
          <SelectField label="Đơn vị công tác" value={draft.unit} options={units} onChange={(unit) => onChange({ ...draft, unit })} />
          <SelectField label="Học hàm / học vị" value={draft.degree} options={degrees} onChange={(degree) => onChange({ ...draft, degree })} />
          <TextField label="Chức vụ" required value={draft.role} onChange={(role) => onChange({ ...draft, role })} placeholder="Giảng viên" icon={<Briefcase size={15} />} />
          <TextField label="Email" value={draft.email} onChange={(email) => onChange({ ...draft, email })} placeholder="ten@tlu.edu.vn" icon={<Mail size={15} />} />
          <TextField label="Số điện thoại" value={draft.phone} onChange={(phone) => onChange({ ...draft, phone })} placeholder="09xxxxxxxx" icon={<Phone size={15} />} />
          <TextField label="Hệ số lương" value={draft.salaryCoefficient} onChange={(salaryCoefficient) => onChange({ ...draft, salaryCoefficient })} placeholder="3.00" />
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-[12px] leading-5 text-blue-800">
            <div className="font-bold text-blue-900">Mã cán bộ được sinh tự động</div>
            <p className="mt-1">Hồ sơ mới mặc định ở trạng thái đang hoạt động và chờ tạo hợp đồng.</p>
          </div>
        </div>
        {error ? <div className="border-t border-rose-100 bg-rose-50 px-6 py-3 text-[12px] font-semibold text-rose-700">{error}</div> : null}
        <footer className="flex items-center justify-end gap-2 border-t border-slate-200 bg-white px-6 py-4">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 hover:bg-slate-50">
            Hủy
          </button>
          <button type="submit" className="rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-semibold text-white hover:bg-blue-800">
            Lưu hồ sơ
          </button>
        </footer>
      </form>
    </ModalShell>
  );
}

function ContractModal({
  draft,
  employees,
  error,
  onChange,
  onClose,
  onSubmit,
}: {
  draft: ContractDraft;
  employees: Employee[];
  error: string;
  onChange: (draft: ContractDraft) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const selectedEmployee = employees.find((employee) => employee.id === draft.employeeId) ?? employees[0];

  return (
    <ModalShell title="Tạo hợp đồng lao động" subtitle="Chọn nhân sự đã có hồ sơ, nhập thời hạn và lưu để đồng bộ trạng thái hợp đồng." onClose={onClose}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-5 bg-slate-50/70 px-6 py-5 md:grid-cols-[minmax(0,1fr)_280px]">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1.5 md:col-span-2">
              <span className="text-[12px] font-semibold text-slate-700">Nhân sự liên kết</span>
              <span className="relative block">
                <select
                  value={draft.employeeId}
                  onChange={(event) => onChange({ ...draft, employeeId: event.target.value })}
                  className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-[13px] font-medium text-slate-800 shadow-sm outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                >
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.id} · {employee.name} · {employee.unit}
                    </option>
                  ))}
                </select>
                <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </span>
            </label>
            <SelectField label="Loại hợp đồng" value={draft.type} options={contractTypes} onChange={(type) => onChange({ ...draft, type })} />
            <SelectField label="Trạng thái" value={draft.status} options={statusOrder} onChange={(status) => onChange({ ...draft, status })} />
            <TextField label="Ngày bắt đầu" required value={draft.startDate} onChange={(startDate) => onChange({ ...draft, startDate })} icon={<Calendar size={15} />} />
            <TextField label="Ngày kết thúc" required value={draft.endDate} onChange={(endDate) => onChange({ ...draft, endDate })} icon={<Calendar size={15} />} />
            <TextField label="Hệ số lương" value={draft.salaryCoefficient} onChange={(salaryCoefficient) => onChange({ ...draft, salaryCoefficient })} />
            <TextField label="Phụ cấp" value={draft.allowance} onChange={(allowance) => onChange({ ...draft, allowance })} />
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid size-16 place-items-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
              <CircleUserRound size={30} />
            </div>
            <h3 className="mt-4 text-[15px] font-bold text-slate-950">{selectedEmployee?.name}</h3>
            <p className="font-mono text-[12px] font-semibold text-slate-500">{selectedEmployee?.id}</p>
            <dl className="mt-4 space-y-3 text-[12px]">
              <div>
                <dt className="text-slate-500">Đơn vị</dt>
                <dd className="font-semibold text-slate-900">{selectedEmployee?.unit}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Chức vụ</dt>
                <dd className="font-semibold text-slate-900">{selectedEmployee?.role}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Hợp đồng hiện tại</dt>
                <dd className="mt-1">{selectedEmployee ? <StatusBadge value={selectedEmployee.contractStatus} /> : null}</dd>
              </div>
            </dl>
          </aside>
        </div>
        {error ? <div className="border-t border-rose-100 bg-rose-50 px-6 py-3 text-[12px] font-semibold text-rose-700">{error}</div> : null}
        <footer className="flex items-center justify-end gap-2 border-t border-slate-200 bg-white px-6 py-4">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 hover:bg-slate-50">
            Hủy
          </button>
          <button type="submit" className="rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-semibold text-white hover:bg-blue-800">
            Tạo hợp đồng
          </button>
        </footer>
      </form>
    </ModalShell>
  );
}

export default function App() {
  const [data, setData] = useState<AppData>(() => readStoredData());
  const [activeModule, setActiveModule] = useState<ModuleId>("overview");
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false);
  const [contractModalOpen, setContractModalOpen] = useState(false);
  const [employeeDraft, setEmployeeDraft] = useState<EmployeeDraft>(initialEmployeeDraft);
  const [contractDraft, setContractDraft] = useState<ContractDraft>(initialContractDraft);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const openEmployeeModal = () => {
    setEmployeeDraft(initialEmployeeDraft);
    setFormError("");
    setEmployeeModalOpen(true);
  };

  const openContractModal = () => {
    setContractDraft((current) => ({ ...initialContractDraft, employeeId: data.employees[0]?.id ?? current.employeeId }));
    setFormError("");
    setContractModalOpen(true);
  };

  const handleCreateEmployee = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!employeeDraft.name.trim() || !employeeDraft.role.trim()) {
      setFormError("Vui lòng nhập tối thiểu họ tên và chức vụ để tạo hồ sơ.");
      return;
    }

    setData((current) => {
      const newEmployee: Employee = {
        id: makeEmployeeCode(current.employees.length),
        name: employeeDraft.name.trim(),
        unit: employeeDraft.unit,
        degree: employeeDraft.degree,
        role: employeeDraft.role.trim(),
        email: employeeDraft.email.trim() || `${normalizeText(employeeDraft.name).replaceAll(" ", ".")}@tlu.edu.vn`,
        phone: employeeDraft.phone.trim() || "0987654399",
        status: "Đang hoạt động",
        contractStatus: "Chờ gia hạn",
        salaryCoefficient: employeeDraft.salaryCoefficient.trim() || "3.00",
        startDate: "01/07/2026",
      };
      return {
        ...current,
        employees: [newEmployee, ...current.employees],
        activity: addActivity(current.activity, "Tạo hồ sơ nhân sự", `${newEmployee.name} được thêm vào ${newEmployee.unit}.`),
      };
    });

    setEmployeeModalOpen(false);
    setActiveModule("personnel");
  };

  const handleCreateContract = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const employee = data.employees.find((item) => item.id === contractDraft.employeeId);
    if (!employee) {
      setFormError("Vui lòng chọn nhân sự hợp lệ trước khi tạo hợp đồng.");
      return;
    }
    if (!contractDraft.startDate.trim() || !contractDraft.endDate.trim()) {
      setFormError("Vui lòng nhập ngày bắt đầu và ngày kết thúc hợp đồng.");
      return;
    }

    setData((current) => {
      const newContract: Contract = {
        id: makeContractCode(current.contracts.length),
        employeeId: employee.id,
        employeeName: employee.name,
        unit: employee.unit,
        type: contractDraft.type,
        startDate: contractDraft.startDate.trim(),
        endDate: contractDraft.endDate.trim(),
        status: contractDraft.status,
        salaryCoefficient: contractDraft.salaryCoefficient.trim() || employee.salaryCoefficient,
        allowance: contractDraft.allowance.trim() || "0.00",
      };
      return {
        ...current,
        employees: current.employees.map((item) =>
          item.id === employee.id
            ? { ...item, contractStatus: newContract.status, status: newContract.status === "Hết hiệu lực" ? "Đã thôi việc" : "Đang hoạt động" }
            : item,
        ),
        contracts: [newContract, ...current.contracts],
        activity: addActivity(current.activity, "Tạo hợp đồng lao động", `${newContract.id} được lập cho ${newContract.employeeName}.`),
      };
    });

    setContractModalOpen(false);
    setActiveModule("contracts");
  };

  const updateContractStatus = (contractId: string, status: ContractStatus, endDate?: string) => {
    setData((current) => {
      const contract = current.contracts.find((item) => item.id === contractId);
      if (!contract) return current;

      const nextContracts = current.contracts.map((item) =>
        item.id === contractId
          ? {
              ...item,
              status,
              endDate: endDate ?? item.endDate,
            }
          : item,
      );
      const nextEmployees = current.employees.map((employee) =>
        employee.id === contract.employeeId
          ? { ...employee, contractStatus: status, status: status === "Hết hiệu lực" ? "Đã thôi việc" : "Đang hoạt động" }
          : employee,
      );

      return {
        ...current,
        employees: nextEmployees,
        contracts: nextContracts,
        activity: addActivity(
          current.activity,
          status === "Hết hiệu lực" ? "Chấm dứt hợp đồng" : "Gia hạn hợp đồng",
          `${contract.id} của ${contract.employeeName} chuyển sang trạng thái ${status}.`,
        ),
      };
    });
  };

  const resetData = () => {
    setData(seedData);
    setActiveModule("overview");
  };

  return (
    <div className="min-h-screen bg-slate-100 font-['Be_Vietnam_Pro'] text-slate-900">
      <div className="flex min-h-screen overflow-hidden">
        <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
        <main className="min-w-0 flex-1 bg-slate-50">
          <TopBar onReset={resetData} />
          <div className="h-[calc(100vh-60px)] overflow-y-auto">
            {activeModule === "overview" ? <Overview data={data} onModuleChange={setActiveModule} /> : null}
            {activeModule === "personnel" ? <PersonnelView employees={data.employees} onOpenCreate={openEmployeeModal} /> : null}
            {activeModule === "contracts" ? (
              <ContractView
                contracts={data.contracts}
                onOpenCreate={openContractModal}
                onRenew={(contractId) => updateContractStatus(contractId, "Còn hiệu lực", "30/06/2029")}
                onTerminate={(contractId) => updateContractStatus(contractId, "Hết hiệu lực")}
              />
            ) : null}
          </div>
        </main>
      </div>

      {employeeModalOpen ? (
        <EmployeeModal
          draft={employeeDraft}
          error={formError}
          onChange={setEmployeeDraft}
          onClose={() => setEmployeeModalOpen(false)}
          onSubmit={handleCreateEmployee}
        />
      ) : null}
      {contractModalOpen ? (
        <ContractModal
          draft={contractDraft}
          employees={data.employees}
          error={formError}
          onChange={setContractDraft}
          onClose={() => setContractModalOpen(false)}
          onSubmit={handleCreateContract}
        />
      ) : null}
    </div>
  );
}
