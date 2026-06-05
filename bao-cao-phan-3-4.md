# III. PHÁC HỌA THIẾT KẾ THEO LUỒNG HOẠT ĐỘNG

Phần này viết lại luồng hoạt động theo hướng có thể dùng trực tiếp cho thiết kế giao diện. Thay vì chỉ mô tả chức năng, mỗi nhiệm vụ được tách thành: người sử dụng, mục tiêu, tiền điều kiện, màn hình cần thiết, thao tác của người sử dụng, phản hồi của hệ thống và các trạng thái ngoại lệ. Cách trình bày này giúp người thiết kế UI xác định rõ từng khung màn hình, thành phần điều khiển và trạng thái cần phác họa trong prototype.

## 3.1. Nguyên tắc phác họa chung

Hệ thống được phác họa theo mô hình ứng dụng web nội bộ cho công tác quản trị nhân sự. Các màn hình nghiệp vụ sử dụng cùng một cấu trúc để người sử dụng không phải học lại cách thao tác khi chuyển giữa các module.

| Thành phần | Mô tả thiết kế | Ý nghĩa đối với luồng hoạt động |
|---|---|---|
| Sidebar trái | Hiển thị các module: Hồ sơ nhân sự, Hợp đồng lao động, Cơ cấu tổ chức, Tài khoản và phân quyền, Báo cáo | Cho biết người sử dụng đang ở module nào và có thể chuyển nhanh sang module liên quan |
| Header trên | Chứa breadcrumb, tiêu đề nghiệp vụ, tìm kiếm nhanh và thông tin tài khoản | Giữ ngữ cảnh thao tác, đặc biệt khi người dùng mở dialog hoặc panel phụ |
| Vùng nội dung chính | Hiển thị thẻ thống kê, bộ lọc, bảng dữ liệu, form nhập liệu hoặc wizard | Là nơi thực hiện từng bước của nhiệm vụ |
| Màu sắc trạng thái | Xanh dương cho hành động chính, xanh lá cho thành công, vàng/cam cho cảnh báo, đỏ cho lỗi/nguy hiểm | Giúp người sử dụng nhận biết nhanh trạng thái xử lý và mức độ ưu tiên |
| Phản hồi hệ thống | Toast, cảnh báo inline, empty state, dialog xác nhận, màn hình thành công | Đảm bảo mỗi thao tác đều có kết quả rõ ràng để tiếp tục bước kế tiếp |

Năm nhiệm vụ được chọn để phác họa gồm:

1. Xem và tìm kiếm danh sách hồ sơ nhân sự.
2. Thêm hồ sơ nhân sự.
3. Xem và tìm kiếm danh sách hợp đồng lao động.
4. Thêm hợp đồng lao động.
5. Gia hạn hợp đồng lao động.

## 3.2. Bản đồ màn hình cần thiết

| Mã màn hình | Tên màn hình | Nhiệm vụ liên quan | Thành phần UI cần có |
|---|---|---|---|
| HS-01 | Danh sách hồ sơ nhân sự | Xem/tìm kiếm hồ sơ, bắt đầu thêm hồ sơ | Thẻ thống kê, ô tìm kiếm, bộ lọc nâng cao, bảng hồ sơ, nút Thêm hồ sơ nhân sự |
| HS-02 | Dialog chọn cách thêm hồ sơ | Thêm hồ sơ nhân sự | Menu Thêm thủ công, Nhập từ Excel, hướng dẫn ngắn về mỗi cách |
| HS-03 | Wizard thêm hồ sơ nhân sự | Thêm hồ sơ nhân sự | Stepper 6 bước, form thông tin, nút Tiếp tục, Quay lại, Lưu nháp, Lưu hồ sơ chính thức |
| HS-04 | Màn hình kết quả thêm hồ sơ | Thêm hồ sơ nhân sự | Mã viên chức được tạo, trạng thái hồ sơ, hành động xem hồ sơ hoặc thêm tiếp |
| HĐ-01 | Danh sách hợp đồng lao động | Xem/tìm kiếm hợp đồng, bắt đầu tạo/gia hạn | Thẻ thống kê, cảnh báo sắp hết hạn, bộ lọc, bảng hợp đồng, nút Tạo hợp đồng |
| HĐ-02 | Dialog tạo hợp đồng | Thêm hợp đồng lao động | Form chọn nhân sự, loại hợp đồng, ngày ký, ngày hiệu lực, lương, đơn vị, tệp PDF |
| HĐ-03 | Dialog gia hạn hợp đồng | Gia hạn hợp đồng lao động | Thông tin hợp đồng cũ, gợi ý hợp đồng mới, ngày bắt đầu/kết thúc, tệp quyết định, cảnh báo |
| HĐ-04 | Trạng thái lỗi/xác nhận hợp đồng | Thêm/gia hạn hợp đồng | Lỗi trùng thời gian, quá số lần ký, thiếu tệp, dialog xác nhận, toast thành công |

