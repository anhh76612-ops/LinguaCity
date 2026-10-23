# LINGUACITY — SOFTWARE REQUIREMENTS SPECIFICATION (SRS) & ARCHITECTURE DECISIONS
## PHẠM VI PHIÊN BẢN MVP (VERSION 2.1)

**Người thực hiện:** Nông Hoàng Anh
**Ngày chốt bản 2.0:** 23/08/2026 · **Cập nhật 2.1:** 20/10/2026 — tách cơ chế game sang GDD, bổ sung Unity (ADR-009)

> **Tài liệu liên quan:** Bảng yêu cầu có mã số → [requirements-catalog.md](requirements-catalog.md) · Use Case → [use-cases.md](use-cases.md) · Thiết kế game → [../02-game-design/gdd.md](../02-game-design/gdd.md)

---

## 1. LỜI MỞ ĐẦU & TẦM NHÌN SẢN PHẨM

### 1.1. Bối cảnh dự án
Việc học từ vựng và ngữ pháp TOEIC truyền thống thường mang tính lặp lại và dễ gây nhàm chán. Mặc dù gamification (game hóa) đã được áp dụng ở nhiều ứng dụng (như Duolingo), nhưng chúng thường dừng lại ở việc "tích điểm, đua top". 

LinguaCity được định hướng xa hơn: Xây dựng một Learning Game thực thụ, nơi kết quả học tập được liên kết trực tiếp với quá trình quy hoạch và phát triển một thành phố ảo.

### 1.2. Triết lý thiết kế (Product Principle)
Nguyên tắc cốt lõi lớn nhất của LinguaCity được xác định như sau:
**"Tiến bộ học tập trực tiếp quyết định tiến bộ của thành phố."**

Vòng lặp Học tập (Learning Loop) và Vòng lặp Thành phố (City Loop) không tồn tại độc lập mà phải giao nhau tại một "nút thắt" bắt buộc. Người chơi không thể chỉ phát triển thành phố mà không học tập, và ngược lại.

---

## 2. NHỮNG BÀI HỌC VÀ QUYẾT ĐỊNH KIẾN TRÚC CỐT LÕI

### 2.1. Kiến trúc Mobile: Clean Architecture & MVI
*   **Quyết định:** Sử dụng Clean Architecture (chia 3 tầng Data - Domain - Presentation) kết hợp mô hình State Management là MVI (Model-View-Intent) và StateFlow.
*   **Lý do & Bài học:** Với một ứng dụng có logic phức tạp đan xen giữa game (tiền tệ, đếm ngược thời gian) và học tập (đúng/sai, flashcard), các State rời rạc sẽ rất dễ gây lỗi UI. MVI gom toàn bộ trạng thái thành phố vào một Data Class duy nhất (Single Source of Truth cho UI), giúp luồng dữ liệu một chiều (Unidirectional Data Flow) trở nên an toàn tuyệt đối.

### 2.2. Dependency Injection: Hilt thay vì Koin
*   **Quyết định:** Sử dụng Hilt làm công cụ tiêm phụ thuộc (DI).
*   **Lý do:** Hilt cung cấp compile-time safety (báo lỗi ngay lúc gõ code/build) thay vì crash lúc runtime như Koin. Điều này giúp giảm đáng kể thời gian phát hiện và xử lý lỗi trong Clean Architecture đa module.

### 2.3. JSON Serialization: Kotlinx Serialization
*   **Quyết định:** Dùng Kotlinx Serialization để map API thay vì Gson/Moshi.
*   **Lý do:** Thư viện native của Kotlin, an toàn tuyệt đối với Null-safety. Hoạt động hoàn hảo với TypeConverter của Room Database để lưu trữ các mảng JSON cục bộ. Mọi API Content từ Backend trả về phải là chuẩn JSON Array, tuyệt đối không trả về JSON String lồng nhau để giảm tải việc deserialize hai lần ở Mobile.

### 2.4. Chiến lược Offline & Sync: Offline Read-Only
*   **Quyết định:** MVP áp dụng chiến lược **Offline Read-Only**.
*   **Lý do:** Loại bỏ hoàn toàn sự phức tạp của việc đồng bộ hai chiều (Push Sync) và giải quyết xung đột dữ liệu (Conflict Resolution).
*   **Cách hoạt động:**
    *   **Khi Offline:** Người dùng chỉ được phép đọc Flashcard/Vocabulary đã được tải và cache từ trước trong Room Database.
    *   **Khi có thao tác thay đổi dữ liệu (Gameplay-critical):** Chấm điểm bài Quiz, Start/Submit bài thi sát hạch, nâng cấp công trình, thay đổi tài nguyên bắt buộc phải có mạng (Online) và được xử lý trực tiếp bởi Backend để tránh gian lận.

---

## 3. THIẾT KẾ MÔ HÌNH DỮ LIỆU (DATA MODELING)

