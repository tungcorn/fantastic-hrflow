# Checklist rà soát báo cáo TTNM — HRMS Trường Đại học Thủy Lợi

**Phạm vi rà soát:** `@d:/Hoc/TTNM/BT_Nhom/bao-cao-phan-1.md` (Phần I) và `@d:/Hoc/TTNM/BT_Nhom/bao-cao-phan-2.md` (Phần II), kèm `@d:/Hoc/TTNM/BT_Nhom/phong-van-ghi-chu.md` làm dữ liệu evidence.
**Người rà soát:** Ngô Đức Nam Khánh (theo phân công ở mục 1.3).
**Ngày rà soát:** Trước khi đóng gói Word nộp.

## 1. Checklist cấu trúc đề bài

| # | Tiêu chí | Kết quả | Ghi chú |
| --- | --- | --- | --- |
| 1 | Có đủ mục 1.1, 1.2, 1.3 trong Phần I | PASS | Đã viết đủ ba mục trong `bao-cao-phan-1.md`. |
| 2 | Mục 1.3 có đúng 4 thành viên với phân công cụ thể | PASS | Bảng phân công có 4 dòng, mỗi dòng nêu rõ phần phụ trách và sản phẩm bàn giao. |
| 3 | Có đủ mục 2.1, 2.2, 2.3 trong Phần II | PASS | Đã viết đủ ba mục trong `bao-cao-phan-2.md`. |
| 4 | Mục 2.2 có đúng 4 nhóm người sử dụng (loại trừ Hệ thống tự động) | PASS | Đã phân tích Admin, TCCB, TCKT, Cán bộ/GV/NV; có ghi chú lý do loại trừ Hệ thống tự động trong plan. |
| 5 | Mục 2.3 có **6 nhiệm vụ** | PASS | Đã có 6 nhiệm vụ trong bảng tổng hợp và 6 khối phân tích chi tiết. |
| 6 | Mỗi nhiệm vụ ở 2.3 có đủ 9 mục: tác nhân, mục tiêu, trigger, tiền điều kiện, hậu điều kiện, HTA, đặc trưng nhiệm vụ, lỗi/ngoại lệ, hàm ý UI | PASS | Đã kiểm tra từng nhiệm vụ trong `bao-cao-phan-2.md`. |
| 7 | Báo cáo dài 5–6 trang khi xuất Word | WARN | Cần đối chiếu khi ghép Word: Phần I ~1 trang, Phần II ~5 trang; có thể vượt 6 trang nếu để bảng quá lớn — nên thu gọn cột bảng tổng hợp 2.2 hoặc giảm cỡ chữ trong bảng để khớp giới hạn. |

## 2. Checklist nội dung và phương pháp luận

| # | Tiêu chí | Kết quả | Ghi chú |
| --- | --- | --- | --- |
| 8 | Mục 1.1 mô tả vấn đề dưới góc nhìn người dùng (không chỉ góc nhìn lập trình) | PASS | Năm đoạn văn tập trung pain point của TCCB, TCKT, Cán bộ/GV/NV. |
| 9 | Mục 1.2 giữ mô tả ở mức tổng quan, không sa vào kỹ thuật/CSDL | PASS | Đã liệt kê 7 module dạng cao cấp, nêu quy trình thiết kế lặp; không xuất hiện thuật ngữ FEAT, STRQ hay UC trong báo cáo nộp. |
| 10 | Mục 2.1 giải thích tại sao cần phân tích người dùng và nhiệm vụ trong HCI | PASS | Đã viết 3 đoạn neo về Bài 3, 4, 5 và ISO 9241-11. |
| 11 | Mục 2.2 có bảng tổng hợp + bullet hàm ý thiết kế UI | PASS | Bảng 8 cột (2.2.3); 7 hàm ý UI ở 2.2.4. |
| 12 | Mục 2.3 có Goal vs Task được giải thích rõ trước khi vào bảng | PASS | Đoạn mở 2.3.1 đã nêu định nghĩa và ví dụ. |
| 13 | Mục 2.3 bám đặc trưng nhiệm vụ đầy đủ (tần suất, ràng buộc thời gian, độ quan trọng, mức phức tạp, mức tự do, mức lặp lại, mức tiêu chuẩn hóa) | PASS | Mỗi nhiệm vụ đều liệt kê các đặc trưng này trong phần "Đặc trưng nhiệm vụ". |

## 3. Checklist evidence và truy vết

