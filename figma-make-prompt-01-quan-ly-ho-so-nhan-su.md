# Prompt Figma Make 01 - Quản lý hồ sơ nhân sự

Copy toàn bộ prompt dưới đây vào Figma Make.

```text
Bạn là UI/UX designer thiết kế nguyên mẫu giao diện cho báo cáo môn Tương tác Người - Máy.

Hãy tạo giao diện web app cho nhiệm vụ “Quản lý hồ sơ nhân sự” trong hệ thống HRMS - Hệ thống Quản lý Nhân sự Trường Đại học Thủy Lợi.

Mục tiêu: Thiết kế đầy đủ các màn hình để Phòng Tổ chức - Cán bộ và Phòng Tài chính - Kế toán có thể xem danh sách, tìm kiếm, lọc, xem chi tiết, thêm mới, chỉnh sửa và xuất hồ sơ nhân sự.

Phong cách chung:
- Giao diện tiếng Việt có dấu đầy đủ.
- Desktop frame: 1440 x 1024.
- Phong cách web admin dashboard hiện đại, rõ ràng, nghiêm túc, phù hợp môi trường đại học.
- Màu chủ đạo: xanh dương đậm, trắng, xám nhạt.
- Màu trạng thái: xanh lá cho “Đang công tác”, cam cho “Chờ gia hạn”, xám cho “Đã thôi việc”, đỏ cho thao tác nguy hiểm.
- Font sans-serif dễ đọc.
- Bo góc nhẹ, không trang trí quá nhiều.

Layout chung:
- Sidebar trái rộng khoảng 260px, nền xanh dương đậm.
- Logo chữ: “TLU HRMS”.
- Dòng phụ: “Quản lý nhân sự”.
- Menu sidebar gồm: Tổng quan, Hồ sơ nhân sự, Hợp đồng lao động, Cơ cấu tổ chức, Tài khoản & phân quyền, Đào tạo, Báo cáo, Nhật ký hệ thống, Cài đặt.
- Menu “Hồ sơ nhân sự” đang được chọn.
- Topbar có breadcrumb “Trang chủ / Hồ sơ nhân sự”, ô tìm kiếm nhanh, icon thông báo, avatar và tên người dùng “Nguyễn Hải Ninh - Phòng TCCB”.

Frame 01: “01_HoSo_DanhSach”
Thiết kế màn hình danh sách hồ sơ nhân sự.

Nội dung chính:
- Tiêu đề: “Quản lý hồ sơ nhân sự”.
- Mô tả: “Tra cứu, thêm mới, chỉnh sửa và xuất thông tin hồ sơ nhân sự.”
- Thanh thao tác:
  - Nút chính “+ Thêm hồ sơ”.
  - Nút phụ “Nhập từ Excel”.
  - Nút phụ “Xuất Excel”.
  - Nút phụ “In PDF”.
- Khu vực bộ lọc:
  - Input tìm kiếm: “Tìm theo mã cán bộ, họ tên, CCCD, email...”.
  - Select “Đơn vị”.
  - Select “Trạng thái làm việc”.
  - Select “Loại hợp đồng”.
  - Select “Trình độ”.
  - Nút “Tìm kiếm”.
  - Nút “Xóa lọc”.
- Bảng danh sách có checkbox chọn dòng, phân trang và các cột:
  - Mã cán bộ
  - Họ tên
  - Đơn vị
  - Chức vụ
  - Loại hợp đồng
  - Trạng thái làm việc
  - Ngày cập nhật
  - Thao tác
- Dữ liệu mẫu:
  - TLU-2026-001 | Nguyễn Văn An | Khoa Công nghệ Thông tin | Giảng viên | Xác định thời hạn | Đang công tác
  - TLU-2025-018 | Trần Thị Bình | Phòng Tổ chức - Cán bộ | Chuyên viên | Không xác định thời hạn | Đang công tác
  - TLU-2024-044 | Lê Quang Minh | Khoa Kinh tế và Quản lý | Giảng viên | Thử việc | Chờ gia hạn
- Cột thao tác gồm các nút/icon: “Xem”, “Sửa”, “Thôi việc”.

Frame 02: “02_HoSo_ChiTiet”
Thiết kế màn hình chi tiết hồ sơ nhân sự.

Nội dung:
- Header hồ sơ gồm ảnh đại diện, họ tên, mã cán bộ, đơn vị, chức vụ, trạng thái.
- Nút “Sửa hồ sơ”, “Tạo hợp đồng”, “Xuất PDF”.
- Tabs:
  - Thông tin chung
  - Trình độ & Chức danh
  - Lương & Phụ cấp
  - Hợp đồng
  - Công tác
  - Khen thưởng/Kỷ luật
  - Tài liệu đính kèm
- Tab “Thông tin chung” hiển thị dạng 2 cột: họ tên, ngày sinh, giới tính, CCCD, email, số điện thoại, địa chỉ, ngày vào trường.
- Tab “Hợp đồng” có bảng nhỏ: số hợp đồng, loại hợp đồng, ngày ký, ngày hiệu lực, ngày hết hạn, trạng thái.

Frame 03: “03_HoSo_Modal_ThemMoi”
Thiết kế modal/form “Thêm mới hồ sơ nhân sự” dạng wizard.

Các bước wizard:
1. Thông tin cá nhân
2. Thông tin công tác
3. Lương & phụ cấp
4. Tài liệu đính kèm
5. Xác nhận

Input cần có:
- Họ tên, ngày sinh, giới tính, số CCCD, email, số điện thoại, địa chỉ liên hệ.
- Đơn vị công tác, chức vụ, ngày vào trường, trình độ, chức danh nghề nghiệp.
- Ngạch/bậc, hệ số lương, phụ cấp, số tài khoản ngân hàng.
- Upload CCCD scan, upload bằng cấp/chứng chỉ, upload quyết định tuyển dụng.

Yêu cầu modal:
- Có thanh tiến trình ở đầu modal.
- Có validation message dưới input, ví dụ “Email không đúng định dạng”.
- Có cảnh báo trùng dữ liệu: “Đã tồn tại hồ sơ có CCCD này.”
- Có nút “Lưu nháp”, “Quay lại”, “Tiếp tục”, “Hoàn tất”.

Frame 04: “04_HoSo_Modal_ThoiViec”
Thiết kế modal xác nhận “Đánh dấu thôi việc”.

Nội dung:
- Tiêu đề: “Xác nhận đánh dấu thôi việc”.
- Hiển thị tên nhân sự, mã cán bộ, đơn vị.
- Date picker “Ngày thôi việc”.
- Select “Lý do thôi việc”.
- File upload “Quyết định thôi việc”.
- Cảnh báo: “Thao tác này sẽ ảnh hưởng đến tài khoản và trạng thái hợp đồng.”
- Nút “Hủy” và nút đỏ “Xác nhận thôi việc”.

```

