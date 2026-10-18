LINGUACITY — 01. REQUIREMENTS & ARCHITECTURE REPORT (SRS)
Tên dự án: LinguaCity (Thành phố Ngôn ngữ)

Loại dự án: Ứng dụng Mobile EdTech & Gamification (Học TOEIC)

Định hướng phát triển: Iterative / Agile-oriented (Phát triển lặp có mục tiêu)

Phạm vi tài liệu: Software Requirements Specification (SRS) & Architecture Decisions — Phiên bản MVP

Người thực hiện: Nông Hoàng Anh

Ngày chốt tài liệu: 19/08/2026

1. LỜI MỞ ĐẦU & TẦM NHÌN SẢN PHẨM
1.1. Bối cảnh dự án
Việc học từ vựng và ngữ pháp TOEIC truyền thống thường mang tính lặp lại và dễ gây nhàm chán. Mặc dù gamification (game hóa) đã được áp dụng ở nhiều ứng dụng (như Duolingo), nhưng chúng thường dừng lại ở việc "tích điểm, đua top".

LinguaCity được định hướng xa hơn: Xây dựng một Learning Game thực thụ, nơi kết quả học tập được liên kết trực tiếp với quá trình quy hoạch và phát triển một thành phố ảo.

1.2. Triết lý thiết kế (Product Principle)
Nguyên tắc cốt lõi lớn nhất của LinguaCity được xác định như sau:

"Tiến bộ học tập trực tiếp quyết định tiến bộ của thành phố."

Điều này có nghĩa là Vòng lặp Học tập (Learning Loop) và Vòng lặp Thành phố (City Loop) không tồn tại độc lập mà phải giao nhau tại một "nút thắt" bắt buộc. Người chơi không thể chỉ cày game mà bỏ học, và ngược lại.

2. NHỮNG BÀI HỌC VÀ QUYẾT ĐỊNH KIẾN TRÚC CỐT LÕI
Trong quá trình phân tích yêu cầu ban đầu, một số điểm yếu trong thiết kế truyền thống được nhận diện, từ đó dẫn đến các quyết định thay đổi kiến trúc quan trọng cho dự án.

2.1. Kiến trúc Mobile: Clean Architecture & MVI
Quyết định: Sử dụng Clean Architecture (chia 3 tầng Data - Domain - Presentation) kết hợp mô hình State Management là MVI (Model-View-Intent) và StateFlow.

Lý do & Bài học: Với một ứng dụng có logic phức tạp đan xen giữa game (tiền tệ, đếm ngược thời gian) và học tập (đúng/sai, flashcard), nếu dùng MVVM truyền thống, các State rời rạc sẽ rất dễ gây lỗi UI. MVI gom toàn bộ trạng thái thành phố vào một Data Class duy nhất (Single Source of Truth cho UI), giúp luồng dữ liệu một chiều (Unidirectional Data Flow) trở nên an toàn tuyệt đối.

2.2. Dependency Injection: Hilt thay vì Koin
Quyết định: Sử dụng Hilt làm công cụ tiêm phụ thuộc (DI).

Lý do: Dù Koin cấu hình nhanh hơn, nhưng Clean Architecture chia dự án thành rất nhiều Module. Hilt cung cấp Compile-time safety (báo lỗi ngay lúc gõ code/build) thay vì Crash lúc Runtime như Koin. Điều này giúp giảm đáng kể thời gian phát hiện và xử lý lỗi.

2.3. JSON Serialization: Tối ưu với Kotlinx Serialization
Quyết định: Dùng Kotlinx Serialization để map API thay vì Gson/Moshi.

Lý do: Đây là thư viện "con đẻ" của Kotlin, an toàn tuyệt đối với Null-safety và hoạt động hoàn hảo với TypeConverter của Room Database để lưu trữ các mảng JSON cục bộ. Mọi API Content từ Backend trả về (như mảng examples) phải là chuẩn JSON Array, tuyệt đối không trả về JSON String để giảm tải việc deserialize hai lần ở Mobile.

Offline Read-Only + Online Gameplay

Future:
Offline Learning + Sync

Cách hoạt động MVP:
Retrofit (Backend) ➔ Repository ➔ Room Database ➔ UI (Compose)

Bài học rút ra: Khái niệm "Local Wins" ban đầu khá mơ hồ và có thể gây xung đột. Việc quy định Room là nguồn sự thật duy nhất (Single Source of Truth) giúp app hoạt động mượt mà ngay cả khi rớt mạng. Không được thay đổi dữ liệu, chỉ được đọc flashcard.

3. THIẾT KẾ MÔ HÌNH DỮ LIỆU (DATA MODELING)
Đây là một trong những thay đổi quan trọng nhất trong quá trình phân tích dự án: chuyển từ một thiết kế "đóng cứng" sang một hệ thống có tính mở rộng (Scalability) cao.

