# ADR-003: Tiến hóa mô hình dữ liệu từ Prototype sang v4 (3NF)

| Mục | Nội dung |
| :--- | :--- |
| **Trạng thái** | ✅ Accepted |
| **Giai đoạn** | Giai đoạn 2 (System Design) |
| **Liên quan** | System Design Ch.3, Ch.5 · diagrams/images/DB_ERD.png |

> Nội dung bên dưới được tách nguyên văn từ báo cáo ADR tổng hợp cũ (`archive/architectural-decisions-lessons.md`). Theo mẫu ADR của dự án: **Context → Decision → Reason → Alternatives → Consequence → Lesson**.

## PHẦN 2: SỰ TIẾN HÓA CỦA MÔ HÌNH DỮ LIỆU (DATABASE EVOLUTION)

Trong quá trình đi từ ý tưởng thô ban đầu (GDD ở Giai đoạn 1) đến bản Thiết kế Hệ thống v4, mô hình dữ liệu đã có những bước tiến hóa vượt bậc để giải quyết triệt để vấn đề dư thừa thông tin (Redundancy) và dị thường dữ liệu (Data Anomalies) nhằm hướng tới dạng chuẩn 3 (3NF).

### 1. Bảng đối chiếu tiến hóa (Current Code vs Target Design)
Dưới đây là sơ đồ tóm tắt sự thay đổi mô hình dữ liệu được ghi nhận trong thiết kế kiến trúc:

| Thành phần | Thiết kế Sơ khởi (Prototype) | Thiết kế Chuẩn hóa (v4 / Target Design) |
| :--- | :--- | :--- |
| **User ID** | Long (Auto Increment) | UUID String (Guest User) |
| **Building** | Lưu trực tiếp tiến trình người chơi (trộn lẫn state) | Tách biệt thành `Building` (Tĩnh) + `UserBuilding` (Động) |
| **Building Type** | String | Building Code (HOUSING, ROAD, PARK, SCHOOL) |
| **Vocabulary** | Khóa cứng trực tiếp với `buildingType` | Liên kết thông qua thực thể `Theme` |
| **Progress** | `status` + `lastReviewed` trong Vocabulary | `UserVocabProgress` (lưu riêng `mastery_score`, `first_seen_at`) |
| **Theme** | Chưa tồn tại | Thực thể độc lập `Theme` kết nối lỏng |
| **Question** | Chưa tồn tại (Lưu text trực tiếp ở Vocabulary) | Ngân hàng câu hỏi tập trung `Question` |
| **Mini-game Payload**| Chưa tồn tại | Trường `metadata` dạng JSONB thuộc bảng Question |
| **Exam** | Chưa tồn tại | Bộ ba thực thể `Exam`, `ExamRequirement`, `ExamAttempt` |
| **Exam Reward** | Số lượng Blueprint chung trong UserProfile | `reward_blueprint_id` liên kết định nghĩa Blueprint cụ thể |
| **Blueprint** | `full_blueprints` dạng số lượng trong Profile | `Blueprint` (Tĩnh) + `UserBlueprint` (Inventory lưu lượng sở hữu) |
| **Building Level** | Chưa tách biệt cấu hình yêu cầu nâng cấp | Bảng cấu hình `BuildingLevel` (building_id, level) |
| **Exam Runtime** | Chưa tồn tại | `ExamAttempt` và snapshot câu hỏi `ExamAttemptQuestion` |

---

### 2. Các Case Study tiến hóa mô hình dữ liệu cốt lõi

#### 📂 Case 1: Bẻ gãy liên kết cứng giữa Từ vựng (Vocabulary) và Công trình (Building)
*   **Bối cảnh ban đầu:** Bản GDD sơ khai thiết kế từ vựng được khóa cứng trực tiếp vào công trình học thuật (Ví dụ: Thẻ từ vựng gắn trực tiếp `buildingType = "HOUSING"`). Điều này tạo ra sự phụ thuộc cực lớn (High Coupling): Nếu muốn thay đổi chủ đề hoặc thêm công trình mới, toàn bộ dữ liệu từ vựng phải bị can thiệp và nạp lại.
*   **Quyết định thay đổi:** Tách biệt hoàn toàn hai thực thể này và liên kết thông qua một lớp trung gian là **Chủ đề (Theme)**.
    *   Mỗi `Building` tĩnh sẽ liên kết với một `Theme` (Ví dụ: `HOUSING` liên kết với Theme `DAILY_LIFE`).
    *   Mỗi thẻ từ vựng `Vocabulary` sẽ liên kết với một `Theme` thông qua `theme_id`.
*   **Hệ quả tích cực:** Tránh coupling dữ liệu học tập và cấu trúc đô thị ảo. Phía Backend có thể tự do mở rộng hàng nghìn từ vựng mới thuộc các Theme khác nhau mà không lo ảnh hưởng đến cấu trúc vận hành của game.

