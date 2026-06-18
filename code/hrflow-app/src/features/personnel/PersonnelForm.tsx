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

type ValidationErrors = Record<string, string>
type RequiredDocumentKey = 'identityDocument' | 'recruitmentDecision' | 'curriculumVitae' | 'healthCertificate'

const emailPattern = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i
const vietnamesePhonePattern = /^0\d{9}$/
const governmentIdPattern = /^\d{12}$/
const socialInsurancePattern = /^\d{10}$/
const healthInsurancePattern = /^[A-Z0-9]{15}$/i
const isValidEmail = (value: string) => {
  const [localPart] = value.split('@')
  return emailPattern.test(value) && !localPart.startsWith('.') && !localPart.endsWith('.') && !localPart.includes('..')
}

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
  const [department, setDepartment] = useState(() => (initialPersonnel ? 'Bộ môn Công nghệ phần mềm' : ''))
  const [birthDate, setBirthDate] = useState(() => (initialPersonnel ? '2000-01-01' : ''))
  const [hometown, setHometown] = useState(() => (initialPersonnel ? 'Hà Nội' : ''))
  const [taxCode, setTaxCode] = useState(() => (initialPersonnel ? '1200001900' : ''))
  const [bhxhCode, setBhxhCode] = useState(() => (initialPersonnel ? '00120019' : ''))
  const [bhytCode, setBhytCode] = useState(() => (initialPersonnel ? '00120019' : ''))
  const [email, setEmail] = useState(() => (initialPersonnel ? 'nguyenvana@tlu.edu.vn' : ''))
  const [phone, setPhone] = useState(() => (initialPersonnel ? '0987654321' : ''))
  const [address, setAddress] = useState(() => (initialPersonnel ? 'Thanh Trì, Hà Nội' : ''))
  const [visaNumber, setVisaNumber] = useState('')
  const [visaExpiry, setVisaExpiry] = useState('')
  const [passportNumber, setPassportNumber] = useState('')
  const [passportExpiry, setPassportExpiry] = useState('')
  const [personnelType, setPersonnelType] = useState(() => (initialPersonnel ? 'Giảng viên cơ hữu' : ''))
  const [startDate, setStartDate] = useState(() => (initialPersonnel ? '2026-06-01' : ''))
  const [professionalRank, setProfessionalRank] = useState(() => (initialPersonnel ? 'Giảng viên hạng III' : ''))
  const [salaryGrade, setSalaryGrade] = useState(() => (initialPersonnel ? 'Bậc 1' : ''))
  const [salaryCoeff, setSalaryCoeff] = useState(() => (initialPersonnel ? '2.34' : ''))
  const [paymentSource, setPaymentSource] = useState(() => (initialPersonnel ? 'Ngân sách nhà trường' : ''))
  const [generalEdu, setGeneralEdu] = useState(() => (initialPersonnel ? '12/12' : ''))
  const [professionalTitle, setProfessionalTitle] = useState(() => (initialPersonnel ? 'Giảng viên hạng III' : ''))
  const [academicDegree, setAcademicDegree] = useState(() => (initialPersonnel ? 'Tiến sĩ' : ''))
  const [requiredDocuments, setRequiredDocuments] = useState<Partial<Record<RequiredDocumentKey, string>>>({})
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [validatedValues, setValidatedValues] = useState<Record<string, string>>({})
  const currentFieldValues: Record<string, string> = {
    name: draft.name,
    gender,
    birthDate,
    hometown,
    governmentId,
    taxCode,
    bhxhCode,
    bhytCode,
    email,
    phone,
    address,
    visaNumber: foreigner ? visaNumber : '__not-required__',
    visaExpiry: foreigner ? visaExpiry : '__not-required__',
    passportNumber: foreigner ? passportNumber : '__not-required__',
    passportExpiry: foreigner ? passportExpiry : '__not-required__',
    unit: draft.unit,
    department,
    role: draft.role,
    personnelType,
    startDate,
    status: draft.status,
    professionalRank,
    salaryGrade,
    salaryCoeff,
    paymentSource,
    generalEdu,
    degree: draft.degree,
    professionalTitle,
    academicDegree,
    degrees: JSON.stringify(degrees),
    identityDocument: requiredDocuments.identityDocument ?? '',
    recruitmentDecision: requiredDocuments.recruitmentDecision ?? '',
    curriculumVitae: requiredDocuments.curriculumVitae ?? '',
    healthCertificate: requiredDocuments.healthCertificate ?? '',
  }
  const visibleValidationErrors = Object.fromEntries(
    Object.entries(validationErrors).filter(([field]) => currentFieldValues[field] === validatedValues[field]),
  ) as ValidationErrors
  const hasErrors = Object.keys(visibleValidationErrors).length > 0 || duplicateId
  const isEditing = initialPersonnel !== null && initialPersonnel !== undefined
  const formScrollRef = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState('identity')
  const validationState = !validationStarted ? 'idle' : hasErrors ? 'error' : 'valid'
  const knownConflictingGovernmentIds = new Set(['001200001900'])
  const fieldError = (field: string) => visibleValidationErrors[field]
  const hasGroupError = (...fields: string[]) => fields.some((field) => !!visibleValidationErrors[field])
  const identityHasErrors = hasGroupError('name', 'gender', 'birthDate', 'hometown', 'governmentId', 'taxCode', 'bhxhCode', 'bhytCode') || duplicateId
  const contactHasErrors = hasGroupError('email', 'phone', 'address', 'visaNumber', 'visaExpiry', 'passportNumber', 'passportExpiry')
  const workHasErrors = hasGroupError('unit', 'department', 'role', 'personnelType', 'startDate', 'status', 'professionalRank', 'salaryGrade', 'salaryCoeff', 'paymentSource')
  const educationHasErrors = hasGroupError('generalEdu', 'degree', 'professionalTitle', 'academicDegree', 'degrees')
  const documentsHasErrors = hasGroupError('identityDocument', 'recruitmentDecision', 'curriculumVitae', 'healthCertificate')
  const errorGroups = [
    identityHasErrors ? 'Thông tin cá nhân' : null,
    contactHasErrors ? 'Liên hệ & quốc tịch' : null,
    workHasErrors ? 'Công tác & lương' : null,
    educationHasErrors ? 'Học vấn' : null,
    documentsHasErrors ? 'Tài liệu' : null,
  ].filter(Boolean)
  const updateDraft = (field: keyof PersonnelRecord, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }))
  }
  const validateForm = (): ValidationErrors => {
    const errors: ValidationErrors = {}
    const requireValue = (field: string, value: string, message: string) => {
      if (!value.trim()) errors[field] = message
    }

    requireValue('name', draft.name, 'Họ và tên là trường bắt buộc.')
    requireValue('gender', gender, 'Vui lòng chọn giới tính.')
    requireValue('birthDate', birthDate, 'Ngày sinh là trường bắt buộc.')
    requireValue('hometown', hometown, 'Quê quán là trường bắt buộc.')
    requireValue('governmentId', governmentId, 'Số CCCD là trường bắt buộc.')
    requireValue('taxCode', taxCode, 'Mã số thuế là trường bắt buộc.')
    requireValue('bhxhCode', bhxhCode, 'Số BHXH là trường bắt buộc.')
    requireValue('bhytCode', bhytCode, 'Số BHYT là trường bắt buộc.')
    requireValue('email', email, 'Vui lòng nhập email.')
    requireValue('phone', phone, 'Số điện thoại là trường bắt buộc.')
    requireValue('address', address, 'Vui lòng nhập địa chỉ thường trú.')
    if (foreigner) {
      requireValue('visaNumber', visaNumber, 'Vui lòng nhập số Visa.')
      requireValue('visaExpiry', visaExpiry, 'Vui lòng nhập ngày hết hạn Visa.')
      requireValue('passportNumber', passportNumber, 'Vui lòng nhập số Hộ chiếu.')
      requireValue('passportExpiry', passportExpiry, 'Vui lòng nhập ngày hết hạn Hộ chiếu.')
    }
    requireValue('unit', draft.unit, 'Vui lòng chọn đơn vị công tác.')
    requireValue('department', department, 'Vui lòng chọn bộ môn / phòng ban.')
    requireValue('role', draft.role, 'Vui lòng chọn chức vụ hiện tại.')
    requireValue('personnelType', personnelType, 'Vui lòng chọn loại nhân sự.')
    requireValue('startDate', startDate, 'Ngày bắt đầu công tác là trường bắt buộc.')
    requireValue('status', draft.status, 'Vui lòng chọn trạng thái hồ sơ.')
    requireValue('professionalRank', professionalRank, 'Vui lòng chọn ngạch / hạng chức danh.')
    requireValue('salaryGrade', salaryGrade, 'Vui lòng chọn bậc lương.')
    requireValue('salaryCoeff', salaryCoeff, 'Hệ số lương là trường bắt buộc.')
    requireValue('paymentSource', paymentSource, 'Vui lòng chọn nguồn chi trả.')
    requireValue('generalEdu', generalEdu, 'Vui lòng chọn trình độ văn hóa.')
    requireValue('degree', draft.degree, 'Vui lòng chọn trình độ đào tạo.')
    requireValue('professionalTitle', professionalTitle, 'Vui lòng chọn chức danh nghề nghiệp.')
    requireValue('academicDegree', academicDegree, 'Vui lòng chọn học hàm / học vị.')

    if (governmentId.trim() && !governmentIdPattern.test(governmentId.trim())) errors.governmentId = 'Số CCCD phải gồm đúng 12 chữ số.'
    if (knownConflictingGovernmentIds.has(governmentId.trim())) errors.governmentId = 'Đã tồn tại hồ sơ với CCCD này.'
    if (email.trim() && !isValidEmail(email.trim())) errors.email = 'Email không đúng định dạng (ví dụ: ten@tlu.edu.vn).'
    if (phone.trim() && !vietnamesePhonePattern.test(phone.trim())) errors.phone = 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.'
    if (taxCode.trim() && !/^\d{10}(?:\d{3})?$/.test(taxCode.replace(/-/g, ''))) errors.taxCode = 'Mã số thuế phải gồm 10 hoặc 13 chữ số.'
    if (bhxhCode.trim() && !socialInsurancePattern.test(bhxhCode.trim())) errors.bhxhCode = 'Số BHXH phải gồm đúng 10 chữ số.'
    if (bhytCode.trim() && !healthInsurancePattern.test(bhytCode.trim())) errors.bhytCode = 'Số BHYT phải gồm đúng 15 ký tự chữ hoặc số.'
    if (birthDate && birthDate >= new Date().toISOString().slice(0, 10)) errors.birthDate = 'Ngày sinh phải nhỏ hơn ngày hiện tại.'
    if (salaryCoeff.trim() && (!/^\d+(?:\.\d{1,2})?$/.test(salaryCoeff.trim()) || Number(salaryCoeff) <= 0)) errors.salaryCoeff = 'Hệ số lương phải là số dương, tối đa 2 chữ số thập phân.'
    if (degrees.length === 0) errors.degrees = 'Bắt buộc phải đính kèm ít nhất 1 bằng cấp trước khi lưu hồ sơ.'
    if (!requiredDocuments.identityDocument) errors.identityDocument = 'Vui lòng tải lên CCCD/CMND bản scan.'
    if (!requiredDocuments.recruitmentDecision) errors.recruitmentDecision = 'Vui lòng tải lên quyết định tuyển dụng.'
    if (!requiredDocuments.curriculumVitae) errors.curriculumVitae = 'Vui lòng tải lên sơ yếu lý lịch.'
    if (!requiredDocuments.healthCertificate) errors.healthCertificate = 'Vui lòng tải lên giấy khám sức khỏe.'

    return errors
  }
  const errorCount = Object.keys(visibleValidationErrors).length + (duplicateId && !visibleValidationErrors.governmentId ? 1 : 0)
  const sections = [
    {
      id: 'identity',
      label: 'Thông tin cá nhân',
      icon: <CircleUserRound size={15} />,
      state: validationState === 'idle' ? 'idle' : identityHasErrors ? 'error' : 'done',
    },
    {
      id: 'contact',
      label: 'Liên hệ & quốc tịch',
      icon: <Mail size={15} />,
      state: validationState === 'idle' ? 'idle' : contactHasErrors ? 'error' : 'done',
    },
    {
      id: 'work',
      label: 'Công tác & lương',
      icon: <Building2 size={15} />,
      state: validationState === 'idle' ? 'idle' : workHasErrors ? 'error' : 'done',
    },
    {
      id: 'education',
      label: 'Học vấn',
      icon: <GraduationCap size={15} />,
      state: validationState === 'idle' ? 'idle' : educationHasErrors ? 'error' : 'done',
    },
    {
      id: 'documents',
      label: 'Tài liệu',
      icon: <FileText size={15} />,
      state: validationState === 'idle' ? 'idle' : documentsHasErrors ? 'error' : 'done',
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
                      <Field label="Họ và tên" required error={fieldError('name')}>
                        <Input
                          value={draft.name}
                          placeholder="Nguyễn Văn A"
                          state={fieldError('name') ? 'error' : 'default'}
                          onChange={(value) => updateDraft('name', value)}
                        />
                      </Field>
                      <Field label="Giới tính" required error={fieldError('gender')}>
                        <Select value={gender} options={['Nam', 'Nữ', 'Khác']} placeholder="Chọn giới tính" onChange={setGender} state={fieldError('gender') ? 'error' : 'default'} />
                      </Field>
                      <Field label="Ngày sinh" required error={fieldError('birthDate')}>
                        <Input
                          type="date"
                          value={birthDate}
                          onChange={setBirthDate}
                          state={fieldError('birthDate') ? 'error' : 'default'}
                        />
                      </Field>
                      <Field label="Quê quán" required error={fieldError('hometown')}>
                        <Input value={hometown} placeholder="Hà Nội" icon={<MapPin size={15} />} onChange={setHometown} state={fieldError('hometown') ? 'error' : 'default'} />
                      </Field>
                      <div className="col-span-2">
                        <Field label="Số CCCD" required error={fieldError('governmentId') ?? (duplicateId ? 'Đã tồn tại hồ sơ với CCCD này.' : undefined)}>
                          <div className="flex gap-2">
                            <div className="min-w-0 flex-1">
                              <Input
                                value={governmentId}
                                placeholder="001200001901"
                                state={fieldError('governmentId') || duplicateId ? 'error' : 'default'}
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
                                setDuplicateId(knownConflictingGovernmentIds.has(normalizedGovernmentId))
                              }}
                              className="h-10 shrink-0 rounded-lg border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              Kiểm tra trùng
                            </button>
                          </div>
                        </Field>
                      </div>
                      <Field label="Mã số thuế" required error={fieldError('taxCode')}>
                        <Input value={taxCode} placeholder="1200001900" onChange={setTaxCode} state={fieldError('taxCode') ? 'error' : 'default'} />
                      </Field>
                      <Field label="Số BHXH" required error={fieldError('bhxhCode')}>
                        <Input value={bhxhCode} placeholder="0012001900" onChange={setBhxhCode} state={fieldError('bhxhCode') ? 'error' : 'default'} />
                      </Field>
                      <Field label="Số BHYT" required error={fieldError('bhytCode')}>
                        <Input value={bhytCode} placeholder="DN4010120019001" onChange={setBhytCode} state={fieldError('bhytCode') ? 'error' : 'default'} />
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
                    <Field label="Email" required error={fieldError('email')}>
                      <Input
                        value={email}
                        placeholder="nguyenvana@tlu.edu.vn"
                        icon={<Mail size={15} />}
                        onChange={setEmail}
                        state={fieldError('email') ? 'error' : 'default'}
                      />
                    </Field>
                    <Field label="Số điện thoại" required error={fieldError('phone')}>
                      <Input
                        value={phone}
                        placeholder="0987654321"
                        icon={<Phone size={15} />}
                        onChange={setPhone}
                        state={fieldError('phone') ? 'error' : 'default'}
                      />
                    </Field>
                    <div className="col-span-2">
                      <Field
                        label="Địa chỉ thường trú"
                        required
                        error={fieldError('address')}
                      >
                        <Input
                          value={address}
                          placeholder="Thanh Trì, Hà Nội"
                          icon={<MapPin size={15} />}
                          onChange={setAddress}
                          state={fieldError('address') ? 'error' : 'default'}
                        />
                      </Field>
                    </div>
                    {foreigner ? (
                      <>
                        <Field label="Số Visa" required error={fieldError('visaNumber')}>
                          <Input value={visaNumber} onChange={setVisaNumber} placeholder="00-120-019" state={fieldError('visaNumber') ? 'error' : 'default'} />
                        </Field>
                        <Field label="Ngày hết hạn Visa" required error={fieldError('visaExpiry')}>
                          <Input value={visaExpiry} onChange={setVisaExpiry} type="date" state={fieldError('visaExpiry') ? 'error' : 'default'} />
                        </Field>
                        <Field label="Số Hộ chiếu" required error={fieldError('passportNumber')}>
                          <Input value={passportNumber} onChange={setPassportNumber} placeholder="B1234567" state={fieldError('passportNumber') ? 'error' : 'default'} />
                        </Field>
                        <Field label="Ngày hết hạn Hộ chiếu" required error={fieldError('passportExpiry')}>
                          <Input value={passportExpiry} onChange={setPassportExpiry} type="date" state={fieldError('passportExpiry') ? 'error' : 'default'} />
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
                      <Field label="Đơn vị công tác" required error={fieldError('unit')}>
                        <Select
                          value={draft.unit}
                          options={unitOptions}
                          placeholder="Chọn đơn vị công tác"
                          onChange={(value) => updateDraft('unit', value)}
                          state={fieldError('unit') ? 'error' : 'default'}
                        />
                      </Field>
                      <Field label="Bộ môn / phòng ban trực thuộc" required error={fieldError('department')}>
                        <Select
                          value={department}
                          placeholder="Chọn bộ môn / phòng ban"
                          options={['Bộ môn Công nghệ phần mềm', 'Bộ môn Hệ thống thông tin', 'Bộ môn Khoa học dữ liệu']}
                          onChange={setDepartment}
                          state={fieldError('department') ? 'error' : 'default'}
                        />
                      </Field>
                      <Field label="Chức vụ hiện tại" required error={fieldError('role')}>
                        <Select
                          value={draft.role}
                          options={roleOptions}
                          placeholder="Chọn chức vụ hiện tại"
                          state={fieldError('role') ? 'error' : 'default'}
                          onChange={(value) => updateDraft('role', value)}
                        />
                      </Field>
                      <Field label="Loại nhân sự" required error={fieldError('personnelType')}>
                        <Select
                          value={personnelType}
                          placeholder="Chọn loại nhân sự"
                          options={['Giảng viên cơ hữu', 'Giảng viên thỉnh giảng', 'Chuyên viên']}
                          onChange={setPersonnelType}
                          state={fieldError('personnelType') ? 'error' : 'default'}
                        />
                      </Field>
                      <Field label="Ngày bắt đầu công tác" required error={fieldError('startDate')}>
                        <Input type="date" value={startDate} onChange={setStartDate} state={fieldError('startDate') ? 'error' : 'default'} />
                      </Field>
                      <Field label="Trạng thái hồ sơ" required error={fieldError('status')}>
                        <Select
                          value={draft.status}
                          options={statusOptions}
                          placeholder="Chọn trạng thái hồ sơ"
                          onChange={(value) => updateDraft('status', value)}
                          state={fieldError('status') ? 'error' : 'default'}
                        />
                      </Field>
                      <div className="col-span-3 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-[12px] text-blue-800">
                        {draft.unit
                          ? `Đường dẫn đơn vị: Trường Đại học Thủy Lợi / ${draft.unit}${department ? ` / ${department}` : ''}`
                          : 'Sau khi chọn đơn vị và bộ môn, hệ thống sẽ hiển thị đường dẫn tổ chức tại đây.'}
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard title="Lương và phụ cấp dự kiến" icon={<Banknote size={18} />}>
                    <div className="grid grid-cols-3 gap-3">
                      <Field label="Ngạch / hạng chức danh" required error={fieldError('professionalRank')}>
                        <Select
                          value={professionalRank}
                          placeholder="Giảng viên hạng III"
                          options={['Giảng viên hạng III', 'Giảng viên hạng II', 'Chuyên viên']}
                          onChange={setProfessionalRank}
                          state={fieldError('professionalRank') ? 'error' : 'default'}
                        />
                      </Field>
                      <Field label="Bậc lương" required error={fieldError('salaryGrade')}>
                        <Select value={salaryGrade} placeholder="Bậc 1" options={['Bậc 1', 'Bậc 2', 'Bậc 3']} onChange={setSalaryGrade} state={fieldError('salaryGrade') ? 'error' : 'default'} />
                      </Field>
                      <Field label="Hệ số lương" required error={fieldError('salaryCoeff')}>
                        <Input value={salaryCoeff} placeholder="2.34" onChange={setSalaryCoeff} state={fieldError('salaryCoeff') ? 'error' : 'default'} />
                      </Field>
                      <Field label="Phụ cấp chức vụ">
                        <Input value={isEditing ? '0.00' : ''} placeholder="0.00" />
                      </Field>
                      <Field label="Phụ cấp thâm niên">
                        <Input value={isEditing ? '0%' : ''} placeholder="0%" />
                      </Field>
                      <Field label="Nguồn chi trả" required error={fieldError('paymentSource')}>
                        <Select
                          value={paymentSource}
                          placeholder="Ngân sách nhà trường"
                          options={['Ngân sách nhà trường', 'Nguồn dự án', 'Nguồn tự chủ']}
                          onChange={setPaymentSource}
                          state={fieldError('paymentSource') ? 'error' : 'default'}
                        />
                      </Field>
                    </div>
                  </SectionCard>
                </div>
              </section>

              <section id="education">
                <SectionCard title="Trình độ học vấn" icon={<GraduationCap size={18} />}>
                  <div className="grid grid-cols-4 gap-3">
                    <Field label="Trình độ văn hóa" required error={fieldError('generalEdu')}>
                      <Select value={generalEdu} placeholder="12/12" options={generalEducationOptions} onChange={setGeneralEdu} state={fieldError('generalEdu') ? 'error' : 'default'} />
                    </Field>
                    <Field label="Trình độ đào tạo" required error={fieldError('degree')}>
                      <Select
                        value={draft.degree}
                        options={Array.from(new Set([...trainingLevelOptions, ...degreeOptions]))}
                        placeholder="Tiến sĩ"
                        onChange={(value) => updateDraft('degree', value)}
                        state={fieldError('degree') ? 'error' : 'default'}
                      />
                    </Field>
                    <Field label="Chức danh nghề nghiệp" required error={fieldError('professionalTitle')}>
                      <Select
                        value={professionalTitle}
                        placeholder="Giảng viên hạng III"
                        options={professionalTitleOptions}
                        onChange={setProfessionalTitle}
                        state={fieldError('professionalTitle') ? 'error' : 'default'}
                      />
                    </Field>
                    <Field label="Học hàm / Học vị" required error={fieldError('academicDegree')}>
                      <Select
                        value={academicDegree}
                        options={Array.from(new Set([...academicRankDegreeOptions, ...degreeOptions]))}
                        placeholder="Tiến sĩ"
                        onChange={setAcademicDegree}
                        state={fieldError('academicDegree') ? 'error' : 'default'}
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
                      {([
                        ['identityDocument', 'CCCD/CMND bản scan'],
                        ['recruitmentDecision', 'Quyết định tuyển dụng'],
                        ['curriculumVitae', 'Sơ yếu lý lịch'],
                        ['healthCertificate', 'Giấy khám sức khỏe'],
                      ] as const).map(([key, name]) => {
                        const fileName = requiredDocuments[key]
                        const hasError = !!fieldError(key)
                        return (
                        <div
                          key={name}
                          className={`rounded-lg border px-3 py-2.5 ${hasError ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-white'
                            }`}
                        >
                          <div className="text-[12.5px] font-semibold text-slate-900">{name}</div>
                          <div className={`mt-0.5 truncate text-[12px] ${hasError ? 'text-red-700' : fileName ? 'text-emerald-700' : 'text-slate-500'}`}>
                            {hasError ? 'Thiếu tài liệu' : fileName || 'Chưa tải lên'}
                          </div>
                          <div className="mt-2">
                            <FileButton
                              label={fileName ? 'Thay file' : 'Tải lên'}
                              accept=".pdf,.jpg,.jpeg,.png"
                              onFileSelected={(file) => setRequiredDocuments((current) => ({ ...current, [key]: file.name }))}
                            />
                          </div>
                        </div>
                        )
                      })}
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
                      showError={!!fieldError('degrees')}
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
              const errors = validateForm()
              setValidationErrors(errors)
              setValidatedValues(currentFieldValues)
              setDuplicateId(false)
              setShowErrors(Object.keys(errors).length > 0)
              if (Object.keys(errors).length > 0) {
                const firstError = Object.keys(errors)[0]
                const section = [
                  'name', 'gender', 'birthDate', 'hometown', 'governmentId', 'taxCode', 'bhxhCode', 'bhytCode',
                ].includes(firstError)
                  ? 'identity'
                  : ['email', 'phone', 'address', 'visaNumber', 'visaExpiry', 'passportNumber', 'passportExpiry'].includes(firstError)
                    ? 'contact'
                    : ['unit', 'department', 'role', 'personnelType', 'startDate', 'status', 'professionalRank', 'salaryGrade', 'salaryCoeff', 'paymentSource'].includes(firstError)
                      ? 'work'
                      : ['generalEdu', 'degree', 'professionalTitle', 'academicDegree'].includes(firstError)
                        ? 'education'
                        : 'documents'
                scrollToSection(section)
                return
              }
              setShowErrors(false)
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
