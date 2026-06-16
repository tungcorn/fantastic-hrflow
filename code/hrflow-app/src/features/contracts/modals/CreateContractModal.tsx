import { useState } from 'react'
import { Calendar, CircleUserRound } from 'lucide-react'
import { ContractModalShell } from './ContractModalShell'
import { ContractField, ContractFileUpload, ContractInputBox, ContractSelectBox } from './modalParts'
import { StatusBadge } from '../StatusBadge'
import { contractPersonnelOptions, contractTypeOptions, unitOptions } from '../options'

function PersonnelPreview() {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-col items-center text-center">
        <div className="grid size-20 place-items-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
          <CircleUserRound size={38} />
        </div>
        <h3 className="mt-3 text-[16px] font-semibold text-slate-950">Trần Thị Bình</h3>
        <p className="font-mono text-[12px] font-semibold text-slate-500">CB2022-0118</p>
      </div>
      <dl className="mt-5 space-y-3 text-[13px]">
        <div>
          <dt className="text-[12px] text-slate-500">Đơn vị</dt>
          <dd className="font-medium text-slate-900">Khoa Công nghệ thông tin</dd>
        </div>
        <div>
          <dt className="text-[12px] text-slate-500">Chức vụ</dt>
          <dd className="font-medium text-slate-900">Giảng viên chính</dd>
        </div>
        <div>
          <dt className="text-[12px] text-slate-500">Hợp đồng hiện tại</dt>
          <dd className="mt-1">
            <StatusBadge value="Sắp hết hạn" />
          </dd>
        </div>
      </dl>
    </aside>
  )
}

export function CreateContractModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)

  return (
    <ContractModalShell
      title="Tạo hợp đồng"
      subtitle="Nhập thông tin hợp đồng mới và kiểm tra điều kiện hiệu lực trước khi tạo."
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
            Tạo hợp đồng
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-[minmax(0,1fr)_360px] gap-6">
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="grid grid-cols-2 gap-4">
              <ContractField
                label="Nhân sự liên kết"
                required
                error={submitted ? 'Nhân sự chưa đủ điều kiện tạo hợp đồng mới.' : undefined}
              >
                <ContractSelectBox
                  value="CB2022-0118 · Trần Thị Bình"
                  options={contractPersonnelOptions}
                  searchable
                  label="Nhân sự"
                />
              </ContractField>
              <ContractField
                label="Loại hợp đồng"
                required
                error={submitted ? 'Loại hợp đồng này đã ngừng sử dụng cho hợp đồng mới.' : undefined}
              >
                <ContractSelectBox value="Xác định thời hạn" options={contractTypeOptions} label="Loại" />
              </ContractField>
              <ContractField label="Số hợp đồng" required error={submitted ? 'Số hợp đồng đã tồn tại.' : undefined}>
                <ContractInputBox value="HĐLĐ-2026-0168" />
              </ContractField>
              <ContractField
                label="Ngày ký"
                required
                error={submitted ? 'Ngày ký không được sau ngày bắt đầu hợp đồng.' : undefined}
              >
                <ContractInputBox value="30/05/2026" icon={<Calendar size={15} />} />
              </ContractField>
              <ContractField
                label="Ngày bắt đầu"
                required
                error={submitted ? 'Khoảng thời gian hợp đồng bị chồng lấn với hợp đồng hiện có.' : undefined}
              >
                <ContractInputBox value="01/07/2026" icon={<Calendar size={15} />} />
              </ContractField>
              <ContractField
                label="Ngày kết thúc"
                required
                error={
                  submitted ? 'Ngày kết thúc phải sau ngày bắt đầu và phù hợp với loại hợp đồng đã chọn.' : undefined
                }
              >
                <ContractInputBox value="30/06/2029" icon={<Calendar size={15} />} />
              </ContractField>
              <ContractField
                label="Hệ số lương áp dụng"
                required
                error={submitted ? 'Vui lòng nhập hệ số lương hợp lệ.' : undefined}
              >
                <ContractInputBox value="3.00" />
              </ContractField>
              <ContractField label="Phụ cấp">
                <ContractInputBox value="0.30 phụ cấp chức vụ" />
              </ContractField>
              <div className="col-span-2">
                <ContractField
                  label="Đơn vị công tác theo hợp đồng"
                  required
                  error={submitted ? 'Vui lòng chọn đơn vị công tác theo hợp đồng.' : undefined}
                >
                  <ContractSelectBox value="Khoa Công nghệ thông tin" options={unitOptions} searchable label="Đơn vị" />
                </ContractField>
              </div>
              <div className="col-span-2">
                <ContractField label="Upload file hợp đồng PDF" required>
                  <ContractFileUpload
                    label="Tải file hợp đồng PDF"
                    error={submitted ? 'Vui lòng tải file hợp đồng PDF.' : undefined}
                  />
                </ContractField>
              </div>
            </div>
          </section>
          <PersonnelPreview />
        </div>
      </div>
    </ContractModalShell>
  )
}
