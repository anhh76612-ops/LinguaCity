# LINGUACITY — SOFTWARE REQUIREMENTS SPECIFICATION (SRS) & ARCHITECTURE DECISIONS
## PHẠM VI PHIÊN BẢN MVP (VERSION 2.0)

---

## 1. LỜI MỞ ĐẦU & TẦM NHÌN SẢN PHẨM

### 1.1. Bối cảnh dự án
Việc học từ vựng và ngữ pháp TOEIC truyền thống thường mang tính lặp lại và dễ gây nhàm chán [1]. Mặc dù gamification (game hóa) đã được áp dụng ở nhiều ứng dụng (như Duolingo), nhưng chúng thường dừng lại ở việc "tích điểm, đua top" [1]. 

LinguaCity được định hướng xa hơn: Xây dựng một Learning Game thực thụ, nơi kết quả học tập được liên kết trực tiếp với quá trình quy hoạch và phát triển một thành phố ảo [2].

### 1.2. Triết lý thiết kế (Product Principle)
Nguyên tắc cốt lõi lớn nhất của LinguaCity được xác định như sau:
**"Tiến bộ học tập trực tiếp quyết định tiến bộ của thành phố."** [2]

Vòng lặp Học tập (Learning Loop) và Vòng lặp Thành phố (City Loop) không tồn tại độc lập mà phải giao nhau tại một "nút thắt" bắt buộc [2]. Người chơi không thể chỉ phát triển thành phố mà không học tập, và ngược lại [2].

---

## 2. NHỮNG BÀI HỌC VÀ QUYẾT ĐỊNH KIẾN TRÚC CỐT LÕI

### 2.1. Kiến trúc Mobile: Clean Architecture & MVI
*   **Quyết định:** Sử dụng Clean Architecture (chia 3 tầng Data - Domain - Presentation) [15] kết hợp mô hình State Management là MVI (Model-View-Intent) và StateFlow [3].
*   **Lý do & Bài học:** Với một ứng dụng có logic phức tạp đan xen giữa game (tiền tệ, đếm ngược thời gian) và học tập (đúng/sai, flashcard), các State rời rạc sẽ rất dễ gây lỗi UI [3]. MVI gom toàn bộ trạng thái thành phố vào một Data Class duy nhất (Single Source of Truth cho UI), giúp luồng dữ liệu một chiều (Unidirectional Data Flow) trở nên an toàn tuyệt đối [3].

### 2.2. Dependency Injection: Hilt thay vì Koin
*   **Quyết định:** Sử dụng Hilt làm công cụ tiêm phụ thuộc (DI) [17].
*   **Lý do:** Hilt cung cấp compile-time safety (báo lỗi ngay lúc gõ code/build) thay vì crash lúc runtime như Koin [17]. Điều này giúp giảm đáng kể thời gian phát hiện và xử lý lỗi trong Clean Architecture đa module [17].

### 2.3. JSON Serialization: Kotlinx Serialization
*   **Quyết định:** Dùng Kotlinx Serialization để map API thay vì Gson/Moshi [18].
*   **Lý do:** Thư viện native của Kotlin, an toàn tuyệt đối với Null-safety [18]. Hoạt động hoàn hảo với TypeConverter của Room Database để lưu trữ các mảng JSON cục bộ [18]. Mọi API Content từ Backend trả về phải là chuẩn JSON Array, tuyệt đối không trả về JSON String lồng nhau để giảm tải việc deserialize hai lần ở Mobile [18, 19].

### 2.4. Chiến lược Offline & Sync: Offline Read-Only
*   **Quyết định:** MVP áp dụng chiến lược **Offline Read-Only** [146, 153].
*   **Lý do:** Loại bỏ hoàn toàn sự phức tạp của việc đồng bộ hai chiều (Push Sync) và giải quyết xung đột dữ liệu (Conflict Resolution) [147, 153, 156].
*   **Cách hoạt động:**
    *   **Khi Offline:** Người dùng chỉ được phép đọc Flashcard/Vocabulary đã được tải và cache từ trước trong Room Database [146, 153].
    *   **Khi có thao tác thay đổi dữ liệu (Gameplay-critical):** Chấm điểm bài Quiz, Start/Submit bài thi sát hạch, nâng cấp công trình, thay đổi tài nguyên bắt buộc phải có mạng (Online) và được xử lý trực tiếp bởi Backend để tránh gian lận [146, 153].

