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

2.4. Chiến lược Offline-first: Single Source of Truth
Quyết định: Áp dụng mô hình Room-first. UI tuyệt đối không đọc dữ liệu trực tiếp từ Retrofit (Mạng).

Cách hoạt động MVP:
Retrofit (Backend) ➔ Repository ➔ Room Database ➔ UI (Compose)

Bài học rút ra: Khái niệm "Local Wins" ban đầu khá mơ hồ và có thể gây xung đột. Việc quy định Room là nguồn sự thật duy nhất (Single Source of Truth) giúp app hoạt động mượt mà ngay cả khi rớt mạng. Dữ liệu thay đổi ở Local sẽ được Push lên Backend khi có mạng.

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

[ ] Khi Progress của một Building đạt 100%, bài Test tại School được Unlock.

[ ] Pass bài Test, User nhận được Blueprint.

[ ] Dùng Blueprint và Resource để nâng cấp Building thành công.

[ ] App có khả năng đồng bộ (Sync) dữ liệu Local (User Profile, Building Level, Progress) ngược lên Spring Boot.

7. KẾ HOẠCH BƯỚC TIẾP THEO (NEXT STEPS)
Sau khi tài liệu SRS và Architecture này được chốt cứng, dự án sẽ tiến vào Giai đoạn Thiết kế Giao diện (System Design & UI/UX).

Quy tắc: Tuyệt đối không viết code Jetpack Compose khi chưa có bản vẽ.

Nhiệm vụ tiếp theo: Phác thảo Wireframe/Figma cho các màn hình cốt lõi: (1) Splash Screen/Sync, (2) Home/City View, (3) Building Detail, (4) Vocabulary Learning, (5) School Exam Center.

# 18. CÔNG NGHỆ VÀ LÝ DO LỰA CHỌN

## 18.1. Mobile Tech Stack

### Kotlin + Jetpack Compose

Kotlin được lựa chọn làm ngôn ngữ chính cho Android vì phù hợp với hệ sinh thái Android hiện đại, hỗ trợ tốt null-safety, coroutines, data classes và các abstraction cần thiết cho ứng dụng có state phức tạp.

Jetpack Compose được lựa chọn để xây dựng UI theo hướng declarative, thuận lợi cho việc phản ánh state từ MVI lên giao diện và giảm lượng mã UI imperative.

### Clean Architecture

Clean Architecture được sử dụng để phân tách trách nhiệm thành các tầng Data, Domain và Presentation.

Lý do lựa chọn:

- Giảm coupling giữa UI, business logic, database và network.
- Cho phép thay đổi Room hoặc Retrofit mà hạn chế ảnh hưởng tới Domain.
- Tạo cấu trúc phù hợp với Repository, UseCase và ViewModel/MVI.

### MVI + StateFlow thay vì MVVM

MVI được lựa chọn thay vì MVVM truyền thống vì LinguaCity có đồng thời nhiều nhóm state: tài nguyên, timer, vocabulary progress, trạng thái khóa/mở khóa, quiz result và reward.

Trong cách tổ chức MVVM truyền thống, nếu state của các nhóm này bị phân tán thành nhiều biến/observable riêng lẻ, các màn hình vừa mang logic game vừa mang logic học tập có thể dễ phát sinh trạng thái không đồng bộ.

MVI tập trung state của một màn hình vào một mô hình trạng thái thống nhất và sử dụng Unidirectional Data Flow. StateFlow cung cấp một luồng state có thể quan sát ổn định cho Compose.

**Quyết định:** MVI + StateFlow được dùng để tạo Single Source of Truth cho UI, giúp kiểm soát state và giảm lỗi UI rời rạc trong các màn hình có gameplay phức tạp.

### Hilt thay vì Koin

Koin có ưu điểm là cấu hình nhanh và ít boilerplate. Tuy nhiên, Hilt được lựa chọn vì tích hợp chặt với hệ sinh thái Android và hỗ trợ kiểm tra dependency ở thời điểm compile/build.

Với Clean Architecture gồm nhiều module Data, Domain, Presentation và DI, việc phát hiện dependency thiếu hoặc sai ngay từ quá trình build giúp giảm nguy cơ lỗi chỉ xuất hiện khi ứng dụng chạy.

**Quyết định:** Hilt được ưu tiên nhờ khả năng phát hiện lỗi dependency sớm và phù hợp với cấu trúc nhiều tầng của dự án.

### Kotlinx Serialization thay vì Gson/Moshi

Kotlinx Serialization được lựa chọn vì tích hợp trực tiếp với Kotlin và biểu diễn tốt các kiểu dữ liệu Kotlin như `List<String>`, nullable types và data classes.

Đặc biệt, cấu trúc `examples` của Vocabulary cần được truyền qua API dưới dạng JSON Array. Kotlinx Serialization cho phép ánh xạ trực tiếp về `List<String>` ở DTO, sau đó dùng TypeConverter để serialize khi lưu vào Room.

Điều này giúp tránh việc Backend trả JSON String lồng trong JSON và buộc Mobile phải deserialize hai lần.

So với việc lựa chọn Gson/Moshi, lợi thế chính trong phạm vi dự án này là mức độ tích hợp tự nhiên với Kotlin và luồng dữ liệu Kotlinx Serialization → DTO → Room TypeConverter.

