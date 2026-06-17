import { Building2 } from 'lucide-react'

export function PlaceholderView({ title }: { title: string }) {
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
  )
}
