### 2. Bản thiết kế 2.6 hoàn chỉnh (Lưu thành file mới cho 2.6)

## 2.6 — REPOSITORY & DATA ACCESS DESIGN

### 2.6.1. Kiến trúc tổng thể
Mục tiêu của phần này là xác định cách Domain và UI lấy dữ liệu từ Room/Retrofit mà không vi phạm Clean Architecture.

**Kiến trúc:**
```text
                    PRESENTATION
                         │ (Unidirectional Data Flow)
                         ↓
                    ViewModel / MVI
                         │
                         ↓
                       UseCase
                         │
                         ↓
                    Repository
                   /           \
                  /             \
                 ↓               ↓
        LocalDataSource    RemoteDataSource
                 │               │
                 ↓               ↓
               Room          Retrofit
                                  │
                                  ↓
                             Spring Boot
```

**Xác định rõ trách nhiệm:**
*   **UseCase (Domain Layer):** Chứa Business Rule.
*   **Repository (Data Layer):** Chịu trách nhiệm Data Access / Data Coordination (Đọc ở đâu, khi nào gọi API, khi nào lưu Room).
*   **Room (Local):** Local SSOT (Single Source of Truth) cho UI.
*   **Backend (PostgreSQL):** Global Authority.

*(Lưu ý: Presentation Layer sử dụng MVI; ViewModel gọi UseCase và nhận dữ liệu thông qua Repository. Chi tiết về Intent, State, Effect và Navigation được đặc tả tại phần 2.7).*

### 2.6.2. LocalDataSource
Chứa các interface tương tác với Room, cung cấp các hàm `get()`, `observe()`, `insert()`, `update()`, `upsert()`. Sử dụng Kotlin Flow để stream dữ liệu cho UI. Không chứa Business Rule.
**Ví dụ:** `VocabularyLocalDataSource`, `BuildingLocalDataSource`, `ExamLocalDataSource`, `UserVocabProgressLocalDataSource`.

### 2.6.3. RemoteDataSource
Chứa các interface tương tác với Retrofit. Chỉ làm nhiệm vụ: `Request DTO → API → Response DTO`. Tuyệt đối không truy cập trực tiếp Room.
**Ví dụ:** `VocabularyRemoteDataSource`, `LearningRemoteDataSource`, `ExamRemoteDataSource`, `BuildingRemoteDataSource`.

### 2.6.4. Repository Interfaces
Repository API phải nói bằng ngôn ngữ nghiệp vụ của Domain, nằm ở `domain/repository`.
**Ví dụ:** Thay vì `suspend fun getVocabularyFromApi(...)`, hàm phải là `suspend fun getNextLearningItem(...)`.

### 2.6.5. Vocabulary Repository
Phụ trách Vocabulary Content / Collection Read (Hỗ trợ Offline).
```kotlin
interface VocabularyRepository {
    fun observeVocabulary(themeId: Long, level: Int): Flow<List<Vocabulary>>
    fun observeUserVocabulary(userId: String): Flow<List<UserVocabulary>>
    suspend fun refreshVocabulary(themeId: Long, level: Int)
}
```

### 2.6.6. Learning Repository
Phụ trách Learning Interaction. Tạo ra Learning Item và thay đổi Mastery (Bắt buộc Online).
```kotlin
interface LearningRepository {
    suspend fun getNextLearningItem(buildingId: Long): LearningItem
    suspend fun submitAnswer(questionId: Long, answerPayload: String): LearningResult
}
```

### 2.6.7. Exam Repository
Phụ trách quá trình thi sát hạch (Gameplay-critical, bắt buộc Online).
```kotlin
interface ExamRepository {
    suspend fun startExam(examId: Long): Result<ExamAttempt>
    suspend fun submitExam(attemptId: Long, answers: List<Answer>): Result<ExamResult>
}
```
Repository không tự tính Pass/Fail, Blueprint Reward, hay Score.

### 2.6.8. Building Repository
Phụ trách Upgrade công trình.
```kotlin
interface BuildingRepository {
    suspend fun upgradeBuilding(buildingId: Long): Result<UserBuilding>
}
```
MVP không sử dụng Optimistic UI cho Resource/Building State. Luồng chuẩn: `Loading → 200 OK từ Server → Update Room → UI Update`.

### 2.6.9. SSOT & Read Local First
Quy tắc: UI tuyệt đối không gọi trực tiếp Retrofit.
`UI → Repository → Room Flow`
Khi có thao tác làm mới (Refresh):
`Retrofit → DTO → Mapper → Room @Upsert → Flow → UI`

