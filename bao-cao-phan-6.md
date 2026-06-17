# VI. PHÁT TRIỂN CHƯƠNG TRÌNH

Bản mẫu được hiện thực hóa thành một ứng dụng web một trang (Single Page Application - SPA) chạy hoàn toàn phía trình duyệt, không phụ thuộc vào máy chủ backend. Hướng tiếp cận này phù hợp với mục tiêu của giai đoạn hiện tại là xây dựng một prototype có thể tương tác để minh họa các luồng nghiệp vụ đã thiết kế, đồng thời cho phép triển khai và chia sẻ dễ dàng (có thể đặt trên bất kỳ đường dẫn con nào, ví dụ GitHub Pages). Toàn bộ chương trình sử dụng nền tảng web hiện đại với ngôn ngữ TypeScript nhằm bảo đảm tính an toàn kiểu dữ liệu và khả năng bảo trì.

## 6.1. Tổng quan công nghệ sử dụng

| Nhóm | Công nghệ | Phiên bản | Vai trò trong chương trình |
|---|---|---|---|
| Ngôn ngữ | TypeScript | 5.6 | Ngôn ngữ lập trình chính, bổ sung kiểu tĩnh cho JavaScript |
| Thư viện giao diện | React | 18.3 | Xây dựng giao diện theo mô hình component, dùng functional component và hooks |
| Công cụ build | Vite | 6.3 | Máy chủ phát triển (dev server) và đóng gói bản phát hành |
| Tạo kiểu (CSS) | Tailwind CSS | 4.1 | Thiết kế giao diện theo hướng utility-first |
| Bộ biểu tượng | lucide-react | 0.487 | Cung cấp hệ thống icon nhất quán cho giao diện |
| Xử lý Excel | xlsx (SheetJS) | 0.18 | Đọc/ghi tệp Excel phục vụ nhập khẩu hồ sơ hàng loạt |
| Tiện ích CSS | clsx, tailwind-merge | 2.1 / 3.2 | Ghép và gộp class Tailwind, xử lý xung đột class |
| Quản lý gói | npm | — | Quản lý thư viện phụ thuộc |

## 6.2. Ngôn ngữ và thư viện giao diện

Chương trình được viết bằng **TypeScript** trên nền **React 18**. React được lựa chọn vì mô hình component giúp tái sử dụng các thành phần giao diện và quản lý trạng thái hiển thị một cách rõ ràng. Giao diện được xây dựng hoàn toàn bằng functional component kết hợp hooks (`useState`, `useMemo`, `useCallback`, `useEffect`), không sử dụng class component. TypeScript bổ sung hệ thống kiểu tĩnh, giúp phát hiện sớm lỗi khi nhập liệu, định nghĩa rõ cấu trúc dữ liệu của hồ sơ nhân sự và hợp đồng lao động, từ đó tăng độ tin cậy và khả năng bảo trì của mã nguồn.

## 6.3. Công cụ xây dựng và biên dịch

Dự án sử dụng **Vite** làm công cụ build và máy chủ phát triển. Vite cung cấp khả năng nạp lại nóng (Hot Module Replacement) giúp rút ngắn thời gian phát triển, và đóng gói (bundle) mã nguồn thành các tệp tĩnh tối ưu khi phát hành. Quá trình build kết hợp kiểm tra kiểu của TypeScript (`tsc -b`) trước khi đóng gói, bảo đảm mã nguồn không còn lỗi kiểu. Cấu hình build đặt đường dẫn tài nguyên ở dạng tương đối nên sản phẩm có thể được lưu trữ trên bất kỳ thư mục con nào mà không cần cấu hình định tuyến phía máy chủ.

## 6.4. Giao diện và trải nghiệm người dùng

Phần tạo kiểu được thực hiện bằng **Tailwind CSS 4**, tích hợp trực tiếp vào Vite qua plugin chính thức. Cách tiếp cận utility-first giúp xây dựng giao diện nhất quán theo hệ thống màu sắc và khoảng cách đã định nghĩa trong phần thiết kế (màu trạng thái, bố cục sidebar - header - vùng nội dung). Hệ thống biểu tượng dùng **lucide-react** để bảo đảm tính thống nhất về phong cách. Hai tiện ích `clsx` và `tailwind-merge` được gói trong một hàm trợ giúp `cn()` để ghép và gộp các lớp CSS một cách an toàn, tránh xung đột class khi component có nhiều trạng thái. Một số thành phần giao diện cơ bản (ô nhập liệu, lựa chọn, thẻ, hộp thoại xác nhận…) được tự xây dựng thành bộ component dùng chung nhằm tái sử dụng trên toàn ứng dụng.

## 6.5. Quản lý trạng thái và lưu trữ dữ liệu

Do là prototype chạy phía trình duyệt, chương trình **không sử dụng cơ sở dữ liệu hay máy chủ backend**. Thay vào đó:

- **Quản lý trạng thái:** sử dụng **React Context API** kết hợp hooks (thông qua `PersonnelProvider` và `ContractProvider`) để chia sẻ dữ liệu hồ sơ nhân sự và hợp đồng cho toàn bộ ứng dụng, thay cho các thư viện nặng như Redux. Việc điều hướng giữa các module được xử lý bằng trạng thái nội bộ, không dùng thư viện định tuyến riêng.
- **Lưu trữ dữ liệu:** dùng **localStorage** của trình duyệt như một "cơ sở dữ liệu cục bộ", thông qua một lớp bao bọc có kiểu (typed wrapper) với khóa được đặt tiền tố `hrflow:`. Mọi thao tác đọc/ghi đều có xử lý ngoại lệ an toàn (đầy bộ nhớ, dữ liệu hỏng, trình duyệt tắt lưu trữ). Khi chưa có dữ liệu, hệ thống nạp sẵn dữ liệu mẫu (seed data) để minh họa.
- **Nhập khẩu dữ liệu:** thư viện **xlsx (SheetJS)** được dùng để đọc tệp Excel, phục vụ chức năng nhập hồ sơ nhân sự hàng loạt và kiểm tra dữ liệu trước khi tạo hồ sơ.

## 6.6. Tổ chức mã nguồn

Mã nguồn được tổ chức theo hướng **module hóa theo tính năng (feature-based)** để dễ mở rộng và bảo trì:

- `features/` – các module nghiệp vụ chính (hồ sơ nhân sự, hợp đồng lao động) gồm form, bảng dữ liệu, bộ lọc và các hộp thoại;
- `components/ui/` và `components/layout/` – bộ thành phần giao diện dùng chung và khung bố cục (sidebar, header);
- `store/` – các provider quản lý trạng thái;
- `lib/` – các tiện ích chung (lưu trữ, chuẩn hóa tìm kiếm không dấu, xử lý ngày tháng);
- `data/` – dữ liệu mẫu khởi tạo.

Cách tổ chức này giúp tách biệt rõ phần nghiệp vụ, phần giao diện dùng chung và phần dữ liệu, tạo điều kiện thuận lợi cho việc phát triển bổ sung các module khác (cơ cấu tổ chức, phân quyền, báo cáo) trong các giai đoạn tiếp theo.