**Quyết định:** API trả `examples` dưới dạng JSON Array; Mobile nhận thành `List<String>` và chỉ serialize thành JSON String ở lớp persistence nếu Room yêu cầu.

### Room

Room là Local Database của Mobile và là thành phần cốt lõi của chiến lược Offline-first.

Room đảm nhiệm:

- Lưu Vocabulary đã tải.
- Lưu Player Progress.
- Lưu Player State cần thiết cho trải nghiệm offline.
- Cung cấp dữ liệu cho Repository/UI thông qua Flow.

### Retrofit + OkHttp

Retrofit đảm nhiệm việc giao tiếp với REST API Spring Boot. OkHttp xử lý HTTP layer và các cấu hình network cần thiết.

UI không gọi Retrofit trực tiếp; network được điều phối thông qua Repository.

### Compose Navigation Type-Safe

Navigation Type-Safe được lựa chọn thay cho việc truyền String Route thủ công để giảm lỗi route và tăng tính an toàn khi truyền dữ liệu giữa các màn hình.

### Tóm tắt trách nhiệm của Mobile Stack

```text
Kotlin + Compose
        ↓
MVI + StateFlow
        ↓
Clean Architecture
   ↙            ↘
Room           Retrofit
   ↘            ↙
       Repository
           ↓
      Spring Boot API
```

Hilt đảm nhiệm Dependency Injection; Kotlinx Serialization đảm nhiệm JSON mapping/serialization; Room đảm nhiệm Local Persistence; Retrofit/OkHttp đảm nhiệm Network Communication.



---

# APPENDIX A — BÀI HỌC RÚT RA VÀ QUYẾT ĐỊNH KIẾN TRÚC

## A.1. Không khóa cứng yêu cầu quá sớm

Việc sử dụng Iterative / Agile-oriented thay vì Waterfall thuần túy xuất phát từ đặc thù của dự án: UI, API, Database và Gameplay có thể cần điều chỉnh sau khi prototype được kiểm chứng.

**Bài học:** Freeze các nguyên tắc cốt lõi và Acceptance Criteria của MVP, nhưng cho phép refinement có kiểm soát giữa các iteration.

## A.2. Tách Static Content và Player State

Vocabulary, Question và Theme là dữ liệu nội dung; Resource, Progress và Building State là dữ liệu thay đổi theo người chơi.

**Bài học:** Tách hai nhóm dữ liệu giúp thiết kế API, Database và Sync rõ ràng hơn.

## A.3. Tách Vocabulary và Question

Việc không nhồi các câu hỏi Reading/Listening/Writing/Speaking vào một bảng Vocabulary giúp tránh schema phình to và hỗ trợ quan hệ 1-N/N-N.

**Bài học:** Entity nên giữ đúng trách nhiệm; dữ liệu có khả năng mở rộng theo chiều ngang nên được mô hình hóa bằng entity/relationship phù hợp.

## A.4. Tách Content Type và Skill

`content_type` mô tả loại nội dung (`VOCABULARY`, `GRAMMAR`), còn `skill` mô tả phương thức học (`READING`, `WRITING`, `LISTENING`, `SPEAKING`).

**Bài học:** Hai chiều phân loại khác nhau nên được giữ độc lập để Question Bank có thể mở rộng.

## A.5. Không hardcode Game Balance vào SRS

Các giá trị như chi phí xây dựng, số Knowledge Points/giờ, phần thưởng và level công trình có thể phải cân bằng lại.

**Bài học:** SRS nên đặc tả Business Rule; giá trị balance nên được cấu hình ở Domain/Constants/Backend để thay đổi thuận tiện.

## A.6. Ưu tiên Core Loop trước Authentication

JWT, Login, OTP và Account Management không trực tiếp chứng minh giá trị chính của MVP.

**Bài học:** Với dự án cá nhân, ưu tiên chuỗi Learn → Mastery → Test → Blueprint → Build trước.

## A.7. Offline-first phải xoay quanh Local Data

Room không chỉ đóng vai trò cache mà còn là nguồn dữ liệu hoạt động chính của Mobile.

**Bài học:** UI không nên phụ thuộc trực tiếp vào Retrofit; Repository điều phối Local Database và Network.

## A.8. Thiết kế để mở rộng nhưng không triển khai tất cả

Listening, Speaking, Grammar Event và Skill Filter cần được phản ánh trong kiến trúc nhưng không nhất thiết phải implementation hoàn chỉnh trong MVP.

**Bài học:** Prepare the architecture, not the feature.

---

# APPENDIX B — CÁC YÊU CẦU CHƯA ĐÓNG BĂNG

Các nội dung dưới đây được cố ý giữ mở để tránh khóa cứng các quyết định chưa có đủ dữ liệu thực nghiệm:

1. Công thức tính chính xác của Vocabulary Mastery.
2. Giá xây dựng/nâng cấp cụ thể.
3. Tốc độ sản xuất Knowledge Points.
4. Công thức phần thưởng.
5. Level tối đa của Building.
6. Chi tiết Unlock progression giữa các Level.
7. Question Type đầy đủ cho Listening/Speaking.
8. Cách đánh giá Speaking.
9. Chi tiết Conflict Resolution khi đồng bộ nhiều thiết bị.
10. Account Linking.
11. Admin / Content Management.
12. Production Deployment và Cloud Infrastructure.