#### 📂 Case 2: Xây dựng Ngân hàng câu hỏi tập trung (Centralized Question Bank)
*   **Bối cảnh ban đầu:** Ban đầu thiết kế nhồi nhét mọi câu hỏi của các kỹ năng (`reading_question`, `listening_audio`, `writing_prompt`...) trực tiếp vào bảng `Vocabulary`. Thiết kế này khiến bảng từ vựng phình to khủng khiếp khi một từ có nhiều câu hỏi bổ trợ, vi phạm nghiêm trọng quy chuẩn chuẩn hóa cơ sở dữ liệu.
*   **Quyết định thay đổi:** Tách biệt hoàn toàn `Vocabulary` (Chứa nội dung tĩnh của từ) và `Question` (Ngân hàng câu hỏi chung).
    *   Hai bảng kết nối với nhau thông qua bảng quan hệ nhiều-nhiều `QuestionVocabulary`.
    *   Bảng nối này bổ sung cột `relation_type` (`TARGET` - từ vựng cần kiểm tra chính, `CONTEXT` - từ vựng xuất hiện làm ngữ cảnh).
    *   Mỗi câu hỏi được lưu dưới dạng một dòng độc lập trong bảng `Question`, phân loại rõ ràng qua `content_type` (Từ vựng/Ngữ pháp) và `skill` (Đọc/Viết/Nghe/Nói).
*   **Hệ quả tích cực:** Hệ thống đạt cấu trúc chuẩn hóa 3NF. Cho phép một câu hỏi kiểm tra đồng thời nhiều từ vựng và ngược lại. Cột `metadata` dạng JSONB giúp lưu trữ cấu trúc động của các mini-game (như Matching, Sorting, Multiple Choice) một cách linh hoạt mà không phá vỡ Schema chính.

#### 📂 Case 3: Quy hoạch Bản vẽ (Blueprint) thành Mô hình Inventory
*   **Bối cảnh ban đầu:** Blueprint ban đầu được coi như một trường đếm số lượng tổng hợp trong Profile của người dùng (`full_blueprints`). Việc này gây khó khăn khi game mở rộng nhiều công trình khác nhau vì hệ thống không biết người dùng đang giữ bản vẽ của công trình nào và cấp độ mấy.
*   **Quyết định thay đổi:** Quy hoạch `Blueprint` thành một Static Entity (thực thể tĩnh mô tả định nghĩa bản vẽ) và quản lý tiến trình sở hữu bằng thực thể động `UserBlueprint`.
    *   `Blueprint` tĩnh chứa: `id`, `code` (Ví dụ: `BLUEPRINT_HOUSING_LV2`), `building_id`, và `target_level`.
    *   `UserBlueprint` đóng vai trò là bảng kho đồ (Inventory): Lưu `user_id`, `blueprint_id` và `quantity` (số lượng thực tế sở hữu).
    *   *Sự tiến hóa của `BuildingLevel`:* Trong bản v2, bảng cấu hình `BuildingLevel` chứa khóa ngoại `blueprint_id`. Tuy nhiên, trong bản v4, cột này đã bị loại bỏ hoàn toàn. Hệ thống sẽ tự động xác định Blueprint tương ứng một cách logic thông qua cặp `(building_id, target_level)` vì `Blueprint` đã được ràng buộc Unique cho cặp thông tin này dưới Database.
*   **Hệ quả tích cực:** Tránh lặp thông tin cấu hình ở hai phía. Database thực thi tính nhất quán: Một Blueprint đại diện cho đúng một Building và một Target Level duy nhất.

#### 📂 Case 4: Tách biệt Bể câu hỏi (Question Pool) và Lượt thi thực tế (Exam Attempt Question)
*   **Bối cảnh ban đầu:** Ban đầu thiết kế bảng quan hệ `ExamQuestion` (Pool câu hỏi của đề thi) chứa cột `question_order` để định nghĩa thứ tự hiển thị câu hỏi. Tuy nhiên, thiết kế này phá vỡ cơ chế game-play ngẫu nhiên: Mỗi lần người chơi vào thi (Attempt) sẽ luôn nhận được đề thi với thứ tự giống hệt nhau, gây ra sự nhàm chán và dễ gian lận.
*   **Quyết định thay đổi:** Tách biệt hoàn toàn định nghĩa bể câu hỏi của đề thi và vết lượt thi thực tế của người chơi.
    *   `ExamQuestion` đóng vai trò là bể câu hỏi tĩnh (Question Pool), chỉ làm nhiệm vụ map `exam_id` và `question_id`, **tuyệt đối không lưu `question_order`**.
    *   Mỗi khi người chơi bắt đầu thi, hệ thống sinh ra một bản ghi `ExamAttempt` (Động).
    *   Đồng thời, Backend sẽ random ngẫu nhiên $N$ câu hỏi từ Pool tĩnh và snapshot trực tiếp vào bảng `ExamAttemptQuestion` kèm theo cột `question_order` thực tế của lượt thi đó (bắt đầu từ 1).
*   **Hệ quả tích cực:** Bảo mật tối đa kết quả thi và hỗ trợ tính năng phục hồi bài thi đang dang dở (Resume Attempt) khi người chơi lỡ thoát ứng dụng giữa chừng. Đồng thời hỗ trợ lưu vết chi tiết phục vụ cho phân tích học tập (Learning Analytics) sau này.
