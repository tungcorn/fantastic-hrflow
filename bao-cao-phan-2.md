# II. PHÂN TÍCH NGƯỜI SỬ DỤNG VÀ PHÂN TÍCH NHIỆM VỤ

## 2.1. Giới thiệu

Theo cách tiếp cận thiết kế lấy người dùng làm trung tâm được trình bày trong các slide bài giảng Bài 3, Bài 4 và Bài 5 của môn Tương tác Người – Máy, hai bước đầu tiên trước khi tiến hành dựng nguyên mẫu giao diện là **hiểu rõ người sử dụng** và **hiểu rõ chức năng hoạt động** mà người dùng cần thực hiện. Đặt trong khung định nghĩa tính tiện dùng của ISO 9241-11, hai bước này tương ứng với việc làm rõ *người sử dụng* và *nhiệm vụ* trong bộ ba ngữ cảnh sử dụng (người sử dụng – nhiệm vụ – thiết bị, môi trường). Bỏ qua hai bước này, người thiết kế sẽ rơi vào tình trạng chỉ tập trung vào tính năng mà không phản ánh được mục tiêu, năng lực và hành vi thực tế của người dùng.

Chương này trình bày kết quả khảo sát của nhóm theo hai phần. Phần 2.2 phân tích bốn nhóm người sử dụng chính của Hệ thống Quản lý Nhân sự (HRMS) — Trường Đại học Thủy Lợi: Quản trị viên (Admin), Phòng TCCB, Phòng TCKT và Cán bộ/Giảng viên/Nhân viên. Phần 2.3 chọn ra sáu nhiệm vụ trọng yếu, mỗi nhiệm vụ được phân tích đầy đủ theo khung của slide Bài 5: tác nhân, mục tiêu, điều kiện kích hoạt, tiền điều kiện, hậu điều kiện, phân rã nhiệm vụ phân cấp (HTA), đặc trưng nhiệm vụ, lỗi/ngoại lệ thường gặp và hàm ý thiết kế giao diện.

Nguồn dữ liệu của chương được thu thập qua phỏng vấn bán cấu trúc và quan sát thao tác thực tế với ba người dùng đại diện cho ba nhóm chính (mã hóa TCCB-01, TCKT-01, GV-01), bổ sung quan sát ngắn và phân tích actors từ tài liệu thiết kế nội bộ của nhóm cho vai trò Quản trị viên. Các quan sát và phát biểu tiêu biểu được trích lại từ bảng evidence phỏng vấn riêng của nhóm và được dùng làm minh chứng cho các nhận định bên dưới.

## 2.2. Phân tích người sử dụng

### 2.2.1. Phương pháp thu thập thông tin

Nhóm sử dụng kết hợp ba phương pháp: (i) **phỏng vấn bán cấu trúc** mỗi buổi 45–60 phút với ba người dùng đại diện thuộc ba nhóm khác nhau; (ii) **quan sát thao tác trực tiếp** trên quy trình giấy và bảng tính Excel mà người được phỏng vấn đang sử dụng, ghi nhận số bước, thời gian và lỗi xảy ra; (iii) **đối chiếu với tài liệu thiết kế hệ thống nội bộ** của nhóm để xác nhận vai trò Quản trị viên — nhóm có quy mô nhỏ và lịch làm việc khó hẹn dài, nên được bổ sung bằng quan sát thao tác cấp tài khoản và phỏng vấn ngắn qua điện thoại.

### 2.2.2. Các nhóm người sử dụng chính

#### a. Quản trị viên (Admin) — Phòng Công nghệ Thông tin