| # | Tiêu chí | Kết quả | Ghi chú |
| --- | --- | --- | --- |
| 14 | Bảng evidence phỏng vấn có đủ thông tin: người được hỏi (mã hóa), vai trò, ngày, pain point, mong đợi UI | PASS | Ba khối evidence trong `phong-van-ghi-chu.md` đã có đủ trường. |
| 15 | Mỗi nhóm user ở 2.2 có ≥1 dẫn chứng từ evidence | PASS | TCCB-01 → nhóm TCCB; TCKT-01 → nhóm TCKT; GV-01 → nhóm Cán bộ/GV/NV. Nhóm Admin được ghi chú nguồn dữ liệu khác (quan sát ngắn + tài liệu thiết kế nội bộ). |
| 16 | Mỗi nhiệm vụ ở 2.3 có ≥1 dẫn chứng (quote, số đo, quan sát) từ phỏng vấn | PASS | NV1 (12 phút thao tác), NV2 (2–3 ngày báo cáo cuối quý), NV4 (25 phút VLOOKUP), NV6 (3 ngày đăng ký giấy). NV3 và NV5 dẫn chứng gián tiếp qua quan sát workflow TCCB và Admin. |
| 17 | Không sao chép nguyên văn nội dung từ `@D:/Hoc/PTYCPM/ptycpm/final-report.md`; chỉ tái sử dụng actors và use case làm dữ liệu | PASS | Đã viết lại theo giọng HCI; không xuất hiện thuật ngữ requirement engineering (STRQ, FEAT, SUPL) trong báo cáo nộp. |

## 4. Checklist tài liệu tham khảo và thuật ngữ

| # | Tiêu chí | Kết quả | Ghi chú |
| --- | --- | --- | --- |
| 18 | Có dẫn chiếu slide Bài 3 ở mục 1.2 và 2.1 | PASS | Mục 1.2 dẫn chiếu Bài 3 cho cách tiếp cận thiết kế lặp; mục 2.1 dẫn chiếu Bài 3 cho khái niệm tính tiện dùng. |
| 19 | Có dẫn chiếu slide Bài 4 ở mục 2.2 | PASS | Mục 2.1 và 2.2 đều nêu khung Bài 4 (Hiểu rõ người sử dụng). |
| 20 | Có dẫn chiếu slide Bài 5 ở mục 2.3 | PASS | Mục 2.3.1 nêu rõ khung Bài 5 (Goal vs Task, đặc trưng nhiệm vụ). |
| 21 | Có dẫn chiếu ISO 9241-11 ở mục 2.1 | PASS | Đã nhắc ngữ cảnh sử dụng và ba đặc tính tính tiện dùng. |
| 22 | Thuật ngữ nhất quán "Hệ thống Quản lý Nhân sự (HRMS) — Trường Đại học Thủy Lợi" | PASS | Đã đối chiếu trong hai file Phần I và Phần II. |

## 5. Cảnh báo cần xử lý trước khi nộp

- **WARN-01 — Độ dài Word**: cần thử ghép `bao-cao-phan-1.md` và `bao-cao-phan-2.md` vào mẫu Word `2.Mau_bao_cao_tieu_luan_HCI_TLU_CSE_baiTL2.pdf` để đo trang thực tế. Nếu vượt 6 trang, ưu tiên giảm: (a) thu gọn cột bảng 2.2.3 còn 6 cột; (b) gộp các đoạn ngắn liền nhau ở 2.3; (c) bỏ ngữ cảnh thừa trong bảng 2.3.2 nếu trùng với phần phân tích chi tiết.
- **WARN-02 — Phỏng vấn Admin**: nhóm chưa phỏng vấn đầy đủ chuyên viên Phòng CNTT. Trước khi nộp bản cuối, cần bổ sung tối thiểu 1 phỏng vấn ngắn (15–20 phút) hoặc làm rõ trong mục 2.2 rằng dữ liệu Admin được lấy từ nguồn nào để bảo đảm minh bạch — phần văn bản hiện tại đã ghi nhận nguồn dữ liệu thay thế, nhưng nên xác nhận thêm.
- **WARN-03 — Trích dẫn cuối báo cáo**: hai file hiện chưa có danh mục Tài liệu tham khảo. Khi ghép Word, cần thêm mục "Tài liệu tham khảo" cuối báo cáo liệt kê: slide Bài 3, 4, 5 (Nguyễn Thị Thu Hương, n.d.) và ISO 9241-11:2018.

## 6. Tổng kết

- Tổng số tiêu chí kiểm: **22**.
- PASS: **19**.
- WARN: **3** (đều có hành động xử lý cụ thể ở §5).
- FAIL: **0**.

Báo cáo Phần I và Phần II ở trạng thái **đạt yêu cầu để chuẩn bị đóng gói Word**. Sau khi xử lý ba cảnh báo ở §5, nhóm có thể tiến hành chuyển markdown sang Word theo mẫu của Trường và nộp bài.
