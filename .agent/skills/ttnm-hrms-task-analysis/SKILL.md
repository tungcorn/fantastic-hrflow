---
name: ttnm-hrms-task-analysis
description: Drafts TTNM HRMS section 2.3 task analysis with at least 5 key tasks, goals, preconditions, subtasks, HTA, frequency, and constraints.
---

# TTNM HRMS Task Analysis

## Purpose

Use this Skill to write **2.3. Phân tích nhiệm vụ** for the TTNM/HCI HRMS report.

The assignment requires at least **5 important tasks**, and each task must include:

- user goal;
- preconditions;
- subtasks if any;
- relevant task characteristics such as time constraints, frequency, importance, error/exception handling, tools, and UI implications.

## Required reference loading

Before drafting, read:

- `references/task-analysis-framework.md` for course-based concepts: goal/task distinction, HTA, scenario, task characteristics.
- `references/hrms-task-candidates.md` for HRMS-specific task candidates.

## Workflow

1. Select 5–7 important tasks. Prefer tasks that represent different user groups and important workflows.
2. For each task, write:
   - actor;
   - goal;
   - trigger;
   - precondition;
   - postcondition;
   - main subtasks / HTA;
   - alternative/error cases;
   - frequency and time constraints;
   - input/output objects;
   - UI design implications.
3. Include a summary table before detailed analysis.
4. Use Vietnamese academic prose and structured tables.
5. If fewer than 5 tasks are provided, add important HRMS tasks from the candidate list.

## Output format

```markdown
## 2.3. Phân tích nhiệm vụ

### 2.3.1. Cách xác định nhiệm vụ
[short introduction]

### 2.3.2. Bảng tổng hợp các nhiệm vụ quan trọng
| STT | Nhiệm vụ | Nhóm người dùng | Mục tiêu | Tần suất | Mức quan trọng |

### 2.3.3. Phân tích chi tiết từng nhiệm vụ

#### Nhiệm vụ 1: [Tên nhiệm vụ]
- Mục tiêu:
- Tác nhân chính:
- Điều kiện kích hoạt:
- Tiền điều kiện:
- Kết quả sau khi hoàn thành:
- Nhiệm vụ con / HTA:
- Đặc trưng nhiệm vụ:
- Lỗi/ngoại lệ thường gặp:
- Hàm ý thiết kế giao diện:
```

## Guardrails

- Do not confuse **goal** with **task**: goal is desired state; task is action sequence.
- Do not list only use-case names; analyze the human work behind them.
- Do not omit frequency/time/importance; these are required by the assignment guidance.
- Include at least 5 tasks. If uncertain, include 6 tasks and mark priority.