- **Vai trò và trách nhiệm**: cấp phát và khóa tài khoản, phân quyền theo vai trò, thiết lập cây cơ cấu tổ chức, theo dõi nhật ký hệ thống (audit log) và bảo đảm hệ thống vận hành ổn định.
- **Quy mô và đặc điểm**: khoảng 2–3 chuyên viên Phòng CNTT; có thể có thêm cán bộ thay thế khi vắng mặt.
- **Kỹ năng máy tính**: cao; thành thạo công cụ quản trị web, dòng lệnh, quản trị cơ sở dữ liệu.
- **Kỹ năng nghiệp vụ HRMS**: trung bình; hiểu nguyên tắc phân quyền nhưng không trực tiếp xử lý hồ sơ.
- **Tần suất sử dụng**: hàng ngày trong giờ hành chính, cao điểm vào đầu kỳ tuyển dụng hoặc khi có sự cố.
- **Bắt buộc/tùy chọn**: bắt buộc, là một phần công việc chính.
- **Mục tiêu chính**: bảo đảm mỗi người dùng có đúng vai trò và đúng quyền; phát hiện sớm các hành vi bất thường; bảo toàn dữ liệu.
- **Khó khăn hiện tại**: thiếu công cụ giám sát tập trung, phải kết hợp nhiều phần mềm để theo dõi.
- **Thiết bị/môi trường**: máy bàn văn phòng kết nối mạng nội bộ, không có nhu cầu di động.
- **Hàm ý thiết kế UI**: cần một trang quản trị riêng, danh sách tài khoản có lọc nhanh theo vai trò và trạng thái, bảng audit log hỗ trợ tìm kiếm theo khoảng thời gian và loại sự kiện, các thao tác phá hủy (xóa, khóa) phải có xác nhận hai bước.

#### b. Phòng Tổ chức – Cán bộ (TCCB)

- **Vai trò và trách nhiệm**: quản lý hồ sơ nhân sự, lập và gia hạn hợp đồng lao động, điều chuyển – bổ nhiệm, ghi nhận khen thưởng – kỷ luật, mở khóa đào tạo và theo dõi kết quả đào tạo cho cán bộ.
- **Quy mô và đặc điểm**: khoảng 5–8 chuyên viên có thâm niên trong công tác tổ chức – cán bộ.
- **Kỹ năng máy tính**: trung bình – khá; thành thạo Word, Excel cơ bản, email và phần mềm công vụ điện tử của trường; chưa quen với pivot table phức tạp.
- **Kỹ năng nghiệp vụ HRMS**: rất cao; nắm vững quy chế tuyển dụng, ngạch bậc, quy trình hợp đồng theo quy định Nhà nước và quy chế nội bộ.
- **Tần suất sử dụng**: hàng ngày, khoảng 6–7 giờ/ngày, cao điểm cuối tháng và cuối quý.
- **Bắt buộc/tùy chọn**: bắt buộc.
- **Mục tiêu chính**: giữ hồ sơ chính xác, hợp đồng đúng hạn, báo cáo biến động nhân sự kịp thời cho Ban Giám hiệu và Phòng TCKT.
- **Khó khăn hiện tại**: trùng dữ liệu giữa nhiều bảng tính; chuyên viên TCCB-01 cho biết một lần điều chuyển phải sửa thông tin ở ít nhất ba file Excel khác nhau, và một thao tác thêm hồ sơ mới mất khoảng 12 phút với rủi ro gõ trùng mã cán bộ; cuối quý mất 2–3 ngày để tổng hợp báo cáo biến động; hợp đồng hết hạn không có cảnh báo trực quan.
- **Thiết bị/môi trường**: máy bàn văn phòng kết nối mạng nội bộ; làm việc trong giờ hành chính.
- **Hàm ý thiết kế UI**: cần một nguồn dữ liệu duy nhất, mọi thay đổi tự đồng bộ giữa các chế độ xem; bộ lọc đa tiêu chí cho danh sách nhân sự; cảnh báo trực quan (badge, danh sách "Sắp hết hạn") cho hợp đồng; biểu mẫu thêm/sửa hồ sơ phải gọn, có kiểm tra trùng mã ngay khi nhập; chức năng xuất Excel/PDF nhanh phục vụ báo cáo định kỳ.

#### c. Phòng Tài chính – Kế toán (TCKT)

