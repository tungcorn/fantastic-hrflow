# I. ĐỀ XUẤT ĐỀ BÀI

**Đề tài:** Hệ thống Quản lý Nhân sự (HRMS) — Trường Đại học Thủy Lợi.
**Môn học:** Tương tác Người – Máy.
**Nhóm thực hiện:** Nguyễn Hồng Phúc, Nguyễn Hải Ninh, Ngô Quang Tùng, Ngô Đức Nam Khánh.

## 1.1. Giới thiệu vấn đề

Trường Đại học Thủy Lợi hiện có hàng nghìn cán bộ, giảng viên và nhân viên thuộc nhiều khoa, phòng ban, viện nghiên cứu và đơn vị trực thuộc. Công tác quản lý nhân sự được giao cho Phòng Tổ chức – Cán bộ (TCCB) phối hợp với Phòng Tài chính – Kế toán (TCKT) và các đơn vị liên quan. Tuy nhiên, phần lớn nghiệp vụ hiện vẫn vận hành theo mô hình hỗn hợp: hồ sơ giấy lưu tại Phòng TCCB, các bảng tính Excel phục vụ tổng hợp – báo cáo, và một số biểu mẫu rời lưu trên ổ chia sẻ của phòng. Cách làm này tích lũy nhiều bất cập về tính nhất quán, thời gian xử lý và mức độ minh bạch dữ liệu, đặc biệt khi quy mô trường ngày càng mở rộng.

Đối với Phòng TCCB, một thông tin nhân sự sau khi thay đổi phải được sao chép thủ công sang nhiều bảng tính, dẫn đến sai lệch và mất thời gian đối soát; tổng hợp báo cáo biến động nhân sự cuối quý mất 2–3 ngày; hợp đồng lao động sắp hết hạn không có cảnh báo trực quan; quan sát thao tác cho thấy thêm một hồ sơ mới mất khoảng 12 phút và đã ghi nhận lỗi gõ trùng mã cán bộ. Đối với Phòng TCKT, đội ngũ kế toán lương phải xin dữ liệu nhân sự từ TCCB qua email và thường nhận chậm 1–2 ngày, dữ liệu thiếu cột hoặc không thống nhất, riêng thao tác xuất danh sách kết hợp hệ số lương đã mất tới 25 phút mỗi lần. Đối với cán bộ, giảng viên và nhân viên, việc xem hồ sơ cá nhân hay đăng ký khóa đào tạo vẫn dựa trên giấy tờ và email: xin bản sao hồ sơ mất 1–2 ngày, thông báo khóa đào tạo dễ bị bỏ lỡ, và đăng ký bằng giấy kéo dài khoảng ba ngày làm việc.

Từ các phỏng vấn và quan sát, có thể thấy mục tiêu chung của cả ba nhóm người dùng là một giao diện thống nhất, có phân quyền theo vai trò, cho phép thao tác nhanh, giảm thiểu sai sót và minh bạch trạng thái dữ liệu. Đối với Phòng TCCB là rút ngắn thời gian xử lý hồ sơ và báo cáo; đối với Phòng TCKT là truy cập dữ liệu nhân sự kịp thời để tính lương; đối với cán bộ là khả năng tự phục vụ trên trình duyệt. Đây chính là cơ sở để nhóm đề xuất xây dựng một hệ thống quản lý nhân sự trực tuyến, lấy yêu cầu giao diện tiện dùng làm trọng tâm thiết kế.

## 1.2. Giải pháp

Nhóm đề xuất xây dựng **Hệ thống Quản lý Nhân sự (HRMS) — Trường Đại học Thủy Lợi** dưới dạng ứng dụng web đa người dùng, có phân quyền theo vai trò, lấy **giao diện tiện dùng theo định nghĩa ISO 9241-11** làm trọng tâm thiết kế: hiệu quả (chính xác, đầy đủ), năng suất (tiết kiệm thời gian) và thỏa mãn (cảm giác làm chủ). Giao diện được tổ chức theo từng vai trò, dùng ngôn ngữ tiếng Việt nghiệp vụ, có bộ lọc đa tiêu chí, cảnh báo trực quan cho các trạng thái cần chú ý, và cho phép xuất Excel/PDF nhanh.

Hệ thống dự kiến gồm bảy module chức năng chính, được mô tả ở mức tổng quan trong báo cáo này; chi tiết tương tác sẽ được làm rõ ở các mục phân tích nhiệm vụ và mẫu giao diện ở các chương sau:

