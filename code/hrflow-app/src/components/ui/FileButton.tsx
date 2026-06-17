import { Upload } from 'lucide-react'

export function FileButton({ label = 'Tải PDF' }: { label?: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-[12px] font-medium text-slate-700 hover:bg-slate-50"
    >
      <Upload size={15} /> {label}
    </button>
  )
}
