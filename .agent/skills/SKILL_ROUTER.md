# Skill Router — Bài tập nhóm TTNM HRMS

File này dùng để chọn đúng custom Skill khi làm từng phần báo cáo môn **Tương tác Người–Máy** cho chủ đề **Hệ thống Quản lý Nhân sự (HRMS) — Trường Đại học Thủy Lợi**.

## 1. Bảng chọn Skill theo phần báo cáo

| Phần cần làm | Skill nên dùng | Khi nào dùng | Kết quả mong đợi |
| --- | --- | --- | --- |
| `1.1. Giới thiệu vấn đề` | `ttnm-hrms-project-proposal` | Khi cần viết vấn đề dưới góc nhìn người sử dụng. | Đoạn mô tả bối cảnh, khó khăn hiện tại, mục tiêu người dùng. |
| `1.2. Giải pháp` | `ttnm-hrms-project-proposal` | Khi cần mô tả giải pháp ở mức tổng quan. | Mô tả web HRMS, role-based UI, module chính, thiết kế lặp. |
| `1.3. Phân công thành viên` | `ttnm-hrms-project-proposal` | Khi cần chia việc nhóm 4 người. | Bảng phân công thành viên + sản phẩm bàn giao. |
| Chuẩn bị phỏng vấn/quan sát | `ttnm-hrms-interview-kit` | Trước khi viết phân tích người dùng/nhiệm vụ, cần dữ liệu từ ít nhất 3 người dùng đại diện. | Bộ câu hỏi, checklist quan sát, bảng ghi nhận kết quả. |
| `2.1. Giới thiệu` | `ttnm-hrms-user-analysis` | Khi bắt đầu chương phân tích người sử dụng và nhiệm vụ. | Đoạn giới thiệu mục đích phân tích user/task trong HCI. |
| `2.2. Phân tích người sử dụng` | `ttnm-hrms-user-analysis` | Khi cần phân tích Admin, TCCB, TCKT, Cán bộ/Giảng viên/Nhân viên. | Phân tích vai trò, kỹ năng, tần suất, nhu cầu, hàm ý UI. |
| `2.3. Phân tích nhiệm vụ` | `ttnm-hrms-task-analysis` | Khi cần chọn và phân tích tối thiểu 5 nhiệm vụ quan trọng. | Bảng nhiệm vụ + phân tích chi tiết goal, precondition, HTA, tần suất, lỗi. |
| Ghép toàn bộ phần I–II | `ttnm-hrms-report-assembler` | Khi đã có các phần nháp và muốn ghép thành báo cáo hoàn chỉnh. | Bản ghép tiếng Việt học thuật + checklist PASS/WARN/FAIL. |
| Rà soát trước khi nộp | `ttnm-hrms-report-assembler` | Khi cần kiểm tra thiếu mục, thiếu nhiệm vụ, thiếu user group, sai cấu trúc. | Danh sách lỗi cần sửa và bản chỉnh chuẩn hóa. |

## 2. Luồng làm bài khuyến nghị

```text
Bước 1: ttnm-hrms-project-proposal
  → Viết mục I: đề xuất đề bài.

Bước 2: ttnm-hrms-interview-kit
  → Chuẩn bị phỏng vấn/quan sát tối thiểu 3 người dùng đại diện.

Bước 3: ttnm-hrms-user-analysis
  → Viết mục 2.1 và 2.2 từ dữ liệu phỏng vấn hoặc giả định cần xác nhận.

Bước 4: ttnm-hrms-task-analysis
  → Viết mục 2.3 với ít nhất 5 nhiệm vụ quan trọng.

Bước 5: ttnm-hrms-report-assembler
  → Ghép, rà soát, chuẩn hóa văn phong và checklist.
```

## 3. Prompt router mẫu

### Làm phần I

```text
Dùng skill ttnm-hrms-project-proposal để viết mục I. Đề xuất đề bài cho chủ đề HRMS Trường Đại học Thủy Lợi, nhóm 4 người.
```

### Chuẩn bị phỏng vấn

```text
Dùng skill ttnm-hrms-interview-kit để tạo bộ câu hỏi phỏng vấn và checklist quan sát cho 3 nhóm người dùng: Phòng TCCB, Phòng TCKT, Cán bộ/Giảng viên.
```

### Làm phân tích người sử dụng

```text
Dùng skill ttnm-hrms-user-analysis để viết mục 2.1 và 2.2 cho HRMS. Nếu chưa có dữ liệu phỏng vấn thật, hãy ghi rõ các giả định cần xác nhận.
```

### Làm phân tích nhiệm vụ

```text
Dùng skill ttnm-hrms-task-analysis để viết mục 2.3, chọn ít nhất 5 nhiệm vụ quan trọng của HRMS và phân tích mục tiêu, tiền điều kiện, nhiệm vụ con, tần suất, ràng buộc thời gian và lỗi thường gặp.
```

### Ghép và rà báo cáo

```text
Dùng skill ttnm-hrms-report-assembler để ghép phần I và II thành bản báo cáo hoàn chỉnh, đúng cấu trúc đề bài và có checklist rà soát cuối.
```

## 4. Quy tắc chọn nhanh

- Nếu câu hỏi bắt đầu bằng **“viết đề xuất”, “giới thiệu vấn đề”, “giải pháp”, “phân công”** → dùng `ttnm-hrms-project-proposal`.
- Nếu câu hỏi có **“phỏng vấn”, “quan sát”, “3 người dùng đại diện”, “bảng câu hỏi”** → dùng `ttnm-hrms-interview-kit`.
- Nếu câu hỏi có **“phân tích người sử dụng”, “nhóm người dùng”, “vai trò”, “kỹ năng”, “tần suất sử dụng”** → dùng `ttnm-hrms-user-analysis`.
- Nếu câu hỏi có **“phân tích nhiệm vụ”, “5 nhiệm vụ”, “HTA”, “mục tiêu”, “tiền điều kiện”, “nhiệm vụ con”** → dùng `ttnm-hrms-task-analysis`.
- Nếu câu hỏi có **“ghép báo cáo”, “rà soát”, “checklist”, “chuẩn hóa văn phong”, “trước khi nộp”** → dùng `ttnm-hrms-report-assembler`.

## 5. Lưu ý quan trọng

- Không ghi “đã phỏng vấn” nếu chưa có dữ liệu phỏng vấn thật.
- Phần `2.3` phải có tối thiểu 5 nhiệm vụ; nên dùng 6 nhiệm vụ để chắc chắn đủ chiều sâu.
- Chủ đề phải ghi nhất quán: **Hệ thống Quản lý Nhân sự (HRMS) — Trường Đại học Thủy Lợi**.
- Nếu làm toàn bộ phần I–II từ đầu, dùng theo thứ tự: Proposal → Interview Kit → User Analysis → Task Analysis → Report Assembler.