## 3.3. Luồng 1 - Xem và tìm kiếm danh sách hồ sơ nhân sự

![Phác họa màn hình danh sách hồ sơ nhân sự](.figma-review/01-danh-sach-ho-so.png)

| Thuộc tính | Nội dung |
|---|---|
| Người sử dụng chính | Phòng TCCB; Phòng TCKT có thể xem và tìm kiếm để đối chiếu thông tin |
| Mục tiêu | Tìm đúng hồ sơ nhân sự theo từ khóa hoặc bộ lọc nghiệp vụ trong thời gian ngắn |
| Tiền điều kiện | Người sử dụng đã đăng nhập và có quyền truy cập module Hồ sơ nhân sự |
| Điểm bắt đầu | Sidebar > Hồ sơ nhân sự |
| Kết quả mong đợi | Danh sách hiển thị đúng các hồ sơ phù hợp; người sử dụng có thể mở chi tiết, sửa hồ sơ hoặc bắt đầu thêm mới |

| Bước | Màn hình/trạng thái | Thao tác của người sử dụng | Phản hồi của hệ thống | Gợi ý thiết kế UI |
|---|---|---|---|---|
| 1 | HS-01 - Danh sách mặc định | Mở module Hồ sơ nhân sự | Hiển thị tổng số hồ sơ, số đang làm việc, số sắp hết hợp đồng và bảng dữ liệu mới nhất | Cần có breadcrumb và tiêu đề rõ ràng để người dùng biết đang ở danh sách hồ sơ |
| 2 | HS-01 - Tìm kiếm nhanh | Nhập tên, mã viên chức, CCCD, email hoặc số điện thoại vào ô tìm kiếm | Danh sách cập nhật theo từ khóa; phần trùng khớp nên được làm nổi bật | Ô tìm kiếm đặt trên bộ lọc, có placeholder nêu rõ loại dữ liệu có thể nhập |
| 3 | HS-01 - Bộ lọc nâng cao | Chọn đơn vị, học hàm/học vị, vai trò trong đơn vị, trạng thái làm việc, trạng thái hợp đồng hoặc giới tính | Bảng dữ liệu chỉ hiển thị các hồ sơ thỏa điều kiện | Bộ lọc nên đặt trong panel/dropdown, có chip tóm tắt bộ lọc đang áp dụng |
| 4 | HS-01 - Kết quả rỗng | Từ khóa hoặc bộ lọc không có kết quả | Hiển thị empty state kèm gợi ý xóa bộ lọc hoặc thêm hồ sơ mới | Empty state cần có thông điệp rõ: Không tìm thấy hồ sơ phù hợp |
| 5 | HS-01 - Chọn bản ghi | Bấm vào dòng hồ sơ hoặc nút Xem | Mở chi tiết hồ sơ/panel thông tin để tiếp tục xem hoặc chỉnh sửa | Dòng dữ liệu cần có hover state và hành động rõ ràng |

Ngoại lệ cần thiết kế:

- Nếu người sử dụng không có quyền xem một nhóm hồ sơ, hệ thống không hiển thị dữ liệu ngoài phạm vi quyền.
- Nếu hệ thống đang tải dữ liệu, bảng cần có loading skeleton để tránh hiểu nhầm là không có dữ liệu.
- Nếu bộ lọc có quá nhiều điều kiện, giao diện cần có nút Xóa bộ lọc để quay về danh sách ban đầu.

## 3.4. Luồng 2 - Thêm hồ sơ nhân sự

![Phác họa hộp thoại thêm hồ sơ nhân sự](.figma-review/02-them-ho-so.png)

| Thuộc tính | Nội dung |
|---|---|
| Người sử dụng chính | Phòng TCCB |
| Mục tiêu | Tạo hồ sơ nhân sự mới và sinh mã viên chức chính thức sau khi dữ liệu hợp lệ |
| Tiền điều kiện | Người sử dụng đã đăng nhập; có quyền thêm hồ sơ; nhân sự chưa tồn tại trong hệ thống |
| Điểm bắt đầu | HS-01 > nút Thêm hồ sơ nhân sự |
| Kết quả mong đợi | Hệ thống tạo hồ sơ mới, gán mã viên chức, trạng thái hợp đồng ban đầu là Chưa hợp đồng và trạng thái xét duyệt là Đang chờ xét |

