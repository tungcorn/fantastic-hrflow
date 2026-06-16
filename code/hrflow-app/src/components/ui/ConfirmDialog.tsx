import type { ReactNode } from 'react'
import { AlertTriangle, Info } from 'lucide-react'

/**
 * Reusable confirmation dialog rendered as a fixed full-viewport overlay,
 * so it always sits on top of whatever triggered it (a form, a modal, the shell).
 */
export function ConfirmDialog({
  title,
  description,
  confirmLabel = 'Xác nhận',
  cancelLabel = 'Hủy',
  danger,
  onConfirm,
  onCancel,
}: {
  title: string
  description?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/30 p-6 backdrop-blur-[2px]">
      <section className="w-full max-w-[440px] rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="border-b border-slate-100 px-5 py-4">
          <div className="flex items-start gap-3">
            <div
              className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                danger ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-700'
              }`}
            >
              {danger ? <AlertTriangle size={19} /> : <Info size={19} />}
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-slate-950">{title}</h3>
              {description ? <p className="mt-1 text-[12.5px] leading-5 text-slate-500">{description}</p> : null}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 px-5 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2 text-[13px] font-semibold text-white ${
              danger ? 'bg-rose-600 hover:bg-rose-700' : 'bg-blue-700 hover:bg-blue-800'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  )
}
