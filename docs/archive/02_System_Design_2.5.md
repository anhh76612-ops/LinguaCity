## 2.5 — ROOM DATABASE DESIGN

### 2.5.1. Mục tiêu
Phần này chuyển mô hình dữ liệu đã thiết kế ở PostgreSQL thành cấu trúc Local Database trên Android sử dụng Room.

**Quy tắc Source of Truth:**
*   **PostgreSQL (Backend) = Global / Server Authority:** Quyết định cuối cùng mọi thay đổi về tài nguyên, cấp độ, và kết quả thi.
*   **Room Database = Local Source of Truth cho Presentation Layer và Local Operation:** Là nguồn dữ liệu cục bộ mà UI đọc trực tiếp để đảm bảo phản hồi tức thì và hỗ trợ Offline. Đối với Gameplay-critical data, PostgreSQL/Backend vẫn là nguồn sự thật cuối cùng.
Room không phải nơi quyết định Gameplay State; Room chỉ lưu và phản ánh State đã được Server xác nhận đối với các Gameplay-critical operation.
Room
= Local Operational SSOT

PostgreSQL
= Authoritative SSOT
**Kiến trúc:**
```text
                PostgreSQL
             Server Authority
                    ▲
                    │ Sync
                    │
                  Room
           Local Operational State
                    ▲
                    │
             Repository
                    ▲
                    │
            ViewModel / MVI
                    ▲
                    │
             Jetpack Compose
```

### 2.5.2. Nguyên tắc thiết kế Local Database
Room không nhất thiết phải sao chép nguyên trạng toàn bộ PostgreSQL Schema. Cần phân biệt rõ:
*   **Static Content (Cache từ Backend):** `Theme`, `Building`, `BuildingLevel`, `Blueprint`, `Vocabulary`, `Question`, `Exam`, `ExamRequirement`, `ExamQuestion`, `QuestionVocabulary`.
*   **Player State (Cache trạng thái người chơi trên thiết bị):**
---

### 2.5.3. Room Entities & Mapping Constraints
Dưới đây là bảng đối chiếu các Entity phụ trợ và Player State nhằm đảm bảo Local Schema tương thích với PostgreSQL Schema, đồng thời phản ánh các điều chỉnh có chủ đích cho môi trường Mobile/Offline-first. Room có thể loại bỏ một số trường Static Content hoặc thay đổi kiểu lưu trữ so với PostgreSQL khi cần thiết cho bảo mật, Offline Operation hoặc đặc thù SQLite.

| Room Entity | Primary Key (PK) | Foreign Key (FK) chính | Unique / Index |
| :--- | :--- | :--- | :--- |
| **ExamRequirementEntity** | `id` | `examId` | `UNIQUE(examId)` |
| **ExamQuestionEntity** | `(examId, questionId)` | `Exam`, `Question` | PK Index |
| **QuestionVocabularyEntity**| `(questionId, vocabularyId)`| `Question`, `Vocabulary`| `Index(vocabularyId)` |
| **UserBuildingEntity** | `id` | `User`, `Building` | `UNIQUE(userId, buildingId)` |
| **UserVocabProgressEntity** | `id` | `User`, `Vocabulary` | `UNIQUE(userId, vocabularyId)` |
| **UserBlueprintEntity** | `id` | `User`, `Blueprint` | `UNIQUE(userId, blueprintId)` |

---

### 2.5.4. Local Schema — Static Content

#### 2.5.4.1. ThemeEntity
```kotlin
@Entity(
    tableName = "themes",
    indices = [Index(value = ["code"], unique = true)]
)
data class ThemeEntity(
    @PrimaryKey val id: Long,
    val code: String,
    val name: String,
    val description: String?
)
```

