# III. PHÁC HỌA THIẾT KẾ

## 3.1. Thiết kế tổng quan

Trong giai đoạn phác họa thiết kế, nhóm tập trung vào 5 nhiệm vụ chính của hệ thống HRMS. Các nhiệm vụ này thuộc hai nghiệp vụ lõi: quản lý hồ sơ nhân sự và quản lý hợp đồng lao động. Đây là các luồng thao tác được Phòng Tổ chức - Cán bộ sử dụng thường xuyên, có dữ liệu liên quan trực tiếp đến trạng thái làm việc, hợp đồng, đơn vị công tác và các bước xử lý nhân sự tiếp theo.

5 nhiệm vụ được chọn gồm:

| STT | Nhiệm vụ | Người dùng chính | Mục tiêu thiết kế |
| --- | --- | --- | --- |
| 1 | Xem/Tìm kiếm danh sách hồ sơ nhân sự | Phòng TCCB, Phòng TCKT | Giúp người dùng tra cứu nhanh hồ sơ theo từ khóa và bộ lọc. |
| 2 | Thêm hồ sơ nhân sự | Phòng TCCB | Hỗ trợ nhập hồ sơ mới theo từng bước, giảm thiếu sót dữ liệu. |
| 3 | Xem/Tìm kiếm danh sách hợp đồng | Phòng TCCB | Theo dõi tình trạng hợp đồng, phát hiện hợp đồng sắp hết hạn. |
| 4 | Thêm hợp đồng | Phòng TCCB | Tạo hợp đồng lao động mới, kiểm tra ràng buộc nghiệp vụ trước khi lưu. |
| 5 | Gia hạn hợp đồng | Phòng TCCB | Tạo hợp đồng kế tiếp cho hợp đồng sắp hết hạn, tránh gián đoạn hiệu lực. |

Thiết kế giao diện được xây dựng theo hướng web app quản trị nội bộ. Mỗi màn hình có cấu trúc thống nhất gồm: thanh điều hướng bên trái, thanh tiêu đề phía trên, vùng nội dung chính, bảng dữ liệu, bộ lọc và các nút thao tác chính. Các nghiệp vụ nhập liệu phức tạp như thêm hồ sơ, thêm hợp đồng và gia hạn hợp đồng được thiết kế dưới dạng hộp thoại lớn hoặc wizard nhiều bước để người dùng tập trung vào nhiệm vụ hiện tại mà vẫn nhìn được ngữ cảnh từ màn hình danh sách phía sau.

Về nguyên tắc tương tác, nhóm ưu tiên ba yếu tố: hiển thị rõ trạng thái nghiệp vụ bằng badge màu, đặt nút hành động tại đúng vị trí người dùng cần thao tác, và kiểm tra lỗi ngay trên form thay vì để người dùng nhập xong mới phát hiện sai. Các trạng thái như "Đang hoạt động", "Đã thôi việc", "Chờ gia hạn", "Còn hiệu lực", "Sắp hết hạn" và "Hết hiệu lực" được thể hiện bằng nhãn màu để người dùng có thể quét bảng nhanh.

## 3.2. Thiết kế kịch bản mẫu

### 3.2.1. Nhiệm vụ 1: Xem/Tìm kiếm danh sách hồ sơ nhân sự

**Mục tiêu.** Nhiệm vụ này giúp chuyên viên Phòng TCCB hoặc Phòng TCKT xem danh sách hồ sơ nhân sự và tìm nhanh hồ sơ cần tra cứu theo tên, mã nhân sự, đơn vị công tác, học hàm/học vị, trạng thái hợp đồng hoặc trạng thái làm việc.

![Phác họa màn hình danh sách hồ sơ nhân sự](.figma-review/01-danh-sach-ho-so.png)

**Cửa sổ chính.** Màn hình "Hồ sơ nhân sự" là cửa sổ danh sách dạng bảng. Phần bên trái là cây thực đơn của nhóm chức năng nhân sự, gồm: Hồ sơ nhân sự, Hệ số lương, Phụ cấp, Hợp đồng và Thống kê. Mục "Hồ sơ nhân sự" được tô nổi để cho biết người dùng đang ở đúng module.

