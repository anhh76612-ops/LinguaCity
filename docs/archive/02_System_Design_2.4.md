## 2.4 — API CONTRACT / INTERFACE DESIGN

### 2.4.1. Mục tiêu
Phần này xác định hợp đồng giao tiếp giữa Mobile App và Backend Server của LinguaCity.
API Contract phải đảm bảo:

*   Mobile không phụ thuộc trực tiếp vào cấu trúc JPA Entity.
*   Backend chịu trách nhiệm xác thực toàn bộ Gameplay-critical data.
*   Request/Response sử dụng DTO riêng.
*   API phản ánh đúng các Business Flow đã được thiết kế ở phần 2.3.
*   API có thể mở rộng mà không phá vỡ Mobile App hiện tại.

**Kiến trúc giao tiếp:**
```text
Mobile App
    ↓
HTTP / REST
    ↓
Controller
    ↓
Service
    ↓
Repository
    ↓
PostgreSQL
```

### 2.4.2. Nguyên tắc API

#### 2.4.2.1. RESTful API
API sử dụng HTTP/REST.
Base URL dự kiến: `/api/v1`

Version được đặt ngay trong URL để tránh breaking change khi API thay đổi trong tương lai. MVP sử dụng: `/api/v1/...`

#### 2.4.2.2. HTTP Methods
MVP hiện tại chủ yếu sử dụng **GET** (Truy vấn dữ liệu) và **POST** (Gửi Command thay đổi trạng thái). Các phương thức `PUT/PATCH/DELETE` được giữ trong REST Convention nhưng chưa có Endpoint cụ thể trong phạm vi MVP.

### 2.4.3. Guest User / Identity
MVP không sử dụng Login/JWT. Mobile tạo UUID cho Guest User:
```text
Android
   ↓
Generate UUID
   ↓
Local Storage
   ↓
API Request
```

**Ví dụ Header:**
```http
X-Guest-User-Id: 550e8400-e29b-41d4-a716-446655440000
```
**Quy tắc Khởi tạo (User Onboarding):**
Khi nhận Request, Backend kiểm tra UUID này:
*   Nếu UUID chưa tồn tại: Tự động khởi tạo `UserProfile` mới cấp phát các Resource mặc định.
*   Nếu UUID đã tồn tại: Load `UserProfile` hiện tại.

*(Lưu ý: Đây không phải cơ chế Authentication/Security; nó chỉ là cơ chế xác định Guest User trong MVP. Định hướng mở rộng tương lai: Guest UUID -> Link Account -> JWT / Session Identity).*

Backend tuyệt đối không tin tưởng các resource hoặc Player State do Client gửi lên. Backend phải lấy trạng thái thực tế từ Database.

---

### 2.4.4. Vocabulary API (Static Content)

#### 2.4.4.1. Lấy toàn bộ Vocabulary
```http
GET /api/v1/vocabularies
```

#### 2.4.4.2. Lọc Vocabulary
```http
GET /api/v1/vocabularies?themeId=1&level=1
```

---

### 2.4.5. User State API

#### 2.4.5.1. Lấy Player Profile
```http
GET /api/v1/users/me/profile
```

#### 2.4.5.2. Lấy Blueprint Inventory (Kho thẻ bản đồ)
API hỗ trợ lấy danh sách Blueprint User đang sở hữu (phục vụ màn hình Inventory và Upgrade UI).
```http
GET /api/v1/users/me/blueprints
```
**Response:**
```json
{
  "items": [
    {
      "blueprintId": 12,
      "code": "BLUEPRINT_HOUSING_LV2",
      "buildingId": 1,
      "targetLevel": 2,
      "quantity": 1
    }
  ]
}
```

#### 2.4.5.3. Lấy Card Progress
```http
GET /api/v1/users/me/vocabulary-progress?themeId=1&level=1
```
`maxMastery` được Backend tính từ Difficulty Rank/Configuration, không phải dữ liệu Player State độc lập.

---

### 2.4.6. Building API

#### 2.4.6.1. Lấy danh sách Building (Static)
```http
GET /api/v1/buildings
```

#### 2.4.6.2. Lấy Building State của User
```http
GET /api/v1/users/me/buildings
```
Backend kết hợp: `Building + UserBuilding` để tạo Response DTO.

---

### 2.4.7. Exam API
Đây là nhóm API quan trọng nhất của MVP.

