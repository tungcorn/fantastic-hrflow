# I. ĐỀ XUẤT ĐỀ BÀI

**Đề tài:** Hệ thống Quản lý Nhân sự (HRMS) — Trường Đại học Thủy Lợi.
**Môn học:** Tương tác Người – Máy.
**Nhóm thực hiện:** Nguyễn Hồng Phúc, Nguyễn Hải Ninh, Ngô Quang Tùng, Ngô Đức Nam Khánh.

## 1.1. Giới thiệu vấn đề

Trường Đại học Thủy Lợi hiện có hàng nghìn cán bộ, giảng viên và nhân viên thuộc nhiều khoa, phòng ban, viện nghiên cứu và đơn vị trực thuộc. Công tác quản lý nhân sự được giao cho Phòng Tổ chức – Cán bộ (TCCB) phối hợp với Phòng Tài chính – Kế toán (TCKT) và các đơn vị liên quan. Tuy nhiên, phần lớn nghiệp vụ hiện vẫn vận hành theo mô hình hỗn hợp: hồ sơ giấy lưu tại Phòng TCCB, các bảng tính Excel phục vụ tổng hợp – báo cáo, và một số biểu mẫu rời lưu trên ổ chia sẻ của phòng. Cách làm này tích lũy nhiều bất cập về tính nhất quán, thời gian xử lý và mức độ minh bạch dữ liệu, đặc biệt khi quy mô trường ngày càng mở rộng.

Đối với Phòng TCCB, các chuyên viên cho biết một thông tin nhân sự sau khi thay đổi (ví dụ điều chuyển đơn vị, gia hạn hợp đồng) phải được sao chép thủ công sang nhiều bảng tính khác nhau, dẫn đến sai lệch và mất thời gian đối soát; cuối quý, việc tổng hợp báo cáo biến động nhân sự để gửi Ban Giám hiệu có thể mất 2–3 ngày làm việc; hợp đồng lao động sắp hết hạn không có cảnh báo trực quan, buộc chuyên viên tự kiểm tra theo định kỳ. Khi quan sát thao tác thực tế, nhóm ghi nhận một lần thêm hồ sơ nhân sự mới mất khoảng 12 phút và đã phát sinh lỗi gõ trùng mã cán bộ.

Đối với Phòng TCKT, đội ngũ kế toán lương cần dữ liệu nhân sự, hệ số lương và phụ cấp để tính lương hằng tháng, nhưng phải đề nghị Phòng TCCB gửi qua thư điện tử và thường nhận chậm 1–2 ngày. Dữ liệu nhận về đôi khi thiếu cột hoặc không theo định dạng thống nhất, dẫn đến phải kiểm tra lại bằng tay; việc truy ngược lịch sử thay đổi hệ số lương ở các quý trước cũng rất khó. Thao tác xuất danh sách nhân sự theo đơn vị kết hợp hệ số lương có thể mất tới 25 phút mỗi lần và đòi hỏi nhiều bước thủ công bằng VLOOKUP.

Đối với cán bộ, giảng viên và nhân viên — nhóm người dùng cuối — việc xem thông tin hồ sơ cá nhân hay đăng ký tham gia khóa đào tạo của nhà trường vẫn dựa trên giấy tờ và email. Một giảng viên cho biết khi cần bản sao hồ sơ cá nhân phải gửi đề nghị lên TCCB và đợi 1–2 ngày; thông báo về các khóa đào tạo được gửi qua email khoa hoặc dán bảng tin, dễ bị bỏ lỡ; đăng ký khóa đào tạo phải viết đơn nộp về khoa rồi chuyển lên Phòng TCCB, kéo dài tổng cộng khoảng ba ngày làm việc.

Từ các phỏng vấn và quan sát, có thể thấy mục tiêu chung của cả ba nhóm người dùng là một giao diện thống nhất, có phân quyền theo vai trò, cho phép thao tác nhanh, giảm thiểu sai sót và minh bạch trạng thái dữ liệu. Đối với Phòng TCCB là rút ngắn thời gian xử lý hồ sơ và báo cáo; đối với Phòng TCKT là truy cập dữ liệu nhân sự kịp thời để tính lương; đối với cán bộ là khả năng tự phục vụ trên trình duyệt. Đây chính là cơ sở để nhóm đề xuất xây dựng một hệ thống quản lý nhân sự trực tuyến, lấy yêu cầu giao diện tiện dùng làm trọng tâm thiết kế.

## 1.2. Giải pháp

Nhóm đề xuất xây dựng **Hệ thống Quản lý Nhân sự (HRMS) — Trường Đại học Thủy Lợi** dưới dạng ứng dụng web nhiều người dùng, truy cập từ trình duyệt mà không cần cài đặt phần mềm riêng. Hệ thống được tổ chức theo mô hình giao diện đơn trang (single-page application) giao tiếp với máy chủ thông qua giao thức RESTful API, cho phép phân quyền theo vai trò và bảo đảm dữ liệu được cập nhật đồng bộ ngay trên mọi chế độ xem.

Trọng tâm thiết kế là **giao diện tiện dùng theo định nghĩa của ISO 9241-11**: hệ thống phải giúp người dùng đạt được mục tiêu một cách *hiệu quả* (chính xác và đầy đủ), *năng suất* (tiết kiệm thời gian và thao tác) và *thỏa mãn* (cảm giác làm chủ, không bực dọc khi sử dụng). Vì vậy, giao diện được tổ chức theo từng vai trò người dùng, sử dụng ngôn ngữ tiếng Việt nghiệp vụ, cung cấp bộ lọc đa tiêu chí, cảnh báo trực quan cho các trạng thái cần chú ý, và cho phép xuất Excel/PDF nhanh để phục vụ báo cáo.

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
