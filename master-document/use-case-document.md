# IV. ĐẶC TẢ CA SỬ DỤNG

## 4.1. Nguyễn Hồng Phúc (UC 4.1–4.12)

### 4.1. Use Case: Đăng nhập

|  |  |
| --- | --- |
| **Tên use case** | **Đăng nhập** |
| Tác nhân chính | Quản trị viên, Phòng TCCB, Phòng TCKT, Cán bộ nhân sự |
| Mục đích (mô tả) | Cho phép người dùng xác thực và truy cập vào hệ thống dựa trên thông tin tài khoản được cấp. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Người dùng truy cập địa chỉ web của hệ thống. |
| Điều kiện tiên quyết (Precondition) | Người dùng đã được cấp tài khoản. |
| Điều kiện thành công (Post-condition) | Người dùng được chuyển đến trang chủ tương ứng với vai trò. |
| Điều kiện thất bại | Người dùng không đăng nhập được và vẫn ở màn hình Đăng nhập. |
| Luồng sự kiện chính (Basic Flow) | 1. Người dùng truy cập địa chỉ web của hệ thống. 2. Hệ thống hiển thị màn hình Đăng nhập. 3. Người dùng nhập Tên đăng nhập (Mã cán bộ) và Mật khẩu. 4. Người dùng nhấn nút "Đăng nhập". 5. Hệ thống kiểm tra tính hợp lệ của dữ liệu nhập (không được để trống). 6. Hệ thống xác thực thông tin tài khoản với cơ sở dữ liệu. 7. Hệ thống kiểm tra trạng thái tài khoản (Đang hoạt động / Bị khóa). 8. Hệ thống xác định vai trò của người dùng. 9. Hệ thống chuyển hướng người dùng đến trang chủ tương ứng. |
| Luồng sự kiện thay thế (Alternative Flow) | **A1: Đăng nhập khi đã có phiên hợp lệ** A1.1. Tại bước 1, người dùng truy cập trang Đăng nhập khi đã có phiên đăng nhập hợp lệ. A1.2. Hệ thống tự động chuyển hướng người dùng đến trang chủ tương ứng. A1.3. Use case kết thúc. |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Sai Tên đăng nhập hoặc Mật khẩu** E1.1. Tại bước 6, hệ thống xác thực thông tin không khớp. E1.2. Hệ thống hiển thị thông báo "Tên đăng nhập hoặc mật khẩu không đúng". E1.3. Luồng quay lại bước 3. **E2: Tài khoản bị khóa** E2.1. Tại bước 7, hệ thống phát hiện tài khoản ở trạng thái "Bị khóa". E2.2. Hệ thống hiển thị thông báo "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Quản trị viên". E2.3. Use case kết thúc. **E3: Thiếu thông tin đăng nhập** E3.1. Tại bước 5, hệ thống phát hiện Tên đăng nhập hoặc Mật khẩu bị để trống. E3.2. Hệ thống hiển thị thông báo "Vui lòng nhập đầy đủ Tên đăng nhập và Mật khẩu". E3.3. Luồng quay lại bước 3. |

### 4.2. Use Case: Đăng xuất

|  |  |
| --- | --- |
| **Tên use case** | **Đăng xuất** |
| Tác nhân chính | Quản trị viên, Phòng TCCB, Phòng TCKT, Cán bộ nhân sự |
| Mục đích (mô tả) | Cho phép người dùng thoát khỏi phiên làm việc hiện tại một cách an toàn. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Người dùng chọn "Đăng xuất". |
| Điều kiện tiên quyết (Precondition) | Người dùng đang trong phiên đăng nhập hợp lệ. |
| Điều kiện thành công (Post-condition) | Phiên đăng nhập hiện tại bị hủy và người dùng được chuyển về màn hình Đăng nhập. |
| Điều kiện thất bại | Phiên đăng nhập không được hủy do lỗi hệ thống. |
| Luồng sự kiện chính (Basic Flow) | 1. Người dùng chọn "Đăng xuất". 2. Hệ thống hiển thị hộp thoại yêu cầu xác nhận đăng xuất. 3. Người dùng xác nhận đăng xuất. 4. Hệ thống hủy phiên đăng nhập hiện tại. 5. Hệ thống chuyển hướng về màn hình Đăng nhập. |
| Luồng sự kiện thay thế (Alternative Flow) | **A1: Hủy đăng xuất** A1.1. Tại bước 3, người dùng chọn "Hủy". A1.2. Hệ thống đóng hộp thoại xác nhận. A1.3. Use case kết thúc. |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Lỗi hệ thống khi hủy phiên** E1.1. Tại bước 4, hệ thống gặp lỗi khi hủy phiên đăng nhập. E1.2. Hệ thống hiển thị thông báo "Không thể đăng xuất. Vui lòng thử lại sau." E1.3. Use case kết thúc. |

### 4.3. Use Case: Đổi mật khẩu

|  |  |
| --- | --- |
| **Tên use case** | **Đổi mật khẩu** |
| Tác nhân chính | Quản trị viên, Phòng TCCB, Phòng TCKT, Cán bộ nhân sự |
| Mục đích (mô tả) | Cho phép người dùng thay đổi mật khẩu hiện tại sang mật khẩu mới để tăng cường bảo mật tài khoản. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Người dùng chọn "Đổi mật khẩu". |
| Điều kiện tiên quyết (Precondition) | Người dùng đang đăng nhập hệ thống. |
| Điều kiện thành công (Post-condition) | Mật khẩu mới được lưu thành công; lịch sử thay đổi mật khẩu được ghi nhận. |
| Điều kiện thất bại | Mật khẩu không được thay đổi. |
| Luồng sự kiện chính (Basic Flow) | 1. Người dùng chọn "Đổi mật khẩu". 2. Hệ thống hiển thị biểu mẫu với các trường: Mật khẩu hiện tại, Mật khẩu mới, Xác nhận mật khẩu mới. 3. Người dùng nhập dữ liệu. 4. Người dùng nhấn "Lưu". 5. Hệ thống kiểm tra dữ liệu: Mật khẩu hiện tại khớp với cơ sở dữ liệu; Mật khẩu mới đạt quy tắc bảo mật (độ dài, ký tự đặc biệt); Mật khẩu mới và Xác nhận mật khẩu khớp nhau; Mật khẩu mới khác Mật khẩu hiện tại. 6. Hệ thống hiển thị yêu cầu xác nhận đổi mật khẩu. 7. Người dùng xác nhận. 8. Hệ thống cập nhật mật khẩu, lưu lịch sử thay đổi và thông báo đổi mật khẩu thành công. |
| Luồng sự kiện thay thế (Alternative Flow) | Không có. |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Dữ liệu nhập không hợp lệ** E1.1. Tại bước 5, hệ thống phát hiện lỗi: Mật khẩu hiện tại không đúng, Mật khẩu mới không đạt quy tắc bảo mật, Xác nhận mật khẩu không khớp, hoặc Mật khẩu mới trùng Mật khẩu hiện tại. E1.2. Hệ thống hiển thị thông báo lỗi tương ứng. E1.3. Luồng quay lại bước 3. **E2: Hủy thao tác** E2.1. Trước bước 4, người dùng nhấn "Hủy". E2.2. Hệ thống quay lại màn hình trước đó mà không lưu thay đổi. E2.3. Use case kết thúc. |

### 4.4. Use Case: Tìm kiếm tài khoản người dùng

|  |  |
| --- | --- |
| **Tên use case** | **Tìm kiếm tài khoản người dùng** |
| Tác nhân chính | Quản trị viên |
| Mục đích (mô tả) | Cho phép Quản trị viên tra cứu tài khoản người dùng theo từ khóa và các bộ lọc vai trò, trạng thái. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Quản trị viên chọn menu "Quản lý tài khoản người dùng". |
| Điều kiện tiên quyết (Precondition) | Quản trị viên đã đăng nhập hệ thống. |
| Điều kiện thành công (Post-condition) | Danh sách tài khoản người dùng thỏa điều kiện tìm kiếm được hiển thị. |
| Điều kiện thất bại | Hệ thống không xử lý được yêu cầu tìm kiếm. |
| Luồng sự kiện chính (Basic Flow) | 1. Quản trị viên chọn menu "Quản lý tài khoản người dùng". 2. Hệ thống hiển thị danh sách tài khoản người dùng (phân trang). 3. Quản trị viên nhập từ khóa vào ô tìm kiếm (Mã cán bộ, Họ tên, Email); từ khóa là tùy chọn — nếu để trống, hệ thống lọc theo bộ lọc đã chọn. 4. Quản trị viên chọn bộ lọc: Vai trò (Tất cả — mặc định, Quản trị viên, Phòng TCCB, Phòng TCKT, Cán bộ nhân sự); Trạng thái (Tất cả, Đang hoạt động — mặc định, Bị khóa). 5. Quản trị viên nhấn nút tìm kiếm. 6. Hệ thống lọc và hiển thị danh sách kết quả bao gồm: STT, Mã cán bộ, Họ tên, Email, Vai trò, Trạng thái. Nếu không có bản ghi phù hợp, hệ thống hiển thị danh sách rỗng kèm thông báo "Không có tài khoản phù hợp". |
| Luồng sự kiện thay thế (Alternative Flow) | Không có. |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Lỗi hệ thống** E1.1. Tại bước 6, hệ thống gặp lỗi khi xử lý yêu cầu tìm kiếm. E1.2. Hệ thống hiển thị thông báo "Không thể xử lý yêu cầu tìm kiếm. Vui lòng thử lại sau." E1.3. Use case kết thúc. |

### 4.5. Use Case: Thêm mới tài khoản người dùng

|  |  |
| --- | --- |
| **Tên use case** | **Thêm mới tài khoản người dùng** |
| Tác nhân chính | Quản trị viên |
| Mục đích (mô tả) | Cho phép Quản trị viên tạo mới tài khoản người dùng trong hệ thống. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Quản trị viên nhấn nút "Thêm mới người dùng". |
| Điều kiện tiên quyết (Precondition) | Quản trị viên đã đăng nhập hệ thống. |
| Điều kiện thành công (Post-condition) | Tài khoản mới được tạo, gán vai trò hợp lệ và lưu trong cơ sở dữ liệu; thông tin mật khẩu tạm thời được gửi đến email người dùng. |
| Điều kiện thất bại | Tài khoản không được tạo do dữ liệu không hợp lệ hoặc trùng lặp. |
| Luồng sự kiện chính (Basic Flow) | 1. Tại màn hình danh sách, Quản trị viên nhấn nút "Thêm mới". 2. Hệ thống hiển thị biểu mẫu thêm tài khoản. 3. Quản trị viên nhập thông tin: Email, Hồ sơ nhân sự liên kết, Vai trò. 4. Quản trị viên nhấn "Lưu". 5. Hệ thống kiểm tra tính hợp lệ: các trường bắt buộc đã điền đầy đủ, Email đúng định dạng và duy nhất, Hồ sơ nhân sự tồn tại và chưa có tài khoản liên kết, Vai trò hợp lệ. 6. Hệ thống lưu thông tin tài khoản. 7. Hệ thống tạo mật khẩu tạm thời và gửi đến email tương ứng. 8. Hệ thống lưu lịch sử thay đổi và thông báo thêm thành công. |
| Luồng sự kiện thay thế (Alternative Flow) | Không có. |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Dữ liệu nhập không hợp lệ** E1.1. Tại bước 5, hệ thống phát hiện trường thông tin không hợp lệ (Email sai định dạng, Email trùng, Hồ sơ nhân sự không tồn tại hoặc đã liên kết tài khoản, Vai trò không hợp lệ). E1.2. Hệ thống hiển thị thông báo lỗi tương ứng. E1.3. Luồng quay lại bước 3. **E2: Hủy thao tác** E2.1. Trước bước 4, Quản trị viên nhấn "Hủy". E2.2. Hệ thống quay lại màn hình danh sách tài khoản. E2.3. Use case kết thúc. **E3: Gửi email thất bại** E3.1. Tại bước 7, hệ thống không thể gửi email chứa mật khẩu tạm thời đến người dùng. E3.2. Hệ thống vẫn lưu tài khoản đã tạo và hiển thị thông báo "Tài khoản đã được tạo nhưng không thể gửi email mật khẩu. Vui lòng thử gửi lại sau." E3.3. Use case kết thúc. |

### 4.6. Use Case: Sửa thông tin tài khoản người dùng

|  |  |
| --- | --- |
| **Tên use case** | **Sửa thông tin tài khoản người dùng** |
| Tác nhân chính | Quản trị viên |
| Mục đích (mô tả) | Cho phép Quản trị viên cập nhật thông tin tài khoản người dùng. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Quản trị viên chọn một tài khoản và nhấn nút "Sửa". |
| Điều kiện tiên quyết (Precondition) | Quản trị viên đã đăng nhập hệ thống. Tài khoản cần chỉnh sửa tồn tại trong hệ thống (bất kể trạng thái Đang hoạt động hay Bị khóa). |
| Điều kiện thành công (Post-condition) | Thông tin tài khoản người dùng được cập nhật trong cơ sở dữ liệu. |
| Điều kiện thất bại | Không có thay đổi nào được lưu vào hệ thống. |
| Luồng sự kiện chính (Basic Flow) | 1. Tại danh sách, Quản trị viên nhấn "Sửa" trên một dòng tài khoản người dùng. 2. Hệ thống hiển thị biểu mẫu cập nhật với thông tin hiện tại. 3. Quản trị viên thay đổi Email, Vai trò. 4. Quản trị viên nhấn "Lưu". 5. Hệ thống kiểm tra tính hợp lệ: các trường bắt buộc đã điền đầy đủ, Email đúng định dạng và duy nhất, Vai trò hợp lệ. 6. Hệ thống lưu thay đổi. 7. Hệ thống lưu lịch sử thay đổi và thông báo cập nhật thành công. |
| Luồng sự kiện thay thế (Alternative Flow) | Không có. |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Dữ liệu nhập không hợp lệ** E1.1. Tại bước 5, hệ thống phát hiện trường dữ liệu không hợp lệ (Email sai định dạng hoặc trùng, Vai trò không hợp lệ). E1.2. Hệ thống hiển thị thông báo lỗi tương ứng. E1.3. Luồng quay lại bước 3. **E2: Hủy thao tác** E2.1. Trước bước 4, Quản trị viên nhấn "Hủy". E2.2. Hệ thống quay lại màn hình danh sách tài khoản. E2.3. Use case kết thúc. |

### 4.7. Use Case: Thay đổi trạng thái cho tài khoản người dùng

|  |  |
| --- | --- |
| **Tên use case** | **Thay đổi trạng thái cho tài khoản người dùng** |
| Tác nhân chính | Quản trị viên |
| Mục đích (mô tả) | Cho phép Quản trị viên khóa hoặc mở khóa tài khoản người dùng. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Quản trị viên chọn chức năng thay đổi trạng thái tài khoản. |
| Điều kiện tiên quyết (Precondition) | Quản trị viên đã đăng nhập hệ thống. |
| Điều kiện thành công (Post-condition) | Trạng thái tài khoản được cập nhật thành "Đang hoạt động" hoặc "Bị khóa". |
| Điều kiện thất bại | Trạng thái tài khoản không thay đổi. |
| Luồng sự kiện chính (Basic Flow) | 1. Tại danh sách, Quản trị viên nhấn biểu tượng "Khóa" trên dòng tài khoản có trạng thái "Đang hoạt động". 2. Hệ thống hiển thị hộp thoại yêu cầu xác nhận. 3. Quản trị viên xác nhận. 4. Hệ thống cập nhật trạng thái tài khoản thành "Bị khóa". 5. Hệ thống lưu lịch sử thay đổi và thông báo cập nhật thành công. |
| Luồng sự kiện thay thế (Alternative Flow) | **A1: Mở khóa tài khoản** A1.1. Tại bước 1, Quản trị viên nhấn biểu tượng "Mở khóa" trên dòng tài khoản có trạng thái "Bị khóa". A1.2. Hệ thống hiển thị hộp thoại yêu cầu xác nhận. A1.3. Quản trị viên xác nhận. A1.4. Hệ thống cập nhật trạng thái tài khoản thành "Đang hoạt động", lưu lịch sử thay đổi và thông báo thành công. A1.5. Use case kết thúc. |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Không thể khóa tài khoản đang đăng nhập** E1.1. Tại bước 1, Quản trị viên chọn khóa tài khoản đang sử dụng. E1.2. Hệ thống từ chối thao tác và hiển thị thông báo "Không thể khóa tài khoản đang sử dụng". E1.3. Use case kết thúc. |

### 4.8. Use Case: Tạo mới đơn vị tổ chức nhân sự

|  |  |
| --- | --- |
| **Tên use case** | **Tạo mới đơn vị tổ chức nhân sự** |
| Tác nhân chính | Quản trị viên, Phòng TCCB |
| Mục đích (mô tả) | Cho phép Quản trị viên hoặc Phòng TCCB tạo mới một đơn vị tổ chức trong cơ cấu tổ chức nhân sự. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Người dùng chọn chức năng "Thêm mới đơn vị" trong menu "Cơ cấu tổ chức". |
| Điều kiện tiên quyết (Precondition) | Người dùng đã đăng nhập hệ thống với vai trò Quản trị viên hoặc Phòng TCCB. Hệ thống đã tồn tại đơn vị gốc "Trường Đại học Thủy Lợi". |
| Điều kiện thành công (Post-condition) | Đơn vị mới được lưu thành công, gắn đúng vào cây cơ cấu tổ chức và hiển thị trên sơ đồ. |
| Điều kiện thất bại | Đơn vị không được tạo do vi phạm ràng buộc dữ liệu hoặc nghiệp vụ. |
| Luồng sự kiện chính (Basic Flow) | 1. Hệ thống hiển thị sơ đồ cây cơ cấu tổ chức hiện tại. 2. Người dùng chọn một đơn vị làm đơn vị cha. 3. Người dùng nhấn chức năng "Thêm mới đơn vị" dưới cấp của đơn vị đã chọn. 4. Hệ thống hiển thị biểu mẫu nhập thông tin đơn vị mới. 5. Người dùng nhập thông tin cơ bản: Tên đơn vị, Mã đơn vị, Loại đơn vị (Hội đồng, Ban, Khoa, Phòng, Bộ môn, Phòng thí nghiệm, Trung tâm), Đơn vị cha (mặc định là đơn vị đã chọn ở bước 2). 6. Người dùng nhập thông tin liên hệ: Ngày thành lập, Địa chỉ, Địa chỉ văn phòng, Email, Số điện thoại, Website (tùy chọn). 7. Người dùng chọn thuộc tính "Đơn vị nút" nếu đơn vị không được phép có đơn vị con. 8. Người dùng nhấn "Lưu". 9. Hệ thống kiểm tra tính hợp lệ dữ liệu (các trường bắt buộc đã điền đầy đủ). 10. Hệ thống hiển thị yêu cầu xác nhận lưu. 11. Người dùng xác nhận. 12. Hệ thống lưu đơn vị mới với trạng thái mặc định "Đang hoạt động". 13. Hệ thống lưu lịch sử thay đổi và thông báo thêm thành công. |
| Luồng sự kiện thay thế (Alternative Flow) | Không có. |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Trùng mã đơn vị** E1.1. Tại bước 9, hệ thống phát hiện mã đơn vị đã tồn tại. E1.2. Hệ thống hiển thị thông báo "Mã đơn vị đã tồn tại. Vui lòng nhập mã khác." E1.3. Luồng quay lại bước 5. **E2: Thiếu thông tin bắt buộc** E2.1. Tại bước 9, hệ thống phát hiện thiếu các trường bắt buộc (Tên đơn vị, Mã đơn vị, Loại đơn vị). E2.2. Hệ thống hiển thị cảnh báo và yêu cầu bổ sung. E2.3. Luồng quay lại bước 5. **E3: Đơn vị cha không hợp lệ** E3.1. Tại bước 3, hệ thống phát hiện đơn vị cha đang ở trạng thái "Giải thể" hoặc "Sáp nhập". E3.2. Hệ thống hiển thị thông báo "Không thể tạo đơn vị trực thuộc đơn vị đã giải thể hoặc sáp nhập." E3.3. Use case kết thúc. **E4: Hủy thao tác** E4.1. Trước bước 8, người dùng chọn "Hủy". E4.2. Hệ thống quay lại sơ đồ cơ cấu tổ chức. E4.3. Use case kết thúc. **E5: Đơn vị cha là đơn vị nút** E5.1. Tại bước 3, hệ thống phát hiện đơn vị cha đã được đánh dấu là đơn vị nút. E5.2. Hệ thống vô hiệu hóa chức năng "Thêm mới đơn vị" và hiển thị thông báo "Đơn vị này đã được đánh dấu là đơn vị nút, không thể thêm đơn vị con." E5.3. Use case kết thúc. |