---

## 3. THIẾT KẾ MÔ HÌNH DỮ LIỆU (DATA MODELING)

### 3.1. Sự tiến hóa của bảng Từ vựng (Vocabulary)
*   **Thiết kế hiện tại (Centralized Question Bank):** Tách biệt hoàn toàn Vocabulary (Nội dung tĩnh) và Question (Câu hỏi) [6].
    *   **Vocabulary:** Chứa id, word, meaning, ipa, theme_id, level, difficulty_rank [48].
    *   **Question:** Chứa id, content_type (VOCABULARY/GRAMMAR), skill (READING, WRITING), question_type, answer, explanation, metadata (JSONB) [49].
*   **Liên kết:** Một từ vựng có thể liên kết với nhiều câu hỏi ở nhiều kỹ năng khác nhau thông qua bảng trung gian `QuestionVocabulary` [49, 54].

### 3.2. Công trình = Theme (Không phải Skill)
*   Mỗi công trình liên kết với một Theme (Chủ đề) [44], bẻ gãy sự khóa cứng trực tiếp với kỹ năng để tránh coupling [48].
    *   🏠 **Housing (Nhà ở):** Từ vựng chủ đề Daily Life, House [32].
    *   🛣️ **Road (Đường xá):** Chủ đề Transportation, Vehicles [32].
    *   🌳 **Park (Công viên):** Chủ đề Environment, Social [32].
    *   🏫 **School (Trường học):** Chủ đề Education [33].
*   Trong phiên bản MVP, hệ thống tập trung hoàn toàn vào 2 kỹ năng: **Reading (Đọc)** và **Writing (Viết)** dưới dạng trắc nghiệm hoặc điền từ cho tất cả các công trình [33].

### 3.3. Trường học (School) - Trung tâm khảo thí
Trường học tích hợp chức năng Exam Center [33]. Đây là nơi lưu trữ danh sách các Bài Test nâng cấp công trình [33]. Bài thi sát hạch (Exam) sẽ trả về một Bản vẽ cụ thể (`reward_blueprint_id`) tương ứng với công trình và Level cần mở khóa [51].

---

## 4. CORE GAME MECHANICS (CƠ CHẾ CỐT LÕI)

### 4.1. Vòng lặp kép (Core Loop)
Vòng lặp kết hợp chặt chẽ giữa học tập và xây dựng:
1.  **Học tập (Learn):** Học từ vựng của công trình hiện tại để tích lũy Collection Progress, mỗi lần tham gia bài học sẽ có 20 câu hỏi tạo từ 10 từ vựng khác nhau lấy trong bể, hoàn thành có thể nhận điểm tri thức theo mức điểm [112].
2.  **Mở khóa bài thi (Unlock Exam):** Khi số lượng thẻ từ vựng đã thu thập (Collection Progress) đạt đủ số lượng yêu cầu trong cấu hình `ExamRequirement` [52, 58].
3.  **Thi sát hạch (Start & Pass Exam):** Tiêu thụ điểm tri thức (Knowledge) + mảnh bản vẽ (Blueprint Shards) để tham gia [52]. Vượt qua bài thi để nhận Bản vẽ cụ thể (`Blueprint`) [51].
4.  **Xây dựng (Build/Upgrade):** Tiêu thụ Bản vẽ (`Blueprint`) + Điểm tri thức (`Knowledge Points`) để nâng cấp công trình [100]. Sau khi nâng cấp hoàn tất, mở khóa Level từ vựng tiếp theo [34].

### 4.2. Hệ thống Tài nguyên & Kinh tế
Hệ thống quản lý 3 loại tài nguyên chính:
*   **Knowledge Points (Điểm Tri Thức):** Cách kiếm: Thu hoạch thụ động từ Nhà ở (Housing) và làm bài tập ôn luyện [10, 35].
*   **Hourglass (Đồng hồ cát):** Dùng để tua nhanh thời gian xây nhà [10, 35].
*   **Blueprint Shards (Mảnh bản vẽ):** Dùng làm chi phí đầu vào để tham gia các bài thi sát hạch [52, 118].
*   **Blueprint (Bản vẽ):** Nhận được sau khi Pass Exam, dùng trực tiếp để nâng cấp công trình [51, 100].