- **Vai trò và trách nhiệm**: tra cứu danh sách nhân sự, hệ số lương và phụ cấp; tính lương; xuất bảng lương; phối hợp với Phòng TCCB để cập nhật biến động nhân sự ảnh hưởng đến lương.
- **Quy mô và đặc điểm**: khoảng 5–8 kế toán lương, làm việc theo cặp đối chiếu.
- **Kỹ năng máy tính**: cao; thành thạo Excel nâng cao (VLOOKUP, pivot, conditional format), sử dụng phần mềm kế toán chuyên ngành.
- **Kỹ năng nghiệp vụ HRMS**: trung bình; tập trung vào dữ liệu lương và phụ cấp, ít can thiệp hồ sơ.
- **Tần suất sử dụng**: hàng tuần đối với tra cứu, hằng ngày trong tuần tính lương cuối tháng.
- **Bắt buộc/tùy chọn**: bắt buộc cho công tác tính lương.
- **Mục tiêu chính**: lấy được dữ liệu nhân sự đúng và nhanh để tính lương, xuất bảng lương đúng kỳ hạn.
- **Khó khăn hiện tại**: chuyên viên TCKT-01 mô tả phải xin file Excel từ Phòng TCCB qua email và thường nhận chậm 1–2 ngày; dữ liệu thiếu cột, không đồng nhất; thao tác xuất danh sách nhân sự kết hợp hệ số lương mất khoảng 25 phút mỗi lần và phải tự đối chiếu để tránh sai mã đơn vị.
- **Thiết bị/môi trường**: máy bàn văn phòng kết nối mạng nội bộ.
- **Hàm ý thiết kế UI**: trang thống kê có quyền truy cập trực tiếp cho Phòng TCKT với bộ lọc đa tiêu chí; chức năng xuất Excel theo template thống nhất; có lịch sử thay đổi hệ số lương ở dạng dòng thời gian; xem chi tiết hồ sơ ở chế độ chỉ đọc đối với các trường nằm ngoài phạm vi nghiệp vụ TCKT.

#### d. Cán bộ, Giảng viên, Nhân viên (Cán bộ/GV/NV)

- **Vai trò và trách nhiệm**: là chủ thể của dữ liệu nhân sự; sử dụng chức năng tự phục vụ để xem hồ sơ cá nhân, thông tin đơn vị công tác và đăng ký các khóa đào tạo do nhà trường mở.
- **Quy mô và đặc điểm**: hàng nghìn người dùng phân bố trên toàn trường; rất đa dạng về độ tuổi, lĩnh vực chuyên môn và thói quen sử dụng máy tính.
- **Kỹ năng máy tính**: trung bình; quen sử dụng email, hệ thống học tập trực tuyến, nhưng ít dùng phần mềm quản trị nội bộ.
- **Kỹ năng nghiệp vụ HRMS**: thấp; tiếp xúc ở vai trò người dùng cuối, không thuộc lĩnh vực chuyên môn.
- **Tần suất sử dụng**: thưa, khoảng 1–2 lần/tháng đối với việc tra hồ sơ, và 1–2 đợt/năm đối với đăng ký khóa đào tạo.
- **Bắt buộc/tùy chọn**: tùy chọn nhưng được khuyến khích cho các nhiệm vụ tự phục vụ.
- **Mục tiêu chính**: xem được hồ sơ cá nhân và đăng ký khóa đào tạo một cách độc lập, không phải đi lại nộp giấy.
- **Khó khăn hiện tại**: giảng viên GV-01 cho biết phải lên Phòng TCCB xin bản sao hồ sơ mất 1–2 ngày; dễ bỏ lỡ thông báo khóa đào tạo dán bảng tin/email; quy trình đăng ký bằng giấy mất khoảng ba ngày làm việc.
- **Thiết bị/môi trường**: đa dạng — máy bàn ở văn phòng khoa, máy xách tay cá nhân, đôi khi truy cập từ ngoài trường; sử dụng cả trong và ngoài giờ làm việc.
- **Hàm ý thiết kế UI**: cần một trang cá nhân đơn giản, đăng nhập một lần và xem được tất cả thông tin liên quan; thông báo khóa đào tạo nổi bật trên trang chủ; biểu mẫu đăng ký gọn, xác nhận tức thì; bố cục responsive để truy cập từ điện thoại hoặc máy tính ngoài cơ quan; ngôn ngữ tiếng Việt thông dụng, tránh thuật ngữ hành chính.

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