#### 2.5.4.2. BuildingEntity
```kotlin
@Entity(
    tableName = "buildings",
    indices = [
        Index(value = ["code"], unique = true),
        Index(value = ["themeId"])
    ],
    foreignKeys = [
        ForeignKey(
            entity = ThemeEntity::class,
            parentColumns = ["id"],
            childColumns = ["themeId"],
            onDelete = ForeignKey.RESTRICT
        )
    ]
)
data class BuildingEntity(
    @PrimaryKey val id: Long,
    val code: String,
    val themeId: Long,
    val maxLevel: Int
)
```

#### 2.5.4.3. BuildingLevelEntity
Room sử dụng Composite Primary Key. 
*Lưu ý Kiến trúc:* Room không tạo Foreign Key trực tiếp tới `BlueprintEntity`. Repository cung cấp dữ liệu `BuildingLevel` và `Blueprint`; **Domain/Application Layer** sẽ xác định Blueprint tương ứng theo logic: `(buildingId, level) ↔ (buildingId, targetLevel)`.
```kotlin
@Entity(
    tableName = "building_levels",
    primaryKeys = ["buildingId", "level"],
    foreignKeys = [
        ForeignKey(
            entity = BuildingEntity::class,
            parentColumns = ["id"],
            childColumns = ["buildingId"],
            onDelete = ForeignKey.RESTRICT
        )
    ],
    indices = [Index(value = ["buildingId"])]
)
data class BuildingLevelEntity(
    val buildingId: Long,
    val level: Int,
    val knowledgeCost: Int,
    val constructionTime: Long
)
```

#### 2.5.4.4. BlueprintEntity
```kotlin
@Entity(
    tableName = "blueprints",
    indices = [
        Index(value = ["code"], unique = true),
        Index(value = ["buildingId", "targetLevel"], unique = true)
    ],
    foreignKeys = [
        ForeignKey(
            entity = BuildingEntity::class,
            parentColumns = ["id"],
            childColumns = ["buildingId"],
            onDelete = ForeignKey.RESTRICT
        )
    ]
)
data class BlueprintEntity(
    @PrimaryKey val id: Long,
    val code: String,
    val buildingId: Long,
    val targetLevel: Int
)
```

#### 2.5.4.5. VocabularyEntity
```kotlin
@Entity(
    tableName = "vocabularies",
    indices = [Index(value = ["themeId", "level", "difficultyRank"])],
    foreignKeys = [
        ForeignKey(
            entity = ThemeEntity::class,
            parentColumns = ["id"],
            childColumns = ["themeId"],
            onDelete = ForeignKey.RESTRICT
        )
    ]
)
data class VocabularyEntity(
    @PrimaryKey val id: Long,
    val word: String,
    val meaning: String,
    val wordType: String,
    val ipa: String?,
    val examples: List<String>,
    val imageUrl: String?,
    val themeId: Long,
    val level: Int,
    val difficultyRank: String // Mapping sang DifficultyRank Enum ở Domain
)
```

### 2.5.5. JSON TypeConverter Strategy
Không tạo một Converter khổng lồ cho mọi loại JSON. 
*   `examples (List<String>)`: Sử dụng TypeConverter chuyên biệt với Kotlinx Serialization.
*   `metadata` và `answerPayload`: Lưu trực tiếp thành `String?` trong Room. Việc mapping thành `JsonObject/JsonElement` sẽ do **Repository/Mapper** xử lý bằng Kotlinx Serialization để kiểm soát linh hoạt.

```kotlin
class JsonConverters {
    @TypeConverter
    fun fromStringList(value: List<String>?): String? {
        return value?.let { Json.encodeToString(it) }
    }

    @TypeConverter
    fun toStringList(value: String?): List<String>? {
        return value?.let { Json.decodeFromString(it) }
    }
}
```

### 2.5.6. QuestionEntity (Bảo mật Đáp án)
**Quyết định Kiến trúc:** Với MVP, `QuestionEntity` trong Room **KHÔNG** lưu trường `answer` chuẩn. Với MVP, Vocabulary/Flashcard có thể được đọc Offline từ Room.
Các hoạt động Learning có chấm điểm và thay đổi Mastery yêu cầu kết nối Backend.

