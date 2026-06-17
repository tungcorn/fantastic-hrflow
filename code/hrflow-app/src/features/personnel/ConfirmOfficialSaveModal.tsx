import { Info, UserPlus } from 'lucide-react'

export function ConfirmOfficialSaveModal({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
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
                Hồ sơ sẽ được tạo chính thức và chuyển sang trạng thái quản lý. Bạn vẫn có thể cập nhật bổ sung sau nếu
                quy trình cho phép.
              </p>
            </div>
          </div>
        </div>
        <div className="px-5 py-4">
          <div className="rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-[12.5px] leading-5 text-blue-900">
            Hãy kiểm tra lại thông tin quan trọng như họ tên, CCCD, đơn vị công tác và tài liệu bắt buộc trước khi xác
            nhận.
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
  )
}