### 4.9. Use Case: Sửa thông tin đơn vị tổ chức nhân sự

|  |  |
| --- | --- |
| **Tên use case** | **Sửa thông tin đơn vị tổ chức nhân sự** |
| Tác nhân chính | Quản trị viên, Phòng TCCB |
| Mục đích (mô tả) | Cho phép Quản trị viên hoặc Phòng TCCB chỉnh sửa thông tin đơn vị tổ chức nhân sự trong cơ cấu tổ chức. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Người dùng chọn chức năng "Sửa thông tin đơn vị" tại màn hình chi tiết đơn vị. |
| Điều kiện tiên quyết (Precondition) | Người dùng đã đăng nhập hệ thống với vai trò Quản trị viên hoặc Phòng TCCB. Đơn vị tổ chức cần chỉnh sửa đã tồn tại trong hệ thống. |
| Điều kiện thành công (Post-condition) | Thông tin đơn vị được cập nhật thành công. Sơ đồ cơ cấu tổ chức phản ánh dữ liệu mới. |
| Điều kiện thất bại | Thông tin đơn vị không được cập nhật do vi phạm ràng buộc dữ liệu hoặc nghiệp vụ. |
| Luồng sự kiện chính (Basic Flow) | 1. Hệ thống hiển thị sơ đồ đơn vị hiện tại. 2. Người dùng chọn chức năng "Sửa thông tin đơn vị" của một đơn vị. 3. Hệ thống hiển thị biểu mẫu chỉnh sửa với thông tin hiện tại: Thông tin cơ bản (Tên đơn vị, Mã đơn vị — không được sửa, Loại đơn vị); Thông tin liên hệ (Địa chỉ, Địa chỉ văn phòng, Email, Số điện thoại, Website). 4. Người dùng chỉnh sửa các thông tin cần thiết. 5. Người dùng nhấn "Lưu". 6. Hệ thống kiểm tra tính hợp lệ của dữ liệu. 7. Hệ thống hiển thị yêu cầu xác nhận lưu thay đổi. 8. Người dùng xác nhận. 9. Hệ thống cập nhật thông tin đơn vị. 10. Hệ thống lưu lịch sử thay đổi và thông báo cập nhật thành công. |
| Luồng sự kiện thay thế (Alternative Flow) | Không có. |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Dữ liệu không hợp lệ** E1.1. Tại bước 6, hệ thống phát hiện thiếu dữ liệu bắt buộc hoặc định dạng không hợp lệ. E1.2. Hệ thống hiển thị cảnh báo và không cho phép lưu. E1.3. Luồng quay lại bước 4. **E2: Không được phép chỉnh sửa** E2.1. Tại bước 2, nếu đơn vị đang ở trạng thái "Giải thể" hoặc "Sáp nhập". E2.2. Hệ thống hiển thị thông báo từ chối chỉnh sửa. E2.3. Use case kết thúc. **E3: Hủy thao tác** E3.1. Trước bước 5, người dùng chọn "Hủy". E3.2. Hệ thống quay lại sơ đồ cơ cấu tổ chức. E3.3. Use case kết thúc. |

### 4.10. Use Case: Giải thể đơn vị tổ chức nhân sự

|  |  |
| --- | --- |
| **Tên use case** | **Giải thể đơn vị tổ chức nhân sự** |
| Tác nhân chính | Quản trị viên, Phòng TCCB |
| Mục đích (mô tả) | Cho phép Quản trị viên hoặc Phòng TCCB giải thể một đơn vị tổ chức trong cơ cấu tổ chức nhân sự và xử lý phái sinh đối với nhân sự, hợp đồng và đơn vị con trực thuộc. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Người dùng chọn chức năng "Giải thể" đối với một đơn vị tại menu "Cơ cấu tổ chức". |
| Điều kiện tiên quyết (Precondition) | Người dùng đã đăng nhập hệ thống với vai trò Quản trị viên hoặc Phòng TCCB. Đơn vị tổ chức cần giải thể đã tồn tại và đang ở trạng thái "Đang hoạt động". |
| Điều kiện thành công (Post-condition) | Trạng thái đơn vị là "Giải thể"; hợp đồng đang hiệu lực chuyển thành "Hết hiệu lực"; trạng thái hợp đồng nhân sự chuyển thành "Chưa hợp đồng"; trạng thái làm việc chuyển thành "Đang chờ xét"; liên kết đơn vị công tác bị xóa khỏi hồ sơ nhân sự; đơn vị con được xử lý theo phương án đã chọn; lịch sử thay đổi được ghi nhận. |
| Điều kiện thất bại | Việc giải thể không được thực hiện do vi phạm ràng buộc nghiệp vụ hoặc dữ liệu không hợp lệ. |
| Luồng sự kiện chính (Basic Flow) | 1. Hệ thống hiển thị sơ đồ cây cơ cấu tổ chức hiện tại. 2. Người dùng chọn một đơn vị đang ở trạng thái "Đang hoạt động". 3. Người dùng chọn chức năng "Giải thể đơn vị". 4. Hệ thống hiển thị biểu mẫu giải thể, đồng thời hiển thị cảnh báo danh sách các đơn vị con trực thuộc (nếu có). 5. Người dùng nhập thông tin bắt buộc: Ngày hiệu lực (ngày giải thể); Quyết định (Số quyết định, Ngày quyết định, File đính kèm); Lý do (Giải thể / Tái cơ cấu / Khác). 6. Xử lý đơn vị con (nếu có): Người dùng chọn phương án — Tùy chọn A: Giải thể toàn bộ đơn vị con; Tùy chọn B: Điều chuyển đơn vị con sang đơn vị cha khác (chọn đơn vị cha mới từ danh sách). 7. Người dùng nhấn "Lưu xác nhận". 8. Hệ thống kiểm tra tính hợp lệ dữ liệu đầu vào. 9. Hệ thống thực hiện giải thể: cập nhật trạng thái đơn vị thành "Giải thể"; xử lý đơn vị con theo phương án đã chọn ở bước 6; cập nhật nhân sự thuộc đơn vị: tất cả hợp đồng đang hiệu lực chuyển thành "Hết hiệu lực", trạng thái hợp đồng nhân sự chuyển thành "Chưa hợp đồng", trạng thái làm việc chuyển thành "Đang chờ xét", xóa liên kết đơn vị công tác khỏi hồ sơ nhân sự. 10. Hệ thống lưu lịch sử thay đổi và hiển thị thông báo "Giải thể thành công". |
| Luồng sự kiện thay thế (Alternative Flow) | Không có. |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Đơn vị không hợp lệ để giải thể** E1.1. Tại bước 2, nếu đơn vị đang ở trạng thái "Giải thể" hoặc "Sáp nhập". E1.2. Hệ thống vô hiệu hóa chức năng và hiển thị thông báo "Đơn vị này không còn hoạt động". E1.3. Use case kết thúc. **E2: Dữ liệu không hợp lệ** E2.1. Tại bước 8, nếu thiếu thông tin bắt buộc, ngày hiệu lực sai định dạng hoặc chưa đính kèm file Quyết định. E2.2. Hệ thống chặn thao tác lưu, đánh dấu các trường bị lỗi và yêu cầu nhập lại. E2.3. Luồng quay lại bước 5. **E3: Chưa xử lý đơn vị con** E3.1. Tại bước 6, nếu đơn vị có đơn vị con nhưng người dùng chọn Tùy chọn B mà không chọn Đơn vị cha mới. E3.2. Hệ thống hiển thị cảnh báo "Vui lòng chọn đơn vị quản lý mới cho các đơn vị trực thuộc trước khi giải thể." E3.3. Luồng quay lại bước 6. **E4: Ràng buộc chức vụ quản lý** E4.1. Tại bước 8, nếu đơn vị đang có nhân sự giữ chức vụ quản lý (ví dụ: Trưởng phòng, Trưởng khoa). E4.2. Hệ thống chặn thao tác và hiển thị thông báo "Vui lòng thực hiện bãi nhiệm chức vụ quản lý của đơn vị trước khi thực hiện giải thể." E4.3. Use case kết thúc. **E5: Hủy thao tác** E5.1. Trước bước 7, người dùng chọn "Hủy". E5.2. Hệ thống quay lại sơ đồ cơ cấu tổ chức. E5.3. Use case kết thúc. |

### 4.11. Use Case: Xem chi tiết thông tin đơn vị tổ chức nhân sự

|  |  |
| --- | --- |
| **Tên use case** | **Xem chi tiết thông tin đơn vị tổ chức nhân sự** |
| Tác nhân chính | Quản trị viên, Phòng TCCB |
| Mục đích (mô tả) | Cho phép Quản trị viên hoặc Phòng TCCB xem đầy đủ thông tin của một đơn vị tổ chức trong cơ cấu tổ chức. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Người dùng chọn chức năng xem chi tiết một đơn vị trong menu "Cơ cấu tổ chức". |
| Điều kiện tiên quyết (Precondition) | Người dùng đã đăng nhập hệ thống với vai trò Quản trị viên hoặc Phòng TCCB. Đơn vị tổ chức đã tồn tại trong hệ thống. |
| Điều kiện thành công (Post-condition) | Thông tin chi tiết của đơn vị được hiển thị từ dữ liệu hiện có trong hệ thống; không có dữ liệu nào bị thay đổi. |
| Điều kiện thất bại | Không hiển thị được dữ liệu do lỗi hệ thống hoặc đơn vị không tồn tại. |
| Luồng sự kiện chính (Basic Flow) | 1. Hệ thống hiển thị sơ đồ cây cơ cấu tổ chức. 2. Người dùng chọn một đơn vị trong cây. 3. Hệ thống hiển thị thông tin chi tiết đơn vị gồm các tab: Tab "Tổng quan" (Tên đơn vị, Mã đơn vị, Loại đơn vị, Đơn vị cha, Ngày thành lập, Thông tin liên hệ, Trạng thái hiện tại: Đang hoạt động / Sáp nhập / Giải thể); Tab "Nhân sự" (Danh sách nhân sự thuộc đơn vị: Họ tên, Mã cán bộ, Chức vụ, Ngày bắt đầu); Tab "Đơn vị trực thuộc" (Danh sách các đơn vị con trực thuộc); Tab "Lịch sử" (Lịch sử bổ nhiệm/miễn nhiệm chức vụ và lịch sử thay đổi tổ chức: thành lập, sáp nhập, giải thể). |
| Luồng sự kiện thay thế (Alternative Flow) | Không có. |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Đơn vị không tồn tại hoặc không có quyền truy cập** E1.1. Tại bước 2, nếu đơn vị không tồn tại hoặc người dùng không có quyền truy cập. E1.2. Hệ thống hiển thị thông báo phù hợp. E1.3. Use case kết thúc. **E2: Lỗi tải dữ liệu** E2.1. Tại bước 3, nếu xảy ra lỗi khi tải dữ liệu đơn vị. E2.2. Hệ thống hiển thị thông báo "Không thể tải thông tin đơn vị. Vui lòng thử lại sau." E2.3. Use case kết thúc. |

### 4.12. Use Case: Sáp nhập đơn vị tổ chức nhân sự

|  |  |
| --- | --- |
| **Tên use case** | **Sáp nhập đơn vị tổ chức nhân sự** |
| Tác nhân chính | Quản trị viên, Phòng TCCB |
| Mục đích (mô tả) | Cho phép Quản trị viên hoặc Phòng TCCB sáp nhập một đơn vị tổ chức vào đơn vị nhận sáp nhập, chuyển nhân sự và đơn vị con trực thuộc sang đơn vị nhận. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Người dùng chọn chức năng "Sáp nhập" đối với một đơn vị tại menu "Cơ cấu tổ chức". |
| Điều kiện tiên quyết (Precondition) | Người dùng đã đăng nhập hệ thống với vai trò Quản trị viên hoặc Phòng TCCB. Đơn vị tổ chức cần sáp nhập đã tồn tại và đang ở trạng thái "Đang hoạt động". |
| Điều kiện thành công (Post-condition) | Trạng thái đơn vị là "Sáp nhập"; nhân sự được chuyển sang đơn vị nhận sáp nhập với trạng thái hợp đồng và trạng thái làm việc giữ nguyên; đơn vị con trực thuộc được chuyển sang làm đơn vị con của đơn vị nhận sáp nhập; lịch sử thay đổi được ghi nhận. |
| Điều kiện thất bại | Việc sáp nhập không được thực hiện do vi phạm ràng buộc nghiệp vụ hoặc dữ liệu không hợp lệ. |
| Luồng sự kiện chính (Basic Flow) | 1. Hệ thống hiển thị sơ đồ cây cơ cấu tổ chức hiện tại. 2. Người dùng chọn một đơn vị đang ở trạng thái "Đang hoạt động". 3. Người dùng chọn chức năng "Sáp nhập đơn vị". 4. Hệ thống hiển thị biểu mẫu sáp nhập, đồng thời hiển thị danh sách đơn vị con trực thuộc (nếu có). 5. Người dùng nhập thông tin bắt buộc: Ngày hiệu lực; Quyết định (Số quyết định, Ngày quyết định, File đính kèm); Lý do; Đơn vị nhận sáp nhập (chọn từ danh sách đơn vị đang hoạt động). 6. Hệ thống tự động thiết lập chuyển toàn bộ đơn vị con trực thuộc sang làm đơn vị con của Đơn vị nhận sáp nhập. 7. Người dùng nhấn "Lưu xác nhận". 8. Hệ thống kiểm tra tính hợp lệ dữ liệu đầu vào. 9. Hệ thống thực hiện sáp nhập: cập nhật trạng thái đơn vị thành "Sáp nhập"; cập nhật đơn vị quản lý cấp trên của đơn vị con sang Đơn vị nhận sáp nhập; chuyển toàn bộ nhân sự sang Đơn vị nhận sáp nhập (trạng thái hợp đồng giữ nguyên, trạng thái làm việc giữ nguyên "Đang công tác", thông tin đơn vị mới được cập nhật). 10. Hệ thống lưu lịch sử thay đổi và hiển thị thông báo "Sáp nhập thành công". |
| Luồng sự kiện thay thế (Alternative Flow) | Không có. |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Đơn vị không hợp lệ để sáp nhập** E1.1. Tại bước 2, nếu đơn vị đang ở trạng thái "Giải thể" hoặc "Sáp nhập". E1.2. Hệ thống vô hiệu hóa chức năng và hiển thị thông báo "Đơn vị này không còn hoạt động". E1.3. Use case kết thúc. **E2: Dữ liệu không hợp lệ** E2.1. Tại bước 8, nếu thiếu thông tin bắt buộc, ngày hiệu lực sai định dạng hoặc chưa đính kèm file Quyết định. E2.2. Hệ thống chặn thao tác lưu, đánh dấu các trường bị lỗi và yêu cầu nhập lại. E2.3. Luồng quay lại bước 5. **E3: Ràng buộc chức vụ quản lý** E3.1. Tại bước 8, nếu đơn vị đang có nhân sự giữ chức vụ quản lý (ví dụ: Trưởng phòng, Trưởng khoa). E3.2. Hệ thống chặn thao tác và hiển thị thông báo "Vui lòng thực hiện bãi nhiệm chức vụ quản lý của đơn vị trước khi thực hiện sáp nhập." E3.3. Use case kết thúc. **E4: Hủy thao tác** E4.1. Trước bước 7, người dùng chọn "Hủy". E4.2. Hệ thống quay lại sơ đồ cơ cấu tổ chức. E4.3. Use case kết thúc. |

## 4.2. Nguyễn Hải Ninh (UC 4.13–4.24)

### 4.13. Use Case: Thêm mới danh mục hệ số lương (Nguyễn Hải Ninh)

|  |  |
| --- | --- |
| **Tên use case** | **Thêm mới danh mục hệ số lương** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Phòng TCCB thiết lập hệ số lương theo bậc và ngạch phục vụ cho việc quản lý và nhập liệu thông tin nhân sự. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Tại màn hình danh sách danh mục hệ số lương, Phòng TCCB chọn chức năng “Thêm”. |
| Điều kiện tiên quyết (Precondition) | Người dùng đăng nhập với vai trò Phòng TCCB. |
| Điều kiện thành công (Post-condition) | Thiết lập hệ số lương theo ngạch/bậc thành công |
| Điều kiện thất bại | Hệ số lương không được cập nhật mới trong CSDL |
| Luồng sự kiện chính (Basic Flow) | 1.  Phòng TCCB truy cập chức năng thêm hệ số lương.  2.  Hệ thống hiển thị màn hình nhập hệ số lương.  3.  Phòng TCCB nhập các các thông tin  \* Ngạch viên chức  \* Bậc lương  \* Hệ số lương  4.  Phòng TCCB xác nhận lưu thông tin  5. Hệ thống kiểm tra dữ liệu hợp lệ  6. Hệ thống thêm thông tin.  7. Hệ thống lưu lịch sử thay đổi và thông báo thêm thành công. |
| Luồng sự kiện thay thế (Alternative Flow) | Không có |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Dữ liệu lưu không hợp lệ**  1. Tại bước 5, Hệ thống validate phát hiện lỗi:  \* Bậc lương trong cùng ngạch đã tồn tại  \* Hệ số lương phải là số thực, không được nhỏ hơn 0  \* Bậc lương phải là số nguyên  \* Thông tin bắt buộc đầy đủ  2. Hệ thống báo lỗi  3. Dữ liệu không được lưu  **E2: Phòng TCCB hủy thao tác**  1. Tại bước 2, Phòng TCCB nhấn “Hủy” 2. Hệ thống quay lại màn hình danh sách bậc lương. |

### 4.14. Use Case: Sửa danh mục hệ số lương