#### 2.4.7.1. Lấy danh sách Exam
```http
GET /api/v1/exams?buildingId=1
```
**Response:**
```json
{
  "items": [
    {
      "id": 101,
      "code": "EXAM_HOUSING_LV2",
      "buildingId": 1,
      "targetLevel": 2,
      "questionCount": 10,
      "isAvailable": true
    }
  ]
}
```
*Đã thay đổi `isUnlocked` thành `isAvailable`.* Đây không phải Database Column. Backend tính logic:
`Collection >= required` AND `Knowledge >= required` AND `Shards >= required` AND `Building State hợp lệ` AND `Question Pool đủ`.

#### 2.4.7.2. Phục hồi bài thi (Resume Attempt)
Dùng để Mobile App khôi phục lại bài thi đang dang dở nếu lỡ thoát app.
```http
GET /api/v1/attempts/{attemptId}
```
**Response:**
```json
{
  "attemptId": 501,
  "status": "IN_PROGRESS",
  "questionCount": 10,
  "questions": [...]
}
```

---

### 2.4.8. Start Exam API
**Endpoint:**
```http
POST /api/v1/exams/{examId}/start
```

#### 2.4.8.1. Backend Validation & Race Condition Protection
Backend phải kiểm tra các điều kiện (Tồn tại, Đủ tài nguyên, Pool câu hỏi).
**Bảo vệ Race Condition:**
*   Hệ thống kiểm tra `IN_PROGRESS Attempt` và thao tác trừ `Resource` phải nằm trong cùng một `Transaction`.
*   Áp dụng `Partial Unique Index` đã thiết lập dưới Database để chặn các request gọi đồng thời.
*   Nếu xảy ra race condition, Database sẽ reject Attempt thứ hai. Transaction của request thất bại phải Rollback việc trừ Resource ngay lập tức.

#### 2.4.8.2. Response
Chỉ trả về Snapshot câu hỏi (không chứa đáp án thực tế).

---

### 2.4.9. Submit Exam API
**Endpoint:**
```http
POST /api/v1/attempts/{attemptId}/submit
```
**Request:**
```json
{
  "answers": [
    { "questionId": 31, "answerPayload": "A" }
  ]
}
```

#### 2.4.9.1. Incomplete Submission Rule (Nộp thiếu câu)
Hệ thống **bắt buộc** số câu trả lời phải khớp hoàn toàn với cấu hình bài thi:
`submitted_answer_count == EXAM.question_count` AND `Mỗi AttemptQuestion phải có 1 answer tương ứng`.
Nếu User submit thiếu câu (ví dụ 7/10), Backend sẽ Reject toàn bộ Request với Error Code: `INCOMPLETE_EXAM_SUBMISSION` và yêu cầu User hoàn thành đủ.

#### 2.4.9.2. Server Authority & Scoring
*   Mobile chỉ gửi `answerPayload`. Backend tự lấy đáp án chuẩn ra chấm.
*   `score` (Tổng điểm) là một giá trị được tính động (derived value) dựa trên tổng số `EXAM_ATTEMPT_QUESTION.is_correct == true`. Nó không được lưu như một Column vật lý độc lập trong bảng `EXAM_ATTEMPT` để tránh trùng lặp dữ liệu.
*   Mastery Update (cho TARGET Vocabulary): Correct → Mastery +1, Wrong → Mastery -1.

#### 2.4.9.3. Response (Pass/Fail)
*   **Pass:** `status = PASSED`, nhận Blueprint cụ thể từ cấu hình Exam.
*   **Fail:** `status = FAILED`, Không Refund, Không Blueprint Reward, Không Reset Mastery/Collection.

---

### 2.4.10. Exam Retry API
Client gọi lại: `POST /api/v1/exams/{examId}/start`
Backend tạo Attempt mới với ID mới và Random một set câu hỏi mới. Attempt cũ (đã FAILED) không bị sửa/xóa.

---

### 2.4.11. Building Upgrade API
**Endpoint:**
```http
POST /api/v1/buildings/{buildingId}/upgrade
```
Validation: Không đang UPGRADING, Knowledge đủ, Blueprint đúng loại và số lượng >= 1.
```text
BEGIN TRANSACTION
  Knowledge -= cost
  Blueprint quantity -= 1
  target_level = current + 1
  status = UPGRADING
  finish_at = Server Time + construction_time
COMMIT
```