- **Hệ thống và Tài khoản**: đăng nhập, đăng xuất, đổi mật khẩu, quản lý phiên làm việc.
- **Quản lý Cơ cấu tổ chức**: thêm, sửa, sáp nhập, giải thể các đơn vị; thể hiện cây tổ chức phân cấp gốc là Trường Đại học Thủy Lợi.
- **Danh mục Cấu hình**: cấu hình hệ số lương, loại phụ cấp, loại hợp đồng và các danh mục tham chiếu khác.
- **Quản lý Hồ sơ Nhân sự, Hợp đồng và Đánh giá**: thêm, sửa, lọc, tìm kiếm hồ sơ; lập và chấm dứt hợp đồng; ghi nhận khen thưởng và kỷ luật.
- **Quản lý Đào tạo**: mở khóa đào tạo, theo dõi đăng ký và ghi nhận kết quả đào tạo cho cán bộ.
- **Báo cáo và Nhật ký hệ thống**: dashboard thống kê đa chiều, xuất báo cáo định kỳ, ghi nhật ký hoạt động phục vụ kiểm toán.
- **Cá nhân (Self-service)**: cho phép cán bộ, giảng viên và nhân viên xem hồ sơ, xem thông tin đơn vị công tác, đăng ký và theo dõi khóa đào tạo.

Cuối cùng, quá trình phát triển giao diện sẽ tuân theo cách tiếp cận **thiết kế lặp lấy người dùng làm trung tâm** được nhấn mạnh trong slide bài giảng Bài 3: phân tích người sử dụng và nhiệm vụ → dựng nguyên mẫu giấy hoặc phần mềm → đánh giá với người dùng đại diện → sửa đổi và lặp lại nếu cần. Tiêu chí thành công không chỉ là hệ thống có đủ chức năng mà còn là người dùng có thể hoàn thành nhiệm vụ nhanh hơn, ít lỗi hơn và cảm thấy thoải mái hơn so với quy trình giấy + Excel hiện tại — đúng tinh thần *tính tiện dùng* của môn Tương tác Người – Máy.

## 1.3. Phân công các thành viên tham gia

| STT | Thành viên | Nhiệm vụ phụ trách | Sản phẩm bàn giao |
| --- | --- | --- | --- |
| 1 | Nguyễn Hồng Phúc | Viết toàn bộ Phần I (1.1, 1.2, 1.3); phỏng vấn người dùng đại diện Phòng TCKT; đóng gói báo cáo Word theo mẫu của trường và biên soạn mục Tài liệu tham khảo cuối báo cáo. | Bản hoàn chỉnh mục 1.1, 1.2, 1.3; ghi chú phỏng vấn TCKT-01; tệp Word đóng gói; danh mục Tài liệu tham khảo. |
| 2 | Nguyễn Hải Ninh | Phỏng vấn người dùng đại diện Phòng TCCB; viết mục 2.2 Phân tích người sử dụng (mô tả bốn nhóm người dùng, lập bảng tổng hợp đa cột và rút ra hàm ý thiết kế giao diện). | Ghi chú phỏng vấn TCCB-01; bản hoàn chỉnh mục 2.2 kèm bảng so sánh và danh sách hàm ý UI. |
| 3 | Ngô Quang Tùng | Phỏng vấn người dùng đại diện Cán bộ/Giảng viên; tổng hợp ghi chú của ba thành viên thành bảng evidence chung; viết phân tích chi tiết ba nhiệm vụ đầu của mục 2.3 (Thêm hồ sơ, Hợp đồng, Điều chuyển). | Ghi chú phỏng vấn GV-01; bảng evidence tổng hợp; phân tích Nhiệm vụ 1–3 trong mục 2.3. |
| 4 | Ngô Đức Nam Khánh | Viết mục 2.1 Giới thiệu; viết phân tích chi tiết ba nhiệm vụ sau của mục 2.3 (Thống kê, Quản lý tài khoản, Đăng ký đào tạo); rà soát chất lượng báo cáo và sinh checklist PASS/WARN/FAIL trước khi nộp. | Bản hoàn chỉnh mục 2.1; phân tích Nhiệm vụ 4–6; checklist rà soát cuối. |

# II. PHÂN TÍCH NGƯỜI SỬ DỤNG VÀ PHÂN TÍCH NHIỆM VỤ

## 2.1. Giới thiệu

Theo cách tiếp cận thiết kế lấy người dùng làm trung tâm trong các slide Bài 3, Bài 4 và Bài 5 của môn Tương tác Người – Máy, hai bước đầu tiên trước khi dựng nguyên mẫu giao diện là **hiểu rõ người sử dụng** và **hiểu rõ nhiệm vụ** — tương ứng với hai trong ba thành phần ngữ cảnh sử dụng của ISO 9241-11 (người sử dụng – nhiệm vụ – thiết bị, môi trường). Chương này trình bày kết quả khảo sát theo hai phần: mục 2.2 phân tích bốn nhóm người sử dụng chính (Admin, TCCB, TCKT, Cán bộ/Giảng viên/Nhân viên); mục 2.3 phân tích sáu nhiệm vụ trọng yếu kèm phân rã nhiệm vụ phân cấp (HTA) và đặc trưng nhiệm vụ.

