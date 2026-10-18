# 2.1 — DOMAIN ENTITIES & DATA DICTIONARY

## 2.1.1. Mục tiêu

Phần này xác định các thực thể nghiệp vụ cốt lõi của LinguaCity và ranh giới trách nhiệm của từng nhóm dữ liệu.

Mô hình được thiết kế theo nguyên tắc:

```text
Static Content
    ↓
Mô tả thế giới và nội dung học tập

Player State
    ↓
Mô tả trạng thái của từng người chơi

Supporting / Infrastructure Data
    ↓
Liên kết nội dung, bài thi, tiến trình và các cơ chế hệ thống
```

Nguyên tắc xuyên suốt:

> **Static Content mô tả thế giới và nội dung học tập; Player State mô tả trạng thái hiện tại của từng người chơi trong thế giới đó.**

---

# 2.1.2. Nguyên tắc phân chia dữ liệu

## Static Content

Đây là dữ liệu do hệ thống quản lý và phần lớn được cung cấp cho người chơi dưới dạng Read-only.

```text
Theme
Building
BuildingLevel
Blueprint
Vocabulary
Question
Exam
ExamRequirement
```

Một số bảng trung gian thuộc Static Content:

```text
ExamQuestion
QuestionVocabulary
```

Static Content có thể được Backend phân phối xuống Mobile và cache trong Room để hỗ trợ **Offline Read-Only**.

---

## Player State

Đây là dữ liệu thay đổi theo tiến trình và trạng thái Gameplay của từng User.

```text
UserProfile
UserBuilding
UserVocabProgress
UserBlueprint
ExamAttempt
ExamAttemptQuestion
```

Gameplay-critical Player State được Backend/PostgreSQL kiểm soát cuối cùng.

---

# 2.1.3. Quy tắc Domain Modeling

Các nguyên tắc chính:

```text
1. Static Content không chứa trạng thái riêng của User.
2. Player State không sao chép Definition của Static Content.
3. Vocabulary là Card tĩnh.
4. UserVocabProgress là trạng thái của Card đối với từng User.
5. Building là Definition của loại công trình.
6. UserBuilding là trạng thái công trình của từng User.
7. Question là đơn vị bài tập trong Centralized Question Bank.
8. Exam là Definition của bài Test.
9. ExamAttempt là một lần thi thực tế của User.
10. Blueprint là Definition của Blueprint dùng cho một Building + Target Level.
```

---

# 2.1.4. Static Content Entities

## 2.1.4.1. Theme

`Theme` đại diện cho chủ đề học tập của một nhóm Vocabulary.

### Fields

| Field | Type | Key | Null | Constraint / Notes |
|---|---|---|---|---|
| `id` | Long | PK | NO | Auto Increment |
| `code` | String | UK | NO | Ví dụ `DAILY_LIFE` |
| `name` | String | — | NO | Tên hiển thị |
| `description` | String | — | YES | Mô tả Theme |

### Quan hệ

```text
Theme 1 ─── N Building

Theme 1 ─── N Vocabulary
```

MVP ưu tiên mỗi Building sử dụng một Theme.

Database không khóa cứng việc một Theme được sử dụng cho nhiều Building.

---

# 2.1.4.2. Building

`Building` đại diện cho **định nghĩa của một loại công trình**, không chứa trạng thái của một User cụ thể.

### Fields

| Field | Type | Key | Null | Constraint / Notes |
|---|---|---|---|---|
| `id` | Long | PK | NO | Auto Increment |
| `code` | String | UK | NO | `HOUSING`, `ROAD`, `PARK`, `SCHOOL` |
| `theme_id` | Long | FK | NO | References `Theme(id)` |
| `max_level` | Int | — | NO | Level tối đa |

### Nguyên tắc

Không chứa:

```text
user_id
current_level
target_level
is_unlocked
status
started_at
finish_at
```

Các thuộc tính trên thuộc Player State và được lưu trong `UserBuilding`.

---

# 2.1.4.3. BuildingLevel

`BuildingLevel` mô tả cấu hình của một Building tại một Level cụ thể.

### Fields

| Field | Type | Key | Null | Constraint / Notes |
|---|---|---|---|---|
| `building_id` | Long | PK/FK | NO | References `Building(id)` |
| `level` | Int | PK | NO | Level cấu hình |
| `knowledge_cost` | Int | — | NO | Knowledge cần để nâng lên Level này |
| `construction_time` | Int/Long | — | NO | Thời gian xây dựng |