|  |  |
| --- | --- |
| **Tên use case** | **Sửa danh mục hệ số lương** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Phòng TCCB sửa hệ số lương theo bậc và ngạch phục vụ cho việc quản lý và nhập liệu thông tin nhân sự nếu như nhập liệu sai sót. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Tại màn hình danh sách danh mục hệ số lương, Phòng TCCB chọn chức năng “Sửa”. |
| Điều kiện tiên quyết (Precondition) | Người dùng đăng nhập với vai trò Phòng TCCB. Danh mục hệ số lương cần chỉnh sửa đã tồn tại trong hệ thống. Danh mục hệ số lương đang ở trạng thái “Đang sử dụng”. Hệ số lương chưa được hồ sơ nhân sự nào sử dụng. |
| Điều kiện thành công (Post-condition) | Sửa hệ số lương theo ngạch/bậc thành công |
| Điều kiện thất bại | Hệ số lương không được cập nhật trong CSDL |
| Luồng sự kiện chính (Basic Flow) | 1.  Phòng TCCB truy cập chức năng sửa hệ số lương của một bản ghi hệ số lương đã được cấu hình.  2.  Hệ thống hiển thị màn hình nhập hệ số lương.  3.  Phòng TCCB sửa các các thông tin  \* Ngạch viên chức  \* Bậc lương  \* Hệ số lương mỗi bậc  4.  Phòng TCCB bấm lưu  5. Hệ thống kiểm tra dữ liệu hợp lệ  6. Hệ thống cập nhật thông tin.  7. Hệ thống lưu lịch sử thay đổi và thông báo cập nhật thành công. |
| Luồng sự kiện thay thế (Alternative Flow) | Không có |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Dữ liệu lưu không hợp lệ**  1. Tại bước 5, Hệ thống validate phát hiện lỗi:  \* Bậc lương trong cùng ngạch đã tồn tại  \* Hệ số lương phải là số thực, không được nhỏ hơn 0  \* Bậc lương phải là số nguyên  \* Thông tin bắt buộc đầy đủ  2. Hệ thống báo lỗi  3. Dữ liệu không được lưu  **E2: Danh mục đang ở trạng thái “Ngừng sử dụng”**  1. Tại bước 1, hệ thống phát hiện danh mục hệ số lương đang ở trạng thái “Ngừng sử dụng”.  2. Hệ thống vô hiệu hóa nút “Sửa” hoặc hiển thị thông báo: “Không thể chỉnh sửa danh mục đã ngừng sử dụng.”  **E3: Phòng TCCB hủy thao tác**  1. Tại bước 2, Phòng TCCB nhấn “Hủy” 2. Hệ thống quay lại màn hình danh sách bậc lương  **E4: Hệ số lương đã được hồ sơ nhân sự sử dụng**  1. Tại bước 1, hệ thống phát hiện hệ số lương đã được ít nhất một hồ sơ nhân sự sử dụng.  2. Hệ thống hiển thị thông báo: “Không thể chỉnh sửa hệ số lương đã được sử dụng trong hồ sơ nhân sự.”  3. Hệ thống vô hiệu hóa nút “Sửa”. |

### 4.16. Use Case: Thay đổi trạng thái danh mục hệ số lương

|  |  |
| --- | --- |
| **Tên use case** | **Thay đổi trạng thái danh mục hệ số lương** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Cho phép Phòng TCCB thay đổi trạng thái của danh mục hệ số lương giữa “Đang sử dụng” và “Ngừng sử dụng”, nhằm kiểm soát việc áp dụng hệ số lương cho hồ sơ nhân sự mới, đồng thời bảo toàn dữ liệu và liên kết với các hồ sơ đã tồn tại. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Tại màn hình danh sách danh mục hệ số lương, Phòng TCCB chọn chức năng “Thay đổi trạng thái”. |
| Điều kiện tiên quyết (Precondition) | Người dùng đăng nhập với vai trò Phòng TCCB. Danh mục hệ số lương cần thay đổi trạng thái đã tồn tại trong hệ thống. |
| Điều kiện thành công (Post-condition) | Danh mục hệ số lương được cập nhật sang trạng thái mới (“Đang sử dụng” ↔ “Ngừng sử dụng”). Nếu chuyển sang “Ngừng sử dụng”: hệ số lương không còn được chọn khi tạo hoặc chỉnh sửa hồ sơ nhân sự mới; các hồ sơ nhân sự đã sử dụng hệ số lương này không bị ảnh hưởng. Nếu chuyển sang “Đang sử dụng”: hệ số lương được phép chọn lại khi tạo hoặc chỉnh sửa hồ sơ nhân sự. |
| Điều kiện thất bại | Không thể cập nhật trạng thái mới trong CSDL |
| Luồng sự kiện chính (Basic Flow) | 1. Phòng TCCB chọn một danh mục hệ số lương đang ở trạng thái “Đang sử dụng” trong danh sách.  2. Phòng TCCB chọn chức năng “Thay đổi trạng thái”.  3. Hệ thống hiển thị hộp thoại xác nhận chuyển trạng thái sang “Ngừng sử dụng”. 4. Phòng TCCB xác nhận thao tác.  5. Hệ thống cập nhật trạng thái danh mục hệ số lương thành “Ngừng sử dụng”.  6. Hệ thống lưu lịch sử thay đổi và thông báo cập nhật thành công. |
| Luồng sự kiện thay thế (Alternative Flow) | **A1: Kích hoạt lại danh mục đang ở trạng thái “Ngừng sử dụng”**  1. Tại bước 1, Phòng TCCB chọn một danh mục hệ số lương đang ở trạng thái “Ngừng sử dụng”.  2. Phòng TCCB chọn chức năng “Thay đổi trạng thái”.  3. Hệ thống hiển thị hộp thoại xác nhận chuyển trạng thái sang “Đang sử dụng”.  4. Phòng TCCB xác nhận thao tác.  5. Hệ thống cập nhật trạng thái danh mục hệ số lương thành “Đang sử dụng”.  6. Hệ thống lưu lịch sử thay đổi và thông báo cập nhật thành công. |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Hủy thao tác**  1. Tại bước 3, Phòng TCCB chọn “Hủy”. 2. Hệ thống đóng hộp thoại xác nhận và quay lại màn hình danh sách. |

### 4.17. Use Case: Thêm mới danh mục loại phụ cấp

|  |  |
| --- | --- |
| **Tên use case** | **Thêm mới danh mục loại phụ cấp** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Phòng TCCB thêm mới loại phụ cấp phục vụ cho việc quản lý và nhập liệu thông tin nhân sự. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Tại màn hình danh sách danh mục loại phụ cấp, Phòng TCCB chọn chức năng “Thêm”. |
| Điều kiện tiên quyết (Precondition) | Người dùng đăng nhập với vai trò Phòng TCCB. |
| Điều kiện thành công (Post-condition) | Danh mục loại phụ cấp được thêm thành công |
| Điều kiện thất bại | Loại phụ cấp  không được cập nhật mới trong CSDL |
| Luồng sự kiện chính (Basic Flow) | 1.  Phòng TCCB truy cập chức năng thêm mới danh mục loại phụ cấp.  2.  Hệ thống hiển thị màn hình nhập danh mục loại phụ cấp.  3.  Phòng TCCB thêm các các thông tin  \* Tên loại phụ cấp  \* Mô tả  \* Cách tính  4.  Phòng TCCB bấm lưu  5. Hệ thống kiểm tra dữ liệu hợp lệ  6. Hệ thống lưu thông tin thành công  7. Hệ thống lưu lịch sử thay đổi và thông báo thêm thành công. |
| Luồng sự kiện thay thế (Alternative Flow) | **Không có** |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Dữ liệu lưu không hợp lệ**  1. Tại bước 5, Hệ thống validate phát hiện lỗi: \* Tên loại phụ cấp dài quá 200 từ, có ký tự đặc biệt không hợp lệ. \* Thông tin bắt buộc đầy đủ  2. Hệ thống báo lỗi  3. Dữ liệu không được lưu  **E2: Hủy thao tác**  1. Tại bước 2, Phòng TCCB chọn “Hủy”. 2. Quay lại màn hình danh sách. |

### 4.18. Use Case: Sửa danh mục loại phụ cấp

|  |  |
| --- | --- |
| **Tên use case** | **Sửa danh mục loại phụ cấp** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Phòng TCCB sửa loại phụ cấp phục vụ cho việc quản lý và nhập liệu thông tin nhân sự nếu có nhập liệu danh mục sai sót |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Tại màn hình danh sách danh mục loại phụ cấp, Phòng TCCB chọn chức năng “Sửa”. |
| Điều kiện tiên quyết (Precondition) | Người dùng đăng nhập với vai trò Phòng TCCB. Danh mục loại phụ cấp cần chỉnh sửa đã tồn tại trong hệ thống. Danh mục loại phụ cấp đang ở trạng thái “Đang sử dụng”. |
| Điều kiện thành công (Post-condition) | Danh mục loại phụ cấp được sửa thành công |
| Điều kiện thất bại | Loại phụ cấp không được cập nhật trong CSDL |
| Luồng sự kiện chính (Basic Flow) | 1.  Phòng TCCB truy cập chức năng sửa loại phụ cấp đã tồn tại.  2.  Hệ thống hiển thị màn hình sửa danh mục loại phụ cấp.  3.  Phòng TCCB sửa các các thông tin  \* Tên loại phụ cấp  \* Mô tả  \* Cách tính 4.  Phòng TCCB bấm lưu  5. Hệ thống kiểm tra dữ liệu hợp lệ  6. Hệ thống lưu thông tin thành công  7. Hệ thống lưu lịch sử thay đổi và thông báo cập nhật thành công. |
| Luồng sự kiện thay thế (Alternative Flow) | Không có |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Dữ liệu lưu không hợp lệ**  1. Tại bước 5, Hệ thống validate phát hiện lỗi:  2. Tên loại phụ cấp dài quá 200 từ, có ký tự đặc biệt không hợp lệ.  3. Thông tin bắt buộc đầy đủ  4. Hệ thống báo lỗi  5. Dữ liệu không được lưu  **E2: Danh mục đang ở trạng thái “Ngừng sử dụng”**  1. Tại bước 1, hệ thống phát hiện danh mục loại phụ cấp đang ở trạng thái “Ngừng sử dụng”.  2. Hệ thống vô hiệu hóa nút “Sửa” hoặc hiển thị thông báo: “Không thể chỉnh sửa danh mục đã ngừng sử dụng.”  **E3: Hủy thao tác**  1. Tại bước 2, Phòng TCCB chọn “Hủy”. 2. Quay lại màn hình danh sách. |

### 4.19. Use Case: Thay đổi trạng thái danh mục loại phụ cấp

|  |  |
| --- | --- |
| **Tên use case** | **Thay đổi trạng thái danh mục loại phụ cấp** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Cho phép Phòng TCCB thay đổi trạng thái của danh mục loại phụ cấp giữa “Đang sử dụng” và “Ngừng sử dụng”, nhằm kiểm soát việc áp dụng loại phụ cấp cho hồ sơ nhân sự mới, đồng thời bảo toàn dữ liệu và liên kết với các hồ sơ đã tồn tại. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Tại màn hình danh sách danh mục loại phụ cấp, Phòng TCCB chọn chức năng “Thay đổi trạng thái”. |
| Điều kiện tiên quyết (Precondition) | Người dùng đăng nhập với vai trò Phòng TCCB. Danh mục loại phụ cấp cần thay đổi trạng thái đã tồn tại trong hệ thống. |
| Điều kiện thành công (Post-condition) | Danh mục loại phụ cấp được cập nhật sang trạng thái mới (“Đang sử dụng” ↔ “Ngừng sử dụng”). Nếu chuyển sang “Ngừng sử dụng”: loại phụ cấp không còn được chọn khi tạo hoặc chỉnh sửa hồ sơ nhân sự mới; các loại phụ cấp được hồ sơ nhân sự đã sử dụng sẽ được hiển thị khác với các loại phụ cấp ở trạng thái “Đang sử dụng”. Nếu chuyển sang “Đang sử dụng”: loại phụ cấp được phép chọn lại khi tạo hoặc chỉnh sửa hồ sơ nhân sự. |
| Điều kiện thất bại | Không thể cập nhật trạng thái mới trong CSDL |
| Luồng sự kiện chính (Basic Flow) | 1. Phòng TCCB chọn một danh mục loại phụ cấp đang ở trạng thái “Đang sử dụng” trong danh sách.  2. Phòng TCCB chọn chức năng “Thay đổi trạng thái”.  3. Hệ thống hiển thị hộp thoại xác nhận chuyển trạng thái sang “Ngừng sử dụng”. 4. Phòng TCCB xác nhận thao tác.  5. Hệ thống cập nhật trạng thái danh mục loại phụ cấp thành “Ngừng sử dụng”.  6. Hệ thống lưu lịch sử thay đổi và thông báo cập nhật thành công. |
| Luồng sự kiện thay thế (Alternative Flow) | **A1: Kích hoạt lại danh mục đang ở trạng thái “Ngừng sử dụng”** 1. Tại bước 1, Phòng TCCB chọn một danh mục loại phụ cấp đang ở trạng thái “Ngừng sử dụng”.  2. Phòng TCCB chọn chức năng “Thay đổi trạng thái”.  3. Hệ thống hiển thị hộp thoại xác nhận chuyển trạng thái sang “Đang sử dụng”.  4. Phòng TCCB xác nhận thao tác.  5. Hệ thống cập nhật trạng thái danh mục loại phụ cấp thành “Đang sử dụng”.  6. Hệ thống lưu lịch sử thay đổi và thông báo cập nhật thành công. |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Hủy thao tác**  1. Tại bước 3, Phòng TCCB chọn “Hủy”. 2. Hệ thống đóng hộp thoại xác nhận và quay lại màn hình danh sách. |

### 4.20. Use Case: Thêm mới danh mục loại hợp đồng

|  |  |
| --- | --- |
| **Tên use case** | **Thêm mới danh mục loại hợp đồng** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Phòng TCCB cấu hình loại hợp đồng theo quy định nhà nước phục vụ cho việc quản lý và nhập liệu hợp đồng nhân sự. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Tại màn hình danh sách danh mục loại hợp đồng, Phòng TCCB chọn chức năng “Thêm”. |
| Điều kiện tiên quyết (Precondition) | Người dùng đăng nhập với vai trò Phòng TCCB. |
| Điều kiện thành công (Post-condition) | Thiết lập loại hợp đồng thành công |
| Điều kiện thất bại | Loại hợp đồng không được cập nhật mới trong CSDL |
| Luồng sự kiện chính (Basic Flow) | 1.  Phòng TCCB truy cập chức năng thêm loại hợp đồng.  2.  Hệ thống hiển thị các trường thông tin (Tên loại hợp đồng, Số tháng tối thiểu, Số tháng tối đa, Số lần gia hạn tối đa, thời gian theo ngày chờ gia hạn).  3. Phòng TCCB nhập đầy đủ thông tin 4.  Phòng TCCB xác nhận lưu thông tin  5. Hệ thống kiểm tra dữ liệu hợp lệ  6. Hệ thống lưu thông tin thành công  7. Hệ thống lưu lịch sử thay đổi và thông báo thêm thành công. |
| Luồng sự kiện thay thế (Alternative Flow) | Không có |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Dữ liệu lưu không hợp lệ**  1. Tại bước 5, Hệ thống validate phát hiện lỗi:  \* Số tháng, số lần gia hạn, thời gian chờ gia hạn phải là số nguyên  \* Thông tin bắt buộc đầy đủ  \* Hệ thống báo lỗi  \* Dữ liệu không được lưu  **E2: Phòng TCCB hủy thao tác**  1. Tại bước 2, Phòng TCCB nhấn “Hủy” 2. Hệ thống quay lại màn hình danh sách loại hợp đồng |

### 4.21. Use Case: Sửa danh mục loại hợp đồng

|  |  |
| --- | --- |
| **Tên use case** | **Sửa danh mục loại hợp đồng** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Phòng TCCB sửa cấu hình loại hợp đồng theo quy định nhà nước phục vụ cho việc quản lý và nhập liệu hợp đồng nhân sự nếu như nhập liệu sai sót. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Tại màn hình danh sách danh mục loại hợp đồng, Phòng TCCB chọn chức năng “Sửa”. |
| Điều kiện tiên quyết (Precondition) | Người dùng đăng nhập với vai trò Phòng TCCB. Danh mục loại hợp đồng cần chỉnh sửa đã tồn tại trong hệ thống. Danh mục loại hợp đồng đang ở trạng thái “Đang sử dụng”. |
| Điều kiện thành công (Post-condition) | Sửa loại hợp đồng  thành công |
| Điều kiện thất bại | Loại hợp đồng  không được cập nhật trong CSDL |
| Luồng sự kiện chính (Basic Flow) | 1.  Phòng TCCB truy cập chức năng sửa loại hợp đồng của một loại hợp đồng đã được cấu hình.  2.  Hệ thống hiển thị màn hình sửa loại hợp đồng và các trường thông tin  (Tên loại hợp đồng, Số tháng tối thiểu, Số tháng tối đa, Số lần gia hạn tối đa, thời gian theo ngày chờ gia hạn).  3.  Phòng TCCB sửa các các thông tin 4.  Phòng TCCB bấm lưu  5. Hệ thống kiểm tra dữ liệu hợp lệ  6. Hệ thống lưu thông tin thành công  7. Hệ thống lưu lịch sử thay đổi và thông báo cập nhật thành công. |
| Luồng sự kiện thay thế (Alternative Flow) | Không có |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Dữ liệu lưu không hợp lệ**  1. Tại bước 5, Hệ thống validate phát hiện lỗi: \* Số tháng, số lần gia hạn, thời gian chờ gia hạn phải là số nguyên  \* Thông tin bắt buộc đầy đủ + Hệ thống báo lỗi + Dữ liệu không được lưu  **E2: Danh mục đang ở trạng thái “Ngừng sử dụng”**  1. Tại bước 1, hệ thống phát hiện danh mục loại hợp đồng đang ở trạng thái “Ngừng sử dụng”.  2. Hệ thống vô hiệu hóa nút “Sửa” hoặc hiển thị thông báo: “Không thể chỉnh sửa danh mục đã ngừng sử dụng.”  **E3: Phòng TCCB hủy thao tác**  1. Tại bước 2, Phòng TCCB nhấn “Hủy” 2. Hệ thống quay lại màn hình danh sách loại hợp đồng |

### 4.22. Use Case: Thay đổi trạng thái danh mục loại hợp đồng

|  |  |
| --- | --- |
| **Tên use case** | **Thay đổi trạng thái danh mục loại hợp đồng** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Cho phép Phòng TCCB thay đổi trạng thái của danh mục loại hợp đồng giữa “Đang sử dụng” và “Ngừng sử dụng”, nhằm kiểm soát việc áp dụng loại hợp đồng cho hồ sơ nhân sự mới, đồng thời bảo toàn dữ liệu và liên kết với các hồ sơ đã tồn tại. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Tại màn hình danh sách danh mục loại hợp đồng, Phòng TCCB chọn chức năng “Thay đổi trạng thái”. |
| Điều kiện tiên quyết (Precondition) | Người dùng đăng nhập với vai trò Phòng TCCB. Danh mục loại hợp đồng cần thay đổi trạng thái đã tồn tại trong hệ thống. |
| Điều kiện thành công (Post-condition) | Danh mục loại hợp đồng được cập nhật sang trạng thái mới (“Đang sử dụng” ↔ “Ngừng sử dụng”). Nếu chuyển sang “Ngừng sử dụng”: loại hợp đồng không còn được chọn khi tạo hoặc chỉnh sửa hợp đồng lao động mới; các loại hợp đồng đã được sử dụng trong hợp đồng lao động sẽ được hiển thị khác với các loại hợp đồng ở trạng thái “Đang sử dụng”. Nếu chuyển sang “Đang sử dụng”: loại hợp đồng được phép chọn lại khi tạo hoặc chỉnh sửa hợp đồng lao động. |
| Điều kiện thất bại | Không thể cập nhật trạng thái mới trong CSDL |
| Luồng sự kiện chính (Basic Flow) | 1. Phòng TCCB chọn một danh mục loại hợp đồng đang ở trạng thái “Đang sử dụng” trong danh sách.  2. Phòng TCCB chọn chức năng “Thay đổi trạng thái”.  3. Hệ thống hiển thị hộp thoại xác nhận chuyển trạng thái sang “Ngừng sử dụng”. 4. Phòng TCCB xác nhận thao tác.  5. Hệ thống cập nhật trạng thái danh mục loại hợp đồng thành “Ngừng sử dụng”.  6. Hệ thống lưu lịch sử thay đổi và thông báo cập nhật thành công. |
| Luồng sự kiện thay thế (Alternative Flow) | **A1: Kích hoạt lại danh mục đang ở trạng thái “Ngừng sử dụng”**  1. Tại bước 1, Phòng TCCB chọn một danh mục loại hợp đồng đang ở trạng thái “Ngừng sử dụng”.  2. Phòng TCCB chọn chức năng “Thay đổi trạng thái”.  3. Hệ thống hiển thị hộp thoại xác nhận chuyển trạng thái sang “Đang sử dụng”.  4. Phòng TCCB xác nhận thao tác.  5. Hệ thống cập nhật trạng thái danh mục loại hợp đồng thành “Đang sử dụng”.  6. Hệ thống lưu lịch sử thay đổi và thông báo cập nhật thành công. |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Hủy thao tác**  1. Tại bước 3, Phòng TCCB chọn “Hủy”. 2. Hệ thống đóng hộp thoại xác nhận và quay lại màn hình danh sách. |

