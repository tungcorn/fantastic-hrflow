import { useRef } from 'react'
import { Upload } from 'lucide-react'

export function FileButton({
  label = 'Tải PDF',
  accept = '.pdf',
  onFileSelected,
}: {
  label?: string
  accept?: string
  onFileSelected?: (file: File) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) onFileSelected?.(file)
          event.target.value = ''
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-[12px] font-medium text-slate-700 hover:bg-slate-50"
      >
        <Upload size={15} /> {label}
      </button>
    </>
  )
}
