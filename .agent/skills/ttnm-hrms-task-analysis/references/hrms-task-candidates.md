# HRMS task candidates

Select at least 5. Recommended set for the assignment: use tasks 1–6.

## Task 1: Tìm kiếm, lọc và xem chi tiết hồ sơ nhân sự

- **Actor:** Phòng TCCB, Phòng TCKT.
- **Goal:** find the correct employee profile and view needed information accurately.
- **Preconditions:** user logged in; has permission; profile data exists.
- **Frequency:** very frequent for TCCB; periodic/frequent for TCKT.
- **UI implications:** search box, multi-criteria filters, pagination, detail tabs, no horizontal scroll, clear empty state.

## Task 2: Thêm mới hoặc chỉnh sửa hồ sơ nhân sự

- **Actor:** Phòng TCCB.
- **Goal:** create/update a valid HR profile with complete information.
- **Preconditions:** TCCB user logged in; required source documents available; editing allowed by status.
- **Frequency:** frequent when onboarding/updating records.
- **UI implications:** tabbed form, required-field validation, autosave/draft warning, confirmation before save, clear Vietnamese errors.

## Task 3: Tạo, chỉnh sửa hoặc chấm dứt hợp đồng lao động

- **Actor:** Phòng TCCB.
- **Goal:** record contract lifecycle accurately.
- **Preconditions:** personnel profile exists; contract type configured; user has permission.
- **Frequency:** periodic; critical near contract start/end dates.
- **UI implications:** status labels, date validation, contract-type constraints, confirmation for early termination, file/PDF attachment support.

## Task 4: Quản lý tài khoản và phân quyền người dùng

- **Actor:** Quản trị viên.
- **Goal:** create/update/lock accounts and assign correct roles.
- **Preconditions:** admin logged in; linked personnel profile exists for new account.
- **Frequency:** when onboarding, role change, or account issue occurs.
- **UI implications:** role selection clarity, disable invalid actions, confirmation for lock/unlock, audit trail.

## Task 5: Xem và xuất báo cáo/thống kê nhân sự

- **Actor:** Phòng TCCB, Phòng TCKT.
- **Goal:** produce accurate reports for management, finance, or planning.
- **Preconditions:** user logged in; has access; data available.
- **Frequency:** monthly/semester/yearly or on demand.
- **UI implications:** filter summary, export preview, Excel/PDF options, progress/loading feedback.

## Task 6: Cán bộ/Giảng viên/Nhân viên xem hồ sơ cá nhân và đăng ký/hủy đăng ký đào tạo

- **Actor:** Cán bộ/Giảng viên/Nhân viên.
- **Goal:** self-service access to personal profile and training registration.
- **Preconditions:** user logged in; training course open for registration if registering.
- **Frequency:** occasional.
- **UI implications:** simple dashboard, plain Vietnamese labels, status badges, confirmation before canceling registration, clear deadline/seat availability.

## Task 7: Mở khóa đào tạo và ghi nhận kết quả đào tạo

- **Actor:** Phòng TCCB.
- **Goal:** manage training courses and update employee training results/certificates.
- **Preconditions:** TCCB logged in; course information available; result recording only after course completion.
- **Frequency:** by semester/training cycle.
- **UI implications:** date validation, capacity constraint, status transition flow, batch result entry, certificate upload validation.

## Task 8: Bổ nhiệm, điều chuyển hoặc bãi nhiệm nhân sự khỏi đơn vị

- **Actor:** Phòng TCCB.
- **Goal:** maintain correct unit assignment and position status.
- **Preconditions:** organization tree exists; personnel and contract status valid.
- **Frequency:** when organizational changes occur.
- **UI implications:** organization tree view, employee selection by status, confirmation, conflict warnings, clear post-action status.

## Example detailed HTA: Tìm kiếm và xem hồ sơ nhân sự

```text
0. Tìm kiếm và xem chi tiết hồ sơ nhân sự
1. Truy cập chức năng Quản lý hồ sơ nhân sự
2. Nhập từ khóa hoặc chọn tiêu chí lọc
2.1. Nhập mã cán bộ/họ tên nếu biết
2.2. Chọn đơn vị, trạng thái làm việc, loại hợp đồng nếu cần lọc sâu
3. Thực hiện tìm kiếm
4. Xem danh sách kết quả
4.1. Nếu có nhiều kết quả, dùng phân trang/sắp xếp
4.2. Nếu không có kết quả, điều chỉnh tiêu chí lọc
5. Chọn hồ sơ cần xem
6. Xem thông tin chi tiết theo tab

Plan 0: do 1 - 2 - 3 - 4 - 5 - 6. If no result at 4, do 2 again with adjusted criteria.
```