### Composite Primary Key

```text
PK(building_id, level)
```

### Blueprint Mapping

`BuildingLevel` không lưu `blueprint_id`.

Blueprint tương ứng được xác định theo:

```text
BuildingLevel
(building_id, level)

        ↕

Blueprint
(building_id, target_level)
```

Việc xác định Blueprint tương ứng là Business/Domain Logic; PostgreSQL có thể enforce tính nhất quán bằng các Constraint/Composite FK đã thiết kế.

---

# 2.1.4.4. Blueprint

`Blueprint` là một Definition cụ thể của Blueprint dùng để nâng một Building lên một Target Level.

### Fields

| Field | Type | Key | Null | Constraint / Notes |
|---|---|---|---|---|
| `id` | Long | PK | NO | Auto Increment |
| `code` | String | UK | NO | Ví dụ `BLUEPRINT_HOUSING_LV2` |
| `building_id` | Long | FK | NO | References `Building(id)` |
| `target_level` | Int | — | NO | Level mà Blueprint mở khóa |

### Unique Constraint

```text
UNIQUE(building_id, target_level)
```

Ví dụ:

```text
Housing + Level 2
        ↓
BLUEPRINT_HOUSING_LV2
```

Blueprint không đại diện cho số lượng User đang sở hữu; số lượng của từng User nằm trong `UserBlueprint`.

---

# 2.1.4.5. Vocabulary

Mỗi Vocabulary là một **Vocabulary Card** tĩnh của hệ thống.

### Fields

| Field | Type | Key | Null | Constraint / Notes |
|---|---|---|---|---|
| `id` | Long | PK | NO | Auto Increment |
| `word` | String | — | NO | Từ vựng |
| `meaning` | String | — | NO | Nghĩa |
| `word_type` | String / Enum | — | NO | Noun, Verb, Adj... |
| `ipa` | String | — | YES | Phiên âm IPA |
| `examples` | JSONB | — | YES | Danh sách câu ví dụ |
| `image_url` | String | — | YES | Hình minh họa |
| `theme_id` | Long | FK | NO | References `Theme(id)` |
| `level` | Int | — | NO | Level xuất hiện |
| `difficulty_rank` | String / Enum | — | NO | `D`, `C`, `B`, `A`, ... |

### Nguyên tắc

Vocabulary không gắn trực tiếp với:

```text
building_id
building_type
user_id
```

Thay vào đó:

```text
Building → Theme → Vocabulary
```

Điều này giảm coupling giữa nội dung học tập và cấu trúc công trình.

---

# 2.1.4.6. Question

`Question` là một đơn vị bài tập trong **Centralized Question Bank**.

Một Question không đồng nghĩa với một Vocabulary Card.

Một Vocabulary có thể liên quan tới nhiều Question và một Question có thể kiểm tra nhiều Vocabulary thông qua `QuestionVocabulary`.

### Fields

| Field | Type | Key | Null | Constraint / Notes |
|---|---|---|---|---|
| `id` | Long | PK | NO | Auto Increment |
| `content_type` | Enum | — | NO | `VOCABULARY`, `GRAMMAR` |
| `skill` | Enum | — | NO | `READING`, `WRITING`, `LISTENING`, `SPEAKING` |
| `question_type` | String / Enum | — | NO | `MULT_CHOICE`, `FILL_BLANK`, `MATCHING_GAME`, `SORTING_GAME`, ... |
| `question_text` | Text | — | YES | Nullable vì một số Mini-game không cần text |
| `answer` | Text | — | YES | Đáp án chuẩn, chỉ dùng Server-side Validation |
| `explanation` | Text | — | YES | Giải thích |
| `audio_url` | String | — | YES | Chuẩn bị cho Listening |
| `metadata` | JSONB | — | YES | Payload đặc thù theo `question_type` |

### Metadata Principle

`metadata` là **typed extension payload**, không phải nơi chứa tùy ý mọi dữ liệu.

Dữ liệu ổn định, cần query/filter/join phải nằm ở các cột quan hệ:

```text
content_type
skill
question_type
...
```

Dữ liệu phụ thuộc vào loại Mini-game nằm trong:

```text
metadata JSONB
```

### Ví dụ: MULT_CHOICE

```json
{
  "options": [
    {"key": "A", "text": "To discuss"},
    {"key": "B", "text": "To cancel"},
    {"key": "C", "text": "To delay"},
    {"key": "D", "text": "To purchase"}
  ]
}
```

### Ví dụ: MATCHING_GAME

```json
{
  "pairs": [
    {"id": "p1", "left": "Negotiate", "right": "Đàm phán"},
    {"id": "p2", "left": "Contract", "right": "Hợp đồng"}
  ]
}
```

### Ví dụ: SORTING_GAME

```json
{
  "tokens": [
    "contract",
    "negotiate",
    "to",
    "They",
    "decided"
  ]
}
```

### Nguyên tắc bảo mật

Đáp án chuẩn không được gửi cho Client trước khi người chơi hoàn thành câu hỏi.

Do đó tách:

```text
Question Storage Model
```

và:

```text
Question Gameplay DTO
```

Backend giữ Answer chuẩn để validation; Mobile chỉ nhận payload cần cho hiển thị và tương tác.

---

# 2.1.4.7. Exam

`Exam` đại diện cho một bài Test sát hạch.

### Fields

| Field | Type | Key | Null | Constraint / Notes |
|---|---|---|---|---|
| `id` | Long | PK | NO | Auto Increment |
| `code` | String | UK | NO | Ví dụ `EXAM_HOUSING_LV2` |
| `building_id` | Long | FK | NO | Building mục tiêu |
| `target_level` | Int | — | NO | Level mà Exam dùng để mở Blueprint |
| `reward_blueprint_id` | Long | FK | NO | Blueprint nhận khi Pass |
| `question_count` | Int | NO | NO | Số Question được chọn cho mỗi Attempt |

### Nguyên tắc

Exam Definition xác định:

```text
Building
+
Target Level
+
Question Count
+
Reward Blueprint
```

Điều kiện tham gia Exam được tách riêng sang:

```text
ExamRequirement
```

Không nhúng toàn bộ Resource Requirement vào `Exam`.

---

# 2.1.4.8. ExamRequirement

`ExamRequirement` mô tả các điều kiện cần đạt trước khi User được phép Start một Exam.

### Fields

| Field | Type | Key | Null | Constraint / Notes |
|---|---|---|---|---|
| `id` | Long | PK | NO | Auto Increment |
| `exam_id` | Long | UK/FK | NO | References `Exam(id)` |
| `required_card_count` | Int | — | NO | Số Card cần Collected |
| `required_knowledge` | Int | — | NO | Knowledge cần khi Start Exam |
| `required_blueprint_shards` | Int | — | NO | Blueprint Shards cần khi Start Exam |

### Unique Constraint

```text
UNIQUE(exam_id)
```

### Business Rule

Ví dụ:

```text
Housing Level 1
      ↓
Required Cards = 40
      ↓
Collected = 39
      ↓
LOCKED
```

Khi:

```text
Collected = 40
```

thì Exam đạt điều kiện Collection.

Resource Requirement vẫn được kiểm tra tại thời điểm Start Exam.

---

# 2.1.4.9. ExamQuestion

`ExamQuestion` là Supporting Entity bắt buộc cho MVP, dùng làm **Question Pool** của Exam.

### Quan hệ

```text
Exam N ↔ N Question
```

thông qua:

```text
ExamQuestion
```

### Fields

| Field | Type | Key | Null |
|---|---|---|---|
| `exam_id` | Long | PK/FK | NO |
| `question_id` | Long | PK/FK | NO |

### Composite Primary Key

```text
PK(exam_id, question_id)
```

### Nguyên tắc

`ExamQuestion` chỉ xác định Question nào thuộc Pool của Exam.

Không lưu `question_order`.

`question_order` thuộc:

```text
ExamAttemptQuestion
```

vì mỗi Attempt có thể nhận Question Set khác nhau.

---

# 2.1.4.10. QuestionVocabulary

`QuestionVocabulary` liên kết Question với Vocabulary mà Question kiểm tra hoặc sử dụng làm ngữ cảnh.

### Fields

