# Plan chi tiết: Báo cáo TTNM phần I–II — HRMS Trường Đại học Thủy Lợi

Plan này phân rã mục 1.1–2.3 thành nội dung viết cụ thể, mapping skill, draft sơ bộ và phân công 4 thành viên, bám sát slide TTNM (Bài 4 Hiểu rõ người sử dụng, Bài 5 Hiểu rõ chức năng hoạt động) và tái sử dụng artefact HRMS từ `@D:/Hoc/PTYCPM/ptycpm/final-report.md`.

## 0. Thông số chốt

- **Chủ đề:** Hệ thống Quản lý Nhân sự (HRMS) — Trường Đại học Thủy Lợi.
- **Nhóm 4 thành viên:** Nguyễn Hồng Phúc, Nguyễn Hải Ninh, Ngô Quang Tùng, Ngô Đức Nam Khánh.
- **Số nhiệm vụ mục 2.3:** 6.
- **Dữ liệu phỏng vấn:** xem như đã phỏng vấn ≥3 người đại diện (TCCB, TCKT, Cán bộ/GV) — viết theo dữ liệu thật, không đánh dấu "giả định".
- **Định dạng:** Markdown học thuật tiếng Việt, dài 5–6 trang, sẵn sàng paste vào Word.
- **Mẫu báo cáo gốc:** `@d:/Hoc/TTNM/2.Mau_bao_cao_tieu_luan_HCI_TLU_CSE_baiTL2.pdf`.

## 1. Mapping section → Skill → File output

| Section | Skill dùng | Nguồn dữ liệu chính | Output |
| --- | --- | --- | --- |
| 1.1 Giới thiệu vấn đề | `ttnm-hrms-project-proposal` | STRQ 1–12 (Phần II PTYCPM) | 3–5 đoạn văn |
| 1.2 Giải pháp | `ttnm-hrms-project-proposal` | FEAT + 7 nhóm UC PTYCPM | 2–4 đoạn + bullet module |
| 1.3 Phân công thành viên | `ttnm-hrms-project-proposal` | Bảng phân công PTYCPM | Bảng 4 dòng |
| 2.1 Giới thiệu | `ttnm-hrms-user-analysis` | Slide Bài 4 | 2–3 đoạn |
| 2.2 Phân tích người sử dụng | `ttnm-hrms-user-analysis` + dữ liệu phỏng vấn | Actors PTYCPM + phỏng vấn | 4 nhóm + bảng tổng hợp + hàm ý UI |
| 2.3 Phân tích nhiệm vụ | `ttnm-hrms-task-analysis` | UC 4.1–4.50 PTYCPM | 6 nhiệm vụ phân tích sâu |
| Ghép + rà soát | `ttnm-hrms-report-assembler` | Tất cả draft trên | Bản ghép + checklist PASS/WARN/FAIL |

## 2. Draft sơ bộ từng mục

### 2.1. Mục 1.1 — Giới thiệu vấn đề (draft)

- Đ1: Bối cảnh ĐH Thủy Lợi — quy mô hàng nghìn cán bộ, giảng viên, nhân viên thuộc nhiều đơn vị trực thuộc; hồ sơ nhân sự chủ yếu lưu giấy + Excel phân tán giữa Phòng TCCB, Phòng TCKT và các khoa/đơn vị.
- Đ2: Pain point TCCB — nhập trùng dữ liệu khi điều chuyển, cập nhật hợp đồng/đào tạo thủ công, khó tổng hợp báo cáo biến động nhân sự.
- Đ3: Pain point TCKT — cần dữ liệu nhân sự, hệ số lương, phụ cấp để tính lương nhưng phải xin file Excel từ TCCB → trễ và sai lệch.
- Đ4: Pain point Cán bộ/GV/NV — không tự xem được hồ sơ cá nhân, không tự đăng ký khóa đào tạo, phải làm việc qua giấy/email.
- Đ5: Mục tiêu người dùng — giao diện web thống nhất, phân quyền rõ, thao tác nhanh, giảm sai sót và minh bạch dữ liệu.

### 2.2. Mục 1.2 — Giải pháp (draft)

- Giải pháp: ứng dụng web HRMS đa người dùng, frontend dạng SPA giao tiếp với backend qua RESTful API, truy cập từ trình duyệt không cần cài đặt phần mềm riêng.
- 7 module UI chính bám theo phân nhóm UC PTYCPM:
  - Hệ thống & Tài khoản (đăng nhập, đổi mật khẩu, phân quyền).
  - Quản lý Cơ cấu tổ chức (đơn vị, sáp nhập, giải thể).
  - Danh mục Cấu hình (lương, phụ cấp, hợp đồng).
  - Quản lý Hồ sơ nhân sự + Hợp đồng + Đánh giá.
  - Quản lý Đào tạo.
  - Báo cáo & Nhật ký hệ thống.
  - Self-service cho Cán bộ/GV/NV.