```kotlin
@Entity(
    tableName = "questions",
    indices = [Index(value = ["contentType", "skill", "questionType"])]
)
data class QuestionEntity(
    @PrimaryKey val id: Long,
    val contentType: String,
    val skill: String,
    val questionType: String,
    val questionText: String?,
    val explanation: String?,
    val audioUrl: String?,
    val metadata: String? // JSON String
)
```

### 2.5.7. ExamEntity
Bổ sung Local FK cho `rewardBlueprintId`. 
*Lưu ý:* Room chỉ duy trì Referential Integrity giữa `rewardBlueprintId` và `BlueprintEntity.id`; tính nhất quán giữa `Building + Target Level + Blueprint` tiếp tục do Backend/PostgreSQL enforce chính thức và không được coi là Local Constraint đầy đủ. Domain Layer có thể kiểm tra trước để tránh hiển thị trạng thái sai trên UI, nhưng đây không phải Constraint thay thế cho Server.

```kotlin
@Entity(
    tableName = "exams",
    indices = [
        Index(value = ["code"], unique = true),
        Index(value = ["buildingId", "targetLevel"])
    ],
    foreignKeys = [
        ForeignKey(
            entity = BuildingEntity::class,
            parentColumns = ["id"],
            childColumns = ["buildingId"],
            onDelete = ForeignKey.RESTRICT
        ),
        ForeignKey(
            entity = BlueprintEntity::class,
            parentColumns = ["id"],
            childColumns = ["rewardBlueprintId"],
            onDelete = ForeignKey.RESTRICT
        )
    ]
)
data class ExamEntity(
    @PrimaryKey val id: Long,
    val code: String,
    val buildingId: Long,
    val targetLevel: Int,
    val rewardBlueprintId: Long,
    val questionCount: Int
)
```

---

### 2.5.8. Local Schema — Player State

#### 2.5.8.1. UserProfileEntity
`id` sử dụng `String` để tiện mapping. Quy tắc đóng gói: `Room(String) -> Domain(UUID)`.
```kotlin
@Entity(tableName = "user_profiles")
data class UserProfileEntity(
    @PrimaryKey val id: String,
    val knowledgePoints: Int,
    val hourglassCount: Int,
    val blueprintShards: Int
)
```

### 2.5.9. ExamAttemptEntity
**Lưu ý Partial Unique Index:** Backend đã Freeze rule "User + Exam -> MAX 1 IN_PROGRESS Attempt". Room SQLite **không thể** biểu diễn trực tiếp Partial Unique Index bằng `@Index`. 
Do đó: **Constraint này chỉ được Backend/PostgreSQL enforce chính thức.** Room chỉ hỗ trợ Local Validation bằng DAO Query để tối ưu UX.
```kotlin
@Entity(
    tableName = "exam_attempts",
    indices = [
        Index(value = ["userId", "examId"]),
        Index(value = ["examId", "status"])
    ],
    foreignKeys = [
        ForeignKey(
            entity = UserProfileEntity::class,
            parentColumns = ["id"],
            childColumns = ["userId"],
            onDelete = ForeignKey.CASCADE
        ),
        ForeignKey(
            entity = ExamEntity::class,
            parentColumns = ["id"],
            childColumns = ["examId"],
            onDelete = ForeignKey.RESTRICT
        )
    ]
)
data class ExamAttemptEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val userId: String,
    val examId: Long,
    val status: String,
    val startedAt: Long,
    val completedAt: Long?
)
```

### 2.5.10. ExamAttemptQuestionEntity
Lưu Snapshot của Question Set.
```kotlin
@Entity(
    tableName = "exam_attempt_questions",
    primaryKeys = ["attemptId", "questionId"],
    indices = [Index(value = ["attemptId", "questionOrder"], unique = true)],
    foreignKeys = [
        ForeignKey(
            entity = ExamAttemptEntity::class,
            parentColumns = ["id"],
            childColumns = ["attemptId"],
            onDelete = ForeignKey.CASCADE
        ),
        ForeignKey(
            entity = QuestionEntity::class,
            parentColumns = ["id"],
            childColumns = ["questionId"],
            onDelete = ForeignKey.RESTRICT
        )
    ]
)
data class ExamAttemptQuestionEntity(
    val attemptId: Long,
    val questionId: Long,
    val questionOrder: Int,
    val answerPayload: String?, // JSON String, được phép NULL trước khi trả lời
    val isCorrect: Boolean?,    
    val answeredAt: Long?       
)
```