| Field | Type | Key | Null | Constraint / Notes |
|---|---|---|---|---|
| `question_id` | Long | PK/FK | NO | References `Question(id)` |
| `vocabulary_id` | Long | PK/FK | NO | References `Vocabulary(id)` |
| `relation_type` | Enum | — | NO | `TARGET`, `CONTEXT` |

### Composite Primary Key

```text
PK(question_id, vocabulary_id)
```

### Nguyên tắc

```text
metadata
→ How to play?

QuestionVocabulary
→ What knowledge is being tested?

ExamQuestion
→ Which Exam may use the Question?
```

Ba lớp có trách nhiệm độc lập.

`TARGET` dùng để xác định Vocabulary chính đang được kiểm tra.

`CONTEXT` mô tả Vocabulary xuất hiện trong ngữ cảnh nhưng không nhất thiết là kiến thức chính.

---

# 2.1.5. Player State Entities

## 2.1.5.1. UserProfile

`UserProfile` là Root Entity của Player State.

### Fields

| Field | Type | Key | Null | Default |
|---|---|---|---|---|
| `id` | UUID/String | PK | NO | Client-generated |
| `knowledge_points` | Int | — | NO | 0 |
| `hourglass_count` | Int | — | NO | 0 |
| `blueprint_shards` | Int | — | NO | 0 |

### Identity

MVP sử dụng Guest User.

```text
Android
   ↓
Generate UUID
   ↓
Store locally
   ↓
Send UUID to Backend
   ↓
Create / Load UserProfile
```

MVP chưa sử dụng Login/JWT.

`UserProfile` không lưu `full_blueprints` tổng hợp.

Blueprint được quản lý theo từng Definition cụ thể thông qua:

```text
UserBlueprint
```

---

# 2.1.5.2. UserBuilding

`UserBuilding` biểu diễn trạng thái của một Building đối với từng User.

### Fields

| Field | Type | Key | Null | Default |
|---|---|---|---|---|
| `id` | Long | PK | NO | Auto Increment |
| `user_id` | UUID/String | FK | NO | — |
| `building_id` | Long | FK | NO | — |
| `current_level` | Int | — | NO | 0 |
| `target_level` | Int | — | YES | NULL |
| `is_unlocked` | Boolean | — | NO | false |
| `status` | Enum | — | NO | `IDLE` |
| `started_at` | Timestamp | — | YES | NULL |
| `finish_at` | Timestamp | — | YES | NULL |

### Unique Constraint

```text
UNIQUE(user_id, building_id)
```

### Status

```text
IDLE
UPGRADING
```

`current_level`, `target_level`, `status`, `started_at`, `finish_at` thuộc Player State vì mỗi User có thể ở trạng thái khác nhau.

---

# 2.1.5.3. UserVocabProgress

`UserVocabProgress` lưu trạng thái của một Vocabulary Card đối với từng User.

### Fields

| Field | Type | Key | Null | Meaning |
|---|---|---|---|---|
| `id` | Long | PK | NO | Auto Increment |
| `user_id` | UUID/String | FK | NO | User |
| `vocabulary_id` | Long | FK | NO | Vocabulary |
| `mastery_score` | Int | — | NO | Điểm Mastery hiện tại |
| `first_seen_at` | Timestamp | — | YES | Lần đầu gặp Card |
| `last_reviewed_at` | Timestamp | — | YES | Lần học gần nhất |

### Unique Constraint

```text
UNIQUE(user_id, vocabulary_id)
```

---

# 2.1.6. Vocabulary Card System

Mỗi Vocabulary là một Card duy nhất đối với mỗi User.

Ví dụ:

```text
Vocabulary:
negotiate

→ Card của User A
```

Nếu Card xuất hiện lại:

```text
Không tạo Card mới.
Collection không tăng.
Mastery có thể thay đổi nếu User làm bài tập.
```

Lần xuất hiện đầu tiên:

```text
first_seen_at = now()
```

Các lần học sau:

```text
last_reviewed_at = now()
```

---

# 2.1.7. Collection Progress vs Mastery Progress

Hai tiến trình được tách biệt hoàn toàn.

## Collection Progress

Đo số Card người chơi đã từng gặp.

Ví dụ Level 1 có 40 Card:

```text
32 / 40
```

Có thể derive:

```text
Collected Count
=
COUNT(UserVocabProgress.first_seen_at IS NOT NULL)
```

## Mastery Progress

Đo mức độ thông thạo của từng Card.

