# BÁO CÁO CHIẾN LƯỢC KIẾN TRÚC: HOẠCH ĐỊNH TẦM NHÌN MỞ RỘNG (FUTURE EXPANSION ROADMAP)

**Dự án:** LinguaCity Platform
**Loại tài liệu:** Báo cáo Quyết định Kiến trúc & Định hướng Tương lai (Architectural Decision & Future Vision)
**Tác giả:** Nông Hoàng Anh
**Triết lý cốt lõi:** *"Architectural Foresight without Premature Implementation"* (Hoạch định tương lai từ bây giờ - Chỉ lập trình đúng phạm vi hiện tại để tránh phức tạp hóa kiến trúc quá sớm).

---

## 1. BỐI CẢNH & ĐỊNH HƯỚNG TIẾN HÓA SẢN PHẨM

Tài liệu này ghi lại những phân tích kiến trúc chiến lược nhằm chuẩn bị cho việc tiến hóa hệ thống **LinguaCity** trong tương lai:
*   **Hiện tại (MVP Baseline):** Một tựa game học từ vựng đơn luồng, tập trung vào trải nghiệm cục bộ của một người chơi duy nhất dưới vai trò khách (**Guest User**).
*   **Tương lai (Platform Expansion):** Chuyển mình thành một **Nền tảng học tập kết hợp Trò chơi (Learning Platform + Game)**. Hệ thống sẽ hỗ trợ mô hình đa lớp học, đa trường học (**Multi-tenant**), cho phép Giáo viên (**Teacher**) tự soạn bài giảng, giao bài tập về nhà cho Học sinh (**Student**) và theo dõi tiến độ của học sinh trực quan qua sự phát triển của thành phố ảo.

Đây là một hướng mở rộng vô cùng giá trị để đưa vào Portfolio tuyển dụng vì nó chứng minh năng lực thiết kế hệ thống lớn: tích hợp Spring Security (JWT, OAuth2), phân quyền theo Role, cô lập dữ liệu người dùng (Data Isolation), và thiết kế hệ thống quản lý học tập (LMS).

---

## 2. BA QUYẾT ĐỊNH KIẾN TRÚC "CHỪA ĐƯỜNG" TRONG BẢN MVP

Để đảm bảo hệ thống tương lai dễ dàng tích hợp thêm các phân vùng Platform mà không phải đập đi xây lại toàn bộ game engine cốt lõi, MVP cần thiết lập ngay **3 nguyên tắc thiết kế mở** sau đây:

### Quyết định 1: Tách biệt tuyệt đối giữa "UserProfile" và "Identity"
*   **Vấn đề:** Khi nghĩ về tài khoản, lập trình viên thường vội vàng nhét các trường định danh như Email, Password, Role (GUEST, STUDENT, TEACHER) vào thẳng bảng lưu trữ trạng thái game (`UserProfile`).
*   **Quyết định kiến trúc:** 
    *   Giữ bảng `UserProfile` của MVP cực kỳ thuần khiết (chỉ lưu ID, điểm Knowledge, mảnh bản vẽ). ID của UserProfile hiện tại được gán bằng UUID sinh ra từ thiết bị.
    *   **Không thêm trường Role vào UserProfile ở MVP.** Khi chưa có Authentication, việc thêm các trường phòng xa này chỉ làm tăng độ phức tạp không đáng có.
    *   *Đường lùi tương lai:* Khi hệ thống tích hợp Auth, bảng `Identity` (lưu Account, Email, JWT) sẽ được sinh ra riêng biệt và liên kết 1-1 với `UserProfile` qua khóa ngoại. Game Engine hoàn toàn không cần quan tâm người dùng đăng nhập bằng phương thức nào.

### Quyết định 2: Tách biệt khái niệm "Guest User" và "Registered User"
*   **Vấn đề:** Xem Guest và Đăng nhập viên là cùng một thực thể dẫn đến việc thiết kế database bị hỗn loạn các trường nullable (như email có lúc null lúc không).
*   **Quyết định kiến trúc:**
    *   Xác định rõ ràng: **Guest và Registered User là hai khái niệm khác nhau.**
    *   `Guest` chỉ sở hữu duy nhất thiết bị (Device UUID), không đăng nhập, dữ liệu game lưu tại Server theo UUID.
    *   `Registered User` (Student, Teacher, Admin) sở hữu tài khoản định danh (Email/Password hoặc mạng xã hội Google/Facebook), có quyền sở hữu lớp học hoặc tham gia làm thành viên lớp học.
    *   Tách biệt này giúp tầng API Gateway tương lai dễ dàng điều hướng và áp dụng các Filter bảo mật riêng biệt cho từng đối tượng.

