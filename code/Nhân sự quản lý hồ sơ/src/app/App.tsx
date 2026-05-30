import { useState, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  BadgeCheck,
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
  ShieldCheck,
  Table2,
  Trash2,
  Upload,
  UserPlus,
  X,
} from "lucide-react";

type SidebarItem = { id: string; label: string; icon: ReactNode };

const sidebarItems: SidebarItem[] = [
  { id: "ho-so", label: "Hồ sơ nhân sự", icon: <CircleUserRound size={18} /> },
  { id: "luong", label: "Hệ số lương", icon: <Banknote size={18} /> },
  { id: "phu-cap", label: "Phụ cấp", icon: <FileBadge size={18} /> },
  { id: "hop-dong", label: "Hợp đồng", icon: <FileText size={18} /> },
  { id: "thong-ke", label: "Thống kê", icon: <BookOpen size={18} /> },
];

type StepId = "ca-nhan" | "cong-tac" | "hoc-van" | "tai-lieu" | "xac-nhan";

const wizardSteps: { id: StepId; label: string; desc: string; icon: ReactNode }[] = [
  { id: "ca-nhan", label: "Thông tin cá nhân", desc: "Định danh, liên hệ, quốc tịch", icon: <CircleUserRound size={16} /> },
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
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-[13px] font-medium text-slate-700">
        {label}
        {required ? <span className="text-red-600">*</span> : null}
      </label>
      {children}
      {error ? (
        <div className="flex items-start gap-1.5 text-[12px] text-red-600">
          <AlertCircle size={13} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : hint ? (
        <div className="text-[12px] text-slate-500">{hint}</div>
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
      className={`flex h-10 items-center gap-2 rounded-lg border bg-white px-3 transition focus-within:ring-4 ${ring}`}
    >
      {icon ? <span className="text-slate-400">{icon}</span> : null}
      <input
        defaultValue={value}
        placeholder={placeholder}
        readOnly={readOnly}
        className="flex-1 bg-transparent text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
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
      className={`flex h-10 w-full items-center justify-between rounded-lg border bg-white px-3 text-[14px] text-slate-900 ${ring}`}
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
      className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 text-[13px] font-medium text-blue-700 hover:bg-blue-100"
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
      <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div className="flex gap-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
              {optional ? (
                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-500">
                  Không bắt buộc
                </span>
              ) : null}
            </div>
            {description ? (
              <p className="mt-0.5 text-[12.5px] text-slate-500">{description}</p>
            ) : null}
          </div>
        </div>
        {action}
      </header>
      <div className="px-5 py-5">{children}</div>
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

function PersonnelListBackground() {
  return (
    <div className="select-none px-6 py-5">
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
  const [degrees, setDegrees] = useState([
    { name: "Bằng Cử nhân chuyên ngành Kỹ thuật phần mềm", place: "Trường Đại học Thủy lợi" },
    { name: "Bằng Kỹ sư Khoa học máy tính", place: "Trường Đại học Thủy lợi" },
  ]);
  const [certs, setCerts] = useState([{ name: "IELTS 7.5", place: "British Council" }]);

  const goto = (idx: number) => {
    if (idx <= currentStep || completed[idx - 1]) setCurrentStep(idx);
  };
  const next = () => {
    setCompleted((c) => ({ ...c, [currentStep]: true }));
    setCurrentStep((s) => Math.min(s + 1, wizardSteps.length - 1));
  };
  const back = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const isLast = currentStep === wizardSteps.length - 1;

  return (
    <div className="min-h-screen bg-neutral-900 p-4 font-['Be_Vietnam_Pro'] text-slate-900">
      <div className="mx-auto flex min-h-[calc(100vh-32px)] max-w-[1420px] overflow-hidden rounded-lg bg-white">
        {/* App sidebar */}
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

          <div className="relative min-h-[calc(100vh-90px)] overflow-hidden bg-white">
            <div className="opacity-25">
              <PersonnelListBackground />
            </div>

            <div className="absolute inset-0 flex items-start justify-center p-5 pt-7">
              <div className="flex h-[calc(100vh-122px)] w-full max-w-[1080px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
                {/* Modal header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
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
                    <button className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100">
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
                        title="Thông tin cá nhân"
                        description="Thông tin định danh theo CCCD và hồ sơ giấy."
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
                              <Input value="Nguyễn Văn A" state="success" />
                            </Field>
                            <Field label="Giới tính" required>
                              <Select value="Nam" />
                            </Field>
                            <Field label="Ngày sinh" required hint="Định dạng dd/mm/yyyy">
                              <Input value="01/01/2000" icon={<Calendar size={15} />} />
                            </Field>
                            <Field label="Quê quán" required>
                              <Input value="Hà Nội" icon={<MapPin size={15} />} />
                            </Field>
                            <Field label="Email" required>
                              <Input value="nguyenvana@tlu.edu.vn" icon={<Mail size={15} />} />
                            </Field>
                            <Field label="Số điện thoại" required>
                              <Input value="0987654321" icon={<Phone size={15} />} />
                            </Field>
                            <div className="col-span-2">
                              <Field label="Địa chỉ thường trú" required>
                                <Input value="Thanh Trì, Hà Nội" icon={<MapPin size={15} />} />
                              </Field>
                            </div>
                            <Field
                              label="Số CCCD"
                              required
                              error="Đã tồn tại hồ sơ với CCCD này. Vui lòng kiểm tra lại."
                            >
                              <Input value="001200001900" state="error" />
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

                  {currentStep === 1 ? (
                    <>
                      <SectionCard
                        title="Thông tin công tác"
                        description="Gắn cán bộ mới vào đúng đơn vị, chức vụ và loại nhân sự."
                        icon={<Building2 size={18} />}
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <Field label="Đơn vị công tác" required hint="Chọn từ cây tổ chức của Trường Đại học Thủy Lợi">
                            <Select value="Khoa Công nghệ thông tin" state="success" />
                          </Field>
                          <Field label="Bộ môn / phòng ban trực thuộc">
                            <Select value="Bộ môn Công nghệ phần mềm" />
                          </Field>
                          <Field label="Chức vụ hiện tại" required>
                            <Select value="Giảng viên" />
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
                          <Field label="Hệ số lương" required>
                            <Input value="2.34" state="success" />
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
                      <SectionCard
                        title="Thông tin ngân hàng và Đoàn / Đảng"
                        description="Thông tin phụ trợ, có thể bổ sung sau khi hồ sơ chính được tạo."
                        icon={<BadgeCheck size={18} />}
                        optional
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <Field label="Số tài khoản">
                            <Input value="00-120-019-999" />
                          </Field>
                          <Field label="Tên ngân hàng">
                            <Input value="Ngân hàng TMCP Quân đội" icon={<Building2 size={15} />} />
                          </Field>
                          <Field label="Ngày vào Đảng / Đoàn">
                            <Input value="01/01/2020" icon={<Calendar size={15} />} />
                          </Field>
                          <Field label="Thông tin chi tiết">
                            <Input value="Đảng Cộng sản Việt Nam" />
                          </Field>
                        </div>
                      </SectionCard>
                    </>
                  ) : null}

                  {currentStep === 2 ? (
                    <SectionCard title="Trình độ học vấn" icon={<GraduationCap size={18} />}>
                      <div className="grid grid-cols-2 gap-4">
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
                  ) : null}

                  {currentStep === 3 ? (
                    <>
                      <SectionCard
                        title="Tài liệu bắt buộc"
                        description="Các tài liệu này phải có trước khi lưu hồ sơ chính thức."
                        icon={<FileText size={18} />}
                      >
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            ["CCCD/CMND bản scan", "Đã tải lên", "success"],
                            ["Quyết định tuyển dụng", "Chưa có", "warn"],
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
                      <SectionCard
                        title="Thông tin bằng cấp"
                        description="Tải lên từng bằng kèm file scan."
                        icon={<Award size={18} />}
                        action={
                          <button
                            type="button"
                            onClick={() => setDegrees((d) => [...d, { name: "", place: "" }])}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-blue-700 hover:bg-blue-50"
                          >
                            <Plus size={13} /> Thêm bằng
                          </button>
                        }
                      >
                        <div className="space-y-3">
                          {degrees.map((d, i) => (
                            <div key={i} className="rounded-lg border border-slate-200 bg-white p-4">
                              <div className="mb-3 flex items-center justify-between">
                                <span className="text-[12px] font-semibold text-slate-500">
                                  Bằng #{i + 1}
                                </span>
                                {degrees.length > 1 ? (
                                  <button
                                    onClick={() =>
                                      setDegrees((arr) => arr.filter((_, idx) => idx !== i))
                                    }
                                    className="inline-flex items-center gap-1 text-[12px] text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 size={13} /> Xóa
                                  </button>
                                ) : null}
                              </div>
                              <div className="grid grid-cols-[1fr_1fr_auto] items-end gap-3">
                                <Field label="Tên bằng" required>
                                  <Input value={d.name} />
                                </Field>
                                <Field label="Nơi cấp" required>
                                  <Input value={d.place} />
                                </Field>
                                <FileButton />
                              </div>
                            </div>
                          ))}
                        </div>
                      </SectionCard>

                      <SectionCard
                        title="Thông tin chứng chỉ"
                        icon={<FileBadge size={18} />}
                        optional
                        action={
                          <button
                            type="button"
                            onClick={() => setCerts((c) => [...c, { name: "", place: "" }])}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-blue-700 hover:bg-blue-50"
                          >
                            <Plus size={13} /> Thêm chứng chỉ
                          </button>
                        }
                      >
                        <div className="space-y-3">
                          {certs.map((c, i) => (
                            <div key={i} className="rounded-lg border border-slate-200 bg-white p-4">
                              <div className="mb-3 flex items-center justify-between">
                                <span className="text-[12px] font-semibold text-slate-500">
                                  Chứng chỉ #{i + 1}
                                </span>
                                {certs.length > 1 ? (
                                  <button
                                    onClick={() =>
                                      setCerts((arr) => arr.filter((_, idx) => idx !== i))
                                    }
                                    className="inline-flex items-center gap-1 text-[12px] text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 size={13} /> Xóa
                                  </button>
                                ) : null}
                              </div>
                              <div className="grid grid-cols-[1fr_1fr_auto] items-end gap-3">
                                <Field label="Tên chứng chỉ" required>
                                  <Input value={c.name} />
                                </Field>
                                <Field label="Nơi cấp" required>
                                  <Input value={c.place} />
                                </Field>
                                <FileButton />
                              </div>
                            </div>
                          ))}
                        </div>
                      </SectionCard>
                    </>
                  ) : null}

                  {currentStep === 4 ? (
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
                        title="Thông tin cá nhân"
                        stepIndex={1}
                        onEdit={() => setCurrentStep(0)}
                        rows={[
                          { label: "Họ và tên", value: "Nguyễn Văn A" },
                          { label: "Giới tính", value: "Nam" },
                          { label: "Ngày sinh", value: "01/01/2000" },
                          { label: "Quê quán", value: "Hà Nội" },
                          { label: "Email", value: "nguyenvana@tlu.edu.vn" },
                          { label: "Số điện thoại", value: "0987654321" },
                          {
                            label: "Số CCCD",
                            value: "001200001900",
                            warn: "CCCD đang trùng — cần xác nhận trước khi lưu",
                          },
                          { label: "Quốc tịch", value: foreigner ? "Nước ngoài" : "Việt Nam" },
                        ]}
                      />
                      <ReviewBlock
                        title="Công tác & lương"
                        stepIndex={2}
                        onEdit={() => setCurrentStep(1)}
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
                        stepIndex={3}
                        onEdit={() => setCurrentStep(2)}
                        rows={[
                          { label: "Trình độ văn hóa", value: "12/12" },
                          { label: "Trình độ đào tạo", value: "Tiến sĩ" },
                          { label: "Chức danh nghề nghiệp", value: "Tiến sĩ" },
                          { label: "Học hàm / Học vị", value: "Tiến sĩ" },
                        ]}
                      />
                      <ReviewBlock
                        title="Tài liệu đính kèm"
                        stepIndex={4}
                        onEdit={() => setCurrentStep(3)}
                        rows={[
                          {
                            label: "Tài liệu bắt buộc",
                            value: "3/4 đã tải lên",
                            warn: "Thiếu quyết định tuyển dụng",
                          },
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
                    {isLast ? (
                      <span className="inline-flex items-center gap-1 text-amber-700">
                        <AlertCircle size={14} /> Còn <b>1 lỗi</b> ở bước "Thông tin cá nhân".
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
                      <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50">
                        Hủy
                      </button>
                    )}
                    <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50">
                      <Save size={15} /> Lưu nháp
                    </button>
                    {isLast ? (
                      <button className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-medium text-white hover:bg-blue-800">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