Nguồn dữ liệu của chương được thu thập qua phỏng vấn bán cấu trúc và quan sát thao tác thực tế với ba người dùng đại diện cho ba nhóm chính (mã hóa TCCB-01, TCKT-01, GV-01), bổ sung quan sát ngắn và phân tích actors từ tài liệu thiết kế nội bộ của nhóm cho vai trò Quản trị viên. Các quan sát và phát biểu tiêu biểu được trích lại từ bảng evidence phỏng vấn riêng của nhóm và được dùng làm minh chứng cho các nhận định bên dưới.

## 2.2. Phân tích người sử dụng

### 2.2.1. Phương pháp thu thập thông tin

Nhóm sử dụng kết hợp ba phương pháp: (i) **phỏng vấn bán cấu trúc** mỗi buổi 45–60 phút với ba người dùng đại diện thuộc ba nhóm khác nhau; (ii) **quan sát thao tác trực tiếp** trên quy trình giấy và bảng tính Excel mà người được phỏng vấn đang sử dụng, ghi nhận số bước, thời gian và lỗi xảy ra; (iii) **đối chiếu với tài liệu thiết kế hệ thống nội bộ** của nhóm để xác nhận vai trò Quản trị viên — nhóm có quy mô nhỏ và lịch làm việc khó hẹn dài, nên được bổ sung bằng quan sát thao tác cấp tài khoản và phỏng vấn ngắn qua điện thoại.

### 2.2.2. Các nhóm người sử dụng chính

#### a. Quản trị viên (Admin) — Phòng Công nghệ Thông tin

- **Vai trò và trách nhiệm**: cấp phát và khóa tài khoản, phân quyền theo vai trò, thiết lập cây cơ cấu tổ chức, theo dõi nhật ký hệ thống (audit log) và bảo đảm hệ thống vận hành ổn định.
- **Mục tiêu chính**: bảo đảm mỗi người dùng có đúng vai trò và đúng quyền; phát hiện sớm các hành vi bất thường; bảo toàn dữ liệu.
- **Khó khăn hiện tại**: thiếu công cụ giám sát tập trung, phải kết hợp nhiều phần mềm để theo dõi.
- **Hàm ý thiết kế giao diện**: trang quản trị riêng; danh sách tài khoản có lọc nhanh theo vai trò và trạng thái; bảng audit log tìm kiếm theo khoảng thời gian và loại sự kiện; mọi thao tác phá hủy (xóa, khóa) phải có xác nhận hai bước.

#### b. Phòng Tổ chức – Cán bộ (TCCB)

- **Vai trò và trách nhiệm**: quản lý hồ sơ nhân sự, lập và gia hạn hợp đồng lao động, điều chuyển – bổ nhiệm, ghi nhận khen thưởng – kỷ luật, mở khóa đào tạo và theo dõi kết quả đào tạo cho cán bộ.
- **Mục tiêu chính**: giữ hồ sơ chính xác, hợp đồng đúng hạn, báo cáo biến động nhân sự kịp thời cho Ban Giám hiệu và Phòng TCKT.
- **Khó khăn hiện tại**: trùng dữ liệu giữa nhiều bảng tính (TCCB-01 cho biết một lần điều chuyển phải sửa ở ≥3 file Excel; thêm một hồ sơ mới mất ~12 phút và đã ghi nhận lỗi gõ trùng mã cán bộ); cuối quý mất 2–3 ngày tổng hợp báo cáo biến động; hợp đồng sắp hết hạn không có cảnh báo trực quan.
- **Hàm ý thiết kế giao diện**: nguồn dữ liệu duy nhất, mọi thay đổi đồng bộ giữa các chế độ xem; bộ lọc đa tiêu chí cho danh sách nhân sự; cảnh báo trực quan cho hợp đồng sắp hết hạn (badge, danh sách riêng); biểu mẫu thêm/sửa có kiểm tra trùng mã ngay khi nhập; xuất Excel/PDF nhanh phục vụ báo cáo định kỳ.

#### c. Phòng Tài chính – Kế toán (TCKT)