- Quy trình thiết kế lặp: prototype → đánh giá người dùng → chỉnh sửa (bám slide Bài 3 — Tính tiện dùng và lời khuyên *thực hiện tạo mẫu và kiểm thử nhanh*, *sửa đổi và lập lại quá trình thiết kế nếu cần*).
- Tiêu chí thành công: tuân thủ ISO 9241-11 (effectiveness, efficiency, satisfaction), giảm thời gian thao tác so với quy trình giấy hiện tại.

### 2.3. Mục 1.3 — Phân công (draft bảng)

| STT | Thành viên | Phần phụ trách | Sản phẩm bàn giao |
| --- | --- | --- | --- |
| 1 | Nguyễn Hồng Phúc | Toàn bộ Phần I + phỏng vấn TCKT-01 + đóng gói Word + biên soạn Tài liệu tham khảo | 3 mục §I; ghi chú phỏng vấn TCKT; tệp Word; mục TLTK |
| 2 | Nguyễn Hải Ninh | Phỏng vấn TCCB-01 + 2.2 Phân tích người sử dụng (4 nhóm + bảng + hàm ý UI) | Ghi chú phỏng vấn TCCB; mục 2.2 đầy đủ |
| 3 | Ngô Quang Tùng | Phỏng vấn GV-01 + tổng hợp bảng evidence chung + 2.3 nhiệm vụ 1–3 (TCCB-heavy) | Ghi chú phỏng vấn GV; bảng evidence tổng hợp; 3 task chi tiết |
| 4 | Ngô Đức Nam Khánh | 2.1 Giới thiệu + 2.3 nhiệm vụ 4–6 + checklist rà soát | Mục 2.1, 3 task, bảng PASS/WARN/FAIL |

### 2.4. Mục 2.1 — Giới thiệu (draft)

Giải thích vì sao cần phân tích người dùng + nhiệm vụ trong HCI (slide Bài 4): hiểu năng lực nhận thức, ngữ cảnh sử dụng, đặc trưng nhiệm vụ → là đầu vào bắt buộc cho thiết kế giao diện tiện dùng. Nêu phương pháp: phỏng vấn bán cấu trúc + quan sát thao tác thực tế tại Phòng TCCB và TCKT.

### 2.5. Mục 2.2 — 4 nhóm người sử dụng

> **Lưu ý chốt phạm vi**: PTYCPM xác định 5 actors gồm Admin, TCCB, TCKT, Cán bộ/GV/NV và *Hệ thống tự động (System Timer)*. Mục 2.2 chỉ phân tích **4 nhóm người sử dụng** vì "Hệ thống tự động" không phải con người, không thuộc phạm vi user analysis của HCI.

Mỗi nhóm phân tích theo khung slide Bài 4 (Hiểu rõ người sử dụng) + ngữ cảnh sử dụng theo ISO 9241-11: vai trò, kỹ năng máy tính, kỹ năng nghiệp vụ, tần suất, bắt buộc/tùy chọn, mục tiêu, khó khăn, **số người ước lượng**, **thiết bị/môi trường**, hàm ý UI.

> **Khi viết bản đầy đủ**, mỗi nhóm cần bổ sung thêm các thuộc tính còn lại của khung Bài 4: **độ tuổi điển hình, trình độ học vấn, động cơ sử dụng, thái độ với hệ thống mới**. Các thuộc tính này ảnh hưởng trực tiếp đến quyết định thiết kế giao diện (vd: cỡ chữ, mức hỗ trợ, trình tự hội thoại).

1. **Quản trị viên (Admin)** — Phòng CNTT, ~2–3 người, kỹ năng máy tính cao, dùng hàng ngày, máy văn phòng + mạng nội bộ, mục tiêu: tài khoản + cơ cấu tổ chức + audit log.
2. **Phòng TCCB** — ~5–8 chuyên viên nhân sự, kỹ năng nghiệp vụ rất cao, dùng hàng ngày, máy văn phòng + mạng nội bộ, mục tiêu: hồ sơ + hợp đồng + điều chuyển + đào tạo.
3. **Phòng TCKT** — ~5–8 kế toán lương, kỹ năng Excel cao, dùng hàng tuần, máy văn phòng + mạng nội bộ, mục tiêu: tra cứu + xuất báo cáo nhân sự phục vụ tính lương.
4. **Cán bộ/GV/NV** — hàng nghìn người dùng cuối, kỹ năng máy tính trung bình, dùng thưa, máy cá nhân hoặc máy phòng làm việc + có thể truy cập từ ngoài trường, mục tiêu: xem hồ sơ + đăng ký đào tạo.

