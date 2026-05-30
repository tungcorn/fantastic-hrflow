# Cấu trúc Figma Make cho HRMS

Thư mục `code` được chia theo hướng **mỗi nhiệm vụ một project Figma Make riêng**. Cách này giúp từng thành viên mở đúng view của mình, copy màn hình đang xem sang Figma Design, không phải chuyển tab/route trong một app chung.

## Project hiện có

| Thư mục | Vai trò |
| --- | --- |
| `00-template-khung-chung` | Template giao diện chung: sidebar, header, breadcrumb, thẻ thống kê, bộ lọc, bảng dữ liệu, panel phụ. |
| `Nhân sự quản lý hồ sơ` | Project cho nhiệm vụ **Thêm mới hồ sơ nhân sự**. |

## Cách tạo project mới cho từng nhiệm vụ

1. Copy toàn bộ `00-template-khung-chung`.
2. Đổi tên thư mục theo nhiệm vụ, ví dụ `01-danh-sach-ho-so`, `03-hop-dong`, `04-thong-ke-bao-cao`, `05-dang-ky-dao-tao`.
3. Chỉ sửa `src/app/App.tsx` trong project vừa copy.
4. Giữ nguyên khung chính: sidebar trái, header trên, breadcrumb, màu, font, button, input, table, badge.
5. Mỗi project chạy độc lập bằng:

```powershell
npm install
npm run dev
```

## Quy tắc để các màn hình nhìn cùng một hệ thống

- Sidebar phải giữ cùng logo, tên hệ thống và danh sách menu.
- Header phải giữ cùng chiều cao, breadcrumb và cụm tài khoản bên phải.
- Màu chính dùng `blue-700`; trạng thái tốt dùng `emerald`; cảnh báo dùng `amber`; lỗi dùng `rose/red`.
- Card, table, input, button dùng bo góc `rounded-lg`.
- Không dùng landing page hoặc hero; mỗi project phải mở thẳng vào màn hình nghiệp vụ.
- Khi copy sang Figma Design, chỉ copy view đang xem của project tương ứng.
