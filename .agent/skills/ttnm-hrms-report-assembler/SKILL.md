---
name: ttnm-hrms-report-assembler
description: Assembles and reviews TTNM HRMS report sections I-II into polished Vietnamese academic prose with checklist coverage for 5-6 pages.
---

# TTNM HRMS Report Assembler

## Purpose

Use this Skill after drafting proposal, user analysis, interview notes, and task analysis. It assembles and reviews the report sections:

- I. ĐỀ XUẤT ĐỀ BÀI
- II. PHÂN TÍCH NGƯỜI SỬ DỤNG VÀ PHÂN TÍCH NHIỆM VỤ

for the HRMS TTNM/HCI assignment.

## Required reference loading

Read:

- `references/report-outline-and-checklist.md` for required structure and completeness checks.
- `references/style-guide.md` for academic Vietnamese style and formatting notes.

## Workflow

1. Gather available draft parts from the user.
2. Normalize topic wording and section numbering.
3. Ensure Section I includes 1.1, 1.2, 1.3.
4. Ensure Section II includes 2.1, 2.2, 2.3.
5. Ensure 2.2 has user groups, not one generic user.
6. Ensure 2.3 has at least 5 tasks with goal, precondition, subtasks, and characteristics.
7. Add transition paragraphs so the report reads coherently.
8. Produce a final checklist with PASS/WARN/FAIL.

## Output format

```markdown
# Bản ghép báo cáo phần I–II

## I. ĐỀ XUẤT ĐỀ BÀI
...

## II. PHÂN TÍCH NGƯỜI SỬ DỤNG VÀ PHÂN TÍCH NHIỆM VỤ
...

---

## Checklist tự rà soát
| Tiêu chí | Trạng thái | Ghi chú |
```

## Guardrails

- Do not invent completed interviews. If interview evidence is missing, insert placeholders and a note that the group must replace them with real interview results.
- Do not expand into prototype/storyboard/program sections unless asked.
- Do not remove task details just to shorten the report; Section II must be substantive.
- Keep the final text coherent enough to paste into Word.