Ví dụ:

```text
negotiate → 8 / 10
contract  → 3 / 10
schedule  → 10 / 10
```

Hai khái niệm không được gộp thành một phần trăm duy nhất.

---

# 2.1.8. Mastery Score

Mỗi Card có:

```text
mastery_score
max_mastery
```

Trong MVP:

```text
Correct Answer → mastery_score + 1

Wrong Answer   → mastery_score - 1
```

### Boundary Rule

```text
0 ≤ mastery_score ≤ max_mastery
```

Nếu:

```text
mastery_score = 0
```

và trả lời sai:

```text
mastery_score vẫn = 0
```

Nếu:

```text
mastery_score = max_mastery
```

và trả lời đúng:

```text
mastery_score vẫn = max_mastery
```

Mastery chỉ thay đổi sau một hoạt động học tập có chấm điểm.

Đọc Flashcard hoặc mở Vocabulary không làm tăng Mastery.

---

# 2.1.9. Difficulty Rank

Mỗi Vocabulary Card có Difficulty Rank:

```text
D → C → B → A → ...
```

Rank và Mastery là hai khái niệm khác nhau:

```text
Difficulty Rank
= Độ khó của nội dung

Mastery Score
= Mức độ người chơi đã thông thạo
```

Ví dụ:

```text
negotiate

Rank = C
Mastery = 8 / 15
```

---

# 2.1.10. Max Mastery theo Rank

Mỗi Rank có `max_mastery` riêng.

Ví dụ:

```text
D → 10
C → 15
B → 20
A → 25
```

Các giá trị cụ thể là **Game Balance Configuration** và chưa Freeze.

Các giá trị này không được hardcode thành Constraint của Database Schema.

---

# 2.1.11. Difficulty Distribution theo Level

Tỷ lệ Vocabulary Card được lựa chọn theo Difficulty Rank thay đổi theo Level.

Ví dụ đã Freeze ở MVP:

```text
Level 1

D = 100%
```

```text
Level 2

D = 70%
C = 30%
```

Các Level cao hơn sẽ tiếp tục được cấu hình sau khi prototype được kiểm thử.

Đây là **Content Selection Rule / Game Balance**, không phải Player State.

---

# 2.1.12. Weighted Random Card Selection

Khi User chọn:

```text
Learn Building
```

Backend thực hiện:

```text
Building
   ↓
Current Level
   ↓
Theme
   ↓
Candidate Vocabulary Pool
   ↓
Difficulty Distribution
   ↓
Mastery Weight
   ↓
Recency Penalty
   ↓
Weighted Random
   ↓
Selected Vocabulary
```

### Weight

Weight không lưu cố định trong `UserVocabProgress`.

Weight được tính động dựa trên ít nhất:

```text
Difficulty
+
Mastery
+
Recency
```

Mục tiêu:

- Card mới hoặc yếu → xác suất xuất hiện cao hơn.
- Card đã Mastered → xác suất xuất hiện thấp hơn.
- Card vừa xuất hiện → bị giảm khả năng xuất hiện liên tiếp.

Công thức cụ thể chưa Freeze.

---

# 2.1.13. Recent-use Penalty / Cooldown

Card vừa xuất hiện không nên lập tức xuất hiện liên tục.

Thông tin cần thiết có thể lấy từ:

```text
last_reviewed_at
```

Backend áp dụng Recent-use Penalty/Cooldown khi tính Weight.

Công thức và thời gian cụ thể chưa Freeze.

---

# 2.1.14. MASTERED

Một Card được coi là:

```text
MASTERED
```

khi:

```text
mastery_score = max_mastery
```

Đây là trạng thái được **derive ở Domain Layer**.

Không lưu thêm:

```text
status = MASTERED
```

vào `UserVocabProgress`.

Conceptual State:

```text
0
↓
LEARNING
↓
max_mastery
↓
MASTERED
```

---

# 2.1.15. Learning Session

Khi User bấm học, hệ thống có thể tạo một Learning Session ở tầng Domain để quản lý trạng thái của phiên học.

Learning Session có thể chứa:

```text
building
theme
level
candidate_cards
current_card
cards_seen
```

MVP **không yêu cầu `LearningSession` trở thành Database Table**.

Nó có thể tồn tại như Domain Model/Runtime State trong một phiên học.