### 4.23. Use Case: Xem chi tiết các thống kê

|  |  |
| --- | --- |
| **Tên use case** | **Xem chi tiết các thống kê** |
| Tác nhân chính | Phòng TCCB, Phòng TCKT |
| Mục đích (mô tả) | Cung cấp cho Phòng TCCB, Phòng TCKT có các báo cáo tổng hợp, thống kê trực quan về tình hình nhân sự, cơ cấu tổ chức, đào tạo và biến động nhân sự theo thời gian; hỗ trợ theo dõi, phân tích và ra quyết định quản lý. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Người dùng chọn menu “Báo cáo và Thống kê” trên hệ thống. |
| Điều kiện tiên quyết (Precondition) | Phòng TCCB hoặc Phòng TCKT đã đăng nhập hệ thống. Dữ liệu nhân sự, đơn vị, đào tạo đã tồn tại trong hệ thống. |
| Điều kiện thành công (Post-condition) | Các báo cáo thống kê được hiển thị đầy đủ, chính xác. Người dùng có thể xem chi tiết, lọc dữ liệu và xuất báo cáo theo nhu cầu. |
| Điều kiện thất bại | Không hiển thị được báo cáo do lỗi dữ liệu hoặc hệ thống. |
| Luồng sự kiện chính (Basic Flow) | 1. Người dùng truy cập menu **“Báo cáo và Thống kê”**.  2. Hệ thống hiển thị **Danh sách nhóm báo cáo**.  3. Người dùng chọn từng nhóm báo cáo để xem chi tiết.  \* Báo cáo tổng quan nhân sự  \* Báo cáo biến động nhân sự  \* Báo cáo cơ cấu nhân sự theo đơn vị  \* Báo cáo cơ cấu nhân sự theo trình độ, học hàm, chức danh  \* Báo cáo bổ nhiệm nhân sự  \* Báo cáo đào tạo và phát triển  \* Báo cáo hợp đồng và tình trạng làm việc \* Báo cáo đánh giá của cán bộ với khóa đào tạo  4. Hệ thống hiển thị dữ liệu thống kê tương ứng dưới dạng biểu đồ và bảng đa dạng theo thời gian, đơn vị, loại nhân sự. |
| Luồng sự kiện thay thế (Alternative Flow) | **A1: Xuất báo cáo**  1. Tại bước 4, Người dùng chọn chức năng “Xuất báo cáo” (Định dạng xuất: PDF / Excel, Phạm vi dữ liệu (theo bộ lọc hiện tại))  2. Người dùng xác nhận xuất  3. Hệ thống tạo file báo cáo và cho phép tải về |
| Luồng sự kiện ngoại lệ (Exception Flow) | Không có |

### 4.24. Use Case: Xem nhật ký hệ thống (Audit Log)

|  |  |
| --- | --- |
| **Tên use case** | **Xem nhật ký hệ thống (Audit Log)** |
| Tác nhân chính | Quản trị viên |
| Mục đích (mô tả) | Cho phép Quản trị viên xem, tìm kiếm và lọc nhật ký ghi lại toàn bộ các thao tác quan trọng trên hệ thống (đăng nhập, thêm/sửa/xóa dữ liệu, phân quyền, thay đổi trạng thái…) nhằm phục vụ công tác giám sát, kiểm tra an ninh và truy vết sự cố. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Quản trị viên chọn menu “Nhật ký hệ thống” (Audit Log). |
| Điều kiện tiên quyết (Precondition) | Người dùng đã đăng nhập với vai trò Quản trị viên hệ thống. Hệ thống đã ghi nhận các bản ghi nhật ký từ hoạt động của người dùng. |
| Điều kiện thành công (Post-condition) | Danh sách nhật ký hệ thống được hiển thị đầy đủ, chính xác theo tiêu chí lọc. Không có thay đổi dữ liệu trong hệ thống (chỉ đọc). |
| Điều kiện thất bại | Không hiển thị được nhật ký do lỗi hệ thống. |
| Luồng sự kiện chính (Basic Flow) | 1. Quản trị viên chọn menu “Nhật ký hệ thống”.  2. Hệ thống hiển thị danh sách nhật ký (phân trang), mỗi bản ghi bao gồm:  \* Thời gian thao tác,  \* Tài khoản thực hiện (Username),  \* Họ tên người thực hiện,  \* Vai trò,  \* Loại hành động (Đăng nhập / Đăng xuất / Thêm / Sửa / Xóa / Phân quyền / Thay đổi trạng thái),  \* Đối tượng bị tác động (Tên module, Mã đối tượng),  \* Mô tả chi tiết thay đổi,  \* Địa chỉ IP.  3. Quản trị viên có thể lọc nhật ký theo các tiêu chí:  \* Khoảng thời gian: Từ ngày – Đến ngày \* Tài khoản thực hiện: Nhập Username hoặc Họ tên  \* Loại hành động: Tất cả (Mặc định), Đăng nhập, Đăng xuất, Thêm, Sửa, Xóa, Phân quyền, Thay đổi trạng thái  \* Module: Tất cả (Mặc định), Quản lý tài khoản, Hồ sơ nhân sự, Cơ cấu tổ chức, Hợp đồng, Đào tạo, Danh mục cấu hình  4. Quản trị viên nhấn “Tìm kiếm” hoặc “Áp dụng bộ lọc”.  5. Hệ thống hiển thị kết quả nhật ký phù hợp với tiêu chí đã chọn.  6. Quản trị viên có thể nhấn vào một bản ghi để xem chi tiết thay đổi (giá trị trước và sau khi thay đổi). |
| Luồng sự kiện thay thế (Alternative Flow) | **A1: Xuất nhật ký**  1. Tại bước 5, Quản trị viên chọn chức năng “Xuất nhật ký”.  2. Hệ thống cho phép xuất danh sách nhật ký theo bộ lọc hiện tại dưới định dạng Excel hoặc PDF.  3. Quản trị viên xác nhận xuất.  4. Hệ thống tạo file và cho phép tải về. |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Không tìm thấy kết quả**  1. Tại bước 5, nếu không có bản ghi nhật ký nào phù hợp với tiêu chí lọc, Hệ thống hiển thị thông báo: “Không tìm thấy nhật ký phù hợp với tiêu chí tìm kiếm.” |

## 4.3. Ngô Quang Tùng (UC 4.25–4.37)

### 4.25. Use Case: Thêm mới Hợp đồng lao động (FEAT 7.1)

|  |  |
| --- | --- |
| **Tên use case** | **Thêm mới Hợp đồng lao động** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Cho phép Phòng TCCB tạo mới hợp đồng lao động cho nhân sự với quản lý trạng thái và ràng buộc nghiệp vụ. |
| Mức độ ưu tiên  (Priority) | Bắt buộc |
| Điều kiện kích hoạt  (Trigger) | Phòng TCCB chọn chức năng "Thêm mới hợp đồng". |
| Điều kiện tiên quyết  (Precondition) | Cán bộ TCCB đã đăng nhập hệ thống.  Hồ sơ nhân sự đã được tạo |
| Điều kiện thành công  (Post-condition) | Hợp đồng lao động mới được tạo và gắn với hồ sơ nhân sự.  Trạng thái hợp đồng của nhân sự được cập nhật theo hợp đồng mới nhất. |
| Điều kiện thất bại | Hợp đồng không được tạo do vi phạm ràng buộc nghiệp vụ hoặc lỗi hệ thống. |
| Luồng sự kiện chính  (Basic Flow) | 1.  Phòng TCCB chọn mục "Thêm mới hợp đồng".  2. Hệ thống yêu cầu nhập mã nhân sự  3. Phòng TCCB nhập Mã nhân sự.  4.  Hệ thống kiểm tra: Mã nhân sự có tồn tại không và nếu tồn tại chỉ cho phép tạo hợp đồng mới nếu nhân viên có trạng thái hợp đồng "Chưa hợp đồng" hoặc "Chờ gia hạn" hoặc "Còn hiệu lực" với thời gian còn lại nằm trong thời gian chờ gia hạn được cấu hình của loại hợp đồng tương ứng (tham chiếu thuộc tính `thoiGianChoGiaHan` tại UC 4.20).  5.  Phòng TCCB chọn `Loại hợp đồng`.  6.  Hệ thống kiểm tra số lần ký tối đa cho loại hợp đồng.  7.  Phòng TCCB nhập thông tin hợp đồng:Số HĐ   * Ngày ký * Ngày hiệu lực * Ngày hết hạn * Đơn vị công tác theo hợp đồng * Nội dung hợp đồng (rich text editor - nhập điều khoản, mô tả công việc, quyền lợi...) * Upload PDF bản hợp đồng giấy (tải lên bản scan/file gốc đã ký)   8.  Hệ thống validate thời hạn Thời gian tối thiểu/ Thời gian tối đa của loại hợp đồng.  9.  Phòng TCCB nhấn "Lưu".  10. Hệ thống xác định trạng thái hợp đồng: nếu Ngày hiệu lực > Ngày hiện tại → trạng thái hợp đồng = "Chưa có hiệu lực"; nếu Ngày hiệu lực ≤ Ngày hiện tại → trạng thái hợp đồng = "Còn hiệu lực". Đồng thời cập nhật trạng thái hợp đồng của nhân sự theo trạng thái hợp đồng mới nhất.  11. Hệ thống lưu hợp đồng vào hồ sơ cá nhân và thông báo thành công. *Lưu ý: Xem UC 4.26 (Xem hợp đồng), UC 4.27 (Sửa hợp đồng lao động) và UC 4.28 (Chấm dứt hợp đồng lao động trước hạn) cho các tác vụ liên quan.* |
| Luồng sự kiện thay thế  (Alternative Flow) | Không có |
| Luồng sự kiện ngoại lệ  (Exception Flow) | **E1: Không đủ điều kiện tạo hợp đồng mới do hợp đồng hiện tại còn hiệu lực**   1. Tại bước 4, hệ thống phát hiện nhân sự không tồn tại hoặc nhân sự đang có hợp đồng ở trạng thái "Còn hiệu lực" và thời gian còn lại > thời gian chờ gia hạn được cấu hình của loại hợp đồng tương ứng (tham chiếu thuộc tính `thoiGianChoGiaHan` tại UC 4.20). 2. Hệ thống từ chối tạo hợp đồng mới. 3. Hệ thống hiển thị thông báo: *"Không thể tạo hợp đồng mới"*. Use case kết thúc.   **E2: Vượt quá số lần ký hợp đồng cho phép**   1. Tại bước 6, hệ thống kiểm tra số lần ký hợp đồng theo loại hợp đồng đã chọn của nhân sự. 2. Hệ thống không cho phép tiếp tục tạo hợp đồng. 3. Hiển thị thông báo: *"Vui lòng chọn loại hợp đồng khác."* Phòng TCCB quay lại bước 5.   **E3: Thời gian hợp đồng không hợp lệ hoặc trùng lặp**   1. Tại bước 8, hệ thống phát hiện: Thời hạn hợp đồng không nằm trong khoảng Min/Max theo quy định hoặc ngày hiệu lực của hợp đồng mới ≤ ngày hết hạn của hợp đồng cũ chưa chấm dứt. Các trường dữ liệu chưa đầy đủ 2. Hệ thống hiển thị thông báo: "Thời gian hợp đồng không hợp lệ hoặc bị trùng với hợp đồng trước" 3. Phòng TCCB quay lại bước 5   **E4: Hủy thao tác**   1. Tại bước 3, Phòng TCCB chọn "Hủy". 2. Quay lại màn hình danh sách nhân sự. |

### 4.26. Use Case: Xem danh sách và chi tiết hợp đồng lao động (FEAT 7.2)

|  |  |
| --- | --- |
| **Tên use case** | **Xem danh sách và chi tiết hợp đồng lao động** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Cho phép Phòng TCCB xem danh sách toàn bộ hợp đồng lao động đã gắn với một hồ sơ nhân sự và xem chi tiết từng hợp đồng nhằm phục vụ tra cứu, đối chiếu và quản lý thông tin hợp đồng của nhân sự. |
| Mức độ ưu tiên  (Priority) | Bắt buộc |
| Điều kiện kích hoạt  (Trigger) | Phòng TCCB chọn tab "Hợp đồng" trong màn hình chi tiết hồ sơ nhân sự. |
| Điều kiện tiên quyết  (Precondition) | Cán bộ Phòng TCCB đã đăng nhập hệ thống.  Hồ sơ nhân sự đã tồn tại trong hệ thống. |
| Điều kiện thành công  (Post-condition) | Danh sách hợp đồng và thông tin chi tiết của hợp đồng được hiển thị đầy đủ, chính xác theo dữ liệu đã lưu.  Không làm thay đổi dữ liệu trong hệ thống (chỉ đọc). |
| Điều kiện thất bại | Không hiển thị được thông tin hợp đồng do lỗi hệ thống hoặc hồ sơ nhân sự không tồn tại. |
| Luồng sự kiện chính  (Basic Flow) | 1. Phòng TCCB truy cập màn hình **chi tiết hồ sơ nhân sự** của một nhân sự (tham chiếu UC 4.35).  2. Hệ thống hiển thị màn hình chi tiết hồ sơ ở chế độ chỉ đọc.  3. Phòng TCCB chọn tab **"Hợp đồng"**.  4. Hệ thống hiển thị danh sách tất cả hợp đồng lao động của nhân sự, bao gồm các thông tin: Số hợp đồng, Loại hợp đồng, Ngày ký, Ngày hiệu lực, Ngày hết hạn, Trạng thái hợp đồng.  5. Phòng TCCB chọn một hợp đồng trong danh sách.  6. Hệ thống hiển thị chi tiết hợp đồng đã chọn, bao gồm: Loại hợp đồng, Số hợp đồng, Ngày ký, Ngày hiệu lực, Ngày hết hạn, Đơn vị công tác theo hợp đồng, Nội dung hợp đồng, Thông tin lương/quyền lợi theo hợp đồng (nếu có), File PDF đính kèm và Trạng thái hợp đồng. |
| Luồng sự kiện thay thế  (Alternative Flow) | **A1: Nhân sự chưa có hợp đồng lao động**   1. Tại bước 3, nếu hồ sơ nhân sự chưa có hợp đồng nào được lưu. 2. Hệ thống hiển thị tab **"Hợp đồng"** ở trạng thái trống và thông báo: *"Nhân sự chưa có hợp đồng lao động."* Use case kết thúc. |
| Luồng sự kiện ngoại lệ  (Exception Flow) | Không có |

### 4.27. Use Case: Chỉnh sửa hợp đồng lao động chưa có hiệu lực (FEAT 7.3)

|  |  |
| --- | --- |
| **Tên use case** | **Chỉnh sửa hợp đồng lao động chưa có hiệu lực** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Cho phép Phòng TCCB chỉnh sửa thông tin hợp đồng lao động của nhân sự khi hợp đồng chưa có hiệu lực, nhằm sửa sai sót nhập liệu hoặc cập nhật nội dung trước thời điểm hợp đồng bắt đầu áp dụng, đồng thời bảo đảm toàn vẹn dữ liệu hợp đồng. |
| Mức độ ưu tiên  (Priority) | Bắt buộc |
| Điều kiện kích hoạt  (Trigger) | Phòng TCCB chọn chức năng "Sửa hợp đồng" tại màn hình chi tiết hợp đồng của nhân sự. |
| Điều kiện tiên quyết  (Precondition) | Cán bộ Phòng TCCB đã đăng nhập hệ thống.  Hợp đồng lao động của nhân sự đã tồn tại trong hệ thống. |
| Điều kiện thành công  (Post-condition) | Thông tin hợp đồng được cập nhật thành công.  Lịch sử thay đổi hợp đồng được ghi nhận. |
| Điều kiện thất bại | Hợp đồng không được cập nhật do vi phạm ràng buộc nghiệp vụ, dữ liệu không hợp lệ hoặc hợp đồng không thuộc trạng thái cho phép chỉnh sửa. |
| Luồng sự kiện chính  (Basic Flow) | 1. Phòng TCCB truy cập chi tiết một hợp đồng lao động của nhân sự từ UC 4.26.  2. Hệ thống hiển thị chi tiết hợp đồng.  3. Nếu hợp đồng đang ở trạng thái **"Chưa có hiệu lực"**, hệ thống hiển thị nút **"Sửa hợp đồng"**.  4. Phòng TCCB chọn **"Sửa hợp đồng"**.  5. Hệ thống hiển thị màn hình chỉnh sửa và cho phép cập nhật các thông tin của hợp đồng, bao gồm: Loại hợp đồng, Số hợp đồng, Ngày ký, Ngày hiệu lực, Ngày hết hạn, Đơn vị công tác theo hợp đồng, Nội dung hợp đồng, File PDF đính kèm.  6. Phòng TCCB chỉnh sửa thông tin và nhấn **"Lưu"**.  7. Hệ thống kiểm tra dữ liệu hợp lệ và kiểm tra ràng buộc nghiệp vụ: hợp đồng vẫn phải ở trạng thái **"Chưa có hiệu lực"**, thời gian hợp đồng hợp lệ, không trùng lặp với các hợp đồng khác của cùng nhân sự.  8. Hệ thống cập nhật thông tin hợp đồng, lưu lịch sử thay đổi và thông báo thành công. |
| Luồng sự kiện thay thế  (Alternative Flow) | **A1: Hợp đồng đã có hiệu lực hoặc đã hết hiệu lực**   1. Tại bước 3, nếu hợp đồng không ở trạng thái **"Chưa có hiệu lực"**. 2. Hệ thống ẩn hoặc vô hiệu hóa nút **"Sửa hợp đồng"** và hiển thị thông báo: *"Chỉ được chỉnh sửa hợp đồng chưa có hiệu lực."* Use case kết thúc. |
| Luồng sự kiện ngoại lệ  (Exception Flow) | **E1: Dữ liệu chỉnh sửa không hợp lệ**   1. Tại bước 7, hệ thống phát hiện thiếu thông tin bắt buộc, thời gian hợp đồng không hợp lệ hoặc dữ liệu bị trùng lặp. 2. Hệ thống hiển thị cảnh báo và yêu cầu Phòng TCCB chỉnh sửa lại thông tin. Quay lại bước 5. |

### 4.28. Use Case: Chấm dứt hợp đồng lao động trước hạn (FEAT 7.4)