Sáu nhiệm vụ được chọn dưới đây dựa trên ba tiêu chí: (i) đại diện cho cả bốn nhóm người sử dụng đã phân tích ở mục 2.2; (ii) là nhiệm vụ có tần suất cao hoặc có mức độ quan trọng nghiệp vụ "Critical"; (iii) được ghi nhận có pain point rõ ràng trong phỏng vấn và quan sát. Mỗi nhiệm vụ được phân tích đầy đủ theo chín mục: tác nhân, mục tiêu, điều kiện kích hoạt, tiền điều kiện, hậu điều kiện, phân rã nhiệm vụ phân cấp (HTA), đặc trưng nhiệm vụ, lỗi/ngoại lệ thường gặp và hàm ý thiết kế giao diện.

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

- **Tác nhân chính**: chuyên viên Phòng TCCB. **Tác nhân hỗ trợ**: hệ thống tự động cấp mã cán bộ.
- **Mục tiêu**: hồ sơ của cán bộ mới được lưu vào hệ thống đầy đủ, chính xác và sẵn sàng cho các quy trình tiếp theo (ký hợp đồng, bổ nhiệm).
- **Điều kiện kích hoạt**: có quyết định tuyển dụng hoặc tiếp nhận nhân sự mới; chuyên viên nhận được bộ hồ sơ giấy và bản scan.
- **Tiền điều kiện**: chuyên viên đã đăng nhập với vai trò TCCB; cơ cấu tổ chức đã có đơn vị dự kiến tiếp nhận; danh mục hệ số lương đã được cấu hình.
- **Hậu điều kiện**: hồ sơ mới hiển thị trong danh sách nhân sự, có mã cán bộ duy nhất; sự kiện được ghi vào nhật ký hệ thống.
- **Phân rã nhiệm vụ phân cấp (HTA)**:
  1. Mở module Quản lý Hồ sơ Nhân sự → chọn "Thêm hồ sơ mới".
  2. Nhập thông tin cá nhân (họ tên, ngày sinh, số định danh, giới tính, dân tộc, quê quán, địa chỉ liên lạc).
  3. Nhập thông tin trình độ học vấn và chuyên môn (học hàm, học vị, chuyên ngành, nơi đào tạo).
  4. Chọn đơn vị công tác từ cây tổ chức.
  5. Chọn hệ số lương và phụ cấp dự kiến.
  6. Đính kèm các tài liệu scan (CMND/CCCD, bằng cấp, quyết định tuyển dụng).
  7. Kiểm tra hệ thống cảnh báo trùng mã định danh hoặc trùng họ tên + ngày sinh.
  8. Xác nhận và lưu; hệ thống tự động sinh mã cán bộ theo quy tắc cấu hình.
- **Đặc trưng nhiệm vụ**: tần suất hàng tuần và cao điểm đầu năm học; ràng buộc thời gian không gắt nhưng quan sát cho thấy mỗi hồ sơ mất khoảng 12 phút khi làm trên Excel; mức quan trọng Critical; mức độ phức tạp trung bình do nhiều trường dữ liệu; mức tự do của người dùng hạn chế (phải nhập đúng định dạng); mức lặp lại cao trong cao điểm; mức tiêu chuẩn hóa cao vì đã có biểu mẫu giấy theo quy chế.
- **Lỗi/ngoại lệ thường gặp**: gõ trùng mã định danh; thiếu trường bắt buộc; sai định dạng ngày tháng; mất kết nối khi đang lưu; quên đính kèm tài liệu.
- **Hàm ý thiết kế giao diện**: biểu mẫu chia thành nhiều bước (wizard) với thanh tiến trình; kiểm tra trùng dữ liệu ngay khi nhập; gợi ý chọn đơn vị từ cây tổ chức có ô tìm kiếm nhanh; cho phép lưu nháp giữa chừng; hiển thị mã cán bộ vừa cấp ở trang xác nhận; có nút "Thêm hồ sơ tiếp theo" để hỗ trợ thao tác lặp trong cao điểm.

#### Nhiệm vụ 2 — Tạo và gia hạn hợp đồng lao động