- **Vai trò và trách nhiệm**: tra cứu danh sách nhân sự, hệ số lương và phụ cấp; tính lương; xuất bảng lương; phối hợp với Phòng TCCB để cập nhật biến động nhân sự ảnh hưởng đến lương.
- **Mục tiêu chính**: lấy được dữ liệu nhân sự đúng và nhanh để tính lương, xuất bảng lương đúng kỳ hạn.
- **Khó khăn hiện tại**: TCKT-01 mô tả phải xin file Excel từ TCCB qua email và nhận chậm 1–2 ngày; dữ liệu thiếu cột và không đồng nhất; thao tác xuất danh sách kết hợp hệ số lương mất ~25 phút mỗi lần.
- **Hàm ý thiết kế giao diện**: trang thống kê có quyền truy cập trực tiếp cho TCKT với bộ lọc đa tiêu chí; xuất Excel theo template thống nhất; lịch sử thay đổi hệ số lương dạng dòng thời gian; xem chi tiết hồ sơ ở chế độ chỉ đọc đối với các trường ngoài phạm vi nghiệp vụ TCKT.

#### d. Cán bộ, Giảng viên, Nhân viên (Cán bộ/GV/NV)

- **Vai trò và trách nhiệm**: là chủ thể của dữ liệu nhân sự; sử dụng chức năng tự phục vụ để xem hồ sơ cá nhân, thông tin đơn vị công tác và đăng ký các khóa đào tạo do nhà trường mở.
- **Mục tiêu chính**: xem được hồ sơ cá nhân và đăng ký khóa đào tạo một cách độc lập, không phải đi lại nộp giấy.
- **Khó khăn hiện tại**: GV-01 cho biết phải lên TCCB xin bản sao hồ sơ mất 1–2 ngày; dễ bỏ lỡ thông báo khóa đào tạo dán bảng tin/email; quy trình đăng ký bằng giấy mất khoảng ba ngày làm việc.
- **Hàm ý thiết kế giao diện**: trang cá nhân đơn giản, đăng nhập một lần xem được tất cả thông tin liên quan; thông báo khóa đào tạo nổi bật trên trang chủ; biểu mẫu đăng ký gọn, xác nhận tức thì; bố cục responsive để truy cập từ điện thoại hoặc ngoài trường; ngôn ngữ tiếng Việt thông dụng, tránh thuật ngữ hành chính.

### 2.2.3. Bảng tổng hợp đặc điểm người sử dụng

| Nhóm người dùng | Vai trò chính | Kỹ năng máy tính | Kỹ năng nghiệp vụ | Tần suất | Bắt buộc/Tùy chọn | Quy mô | Thiết bị/Môi trường |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Quản trị viên | Cấp tài khoản, phân quyền, giám sát hệ thống | Cao | Trung bình | Hàng ngày | Bắt buộc | ~2–3 người | Máy bàn, mạng nội bộ |
| Phòng TCCB | Quản lý hồ sơ, hợp đồng, điều chuyển, đào tạo | Trung bình – khá | Rất cao | Hàng ngày | Bắt buộc | ~5–8 người | Máy bàn, mạng nội bộ |
| Phòng TCKT | Tra cứu nhân sự, xuất báo cáo lương | Cao | Trung bình | Hàng tuần, cao điểm cuối tháng | Bắt buộc | ~5–8 người | Máy bàn, mạng nội bộ |
| Cán bộ/GV/NV | Xem hồ sơ cá nhân, đăng ký đào tạo | Trung bình | Thấp | 1–2 lần/tháng | Tùy chọn | Hàng nghìn người | Máy bàn, máy xách tay, ngoài trường |

### 2.2.4. Hàm ý thiết kế giao diện chung

Tổng hợp từ phân tích bốn nhóm, các yêu cầu chung đối với giao diện HRMS gồm:

- **Phân quyền theo vai trò**: mỗi nhóm có một trang chính riêng (dashboard), chỉ hiển thị các thao tác phù hợp với quyền của vai trò.
- **Ngôn ngữ và thuật ngữ**: dùng tiếng Việt nghiệp vụ quen thuộc với người dùng nhà trường, hạn chế thuật ngữ kỹ thuật.
- **Tìm kiếm và lọc đa tiêu chí**: bắt buộc cho các danh sách nhân sự, hợp đồng, đánh giá, đào tạo; kết quả lọc có thể xuất ra Excel/PDF theo template thống nhất.
- **Cảnh báo trực quan**: dùng huy hiệu màu (badge) và danh sách riêng cho các trạng thái cần chú ý (hợp đồng sắp hết hạn, khóa đào tạo đang mở).
- **Xác nhận thao tác phá hủy**: mọi thao tác xóa, khóa, giải thể, chấm dứt hợp đồng phải có hộp thoại xác nhận hai bước, kèm thông tin tác động.
- **Self-service responsive**: trang cá nhân cho cán bộ/GV/NV phải đọc tốt trên cả máy bàn, máy xách tay và điện thoại, hỗ trợ truy cập từ ngoài trường.
- **Lịch sử thay đổi**: các thực thể quan trọng (hồ sơ, hợp đồng, hệ số lương) phải có dòng thời gian thay đổi để hỗ trợ kiểm toán và truy ngược.

