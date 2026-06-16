# HRFlow App — TLU HRMS (static SPA)

Quản lý **hồ sơ nhân sự** và **hợp đồng lao động** cho Trường Đại học Thủy Lợi.
Đây là bản viết lại của prototype `HRFlow_TongHop_HopDong_HoSo` (vốn nằm trong một file
`App.tsx` ~8.600 dòng) thành một ứng dụng React tĩnh, chia module rõ ràng, lưu dữ liệu
bằng `localStorage`. Giao diện (Tailwind + theme CSS) được giữ nguyên.

## Stack

- **Vite 6** + **React 18** + **TypeScript** (strict)
- **Tailwind CSS v4** (`@tailwindcss/vite`) + theme tokens trong `src/styles/theme.css`
- **lucide-react** (icon), **xlsx** (nhập Excel — nạp động khi cần)
- Lưu trữ: `localStorage` (xem `src/lib/storage.ts`)

## Scripts

```bash
npm install      # cài dependency
npm run dev      # chạy dev server (http://localhost:5173)
npm run build    # tsc -b && vite build  →  dist/
npm run preview  # xem thử bản build tĩnh
npm run typecheck
```

## Cấu trúc thư mục

```
src/
├── main.tsx                # điểm vào, mount <App/>
├── App.tsx                 # shell: providers + sidebar + header + định tuyến view
├── styles/                 # CSS giữ nguyên từ prototype (fonts, tailwind, theme)
├── assets/                 # logo TLU
├── lib/
│   ├── storage.ts          # wrapper localStorage (namespaced "hrflow:")
│   └── utils.ts            # cn(), normalizeSearch(), helper ngày tháng
├── data/
│   ├── personnel.seed.ts   # 392 hồ sơ mẫu (seed lần đầu)
│   └── contracts.seed.ts   # 392 hợp đồng mẫu (seed lần đầu)
├── store/
│   ├── personnelStore.tsx  # context + localStorage cho hồ sơ
│   └── contractStore.tsx   # context + localStorage cho hợp đồng
├── components/
│   ├── ui/                 # primitive dùng chung: Field, Input, Select, ...
│   └── layout/             # AppSidebar, AppHeader, PlaceholderView, navItems
└── features/
    ├── personnel/          # danh sách, form 5 nhóm, nhập Excel, modal xác nhận
    └── contracts/          # danh sách, bộ lọc, lịch hết hạn, modal tạo/gia hạn/chấm dứt
```

## Lưu trữ dữ liệu (local DB)

Dữ liệu được giữ trong `localStorage` dưới hai khóa:

- `hrflow:personnel-rows` — danh sách hồ sơ nhân sự
- `hrflow:contracts` — danh sách hợp đồng

Lần chạy đầu tiên, store nạp dữ liệu mẫu từ `src/data/*.seed.ts`; sau đó mọi thay đổi
(thêm thủ công, sửa hồ sơ, nhập Excel) được ghi lại và **giữ nguyên sau khi tải lại trang**.
Để khôi phục dữ liệu mẫu, xóa hai khóa trên trong DevTools → Application → Local Storage.

## Khác biệt so với prototype

- Tách file `App.tsx` khổng lồ thành các module theo tính năng.
- Bỏ phần "cruft" chỉ phục vụ Figma: phím tắt `Alt`, "figma copy mode", overlay chụp màn hình.
- Thêm lưu trữ thật bằng `localStorage` (trước đây chỉ giữ trong bộ nhớ).
- Thêm hồ sơ thủ công nay **sinh mã cán bộ và lưu thật** vào danh sách.
- Nút "Tải file mẫu" nay tạo file `.xlsx` ngay trên trình duyệt (trước đây trỏ tới file không tồn tại).
- Lược bỏ code chết (`OrgTree`, `ReviewBlock`) và ~40 dependency không dùng tới.

## Triển khai tĩnh

`vite.config.ts` đặt `base: './'` nên bản build trong `dist/` chạy được từ bất kỳ
sub-path nào (ví dụ GitHub Pages) mà không cần routing phía server.
