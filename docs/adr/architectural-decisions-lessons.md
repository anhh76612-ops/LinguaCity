# LINGUACITY — BÁO CÁO QUYẾT ĐỊNH KIẾN TRÚC & BÀI HỌC KINH NGHIỆM (ADR)
**Mục tiêu tài liệu:** Tổng hợp và phân tích toàn bộ quá trình phát triển, các quyết định kiến trúc cốt lõi (ADR) cùng những bài học kinh nghiệm thu được từ quá trình thiết kế, chuyển đổi hệ thống từ các giai đoạn đầu (bản nháp sơ khởi) sang bản thiết kế hệ thống chi tiết (Target Design - v4) của dự án **LinguaCity** [3, 157, 181, 235].

Tài liệu được phân tích và biên soạn dựa trên 15 nguồn dữ liệu thực tế của dự án, đóng vai trò như một cẩm nang học tập kỹ thuật thực chiến xuyên suốt quá trình thực thi mã nguồn.

---

## PHẦN 1: QUYẾT ĐỊNH CÔNG NGHỆ (TECH STACK ADR)

### 1. Ngăn xếp công nghệ Mobile App (Mobile Tech Stack)
Trong quá trình khởi tạo ứng dụng Android, nhóm phát triển đã đưa ra các quyết định công nghệ quan trọng để đối phó với sự phức tạp của cơ chế Game hóa (Gamification) và mô hình dữ liệu cục bộ [163].

```
┌────────────────────────────────────────────────────────┐
│                      PRESENTATION                      │
│       Jetpack Compose (UI)  ◄───►  MVI + StateFlow     │
└───────────────────────────┬────────────────────────────┘
                            │ (Hilt Dependency Injection)
┌───────────────────────────▼────────────────────────────┐
│                         DOMAIN                         │
│             UseCases / Pure Domain Models              │
└───────────────────────────▲────────────────────────────┘
                            │ (Repository Pattern)
┌───────────────────────────┴────────────────────────────┐
│                          DATA                          │
│    Room DB (Local Operational) ◄──► Retrofit (Network) │
└────────────────────────────────────────────────────────┘
```

*   **Kotlin & Jetpack Compose:**
    *   *Quyết định:* Sử dụng Kotlin làm ngôn ngữ phát triển và Jetpack Compose làm framework xây dựng giao diện khai báo (Declarative UI) [14, 15].
    *   *Lý do:* Kotlin tối ưu tốt với Null-safety, Coroutines và Data class, rất thích hợp cho xử lý các State game phức tạp [14]. Jetpack Compose giúp đồng bộ trạng thái giao diện mượt mà theo luồng state một chiều, giảm tối đa mã boilerplate so với XML truyền thống [15].
*   **Kiến trúc Clean Architecture:**
    *   *Quyết định:* Phân rã mã nguồn thành 3 phân tầng độc lập: `presentation`, `domain`, và `data` [15, 167].
    *   *Lý do:* Đảm bảo tính lỏng lẻo (decoupling) giữa giao diện, logic nghiệp vụ và các cổng truy cập ngoại vi (Room Database, API Client) [15]. Khi cần đổi thư viện lưu trữ hay cập nhật giao diện, tầng logic nghiệp vụ (`domain`) vẫn được giữ an toàn [15].
*   **MVI (Model-View-Intent) + StateFlow thay vì MVVM:**
    *   *Quyết định:* Quy hoạch toàn bộ trạng thái màn hình về một Data Class duy nhất dưới dạng luồng dữ liệu một chiều (Unidirectional Data Flow) sử dụng StateFlow [3, 16, 17].
    *   *Lý do:* Ứng dụng tích hợp gameplay chứa quá nhiều biến trạng thái hoạt động song song (tài nguyên, đồng hồ đếm ngược, cấp độ nhà, tiến độ từ vựng, kết quả kiểm tra) [16]. Việc dùng MVVM truyền thống với nhiều biến LiveData/StateFlow rời rạc rất dễ dẫn đến trạng thái bất đồng bộ UI và gây ra lỗi hiển thị [16]. MVI tạo ra "Single Source of Truth" cho UI để đảm bảo giao diện luôn phản ánh đúng 100% trạng thái dữ liệu hiện có [3, 17].