**Vùng tìm kiếm và lọc.** Phía trên bảng có ô tìm kiếm nhanh và các bộ lọc dạng dropdown: Đơn vị công tác, Học hàm/học vị, Hợp đồng và Trạng thái. Thiết kế này hỗ trợ cả tìm kiếm theo từ khóa và lọc đa tiêu chí. Khi người dùng nhập từ khóa hoặc chọn bộ lọc, bảng bên dưới được cập nhật để chỉ hiển thị các hồ sơ phù hợp.

**Bảng dữ liệu.** Bảng hồ sơ hiển thị các cột quan trọng: Mã NS, Họ tên, Đơn vị công tác, Học hàm/Học vị, Chức vụ, Hợp đồng và Trạng thái. Các trạng thái được biểu diễn bằng badge màu để người dùng dễ nhận biết hồ sơ nào đang hoạt động, đã thôi việc hoặc đang chờ gia hạn hợp đồng.

**Chức năng chính.** Người dùng có thể tìm kiếm, lọc, chuyển trang, xem trạng thái hồ sơ và nhấn biểu tượng chỉnh sửa ở từng dòng. Nút "Thêm hồ sơ nhân sự" ở góc phải phía trên là điểm chuyển sang nhiệm vụ 2.

### 3.2.2. Nhiệm vụ 2: Thêm hồ sơ nhân sự

**Mục tiêu.** Nhiệm vụ này giúp Phòng TCCB tạo mới hồ sơ nhân sự đầy đủ, đúng định dạng và có thể lưu nháp trong quá trình nhập. Hệ thống cần kiểm tra thông tin bắt buộc, tự sinh mã cán bộ và gán trạng thái ban đầu cho hồ sơ.

![Phác họa hộp thoại thêm hồ sơ nhân sự](.figma-review/02-them-ho-so.png)

**Hộp thoại/wizard.** Khi người dùng nhấn "Thêm hồ sơ nhân sự" từ màn hình danh sách, hệ thống mở hộp thoại lớn trên nền danh sách. Hộp thoại được thiết kế như một wizard gồm 6 bước: Thông tin định danh, Liên hệ & quốc tịch, Công tác & lương, Trình độ học vấn, Tài liệu đính kèm, Xem lại & xác nhận. Cách chia bước giúp biểu mẫu dài trở nên dễ kiểm soát hơn.

**Thanh tiến trình.** Phần đầu hộp thoại hiển thị tiến độ nhập liệu. Bước hiện tại được tô nổi, bước đã hoàn thành có trạng thái rõ ràng. Người dùng biết mình đang ở bước nào và còn bao nhiêu phần cần hoàn tất.

**Vùng nhập liệu.** Mỗi bước chỉ hiển thị nhóm trường liên quan. Ví dụ ở bước "Liên hệ & quốc tịch", hệ thống hiển thị Email, Số điện thoại, Địa chỉ thường trú và tùy chọn "Người nước ngoài". Nếu bật tùy chọn người nước ngoài, form có thể mở rộng thêm các trường visa, hộ chiếu hoặc giấy phép lao động theo đúng dữ liệu nghiệp vụ cần quản lý.

**Chức năng chính.** Hộp thoại có các nút Quay lại, Lưu nháp và Tiếp tục. Thiết kế có trạng thái "Đã lưu nháp" ở phía trên để giảm lo lắng khi nhập hồ sơ dài. Các trường bắt buộc được đánh dấu bằng dấu sao, giúp người dùng biết dữ liệu nào cần nhập trước khi chuyển bước hoặc lưu hồ sơ.

### 3.2.3. Nhiệm vụ 3: Xem/Tìm kiếm danh sách hợp đồng