---

# 2.1.16. Question và Vocabulary

Hai Entity có trách nhiệm khác nhau:

```text
Vocabulary
= Card / Knowledge Content

Question
= Exercise / Assessment Content
```

Quan hệ:

```text
Question
    ↕
QuestionVocabulary
    ↕
Vocabulary
```

`QuestionVocabulary` là Supporting Entity dùng cho:

- Vocabulary-specific practice.
- Learning Analytics.
- Recommendation.
- Mini-game.
- Spaced Repetition trong tương lai.

---

# 2.1.17. Question Metadata

`metadata` mô tả cấu trúc đặc thù của Mini-game.

Nguyên tắc:

```text
metadata
→ How to play?
```

Trong khi:

```text
QuestionVocabulary
→ What knowledge is being tested?
```

và:

```text
ExamQuestion
→ Where is the Question used?
```

Ba lớp có ba trách nhiệm độc lập.

---

# 2.1.18. Exam Unlock Condition

Điều kiện Collection để mở Exam được xác định bởi `ExamRequirement`.

Ví dụ:

```text
Housing Lv1

Required Cards = 40

Collected:
39 / 40
→ LOCKED

Collected:
40 / 40
→ Collection condition satisfied
```

Ngoài Collection Count, khi User bấm Start Exam Backend tiếp tục kiểm tra:

```text
required_knowledge
required_blueprint_shards
```

Do đó:

```text
Collection Requirement
+
Resource Requirement
```

được kiểm tra ở các bước phù hợp.

Không yêu cầu toàn bộ Card đạt Max Mastery mới được thi.

Điều này tạo ra hai mục tiêu:

```text
Collect all Cards
```

và:

```text
Master Cards
```

---

# 2.1.19. Exam Attempt

`ExamAttempt` là một lần thi thực tế của User.

### Fields

| Field | Type | Key | Null | Meaning |
|---|---|---|---|---|
| `id` | Long | PK | NO | Attempt ID |
| `user_id` | UUID/String | FK | NO | User |
| `exam_id` | Long | FK | NO | Exam |
| `status` | Enum | NO | NO | `IN_PROGRESS`, `PASSED`, `FAILED` |
| `started_at` | Timestamp | — | NO | Thời điểm Start |
| `completed_at` | Timestamp | — | YES | Thời điểm Submit |

### Business Rule

Một User chỉ có tối đa một:

```text
IN_PROGRESS Attempt
```

cho cùng một Exam.

Retry tạo Attempt mới.

---

# 2.1.20. Exam Attempt Question

`ExamAttemptQuestion` lưu Question Set thực tế được cấp cho một Attempt.

### Fields

| Field | Type | Key | Null |
|---|---|---|---|
| `attempt_id` | Long | PK/FK | NO |
| `question_id` | Long | PK/FK | NO |
| `question_order` | Int | — | NO |
| `answer_payload` | JSON/String | — | YES |
| `is_correct` | Boolean | — | YES |
| `answered_at` | Timestamp | — | YES |

### Composite Primary Key

```text
PK(attempt_id, question_id)
```

### Unique Constraint

```text
UNIQUE(attempt_id, question_order)
```

### Nguyên tắc

`answer_payload`, `is_correct` và `answered_at` có thể NULL trước khi User trả lời.

Question Set được Backend random từ `ExamQuestion`.

Room lưu Snapshot để UI có thể khôi phục Attempt đang `IN_PROGRESS`.

---

# 2.1.21. UserBlueprint

`UserBlueprint` biểu diễn số lượng Blueprint cụ thể mà User đang sở hữu.

### Fields

| Field | Type | Key | Null | Meaning |
|---|---|---|---|---|
| `id` | Long | PK | NO | Auto Increment |
| `user_id` | UUID/String | FK | NO | User |
| `blueprint_id` | Long | FK | NO | Blueprint |
| `quantity` | Int | NO | NO | Số lượng sở hữu |

### Unique Constraint

```text
UNIQUE(user_id, blueprint_id)
```

Ví dụ:

```text
User A
+
BLUEPRINT_HOUSING_LV2
+
quantity = 1
```

Khi Pass Exam:

```text
quantity += reward_quantity
```

Khi Upgrade:

```text
quantity -= 1
```

Resource Economy được Backend kiểm soát.