*   **Hilt làm công cụ Dependency Injection thay vì Koin:**
    *   *Quyết định:* Sử dụng Hilt để quản lý phụ thuộc (DI) cho hệ thống [17].
    *   *Lý do:* Dù Koin dễ cấu hình hơn, nhưng trong một dự án Clean Architecture đa module, Hilt cung cấp khả năng kiểm tra lỗi phụ thuộc ngay trong thời gian biên dịch (Compile-time safety) thay vì gây ra crash bất ngờ khi ứng dụng chạy (Runtime crash) như Koin [17].
*   **Kotlinx Serialization thay vì Gson/Moshi:**
    *   *Quyết định:* Sử dụng Kotlinx Serialization làm thư viện Serialization chính thức cho cả Retrofit và Room TypeConverter [4, 18].
    *   *Lý do:* Là thư viện native của Kotlin, hỗ trợ tuyệt đối Null-safety [4]. Quyết định kiến trúc bắt buộc Backend trả về cấu trúc câu ví dụ (`examples`) dưới dạng mảng JSON (JSON Array) tĩnh [4, 18, 19]. Kotlinx Serialization ánh xạ trực tiếp mảng này thành `List<String>` ở DTO, sau đó Room TypeConverter chuyển đổi thành chuỗi lưu vào SQLite, triệt tiêu hoàn toàn việc deserialize 2 lần (double-deserialization) gây lãng phí tài nguyên CPU của thiết bị [4, 18, 19, 179].
*   **Jetpack Compose Navigation Type-Safe (phiên bản 2.8.x):**
    *   *Quyết định:* Loại bỏ hoàn toàn String Route truyền thống, sử dụng các Data Class/Object tĩnh để định nghĩa điểm đến trong đồ thị điều hướng [20, 166].
    *   *Lý do:* Tránh lỗi gõ sai đường dẫn dẫn tới crash ứng dụng, đảm bảo tính an toàn dữ liệu tuyệt đối khi truyền tham số giữa các màn hình [20, 166].

### 2. Ngăn xếp công nghệ phía Backend (Backend Tech Stack)
Kiến trúc Backend được thiết kế nhằm mục đích đảm bảo **Server Authority (Uy quyền tối cao của Máy chủ)** [69, 108, 126, 136]:

*   **Java 17 & Spring Boot:**
    *   *Quyết định:* Sử dụng JDK 17 kết hợp framework Spring Boot để xây dựng RESTful API [125, 173].
    *   *Lý do:* JDK 17 cung cấp các tính năng hiện đại (như Records) giúp tối ưu hóa bộ nhớ, Spring Boot có hệ sinh thái mạnh mẽ hỗ trợ tối đa việc xử lý Transactions và kết nối Database an toàn.
*   **Spring Data JPA (Hibernate) với chiến lược LAZY-first:**
    *   *Quyết định:* Bắt buộc cấu hình `FetchType.LAZY` cho tất cả các quan hệ `@ManyToOne`, `@OneToMany` hoặc `@ManyToMany` [297].
    *   *Lý do:* Loại bỏ triệt để vấn đề truy vấn thừa $N+1$ Query [297]. Chỉ thực hiện JOIN thực sự khi có yêu cầu bằng cách dùng `JOIN FETCH` trong các câu truy vấn JPQL tùy biến tại tầng Repository [297].
*   **Cơ sở dữ liệu PostgreSQL & JSONB:**
    *   *Quyết định:* Sử dụng PostgreSQL làm cơ sở dữ liệu quan hệ chính [173], hỗ trợ ánh xạ các trường dữ liệu động như ví dụ từ vựng (`examples`) và cấu trúc bài tập của Mini-game (`metadata`) dưới định dạng cột **JSONB** [48, 49, 95].
    *   *Lý do:* PostgreSQL xử lý truy vấn JSONB cực kỳ tối ưu [95]. Việc sử dụng JSONB giúp hệ thống lưu trữ được nhiều biến thể game tùy biến (như câu hỏi trắc nghiệm, trò chơi ghép cặp, sắp xếp từ...) mà không cần phải thiết kế hàng chục bảng con rườm rà, tránh phình to cơ sở dữ liệu vật lý [85, 292].

---

## PHẦN 2: SỰ TIẾN HÓA CỦA MÔ HÌNH DỮ LIỆU (DATABASE EVOLUTION)