- **Tác nhân chính**: chuyên viên Phòng TCCB.
- **Mục tiêu**: nhân sự được gắn một hợp đồng có hiệu lực đúng loại và đúng kỳ hạn, hệ thống tự động theo dõi để cảnh báo khi sắp hết hạn.
- **Điều kiện kích hoạt**: hồ sơ nhân sự cần ký hợp đồng mới, gia hạn hợp đồng hiện hữu, hoặc chuyển loại hợp đồng (ví dụ: thử việc → chính thức).
- **Tiền điều kiện**: hồ sơ nhân sự đã tồn tại; danh mục loại hợp đồng đã cấu hình; chuyên viên có quyền lập hợp đồng.
- **Hậu điều kiện**: hợp đồng mới có trạng thái "Có hiệu lực" hoặc "Chờ hiệu lực"; hợp đồng cũ chuyển sang "Hết hiệu lực" nếu là trường hợp gia hạn; sự kiện ghi vào nhật ký.
- **HTA**:
  1. Mở chi tiết hồ sơ nhân sự → chọn tab "Hợp đồng" → "Tạo hợp đồng".
  2. Chọn loại hợp đồng từ danh mục.
  3. Nhập số hợp đồng, ngày ký, ngày bắt đầu, ngày kết thúc.
  4. Chọn hệ số lương và phụ cấp áp dụng cho hợp đồng.
  5. Đính kèm bản scan hợp đồng đã ký.
  6. Hệ thống kiểm tra chồng chéo với hợp đồng đang có hiệu lực.
  7. Nếu là gia hạn: hệ thống đề xuất kế thừa các trường từ hợp đồng cũ; người dùng xác nhận hoặc chỉnh sửa.
  8. Lưu hợp đồng; hệ thống cập nhật trạng thái và lịch nhắc hết hạn.
- **Đặc trưng nhiệm vụ**: tần suất hàng tháng; ràng buộc thời gian cao khi hợp đồng cũ sắp hết hạn; mức quan trọng Critical; mức độ phức tạp trung bình – cao do nhiều quy tắc ngày tháng; mức tự do hạn chế (theo loại hợp đồng); mức lặp lại trung bình; mức tiêu chuẩn hóa cao theo quy định pháp luật và quy chế nhà trường.
- **Lỗi/ngoại lệ thường gặp**: gia hạn quá muộn (hợp đồng đã hết hạn vẫn cập nhật); chọn sai loại hợp đồng; ngày bắt đầu trùng hoặc trước ngày kết thúc hợp đồng cũ; không đính kèm bản scan.
- **Hàm ý thiết kế giao diện**: trang chính TCCB hiển thị danh sách "Hợp đồng sắp hết hạn trong 30/60 ngày" dưới dạng badge và bộ lọc nhanh; nút "Gia hạn" ngay trong hàng để rút ngắn thao tác; biểu mẫu đề xuất ngày kết thúc theo loại hợp đồng; kiểm tra chồng lấn thời gian ngay khi nhập; cảnh báo nếu thiếu tài liệu đính kèm.

#### Nhiệm vụ 3 — Điều chuyển và bổ nhiệm nhân sự

- **Tác nhân chính**: chuyên viên Phòng TCCB.
- **Mục tiêu**: nhân sự được gắn vào đúng đơn vị mới với mốc thời gian rõ ràng; lịch sử công tác được lưu lại.
- **Điều kiện kích hoạt**: có quyết định điều chuyển, bổ nhiệm hoặc bãi nhiệm từ Ban Giám hiệu hoặc đơn vị có thẩm quyền.
- **Tiền điều kiện**: hồ sơ nhân sự và đơn vị đích đã tồn tại; quyết định đã được ban hành; chuyên viên có quyền thực hiện.
- **Hậu điều kiện**: trường "Đơn vị công tác" của nhân sự đã cập nhật; lịch sử công tác có thêm bản ghi với ngày bắt đầu và kết thúc; sự kiện ghi vào nhật ký.
- **HTA**:
  1. Mở chi tiết hồ sơ nhân sự → chọn tab "Quá trình công tác" → "Điều chuyển/Bổ nhiệm".
  2. Chọn loại thao tác (điều chuyển, bổ nhiệm chức vụ, bãi nhiệm).
  3. Chọn đơn vị/chức vụ mới từ cây tổ chức.
  4. Nhập ngày hiệu lực; tùy chọn ghi chú quyết định.
  5. Đính kèm bản scan quyết định.
  6. Hệ thống kiểm tra mâu thuẫn (ví dụ: bổ nhiệm vào chức vụ đã có người nắm giữ).
  7. Xác nhận và lưu; hệ thống tạo bản ghi lịch sử và cập nhật đơn vị hiện tại.