### 3.1. Sự tiến hóa của bảng Từ vựng (Vocabulary)
*   **Thiết kế hiện tại (Centralized Question Bank):** Tách biệt hoàn toàn Vocabulary (Nội dung tĩnh) và Question (Câu hỏi).
    *   **Vocabulary:** Chứa id, word, meaning, ipa, theme_id, level, difficulty_rank.
    *   **Question:** Chứa id, content_type (VOCABULARY/GRAMMAR), skill (READING, WRITING), question_type, answer, explanation, metadata (JSONB).
*   **Liên kết:** Một từ vựng có thể liên kết với nhiều câu hỏi ở nhiều kỹ năng khác nhau thông qua bảng trung gian `QuestionVocabulary`.

### 3.2. Công trình, Theme và Exam Center
Mỗi công trình (Housing, Road, Park, School) liên kết với một **Theme** chứ không khóa cứng với kỹ năng; MVP chỉ dùng **Reading** và **Writing**. Trường học (School) đóng vai trò **Exam Center**. Chi tiết: [GDD §2](../02-game-design/gdd.md).

---

## 4. CORE GAME MECHANICS (CƠ CHẾ CỐT LÕI)

> Toàn bộ Core Loop, hệ thống tài nguyên và City Events đã được chuyển sang **[GDD §3–§4](../02-game-design/gdd.md)** (từ bản 2.1).
> SRS chỉ giữ lại các **yêu cầu** phát sinh từ cơ chế game, đánh mã trong [requirements-catalog.md](requirements-catalog.md) (nhóm `FR-LEARN`, `FR-EXAM`, `FR-CITY`).

Tóm tắt vòng lặp: **Học → Thu thập thẻ → Mở khóa thi → Thi sát hạch (nhận Blueprint) → Nâng cấp công trình → Mở Level từ vựng mới.**

---

## 5. NGĂN XẾP CÔNG NGHỆ (TECHNICAL STACK)

### 5.1. Mobile App Tech Stack
*   **Language:** Kotlin
*   **UI Framework:** Jetpack Compose
*   **Architecture:** Clean Architecture (Data, Domain, Presentation layers)
*   **State Management:** MVI (Model-View-Intent) kết hợp StateFlow
*   **Dependency Injection:** Hilt
*   **Local Persistence:** Room Database
*   **JSON Serialization:** Kotlinx Serialization
*   **Network:** Retrofit + OkHttp
*   **Navigation:** Jetpack Compose Navigation Type-Safe (v2.8.x)

### 5.1b. Game View Tech Stack (Unity — 🟡 Proposed, xem ADR-009)
*   **Engine:** Unity (phiên bản LTS, chốt khi làm Tech Spike), ngôn ngữ C#
*   **Vai trò:** Chỉ hiển thị City View (bản đồ, công trình, hiệu ứng, City Events). **Không gọi API, không giữ logic tài nguyên.**
*   **Tích hợp:** Unity as a Library — module `unityLibrary` nhúng vào app Android; Kotlin là ứng dụng chủ.
*   **Giao tiếp:** Kotlin → Unity bằng `UnitySendMessage` (JSON `CityState`); Unity → Kotlin bằng `AndroidJavaProxy` (intent của người chơi).
*   **Đường lui:** `ComposeCityRenderer` nếu Tech Spike không đạt.

### 5.2. Backend Tech Stack (Spring Boot & PostgreSQL)
Backend đóng vai trò là **Server Authority / Authoritative SSOT**, chịu trách nhiệm kiểm soát toàn bộ logic gameplay-critical, chấm điểm và quản lý tài nguyên.

*   **Language & Runtime:** Java 17 (JDK 17)
*   **Core Framework:** Spring Boot (Spring Web, Spring Data JPA)
*   **Database:** PostgreSQL
*   **ORM (Object-Relational Mapping):** JPA / Hibernate

#### Các quyết định thiết kế và Mapping JPA:
1.  **Naming Convention:**
    *   **PostgreSQL:** Tên bảng viết thường ở dạng số nhiều và dùng `snake_case` (ví dụ: `themes`, `vocabularies`, `exam_attempts`). Các cột dùng `snake_case`.
    *   **Java JPA:** Tên Entity dùng `PascalCase` số ít (ví dụ: `Theme`, `Vocabulary`, `ExamAttempt`). Thuộc tính sử dụng `camelCase`.
2.  **Primary Key Strategy:**
    *   Các bảng Static Content và Player State thông thường sử dụng kiểu `BIGINT` (Java `Long`), tự động tăng thông qua kiểu `SERIAL` hoặc `BIGSERIAL` của PostgreSQL với annotation `@GeneratedValue(strategy = GenerationType.IDENTITY)`.
    *   `UserProfile` sử dụng kiểu `UUID` (Java `java.util.UUID`) do Client sinh ra khi Onboarding Guest User hoặc Server cấp phát để đồng bộ lâu dài.
3.  **Fetch Strategy (Ngăn chặn N+1 Query):**
    *   Áp dụng nguyên tắc **LAZY-loading first**. Mọi quan hệ `@ManyToOne`, `@OneToMany`, `@ManyToMany` mặc định sử dụng `FetchType.LAZY`.
    *   Chỉ sử dụng `JOIN FETCH` trong JPQL tại tầng Repository khi thực sự cần lấy cả đồ thị đối tượng liên quan.