| Bước | Màn hình/trạng thái | Thao tác của người sử dụng | Phản hồi của hệ thống | Gợi ý thiết kế UI |
|---|---|---|---|---|
| 1 | HS-02 - Chọn cách thêm | Bấm nút Thêm hồ sơ nhân sự | Hiển thị menu gồm Thêm thủ công và Nhập từ Excel | Menu cần đặt gần nút chính, mô tả ngắn ưu điểm của từng cách |
| 2 | HS-03 - Bước 1: Thông tin định danh | Chọn Thêm thủ công, nhập họ tên, ngày sinh, giới tính, CCCD, ngày cấp, nơi cấp | Kiểm tra trường bắt buộc và cảnh báo nếu CCCD đã tồn tại | Cần có validate inline ngay tại trường lỗi, không đợi đến cuối wizard |
| 3 | HS-03 - Bước 2: Liên hệ và quốc tịch | Nhập địa chỉ, email, số điện thoại, quốc tịch; nếu là người nước ngoài thì nhập hộ chiếu/thị thực/giấy phép lao động | Hiển thị thêm nhóm trường cho nhân sự nước ngoài khi bật toggle tương ứng | Toggle người nước ngoài cần làm thay đổi form một cách dễ nhận biết |
| 4 | HS-03 - Bước 3: Công tác và lương | Chọn đơn vị, vị trí, chức danh, loại nhân sự, ngày bắt đầu, bậc/hệ số lương | Hệ thống gán người dùng vào đơn vị được chọn và kiểm tra ngày bắt đầu hợp lệ | Nên có cây đơn vị hoặc combobox có tìm kiếm để chọn đơn vị |
| 5 | HS-03 - Bước 4: Trình độ/đào tạo | Nhập học hàm, học vị, chuyên môn, quá trình đào tạo | Lưu tạm dữ liệu và cập nhật tiến độ wizard | Stepper cần cho biết bước đã hoàn thành, bước đang làm và bước còn thiếu |
| 6 | HS-03 - Bước 5: Tài liệu | Tải lên CCCD, sơ yếu lý lịch, bằng cấp và quyết định tuyển dụng | Hiển thị trạng thái đã tải/chưa tải của từng tài liệu; cảnh báo tài liệu bắt buộc còn thiếu | Danh sách tài liệu nên có badge Bắt buộc/Tùy chọn |
| 7 | HS-03 - Bước 6: Xem lại và xác nhận | Kiểm tra thông tin tổng hợp, bấm Lưu hồ sơ chính thức | Hệ thống tạo mã viên chức và lưu hồ sơ | Nút Lưu hồ sơ chính thức chỉ nên bật khi các trường bắt buộc hợp lệ |
| 8 | HS-04 - Thành công | Chọn Xem hồ sơ vừa tạo hoặc Thêm hồ sơ khác | Điều hướng về chi tiết hồ sơ hoặc reset wizard | Màn hình thành công cần hiển thị mã viên chức để người dùng đối chiếu |

Nhánh thay thế - Nhập từ Excel:

| Bước | Thao tác | Phản hồi hệ thống | Trạng thái UI cần có |
|---|---|---|---|
| 1 | Chọn Nhập từ Excel | Hiển thị màn hình tải file mẫu và upload file | Khu vực kéo thả file, nút Tải file mẫu |
| 2 | Tải file Excel | Hệ thống đọc file và kiểm tra cột/dữ liệu | Loading state trong lúc kiểm tra |
| 3 | Xem kết quả kiểm tra | Hiển thị số dòng hợp lệ, số dòng lỗi, danh sách lỗi | Bảng lỗi có cột dòng, trường lỗi, nội dung lỗi |
| 4 | Chọn nhập toàn bộ hoặc nhập các dòng hợp lệ | Tạo hồ sơ cho các dòng hợp lệ; cho phép tải file lỗi | Success summary và nút Tải danh sách lỗi |

Ngoại lệ cần thiết kế:

- CCCD, email hoặc số điện thoại trùng với hồ sơ đã có: hiển thị cảnh báo và chặn lưu chính thức.
- Thiếu trường bắt buộc: hiển thị lỗi inline, đánh dấu bước chưa hợp lệ trên stepper.
- Người sử dụng đóng wizard khi đang nhập: hiển thị dialog hỏi Lưu nháp hay Hủy thay đổi.
- File Excel sai cấu trúc: hiển thị thông báo lỗi file và liên kết tải file mẫu đúng.

