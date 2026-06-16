import { useEffect, useMemo, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  Banknote,
  BarChart3,
  Bell,
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
  Info,
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
import * as XLSX from "xlsx";
import tluLogoIcon from "./tlu-logo-icon.png";

type View = "ho-so" | "hop-dong";
type SidebarItem = { id: string; view?: View; label: string; icon: ReactNode };

const sidebarItems: SidebarItem[] = [
  { id: "ho-so", view: "ho-so", label: "Hồ sơ nhân sự", icon: <CircleUserRound size={17} /> },
  { id: "hop-dong", view: "hop-dong", label: "Hợp đồng lao động", icon: <FileText size={17} /> },
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

const generalEducationOptions = [
  "12/12",
  "11/12",
  "10/12",
  "9/12",
  "8/12",
  "7/12",
  "6/12",
  "5/12",
  "4/12",
  "3/12",
  "2/12",
  "1/12",
  "10/10",
  "9/10",
  "Khác",
];

const trainingLevelOptions = ["Sơ cấp", "Trung cấp", "Cao đẳng", "Đại học", "Thạc sĩ", "Tiến sĩ"];

const professionalTitleOptions = [
  "Trợ giảng",
  "Giảng viên hạng III",
  "Giảng viên chính hạng II",
  "Giảng viên cao cấp hạng I",
  "Chuyên viên",
  "Chuyên viên chính",
  "Chuyên viên cao cấp",
  "Kế toán viên",
  "Kế toán viên chính",
  "Thư viện viên",
  "Thư viện viên chính",
  "Nghiên cứu viên",
  "Nghiên cứu viên chính",
  "Nghiên cứu viên cao cấp",
  "Khác",
];

const academicRankDegreeOptions = ["Không có", "Cử nhân", "Kỹ sư", "Thạc sĩ", "Tiến sĩ", "Phó Giáo sư", "Giáo sư"];

type CredentialItem = { name: string; place: string };

const defaultDegrees: CredentialItem[] = [
  { name: "Bằng Cử nhân chuyên ngành Kỹ thuật phần mềm", place: "Trường Đại học Thủy lợi" },
  { name: "Bằng Kỹ sư Khoa học máy tính", place: "Trường Đại học Thủy lợi" },
];

const defaultCerts: CredentialItem[] = [{ name: "IELTS 7.5", place: "British Council" }];

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
  onChange,
}: {
  value?: string;
  placeholder?: string;
  icon?: ReactNode;
  state?: FieldState;
  readOnly?: boolean;
  onChange?: (value: string) => void;
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
        defaultValue={onChange ? undefined : value}
        value={onChange ? value ?? "" : undefined}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={(event) => onChange?.(event.target.value)}
        className="min-w-0 flex-1 bg-transparent text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
      />
      {state === "success" ? <CheckCircle2 size={16} className="text-emerald-500" /> : null}
      {state === "error" ? <AlertCircle size={16} className="text-red-500" /> : null}
    </div>
  );
}

