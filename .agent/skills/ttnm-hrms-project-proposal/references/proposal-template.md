# Proposal writing template

## 1.1. Giới thiệu vấn đề

Must include:

1. **Context**: personnel management at a university includes many units, lecturers, employees, contracts, training, and reports.
2. **User pain points**:
   - Phòng TCCB spends time creating/updating/searching personnel records.
   - Phòng TCKT needs reliable, up-to-date reports for salary/allowance/statistical work.
   - Admin needs controlled account and role management.
   - Staff/lecturers need to view their own information and training status without contacting HR for every request.
3. **User goals**:
   - complete HR tasks accurately;
   - reduce manual lookup and duplicate entry;
   - receive clear feedback and error messages;
   - access only the information appropriate to their role.
4. **HCI reason**: the project focuses on designing a usable interface, not only implementing functions.

Sample opening:

> Trong môi trường trường đại học, công tác quản lý nhân sự liên quan đến nhiều nhóm người dùng, nhiều loại hồ sơ và nhiều quy trình nghiệp vụ như hợp đồng lao động, cơ cấu đơn vị, đào tạo, đánh giá và báo cáo. Nếu các thao tác này được thực hiện rời rạc qua giấy tờ hoặc bảng tính, người sử dụng dễ mất thời gian tìm kiếm, nhập trùng dữ liệu và gặp khó khăn khi theo dõi trạng thái xử lý.

## 1.2. Giải pháp

Keep this section concise. Include:

- Web-based HRMS accessible through a browser.
- Role-based interface for Admin, TCCB, TCKT, and individual staff/lecturers/employees.
- Core UI modules:
  - dashboard after login;
  - account and permission management;
  - organization tree;
  - personnel profile list/detail/form;
  - contract management;
  - training management and self-service registration;
  - reports/statistics;
  - audit log.
- HCI process: analyze users/tasks, sketch UI, storyboard, build prototype, test with users, redesign.

Avoid detailed implementation such as exact database schema unless asked.

## 1.3. Phân công công việc cho nhóm 4 người

Recommended allocation:

| Member role | Suggested responsibility |
| --- | --- |
| Thành viên 1 | Project proposal, problem framing, Admin/account workflows, report integration. |
| Thành viên 2 | User analysis for TCCB/TCKT, interview questions, evidence synthesis. |
| Thành viên 3 | Task analysis for personnel profile/contract workflows, HTA tables. |
| Thành viên 4 | Task analysis for training/self-service/report workflows, final review and formatting. |

If real names are known, replace placeholders. If using names from the prior PTYCPM project and the user confirms they match, possible names are: Nguyễn Hồng Phúc, Nguyễn Hải Ninh, Ngô Quang Tùng, Ngô Đức Nam Khánh.

## Common mistakes to avoid

- Do not describe the problem only as “chưa có phần mềm”; describe user pain and user goals.
- Do not make section 1.2 too technical.
- Do not forget that UI design is iterative.
- Do not allocate all work by code modules only; this part is a report/prototype course.