Kết phần bằng **bảng tổng hợp đa cột** (vai trò, kỹ năng MT, kỹ năng NV, tần suất, bắt buộc/tùy chọn, số người, thiết bị/môi trường) + **bullet hàm ý thiết kế UI**: role-based dashboard, ngôn ngữ tiếng Việt nghiệp vụ, tìm kiếm + lọc đa tiêu chí, xác nhận thao tác phá hủy, export Excel/PDF, responsive cho self-service ngoài văn phòng.

### 2.6. Mục 2.3 — 6 nhiệm vụ quan trọng (chốt danh sách)

**Phân biệt Goal vs Task** (slide Bài 5): *Goal = trạng thái mong muốn cuối cùng của người dùng* (vd: hồ sơ nhân sự được cập nhật chính xác); *Task = chuỗi hành động cụ thể để đạt goal* (vd: mở form → nhập thông tin → upload file → submit). Mục 2.3 phân tích **task**, neo về **goal** của từng nhóm người dùng đã xác định ở 2.2.

Mỗi nhiệm vụ phân tích đủ theo khung slide Bài 5: tác nhân, mục tiêu, trigger, tiền điều kiện, hậu điều kiện, **HTA (phân rã nhiệm vụ phân cấp)**, đặc trưng nhiệm vụ (**tần suất, ràng buộc thời gian, độ quan trọng, mức độ phức tạp, mức tự do của người dùng, mức lặp lại, mức tiêu chuẩn hóa**), lỗi/ngoại lệ thường gặp, hàm ý thiết kế UI.

| STT | Nhiệm vụ | Nhóm dùng | UC PTYCPM nguồn | Tần suất | Mức quan trọng | Ngữ cảnh |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Thêm mới hồ sơ nhân sự (có upload Excel) | TCCB | UC 4.31 | Hàng tuần | Critical | Văn phòng TCCB |
| 2 | Tạo & gia hạn hợp đồng lao động | TCCB | UC 4.25, 4.27 | Hàng tháng | Critical | Văn phòng TCCB |
| 3 | Điều chuyển / bổ nhiệm nhân sự | TCCB | UC 4.38, 4.39 | Hàng tháng | Important | Văn phòng TCCB |
| 4 | Xem & xuất thống kê nhân sự đa chiều | TCKT, TCCB | UC 4.23 | Hàng tuần | Critical | Văn phòng TCKT |
| 5 | Quản lý tài khoản & phân quyền | Admin | UC 4.4–4.7 | Hàng tháng | Critical | Phòng CNTT |
| 6 | Đăng ký khóa đào tạo (self-service) | Cán bộ/GV/NV | UC 4.49, 4.50 | ~2 đợt/năm khi nhà trường mở khóa | Important | Máy cá nhân hoặc văn phòng |

**Phủ ngữ cảnh sử dụng**: 5/6 nhiệm vụ ở văn phòng (PC + mạng nội bộ), 1/6 nhiệm vụ self-service có thể từ thiết bị cá nhân ngoài giờ — minh họa được sự đa dạng *ngữ cảnh sử dụng* mà ISO 9241-11 yêu cầu.

Bố trí: 1 bảng tổng hợp ở đầu mục → 6 khối phân tích chi tiết → 1 đoạn kết luận liên hệ sang prototype và iterative design.

## 3. Luồng thực thi theo thứ tự + timeline

```text
Tuần 1 — Phỏng vấn song song 3 người dùng đại diện
  Phúc  → phỏng vấn TCKT-01.
  Ninh  → phỏng vấn TCCB-01.
  Tùng  → phỏng vấn GV-01.
  B1 — Skill ttnm-hrms-project-proposal     → Phúc viết 1.1, 1.2, 1.3.
  B2 — Skill ttnm-hrms-interview-kit        → Tùng nhận ghi chú của 3 thành viên và tổng hợp
                                              thành bảng evidence chung.

Tuần 2
  B3 — Skill ttnm-hrms-user-analysis        → Ninh viết 2.2 từ bảng evidence + actors PTYCPM.
                                              Khánh viết 2.1 (giới thiệu chương).
  B4 — Skill ttnm-hrms-task-analysis        → Tùng viết 3 task đầu, Khánh viết 3 task sau.

Tuần 3
  B5 — Skill ttnm-hrms-report-assembler     → Khánh sinh checklist PASS/WARN/FAIL.
                                              Phúc ghép I+II thành Word theo mẫu TLU CSE
                                              và biên soạn mục Tài liệu tham khảo.
```

