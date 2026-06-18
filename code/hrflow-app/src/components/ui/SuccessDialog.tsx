import { CheckCircle2 } from 'lucide-react'

/**
 * Success confirmation dialog shown after an action completes (create / renew
 * contract). Rendered as a fixed full-viewport overlay so it sits on top of the
 * list once the originating modal has closed, matching the Figma flow.
 */
export function SuccessDialog({
  title,
  description,
  highlightLabel,
  highlightValue,
  confirmLabel = 'OK',
  onConfirm,
}: {
  title: string
  description?: string
  highlightLabel?: string
  highlightValue?: string
  confirmLabel?: string
  onConfirm: () => void
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/30 p-6 backdrop-blur-[2px]">
      <section className="w-full max-w-[440px] rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={20} />
          </div>
          <div className="min-w-0">
            <h3 className="text-[16px] font-semibold text-slate-950">{title}</h3>
            {description ? <p className="mt-1 text-[12.5px] leading-5 text-slate-500">{description}</p> : null}
          </div>
        </div>

        {highlightValue ? (
          <div className="mt-4 rounded-lg bg-blue-50 px-4 py-3">
            {highlightLabel ? (
              <div className="text-[10px] font-semibold uppercase tracking-wide text-blue-600">{highlightLabel}</div>
            ) : null}
            <div className="mt-0.5 font-mono text-[16px] font-bold text-blue-700">{highlightValue}</div>
          </div>
        ) : null}

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-blue-700 px-5 py-2 text-[13px] font-semibold text-white hover:bg-blue-800"
          >
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  )
}