## 3.5. Luồng 3 - Xem và tìm kiếm danh sách hợp đồng lao động

![Phác họa màn hình danh sách hợp đồng lao động](.figma-review/03-danh-sach-hop-dong.png)

| Thuộc tính | Nội dung |
|---|---|
| Người sử dụng chính | Phòng TCCB |
| Mục tiêu | Theo dõi toàn bộ hợp đồng, phát hiện hợp đồng sắp hết hạn và chọn hợp đồng cần xử lý |
| Tiền điều kiện | Người sử dụng đã đăng nhập và có quyền xem module Hợp đồng lao động |
| Điểm bắt đầu | Sidebar > Hợp đồng lao động |
| Kết quả mong đợi | Danh sách hợp đồng được lọc đúng theo nhu cầu; hợp đồng sắp hết hạn được nhận diện nhanh để gia hạn |

| Bước | Màn hình/trạng thái | Thao tác của người sử dụng | Phản hồi của hệ thống | Gợi ý thiết kế UI |
|---|---|---|---|---|
| 1 | HĐ-01 - Dashboard hợp đồng | Mở module Hợp đồng lao động | Hiển thị thẻ thống kê tổng hợp và bảng hợp đồng | Các thẻ thống kê nên đặt trước bộ lọc để tạo tổng quan nhanh |
| 2 | HĐ-01 - Cảnh báo sắp hết hạn | Quan sát banner cảnh báo hợp đồng sắp hết hạn trong 30 ngày | Hiển thị số lượng hợp đồng cần xử lý và nút lọc nhanh | Banner màu vàng/cam, nội dung ngắn gọn và có hành động Lọc ngay |
| 3 | HĐ-01 - Tìm kiếm/bộ lọc | Nhập tên/mã nhân sự/số hợp đồng; chọn loại hợp đồng, trạng thái, khoảng ngày, đơn vị | Bảng hợp đồng cập nhật theo điều kiện | Bộ lọc cần giữ trạng thái đã chọn khi người dùng mở dialog xử lý rồi quay lại |
| 4 | HĐ-01 - Bảng hợp đồng | Sắp xếp theo ngày hết hạn hoặc trạng thái | Hợp đồng sắp hết hạn nằm ở vị trí dễ thấy, badge trạng thái được cập nhật | Cột Ngày hết hạn và Trạng thái cần dễ quét bằng mắt |
| 5 | HĐ-01 - Chọn hành động | Bấm Xem, Gia hạn hoặc Tạo hợp đồng | Mở màn hình/dialog tương ứng | Hành động nguy hiểm hoặc có điều kiện cần được vô hiệu hóa khi không hợp lệ |

Ngoại lệ cần thiết kế:

- Không có hợp đồng phù hợp bộ lọc: hiển thị empty state và nút xóa bộ lọc.
- Hợp đồng đã hết hiệu lực: không hiển thị hành động Gia hạn trực tiếp nếu quy định nghiệp vụ không cho phép.
- Dữ liệu đang tải: bảng hợp đồng hiển thị skeleton/loading và không cho thao tác dòng.

## 3.6. Luồng 4 - Thêm hợp đồng lao động

![Phác họa hộp thoại tạo hợp đồng](.figma-review/04-tao-hop-dong.png)

| Thuộc tính | Nội dung |
|---|---|
| Người sử dụng chính | Phòng TCCB |
| Mục tiêu | Tạo hợp đồng lao động mới cho một nhân sự đã có hồ sơ trong hệ thống |
| Tiền điều kiện | Hồ sơ nhân sự đã tồn tại; nhân sự đủ điều kiện ký hợp đồng; người sử dụng có tệp hợp đồng PDF/quyết định liên quan |
| Điểm bắt đầu | HĐ-01 > nút Tạo hợp đồng |
| Kết quả mong đợi | Hợp đồng mới được tạo, có trạng thái phù hợp và cập nhật trạng thái hợp đồng của hồ sơ nhân sự |