3.1. Sự tiến hóa của bảng Từ vựng (Vocabulary)
Thiết kế sai lầm ban đầu: Nhét mọi thứ vào bảng Vocabulary (reading_question, listening_audio, writing_prompt...). Điều này khiến Database bị phình to nếu 1 từ có nhiều câu hỏi.

Thiết kế hiện tại (Centralized Question Bank): Tách biệt hoàn toàn Vocabulary (Nội dung tĩnh) và Question (Câu hỏi).

Vocabulary: Chứa id, word, meaning, ipa, theme_id, level.

Question: Chứa id, content_type (VOCABULARY/GRAMMAR), skill (READING, LISTENING...), question_type, answer.

Liên kết: Một từ vựng có thể liên kết với nhiều câu hỏi ở nhiều kỹ năng khác nhau thông qua bảng trung gian. Mô hình này giúp LinguaCity sẵn sàng scale lên hàng chục ngàn câu hỏi trong tương lai mà không phải đập đi xây lại Schema.

3.2. Công trình = Theme (Không phải Skill)
Quyết định: 4 công trình không khóa cứng vào 4 kỹ năng (Nghe, Nói, Đọc, Viết) mà quyết định CHỦ ĐỀ (Theme) học tập.

🏠 Housing (Nhà ở): Từ vựng chủ đề Daily Life, House.

🛣️ Road (Đường xá): Chủ đề Transportation, Vehicles.

🌳 Park (Công viên): Chủ đề Environment, Social.

🏫 School (Trường học): Chủ đề Education.

Mọi công trình đều có thể tung ra các bài tập đa dạng. Tuy nhiên, ở phiên bản MVP, để đảm bảo tiến độ, hệ thống sẽ chỉ focus vào 2 kỹ năng: Reading (Đọc) và Writing (Viết) dạng trắc nghiệm/điền từ.

3.3. Trường học (School) - Trung tâm khảo thí
Trường học vừa là một công trình theo Theme Education, vừa tích hợp thêm chức năng Exam Center. Đây là nơi tổng hợp danh sách các Bài Test nâng cấp cho toàn bộ các công trình khác trong thành phố.

4. CORE GAME MECHANICS (CƠ CHẾ CỐT LÕI)
4.1. Vòng lặp kép (Core Loop)
Vòng lặp được thiết kế chặt chẽ, nối liền mạch giữa học tập và xây dựng:

Học tập (Learn): Học từ vựng của công trình hiện tại.

Đạt điều kiện (Mastery 100%): Hoàn thành đủ tiến độ yêu cầu.

Mở khóa (Unlock): Bài Test sát hạch tại School sáng lên.

Thi sát hạch (Pass Test): Hoàn thành bài thi để nhận Blueprint (Bản vẽ). Nếu Fail, tiến độ từ vựng được giữ nguyên, người chơi có thể ôn và thi lại.

Xây dựng (Build/Upgrade): Dùng Blueprint + Knowledge Points để nâng cấp công trình, mở khóa Level từ vựng tiếp theo.

4.2. Hệ thống Tài nguyên & Kinh tế
Chỉ quản lý 3 loại tài nguyên (lưu trực tiếp trong bảng UserProfile để tối giản Database):

Knowledge Points (Điểm Tri Thức): Tiền tệ chính. Cách kiếm: Thu hoạch thụ động từ Nhà ở (Housing) và chủ động làm các bài tập ngẫu nhiên.

Hourglass (Đồng hồ cát): Dùng để tua nhanh thời gian xây nhà.

Blueprint (Bản vẽ): Item nút thắt. Chỉ rơi ra khi Pass Bài Test.

4.3. Sự kiện Thành phố (City Events)
Bài tập Ngữ pháp (Grammar) được tách ra khỏi luồng chính. Nó sẽ xuất hiện dưới dạng các dấu chấm than (!) trên bản đồ (Ví dụ: Giúp người dân điền đúng thì ngữ pháp). Trả lời đúng nhận Knowledge Points.

5. PHẠM VI MVP & YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENTS)
Để đảm bảo dự án cá nhân hoàn thành đúng hạn, Scope của phiên bản MVP (Minimum Viable Product) được giới hạn cứng như sau:

5.1. Hệ thống User & Xác thực (Authentication)
Yêu cầu: Ứng dụng hoạt động ngay lập tức mà không bắt buộc đăng nhập.

Giải pháp: Bỏ qua JWT/Login Email ở MVP. Khi mở app lần đầu, tạo một UUID Guest ở Local và đồng bộ ID này lên Spring Boot. Việc này tạo đường lùi hoàn hảo để làm tính năng "Link Real Account" sau này mà không vướng rắc rối về quyền device.

5.2. Chức năng Học tập & Sát hạch
Backend cung cấp API trả về list từ vựng (phân loại theo Theme và Level).

Room lưu trữ cục bộ.

Cho phép người dùng thực hiện bài Quiz Đọc/Viết.