## 2.3. Phân tích nhiệm vụ

### 2.3.1. Cách xác định nhiệm vụ và phân biệt mục tiêu với nhiệm vụ

Theo slide Bài 5, **mục tiêu (goal)** là *trạng thái kết quả mà người dùng mong muốn đạt được*, trong khi **nhiệm vụ (task)** là *chuỗi hành động cụ thể được thực hiện để đạt được mục tiêu đó*. Ví dụ, với Phòng TCCB, mục tiêu "Hồ sơ nhân sự mới được lưu chính xác trong hệ thống" có thể được hoàn thành bằng nhiệm vụ "Thêm mới hồ sơ nhân sự" gồm các bước mở biểu mẫu, nhập thông tin, đính kèm tài liệu và xác nhận. Việc phân biệt giúp nhóm tập trung phân tích chuỗi tương tác hơn là chỉ liệt kê chức năng hệ thống.

Sáu nhiệm vụ được chọn dưới đây dựa trên ba tiêu chí: (i) đại diện cho cả bốn nhóm người sử dụng đã phân tích ở mục 2.2; (ii) là nhiệm vụ có tần suất cao hoặc có mức độ quan trọng nghiệp vụ "Critical"; (iii) được ghi nhận có pain point rõ ràng trong phỏng vấn và quan sát. Mỗi nhiệm vụ được phân tích theo sáu mục: mục tiêu, tiền điều kiện, phân rã nhiệm vụ phân cấp (HTA), đặc trưng nhiệm vụ, lỗi/ngoại lệ thường gặp và hàm ý thiết kế giao diện.

### 2.3.2. Bảng tổng hợp các nhiệm vụ quan trọng

| STT | Nhiệm vụ | Nhóm người dùng | Mục tiêu | Tần suất | Mức quan trọng | Ngữ cảnh |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Thêm mới hồ sơ nhân sự | TCCB | Hồ sơ nhân sự mới được lưu chính xác trong hệ thống | Hàng tuần, cao điểm đầu năm học | Critical | Văn phòng TCCB |
| 2 | Tạo và gia hạn hợp đồng lao động | TCCB | Hợp đồng có hiệu lực được lưu trữ và theo dõi tự động | Hàng tháng | Critical | Văn phòng TCCB |
| 3 | Điều chuyển và bổ nhiệm nhân sự | TCCB | Nhân sự được gắn đúng đơn vị công tác | Hàng tháng | Important | Văn phòng TCCB |
| 4 | Xem và xuất thống kê nhân sự đa chiều | TCKT, TCCB | Có báo cáo nhân sự kịp thời phục vụ tính lương và quản lý | Hàng tuần, cao điểm cuối tháng | Critical | Văn phòng TCKT |
| 5 | Quản lý tài khoản và phân quyền | Admin | Mỗi người dùng có đúng vai trò và đúng quyền | Hàng tháng, sự kiện khi có nhân sự mới | Critical | Phòng CNTT |
| 6 | Đăng ký khóa đào tạo (self-service) | Cán bộ/GV/NV | Cán bộ đăng ký được khóa đào tạo mong muốn | ~2 đợt/năm | Important | Máy cá nhân hoặc văn phòng |

### 2.3.3. Phân tích chi tiết từng nhiệm vụ

#### Nhiệm vụ 1 — Thêm mới hồ sơ nhân sự

- **Mục tiêu**: hồ sơ của cán bộ mới được lưu vào hệ thống đầy đủ, chính xác và sẵn sàng cho các quy trình tiếp theo (ký hợp đồng, bổ nhiệm).
- **Tiền điều kiện**: chuyên viên Phòng TCCB đã đăng nhập với đúng vai trò; cơ cấu tổ chức đã có đơn vị dự kiến tiếp nhận; danh mục hệ số lương đã cấu hình; đã có quyết định tuyển dụng và bộ hồ sơ giấy/scan.
- **Phân rã nhiệm vụ phân cấp (HTA)**:
  1. Mở module Quản lý Hồ sơ Nhân sự → chọn "Thêm hồ sơ mới".
  2. Nhập thông tin cá nhân (họ tên, ngày sinh, số định danh, quê quán) và trình độ học vấn/chuyên môn.
  3. Chọn đơn vị công tác từ cây tổ chức, hệ số lương và phụ cấp dự kiến.
  4. Đính kèm tài liệu scan (CMND/CCCD, bằng cấp, quyết định tuyển dụng); hệ thống cảnh báo trùng mã định danh hoặc trùng họ tên + ngày sinh.
  5. Xác nhận và lưu; hệ thống tự động sinh mã cán bộ theo quy tắc cấu hình.