Trong quá trình đi từ ý tưởng thô ban đầu (GDD ở Giai đoạn 1) đến bản Thiết kế Hệ thống v4, mô hình dữ liệu đã có những bước tiến hóa vượt bậc để giải quyết triệt để vấn đề dư thừa thông tin (Redundancy) và dị thường dữ liệu (Data Anomalies) nhằm hướng tới dạng chuẩn 3 (3NF) [72, 90, 290].

### 1. Bảng đối chiếu tiến hóa (Current Code vs Target Design)
Dưới đây là sơ đồ tóm tắt sự thay đổi mô hình dữ liệu được ghi nhận trong thiết kế kiến trúc [70, 209, 267]:

| Thành phần | Thiết kế Sơ khởi (Prototype) | Thiết kế Chuẩn hóa (v4 / Target Design) |
| :--- | :--- | :--- |
| **User ID** | Long (Auto Increment) | UUID String (Guest User) [70, 209, 267] |
| **Building** | Lưu trực tiếp tiến trình người chơi (trộn lẫn state) | Tách biệt thành `Building` (Tĩnh) + `UserBuilding` (Động) [70, 209, 267] |
| **Building Type** | String | Building Code (HOUSING, ROAD, PARK, SCHOOL) [45, 70, 209, 267] |
| **Vocabulary** | Khóa cứng trực tiếp với `buildingType` | Liên kết thông qua thực thể `Theme` [48, 70, 209, 267] |
| **Progress** | `status` + `lastReviewed` trong Vocabulary | `UserVocabProgress` (lưu riêng `mastery_score`, `first_seen_at`) [57, 70, 209, 267] |
| **Theme** | Chưa tồn tại | Thực thể độc lập `Theme` kết nối lỏng [44, 70, 209, 267] |
| **Question** | Chưa tồn tại (Lưu text trực tiếp ở Vocabulary) | Ngân hàng câu hỏi tập trung `Question` [6, 49, 70, 209, 267] |
| **Mini-game Payload**| Chưa tồn tại | Trường `metadata` dạng JSONB thuộc bảng Question [49, 70, 209, 267] |
| **Exam** | Chưa tồn tại | Bộ ba thực thể `Exam`, `ExamRequirement`, `ExamAttempt` [51, 52, 65, 70, 209, 267] |
| **Exam Reward** | Số lượng Blueprint chung trong UserProfile | `reward_blueprint_id` liên kết định nghĩa Blueprint cụ thể [51, 70, 209, 267] |
| **Blueprint** | `full_blueprints` dạng số lượng trong Profile | `Blueprint` (Tĩnh) + `UserBlueprint` (Inventory lưu lượng sở hữu) [47, 67, 70, 209, 267] |
| **Building Level** | Chưa tách biệt cấu hình yêu cầu nâng cấp | Bảng cấu hình `BuildingLevel` (building_id, level) [46, 70, 209, 267] |
| **Exam Runtime** | Chưa tồn tại | `ExamAttempt` và snapshot câu hỏi `ExamAttemptQuestion` [65, 66, 70, 209, 267] |

---

### 2. Các Case Study tiến hóa mô hình dữ liệu cốt lõi

#### 📂 Case 1: Bẻ gãy liên kết cứng giữa Từ vựng (Vocabulary) và Công trình (Building)
*   **Bối cảnh ban đầu:** Bản GDD sơ khai thiết kế từ vựng được khóa cứng trực tiếp vào công trình học thuật (Ví dụ: Thẻ từ vựng gắn trực tiếp `buildingType = "HOUSING"`) [171, 172]. Điều này tạo ra sự phụ thuộc cực lớn (High Coupling): Nếu muốn thay đổi chủ đề hoặc thêm công trình mới, toàn bộ dữ liệu từ vựng phải bị can thiệp và nạp lại.
*   **Quyết định thay đổi:** Tách biệt hoàn toàn hai thực thể này và liên kết thông qua một lớp trung gian là **Chủ đề (Theme)** [7, 44, 48, 187, 241].
    *   Mỗi `Building` tĩnh sẽ liên kết với một `Theme` (Ví dụ: `HOUSING` liên kết với Theme `DAILY_LIFE`) [44, 45].
    *   Mỗi thẻ từ vựng `Vocabulary` sẽ liên kết với một `Theme` thông qua `theme_id` [48].