---

### 2.5.11. DAO Design & Transaction Strategy

#### 2.5.11.1. Tối ưu Static Content Update
Sử dụng `@Upsert` thay vì `@Insert(onConflict = REPLACE)` cho Static Content để tránh tác dụng phụ (SQLite âm thầm xóa và tạo lại record gây đứt gãy Foreign Key, kích hoạt Cascade không mong muốn).

```kotlin
@Dao
interface VocabularyDao {
    @Query("SELECT * FROM vocabularies WHERE themeId = :themeId AND level = :level")
    fun observeByThemeAndLevel(themeId: Long, level: Int): Flow<List<VocabularyEntity>>

    @Upsert
    suspend fun upsertAll(items: List<VocabularyEntity>)
}
```

#### 2.5.11.2. ExamAttemptDao (Resume Attempt Support)
Hỗ trợ lấy bài thi đang dang dở (IN_PROGRESS).
```kotlin
@Dao
interface ExamAttemptDao {
    @Query("""
        SELECT * FROM exam_attempts 
        WHERE userId = :userId AND examId = :examId AND status = 'IN_PROGRESS' 
        LIMIT 1
    """)
    suspend fun getInProgressAttempt(userId: String, examId: Long): ExamAttemptEntity?
    
    @Insert
    suspend fun insertAttempt(attempt: ExamAttemptEntity)
}
```

#### 2.5.11.3. Transaction Repository Layer
Transaction nhiều DAO được điều phối tại **Repository/Data layer** bằng `RoomDatabase.withTransaction`; DAO chỉ chịu trách nhiệm thao tác trên bảng của mình. Không tạo các DAO giả để gom Transaction.

```kotlin
class ExamRepositoryImpl(
    private val database: LinguacityDatabase,
    private val examAttemptDao: ExamAttemptDao,
    private val examAttemptQuestionDao: ExamAttemptQuestionDao
) : ExamRepository {

    override suspend fun saveExamSnapshot(
        attempt: ExamAttemptEntity,
        questions: List<ExamAttemptQuestionEntity>
    ) {
        database.withTransaction {
            examAttemptDao.insertAttempt(attempt)
            examAttemptQuestionDao.insertAll(questions)
        }
    }
}
```
**Quyết định Random:** Exam Question Set được Random và cấp phát hoàn toàn ở **Backend**. Room chỉ lưu lại Snapshot. Room không tự tạo Attempt trong MVP để đảm bảo tính an toàn chống gian lận.

---

### 2.5.12. Room Database Initialization & Migration
Tất cả 16 Entity của LinguaCity được khai báo tường minh cùng với các DAO tương ứng.

