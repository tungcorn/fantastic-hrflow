# 00-template-khung-chung

Template giao diện chung cho các project Figma Make của HRMS.

Mục tiêu của template là giữ các màn hình của nhóm cùng một hệ thống giao diện, dù mỗi nhiệm vụ được làm trong một project riêng.

## Thành phần có sẵn

- Sidebar trái.
- Header trên.
- Breadcrumb.
- Thẻ thống kê.
- Bộ lọc.
- Bảng dữ liệu.
- Panel phụ bên phải.
- Button, input, select giả lập, badge trạng thái.

## Cách dùng

Copy thư mục này thành project mới cho từng nhiệm vụ, sau đó chỉ sửa:

```text
src/app/App.tsx
```

Không cần refactor thành nhiều component nếu mục tiêu là đưa lên Figma Make rồi copy view sang Figma Design.