### 4.3 Sự kiện thành phố (City Events):
Bài tập Ngữ pháp (Grammar) sẽ xuất hiện dưới dạng các dấu chấm than (!) trên bản đồ (Ví dụ: Giúp người dân điền đúng thì ngữ pháp). Trả lời đúng nhận Knowledge Point và Blueprint Shard
---

## 5. NGĂN XẾP CÔNG NGHỆ (TECHNICAL STACK)

### 5.1. Mobile App Tech Stack
*   **Language:** Kotlin [14]
*   **UI Framework:** Jetpack Compose [14]
*   **Architecture:** Clean Architecture (Data, Domain, Presentation layers) [15]
*   **State Management:** MVI (Model-View-Intent) kết hợp StateFlow [16]
*   **Dependency Injection:** Hilt [17]
*   **Local Persistence:** Room Database [19]
*   **JSON Serialization:** Kotlinx Serialization [18]
*   **Network:** Retrofit + OkHttp [20]
*   **Navigation:** Jetpack Compose Navigation Type-Safe (v2.8.x) [20, 166]

### 5.2. Backend Tech Stack (Spring Boot & PostgreSQL)
Backend đóng vai trò là **Server Authority / Authoritative SSOT**, chịu trách nhiệm kiểm soát toàn bộ logic gameplay-critical, chấm điểm và quản lý tài nguyên [108, 136].

*   **Language & Runtime:** Java 17 (JDK 17) [173]
*   **Core Framework:** Spring Boot (Spring Web, Spring Data JPA) [72, 91, 173]
*   **Database:** PostgreSQL [170, 173]
*   **ORM (Object-Relational Mapping):** JPA / Hibernate [72, 91]

#### Các quyết định thiết kế và Mapping JPA:
1.  **Naming Convention:**
    *   **PostgreSQL:** Tên bảng viết thường ở dạng số nhiều và dùng `snake_case` (ví dụ: `themes`, `vocabularies`, `exam_attempts`) [297]. Các cột dùng `snake_case` [297].
    *   **Java JPA:** Tên Entity dùng `PascalCase` số ít (ví dụ: `Theme`, `Vocabulary`, `ExamAttempt`) [297]. Thuộc tính sử dụng `camelCase` [297].
2.  **Primary Key Strategy:**
    *   Các bảng Static Content và Player State thông thường sử dụng kiểu `BIGINT` (Java `Long`), tự động tăng thông qua kiểu `SERIAL` hoặc `BIGSERIAL` của PostgreSQL với annotation `@GeneratedValue(strategy = GenerationType.IDENTITY)` [297].
    *   `UserProfile` sử dụng kiểu `UUID` (Java `java.util.UUID`) do Client sinh ra khi Onboarding Guest User hoặc Server cấp phát để đồng bộ lâu dài [297].
3.  **Fetch Strategy (Ngăn chặn N+1 Query):**
    *   Áp dụng nguyên tắc **LAZY-loading first** [93, 297]. Mọi quan hệ `@ManyToOne`, `@OneToMany`, `@ManyToMany` mặc định sử dụng `FetchType.LAZY` [297].
    *   Chỉ sử dụng `JOIN FETCH` trong JPQL tại tầng Repository khi thực sự cần lấy cả đồ thị đối tượng liên quan [297].
4.  **Enum Mapping:**
    *   Các cột trạng thái (như `status` trong `ExamAttempt`) hoặc phân loại (như `question_type`, `skill`) được ánh xạ bằng `@Enumerated(EnumType.STRING)` để lưu trữ dạng text dưới DB [93, 300]. Tuyệt đối không dùng `ORDINAL` để tránh lỗi sai nghĩa dữ liệu khi cập nhật enum [93, 300].