### Quyết định 3: Thiết kế cấu trúc dữ liệu hướng "Scope" (Phạm vi sở hữu)
*   **Vấn đề:** Trong tương lai, giáo viên lớp A biên soạn bài tập thì học sinh lớp B không được xem, và giáo viên lớp B không có quyền chỉnh sửa.
*   **Quyết định kiến trúc:**
    *   Nhờ thiết kế tách biệt rất tốt của bản v4: Từ vựng (`Vocabulary`) và Câu hỏi (`Question`) đã được bẻ gãy mối quan hệ cứng thông qua bảng trung gian `QuestionVocabulary`.
    *   *Đường lùi tương lai:* Để hỗ trợ Giáo viên tự biên soạn nội dung, ta chỉ cần mở rộng bảng dữ liệu bằng việc thêm 2 trường cấu hình:
        *   `owner_id`: ID của tài khoản tạo nội dung (null nếu là từ vựng mặc định của hệ thống).
        *   `visibility`: Trạng thái hiển thị (`SYSTEM` - toàn hệ thống, `CLASS_ONLY` - chỉ trong lớp học cụ thể, `PRIVATE` - cá nhân giáo viên).
    *   Thiết kế MVP hiện tại hoàn toàn tương thích và dễ dàng thêm 2 trường này sau này mà không làm hỏng cấu trúc câu hỏi phức tạp đã thiết kế.

---

## 3. LỘ TRÌNH TRIỂN KHAI PHÂN TÁCH LÁT CẮT DỌC (VERTICAL SLICES)

Để kiểm soát rủi ro và đảm bảo sản phẩm luôn chạy được qua từng giai đoạn học tập, toàn bộ dự án được phân chia thành 2 giai đoạn rõ rệt:

### Giai đoạn 1: Baseline MVP (Game Lõi - Chạy Online)
Tập trung 100% tài nguyên để hoàn thành 5 lát cắt dọc chạy thông suốt từ Android Compose đến PostgreSQL Server:
*   **VS1:** Khởi tạo người chơi cục bộ và Server Authority (Guest Onboarding).
*   **VS2:** Tải và cache dữ liệu tĩnh ngoại tuyến (Static Content Cache).
*   **VS3:** Vòng lặp học tập từ vựng, chấm điểm tại Server (Learning Loop).
*   **VS4:** Sát hạch kiểm tra năng lực để mở khóa phần thưởng (Exam Submit).
*   **VS5:** Sử dụng tài nguyên để nâng cấp thế giới ảo (Building Upgrade).

### Giai đoạn 2: Platform Expansion (Sau khi MVP đã chạy ổn định)
Mỗi tính năng mở rộng tiếp tục được đóng gói thành một Lát cắt dọc độc lập:
*   **VS6:** Tích hợp Spring Security & JWT Token (Authentication).
*   **VS7:** Phân quyền API và Method-level Security theo Role Student/Teacher (Authorization).
*   **VS8:** Thiết lập cấu trúc máy chủ ảo/Trường học (Tenant/Server Management).
*   **VS9:** Quản lý Lớp học và thành viên tham gia (Course & Class Management).
*   **VS10:** Giáo viên tự biên soạn thẻ từ vựng và câu hỏi bài tập (Teacher Content Authoring).
*   **VS11:** Giao bài tập về nhà và đặt hạn nộp (Assignment & Deadline).
*   **VS12:** Học sinh làm bài tập lớp và đồng bộ tiến độ thành phố (Student Learning Loop).
*   **VS13:** Báo cáo phân tích học tập trực quan cho Giáo viên (Teacher Analytics Dashboard).

---

## 4. HƯỚNG DẪN BIỂU DIỄN TẦM NHÌN TRÊN ENTERPRISE ARCHITECT (EA)

Để thể hiện xuất sắc tư duy quy hoạch hệ thống trên công cụ Enterprise Architect mà không làm loãng thiết kế của phiên bản MVP đang code, bạn áp dụng phương pháp sau:

1.  **Tách biệt Package:** Tạo một Package hoàn toàn độc lập đặt tên là `07_Future_Expansion` trong Project Browser.
2.  **Chỉ vẽ sơ đồ Concept:** Trong package này, bạn có thể tự do phác thảo:
    *   *Domain Concept Diagram:* Thể hiện sự liên kết tương lai giữa các thực thể `Class`, `Course`, `Lesson`, `Assignment` với các bảng game cốt lõi của MVP.
    *   *Subsystem Component Diagram:* Mô tả 4 phân vùng tách biệt (Identity, Tenant, Educational Content, Game Engine) để chứng minh khả năng Module hóa.
3.  **Tuyệt đối không trộn lẫn:** Không kéo các Actor tương lai như `Teacher`, `Student` vào sơ đồ Use Case lõi của MVP. Không tạo các bảng vật lý như `classes` hay `assignments` trong cơ sở dữ liệu PostgreSQL thực tế của Giai đoạn 1.

**Ý nghĩa phương pháp:** Việc tổ chức này là minh chứng trực quan mạnh mẽ nhất trong Portfolio của bạn về sự cân bằng hoàn hảo giữa tính thực tế (**YAGNI** - chỉ làm những gì cần thiết ở hiện tại) và tầm nhìn kiến trúc dài hạn (**Architectural Foresight** - luôn suy nghĩ và chừa đường cho sự phát triển của hệ thống).

---

