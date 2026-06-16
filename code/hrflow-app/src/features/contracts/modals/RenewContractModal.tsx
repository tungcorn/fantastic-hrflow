import { useState } from 'react'
import { Calendar } from 'lucide-react'
import { ContractModalShell } from './ContractModalShell'
import { ContractField, ContractFileUpload, ContractInputBox, ContractSelectBox } from './modalParts'
import { StatusBadge } from '../StatusBadge'
import { contractTypeOptions } from '../options'

export function RenewContractModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)

  return (
    <ContractModalShell
      title="Gia hạn hợp đồng"
      subtitle="Tạo hợp đồng kế tiếp dựa trên thông tin hợp đồng hiện tại."
      onClose={onClose}
      footer={
        <>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
          >
            Hủy
          </button>
          <button
            onClick={() => setSubmitted(true)}
            className="rounded-lg bg-blue-700 px-4 py-2 text-[13px] font-medium text-white hover:bg-blue-800"
          >
            Xác nhận gia hạn
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <section className="rounded-xl border border-slate-200 bg-slate-50 p-5 ring-1 ring-slate-100">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[15px] font-semibold text-slate-950">Hợp đồng cũ</h3>
              <p className="mt-1 text-[12px] leading-5 text-slate-500">
                Thông tin tham chiếu chỉ xem, dùng để đối chiếu trước khi tạo hợp đồng gia hạn.
              </p>
            </div>
            <span className="inline-flex h-6 items-center rounded-full border border-slate-200 bg-white px-2.5 text-[11px] font-semibold text-slate-500">
              Chỉ xem
            </span>
          </div>
          <div className="grid grid-cols-5 gap-3 text-[13px]">
            {['HĐLĐ-2025-0098', 'Xác định thời hạn 36 tháng', '01/07/2023', '30/06/2026'].map((value, index) => (
              <div key={value} className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                <div className="text-[11px] text-slate-500">
                  {['Số hợp đồng', 'Loại hợp đồng', 'Ngày bắt đầu', 'Ngày hết hạn'][index]}
                </div>
                <div className="mt-0.5 font-medium text-slate-900">{value}</div>
              </div>
            ))}
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
              <div className="text-[11px] text-slate-500">Trạng thái</div>
              <div className="mt-1">
                <StatusBadge value="Sắp hết hạn" />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-[15px] font-semibold text-slate-950">Thông tin gia hạn</h3>
          <div className="grid grid-cols-2 gap-4">
            <ContractField
              label="Loại hợp đồng mới"
              required
              error={submitted ? 'Loại hợp đồng này đã ngừng sử dụng cho hợp đồng mới.' : undefined}
            >
              <ContractSelectBox value="Xác định thời hạn" options={contractTypeOptions} label="Loại" />
            </ContractField>
            <ContractField
              label="Ngày bắt đầu mới"
              required
              hint="Ngày bắt đầu mới được đề xuất dựa trên ngày hết hạn hợp đồng hiện tại."
              error={submitted ? 'Ngày bắt đầu mới phải liền sau ngày hết hạn hiện tại.' : undefined}
            >
              <ContractInputBox value="01/07/2026" icon={<Calendar size={15} />} />
            </ContractField>
            <ContractField
              label="Ngày kết thúc mới"
              required
              error={
                submitted ? 'Ngày kết thúc mới phải sau ngày bắt đầu mới và phù hợp với loại hợp đồng đã chọn.' : undefined
              }
            >
              <ContractInputBox value="30/06/2029" icon={<Calendar size={15} />} />
            </ContractField>
            <ContractField label="Hệ số lương" required error={submitted ? 'Vui lòng nhập hệ số lương hợp lệ.' : undefined}>
              <ContractInputBox value="3.33" />
            </ContractField>
            <ContractField label="Phụ cấp">
              <ContractInputBox value="0.30 phụ cấp trách nhiệm" />
            </ContractField>
            <ContractField label="Upload file hợp đồng gia hạn" required>
              <ContractFileUpload
                label="Tải file gia hạn"
                error={submitted ? 'Vui lòng tải file hợp đồng gia hạn.' : undefined}
              />
            </ContractField>
          </div>
        </section>
      </div>
    </ContractModalShell>
  )
}