### 2.4.12. Complete Building API
**Endpoint:**
```http
POST /api/v1/buildings/{buildingId}/complete
```
**Bảo mật Thời gian:**
Tất cả các kiểm tra thời gian xây dựng bắt buộc sử dụng **Server Time**, tuyệt đối không sử dụng Device Time từ Client gửi lên (tránh User sửa giờ điện thoại để hack thời gian xây nhà).
Điều kiện: `status = UPGRADING` và `finish_at <= Server Time`.

---

### 2.4.13. Flashcard Collection API
```http
GET /api/v1/users/me/flashcards?themeId=1&level=1&masteryStatus=WEAK
```

### 2.4.14. Learning Analytics API
```http
GET /api/v1/users/me/learning-summary
```
**Quy tắc xác định (Analytics Rules):**
*   **Newly Learned:** `first_seen_at = NULL` (trước Attempt) AND `TARGET Vocabulary` AND `Answer = Correct`.
*   **Needs Learning:** `first_seen_at = NULL` (trước Attempt) AND `TARGET Vocabulary` AND `Answer = Wrong`.
*   **Needs Review:** `first_seen_at != NULL` (trước Attempt) AND `TARGET Vocabulary` AND `Answer = Wrong`.

---

### 2.4.15. API Contract Summary
```text
                      MOBILE APP
                           │
                           │ REST / JSON
                           ↓
                     API CONTROLLER
                           │
                           ↓
                     SERVICE LAYER
                           │
             ┌─────────────┼─────────────┐
             ↓             ↓             ↓
        Validation     Business       Transaction
                         Logic
                           │
                           ↓
                      JPA Repository
                           │
                           ↓
                       PostgreSQL
```

### 2.4.16. Trạng thái thiết kế

| Hạng mục | Trạng thái |
| :--- | :--- |
| API Versioning | ✅ Freeze |
| REST Convention | ✅ Freeze |
| Guest User Handling (Auto-create) | ✅ Freeze |
| Vocabulary API | ✅ Baseline |
| Building API | ✅ Baseline |
| Blueprint Inventory API | ✅ Freeze |
| Exam API | ✅ Baseline |
| Start Exam API (Race-condition protected) | ✅ Freeze |
| Submit Exam API (Strict Complete Check) | ✅ Freeze |
| Resume Attempt API | ✅ Freeze |
| Upgrade API (Server-time synced) | ✅ Freeze |
| Flashcard API | ✅ Baseline |
| Learning Analytics API (Strict Rule) | ✅ Baseline |
| Sync API | 🟡 Baseline / Future detailed design |
| AI Recommendation API | ⏳ Future |
| Error Contract | ✅ Baseline |
| Idempotency | ✅ Freeze |
| API Authentication/JWT | ⏳ Future |

### 1. Bổ sung cho phần 2.4 — API CONTRACT (Chèn thêm vào cuối file 2.4)

### 2.4.X. Learning API

#### 2.4.X.1. Lấy Learning Item (Bài tập tiếp theo)
Hệ thống chọn bài tập dựa trên thuật toán Spaced Repetition (Mastery, Recency) và Weight của Theme/Level thuộc công trình.
**Endpoint:**
```http
GET /api/v1/buildings/{buildingId}/learning/next
```
**Response:**
```json
{
  "vocabulary": {
    "id": 101,
    "word": "negotiate",
    "meaning": "đàm phán",
    "ipa": "/nɪˈɡoʊʃieɪt/",
    "difficultyRank": "D"
  },
  "question": {
    "id": 501,
    "contentType": "VOCABULARY",
    "skill": "READING",
    "questionType": "MULT_CHOICE",
    "questionText": "What does negotiate mean?",
    "metadata": {}
  }
}
```
*(Lưu ý: Không trả về answer. Client hiển thị dựa trên metadata).*

#### 2.4.X.2. Chấm điểm bài tập (Submit Answer)
**Endpoint:**
```http
POST /api/v1/learning/answer
```
**Request:**
```json
{
  "questionId": 501,
  "answerPayload": "A"
}
```
**Response:** Backend thực hiện chấm điểm và trả về kết quả kèm Mastery mới.
```json
{
  "questionId": 501,
  "isCorrect": true,
  "masteryScore": 8,
  "maxMastery": 10
}
```