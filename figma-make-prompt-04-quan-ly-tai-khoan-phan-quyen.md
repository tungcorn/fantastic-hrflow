# Prompt Figma Make 04 - Quản lý tài khoản và phân quyền

Copy toàn bộ prompt dưới đây vào Figma Make.

```text
Bạn là UI/UX designer thiết kế nguyên mẫu giao diện cho báo cáo môn Tương tác Người - Máy.

Hãy tạo giao diện web app cho nhiệm vụ “Quản lý tài khoản và phân quyền” trong hệ thống HRMS - Hệ thống Quản lý Nhân sự Trường Đại học Thủy Lợi.

Mục tiêu: Thiết kế đầy đủ các màn hình để Quản trị viên tìm kiếm tài khoản, thêm tài khoản, sửa thông tin, phân quyền, khóa/mở khóa, đặt lại mật khẩu và xem nhật ký tài khoản.

Frame 01: “01_TaiKhoan_DanhSach”
Thiết kế màn hình “Quản lý tài khoản người dùng”.

Nội dung:
- Tiêu đề: “Tài khoản & phân quyền”.
- Mô tả: “Cấp tài khoản, phân quyền và kiểm soát trạng thái truy cập hệ thống.”
- Summary cards:
  - “Tổng tài khoản” - 1248.
  - “Đang hoạt động” - 1180.
  - “Bị khóa” - 23.
  - “Chưa đăng nhập 90 ngày” - 45.
- Thanh hành động:
  - Nút chính “+ Thêm tài khoản”.
  - Nút phụ “Xuất danh sách”.
- Bộ lọc:
  - Search “Tìm theo mã cán bộ, họ tên, email...”.
  - Select “Vai trò”.
  - Select “Trạng thái”.
  - Select “Đơn vị”.
  - Nút “Tìm kiếm”.
  - Nút “Xóa lọc”.
- Bảng:
  - Mã cán bộ.
  - Họ tên.
  - Email.
  - Đơn vị.
  - Vai trò.
  - Trạng thái.
  - Lần đăng nhập gần nhất.
  - Thao tác.
- Vai trò badge:
  - Admin.
  - Phòng TCCB.
  - Phòng TCKT.
  - Cán bộ/GV/NV.
- Trạng thái badge:
  - Đang hoạt động.
  - Bị khóa.
  - Chưa kích hoạt.
- Cột thao tác gồm: “Sửa”, “Đặt lại mật khẩu”, “Khóa/Mở khóa”, “Xem nhật ký”.

Frame 02: “02_TaiKhoan_Modal_Them”
Thiết kế modal/form “Thêm tài khoản”.

Input:
- Chọn hồ sơ nhân sự liên kết.
- Email.
- Tên đăng nhập tự sinh.
- Vai trò.
- Trạng thái.
- Checkbox “Gửi mật khẩu tạm thời qua email”.

Bên phải modal có card “Phạm vi quyền của vai trò”:
- Xem hồ sơ.
- Sửa hồ sơ.
- Quản lý hợp đồng.
- Quản lý tài khoản.
- Xem báo cáo.

Nút:
- “Hủy”.
- “Tạo tài khoản”.

Frame 03: “03_TaiKhoan_Modal_SuaPhanQuyen”
Thiết kế modal/form “Sửa tài khoản & phân quyền”.

Input:
- Email.
- Vai trò.
- Trạng thái.
- Ghi chú thay đổi.
- Cảnh báo khi chọn vai trò Admin: “Vai trò Admin có quyền quản trị toàn hệ thống.”
- Nút “Hủy” và “Lưu thay đổi”.

Frame 04: “04_TaiKhoan_Modal_Khoa”
Thiết kế modal nguy hiểm “Khóa tài khoản”.

Nội dung:
- Hiển thị tên tài khoản, email, vai trò.
- Textarea “Lý do khóa”.
- Cảnh báo: “Người dùng sẽ không thể đăng nhập sau khi tài khoản bị khóa.”
- Nút “Hủy”.
- Nút đỏ “Xác nhận khóa”.

Frame 05: “05_TaiKhoan_Modal_ResetMatKhau”
Thiết kế modal “Đặt lại mật khẩu”.

Nội dung:
- Hiển thị email nhận mật khẩu tạm thời.
- Checkbox “Yêu cầu đổi mật khẩu ở lần đăng nhập tiếp theo”.
- Nút “Hủy”.
- Nút chính “Gửi mật khẩu tạm thời”.

Frame 06: “06_TaiKhoan_Drawer_NhatKy”
Thiết kế drawer/modal “Nhật ký tài khoản”.

Nội dung:
- Timeline hoạt động:
  - Đăng nhập.
  - Đổi mật khẩu.
  - Đổi vai trò.
  - Khóa/mở khóa.
- Mỗi dòng có thời gian, người thực hiện, địa chỉ IP, mô tả thay đổi.

```

