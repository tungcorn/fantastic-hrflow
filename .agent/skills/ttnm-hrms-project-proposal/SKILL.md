---
name: ttnm-hrms-project-proposal
description: Drafts section I project proposal for TTNM HRMS reports: problem, solution, and 4-member work allocation. Use for đề xuất đề bài.
---

# TTNM HRMS Project Proposal

## Purpose

Use this Skill when drafting **I. ĐỀ XUẤT ĐỀ BÀI** for the TTNM/HCI group report using the topic **Hệ thống Quản lý Nhân sự (HRMS) — Trường Đại học Thủy Lợi**.

This Skill only covers:

1. `1.1. Giới thiệu vấn đề`
2. `1.2. Giải pháp`
3. `1.3. Phân công các thành viên tham gia`

Do not write sections II–VII unless the user explicitly asks.

## Required reference loading

Before drafting, read:

- `references/hrms-context.md` for the confirmed project domain, actors, and scope.
- `references/proposal-template.md` for the exact report template and writing rules.

## Workflow

1. **Confirm the topic wording**: use “Hệ thống Quản lý Nhân sự (HRMS) — Trường Đại học Thủy Lợi”.
2. **Write from the user perspective**: describe the current HR-management problem as experienced by Admin, Phòng TCCB, Phòng TCKT, and Cán bộ/Giảng viên/Nhân viên.
3. **Keep solution high-level**: propose a web-based, role-based HRMS UI; do not over-specify database, code, or final implementation details.
4. **Mention iterative UI design**: prototype → user evaluation → redesign, because this is a GUI/HCI course.
5. **Create 4-person work allocation**:
   - If member names are supplied, use them exactly.
   - If member names are missing, use placeholders: Thành viên 1–4.
   - Assign work by report responsibility, not only coding tasks.
6. **Self-check**: section I must answer: What problem? Whose goal? What solution direction? Who does what?

## Output format

Produce Vietnamese academic prose in this structure:

```markdown
# I. ĐỀ XUẤT ĐỀ BÀI

## 1.1. Giới thiệu vấn đề
[3–5 paragraphs]

## 1.2. Giải pháp
[2–4 paragraphs + optional bullet list of main UI modules]

## 1.3. Phân công các thành viên tham gia
| STT | Thành viên | Nhiệm vụ phụ trách | Sản phẩm bàn giao |
|---|---|---|---|
```

## Quality checklist

- [ ] Problem is described under the user’s viewpoint, not only developer viewpoint.
- [ ] User goals are explicit.
- [ ] Solution is concise and allows later prototype iteration.
- [ ] Work allocation has exactly 4 members unless the user provides a different number.
- [ ] Content is specific to university HRMS, not generic “quản lý nhân sự”.
- [ ] Vietnamese is formal, clear, and suitable for a university report.