4.  **Enum Mapping:**
    *   Các cột trạng thái (như `status` trong `ExamAttempt`) hoặc phân loại (như `question_type`, `skill`) được ánh xạ bằng `@Enumerated(EnumType.STRING)` để lưu trữ dạng text dưới DB. Tuyệt đối không dùng `ORDINAL` để tránh lỗi sai nghĩa dữ liệu khi cập nhật enum.
5.  **PostgreSQL JSONB Mapping:**
    *   Các trường như `Vocabulary.examples` (danh sách câu ví dụ) và `Question.metadata` (payload động của từng loại Mini-game) lưu dưới dạng `JSONB` trong PostgreSQL.
    *   Trong Java, ánh xạ bằng String hoặc Class Wrapper kết hợp custom Type của Hibernate (`@Type` hoặc cơ chế JSON native của Hibernate 6) để thao tác trực tiếp dạng Object.
6.  **Composite Keys & Composite Foreign Keys:**
    *   Sử dụng `@Embeddable` và `@EmbeddedId` cho các bảng có khóa phức hợp như `BuildingLevel`, `ExamQuestion`, `ExamAttemptQuestion`.
    *   Thiết lập `@JoinColumns` để tạo Composite Foreign Key giữa `EXAM` và `BLUEPRINT` nhằm ràng buộc tính nhất quán của bộ đôi `(building_id, target_level)`.
7.  **DTO Pattern:**
    *   JPA Entity không bao giờ được trả trực tiếp qua REST API. Tầng Controller bắt buộc sử dụng các DTO (Data Transfer Object) để đóng gói dữ liệu và tối ưu hóa payload truyền mạng cho thiết bị di động.

#### Cơ chế Giao dịch và Bảo mật:
*   **Giao dịch (@Transactional):** Sử dụng ở tầng Service để quản lý Transaction Boundaries. Các hành động như Start/Submit Exam, Upgrade Building bắt buộc phải thực thi Atomic (tất cả hoặc không) để tránh lỗi bất đồng bộ tài nguyên.
*   **Chống Race Condition:** Sử dụng cơ chế Khóa lạc quan (Optimistic Locking via `@Version`) trên `UserProfile` để chống spam request hoặc click lặp từ Client.
*   **Bảo mật Thời gian:** Mọi kiểm tra thời gian xây dựng (Upgrade) bắt buộc dùng **Server Time**, không tin tưởng Device Time của Client gửi lên để tránh hack sửa giờ điện thoại.

---

## 6. DEFINITION OF DONE (TIÊU CHÍ NGHIỆM THU MVP)

Dự án MVP được coi là hoàn thành thành công khi thỏa mãn chuỗi checklist kỹ thuật sau:

*   [x] **Khởi tạo Guest User:** Tạo ID Guest bằng UUID cục bộ trên Mobile và đăng ký thành công trên Spring Boot Backend.
*   [ ] **Nạp dữ liệu Static Content:** Mobile gọi API Spring Boot thành công để tải toàn bộ Vocabulary, Themes, Buildings, Exams lưu vào Room Database để phục vụ cache.
*   [ ] **Học tập ngoại tuyến (Offline Read-Only):** Người dùng có thể xem danh sách từ vựng, đọc Flashcard, xem nghĩa, IPA, ví dụ 100% Offline.
*   [ ] **Học tập trực tuyến (Online Learning):** Các thao tác chấm điểm bài tập (Submit Answer) và thay đổi điểm Mastery phải kết nối Backend để chấm điểm và cập nhật Room cục bộ.
*   [ ] **Mở khóa bài thi (Unlock Exam):** Khi người chơi thu thập đủ số lượng thẻ từ vựng yêu cầu của Level hiện tại (ví dụ: 40/40 từ), bài Test tương ứng tại School được mở khóa.
*   [ ] **Thi sát hạch:** Thực hiện Start Exam (trừ tài nguyên trên Server, tạo Snapshot đề thi) và Submit Exam (Server chấm điểm, phát Blueprint và ghi nhận kết quả) thành công.
*   [ ] **Nâng cấp công trình:** Tiêu thụ Blueprint đúng loại + Điểm tri thức để nâng cấp công trình. Quá trình xây dựng chạy theo thời gian thực (được kiểm tra bằng Server Time).
*   [ ] **Đồng bộ On-Demand:** Khi khởi động lại hoặc có mạng, ứng dụng thực hiện so khớp dữ liệu Player State từ Server và ghi đè xuống Room Database. Không tự ý đồng bộ ngược (Push Sync) dữ liệu thay đổi cục bộ khi offline.
*   [ ] **Tech Spike Unity (TS-UNITY):** Scene Unity nhúng trong app nhận `CityState` và gửi intent về Kotlin (tiêu chí chi tiết tại ADR-009).
