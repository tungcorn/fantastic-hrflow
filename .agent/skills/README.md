# Bộ Skills cho bài tập nhóm TTNM — HRMS

Thư mục này chứa các Skills hỗ trợ làm bài tập lớn môn **Tương tác Người–Máy** theo chủ đề **Hệ thống Quản lý Nhân sự (HRMS) — Trường Đại học Thủy Lợi**.

- Nhóm `ttnm-hrms-*`: hỗ trợ viết phần I–II của báo cáo.
- Nhóm `figma*`: hỗ trợ thiết kế UI/Figma cho phần III–IV, gồm phác họa thiết kế, tạo file Figma, sinh màn hình và thống nhất design system.

Nếu chưa biết phần nào dùng Skill nào, xem file router:

- [`SKILL_ROUTER.md`](SKILL_ROUTER.md): router cho phần báo cáo I–II.
- [`FIGMA_SKILL_ROUTER.md`](FIGMA_SKILL_ROUTER.md): router riêng cho thiết kế UI/Figma phần III–IV.

## Danh sách Skill HRMS

| Skill | Dùng khi |
| --- | --- |
| `ttnm-hrms-project-proposal` | Viết mục I: giới thiệu vấn đề, giải pháp, phân công 4 thành viên. |
| `ttnm-hrms-interview-kit` | Chuẩn bị phỏng vấn/quan sát tối thiểu 3 người dùng đại diện. |
| `ttnm-hrms-user-analysis` | Viết mục 2.1–2.2: giới thiệu và phân tích nhóm người sử dụng. |
| `ttnm-hrms-task-analysis` | Viết mục 2.3: phân tích tối thiểu 5 nhiệm vụ quan trọng bằng goal/task/HTA. |
| `ttnm-hrms-report-assembler` | Ghép, rà soát và chuẩn hóa báo cáo chương I–II khoảng 5–6 trang. |

## Danh sách Skill Figma/UI

| Skill | Dùng khi |
| --- | --- |
| `figma` | Làm việc với link Figma, lấy context/screenshot/asset từ Figma hoặc chuẩn bị chuyển thiết kế thành code. |
| `figma-create-new-file` | Tạo file Figma hoặc FigJam mới cho dự án. |
| `figma-generate-design` | Sinh hoặc cập nhật các màn hình UI trong Figma từ mô tả/scenario. |
| `figma-use` | Thao tác trực tiếp với Figma bằng Plugin API; dùng kèm khi cần tạo/sửa node, frame, component. |
| `figma-create-design-system-rules` | Thiết lập quy tắc thiết kế thống nhất: màu, chữ, spacing, component và quy ước Figma-to-code. |

## Gợi ý dùng cho phần III–IV

1. Dùng `figma-create-design-system-rules` để thống nhất style HRMS: menu trái, bảng dữ liệu, form, hộp thoại, màu cảnh báo.
2. Dùng `figma-create-new-file` để tạo file Figma chung cho nhóm.
3. Dùng `figma-generate-design` + `figma-use` để dựng từng màn hình cho 5 nhiệm vụ:
   - Tra cứu/xem danh sách hồ sơ nhân sự.
   - Thêm mới hồ sơ nhân sự.
   - Tạo/gia hạn hợp đồng lao động.
   - Xem và xuất thống kê nhân sự đa chiều.
   - Đăng ký khóa đào tạo self-service.
4. Dùng `figma` khi cần đọc lại link Figma, kiểm tra screenshot hoặc đối chiếu node thiết kế.

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