**Mục tiêu.** Nhiệm vụ này giúp Phòng TCCB theo dõi toàn bộ hợp đồng lao động, tìm kiếm hợp đồng theo mã cán bộ, họ tên hoặc số hợp đồng, đồng thời ưu tiên xử lý các hợp đồng sắp hết hạn. Thiết kế sử dụng màn hình danh sách hợp đồng tổng hợp để người dùng quản lý tập trung các trạng thái hợp đồng.

![Phác họa màn hình danh sách hợp đồng lao động](.figma-review/03-danh-sach-hop-dong.png)

**Cửa sổ chính.** Màn hình "Hợp đồng lao động" sử dụng bố cục dashboard kết hợp bảng dữ liệu. Cây thực đơn bên trái gồm Tổng quan, Hồ sơ nhân sự, Hợp đồng lao động, Cơ cấu tổ chức, Tài khoản & phân quyền. Mục "Hợp đồng lao động" được tô nổi.

**Khu vực tổng quan.** Phần đầu nội dung chính có các thẻ thống kê: Hợp đồng còn hiệu lực, Sắp hết hạn trong 30 ngày, Chờ gia hạn và Đã hết hiệu lực. Các con số này giúp chuyên viên nhận diện nhanh khối lượng công việc cần xử lý.

**Cảnh báo nghiệp vụ.** Bên dưới các thẻ thống kê có banner cảnh báo "12 hợp đồng sắp hết hạn trong 30 ngày". Đây là điểm nhấn quan trọng của thiết kế vì pain point của người dùng là trước đây không có cảnh báo hợp đồng sắp hết hạn.

**Vùng tìm kiếm và lọc.** Màn hình có ô tìm kiếm nhanh và các bộ lọc: Loại hợp đồng, Trạng thái, Ngày hết hạn, Đơn vị. Người dùng có thể kết hợp nhiều tiêu chí để thu hẹp danh sách.

**Bảng dữ liệu và thao tác.** Bảng hiển thị Số hợp đồng, Mã cán bộ, Họ tên, Loại hợp đồng, Ngày hiệu lực, Ngày hết hạn, Trạng thái, Số ngày còn lại và Thao tác. Ở mỗi dòng có các thao tác Xem, Gia hạn và Chấm dứt. Điều này giúp nhiệm vụ xem danh sách liên kết trực tiếp sang nhiệm vụ thêm/gia hạn/chấm dứt hợp đồng.

### 3.2.4. Nhiệm vụ 4: Thêm hợp đồng

**Mục tiêu.** Nhiệm vụ này cho phép Phòng TCCB tạo hợp đồng lao động mới cho một nhân sự đã có hồ sơ. Hệ thống phải kiểm tra điều kiện tạo hợp đồng, kiểm tra thời gian hiệu lực, loại hợp đồng, số lần ký và file đính kèm.

![Phác họa hộp thoại tạo hợp đồng](.figma-review/04-tao-hop-dong.png)

**Hộp thoại tạo hợp đồng.** Khi người dùng nhấn "Tạo hợp đồng" từ màn hình hợp đồng, hệ thống mở hộp thoại lớn. Hộp thoại gồm tiêu đề, mô tả ngắn, vùng cảnh báo, form nhập liệu và vùng thông tin nhân sự liên kết.

**Vùng cảnh báo.** Thiết kế hiển thị nhóm cảnh báo ở đầu form, ví dụ: "Thời gian hợp đồng bị chồng lấn" hoặc "Loại hợp đồng không khả dụng". Cách đặt cảnh báo ở đầu giúp người dùng hiểu lý do chưa thể lưu hợp đồng trước khi rà soát từng trường.

**Form nhập liệu.** Các trường chính gồm: Nhân sự liên kết, Loại hợp đồng, Số hợp đồng, Ngày ký, Ngày bắt đầu, Ngày kết thúc, Hệ số lương áp dụng, Phụ cấp, Đơn vị công tác theo hợp đồng và Upload file hợp đồng PDF. Các trường bắt buộc được đánh dấu rõ.