## 5. MỞ RỘNG NỀN TẢNG WEB (BỔ SUNG 20/10/2026)

Định hướng mới: sau khi MVP mobile ổn định, phát triển thêm **Web** để (1) theo dõi tiến độ học tập và (2) xây dựng cộng đồng người học.

### 5.1. Nguyên tắc
*   **Web là một client mới của cùng Backend REST**, không phải hệ thống riêng. Backend vẫn là Server Authority.
*   **Điều kiện tiên quyết:** VS6 (Authentication). Web không thể dùng Guest UUID của thiết bị → cần tài khoản đăng ký và **Account Linking** (gắn Guest UUID hiện có vào tài khoản mới để không mất tiến trình).
*   **Không làm Web trong Giai đoạn 1.** Không tạo bảng, API hay project web nào trước khi MVP đạt Definition of Done.

### 5.2. Lựa chọn công nghệ dự kiến (chưa chốt — ghi ADR khi bắt đầu)
| Thành phần | Đề xuất | Ghi chú |
| :--- | :--- | :--- |
| Web Dashboard | React / Next.js (TypeScript) | Gọi REST API sẵn có; biểu đồ tiến độ |
| Xác thực | Spring Security + JWT (VS6) | Dùng chung cho Mobile và Web |
| Cộng đồng | ⬜ Bảng tin, bình luận, xếp hạng theo lớp/nhóm | Domain mới `community` — tách package riêng ở Backend |
| Thành phố trên Web | ⬜ Tùy chọn: Unity WebGL dùng lại scene City | Chỉ cân nhắc nếu ADR-009 được Accepted |

### 5.3. Lát cắt dọc bổ sung (sau VS13)
*   **VS14:** Account Linking — gắn Guest UUID vào tài khoản đăng ký.
*   **VS15:** Web Dashboard theo dõi tiến độ cá nhân (đọc dữ liệu, không ghi).
*   **VS16:** Cộng đồng — hồ sơ công khai, bảng xếp hạng, chia sẻ thành phố.

### 5.4. Ảnh hưởng tới thiết kế MVP hiện tại
*   Giữ API trả **DTO độc lập nền tảng** (không có trường riêng cho Android) để Web dùng lại được.
*   Giữ quy tắc "Unity không gọi API" (ADR-009) — nhờ vậy logic không bị phân tán khi có thêm Web.

---

## 6. GHI CHÚ MỞ RỘNG TỪ KẾ HOẠCH VS2/VS3 (08/11/2026)

Các mục dưới đây đã được người dùng yêu cầu **ghi lại để làm sau**. MVP đang dùng bản đơn giản.

| # | Chủ đề | Hiện tại (MVP) | Hướng mở rộng |
| :--- | :--- | :--- | :--- |
| 1 | **Thuật toán chọn từ** | Chưa sưu tầm → Mastery thấp; bỏ từ vừa ôn 10 phút; xáo ngẫu nhiên (ADR-013) | Trọng số theo độ khó, Mastery, độ "nguội" của từ; hoặc Spaced Repetition (SM-2/FSRS). Cần thêm cột `interval`, `ease`, `due_at` vào `user_vocab_progress` |
| 2 | **AI chấm câu điền từ** | `trim` + không phân biệt hoa/thường + `accepted_answers` | Server gọi mô hình ngôn ngữ cho câu không khớp chính xác (sai chính tả nhẹ, số nhiều, đồng nghĩa) → `CORRECT / NEARLY / WRONG` + lý do. Server vẫn là nơi quyết định (Server Authority); cần cache kết quả và giới hạn chi phí |
| 3 | **AI viết phản hồi / giải thích** | `explanation` soạn sẵn theo giọng tự nhiên + câu mở đầu ngẫu nhiên của thư ký | Mô hình ngôn ngữ viết giải thích **theo đúng câu trả lời sai** của người chơi (vì sao "deposit" không hợp ở đây) |
| 4 | **Lớp học / giáo viên / AI tạo nội dung** | Gói nội dung `scope = 'GLOBAL'`, tải kiểu pull (ADR-012) | Mỗi thành phố là một lớp: `scope` = mã lớp. Giáo viên (có AI hỗ trợ) tạo câu hỏi, tìm nội dung, xếp câu vào công trình/Level, hoặc tạo bài kiểm tra → tăng `version` của gói → **FCM push** "có bài mới" → app pull. WebSocket chỉ khi cần chat lớp hoặc thi đấu real-time |
| 5 | **Nội thất** | House có nội thất 3D (nhà trống, chọn tường/sàn) | Nội thất 3D cho Road/Park/School; đồ nội thất đặt được, mở bằng KP/danh hiệu |
| 6 | **Nội dung** | Chỉ seed House Level 1 (30 từ) | Seed Road (Transportation, Vehicles), Park (Environment, Social), School (Education), các Level 2–3 |
| 7 | **Migration** | SQL viết tay chạy bằng `psql`, `ddl-auto=update` | Flyway để migration tự chạy khi khởi động (tránh lệch schema như TC-VS1-13) |
