# Prompt Figma Make 03 - Quản lý đơn vị tổ chức

Copy toàn bộ prompt dưới đây vào Figma Make.

```text
Bạn là UI/UX designer thiết kế nguyên mẫu giao diện cho báo cáo môn Tương tác Người - Máy.

Hãy tạo giao diện web app cho nhiệm vụ “Quản lý đơn vị tổ chức” trong hệ thống HRMS - Hệ thống Quản lý Nhân sự Trường Đại học Thủy Lợi.

Mục tiêu: Thiết kế đầy đủ các màn hình để Quản trị viên hoặc Phòng Tổ chức - Cán bộ quản lý cây cơ cấu tổ chức, xem chi tiết đơn vị, thêm đơn vị con, sửa đơn vị, sáp nhập và giải thể đơn vị.

Phong cách chung:
- Giao diện tiếng Việt có dấu đầy đủ.
- Desktop frame: 1440 x 1024.
- Phong cách web admin dashboard hiện đại, rõ ràng.
- Màu chủ đạo: xanh dương đậm, trắng, xám nhạt.
- Cây tổ chức phải trực quan, dễ phân cấp.
- Màu đỏ dùng cho thao tác “Giải thể”, màu cam dùng cho “Sáp nhập”.

Layout chung:
- Sidebar trái rộng khoảng 260px, nền xanh dương đậm.
- Logo chữ: “TLU HRMS”.
- Menu sidebar gồm: Tổng quan, Hồ sơ nhân sự, Hợp đồng lao động, Cơ cấu tổ chức, Tài khoản & phân quyền, Đào tạo, Báo cáo, Nhật ký hệ thống, Cài đặt.
- Menu “Cơ cấu tổ chức” đang được chọn.
- Topbar có breadcrumb “Trang chủ / Cơ cấu tổ chức”, ô tìm kiếm nhanh, icon thông báo, avatar và tên người dùng “Admin CNTT - Quản trị viên”.

Frame 01: “01_DonVi_CoCauToChuc”
Thiết kế màn hình “Cơ cấu tổ chức”.

Bố cục:
- Chia 2 cột.
- Cột trái 35%: cây cơ cấu tổ chức.
- Cột phải 65%: chi tiết đơn vị đang chọn.

Cột trái:
- Tiêu đề “Cây cơ cấu tổ chức”.
- Search input “Tìm đơn vị...”.
- Tree view:
  - Trường Đại học Thủy Lợi
    - Ban Giám hiệu
    - Phòng Tổ chức - Cán bộ
    - Phòng Tài chính - Kế toán
    - Khoa Công nghệ Thông tin
      - Bộ môn Công nghệ phần mềm
      - Bộ môn Hệ thống thông tin
    - Khoa Kinh tế và Quản lý
- Node đang chọn: “Khoa Công nghệ Thông tin”, nền xanh nhạt.
- Mỗi node có icon mở rộng/thu gọn.

Cột phải:
- Header chi tiết đơn vị:
  - Tên đơn vị: “Khoa Công nghệ Thông tin”.
  - Mã đơn vị: “CNTT”.
  - Loại đơn vị: “Khoa”.
  - Trạng thái: “Đang hoạt động”.
- Nút:
  - “+ Thêm đơn vị con”.
  - “Sửa”.
  - “Sáp nhập”.
  - “Giải thể”.
- Tabs:
  - Tổng quan.
  - Nhân sự.
  - Đơn vị trực thuộc.
  - Lịch sử thay đổi.
- Tab Tổng quan gồm: đơn vị cha, ngày thành lập, địa chỉ, email, số điện thoại, website.
- Tab Nhân sự có bảng: mã cán bộ, họ tên, chức vụ, ngày bắt đầu, trạng thái.

Frame 02: “02_DonVi_Modal_Them”
Thiết kế modal/form “Thêm đơn vị tổ chức”.

Input:
- Tên đơn vị.
- Mã đơn vị.
- Loại đơn vị.
- Đơn vị cha.
- Ngày thành lập.
- Email.
- Số điện thoại.
- Địa chỉ.
- Website.
- Checkbox “Đơn vị nút - không cho phép có đơn vị con”.
- Validation: “Mã đơn vị đã tồn tại.”
- Nút “Hủy” và “Lưu đơn vị”.

Frame 03: “03_DonVi_Modal_Sua”
Thiết kế modal/form “Sửa thông tin đơn vị”.

Yêu cầu:
- Form giống modal thêm đơn vị.
- Trường “Mã đơn vị” bị disabled.
- Helper text: “Mã đơn vị không được phép thay đổi.”
- Nút “Hủy” và “Lưu thay đổi”.

Frame 04: “04_DonVi_Modal_SapNhap”
Thiết kế modal “Sáp nhập đơn vị”.

Nội dung:
- Hiển thị đơn vị nguồn.
- Select “Đơn vị nhận sáp nhập”.
- Date picker “Ngày hiệu lực”.
- Input “Số quyết định”.
- Date picker “Ngày quyết định”.
- File upload “File quyết định”.
- Cảnh báo: “Toàn bộ nhân sự và đơn vị con sẽ được chuyển sang đơn vị nhận sáp nhập.”
- Nút “Hủy”.
- Nút cam/đỏ “Xác nhận sáp nhập”.

Frame 05: “05_DonVi_Modal_GiaiThe”
Thiết kế modal nguy hiểm “Giải thể đơn vị”.

Nội dung:
- Hiển thị số nhân sự bị ảnh hưởng và số đơn vị con.
- Select “Phương án xử lý đơn vị con”:
  - Giải thể toàn bộ đơn vị con.
  - Chuyển đơn vị con sang đơn vị cha khác.
- Nếu chọn chuyển, hiển thị select “Đơn vị cha mới”.
- Date picker “Ngày hiệu lực”.
- Input/select “Lý do”.
- Input “Số quyết định”.
- File upload “File quyết định”.
- Cảnh báo mạnh: “Thao tác này ảnh hưởng đến hồ sơ nhân sự và hợp đồng.”
- Nút “Hủy”.
- Nút đỏ “Xác nhận giải thể”.

Frame 06: “06_Storyboard_DonVi”
Tạo storyboard 3 bước:
1. Người dùng chọn đơn vị trong cây cơ cấu tổ chức.
2. Người dùng thêm đơn vị con từ panel chi tiết.
3. Người dùng xác nhận sáp nhập hoặc giải thể bằng modal cảnh báo.

Mỗi bước storyboard cần có caption ngắn, số thứ tự rõ ràng và hình giao diện minh họa.
```