| Bước | Màn hình/trạng thái | Thao tác của người sử dụng | Phản hồi của hệ thống | Gợi ý thiết kế UI |
|---|---|---|---|---|
| 1 | HĐ-02 - Mở dialog tạo hợp đồng | Bấm Tạo hợp đồng | Hiển thị form tạo hợp đồng ở dạng dialog lớn hoặc side panel | Nên giữ nền danh sách hợp đồng phía sau để người dùng không mất ngữ cảnh |
| 2 | HĐ-02 - Chọn nhân sự | Tìm và chọn nhân sự theo mã viên chức/họ tên | Hệ thống hiển thị thông tin tóm tắt, đơn vị, trạng thái hợp đồng hiện tại | Ô chọn nhân sự nên có autocomplete và card tóm tắt sau khi chọn |
| 3 | HĐ-02 - Kiểm tra điều kiện | Hệ thống kiểm tra nhân sự có đủ điều kiện tạo hợp đồng hay không | Nếu không hợp lệ, hiển thị lỗi và không cho tiếp tục | Lỗi cần nói rõ lý do: đang có hợp đồng hiệu lực, quá số lần ký, chưa đủ thông tin |
| 4 | HĐ-02 - Nhập thông tin hợp đồng | Chọn loại hợp đồng, ngày ký, ngày hiệu lực, ngày hết hạn, mức lương, đơn vị | Hệ thống kiểm tra ngày hợp lệ và cảnh báo nếu trùng/khoảng thời gian bị chồng lấn | Trường ngày nên có ràng buộc min/max và thông báo lỗi inline |
| 5 | HĐ-02 - Tải tệp hợp đồng | Tải lên bản PDF/quyết định | Hiển thị tên tệp, dung lượng, trạng thái tải lên | Vùng upload cần chấp nhận kéo thả và có nút xóa/thay tệp |
| 6 | HĐ-02 - Xác nhận tạo | Bấm Tạo hợp đồng | Hệ thống lưu hợp đồng, cập nhật bảng và hiển thị toast thành công | Sau khi tạo xong nên đóng dialog và đưa hợp đồng mới lên đầu danh sách |

Ngoại lệ cần thiết kế:

- Chưa chọn nhân sự: hiển thị lỗi tại trường chọn nhân sự.
- Nhân sự đã có hợp đồng còn hiệu lực ngoài cửa sổ gia hạn: chặn tạo mới và gợi ý dùng chức năng gia hạn nếu phù hợp.
- Ngày bắt đầu lớn hơn ngày kết thúc hoặc bị trùng với hợp đồng cũ: hiển thị lỗi inline và không cho lưu.
- Quá số lần ký hợp đồng theo quy định: hiển thị cảnh báo nghiệp vụ, không chỉ hiển thị lỗi kỹ thuật.
- Thiếu tệp PDF/quyết định: không cho tạo hợp đồng chính thức.

## 3.7. Luồng 5 - Gia hạn hợp đồng lao động

![Phác họa hộp thoại gia hạn hợp đồng](.figma-review/05-gia-han-hop-dong.png)

| Thuộc tính | Nội dung |
|---|---|
| Người sử dụng chính | Phòng TCCB |
| Mục tiêu | Tạo hợp đồng kế tiếp cho nhân sự có hợp đồng sắp hết hạn mà không phải nhập lại toàn bộ dữ liệu từ đầu |
| Tiền điều kiện | Hợp đồng hiện tại còn hiệu lực hoặc đang trong khoảng cần gia hạn; người sử dụng có quyền gia hạn |
| Điểm bắt đầu | HĐ-01 > lọc Sắp hết hạn > hành động Gia hạn trên dòng hợp đồng |
| Kết quả mong đợi | Hợp đồng mới được tạo liên tiếp với hợp đồng cũ; hợp đồng cũ được cập nhật trạng thái nếu cần |

| Bước | Màn hình/trạng thái | Thao tác của người sử dụng | Phản hồi của hệ thống | Gợi ý thiết kế UI |
|---|---|---|---|---|
| 1 | HĐ-01 - Lọc sắp hết hạn | Bấm banner cảnh báo hoặc chọn trạng thái Sắp hết hạn | Danh sách chỉ hiển thị các hợp đồng trong khoảng cần gia hạn | Nên có chip Sắp hết hạn để người dùng biết đang lọc |
| 2 | HĐ-01 - Chọn hợp đồng | Bấm Gia hạn trên dòng hợp đồng | Hệ thống mở dialog gia hạn và truyền thông tin hợp đồng cũ | Nút Gia hạn chỉ hiển thị/enable với hợp đồng đủ điều kiện |
| 3 | HĐ-03 - Kiểm tra hợp đồng cũ | Xem thông tin hợp đồng hiện tại, số lần đã ký, ngày hết hạn, loại hợp đồng | Hệ thống cảnh báo nếu hợp đồng không nằm trong khoảng gia hạn hoặc đã quá số lần ký | Thông tin hợp đồng cũ nên nằm ở card bên trên form mới |
| 4 | HĐ-03 - Nhập thông tin gia hạn | Chọn loại hợp đồng mới, ngày bắt đầu, ngày kết thúc, mức lương/đơn vị nếu thay đổi | Hệ thống gợi ý ngày bắt đầu liên tiếp sau ngày hết hạn cũ và kiểm tra chồng lấn | Trường ngày bắt đầu có thể được điền sẵn để giảm lỗi nhập liệu |
| 5 | HĐ-03 - Tải quyết định/tệp hợp đồng | Tải tệp PDF hợp đồng mới hoặc quyết định gia hạn | Hiển thị trạng thái tệp đã tải và cho phép thay tệp | Tệp bắt buộc cần có ký hiệu rõ trong form |
| 6 | HĐ-03 - Xác nhận gia hạn | Bấm Xác nhận gia hạn | Hệ thống tạo hợp đồng mới, cập nhật danh sách, hiển thị toast thành công | Sau khi thành công nên đưa người dùng về danh sách Sắp hết hạn đã cập nhật |