- **Đặc trưng nhiệm vụ**: tần suất hàng tháng; ràng buộc thời gian trung bình; mức quan trọng Important; mức độ phức tạp trung bình; mức tự do trung bình (phải theo quyết định gốc); mức lặp lại thấp – trung bình; mức tiêu chuẩn hóa cao theo quy chế.
- **Lỗi/ngoại lệ thường gặp**: chọn nhầm đơn vị (cây tổ chức nhiều tầng); ngày hiệu lực ngược; bỏ sót cập nhật hợp đồng kèm theo khi đổi đơn vị; thiếu đính kèm quyết định.
- **Hàm ý thiết kế giao diện**: cây tổ chức có ô tìm kiếm và đánh dấu đơn vị vừa chọn; biểu mẫu xác nhận hiển thị "đơn vị cũ → đơn vị mới" trước khi lưu; cảnh báo nếu nhân sự đang giữ chức vụ ở đơn vị cũ; gợi ý các tài liệu cần đính kèm theo loại thao tác; mỗi thay đổi xuất hiện ngay trong dòng thời gian "Quá trình công tác" của hồ sơ.

#### Nhiệm vụ 4 — Xem và xuất thống kê nhân sự đa chiều

- **Tác nhân chính**: chuyên viên Phòng TCKT (chính) và Phòng TCCB (đồng truy cập).
- **Mục tiêu**: có được báo cáo nhân sự theo bộ lọc mong muốn (đơn vị, trình độ, hệ số lương, hợp đồng, đào tạo) trong thời gian ngắn để phục vụ tính lương và quản lý.
- **Điều kiện kích hoạt**: cuối kỳ tính lương, có yêu cầu báo cáo từ Ban Giám hiệu, hoặc cần đối chiếu giữa hai phòng.
- **Tiền điều kiện**: chuyên viên đã đăng nhập với vai trò TCKT hoặc TCCB; dữ liệu nhân sự và lương trong hệ thống đã cập nhật đến kỳ báo cáo.
- **Hậu điều kiện**: báo cáo được hiển thị trên màn hình và/hoặc xuất ra tệp Excel/PDF; nhật ký truy xuất được ghi nhận.
- **HTA**:
  1. Mở module Báo cáo và Nhật ký hệ thống → chọn loại báo cáo (tổng quan, biến động, hợp đồng, đào tạo).
  2. Chọn bộ lọc: khoảng thời gian, đơn vị, hệ số lương, trình độ, học hàm, trạng thái hợp đồng.
  3. Xem kết quả trên màn hình ở dạng bảng và biểu đồ.
  4. Tùy chỉnh hiển thị cột (ẩn/hiện cột không cần thiết).
  5. Xuất ra Excel hoặc PDF theo template; tải xuống.
  6. Lưu bộ lọc đã dùng (tùy chọn) để tái sử dụng kỳ sau.
- **Đặc trưng nhiệm vụ**: tần suất hàng tuần, cao điểm cuối tháng; ràng buộc thời gian cao trong tuần tính lương; mức quan trọng Critical; mức độ phức tạp trung bình; mức tự do cao (tùy biến bộ lọc); mức lặp lại trung bình (mỗi kỳ thường lặp lại bộ lọc tương tự); mức tiêu chuẩn hóa trung bình.
- **Lỗi/ngoại lệ thường gặp**: chọn nhầm khoảng thời gian; bỏ sót đơn vị con khi lọc theo đơn vị cha; kết quả quá lớn làm chậm tải; mất phiên đăng nhập khi xuất tệp lớn.
- **Hàm ý thiết kế giao diện**: trang báo cáo cho TCKT có sẵn các bộ lọc kỳ hạn phổ biến (tháng này, quý này, năm nay); cho phép lưu bộ lọc thành "Báo cáo của tôi"; xuất Excel với template thống nhất; tự động bao gồm các đơn vị con khi chọn đơn vị cha, có công tắc tắt hành vi này; xuất tệp lớn ở chế độ nền và thông báo khi sẵn sàng để tránh treo trình duyệt.

