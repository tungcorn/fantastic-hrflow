---
name: ttnm-hrms-user-analysis
description: Drafts TTNM HRMS section 2.1-2.2 user analysis by role, skill, frequency, needs, and UI implications. Use for phân tích người sử dụng.
---

# TTNM HRMS User Analysis

## Purpose

Use this Skill to draft **II. PHÂN TÍCH NGƯỜI SỬ DỤNG VÀ PHÂN TÍCH NHIỆM VỤ**, especially:

- `2.1. Giới thiệu`
- `2.2. Phân tích người sử dụng`

for the HRMS TTNM/HCI report.

## Required reference loading

Before writing, read:

- `references/user-analysis-framework.md` for the course-based analysis factors.
- `references/hrms-user-groups.md` for HRMS-specific user groups and UI implications.

If interview notes are available, use them as the primary source. If not, clearly mark any assumed details as **giả định cần xác nhận qua phỏng vấn**.

## Workflow

1. Start with a short introduction explaining why user analysis is needed for UI design.
2. Identify user groups by role in the HRMS context.
3. For each group, analyze:
   - role/responsibility;
   - computer skill;
   - domain skill;
   - frequency of use;
   - mandatory or optional use;
   - main goals and needs;
   - difficulties/pain points;
   - UI design implications.
4. Include a summary table comparing user groups.
5. Include a paragraph linking user analysis to later task analysis and prototype design.

## Output format

```markdown
## 2.1. Giới thiệu
[2–3 paragraphs]

## 2.2. Phân tích người sử dụng

### 2.2.1. Phương pháp thu thập thông tin
[interview/observation/survey explanation]

### 2.2.2. Các nhóm người sử dụng chính
[role-by-role analysis]

### 2.2.3. Bảng tổng hợp đặc điểm người sử dụng
| Nhóm người dùng | Vai trò | Kỹ năng máy tính | Kỹ năng nghiệp vụ | Tần suất | Nhu cầu giao diện |

### 2.2.4. Hàm ý thiết kế giao diện
[bullet list]
```

## Guardrails

- Do not collapse all users into one generic “người dùng”.
- Do not focus only on functional requirements; user analysis must discuss human characteristics and context.
- Do not claim completed interviews if the user has not provided interview evidence.
- Keep language formal and specific to HRMS in a university.
