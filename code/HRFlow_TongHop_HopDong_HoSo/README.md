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

## Deploy GitHub Pages

Project này có thể deploy lên GitHub Pages bằng GitHub Actions.

1. Commit các thay đổi trong `code/HRFlow_TongHop_HopDong_HoSo`.
2. Trên GitHub, vào `Settings` > `Pages`.
3. Ở mục `Build and deployment`, chọn `Source` là `GitHub Actions`.
4. Push lên nhánh `main`.
5. Mỗi lần push vào `main`, workflow `[.github/workflows/deploy-github-pages.yml](../../.github/workflows/deploy-github-pages.yml)` sẽ build từ thư mục này và deploy lên Pages.

Nếu muốn dùng URL `https://<username>.github.io/<repo>/`, cấu hình `base: './'` trong `[vite.config.ts](vite.config.ts)` đã đủ cho dự án này vì app không phụ thuộc route phía server.
