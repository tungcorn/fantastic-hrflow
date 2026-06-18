import { useState, type ReactNode } from 'react'
import { Plus, Save, Trash2, X } from 'lucide-react'
import { Field } from '../../components/ui/Field'
import { Input } from '../../components/ui/Input'
import { FileButton } from '../../components/ui/FileButton'
import { SectionCard } from '../../components/ui/SectionCard'
import type { CredentialItem } from './types'

export function CredentialSection({
  title,
  description,
  icon,
  optional,
  items,
  setItems,
  itemLabel,
  namePlaceholder,
  requiredMinimum,
  showError,
}: {
  title: string
  description: string
  icon: ReactNode
  optional?: boolean
  items: CredentialItem[]
  setItems: (value: CredentialItem[] | ((items: CredentialItem[]) => CredentialItem[])) => void
  itemLabel: string
  namePlaceholder: string
  requiredMinimum?: boolean
  showError?: boolean
}) {
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState<CredentialItem>({ name: '', place: '' })
  const canSave = draft.name.trim().length > 0 && draft.place.trim().length > 0

  const resetDraft = () => {
    setDraft({ name: '', place: '' })
    setAdding(false)
  }

  const saveDraft = () => {
    if (!canSave) return

    setItems((current) => [...current, { name: draft.name.trim(), place: draft.place.trim() }])
    resetDraft()
  }

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
              ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400'
              : 'border-blue-200 bg-white text-blue-700 hover:bg-blue-50'
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
              const locked = !!requiredMinimum && items.length <= 1
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
                      locked ? 'cursor-not-allowed text-slate-300' : 'text-red-500 hover:bg-red-50'
                    }`}
                    aria-label={`Xóa ${itemLabel}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )
            })
          ) : (
            <div className={`rounded-lg border border-dashed px-3 py-4 text-[12.5px] ${
              showError ? 'border-red-200 bg-red-50 text-red-600' : 'border-slate-200 bg-slate-50/60 text-slate-500'
            }`}>
              {showError
                ? `Bắt buộc phải đính kèm ít nhất 1 ${itemLabel} trước khi lưu hồ sơ.`
                : `Chưa có ${itemLabel}. Nhấn Thêm để bổ sung thông tin.`}
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
                  canSave ? 'bg-blue-700 hover:bg-blue-800' : 'cursor-not-allowed bg-slate-300'
                }`}
              >
                <Save size={13} /> Lưu
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </SectionCard>
  )
}
