# Hướng dẫn tạo và dùng custom Skills cho bài TTNM HRMS

## 1. Cấu trúc Skill chuẩn

Mỗi Skill là một thư mục riêng, tối thiểu có file `SKILL.md` ở ngay bên trong:

```text
ten-skill/
├── SKILL.md
└── references/
    └── tai-lieu-tham-chieu.md
```

File `SKILL.md` phải bắt đầu bằng YAML frontmatter:

```markdown
---
name: ten-skill
description: Mô tả rõ Skill làm gì và khi nào cần dùng.
---

# Tên Skill

Hướng dẫn chi tiết cho Claude...
```

Quy tắc nên dùng:

- `name`: chữ thường, số và dấu gạch ngang; ngắn, dễ nhớ.
- `description`: nêu rõ trigger, ví dụ “Use when writing section 2.3 task analysis...”.
- Nội dung dài nên đưa vào `references/` để Skill gọn và dễ kích hoạt.
- Một Skill chỉ nên giải quyết một workflow lặp lại, không ôm toàn bộ bài.

## 2. Bộ Skill đã tạo cho bài này

Các Skill nằm trong `.agent/skills/`:

1. `ttnm-hrms-project-proposal`
2. `ttnm-hrms-interview-kit`
3. `ttnm-hrms-user-analysis`
4. `ttnm-hrms-task-analysis`
5. `ttnm-hrms-report-assembler`

## 3. Cách upload lên Claude

Với từng Skill:

1. Zip cả thư mục Skill, ví dụ thư mục `ttnm-hrms-task-analysis`.
2. Vào Claude → Customize → Skills.
3. Upload file ZIP.
4. Enable Skill.
5. Test bằng prompt đúng trigger, ví dụ:

```text
Dùng skill ttnm-hrms-task-analysis để viết mục 2.3 phân tích 5 nhiệm vụ quan trọng cho HRMS Trường Đại học Thủy Lợi.
```

## 4. Prompt mẫu để dùng từng Skill

```text
Dùng skill ttnm-hrms-project-proposal để viết mục I. Đề xuất đề bài cho chủ đề HRMS Trường Đại học Thủy Lợi, nhóm 4 người.
```

```text
Dùng skill ttnm-hrms-interview-kit để tạo bộ câu hỏi phỏng vấn 3 người dùng đại diện: TCCB, TCKT, Cán bộ/Giảng viên.
```

```text
Dùng skill ttnm-hrms-user-analysis để viết mục 2.1 và 2.2 dựa trên kết quả phỏng vấn sau: [dán ghi chú phỏng vấn].
```

```text
Dùng skill ttnm-hrms-task-analysis để phân tích 5 nhiệm vụ quan trọng nhất của HRMS, mỗi nhiệm vụ có mục tiêu, tiền điều kiện, nhiệm vụ con và đặc trưng.
```

```text
Dùng skill ttnm-hrms-report-assembler để ghép phần I và II thành bản báo cáo tiếng Việt học thuật, đúng cấu trúc đề bài.
```

## 5. Lưu ý khi nộp bài

- Không ghi rằng đã phỏng vấn người thật nếu nhóm chưa phỏng vấn; hãy để “dự kiến phỏng vấn” hoặc thay bằng dữ liệu thật sau khi khảo sát.
- Báo cáo phần II theo đề bài nên dài khoảng 5–6 trang.
- Mỗi nhiệm vụ trong mục 2.3 phải có: mục tiêu, tiền điều kiện, nhiệm vụ con nếu có, tần suất/thời gian/ràng buộc/độ quan trọng.
- Chủ đề nên ghi nhất quán: **Hệ thống Quản lý Nhân sự (HRMS) — Trường Đại học Thủy Lợi**.