*   **Hệ quả tích cực:** Tránh coupling dữ liệu học tập và cấu trúc đô thị ảo [48, 187, 241]. Phía Backend có thể tự do mở rộng hàng nghìn từ vựng mới thuộc các Theme khác nhau mà không lo ảnh hưởng đến cấu trúc vận hành của game [71].

#### 📂 Case 2: Xây dựng Ngân hàng câu hỏi tập trung (Centralized Question Bank)
*   **Bối cảnh ban đầu:** Ban đầu thiết kế nhồi nhét mọi câu hỏi của các kỹ năng (`reading_question`, `listening_audio`, `writing_prompt`...) trực tiếp vào bảng `Vocabulary` [6, 31, 313]. Thiết kế này khiến bảng từ vựng phình to khủng khiếp khi một từ có nhiều câu hỏi bổ trợ, vi phạm nghiêm trọng quy chuẩn chuẩn hóa cơ sở dữ liệu [6, 31, 313].
*   **Quyết định thay đổi:** Tách biệt hoàn toàn `Vocabulary` (Chứa nội dung tĩnh của từ) và `Question` (Ngân hàng câu hỏi chung) [6, 31, 313].
    *   Hai bảng kết nối với nhau thông qua bảng quan hệ nhiều-nhiều `QuestionVocabulary` [54, 261, 262].
    *   Bảng nối này bổ sung cột `relation_type` (`TARGET` - từ vựng cần kiểm tra chính, `CONTEXT` - từ vựng xuất hiện làm ngữ cảnh) [54, 262].
    *   Mỗi câu hỏi được lưu dưới dạng một dòng độc lập trong bảng `Question`, phân loại rõ ràng qua `content_type` (Từ vựng/Ngữ pháp) và `skill` (Đọc/Viết/Nghe/Nói) [49, 187, 241].
*   **Hệ quả tích cực:** Hệ thống đạt cấu trúc chuẩn hóa 3NF [290]. Cho phép một câu hỏi kiểm tra đồng thời nhiều từ vựng và ngược lại [49, 187, 241]. Cột `metadata` dạng JSONB giúp lưu trữ cấu trúc động của các mini-game (như Matching, Sorting, Multiple Choice) một cách linh hoạt mà không phá vỡ Schema chính [49, 50, 187, 188, 241, 242].

#### 📂 Case 3: Quy hoạch Bản vẽ (Blueprint) thành Mô hình Inventory
*   **Bối cảnh ban đầu:** Blueprint ban đầu được coi như một trường đếm số lượng tổng hợp trong Profile của người dùng (`full_blueprints`) [55, 195, 252]. Việc này gây khó khăn khi game mở rộng nhiều công trình khác nhau vì hệ thống không biết người dùng đang giữ bản vẽ của công trình nào và cấp độ mấy.
*   **Quyết định thay đổi:** Quy hoạch `Blueprint` thành một Static Entity (thực thể tĩnh mô tả định nghĩa bản vẽ) và quản lý tiến trình sở hữu bằng thực thể động `UserBlueprint` [47, 67, 191, 197, 245, 254].
    *   `Blueprint` tĩnh chứa: `id`, `code` (Ví dụ: `BLUEPRINT_HOUSING_LV2`), `building_id`, và `target_level` [47, 191, 245].
    *   `UserBlueprint` đóng vai trò là bảng kho đồ (Inventory): Lưu `user_id`, `blueprint_id` và `quantity` (số lượng thực tế sở hữu) [67, 197, 254].
    *   *Sự tiến hóa của `BuildingLevel`:* Trong bản v2, bảng cấu hình `BuildingLevel` chứa khóa ngoại `blueprint_id` [192]. Tuy nhiên, trong bản v4, cột này đã bị loại bỏ hoàn toàn [46, 247, 271]. Hệ thống sẽ tự động xác định Blueprint tương ứng một cách logic thông qua cặp `(building_id, target_level)` vì `Blueprint` đã được ràng buộc Unique cho cặp thông tin này dưới Database [46, 217, 247, 271, 274].
*   **Hệ quả tích cực:** Tránh lặp thông tin cấu hình ở hai phía [217, 271]. Database thực thi tính nhất quán: Một Blueprint đại diện cho đúng một Building và một Target Level duy nhất [217, 276].