**Khung thông tin nhân sự.** Bên phải form có thẻ thông tin nhân sự gồm họ tên, mã cán bộ, đơn vị, chức vụ và trạng thái hợp đồng hiện tại. Thành phần này giúp người dùng kiểm tra lại đúng người trước khi tạo hợp đồng.

**Chức năng chính.** Người dùng có thể Hủy, Lưu nháp hoặc Tạo hợp đồng. Nếu thông tin không hợp lệ, hệ thống đánh dấu lỗi ngay dưới từng trường và không cho lưu.

### 3.2.5. Nhiệm vụ 5: Gia hạn hợp đồng

**Mục tiêu.** Nhiệm vụ này giúp Phòng TCCB tạo hợp đồng kế tiếp cho hợp đồng sắp hết hạn. Thiết kế nhấn mạnh việc hiển thị hợp đồng cũ, kiểm tra điều kiện gia hạn và nhập thông tin hợp đồng mới một cách liền mạch.

![Phác họa hộp thoại gia hạn hợp đồng](.figma-review/05-gia-han-hop-dong.png)

**Điểm vào nhiệm vụ.** Từ màn hình danh sách hợp đồng, người dùng lọc các hợp đồng có trạng thái "Sắp hết hạn" hoặc "Chờ gia hạn", sau đó nhấn thao tác "Gia hạn" ở dòng hợp đồng cần xử lý.

**Hộp thoại gia hạn.** Hộp thoại "Gia hạn hợp đồng" được tách riêng với hộp thoại tạo hợp đồng mới. Phần trên hiển thị cảnh báo nếu hợp đồng chưa đủ điều kiện gia hạn hoặc ngày bắt đầu mới chưa hợp lệ.

**Thông tin hợp đồng cũ.** Thiết kế dành một khối riêng để hiển thị Số hợp đồng, Loại hợp đồng, Ngày bắt đầu, Ngày hết hạn và Trạng thái của hợp đồng hiện tại. Đây là dữ liệu tham chiếu quan trọng để người dùng nhập đúng thông tin gia hạn.

**Thông tin gia hạn.** Form gia hạn gồm Loại hợp đồng mới, Ngày bắt đầu mới, Ngày kết thúc mới, Hệ số lương, Phụ cấp và Upload file hợp đồng gia hạn. Ngày bắt đầu mới được thiết kế để liền sau ngày hết hạn hiện tại, hạn chế lỗi chồng lấn thời gian.

**Chức năng chính.** Người dùng có thể Hủy hoặc Xác nhận gia hạn. Khi xác nhận, hệ thống kiểm tra điều kiện gia hạn, kiểm tra thời gian và file đính kèm trước khi tạo hợp đồng kế tiếp.

# IV. XÂY DỰNG STORYBOARD

## 4.1. Storyboard nhiệm vụ 1: Xem/Tìm kiếm danh sách hồ sơ nhân sự

**Bối cảnh.** Chuyên viên Phòng TCCB cần tìm hồ sơ của một cán bộ để kiểm tra trạng thái làm việc và tình trạng hợp đồng. Trước đây thao tác này phải thực hiện trên nhiều file Excel, còn trong hệ thống mới người dùng thao tác trực tiếp trên màn hình danh sách hồ sơ.

**Bước 1 - Mở module hồ sơ.** Người dùng đăng nhập vào hệ thống và chọn mục "Hồ sơ nhân sự" trên cây thực đơn bên trái. Hệ thống hiển thị danh sách hồ sơ có phân trang, kèm các cột thông tin chính như mã nhân sự, họ tên, đơn vị, học hàm/học vị, chức vụ, hợp đồng và trạng thái.

![Bước 1 - Mở module hồ sơ](.figma-review/storyboard/4-1-1-mo-danh-sach-ho-so.png)

**Bước 2 - Nhập từ khóa hoặc chọn bộ lọc.** Người dùng nhập tên, mã nhân sự hoặc chọn các bộ lọc như đơn vị công tác, học hàm/học vị, trạng thái hợp đồng. Hệ thống cập nhật danh sách theo từ khóa hoặc tiêu chí lọc.