- **Đặc trưng nhiệm vụ**: tần suất hàng tuần, cao điểm đầu năm học; ràng buộc thời gian không gắt (quan sát ~12 phút/hồ sơ trên Excel); mức quan trọng Critical; mức tiêu chuẩn hóa cao theo biểu mẫu giấy.
- **Lỗi/ngoại lệ thường gặp**: gõ trùng mã định danh; thiếu trường bắt buộc; sai định dạng ngày tháng; mất kết nối khi đang lưu; quên đính kèm tài liệu.
- **Hàm ý thiết kế giao diện**: biểu mẫu chia thành nhiều bước (wizard) với thanh tiến trình; kiểm tra trùng dữ liệu ngay khi nhập; gợi ý chọn đơn vị từ cây tổ chức có ô tìm kiếm nhanh; cho phép lưu nháp giữa chừng; hiển thị mã cán bộ vừa cấp ở trang xác nhận; có nút "Thêm hồ sơ tiếp theo" để hỗ trợ thao tác lặp trong cao điểm.

#### Nhiệm vụ 2 — Tạo và gia hạn hợp đồng lao động

- **Mục tiêu**: nhân sự được gắn một hợp đồng có hiệu lực đúng loại và đúng kỳ hạn, hệ thống tự động theo dõi để cảnh báo khi sắp hết hạn.
- **Tiền điều kiện**: hồ sơ nhân sự đã tồn tại; danh mục loại hợp đồng đã cấu hình; chuyên viên Phòng TCCB có quyền lập hợp đồng; có yêu cầu ký mới, gia hạn hoặc chuyển loại hợp đồng (ví dụ thử việc → chính thức).
- **HTA**:
  1. Mở chi tiết hồ sơ nhân sự → tab "Hợp đồng" → "Tạo hợp đồng".
  2. Chọn loại hợp đồng; nhập số hợp đồng, ngày ký, ngày bắt đầu, ngày kết thúc.
  3. Chọn hệ số lương và phụ cấp áp dụng; đính kèm bản scan hợp đồng đã ký.
  4. Hệ thống kiểm tra chồng chéo với hợp đồng đang có hiệu lực; nếu là gia hạn thì đề xuất kế thừa các trường từ hợp đồng cũ.
  5. Lưu hợp đồng; hệ thống cập nhật trạng thái và lịch nhắc hết hạn.
- **Đặc trưng nhiệm vụ**: tần suất hàng tháng; ràng buộc thời gian cao khi hợp đồng cũ sắp hết hạn; mức quan trọng Critical; mức tiêu chuẩn hóa cao theo quy định pháp luật và quy chế nhà trường.
- **Lỗi/ngoại lệ thường gặp**: gia hạn quá muộn (hợp đồng đã hết hạn vẫn cập nhật); chọn sai loại hợp đồng; ngày bắt đầu trùng hoặc trước ngày kết thúc hợp đồng cũ; không đính kèm bản scan.
- **Hàm ý thiết kế giao diện**: trang chính TCCB hiển thị danh sách "Hợp đồng sắp hết hạn trong 30/60 ngày" dưới dạng badge và bộ lọc nhanh; nút "Gia hạn" ngay trong hàng để rút ngắn thao tác; biểu mẫu đề xuất ngày kết thúc theo loại hợp đồng; kiểm tra chồng lấn thời gian ngay khi nhập; cảnh báo nếu thiếu tài liệu đính kèm.

#### Nhiệm vụ 3 — Điều chuyển và bổ nhiệm nhân sự

- **Mục tiêu**: nhân sự được gắn vào đúng đơn vị mới với mốc thời gian rõ ràng; lịch sử công tác được lưu lại.
- **Tiền điều kiện**: hồ sơ nhân sự và đơn vị đích đã tồn tại; chuyên viên Phòng TCCB có quyền thực hiện; đã có quyết định điều chuyển, bổ nhiệm hoặc bãi nhiệm từ Ban Giám hiệu hoặc cấp có thẩm quyền.
- **HTA**:
  1. Mở chi tiết hồ sơ nhân sự → tab "Quá trình công tác" → "Điều chuyển/Bổ nhiệm".
  2. Chọn loại thao tác (điều chuyển, bổ nhiệm chức vụ, bãi nhiệm) và đơn vị/chức vụ mới từ cây tổ chức.
  3. Nhập ngày hiệu lực và ghi chú quyết định (tùy chọn).
  4. Đính kèm bản scan quyết định; hệ thống kiểm tra mâu thuẫn (ví dụ chức vụ đã có người nắm giữ).
  5. Xác nhận và lưu; hệ thống tạo bản ghi lịch sử và cập nhật đơn vị hiện tại.
