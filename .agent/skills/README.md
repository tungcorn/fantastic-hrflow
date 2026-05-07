# Bộ custom Skills cho bài tập nhóm TTNM — HRMS

Thư mục này chứa 5 custom Skills tập trung để hỗ trợ làm phần I–II của bài tập lớn môn **Tương tác Người–Máy** theo chủ đề **Hệ thống Quản lý Nhân sự (HRMS) — Trường Đại học Thủy Lợi**.

Nếu chưa biết phần nào dùng Skill nào, xem file router: [`SKILL_ROUTER.md`](SKILL_ROUTER.md).

## Danh sách Skill

| Skill | Dùng khi |
| --- | --- |
| `ttnm-hrms-project-proposal` | Viết mục I: giới thiệu vấn đề, giải pháp, phân công 4 thành viên. |
| `ttnm-hrms-interview-kit` | Chuẩn bị phỏng vấn/quan sát tối thiểu 3 người dùng đại diện. |
| `ttnm-hrms-user-analysis` | Viết mục 2.1–2.2: giới thiệu và phân tích nhóm người sử dụng. |
| `ttnm-hrms-task-analysis` | Viết mục 2.3: phân tích tối thiểu 5 nhiệm vụ quan trọng bằng goal/task/HTA. |
| `ttnm-hrms-report-assembler` | Ghép, rà soát và chuẩn hóa báo cáo chương I–II khoảng 5–6 trang. |

## Cách đóng gói nhanh bằng PowerShell

Chạy từ thư mục `D:\Hoc\TTNM\BT_Nhom`:

```powershell
Compress-Archive -LiteralPath ".agent\skills\ttnm-hrms-project-proposal" -DestinationPath ".agent\skills\ttnm-hrms-project-proposal.zip" -Force
Compress-Archive -LiteralPath ".agent\skills\ttnm-hrms-interview-kit" -DestinationPath ".agent\skills\ttnm-hrms-interview-kit.zip" -Force
Compress-Archive -LiteralPath ".agent\skills\ttnm-hrms-user-analysis" -DestinationPath ".agent\skills\ttnm-hrms-user-analysis.zip" -Force
Compress-Archive -LiteralPath ".agent\skills\ttnm-hrms-task-analysis" -DestinationPath ".agent\skills\ttnm-hrms-task-analysis.zip" -Force
Compress-Archive -LiteralPath ".agent\skills\ttnm-hrms-report-assembler" -DestinationPath ".agent\skills\ttnm-hrms-report-assembler.zip" -Force
```

Mỗi file ZIP cần chứa cả thư mục Skill ở gốc ZIP, ví dụ `ttnm-hrms-task-analysis/SKILL.md`, không phải chỉ chứa riêng các file lẻ.