#### Nhiệm vụ 5 — Quản lý tài khoản và phân quyền

- **Tác nhân chính**: Quản trị viên (Phòng CNTT).
- **Mục tiêu**: mỗi cán bộ trong hệ thống có một tài khoản hoạt động, được phân đúng vai trò; tài khoản của nhân sự thôi việc bị khóa kịp thời.
- **Điều kiện kích hoạt**: nhận yêu cầu cấp tài khoản từ Phòng TCCB khi có nhân sự mới; nhận yêu cầu thay đổi vai trò; nhận thông báo nhân sự thôi việc; thực hiện rà soát định kỳ.
- **Tiền điều kiện**: hồ sơ nhân sự đã được Phòng TCCB tạo trong hệ thống; quản trị viên có quyền "Quản lý tài khoản"; chính sách phân quyền theo vai trò đã được phê duyệt.
- **Hậu điều kiện**: tài khoản mới được tạo, được phân vai trò, người dùng nhận mật khẩu khởi tạo; hoặc tài khoản hiện hữu được cập nhật, khóa/mở khóa, thay đổi vai trò; mọi thao tác ghi vào nhật ký.
- **HTA**:
  1. Mở module Hệ thống và Tài khoản → trang Quản lý tài khoản.
  2. Tìm kiếm tài khoản theo mã cán bộ, họ tên hoặc đơn vị; hoặc chọn "Thêm mới".
  3. Nếu thêm mới: chọn cán bộ từ danh sách hồ sơ chưa có tài khoản; hệ thống đề xuất tên đăng nhập theo quy tắc; phân vai trò (Admin, TCCB, TCKT, Cán bộ/GV/NV).
  4. Nếu cập nhật: thay đổi vai trò, đặt lại mật khẩu hoặc đổi trạng thái (Đang hoạt động/Bị khóa).
  5. Xem nhật ký truy cập gần đây của tài khoản (nếu cần kiểm tra hành vi bất thường).
  6. Xác nhận và lưu; nếu là tạo mới, hệ thống gửi mật khẩu khởi tạo qua kênh được cấu hình.
- **Đặc trưng nhiệm vụ**: tần suất theo sự kiện (mỗi đợt tuyển dụng/thôi việc) cộng với rà soát hàng tháng; ràng buộc thời gian trung bình; mức quan trọng Critical (ảnh hưởng an ninh hệ thống); mức độ phức tạp trung bình; mức tự do trung bình (phải theo chính sách phân quyền); mức lặp lại trung bình; mức tiêu chuẩn hóa cao.
- **Lỗi/ngoại lệ thường gặp**: cấp sai vai trò; quên khóa tài khoản nhân sự thôi việc; đặt lại mật khẩu sai tài khoản; trùng tên đăng nhập.
- **Hàm ý thiết kế giao diện**: trang quản trị có danh sách tài khoản với lọc nhanh theo vai trò và trạng thái; chỉ báo trực quan cho các tài khoản chưa hoạt động trong 90 ngày hoặc thuộc nhân sự đã thôi việc; hộp thoại xác nhận hai bước cho thao tác đổi vai trò hoặc khóa tài khoản; xem trước phạm vi quyền của vai trò trước khi gán; tích hợp lối tắt đến trang Audit log của tài khoản đang chọn.

#### Nhiệm vụ 6 — Đăng ký khóa đào tạo (self-service)