Theo dõi Progress của từ vựng (Chưa cần thuật toán Spaced Repetition phức tạp, chỉ cần tính % hoàn thành).

5.3. Chức năng Thành phố
Hiển thị UI danh sách 4 công trình.

Tính toán thời gian sinh Knowledge Points thụ động.

Cơ chế tiêu thụ Blueprint để Level Up công trình.

6. DEFINITION OF DONE (TIÊU CHÍ NGHIỆM THU MVP)
Dự án MVP được coi là bảo vệ thành công khi thỏa mãn chuỗi checklist sau:

[ ] Khởi tạo Guest User bằng UUID thành công.

[ ] Mobile gọi Spring Boot API để nạp Vocabulary vào Room Database.

[ ] Hoạt động học Flashcard/Quiz có thể thực hiện 100% Offline.

[ ] Khi Collection của Level đạt đủ số Card yêu cầu (ví dụ 40/40), bài Test tại School được Unlock.

[ ] Pass bài Test, User nhận được Blueprint.

[ ] Dùng Blueprint và Resource để nâng cấp Building thành công.

[ ] App có khả năng đồng bộ (Sync) dữ liệu Local (User Profile, Building Level, Progress) ngược lên Spring Boot.

7. KẾ HOẠCH BƯỚC TIẾP THEO (NEXT STEPS)
Sau khi tài liệu SRS và Architecture này được chốt cứng, dự án sẽ tiến vào Giai đoạn Thiết kế Giao diện (System Design & UI/UX).

Quy tắc: Tuyệt đối không viết code Jetpack Compose khi chưa có bản vẽ.

Nhiệm vụ tiếp theo: Phác thảo Wireframe/Figma cho các màn hình cốt lõi: (1) Splash Screen/Sync, (2) Home/City View, (3) Building Detail, (4) Vocabulary Learning, (5) School Exam Center.

---

# APPENDIX C — TIẾN ĐỘ DỰ ÁN SAU KHI HOÀN THÀNH REQUIREMENTS BASELINE

## C.1. Trạng thái 6 giai đoạn

| Giai đoạn | Trạng thái | Ghi chú |
|---|---|---|
| 01. Requirements Analysis | **Đã chốt MVP** | SRS, Core Loop, Functional Requirements, DoD đã được cập nhật theo Vocabulary Card System |
| 02. System Design | **Đang thực hiện** | Đã freeze Data Dictionary, Static/Player State, ERD logic và Card learning concept; tiếp theo là Data Flow/Sequence Diagram và API/Mobile design |
| 03. Implementation | **Prototype đang có** | Backend đã có UserProfile, Building, Vocabulary, UserVocabularyProgress và Repository/Controller tương ứng; Mobile đã setup kiến trúc nhưng chưa hoàn thiện Room/Retrofit |
| 04. Testing | **Chưa bắt đầu chính thức** | Chưa có Test Plan/Test Case hoàn chỉnh |
| 05. Deployment | **Chưa bắt đầu** | Môi trường localhost/development đã tồn tại, production chưa triển khai |
| 06. Maintenance & Evolution | **Chưa bắt đầu** | Chỉ mới xác định Future Scope |

## C.2. Các quyết định kiến trúc đã freeze

- Iterative / Agile-oriented.
- Clean Architecture.
- MVI + StateFlow.
- Hilt.
- Kotlinx Serialization.
- Room-first / Mobile SSOT.
- Guest UUID.
- Server-authoritative validation cho gameplay-critical state.
- Static Content và Player State tách biệt.
- Building → Theme → Vocabulary.
- Vocabulary → Question thông qua `QuestionVocabulary`.
- Exam ↔ Question thông qua `ExamQuestion`.
- Question dùng `metadata` JSONB cho payload đặc thù của Mini-game.
- Vocabulary Card là đơn vị thu thập.
- `UserVocabProgress` là trạng thái Card của từng User.
- Collection và Mastery là hai chỉ số độc lập.
- Đúng `+1`, sai `-1`, Mastery bị chặn trong `0..max_mastery`.
- Mỗi Difficulty Rank có `max_mastery` riêng.
- Weight xuất hiện được tính động và có recent-use penalty.
- Collection đủ Card của Level là điều kiện Unlock Exam.

## C.3. Bước tiếp theo của Giai đoạn 2

Sau khi Data Dictionary và ERD logic được freeze, tiến trình tiếp tục theo:

```text
2.2 ERD + Constraints
        ↓
2.3 Data Flow & Sequence Diagrams
        ↓
2.4 PostgreSQL / JPA Target Schema
        ↓
2.5 API Contract
        ↓
2.6 Room Schema + DAO
        ↓
2.7 Repository + Sync Design
        ↓
2.8 MVI + Navigation Design
        ↓
2.9 UI/UX Wireframe
        ↓
Freeze 02_System_Design.md
```
