import { useRef, useState } from 'react'
import {
  AlertCircle,
  ArrowLeft,
  Award,
  Banknote,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  FileBadge,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Save,
  Upload,
  UserPlus,
  X,
} from 'lucide-react'
import { Field } from '../../components/ui/Field'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { SectionCard } from '../../components/ui/SectionCard'
import { FileButton } from '../../components/ui/FileButton'
import { CredentialSection } from './CredentialSection'
import {
  academicRankDegreeOptions,
  generalEducationOptions,
  professionalTitleOptions,
  trainingLevelOptions,
} from './options'
import type { CredentialItem, PersonnelRecord } from './types'

export function PersonnelForm({
  title = 'Thêm hồ sơ nhân sự',
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
  validationStarted,
  setValidationStarted,
  onClose,
  onRequestOfficialSave,
}: {
  title?: string
  initialPersonnel?: PersonnelRecord | null
  foreigner: boolean
  setForeigner: (value: boolean | ((value: boolean) => boolean)) => void
  duplicateId: boolean
  setDuplicateId: (value: boolean) => void
  showErrors: boolean
  setShowErrors: (value: boolean) => void
  degrees: CredentialItem[]
  setDegrees: (value: CredentialItem[] | ((value: CredentialItem[]) => CredentialItem[])) => void
  unitOptions: string[]
  degreeOptions: string[]
  roleOptions: string[]
  contractOptions: string[]
  statusOptions: string[]
  certs: CredentialItem[]
  setCerts: (value: CredentialItem[] | ((value: CredentialItem[]) => CredentialItem[])) => void
  validationStarted: boolean
  setValidationStarted: (value: boolean) => void
  onClose: () => void
  onRequestOfficialSave: (record: PersonnelRecord) => void
}) {
  const [draft, setDraft] = useState<PersonnelRecord>(
    () =>
      initialPersonnel ?? {
        code: '',
        name: '',
        unit: '',
        degree: '',
        role: '',
        contract: '',
        status: '',
      },
  )
  const [gender, setGender] = useState(() => (initialPersonnel ? 'Nam' : ''))
  const [governmentId, setGovernmentId] = useState(() => (initialPersonnel ? '001200001901' : ''))
  const hasErrors = showErrors || duplicateId
  const isEditing = initialPersonnel !== null && initialPersonnel !== undefined
  const formScrollRef = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState('identity')
  const validationState = !validationStarted ? 'idle' : hasErrors ? 'error' : 'valid'
  const errorCount = showErrors ? 20 : duplicateId ? 1 : 0
  const knownConflictingGovernmentIds = new Set(['001200001900'])
  const errorGroups = [
    hasErrors ? 'Thông tin cá nhân' : null,
    showErrors ? 'Liên hệ & quốc tịch' : null,
    showErrors ? 'Công tác & lương' : null,
    showErrors ? 'Học vấn' : null,
    showErrors ? 'Tài liệu' : null,
  ].filter(Boolean)
  const updateDraft = (field: keyof PersonnelRecord, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }))
  }
  const missingRequiredDraftFields =
    !draft.name.trim() ||
    !draft.unit.trim() ||
    !draft.degree.trim() ||
    !draft.role.trim() ||
    !draft.contract.trim() ||
    !draft.status.trim()
  const sections = [
    {
      id: 'identity',
      label: 'Thông tin cá nhân',
      icon: <CircleUserRound size={15} />,
      state: validationState === 'idle' ? 'idle' : hasErrors ? 'error' : 'done',
    },
    {
      id: 'contact',
      label: 'Liên hệ & quốc tịch',
      icon: <Mail size={15} />,
      state: validationState === 'idle' ? 'idle' : showErrors ? 'error' : 'done',
    },
    {
      id: 'work',
      label: 'Công tác & lương',
      icon: <Building2 size={15} />,
      state: validationState === 'idle' ? 'idle' : showErrors ? 'error' : 'done',
    },
    {
      id: 'education',
      label: 'Học vấn',
      icon: <GraduationCap size={15} />,
      state: validationState === 'idle' ? 'idle' : 'done',
    },
    {
      id: 'documents',
      label: 'Tài liệu',
      icon: <FileText size={15} />,
      state: validationState === 'idle' ? 'idle' : showErrors ? 'error' : 'done',
    },
  ]
  const scrollToSection = (id: string) => {
    const container = formScrollRef.current
    const target = container?.querySelector<HTMLElement>(`#${id}`)
    if (!container || !target) return
    setActiveSection(id)
    container.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
  }
  const syncActiveSection = () => {
    const container = formScrollRef.current
    if (!container) return
    const current = sections.reduce((active, section) => {
      const element = container.querySelector<HTMLElement>(`#${section.id}`)
      return element && element.offsetTop <= container.scrollTop + 72 ? section.id : active
    }, sections[0].id)
    setActiveSection(current)
  }

  return (
    <div className="relative flex h-[calc(100vh-96px)] w-full max-w-[1260px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
        <div className="flex items-center gap-3">

          <div>
            <h1 className="text-[17px] font-semibold text-slate-900">{title}</h1>
            <p className="text-[12px] text-slate-500">Form nhập liệu một trang · chia nhóm theo nghiệp vụ hồ sơ</p>
          </div>
        </div>
        <div className="flex items-center gap-2">

          <button onClick={onClose} className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100">
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
              onClick={() => scrollToSection('identity')}
              className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-700 hover:bg-slate-50"
            >
              Đến lỗi đầu tiên
            </button>
          </div>
        </div>
      ) : null}

      <div className="min-h-0 flex-1 bg-slate-50/60">
        <div className="grid h-full grid-cols-[196px_minmax(0,1fr)] gap-4 p-4">
          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-2.5">
            <div className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Nhóm thông tin
            </div>
            <div className="space-y-1">
              {sections.map((section) => {
                const active = activeSection === section.id
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-[12px] font-medium transition ${active ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-100' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      {section.icon}
                      {section.label}
                    </span>
                    {section.state === 'idle' ? (
                      <ChevronRight size={14} className={active ? 'text-blue-600' : 'text-slate-300'} />
                    ) : section.state === 'error' ? (
                      <AlertCircle size={14} className="text-red-600" />
                    ) : section.state === 'warning' ? (
                      <AlertCircle size={14} className="text-amber-600" />
                    ) : (
                      <CheckCircle2 size={14} className={active ? 'text-blue-700' : 'text-slate-400'} />
                    )}
                  </button>
                )
              })}
            </div>
          </aside>

          <main
            ref={formScrollRef}
            onScroll={syncActiveSection}
            className="min-h-0 space-y-4 overflow-y-auto overflow-x-hidden pr-1"
          >
            <div className="space-y-4">
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
                      <Field label="Họ và tên" required error={showErrors ? 'Họ và tên là trường bắt buộc.' : undefined}>
                        <Input
                          value={draft.name}
                          placeholder="Nguyễn Văn A"
                          state={showErrors ? 'error' : 'default'}
                          onChange={(value) => updateDraft('name', value)}
                        />
                      </Field>
                      <Field label="Mã cán bộ">
                        <Input value="" placeholder="Tự động tạo khi lưu" readOnly />
                      </Field>
                      <Field label="Giới tính" required error={showErrors ? 'Vui lòng chọn giới tính.' : undefined}>
                        <Select value={gender} options={['Nam', 'Nữ', 'Khác']} placeholder="Chọn giới tính" onChange={setGender} state={showErrors ? 'error' : 'default'} />
                      </Field>
                      <Field label="Ngày sinh" required error={showErrors ? 'Ngày sinh không hợp lệ.' : undefined}>
                        <Input
                          value={showErrors ? '32/13/2000' : isEditing ? '01/01/2000' : ''}
                          placeholder="01/01/2000"
                          icon={<Calendar size={15} />}
                          state={showErrors ? 'error' : 'default'}
                        />
                      </Field>
                      <Field label="Quê quán" required error={showErrors ? 'Quê quán là trường bắt buộc.' : undefined}>
                        <Input value={isEditing ? 'Hà Nội' : ''} placeholder="Hà Nội" icon={<MapPin size={15} />} state={showErrors ? 'error' : 'default'} />
                      </Field>
                      <div className="col-span-2">
                        <Field label="Số CCCD" required error={showErrors ? 'Số CCCD là trường bắt buộc.' : duplicateId ? 'Đã tồn tại hồ sơ với CCCD này.' : undefined}>
                          <div className="flex gap-2">
                            <div className="min-w-0 flex-1">
                              <Input
                                value={governmentId}
                                placeholder="001200001901"
                                state={showErrors || duplicateId ? 'error' : 'default'}
                                onChange={(value) => {
                                  setGovernmentId(value)
                                  setDuplicateId(false)
                                }}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const normalizedGovernmentId = governmentId.trim()
                                setValidationStarted(true)
                                setDuplicateId(knownConflictingGovernmentIds.has(normalizedGovernmentId))
                              }}
                              className="h-10 shrink-0 rounded-lg border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              Kiểm tra trùng
                            </button>
                          </div>
                        </Field>
                      </div>
                      <Field label="Mã số thuế" required error={showErrors ? 'Mã số thuế là trường bắt buộc.' : undefined}>
                        <Input value={isEditing ? '1200001900' : ''} placeholder="1200001900" state={showErrors ? 'error' : 'default'} />
                      </Field>
                      <Field label="Số BHXH" required error={showErrors ? 'Số BHXH là trường bắt buộc.' : undefined}>
                        <Input value={isEditing ? '00120019' : ''} placeholder="00120019" state={showErrors ? 'error' : 'default'} />
                      </Field>
                      <Field label="Số BHYT" required error={showErrors ? 'Số BHYT là trường bắt buộc.' : undefined}>
                        <Input value={isEditing ? '00120019' : ''} placeholder="00120019" state={showErrors ? 'error' : 'default'} />
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
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${foreigner ? 'bg-blue-700' : 'bg-slate-300'
                        }`}
                    >
                      <span
                        className={`inline-block size-5 transform rounded-full bg-white shadow transition ${foreigner ? 'translate-x-5' : 'translate-x-0.5'
                          }`}
                      />
                    </button>
                  }
                >
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Email" required error={showErrors ? (isEditing ? 'Email không đúng định dạng.' : 'Vui lòng nhập email.') : undefined}>
                      <Input
                        value={showErrors && isEditing ? 'nguyenvana@' : isEditing ? 'nguyenvana@tlu.edu.vn' : ''}
                        placeholder="nguyenvana@tlu.edu.vn"
                        icon={<Mail size={15} />}
                        state={showErrors ? 'error' : 'default'}
                      />
                    </Field>
                    <Field label="Số điện thoại" required error={showErrors ? 'Số điện thoại là trường bắt buộc.' : undefined}>
                      <Input
                        value={showErrors ? '' : isEditing ? '0987654321' : ''}
                        placeholder="0987654321"
                        icon={<Phone size={15} />}
                        state={showErrors ? 'error' : 'default'}
                      />
                    </Field>
                    <div className="col-span-2">
                      <Field
                        label="Địa chỉ thường trú"
                        required
                        error={showErrors ? 'Vui lòng nhập địa chỉ thường trú.' : undefined}
                      >
                        <Input
                          value={showErrors ? '' : isEditing ? 'Thanh Trì, Hà Nội' : ''}
                          placeholder="Thanh Trì, Hà Nội"
                          icon={<MapPin size={15} />}
                          state={showErrors ? 'error' : 'default'}
                        />
                      </Field>
                    </div>
                    {foreigner ? (
                      <>
                        <Field label="Số Visa" required error={showErrors ? 'Vui lòng nhập số Visa.' : undefined}>
                          <Input placeholder="00-120-019" state={showErrors ? 'error' : 'default'} />
                        </Field>
                        <Field label="Ngày hết hạn Visa" required error={showErrors ? 'Vui lòng nhập ngày hết hạn Visa.' : undefined}>
                          <Input placeholder="01/01/2030" icon={<Calendar size={15} />} state={showErrors ? 'error' : 'default'} />
                        </Field>
                        <Field label="Số Hộ chiếu" required error={showErrors ? 'Vui lòng nhập số Hộ chiếu.' : undefined}>
                          <Input placeholder="00-120-019" state={showErrors ? 'error' : 'default'} />
                        </Field>
                        <Field label="Ngày hết hạn Hộ chiếu" required error={showErrors ? 'Vui lòng nhập ngày hết hạn Hộ chiếu.' : undefined}>
                          <Input placeholder="01/01/2030" icon={<Calendar size={15} />} state={showErrors ? 'error' : 'default'} />
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
                      <Field label="Đơn vị công tác" required error={showErrors ? 'Vui lòng chọn đơn vị công tác.' : undefined}>
                        <Select
                          value={draft.unit}
                          options={unitOptions}
                          placeholder="Khoa Công nghệ thông tin"
                          onChange={(value) => updateDraft('unit', value)}
                          state={showErrors ? 'error' : 'default'}
                        />
                      </Field>
                      <Field label="Bộ môn / phòng ban trực thuộc" required error={showErrors ? 'Vui lòng chọn bộ môn / phòng ban.' : undefined}>
                        <Select
                          value={isEditing ? 'Bộ môn Công nghệ phần mềm' : ''}
                          placeholder="Bộ môn Công nghệ phần mềm"
                          options={['Bộ môn Công nghệ phần mềm', 'Bộ môn Hệ thống thông tin', 'Bộ môn Khoa học dữ liệu']}
                          state={showErrors ? 'error' : 'default'}
                        />
                      </Field>
                      <Field label="Chức vụ hiện tại" required error={showErrors ? 'Vui lòng chọn chức vụ hiện tại.' : undefined}>
                        <Select
                          value={draft.role}
                          options={roleOptions}
                          placeholder="Giảng viên"
                          state={showErrors ? 'error' : 'default'}
                          onChange={(value) => updateDraft('role', value)}
                        />
                      </Field>
                      <Field label="Loại nhân sự" required error={showErrors ? 'Vui lòng chọn loại nhân sự.' : undefined}>
                        <Select
                          value={isEditing ? 'Giảng viên cơ hữu' : ''}
                          placeholder="Giảng viên cơ hữu"
                          options={['Giảng viên cơ hữu', 'Giảng viên thỉnh giảng', 'Chuyên viên']}
                          state={showErrors ? 'error' : 'default'}
                        />
                      </Field>
                      <Field label="Ngày bắt đầu công tác" required error={showErrors ? 'Ngày bắt đầu công tác là trường bắt buộc.' : undefined}>
                        <Input value={isEditing ? '01/06/2026' : ''} placeholder="01/06/2026" icon={<Calendar size={15} />} state={showErrors ? 'error' : 'default'} />
                      </Field>
                      <Field label="Hợp đồng" required error={showErrors ? 'Vui lòng chọn loại hợp đồng.' : undefined}>
                        <Select
                          value={draft.contract}
                          options={contractOptions}
                          placeholder="Còn hiệu lực"
                          onChange={(value) => updateDraft('contract', value)}
                          state={showErrors ? 'error' : 'default'}
                        />
                      </Field>
                      <Field label="Trạng thái hồ sơ" required error={showErrors ? 'Vui lòng chọn trạng thái hồ sơ.' : undefined}>
                        <Select
                          value={draft.status}
                          options={statusOptions}
                          placeholder="Đang hoàn thiện"
                          onChange={(value) => updateDraft('status', value)}
                          state={showErrors ? 'error' : 'default'}
                        />
                      </Field>
                      <div className="col-span-3 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-[12px] text-blue-800">
                        Đường dẫn đơn vị: Trường Đại học Thủy Lợi / {draft.unit || 'Chưa chọn đơn vị'} / Bộ môn Công nghệ
                        phần mềm
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard title="Lương và phụ cấp dự kiến" icon={<Banknote size={18} />}>
                    <div className="grid grid-cols-3 gap-3">
                      <Field label="Ngạch / hạng chức danh" required error={showErrors ? 'Vui lòng chọn ngạch / hạng chức danh.' : undefined}>
                        <Select
                          value={isEditing ? 'Giảng viên hạng III' : ''}
                          placeholder="Giảng viên hạng III"
                          options={['Giảng viên hạng III', 'Giảng viên hạng II', 'Chuyên viên']}
                          state={showErrors ? 'error' : 'default'}
                        />
                      </Field>
                      <Field label="Bậc lương" required error={showErrors ? 'Vui lòng chọn bậc lương.' : undefined}>
                        <Select value={isEditing ? 'Bậc 1' : ''} placeholder="Bậc 1" options={['Bậc 1', 'Bậc 2', 'Bậc 3']} state={showErrors ? 'error' : 'default'} />
                      </Field>
                      <Field label="Hệ số lương" required error={showErrors ? 'Hệ số lương phải là số lớn hơn 0.' : undefined}>
                        <Input value={showErrors ? 'abc' : isEditing ? '2.34' : ''} placeholder="2.34" state={showErrors ? 'error' : 'default'} />
                      </Field>
                      <Field label="Phụ cấp chức vụ">
                        <Input value={isEditing ? '0.00' : ''} placeholder="0.00" />
                      </Field>
                      <Field label="Phụ cấp thâm niên">
                        <Input value={isEditing ? '0%' : ''} placeholder="0%" />
                      </Field>
                      <Field label="Nguồn chi trả" required error={showErrors ? 'Vui lòng chọn nguồn chi trả.' : undefined}>
                        <Select
                          value={isEditing ? 'Ngân sách nhà trường' : ''}
                          placeholder="Ngân sách nhà trường"
                          options={['Ngân sách nhà trường', 'Nguồn dự án', 'Nguồn tự chủ']}
                          state={showErrors ? 'error' : 'default'}
                        />
                      </Field>
                    </div>
                  </SectionCard>
                </div>
              </section>

              <section id="education">
                <SectionCard title="Trình độ học vấn" icon={<GraduationCap size={18} />}>
                  <div className="grid grid-cols-4 gap-3">
                    <Field label="Trình độ văn hóa" required error={showErrors ? 'Vui lòng chọn trình độ văn hóa.' : undefined}>
                      <Select value={isEditing ? '12/12' : ''} placeholder="12/12" options={generalEducationOptions} state={showErrors ? 'error' : 'default'} />
                    </Field>
                    <Field label="Trình độ đào tạo" required error={showErrors ? 'Vui lòng chọn trình độ đào tạo.' : undefined}>
                      <Select
                        value={draft.degree}
                        options={Array.from(new Set([...trainingLevelOptions, ...degreeOptions]))}
                        placeholder="Tiến sĩ"
                        onChange={(value) => updateDraft('degree', value)}
                        state={showErrors ? 'error' : 'default'}
                      />
                    </Field>
                    <Field label="Chức danh nghề nghiệp" required error={showErrors ? 'Vui lòng chọn chức danh nghề nghiệp.' : undefined}>
                      <Select
                        value={isEditing ? 'Giảng viên hạng III' : ''}
                        placeholder="Giảng viên hạng III"
                        options={professionalTitleOptions}
                        state={showErrors ? 'error' : 'default'}
                      />
                    </Field>
                    <Field label="Học hàm / Học vị" required error={showErrors ? 'Vui lòng chọn học hàm / học vị.' : undefined}>
                      <Select
                        value={draft.degree}
                        options={Array.from(new Set([...academicRankDegreeOptions, ...degreeOptions]))}
                        placeholder="Tiến sĩ"
                        onChange={(value) => updateDraft('degree', value)}
                        state={showErrors ? 'error' : 'default'}
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
                        ['CCCD/CMND bản scan', showErrors ? 'Thiếu tài liệu' : 'Chưa tải lên', showErrors ? 'error' : 'pending'],
                        ['Quyết định tuyển dụng', showErrors ? 'Thiếu tài liệu' : 'Chưa tải lên', showErrors ? 'error' : 'pending'],
                        ['Sơ yếu lý lịch', showErrors ? 'Thiếu tài liệu' : 'Chưa tải lên', showErrors ? 'error' : 'pending'],
                        ['Giấy khám sức khỏe', showErrors ? 'Thiếu tài liệu' : 'Chưa tải lên', showErrors ? 'error' : 'pending'],
                      ].map(([name, status, tone]) => (
                        <div
                          key={name}
                          className={`rounded-lg border px-3 py-2.5 ${tone === 'error' ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-white'
                            }`}
                        >
                          <div className="text-[12.5px] font-semibold text-slate-900">{name}</div>
                          <div className={`mt-0.5 text-[12px] ${tone === 'error' ? 'text-red-700' : 'text-slate-500'}`}>
                            {status}
                          </div>
                          <div className="mt-2">
                            <FileButton label={tone === 'error' ? 'Tải lên' : tone === 'pending' ? 'Tải lên' : 'Thay file'} />
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
                      showError={showErrors && degrees.length === 0}
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
            <span className="inline-flex items-center gap-1 text-slate-500">Sẵn sàng lưu hồ sơ chính thức.</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
          >
            Hủy
          </button>
          <button
            onClick={() => {
              setValidationStarted(true)
              if (!isEditing && (missingRequiredDraftFields || duplicateId)) {
                setShowErrors(missingRequiredDraftFields)
                setActiveSection('identity')
                formScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
                return
              }
              if (!isEditing) {
                setShowErrors(false)
              }
              onRequestOfficialSave(draft)
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-semibold text-white hover:bg-blue-800"
          >
            <UserPlus size={15} /> Lưu hồ sơ chính thức
          </button>
        </div>
      </div>
    </div>
  )
}
