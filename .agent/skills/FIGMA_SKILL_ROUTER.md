# Figma Skill Router — HRMS TTNM

File này dùng để chọn đúng skill Figma/UI khi thiết kế phần **III. Phác họa thiết kế** và **IV. Xây dựng storyboard** cho đề tài **Hệ thống Quản lý Nhân sự (HRMS) — Trường Đại học Thủy Lợi**.

## 1. Bảng chọn Skill Figma

| Việc cần làm | Skill nên dùng | Khi nào dùng | Kết quả mong đợi |
| --- | --- | --- | --- |
| Tạo file Figma mới cho nhóm | `figma-create-new-file` | Khi cần tạo file thiết kế HRMS chung từ đầu. | Một file Figma design mới để nhóm chia frame theo từng nhiệm vụ. |
| Thao tác trong file Figma | `figma-use` | Khi cần tạo/sửa frame, auto-layout, text, bảng, form, component trong Figma. | Các frame UI được dựng trực tiếp trong file Figma. |
| Sinh màn hình từ mô tả nhiệm vụ | `figma-generate-design` | Khi đã có mô tả nhiệm vụ/scenario và muốn tạo màn hình UI tương ứng. | Màn hình danh sách, form, dashboard, dialog hoặc storyboard frame. |
| Đọc/kiểm tra link Figma | `figma` | Khi có link Figma/frame/node và cần lấy context, screenshot, asset hoặc đối chiếu thiết kế. | Hiểu cấu trúc thiết kế, kiểm tra ảnh chụp và node liên quan. |
| Tạo quy tắc giao diện thống nhất | `figma-create-design-system-rules` | Khi bắt đầu phần III-IV hoặc trước khi chia việc cho từng thành viên. | Quy định chung về màu, font, spacing, button, table, form, dialog. |

## 2. Luồng Làm Figma Khuyến Nghị

```text
Bước 1: figma-create-design-system-rules
  → Thống nhất style HRMS: màu, font, layout, component.

Bước 2: figma-create-new-file
  → Tạo file Figma chung cho nhóm.

Bước 3: figma-generate-design + figma-use
  → Dựng từng màn hình theo 5 nhiệm vụ.

Bước 4: figma
  → Đọc lại link/frame, kiểm tra screenshot và đối chiếu tính nhất quán.
```

## 3. Cấu Trúc File Figma Nên Tạo

Nên chia file Figma thành các page hoặc section sau:

| Page/Section | Nội dung |
| --- | --- |
| `00 - Design System` | Màu, font, button, input, table, badge, dialog, sidebar. |
| `01 - Task 1 - Danh sách hồ sơ` | Màn hình tra cứu/xem danh sách hồ sơ nhân sự. |
| `02 - Task 2 - Thêm hồ sơ` | Wizard/form thêm mới hồ sơ nhân sự. |
| `03 - Task 3 - Hợp đồng` | Danh sách hợp đồng sắp hết hạn, tab hợp đồng, form gia hạn. |
| `04 - Task 4 - Báo cáo` | Dashboard thống kê, bộ lọc, bảng/biểu đồ, xuất Excel/PDF. |
| `05 - Task 5 - Đào tạo` | Danh sách khóa đào tạo, chi tiết khóa, xác nhận đăng ký. |
| `06 - Storyboards` | Các frame dạng câu chuyện cho từng kịch bản. |

## 4. Quy Tắc Thiết Kế Chung Cho HRMS

- Giao diện dạng web app quản trị, ưu tiên rõ ràng và dễ thao tác hơn trang trí.
- Dùng layout chính gồm sidebar trái, header trên và vùng nội dung trung tâm.
- Các màn hình nghiệp vụ nên dùng bảng dữ liệu, bộ lọc, badge trạng thái và nút hành động rõ ràng.
- Form nên chia nhóm thông tin: cá nhân, công tác, hợp đồng, tài liệu đính kèm.
- Dialog xác nhận dùng cho thao tác quan trọng như lưu hợp đồng, đăng ký khóa, xuất báo cáo.
- Màu cảnh báo phải nhất quán: hợp đồng sắp hết hạn, thiếu tài liệu, lỗi trùng dữ liệu.
- Tất cả frame nên có cùng kích thước desktop cơ bản, ví dụ `1440 x 900`.

## 5. Prompt Router Mẫu

### Tạo file Figma

```text
Dùng skill figma-create-new-file để tạo file Figma design tên "HRMS TTNM - Prototype".
```

### Tạo design system

```text
Dùng skill figma-create-design-system-rules để tạo quy tắc UI cho HRMS: sidebar, bảng dữ liệu, form, dialog, badge trạng thái, màu cảnh báo và typography.
```

### Dựng màn hình nhiệm vụ 1

```text
Dùng skill figma-generate-design và figma-use để dựng màn hình "Tra cứu/xem danh sách hồ sơ nhân sự" cho HRMS. Màn hình gồm sidebar, ô tìm kiếm, bộ lọc đơn vị/trạng thái, bảng danh sách hồ sơ và nút xem chi tiết.
```

### Dựng màn hình nhiệm vụ 2

```text
Dùng skill figma-generate-design và figma-use để dựng wizard "Thêm mới hồ sơ nhân sự" gồm các bước: thông tin cá nhân, thông tin công tác, tài liệu đính kèm, xác nhận lưu.
```

### Dựng storyboard

```text
Dùng skill figma-generate-design và figma-use để tạo storyboard cho kịch bản "Thêm mới hồ sơ nhân sự", gồm 5 frame: mở danh sách, bấm thêm hồ sơ, nhập thông tin, đính kèm tài liệu, lưu thành công.
```

## 6. Phân Công Figma Gợi Ý

| Thành viên | Phần Figma chính | Frame cần bàn giao |
| --- | --- | --- |
| Nguyễn Hải Ninh | Nhiệm vụ 1: Tra cứu/xem danh sách hồ sơ | Danh sách hồ sơ, bộ lọc, xem nhanh, mở chi tiết. |
| Ngô Quang Tùng | Nhiệm vụ 2: Thêm mới hồ sơ nhân sự | Wizard thêm hồ sơ, kiểm tra trùng, upload tài liệu, lưu thành công. |
| Ngô Đức Nam Khánh | Nhiệm vụ 3: Tạo/gia hạn hợp đồng | Hợp đồng sắp hết hạn, tab hợp đồng, form gia hạn, dialog xác nhận. |
| Nguyễn Hồng Phúc | Nhiệm vụ 4: Thống kê/xuất báo cáo | Dashboard, bộ lọc, bảng/biểu đồ, dialog xuất Excel/PDF. |
| Cả nhóm | Nhiệm vụ 5: Đăng ký khóa đào tạo | Mỗi người hỗ trợ 1 frame nhỏ: danh sách khóa, chi tiết khóa, xác nhận, trạng thái đã đăng ký. |

## 7. Checklist Trước Khi Nộp

- Có đủ 5 nhiệm vụ chính trong phần III.
- Mỗi nhiệm vụ có ít nhất 2-3 màn hình/phác họa quan trọng.
- Mỗi storyboard có nhân vật, bối cảnh, mục tiêu và 4-5 cảnh.
- Các frame dùng cùng sidebar, header, màu, font và component.
- Tên màn hình trong Figma khớp với tên nhiệm vụ trong báo cáo.
- Có thể chụp ảnh frame Figma để đưa vào Word/PDF phần III-IV.
