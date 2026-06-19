import { lazy, Suspense, useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { usePersonnelStore } from '../../store/personnelStore'
import { PersonnelList } from './PersonnelList'
import { PersonnelForm } from './PersonnelForm'
import { ConfirmOfficialSaveModal } from './ConfirmOfficialSaveModal'

// Lazy-loaded so the heavy `xlsx` dependency is only fetched when the user
// actually opens the Excel import dialog, keeping the initial bundle small.
const ExcelImportDialog = lazy(() =>
  import('./ExcelImportDialog').then((module) => ({ default: module.ExcelImportDialog })),
)
import { defaultCerts, defaultDegrees } from './options'
import { generatePersonnelCode, toPersonnelRecord, toPersonnelRow } from './personnel.utils'
import type { CredentialItem, PersonnelRecord } from './types'

export function PersonnelView({ onBusyChange }: { onBusyChange?: (busy: boolean) => void }) {
  const { rows, options, addRow, addRows, updateRowByCode } = usePersonnelStore()

  const [editingPersonnel, setEditingPersonnel] = useState<PersonnelRecord | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [addMenuOpen, setAddMenuOpen] = useState(false)
  const [excelImportOpen, setExcelImportOpen] = useState(false)
  const [foreigner, setForeigner] = useState(false)
  const [duplicateId, setDuplicateId] = useState(false)
  const [validationStarted, setValidationStarted] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [degrees, setDegrees] = useState<CredentialItem[]>(defaultDegrees)
  const [certs, setCerts] = useState<CredentialItem[]>(defaultCerts)
  const [confirmOfficialSaveOpen, setConfirmOfficialSaveOpen] = useState(false)
  const [pendingOfficialSaveDraft, setPendingOfficialSaveDraft] = useState<PersonnelRecord | null>(null)
  const [savedRecord, setSavedRecord] = useState<{ code: string; name: string } | null>(null)

  const showPersonnelForm = modalOpen || editingPersonnel !== null
  const personnelFormTitle = editingPersonnel ? 'Sửa hồ sơ nhân sự' : 'Thêm hồ sơ nhân sự'
  const existingGovernmentIds = rows
    .map(toPersonnelRecord)
    .filter((record) => record.code !== editingPersonnel?.code)
    .map((record) => record.governmentId?.trim())
    .filter((value): value is string => !!value)

  // Report whether a form/dialog with unsaved input is open, so the shell can
  // warn before the user navigates away and loses it.
  useEffect(() => {
    onBusyChange?.(showPersonnelForm || excelImportOpen)
    return () => onBusyChange?.(false)
  }, [showPersonnelForm, excelImportOpen, onBusyChange])

  const resetValidation = () => {
    setShowErrors(false)
    setDuplicateId(false)
    setValidationStarted(false)
    setConfirmOfficialSaveOpen(false)
    setPendingOfficialSaveDraft(null)
  }

  const openManualAdd = () => {
    setEditingPersonnel(null)
    setModalOpen(true)
    setAddMenuOpen(false)
    setExcelImportOpen(false)
    setForeigner(false)
    setDegrees(defaultDegrees)
    setCerts(defaultCerts)
    resetValidation()
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingPersonnel(null)
    setAddMenuOpen(false)
    setExcelImportOpen(false)
    resetValidation()
  }

  const closePersonnelForm = () => {
    if (!editingPersonnel) {
      closeModal()
      return
    }
    setEditingPersonnel(null)
    setAddMenuOpen(false)
    setExcelImportOpen(false)
    resetValidation()
  }

  const savePersonnelForm = (updated: PersonnelRecord) => {
    if (editingPersonnel) {
      updateRowByCode(editingPersonnel.code, toPersonnelRow({ ...updated, code: editingPersonnel.code }))
      closePersonnelForm()
      return
    }

    const code = generatePersonnelCode(rows)
    addRow(toPersonnelRow({ ...updated, code }))
    setSavedRecord({ code, name: updated.name || 'Hồ sơ mới' })
    setModalOpen(false)
  }

  const requestOfficialSave = (draft: PersonnelRecord) => {
    setPendingOfficialSaveDraft(draft)
    setConfirmOfficialSaveOpen(true)
  }

  const cancelOfficialSave = () => {
    setConfirmOfficialSaveOpen(false)
    setPendingOfficialSaveDraft(null)
  }

  const confirmOfficialSave = () => {
    if (!pendingOfficialSaveDraft) return
    savePersonnelForm(pendingOfficialSaveDraft)
    setConfirmOfficialSaveOpen(false)
    setPendingOfficialSaveDraft(null)
  }

  const openExcelImport = () => {
    setEditingPersonnel(null)
    setModalOpen(false)
    setAddMenuOpen(false)
    setExcelImportOpen(true)
  }

  const closeExcelImport = () => {
    setExcelImportOpen(false)
    setAddMenuOpen(false)
  }

  const resetForAnotherProfile = () => {
    setSavedRecord(null)
    setEditingPersonnel(null)
    setForeigner(false)
    setDegrees(defaultDegrees)
    setCerts(defaultCerts)
    resetValidation()
    setModalOpen(true)
    setAddMenuOpen(false)
    setExcelImportOpen(false)
  }

  if (savedRecord) {
    return (
      <div className="relative min-h-[calc(100vh-58px)] overflow-hidden bg-white">
        <div className="opacity-25">
          <PersonnelList
            rows={rows}
            unitOptions={options.unitOptions}
            degreeOptions={options.degreeOptions}
            contractOptions={options.contractOptions}
            statusOptions={options.statusOptions}
          />
        </div>
        <div className="absolute inset-0 grid place-items-center p-6">
          <section className="w-full max-w-[620px] rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={34} />
            </div>
            <h1 className="mt-5 text-[22px] font-semibold text-slate-950">Hồ sơ nhân sự đã được tạo</h1>
            <p className="mt-2 text-[13px] leading-6 text-slate-500">
              Hệ thống đã lưu hồ sơ của {savedRecord.name} và sinh mã cán bộ chính thức.
            </p>
            <div className="mx-auto mt-5 w-fit rounded-xl bg-blue-50 px-5 py-3 ring-1 ring-blue-100">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-blue-700">Mã cán bộ</div>
              <div className="mt-1 font-mono text-[20px] font-bold text-blue-900">{savedRecord.code}</div>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => setSavedRecord(null)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
              >
                Xem hồ sơ
              </button>
              <button
                onClick={resetForAnotherProfile}
                className="rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-semibold text-white hover:bg-blue-800"
              >
                Thêm hồ sơ khác
              </button>
            </div>
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-[calc(100vh-58px)] overflow-hidden bg-white">
      {showPersonnelForm ? (
        <>
          <div className="opacity-25">
            <PersonnelList
              rows={rows}
              unitOptions={options.unitOptions}
              degreeOptions={options.degreeOptions}
              contractOptions={options.contractOptions}
              statusOptions={options.statusOptions}
            />
          </div>
          <div className="absolute inset-0 flex items-start justify-center p-6 pt-7">
            <PersonnelForm
              key={editingPersonnel?.code ?? 'add'}
              title={personnelFormTitle}
              initialPersonnel={editingPersonnel}
              foreigner={foreigner}
              setForeigner={setForeigner}
              duplicateId={duplicateId}
              setDuplicateId={setDuplicateId}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
              degrees={degrees}
              setDegrees={setDegrees}
              unitOptions={options.unitOptions}
              degreeOptions={options.degreeOptions}
              roleOptions={options.roleOptions}
              contractOptions={options.contractOptions}
              statusOptions={options.statusOptions}
              existingGovernmentIds={existingGovernmentIds}
              certs={certs}
              setCerts={setCerts}
              validationStarted={validationStarted}
              setValidationStarted={setValidationStarted}
              onClose={closePersonnelForm}
              onRequestOfficialSave={requestOfficialSave}
            />
          </div>
          {confirmOfficialSaveOpen ? (
            <ConfirmOfficialSaveModal onCancel={cancelOfficialSave} onConfirm={confirmOfficialSave} />
          ) : null}
        </>
      ) : (
        <PersonnelList
          rows={rows}
          unitOptions={options.unitOptions}
          degreeOptions={options.degreeOptions}
          contractOptions={options.contractOptions}
          statusOptions={options.statusOptions}
          addMenuOpen={addMenuOpen}
          onToggleAddMenu={() => setAddMenuOpen((open) => !open)}
          onManualAdd={openManualAdd}
          onExcelImport={openExcelImport}
          onEditPersonnel={(personnel) => {
            setAddMenuOpen(false)
            setModalOpen(false)
            setExcelImportOpen(false)
            setForeigner(!!personnel.foreigner)
            setDegrees(personnel.degrees ?? defaultDegrees)
            setCerts(personnel.certs ?? defaultCerts)
            resetValidation()
            setEditingPersonnel(personnel)
          }}
        />
      )}
      {excelImportOpen ? (
        <>
          <div className="absolute inset-0 bg-white/70" />
          <div className="absolute inset-0 grid place-items-center p-6">
            <Suspense
              fallback={
                <div className="rounded-2xl bg-white px-6 py-5 text-[13px] text-slate-500 shadow-2xl ring-1 ring-slate-200">
                  Đang tải công cụ nhập Excel…
                </div>
              }
            >
              <ExcelImportDialog
                onClose={closeExcelImport}
                existingRows={rows}
                unitOptions={options.unitOptions}
                degreeOptions={options.degreeOptions}
                roleOptions={options.roleOptions}
                contractOptions={options.contractOptions}
                statusOptions={options.statusOptions}
                onImport={(importedRows) => {
                  addRows(importedRows)
                }}
              />
            </Suspense>
          </div>
        </>
      ) : null}
    </div>
  )
}