### 2.6.10. Offline Read-Only
Quyết định kiến trúc trung tâm của MVP: Không có SyncOperation, Outbox, hay Conflict Resolution.
*   **Offline CHO PHÉP (Đọc Room):** Đọc Flashcard, Meaning, IPA, Examples, Image, Mastery đã lưu, Collection đã cache.
*   **Offline KHÔNG CHO PHÉP (Yêu cầu Mạng):** Trả lời Question, Cập nhật Mastery, Start Exam, Submit Exam, Upgrade Building, Thay đổi Resource.

### 2.6.11. Server State → Room
Toàn bộ thay đổi về Player State (`UserBuilding`, `UserVocabProgress`, `UserBlueprint`...) phải qua Server Validation trước. 
Khi User trả lời câu hỏi:
`Client gửi Answer → Backend Grading → Correct/Wrong → Mastery Update → Response → Lưu Room → UI`.
*(Client không bao giờ tự gửi `masteryScore = 8` để ép Server nhận).*

### 2.6.12. Repository Transaction
Phân biệt rõ:
*   **Server Transaction:** Đảm bảo tính nguyên tử cho logic Gameplay (Resource + Exam Result + Reward) tại PostgreSQL.
*   **Local Transaction:** Đảm bảo cập nhật đồng bộ các Entity liên quan dưới Room sau khi nhận Response từ Server.
```text
BEGIN ROOM TRANSACTION
  Update ExamAttempt
  Update UserBlueprint
  Update UserProfile
COMMIT
```

### 2.6.13. Error Handling
Repository chặn các exception hệ thống (`IOException`, `HttpException`, `RoomException`) và map thành **Domain Error** cho UseCase/ViewModel xử lý:
```kotlin
sealed interface AppError {
    data object Network : AppError
    data object Unauthorized : AppError
    data class Validation(val code: String) : AppError
    data class Conflict(val code: String) : AppError
    data object Database : AppError
    data object Unknown : AppError
}
```

### 2.6.14. Retry Strategy
MVP chỉ áp dụng Retry tự động cho Network Request (Timeout, 5xx, Connection Error) theo cơ chế Backoff (2s → 4s → 8s...). 
Đặc biệt với `Start Exam`, `Submit Exam`, `Upgrade`: Không retry mù quáng nếu chưa xác định được Server đã xử lý IDempotency hay chưa.

### 2.6.15. Hilt Dependency Graph
Cấu trúc Injection:
```text
Hilt
├── Database (Room)
├── DAO
├── Retrofit / OkHttpClient
├── API Service
├── LocalDataSource
├── RemoteDataSource
└── RepositoryImpl
```

### 2.6.16. Startup Flow
Thứ tự an toàn khi khởi động App:
1. Initialize Room
2. Check Guest UUID
3. Ensure UserProfile
4. Load Room Flow
5. UI Render (Hiển thị mượt mà tức thì)
6. Network Check:
   - *Nếu No:* Tiếp tục Offline Read-Only.
   - *Nếu Yes:* Refresh Static Content → Room Update → UI Update tự động.

### 2.6.17. Cấu trúc Package Mục tiêu
```text
data/
├── local/ (dao, entity, datasource)
├── remote/ (api, dto, datasource)
├── mapper/
└── repository/ (VocabularyRepositoryImpl, LearningRepositoryImpl...)

domain/
├── model/
├── repository/
└── usecase/

presentation/
├── mvi/
├── viewmodel/
└── screen/
```

### 2.6.18. Definition of Done
2.6 chỉ được Freeze khi:
*   ✅ UI không truy cập Room/Retrofit trực tiếp.
*   ✅ Domain chỉ biết Repository Interface.
*   ✅ Data Layer chứa RepositoryImpl.
*   ✅ LocalDataSource và RemoteDataSource tách biệt.
*   ✅ Room là Local SSOT.
*   ✅ PostgreSQL là Server Authority.
*   ✅ Static Content Pull → Room.
*   ✅ Offline = Read-Only.
*   ✅ Learning, Exam, Upgrade = Backend First.
*   ✅ Server Response → Room Transaction.
*   ✅ Entity → Domain Mapper hoàn thiện.
*   ✅ Error Mapping và Retry Strategy xác định rõ.
*   ✅ Thiết lập chuẩn Hilt Dependency Graph.

### 2.6.19. Những thứ KHÔNG làm trong MVP (Future / Phase 2)
Để tránh Feature Creep, các tính năng sau không được triển khai trong MVP:
❌ Offline Learning Write (Ghi nhận điểm Offline)
❌ SyncOperationEntity / Local Outbox
❌ Background Sync / WorkManager
❌ Conflict Resolution / Event-based Learning Sync
❌ Offline Exam & Offline Building Upgrade