![Bước 2 - Nhập từ khóa hoặc chọn bộ lọc](.figma-review/storyboard/4-1-2-tim-kiem-ho-so.png)

**Bước 3 - Xem kết quả.** Các hồ sơ phù hợp được hiển thị trong bảng. Người dùng nhìn nhanh các badge trạng thái để biết hồ sơ đang hoạt động, đã thôi việc hay đang chờ gia hạn hợp đồng.

![Bước 3 - Xem kết quả lọc hồ sơ](.figma-review/storyboard/4-1-3-ket-qua-loc-ho-so.png)

**Bước 4 - Chuyển sang thao tác tiếp theo.** Nếu muốn xem hoặc sửa hồ sơ, người dùng nhấn biểu tượng thao tác ở dòng tương ứng. Nếu cần tạo hồ sơ mới, người dùng nhấn nút "Thêm hồ sơ nhân sự" để chuyển sang nhiệm vụ 2.

![Bước 4 - Chuyển sang thao tác tiếp theo](.figma-review/storyboard/4-1-4-thao-tac-ho-so.png)

## 4.2. Storyboard nhiệm vụ 2: Thêm hồ sơ nhân sự

**Bối cảnh.** Nhà trường tiếp nhận một cán bộ mới. Chuyên viên Phòng TCCB cần tạo hồ sơ nhân sự ban đầu để làm cơ sở cho các nghiệp vụ tiếp theo như lập hợp đồng, phân đơn vị công tác, cấu hình lương và phụ cấp.

**Bước 1 - Bắt đầu từ danh sách hồ sơ.** Người dùng đang ở màn hình "Hồ sơ nhân sự" và nhấn nút "Thêm hồ sơ nhân sự" ở góc phải phía trên.

![Bước 1 - Bắt đầu từ danh sách hồ sơ](.figma-review/storyboard/4-2-1-tu-danh-sach-ho-so.png)

**Bước 2 - Hệ thống mở wizard thêm hồ sơ.** Hộp thoại "Thêm hồ sơ nhân sự" xuất hiện trên nền danh sách. Thanh tiến trình cho biết form được chia thành 6 bước, giúp người dùng nhập dữ liệu theo từng nhóm thay vì nhập một form quá dài.

![Bước 2 - Hệ thống mở wizard thêm hồ sơ](.figma-review/storyboard/4-2-2-wizard-buoc-1.png)

**Bước 3 - Nhập thông tin theo từng bước.** Người dùng nhập thông tin định danh, liên hệ, quốc tịch, công tác, lương, trình độ học vấn và tài liệu đính kèm. Ở mỗi bước, các trường bắt buộc được đánh dấu bằng dấu sao.

![Bước 3 - Nhập thông tin công tác và lương](.figma-review/storyboard/4-2-3-nhap-cong-tac-luong.png)

**Bước 4 - Lưu nháp khi chưa đủ dữ liệu.** Nếu chưa có đủ giấy tờ, người dùng nhấn "Lưu nháp". Hệ thống hiển thị trạng thái đã lưu nháp, giúp người dùng có thể quay lại hoàn thiện sau.

![Bước 4 - Lưu nháp khi chưa đủ dữ liệu](.figma-review/storyboard/4-2-4-tai-lieu-luu-nhap.png)

**Bước 5 - Xem lại và xác nhận.** Khi đã nhập đủ dữ liệu, người dùng đến bước "Xem lại & xác nhận". Hệ thống kiểm tra tính đầy đủ và hợp lệ. Nếu hợp lệ, hồ sơ được lưu, mã cán bộ được tự động sinh và trạng thái ban đầu được gán cho hồ sơ mới.

![Bước 5 - Xem lại và xác nhận hồ sơ](.figma-review/storyboard/4-2-5-xem-lai-xac-nhan.png)

## 4.3. Storyboard nhiệm vụ 3: Xem/Tìm kiếm danh sách hợp đồng