Ngoại lệ cần thiết kế:

- Hợp đồng không còn trong thời gian được gia hạn: hiển thị cảnh báo và vô hiệu hóa nút xác nhận.
- Ngày bắt đầu hợp đồng mới không liên tiếp hoặc bị chồng với hợp đồng cũ: hiển thị lỗi tại trường ngày.
- Đã đạt giới hạn số lần ký: hiển thị thông báo nghiệp vụ và gợi ý chuyển sang loại hợp đồng phù hợp nếu có.
- Người sử dụng hủy thao tác khi đã nhập thông tin: hiển thị dialog xác nhận rồi mới đóng.

# IV. XÂY DỰNG STORYBOARD THEO KHUNG MÀN HÌNH

Storyboard dưới đây chuyển mỗi nhiệm vụ thành chuỗi khung màn hình cụ thể. Mỗi bước gồm bối cảnh, hành động, phản hồi hệ thống và trạng thái thiết kế cần thể hiện trong prototype. Nhiều bước nhỏ được tách riêng để người thiết kế có thể vẽ đủ các frame, không bị thiếu màn hình trung gian như validation, empty state hoặc confirmation.

## 4.1. Storyboard - Xem và tìm kiếm danh sách hồ sơ nhân sự

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 1 | Mở module Hồ sơ nhân sự | Người sử dụng chọn module Hồ sơ nhân sự trên sidebar. Hệ thống hiển thị màn hình HS-01 với thẻ thống kê, bộ lọc và bảng hồ sơ mặc định. |

![Bước 1 - Mở module hồ sơ](.figma-review/storyboard/4-1-1-mo-danh-sach-ho-so.png)

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 2 | Tìm kiếm nhanh và mở bộ lọc | Người sử dụng nhập từ khóa hoặc mở bộ lọc nâng cao. Hệ thống giữ giá trị đã nhập và hiển thị các trường lọc theo đơn vị, trạng thái, hợp đồng, giới tính. |

![Bước 2 - Nhập từ khóa hoặc chọn bộ lọc](.figma-review/storyboard/4-1-2-tim-kiem-ho-so.png)

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 3 | Kết quả lọc | Sau khi áp dụng bộ lọc, bảng chỉ hiển thị các hồ sơ phù hợp. Các chip bộ lọc đang áp dụng xuất hiện phía trên bảng; nếu không có kết quả thì hiển thị empty state và nút Xóa bộ lọc. |

![Bước 3 - Xem kết quả lọc hồ sơ](.figma-review/storyboard/4-1-3-ket-qua-loc-ho-so.png)

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 4 | Chọn thao tác tiếp theo | Người sử dụng chọn một dòng hồ sơ để xem chi tiết hoặc bấm Thêm hồ sơ nhân sự. Hệ thống cần thể hiện hover/selected state trên dòng dữ liệu và menu hành động rõ ràng. |

![Bước 4 - Chuyển sang thao tác tiếp theo](.figma-review/storyboard/4-1-4-thao-tac-ho-so.png)

## 4.2. Storyboard - Thêm hồ sơ nhân sự

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 1 | Bắt đầu từ danh sách hồ sơ | Người sử dụng bấm Thêm hồ sơ nhân sự. Hệ thống mở menu chọn Thêm thủ công hoặc Nhập từ Excel, đồng thời giữ nguyên danh sách hồ sơ phía sau. |

![Bước 1 - Bắt đầu từ danh sách hồ sơ](.figma-review/storyboard/4-2-1-tu-danh-sach-ho-so.png)

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 2 | Wizard bước định danh | Người sử dụng chọn Thêm thủ công. Hệ thống mở wizard bước 1, hiển thị stepper 6 bước và các trường định danh. Khi CCCD trùng, lỗi inline xuất hiện ngay tại trường nhập. |