```kotlin
@Database(
    entities = [
        ThemeEntity::class,
        BuildingEntity::class,
        BuildingLevelEntity::class,
        BlueprintEntity::class,
        VocabularyEntity::class,
        QuestionEntity::class,
        QuestionVocabularyEntity::class,
        ExamEntity::class,
        ExamRequirementEntity::class,
        ExamQuestionEntity::class,
        UserProfileEntity::class,
        UserBuildingEntity::class,
        UserVocabProgressEntity::class,
        UserBlueprintEntity::class,
        ExamAttemptEntity::class,
        ExamAttemptQuestionEntity::class
    ],
    version = 1,
    exportSchema = true
)
@TypeConverters(JsonConverters::class)
abstract class LinguacityDatabase : RoomDatabase() {
    abstract fun themeDao(): ThemeDao
    abstract fun buildingDao(): BuildingDao
    abstract fun buildingLevelDao(): BuildingLevelDao
    abstract fun blueprintDao(): BlueprintDao
    abstract fun vocabularyDao(): VocabularyDao
    abstract fun questionDao(): QuestionDao
    abstract fun questionVocabularyDao(): QuestionVocabularyDao
    abstract fun examDao(): ExamDao
    abstract fun examRequirementDao(): ExamRequirementDao
    abstract fun examQuestionDao(): ExamQuestionDao
    abstract fun userProfileDao(): UserProfileDao
    abstract fun userBuildingDao(): UserBuildingDao
    abstract fun userVocabProgressDao(): UserVocabProgressDao
    abstract fun userBlueprintDao(): UserBlueprintDao
    abstract fun examAttemptDao(): ExamAttemptDao
    abstract fun examAttemptQuestionDao(): ExamAttemptQuestionDao
}
```
**Migration:** Bắt buộc cung cấp `Migration(1, 2)` khi nâng cấp Schema. Tuyệt đối không dùng `fallbackToDestructiveMigration()` trên Production để tránh mất Player State đang lưu Offline.

---

### 2.5.13. Domain Mapping & Offline-first Strategy
Không truyền Entity của Room trực tiếp cho UI.

**1. Ánh xạ Enum (Enum Mapping):**
Để tránh "magic strings" rải rác trong code, các trường phân loại lưu dưới dạng `String` trong Room sẽ được ánh xạ thành `Enum` ở tầng Domain.
Ví dụ cho `ExamAttemptEntity.status`:
```text
Room Persistence (String: "IN_PROGRESS") 
        ↓ Mapper 
Domain Model (Enum: ExamAttemptStatus.IN_PROGRESS)
```
Quy tắc tương tự áp dụng cho: `UserBuilding.status`, `Question.contentType`, `Question.skill`, `Question.questionType`, `QuestionVocabulary.relationType`.

**2. Chiến lược Offline Write & Server Authority:**
MVP áp dụng chiến lược Offline Read-Only.

Room chỉ cho phép đọc các Static Content đã được cache trước đó, đặc biệt là Vocabulary/Flashcard.

Các thao tác làm thay đổi Player State hoặc Gameplay State như:
- cập nhật Mastery;
- Start Exam;
- Submit Exam;
- Upgrade Building;
- nhận Blueprint;
- thay đổi Resource;

đều yêu cầu kết nối Backend và được Server xác thực trước khi cập nhật Room.

---

### 2.5.14. Trạng thái thiết kế

| Hạng mục | Trạng thái |
| :--- | :--- |
| **Room Database Architecture** (Local SSOT) | ✅ Freeze |
| **Full Entity Mapping / Schema Definition | ✅ Freeze
| **Static Content Entities** (Bỏ cache Answer) | ✅ Freeze |
| **Player State Entities** | ✅ Freeze |
| **Composite Keys & FKs** | ✅ Freeze |
| **JSON Mapping** (String + Kotlinx Ser) | ✅ Freeze |
| **DAO Structure** (Dùng @Upsert) | ✅ Freeze |
| **Transaction Architecture** (Dùng withTransaction) | ✅ Freeze |
| **Local/Domain Mapping** (Ánh xạ Enum/UUID) | ✅ Freeze |
| **Exam Flow** (Backend Random -> Room Snapshot)| ✅ Freeze |
| **Offline Strategy** (Read-Only MVP) | ✅ Freeze |
| **Local Write cho Learning khi Offline** | ❌ Không áp dụng |
| **Sync Queue / Local Outbox** | ⏳ Phase 2 |
| **Conflict Resolution** | ⏳ Phase 2 |
| **Sync Queue / Conflict Resolution** | ⏳ Chờ 2.6 |

---

### 2.5.15. Kết luận

Room Database được thiết kế như Local Operational Database của Mobile App, đóng vai trò Local SSOT cho Presentation Layer.

MVP áp dụng chiến lược **Offline Read-Only**:

```text
Online:
Backend → Retrofit → Room → UI

Offline:
Room → UI