function Select({
  value,
  state = "default",
  options,
  placeholder,
  onChange,
}: {
  value: string;
  state?: FieldState;
  options?: string[];
  placeholder?: string;
  onChange?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectable = !!options?.length;
  const baseRing =
    state === "error"
      ? "border-red-300"
      : state === "success"
      ? "border-emerald-300"
      : "border-slate-200";
  const openRing =
    state === "error"
      ? "border-red-300 ring-4 ring-red-100"
      : state === "success"
      ? "border-emerald-300 ring-4 ring-emerald-100"
      : "border-blue-300 ring-4 ring-blue-100";
  const currentValue = onChange ? value : localValue;
  const selectableOptions = options ? Array.from(new Set(currentValue ? [currentValue, ...options] : options)) : [];
  const displayValue = currentValue || placeholder || "";
  const mutedText = !currentValue;

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${open ? "z-50" : "z-0"}`}>
      <button
        type="button"
        onClick={selectable ? () => setOpen((current) => !current) : undefined}
        className={`relative flex h-10 w-full items-center justify-between gap-2 rounded-[18px] border bg-white py-0 pl-3 pr-2.5 text-left text-[13px] font-normal leading-5 shadow-sm shadow-slate-200/70 transition hover:border-blue-200 focus:outline-none focus:ring-4 ${
          open ? openRing : baseRing
        } ${mutedText ? "text-slate-400" : "text-slate-900"} ${selectable ? "cursor-pointer" : "cursor-default"}`}
      >
        <span className="min-w-0 flex-1 truncate">{displayValue}</span>
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">
          <ChevronDown size={14} className={`transition ${open ? "rotate-180" : ""}`} />
        </span>
      </button>

      {selectable && open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-[80] max-h-64 overflow-y-auto rounded-[18px] border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-300/40">
          {selectableOptions.map((option) => {
            const selected = option === currentValue;
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  if (onChange) {
                    onChange(option);
                  } else {
                    setLocalValue(option);
                  }
                  setOpen(false);
                }}
                className={`flex min-h-8 w-full items-center rounded-[14px] px-3 text-left text-[13px] font-normal leading-5 transition ${
                  selected ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="truncate">{option}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
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
  headerClassName = "",
  sectionId,
}: {
  title: string;
  description?: string;
  icon: ReactNode;
  optional?: boolean;
  children: ReactNode;
  action?: ReactNode;
  headerClassName?: string;
  sectionId?: string;
}) {
  return (
    <section id={sectionId} className="rounded-xl border border-slate-200 bg-white">
      <header className={`flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3 ${headerClassName}`}>
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

function ConfirmOfficialSaveModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="absolute inset-0 z-[120] flex items-center justify-center bg-slate-950/25 p-6 backdrop-blur-[2px]">
      <section className="w-full max-w-[460px] rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="border-b border-slate-100 px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
              <Info size={19} />
            </div>
            <div>
              <h3 className="text-[17px] font-semibold text-slate-950">Xác nhận lưu hồ sơ chính thức</h3>
              <p className="mt-1 text-[12.5px] leading-5 text-slate-500">
                Hồ sơ sẽ được tạo chính thức và chuyển sang trạng thái quản lý. Bạn vẫn có thể cập nhật bổ sung sau nếu quy trình cho phép.
              </p>
            </div>
          </div>
        </div>
        <div className="px-5 py-4">
          <div className="rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-[12.5px] leading-5 text-blue-900">
            Hãy kiểm tra lại thông tin quan trọng như họ tên, CCCD, đơn vị công tác và tài liệu bắt buộc trước khi xác nhận.
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-5 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
          >
            Quay lại kiểm tra
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-semibold text-white hover:bg-blue-800"
          >
            <UserPlus size={15} /> Xác nhận lưu
          </button>
        </div>
      </section>
    </div>
  );
}

function CredentialSection({
  title,
  description,
  icon,
  optional,
  items,
  setItems,
  itemLabel,
  namePlaceholder,
  requiredMinimum,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  optional?: boolean;
  items: CredentialItem[];
  setItems: (value: CredentialItem[] | ((items: CredentialItem[]) => CredentialItem[])) => void;
  itemLabel: string;
  namePlaceholder: string;
  requiredMinimum?: boolean;
}) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<CredentialItem>({ name: "", place: "" });
  const canSave = draft.name.trim().length > 0 && draft.place.trim().length > 0;

  const resetDraft = () => {
    setDraft({ name: "", place: "" });
    setAdding(false);
  };

  const saveDraft = () => {
    if (!canSave) return;

    setItems((current) => [...current, { name: draft.name.trim(), place: draft.place.trim() }]);
    resetDraft();
  };

  return (
    <SectionCard
      title={title}
      description={description}
      icon={icon}
      optional={optional}
      headerClassName="min-h-[86px]"
      action={
        <button
          type="button"
          onClick={() => setAdding(true)}
          disabled={adding}
          className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] font-medium transition ${
            adding
              ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
              : "border-blue-200 bg-white text-blue-700 hover:bg-blue-50"
          }`}
        >
          <Plus size={13} /> Thêm
        </button>
      }
    >
      <div className="space-y-3">
        <div className="space-y-2.5">
          {items.length ? (
            items.map((item, index) => {
              const locked = !!requiredMinimum && items.length <= 1;
              return (
                <div
                  key={`${item.name}-${index}`}
                  className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-medium leading-5 text-slate-900">{item.name}</div>
                    <div className="mt-1 text-[12px] text-slate-500">Nơi cấp: {item.place}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                        PDF
                      </span>
                      <span className="text-[11.5px] text-slate-500">Đã đính kèm file</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                    disabled={locked}
                    className={`grid size-8 shrink-0 place-items-center rounded-md ${
                      locked ? "cursor-not-allowed text-slate-300" : "text-red-500 hover:bg-red-50"
                    }`}
                    aria-label={`Xóa ${itemLabel}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50/60 px-3 py-4 text-[12.5px] text-slate-500">
              Chưa có {itemLabel}. Nhấn Thêm để bổ sung thông tin.
            </div>
          )}
        </div>

        {adding ? (
          <div className="rounded-lg border border-blue-100 bg-blue-50/40 p-3">
            <div className="mb-3 text-[12.5px] font-semibold text-slate-900">Thêm {itemLabel}</div>
            <div className="space-y-3">
              <Field label={`Tên ${itemLabel}`} required>
                <Input
                  value={draft.name}
                  placeholder={namePlaceholder}
                  onChange={(value) => setDraft((current) => ({ ...current, name: value }))}
                />
              </Field>
              <Field label="Nơi cấp" required>
                <Input
                  value={draft.place}
                  placeholder="Nhập nơi cấp"
                  onChange={(value) => setDraft((current) => ({ ...current, place: value }))}
                />
              </Field>
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-dashed border-slate-200 bg-white px-3 py-2.5">
                <div>
                  <div className="text-[12px] font-medium text-slate-800">File đính kèm</div>
                  <div className="text-[11.5px] text-slate-500">PDF {itemLabel}, có thể thay đổi sau.</div>
                </div>
                <FileButton label="Chọn PDF" />
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={resetDraft}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700 hover:bg-slate-50"
              >
                <X size={13} /> Hủy
              </button>
              <button
                type="button"
                onClick={saveDraft}
                disabled={!canSave}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium text-white ${
                  canSave ? "bg-blue-700 hover:bg-blue-800" : "cursor-not-allowed bg-slate-300"
                }`}
              >
                <Save size={13} /> Lưu
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </SectionCard>
  );
}

const initialPersonnelRows: string[][] = [
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
  // Expanded generated records to back the 392-contract summary while preserving the original seed rows.
  ["CB2026-2001", "Bùi Văn An", "Ban Giám hiệu", "Phó Giáo sư", "Chuyên viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2002", "Đỗ Văn An", "Phòng Tổ chức - Cán bộ", "Giáo sư", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2003", "Hồ Văn An", "Phòng Tài chính - Kế toán", "Cử nhân", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2004", "Ngô Văn An", "Khoa Công nghệ thông tin", "Kỹ sư", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2005", "Dương Văn An", "Khoa Kinh tế và Quản lý", "Thạc sĩ", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2006", "Lý Văn An", "Ban Giám hiệu", "Tiến sĩ", "Trợ lý", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2007", "Mai Văn An", "Phòng Tổ chức - Cán bộ", "Phó Giáo sư", "Trưởng nhóm hồ sơ", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2008", "Tạ Văn An", "Phòng Tài chính - Kế toán", "Giáo sư", "Kiểm soát viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2009", "Cao Văn An", "Khoa Công nghệ thông tin", "Cử nhân", "Giảng viên", "Sắp hết hạn", "Đang hoạt động"],
  ["CB2026-2010", "Đinh Văn An", "Khoa Kinh tế và Quản lý", "Kỹ sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2011", "Trịnh Văn An", "Ban Giám hiệu", "Thạc sĩ", "Phó hiệu trưởng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2012", "Đoàn Văn An", "Phòng Tổ chức - Cán bộ", "Tiến sĩ", "Chuyên viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2013", "Lương Văn An", "Phòng Tài chính - Kế toán", "Phó Giáo sư", "Kế toán viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2014", "Tô Văn An", "Khoa Công nghệ thông tin", "Giáo sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2015", "Nguyễn Thị An", "Khoa Kinh tế và Quản lý", "Cử nhân", "Trưởng bộ môn", "Chờ gia hạn", "Đang hoạt động"],
  ["CB2026-2016", "Trần Thị An", "Ban Giám hiệu", "Kỹ sư", "Thư ký hội đồng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2017", "Lê Thị An", "Phòng Tổ chức - Cán bộ", "Thạc sĩ", "Chuyên viên nhân sự", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2018", "Phạm Thị An", "Phòng Tài chính - Kế toán", "Tiến sĩ", "Chuyên viên tiền lương", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2019", "Hoàng Thị An", "Khoa Công nghệ thông tin", "Phó Giáo sư", "Phó trưởng khoa", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2020", "Huỳnh Thị An", "Khoa Kinh tế và Quản lý", "Giáo sư", "Cố vấn học tập", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2021", "Phan Thị An", "Ban Giám hiệu", "Cử nhân", "Chuyên viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2022", "Vũ Thị An", "Phòng Tổ chức - Cán bộ", "Kỹ sư", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2023", "Võ Thị An", "Phòng Tài chính - Kế toán", "Thạc sĩ", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2024", "Đặng Thị An", "Khoa Công nghệ thông tin", "Tiến sĩ", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2025", "Bùi Thị An", "Khoa Kinh tế và Quản lý", "Phó Giáo sư", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2026", "Đỗ Thị An", "Ban Giám hiệu", "Giáo sư", "Trợ lý", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2027", "Hồ Thị An", "Phòng Tổ chức - Cán bộ", "Cử nhân", "Trưởng nhóm hồ sơ", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2028", "Ngô Thị An", "Phòng Tài chính - Kế toán", "Kỹ sư", "Kiểm soát viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2029", "Dương Thị An", "Khoa Công nghệ thông tin", "Thạc sĩ", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2030", "Lý Thị An", "Khoa Kinh tế và Quản lý", "Tiến sĩ", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2031", "Mai Thị An", "Ban Giám hiệu", "Phó Giáo sư", "Phó hiệu trưởng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2032", "Tạ Thị An", "Phòng Tổ chức - Cán bộ", "Giáo sư", "Chuyên viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2033", "Cao Thị An", "Phòng Tài chính - Kế toán", "Cử nhân", "Kế toán viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2034", "Đinh Thị An", "Khoa Công nghệ thông tin", "Kỹ sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2035", "Trịnh Thị An", "Khoa Kinh tế và Quản lý", "Thạc sĩ", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2036", "Đoàn Thị An", "Ban Giám hiệu", "Tiến sĩ", "Thư ký hội đồng", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2037", "Lương Thị An", "Phòng Tổ chức - Cán bộ", "Phó Giáo sư", "Chuyên viên nhân sự", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2038", "Tô Thị An", "Phòng Tài chính - Kế toán", "Giáo sư", "Chuyên viên tiền lương", "Sắp hết hạn", "Đang hoạt động"],
  ["CB2026-2039", "Nguyễn Minh An", "Khoa Công nghệ thông tin", "Cử nhân", "Phó trưởng khoa", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2040", "Trần Minh An", "Khoa Kinh tế và Quản lý", "Kỹ sư", "Cố vấn học tập", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2041", "Lê Minh An", "Ban Giám hiệu", "Thạc sĩ", "Chuyên viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2042", "Phạm Minh An", "Phòng Tổ chức - Cán bộ", "Tiến sĩ", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2043", "Hoàng Minh An", "Phòng Tài chính - Kế toán", "Phó Giáo sư", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2044", "Huỳnh Minh An", "Khoa Công nghệ thông tin", "Giáo sư", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2045", "Phan Minh An", "Khoa Kinh tế và Quản lý", "Cử nhân", "Giảng viên", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2046", "Vũ Minh An", "Ban Giám hiệu", "Kỹ sư", "Trợ lý", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2047", "Võ Minh An", "Phòng Tổ chức - Cán bộ", "Thạc sĩ", "Trưởng nhóm hồ sơ", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2048", "Đặng Minh An", "Phòng Tài chính - Kế toán", "Tiến sĩ", "Kiểm soát viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2049", "Bùi Minh An", "Khoa Công nghệ thông tin", "Phó Giáo sư", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2050", "Đỗ Minh An", "Khoa Kinh tế và Quản lý", "Giáo sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2051", "Hồ Minh An", "Ban Giám hiệu", "Cử nhân", "Phó hiệu trưởng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2052", "Ngô Minh An", "Phòng Tổ chức - Cán bộ", "Kỹ sư", "Chuyên viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2053", "Dương Minh An", "Phòng Tài chính - Kế toán", "Thạc sĩ", "Kế toán viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2054", "Lý Minh An", "Khoa Công nghệ thông tin", "Tiến sĩ", "Giảng viên chính", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2055", "Mai Minh An", "Khoa Kinh tế và Quản lý", "Phó Giáo sư", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2056", "Tạ Minh An", "Ban Giám hiệu", "Giáo sư", "Thư ký hội đồng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2057", "Cao Minh An", "Phòng Tổ chức - Cán bộ", "Cử nhân", "Chuyên viên nhân sự", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2058", "Đinh Minh An", "Phòng Tài chính - Kế toán", "Kỹ sư", "Chuyên viên tiền lương", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2059", "Trịnh Minh An", "Khoa Công nghệ thông tin", "Thạc sĩ", "Phó trưởng khoa", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2060", "Đoàn Minh An", "Khoa Kinh tế và Quản lý", "Tiến sĩ", "Cố vấn học tập", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2061", "Lương Minh An", "Ban Giám hiệu", "Phó Giáo sư", "Chuyên viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2062", "Tô Minh An", "Phòng Tổ chức - Cán bộ", "Giáo sư", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2063", "Nguyễn Hữu An", "Phòng Tài chính - Kế toán", "Cử nhân", "Phó trưởng phòng", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2064", "Trần Hữu An", "Khoa Công nghệ thông tin", "Kỹ sư", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2065", "Lê Hữu An", "Khoa Kinh tế và Quản lý", "Thạc sĩ", "Giảng viên", "Sắp hết hạn", "Đang hoạt động"],
  ["CB2026-2066", "Phạm Hữu An", "Ban Giám hiệu", "Tiến sĩ", "Trợ lý", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2067", "Hoàng Hữu An", "Phòng Tổ chức - Cán bộ", "Phó Giáo sư", "Trưởng nhóm hồ sơ", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2068", "Huỳnh Hữu An", "Phòng Tài chính - Kế toán", "Giáo sư", "Kiểm soát viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2069", "Phan Hữu An", "Khoa Công nghệ thông tin", "Cử nhân", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2070", "Vũ Hữu An", "Khoa Kinh tế và Quản lý", "Kỹ sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2071", "Võ Hữu An", "Ban Giám hiệu", "Thạc sĩ", "Phó hiệu trưởng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2072", "Đặng Hữu An", "Phòng Tổ chức - Cán bộ", "Tiến sĩ", "Chuyên viên chính", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2073", "Bùi Hữu An", "Phòng Tài chính - Kế toán", "Phó Giáo sư", "Kế toán viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2074", "Đỗ Hữu An", "Khoa Công nghệ thông tin", "Giáo sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2075", "Hồ Hữu An", "Khoa Kinh tế và Quản lý", "Cử nhân", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2076", "Ngô Hữu An", "Ban Giám hiệu", "Kỹ sư", "Thư ký hội đồng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2077", "Dương Hữu An", "Phòng Tổ chức - Cán bộ", "Thạc sĩ", "Chuyên viên nhân sự", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2078", "Lý Hữu An", "Phòng Tài chính - Kế toán", "Tiến sĩ", "Chuyên viên tiền lương", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2079", "Mai Hữu An", "Khoa Công nghệ thông tin", "Phó Giáo sư", "Phó trưởng khoa", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2080", "Tạ Hữu An", "Khoa Kinh tế và Quản lý", "Giáo sư", "Cố vấn học tập", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2081", "Cao Hữu An", "Ban Giám hiệu", "Cử nhân", "Chuyên viên", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2082", "Đinh Hữu An", "Phòng Tổ chức - Cán bộ", "Kỹ sư", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2083", "Trịnh Hữu An", "Phòng Tài chính - Kế toán", "Thạc sĩ", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2084", "Đoàn Hữu An", "Khoa Công nghệ thông tin", "Tiến sĩ", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2085", "Lương Hữu An", "Khoa Kinh tế và Quản lý", "Phó Giáo sư", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2086", "Tô Hữu An", "Ban Giám hiệu", "Giáo sư", "Trợ lý", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2087", "Nguyễn Quang An", "Phòng Tổ chức - Cán bộ", "Cử nhân", "Trưởng nhóm hồ sơ", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2088", "Trần Quang An", "Phòng Tài chính - Kế toán", "Kỹ sư", "Kiểm soát viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2089", "Lê Quang An", "Khoa Công nghệ thông tin", "Thạc sĩ", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2090", "Phạm Quang An", "Khoa Kinh tế và Quản lý", "Tiến sĩ", "Giảng viên chính", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2091", "Hoàng Quang An", "Ban Giám hiệu", "Phó Giáo sư", "Phó hiệu trưởng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2092", "Huỳnh Quang An", "Phòng Tổ chức - Cán bộ", "Giáo sư", "Chuyên viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2093", "Phan Quang An", "Phòng Tài chính - Kế toán", "Cử nhân", "Kế toán viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2094", "Vũ Quang An", "Khoa Công nghệ thông tin", "Kỹ sư", "Giảng viên chính", "Sắp hết hạn", "Đang hoạt động"],
  ["CB2026-2095", "Võ Quang An", "Khoa Kinh tế và Quản lý", "Thạc sĩ", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2096", "Đặng Quang An", "Ban Giám hiệu", "Tiến sĩ", "Thư ký hội đồng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2097", "Bùi Quang An", "Phòng Tổ chức - Cán bộ", "Phó Giáo sư", "Chuyên viên nhân sự", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2098", "Đỗ Quang An", "Phòng Tài chính - Kế toán", "Giáo sư", "Chuyên viên tiền lương", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2099", "Hồ Quang An", "Khoa Công nghệ thông tin", "Cử nhân", "Phó trưởng khoa", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2100", "Ngô Quang An", "Khoa Kinh tế và Quản lý", "Kỹ sư", "Cố vấn học tập", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2101", "Dương Quang An", "Ban Giám hiệu", "Thạc sĩ", "Chuyên viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2102", "Lý Quang An", "Phòng Tổ chức - Cán bộ", "Tiến sĩ", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2103", "Mai Quang An", "Phòng Tài chính - Kế toán", "Phó Giáo sư", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2104", "Tạ Quang An", "Khoa Công nghệ thông tin", "Giáo sư", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2105", "Cao Quang An", "Khoa Kinh tế và Quản lý", "Cử nhân", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2106", "Đinh Quang An", "Ban Giám hiệu", "Kỹ sư", "Trợ lý", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2107", "Trịnh Quang An", "Phòng Tổ chức - Cán bộ", "Thạc sĩ", "Trưởng nhóm hồ sơ", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2108", "Đoàn Quang An", "Phòng Tài chính - Kế toán", "Tiến sĩ", "Kiểm soát viên", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2109", "Lương Quang An", "Khoa Công nghệ thông tin", "Phó Giáo sư", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2110", "Tô Quang An", "Khoa Kinh tế và Quản lý", "Giáo sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2111", "Nguyễn Thanh An", "Ban Giám hiệu", "Cử nhân", "Phó hiệu trưởng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2112", "Trần Thanh An", "Phòng Tổ chức - Cán bộ", "Kỹ sư", "Chuyên viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2113", "Lê Thanh An", "Phòng Tài chính - Kế toán", "Thạc sĩ", "Kế toán viên", "Chờ gia hạn", "Đang hoạt động"],
  ["CB2026-2114", "Phạm Thanh An", "Khoa Công nghệ thông tin", "Tiến sĩ", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2115", "Hoàng Thanh An", "Khoa Kinh tế và Quản lý", "Phó Giáo sư", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2116", "Huỳnh Thanh An", "Ban Giám hiệu", "Giáo sư", "Thư ký hội đồng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2117", "Phan Thanh An", "Phòng Tổ chức - Cán bộ", "Cử nhân", "Chuyên viên nhân sự", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2118", "Vũ Thanh An", "Phòng Tài chính - Kế toán", "Kỹ sư", "Chuyên viên tiền lương", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2119", "Võ Thanh An", "Khoa Công nghệ thông tin", "Thạc sĩ", "Phó trưởng khoa", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2120", "Đặng Thanh An", "Khoa Kinh tế và Quản lý", "Tiến sĩ", "Cố vấn học tập", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2121", "Bùi Thanh An", "Ban Giám hiệu", "Phó Giáo sư", "Chuyên viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2122", "Đỗ Thanh An", "Phòng Tổ chức - Cán bộ", "Giáo sư", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2123", "Hồ Thanh An", "Phòng Tài chính - Kế toán", "Cử nhân", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2124", "Ngô Thanh An", "Khoa Công nghệ thông tin", "Kỹ sư", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2125", "Dương Thanh An", "Khoa Kinh tế và Quản lý", "Thạc sĩ", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2126", "Lý Thanh An", "Ban Giám hiệu", "Tiến sĩ", "Trợ lý", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2127", "Mai Thanh An", "Phòng Tổ chức - Cán bộ", "Phó Giáo sư", "Trưởng nhóm hồ sơ", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2128", "Tạ Thanh An", "Phòng Tài chính - Kế toán", "Giáo sư", "Kiểm soát viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2129", "Cao Thanh An", "Khoa Công nghệ thông tin", "Cử nhân", "Giảng viên", "Sắp hết hạn", "Đang hoạt động"],
  ["CB2026-2130", "Đinh Thanh An", "Khoa Kinh tế và Quản lý", "Kỹ sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2131", "Trịnh Thanh An", "Ban Giám hiệu", "Thạc sĩ", "Phó hiệu trưởng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2132", "Đoàn Thanh An", "Phòng Tổ chức - Cán bộ", "Tiến sĩ", "Chuyên viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2133", "Lương Thanh An", "Phòng Tài chính - Kế toán", "Phó Giáo sư", "Kế toán viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2134", "Tô Thanh An", "Khoa Công nghệ thông tin", "Giáo sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2135", "Nguyễn Ngọc An", "Khoa Kinh tế và Quản lý", "Cử nhân", "Trưởng bộ môn", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2136", "Trần Ngọc An", "Ban Giám hiệu", "Kỹ sư", "Thư ký hội đồng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2137", "Lê Ngọc An", "Phòng Tổ chức - Cán bộ", "Thạc sĩ", "Chuyên viên nhân sự", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2138", "Phạm Ngọc An", "Phòng Tài chính - Kế toán", "Tiến sĩ", "Chuyên viên tiền lương", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2139", "Hoàng Ngọc An", "Khoa Công nghệ thông tin", "Phó Giáo sư", "Phó trưởng khoa", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2140", "Huỳnh Ngọc An", "Khoa Kinh tế và Quản lý", "Giáo sư", "Cố vấn học tập", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2141", "Phan Ngọc An", "Ban Giám hiệu", "Cử nhân", "Chuyên viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2142", "Vũ Ngọc An", "Phòng Tổ chức - Cán bộ", "Kỹ sư", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2143", "Võ Ngọc An", "Phòng Tài chính - Kế toán", "Thạc sĩ", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2144", "Đặng Ngọc An", "Khoa Công nghệ thông tin", "Tiến sĩ", "Trưởng bộ môn", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2145", "Bùi Ngọc An", "Khoa Kinh tế và Quản lý", "Phó Giáo sư", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2146", "Đỗ Ngọc An", "Ban Giám hiệu", "Giáo sư", "Trợ lý", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2147", "Hồ Ngọc An", "Phòng Tổ chức - Cán bộ", "Cử nhân", "Trưởng nhóm hồ sơ", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2148", "Ngô Ngọc An", "Phòng Tài chính - Kế toán", "Kỹ sư", "Kiểm soát viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2149", "Dương Ngọc An", "Khoa Công nghệ thông tin", "Thạc sĩ", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2150", "Lý Ngọc An", "Khoa Kinh tế và Quản lý", "Tiến sĩ", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2151", "Mai Ngọc An", "Ban Giám hiệu", "Phó Giáo sư", "Phó hiệu trưởng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2152", "Tạ Ngọc An", "Phòng Tổ chức - Cán bộ", "Giáo sư", "Chuyên viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2153", "Cao Ngọc An", "Phòng Tài chính - Kế toán", "Cử nhân", "Kế toán viên", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2154", "Đinh Ngọc An", "Khoa Công nghệ thông tin", "Kỹ sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2155", "Trịnh Ngọc An", "Khoa Kinh tế và Quản lý", "Thạc sĩ", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2156", "Đoàn Ngọc An", "Ban Giám hiệu", "Tiến sĩ", "Thư ký hội đồng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2157", "Lương Ngọc An", "Phòng Tổ chức - Cán bộ", "Phó Giáo sư", "Chuyên viên nhân sự", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2158", "Tô Ngọc An", "Phòng Tài chính - Kế toán", "Giáo sư", "Chuyên viên tiền lương", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2159", "Nguyễn Đức An", "Khoa Công nghệ thông tin", "Cử nhân", "Phó trưởng khoa", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2160", "Trần Đức An", "Khoa Kinh tế và Quản lý", "Kỹ sư", "Cố vấn học tập", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2161", "Lê Đức An", "Ban Giám hiệu", "Thạc sĩ", "Chuyên viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2162", "Phạm Đức An", "Phòng Tổ chức - Cán bộ", "Tiến sĩ", "Phó trưởng phòng", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2163", "Hoàng Đức An", "Phòng Tài chính - Kế toán", "Phó Giáo sư", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2164", "Huỳnh Đức An", "Khoa Công nghệ thông tin", "Giáo sư", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2165", "Phan Đức An", "Khoa Kinh tế và Quản lý", "Cử nhân", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2166", "Vũ Đức An", "Ban Giám hiệu", "Kỹ sư", "Trợ lý", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2167", "Võ Đức An", "Phòng Tổ chức - Cán bộ", "Thạc sĩ", "Trưởng nhóm hồ sơ", "Sắp hết hạn", "Đang hoạt động"],
  ["CB2026-2168", "Đặng Đức An", "Phòng Tài chính - Kế toán", "Tiến sĩ", "Kiểm soát viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2169", "Bùi Đức An", "Khoa Công nghệ thông tin", "Phó Giáo sư", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2170", "Đỗ Đức An", "Khoa Kinh tế và Quản lý", "Giáo sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2171", "Hồ Đức An", "Ban Giám hiệu", "Cử nhân", "Phó hiệu trưởng", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2172", "Ngô Đức An", "Phòng Tổ chức - Cán bộ", "Kỹ sư", "Chuyên viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2173", "Dương Đức An", "Phòng Tài chính - Kế toán", "Thạc sĩ", "Kế toán viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2174", "Lý Đức An", "Khoa Công nghệ thông tin", "Tiến sĩ", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2175", "Mai Đức An", "Khoa Kinh tế và Quản lý", "Phó Giáo sư", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2176", "Tạ Đức An", "Ban Giám hiệu", "Giáo sư", "Thư ký hội đồng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2177", "Cao Đức An", "Phòng Tổ chức - Cán bộ", "Cử nhân", "Chuyên viên nhân sự", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2178", "Đinh Đức An", "Phòng Tài chính - Kế toán", "Kỹ sư", "Chuyên viên tiền lương", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2179", "Trịnh Đức An", "Khoa Công nghệ thông tin", "Thạc sĩ", "Phó trưởng khoa", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2180", "Đoàn Đức An", "Khoa Kinh tế và Quản lý", "Tiến sĩ", "Cố vấn học tập", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2181", "Lương Đức An", "Ban Giám hiệu", "Phó Giáo sư", "Chuyên viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2182", "Tô Đức An", "Phòng Tổ chức - Cán bộ", "Giáo sư", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2183", "Nguyễn Anh An", "Phòng Tài chính - Kế toán", "Cử nhân", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2184", "Trần Anh An", "Khoa Công nghệ thông tin", "Kỹ sư", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2185", "Lê Anh An", "Khoa Kinh tế và Quản lý", "Thạc sĩ", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2186", "Phạm Anh An", "Ban Giám hiệu", "Tiến sĩ", "Trợ lý", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2187", "Hoàng Anh An", "Phòng Tổ chức - Cán bộ", "Phó Giáo sư", "Trưởng nhóm hồ sơ", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2188", "Huỳnh Anh An", "Phòng Tài chính - Kế toán", "Giáo sư", "Kiểm soát viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2189", "Phan Anh An", "Khoa Công nghệ thông tin", "Cử nhân", "Giảng viên", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2190", "Vũ Anh An", "Khoa Kinh tế và Quản lý", "Kỹ sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2191", "Võ Anh An", "Ban Giám hiệu", "Thạc sĩ", "Phó hiệu trưởng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2192", "Đặng Anh An", "Phòng Tổ chức - Cán bộ", "Tiến sĩ", "Chuyên viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2193", "Bùi Anh An", "Phòng Tài chính - Kế toán", "Phó Giáo sư", "Kế toán viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2194", "Đỗ Anh An", "Khoa Công nghệ thông tin", "Giáo sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2195", "Hồ Anh An", "Khoa Kinh tế và Quản lý", "Cử nhân", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2196", "Ngô Anh An", "Ban Giám hiệu", "Kỹ sư", "Thư ký hội đồng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2197", "Dương Anh An", "Phòng Tổ chức - Cán bộ", "Thạc sĩ", "Chuyên viên nhân sự", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2198", "Lý Anh An", "Phòng Tài chính - Kế toán", "Tiến sĩ", "Chuyên viên tiền lương", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2199", "Mai Anh An", "Khoa Công nghệ thông tin", "Phó Giáo sư", "Phó trưởng khoa", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2200", "Tạ Anh An", "Khoa Kinh tế và Quản lý", "Giáo sư", "Cố vấn học tập", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2201", "Cao Anh An", "Ban Giám hiệu", "Cử nhân", "Chuyên viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2202", "Đinh Anh An", "Phòng Tổ chức - Cán bộ", "Kỹ sư", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2203", "Trịnh Anh An", "Phòng Tài chính - Kế toán", "Thạc sĩ", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2204", "Đoàn Anh An", "Khoa Công nghệ thông tin", "Tiến sĩ", "Trưởng bộ môn", "Sắp hết hạn", "Đang hoạt động"],
  ["CB2026-2205", "Lương Anh An", "Khoa Kinh tế và Quản lý", "Phó Giáo sư", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2206", "Tô Anh An", "Ban Giám hiệu", "Giáo sư", "Trợ lý", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2207", "Nguyễn Thu An", "Phòng Tổ chức - Cán bộ", "Cử nhân", "Trưởng nhóm hồ sơ", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2208", "Trần Thu An", "Phòng Tài chính - Kế toán", "Kỹ sư", "Kiểm soát viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2209", "Lê Thu An", "Khoa Công nghệ thông tin", "Thạc sĩ", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2210", "Phạm Thu An", "Khoa Kinh tế và Quản lý", "Tiến sĩ", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2211", "Hoàng Thu An", "Ban Giám hiệu", "Phó Giáo sư", "Phó hiệu trưởng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2212", "Huỳnh Thu An", "Phòng Tổ chức - Cán bộ", "Giáo sư", "Chuyên viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2213", "Phan Thu An", "Phòng Tài chính - Kế toán", "Cử nhân", "Kế toán viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2214", "Vũ Thu An", "Khoa Công nghệ thông tin", "Kỹ sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2215", "Võ Thu An", "Khoa Kinh tế và Quản lý", "Thạc sĩ", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2216", "Đặng Thu An", "Ban Giám hiệu", "Tiến sĩ", "Thư ký hội đồng", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2217", "Bùi Thu An", "Phòng Tổ chức - Cán bộ", "Phó Giáo sư", "Chuyên viên nhân sự", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2218", "Đỗ Thu An", "Phòng Tài chính - Kế toán", "Giáo sư", "Chuyên viên tiền lương", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2219", "Hồ Thu An", "Khoa Công nghệ thông tin", "Cử nhân", "Phó trưởng khoa", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2220", "Ngô Thu An", "Khoa Kinh tế và Quản lý", "Kỹ sư", "Cố vấn học tập", "Chờ gia hạn", "Đang hoạt động"],
  ["CB2026-2221", "Dương Thu An", "Ban Giám hiệu", "Thạc sĩ", "Chuyên viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2222", "Lý Thu An", "Phòng Tổ chức - Cán bộ", "Tiến sĩ", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2223", "Mai Thu An", "Phòng Tài chính - Kế toán", "Phó Giáo sư", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2224", "Tạ Thu An", "Khoa Công nghệ thông tin", "Giáo sư", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2225", "Cao Thu An", "Khoa Kinh tế và Quản lý", "Cử nhân", "Giảng viên", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2226", "Đinh Thu An", "Ban Giám hiệu", "Kỹ sư", "Trợ lý", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2227", "Trịnh Thu An", "Phòng Tổ chức - Cán bộ", "Thạc sĩ", "Trưởng nhóm hồ sơ", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2228", "Đoàn Thu An", "Phòng Tài chính - Kế toán", "Tiến sĩ", "Kiểm soát viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2229", "Lương Thu An", "Khoa Công nghệ thông tin", "Phó Giáo sư", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2230", "Tô Thu An", "Khoa Kinh tế và Quản lý", "Giáo sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2231", "Nguyễn Gia An", "Ban Giám hiệu", "Cử nhân", "Phó hiệu trưởng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2232", "Trần Gia An", "Phòng Tổ chức - Cán bộ", "Kỹ sư", "Chuyên viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2233", "Lê Gia An", "Phòng Tài chính - Kế toán", "Thạc sĩ", "Kế toán viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2234", "Phạm Gia An", "Khoa Công nghệ thông tin", "Tiến sĩ", "Giảng viên chính", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2235", "Hoàng Gia An", "Khoa Kinh tế và Quản lý", "Phó Giáo sư", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2236", "Huỳnh Gia An", "Ban Giám hiệu", "Giáo sư", "Thư ký hội đồng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2237", "Phan Gia An", "Phòng Tổ chức - Cán bộ", "Cử nhân", "Chuyên viên nhân sự", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2238", "Vũ Gia An", "Phòng Tài chính - Kế toán", "Kỹ sư", "Chuyên viên tiền lương", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2239", "Võ Gia An", "Khoa Công nghệ thông tin", "Thạc sĩ", "Phó trưởng khoa", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2240", "Đặng Gia An", "Khoa Kinh tế và Quản lý", "Tiến sĩ", "Cố vấn học tập", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2241", "Bùi Gia An", "Ban Giám hiệu", "Phó Giáo sư", "Chuyên viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2242", "Đỗ Gia An", "Phòng Tổ chức - Cán bộ", "Giáo sư", "Phó trưởng phòng", "Sắp hết hạn", "Đang hoạt động"],
  ["CB2026-2243", "Hồ Gia An", "Phòng Tài chính - Kế toán", "Cử nhân", "Phó trưởng phòng", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2244", "Ngô Gia An", "Khoa Công nghệ thông tin", "Kỹ sư", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2245", "Dương Gia An", "Khoa Kinh tế và Quản lý", "Thạc sĩ", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2246", "Lý Gia An", "Ban Giám hiệu", "Tiến sĩ", "Trợ lý", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2247", "Mai Gia An", "Phòng Tổ chức - Cán bộ", "Phó Giáo sư", "Trưởng nhóm hồ sơ", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2248", "Tạ Gia An", "Phòng Tài chính - Kế toán", "Giáo sư", "Kiểm soát viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2249", "Cao Gia An", "Khoa Công nghệ thông tin", "Cử nhân", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2250", "Đinh Gia An", "Khoa Kinh tế và Quản lý", "Kỹ sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2251", "Trịnh Gia An", "Ban Giám hiệu", "Thạc sĩ", "Phó hiệu trưởng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2252", "Đoàn Gia An", "Phòng Tổ chức - Cán bộ", "Tiến sĩ", "Chuyên viên chính", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2253", "Lương Gia An", "Phòng Tài chính - Kế toán", "Phó Giáo sư", "Kế toán viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2254", "Tô Gia An", "Khoa Công nghệ thông tin", "Giáo sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2255", "Nguyễn Hoài An", "Khoa Kinh tế và Quản lý", "Cử nhân", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2256", "Trần Hoài An", "Ban Giám hiệu", "Kỹ sư", "Thư ký hội đồng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2257", "Lê Hoài An", "Phòng Tổ chức - Cán bộ", "Thạc sĩ", "Chuyên viên nhân sự", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2258", "Phạm Hoài An", "Phòng Tài chính - Kế toán", "Tiến sĩ", "Chuyên viên tiền lương", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2259", "Hoàng Hoài An", "Khoa Công nghệ thông tin", "Phó Giáo sư", "Phó trưởng khoa", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2260", "Huỳnh Hoài An", "Khoa Kinh tế và Quản lý", "Giáo sư", "Cố vấn học tập", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2261", "Phan Hoài An", "Ban Giám hiệu", "Cử nhân", "Chuyên viên", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2262", "Vũ Hoài An", "Phòng Tổ chức - Cán bộ", "Kỹ sư", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2263", "Võ Hoài An", "Phòng Tài chính - Kế toán", "Thạc sĩ", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2264", "Đặng Hoài An", "Khoa Công nghệ thông tin", "Tiến sĩ", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2265", "Bùi Hoài An", "Khoa Kinh tế và Quản lý", "Phó Giáo sư", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2266", "Đỗ Hoài An", "Ban Giám hiệu", "Giáo sư", "Trợ lý", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2267", "Hồ Hoài An", "Phòng Tổ chức - Cán bộ", "Cử nhân", "Trưởng nhóm hồ sơ", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2268", "Ngô Hoài An", "Phòng Tài chính - Kế toán", "Kỹ sư", "Kiểm soát viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2269", "Dương Hoài An", "Khoa Công nghệ thông tin", "Thạc sĩ", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2270", "Lý Hoài An", "Khoa Kinh tế và Quản lý", "Tiến sĩ", "Giảng viên chính", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2271", "Mai Hoài An", "Ban Giám hiệu", "Phó Giáo sư", "Phó hiệu trưởng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2272", "Tạ Hoài An", "Phòng Tổ chức - Cán bộ", "Giáo sư", "Chuyên viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2273", "Cao Hoài An", "Phòng Tài chính - Kế toán", "Cử nhân", "Kế toán viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2274", "Đinh Hoài An", "Khoa Công nghệ thông tin", "Kỹ sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2275", "Trịnh Hoài An", "Khoa Kinh tế và Quản lý", "Thạc sĩ", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2276", "Đoàn Hoài An", "Ban Giám hiệu", "Tiến sĩ", "Thư ký hội đồng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2277", "Lương Hoài An", "Phòng Tổ chức - Cán bộ", "Phó Giáo sư", "Chuyên viên nhân sự", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2278", "Tô Hoài An", "Phòng Tài chính - Kế toán", "Giáo sư", "Chuyên viên tiền lương", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2279", "Nguyễn Khánh An", "Khoa Công nghệ thông tin", "Cử nhân", "Phó trưởng khoa", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2280", "Trần Khánh An", "Khoa Kinh tế và Quản lý", "Kỹ sư", "Cố vấn học tập", "Sắp hết hạn", "Đang hoạt động"],
  ["CB2026-2281", "Lê Khánh An", "Ban Giám hiệu", "Thạc sĩ", "Chuyên viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2282", "Phạm Khánh An", "Phòng Tổ chức - Cán bộ", "Tiến sĩ", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2283", "Hoàng Khánh An", "Phòng Tài chính - Kế toán", "Phó Giáo sư", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2284", "Huỳnh Khánh An", "Khoa Công nghệ thông tin", "Giáo sư", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2285", "Phan Khánh An", "Khoa Kinh tế và Quản lý", "Cử nhân", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2286", "Vũ Khánh An", "Ban Giám hiệu", "Kỹ sư", "Trợ lý", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2287", "Võ Khánh An", "Phòng Tổ chức - Cán bộ", "Thạc sĩ", "Trưởng nhóm hồ sơ", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2288", "Đặng Khánh An", "Phòng Tài chính - Kế toán", "Tiến sĩ", "Kiểm soát viên", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2289", "Bùi Khánh An", "Khoa Công nghệ thông tin", "Phó Giáo sư", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2290", "Đỗ Khánh An", "Khoa Kinh tế và Quản lý", "Giáo sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2291", "Hồ Khánh An", "Ban Giám hiệu", "Cử nhân", "Phó hiệu trưởng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2292", "Ngô Khánh An", "Phòng Tổ chức - Cán bộ", "Kỹ sư", "Chuyên viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2293", "Dương Khánh An", "Phòng Tài chính - Kế toán", "Thạc sĩ", "Kế toán viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2294", "Lý Khánh An", "Khoa Công nghệ thông tin", "Tiến sĩ", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2295", "Mai Khánh An", "Khoa Kinh tế và Quản lý", "Phó Giáo sư", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2296", "Tạ Khánh An", "Ban Giám hiệu", "Giáo sư", "Thư ký hội đồng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2297", "Cao Khánh An", "Phòng Tổ chức - Cán bộ", "Cử nhân", "Chuyên viên nhân sự", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2298", "Đinh Khánh An", "Phòng Tài chính - Kế toán", "Kỹ sư", "Chuyên viên tiền lương", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2299", "Trịnh Khánh An", "Khoa Công nghệ thông tin", "Thạc sĩ", "Phó trưởng khoa", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2300", "Đoàn Khánh An", "Khoa Kinh tế và Quản lý", "Tiến sĩ", "Cố vấn học tập", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2301", "Lương Khánh An", "Ban Giám hiệu", "Phó Giáo sư", "Chuyên viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2302", "Tô Khánh An", "Phòng Tổ chức - Cán bộ", "Giáo sư", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2303", "Nguyễn Nhật An", "Phòng Tài chính - Kế toán", "Cử nhân", "Phó trưởng phòng", "Chờ gia hạn", "Đang hoạt động"],
  ["CB2026-2304", "Trần Nhật An", "Khoa Công nghệ thông tin", "Kỹ sư", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2305", "Lê Nhật An", "Khoa Kinh tế và Quản lý", "Thạc sĩ", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2306", "Phạm Nhật An", "Ban Giám hiệu", "Tiến sĩ", "Trợ lý", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2307", "Hoàng Nhật An", "Phòng Tổ chức - Cán bộ", "Phó Giáo sư", "Trưởng nhóm hồ sơ", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2308", "Huỳnh Nhật An", "Phòng Tài chính - Kế toán", "Giáo sư", "Kiểm soát viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2309", "Phan Nhật An", "Khoa Công nghệ thông tin", "Cử nhân", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2310", "Vũ Nhật An", "Khoa Kinh tế và Quản lý", "Kỹ sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2311", "Võ Nhật An", "Ban Giám hiệu", "Thạc sĩ", "Phó hiệu trưởng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2312", "Đặng Nhật An", "Phòng Tổ chức - Cán bộ", "Tiến sĩ", "Chuyên viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2313", "Bùi Nhật An", "Phòng Tài chính - Kế toán", "Phó Giáo sư", "Kế toán viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2314", "Đỗ Nhật An", "Khoa Công nghệ thông tin", "Giáo sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2315", "Hồ Nhật An", "Khoa Kinh tế và Quản lý", "Cử nhân", "Trưởng bộ môn", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2316", "Ngô Nhật An", "Ban Giám hiệu", "Kỹ sư", "Thư ký hội đồng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2317", "Dương Nhật An", "Phòng Tổ chức - Cán bộ", "Thạc sĩ", "Chuyên viên nhân sự", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2318", "Lý Nhật An", "Phòng Tài chính - Kế toán", "Tiến sĩ", "Chuyên viên tiền lương", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2319", "Mai Nhật An", "Khoa Công nghệ thông tin", "Phó Giáo sư", "Phó trưởng khoa", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2320", "Tạ Nhật An", "Khoa Kinh tế và Quản lý", "Giáo sư", "Cố vấn học tập", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2321", "Cao Nhật An", "Ban Giám hiệu", "Cử nhân", "Chuyên viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2322", "Đinh Nhật An", "Phòng Tổ chức - Cán bộ", "Kỹ sư", "Phó trưởng phòng", "Sắp hết hạn", "Đang hoạt động"],
  ["CB2026-2323", "Trịnh Nhật An", "Phòng Tài chính - Kế toán", "Thạc sĩ", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2324", "Đoàn Nhật An", "Khoa Công nghệ thông tin", "Tiến sĩ", "Trưởng bộ môn", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2325", "Lương Nhật An", "Khoa Kinh tế và Quản lý", "Phó Giáo sư", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2326", "Tô Nhật An", "Ban Giám hiệu", "Giáo sư", "Trợ lý", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2327", "Nguyễn Bảo An", "Phòng Tổ chức - Cán bộ", "Cử nhân", "Trưởng nhóm hồ sơ", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2328", "Trần Bảo An", "Phòng Tài chính - Kế toán", "Kỹ sư", "Kiểm soát viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2329", "Lê Bảo An", "Khoa Công nghệ thông tin", "Thạc sĩ", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2330", "Phạm Bảo An", "Khoa Kinh tế và Quản lý", "Tiến sĩ", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2331", "Hoàng Bảo An", "Ban Giám hiệu", "Phó Giáo sư", "Phó hiệu trưởng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2332", "Huỳnh Bảo An", "Phòng Tổ chức - Cán bộ", "Giáo sư", "Chuyên viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2333", "Phan Bảo An", "Phòng Tài chính - Kế toán", "Cử nhân", "Kế toán viên", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2334", "Vũ Bảo An", "Khoa Công nghệ thông tin", "Kỹ sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2335", "Võ Bảo An", "Khoa Kinh tế và Quản lý", "Thạc sĩ", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2336", "Đặng Bảo An", "Ban Giám hiệu", "Tiến sĩ", "Thư ký hội đồng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2337", "Bùi Bảo An", "Phòng Tổ chức - Cán bộ", "Phó Giáo sư", "Chuyên viên nhân sự", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2338", "Đỗ Bảo An", "Phòng Tài chính - Kế toán", "Giáo sư", "Chuyên viên tiền lương", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2339", "Hồ Bảo An", "Khoa Công nghệ thông tin", "Cử nhân", "Phó trưởng khoa", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2340", "Ngô Bảo An", "Khoa Kinh tế và Quản lý", "Kỹ sư", "Cố vấn học tập", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2341", "Dương Bảo An", "Ban Giám hiệu", "Thạc sĩ", "Chuyên viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2342", "Lý Bảo An", "Phòng Tổ chức - Cán bộ", "Tiến sĩ", "Phó trưởng phòng", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2343", "Mai Bảo An", "Phòng Tài chính - Kế toán", "Phó Giáo sư", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2344", "Tạ Bảo An", "Khoa Công nghệ thông tin", "Giáo sư", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2345", "Cao Bảo An", "Khoa Kinh tế và Quản lý", "Cử nhân", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2346", "Đinh Bảo An", "Ban Giám hiệu", "Kỹ sư", "Trợ lý", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2347", "Trịnh Bảo An", "Phòng Tổ chức - Cán bộ", "Thạc sĩ", "Trưởng nhóm hồ sơ", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2348", "Đoàn Bảo An", "Phòng Tài chính - Kế toán", "Tiến sĩ", "Kiểm soát viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2349", "Lương Bảo An", "Khoa Công nghệ thông tin", "Phó Giáo sư", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2350", "Tô Bảo An", "Khoa Kinh tế và Quản lý", "Giáo sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2351", "Nguyễn Kim An", "Ban Giám hiệu", "Cử nhân", "Phó hiệu trưởng", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2352", "Trần Kim An", "Phòng Tổ chức - Cán bộ", "Kỹ sư", "Chuyên viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2353", "Lê Kim An", "Phòng Tài chính - Kế toán", "Thạc sĩ", "Kế toán viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2354", "Phạm Kim An", "Khoa Công nghệ thông tin", "Tiến sĩ", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2355", "Hoàng Kim An", "Khoa Kinh tế và Quản lý", "Phó Giáo sư", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2356", "Huỳnh Kim An", "Ban Giám hiệu", "Giáo sư", "Thư ký hội đồng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2357", "Phan Kim An", "Phòng Tổ chức - Cán bộ", "Cử nhân", "Chuyên viên nhân sự", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2358", "Vũ Kim An", "Phòng Tài chính - Kế toán", "Kỹ sư", "Chuyên viên tiền lương", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2359", "Võ Kim An", "Khoa Công nghệ thông tin", "Thạc sĩ", "Phó trưởng khoa", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2360", "Đặng Kim An", "Khoa Kinh tế và Quản lý", "Tiến sĩ", "Cố vấn học tập", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2361", "Bùi Kim An", "Ban Giám hiệu", "Phó Giáo sư", "Chuyên viên", "Sắp hết hạn", "Đang hoạt động"],
  ["CB2026-2362", "Đỗ Kim An", "Phòng Tổ chức - Cán bộ", "Giáo sư", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2363", "Hồ Kim An", "Phòng Tài chính - Kế toán", "Cử nhân", "Phó trưởng phòng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2364", "Ngô Kim An", "Khoa Công nghệ thông tin", "Kỹ sư", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2365", "Dương Kim An", "Khoa Kinh tế và Quản lý", "Thạc sĩ", "Giảng viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2366", "Lý Kim An", "Ban Giám hiệu", "Tiến sĩ", "Trợ lý", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2367", "Mai Kim An", "Phòng Tổ chức - Cán bộ", "Phó Giáo sư", "Trưởng nhóm hồ sơ", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2368", "Tạ Kim An", "Phòng Tài chính - Kế toán", "Giáo sư", "Kiểm soát viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2369", "Cao Kim An", "Khoa Công nghệ thông tin", "Cử nhân", "Giảng viên", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2370", "Đinh Kim An", "Khoa Kinh tế và Quản lý", "Kỹ sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2371", "Trịnh Kim An", "Ban Giám hiệu", "Thạc sĩ", "Phó hiệu trưởng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2372", "Đoàn Kim An", "Phòng Tổ chức - Cán bộ", "Tiến sĩ", "Chuyên viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2373", "Lương Kim An", "Phòng Tài chính - Kế toán", "Phó Giáo sư", "Kế toán viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2374", "Tô Kim An", "Khoa Công nghệ thông tin", "Giáo sư", "Giảng viên chính", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2375", "Nguyễn Văn Bình", "Khoa Kinh tế và Quản lý", "Cử nhân", "Trưởng bộ môn", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2376", "Trần Văn Bình", "Ban Giám hiệu", "Kỹ sư", "Thư ký hội đồng", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2377", "Lê Văn Bình", "Phòng Tổ chức - Cán bộ", "Thạc sĩ", "Chuyên viên nhân sự", "Chờ gia hạn", "Đang hoạt động"],
  ["CB2026-2378", "Phạm Văn Bình", "Phòng Tài chính - Kế toán", "Tiến sĩ", "Chuyên viên tiền lương", "Hết hiệu lực", "Đã thôi việc"],
  ["CB2026-2379", "Hoàng Văn Bình", "Khoa Công nghệ thông tin", "Phó Giáo sư", "Phó trưởng khoa", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2380", "Huỳnh Văn Bình", "Khoa Kinh tế và Quản lý", "Giáo sư", "Cố vấn học tập", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2381", "Phan Văn Bình", "Ban Giám hiệu", "Cử nhân", "Chuyên viên", "Còn hiệu lực", "Đang hoạt động"],
  ["CB2026-2382", "Vũ Văn Bình", "Phòng Tổ chức - Cán bộ", "Kỹ sư", "Phó trưởng phòng", "Hết hiệu lực", "Đã thôi việc"],
];

type PersonnelRecord = {
  code: string;
  name: string;
  unit: string;
  degree: string;
  role: string;
  contract: string;
  status: string;
};

type PersonnelRow = [string, string, string, string, string, string, string];

type PersonnelImportInvalidRow = {
  row: string;
  name: string;
  field: string;
  issue: string;
  type: string;
};

type PersonnelImportAnalysis = {
  fileName: string;
  totalRows: number;
  validRows: PersonnelRow[];
  invalidRows: PersonnelImportInvalidRow[];
  validCount: number;
  invalidCount: number;
  errorCount: number;
  allValid: boolean;
};

type ContractFiltersState = {
  keyword: string;
  contractType: string;
  status: string;
  expiryDate: string;
  unit: string;
};

const initialContractFilters: ContractFiltersState = {
  keyword: "",
  contractType: "",
  status: "",
  expiryDate: "",
  unit: "",
};

const PERSONNEL_PAGE_SIZE = 10;
const CONTRACT_PAGE_SIZE = 5;

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function padDatePart(value: number) {
  return String(value).padStart(2, "0");
}

function formatContractDate(date: Date) {
  return `${padDatePart(date.getDate())}/${padDatePart(date.getMonth() + 1)}/${date.getFullYear()}`;
}

function parseContractDate(value: string) {
  const [day, month, year] = value.split("/").map((part) => Number(part));
  if (!day || !month || !year) return null;

  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;

  return date;
}

function isSameCalendarDate(left: Date | null, right: Date) {
  return Boolean(
    left &&
      left.getFullYear() === right.getFullYear() &&
      left.getMonth() === right.getMonth() &&
      left.getDate() === right.getDate(),
  );
}

function toPersonnelRecord([code, name, unit, degree, role, contract, status]: string[]): PersonnelRecord {
  return { code, name, unit, degree, role, contract, status };
}

const PERSONNEL_IMPORT_HEADERS = [
  "Mã cán bộ",
  "Họ và tên",
  "Đơn vị",
  "Trình độ",
  "Chức danh",
  "Hợp đồng",
  "Trạng thái",
] as const;
const PERSONNEL_IMPORT_TEMPLATE_PATH = "/templates/personnel-import-template.xlsx";
const PERSONNEL_IMPORT_MAX_ROWS = 200;

function derivePersonnelOptions(rows: string[][]) {
  return {
    unitOptions: Array.from(new Set(rows.map((row) => row[2]))),
    degreeOptions: Array.from(new Set(rows.map((row) => row[3]))),
    roleOptions: Array.from(new Set(rows.map((row) => row[4]))),
    contractOptions: Array.from(new Set(rows.map((row) => row[5]))),
    statusOptions: Array.from(new Set(rows.map((row) => row[6]))),
  };
}

function normalizeExcelCell(value: unknown) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function buildPersonnelImportAnalysis({
  fileName,
  totalRows,
  validRows,
  invalidRows,
}: {
  fileName: string;
  totalRows: number;
  validRows: PersonnelRow[];
  invalidRows: PersonnelImportInvalidRow[];
}): PersonnelImportAnalysis {
  const distinctInvalidRows = new Set(invalidRows.map((row) => row.row));
  return {
    fileName,
    totalRows,
    validRows,
    invalidRows,
    validCount: validRows.length,
    invalidCount: distinctInvalidRows.size,
    errorCount: invalidRows.length,
    allValid: invalidRows.length === 0 && validRows.length > 0,
  };
}

function analyzePersonnelWorkbook(
  workbook: XLSX.WorkBook,
  fileName: string,
  existingRows: string[][],
  options: {
    unitOptions: string[];
    degreeOptions: string[];
    contractOptions: string[];
    statusOptions: string[];
  },
): PersonnelImportAnalysis {
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = firstSheetName ? workbook.Sheets[firstSheetName] : undefined;

  if (!worksheet) {
    return buildPersonnelImportAnalysis({
      fileName,
      totalRows: 0,
      validRows: [],
      invalidRows: [
        {
          row: "Toàn file",
          name: fileName,
          field: "Worksheet",
          issue: "Không tìm thấy sheet dữ liệu trong file Excel.",
          type: "Sai cấu trúc",
        },
      ],
    });
  }

  const sheetRows = XLSX.utils.sheet_to_json<(string | number | boolean | null)[]>(worksheet, {
    header: 1,
    raw: false,
    defval: "",
    blankrows: false,
  });
  const headerRow = (sheetRows[0] ?? []).slice(0, PERSONNEL_IMPORT_HEADERS.length).map(normalizeExcelCell);
  const headersValid =
    headerRow.length === PERSONNEL_IMPORT_HEADERS.length &&
    PERSONNEL_IMPORT_HEADERS.every((header, index) => headerRow[index] === header);
  const dataRows = sheetRows.slice(1);

  if (!headersValid) {
    return buildPersonnelImportAnalysis({
      fileName,
      totalRows: dataRows.length,
      validRows: [],
      invalidRows: [
        {
          row: "Dòng 1",
          name: fileName,
          field: "Tiêu đề cột",
          issue: `Tiêu đề phải đúng thứ tự: ${PERSONNEL_IMPORT_HEADERS.join(", ")}.`,
          type: "Sai cấu trúc",
        },
      ],
    });
  }

  if (dataRows.length === 0) {
    return buildPersonnelImportAnalysis({
      fileName,
      totalRows: 0,
      validRows: [],
      invalidRows: [
        {
          row: "Toàn file",
          name: fileName,
          field: "Dữ liệu",
          issue: "File chưa có dòng hồ sơ nhân sự nào để nhập.",
          type: "Thiếu dữ liệu",
        },
      ],
    });
  }

  if (dataRows.length > PERSONNEL_IMPORT_MAX_ROWS) {
    return buildPersonnelImportAnalysis({
      fileName,
      totalRows: dataRows.length,
      validRows: [],
      invalidRows: [
        {
          row: "Toàn file",
          name: fileName,
          field: "Số lượng hồ sơ",
          issue: `Mỗi lần chỉ nhập tối đa ${PERSONNEL_IMPORT_MAX_ROWS} hồ sơ. File hiện có ${dataRows.length} dòng dữ liệu.`,
          type: "Vượt giới hạn",
        },
      ],
    });
  }

  const existingCodes = new Set(existingRows.map((row) => normalizeExcelCell(row[0])));
  const allowedUnits = new Set(options.unitOptions.map(normalizeExcelCell));
  const allowedDegrees = new Set(options.degreeOptions.map(normalizeExcelCell));
  const allowedContracts = new Set(options.contractOptions.map(normalizeExcelCell));
  const allowedStatuses = new Set(options.statusOptions.map(normalizeExcelCell));
  const firstSeenCodeRow = new Map<string, number>();
  const invalidRows: PersonnelImportInvalidRow[] = [];
  const validRows: PersonnelRow[] = [];

  dataRows.forEach((rawRow, rowIndex) => {
    const excelRowNumber = rowIndex + 2;
    const normalizedRow = PERSONNEL_IMPORT_HEADERS.map((_, columnIndex) => normalizeExcelCell(rawRow[columnIndex])) as PersonnelRow;
    const [code, name, unit, degree, role, contract, status] = normalizedRow;
    const rowErrors: PersonnelImportInvalidRow[] = [];
    const rowLabel = `Dòng ${excelRowNumber}`;
    const displayName = name || code || "Chưa có họ tên";

    normalizedRow.forEach((value, columnIndex) => {
      if (value) return;
      rowErrors.push({
        row: rowLabel,
        name: displayName,
        field: PERSONNEL_IMPORT_HEADERS[columnIndex],
        issue: "Để trống trường bắt buộc.",
        type: "Thiếu bắt buộc",
      });
    });

    if (code) {
      if (existingCodes.has(code)) {
        rowErrors.push({
          row: rowLabel,
          name: displayName,
          field: "Mã cán bộ",
          issue: `Mã cán bộ ${code} đã tồn tại trong danh sách hiện có.`,
          type: "Trùng dữ liệu",
        });
      }

      const firstSeenRow = firstSeenCodeRow.get(code);
      if (firstSeenRow) {
        rowErrors.push({
          row: rowLabel,
          name: displayName,
          field: "Mã cán bộ",
          issue: `Mã cán bộ ${code} bị lặp trong file, trùng với dòng ${firstSeenRow}.`,
          type: "Trùng dữ liệu",
        });
      } else {
        firstSeenCodeRow.set(code, excelRowNumber);
      }
    }

    if (unit && !allowedUnits.has(unit)) {
      rowErrors.push({
        row: rowLabel,
        name: displayName,
        field: "Đơn vị",
        issue: `Đơn vị ${unit} chưa có trong danh mục hiện tại.`,
        type: "Sai danh mục",
      });
    }

    if (degree && !allowedDegrees.has(degree)) {
      rowErrors.push({
        row: rowLabel,
        name: displayName,
        field: "Trình độ",
        issue: `Trình độ ${degree} chưa có trong danh mục hiện tại.`,
        type: "Sai danh mục",
      });
    }

    if (contract && !allowedContracts.has(contract)) {
      rowErrors.push({
        row: rowLabel,
        name: displayName,
        field: "Hợp đồng",
        issue: `Giá trị ${contract} không khớp các trạng thái hợp đồng đang dùng.`,
        type: "Sai danh mục",
      });
    }

    if (status && !allowedStatuses.has(status)) {
      rowErrors.push({
        row: rowLabel,
        name: displayName,
        field: "Trạng thái",
        issue: `Giá trị ${status} không khớp các trạng thái hồ sơ đang dùng.`,
        type: "Sai danh mục",
      });
    }

    if (rowErrors.length > 0) {
      invalidRows.push(...rowErrors);
      return;
    }

    validRows.push(normalizedRow);
  });

  return buildPersonnelImportAnalysis({
    fileName,
    totalRows: dataRows.length,
    validRows,
    invalidRows,
  });
}

function SelectFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`flex h-9 min-w-[142px] items-center justify-between rounded-lg border bg-white px-3 text-[12px] shadow-sm ${
          value ? "border-[#8EC5FF] font-semibold text-[#1447E6]" : "border-slate-300 text-slate-500"
        }`}
      >
        <span>{value || label}</span>
        <ChevronDown size={14} className={`text-slate-400 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="absolute left-0 top-10 z-40 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-xl ring-1 ring-slate-100">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="w-full rounded-lg px-2.5 py-2 text-left text-[12px] font-medium text-slate-500 hover:bg-slate-50"
          >
            Tất cả {label.toLowerCase()}
          </button>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="w-full rounded-lg px-2.5 py-2 text-left text-[12px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
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
  unit: string;
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
    unit: "Ban Giám hiệu",
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
    unit: "Khoa Công nghệ thông tin",
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
    unit: "Phòng Tổ chức - Cán bộ",
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
    unit: "Ban Giám hiệu",
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
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "01/02/2026",
    end: "31/01/2027",
    status: "Còn hiệu lực",
    remaining: "245 ngày",
  },
  // Expanded generated records to back the 392-contract summary while preserving the original seed rows.
  {
    number: "HĐLĐ-2026-1006",
    code: "NS006",
    name: "Ngô Thị Phương",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "126 ngày",
  },
  {
    number: "HĐLĐ-2025-4007",
    code: "NS007",
    name: "Đỗ Văn Giang",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "15/06/2025",
    end: "21/06/2026",
    status: "Chờ gia hạn",
    remaining: "8 ngày",
  },
  {
    number: "HĐLĐ-2026-1008",
    code: "NS008",
    name: "Vũ Thị Hạnh",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "128 ngày",
  },
  {
    number: "HĐLĐ-2023-5009",
    code: "NS009",
    name: "Bùi Văn Khôi",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2022",
    end: "28/10/2023",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1010",
    code: "NS010",
    name: "Lý Thị Mai",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "130 ngày",
  },
  {
    number: "HĐLĐ-2026-1011",
    code: "CB2026-2001",
    name: "Bùi Văn An",
    unit: "Ban Giám hiệu",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "120 ngày",
  },
  {
    number: "HĐLĐ-2026-1012",
    code: "CB2026-2002",
    name: "Đỗ Văn An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "121 ngày",
  },
  {
    number: "HĐLĐ-2026-1013",
    code: "CB2026-2003",
    name: "Hồ Văn An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "122 ngày",
  },
  {
    number: "HĐLĐ-2026-1014",
    code: "CB2026-2004",
    name: "Ngô Văn An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "123 ngày",
  },
  {
    number: "HĐLĐ-2026-1015",
    code: "CB2026-2005",
    name: "Dương Văn An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "124 ngày",
  },
  {
    number: "HĐLĐ-2026-1016",
    code: "CB2026-2006",
    name: "Lý Văn An",
    unit: "Ban Giám hiệu",
    type: "Hợp đồng thử việc",
    start: "01/06/2022",
    end: "28/06/2023",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1017",
    code: "CB2026-2007",
    name: "Mai Văn An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "126 ngày",
  },
  {
    number: "HĐLĐ-2026-1018",
    code: "CB2026-2008",
    name: "Tạ Văn An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "127 ngày",
  },
  {
    number: "HĐLĐ-2026-1019",
    code: "CB2026-2009",
    name: "Cao Văn An",
    unit: "Khoa Công nghệ thông tin",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "26/06/2026",
    status: "Sắp hết hạn",
    remaining: "13 ngày",
  },
  {
    number: "HĐLĐ-2026-1020",
    code: "CB2026-2010",
    name: "Đinh Văn An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "129 ngày",
  },
  {
    number: "HĐLĐ-2026-1021",
    code: "CB2026-2011",
    name: "Trịnh Văn An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "130 ngày",
  },
  {
    number: "HĐLĐ-2026-1022",
    code: "CB2026-2012",
    name: "Đoàn Văn An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "131 ngày",
  },
  {
    number: "HĐLĐ-2026-1023",
    code: "CB2026-2013",
    name: "Lương Văn An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "132 ngày",
  },
  {
    number: "HĐLĐ-2026-1024",
    code: "CB2026-2014",
    name: "Tô Văn An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "133 ngày",
  },
  {
    number: "HĐLĐ-2026-1025",
    code: "CB2026-2015",
    name: "Nguyễn Thị An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 36 tháng",
    start: "15/03/2024",
    end: "18/06/2026",
    status: "Chờ gia hạn",
    remaining: "15 ngày",
  },
  {
    number: "HĐLĐ-2026-1026",
    code: "CB2026-2016",
    name: "Trần Thị An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "135 ngày",
  },
  {
    number: "HĐLĐ-2026-1027",
    code: "CB2026-2017",
    name: "Lê Thị An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "136 ngày",
  },
  {
    number: "HĐLĐ-2026-1028",
    code: "CB2026-2018",
    name: "Phạm Thị An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2022",
    end: "28/06/2023",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1029",
    code: "CB2026-2019",
    name: "Hoàng Thị An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "138 ngày",
  },
  {
    number: "HĐLĐ-2026-1030",
    code: "CB2026-2020",
    name: "Huỳnh Thị An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "139 ngày",
  },
  {
    number: "HĐLĐ-2026-1031",
    code: "CB2026-2021",
    name: "Phan Thị An",
    unit: "Ban Giám hiệu",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "140 ngày",
  },
  {
    number: "HĐLĐ-2026-1032",
    code: "CB2026-2022",
    name: "Vũ Thị An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "141 ngày",
  },
  {
    number: "HĐLĐ-2026-1033",
    code: "CB2026-2023",
    name: "Võ Thị An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "142 ngày",
  },
  {
    number: "HĐLĐ-2026-1034",
    code: "CB2026-2024",
    name: "Đặng Thị An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "143 ngày",
  },
  {
    number: "HĐLĐ-2026-1035",
    code: "CB2026-2025",
    name: "Bùi Thị An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "144 ngày",
  },
  {
    number: "HĐLĐ-2026-1036",
    code: "CB2026-2026",
    name: "Đỗ Thị An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "145 ngày",
  },
  {
    number: "HĐLĐ-2026-1037",
    code: "CB2026-2027",
    name: "Hồ Thị An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2023",
    end: "28/03/2024",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1038",
    code: "CB2026-2028",
    name: "Ngô Thị An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "147 ngày",
  },
  {
    number: "HĐLĐ-2026-1039",
    code: "CB2026-2029",
    name: "Dương Thị An",
    unit: "Khoa Công nghệ thông tin",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "148 ngày",
  },
  {
    number: "HĐLĐ-2026-1040",
    code: "CB2026-2030",
    name: "Lý Thị An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "149 ngày",
  },
  {
    number: "HĐLĐ-2026-1041",
    code: "CB2026-2031",
    name: "Mai Thị An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "150 ngày",
  },
  {
    number: "HĐLĐ-2026-1042",
    code: "CB2026-2032",
    name: "Tạ Thị An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "151 ngày",
  },
  {
    number: "HĐLĐ-2026-1043",
    code: "CB2026-2033",
    name: "Cao Thị An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "152 ngày",
  },
  {
    number: "HĐLĐ-2026-1044",
    code: "CB2026-2034",
    name: "Đinh Thị An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "153 ngày",
  },
  {
    number: "HĐLĐ-2026-1045",
    code: "CB2026-2035",
    name: "Trịnh Thị An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "154 ngày",
  },
  {
    number: "HĐLĐ-2026-1046",
    code: "CB2026-2036",
    name: "Đoàn Thị An",
    unit: "Ban Giám hiệu",
    type: "Hợp đồng thử việc",
    start: "01/12/2024",
    end: "28/12/2025",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1047",
    code: "CB2026-2037",
    name: "Lương Thị An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "156 ngày",
  },
  {
    number: "HĐLĐ-2026-1048",
    code: "CB2026-2038",
    name: "Tô Thị An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2024",
    end: "19/06/2026",
    status: "Sắp hết hạn",
    remaining: "18 ngày",
  },
  {
    number: "HĐLĐ-2026-1049",
    code: "CB2026-2039",
    name: "Nguyễn Minh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "158 ngày",
  },
  {
    number: "HĐLĐ-2026-1050",
    code: "CB2026-2040",
    name: "Trần Minh An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "159 ngày",
  },
  {
    number: "HĐLĐ-2026-1051",
    code: "CB2026-2041",
    name: "Lê Minh An",
    unit: "Ban Giám hiệu",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "160 ngày",
  },
  {
    number: "HĐLĐ-2026-1052",
    code: "CB2026-2042",
    name: "Phạm Minh An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "161 ngày",
  },
  {
    number: "HĐLĐ-2026-1053",
    code: "CB2026-2043",
    name: "Hoàng Minh An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "162 ngày",
  },
  {
    number: "HĐLĐ-2026-1054",
    code: "CB2026-2044",
    name: "Huỳnh Minh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "163 ngày",
  },
  {
    number: "HĐLĐ-2026-1055",
    code: "CB2026-2045",
    name: "Phan Minh An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/09/2021",
    end: "28/09/2022",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1056",
    code: "CB2026-2046",
    name: "Vũ Minh An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "165 ngày",
  },
  {
    number: "HĐLĐ-2026-1057",
    code: "CB2026-2047",
    name: "Võ Minh An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "166 ngày",
  },
  {
    number: "HĐLĐ-2026-1058",
    code: "CB2026-2048",
    name: "Đặng Minh An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "167 ngày",
  },
  {
    number: "HĐLĐ-2026-1059",
    code: "CB2026-2049",
    name: "Bùi Minh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "168 ngày",
  },
  {
    number: "HĐLĐ-2026-1060",
    code: "CB2026-2050",
    name: "Đỗ Minh An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "169 ngày",
  },
  {
    number: "HĐLĐ-2026-1061",
    code: "CB2026-2051",
    name: "Hồ Minh An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "170 ngày",
  },
  {
    number: "HĐLĐ-2026-1062",
    code: "CB2026-2052",
    name: "Ngô Minh An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "171 ngày",
  },
  {
    number: "HĐLĐ-2026-1063",
    code: "CB2026-2053",
    name: "Dương Minh An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "172 ngày",
  },
  {
    number: "HĐLĐ-2026-1064",
    code: "CB2026-2054",
    name: "Lý Minh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2022",
    end: "28/06/2023",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1065",
    code: "CB2026-2055",
    name: "Mai Minh An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "174 ngày",
  },
  {
    number: "HĐLĐ-2026-1066",
    code: "CB2026-2056",
    name: "Tạ Minh An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "175 ngày",
  },
  {
    number: "HĐLĐ-2026-1067",
    code: "CB2026-2057",
    name: "Cao Minh An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "176 ngày",
  },
  {
    number: "HĐLĐ-2026-1068",
    code: "CB2026-2058",
    name: "Đinh Minh An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "177 ngày",
  },
  {
    number: "HĐLĐ-2026-1069",
    code: "CB2026-2059",
    name: "Trịnh Minh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "178 ngày",
  },
  {
    number: "HĐLĐ-2026-1070",
    code: "CB2026-2060",
    name: "Đoàn Minh An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "179 ngày",
  },
  {
    number: "HĐLĐ-2026-1071",
    code: "CB2026-2061",
    name: "Lương Minh An",
    unit: "Ban Giám hiệu",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "180 ngày",
  },
  {
    number: "HĐLĐ-2026-1072",
    code: "CB2026-2062",
    name: "Tô Minh An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "181 ngày",
  },
  {
    number: "HĐLĐ-2026-1073",
    code: "CB2026-2063",
    name: "Nguyễn Hữu An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2023",
    end: "28/03/2024",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1074",
    code: "CB2026-2064",
    name: "Trần Hữu An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "183 ngày",
  },
  {
    number: "HĐLĐ-2026-1075",
    code: "CB2026-2065",
    name: "Lê Hữu An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "22/06/2026",
    status: "Sắp hết hạn",
    remaining: "21 ngày",
  },
  {
    number: "HĐLĐ-2026-1076",
    code: "CB2026-2066",
    name: "Phạm Hữu An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "185 ngày",
  },
  {
    number: "HĐLĐ-2026-1077",
    code: "CB2026-2067",
    name: "Hoàng Hữu An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "186 ngày",
  },
  {
    number: "HĐLĐ-2026-1078",
    code: "CB2026-2068",
    name: "Huỳnh Hữu An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "187 ngày",
  },
  {
    number: "HĐLĐ-2026-1079",
    code: "CB2026-2069",
    name: "Phan Hữu An",
    unit: "Khoa Công nghệ thông tin",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "188 ngày",
  },
  {
    number: "HĐLĐ-2026-1080",
    code: "CB2026-2070",
    name: "Vũ Hữu An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "189 ngày",
  },
  {
    number: "HĐLĐ-2026-1081",
    code: "CB2026-2071",
    name: "Võ Hữu An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "190 ngày",
  },
  {
    number: "HĐLĐ-2026-1082",
    code: "CB2026-2072",
    name: "Đặng Hữu An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2024",
    end: "28/12/2025",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1083",
    code: "CB2026-2073",
    name: "Bùi Hữu An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "192 ngày",
  },
  {
    number: "HĐLĐ-2026-1084",
    code: "CB2026-2074",
    name: "Đỗ Hữu An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "193 ngày",
  },
  {
    number: "HĐLĐ-2026-1085",
    code: "CB2026-2075",
    name: "Hồ Hữu An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "194 ngày",
  },
  {
    number: "HĐLĐ-2026-1086",
    code: "CB2026-2076",
    name: "Ngô Hữu An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "195 ngày",
  },
  {
    number: "HĐLĐ-2026-1087",
    code: "CB2026-2077",
    name: "Dương Hữu An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "196 ngày",
  },
  {
    number: "HĐLĐ-2026-1088",
    code: "CB2026-2078",
    name: "Lý Hữu An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "197 ngày",
  },
  {
    number: "HĐLĐ-2026-1089",
    code: "CB2026-2079",
    name: "Mai Hữu An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "198 ngày",
  },
  {
    number: "HĐLĐ-2026-1090",
    code: "CB2026-2080",
    name: "Tạ Hữu An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "199 ngày",
  },
  {
    number: "HĐLĐ-2026-1091",
    code: "CB2026-2081",
    name: "Cao Hữu An",
    unit: "Ban Giám hiệu",
    type: "Hợp đồng thử việc",
    start: "01/09/2021",
    end: "28/09/2022",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1092",
    code: "CB2026-2082",
    name: "Đinh Hữu An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "201 ngày",
  },
  {
    number: "HĐLĐ-2026-1093",
    code: "CB2026-2083",
    name: "Trịnh Hữu An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "202 ngày",
  },
  {
    number: "HĐLĐ-2026-1094",
    code: "CB2026-2084",
    name: "Đoàn Hữu An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "203 ngày",
  },
  {
    number: "HĐLĐ-2026-1095",
    code: "CB2026-2085",
    name: "Lương Hữu An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "204 ngày",
  },
  {
    number: "HĐLĐ-2026-1096",
    code: "CB2026-2086",
    name: "Tô Hữu An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "205 ngày",
  },
  {
    number: "HĐLĐ-2026-1097",
    code: "CB2026-2087",
    name: "Nguyễn Quang An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "206 ngày",
  },
  {
    number: "HĐLĐ-2026-1098",
    code: "CB2026-2088",
    name: "Trần Quang An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "207 ngày",
  },
  {
    number: "HĐLĐ-2026-1099",
    code: "CB2026-2089",
    name: "Lê Quang An",
    unit: "Khoa Công nghệ thông tin",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "208 ngày",
  },
  {
    number: "HĐLĐ-2026-1100",
    code: "CB2026-2090",
    name: "Phạm Quang An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2022",
    end: "28/06/2023",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1101",
    code: "CB2026-2091",
    name: "Hoàng Quang An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "210 ngày",
  },
  {
    number: "HĐLĐ-2026-1102",
    code: "CB2026-2092",
    name: "Huỳnh Quang An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "211 ngày",
  },
  {
    number: "HĐLĐ-2026-1103",
    code: "CB2026-2093",
    name: "Phan Quang An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "212 ngày",
  },
  {
    number: "HĐLĐ-2026-1104",
    code: "CB2026-2094",
    name: "Vũ Quang An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2024",
    end: "27/06/2026",
    status: "Sắp hết hạn",
    remaining: "26 ngày",
  },
  {
    number: "HĐLĐ-2026-1105",
    code: "CB2026-2095",
    name: "Võ Quang An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "214 ngày",
  },
  {
    number: "HĐLĐ-2026-1106",
    code: "CB2026-2096",
    name: "Đặng Quang An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "215 ngày",
  },
  {
    number: "HĐLĐ-2026-1107",
    code: "CB2026-2097",
    name: "Bùi Quang An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "216 ngày",
  },
  {
    number: "HĐLĐ-2026-1108",
    code: "CB2026-2098",
    name: "Đỗ Quang An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "217 ngày",
  },
  {
    number: "HĐLĐ-2026-1109",
    code: "CB2026-2099",
    name: "Hồ Quang An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2023",
    end: "28/03/2024",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1110",
    code: "CB2026-2100",
    name: "Ngô Quang An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "219 ngày",
  },
  {
    number: "HĐLĐ-2026-1111",
    code: "CB2026-2101",
    name: "Dương Quang An",
    unit: "Ban Giám hiệu",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "220 ngày",
  },
  {
    number: "HĐLĐ-2026-1112",
    code: "CB2026-2102",
    name: "Lý Quang An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "221 ngày",
  },
  {
    number: "HĐLĐ-2026-1113",
    code: "CB2026-2103",
    name: "Mai Quang An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "222 ngày",
  },
  {
    number: "HĐLĐ-2026-1114",
    code: "CB2026-2104",
    name: "Tạ Quang An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "223 ngày",
  },
  {
    number: "HĐLĐ-2026-1115",
    code: "CB2026-2105",
    name: "Cao Quang An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "224 ngày",
  },
  {
    number: "HĐLĐ-2026-1116",
    code: "CB2026-2106",
    name: "Đinh Quang An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "225 ngày",
  },
  {
    number: "HĐLĐ-2026-1117",
    code: "CB2026-2107",
    name: "Trịnh Quang An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "226 ngày",
  },
  {
    number: "HĐLĐ-2026-1118",
    code: "CB2026-2108",
    name: "Đoàn Quang An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2024",
    end: "28/12/2025",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1119",
    code: "CB2026-2109",
    name: "Lương Quang An",
    unit: "Khoa Công nghệ thông tin",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "228 ngày",
  },
  {
    number: "HĐLĐ-2026-1120",
    code: "CB2026-2110",
    name: "Tô Quang An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "229 ngày",
  },
  {
    number: "HĐLĐ-2026-1121",
    code: "CB2026-2111",
    name: "Nguyễn Thanh An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "230 ngày",
  },
  {
    number: "HĐLĐ-2026-1122",
    code: "CB2026-2112",
    name: "Trần Thanh An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "231 ngày",
  },
  {
    number: "HĐLĐ-2026-1123",
    code: "CB2026-2113",
    name: "Lê Thanh An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Không xác định thời hạn",
    start: "15/05/2024",
    end: "16/06/2026",
    status: "Chờ gia hạn",
    remaining: "5 ngày",
  },
  {
    number: "HĐLĐ-2026-1124",
    code: "CB2026-2114",
    name: "Phạm Thanh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "233 ngày",
  },
  {
    number: "HĐLĐ-2026-1125",
    code: "CB2026-2115",
    name: "Hoàng Thanh An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "234 ngày",
  },
  {
    number: "HĐLĐ-2026-1126",
    code: "CB2026-2116",
    name: "Huỳnh Thanh An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "235 ngày",
  },
  {
    number: "HĐLĐ-2026-1127",
    code: "CB2026-2117",
    name: "Phan Thanh An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Không xác định thời hạn",
    start: "01/09/2021",
    end: "28/09/2022",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1128",
    code: "CB2026-2118",
    name: "Vũ Thanh An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "237 ngày",
  },
  {
    number: "HĐLĐ-2026-1129",
    code: "CB2026-2119",
    name: "Võ Thanh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "238 ngày",
  },
  {
    number: "HĐLĐ-2026-1130",
    code: "CB2026-2120",
    name: "Đặng Thanh An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "239 ngày",
  },
  {
    number: "HĐLĐ-2026-1131",
    code: "CB2026-2121",
    name: "Bùi Thanh An",
    unit: "Ban Giám hiệu",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "240 ngày",
  },
  {
    number: "HĐLĐ-2026-1132",
    code: "CB2026-2122",
    name: "Đỗ Thanh An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "241 ngày",
  },
  {
    number: "HĐLĐ-2026-1133",
    code: "CB2026-2123",
    name: "Hồ Thanh An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "242 ngày",
  },
  {
    number: "HĐLĐ-2026-1134",
    code: "CB2026-2124",
    name: "Ngô Thanh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "243 ngày",
  },
  {
    number: "HĐLĐ-2026-1135",
    code: "CB2026-2125",
    name: "Dương Thanh An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "244 ngày",
  },
  {
    number: "HĐLĐ-2026-1136",
    code: "CB2026-2126",
    name: "Lý Thanh An",
    unit: "Ban Giám hiệu",
    type: "Hợp đồng thử việc",
    start: "01/06/2022",
    end: "28/06/2023",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1137",
    code: "CB2026-2127",
    name: "Mai Thanh An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "246 ngày",
  },
  {
    number: "HĐLĐ-2026-1138",
    code: "CB2026-2128",
    name: "Tạ Thanh An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "247 ngày",
  },
  {
    number: "HĐLĐ-2026-1139",
    code: "CB2026-2129",
    name: "Cao Thanh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "26/06/2026",
    status: "Sắp hết hạn",
    remaining: "13 ngày",
  },
  {
    number: "HĐLĐ-2026-1140",
    code: "CB2026-2130",
    name: "Đinh Thanh An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "249 ngày",
  },
  {
    number: "HĐLĐ-2026-1141",
    code: "CB2026-2131",
    name: "Trịnh Thanh An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "250 ngày",
  },
  {
    number: "HĐLĐ-2026-1142",
    code: "CB2026-2132",
    name: "Đoàn Thanh An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "251 ngày",
  },
  {
    number: "HĐLĐ-2026-1143",
    code: "CB2026-2133",
    name: "Lương Thanh An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "252 ngày",
  },
  {
    number: "HĐLĐ-2026-1144",
    code: "CB2026-2134",
    name: "Tô Thanh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "253 ngày",
  },
  {
    number: "HĐLĐ-2026-1145",
    code: "CB2026-2135",
    name: "Nguyễn Ngọc An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2023",
    end: "28/03/2024",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1146",
    code: "CB2026-2136",
    name: "Trần Ngọc An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "255 ngày",
  },
  {
    number: "HĐLĐ-2026-1147",
    code: "CB2026-2137",
    name: "Lê Ngọc An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "256 ngày",
  },
  {
    number: "HĐLĐ-2026-1148",
    code: "CB2026-2138",
    name: "Phạm Ngọc An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "257 ngày",
  },
  {
    number: "HĐLĐ-2026-1149",
    code: "CB2026-2139",
    name: "Hoàng Ngọc An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "258 ngày",
  },
  {
    number: "HĐLĐ-2026-1150",
    code: "CB2026-2140",
    name: "Huỳnh Ngọc An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "259 ngày",
  },
  {
    number: "HĐLĐ-2026-1151",
    code: "CB2026-2141",
    name: "Phan Ngọc An",
    unit: "Ban Giám hiệu",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "260 ngày",
  },
  {
    number: "HĐLĐ-2026-1152",
    code: "CB2026-2142",
    name: "Vũ Ngọc An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "261 ngày",
  },
  {
    number: "HĐLĐ-2026-1153",
    code: "CB2026-2143",
    name: "Võ Ngọc An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "262 ngày",
  },
  {
    number: "HĐLĐ-2026-1154",
    code: "CB2026-2144",
    name: "Đặng Ngọc An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2024",
    end: "28/12/2025",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1155",
    code: "CB2026-2145",
    name: "Bùi Ngọc An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "264 ngày",
  },
  {
    number: "HĐLĐ-2026-1156",
    code: "CB2026-2146",
    name: "Đỗ Ngọc An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "265 ngày",
  },
  {
    number: "HĐLĐ-2026-1157",
    code: "CB2026-2147",
    name: "Hồ Ngọc An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "266 ngày",
  },
  {
    number: "HĐLĐ-2026-1158",
    code: "CB2026-2148",
    name: "Ngô Ngọc An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "267 ngày",
  },
  {
    number: "HĐLĐ-2026-1159",
    code: "CB2026-2149",
    name: "Dương Ngọc An",
    unit: "Khoa Công nghệ thông tin",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "268 ngày",
  },
  {
    number: "HĐLĐ-2026-1160",
    code: "CB2026-2150",
    name: "Lý Ngọc An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "269 ngày",
  },
  {
    number: "HĐLĐ-2026-1161",
    code: "CB2026-2151",
    name: "Mai Ngọc An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "270 ngày",
  },
  {
    number: "HĐLĐ-2026-1162",
    code: "CB2026-2152",
    name: "Tạ Ngọc An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "271 ngày",
  },
  {
    number: "HĐLĐ-2026-1163",
    code: "CB2026-2153",
    name: "Cao Ngọc An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Không xác định thời hạn",
    start: "01/09/2021",
    end: "28/09/2022",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1164",
    code: "CB2026-2154",
    name: "Đinh Ngọc An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "273 ngày",
  },
  {
    number: "HĐLĐ-2026-1165",
    code: "CB2026-2155",
    name: "Trịnh Ngọc An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "274 ngày",
  },
  {
    number: "HĐLĐ-2026-1166",
    code: "CB2026-2156",
    name: "Đoàn Ngọc An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "275 ngày",
  },
  {
    number: "HĐLĐ-2026-1167",
    code: "CB2026-2157",
    name: "Lương Ngọc An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "276 ngày",
  },
  {
    number: "HĐLĐ-2026-1168",
    code: "CB2026-2158",
    name: "Tô Ngọc An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "277 ngày",
  },
  {
    number: "HĐLĐ-2026-1169",
    code: "CB2026-2159",
    name: "Nguyễn Đức An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "278 ngày",
  },
  {
    number: "HĐLĐ-2026-1170",
    code: "CB2026-2160",
    name: "Trần Đức An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "279 ngày",
  },
  {
    number: "HĐLĐ-2026-1171",
    code: "CB2026-2161",
    name: "Lê Đức An",
    unit: "Ban Giám hiệu",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "280 ngày",
  },
  {
    number: "HĐLĐ-2026-1172",
    code: "CB2026-2162",
    name: "Phạm Đức An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2022",
    end: "28/06/2023",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1173",
    code: "CB2026-2163",
    name: "Hoàng Đức An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "282 ngày",
  },
  {
    number: "HĐLĐ-2026-1174",
    code: "CB2026-2164",
    name: "Huỳnh Đức An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "283 ngày",
  },
  {
    number: "HĐLĐ-2026-1175",
    code: "CB2026-2165",
    name: "Phan Đức An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "284 ngày",
  },
  {
    number: "HĐLĐ-2026-1176",
    code: "CB2026-2166",
    name: "Vũ Đức An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "285 ngày",
  },
  {
    number: "HĐLĐ-2026-1177",
    code: "CB2026-2167",
    name: "Võ Đức An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/06/2026",
    status: "Sắp hết hạn",
    remaining: "27 ngày",
  },
  {
    number: "HĐLĐ-2026-1178",
    code: "CB2026-2168",
    name: "Đặng Đức An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "287 ngày",
  },
  {
    number: "HĐLĐ-2026-1179",
    code: "CB2026-2169",
    name: "Bùi Đức An",
    unit: "Khoa Công nghệ thông tin",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "288 ngày",
  },
  {
    number: "HĐLĐ-2026-1180",
    code: "CB2026-2170",
    name: "Đỗ Đức An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "289 ngày",
  },
  {
    number: "HĐLĐ-2026-1181",
    code: "CB2026-2171",
    name: "Hồ Đức An",
    unit: "Ban Giám hiệu",
    type: "Hợp đồng thử việc",
    start: "01/03/2023",
    end: "28/03/2024",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1182",
    code: "CB2026-2172",
    name: "Ngô Đức An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "291 ngày",
  },
  {
    number: "HĐLĐ-2026-1183",
    code: "CB2026-2173",
    name: "Dương Đức An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "292 ngày",
  },
  {
    number: "HĐLĐ-2026-1184",
    code: "CB2026-2174",
    name: "Lý Đức An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "293 ngày",
  },
  {
    number: "HĐLĐ-2026-1185",
    code: "CB2026-2175",
    name: "Mai Đức An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "294 ngày",
  },
  {
    number: "HĐLĐ-2026-1186",
    code: "CB2026-2176",
    name: "Tạ Đức An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "295 ngày",
  },
  {
    number: "HĐLĐ-2026-1187",
    code: "CB2026-2177",
    name: "Cao Đức An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "296 ngày",
  },
  {
    number: "HĐLĐ-2026-1188",
    code: "CB2026-2178",
    name: "Đinh Đức An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "297 ngày",
  },
  {
    number: "HĐLĐ-2026-1189",
    code: "CB2026-2179",
    name: "Trịnh Đức An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "298 ngày",
  },
  {
    number: "HĐLĐ-2026-1190",
    code: "CB2026-2180",
    name: "Đoàn Đức An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2024",
    end: "28/12/2025",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1191",
    code: "CB2026-2181",
    name: "Lương Đức An",
    unit: "Ban Giám hiệu",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "300 ngày",
  },
  {
    number: "HĐLĐ-2026-1192",
    code: "CB2026-2182",
    name: "Tô Đức An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "301 ngày",
  },
  {
    number: "HĐLĐ-2026-1193",
    code: "CB2026-2183",
    name: "Nguyễn Anh An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "302 ngày",
  },
  {
    number: "HĐLĐ-2026-1194",
    code: "CB2026-2184",
    name: "Trần Anh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "303 ngày",
  },
  {
    number: "HĐLĐ-2026-1195",
    code: "CB2026-2185",
    name: "Lê Anh An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "304 ngày",
  },
  {
    number: "HĐLĐ-2026-1196",
    code: "CB2026-2186",
    name: "Phạm Anh An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "305 ngày",
  },
  {
    number: "HĐLĐ-2026-1197",
    code: "CB2026-2187",
    name: "Hoàng Anh An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "306 ngày",
  },
  {
    number: "HĐLĐ-2026-1198",
    code: "CB2026-2188",
    name: "Huỳnh Anh An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "307 ngày",
  },
  {
    number: "HĐLĐ-2026-1199",
    code: "CB2026-2189",
    name: "Phan Anh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Không xác định thời hạn",
    start: "01/09/2021",
    end: "28/09/2022",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1200",
    code: "CB2026-2190",
    name: "Vũ Anh An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "309 ngày",
  },
  {
    number: "HĐLĐ-2026-1201",
    code: "CB2026-2191",
    name: "Võ Anh An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "310 ngày",
  },
  {
    number: "HĐLĐ-2026-1202",
    code: "CB2026-2192",
    name: "Đặng Anh An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "311 ngày",
  },
  {
    number: "HĐLĐ-2026-1203",
    code: "CB2026-2193",
    name: "Bùi Anh An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "312 ngày",
  },
  {
    number: "HĐLĐ-2026-1204",
    code: "CB2026-2194",
    name: "Đỗ Anh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "313 ngày",
  },
  {
    number: "HĐLĐ-2026-1205",
    code: "CB2026-2195",
    name: "Hồ Anh An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "314 ngày",
  },
  {
    number: "HĐLĐ-2026-1206",
    code: "CB2026-2196",
    name: "Ngô Anh An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "315 ngày",
  },
  {
    number: "HĐLĐ-2026-1207",
    code: "CB2026-2197",
    name: "Dương Anh An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "316 ngày",
  },
  {
    number: "HĐLĐ-2026-1208",
    code: "CB2026-2198",
    name: "Lý Anh An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2022",
    end: "28/06/2023",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1209",
    code: "CB2026-2199",
    name: "Mai Anh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "318 ngày",
  },
  {
    number: "HĐLĐ-2026-1210",
    code: "CB2026-2200",
    name: "Tạ Anh An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "319 ngày",
  },
  {
    number: "HĐLĐ-2026-1211",
    code: "CB2026-2201",
    name: "Cao Anh An",
    unit: "Ban Giám hiệu",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "320 ngày",
  },
  {
    number: "HĐLĐ-2026-1212",
    code: "CB2026-2202",
    name: "Đinh Anh An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "321 ngày",
  },
  {
    number: "HĐLĐ-2026-1213",
    code: "CB2026-2203",
    name: "Trịnh Anh An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "322 ngày",
  },
  {
    number: "HĐLĐ-2026-1214",
    code: "CB2026-2204",
    name: "Đoàn Anh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2024",
    end: "29/06/2026",
    status: "Sắp hết hạn",
    remaining: "16 ngày",
  },
  {
    number: "HĐLĐ-2026-1215",
    code: "CB2026-2205",
    name: "Lương Anh An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "324 ngày",
  },
  {
    number: "HĐLĐ-2026-1216",
    code: "CB2026-2206",
    name: "Tô Anh An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "325 ngày",
  },
  {
    number: "HĐLĐ-2026-1217",
    code: "CB2026-2207",
    name: "Nguyễn Thu An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2023",
    end: "28/03/2024",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1218",
    code: "CB2026-2208",
    name: "Trần Thu An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "327 ngày",
  },
  {
    number: "HĐLĐ-2026-1219",
    code: "CB2026-2209",
    name: "Lê Thu An",
    unit: "Khoa Công nghệ thông tin",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "328 ngày",
  },
  {
    number: "HĐLĐ-2026-1220",
    code: "CB2026-2210",
    name: "Phạm Thu An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "329 ngày",
  },
  {
    number: "HĐLĐ-2026-1221",
    code: "CB2026-2211",
    name: "Hoàng Thu An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "330 ngày",
  },
  {
    number: "HĐLĐ-2026-1222",
    code: "CB2026-2212",
    name: "Huỳnh Thu An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "331 ngày",
  },
  {
    number: "HĐLĐ-2026-1223",
    code: "CB2026-2213",
    name: "Phan Thu An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "332 ngày",
  },
  {
    number: "HĐLĐ-2026-1224",
    code: "CB2026-2214",
    name: "Vũ Thu An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "333 ngày",
  },
  {
    number: "HĐLĐ-2026-1225",
    code: "CB2026-2215",
    name: "Võ Thu An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "334 ngày",
  },
  {
    number: "HĐLĐ-2026-1226",
    code: "CB2026-2216",
    name: "Đặng Thu An",
    unit: "Ban Giám hiệu",
    type: "Hợp đồng thử việc",
    start: "01/12/2024",
    end: "28/12/2025",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1227",
    code: "CB2026-2217",
    name: "Bùi Thu An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "336 ngày",
  },
  {
    number: "HĐLĐ-2026-1228",
    code: "CB2026-2218",
    name: "Đỗ Thu An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "337 ngày",
  },
  {
    number: "HĐLĐ-2026-1229",
    code: "CB2026-2219",
    name: "Hồ Thu An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "338 ngày",
  },
  {
    number: "HĐLĐ-2026-1230",
    code: "CB2026-2220",
    name: "Ngô Thu An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "15/04/2024",
    end: "23/06/2026",
    status: "Chờ gia hạn",
    remaining: "4 ngày",
  },
  {
    number: "HĐLĐ-2026-1231",
    code: "CB2026-2221",
    name: "Dương Thu An",
    unit: "Ban Giám hiệu",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "340 ngày",
  },
  {
    number: "HĐLĐ-2026-1232",
    code: "CB2026-2222",
    name: "Lý Thu An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "341 ngày",
  },
  {
    number: "HĐLĐ-2026-1233",
    code: "CB2026-2223",
    name: "Mai Thu An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "342 ngày",
  },
  {
    number: "HĐLĐ-2026-1234",
    code: "CB2026-2224",
    name: "Tạ Thu An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "343 ngày",
  },
  {
    number: "HĐLĐ-2026-1235",
    code: "CB2026-2225",
    name: "Cao Thu An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/09/2021",
    end: "28/09/2022",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1236",
    code: "CB2026-2226",
    name: "Đinh Thu An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "345 ngày",
  },
  {
    number: "HĐLĐ-2026-1237",
    code: "CB2026-2227",
    name: "Trịnh Thu An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "346 ngày",
  },
  {
    number: "HĐLĐ-2026-1238",
    code: "CB2026-2228",
    name: "Đoàn Thu An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "347 ngày",
  },
  {
    number: "HĐLĐ-2026-1239",
    code: "CB2026-2229",
    name: "Lương Thu An",
    unit: "Khoa Công nghệ thông tin",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "348 ngày",
  },
  {
    number: "HĐLĐ-2026-1240",
    code: "CB2026-2230",
    name: "Tô Thu An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "349 ngày",
  },
  {
    number: "HĐLĐ-2026-1241",
    code: "CB2026-2231",
    name: "Nguyễn Gia An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "350 ngày",
  },
  {
    number: "HĐLĐ-2026-1242",
    code: "CB2026-2232",
    name: "Trần Gia An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "351 ngày",
  },
  {
    number: "HĐLĐ-2026-1243",
    code: "CB2026-2233",
    name: "Lê Gia An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "352 ngày",
  },
  {
    number: "HĐLĐ-2026-1244",
    code: "CB2026-2234",
    name: "Phạm Gia An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2022",
    end: "28/06/2023",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1245",
    code: "CB2026-2235",
    name: "Hoàng Gia An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "354 ngày",
  },
  {
    number: "HĐLĐ-2026-1246",
    code: "CB2026-2236",
    name: "Huỳnh Gia An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "355 ngày",
  },
  {
    number: "HĐLĐ-2026-1247",
    code: "CB2026-2237",
    name: "Phan Gia An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "356 ngày",
  },
  {
    number: "HĐLĐ-2026-1248",
    code: "CB2026-2238",
    name: "Vũ Gia An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "357 ngày",
  },
  {
    number: "HĐLĐ-2026-1249",
    code: "CB2026-2239",
    name: "Võ Gia An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "358 ngày",
  },
  {
    number: "HĐLĐ-2026-1250",
    code: "CB2026-2240",
    name: "Đặng Gia An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "359 ngày",
  },
  {
    number: "HĐLĐ-2026-1251",
    code: "CB2026-2241",
    name: "Bùi Gia An",
    unit: "Ban Giám hiệu",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "360 ngày",
  },
  {
    number: "HĐLĐ-2026-1252",
    code: "CB2026-2242",
    name: "Đỗ Gia An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2024",
    end: "19/06/2026",
    status: "Sắp hết hạn",
    remaining: "6 ngày",
  },
  {
    number: "HĐLĐ-2026-1253",
    code: "CB2026-2243",
    name: "Hồ Gia An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2023",
    end: "28/03/2024",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1254",
    code: "CB2026-2244",
    name: "Ngô Gia An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "363 ngày",
  },
  {
    number: "HĐLĐ-2026-1255",
    code: "CB2026-2245",
    name: "Dương Gia An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "364 ngày",
  },
  {
    number: "HĐLĐ-2026-1256",
    code: "CB2026-2246",
    name: "Lý Gia An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "365 ngày",
  },
  {
    number: "HĐLĐ-2026-1257",
    code: "CB2026-2247",
    name: "Mai Gia An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "366 ngày",
  },
  {
    number: "HĐLĐ-2026-1258",
    code: "CB2026-2248",
    name: "Tạ Gia An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "367 ngày",
  },
  {
    number: "HĐLĐ-2026-1259",
    code: "CB2026-2249",
    name: "Cao Gia An",
    unit: "Khoa Công nghệ thông tin",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "368 ngày",
  },
  {
    number: "HĐLĐ-2026-1260",
    code: "CB2026-2250",
    name: "Đinh Gia An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "369 ngày",
  },
  {
    number: "HĐLĐ-2026-1261",
    code: "CB2026-2251",
    name: "Trịnh Gia An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "370 ngày",
  },
  {
    number: "HĐLĐ-2026-1262",
    code: "CB2026-2252",
    name: "Đoàn Gia An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2024",
    end: "28/12/2025",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1263",
    code: "CB2026-2253",
    name: "Lương Gia An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "372 ngày",
  },
  {
    number: "HĐLĐ-2026-1264",
    code: "CB2026-2254",
    name: "Tô Gia An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "373 ngày",
  },
  {
    number: "HĐLĐ-2026-1265",
    code: "CB2026-2255",
    name: "Nguyễn Hoài An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "374 ngày",
  },
  {
    number: "HĐLĐ-2026-1266",
    code: "CB2026-2256",
    name: "Trần Hoài An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "375 ngày",
  },
  {
    number: "HĐLĐ-2026-1267",
    code: "CB2026-2257",
    name: "Lê Hoài An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "376 ngày",
  },
  {
    number: "HĐLĐ-2026-1268",
    code: "CB2026-2258",
    name: "Phạm Hoài An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "377 ngày",
  },
  {
    number: "HĐLĐ-2026-1269",
    code: "CB2026-2259",
    name: "Hoàng Hoài An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "378 ngày",
  },
  {
    number: "HĐLĐ-2026-1270",
    code: "CB2026-2260",
    name: "Huỳnh Hoài An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "379 ngày",
  },
  {
    number: "HĐLĐ-2026-1271",
    code: "CB2026-2261",
    name: "Phan Hoài An",
    unit: "Ban Giám hiệu",
    type: "Hợp đồng thử việc",
    start: "01/09/2021",
    end: "28/09/2022",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1272",
    code: "CB2026-2262",
    name: "Vũ Hoài An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "381 ngày",
  },
  {
    number: "HĐLĐ-2026-1273",
    code: "CB2026-2263",
    name: "Võ Hoài An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "382 ngày",
  },
  {
    number: "HĐLĐ-2026-1274",
    code: "CB2026-2264",
    name: "Đặng Hoài An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "383 ngày",
  },
  {
    number: "HĐLĐ-2026-1275",
    code: "CB2026-2265",
    name: "Bùi Hoài An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "384 ngày",
  },
  {
    number: "HĐLĐ-2026-1276",
    code: "CB2026-2266",
    name: "Đỗ Hoài An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "385 ngày",
  },
  {
    number: "HĐLĐ-2026-1277",
    code: "CB2026-2267",
    name: "Hồ Hoài An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "386 ngày",
  },
  {
    number: "HĐLĐ-2026-1278",
    code: "CB2026-2268",
    name: "Ngô Hoài An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "387 ngày",
  },
  {
    number: "HĐLĐ-2026-1279",
    code: "CB2026-2269",
    name: "Dương Hoài An",
    unit: "Khoa Công nghệ thông tin",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "388 ngày",
  },
  {
    number: "HĐLĐ-2026-1280",
    code: "CB2026-2270",
    name: "Lý Hoài An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2022",
    end: "28/06/2023",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1281",
    code: "CB2026-2271",
    name: "Mai Hoài An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "390 ngày",
  },
  {
    number: "HĐLĐ-2026-1282",
    code: "CB2026-2272",
    name: "Tạ Hoài An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "391 ngày",
  },
  {
    number: "HĐLĐ-2026-1283",
    code: "CB2026-2273",
    name: "Cao Hoài An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "392 ngày",
  },
  {
    number: "HĐLĐ-2026-1284",
    code: "CB2026-2274",
    name: "Đinh Hoài An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "393 ngày",
  },
  {
    number: "HĐLĐ-2026-1285",
    code: "CB2026-2275",
    name: "Trịnh Hoài An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "394 ngày",
  },
  {
    number: "HĐLĐ-2026-1286",
    code: "CB2026-2276",
    name: "Đoàn Hoài An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "395 ngày",
  },
  {
    number: "HĐLĐ-2026-1287",
    code: "CB2026-2277",
    name: "Lương Hoài An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "396 ngày",
  },
  {
    number: "HĐLĐ-2026-1288",
    code: "CB2026-2278",
    name: "Tô Hoài An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "397 ngày",
  },
  {
    number: "HĐLĐ-2026-1289",
    code: "CB2026-2279",
    name: "Nguyễn Khánh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2023",
    end: "28/03/2024",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1290",
    code: "CB2026-2280",
    name: "Trần Khánh An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2024",
    end: "21/06/2026",
    status: "Sắp hết hạn",
    remaining: "20 ngày",
  },
  {
    number: "HĐLĐ-2026-1291",
    code: "CB2026-2281",
    name: "Lê Khánh An",
    unit: "Ban Giám hiệu",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "400 ngày",
  },
  {
    number: "HĐLĐ-2026-1292",
    code: "CB2026-2282",
    name: "Phạm Khánh An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "401 ngày",
  },
  {
    number: "HĐLĐ-2026-1293",
    code: "CB2026-2283",
    name: "Hoàng Khánh An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "402 ngày",
  },
  {
    number: "HĐLĐ-2026-1294",
    code: "CB2026-2284",
    name: "Huỳnh Khánh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "403 ngày",
  },
  {
    number: "HĐLĐ-2026-1295",
    code: "CB2026-2285",
    name: "Phan Khánh An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "404 ngày",
  },
  {
    number: "HĐLĐ-2026-1296",
    code: "CB2026-2286",
    name: "Vũ Khánh An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "405 ngày",
  },
  {
    number: "HĐLĐ-2026-1297",
    code: "CB2026-2287",
    name: "Võ Khánh An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "406 ngày",
  },
  {
    number: "HĐLĐ-2026-1298",
    code: "CB2026-2288",
    name: "Đặng Khánh An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2024",
    end: "28/12/2025",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1299",
    code: "CB2026-2289",
    name: "Bùi Khánh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "408 ngày",
  },
  {
    number: "HĐLĐ-2026-1300",
    code: "CB2026-2290",
    name: "Đỗ Khánh An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "409 ngày",
  },
  {
    number: "HĐLĐ-2026-1301",
    code: "CB2026-2291",
    name: "Hồ Khánh An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "410 ngày",
  },
  {
    number: "HĐLĐ-2026-1302",
    code: "CB2026-2292",
    name: "Ngô Khánh An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "411 ngày",
  },
  {
    number: "HĐLĐ-2026-1303",
    code: "CB2026-2293",
    name: "Dương Khánh An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "412 ngày",
  },
  {
    number: "HĐLĐ-2026-1304",
    code: "CB2026-2294",
    name: "Lý Khánh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "413 ngày",
  },
  {
    number: "HĐLĐ-2026-1305",
    code: "CB2026-2295",
    name: "Mai Khánh An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "414 ngày",
  },
  {
    number: "HĐLĐ-2026-1306",
    code: "CB2026-2296",
    name: "Tạ Khánh An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "415 ngày",
  },
  {
    number: "HĐLĐ-2026-1307",
    code: "CB2026-2297",
    name: "Cao Khánh An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Không xác định thời hạn",
    start: "01/09/2021",
    end: "28/09/2022",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1308",
    code: "CB2026-2298",
    name: "Đinh Khánh An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "417 ngày",
  },
  {
    number: "HĐLĐ-2026-1309",
    code: "CB2026-2299",
    name: "Trịnh Khánh An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "418 ngày",
  },
  {
    number: "HĐLĐ-2026-1310",
    code: "CB2026-2300",
    name: "Đoàn Khánh An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "419 ngày",
  },
  {
    number: "HĐLĐ-2026-1311",
    code: "CB2026-2301",
    name: "Lương Khánh An",
    unit: "Ban Giám hiệu",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "420 ngày",
  },
  {
    number: "HĐLĐ-2026-1312",
    code: "CB2026-2302",
    name: "Tô Khánh An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "421 ngày",
  },
  {
    number: "HĐLĐ-2026-1313",
    code: "CB2026-2303",
    name: "Nguyễn Nhật An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "15/03/2024",
    end: "16/06/2026",
    status: "Chờ gia hạn",
    remaining: "15 ngày",
  },
  {
    number: "HĐLĐ-2026-1314",
    code: "CB2026-2304",
    name: "Trần Nhật An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "423 ngày",
  },
  {
    number: "HĐLĐ-2026-1315",
    code: "CB2026-2305",
    name: "Lê Nhật An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "424 ngày",
  },
  {
    number: "HĐLĐ-2026-1316",
    code: "CB2026-2306",
    name: "Phạm Nhật An",
    unit: "Ban Giám hiệu",
    type: "Hợp đồng thử việc",
    start: "01/06/2022",
    end: "28/06/2023",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1317",
    code: "CB2026-2307",
    name: "Hoàng Nhật An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "426 ngày",
  },
  {
    number: "HĐLĐ-2026-1318",
    code: "CB2026-2308",
    name: "Huỳnh Nhật An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "427 ngày",
  },
  {
    number: "HĐLĐ-2026-1319",
    code: "CB2026-2309",
    name: "Phan Nhật An",
    unit: "Khoa Công nghệ thông tin",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "428 ngày",
  },
  {
    number: "HĐLĐ-2026-1320",
    code: "CB2026-2310",
    name: "Vũ Nhật An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "429 ngày",
  },
  {
    number: "HĐLĐ-2026-1321",
    code: "CB2026-2311",
    name: "Võ Nhật An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "430 ngày",
  },
  {
    number: "HĐLĐ-2026-1322",
    code: "CB2026-2312",
    name: "Đặng Nhật An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "431 ngày",
  },
  {
    number: "HĐLĐ-2026-1323",
    code: "CB2026-2313",
    name: "Bùi Nhật An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "432 ngày",
  },
  {
    number: "HĐLĐ-2026-1324",
    code: "CB2026-2314",
    name: "Đỗ Nhật An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "433 ngày",
  },
  {
    number: "HĐLĐ-2026-1325",
    code: "CB2026-2315",
    name: "Hồ Nhật An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2023",
    end: "28/03/2024",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1326",
    code: "CB2026-2316",
    name: "Ngô Nhật An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "435 ngày",
  },
  {
    number: "HĐLĐ-2026-1327",
    code: "CB2026-2317",
    name: "Dương Nhật An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "436 ngày",
  },
  {
    number: "HĐLĐ-2026-1328",
    code: "CB2026-2318",
    name: "Lý Nhật An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "437 ngày",
  },
  {
    number: "HĐLĐ-2026-1329",
    code: "CB2026-2319",
    name: "Mai Nhật An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "438 ngày",
  },
  {
    number: "HĐLĐ-2026-1330",
    code: "CB2026-2320",
    name: "Tạ Nhật An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "439 ngày",
  },
  {
    number: "HĐLĐ-2026-1331",
    code: "CB2026-2321",
    name: "Cao Nhật An",
    unit: "Ban Giám hiệu",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "440 ngày",
  },
  {
    number: "HĐLĐ-2026-1332",
    code: "CB2026-2322",
    name: "Đinh Nhật An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2024",
    end: "27/06/2026",
    status: "Sắp hết hạn",
    remaining: "14 ngày",
  },
  {
    number: "HĐLĐ-2026-1333",
    code: "CB2026-2323",
    name: "Trịnh Nhật An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "442 ngày",
  },
  {
    number: "HĐLĐ-2026-1334",
    code: "CB2026-2324",
    name: "Đoàn Nhật An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2024",
    end: "28/12/2025",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1335",
    code: "CB2026-2325",
    name: "Lương Nhật An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "444 ngày",
  },
  {
    number: "HĐLĐ-2026-1336",
    code: "CB2026-2326",
    name: "Tô Nhật An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "445 ngày",
  },
  {
    number: "HĐLĐ-2026-1337",
    code: "CB2026-2327",
    name: "Nguyễn Bảo An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "446 ngày",
  },
  {
    number: "HĐLĐ-2026-1338",
    code: "CB2026-2328",
    name: "Trần Bảo An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "447 ngày",
  },
  {
    number: "HĐLĐ-2026-1339",
    code: "CB2026-2329",
    name: "Lê Bảo An",
    unit: "Khoa Công nghệ thông tin",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "448 ngày",
  },
  {
    number: "HĐLĐ-2026-1340",
    code: "CB2026-2330",
    name: "Phạm Bảo An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "449 ngày",
  },
  {
    number: "HĐLĐ-2026-1341",
    code: "CB2026-2331",
    name: "Hoàng Bảo An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "450 ngày",
  },
  {
    number: "HĐLĐ-2026-1342",
    code: "CB2026-2332",
    name: "Huỳnh Bảo An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "451 ngày",
  },
  {
    number: "HĐLĐ-2026-1343",
    code: "CB2026-2333",
    name: "Phan Bảo An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Không xác định thời hạn",
    start: "01/09/2021",
    end: "28/09/2022",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2026-1344",
    code: "CB2026-2334",
    name: "Vũ Bảo An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "453 ngày",
  },
  {
    number: "HĐLĐ-2025-4345",
    code: "CB2026-2335",
    name: "Võ Bảo An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "454 ngày",
  },
  {
    number: "HĐLĐ-2025-4346",
    code: "CB2026-2336",
    name: "Đặng Bảo An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "455 ngày",
  },
  {
    number: "HĐLĐ-2025-4347",
    code: "CB2026-2337",
    name: "Bùi Bảo An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "456 ngày",
  },
  {
    number: "HĐLĐ-2025-4348",
    code: "CB2026-2338",
    name: "Đỗ Bảo An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "457 ngày",
  },
  {
    number: "HĐLĐ-2025-4349",
    code: "CB2026-2339",
    name: "Hồ Bảo An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "458 ngày",
  },
  {
    number: "HĐLĐ-2023-5350",
    code: "CB2026-2340",
    name: "Ngô Bảo An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "459 ngày",
  },
  {
    number: "HĐLĐ-2023-5351",
    code: "CB2026-2341",
    name: "Dương Bảo An",
    unit: "Ban Giám hiệu",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "460 ngày",
  },
  {
    number: "HĐLĐ-2023-5352",
    code: "CB2026-2342",
    name: "Lý Bảo An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2022",
    end: "28/06/2023",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2023-5353",
    code: "CB2026-2343",
    name: "Mai Bảo An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "462 ngày",
  },
  {
    number: "HĐLĐ-2023-5354",
    code: "CB2026-2344",
    name: "Tạ Bảo An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "463 ngày",
  },
  {
    number: "HĐLĐ-2023-5355",
    code: "CB2026-2345",
    name: "Cao Bảo An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "464 ngày",
  },
  {
    number: "HĐLĐ-2023-5356",
    code: "CB2026-2346",
    name: "Đinh Bảo An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "465 ngày",
  },
  {
    number: "HĐLĐ-2023-5357",
    code: "CB2026-2347",
    name: "Trịnh Bảo An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "466 ngày",
  },
  {
    number: "HĐLĐ-2023-5358",
    code: "CB2026-2348",
    name: "Đoàn Bảo An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "467 ngày",
  },
  {
    number: "HĐLĐ-2023-5359",
    code: "CB2026-2349",
    name: "Lương Bảo An",
    unit: "Khoa Công nghệ thông tin",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "468 ngày",
  },
  {
    number: "HĐLĐ-2023-5360",
    code: "CB2026-2350",
    name: "Tô Bảo An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "469 ngày",
  },
  {
    number: "HĐLĐ-2023-5361",
    code: "CB2026-2351",
    name: "Nguyễn Kim An",
    unit: "Ban Giám hiệu",
    type: "Hợp đồng thử việc",
    start: "01/03/2023",
    end: "28/03/2024",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2023-5362",
    code: "CB2026-2352",
    name: "Trần Kim An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "471 ngày",
  },
  {
    number: "HĐLĐ-2023-5363",
    code: "CB2026-2353",
    name: "Lê Kim An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "472 ngày",
  },
  {
    number: "HĐLĐ-2023-5364",
    code: "CB2026-2354",
    name: "Phạm Kim An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "473 ngày",
  },
  {
    number: "HĐLĐ-2023-5365",
    code: "CB2026-2355",
    name: "Hoàng Kim An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "474 ngày",
  },
  {
    number: "HĐLĐ-2023-5366",
    code: "CB2026-2356",
    name: "Huỳnh Kim An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "475 ngày",
  },
  {
    number: "HĐLĐ-2023-5367",
    code: "CB2026-2357",
    name: "Phan Kim An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "476 ngày",
  },
  {
    number: "HĐLĐ-2023-5368",
    code: "CB2026-2358",
    name: "Vũ Kim An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "477 ngày",
  },
  {
    number: "HĐLĐ-2023-5369",
    code: "CB2026-2359",
    name: "Võ Kim An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "478 ngày",
  },
  {
    number: "HĐLĐ-2023-5370",
    code: "CB2026-2360",
    name: "Đặng Kim An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2024",
    end: "28/12/2025",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2023-5371",
    code: "CB2026-2361",
    name: "Bùi Kim An",
    unit: "Ban Giám hiệu",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "18/06/2026",
    status: "Sắp hết hạn",
    remaining: "5 ngày",
  },
  {
    number: "HĐLĐ-2023-5372",
    code: "CB2026-2362",
    name: "Đỗ Kim An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "481 ngày",
  },
  {
    number: "HĐLĐ-2023-5373",
    code: "CB2026-2363",
    name: "Hồ Kim An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "482 ngày",
  },
  {
    number: "HĐLĐ-2023-5374",
    code: "CB2026-2364",
    name: "Ngô Kim An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "483 ngày",
  },
  {
    number: "HĐLĐ-2023-5375",
    code: "CB2026-2365",
    name: "Dương Kim An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Không xác định thời hạn",
    start: "01/05/2024",
    end: "28/05/2026",
    status: "Còn hiệu lực",
    remaining: "484 ngày",
  },
  {
    number: "HĐLĐ-2023-5376",
    code: "CB2026-2366",
    name: "Lý Kim An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2025",
    end: "28/06/2027",
    status: "Còn hiệu lực",
    remaining: "485 ngày",
  },
  {
    number: "HĐLĐ-2023-5377",
    code: "CB2026-2367",
    name: "Mai Kim An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "486 ngày",
  },
  {
    number: "HĐLĐ-2023-5378",
    code: "CB2026-2368",
    name: "Tạ Kim An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "487 ngày",
  },
  {
    number: "HĐLĐ-2023-5379",
    code: "CB2026-2369",
    name: "Cao Kim An",
    unit: "Khoa Công nghệ thông tin",
    type: "Không xác định thời hạn",
    start: "01/09/2021",
    end: "28/09/2022",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2023-5380",
    code: "CB2026-2370",
    name: "Đinh Kim An",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2025",
    end: "28/10/2027",
    status: "Còn hiệu lực",
    remaining: "489 ngày",
  },
  {
    number: "HĐLĐ-2023-5381",
    code: "CB2026-2371",
    name: "Trịnh Kim An",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 24 tháng",
    start: "01/11/2024",
    end: "28/11/2026",
    status: "Còn hiệu lực",
    remaining: "490 ngày",
  },
  {
    number: "HĐLĐ-2023-5382",
    code: "CB2026-2372",
    name: "Đoàn Kim An",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 36 tháng",
    start: "01/12/2025",
    end: "28/12/2027",
    status: "Còn hiệu lực",
    remaining: "491 ngày",
  },
  {
    number: "HĐLĐ-2023-5383",
    code: "CB2026-2373",
    name: "Lương Kim An",
    unit: "Phòng Tài chính - Kế toán",
    type: "Không xác định thời hạn",
    start: "01/01/2024",
    end: "28/01/2026",
    status: "Còn hiệu lực",
    remaining: "492 ngày",
  },
  {
    number: "HĐLĐ-2023-5384",
    code: "CB2026-2374",
    name: "Tô Kim An",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 24 tháng",
    start: "01/02/2025",
    end: "28/02/2027",
    status: "Còn hiệu lực",
    remaining: "493 ngày",
  },
  {
    number: "HĐLĐ-2023-5385",
    code: "CB2026-2375",
    name: "Nguyễn Văn Bình",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 36 tháng",
    start: "01/03/2024",
    end: "28/03/2026",
    status: "Còn hiệu lực",
    remaining: "494 ngày",
  },
  {
    number: "HĐLĐ-2023-5386",
    code: "CB2026-2376",
    name: "Trần Văn Bình",
    unit: "Ban Giám hiệu",
    type: "Xác định thời hạn 12 tháng",
    start: "01/04/2025",
    end: "28/04/2027",
    status: "Còn hiệu lực",
    remaining: "495 ngày",
  },
  {
    number: "HĐLĐ-2023-5387",
    code: "CB2026-2377",
    name: "Lê Văn Bình",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Không xác định thời hạn",
    start: "15/05/2024",
    end: "20/06/2026",
    status: "Chờ gia hạn",
    remaining: "17 ngày",
  },
  {
    number: "HĐLĐ-2023-5388",
    code: "CB2026-2378",
    name: "Phạm Văn Bình",
    unit: "Phòng Tài chính - Kế toán",
    type: "Xác định thời hạn 36 tháng",
    start: "01/06/2022",
    end: "28/06/2023",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
  },
  {
    number: "HĐLĐ-2023-5389",
    code: "CB2026-2379",
    name: "Hoàng Văn Bình",
    unit: "Khoa Công nghệ thông tin",
    type: "Xác định thời hạn 12 tháng",
    start: "01/07/2024",
    end: "28/07/2026",
    status: "Còn hiệu lực",
    remaining: "498 ngày",
  },
  {
    number: "HĐLĐ-2023-5390",
    code: "CB2026-2380",
    name: "Huỳnh Văn Bình",
    unit: "Khoa Kinh tế và Quản lý",
    type: "Xác định thời hạn 24 tháng",
    start: "01/08/2025",
    end: "28/08/2027",
    status: "Còn hiệu lực",
    remaining: "499 ngày",
  },
  {
    number: "HĐLĐ-2023-5391",
    code: "CB2026-2381",
    name: "Phan Văn Bình",
    unit: "Ban Giám hiệu",
    type: "Không xác định thời hạn",
    start: "01/09/2024",
    end: "28/09/2026",
    status: "Còn hiệu lực",
    remaining: "500 ngày",
  },
  {
    number: "HĐLĐ-2023-5392",
    code: "CB2026-2382",
    name: "Vũ Văn Bình",
    unit: "Phòng Tổ chức - Cán bộ",
    type: "Xác định thời hạn 12 tháng",
    start: "01/10/2022",
    end: "28/10/2023",
    status: "Hết hiệu lực",
    remaining: "Quá hạn",
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
  { label: "Ban Giám hiệu", description: "Khối điều hành" },
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

function ContractExpiryDateFilter({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const selectedDate = parseContractDate(value);
  const [open, setOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => selectedDate ?? new Date(2026, 5, 1));
  const rootRef = useRef<HTMLDivElement>(null);
  const hasSelectedValue = value.trim().length > 0;
  const monthStart = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
  const calendarStartOffset = (monthStart.getDay() + 6) % 7;
  const calendarStart = new Date(monthStart.getFullYear(), monthStart.getMonth(), 1 - calendarStartOffset);
  const calendarDays = Array.from({ length: 42 }, (_, index) => new Date(calendarStart.getFullYear(), calendarStart.getMonth(), calendarStart.getDate() + index));
  const today = new Date();
  const expiryDates = useMemo(() => new Set(contractRows.map((row) => row.end)), []);

  useEffect(() => {
    const parsedDate = parseContractDate(value);
    if (parsedDate) {
      setVisibleMonth(new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1));
    }
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

  const shiftMonth = (offset: number) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  };

  return (
    <div ref={rootRef} className={`relative ${open ? "z-50" : "z-0"} w-[165px] shrink-0`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`flex min-h-9 w-full items-center justify-between gap-2 border bg-white px-3 py-2 text-left text-[12px] shadow-sm ${
          hasSelectedValue
            ? "rounded-2xl border-[#8EC5FF] font-semibold text-[#1447E6]"
            : "rounded-lg border-slate-300 text-slate-700"
        } ${open ? "border-blue-300 ring-4 ring-blue-100" : ""}`}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2">
          <Calendar size={14} className={hasSelectedValue ? "shrink-0 text-[#1447E6]" : "shrink-0 text-slate-400"} />
          <span className={`truncate ${hasSelectedValue ? "" : "text-slate-400"}`}>{value || "Ngày hết hạn"}</span>
        </span>
        <ChevronDown size={14} className={`shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div className="absolute left-0 top-[42px] z-50 w-[286px] rounded-xl border border-slate-200 bg-white p-3 text-left shadow-xl ring-1 ring-slate-100">
          <div className="mb-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-blue-700"
              aria-label="Tháng trước"
            >
              <ArrowLeft size={14} />
            </button>
            <div>
              <div className="text-center text-[11px] font-bold uppercase tracking-wide text-slate-500">Chọn ngày hết hạn</div>
              <div className="mt-0.5 text-center text-[13px] font-semibold capitalize text-slate-900">
                {visibleMonth.toLocaleDateString("vi-VN", { month: "long", year: "numeric" })}
              </div>
            </div>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-blue-700"
              aria-label="Tháng sau"
            >
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase text-slate-400">
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((weekday) => (
              <span key={weekday} className="py-1">{weekday}</span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {calendarDays.map((day) => {
              const formattedDay = formatContractDate(day);
              const isCurrentMonth = day.getMonth() === visibleMonth.getMonth();
              const isSelected = isSameCalendarDate(selectedDate, day);
              const isToday = isSameCalendarDate(today, day);
              const hasExpiry = expiryDates.has(formattedDay);

              return (
                <button
                  key={formattedDay}
                  type="button"
                  onClick={() => {
                    onChange(formattedDay);
                    setOpen(false);
                  }}
                  className={`relative grid size-8 place-items-center rounded-lg text-[12px] font-semibold transition ${
                    isSelected
                      ? "bg-blue-700 text-white shadow-sm"
                      : isCurrentMonth
                        ? "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                        : "text-slate-300 hover:bg-slate-50"
                  } ${isToday && !isSelected ? "ring-1 ring-blue-200" : ""}`}
                  aria-label={`Chọn ngày ${formattedDay}`}
                >
                  {day.getDate()}
                  {hasExpiry && !isSelected ? <span className="absolute bottom-1 size-1 rounded-full bg-blue-500" /> : null}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2">
            <span className="text-[11px] text-slate-500">Chấm xanh: có hợp đồng hết hạn</span>
            {hasSelectedValue ? (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                className="rounded-lg px-2 py-1.5 text-[12px] font-semibold text-slate-600 hover:bg-slate-50"
              >
                Xóa ngày
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ContractFilters({ filters, onChange, onClear }: { filters: ContractFiltersState; onChange: (filters: ContractFiltersState) => void; onClear: () => void }) {
  const hasActiveFilters = Object.values(filters).some((item) => item.trim().length > 0);
  const updateFilter = (key: keyof ContractFiltersState, value: string) => onChange({ ...filters, [key]: value });

  return (
    <section className="relative z-20">
      <div className="flex flex-wrap items-center gap-2">
        <div
          className={`flex h-9 w-[310px] items-center gap-2 border bg-white px-3 shadow-sm ${
            filters.keyword.trim().length > 0 ? "rounded-2xl border-[#8EC5FF]" : "rounded-lg border-slate-300"
          }`}
        >
          <Search size={14} className="text-slate-400" />
          <input
            value={filters.keyword}
            onChange={(event) => updateFilter("keyword", event.target.value)}
            className={`min-w-0 flex-1 bg-transparent text-[12px] placeholder:text-slate-400 focus:outline-none ${
              filters.keyword.trim().length > 0 ? "font-semibold text-[#1447E6]" : "text-slate-900"
            }`}
            placeholder="Tìm theo mã cán bộ, họ tên, số hợp đồng..."
          />
        </div>
        <ExpandedSelect label="Loại hợp đồng" value={filters.contractType} options={contractTypeOptions} width="w-[185px]" hideLabelWhenSelected activeWhenSelected onChange={(value) => updateFilter("contractType", value)} />
        <ExpandedSelect label="Trạng thái" value={filters.status} options={statusOptions} width="w-[155px]" hideLabelWhenSelected activeWhenSelected onChange={(value) => updateFilter("status", value)} />
        <ContractExpiryDateFilter value={filters.expiryDate} onChange={(value) => updateFilter("expiryDate", value)} />
        <ExpandedSelect label="Đơn vị" value={filters.unit} options={unitOptions} width="w-[260px]" searchable hideLabelWhenSelected activeWhenSelected onChange={(value) => updateFilter("unit", value)} />
        {hasActiveFilters ? (
          <button onClick={onClear} className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 text-[12px] font-semibold text-slate-600 shadow-sm hover:bg-slate-50">
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

function ContractTable({ rows, compact = false, onOpenFrame, onViewContract }: { rows: ContractRow[]; compact?: boolean; onOpenFrame?: (frame: ContractFrame) => void; onViewContract?: (contract: ContractRow) => void }) {
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

      {rows.map((row) => {
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
      {rows.length === 0 ? (
        <div className="px-4 py-8 text-center text-[13px] text-slate-500">Không có hợp đồng phù hợp với bộ lọc hiện tại.</div>
      ) : null}
    </section>
  );
}

function ContractListContent({ dimmed = false, onOpenFrame, onViewContract }: { dimmed?: boolean; onOpenFrame?: (frame: ContractFrame) => void; onViewContract?: (contract: ContractRow) => void }) {
  const [filters, setFilters] = useState<ContractFiltersState>(initialContractFilters);
  const [page, setPage] = useState(1);
  const filteredRows = contractRows.filter((row) => {
    const keyword = normalizeSearch(filters.keyword);
    const contractType = normalizeSearch(filters.contractType);
    const expiryDate = filters.expiryDate.trim();

    if (keyword) {
      const haystack = normalizeSearch(`${row.number} ${row.code} ${row.name} ${row.unit} ${row.type} ${row.status} ${row.end}`);
      if (!haystack.includes(keyword)) return false;
    }
    if (contractType && !normalizeSearch(row.type).includes(contractType)) return false;
    if (filters.status && row.status !== filters.status) return false;
    if (expiryDate && !row.end.includes(expiryDate)) return false;
    if (filters.unit && row.unit !== filters.unit) return false;

    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / CONTRACT_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * CONTRACT_PAGE_SIZE;
  const paginatedRows = filteredRows.slice(pageStart, pageStart + CONTRACT_PAGE_SIZE);
  const visibleStart = filteredRows.length === 0 ? 0 : pageStart + 1;
  const visibleEnd = pageStart + paginatedRows.length;
  const handleFiltersChange = (nextFilters: ContractFiltersState) => {
    setFilters(nextFilters);
    setPage(1);
  };
  const clearFilters = () => {
    setFilters({ keyword: "", contractType: "", status: "", expiryDate: "", unit: "" });
    setPage(1);
  };

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
        <ContractFilters filters={filters} onChange={handleFiltersChange} onClear={clearFilters} />
        <ContractTable rows={paginatedRows} compact={dimmed} onOpenFrame={onOpenFrame} onViewContract={onViewContract} />
      </div>

      <div className="mt-4 flex items-center justify-between text-[12px] text-slate-500">
        <span>Hiển thị {visibleStart}-{visibleEnd} / {filteredRows.length} hợp đồng lao động</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            className={`h-8 rounded-lg border border-slate-300 bg-white px-3 text-[12px] ${currentPage === 1 ? "cursor-not-allowed text-slate-400" : "font-medium text-slate-700 hover:bg-slate-50"}`}
          >
            Trước
          </button>
          <span className="font-medium text-slate-700">Trang {currentPage} / {totalPages}</span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
            className={`h-8 rounded-lg border border-slate-300 bg-white px-3 text-[12px] ${currentPage >= totalPages ? "cursor-not-allowed text-slate-400" : "font-medium text-slate-700 hover:bg-slate-50"}`}
          >
            Sau
          </button>
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
    <div className="relative flex items-center justify-end">
      <button
        type="button"
        onClick={withMenu ? onToggleMenu : onManualAdd}
        className="flex h-9 items-center gap-2 rounded-lg bg-blue-700 px-3.5 text-[12px] font-semibold text-white shadow-sm hover:bg-blue-800"
      >
        <Plus size={14} />
        Thêm hồ sơ nhân sự
        {withMenu ? <ChevronDown size={14} className={menuOpen ? "rotate-180" : ""} /> : null}
      </button>

      {withMenu && menuOpen ? (
        <div className="absolute right-0 top-10 z-30 w-[218px] overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 text-left shadow-xl">
          <button
            type="button"
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
            type="button"
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
  rows,
  unitOptions,
  degreeOptions,
  contractOptions,
  statusOptions,
  addMenuOpen,
  onToggleAddMenu,
  onManualAdd,
  onExcelImport,
  onEditPersonnel,
}: {
  rows: string[][];
  unitOptions: string[];
  degreeOptions: string[];
  contractOptions: string[];
  statusOptions: string[];
  addMenuOpen?: boolean;
  onToggleAddMenu?: () => void;
  onManualAdd?: () => void;
  onExcelImport?: () => void;
  onEditPersonnel?: (personnel: PersonnelRecord) => void;
}) {
  const [keyword, setKeyword] = useState("");
  const [unit, setUnit] = useState("");
  const [degree, setDegree] = useState("");
  const [contract, setContract] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const filteredRows = rows.filter((row) => {
    const record = toPersonnelRecord(row);
    const keywordValue = normalizeSearch(keyword);

    if (keywordValue) {
      const haystack = normalizeSearch(`${record.code} ${record.name} ${record.unit} ${record.degree} ${record.role} ${record.contract} ${record.status}`);
      if (!haystack.includes(keywordValue)) return false;
    }
    if (unit && record.unit !== unit) return false;
    if (degree && record.degree !== degree) return false;
    if (contract && record.contract !== contract) return false;
    if (status && record.status !== status) return false;

    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PERSONNEL_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PERSONNEL_PAGE_SIZE;
  const paginatedRows = filteredRows.slice(pageStart, pageStart + PERSONNEL_PAGE_SIZE);
  const visibleStart = filteredRows.length === 0 ? 0 : pageStart + 1;
  const visibleEnd = pageStart + paginatedRows.length;
  const hasActiveFilters = [keyword, unit, degree, contract, status].some((item) => item.trim().length > 0);
  const updateKeyword = (value: string) => {
    setKeyword(value);
    setPage(1);
  };
  const updateUnit = (value: string) => {
    setUnit(value);
    setPage(1);
  };
  const updateDegree = (value: string) => {
    setDegree(value);
    setPage(1);
  };
  const updateContract = (value: string) => {
    setContract(value);
    setPage(1);
  };
  const updateStatus = (value: string) => {
    setStatus(value);
    setPage(1);
  };
  const clearFilters = () => {
    setKeyword("");
    setUnit("");
    setDegree("");
    setContract("");
    setStatus("");
    setPage(1);
  };

  return (
    <div className="select-none px-6 py-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-[170px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 shadow-sm">
            <Search size={14} className="text-slate-400" />
            <input
              value={keyword}
              onChange={(event) => updateKeyword(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[12px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
              placeholder="Tìm kiếm"
            />
          </div>
          <SelectFilter label="Đơn vị công tác" value={unit} options={unitOptions} onChange={updateUnit} />
          <SelectFilter label="Học hàm/học vị" value={degree} options={degreeOptions} onChange={updateDegree} />
          <SelectFilter label="Hợp đồng" value={contract} options={contractOptions} onChange={updateContract} />
          <SelectFilter label="Trạng thái" value={status} options={statusOptions} onChange={updateStatus} />
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-semibold text-slate-600 shadow-sm hover:bg-slate-50"
            >
              <RotateCcw size={13} /> Xóa lọc
            </button>
          ) : null}
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

        {paginatedRows.map(([code, name, rowUnit, rowDegree, role, rowContract, rowStatus]) => (
          <div
            key={code}
            className="grid h-[58px] grid-cols-[0.7fr_1.2fr_1.35fr_1fr_1fr_1fr_1fr_44px] items-center border-b border-slate-100 px-4 text-[12px] text-slate-800 last:border-0"
          >
            <span className="font-mono text-[11px] font-semibold text-slate-700">{code}</span>
            <span className="font-medium">{name}</span>
            <span>{rowUnit}</span>
            <span>{rowDegree}</span>
            <span>{role}</span>
            <span>
              <StatusBadge value={rowContract} />
            </span>
            <span>
              <StatusBadge value={rowStatus} />
            </span>
            <button
              type="button"
              onClick={() => onEditPersonnel?.({ code, name, unit: rowUnit, degree: rowDegree, role, contract: rowContract, status: rowStatus })}
              className="grid size-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-50"
              aria-label={`Sửa hồ sơ ${name}`}
            >
              <Edit3 size={14} />
            </button>
          </div>
        ))}
        {filteredRows.length === 0 ? (
          <div className="px-4 py-8 text-center text-[13px] text-slate-500">Không có hồ sơ nhân sự phù hợp với bộ lọc hiện tại.</div>
        ) : null}
      </section>

      <div className="mt-4 flex items-center justify-between text-[12px] text-slate-500">
        <span>Hiển thị {visibleStart}-{visibleEnd} / {filteredRows.length} hồ sơ nhân sự</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            className={`h-8 rounded-lg border border-slate-300 bg-white px-3 text-[12px] ${currentPage === 1 ? "cursor-not-allowed text-slate-400" : "font-medium text-slate-700 hover:bg-slate-50"}`}
          >
            Trước
          </button>
          <span className="font-medium text-slate-700">Trang {currentPage} / {totalPages}</span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
            className={`h-8 rounded-lg border border-slate-300 bg-white px-3 text-[12px] ${currentPage >= totalPages ? "cursor-not-allowed text-slate-400" : "font-medium text-slate-700 hover:bg-slate-50"}`}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}

function ExcelImportDialog({
  onClose,
  existingRows,
  unitOptions,
  degreeOptions,
  contractOptions,
  statusOptions,
  onImport,
}: {
  onClose: () => void;
  existingRows: string[][];
  unitOptions: string[];
  degreeOptions: string[];
  contractOptions: string[];
  statusOptions: string[];
  onImport: (rows: PersonnelRow[]) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [analysis, setAnalysis] = useState<PersonnelImportAnalysis | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [importSummary, setImportSummary] = useState<{ fileName: string; importedCount: number } | null>(null);
  const fileUploaded = analysis !== null;
  const allValid = analysis?.allValid ?? false;
  const validCount = analysis?.validCount ?? 0;
  const invalidCount = analysis?.invalidCount ?? 0;
  const errorCount = analysis?.errorCount ?? 0;
  const invalidRows = analysis?.invalidRows ?? [];
  const totalRows = analysis?.totalRows ?? 0;

  const resetSelection = () => {
    setAnalysis(null);
    setImportSummary(null);
    setIsParsing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileChooser = () => {
    if (isParsing) return;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const downloadTemplate = () => {
    const link = document.createElement("a");
    link.href = PERSONNEL_IMPORT_TEMPLATE_PATH;
    link.download = "personnel-import-template.xlsx";
    document.body.append(link);
    link.click();
    link.remove();
  };

  const loadFile = (file: File) => {
    setIsParsing(true);
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const result = reader.result;
        if (!(result instanceof ArrayBuffer)) {
          throw new Error("Không đọc được dữ liệu nhị phân từ file Excel.");
        }

        const workbook = XLSX.read(result, { type: "array" });
        const nextAnalysis = analyzePersonnelWorkbook(workbook, file.name, existingRows, {
          unitOptions,
          degreeOptions,
          contractOptions,
          statusOptions,
        });
        setAnalysis(nextAnalysis);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Không thể phân tích file Excel đã chọn.";
        setAnalysis(
          buildPersonnelImportAnalysis({
            fileName: file.name,
            totalRows: 0,
            validRows: [],
            invalidRows: [
              {
                row: "Toàn file",
                name: file.name,
                field: "Tệp Excel",
                issue: message,
                type: "Sai cấu trúc",
              },
            ],
          }),
        );
      } finally {
        setIsParsing(false);
      }
    };

    reader.onerror = () => {
      setAnalysis(
        buildPersonnelImportAnalysis({
          fileName: file.name,
          totalRows: 0,
          validRows: [],
          invalidRows: [
            {
              row: "Toàn file",
              name: file.name,
              field: "Tệp Excel",
              issue: "Không thể đọc file đã chọn. Vui lòng chọn lại file Excel hợp lệ.",
              type: "Sai cấu trúc",
            },
          ],
        }),
      );
      setIsParsing(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    loadFile(file);
  };

  const handleImport = () => {
    if (!analysis || !analysis.allValid) return;
    onImport(analysis.validRows);
    setImportSummary({ fileName: analysis.fileName, importedCount: analysis.validRows.length });
  };

  if (importSummary) {
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
            Hệ thống đã tạo {importSummary.importedCount} hồ sơ hợp lệ từ file {importSummary.fileName}. Toàn bộ dữ liệu đã được nhập.
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
                  resetSelection();
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
                  File mẫu giúp thống nhất 7 cột bắt buộc cho hồ sơ nhân sự: mã cán bộ, họ tên, đơn vị, trình độ, chức danh, hợp đồng và trạng thái.
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
              {isParsing ? "Đang kiểm tra file..." : "Chọn file Excel"}
            </span>
          </button>
        </div>

        <footer className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
          <div className="text-[12px] text-slate-500">
            {isParsing ? "Đang đọc file Excel và kiểm tra dữ liệu." : "Chưa có file nào được chọn."}
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
    );
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
                  Mẫu gồm 7 cột chuẩn cho danh sách hồ sơ nhân sự để hệ thống kiểm tra và nhập đồng bộ.
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
                <div className="mt-0.5 truncate text-[13.5px] font-semibold text-slate-950">
                  {analysis?.fileName}
                </div>
                <p className="mt-1 text-[12px] leading-5 text-slate-600">
                  {isParsing
                    ? "Hệ thống đang đọc dữ liệu và kiểm tra tính hợp lệ của file Excel."
                    : `Đã chọn file Excel gồm ${totalRows} dòng dữ liệu để kiểm tra trước khi nhập.`}
                </p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-slate-500">
                  <Upload size={13} /> {analysis?.fileName.toLowerCase().endsWith(".xls") ? ".xls" : ".xlsx"}
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
                  : "File đang có lỗi dữ liệu; cần sửa toàn bộ lỗi trước khi nhập."}
              </div>
            </div>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${
                allValid ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"
              }`}
            >
              {allValid ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
              {allValid ? "Sẵn sàng nhập" : `${errorCount} lỗi cần xử lý`}
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
                    className={`h-full rounded-full ${allValid ? "bg-blue-700" : "bg-amber-500"}`}
                    style={{ width: `${totalRows > 0 ? Math.max(0, Math.min(100, (validCount / totalRows) * 100)) : 0}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center gap-4 text-[11.5px] text-slate-500">
                  <span>Tổng {totalRows} dòng dữ liệu</span>
                  {!allValid ? <span>{invalidCount} dòng cần sửa</span> : <span>Không phát hiện dòng lỗi</span>}
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
                "Đủ 7 trường bắt buộc",
                "Không vượt quá 200 hồ sơ trong một file",
                "Đơn vị và Trình độ khớp danh mục hiện có",
                "Mã cán bộ, Hợp đồng và Trạng thái hợp lệ",
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
            ? "Hệ thống sẽ tạo hồ sơ sau khi xác nhận nhập file."
            : "File chỉ được nhập khi toàn bộ dòng dữ liệu đều hợp lệ."}
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
              allValid && !isParsing ? "bg-blue-700 hover:bg-blue-800" : "cursor-not-allowed bg-slate-300"
            }`}
          >
            <CheckCircle2 size={15} /> {allValid ? "Nhập toàn bộ hồ sơ" : "Cần sửa file trước khi nhập"}
          </button>
        </div>
      </footer>
    </section>
  );
}

function LargePersonnelForm({
  title = "Thêm hồ sơ nhân sự",
  initialPersonnel,
  foreigner,
  setForeigner,
  duplicateId,
  setDuplicateId,
  showErrors,
  setShowErrors,
  degrees,
  setDegrees,
  unitOptions,
  degreeOptions,
  roleOptions,
  contractOptions,
  statusOptions,
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
  onRequestOfficialSave,
}: {
  title?: string;
  initialPersonnel?: PersonnelRecord | null;
  foreigner: boolean;
  setForeigner: (value: boolean | ((value: boolean) => boolean)) => void;
  duplicateId: boolean;
  setDuplicateId: (value: boolean) => void;
  showErrors: boolean;
  setShowErrors: (value: boolean) => void;
  degrees: { name: string; place: string }[];
  setDegrees: (value: { name: string; place: string }[] | ((value: { name: string; place: string }[]) => { name: string; place: string }[])) => void;
  unitOptions: string[];
  degreeOptions: string[];
  roleOptions: string[];
  contractOptions: string[];
  statusOptions: string[];
  certs: { name: string; place: string }[];
  setCerts: (value: { name: string; place: string }[] | ((value: { name: string; place: string }[]) => { name: string; place: string }[])) => void;
  figmaCopyMode: boolean;
  setFigmaCopyMode: (value: boolean) => void;
  validationStarted: boolean;
  setValidationStarted: (value: boolean) => void;
  captureSection: string | null;
  setCaptureSection: (value: string | null) => void;
  onClose: () => void;
  onSave: (record: PersonnelRecord) => void;
  onRequestOfficialSave: (record: PersonnelRecord) => void;
}) {
  const [draft, setDraft] = useState<PersonnelRecord>(() =>
    initialPersonnel ?? {
      code: "",
      name: "",
      unit: "",
      degree: "",
      role: "",
      contract: "",
      status: "",
    },
  );
  const [gender, setGender] = useState(() => (initialPersonnel ? "Nam" : ""));
  const [governmentId, setGovernmentId] = useState(() => (initialPersonnel ? "001200001901" : ""));
  const hasErrors = showErrors || duplicateId;
  const isEditing = initialPersonnel !== null && initialPersonnel !== undefined;
  const formScrollRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState("identity");
  const [captureOffset, setCaptureOffset] = useState(0);
  const captureViewport = !!captureSection && !figmaCopyMode;
  const validationState = !validationStarted ? "idle" : hasErrors ? "error" : "valid";
  const errorCount = showErrors ? 9 : duplicateId ? 1 : 0;
  const knownConflictingGovernmentIds = new Set(["001200001900"]);
  const errorGroups = [
    hasErrors ? "Thông tin cá nhân" : null,
    showErrors ? "Liên hệ & quốc tịch" : null,
    showErrors ? "Công tác & lương" : null,
    showErrors ? "Tài liệu" : null,
  ].filter(Boolean);
  const updateDraft = (field: keyof PersonnelRecord, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };
  const missingRequiredDraftFields =
    !draft.name.trim() ||
    !draft.unit.trim() ||
    !draft.degree.trim() ||
    !draft.role.trim() ||
    !draft.contract.trim() ||
    !draft.status.trim();
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
            <h1 className="text-[17px] font-semibold text-slate-900">{title}</h1>
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
                      <Input
                        value={draft.name}
                        placeholder="Nguyễn Văn A"
                        state={showErrors ? "error" : "default"}
                        onChange={(value) => updateDraft("name", value)}
                      />
                    </Field>
                    <Field label="Mã cán bộ" required>
                      <Input value={draft.code} placeholder="CB2026-0048" readOnly />
                    </Field>
                    <Field label="Giới tính" required>
                      <Select value={gender} options={["Nam", "Nữ", "Khác"]} placeholder="Chọn giới tính" onChange={setGender} />
                    </Field>
                    <Field label="Ngày sinh" required error={showErrors ? "Ngày sinh không hợp lệ." : undefined}>
                      <Input value={showErrors ? "32/13/2000" : isEditing ? "01/01/2000" : ""} placeholder="01/01/2000" icon={<Calendar size={15} />} state={showErrors ? "error" : "default"} />
                    </Field>
                    <Field label="Quê quán" required>
                      <Input value={isEditing ? "Hà Nội" : ""} placeholder="Hà Nội" icon={<MapPin size={15} />} />
                    </Field>
                    <div className="col-span-2">
                      <Field
                        label="Số CCCD"
                        required
                        error={duplicateId ? "Đã tồn tại hồ sơ với CCCD này." : undefined}
                      >
                        <div className="flex gap-2">
                          <div className="min-w-0 flex-1">
                            <Input
                              value={governmentId}
                              placeholder="001200001901"
                              state={duplicateId ? "error" : "default"}
                              onChange={(value) => {
                                setGovernmentId(value);
                                setDuplicateId(false);
                              }}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const normalizedGovernmentId = governmentId.trim();
                              setValidationStarted(true);
                              setDuplicateId(knownConflictingGovernmentIds.has(normalizedGovernmentId));
                            }}
                            className="h-10 shrink-0 rounded-lg border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            Kiểm tra trùng
                          </button>
                        </div>
                      </Field>
                    </div>
                    <Field label="Mã số thuế" required>
                      <Input value={isEditing ? "1200001900" : ""} placeholder="1200001900" />
                    </Field>
                    <Field label="Số BHXH" required>
                      <Input value={isEditing ? "00120019" : ""} placeholder="00120019" />
                    </Field>
                    <Field label="Số BHYT" required>
                      <Input value={isEditing ? "00120019" : ""} placeholder="00120019" />
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
                    <Input value={showErrors ? "nguyenvana@" : isEditing ? "nguyenvana@tlu.edu.vn" : ""} placeholder="nguyenvana@tlu.edu.vn" icon={<Mail size={15} />} state={showErrors ? "error" : "default"} />
                  </Field>
                  <Field label="Số điện thoại" required error={showErrors ? "Số điện thoại là trường bắt buộc." : undefined}>
                    <Input value={showErrors ? "" : isEditing ? "0987654321" : ""} placeholder="0987654321" icon={<Phone size={15} />} state={showErrors ? "error" : "default"} />
                  </Field>
                  <div className="col-span-2">
                    <Field label="Địa chỉ thường trú" required error={showErrors ? "Vui lòng nhập địa chỉ thường trú." : undefined}>
                      <Input value={showErrors ? "" : isEditing ? "Thanh Trì, Hà Nội" : ""} placeholder="Thanh Trì, Hà Nội" icon={<MapPin size={15} />} state={showErrors ? "error" : "default"} />
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
                        <Select value={draft.unit} options={unitOptions} placeholder="Khoa Công nghệ thông tin" onChange={(value) => updateDraft("unit", value)} />
                      </Field>
                      <Field label="Bộ môn / phòng ban trực thuộc">
                        <Select value={isEditing ? "Bộ môn Công nghệ phần mềm" : ""} placeholder="Bộ môn Công nghệ phần mềm" options={["Bộ môn Công nghệ phần mềm", "Bộ môn Hệ thống thông tin", "Bộ môn Khoa học dữ liệu"]} />
                      </Field>
                      <Field label="Chức vụ hiện tại" required error={showErrors ? "Vui lòng chọn chức vụ hiện tại." : undefined}>
                        <Select
                          value={draft.role}
                          options={roleOptions}
                          placeholder="Giảng viên"
                          state={showErrors ? "error" : "default"}
                          onChange={(value) => updateDraft("role", value)}
                        />
                      </Field>
                      <Field label="Loại nhân sự" required>
                        <Select value={isEditing ? "Giảng viên cơ hữu" : ""} placeholder="Giảng viên cơ hữu" options={["Giảng viên cơ hữu", "Giảng viên thỉnh giảng", "Chuyên viên"]} />
                      </Field>
                      <Field label="Ngày bắt đầu công tác" required>
                        <Input value={isEditing ? "01/06/2026" : ""} placeholder="01/06/2026" icon={<Calendar size={15} />} />
                      </Field>
                      <Field label="Hợp đồng" required>
                        <Select value={draft.contract} options={contractOptions} placeholder="Còn hiệu lực" onChange={(value) => updateDraft("contract", value)} />
                      </Field>
                      <Field label="Trạng thái hồ sơ" required>
                        <Select value={draft.status} options={statusOptions} placeholder="Đang hoàn thiện" onChange={(value) => updateDraft("status", value)} />
                      </Field>
                      <div className="col-span-3 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-[12px] text-blue-800">
                        Đường dẫn đơn vị: Trường Đại học Thủy Lợi / {draft.unit || "Chưa chọn đơn vị"} / Bộ môn Công nghệ phần mềm
                      </div>
                    </div>
                </SectionCard>

                <SectionCard title="Lương và phụ cấp dự kiến" icon={<Banknote size={18} />}>
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Ngạch / hạng chức danh" required>
                      <Select value={isEditing ? "Giảng viên hạng III" : ""} placeholder="Giảng viên hạng III" options={["Giảng viên hạng III", "Giảng viên hạng II", "Chuyên viên"]} />
                    </Field>
                    <Field label="Bậc lương" required>
                      <Select value={isEditing ? "Bậc 1" : ""} placeholder="Bậc 1" options={["Bậc 1", "Bậc 2", "Bậc 3"]} />
                    </Field>
                    <Field label="Hệ số lương" required error={showErrors ? "Hệ số lương phải là số lớn hơn 0." : undefined}>
                      <Input value={showErrors ? "abc" : isEditing ? "2.34" : ""} placeholder="2.34" state={showErrors ? "error" : "default"} />
                    </Field>
                    <Field label="Phụ cấp chức vụ">
                      <Input value={isEditing ? "0.00" : ""} placeholder="0.00" />
                    </Field>
                    <Field label="Phụ cấp thâm niên">
                      <Input value={isEditing ? "0%" : ""} placeholder="0%" />
                    </Field>
                    <Field label="Nguồn chi trả" required>
                      <Select value={isEditing ? "Ngân sách nhà trường" : ""} placeholder="Ngân sách nhà trường" options={["Ngân sách nhà trường", "Nguồn dự án", "Nguồn tự chủ"]} />
                    </Field>
                  </div>
                </SectionCard>
              </div>
            </section>

            <section id="education">
              <SectionCard title="Trình độ học vấn" icon={<GraduationCap size={18} />}>
                  <div className="grid grid-cols-4 gap-3">
                  <Field label="Trình độ văn hóa" required>
                    <Select value={isEditing ? "12/12" : ""} placeholder="12/12" options={generalEducationOptions} />
                  </Field>
                    <Field label="Trình độ đào tạo" required>
                      <Select
                        value={draft.degree}
                        options={Array.from(new Set([...trainingLevelOptions, ...degreeOptions]))}
                        placeholder="Tiến sĩ"
                        onChange={(value) => updateDraft("degree", value)}
                      />
                    </Field>
                    <Field label="Chức danh nghề nghiệp" required>
                      <Select value={isEditing ? "Giảng viên hạng III" : ""} placeholder="Giảng viên hạng III" options={professionalTitleOptions} />
                    </Field>
                    <Field label="Học hàm / Học vị" required>
                      <Select
                        value={draft.degree}
                        options={Array.from(new Set([...academicRankDegreeOptions, ...degreeOptions]))}
                        placeholder="Tiến sĩ"
                        onChange={(value) => updateDraft("degree", value)}
                      />
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
                  <CredentialSection
                    title="Bằng cấp"
                    description="Bắt buộc đính kèm tối thiểu 1 bằng cấp."
                    icon={<Award size={18} />}
                    items={degrees}
                    setItems={setDegrees}
                    itemLabel="bằng cấp"
                    namePlaceholder="Ví dụ: Bằng Thạc sĩ Công nghệ thông tin"
                    requiredMinimum
                  />

                  <CredentialSection
                    title="Chứng chỉ"
                    description="Không bắt buộc, dùng để bổ sung chứng chỉ chuyên môn hoặc ngoại ngữ."
                    icon={<FileBadge size={18} />}
                    optional
                    items={certs}
                    setItems={setCerts}
                    itemLabel="chứng chỉ"
                    namePlaceholder="Ví dụ: IELTS 7.5"
                  />
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
              if (!isEditing && (missingRequiredDraftFields || duplicateId)) {
                setShowErrors(missingRequiredDraftFields);
                setCaptureSection(null);
                setActiveSection("identity");
                formScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                return;
              }
              if (!isEditing) {
                setShowErrors(false);
              }
              onRequestOfficialSave(draft);
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
            type="button"
            onClick={() => {
              if (item.view) onViewChange(item.view);
            }}
            className={`mb-1 flex h-9 w-full items-center gap-2 rounded-lg px-3 text-left text-[13px] transition ${
              item.view === activeView ? "bg-blue-50 font-semibold text-blue-700" : "text-slate-700 hover:bg-slate-50"
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

function AppHeader({
  label,
  notifications,
  notificationOpen,
  onToggleNotifications,
}: {
  label: string;
  notifications: ContractRow[];
  notificationOpen: boolean;
  onToggleNotifications: () => void;
}) {
  return (
    <header className="flex h-[58px] items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-3 text-[13px] font-medium text-slate-800">
        <LayoutList size={16} />
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            type="button"
            onClick={onToggleNotifications}
            className="relative grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            aria-label="Thông báo hợp đồng"
          >
            <Bell size={17} />
            {notifications.length > 0 ? <span className="absolute right-2 top-2 size-1.5 rounded-full bg-rose-500" /> : null}
          </button>
          {notificationOpen ? (
            <div className="absolute right-0 top-11 z-50 w-80 rounded-xl border border-slate-200 bg-white p-2 text-left shadow-xl ring-1 ring-slate-100">
              <div className="px-2.5 py-2">
                <div className="text-[12px] font-bold uppercase tracking-wide text-slate-500">Thông báo</div>
                <div className="mt-0.5 text-[13px] font-semibold text-slate-950">{notifications.length} hợp đồng cần xử lý</div>
              </div>
              <div className="space-y-1">
                {notifications.map((contract) => (
                  <div key={contract.number} className="rounded-lg px-2.5 py-2 hover:bg-blue-50">
                    <div className="text-[12px] font-semibold text-slate-900">{contract.name}</div>
                    <div className="mt-0.5 text-[11px] text-slate-500">{contract.number} · {contract.status} · hết hạn {contract.end}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
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
  const [personnelRows, setPersonnelRows] = useState<string[][]>(initialPersonnelRows);
  const [activeView, setActiveView] = useState<View>("ho-so");
  const [foreigner, setForeigner] = useState(false);
  const [duplicateId, setDuplicateId] = useState(false);
  const [validationAttempted, setValidationAttempted] = useState<Record<number, boolean>>({});
  const [saved, setSaved] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [excelImportOpen, setExcelImportOpen] = useState(false);
  const [figmaCopyMode, setFigmaCopyMode] = useState(false);
  const [formValidationStarted, setFormValidationStarted] = useState(false);
  const [captureSection, setCaptureSection] = useState<string | null>(null);
  const [currentContractFrame, setCurrentContractFrame] = useState<ContractFrame>("list");
  const [viewedContract, setViewedContract] = useState<ContractRow | null>(null);
  const [editingPersonnel, setEditingPersonnel] = useState<PersonnelRecord | null>(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [confirmOfficialSaveOpen, setConfirmOfficialSaveOpen] = useState(false);
  const [pendingOfficialSaveDraft, setPendingOfficialSaveDraft] = useState<PersonnelRecord | null>(null);
  const [degrees, setDegrees] = useState<CredentialItem[]>(defaultDegrees);
  const [certs, setCerts] = useState<CredentialItem[]>(defaultCerts);
  const personnelOptions = useMemo(() => derivePersonnelOptions(personnelRows), [personnelRows]);

  useEffect(() => {
    const handlePrototypeShortcut = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFigmaCopyMode(false);
        setCaptureSection(null);
        setConfirmOfficialSaveOpen(false);
        setPendingOfficialSaveDraft(null);
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
        setConfirmOfficialSaveOpen(false);
        setPendingOfficialSaveDraft(null);
      };

      if (event.key === "1") {
        setFormValidationStarted(false);
        setDuplicateId(false);
        setValidationAttempted({});
        setCaptureSection(null);
        setConfirmOfficialSaveOpen(false);
        setPendingOfficialSaveDraft(null);
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
        setConfirmOfficialSaveOpen(false);
        setPendingOfficialSaveDraft(null);
      }
    };
    window.addEventListener("keydown", handlePrototypeShortcut);
    return () => window.removeEventListener("keydown", handlePrototypeShortcut);
  }, []);

  const activeLabel = sidebarItems.find((item) => item.view === activeView)?.label ?? "Hồ sơ nhân sự";
  const showContractOverlay = currentContractFrame !== "list" || viewedContract !== null;
  const expiringContracts = contractRows.filter((contract) => contract.status === "Sắp hết hạn" || contract.status === "Chờ gia hạn");

  const handleViewChange = (view: View) => {
    setActiveView(view);
    setCurrentContractFrame("list");
    setViewedContract(null);
    setEditingPersonnel(null);
    setNotificationOpen(false);
    setAddMenuOpen(false);
    setExcelImportOpen(false);
    setFigmaCopyMode(false);
    setCaptureSection(null);
    setConfirmOfficialSaveOpen(false);
    setPendingOfficialSaveDraft(null);
    if (view === "ho-so") {
      setModalOpen(false);
      return;
    }

    setSaved(false);
  };

  const openManualAdd = () => {
    setActiveView("ho-so");
    setEditingPersonnel(null);
    setNotificationOpen(false);
    setModalOpen(true);
    setAddMenuOpen(false);
    setExcelImportOpen(false);
    setFormValidationStarted(false);
    setDuplicateId(false);
    setValidationAttempted({});
    setCaptureSection(null);
    setConfirmOfficialSaveOpen(false);
    setPendingOfficialSaveDraft(null);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditingPersonnel(null);
    setAddMenuOpen(false);
    setExcelImportOpen(false);
    setFigmaCopyMode(false);
    setCaptureSection(null);
    setConfirmOfficialSaveOpen(false);
    setPendingOfficialSaveDraft(null);
  };

  const closePersonnelForm = () => {
    if (!editingPersonnel) {
      closeModal();
      return;
    }

    setEditingPersonnel(null);
    setAddMenuOpen(false);
    setExcelImportOpen(false);
    setFigmaCopyMode(false);
    setFormValidationStarted(false);
    setDuplicateId(false);
    setValidationAttempted({});
    setCaptureSection(null);
    setConfirmOfficialSaveOpen(false);
    setPendingOfficialSaveDraft(null);
  };

  const savePersonnelForm = (updated: PersonnelRecord) => {
    if (editingPersonnel) {
      setPersonnelRows((current) =>
        current.map((row) =>
          row[0] === editingPersonnel.code
            ? [
                editingPersonnel.code,
                updated.name,
                updated.unit,
                updated.degree,
                updated.role,
                updated.contract,
                updated.status,
              ]
            : row,
        ),
      );
      closePersonnelForm();
      return;
    }

    setActiveView("ho-so");
    setSaved(true);
  };

  const requestOfficialSave = (draft: PersonnelRecord) => {
    setPendingOfficialSaveDraft(draft);
    setConfirmOfficialSaveOpen(true);
  };

  const cancelOfficialSave = () => {
    setConfirmOfficialSaveOpen(false);
    setPendingOfficialSaveDraft(null);
  };

  const confirmOfficialSave = () => {
    if (!pendingOfficialSaveDraft) return;

    savePersonnelForm(pendingOfficialSaveDraft);
    setConfirmOfficialSaveOpen(false);
    setPendingOfficialSaveDraft(null);
  };

  const openExcelImport = () => {
    setActiveView("ho-so");
    setEditingPersonnel(null);
    setNotificationOpen(false);
    setModalOpen(false);
    setAddMenuOpen(false);
    setExcelImportOpen(true);
    setFigmaCopyMode(false);
    setCaptureSection(null);
    setConfirmOfficialSaveOpen(false);
    setPendingOfficialSaveDraft(null);
  };
  const closeExcelImport = () => {
    setExcelImportOpen(false);
    setAddMenuOpen(false);
    setConfirmOfficialSaveOpen(false);
    setPendingOfficialSaveDraft(null);
  };

  const resetForAnotherProfile = () => {
    setSaved(false);
    setEditingPersonnel(null);
    setDuplicateId(false);
    setValidationAttempted({});
    setFormValidationStarted(false);
    setCaptureSection(null);
    setModalOpen(true);
    setAddMenuOpen(false);
    setExcelImportOpen(false);
    setConfirmOfficialSaveOpen(false);
    setPendingOfficialSaveDraft(null);
  };

  const showPersonnelForm = modalOpen || editingPersonnel !== null;
  const personnelFormTitle = editingPersonnel ? "Sửa hồ sơ nhân sự" : "Thêm hồ sơ nhân sự";

  if (saved && activeView === "ho-so") {
    return (
      <div className="min-h-screen bg-white font-['Be_Vietnam_Pro'] text-slate-900">
        <div className="flex min-h-screen overflow-hidden bg-white">
          <AppSidebar activeView={activeView} onViewChange={handleViewChange} />
          <div className="min-w-0 flex-1 bg-slate-50">
            <AppHeader label="Hồ sơ nhân sự" notifications={expiringContracts} notificationOpen={notificationOpen} onToggleNotifications={() => setNotificationOpen((open) => !open)} />
            <div className="relative min-h-[calc(100vh-58px)] overflow-hidden bg-white">
              <div className="opacity-25">
                <PersonnelListBackground
                  rows={personnelRows}
                  unitOptions={personnelOptions.unitOptions}
                  degreeOptions={personnelOptions.degreeOptions}
                  contractOptions={personnelOptions.contractOptions}
                  statusOptions={personnelOptions.statusOptions}
                />
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
      {showPersonnelForm ? (
        <>
          <div className={`opacity-25 ${figmaCopyMode ? "pointer-events-none absolute inset-0" : ""}`}>
            <PersonnelListBackground
              rows={personnelRows}
              unitOptions={personnelOptions.unitOptions}
              degreeOptions={personnelOptions.degreeOptions}
              contractOptions={personnelOptions.contractOptions}
              statusOptions={personnelOptions.statusOptions}
            />
          </div>
          <div className={`flex items-start justify-center p-6 pt-7 ${figmaCopyMode ? "relative" : "absolute inset-0"}`}>
            <LargePersonnelForm
              key={editingPersonnel?.code ?? "add"}
              title={personnelFormTitle}
              initialPersonnel={editingPersonnel}
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
              unitOptions={personnelOptions.unitOptions}
              degreeOptions={personnelOptions.degreeOptions}
              roleOptions={personnelOptions.roleOptions}
              contractOptions={personnelOptions.contractOptions}
              statusOptions={personnelOptions.statusOptions}
              certs={certs}
              setCerts={setCerts}
              figmaCopyMode={figmaCopyMode}
              setFigmaCopyMode={setFigmaCopyMode}
              validationStarted={formValidationStarted}
              setValidationStarted={setFormValidationStarted}
              captureSection={captureSection}
              setCaptureSection={setCaptureSection}
              onClose={closePersonnelForm}
              onSave={savePersonnelForm}
              onRequestOfficialSave={requestOfficialSave}
            />
          </div>
          {confirmOfficialSaveOpen ? (
            <ConfirmOfficialSaveModal onCancel={cancelOfficialSave} onConfirm={confirmOfficialSave} />
          ) : null}
        </>
      ) : (
        <PersonnelListBackground
          rows={personnelRows}
          unitOptions={personnelOptions.unitOptions}
          degreeOptions={personnelOptions.degreeOptions}
          contractOptions={personnelOptions.contractOptions}
          statusOptions={personnelOptions.statusOptions}
          addMenuOpen={addMenuOpen}
          onToggleAddMenu={() => setAddMenuOpen((open) => !open)}
          onManualAdd={openManualAdd}
          onExcelImport={openExcelImport}
          onEditPersonnel={(personnel) => {
            setAddMenuOpen(false);
            setNotificationOpen(false);
            setModalOpen(false);
            setExcelImportOpen(false);
            setFigmaCopyMode(false);
            setFormValidationStarted(false);
            setDuplicateId(false);
            setValidationAttempted({});
            setCaptureSection(null);
            setConfirmOfficialSaveOpen(false);
            setPendingOfficialSaveDraft(null);
            setEditingPersonnel(personnel);
          }}
        />
      )}
      {excelImportOpen ? (
        <>
          <div className="absolute inset-0 bg-white/70" />
          <div className="absolute inset-0 grid place-items-center p-6">
            <ExcelImportDialog
              onClose={closeExcelImport}
              existingRows={personnelRows}
              unitOptions={personnelOptions.unitOptions}
              degreeOptions={personnelOptions.degreeOptions}
              contractOptions={personnelOptions.contractOptions}
              statusOptions={personnelOptions.statusOptions}
              onImport={(rows) => {
                setPersonnelRows((current) => [...current, ...rows]);
              }}
            />
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
          <AppHeader label={activeLabel} notifications={expiringContracts} notificationOpen={notificationOpen} onToggleNotifications={() => setNotificationOpen((open) => !open)} />
          {activeView === "ho-so"
            ? personnelContent
            : contractContent}
        </div>
      </div>
    </div>
  );
}
