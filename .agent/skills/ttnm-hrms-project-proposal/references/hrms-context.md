# HRMS project context for TTNM proposal

## Confirmed topic

**Hệ thống Quản lý Nhân sự (HRMS) — Trường Đại học Thủy Lợi**.

The prior PTYCPM project describes HRMS as a web-based, multi-user system supporting personnel management in a university environment.

## Problem domain

The system supports centralized management of:

- user accounts and role-based access;
- organizational structure as a parent–child unit tree;
- personnel profiles;
- labor contracts;
- appointment, transfer, and dismissal of personnel;
- training courses, registrations, results, and certificates;
- reward/discipline evaluation history;
- salary coefficient, allowance type, and contract type reference data;
- reports/statistics and export;
- audit logs and traceability.

## Main user groups

| User group | Main goal |
| --- | --- |
| Quản trị viên | Manage accounts, permissions, organization tree, and audit logs. |
| Phòng TCCB | Perform core HR work: profiles, contracts, organization, appointments, training, evaluations, categories. |
| Phòng TCKT | Look up HR data and export reports/statistics for financial/accounting work. |
| Cán bộ/Giảng viên/Nhân viên | View personal profile, view work unit, register/cancel training, view training history/results. |

## HCI framing

This is a good TTNM/HCI topic because it involves role-based interaction, forms, tables, filters, detail views, confirmation dialogs, import/export actions, and error handling. The UI must be understandable for different skill levels and must reduce time spent on repetitive administrative tasks.

## Suggested problem statement angle

Current HR management in a university can become slow and error-prone when data is distributed across files, spreadsheets, paper forms, and separate departments. Users need fast search, consistent data entry, clear feedback, safe confirmation before destructive actions, and role-appropriate views.