## 4. Checklist nghiệm thu

- [ ] Phần I có đủ 1.1, 1.2, 1.3; 1.3 đúng 4 thành viên.
- [ ] Phần II có 2.1, 2.2, 2.3; 2.2 có **đúng 4 nhóm người sử dụng** (loại trừ Hệ thống tự động) + bảng tổng hợp.
- [ ] Mục 2.3 có **6 nhiệm vụ**, mỗi nhiệm vụ đủ 9 mục: tác nhân, mục tiêu, trigger, tiền điều kiện, hậu điều kiện, HTA, đặc trưng nhiệm vụ, lỗi/ngoại lệ, hàm ý UI.
- [ ] Báo cáo dài 5–6 trang khi xuất Word.
- [ ] Thuật ngữ nhất quán: "Hệ thống Quản lý Nhân sự (HRMS) — Trường Đại học Thủy Lợi".
- [ ] Có dẫn chiếu slide **Bài 3** (ở 1.2 và 2.1), **Bài 4** (ở 2.2), **Bài 5** (ở 2.3); có dẫn chiếu **ISO 9241-11** ở 2.1.
- [ ] Mỗi nhóm user (2.2) có ≥1 dẫn chứng từ bảng evidence phỏng vấn; mỗi nhiệm vụ (2.3) có ≥1 dẫn chứng (quote, quan sát hoặc con số) từ phỏng vấn để truy vết được.
- [ ] Không sao chép nguyên văn final-report PTYCPM; chỉ tái dùng actors/use case làm dữ liệu.

## 5. Rủi ro & giảm thiểu

- **Trùng văn phong với PTYCPM** → viết lại theo giọng HCI, tập trung người dùng, không sa vào chi tiết kỹ thuật/CSDL.
- **Vượt 6 trang** → cắt mô tả nhiệm vụ phụ, giữ HTA gọn 5–7 bước/nhiệm vụ; bảng phân tích nhiệm vụ dùng cột ngắn.
- **Ghi chú phỏng vấn rời rạc** → bắt buộc tổng hợp về 1 bảng evidence chuẩn (người được hỏi, vai trò, ngày, pain point, mong đợi UI) trước khi viết 2.2 và 2.3, để nội dung viết có dẫn chứng truy vết được.
- **Bottleneck ghép cuối** → Khánh phải nhận draft của 3 thành viên còn lại trước hết Tuần 2; lập lịch nội bộ rõ deadline giao nháp.

## 6. File đầu ra dự kiến

- `d:/Hoc/TTNM/BT_Nhom/bao-cao-phan-1-2.md` — bản ghép markdown phần I–II (5–6 trang).
- `d:/Hoc/TTNM/BT_Nhom/bao-cao-phan-1-2.docx` — bản Word áp theo mẫu `2.Mau_bao_cao_tieu_luan_HCI_TLU_CSE_baiTL2.pdf`, dùng nộp.
- `d:/Hoc/TTNM/BT_Nhom/phong-van-ghi-chu.md` — bảng evidence phỏng vấn 3 người dùng.
- `d:/Hoc/TTNM/BT_Nhom/checklist-ra-soat.md` — bảng PASS/WARN/FAIL từ skill assembler.

## 7. Tài liệu tham khảo bắt buộc

Phần báo cáo cần dẫn chiếu các nguồn sau (tránh lặp lại lỗi không citation như bài cá nhân TTNM bts1):

- **Slide Bài 3 — Tính tiện dùng của hệ thống tương tác** (Nguyễn Thị Thu Hương, n.d.): dùng cho 1.2 (iterative design) và 2.1 (khái niệm tính tiện dùng).
- **Slide Bài 4 — Bước 1: Hiểu rõ người sử dụng**: dùng cho khung phân tích ở 2.2.
- **Slide Bài 5 — Bước 2: Hiểu rõ chức năng hoạt động**: dùng cho khung phân tích nhiệm vụ, HTA, Goal vs Task ở 2.3.
- **ISO 9241-11:2018** — Ergonomics of human-system interaction — Part 11: Usability: Definitions and concepts: dùng cho 2.1 (effectiveness, efficiency, satisfaction, ngữ cảnh sử dụng) và 2.2.
- **Galitz, W. O. (2007)** — *The Essential Guide to User Interface Design* (3rd ed.): dùng bổ sung cho hàm ý UI ở 2.2 và 2.3.
- **PTYCPM final-report** (artefact nội bộ nhóm): chỉ tham chiếu actors + UC, **không sao chép văn phong**.