---

# 2.1.22. Flashcard Collection

Hệ thống có màn hình Flashcard Collection để User xem các Card đã gặp.

Mỗi Card tối thiểu hiển thị:

```text
Word
Meaning
IPA
Difficulty Rank
Current Mastery
Max Mastery
Last Reviewed
```

Có thể mở rộng Filter:

```text
Theme
Level
Rank
Mastery
Weak Cards
Mastered Cards
Recently Seen
```

### Offline Read-Only

Collection có thể đọc từ Room:

```text
Room
 ↓
Flow
 ↓
Flashcard Screen
```

Offline không được thay đổi Mastery.

---

# 2.1.23. Core Learning Flow

```text
Building
   ↓
Theme + Level
   ↓
Vocabulary Card Pool
   ↓
Difficulty Distribution
   ↓
Mastery Weight
   ↓
Recency Penalty
   ↓
Weighted Random
   ↓
Selected Card
   ↓
Question / Mini-game
   ↓
Backend Grading
   ↓
Mastery +1 / -1
   ↓
Update UserVocabProgress
   ↓
Collection Progress
   ↓
Required Cards reached?
   ├── No → Continue Learning
   └── Yes → Collection condition for Exam satisfied
```

---

# 2.1.24. Core Game Loop

```text
Learn
   ↓
Collect Cards
   ↓
Increase Mastery
   ↓
Collect đủ Cards
   ↓
Meet Exam Requirements
   ↓
Exam
   ↓
Pass
   ↓
Blueprint
   ↓
Build / Upgrade
   ↓
Unlock next Level
   ↓
Learn next content
```

Nguyên tắc Product Core:

> **Tiến bộ học tập trực tiếp quyết định tiến bộ của thành phố.**

---

# 2.1.25. Server Authority

Trong MVP, mọi thao tác làm thay đổi Gameplay-critical State đều được Backend kiểm soát.

```text
Question Answer
   ↓
Backend Grading
   ↓
Mastery Update
```

```text
Exam Pass
   ↓
Blueprint Reward
```

```text
Building Upgrade
   ↓
Resource Deduction
   ↓
Building State Update
```

```text
Resource Change
   ↓
Backend Transaction
```

Client không được tự quyết định:

```text
mastery_score
exam_result
knowledge_points
blueprint_shards
blueprint_reward
current_level
```

Offline chỉ hỗ trợ:

```text
Read Cached Vocabulary / Flashcard
```

Không có Local Write cho Gameplay-critical State trong MVP.

---

# 2.1.26. Những quyết định đã Freeze tại 2.1

```text
✅ Static Content / Player State separation

✅ Theme Entity

✅ Building → Theme

✅ Building và UserBuilding tách biệt

✅ BuildingLevel là cấu hình theo Building + Level

✅ Blueprint là Definition theo Building + Target Level

✅ Vocabulary Card = Vocabulary

✅ UserProfile UUID

✅ UserBuilding

✅ UserVocabProgress

✅ UserBlueprint

✅ Collection Progress vs Mastery Progress

✅ Difficulty Rank

✅ Per-Rank max mastery concept

✅ Correct +1 / Wrong -1

✅ Mastery clamp 0..max_mastery

✅ Difficulty Distribution

✅ Dynamic Weight

✅ Recent-use Penalty / Cooldown concept

✅ Centralized Question Bank

✅ Question.metadata JSONB

✅ QuestionVocabulary với TARGET / CONTEXT

✅ ExamQuestion

✅ ExamRequirement

✅ ExamAttempt

✅ ExamAttemptQuestion

✅ Exam Unlock dựa trên Required Card Count

✅ Resource Requirement kiểm tra khi Start Exam

✅ Flashcard Collection

✅ Server-authoritative validation

✅ Offline Read-Only cho MVP

✅ Learning Session chỉ tồn tại ở Domain / Runtime, không phải Core Table
```

---

# 2.1.27. Những phần vẫn để mở

Các nội dung dưới đây chưa đóng băng:

```text
- Exact max_mastery value của từng Rank.
- Exact weight formula.
- Exact recent-use cooldown.
- Difficulty distribution của các Level cao hơn.
- Cách chọn số Card trong một Learning Session.
- Số Question cần làm cho một Card.
- Quy tắc cụ thể để một Question được coi là bắt buộc cho một Card.
- Chi tiết Spaced Repetition.
- Listening / Speaking.
- Grammar Event.
- Các Mini-game nâng cao.
- Adaptive Learning nâng cao.
```

