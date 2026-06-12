# Prompt Figma Make 05 - Đăng ký khóa đào tạo self-service

Copy toàn bộ prompt dưới đây vào Figma Make.

```text
Bạn là UI/UX designer thiết kế nguyên mẫu giao diện cho báo cáo môn Tương tác Người - Máy.

Hãy tạo giao diện web app cho nhiệm vụ “Đăng ký khóa đào tạo self-service” trong hệ thống HRMS - Hệ thống Quản lý Nhân sự Trường Đại học Thủy Lợi.

Mục tiêu: Thiết kế đầy đủ các màn hình để Cán bộ/Giảng viên/Nhân viên xem khóa đào tạo đang mở, xem chi tiết khóa, đăng ký, hủy đăng ký và theo dõi các khóa đã đăng ký.


Layout self-service:
- Sidebar trái rộng khoảng 240px.
- Logo chữ: “TLU HRMS”.
- Menu sidebar gồm:
  - Trang cá nhân.
  - Hồ sơ cá nhân.
  - Đơn vị công tác.
  - Đào tạo.
  - Khóa đào tạo của tôi.
  - Đổi mật khẩu.
- Menu “Đào tạo” đang được chọn.
- Topbar có breadcrumb “Trang cá nhân / Đào tạo”, ô tìm kiếm nhanh, icon thông báo, avatar và tên người dùng “Ngô Quang Tùng - Giảng viên”.

Frame 01: “01_DaoTao_DanhSachKhoa”
Thiết kế màn hình “Khóa đào tạo đang mở”.

Nội dung:
- Tiêu đề: “Khóa đào tạo đang mở”.
- Mô tả: “Chọn khóa đào tạo phù hợp và đăng ký trực tuyến.”
- Card thông báo đầu trang: “Có 3 khóa đào tạo đang mở đăng ký.”
- Bộ lọc:
  - Search “Tìm theo tên khóa...”.
  - Select “Loại khóa đào tạo”.
  - Select “Thời gian”.
  - Select “Trạng thái đăng ký”.
- Danh sách khóa dạng card.

Mỗi card khóa đào tạo có:
- Tên khóa.
- Loại khóa.
- Thời gian đào tạo.
- Địa điểm.
- Đơn vị tổ chức.
- Số chỗ còn lại.
- Hạn đăng ký.
- Badge “Còn 5 ngày”.
- Nút chính “Đăng ký”.
- Link “Xem chi tiết”.

Dữ liệu mẫu:
- “Bồi dưỡng nghiệp vụ sư phạm đại học”.
- “Tập huấn chuyển đổi số trong giảng dạy”.
- “Đào tạo an toàn thông tin cơ bản”.

Frame 02: “02_DaoTao_ChiTietKhoa”
Thiết kế màn hình chi tiết khóa đào tạo.

Nội dung:
- Tên khóa đào tạo lớn.
- Badge “Đang mở đăng ký”.
- Thông tin:
  - Thời gian đào tạo.
  - Địa điểm.
  - Đơn vị tổ chức.
  - Chứng chỉ sau đào tạo.
  - Kinh phí.
  - Cam kết sau đào tạo.
  - Hạn đăng ký.
  - Số lượng đã đăng ký / giới hạn.
- Panel bên phải:
  - Trạng thái đăng ký cá nhân.
  - Nút “Đăng ký tham gia”.
  - Nút “Quay lại danh sách”.

Frame 03: “03_DaoTao_Modal_XacNhanDangKy”
Thiết kế modal “Xác nhận đăng ký khóa đào tạo”.

Nội dung:
- Hiển thị tên khóa.
- Hiển thị thời gian, địa điểm, đơn vị tổ chức.
- Text: “Bạn có chắc chắn muốn đăng ký tham gia khóa đào tạo này?”
- Textarea optional “Ghi chú nguyện vọng”.
- Nút “Hủy”.
- Nút chính “Xác nhận đăng ký”.

Frame 04: “04_DaoTao_Modal_DangKyThanhCong”
Thiết kế modal/toast thành công.

Nội dung:
- Icon thành công.
- Text: “Đăng ký khóa đào tạo thành công.”
- Text phụ: “Bạn có thể theo dõi trạng thái tại mục Khóa đào tạo của tôi.”
- Nút “Xem khóa của tôi”.

Frame 05: “05_DaoTao_KhoaCuaToi”
Thiết kế màn hình “Khóa đào tạo của tôi”.

Nội dung:
- Tiêu đề: “Khóa đào tạo của tôi”.
- Bảng:
  - Tên khóa.
  - Thời gian.
  - Trạng thái khóa.
  - Trạng thái tham gia.
  - Kết quả.
  - Thao tác.
- Badge:
  - Đã đăng ký.
  - Đang học.
  - Hoàn thành.
  - Không đạt.
- Thao tác:
  - “Xem chi tiết”.
  - “Hủy đăng ký” nếu còn trong hạn.

Frame 06: “06_DaoTao_Modal_HuyDangKy”
Thiết kế modal “Hủy đăng ký”.

Nội dung:
- Hiển thị tên khóa.
- Textarea optional “Lý do hủy”.
- Cảnh báo nhẹ: “Bạn chỉ có thể hủy đăng ký khi khóa đào tạo còn trong thời gian mở đăng ký.”
- Nút “Không hủy”.
- Nút đỏ “Xác nhận hủy đăng ký”.

```

