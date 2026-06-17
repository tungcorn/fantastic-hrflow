# VII. NGƯỜI SỬ DỤNG KIỂM THỬ VÀ BÁO CÁO KẾT QUẢ

Sau khi hoàn thiện bản mẫu có thể tương tác, nhóm tiến hành kiểm thử với người sử dụng nhằm đánh giá tính khả dụng và phát hiện các vấn đề phát sinh trong quá trình thao tác thực tế. Quá trình kiểm thử tập trung vào các nhiệm vụ quan trọng: thêm hồ sơ nhân sự, lọc/tìm kiếm hồ sơ và tạo - gia hạn - chấm dứt hợp đồng lao động. Phần này tổng hợp những vấn đề được ghi nhận qua kiểm thử và cách nhóm đã khắc phục trên sản phẩm.

## 7.1. Tổng hợp vấn đề và cách khắc phục

| STT | Vấn đề phát hiện qua kiểm thử | Cách khắc phục |
|---|---|---|
| 1 | Khi đang nhập hồ sơ, người dùng vẫn chuyển được sang module khác trên menu và có nguy cơ mất toàn bộ dữ liệu chưa lưu. | Bổ sung cơ chế theo dõi biểu mẫu đang mở; khi người dùng rời trang lúc còn dữ liệu chưa lưu, hệ thống hiển thị hộp thoại cảnh báo "Rời khỏi trang khi chưa lưu?" với hai lựa chọn *Ở lại* / *Rời khỏi*. |
| 2 | Khi lưu hồ sơ nhân sự, hệ thống lưu ngay mà không hỏi lại, dễ tạo ra hồ sơ sai do thao tác nhầm. | Thêm hộp thoại "Xác nhận lưu hồ sơ chính thức" trước khi tạo hồ sơ, nhắc người dùng kiểm tra lại các thông tin quan trọng (họ tên, CCCD, đơn vị công tác, tài liệu bắt buộc). |
| 3 | Các hành động quan trọng với hợp đồng (tạo, gia hạn, chấm dứt) được thực hiện ngay sau khi nhập, không có bước xác nhận lần hai. | Thêm bước xác nhận lần hai cho cả ba thao tác; riêng thao tác chấm dứt dùng hộp thoại cảnh báo màu đỏ (danger). Hộp xác nhận chỉ mở khi dữ liệu đã hợp lệ. |
| 4 | Nhiều trường trong cửa sổ hợp đồng hiển thị sẵn dữ liệu cứng (tên, số hợp đồng mẫu), không phản ánh đúng đối tượng đang thao tác nên dễ gây nhầm lẫn. | Thay dữ liệu cứng bằng dữ liệu thực của nhân sự/hợp đồng được chọn; các thao tác tạo/gia hạn/chấm dứt nay thực sự cập nhật vào dữ liệu thay vì chỉ hiển thị. |
| 5 | Thông báo lỗi khi kiểm tra dữ liệu mơ hồ, khó hiểu và bật đồng loạt nên người dùng khó biết phải sửa trường nào. | Viết lại thông báo lỗi cụ thể cho từng trường ("Vui lòng nhập ngày bắt đầu", "Vui lòng chọn nhân sự liên kết"…); lỗi chỉ hiển thị ở đúng trường còn thiếu và chỉ cho phép tiếp tục khi mọi trường bắt buộc đã hợp lệ. |

## 7.2. Chi tiết các vấn đề đã khắc phục

### 7.2.1. Cảnh báo mất dữ liệu khi rời trang lúc đang nhập

Qua kiểm thử, khi cửa sổ thêm hồ sơ đang mở, người dùng vẫn bấm được vào các mục trên thanh điều hướng và chuyển sang module khác, dẫn tới mất toàn bộ dữ liệu chưa lưu. Hệ thống được bổ sung cơ chế ghi nhận trạng thái "đang nhập liệu" của biểu mẫu. Khi người dùng cố chuyển trang trong lúc còn dữ liệu chưa lưu, một hộp thoại xác nhận sẽ xuất hiện để người dùng chủ động chọn ở lại hoàn tất hoặc chấp nhận rời đi.

### 7.2.2. Xác nhận trước khi lưu hồ sơ nhân sự chính thức

Trước đây thao tác lưu hồ sơ diễn ra ngay khi bấm nút, không có bước hỏi lại, dễ tạo ra các hồ sơ sai do thao tác vội. Nhóm bổ sung một hộp thoại xác nhận riêng cho bước lưu chính thức, kèm lời nhắc rà soát các trường quan trọng. Người dùng có thể chọn quay lại kiểm tra hoặc xác nhận lưu, giúp giảm rủi ro tạo hồ sơ không hợp lệ.

### 7.2.3. Xác nhận lần hai cho các thao tác hợp đồng quan trọng

Các thao tác tạo, gia hạn và chấm dứt hợp đồng là những hành động ảnh hưởng trực tiếp tới dữ liệu nhưng trước đó được thực hiện chỉ với một lần bấm. Hệ thống đã thêm hộp thoại xác nhận lần hai cho cả ba thao tác, mô tả rõ hệ quả của hành động; thao tác chấm dứt được hiển thị ở dạng cảnh báo nguy hiểm để nhấn mạnh mức độ quan trọng. Hộp xác nhận chỉ hiện ra sau khi dữ liệu nhập đã hợp lệ.

### 7.2.4. Hiển thị đúng dữ liệu thực thay cho dữ liệu mẫu cứng

Trong các cửa sổ thao tác hợp đồng, một số thông tin (tên nhân sự, số hợp đồng…) bị gắn cứng giá trị mẫu, không khớp với hợp đồng người dùng đang xử lý. Các cửa sổ này được sửa để hiển thị đúng dữ liệu của nhân sự/hợp đồng được chọn, đồng thời các thao tác thực sự ghi nhận thay đổi vào danh sách dữ liệu, bảo đảm tính nhất quán giữa thông tin hiển thị và kết quả lưu.

### 7.2.5. Làm rõ thông báo kiểm tra dữ liệu (validate)

Thông báo lỗi cũ mang tính chung chung và xuất hiện đồng loạt, khiến người dùng khó xác định trường nào cần sửa. Nhóm viết lại thông báo theo hướng cụ thể, gắn đúng từng trường còn thiếu và chỉ hiển thị tại trường tương ứng. Người dùng chỉ có thể tiếp tục khi toàn bộ trường bắt buộc đã hợp lệ, giúp quá trình sửa lỗi rõ ràng và nhanh hơn.