#### 📂 Case 4: Tách biệt Bể câu hỏi (Question Pool) và Lượt thi thực tế (Exam Attempt Question)
*   **Bối cảnh ban đầu:** Ban đầu thiết kế bảng quan hệ `ExamQuestion` (Pool câu hỏi của đề thi) chứa cột `question_order` để định nghĩa thứ tự hiển thị câu hỏi [53, 206, 264]. Tuy nhiên, thiết kế này phá vỡ cơ chế game-play ngẫu nhiên: Mỗi lần người chơi vào thi (Attempt) sẽ luôn nhận được đề thi với thứ tự giống hệt nhau, gây ra sự nhàm chán và dễ gian lận.
*   **Quyết định thay đổi:** Tách biệt hoàn toàn định nghĩa bể câu hỏi của đề thi và vết lượt thi thực tế của người chơi [53, 66, 110, 270].
    *   `ExamQuestion` đóng vai trò là bể câu hỏi tĩnh (Question Pool), chỉ làm nhiệm vụ map `exam_id` và `question_id`, **tuyệt đối không lưu `question_order`** [53, 110, 264, 270].
    *   Mỗi khi người chơi bắt đầu thi, hệ thống sinh ra một bản ghi `ExamAttempt` (Động) [65, 194, 249].
    *   Đồng thời, Backend sẽ random ngẫu nhiên $N$ câu hỏi từ Pool tĩnh và snapshot trực tiếp vào bảng `ExamAttemptQuestion` kèm theo cột `question_order` thực tế của lượt thi đó (bắt đầu từ 1) [66, 110, 250, 251, 270, 282].
*   **Hệ quả tích cực:** Bảo mật tối đa kết quả thi và hỗ trợ tính năng phục hồi bài thi đang dang dở (Resume Attempt) khi người chơi lỡ thoát ứng dụng giữa chừng [129, 251]. Đồng thời hỗ trợ lưu vết chi tiết phục vụ cho phân tích học tập (Learning Analytics) sau này [111, 251].

---

## PHẦN 3: SỰ THAY ĐỔI VỀ QUY TẮC NGHIỆP VỤ (BUSINESS SPECS SHIFT)

```
                       [ OFFLINE STATE ]
                 Người dùng mất kết nối Internet
                                │
                 ┌──────────────┴──────────────┐
                 ▼                             ▼
        [ ĐƯỢC PHÉP ĐỌC ]             [ KHÔNG ĐƯỢC GHI ]
      ✔ Đọc từ vựng đã cache        ✘ Trả lời câu hỏi
      ✔ Xem Flashcard, IPA         ✘ Làm bài thi sát hạch
      ✔ Xem Mastery hiện tại        ✘ Nâng cấp công trình
      (Đọc dữ liệu từ Room)        (Yêu cầu mạng & Backend)
```

### 1. Sự thay đổi về Chiến lược Ngoại tuyến (Offline & Sync Strategy)
*   **Ý tưởng sơ khởi (Two-way Sync / Outbox Pattern):** 
    Tài liệu cũ thiết kế ứng dụng cho phép hoạt động học tập, làm Quiz và thi cử diễn ra 100% Offline [13, 172, 319]. Tiến trình học tập, điểm Mastery và tài nguyên sẽ được tích lũy tạm thời ở cơ sở dữ liệu cục bộ (Room), sau đó được đưa vào hàng chờ đồng bộ (`SyncOperationEntity`, `Local Outbox`) để đẩy ngược lên Spring Boot và đồng bộ hóa hai chiều khi có mạng trở lại [5, 13, 172, 320].
*   **Kiến trúc chính thức (Offline Read-Only):**
    Quyết định kiến trúc đóng băng (Freeze) cho phiên bản MVP: **Chuyển sang Offline Read-Only** [30, 146, 153].
    *   *Offline (Được phép):* Người chơi chỉ được phép truy xuất, xem danh sách từ vựng, đọc thẻ flashcard, nghĩa từ, phiên âm IPA đã được lưu và cache sẵn trong Room Database từ các phiên làm việc Online trước đó [146, 153].
    *   *Online (Bắt buộc):* Mọi hành động làm biến đổi trạng thái người chơi (Gameplay-critical state) như: Cập nhật điểm Mastery, chấm điểm trả lời câu hỏi, Start/Submit bài thi sát hạch, nâng cấp công trình, cộng/trừ tài nguyên **bắt buộc phải có mạng và xử lý trực tiếp bởi Backend** [30, 146, 153].
    *   *Lý do:* Việc cho phép Client tự chấm điểm và cập nhật tiến độ khi offline tạo ra lỗ hổng bảo mật cực kỳ lớn (người chơi dễ dàng can thiệp cơ sở dữ liệu SQLite cục bộ để hack tài nguyên và tiến độ game). Đồng thời, việc đồng bộ hai chiều (Two-way sync) và giải quyết xung đột dữ liệu (Conflict Resolution) khi người dùng học trên nhiều thiết bị cực kỳ phức tạp và không khả thi đối với tiến độ phát triển MVP [147, 156].