Các nội dung này thuộc:

```text
Game Balance
Domain Policy
Future Learning Engine
```

và không phải lý do để thay đổi Core Data Model hiện tại.

---

# 2.1.28. Current Code → Target Design

| Thành phần | Prototype hiện tại | Target Design |
|---|---|---|
| User ID | `Long` Auto Increment | UUID String |
| Building | Có trạng thái User trộn trong Model | `Building` + `UserBuilding` |
| Building Type | String | Building `code` |
| Building Level | Chưa tách cấu hình Level | `BuildingLevel` |
| Blueprint | Chưa tách Definition | `Blueprint` + `UserBlueprint` |
| Vocabulary | Có thể gắn trực tiếp `buildingType` | Gắn `Theme` |
| Progress | `status` + `lastReviewed` | `mastery_score` + `first_seen_at` + `last_reviewed_at` |
| Theme | Chưa có | Entity riêng |
| Question | Chưa có | Centralized Question Bank |
| Mini-game Payload | Chưa có | `metadata` JSONB |
| Question ↔ Vocabulary | Chưa có | `QuestionVocabulary` |
| Exam | Chưa có | `Exam` |
| Exam Requirement | Chưa có | `ExamRequirement` |
| Exam ↔ Question | Chưa có | `ExamQuestion` |
| Exam Runtime | Chưa có | `ExamAttempt` + `ExamAttemptQuestion` |
| Flashcard Collection | Chưa hoàn chỉnh | Derived từ `UserVocabProgress` |
| Service / DTO / Mapper | Chưa hoàn thiện | Target Backend Architecture |
| Server Validation | Chưa hoàn thiện | Authoritative Server |
| Offline | Chưa xác định rõ | Offline Read-Only MVP |

---

# 2.1.29. Definition of Done — Domain Model

Phần Domain Entities được xem là hoàn thiện khi:

```text
✅ Static Content và Player State được tách biệt.
✅ Building không chứa User State.
✅ Vocabulary không phụ thuộc trực tiếp vào Building.
✅ Vocabulary được tổ chức theo Theme.
✅ Building Level có cấu hình riêng.
✅ Blueprint được định nghĩa theo Building + Target Level.
✅ UserBlueprint quản lý số lượng Blueprint của User.
✅ Vocabulary và Question được tách thành hai Entity độc lập.
✅ QuestionVocabulary quản lý quan hệ kiến thức.
✅ ExamQuestion quản lý Question Pool.
✅ ExamRequirement quản lý điều kiện Start Exam.
✅ ExamAttempt lưu từng lần thi.
✅ UserVocabProgress lưu Mastery riêng cho từng Card/User.
✅ Collection và Mastery được tách biệt.
✅ Mastery có Boundary rõ ràng.
✅ Difficulty Rank và Mastery là hai khái niệm độc lập.
✅ Weight được tính động.
✅ Offline MVP chỉ Read-Only.
✅ Gameplay-critical State được Server Authority kiểm soát.
```

---

# 2.1.30. Kết luận

Domain Model của LinguaCity được xây dựng theo ba lớp dữ liệu chính:

```text
Static Content
        ↓
Mô tả thế giới + nội dung học tập

Player State
        ↓
Mô tả tiến trình + trạng thái User

Supporting Entities
        ↓
Kết nối Question, Vocabulary, Exam và Gameplay
```

Kiến trúc này cho phép Core Loop vận hành:

```text
Learn
   ↓
Collect
   ↓
Master
   ↓
Exam
   ↓
Blueprint
   ↓
Build
   ↓
Unlock
   ↓
Learn
```

đồng thời giữ cho Data Model đủ linh hoạt để mở rộng:

```text
Mini-game
Grammar
Analytics
AI Recommendation
Spaced Repetition
Listening / Speaking
```

mà không cần phá vỡ các Entity cốt lõi.

Phần tiếp theo của System Design sử dụng Domain Model này làm nền tảng cho:

```text
2.2 — Database Design
2.3 — Data Flow & Runtime Behavior
2.4 — API Contract
2.5 — Room Database Design
2.6 — Repository & Sync Design
```