|  |  |
| --- | --- |
| **Tên use case** | **Chấm dứt hợp đồng lao động trước hạn** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Cho phép Phòng TCCB chấm dứt trước hạn một hợp đồng lao động đang còn hiệu lực của nhân sự, cập nhật lại trạng thái hợp đồng và hỗ trợ xem xét nghiệp vụ thôi việc khi nhân sự không còn hợp đồng còn hiệu lực nào. |
| Mức độ ưu tiên  (Priority) | Bắt buộc |
| Điều kiện kích hoạt  (Trigger) | Phòng TCCB chọn chức năng "Chấm dứt trước hạn" tại màn hình chi tiết hợp đồng. |
| Điều kiện tiên quyết  (Precondition) | Cán bộ Phòng TCCB đã đăng nhập hệ thống.  Hợp đồng lao động cần chấm dứt đã tồn tại trong hệ thống. |
| Điều kiện thành công  (Post-condition) | Hợp đồng được cập nhật trạng thái **"Hết hiệu lực"** kèm thông tin ngày chấm dứt và lý do chấm dứt trước hạn.  Trạng thái hợp đồng hiện tại của nhân sự được cập nhật tương ứng. |
| Điều kiện thất bại | Không thể chấm dứt hợp đồng trước hạn do hợp đồng không ở trạng thái cho phép, dữ liệu không hợp lệ hoặc người dùng không xác nhận thao tác. |
| Luồng sự kiện chính  (Basic Flow) | 1. Phòng TCCB truy cập chi tiết một hợp đồng lao động từ UC 4.26.  2. Hệ thống hiển thị chi tiết hợp đồng.  3. Phòng TCCB chọn một hợp đồng đang ở trạng thái **"Còn hiệu lực"** và nhấn **"Chấm dứt trước hạn"**.  4. Hệ thống hiển thị biểu mẫu yêu cầu nhập **Ngày chấm dứt trước hạn** và **Lý do chấm dứt**.  5. Phòng TCCB nhập thông tin và nhấn xác nhận.  6. Hệ thống hiển thị hộp thoại xác nhận thao tác chấm dứt trước hạn.  7. Phòng TCCB xác nhận thao tác.  8. Hệ thống cập nhật hợp đồng sang trạng thái **"Hết hiệu lực"**, lưu ngày chấm dứt và lý do chấm dứt trước hạn.  9. Hệ thống cập nhật trạng thái hợp đồng hiện tại của nhân sự theo dữ liệu mới.  10. Nếu đây là hợp đồng còn hiệu lực duy nhất của nhân sự, hệ thống hiển thị thông báo để Phòng TCCB xem xét tiếp tục thực hiện UC 4.33 **"Đánh dấu thôi việc nhân sự"** nếu phù hợp nghiệp vụ. |
| Luồng sự kiện thay thế  (Alternative Flow) | **A1: Hủy thao tác chấm dứt trước hạn**   1. Tại bước 6, Phòng TCCB chọn **"Hủy"**. 2. Hệ thống đóng hộp thoại xác nhận và không cập nhật dữ liệu hợp đồng. Use case kết thúc.   **A2: Hợp đồng không ở trạng thái còn hiệu lực**   1. Tại bước 3, nếu hợp đồng không ở trạng thái **"Còn hiệu lực"**. 2. Hệ thống không cho phép thực hiện chức năng **"Chấm dứt trước hạn"** và hiển thị thông báo phù hợp. Use case kết thúc. |
| Luồng sự kiện ngoại lệ  (Exception Flow) | Không có |

### 4.29. Use Case: Tìm kiếm hồ sơ nhân sự (FEAT 8.1)

|  |  |
| --- | --- |
| **Tên use case** | **Tìm kiếm hồ sơ nhân sự** |
| Tác nhân chính | Phòng TCCB, Phòng TCKT |
| Mục đích  (mô tả) | Cho phép cán bộ Phòng TCCB, Phòng TCKT tìm kiếm hồ sơ nhân sự nhanh chóng dựa trên từ khóa như tên, mã nhân sự, số CCCD, email hoặc số điện thoại nhằm phục vụ công tác quản lý và tra cứu thông tin. |
| Mức độ ưu tiên  (Priority) | Bắt buộc |
| Điều kiện kích hoạt  (Trigger) | Phòng TCCB hoặc Phòng TCKT nhập từ khóa tìm kiếm và thực hiện tìm kiếm trong menu "Quản lý hồ sơ nhân sự" |
| Điều kiện tiên quyết  (Precondition) | Cán bộ Phòng TCCB hoặc Phòng TCKT đã đăng nhập hệ thống. |
| Điều kiện thành công  (Post-condition) | Danh sách hồ sơ nhân sự phù hợp với từ khóa, hoặc toàn bộ danh sách khi không nhập từ khóa, được hiển thị đúng. |
| Điều kiện thất bại | Hệ thống không xử lý được yêu cầu tìm kiếm. |
| Luồng sự kiện chính  (Basic Flow) | 1.  Phòng TCCB hoặc Phòng TCKT chọn menu "Quản lý Hồ sơ".  2.  Hệ thống hiển thị danh sách hồ sơ nhân viên (Mã, Họ tên, CCCD, Giới tính, Địa chỉ, SĐT liên hệ, Chức danh khoa học, Đơn vị công tác, Chức vụ đơn vị, Trạng thái công việc, Trạng thái hợp đồng) có phân trang.  3.  Phòng TCCB hoặc Phòng TCKT **nhập từ khóa** vào ô tìm kiếm (Tên, Mã, CCCD, Email, SĐT).  4.  Hệ thống hiển thị kết quả tìm kiếm theo từ khóa (real-time); nếu từ khóa rỗng, hệ thống hiển thị toàn bộ danh sách hồ sơ nhân sự; nếu không có hồ sơ phù hợp, hệ thống hiển thị thông báo: *"Không tìm thấy hồ sơ phù hợp."* |
| Luồng sự kiện thay thế  (Alternative Flow) | Không có |
| Luồng sự kiện ngoại lệ  (Exception Flow) | Không có |
| Kịch bản bao phủ  (Scenario Coverage) | SC1: Người dùng nhập từ khóa hợp lệ và hệ thống hiển thị kết quả phù hợp.  SC2: Người dùng để trống từ khóa và hệ thống hiển thị toàn bộ danh sách.  SC3: Người dùng nhập từ khóa không khớp hồ sơ nào và hệ thống hiển thị thông báo không tìm thấy. |

### 4.30. Use Case: Lọc danh sách hồ sơ nhân sự (FEAT 8.2)

|  |  |
| --- | --- |
| **Tên use case** | **Lọc danh sách hồ sơ nhân sự** |
| Tác nhân chính | Phòng TCCB, Phòng TCKT |
| Mục đích (mô tả) | Cho phép Phòng TCCB, Phòng TCKT lọc danh sách hồ sơ nhân sự dựa trên nhiều tiêu chí nhằm thu hẹp phạm vi dữ liệu phục vụ công tác quản lý. |
| Mức độ ưu tiên  (Priority) | Bắt buộc |
| Điều kiện kích hoạt  (Trigger) | Phòng TCCB hoặc Phòng TCKT chọn tiêu chí lọc trong menu "Quản lý hồ sơ nhân sự" |
| Điều kiện tiên quyết  (Precondition) | Phòng TCCB hoặc Phòng TCKT đã đăng nhập hệ thống. |
| Điều kiện thành công  (Post-condition) | Danh sách hồ sơ nhân sự hoặc trạng thái không có kết quả được hiển thị đúng theo các tiêu chí lọc đã chọn. |
| Điều kiện thất bại | Hệ thống không xử lý được yêu cầu lọc do lỗi hệ thống. |
| Luồng sự kiện chính  (Basic Flow) | 1.  Tại màn hình danh sách, Phòng TCCB hoặc Phòng TCKT nhấn "Bộ lọc nâng cao".  2.  Hệ thống hiển thị panel lọc với nhiều tiêu chí:   * **Đơn vị công tác:** Chọn Khoa, Phòng, Ban, Bộ môn * **Chức danh khoa học:** GS, PGS, Không có * **Chức vụ đơn vị:**Trưởng khoa, Phó khoa, Không chức vụ * **Trạng thái làm việc:** Đang chờ xét,Đang công tác, Đã thôi việc * **Trạng thái hợp đồng:** Chưa hợp đồng, Còn hiệu lực, Hết hiệu lực, Chờ gia hạn. * **Giới tính:** Nam, Nữ   3.  Phòng TCCB hoặc Phòng TCKT chọn các tiêu chí lọc.  4.  Nhấn "Áp dụng bộ lọc".  5.  Hệ thống hiển thị kết quả lọc đa tiêu chí; nếu không có hồ sơ nào thỏa mãn, hệ thống hiển thị thông báo: *"Không có hồ sơ phù hợp với tiêu chí lọc."* |
| Luồng sự kiện thay thế  (Alternative Flow) | Không có |
| Luồng sự kiện ngoại lệ  (Exception Flow) | Không có |
| Kịch bản bao phủ  (Scenario Coverage) | SC1: Người dùng chọn bộ tiêu chí lọc và hệ thống hiển thị kết quả phù hợp.  SC2: Người dùng chọn bộ tiêu chí lọc nhưng không có hồ sơ nào thỏa mãn và hệ thống hiển thị thông báo phù hợp. |

### 4.31. Use Case: Thêm mới Hồ sơ nhân sự (FEAT 8.3)

|  |  |
| --- | --- |
| **Tên use case** | **Thêm mới Hồ sơ nhân sự** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Cho phép Phòng TCCB tạo mới và lưu trữ đầy đủ thông tin hồ sơ nhân sự trên hệ thống. |
| Mức độ ưu tiên  (Priority) | Bắt buộc |
| Điều kiện kích hoạt  (Trigger) | Phòng TCCB chọn chức năng thêm trong menu "Quản lý hồ sơ nhân sự" |
| Điều kiện tiên quyết  (Precondition) | Phòng TCCB đã đăng nhập hệ thống. |
| Điều kiện thành công  (Post-condition) | Hồ sơ nhân sự được tạo mới với Mã cán bộ tự động sinh, Trạng thái hợp đồng = "Chưa hợp đồng", Trạng thái làm việc = "Đang chờ xét". |
| Điều kiện thất bại | Hệ thống không thể tạo mới hồ sơ do lỗi hệ thống hoặc dữ liệu không hợp lệ. |
| Luồng sự kiện chính  (Basic Flow) | 1.  Tại màn hình danh sách, Phòng TCCB nhấn "Thêm mới".  2.  Hệ thống hiển thị form nhập liệu chia thành các tabs/bước.  3.  Phòng TCCB nhập các trường thông tin:   * **Thông tin chung bắt buộc**: Họ tên, Ngày sinh, Giới tính, CCCD, Quê quán, Địa chỉ, Mã số thuế (Không bắt buộc), Số Bảo hiểm xã hội (Không bắt buộc), Số bảo hiểm y tế (Không bắt buộc), Email, SĐT liên hệ. * **[MỞ RỘNG - Nếu là người nước ngoài],** Cán bộ TCCB tick chọn "Người nước ngoài", hệ thống hiển thị thêm các trường bắt buộc: Số Visa, Ngày hết hạn Visa, Số Hộ chiếu, Ngày hết hạn Hộ chiếu, Số giấy phép lao động, Ngày hết hạn giấy phép lao động, Upload PDF giấy phép lao động. * **Thông tin gia đình  (bắt buộc)**: Cha/Mẹ, Vợ/chồng, con, người phụ thuộc, thông tin chi tiết về gia đình. * **Thông tin ngân hàng  (bắt buộc)**: Tên Ngân hàng, Số tài khoản. * **Quá trình công tác** trước khi về trường: Nơi công tác, thời gian công tác **(bắt buộc)**. * **Thông tin Đảng/Đoàn (bắt buộc):** Ngày vào Đoàn/Đảng, Thông tin chi tiết. * **Upload ảnh chân dung  (bắt buộc).** * **Trình độ học vấn (bắt buộc):** Trình độ văn hóa, Trình độ đào tạo, Chức danh nghề nghiệp, Chức danh khoa học. * **Thông tin các bằng cấp  (bắt buộc)**: Tên bằng, Trường, Ngành, Năm tốt nghiệp, Xếp loại, Bản pdf. * **Thông tin các chứng chỉ  (bắt buộc):** Tên chứng chỉ, Nơi cấp, Ngày cấp, Ngày hết hạn, Bản pdf. * **Lương & Phụ cấp (bắt buộc):** Hệ số lương (đã được cấu hình), Phụ cấp(đã được cấu hình).   4. Hệ thống kiểm tra tính đầy đủ, hợp lệ và tính logic của các thông tin bắt buộc  5. Phòng TCCB nhấn "Lưu".  6. Hệ thống tự động sinh Mã cán bộ theo mẫu mã đang được cấu hình áp dụng tại thời điểm tạo hồ sơ và gán Trạng thái hợp đồng mặc định là "Chưa hợp đồng", Trạng thái làm việc là "Đang chờ xét".  7. Hệ thống lưu hồ sơ, lịch sử tạo hồ sơ và thông báo thành công. |
| Luồng sự kiện thay thế  (Alternative Flow) | **A1: Tạo mới hồ sơ nhân sự từ file Excel**  1. Tại bước 1 của Luồng sự kiện chính, Phòng TCCB chọn chức năng **"Thêm mới từ Excel"**.  2. Hệ thống hiển thị màn hình tải lên file Excel và cung cấp **file mẫu** theo định dạng quy định.  3. Phòng TCCB tải lên file Excel chứa danh sách hồ sơ nhân sự.  4. Hệ thống kiểm tra: Định dạng file, Cấu trúc cột dữ liệu, Các trường thông tin bắt buộc, và tính hợp lệ logic của dữ liệu từng dòng.  5. Nếu dữ liệu hợp lệ, tiếp tục bước 5 của luồng chính. |
| Luồng sự kiện ngoại lệ  (Exception Flow) | **E1: Dữ liệu không hợp lệ hoặc thiếu thông tin bắt buộc**   1. Tại bước 4 của luồng chính hoặc bước 4 của A1, hệ thống phát hiện thiếu thông tin bắt buộc, định dạng dữ liệu sai hoặc các trường thời gian không hợp lệ. 2. Hệ thống hiển thị cảnh báo và không cho phép tiếp tục lưu hồ sơ; nếu đang ở luồng chính, hệ thống đánh dấu các tab còn thiếu hoặc sai dữ liệu; nếu đang ở A1, hệ thống thông báo các dòng hoặc cột dữ liệu Excel không hợp lệ. 3. Nếu đang ở luồng chính, quay lại bước 3. Nếu đang ở A1, quay lại bước 3 của A1.   **E2: Hủy thao tác**   1. Tại bước 3 của luồng chính hoặc bước 3 của A1, Phòng TCCB chọn "Hủy". 2. Quay lại màn hình danh sách nhân sự. |
| Kịch bản bao phủ  (Scenario Coverage) | SC1: Tạo mới hồ sơ bằng nhập tay thành công.  SC2: Tạo mới hồ sơ bằng nhập tay nhưng dữ liệu không hợp lệ.  SC3: Tạo mới hồ sơ từ Excel thành công.  SC4: Tạo mới hồ sơ từ Excel nhưng dữ liệu không hợp lệ.  SC5: Người dùng hủy thao tác tạo mới. |

### 4.32. Use Case: Chỉnh sửa trong chi tiết hồ sơ nhân sự (FEAT 8.4)

|  |  |
| --- | --- |
| **Tên use case** | **Chỉnh sửa trong chi tiết hồ sơ nhân sự** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Cho phép Phòng TCCB sửa và lưu lại các thông tin hồ sơ nhân sự được cập nhật trực tiếp trong màn hình chi tiết hồ sơ, đồng thời truy cập các tác vụ cập nhật liên quan về hợp đồng và đánh giá khen thưởng/kỷ luật khi cần. |
| Mức độ ưu tiên  (Priority) | Bắt buộc |
| Điều kiện kích hoạt  (Trigger) | Phòng TCCB chọn chức năng sửa trong một nhân sự trong menu "Quản lý hồ sơ nhân sự" |
| Điều kiện tiên quyết  (Precondition) | Phòng TCCB đã đăng nhập hệ thống.  Hồ sơ nhân sự đã tồn tại trong hệ thống. |
| Điều kiện thành công  (Post-condition) | Hồ sơ nhân sự được cập nhật.  Lịch sử thay đổi được ghi lại. |
| Điều kiện thất bại | Hồ sơ nhân sự không được cập nhật và thay đổi |
| Luồng sự kiện chính  (Basic Flow) | 1.  Tại màn hình danh sách, Phòng TCCB nhấn "Sửa" một nhân sự tại danh sách.  2.  Hệ thống hiển thị form nhập liệu chia thành các tabs/bước.  3.  Phòng TCCB có thể sửa các trường thông tin:   * **Thông tin chung bắt buộc**: Mã cán bộ (không thể sửa), Họ tên, Ngày sinh, Giới tính, CCCD, Quê quán, Địa chỉ, Mã số thuế (Không bắt buộc), Số Bảo hiểm xã hội (Không bắt buộc), Số bảo hiểm y tế (Không bắt buộc), Email, SĐT liên hệ. * **[MỞ RỘNG - Nếu là người nước ngoài],** Cán bộ TCCB tick chọn "Người nước ngoài", hệ thống hiển thị thêm các trường bắt buộc: Số Visa, Ngày hết hạn Visa, Số Hộ chiếu, Ngày hết hạn Hộ chiếu, Số giấy phép lao động, Ngày hết hạn giấy phép lao động, Upload PDF giấy phép lao động. * **Thông tin gia đình  (bắt buộc)**: Cha/Mẹ, Vợ/chồng, con, người phụ thuộc, thông tin chi tiết về gia đình. * **Thông tin ngân hàng  (bắt buộc)**: Tên Ngân hàng, Số tài khoản. * **Quá trình công tác** trước khi về trường: Nơi công tác, thời gian công tác **(bắt buộc)**. * **Thông tin Đảng/Đoàn (bắt buộc):** Ngày vào Đoàn/Đảng, Thông tin chi tiết. * **Upload ảnh chân dung  (bắt buộc).** * **Trình độ học vấn (bắt buộc):** Trình độ văn hóa, Trình độ đào tạo, Chức danh nghề nghiệp, Chức danh khoa học. * **Thông tin các bằng cấp  (bắt buộc)**: Tên bằng, Trường, Ngành, Năm tốt nghiệp, Xếp loại, Bản pdf. * **Thông tin các chứng chỉ  (bắt buộc):** Tên chứng chỉ, Nơi cấp, Ngày cấp, Ngày hết hạn, Bản pdf. * **Lương & Phụ cấp (bắt buộc):** Hệ số lương (đã được cấu hình), Phụ cấp(đã được cấu hình). * **Thông tin hợp đồng:** Hệ thống hiển thị danh sách hợp đồng hiện có và cho phép Phòng TCCB truy cập các chức năng liên quan theo UC 4.25–4.28. * **Thông tin đánh giá khen thưởng/kỷ luật:** Hệ thống hiển thị thông tin liên quan cho Phòng TCCB và cho phép truy cập các chức năng tương ứng theo UC 4.40–4.42 trong bộ UCS tổng hợp.   4.  Hệ thống kiểm tra tính đầy đủ, hợp lệ và tính logic của các thông tin được cập nhật trực tiếp trong hồ sơ.  5.  Phòng TCCB nhấn "Lưu".  6.  Hệ thống lưu và thông báo cập nhật thành công. |
| Luồng sự kiện thay thế  (Alternative Flow) | **A1: Chuyển sang cập nhật thông tin hợp đồng**   1. Tại bước 3, nếu Phòng TCCB chọn thao tác liên quan đến hợp đồng của nhân sự. 2. Hệ thống mở chức năng tương ứng theo UC 4.25–4.28. 3. Use case kết thúc.   **A2: Chuyển sang quản lý thông tin đánh giá khen thưởng/kỷ luật**   1. Tại bước 3, nếu Phòng TCCB chọn thao tác liên quan đến đánh giá khen thưởng/kỷ luật. 2. Hệ thống mở chức năng tương ứng theo UC 4.40–4.42 trong bộ UCS tổng hợp. 3. Use case kết thúc. |
| Luồng sự kiện ngoại lệ  (Exception Flow) | **E1: Dữ liệu không hợp lệ hoặc thiếu thông tin bắt buộc**   1. Tại bước 4, hệ thống phát hiện thiếu thông tin bắt buộc, định dạng dữ liệu sai hoặc các trường thời gian không hợp lệ. 2. Hệ thống hiển thị cảnh báo, đánh dấu các tab còn thiếu hoặc sai dữ liệu và không cho phép lưu hồ sơ. Quay lại bước 3.   **E2: Hủy thao tác**   1. Tại bước 3, Phòng TCCB chọn "Hủy". 2. Quay lại màn hình danh sách nhân sự.   **E3: Hồ sơ ở trạng thái "Đã thôi việc"**   1. Tại bước 1, hệ thống phát hiện hồ sơ nhân sự đang ở trạng thái làm việc "Đã thôi việc". 2. Hệ thống hiển thị thông báo: "Không thể chỉnh sửa hồ sơ nhân sự đã thôi việc." và vô hiệu hóa nút "Sửa". Use case kết thúc. |
| Kịch bản bao phủ  (Scenario Coverage) | SC1: Chỉnh sửa trực tiếp thông tin hồ sơ thành công.  SC2: Người dùng chuyển sang cập nhật thông tin hợp đồng.  SC3: Người dùng chuyển sang quản lý đánh giá khen thưởng/kỷ luật.  SC4: Dữ liệu chỉnh sửa không hợp lệ.  SC5: Người dùng hủy thao tác.  SC6: Hồ sơ đang ở trạng thái đã thôi việc nên bị từ chối chỉnh sửa. |