- **Đặc trưng nhiệm vụ**: tần suất hàng tháng; ràng buộc thời gian trung bình; mức quan trọng Important; mức tiêu chuẩn hóa cao theo quy chế.
- **Lỗi/ngoại lệ thường gặp**: chọn nhầm đơn vị (cây tổ chức nhiều tầng); ngày hiệu lực ngược; bỏ sót cập nhật hợp đồng kèm theo khi đổi đơn vị; thiếu đính kèm quyết định.
- **Hàm ý thiết kế giao diện**: cây tổ chức có ô tìm kiếm và đánh dấu đơn vị vừa chọn; biểu mẫu xác nhận hiển thị "đơn vị cũ → đơn vị mới" trước khi lưu; cảnh báo nếu nhân sự đang giữ chức vụ ở đơn vị cũ; gợi ý các tài liệu cần đính kèm theo loại thao tác; mỗi thay đổi xuất hiện ngay trong dòng thời gian "Quá trình công tác" của hồ sơ.

#### Nhiệm vụ 4 — Xem và xuất thống kê nhân sự đa chiều

- **Mục tiêu**: có được báo cáo nhân sự theo bộ lọc mong muốn (đơn vị, trình độ, hệ số lương, hợp đồng, đào tạo) trong thời gian ngắn để phục vụ tính lương và quản lý.
- **Tiền điều kiện**: chuyên viên Phòng TCKT hoặc TCCB đã đăng nhập với đúng vai trò; dữ liệu nhân sự và lương đã cập nhật đến kỳ báo cáo; phát sinh yêu cầu báo cáo (cuối kỳ tính lương, yêu cầu từ Ban Giám hiệu, hoặc cần đối chiếu giữa hai phòng).
- **HTA**:
  1. Mở module Báo cáo và Nhật ký hệ thống → chọn loại báo cáo (tổng quan, biến động, hợp đồng, đào tạo).
  2. Chọn bộ lọc: khoảng thời gian, đơn vị, hệ số lương, trình độ, học hàm, trạng thái hợp đồng.
  3. Xem kết quả trên màn hình ở dạng bảng và biểu đồ; tùy chỉnh hiển thị cột.
  4. Xuất ra Excel hoặc PDF theo template và tải xuống.
  5. (Tùy chọn) Lưu bộ lọc đã dùng để tái sử dụng kỳ sau.
- **Đặc trưng nhiệm vụ**: tần suất hàng tuần, cao điểm cuối tháng; ràng buộc thời gian cao trong tuần tính lương; mức quan trọng Critical; mức tự do cao trong tùy biến bộ lọc.
- **Lỗi/ngoại lệ thường gặp**: chọn nhầm khoảng thời gian; bỏ sót đơn vị con khi lọc theo đơn vị cha; kết quả quá lớn làm chậm tải; mất phiên đăng nhập khi xuất tệp lớn.
- **Hàm ý thiết kế giao diện**: trang báo cáo cho TCKT có sẵn các bộ lọc kỳ hạn phổ biến (tháng này, quý này, năm nay); cho phép lưu bộ lọc thành "Báo cáo của tôi"; xuất Excel với template thống nhất; tự động bao gồm các đơn vị con khi chọn đơn vị cha, có công tắc tắt hành vi này; xuất tệp lớn ở chế độ nền và thông báo khi sẵn sàng để tránh treo trình duyệt.

#### Nhiệm vụ 5 — Quản lý tài khoản và phân quyền

- **Mục tiêu**: mỗi cán bộ trong hệ thống có một tài khoản hoạt động, được phân đúng vai trò; tài khoản của nhân sự thôi việc bị khóa kịp thời.
- **Tiền điều kiện**: hồ sơ nhân sự đã được Phòng TCCB tạo trong hệ thống; Quản trị viên (Phòng CNTT) có quyền "Quản lý tài khoản"; chính sách phân quyền theo vai trò đã được phê duyệt; có yêu cầu cấp tài khoản, thay đổi vai trò, hoặc rà soát định kỳ.
- **HTA**:
  1. Mở module Hệ thống và Tài khoản → trang Quản lý tài khoản.
  2. Tìm kiếm tài khoản theo mã cán bộ, họ tên hoặc đơn vị; hoặc chọn "Thêm mới".
  3. Nếu thêm mới: chọn cán bộ từ danh sách hồ sơ chưa có tài khoản; hệ thống đề xuất tên đăng nhập; phân vai trò (Admin, TCCB, TCKT, Cán bộ/GV/NV).
  4. Nếu cập nhật: thay đổi vai trò, đặt lại mật khẩu hoặc đổi trạng thái (Đang hoạt động/Bị khóa); xem nhật ký truy cập gần đây khi cần.
  5. Xác nhận và lưu; nếu là tạo mới, hệ thống gửi mật khẩu khởi tạo qua kênh được cấu hình.
