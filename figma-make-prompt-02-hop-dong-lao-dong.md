# Prompt Figma Make 02 - Tạo và gia hạn hợp đồng lao động

Copy toàn bộ prompt dưới đây vào Figma Make.

```text
Bạn là UI/UX designer thiết kế nguyên mẫu giao diện cho báo cáo môn Tương tác Người - Máy.

Hãy tạo giao diện web app cho nhiệm vụ “Tạo và gia hạn hợp đồng lao động” trong hệ thống HRMS - Hệ thống Quản lý Nhân sự Trường Đại học Thủy Lợi.

Mục tiêu: Thiết kế đầy đủ các màn hình để Phòng Tổ chức - Cán bộ theo dõi hợp đồng, nhận cảnh báo hợp đồng sắp hết hạn, tạo hợp đồng mới, gia hạn hợp đồng và chấm dứt hợp đồng trước hạn.

Phong cách chung:
- Giao diện tiếng Việt có dấu đầy đủ.
- Desktop frame: 1440 x 1024.
- Phong cách web admin dashboard hiện đại, rõ ràng, phù hợp môi trường hành chính đại học.
- Màu chủ đạo: xanh dương đậm, trắng, xám nhạt.
- Màu trạng thái: xanh lá cho “Còn hiệu lực”, cam cho “Sắp hết hạn”, vàng cho “Chờ gia hạn”, xám/đỏ nhạt cho “Hết hiệu lực”.
- Nút nguy hiểm dùng màu đỏ.

Layout chung:
- Sidebar trái rộng khoảng 260px, nền xanh dương đậm.
- Logo chữ: “TLU HRMS”.
- Menu sidebar gồm: Tổng quan, Hồ sơ nhân sự, Hợp đồng lao động, Cơ cấu tổ chức, Tài khoản & phân quyền, Đào tạo, Báo cáo, Nhật ký hệ thống, Cài đặt.
- Menu “Hợp đồng lao động” đang được chọn.
- Topbar có breadcrumb “Trang chủ / Hợp đồng lao động”, ô tìm kiếm nhanh, icon thông báo, avatar và tên người dùng “Nguyễn Hải Ninh - Phòng TCCB”.

Frame 01: “01_HopDong_DanhSach”
Thiết kế màn hình danh sách hợp đồng lao động.

Nội dung:
- Tiêu đề: “Hợp đồng lao động”.
- Mô tả: “Theo dõi hiệu lực hợp đồng, tạo mới và gia hạn hợp đồng cho nhân sự.”
- Summary cards:
  - “Hợp đồng còn hiệu lực” - 328
  - “Sắp hết hạn trong 30 ngày” - 12
  - “Chờ gia hạn” - 7
  - “Đã hết hiệu lực” - 45
- Card cảnh báo nổi bật:
  - Text: “12 hợp đồng sắp hết hạn trong 30 ngày”.
  - Nút “Xem danh sách”.
- Thanh hành động:
  - Nút chính “+ Tạo hợp đồng”.
  - Nút phụ “Xuất danh sách”.
- Bộ lọc:
  - Search “Tìm theo mã cán bộ, họ tên, số hợp đồng...”.
  - Select “Loại hợp đồng”.
  - Select “Trạng thái hợp đồng”.
  - Date range “Khoảng ngày hết hạn”.
  - Select “Đơn vị”.
  - Nút “Tìm kiếm”.
  - Nút “Xóa lọc”.
- Bảng gồm các cột:
  - Số hợp đồng
  - Mã cán bộ
  - Họ tên
  - Loại hợp đồng
  - Ngày hiệu lực
  - Ngày hết hạn
  - Trạng thái
  - Số ngày còn lại
  - Thao tác
- Cột thao tác gồm: “Xem”, “Gia hạn”, “Chấm dứt”.

Frame 02: “02_HopDong_Modal_TaoHopDong”
Thiết kế modal/form “Tạo hợp đồng”.

Input:
- Nhân sự liên kết.
- Loại hợp đồng.
- Số hợp đồng.
- Ngày ký.
- Ngày bắt đầu.
- Ngày kết thúc.
- Hệ số lương áp dụng.
- Phụ cấp.
- Đơn vị công tác theo hợp đồng.
- Upload file hợp đồng PDF.

Bên phải modal có preview thông tin nhân sự:
- Ảnh đại diện.
- Họ tên.
- Mã cán bộ.
- Đơn vị.
- Chức vụ.
- Hợp đồng hiện tại.

Cảnh báo:
- “Khoảng thời gian hợp đồng bị chồng lấn với hợp đồng hiện có.”

Nút:
- “Hủy”.
- “Lưu nháp”.
- “Tạo hợp đồng”.

Frame 03: “03_HopDong_Modal_GiaHan”
Thiết kế modal/form “Gia hạn hợp đồng”.

Nội dung:
- Phần trên hiển thị hợp đồng cũ: số hợp đồng, loại hợp đồng, ngày bắt đầu, ngày hết hạn, trạng thái.
- Phần dưới là thông tin gia hạn:
  - Loại hợp đồng mới.
  - Ngày bắt đầu mới.
  - Ngày kết thúc mới.
  - Hệ số lương.
  - Phụ cấp.
  - Upload file hợp đồng gia hạn.
- Ghi chú: “Ngày bắt đầu mới được đề xuất dựa trên ngày hết hạn hợp đồng hiện tại.”
- Nút “Hủy” và “Xác nhận gia hạn”.

Frame 04: “04_HopDong_Modal_ChamDut”
Thiết kế modal nguy hiểm “Chấm dứt hợp đồng trước hạn”.

Nội dung:
- Tiêu đề màu đỏ.
- Hiển thị số hợp đồng và họ tên nhân sự.
- Date picker “Ngày chấm dứt”.
- Select “Lý do chấm dứt”.
- Upload file quyết định.
- Cảnh báo: “Hợp đồng sẽ chuyển sang trạng thái Hết hiệu lực.”
- Nút “Hủy”.
- Nút đỏ “Xác nhận chấm dứt”.

Frame 05: “05_Storyboard_HopDong”
Tạo storyboard 3 bước:
1. Chuyên viên thấy danh sách hợp đồng sắp hết hạn và chọn một hợp đồng cần xử lý.
2. Chuyên viên mở modal gia hạn, kiểm tra thông tin hợp đồng cũ và nhập thời hạn mới.
3. Hệ thống cập nhật trạng thái hợp đồng và hiển thị thông báo thành công.

Mỗi bước storyboard cần có caption ngắn, số thứ tự rõ ràng và hình giao diện minh họa.
```