### 4.33. Use Case: Đánh dấu thôi việc nhân sự (FEAT 8.5)

|  |  |
| --- | --- |
| **Tên use case** | **Đánh dấu thôi việc nhân sự** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Cho phép Phòng TCCB cập nhật trạng thái làm việc "Đã thôi việc" cho hồ sơ nhân sự khi đáp ứng các điều kiện nghiệp vụ. |
| Mức độ ưu tiên  (Priority) | Bắt buộc |
| Điều kiện kích hoạt  (Trigger) | Phòng TCCB chọn chức năng đánh dấu thôi việc trong một nhân sự trong menu "Quản lý hồ sơ nhân sự" |
| Điều kiện tiên quyết  (Precondition) | Phòng TCCB đã đăng nhập hệ thống. Nhân sự cần đánh dấu thôi việc đã tồn tại trong hệ thống. |
| Điều kiện thành công  (Post-condition) | Trạng thái của nhân sự được cập nhật thành "Đã thôi việc" trong hồ sơ nhân sự thành công.Trạng thái hợp đồng được cập nhật thành "Hết hiệu lực" (nếu nhân sự có hợp đồng ở trạng thái "Còn hiệu lực" hoặc "Chờ gia hạn"). Nhân sự được gỡ khỏi đơn vị công tác. Tài khoản liên kết được tự động khóa. |
| Điều kiện thất bại | Trạng thái làm việc "Đã thôi việc" không được cập nhật |
| Luồng sự kiện chính  (Basic Flow) | 1.  Tại màn hình danh sách, Phòng TCCB chọn chức năng "Đánh dấu thôi việc" một nhân sự.  2.  Hệ thống yêu cầu xác nhận, nhập ngày thôi việc, lý do thôi việc và kiểm tra các điều kiện nghiệp vụ liên quan.  3.  Phòng TCCB xác nhận.  4.  Hệ thống cập nhật trạng thái làm việc thành "Đã thôi việc", trạng thái hợp đồng thành "Hết hiệu lực" (nếu có hợp đồng đang hiệu lực hoặc chờ gia hạn), nhân sự được cập nhật rời khỏi đơn vị công tác.  5. Hệ thống tự động khóa tài khoản liên kết của nhân sự (cập nhật trạng thái tài khoản thành 'Bị khóa'). |
| Luồng sự kiện thay thế  (Alternative Flow) | **A1: Thôi việc khi hợp đồng còn hiệu lực (thanh lý trước hạn)**   1. Tại bước 2, hệ thống phát hiện nhân sự có hợp đồng ở trạng thái "Còn hiệu lực". 2. Hệ thống hiển thị cảnh báo: "Nhân sự này vẫn còn hợp đồng đang có hiệu lực. Tiếp tục sẽ thanh lý hợp đồng trước hạn." 3. Hệ thống yêu cầu nhập thêm lý do thanh lý hợp đồng trước hạn cùng với ngày và lý do thôi việc. 4. Phòng TCCB xác nhận. 5. Tiếp tục bước 4 của Basic Flow. |
| Luồng sự kiện ngoại lệ  (Exception Flow) | **E1: Nhân sự đã ở trạng thái "Đã thôi việc"**   1. Tại bước 1, hệ thống phát hiện nhân sự đã có trạng thái làm việc "Đã thôi việc". 2. Hệ thống vô hiệu hóa nút "Đánh dấu thôi việc" hoặc hiển thị cảnh báo: *"Nhân sự này đã được đánh dấu thôi việc trước đó."* Use case kết thúc.   **E2: Nhân sự chưa bãi nhiệm chức vụ**   1. Tại bước 2, hệ thống phát hiện nhân sự đang giữ chức vụ quản lý (Trưởng khoa, Trưởng bộ môn...). 2. Hệ thống chặn thao tác và thông báo: "Vui lòng bãi nhiệm chức vụ của nhân sự trước khi đánh dấu thôi việc." Use case kết thúc.   **E3: Hủy thao tác**   1. Tại bước 2, Phòng TCCB chọn "Hủy". 2. Hệ thống quay lại màn hình danh sách nhân sự. |
| Kịch bản bao phủ  (Scenario Coverage) | SC1: Đánh dấu thôi việc thành công với nhân sự không còn hợp đồng hiệu lực.  SC2: Đánh dấu thôi việc khi nhân sự còn hợp đồng hiệu lực và phát sinh thanh lý trước hạn.  SC3: Người dùng hủy thao tác.  SC4: Nhân sự đã ở trạng thái đã thôi việc.  SC5: Nhân sự đang giữ chức vụ quản lý nên bị chặn cho đến khi bãi nhiệm. |

### 4.34. Use Case: Thôi việc nhân sự tự động (FEAT 8.6)

|  |  |
| --- | --- |
| **Tên use case** | **Thôi việc nhân sự tự động** |
| Tác nhân chính | System Timer |
| Mục đích (mô tả) | Hệ thống tự động chuyển trạng thái hợp đồng sang "Chờ gia hạn" khi sắp hết hạn, và tự động đánh dấu thôi việc nhân sự khi hợp đồng hết hạn mà không được gia hạn trong thời gian cho phép theo cấu hình loại hợp đồng. |
| Mức độ ưu tiên  (Priority) | Bắt buộc |
| Điều kiện kích hoạt  (Trigger) | Hệ thống (System Timer) định kỳ kiểm tra trạng thái hợp đồng của nhân sự. |
| Điều kiện tiên quyết  (Precondition) | Hệ thống đang hoạt động bình thường. Tồn tại hợp đồng lao động ở trạng thái "Chưa có hiệu lực", "Còn hiệu lực" hoặc "Chờ gia hạn". |
| Điều kiện thành công  (Post-condition) | Hợp đồng ở trạng thái "Chưa có hiệu lực" được chuyển sang "Còn hiệu lực" khi đến ngày hiệu lực. Hợp đồng sắp hết hạn được chuyển sang trạng thái "Chờ gia hạn". Hoặc: Hợp đồng đã quá hạn gia hạn được chuyển sang "Hết hiệu lực", nhân sự được đánh dấu "Đã thôi việc", gỡ khỏi đơn vị công tác và tài khoản liên kết bị khóa. |
| Điều kiện thất bại | Hệ thống không thể cập nhật trạng thái do lỗi hệ thống. |
| Luồng sự kiện chính  (Basic Flow) | 1. Hệ thống (System Timer) định kỳ kiểm tra các hợp đồng đang ở trạng thái "Chưa có hiệu lực", "Còn hiệu lực" và "Chờ gia hạn". 2. Với các hợp đồng ở trạng thái "Chưa có hiệu lực": nếu Ngày hiệu lực ≤ Ngày hiện tại, hệ thống tự động chuyển trạng thái hợp đồng sang "Còn hiệu lực" và cập nhật trạng thái hợp đồng của nhân sự thành "Còn hiệu lực". 3. Với các hợp đồng ở trạng thái "Còn hiệu lực": nếu thời gian còn lại của hợp đồng ≤ thời gian chờ gia hạn được cấu hình của loại hợp đồng tương ứng (tham chiếu thuộc tính `thoiGianChoGiaHan` tại UC 4.20): 4. Hệ thống tự động cập nhật trạng thái hợp đồng từ "Còn hiệu lực" sang "Chờ gia hạn". 5. Hệ thống tự động cập nhật trạng thái hợp đồng của nhân sự thành "Chờ gia hạn". |
| Luồng sự kiện thay thế  (Alternative Flow) | **A1: Tự động thôi việc khi hết hạn gia hạn**   1. Tại bước 1, khi hệ thống kiểm tra hợp đồng ở trạng thái "Chờ gia hạn" đã quá thời gian gia hạn được cấu hình và không có gia hạn trong thời gian cho phép theo cấu hình loại hợp đồng, hệ thống tự động cập nhật trạng thái hợp đồng thành "Hết hiệu lực". 2. Hệ thống tự động cập nhật trạng thái làm việc cho nhân sự vừa bị cập nhật trạng thái hợp đồng "Hết hiệu lực" thành "Đã thôi việc". 3. Hệ thống tự động gỡ nhân sự khỏi đơn vị công tác hiện tại. 4. Hệ thống tự động cập nhật trạng thái tài khoản liên kết thành "Bị khóa". |
| Luồng sự kiện ngoại lệ  (Exception Flow) | Không có |

### 4.35. Use Case: Xem Chi tiết thông tin hồ sơ nhân sự (FEAT 8.7)

|  |  |
| --- | --- |
| **Tên use case** | **Xem Chi tiết thông tin hồ sơ nhân sự** |
| Tác nhân chính | Phòng TCCB, Phòng TCKT |
| Mục đích (mô tả) | Cho phép phòng TCCB, phòng TCKT xem chi tiết toàn bộ thông tin hồ sơ nhân sự theo từng chế độ xem. |
| Mức độ ưu tiên  (Priority) | Bắt buộc |
| Điều kiện kích hoạt  (Trigger) | Phòng TCCB, phòng TCKT chọn chức năng xem chi tiết trong một nhân sự trong menu "Quản lý hồ sơ nhân sự" |
| Điều kiện tiên quyết  (Precondition) | Phòng TCCB, phòng TCKT đã đăng nhập hệ thống. |
| Điều kiện thành công  (Post-condition) | Thông tin chi tiết hồ sơ nhân sự được hiển thị đầy đủ, chính xác ở chế độ chỉ đọc. |
| Điều kiện thất bại | Hệ thống không hiển thị được thông tin hồ sơ do lỗi hệ thống hoặc dữ liệu không tồn tại. |
| Yêu cầu đặc biệt  (Special Requirements) | Màn hình chi tiết hồ sơ nhân sự phải được hiển thị hoàn chỉnh trong tối đa 5 giây tại mức không quá 10 người dùng đồng thời. |
| Luồng sự kiện chính  (Basic Flow) | 1.  Tại danh sách, Phòng TCCB, phòng TCKT nhấn vào nhấn "Xem chi tiết" tại một nhân sự.  2.  Hệ thống hiển thị màn hình Chi tiết hồ sơ ở chế độ chỉ đọc.  3.  Hệ thống hiển thị đầy đủ thông tin theo các tab:   * **Tab "Thông tin chung":** Mã cán bộ,Lý lịch, liên hệ, gia đình, ảnh chân dung * **Tab "Trình độ & Chức danh":** Bằng cấp, chứng chỉ, chức danh khoa học, chức vụ, đơn vị công tác. * **Tab "Thông tin Đảng/ Đoàn":** Thông tin Đảng/ Đoàn đã được lưu. * **Tab "Lương & Phụ cấp":** Thông tin về ngạch, bậc, hệ số lương, thông tin ngân hàng * **Tab "Hợp đồng":** Thông tin về các loại hợp đồng đồng đã ký * **Tab "Khen thưởng/Kỷ luật":** Hệ thống hiển thị mục khen thưởng/kỷ luật tùy theo cấu hình ẩn/hiện (xem UC 4.37, FEAT 8.9) và vai trò người dùng hiện tại * **Tab "Công tác":** Quá trình công tác trước khi về trường đã được ghi |
| Luồng sự kiện thay thế  (Alternative Flow) | Không có |
| Luồng sự kiện ngoại lệ  (Exception Flow) | Không có |

### 4.36. Use Case: In và xuất Excel hồ sơ nhân sự (FEAT 8.8)

|  |  |
| --- | --- |
| **Tên use case** | **In và xuất Excel hồ sơ nhân sự** |
| Tác nhân chính | Phòng TCCB, Phòng TCKT |
| Mục đích (mô tả) | Cho phép phòng TCCB, phòng TCKT in hồ sơ nhân sự dưới định dạng PDF hoặc xuất toàn bộ thông tin hồ sơ ra file Excel để phục vụ lưu trữ, báo cáo và đối chiếu. |
| Mức độ ưu tiên  (Priority) | Bắt buộc |
| Điều kiện kích hoạt  (Trigger) | Phòng TCCB hoặc phòng TCKT chọn chức năng "In hồ sơ" hoặc "Xuất Excel" tại màn hình chi tiết hồ sơ nhân sự. |
| Điều kiện tiên quyết  (Precondition) | Phòng TCCB hoặc phòng TCKT đã đăng nhập hệ thống. Hồ sơ nhân sự đã tồn tại trong hệ thống. Người dùng đang ở màn hình chi tiết hồ sơ nhân sự (tham chiếu UC 4.35). |
| Điều kiện thành công  (Post-condition) | File PDF hoặc Excel chứa thông tin hồ sơ nhân sự được tạo và tải về thành công. Không làm thay đổi dữ liệu trong hệ thống (chỉ đọc). |
| Điều kiện thất bại | Hệ thống không thể tạo file do lỗi hệ thống hoặc dữ liệu không tồn tại. |
| Yêu cầu đặc biệt  (Special Requirements) | (1) Dữ liệu in hồ sơ nhân sự phải được chuẩn bị xong trong tối đa 10 giây tại mức không quá 10 người dùng đồng thời. (2) File Excel phải được tạo xong và sẵn sàng cho người dùng tải xuống trong tối đa 10 giây với tập dữ liệu không quá 1.000 bản ghi hoặc tối đa 30 giây với tập dữ liệu không quá 10.000 bản ghi, tại mức không quá 10 người dùng đồng thời. |
| Luồng sự kiện chính  (Basic Flow) | 1. Phòng TCCB hoặc phòng TCKT đang ở màn hình chi tiết hồ sơ nhân sự (từ UC 4.35). 2. Người dùng chọn chức năng **"In hồ sơ"**. 3. Hệ thống tạo bản xem trước hồ sơ ở định dạng PDF bao gồm toàn bộ thông tin hồ sơ nhân sự. 4. Người dùng xác nhận in hoặc tải về file PDF. 5. Hệ thống thực hiện in hoặc tải file PDF về máy người dùng. |
| Luồng sự kiện thay thế  (Alternative Flow) | **A1: Xuất ra Excel**   1. Tại bước 2, người dùng chọn chức năng **"Xuất Excel"** thay vì "In hồ sơ". 2. Hệ thống tạo file Excel chứa tất cả thông tin hồ sơ nhân sự. 3. Hệ thống tải file Excel về máy người dùng. Use case kết thúc. |
| Luồng sự kiện ngoại lệ  (Exception Flow) | Không có |

### 4.37. Use Case: Cấu hình ẩn/hiện mục khen thưởng/kỷ luật (FEAT 8.9)

|  |  |
| --- | --- |
| **Tên use case** | **Cấu hình ẩn/hiện mục khen thưởng/kỷ luật** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Cho phép Phòng TCCB cấu hình ở mức toàn hệ thống việc ẩn/hiện các mục **Khen thưởng/Kỷ luật** trong hồ sơ nhân sự đối với các vai trò không thuộc Phòng TCCB, nhằm kiểm soát phạm vi hiển thị thông tin theo vai trò sử dụng. |
| Mức độ ưu tiên  (Priority) | Bắt buộc |
| Điều kiện kích hoạt  (Trigger) | Phòng TCCB chọn chức năng cấu hình hiển thị hồ sơ nhân sự trong menu cấu hình hệ thống. |
| Điều kiện tiên quyết  (Precondition) | Cán bộ Phòng TCCB đã đăng nhập hệ thống và có quyền cấu hình hệ thống. |
| Điều kiện thành công  (Post-condition) | Cấu hình ẩn/hiện mục **Khen thưởng/Kỷ luật** được lưu thành công và áp dụng ngay ở mức hệ thống cho các màn hình xem hồ sơ liên quan (tham chiếu UC 4.35 và UC 4.47).  Các vai trò được cấu hình là **"Ẩn"** sẽ không nhìn thấy mục **Khen thưởng/Kỷ luật** trong hồ sơ nhân sự.  Phòng TCCB luôn nhìn thấy đầy đủ các mục này bất kể cấu hình. |
| Điều kiện thất bại | Cấu hình không được cập nhật do lỗi hệ thống hoặc người dùng không lưu thay đổi. |
| Luồng sự kiện chính  (Basic Flow) | 1. Phòng TCCB truy cập menu **cấu hình hệ thống**.  2. Hệ thống hiển thị danh sách nhóm cấu hình.  3. Phòng TCCB chọn nhóm cấu hình **"Hiển thị hồ sơ nhân sự"**.  4. Hệ thống hiển thị các vai trò không thuộc Phòng TCCB (ví dụ: Phòng TCKT, Cán bộ/Giảng viên/Người dùng) cùng các tùy chọn ẩn/hiện đối với mục **Khen thưởng** và **Kỷ luật**.  5. Phòng TCCB bật/tắt cấu hình hiển thị cho từng vai trò.  6. Phòng TCCB nhấn **"Lưu"**.  7. Hệ thống lưu cấu hình, thông báo thành công và áp dụng ngay cho các màn hình xem hồ sơ nhân sự tương ứng. |
| Luồng sự kiện thay thế  (Alternative Flow) | **A1: Không thay đổi cấu hình**   1. Tại bước 5, Phòng TCCB không thực hiện thay đổi nào và chọn **"Hủy"** hoặc thoát màn hình. 2. Hệ thống không cập nhật cấu hình và giữ nguyên thiết lập hiện tại. Use case kết thúc. |
| Luồng sự kiện ngoại lệ  (Exception Flow) | Không có |

## 4.4. Ngô Đức Nam Khánh (UC 4.38–4.50)

### 4.38. Use Case: Bổ nhiệm và điều chuyển nhân sự cho đơn vị tổ chức nhân sự