### 2. Sự thay đổi về Điều kiện mở khóa thi sát hạch (Exam Unlock Mechanics)
*   **Ý tưởng sơ khởi:** Bài thi sát hạch tại School chỉ được mở khóa khi **tiến độ của công trình tương ứng đạt 100%** [13, 319].
*   **Quyết định chính thức:** Điều kiện mở khóa được chuyển sang **Collection Progress (Tiến độ thu thập thẻ từ vựng)** [38, 52, 64, 265].
    *   Hệ thống tách biệt hai khái niệm: `Collection Progress` (Số thẻ người chơi đã gặp ít nhất một lần - `first_seen_at != NULL`) và `Mastery Progress` (Điểm thông thạo của từng thẻ) [58, 199, 200, 256].
    *   Chỉ cần tổng số thẻ người chơi đã gặp trong Level hiện tại đạt đủ ngưỡng quy định trong bảng cấu hình `ExamRequirement` (Ví dụ: Đã gặp đủ 40/40 từ của Level 1) thì bài thi nâng cấp tại School sẽ sáng lên [38, 52, 64, 193, 248, 265].
    *   *Lý do:* Việc bắt buộc đạt 100% Mastery cho tất cả các từ trước khi thi gây ức chế lớn cho người học (do cơ chế Spaced Repetition có độ trễ). Chuyển sang Collection Progress giúp tạo động lực học tập hợp lý hơn: Khuyến khích người chơi nỗ lực "gặp mặt" đủ bộ từ vựng trước khi bước vào kỳ thi đánh giá [65, 206, 265].

### 3. Thu hẹp kỹ năng trong phạm vi MVP (Skill Mapping)
*   **Ý tưởng sơ khởi:** Phân chia 4 kỹ năng bổ trợ cố định cho 4 công trình: Nhà ở làm nhiệm vụ viết (Writing), Đường xá làm nhiệm vụ nghe (Listening), Công viên làm nhiệm vụ đọc (Reading), và School làm nhiệm vụ thi cử [171, 172].
*   **Quyết định chính thức:** Ở phiên bản MVP, để kiểm soát chặt chẽ Scope dự án và đảm bảo tiến độ bàn giao cá nhân, hệ thống **chỉ tập trung tối đa vào 2 kỹ năng: Reading (Đọc) và Writing (Viết)** dưới dạng trắc nghiệm và điền từ [8, 33, 314, 315]. Các kỹ năng nâng cao như Listening và Speaking được trì hoãn và chuyển xuống Phase 2 [122, 156].

---

## PHẦN 4: NHẬT KÝ KHẮC PHỤC SỰ CỐ (TROUBLESHOOTING LOG)

Trong quá trình triển khai thực tế từ thiết kế lên mã nguồn code, nhóm phát triển đã ghi nhận và xử lý triệt để 4 sự cố kỹ thuật điển hình dưới đây. Đây là những bài học kinh nghiệm lập trình vô cùng quý báu cho quá trình học tập thực tế:

### 🛠️ Sự cố 1: Lỗi chưa đăng ký Git Root của Monorepo
*   **Triệu chứng:** Hệ thống cảnh báo nhận diện file nằm ngoài vùng theo dõi của Git, không thể kiểm soát lịch sử commit của thư mục ứng dụng di động [168].
*   **Nguyên nhân:** Dự án được thiết lập theo cấu trúc Monorepo (thư mục `mobile`, `backend` và `docs` nằm ngang hàng nhau) [166]. Khi khởi tạo dự án Android Studio bên trong thư mục `mobile`, Android Studio tự tạo một Git repository riêng độc lập với Git Root tổng của dự án [166, 168].
*   **Giải pháp:** Xóa thư mục `.git` thừa bên trong thư mục `mobile`, cập nhật lại file `.gitignore` tổng ở thư mục gốc của Monorepo, sau đó chạy lệnh cấu hình lại Git Root để quản lý tập trung toàn bộ dự án dưới một Git duy nhất [168].