**Bối cảnh.** Gần cuối tháng, chuyên viên Phòng TCCB cần rà soát các hợp đồng lao động sắp hết hạn để lập kế hoạch gia hạn. Đây là nhiệm vụ quan trọng vì nếu không có cảnh báo, hợp đồng có thể hết hạn mà chưa được xử lý.

**Bước 1 - Mở màn hình hợp đồng lao động.** Người dùng chọn mục "Hợp đồng lao động" trên menu bên trái. Hệ thống hiển thị màn hình tổng quan hợp đồng với các thẻ số liệu.

![Bước 1 - Mở màn hình hợp đồng lao động](.figma-review/storyboard/4-3-1-mo-hop-dong.png)

**Bước 2 - Nhận cảnh báo.** Người dùng nhìn thấy thẻ "Sắp hết hạn trong 30 ngày" và banner cảnh báo "12 hợp đồng sắp hết hạn trong 30 ngày". Hệ thống gợi ý đây là nhóm hợp đồng cần ưu tiên xử lý.

![Bước 2 - Nhận cảnh báo hợp đồng sắp hết hạn](.figma-review/storyboard/4-3-2-canh-bao-hop-dong.png)

**Bước 3 - Lọc danh sách.** Người dùng chọn trạng thái "Sắp hết hạn", khoảng ngày hết hạn "30 ngày tới" và đơn vị "Khoa CNTT". Sau đó nhấn "Tìm kiếm". Hệ thống chỉ hiển thị các hợp đồng thỏa điều kiện.

![Bước 3 - Lọc danh sách hợp đồng](.figma-review/storyboard/4-3-3-loc-hop-dong.png)

**Bước 4 - Chọn hợp đồng cần xử lý.** Trong bảng kết quả, người dùng xem số ngày còn lại của từng hợp đồng. Với hợp đồng còn ít ngày, người dùng có thể nhấn "Xem" để kiểm tra chi tiết hoặc nhấn "Gia hạn" để chuyển sang nhiệm vụ 5.

![Bước 4 - Chọn hợp đồng cần xử lý](.figma-review/storyboard/4-3-4-chon-thao-tac-hop-dong.png)

## 4.4. Storyboard nhiệm vụ 4: Thêm hợp đồng

**Bối cảnh.** Một nhân sự đã có hồ sơ trên hệ thống và cần được lập hợp đồng lao động mới. Chuyên viên Phòng TCCB cần nhập thông tin hợp đồng, chọn loại hợp đồng, thời hạn, đơn vị công tác và tải lên file hợp đồng.

**Bước 1 - Chọn tạo hợp đồng.** Từ màn hình "Hợp đồng lao động", người dùng nhấn nút "Tạo hợp đồng". Hệ thống mở hộp thoại tạo hợp đồng.

![Bước 1 - Chọn tạo hợp đồng](.figma-review/storyboard/4-4-1-tao-hop-dong-tu-danh-sach.png)

**Bước 2 - Chọn nhân sự liên kết.** Người dùng chọn hoặc nhập mã cán bộ. Hệ thống kiểm tra nhân sự có tồn tại và có đủ điều kiện tạo hợp đồng mới hay không.

![Bước 2 - Chọn nhân sự liên kết](.figma-review/storyboard/4-4-2-chon-nhan-su-hop-dong.png)

**Bước 3 - Nhập thông tin hợp đồng.** Người dùng nhập số hợp đồng, loại hợp đồng, ngày ký, ngày bắt đầu, ngày kết thúc, hệ số lương, phụ cấp, đơn vị công tác và tải lên file PDF hợp đồng.

![Bước 3 - Nhập thông tin hợp đồng](.figma-review/storyboard/4-4-3-nhap-hop-dong.png)

**Bước 4 - Hệ thống kiểm tra lỗi.** Nếu thời gian hợp đồng bị chồng lấn, loại hợp đồng không khả dụng, số hợp đồng trùng hoặc thiếu file PDF, hệ thống hiển thị cảnh báo ở đầu hộp thoại và lỗi chi tiết dưới từng trường.

