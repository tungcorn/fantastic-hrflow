# HRMS user groups and UI implications

## 1. Quản trị viên

**Role:** manages accounts, permissions, organization structure, and audit logs.

**Likely characteristics:**

- computer skill: experienced to proficient;
- domain skill: strong in system administration, medium in HR domain;
- frequency: regular but task-dependent;
- needs: fast account search, safe role assignment, clear confirmation dialogs, audit-log filters.

**UI implications:**

- role/permission actions must be clear and protected by confirmation;
- audit logs need filters by account, time, action type, object;
- error messages must distinguish permission error, validation error, and system error.

## 2. Phòng Tổ chức – Cán bộ (TCCB)

**Role:** main HR operator; handles personnel profiles, contracts, organization, appointments/transfers, evaluations, training, and reference data.

**Likely characteristics:**

- computer skill: new to experienced, depending on staff;
- domain skill: experienced to expert in HR administration;
- frequency: very frequent; most work is mandatory;
- pressure: high during reporting periods, contract renewal, training deadlines.

**UI implications:**

- forms must be structured by tabs/sections;
- search/filter must support multiple criteria;
- validation must be immediate and in Vietnamese;
- destructive or status-changing actions need confirmation;
- common tasks should require few steps.

## 3. Phòng Tài chính – Kế toán (TCKT)

**Role:** looks up personnel data and exports reports/statistics for salary, allowance, and financial work.

**Likely characteristics:**

- computer skill: experienced with spreadsheets and office software;
- domain skill: strong in finance/accounting, medium in HR process;
- frequency: periodic and high during reporting/salary cycles;
- needs: accurate data, export functions, filtered views, permission-safe access.

**UI implications:**

- reporting screens must show source filters clearly;
- export actions should indicate file type and scope;
- sensitive fields must respect permissions;
- empty-result states should explain why no data is shown.

## 4. Cán bộ / Giảng viên / Nhân viên

**Role:** self-service user; views personal profile, work unit, training registration, and training history/results.

**Likely characteristics:**

- computer skill: mixed, from new to proficient;
- domain skill: low to medium in HR administration;
- frequency: occasional;
- needs: simple navigation, clear labels, minimal training.

**UI implications:**

- self-service functions should be simple and discoverable;
- use plain Vietnamese, not internal HR jargon;
- show status clearly: registered, studying, completed, not passed;
- provide confirmation before canceling training registration.

## Summary table template

| Nhóm người dùng | Kỹ năng máy tính | Kỹ năng nghiệp vụ | Tần suất | Nhu cầu chính | Rủi ro UI |
| --- | --- | --- | --- | --- | --- |
| Quản trị viên | Có kinh nghiệm/Thành thạo | Quản trị hệ thống tốt | Thường xuyên | Quản lý tài khoản, phân quyền, log | Gán nhầm quyền, khóa nhầm tài khoản |
| Phòng TCCB | Người mới/Có kinh nghiệm | Nghiệp vụ HR cao | Rất thường xuyên | Hồ sơ, hợp đồng, đào tạo, điều chuyển | Nhập sai dữ liệu, thao tác nhiều bước |
| Phòng TCKT | Có kinh nghiệm | Tài chính cao, HR vừa | Theo kỳ báo cáo | Tra cứu, thống kê, xuất file | Hiểu sai phạm vi dữ liệu, thiếu quyền xem |
| Cán bộ/Giảng viên/Nhân viên | Đa dạng | HR thấp/vừa | Không thường xuyên | Xem hồ sơ, đăng ký đào tạo | Không nhớ đường dẫn, nhầm trạng thái |
