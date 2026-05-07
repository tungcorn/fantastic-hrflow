# Task analysis framework from TTNM slides

## Goal vs task

- **Mục tiêu (goal):** trạng thái/kết quả người dùng muốn đạt tới.
- **Nhiệm vụ (task):** hành động người dùng thực hiện để đạt mục tiêu.

Example:

- Goal: Mượn sách ở thư viện.
- Tasks: đi đến thư viện, tìm sách, lấy sách, đăng ký với thủ thư.

For HRMS, do not write “quản lý nhân sự” as one task. Break it into concrete tasks such as “tìm hồ sơ nhân sự”, “tạo hợp đồng”, “đăng ký khóa đào tạo”.

## Key task-analysis questions

For each task, answer:

1. Người sử dụng làm cái gì?
2. Họ làm việc bằng công cụ gì?
3. Họ cần có hiểu biết gì khi làm việc?
4. Mục tiêu công việc là gì?
5. Có nhiệm vụ con nào không?
6. Có ràng buộc thời gian, tần suất, độ quan trọng hay không?
7. Có lỗi/ngoại lệ nào cần xử lý không?
8. Nhiệm vụ này gợi ý thiết kế giao diện gì?

## HTA structure

Use Hierarchical Task Analysis (HTA):

```text
0. [Main task]
1. [Subtask]
2. [Subtask]
2.1. [Lower-level subtask]
2.2. [Lower-level subtask]
3. [Subtask]

Plan 0: do 1 - 2 - 3 in order; if [condition], do [exception step].
```

HTA should show:

- task hierarchy;
- subtask order;
- conditions for optional or exceptional steps;
- stopping point at a useful UI-design level.

## Characteristics to document

| Characteristic | Examples |
| --- | --- |
| Frequency | daily, weekly, monthly, by semester, when needed. |
| Importance | critical, high, medium, low. |
| Time constraint | must finish before reporting deadline, contract expiry, training registration deadline. |
| Complexity | simple lookup, multi-step data entry, approval/status update. |
| Error risk | duplicate record, missing required field, wrong status, wrong permission. |
| Tools/data | HR profile, contract, Excel, PDF, organization tree, training list. |
| Social interaction | coordination between TCCB, TCKT, employee, admin. |
| UI implication | filters, confirmation, validation, breadcrumbs, status badges, export preview. |

## Scenario note

Task analysis may produce scenarios later. A scenario is a narrative of how a user completes a task. In this section, keep scenarios short; detailed scenarios belong to the later design/storyboard sections.