![Bước 4 - Hệ thống kiểm tra lỗi hợp đồng](.figma-review/storyboard/4-4-4-kiem-tra-loi-hop-dong.png)

**Bước 5 - Lưu hợp đồng.** Sau khi sửa dữ liệu hợp lệ, người dùng nhấn "Tạo hợp đồng". Hệ thống xác định trạng thái hợp đồng dựa vào ngày hiệu lực, lưu hợp đồng vào hồ sơ nhân sự và cập nhật trạng thái hợp đồng mới nhất.

## 4.5. Storyboard nhiệm vụ 5: Gia hạn hợp đồng

**Bối cảnh.** Hợp đồng của một giảng viên sắp hết hạn trong 30 ngày. Chuyên viên Phòng TCCB cần tạo hợp đồng kế tiếp để bảo đảm quá trình làm việc không bị gián đoạn.

**Bước 1 - Lọc hợp đồng sắp hết hạn.** Người dùng mở màn hình "Hợp đồng lao động", chọn trạng thái "Sắp hết hạn" và xem các hợp đồng còn ít ngày hiệu lực.

![Bước 1 - Lọc hợp đồng sắp hết hạn](.figma-review/storyboard/4-5-1-loc-sap-het-han.png)

**Bước 2 - Chọn thao tác gia hạn.** Người dùng nhấn "Gia hạn" ở dòng hợp đồng cần xử lý. Hệ thống mở hộp thoại "Gia hạn hợp đồng".

![Bước 2 - Chọn thao tác gia hạn](.figma-review/storyboard/4-5-2-mo-gia-han.png)

**Bước 3 - Kiểm tra hợp đồng cũ.** Hộp thoại hiển thị thông tin hợp đồng cũ gồm số hợp đồng, loại hợp đồng, ngày bắt đầu, ngày hết hạn và trạng thái. Người dùng dùng thông tin này để kiểm tra xem hợp đồng có đúng đối tượng và đúng kỳ hạn cần gia hạn hay không.

![Bước 3 - Kiểm tra hợp đồng cũ](.figma-review/storyboard/4-5-3-kiem-tra-hop-dong-cu.png)

**Bước 4 - Nhập thông tin gia hạn.** Người dùng chọn loại hợp đồng mới, nhập ngày bắt đầu mới, ngày kết thúc mới, hệ số lương, phụ cấp và tải file hợp đồng gia hạn. Hệ thống kiểm tra ngày bắt đầu mới phải liền sau ngày hết hạn hiện tại và không được trùng với hợp đồng khác.

![Bước 4 - Nhập thông tin gia hạn](.figma-review/storyboard/4-5-4-nhap-gia-han.png)

**Bước 5 - Xác nhận gia hạn.** Nếu thông tin hợp lệ, người dùng nhấn "Xác nhận gia hạn". Hệ thống tạo hợp đồng kế tiếp, cập nhật trạng thái hợp đồng và giúp hồ sơ nhân sự không rơi vào trạng thái quá hạn.

## 4.6. Kết luận phần storyboard

5 storyboard trên cho thấy luồng thiết kế của nhóm đi từ màn hình danh sách đến thao tác chi tiết. Hai nhiệm vụ đầu tập trung vào hồ sơ nhân sự, ba nhiệm vụ sau tập trung vào hợp đồng lao động. Cách tổ chức này phù hợp với quy trình làm việc thực tế của Phòng TCCB: trước hết cần tìm hoặc tạo hồ sơ nhân sự, sau đó mới lập và theo dõi hợp đồng lao động cho nhân sự đó.

Thiết kế cũng thể hiện rõ các điểm quan trọng của tương tác người - máy: người dùng luôn biết mình đang ở module nào nhờ menu bên trái; dữ liệu quan trọng được hiển thị bằng bảng và badge trạng thái; thao tác phức tạp được đưa vào hộp thoại riêng; lỗi được báo ngay tại vị trí nhập liệu; và các cảnh báo nghiệp vụ như hợp đồng sắp hết hạn được đặt ở vị trí nổi bật để giảm nguy cơ bỏ sót công việc.