### 🛠️ Sự cố 2: Lỗi cú pháp Version Catalog trong build.gradle.kts
*   **Triệu chứng:** Đồng bộ Gradle thất bại với thông báo lỗi: `Unresolved reference: jetbrains/version catalog` [168].
*   **Nguyên nhân:** Có sự sai lệch về cú pháp đặt tên bí danh (alias) mặc định của Kotlin plugin giữa phiên bản Android Studio mới và cấu hình lưu trữ trong tệp `libs.versions.toml` [168].
*   **Giải pháp:** Thực hiện đồng bộ hóa lại Gradle (Gradle Sync) và sửa định nghĩa plugin trong file `build.gradle.kts` từ dạng cũ `libs.plugins.jetbrains.kotlin.android` về cấu trúc chuẩn hiện đại là `libs.plugins.kotlin.android` [168]. Hệ thống sau đó đã thông báo **BUILD SUCCESSFUL** [168].

### 🛠️ Sự cố 3: Lỗi "Project JDK is not defined" tại Android Studio
*   **Triệu chứng:** Android Studio không thể biên dịch mã nguồn Gradle, báo lỗi thiếu JDK biên dịch [175].
*   **Nguyên nhân:** Dự án sử dụng cấu hình Gradle Toolchain yêu cầu JDK 17, tuy nhiên môi trường Android Studio cục bộ chưa được thiết lập đường dẫn JDK tương thích [173, 175].
*   **Giải pháp:** Mở trực tiếp file cấu hình build hệ thống `build.gradle.kts`, sử dụng tính năng tải xuống tự động của Android Studio để tải bản JDK 17 trực tiếp từ giao diện IDE và trỏ classpath Gradle biên dịch về thư mục JDK vừa tải [175].

### 🛠️ Sự cố 4: Lỗi FATAL database "linguacity_db" does not exist (Spring Boot)
*   **Triệu chứng:** Ứng dụng Backend Spring Boot crash ngay khi khởi động với thông báo lỗi kết nối PostgreSQL [175].
*   **Nguyên nhân:** Nhóm phát triển lầm tưởng rằng cấu hình tự động của JPA Hibernate `ddl-auto=update` sẽ tự khởi động toàn bộ hạ tầng bao gồm cả database đích [173, 175]. Tuy nhiên thực tế, Hibernate chỉ có khả năng tự động tạo bảng (Tables), tạo khóa (Keys) và chỉ mục (Indexes) chứ **không thể tự tạo cơ sở dữ liệu gốc (Database Schema)** [175].
*   **Giải pháp:** Truy cập vào công cụ quản trị PostgreSQL (pgAdmin 4), chạy lệnh khởi tạo cơ sở dữ liệu gốc `CREATE DATABASE linguacity_db;` thủ công trước, sau đó mới tiến hành chạy ứng dụng Spring Boot [173, 175].

---

## KẾT LUẬN & BÀI HỌC CHO BẢN THÂN

Trải qua quá trình tái cấu trúc thiết kế của dự án **LinguaCity**, bài học lớn nhất rút ra là: **"Hãy chuẩn bị kỹ lưỡng về mặt kiến trúc, thay vì vội vàng lao vào viết các tính năng"** [25].

1.  **Sự tách biệt rạch ròi giữa Static Content và Player State** chính là chìa khóa giúp giữ cho hệ thống luôn sạch sẽ, dễ mở rộng và dễ đồng bộ [22, 90].
2.  **Nguyên tắc Server Authority** giúp bảo vệ tính toàn vẹn của nền kinh tế trong game, biến Room thành mộtOperational Cache hiệu quả, giảm tải độ phức tạp của code Mobile đi rất nhiều [104, 136, 146].
3.  **Học tập qua sai lầm:** Những lỗi hệ thống hay sự thay đổi logic chính là tư liệu học tập quý giá nhất để rèn luyện tư duy của một Kiến trúc sư Phần mềm thực thụ.