- **Tác nhân chính**: cán bộ, giảng viên hoặc nhân viên đăng nhập với vai trò người dùng cuối.
- **Mục tiêu**: cán bộ đăng ký được khóa đào tạo mong muốn và nhận xác nhận tức thì; bộ phận tổ chức đào tạo nhận được danh sách đăng ký.
- **Điều kiện kích hoạt**: Phòng TCCB mở một đợt đào tạo; cán bộ nhận thông báo và quan tâm tham gia.
- **Tiền điều kiện**: cán bộ đã có tài khoản đang hoạt động; khóa đào tạo ở trạng thái "Đang mở đăng ký" và còn trong thời hạn; cán bộ chưa đăng ký khóa này.
- **Hậu điều kiện**: đăng ký được lưu vào hệ thống với trạng thái "Đã đăng ký"; cán bộ thấy khóa học trong danh sách "Khóa đào tạo của tôi"; Phòng TCCB thấy cán bộ trong danh sách đăng ký.
- **HTA**:
  1. Đăng nhập vào trang cá nhân.
  2. Mở mục "Khóa đào tạo đang mở" trên trang chủ.
  3. Xem chi tiết khóa đào tạo (thời gian, địa điểm, đơn vị tổ chức, chứng chỉ cấp).
  4. Nhấn "Đăng ký"; hệ thống kiểm tra điều kiện (vai trò, hạn đăng ký, hạn ngạch).
  5. Xác nhận đăng ký trên hộp thoại; tùy chọn ghi chú nguyện vọng.
  6. Nhận xác nhận tức thì trên màn hình và thông báo qua email.
  7. Sau đó có thể vào "Khóa đào tạo của tôi" để xem trạng thái hoặc hủy nếu còn trong hạn cho phép.
- **Đặc trưng nhiệm vụ**: tần suất ~2 đợt/năm; ràng buộc thời gian theo hạn đăng ký của khóa học; mức quan trọng Important; mức độ phức tạp thấp – trung bình; mức tự do cao (cán bộ quyết định đăng ký hay không); mức lặp lại thấp; mức tiêu chuẩn hóa trung bình.
- **Lỗi/ngoại lệ thường gặp**: đăng ký sau khi hết hạn; trùng lịch với khóa đào tạo khác; khóa đã hết chỗ; mất kết nối khi xác nhận; quên xem điều kiện về chứng chỉ.
- **Hàm ý thiết kế giao diện**: trang chủ cá nhân hiển thị nổi bật "Khóa đào tạo đang mở" với badge số ngày còn lại; nút "Đăng ký" lớn, có trạng thái "Đã đăng ký" sau khi hoàn tất; thông báo lỗi cụ thể nếu không thể đăng ký (nêu rõ lý do); bố cục responsive để đăng ký được từ điện thoại; gửi email xác nhận tự động để bù vào kỹ năng máy tính trung bình của nhóm người dùng cuối; mục "Khóa đào tạo của tôi" có lịch sử đào tạo đã tham gia.

### 2.3.4. Kết luận chương

Phân tích bốn nhóm người sử dụng và sáu nhiệm vụ trọng yếu ở trên cho thấy ba đặc điểm nổi bật của Hệ thống Quản lý Nhân sự (HRMS) — Trường Đại học Thủy Lợi đối với thiết kế giao diện. Thứ nhất, các nhóm người dùng có chênh lệch rất lớn về kỹ năng máy tính, kỹ năng nghiệp vụ và tần suất sử dụng; do đó giao diện phải được phân tách rõ theo vai trò, với mức độ chi tiết khác nhau cho từng nhóm. Thứ hai, các nhiệm vụ trọng yếu đều có ràng buộc thời gian và mức tiêu chuẩn hóa cao; vì vậy biểu mẫu phải hỗ trợ kiểm tra dữ liệu ngay khi nhập, cung cấp cảnh báo trực quan và tổ chức danh sách công việc theo trạng thái để giảm tải nhận thức. Thứ ba, một số nhiệm vụ tự phục vụ được thực hiện ngoài giờ và từ thiết bị cá nhân, do đó tính responsive và thông báo qua email là điều kiện cần để bảo đảm tính tiện dùng theo ISO 9241-11 trong các ngữ cảnh sử dụng khác nhau.

Các kết quả của Mục 2.2 và Mục 2.3 sẽ là đầu vào cho chương dựng nguyên mẫu (prototype) và đánh giá người dùng ở các phần tiếp theo của báo cáo. Theo cách tiếp cận thiết kế lặp được trình bày ở Bài 3, nhóm dự kiến dựng nguyên mẫu giấy cho ba nhiệm vụ Critical (Thêm hồ sơ, Hợp đồng, Thống kê) trước, đánh giá nhanh với hai người dùng đại diện, rồi sửa đổi và mở rộng sang các nhiệm vụ còn lại để bảo đảm giao diện cuối phản ánh đúng yêu cầu người sử dụng.