5.  **PostgreSQL JSONB Mapping:**
    *   Các trường như `Vocabulary.examples` (danh sách câu ví dụ) và `Question.metadata` (payload động của từng loại Mini-game) lưu dưới dạng `JSONB` trong PostgreSQL [95, 297].
    *   Trong Java, ánh xạ bằng String hoặc Class Wrapper kết hợp custom Type của Hibernate (`@Type` hoặc cơ chế JSON native của Hibernate 6) để thao tác trực tiếp dạng Object [95, 297].
6.  **Composite Keys & Composite Foreign Keys:**
    *   Sử dụng `@Embeddable` và `@EmbeddedId` cho các bảng có khóa phức hợp như `BuildingLevel`, `ExamQuestion`, `ExamAttemptQuestion` [299].
    *   Thiết lập `@JoinColumns` để tạo Composite Foreign Key giữa `EXAM` và `BLUEPRINT` nhằm ràng buộc tính nhất quán của bộ đôi `(building_id, target_level)` [96, 297].
7.  **DTO Pattern:**
    *   JPA Entity không bao giờ được trả trực tiếp qua REST API [97, 300]. Tầng Controller bắt buộc sử dụng các DTO (Data Transfer Object) để đóng gói dữ liệu và tối ưu hóa payload truyền mạng cho thiết bị di động [97, 300].

#### Cơ chế Giao dịch và Bảo mật:
*   **Giao dịch (@Transactional):** Sử dụng ở tầng Service để quản lý Transaction Boundaries [301, 302]. Các hành động như Start/Submit Exam, Upgrade Building bắt buộc phải thực thi Atomic (tất cả hoặc không) để tránh lỗi bất đồng bộ tài nguyên [98, 302].
*   **Chống Race Condition:** Sử dụng cơ chế Khóa lạc quan (Optimistic Locking via `@Version`) trên `UserProfile` để chống spam request hoặc click lặp từ Client [302].
*   **Bảo mật Thời gian:** Mọi kiểm tra thời gian xây dựng (Upgrade) bắt buộc dùng **Server Time**, không tin tưởng Device Time của Client gửi lên để tránh hack sửa giờ điện thoại [133].

---

## 6. DEFINITION OF DONE (TIÊU CHÍ NGHIỆM THU MVP)

Dự án MVP được coi là hoàn thành thành công khi thỏa mãn chuỗi checklist kỹ thuật sau:

*   [ ] **Khởi tạo Guest User:** Tạo ID Guest bằng UUID cục bộ trên Mobile và đăng ký thành công trên Spring Boot Backend [38].
*   [ ] **Nạp dữ liệu Static Content:** Mobile gọi API Spring Boot thành công để tải toàn bộ Vocabulary, Themes, Buildings, Exams lưu vào Room Database để phục vụ cache [38].
*   [ ] **Học tập ngoại tuyến (Offline Read-Only):** Người dùng có thể xem danh sách từ vựng, đọc Flashcard, xem nghĩa, IPA, ví dụ 100% Offline [146, 153].
*   [ ] **Học tập trực tuyến (Online Learning):** Các thao tác chấm điểm bài tập (Submit Answer) và thay đổi điểm Mastery phải kết nối Backend để chấm điểm và cập nhật Room cục bộ [146, 153].
*   [ ] **Mở khóa bài thi (Unlock Exam):** Khi người chơi thu thập đủ số lượng thẻ từ vựng yêu cầu của Level hiện tại (ví dụ: 40/40 từ), bài Test tương ứng tại School được mở khóa [38, 52].
*   [ ] **Thi sát hạch:** Thực hiện Start Exam (trừ tài nguyên trên Server, tạo Snapshot đề thi) [98, 109] và Submit Exam (Server chấm điểm, phát Blueprint và ghi nhận kết quả) thành công [99, 110].
*   [ ] **Nâng cấp công trình:** Tiêu thụ Blueprint đúng loại + Điểm tri thức để nâng cấp công trình [100]. Quá trình xây dựng chạy theo thời gian thực (được kiểm tra bằng Server Time) [133].
*   [ ] **Đồng bộ On-Demand:** Khi khởi động lại hoặc có mạng, ứng dụng thực hiện so khớp dữ liệu Player State từ Server và ghi đè xuống Room Database [120, 165]. Không tự ý đồng bộ ngược (Push Sync) dữ liệu thay đổi cục bộ khi offline [147, 153].