![Bước 2 - Hệ thống mở wizard thêm hồ sơ](.figma-review/storyboard/4-2-2-wizard-buoc-1.png)

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 3 | Nhập thông tin công tác và lương | Người sử dụng chuyển qua bước công tác, chọn đơn vị từ cây đơn vị, nhập vị trí, loại nhân sự, ngày bắt đầu và thông tin lương. Hệ thống đánh dấu bước đã hoàn thành và cảnh báo nếu thiếu trường bắt buộc. |

![Bước 3 - Nhập thông tin công tác và lương](.figma-review/storyboard/4-2-3-nhap-cong-tac-luong.png)

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 4 | Tài liệu và lưu nháp | Người sử dụng tải các tài liệu bắt buộc hoặc bấm Lưu nháp khi chưa đủ dữ liệu. Hệ thống hiển thị trạng thái đã tải/chưa tải và thông báo bản nháp đã được lưu. |

![Bước 4 - Lưu nháp khi chưa đủ dữ liệu](.figma-review/storyboard/4-2-4-tai-lieu-luu-nhap.png)

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 5 | Xem lại và xác nhận | Người sử dụng xem lại toàn bộ thông tin, bấm Lưu hồ sơ chính thức. Hệ thống tạo mã viên chức, hiển thị màn hình thành công và cho phép xem hồ sơ vừa tạo. |

![Bước 5 - Xem lại và xác nhận hồ sơ](.figma-review/storyboard/4-2-5-xem-lai-xac-nhan.png)

## 4.3. Storyboard - Xem và tìm kiếm danh sách hợp đồng lao động

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 1 | Mở module Hợp đồng lao động | Người sử dụng chọn Hợp đồng lao động trên sidebar. Hệ thống hiển thị dashboard HĐ-01 với thẻ thống kê, bộ lọc và bảng hợp đồng. |

![Bước 1 - Mở màn hình hợp đồng lao động](.figma-review/storyboard/4-3-1-mo-hop-dong.png)

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 2 | Nhận cảnh báo sắp hết hạn | Hệ thống hiển thị banner cảnh báo số hợp đồng sắp hết hạn trong 30 ngày. Người sử dụng có thể bấm Lọc ngay để chỉ xem nhóm hợp đồng cần xử lý. |

![Bước 2 - Nhận cảnh báo hợp đồng sắp hết hạn](.figma-review/storyboard/4-3-2-canh-bao-hop-dong.png)

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 3 | Lọc danh sách hợp đồng | Người sử dụng nhập từ khóa, chọn loại hợp đồng, trạng thái, khoảng ngày hoặc đơn vị. Hệ thống cập nhật bảng, hiển thị chip bộ lọc và empty state nếu không có kết quả. |

![Bước 3 - Lọc danh sách hợp đồng](.figma-review/storyboard/4-3-3-loc-hop-dong.png)

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 4 | Chọn hợp đồng cần xử lý | Người sử dụng bấm Xem, Gia hạn hoặc tạo hợp đồng mới. Hệ thống mở đúng dialog/panel, giữ lại bộ lọc đang áp dụng khi quay về danh sách. |

![Bước 4 - Chọn hợp đồng cần xử lý](.figma-review/storyboard/4-3-4-chon-thao-tac-hop-dong.png)

## 4.4. Storyboard - Thêm hợp đồng lao động

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 1 | Chọn tạo hợp đồng | Từ HĐ-01, người sử dụng bấm Tạo hợp đồng. Hệ thống mở dialog HĐ-02 và đặt con trỏ vào trường chọn nhân sự. |

![Bước 1 - Chọn tạo hợp đồng](.figma-review/storyboard/4-4-1-tao-hop-dong-tu-danh-sach.png)

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 2 | Chọn nhân sự liên kết | Người sử dụng tìm theo mã viên chức/họ tên và chọn nhân sự. Hệ thống hiển thị card tóm tắt hồ sơ, đơn vị, trạng thái hợp đồng hiện tại và kết quả kiểm tra điều kiện. |

![Bước 2 - Chọn nhân sự liên kết](.figma-review/storyboard/4-4-2-chon-nhan-su-hop-dong.png)

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 3 | Nhập thông tin hợp đồng | Người sử dụng nhập loại hợp đồng, ngày ký, ngày hiệu lực, ngày hết hạn, mức lương, đơn vị và tải tệp PDF. Hệ thống hiển thị lỗi inline nếu trường bắt buộc còn thiếu. |