|  |  |
| --- | --- |
| **Tên use case** | **Bổ nhiệm và điều chuyển nhân sự cho đơn vị tổ chức nhân sự** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Cho phép Phòng TCCB bổ nhiệm nhân sự vào các đơn vị tổ chức |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Phòng TCCB chọn chức năng bổ nhiệm trong menu “Cơ cấu tổ chức”. |
| Điều kiện tiên quyết (Precondition) | Cán bộ TCCB đã đăng nhập hệ thống. Đơn vị tổ chức đã tồn tại trong cây cơ cấu tổ chức. Nhân sự phải có trạng thái hợp đồng ‘Còn hiệu lực’ hoặc ‘Chờ gia hạn’ và trạng thái làm việc ‘Đang chờ xét’ hoặc ‘Đang công tác’. |
| Điều kiện thành công (Post-condition) | Nhân sự được bổ nhiệm nhân sự vào đơn vị. Thông tin nhân sự của đơn vị được cập nhật. |
| Điều kiện thất bại | Việc bổ nhiệm không được thực hiện do vi phạm ràng buộc nghiệp vụ hoặc dữ liệu không hợp lệ. |
| Luồng sự kiện chính (Basic Flow) | 1. Phòng TCCB truy cập một đơn vị trong cơ cấu tổ chức.  2. Phòng TCCB chọn bổ nhiệm nhân sự chưa công tác  3. Hệ thống hiển thị danh sách nhân sự ở trạng thái “Đang chờ xét” và trạng thái hợp đồng “Còn hiệu lực”.  4. Phòng TCCB chọn nhân sự và nhập thông tin như (Chức vụ, Ngày bắt đầu)  5. Hệ thống kiểm tra hợp lệ (Ngày bắt đầu).  6. Hệ thống thay đổi danh sách nhân sự, trạng thái công việc của nhân sự chuyển thành “Đang công tác ”và thông báo thành công. |
| Luồng sự kiện thay thế (Alternative Flow) | **A1: Bổ nhiệm nhân sự đang công tác ở đơn vị khác**   1. Phòng TCCB truy cập một đơn vị trong cơ cấu tổ chức. 2. Phòng TCCB chọn bổ nhiệm nhân sự đang công tác tại đơn vị khác. 3. Hệ thống yêu cầu chọn đơn vị, chọn nhân sự từ đơn vị được chọn. 4. Phòng TCCB chọn nhân sự và nhập thông tin như (Chức vụ, Ngày bắt đầu) 5. Hệ thống kiểm tra hợp lệ (Ngày bắt đầu). 6. Hệ thống gỡ nhân sự khỏi đơn vị cũ, thêm vào đơn vị mới, cập nhật danh sách nhân sự của cả hai đơn vị và thông báo thành công. |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Dữ liệu không hợp lệ**  1. Tại bước 5, Hệ thống kiểm tra phát hiện:  \* Ngày bắt đầu < ngày hiện tại  2. Hệ thống yêu cầu nhập lại và không lưu dữ liệu.  **E2: Không được phép tiếp tục**  1. Tại bước 1, nếu đơn vị đang ở trạng thái “Giải thể” hoặc “Sáp nhập”.  2. Hệ thống hiển thị thông báo từ chối cho phép tiếp tục cập nhật bổ nhiệm. |

### 4.39. Use Case: Bãi nhiệm nhân sự khỏi đơn vị tổ chức nhân sự

|  |  |
| --- | --- |
| **Tên use case** | **Bãi nhiệm nhân sự khỏi đơn vị tổ chức nhân sự** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Cho phép Phòng TCCB thực hiện bãi nhiệm nhân sự trong đơn vị tổ chức, nhằm cập nhật chính xác tình trạng nhân sự và phục vụ công tác quản lý nhân sự. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Phòng TCCB chọn chức năng bãi nhiệm nhân sự của đơn vị trong menu “Cơ cấu tổ chức”. |
| Điều kiện tiên quyết (Precondition) | Cán bộ Phòng TCCB đã đăng nhập hệ thống. Đơn vị tổ chức đã tồn tại trong cây cơ cấu tổ chức. |
| Điều kiện thành công (Post-condition) | Nhân sự được miễn nhiệm khỏi chức vụ. Trạng thái công việc của nhân sự được cập nhật thành “Đang chờ xét”. Nhân sự được xóa khỏi danh sách của đơn vị tổ chức. |
| Điều kiện thất bại | Việc bãi nhiệm không được thực hiện do vi phạm ràng buộc nghiệp vụ. |
| Luồng sự kiện chính (Basic Flow) | 1. Phòng TCCB truy cập một đơn vị trong cơ cấu tổ chức.  2. Hệ thống hiển thị danh sách nhân sự  3. Phòng TCCB chọn chức năng bãi nhiệm từ trong một nhân sự trong danh sách.  4. Hệ thống yêu cầu xác nhận thao tác.  5. Phòng TCCB xác nhận thao tác miễn nhiệm.  6. Hệ thống cập nhật trạng thái công việc của nhân sự là “Đang chờ xét”  và xóa nhân sự khỏi danh sách của đơn vị tổ chức. |
| Luồng sự kiện thay thế (Alternative Flow) | Không có |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Không được phép tiếp tục**  1. Tại bước 3, nếu đơn vị đang ở trạng thái “Giải thể” hoặc “Sáp nhập”.  2. Hệ thống hiển thị thông báo từ chối cho phép tiếp tục thực hiện bãi nhiệm. |

### 4.40. Use Case: Ghi nhận đánh giá cho nhân sự

|  |  |
| --- | --- |
| **Tên use case** | **Ghi nhận đánh giá cho nhân sự** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Ghi nhận các quyết định đánh giá đối với nhân sự. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Phòng TCCB chọn chức năng “Thêm đánh giá khen thưởng hoặc kỷ luật” |
| Điều kiện tiên quyết (Precondition) | Cán bộ TCCB đã đăng nhập hệ thống. Hồ sơ nhân sự đã được tạo Nhân sự không ở trạng thái làm việc ‘Đã thôi việc’. |
| Điều kiện thành công (Post-condition) | Hồ sơ nhân sự được cập nhật. Lịch sử thay đổi được ghi lại. |
| Điều kiện thất bại | Dữ liệu đánh giá không được ghi nhận vào hệ thống do thiếu các trường thông tin bắt buộc, hoặc do lỗi kết nối cơ sở dữ liệu/phiên đăng nhập hết hạn |
| Luồng sự kiện chính (Basic Flow) | 1. Phòng TCCB chọn tab ” Thêm đánh giá khen thưởng hoặc kỷ luật”.  2. Hệ thống yêu cầu nhập mã nhân sự và chọn loại đánh giá  3. Phòng TCCB nhập mã nhân sự và chọn loại đánh giá (Khen thưởng/ Kỷ luật) 4.  Hệ thống hiển thị giao diện nhập liệu:   * Nếu chọn loại đánh giá là khen thưởng: ‘Loại khen thưởng’, ‘Tên khen thưởng’, ‘Ngày quyết định’, ‘Số quyết định’, ‘Nội dung’, ‘Số tiền thưởng (nếu có)’. * Nếu chọn loại đánh giá là kỷ luật: Loại kỷ luật, ‘Tên kỷ luật’,  Ngày quyết định, Lý do, Hình thức xử lý.   5. Nhấn “Lưu”.  6. Hệ thống kiểm tra dữ liệu hợp lệ (Đầy đủ các trường thông tin)  7. Hệ thống lưu dữ liệu và đẩy vào hồ sơ cá nhân và thông báo thành công.  *Lưu ý: Xem UC 4.41 (Xem lịch sử đánh giá khen thưởng/kỷ luật) và UC 4.42 (Tìm kiếm và lọc danh sách đánh giá khen thưởng/kỷ luật) cho các tác vụ tra cứu liên quan.* |
| Luồng sự kiện thay thế (Alternative Flow) | Không có |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Mã nhân sự không hợp lệ**  1. Tại bước 3, Hệ thống phát hiện mã nhân sự không tồn tại.  2. Hệ thống từ chối tiếp tục tạo bản đánh giá.  **E2: Dữ liệu không hợp lệ**  1. Tại bước 6, Hệ thống phát hiện dữ liệu không đầy đủ các trường thông tin.  2. Hệ thống từ chối lưu thông tin và thông báo lỗi.  **E3: Hủy thao tác**  1. Tại bước 2, Phòng TCCB chọn “Hủy”. 2. Quay lại màn hình danh sách nhân sự. **E4: Nhân sự đã thôi việc**  1. Tại bước 3, hệ thống phát hiện nhân sự đang ở trạng thái làm việc “Đã thôi việc”. 2. Hệ thống từ chối ghi nhận đánh giá và hiển thị thông báo: “Không thể ghi nhận đánh giá cho nhân sự đã thôi việc.” |

### 4.41. Use Case: Xem lịch sử đánh giá khen thưởng/kỷ luật (FEAT 10.2)

|  |  |
| --- | --- |
| **Tên use case** | **Xem lịch sử đánh giá khen thưởng/kỷ luật** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Cho phép Phòng TCCB xem lịch sử toàn bộ các bản ghi đánh giá khen thưởng và kỷ luật của một nhân sự theo trình tự thời gian, phục vụ tra cứu, đối chiếu và theo dõi hồ sơ đánh giá của nhân sự. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Phòng TCCB chọn tab “Khen thưởng/Kỷ luật” trong màn hình chi tiết hồ sơ nhân sự. |
| Điều kiện tiên quyết (Precondition) | Cán bộ Phòng TCCB đã đăng nhập hệ thống. Hồ sơ nhân sự đã tồn tại trong hệ thống. |
| Điều kiện thành công (Post-condition) | Lịch sử đánh giá khen thưởng/kỷ luật của nhân sự được hiển thị đầy đủ, chính xác. Không làm thay đổi dữ liệu trong hệ thống (chỉ đọc). |
| Điều kiện thất bại | Không thể hiển thị lịch sử đánh giá do lỗi hệ thống hoặc hồ sơ nhân sự không tồn tại. |
| Luồng sự kiện chính (Basic Flow) | 1. Phòng TCCB truy cập màn hình **chi tiết hồ sơ nhân sự** của một nhân sự (tham chiếu UC 4.35).  2. Hệ thống hiển thị màn hình chi tiết hồ sơ ở chế độ chỉ đọc.  3. Phòng TCCB chọn tab **“Khen thưởng/Kỷ luật”**.  4. Hệ thống hiển thị danh sách toàn bộ bản ghi đánh giá của nhân sự theo thứ tự thời gian, bao gồm các thông tin: Ngày quyết định, Loại đánh giá (Khen thưởng/Kỷ luật), Tên đánh giá, Số quyết định, Mô tả ngắn/Nội dung.  5. Phòng TCCB chọn một bản ghi đánh giá trong danh sách.  6. Hệ thống hiển thị chi tiết bản ghi đã chọn, bao gồm đầy đủ thông tin đã được ghi nhận từ UC 4.40. |
| Luồng sự kiện thay thế (Alternative Flow) | **A1: Nhân sự chưa có lịch sử đánh giá**  1. Tại bước 3, nếu hồ sơ nhân sự chưa có bản ghi khen thưởng hoặc kỷ luật nào.  2. Hệ thống hiển thị tab **“Khen thưởng/Kỷ luật”** ở trạng thái trống và thông báo: *“Nhân sự chưa có lịch sử đánh giá khen thưởng/kỷ luật.”* |
| Luồng sự kiện ngoại lệ (Exception Flow) | Không có |

### 4.42. Use Case: Tìm kiếm và lọc danh sách đánh giá (FEAT 10.3)

|  |  |
| --- | --- |
| **Tên use case** | **Tìm kiếm và lọc danh sách đánh giá** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Cho phép Phòng TCCB tìm kiếm và lọc danh sách các bản ghi khen thưởng/kỷ luật theo nhân sự, loại đánh giá hoặc khoảng thời gian nhằm phục vụ công tác tra cứu, thống kê và đối chiếu dữ liệu đánh giá. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Phòng TCCB truy cập chức năng quản lý đánh giá khen thưởng/kỷ luật. |
| Điều kiện tiên quyết (Precondition) | Cán bộ Phòng TCCB đã đăng nhập hệ thống. |
| Điều kiện thành công (Post-condition) | Danh sách các bản ghi đánh giá phù hợp với điều kiện tìm kiếm/lọc được hiển thị đầy đủ, chính xác. Phòng TCCB có thể tiếp tục xem chi tiết từng bản ghi. |
| Điều kiện thất bại | Hệ thống không thể xử lý yêu cầu tìm kiếm/lọc do lỗi hệ thống. |
| Luồng sự kiện chính (Basic Flow) | 1. Phòng TCCB truy cập chức năng **quản lý đánh giá khen thưởng/kỷ luật**.  2. Hệ thống hiển thị danh sách các bản ghi đánh giá và vùng bộ lọc tìm kiếm.  3. Phòng TCCB nhập từ khóa tìm kiếm và/hoặc chọn các tiêu chí lọc, bao gồm: Nhân sự (Mã cán bộ/Họ tên), Loại đánh giá (Khen thưởng/Kỷ luật), Khoảng thời gian (Từ ngày – Đến ngày).  4. Phòng TCCB nhấn **“Tìm kiếm”** hoặc **“Áp dụng bộ lọc”**.  5. Hệ thống hiển thị danh sách kết quả phù hợp với tiêu chí đã chọn, bao gồm các thông tin: Mã cán bộ, Họ tên, Loại đánh giá, Tên đánh giá, Ngày quyết định, Số quyết định.  6. Phòng TCCB có thể chọn một bản ghi bất kỳ trong danh sách kết quả.  7. Hệ thống hiển thị chi tiết bản ghi đánh giá đã chọn (tham chiếu UC 4.41). |
| Luồng sự kiện thay thế (Alternative Flow) | **A1: Không có kết quả phù hợp** 1. Tại bước 5, nếu không có bản ghi nào phù hợp với tiêu chí tìm kiếm/lọc.  2. Hệ thống hiển thị thông báo: *“Không tìm thấy đánh giá phù hợp với tiêu chí tìm kiếm.”* |
| Luồng sự kiện ngoại lệ (Exception Flow) | Không có |

### 4.43. Use Case: Mở khóa đào tạo cho cán bộ giảng viên

|  |  |
| --- | --- |
| **Tên use case** | **Mở khóa đào tạo cho cán bộ giảng viên** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Cho phép Cán bộ TCCB tạo mới và thiết lập thông tin một khóa đào tạo dành cho cán bộ, giảng viên; cấu hình hình thức đào tạo, thời gian, kinh phí và điều kiện đăng ký, làm cơ sở cho việc đăng ký tham gia và quản lý đào tạo sau này. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Phòng TCCB chọn chức năng mở khóa học trong menu “Đào tạo & Phát triển” |
| Điều kiện tiên quyết (Precondition) | Phòng TCCB đã đăng nhập hệ thống. |
| Điều kiện thành công (Post-condition) | Khóa đào tạo được tạo mới và lưu thành công. Trạng thái khóa đào tạo được thiết lập theo cấu hình. |
| Điều kiện thất bại | Khóa đào tạo không được tạo do dữ liệu không hợp lệ hoặc vi phạm ràng buộc nghiệp vụ. |
| Luồng sự kiện chính (Basic Flow) | 1.  Phòng TCCB chọn menu “Đào tạo & Phát triển”.  2.  Phòng TCCB nhấn “Tạo khóa đào tạo mới”.  3. Hệ thống hiển thị thông tin nhập 4.  Phòng TCCB nhập thông tin: Tên khóa đào tạo, Loại khóa đào tạo (theo cấu hình), Thời gian đào tạo (từ ngày – đến ngày), Địa điểm, Kinh phí (nếu có), Cam kết sau đào tạo (nếu có), Chứng chỉ sau đào tạo (Tên chứng chỉ, Loại chứng chỉ). 5.  Phòng TCCB thiết lập thời gian mở đăng ký từ ngày - đến ngày, Giới hạn số người tham gia.  6. Phòng TCCB nhấn “Lưu”.  7. Hệ thống kiểm tra dữ liệu hợp lệ.  8. Hệ thống yêu cầu xác nhận tạo khóa đào tạo.  9. Phòng TCCB xác nhận.  10. Hệ thống lưu khóa đào tạo và thiết lập trạng thái ban đầu là “Đang mở đăng ký” |
| Luồng sự kiện thay thế (Alternative Flow) | Không có |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Dữ liệu lưu không hợp lệ**  1. Tại bước 7, hệ thống phát hiện thiếu các trường bắt buộc (Tên khóa, Loại khóa, Thời gian), thời gian mở đăng ký kết thúc sau ngày bắt đầu đào tạo.  2. Hệ thống hiển thị cảnh báo và yêu cầu chỉnh sửa.  **E2: Hủy thao tác**  1. Tại bước 4, Phòng TCCB chọn “Hủy”. 2. Quay lại màn hình danh sách khóa đào tạo. |

### 4.44. Use Case: Sửa thông tin khóa đào tạo đã mở

|  |  |
| --- | --- |
| **Tên use case** | **Sửa thông tin khóa đào tạo đã mở** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Cho phép Phòng TCCB chỉnh sửa các thông tin của khóa đào tạo đã được tạo nhằm cập nhật kế hoạch đào tạo phù hợp với thực tế, đồng thời đảm bảo không vi phạm các ràng buộc nghiệp vụ đối với khóa đào tạo đã mở đăng ký hoặc đã có người tham gia |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Phòng TCCB chọn chức năng “Sửa thông tin khóa đào tạo” tại một khóa đào tạo trong menu “Đào tạo & Phát triển”. |
| Điều kiện tiên quyết (Precondition) | Cán bộ Phòng TCCB đã đăng nhập hệ thống. Khóa đào tạo đã tồn tại trong hệ thống. Khóa đào tạo đang ở trạng thái “Đang mở đăng ký” hoặc “Đang đào tạo”. |
| Điều kiện thành công (Post-condition) | Thông tin khóa đào tạo được cập nhật thành công. Các thay đổi được ghi nhận và áp dụng ngay cho khóa đào tạo. |
| Điều kiện thất bại | Thông tin khóa đào tạo không được cập nhật do vi phạm ràng buộc nghiệp vụ hoặc dữ liệu không hợp lệ. |
| Luồng sự kiện chính (Basic Flow) | 1. Phòng TCCB chọn menu **“Đào tạo & Phát triển”**.  2. Hệ thống hiển thị danh sách các khóa đào tạo.  3. Phòng TCCB chọn một khóa đào tạo và nhấn **“Sửa thông tin”**.  4. Hệ thống hiển thị màn hình chỉnh sửa thông tin khóa đào tạo.  5. Phòng TCCB chỉnh sửa các thông tin cho phép:   * Tên khóa đào tạo * Địa điểm * Kinh phí (nếu có) * Cam kết sau đào tạo (nếu có) * Thông tin chứng chỉ sau đào tạo * Trạng thái khóa đào tạo * Thời gian mở đăng ký và giới hạn số người tham gia (nếu được phép)   6. Phòng TCCB nhấn **“Lưu”**.  7. Hệ thống kiểm tra tính hợp lệ và ràng buộc nghiệp vụ (bao gồm kiểm tra chuyển trạng thái khóa đào tạo phải tuân theo thứ tự: Đang mở đăng ký → Đang đào tạo → Đã hoàn thành; không cho phép chuyển ngược hoặc bỏ qua bước).  8. Hệ thống yêu cầu xác nhận cập nhật.  9. Phòng TCCB xác nhận.  10. Hệ thống cập nhật thông tin khóa đào tạo và thông báo thành công.  *Lưu ý: Khi trạng thái khóa đào tạo được chuyển sang “Đang đào tạo”, hệ thống tự động batch-update tất cả đăng ký tham gia có trạng thái “Đã đăng ký” sang “Đang học”.* |
| Luồng sự kiện thay thế (Alternative Flow) | **A1: Chỉnh sửa khi khóa đào tạo đang diễn ra**  1. Tại bước 4, nếu khóa đào tạo ở trạng thái “Đang đào tạo”, hệ thống chỉ cho phép chỉnh sửa: Địa điểm, Kinh phí, Cam kết sau đào tạo, Thông tin chứng chỉ sau đào tạo.  2. Hệ thống khóa không cho phép chỉnh sửa: Tên khóa đào tạo, Loại khóa đào tạo, Thời gian mở đăng ký, Giới hạn số người tham gia.  3. Tiếp tục từ bước 6. |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Chuyển trạng thái không hợp lệ**  1. Tại bước 7, hệ thống phát hiện trạng thái mới được chọn vi phạm thứ tự chuyển đổi (Đang mở đăng ký → Đang đào tạo → Đã hoàn thành; không cho phép chuyển ngược hoặc bỏ qua bước).  2. Hệ thống hiển thị thông báo: *“Chuyển trạng thái không hợp lệ.”* và yêu cầu chọn lại.  **E2: Vi phạm ràng buộc đăng ký**  1. Tại bước 7, hệ thống phát hiện nếu: Giảm giới hạn số người tham gia nhỏ hơn số lượng đã đăng ký.  2. Hệ thống hiển thị cảnh báo và không cho phép lưu.  **E3: Dữ liệu không hợp lệ**  1. Tại bước 7, hệ thống phát hiện thiếu trường bắt buộc hoặc thời gian không hợp lệ.  2. Hệ thống yêu cầu chỉnh sửa lại thông tin.  **E4: Hủy thao tác**  1. Tại bước 5, Phòng TCCB chọn “Hủy”. 2. Quay lại màn hình danh sách khóa đào tạo. |