- **Đặc trưng nhiệm vụ**: tần suất theo sự kiện (mỗi đợt tuyển dụng/thôi việc) cộng với rà soát hàng tháng; ràng buộc thời gian trung bình; mức quan trọng Critical (ảnh hưởng an ninh hệ thống); mức tiêu chuẩn hóa cao theo chính sách phân quyền.
- **Lỗi/ngoại lệ thường gặp**: cấp sai vai trò; quên khóa tài khoản nhân sự thôi việc; đặt lại mật khẩu sai tài khoản; trùng tên đăng nhập.
- **Hàm ý thiết kế giao diện**: trang quản trị có danh sách tài khoản với lọc nhanh theo vai trò và trạng thái; chỉ báo trực quan cho các tài khoản chưa hoạt động trong 90 ngày hoặc thuộc nhân sự đã thôi việc; hộp thoại xác nhận hai bước cho thao tác đổi vai trò hoặc khóa tài khoản; xem trước phạm vi quyền của vai trò trước khi gán; tích hợp lối tắt đến trang Audit log của tài khoản đang chọn.

#### Nhiệm vụ 6 — Đăng ký khóa đào tạo (self-service)

- **Mục tiêu**: cán bộ đăng ký được khóa đào tạo mong muốn và nhận xác nhận tức thì; bộ phận tổ chức đào tạo nhận được danh sách đăng ký.
- **Tiền điều kiện**: cán bộ, giảng viên hoặc nhân viên đã có tài khoản đang hoạt động; khóa đào tạo do Phòng TCCB mở đang ở trạng thái "Đang mở đăng ký" và còn trong thời hạn; cán bộ chưa đăng ký khóa này.
- **HTA**:
  1. Đăng nhập trang cá nhân → mở mục "Khóa đào tạo đang mở".
  2. Xem chi tiết khóa đào tạo (thời gian, địa điểm, đơn vị tổ chức, chứng chỉ cấp).
  3. Nhấn "Đăng ký"; hệ thống kiểm tra điều kiện (vai trò, hạn đăng ký, hạn ngạch).
  4. Xác nhận đăng ký trên hộp thoại (tùy chọn ghi chú nguyện vọng); nhận xác nhận tức thì trên màn hình và qua email.
  5. Có thể vào "Khóa đào tạo của tôi" để xem trạng thái hoặc hủy nếu còn trong hạn cho phép.
- **Đặc trưng nhiệm vụ**: tần suất ~2 đợt/năm; ràng buộc thời gian theo hạn đăng ký của khóa học; mức quan trọng Important; mức tự do cao (cán bộ tự quyết định đăng ký).
- **Lỗi/ngoại lệ thường gặp**: đăng ký sau khi hết hạn; trùng lịch với khóa đào tạo khác; khóa đã hết chỗ; mất kết nối khi xác nhận; quên xem điều kiện về chứng chỉ.
- **Hàm ý thiết kế giao diện**: trang chủ cá nhân hiển thị nổi bật "Khóa đào tạo đang mở" với badge số ngày còn lại; nút "Đăng ký" lớn, có trạng thái "Đã đăng ký" sau khi hoàn tất; thông báo lỗi cụ thể nếu không thể đăng ký (nêu rõ lý do); bố cục responsive để đăng ký được từ điện thoại; gửi email xác nhận tự động để bù vào kỹ năng máy tính trung bình của nhóm người dùng cuối; mục "Khóa đào tạo của tôi" có lịch sử đào tạo đã tham gia.

### 2.3.4. Kết luận chương

Phân tích bốn nhóm người sử dụng và sáu nhiệm vụ trọng yếu ở trên cho thấy ba đặc điểm nổi bật của HRMS đối với thiết kế giao diện: (i) chênh lệch lớn về kỹ năng và tần suất sử dụng giữa các nhóm → giao diện phải phân tách rõ theo vai trò; (ii) hầu hết nhiệm vụ trọng yếu có ràng buộc thời gian và mức tiêu chuẩn hóa cao → biểu mẫu cần kiểm tra dữ liệu ngay khi nhập, cảnh báo trực quan và tổ chức công việc theo trạng thái; (iii) một số nhiệm vụ tự phục vụ được thực hiện ngoài giờ từ thiết bị cá nhân → cần responsive và thông báo qua email. Các kết quả này là đầu vào cho chương dựng nguyên mẫu (prototype) ở phần tiếp theo, dự kiến ưu tiên ba nhiệm vụ Critical (Thêm hồ sơ, Hợp đồng, Thống kê) theo cách tiếp cận thiết kế lặp của Bài 3.