![Bước 3 - Nhập thông tin hợp đồng](.figma-review/storyboard/4-4-3-nhap-hop-dong.png)

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 4 | Kiểm tra và lưu hợp đồng | Khi người sử dụng bấm Tạo hợp đồng, hệ thống kiểm tra trùng thời gian, giới hạn số lần ký và tệp đính kèm. Nếu hợp lệ, dialog đóng và hợp đồng mới xuất hiện trên bảng; nếu lỗi, cảnh báo hiển thị ngay trong dialog. |

![Bước 4 - Hệ thống kiểm tra lỗi hợp đồng](.figma-review/storyboard/4-4-4-kiem-tra-loi-hop-dong.png)

## 4.5. Storyboard - Gia hạn hợp đồng lao động

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 1 | Lọc hợp đồng sắp hết hạn | Người sử dụng bấm banner cảnh báo hoặc chọn trạng thái Sắp hết hạn. Hệ thống chỉ hiển thị các hợp đồng cần gia hạn và sắp xếp theo ngày hết hạn gần nhất. |

![Bước 1 - Lọc hợp đồng sắp hết hạn](.figma-review/storyboard/4-5-1-loc-sap-het-han.png)

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 2 | Mở dialog gia hạn | Người sử dụng bấm Gia hạn trên một dòng hợp đồng. Hệ thống mở dialog HĐ-03, hiển thị thông tin hợp đồng cũ và gợi ý thông tin hợp đồng mới. |

![Bước 2 - Chọn thao tác gia hạn](.figma-review/storyboard/4-5-2-mo-gia-han.png)

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 3 | Kiểm tra hợp đồng cũ | Hệ thống hiển thị ngày hết hạn, loại hợp đồng, số lần đã ký và cảnh báo nếu hợp đồng không đủ điều kiện gia hạn. Nút Xác nhận chỉ bật khi điều kiện hợp lệ. |

![Bước 3 - Kiểm tra hợp đồng cũ](.figma-review/storyboard/4-5-3-kiem-tra-hop-dong-cu.png)

| Bước | Khung hình | Hành động và phản hồi cần thể hiện |
|---|---|---|
| 4 | Nhập thông tin gia hạn và xác nhận | Người sử dụng kiểm tra ngày bắt đầu được gợi ý, nhập ngày kết thúc, mức lương/đơn vị nếu thay đổi, tải tệp hợp đồng và bấm Xác nhận gia hạn. Hệ thống tạo hợp đồng mới và cập nhật danh sách. |

![Bước 4 - Nhập thông tin gia hạn](.figma-review/storyboard/4-5-4-nhap-gia-han.png)

## 4.6. Tổng hợp trạng thái cần thiết kế

| Nhóm trạng thái | Áp dụng cho | Mô tả cần có trong prototype |
|---|---|---|
| Mặc định | HS-01, HĐ-01 | Dữ liệu mẫu, bộ lọc rỗng, bảng hiển thị các bản ghi gần nhất |
| Đang tải | HS-01, HĐ-01, upload Excel/PDF | Skeleton hoặc spinner, vô hiệu hóa hành động tạo/sửa trong lúc xử lý |
| Kết quả rỗng | Tìm kiếm hồ sơ, tìm kiếm hợp đồng | Thông điệp không có kết quả, nút xóa bộ lọc, gợi ý thay đổi từ khóa |
| Lỗi nhập liệu | Wizard hồ sơ, dialog hợp đồng, dialog gia hạn | Lỗi inline gần trường, màu đỏ, thông điệp nêu rõ cách sửa |
| Cảnh báo nghiệp vụ | Hợp đồng sắp hết hạn, quá số lần ký, hợp đồng trùng thời gian | Banner màu vàng/cam hoặc alert trong dialog, không chỉ dùng toast ngắn hạn |
| Xác nhận | Hủy wizard, lưu hồ sơ chính thức, tạo/gia hạn hợp đồng | Dialog xác nhận nếu thao tác có ảnh hưởng đến dữ liệu chính thức |
| Thành công | Thêm hồ sơ, tạo hợp đồng, gia hạn hợp đồng | Toast hoặc màn hình thành công, kèm hành động tiếp theo rõ ràng |

Với cách phác họa này, mỗi storyboard không chỉ cho biết người sử dụng đang làm gì mà còn chỉ ra UI phải phản hồi như thế nào. Nhóm thiết kế có thể đưa trực tiếp các màn hình HS-01 đến HĐ-04 vào Figma, sau đó tạo prototype theo đúng chuỗi thao tác, trạng thái và ngoại lệ đã mô tả.