### 4.45. Use Case: Xem chi tiết thông tin khóa đào tạo đã mở

|  |  |
| --- | --- |
| **Tên use case** | **Xem chi tiết thông tin khóa đào tạo đã mở** |
| Tác nhân chính | Phòng TCCB |
| Mục đích (mô tả) | Cho phép Phòng TCCB xem đầy đủ thông tin chi tiết của một khóa đào tạo đã được tạo, bao gồm trạng thái khóa học, thông tin tổ chức đào tạo, danh sách cán bộ – giảng viên đăng ký tham gia, và tình trạng tham gia của từng nhân sự, nhằm phục vụ công tác quản lý, theo dõi và ra quyết định điều chỉnh khóa đào tạo khi cần thiết. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Phòng TCCB chọn một khóa đào tạo và nhấn chức năng “Xem chi tiết” trong menu “Đào tạo & Phát triển”. |
| Điều kiện tiên quyết (Precondition) | Cán bộ Phòng TCCB đã đăng nhập hệ thống. Khóa đào tạo đã tồn tại trong hệ thống. |
| Điều kiện thành công (Post-condition) | Thông tin chi tiết của khóa đào tạo được hiển thị đầy đủ và chính xác. Phòng TCCB có thể theo dõi tình trạng khóa học và danh sách nhân sự tham gia. |
| Điều kiện thất bại | Không thể hiển thị thông tin khóa đào tạo do lỗi hệ thống. |
| Luồng sự kiện chính (Basic Flow) | 1. Phòng TCCB truy cập menu **“Đào tạo & Phát triển”**.  2. Hệ thống hiển thị danh sách các khóa đào tạo.  3. Phòng TCCB chọn một khóa đào tạo và nhấn **“Xem chi tiết”**.  4. Hệ thống hiển thị màn hình chi tiết khóa đào tạo, hiển thị đầy đủ thông tin theo yêu cầu bao gồm các thông tin:   * **Thông tin chung khóa đào tạo**: Tên khóa đào tạo, Loại khóa đào tạo, Trạng thái khóa đào tạo (Đang mở đăng ký / Đang đào tạo / Đã hoàn thành), Thời gian đào tạo (từ ngày – đến ngày), Địa điểm, Kinh phí (nếu có), Cam kết sau đào tạo (nếu có), Chứng chỉ sau đào tạo. * **Thông tin đăng ký**: Thời gian mở đăng ký, Giới hạn số lượng người tham gia, Số lượng đã đăng ký / số lượng tối đa * **Danh sách tham gia**: Hệ thống hiển thị danh sách cán bộ, giảng viên đã đăng ký khóa đào tạo, bao gồm (Họ và tên, Mã cán bộ, Đơn vị đang công tác, Thời điểm đăng ký, Trạng thái tham gia |
| Luồng sự kiện thay thế (Alternative Flow) | Không có |
| Luồng sự kiện ngoại lệ (Exception Flow) | Không có |

### 4.46. Use Case: Ghi nhận kết quả đào tạo của cán bộ giảng viên

|  |  |
| --- | --- |
| **Tên use case** | **Ghi nhận kết quả đào tạo của cán bộ giảng viên** |
| Tác nhân chính | Cán bộ TCCB |
| Mục đích (mô tả) | Cho phép Phòng TCCB ghi nhận kết quả tham gia khóa đào tạo của cán bộ, giảng viên sau khi khóa học kết thúc; cập nhật trạng thái hoàn thành, không đạt và lưu trữ chứng chỉ đào tạo vào hồ sơ nhân sự nhằm phục vụ công tác quản lý và đánh giá năng lực. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Phòng TCCB chọn chức năng “Ghi nhận kết quả đào tạo” tại tab “Danh sách học viên” của một khóa đào tạo. |
| Điều kiện tiên quyết (Precondition) | Cán bộ Phòng TCCB đã đăng nhập hệ thống. Khóa đào tạo đã tồn tại trong hệ thống. Trạng thái khóa đào tạo là “Đã hoàn thành”. Khóa đào tạo có danh sách học viên đã đăng ký. |
| Điều kiện thành công (Post-condition) | Kết quả đào tạo của từng học viên được ghi nhận thành công. Trạng thái tham gia của học viên được cập nhật (Hoàn thành / Không đạt). Chứng chỉ đào tạo (nếu có) được lưu vào hồ sơ cá nhân của nhân sự. Lịch sử đào tạo của nhân sự được cập nhật. |
| Điều kiện thất bại | Kết quả đào tạo không được ghi nhận do dữ liệu không hợp lệ hoặc vi phạm ràng buộc nghiệp vụ. |
| Luồng sự kiện chính (Basic Flow) | 1. Phòng TCCB truy cập menu **“Đào tạo & Phát triển”**.  2. Chọn xem chi tiết “Danh sách học viên” có một khóa đào tạo có trạng thái “Đã hoàn thành”.  3. Hệ thống hiển thị danh sách học viên tham gia khóa đào tạo, bao gồm: Họ tên, Mã cán bộ, Đơn vị công tác, Trạng thái tham gia hiện tại (Đang học)  4. Phòng TCCB chọn một học viên và nhấn **“Ghi nhận kết quả”**.  5. Hệ thống hiển thị form ghi nhận kết quả, bao gồm: Trạng thái kết quả: Hoàn thành/ Không đạt, Ngày hoàn thành (mặc định là ngày kết thúc khóa học), File chứng chỉ (PDF) (tùy chọn, bắt buộc nếu trạng thái là “Hoàn thành”)  6. Phòng TCCB nhập thông tin và nhấn **“Lưu”**.  7. Hệ thống kiểm tra tính hợp lệ của dữ liệu.  8. Hệ thống cập nhật trạng thái học viên:   * Nếu **Hoàn thành** (Ghi nhận kết quả đào tạo, Lưu chứng chỉ vào hồ sơ nhân sự). * Nếu **Không đạt** (Chỉ lưu trạng thái kết quả, không cập nhật chứng chỉ, Hệ thống thông báo ghi nhận kết quả thành công). |
| Luồng sự kiện thay thế (Alternative Flow) | **A1: Ghi nhận kết quả cho nhiều học viên**  1. Tại bước 4, Phòng TCCB có thể chọn nhiều học viên.  2. Hệ thống cho phép ghi nhận kết quả hàng loạt với cùng trạng thái.  3. Tiếp tục bước 5 |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Khóa đào tạo chưa hoàn thành**  1. Tại bước 4, nếu trạng thái khóa đào tạo khác “Đã hoàn thành”.  2. Hệ thống hiển thị thông báo: *“Chỉ có thể ghi nhận kết quả khi khóa đào tạo đã hoàn thành.”*  **E2: Thiếu chứng chỉ khi hoàn thành, Dữ liệu không hợp lệ**  1. Tại bước 8, Hệ thống phát hiện thiếu thông tin bắt buộc hoặc file không đúng định dạng hoặc nếu học viên được đánh dấu “Hoàn thành” nhưng không upload file chứng chỉ (trong trường hợp bắt buộc).  2. Hệ thống hiển thị cảnh báo và yêu cầu bổ sung. |

### 4.47. Use Case: Xem các thông tin trong hồ sơ cá nhân của nhân sự

|  |  |
| --- | --- |
| **Tên use case** | **Xem các thông tin trong hồ sơ cá nhân của nhân sự** |
| Tác nhân chính | Cán bộ/Giảng viên (CBGV) |
| Mục đích (mô tả) | Cho phép CBGV xem toàn bộ thông tin hồ sơ cá nhân của mình đang được lưu trong hệ thống, tra cứu lịch sử hợp đồng, hệ số, bậc lương, các quyết định khen thưởng và kỷ luật của bản thân.. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | CB/GV chọn chức năng “Hồ sơ cá nhân” trên giao diện hệ thống |
| Điều kiện tiên quyết (Precondition) | CB/GV đã đăng nhập. |
| Điều kiện thành công (Post-condition) | Thông tin hồ sơ cá nhân được hiển thị đầy đủ cho CBGV. |
| Điều kiện thất bại | Không thể hiển thị thông tin hồ sơ cá nhân do lỗi hệ thống. |
| Luồng sự kiện chính (Basic Flow) | 1.  CB/GV chọn các mục kích hoạt chức năng xem hồ sơ nhân sự  2.  Hệ thống hiển thị đầy đủ thông tin theo các tab:   * **Tab “Thông tin chung”:** Mã cán bộ,Lý lịch, liên hệ, gia đình, ảnh chân dung \* * **Tab “Trình độ & Chức danh”:** Bằng cấp, chứng chỉ, chức danh khoa học, chức vụ, đơn vị công tác. * **Tab “Thông tin Đảng/ Đoàn”:** Thông tin Đảng/ Đoàn đã được lưu. * **Tab “Lương & Phụ cấp”:** Thông tin về ngạch, bậc, hệ số lương, thông tin ngân hàng \* **Tab “Hợp đồng”:** Thông tin về các loại hợp đồng đã ký * **Tab “Khen thưởng/Kỷ luật”:** Mục khen thưởng/kỷ luật chỉ hiển thị nếu phòng TCCB đã cấu hình cho phép (xem UC 4.37, FEAT 8.9) * **Tab “Công tác”:** Quá trình công tác |
| Luồng sự kiện thay thế (Alternative Flow) | Không có |
| Luồng sự kiện ngoại lệ (Exception Flow) | Không có |

### 4.48. Use Case: Xem thông tin chi tiết đơn vị đang công tác

|  |  |
| --- | --- |
| **Tên use case** | **Xem thông tin chi tiết đơn vị đang công tác** |
| Tác nhân chính | Cán bộ/Giảng viên (CBGV) |
| Mục đích (mô tả) | Cho phép Cán bộ/Giảng viên xem thông tin chi tiết về đơn vị tổ chức mà mình đang công tác trong cơ cấu tổ chức của đơn vị, bao gồm thông tin cơ bản của đơn vị, danh sách chức vụ và nhân sự hiện tại trong đơn vị. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Cán bộ/Giảng viên chọn chức năng xem thông tin đơn vị công tác từ hồ sơ cá nhân hoặc menu liên quan. |
| Điều kiện tiên quyết (Precondition) | Cán bộ/Giảng viên đã đăng nhập hệ thống. Cán bộ/Giảng viên đã được gán đơn vị công tác trong hệ thống. Đơn vị tổ chức đang tồn tại trong cơ cấu tổ chức. |
| Điều kiện thành công (Post-condition) | Thông tin chi tiết của đơn vị công tác được hiển thị đầy đủ và chính xác. Không có thay đổi dữ liệu trong hệ thống (chỉ đọc). |
| Điều kiện thất bại | Không hiển thị được thông tin do lỗi hệ thống hoặc không xác định được đơn vị công tác của CBGV. |
| Luồng sự kiện chính (Basic Flow) | 1. Cán bộ/Giảng viên truy cập chức năng xem thông tin đơn vị công tác.  2. Hệ thống xác định đơn vị mà Cán bộ/Giảng viên đang trực thuộc.  3. Hệ thống hiển thị thông tin chi tiết của đơn vị, bao gồm:   * Tab **“Tổng quan”**, bao gồm: Tên đơn vị, Mã đơn vị, Loại đơn vị, Đơn vị cha, Ngày thành lập, Thông tin liên hệ, Trạng thái hiện tại của đơn vị (Đang hoạt động / Sáp nhập / Giải thể) * Tab **“Nhân sự”**: Hệ thống hiển thị danh sách các nhân sự, Tên chức vụ, hệ thống hiển thị: Họ tên nhân sự, Mã cán bộ, Ngày bắt đầu. Hệ thống hiển thị danh sách nhân sự thuộc đơn vị * Tab **“Đơn vị trực thuộc”**: Hệ thống hiển thị danh sách các đơn vị dưới cấp trực thuộc đơn vị đang xem. |
| Luồng sự kiện thay thế (Alternative Flow) | Không có |
| Luồng sự kiện ngoại lệ (Exception Flow) | Không có |

### 4.49. Use Case: Thay đổi trạng thái đăng ký khóa đào tạo

|  |  |
| --- | --- |
| **Tên use case** | **Thay đổi trạng thái đăng ký khóa đào tạo** |
| Tác nhân chính | Cán bộ/Giảng viên (CBGV) |
| Mục đích (mô tả) | Cho phép Cán bộ/Giảng viên đăng ký hoặc hủy đăng ký tham gia các khóa đào tạo do nhà trường tổ chức đang trong thời gian mở đăng ký, làm cơ sở cho việc quản lý học viên, theo dõi quá trình và ghi nhận kết quả đào tạo. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Cán bộ/Giảng viên chọn menu “Đào tạo”. |
| Điều kiện tiên quyết (Precondition) | Cán bộ/Giảng viên đã đăng nhập hệ thống. Khóa đào tạo tồn tại và đang ở trạng thái **“Đang mở đăng ký”**. Thời điểm hiện tại nằm trong khoảng **Thời gian mở đăng ký**. |
| Điều kiện thành công (Post-condition) | Đăng ký tham gia khóa đào tạo của CBGV được ghi nhận trong hệ thống (trường hợp đăng ký). Bản ghi đăng ký của CBGV được xóa khỏi hệ thống (trường hợp hủy đăng ký). |
| Điều kiện thất bại | Không thể thay đổi trạng thái đăng ký do khóa đào tạo không hợp lệ, hết hạn đăng ký hoặc vi phạm ràng buộc nghiệp vụ. |
| Luồng sự kiện chính (Basic Flow) | 1. Cán bộ/Giảng viên truy cập menu “Đào tạo”.  2. Hệ thống hiển thị danh sách các khóa đào tạo ở trạng thái Đang mở đăng ký.  3. Cán bộ/Giảng viên chọn một khóa đào tạo để xem chi tiết thông tin.  4. Hệ thống hiển thị thông tin chi tiết khóa đào tạo. Nếu CBGV chưa đăng ký, hiển thị nút “Đăng ký tham gia”. Nếu CBGV đã đăng ký (trạng thái tham gia là “Đã đăng ký”), hiển thị nút “Hủy đăng ký”.  5. Cán bộ/Giảng viên nhấn nút “Đăng ký tham gia”.  6. Hệ thống kiểm tra các điều kiện đăng ký (thời gian mở đăng ký, số lượng đăng ký chưa đạt giới hạn, trạng thái khóa đào tạo).  7. Hệ thống tạo bản ghi đăng ký đào tạo và thiết lập trạng thái tham gia là “Đã đăng ký”.  8. Hệ thống thông báo đăng ký thành công cho Cán bộ/Giảng viên. |
| Luồng sự kiện thay thế (Alternative Flow) | **A1: Hủy đăng ký khóa đào tạo**  1. Tại bước 4, CBGV đã đăng ký khóa đào tạo này với trạng thái tham gia “Đã đăng ký”. Hệ thống hiển thị nút “Hủy đăng ký”.  2. Cán bộ/Giảng viên nhấn nút “Hủy đăng ký”.  3. Hệ thống yêu cầu xác nhận hủy đăng ký.  4. Cán bộ/Giảng viên xác nhận.  5. Hệ thống kiểm tra trạng thái tham gia phải là “Đã đăng ký” và khóa đào tạo phải đang ở trạng thái “Đang mở đăng ký”.  6. Hệ thống xóa bản ghi đăng ký đào tạo của CBGV.  7. Hệ thống thông báo hủy đăng ký thành công. |
| Luồng sự kiện ngoại lệ (Exception Flow) | **E1: Hết thời gian đăng ký**  1. Tại bước 4, nếu thời gian hiện tại nằm ngoài khoảng mở đăng ký.  2. Hệ thống ẩn nút “Đăng ký tham gia” và “Hủy đăng ký”, hiển thị thông báo: *“Khóa đào tạo đã hết thời gian đăng ký.”*  **E2: Đã đủ số lượng người tham gia**  1. Tại bước 6, nếu số lượng đăng ký đã đạt giới hạn.  2. Hệ thống hiển thị thông báo: *“Khóa đào tạo đã đủ số lượng đăng ký.”*  **E3: Không thể hủy đăng ký**  1. Tại bước A1.5, nếu trạng thái tham gia không phải “Đã đăng ký” (ví dụ: đã chuyển sang “Đang học” do khóa đào tạo đã bắt đầu) hoặc khóa đào tạo không còn ở trạng thái “Đang mở đăng ký”.  2. Hệ thống hiển thị thông báo: *“Không thể hủy đăng ký do khóa đào tạo đã chuyển sang giai đoạn tiếp theo.”* |

### 4.50. Use Case: Xem danh sách các khóa đào tạo đã đăng ký

|  |  |
| --- | --- |
| **Tên use case** | **Xem danh sách các khóa đào tạo đã đăng ký** |
| Tác nhân chính | Cán bộ/Giảng viên (CBGV) |
| Mục đích (mô tả) | Cho phép Cán bộ/Giảng viên xem danh sách tất cả các khóa đào tạo mà mình đã đăng ký tham gia, theo dõi trạng thái tham gia và kết quả đào tạo của từng khóa (Đang học, Hoàn thành, Không đạt), phục vụ việc tra cứu, theo dõi quá trình học tập và kết quả đào tạo cá nhân. |
| Mức độ ưu tiên (Priority) | Bắt buộc |
| Điều kiện kích hoạt (Trigger) | Chọn menu “Đào tạo” |
| Điều kiện tiên quyết (Precondition) | Cán bộ/Giảng viên đã đăng nhập hệ thống. Cán bộ/Giảng viên đã từng đăng ký ít nhất một khóa đào tạo |
| Điều kiện thành công (Post-condition) | Danh sách các khóa đào tạo đã đăng ký của Cán bộ/Giảng viên được hiển thị đầy đủ và chính xác. Trạng thái tham gia và kết quả đào tạo của từng khóa được hiển thị đúng theo dữ liệu do Phòng TCCB ghi nhận. |
| Điều kiện thất bại | Không hiển thị được danh sách do lỗi hệ thống hoặc dữ liệu không tồn tại. |
| Luồng sự kiện chính (Basic Flow) | 1. Cán bộ/Giảng viên truy cập chức năng **“Khóa đào tạo đã đăng ký”**.  2. Hệ thống truy xuất danh sách các khóa đào tạo mà Cán bộ/Giảng viên đã đăng ký. 3. Hệ thống hiển thị danh sách khóa đào tạo, bao gồm các thông tin:   * Tên khóa đào tạo * Loại khóa đào tạo * Thời gian đào tạo (từ ngày – đến ngày) * Đơn vị/địa điểm tổ chức * Trạng thái khóa đào tạo (Đang mở đăng ký / Đang đào tạo / Đã hoàn thành) * Trạng thái tham gia của cá nhân (Đã đăng ký, Đang học, Hoàn thành, Không đạt) |
| Luồng sự kiện thay thế (Alternative Flow) | Không có |
| Luồng sự kiện ngoại lệ (Exception Flow) | Không có |
