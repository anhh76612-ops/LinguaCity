# LINGUACITY — 02. SYSTEM DESIGN

**Tên dự án:** LinguaCity (Thành phố Ngôn ngữ)  
**Loại tài liệu:** System Design / Architecture Design  
**Giai đoạn:** Giai đoạn 2 — Thiết kế Hệ thống  
**Trạng thái:** Đang thực hiện  
**Phiên bản:** 0.2 — Cập nhật Data Model + Exam / Blueprint / Building Level  
**Ngày cập nhật:** 22/08/2026  

---

# 1. Mục đích tài liệu

File này là tài liệu trung tâm của **Giai đoạn 2 — System Design**.

Mục tiêu của tài liệu là chuyển các yêu cầu đã được chốt trong `01_Requirements_Analysis.md` thành thiết kế kỹ thuật có thể triển khai được, đồng thời lưu lại toàn bộ các quyết định kiến trúc đã được thống nhất trong quá trình phân tích.

Tài liệu được xây dựng theo hướng:

```text
Requirements
      ↓
System Design
      ↓
Implementation
      ↓
Testing
```

Trong đó:

- File 01 trả lời: **Hệ thống phải làm gì?**
- File 02 trả lời: **Hệ thống sẽ được thiết kế như thế nào?**
- File 03 sẽ ghi lại: **Thiết kế đã được triển khai thành code như thế nào?**

File này hiện chưa phải bản System Design hoàn chỉnh. Trước mắt, tài liệu lưu giữ toàn bộ nội dung đã được chốt ở **2.1 — Domain & Data Model** và **2.1.5 — Freeze Data Dictionary + Vocabulary Card System**, tránh thất thoát quyết định khi tiếp tục phát triển.

---

# 2. Trạng thái Giai đoạn 2

## 2.1. Tiến độ hiện tại

| Hạng mục | Trạng thái |
|---|---|
| 2.1 Domain Entities | ✅ Đã chốt |
| 2.1.5 Data Dictionary + Vocabulary Card System | ✅ Đã chốt |
| 2.2 ERD + Constraints | 🟡 Đang hoàn thiện |
| 2.3 Data Flow & Sequence Diagram | ⏳ Chưa bắt đầu |
| 2.4 PostgreSQL / JPA Target Schema | ⏳ Chưa bắt đầu |
| 2.5 API Contract | ⏳ Chưa bắt đầu |
| 2.6 Room Schema + DAO | ⏳ Chưa bắt đầu |
| 2.7 Repository + Sync Design | ⏳ Chưa bắt đầu |
| 2.8 MVI + Navigation Design | ⏳ Chưa bắt đầu |
| 2.9 UI/UX Wireframe | ⏳ Chưa bắt đầu |

---

# 3. 2.1 — DOMAIN ENTITIES

## 3.1. Nguyên tắc phân chia dữ liệu

Dữ liệu của LinguaCity được chia thành hai nhóm chính:

### Static Content

Đây là dữ liệu do hệ thống quản lý. Người chơi chủ yếu đọc dữ liệu này.

```text
Theme
Building
BuildingLevel
Vocabulary
Question
Exam
ExamRequirement
Blueprint
```

### Player State

Đây là dữ liệu thay đổi liên tục theo tiến trình của từng người chơi.

```text
UserProfile
UserBuilding
UserVocabProgress
UserBlueprint
ExamAttempt
```

Nguyên tắc quan trọng:

> Static Content mô tả thế giới và nội dung học tập; Player State mô tả trạng thái hiện tại của từng người chơi trong thế giới đó.

---

# 4. Static Content Entities

## 4.1. Theme

`Theme` là thực thể đại diện cho chủ đề học tập.

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

MVP ưu tiên mỗi Building chỉ sử dụng một Theme, nhưng Database không khóa cứng khả năng một Theme được dùng cho nhiều Building.

---

# 5. Building

`Building` chỉ đại diện cho **định nghĩa của một loại công trình**, không lưu trạng thái của một người chơi cụ thể.

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
is_unlocked
status
finish_time
```

Các field trên thuộc Player State và được chuyển sang `UserBuilding`.

---

# 6. Vocabulary

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

Vocabulary không còn gắn trực tiếp với:

```text
buildingType
```

Thay vào đó:

```text
Building → Theme → Vocabulary
```

Điều này giảm coupling giữa nội dung học tập và cấu trúc công trình.

---

# 7. Question

`Question` là thực thể đại diện cho một đơn vị bài tập trong **Centralized Question Bank**.

Một Question không đồng nghĩa với một Vocabulary Card.

Một Vocabulary có thể liên quan tới nhiều Question và một Question có thể kiểm tra nhiều Vocabulary.

### Fields

| Field | Type | Key | Null | Constraint / Notes |
|---|---|---|---|---|
| `id` | Long | PK | NO | Auto Increment |
| `content_type` | Enum | — | NO | `VOCABULARY`, `GRAMMAR` |
| `skill` | Enum | — | NO | `READING`, `WRITING`, `LISTENING`, `SPEAKING` |
| `question_type` | String / Enum | — | NO | Ví dụ `MULT_CHOICE`, `FILL_BLANK`, `MATCHING_GAME`, `SORTING_GAME` |
| `question_text` | Text | — | YES | Nullable vì một số Mini-game không cần câu hỏi dạng text |
| `answer` | Text | — | YES | Đáp án chuẩn, chủ yếu dành cho server-side validation |
| `explanation` | Text | — | YES | Giải thích |
| `audio_url` | String | — | YES | Chuẩn bị cho Listening |
| `metadata` | JSONB | — | YES | Payload đặc thù theo `question_type` |

### Metadata Principle

`metadata` là **typed extension payload**, không phải nơi chứa tùy ý mọi dữ liệu.

Dữ liệu ổn định, cần query/filter/join phải nằm ở các cột quan hệ chuẩn:

```text
content_type
skill
question_type
...
```

Dữ liệu phụ thuộc loại Mini-game nên nằm trong:

```text
metadata JSONB
```

Ví dụ:

### MULT_CHOICE

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

### MATCHING_GAME

```json
{
  "pairs": [
    {"id": "p1", "left": "Negotiate", "right": "Đàm phán"},
    {"id": "p2", "left": "Contract", "right": "Hợp đồng"}
  ]
}
```

### SORTING_GAME

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

Đáp án chuẩn không nên được gửi cho Client trước khi người chơi hoàn thành câu hỏi.

Do đó cần tách:

```text
Question Storage Model
```

và:

```text
Question Gameplay DTO
```

Backend giữ thông tin cần thiết cho validation; Mobile chỉ nhận payload cần để hiển thị và tương tác.

---

# 8. Exam

`Exam` đại diện cho một bài Test sát hạch gắn với một công trình và **Level đích**.

Exam không còn chỉ xác định số lượng Blueprint nhận được. Blueprint mà Exam trả về phải là Blueprint cụ thể tương ứng với công trình và Level cần mở khóa.

### Fields

| Field | Type | Key | Null | Constraint / Notes |
|---|---|---|---|---|
| `id` | Long | PK | NO | Auto Increment |
| `code` | String | UK | NO | Ví dụ `EXAM_HOUSING_LV2` |
| `building_id` | Long | FK | NO | Building mục tiêu |
| `target_level` | Int | — | NO | Level đích |
| `reward_blueprint_id` | Long | FK | NO | Blueprint được nhận khi Pass |

### Level Consistency

`target_level` của Exam phải khớp với `target_level` của `reward_blueprint_id` và với `BuildingLevel(building_id, target_level)`.

Ví dụ:

```text
EXAM_HOUSING_LV2
    ↓
target_level = 2
    ↓
BLUEPRINT_HOUSING_LV2
    ↓
BUILDING_LEVEL(HOUSING, 2)
```

### Business Rule

Ví dụ:

```text
EXAM_HOUSING_LV2
      ↓
Housing Level 1
      ↓
Collection đủ
      ↓
Start Exam
      ↓
Pass
      ↓
BLUEPRINT_HOUSING_LV2
      ↓
Upgrade Housing 1 → 2
```

Exam không nên chỉ lưu:

```text
reward_blueprints = 1
```

vì thông tin đó không cho biết Blueprint nào được nhận.

Thay vào đó Exam phải liên kết trực tiếp tới:

```text
BLUEPRINT_HOUSING_LV2
```

### Exam Entry Cost

Khi User bấm Start Exam, hệ thống phải kiểm tra toàn bộ Requirement trước.

```text
Collection đủ
Knowledge Points đủ
Blueprint Shards đủ
Building đúng level hiện tại
```

Nếu không đủ:

```text
Exam không bắt đầu
Không mất tài nguyên
```

Nếu đủ:

```text
BEGIN TRANSACTION

Knowledge Points -= required_knowledge
Blueprint Shards -= required_blueprint_shards
Create ExamAttempt

COMMIT
```

Tài nguyên được xem là đã tiêu thụ ngay tại thời điểm bắt đầu Exam.

### Pass / Fail

```text
PASS
 ↓
Grant reward_blueprint
 ↓
ExamAttempt = PASSED
```

```text
FAIL
 ↓
Không nhận Blueprint
 ↓
Tài nguyên đã nộp không hoàn lại
 ↓
ExamAttempt = FAILED
```

Đây là Business Rule của Game Economy, không phải chỉ là chi tiết implementation.

---

# 9. Blueprint

`Blueprint` là Static Content đại diện cho **quyền nâng một Building lên một Level cụ thể**.

Blueprint phải gắn với cả Building và Target Level để tránh tình trạng một Blueprint chung có thể bị dùng sai cho nhiều công trình hoặc nhiều Level.

### Fields

| Field | Type | Key | Null | Constraint / Notes |
|---|---|---|---|---|
| `id` | Long | PK | NO | Auto Increment |
| `code` | String | UK | NO | Ví dụ `BLUEPRINT_HOUSING_LV2` |
| `building_id` | Long | FK | NO | Building tương ứng |
| `target_level` | Int | — | NO | Level mà Blueprint mở khóa |

### Ví dụ

| id | code | building | target_level |
|---|---|---|---:|
| 1 | `BLUEPRINT_HOUSING_LV2` | Housing | 2 |
| 2 | `BLUEPRINT_HOUSING_LV3` | Housing | 3 |
| 3 | `BLUEPRINT_ROAD_LV2` | Road | 2 |

Như vậy:

```text
Housing Level 2
→ BLUEPRINT_HOUSING_LV2
```

khác hoàn toàn với:

```text
Housing Level 3
→ BLUEPRINT_HOUSING_LV3
```

Blueprint là Static Content; trạng thái User sở hữu Blueprint được lưu riêng ở `UserBlueprint`.

---

# 10. BuildingLevel

`BuildingLevel` định nghĩa requirement để một loại Building đạt đến một Level cụ thể.

Level trong bảng này được hiểu là **Level đích**, không phải Level hiện tại.

### Fields

| Field | Type | Key | Null | Constraint / Notes |
|---|---|---|---|---|
| `building_id` | Long | PK/FK | NO | Building tương ứng |
| `level` | Int | PK | NO | Target Level |
| `knowledge_cost` | Int | — | NO | Knowledge Points cần để bắt đầu nâng cấp |
| `blueprint_id` | Long | FK | NO | Blueprint bắt buộc cho Level này |
| `construction_time` | Int / Duration | — | NO | Thời gian xây dựng |

### Composite Key

```text
PK(building_id, level)
```

Ví dụ:

| building | level | knowledge_cost | blueprint | construction_time |
|---|---:|---:|---|---:|
| Housing | 1 | 100 | NULL | 60s |
| Housing | 2 | 250 | `BLUEPRINT_HOUSING_LV2` | 180s |
| Housing | 3 | 500 | `BLUEPRINT_HOUSING_LV3` | 300s |

Ở đây:

```text
level = 2
```

nghĩa là **nâng công trình lên Level 2**.

Đây là nguồn sự thật duy nhất cho câu hỏi:

> “Muốn nâng Housing từ Level 1 lên Level 2 cần những gì?”

---

# 11. ExamRequirement

`ExamRequirement` lưu các tài nguyên cần có để bắt đầu một Exam.

### Fields

| Field | Type | Key | Null | Constraint / Notes |
|---|---|---|---|---|
| `id` | Long | PK | NO | Auto Increment |
| `exam_id` | Long | FK | NO | References `Exam(id)` |
| `required_card_count` | Int | — | NO | Collection Count tối thiểu |
| `required_knowledge` | Int | — | NO | Knowledge Points bị tiêu thụ khi Start |
| `required_blueprint_shards` | Int | — | NO | Blueprint Shards bị tiêu thụ khi Start |

### Ví dụ

```text
EXAM_HOUSING_LV2

required_card_count = 40
required_knowledge = 100
required_blueprint_shards = 3
```

Exam chỉ được bắt đầu khi toàn bộ các điều kiện đều thỏa mãn.

---

# 12. ExamAttempt

`ExamAttempt` lưu lại mỗi lần một User thực sự bắt đầu một Exam.

Việc thêm Entity này cần thiết vì Exam đã có **Entry Cost**. Hệ thống phải biết User đã bắt đầu Exam nào, lúc nào và kết quả ra sao.

### Fields

| Field | Type | Key | Null | Constraint / Notes |
|---|---|---|---|---|
| `id` | Long | PK | NO | Auto Increment |
| `user_id` | UUID/String | FK | NO | User thực hiện Exam |
| `exam_id` | Long | FK | NO | Exam được thực hiện |
| `status` | Enum | — | NO | `IN_PROGRESS`, `PASSED`, `FAILED` |
| `started_at` | Timestamp | — | NO | Thời điểm bắt đầu |
| `completed_at` | Timestamp | — | YES | Thời điểm hoàn thành |

### Status

```text
IN_PROGRESS
PASSED
FAILED
```

Nếu app bị đóng trong lúc đang làm bài:

```text
ExamAttempt
status = IN_PROGRESS
```

Backend vẫn biết User có một attempt đang tồn tại.

### Pass Transaction

Khi User hoàn thành Exam, Server xử lý trong một transaction:

```text
BEGIN

Verify ExamAttempt
Verify answers

IF PASS:
    create/update UserBlueprint
    quantity += 1
    status = PASSED

COMMIT
```

Nếu Fail:

```text
status = FAILED
```

Không có bước hoàn trả Entry Cost.

---

# 13. Player State Entities

## 13.1. UserProfile

`UserProfile` là root entity của Player State.

### Fields

| Field | Type | Key | Null | Default |
|---|---|---|---|---|
| `id` | UUID/String | PK | NO | Client-generated |
| `knowledge_points` | Int | — | NO | 0 |
| `hourglass_count` | Int | — | NO | 0 |
| `blueprint_shards` | Int | — | NO | 0 |

`full_blueprints` được loại bỏ khỏi `UserProfile` vì Blueprint Inventory hiện được quản lý tập trung bằng `UserBlueprint`.

### Identity

MVP không có Login/JWT. Mobile sinh UUID khi tạo Guest User.

```text
Android
   ↓
Generate UUID
   ↓
Store locally
   ↓
Create Guest User on Backend when sync is available
```

---

# 14. UserBuilding

`UserBuilding` biểu diễn trạng thái của một Building đối với từng người chơi.

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
| `started_at` | Timestamp | — | YES | — |
| `finish_at` | Timestamp | — | YES | — |

### Unique Constraint

```text
UNIQUE(user_id, building_id)
```

### Status

```text
IDLE
UPGRADING
```

`status`, `started_at`, `finish_at` và `target_level` thuộc Player State vì mỗi người chơi có thể đang nâng cấp một công trình khác nhau.

### Upgrade Flow

Ví dụ User đang có:

```text
Housing
current_level = 1
```

Khi bấm Upgrade, Backend lấy:

```text
BUILDING_LEVEL
building = HOUSING
level = 2
```

Sau đó kiểm tra:

```text
Knowledge Points >= 250
AND
UserBlueprint(BLUEPRINT_HOUSING_LV2) >= 1
```

Nếu đủ:

```text
BEGIN TRANSACTION

Knowledge Points -= 250
Blueprint_HOUSING_LV2 -= 1
current_level = 1
target_level = 2
status = UPGRADING

COMMIT
```

Khi hoàn thành:

```text
current_level = 2
target_level = NULL
status = IDLE
```

Blueprint không được lưu trực tiếp trong `UserBuilding`.

---

# 15. UserBlueprint

`UserBlueprint` lưu Inventory Blueprint mà từng User đang sở hữu.

### Fields

| Field | Type | Key | Null | Default |
|---|---|---|---|---|
| `id` | Long | PK | NO | Auto Increment |
| `user_id` | UUID/String | FK | NO | — |
| `blueprint_id` | Long | FK | NO | — |
| `quantity` | Int | — | NO | 0 |

### Unique Constraint

```text
UNIQUE(user_id, blueprint_id)
```

Ví dụ:

```text
User A
├── BLUEPRINT_HOUSING_LV2 → 1
├── BLUEPRINT_ROAD_LV2    → 2
└── BLUEPRINT_HOUSING_LV3 → 0
```

`UserBlueprint` chỉ lưu trạng thái sở hữu. Thông tin Blueprint dùng cho Level nào đã được định nghĩa ở Static Content `Blueprint`.

---

# 16. UserVocabProgress

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

### Collection

Một Card được coi là **Collected** khi:

```text
first_seen_at != NULL
```

Do đó:

```text
Collected Count
=
COUNT(first_seen_at IS NOT NULL)
```

Không tạo thêm Card khi cùng Vocabulary xuất hiện lại.

# 17. 2.1.5 — FREEZE DATA DICTIONARY + VOCABULARY CARD SYSTEM

## 17.1. Vocabulary Card

Mỗi Vocabulary là một Card duy nhất đối với mỗi người chơi.

Ví dụ:

```text
Vocabulary:
negotiate

→ Card #001 của User A
```

Nếu Card xuất hiện lại, không tạo Card mới.

Lần xuất hiện đầu tiên:

```text
Collected +1
```

Các lần tiếp theo:

```text
Collected không đổi
Mastery thay đổi
```

---

# 18. Collection Progress vs Mastery Progress

Hai tiến trình được tách biệt hoàn toàn.

## Collection Progress

Đo số Card người chơi đã từng gặp.

Ví dụ Level 1 có 40 Card:

```text
32 / 40
```

## Mastery Progress

Đo mức độ thông thạo của từng Card.

Ví dụ:

```text
negotiate → 8 / 10
contract  → 3 / 10
schedule  → 10 / 10
```

Hai khái niệm này không được gộp thành một phần trăm duy nhất.

---

# 19. Mastery Score

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

Nếu trả lời sai khi:

```text
mastery_score = 0
```

thì vẫn:

```text
0
```

Không có giá trị âm.

Nếu trả lời đúng khi:

```text
mastery_score = max_mastery
```

thì vẫn giữ:

```text
max_mastery
```

Không vượt giới hạn.

---

# 20. Difficulty Rank

Mỗi Vocabulary Card có Difficulty Rank:

```text
D → C → B → A → ...
```

Rank và Mastery là hai khái niệm khác nhau:

```text
Difficulty Rank
= độ khó của nội dung

Mastery Score
= mức độ người chơi đã thông thạo nội dung
```

Ví dụ:

```text
negotiate
Rank = C
Mastery = 8 / 15
```

---

# 21. Max Mastery theo Rank

Mỗi Rank có `max_mastery` riêng.

Ví dụ cấu hình có thể là:

```text
D → 10
C → 15
B → 20
A → 25
```

Đây là **Game Balance Configuration**, chưa đóng băng các giá trị số cụ thể trong SRS.

Không hardcode các giá trị này trực tiếp vào Database Schema.

---

# 22. Difficulty Distribution theo Level

Tỷ lệ Card được lựa chọn theo Rank thay đổi theo Level.

Ví dụ đã chốt:

```text
Level 1
D = 100%

Level 2
D = 70%
C = 30%
```

Các Level cao hơn sẽ tiếp tục được cấu hình sau khi prototype được kiểm thử.

Đây là **Content Selection Rule / Game Balance**, không phải Player State.

---

# 23. Weighted Random Card Selection

Khi người chơi bấm:

```text
Learn Building
```

hệ thống thực hiện:

```text
Building
   ↓
Theme
   ↓
Level
   ↓
Candidate Vocabulary Cards
   ↓
Difficulty Distribution
   ↓
Mastery Weight
   ↓
Recency Weight
   ↓
Weighted Random
   ↓
Selected Card
```

### Weight

Weight không được lưu cố định trong `UserVocabProgress`.

Weight được tính động dựa trên ít nhất:

```text
Difficulty
+
Mastery
+
Recency
```

Mục tiêu:

- Card mới hoặc yếu → dễ xuất hiện hơn.
- Card đã thành thạo → xuất hiện ít hơn.
- Card vừa xuất hiện → bị giảm khả năng xuất hiện liên tiếp.

---

# 24. Recent-use Penalty / Cooldown

Card vừa xuất hiện không nên lập tức xuất hiện lại liên tục.

Do đó cần một cơ chế recent-use penalty/cooldown.

Thông tin cần thiết có thể lấy từ:

```text
last_reviewed_at
```

Trong MVP chưa đóng băng công thức chính xác.

---

# 25. MASTERED

Một Card được coi là:

```text
MASTERED
```

khi:

```text
mastery_score = max_mastery
```

Không cần lưu một giá trị `status = MASTERED` riêng nếu có thể derive từ Mastery.

Conceptual state:

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

# 26. Learning Session

Khi người chơi bấm học, hệ thống tạo một Learning Session ở tầng Domain.

Learning Session có thể chứa:

```text
theme
level
candidate_cards
current_card
cards_seen
```

MVP chưa yêu cầu `LearningSession` phải trở thành Database Table.

Nó có thể là Domain Model dùng trong một phiên học.

---

# 27. Question và Vocabulary

Hai Entity có trách nhiệm khác nhau:

```text
Vocabulary
= Card / kiến thức

Question
= bài tập kiểm tra kiến thức
```

Do đó cần quan hệ:

```text
Question
   ↕
QuestionVocabulary
   ↕
Vocabulary
```

`QuestionVocabulary` được thiết kế như một **Supporting Entity**, vì một Question có thể kiểm tra nhiều Vocabulary và một Vocabulary có thể có nhiều Question.

Quan hệ này đặc biệt hữu ích cho:

- Vocabulary-specific practice.
- Analytics.
- Recommendation.
- Mini-game.
- Spaced Repetition trong tương lai.

---

# 28. Question Metadata

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

Và:

```text
ExamQuestion
→ Where is the Question used?
```

Ba lớp này có ba trách nhiệm độc lập.

---

# 29. ExamQuestion

`ExamQuestion` là Supporting Entity **bắt buộc cho MVP**.

Quan hệ:

```text
Exam N ↔ N Question
```

thông qua:

```text
ExamQuestion
```

Fields:

| Field | Type | Key | Null |
|---|---|---|---|
| `exam_id` | Long | PK/FK | NO |
| `question_id` | Long | PK/FK | NO |
| `question_order` | Int | — | NO |

---

# 30. Điều kiện Unlock Exam

Điều kiện được chốt lại:

```text
Collection Count
=
Required Card Count
```

Ví dụ:

```text
Housing Lv1
Required Cards = 40

Collected:
39 / 40
→ LOCKED

Collected:
40 / 40
→ UNLOCKED
```

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

# 31. Flashcard Collection

Hệ thống phải có một màn hình Flashcard Collection để người chơi xem các Card đã gặp.

Mỗi Card tối thiểu hiển thị:

```text
Word
Meaning
Difficulty Rank
Current Mastery
Max Mastery
Last Reviewed
```

Có thể mở rộng filter:

```text
Theme
Level
Rank
Mastery
Weak Cards
Mastered Cards
Recently Seen
```

---

# 32. Core Learning Flow

```text
Building
   ↓
Theme + Level
   ↓
Vocabulary Card Pool
   ↓
Weighted Random
   ↓
Study / Mini-game
   ↓
Question Result
   ↓
Mastery +1 / -1
   ↓
Update UserVocabProgress
   ↓
Collection Progress
   ↓
Required Cards reached?
   ├── No → Continue Learning
   └── Yes → Unlock Exam
```

---

# 33. Core Game Loop sau khi cập nhật

```text
Learn
   ↓
Collect Cards
   ↓
Increase Mastery
   ↓
Collect đủ Cards
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

---

# 34. Server Authority

Mobile có thể cập nhật UI theo hướng Optimistic để phản hồi nhanh:

```text
User Answer
   ↓
Local update
   ↓
UI feedback
```

Nhưng các trạng thái Gameplay-critical phải được Backend xác thực khi Sync:

```text
Exam Pass
Blueprint reward
Building upgrade
Resource change
Progress sync
```

Backend là nơi kiểm duyệt cuối cùng đối với các thay đổi quan trọng.

---

# 35. Những quyết định đã Freeze tại Data Model + Vocabulary Card System

```text
✅ Static Content / Player State separation
✅ Theme Entity
✅ Building → Theme
✅ Vocabulary Card = Vocabulary
✅ UserProfile UUID
✅ UserBuilding
✅ UserVocabProgress
✅ UserBlueprint
✅ Dynamic Mastery
✅ Collection vs Mastery separation
✅ Difficulty Rank
✅ Per-Rank max mastery
✅ Correct +1 / Wrong -1
✅ Mastery clamp 0..max_mastery
✅ Difficulty Distribution
✅ Dynamic Weight
✅ Recent-use Penalty/Cooldown
✅ Flashcard Collection
✅ Question Bank
✅ Question.metadata JSONB
✅ QuestionVocabulary concept
✅ ExamQuestion
✅ Exam Unlock by Collection threshold
✅ Server-authoritative validation
✅ Blueprint gắn với Building + Target Level
✅ BuildingLevel chứa Upgrade Requirement
✅ ExamRequirement chứa Exam Entry Cost
✅ ExamAttempt theo dõi từng lần thi
✅ Exam Entry Cost bị trừ khi Start Exam
✅ Fail không hoàn lại Entry Cost
✅ Pass nhận Blueprint cụ thể
✅ Upgrade tiêu thụ Knowledge + Blueprint tương ứng
```

Nhóm quyết định trên được xem là **Freeze Data Model** cho phiên bản thiết kế hiện tại. Các thay đổi tiếp theo chỉ được thực hiện khi có quyết định kiến trúc mới được ghi nhận rõ ràng.

---

# 36. Những phần vẫn để mở

Các nội dung dưới đây chưa được đóng băng:

```text
- Exact max_mastery value của từng Rank.
- Exact weight formula.
- Exact recent-use cooldown.
- Difficulty distribution của các Level cao hơn.
- Cách chọn số Card trong một Learning Session.
- Số Question cần làm cho một Card.
- Quy tắc cụ thể để một Question được coi là “bắt buộc” cho một Card.
- Chi tiết Spaced Repetition.
- Listening / Speaking.
- Chi tiết chấm điểm Exam.
- Quy tắc chọn Question cho từng Exam nếu không dùng toàn bộ ExamQuestion cố định.
```

Các nội dung này được xem là **Game Balance / Domain Policy**, không phải lý do để thay đổi Core Data Model hiện tại.

Ngược lại, các quy tắc sau đã được Freeze và không còn để mở trong MVP:

```text
- Exam Entry Cost bị trừ ngay khi Start Exam.
- Fail không hoàn lại Entry Cost.
- Pass nhận Blueprint cụ thể.
- Blueprint gắn với Building + Target Level.
- Upgrade dùng Blueprint của Target Level.
```

---

# 37. CURRENT CODE → TARGET DESIGN

| Thành phần | Prototype hiện tại | Target Design |
|---|---|---|
| User ID | `Long` Auto Increment | UUID String |
| Building | Chứa trực tiếp `user_id` | `Building` + `UserBuilding` |
| Building Type | String | Building code / Enum |
| Vocabulary | Gắn `buildingType` | Gắn `Theme` |
| Progress | `status` + `lastReviewed` | `mastery_score` + first/last seen |
| Theme | Chưa có | Entity riêng |
| Question | Chưa có | Centralized Question Bank |
| Mini-game payload | Chưa có | `metadata` JSONB |
| Exam | Chưa có | Exam + ExamRequirement + ExamAttempt |
| Exam reward | `reward_blueprints` số lượng chung | `reward_blueprint_id` cụ thể |
| Blueprint | `full_blueprints` trong UserProfile | `Blueprint` + `UserBlueprint` |
| Building Level | Chưa tách requirement theo Level | `BuildingLevel(building_id, level)` |
| Building progress | `current_level`, status | `current_level` + `target_level` + upgrade transaction |
| Exam cost | Chưa có | Knowledge + Blueprint Shards tại Start |
| Service / DTO / Mapper | Chưa hoàn thiện | Target Backend architecture |
| Server validation | Chưa hoàn thiện | Authoritative Server |

---

# 38. Future Architecture

Các cơ chế dưới đây được giữ ở mức **định hướng kiến trúc**, chưa trở thành Entity hoặc Business Rule chính thức của MVP.

Mục đích của phần này là ghi nhận hướng phát triển mà không làm Data Model hiện tại phình to chỉ vì nhu cầu tương lai.

### Nhóm cơ chế có thể mở rộng sau MVP

```text
Daily Quest
Streak / Daily Learning
Achievement / Milestone
City Event
Mastery Decay / Review
Adaptive Recommendation
Population / Happiness
Building Synergy
Era / City Expansion
Cosmetics / Personalization
Social / Leaderboard
Seasonal Content
```

### Các abstraction nên giữ khả năng mở rộng

```text
MasteryEngine
RequirementEvaluator
RewardEngine
LearningSession
QuestionRenderer
GameEvent
```

Ví dụ:

```text
RequirementEvaluator
    ↓
Exam Requirement
Upgrade Requirement
Quest Requirement (future)
Event Requirement (future)
```

và:

```text
RewardEngine
    ↓
Knowledge
Hourglass
Blueprint
Cosmetic (future)
```

Các abstraction này không đồng nghĩa với việc phải tạo thêm Database Table ngay từ MVP.

Nguyên tắc hiện tại là:

> **Chỉ thêm Data Model khi cơ chế đó thực sự được chốt và có nhu cầu triển khai.**

---

# 39. Tiếp theo: 2.2 — ERD + Database Constraints

Sau khi Domain Model, Vocabulary Card System và các quyết định Exam / Blueprint / Building Level đã được Freeze, phần còn lại của **2.2** không phải chỉ là “vẽ sơ đồ”.

Cần hoàn thành các nội dung sau:

### 2.2.1. ERD chính thức
- Toàn bộ Entity.
- Cardinality.
- PK/FK.
- Junction table.

### 2.2.2. Referential Integrity
# 2.2.2. Database Constraints & Referential Integrity

Sau khi hoàn thiện ERD, bước tiếp theo là xác định các Constraint ở mức Database. Mục tiêu của phần này không chỉ là ngăn dữ liệu sai kiểu, mà còn đảm bảo các quan hệ giữa Static Content và Player State luôn nhất quán.

Một nguyên tắc được giữ xuyên suốt thiết kế là:

> Database chịu trách nhiệm bảo vệ tính toàn vẹn của dữ liệu; Business Logic chịu trách nhiệm thực thi các quy tắc nghiệp vụ và Transaction.

Do đó, không phải mọi Business Rule đều được đưa thành `CHECK` hoặc `FOREIGN KEY`. Những thao tác như Start Exam, Pass Exam hoặc Upgrade Building vẫn phải được xử lý bằng Transaction ở tầng Backend.

---

## 2.2.2.1. Primary Key Constraints

Mỗi Entity phải có một Primary Key để xác định duy nhất một bản ghi.

### Static Content

```text
THEME
BUILDING
BLUEPRINT
VOCABULARY
QUESTION
EXAM
EXAM_REQUIREMENT
```

Các Entity này sử dụng `BIGINT` làm Primary Key.

Riêng `BUILDING_LEVEL`, `EXAM_QUESTION` và `QUESTION_VOCABULARY` sử dụng Composite Primary Key khi một bản ghi được xác định bởi nhiều thuộc tính.

```text
BUILDING_LEVEL
PK(building_id, level)

EXAM_QUESTION
PK(exam_id, question_id)

QUESTION_VOCABULARY
PK(question_id, vocabulary_id)
```

### Player State

```text
USER_PROFILE
→ UUID id

USER_BUILDING
→ BIGINT id

USER_VOCAB_PROGRESS
→ BIGINT id

USER_BLUEPRINT
→ BIGINT id

EXAM_ATTEMPT
→ BIGINT id
```

`USER_PROFILE` tiếp tục sử dụng UUID vì MVP không có Login/JWT và Mobile có thể sinh UUID cho Guest User trước khi đồng bộ với Backend.

---

## 2.2.2.2. Foreign Key Constraints

Foreign Key được sử dụng để đảm bảo một bản ghi tham chiếu phải tồn tại ở Entity đích.

### Theme

```text
BUILDING.theme_id
→ THEME.id

VOCABULARY.theme_id
→ THEME.id
```

Quan hệ:

```text
THEME
   ├── BUILDING
   └── VOCABULARY
```

Một Building hoặc Vocabulary không thể tham chiếu tới một Theme không tồn tại.

---

### Building

```text
BUILDING_LEVEL.building_id
→ BUILDING.id

BLUEPRINT.building_id
→ BUILDING.id

EXAM.building_id
→ BUILDING.id

USER_BUILDING.building_id
→ BUILDING.id
```

Như vậy toàn bộ dữ liệu liên quan tới một loại Building đều bắt đầu từ `BUILDING`.

---

### Blueprint

```text
USER_BLUEPRINT.blueprint_id
→ BLUEPRINT.id

EXAM.reward_blueprint_id
→ BLUEPRINT.id
```

Đây là điểm quan trọng trong Data Model mới.

`EXAM` không lưu một số lượng Blueprint chung, mà tham chiếu trực tiếp tới Blueprint mà Exam sẽ reward.

Ví dụ:

```text
EXAM_HOUSING_LV2
        ↓
reward_blueprint_id
        ↓
BLUEPRINT_HOUSING_LV2
```

---

### Vocabulary và User Progress

```text
USER_VOCAB_PROGRESS.user_id
→ USER_PROFILE.id

USER_VOCAB_PROGRESS.vocabulary_id
→ VOCABULARY.id
```

Điều này đảm bảo Progress luôn thuộc về một User và một Vocabulary hợp lệ.

Thiết kế hiện tại giữ `Vocabulary` là Static Content, còn trạng thái học của từng User nằm ở `USER_VOCAB_PROGRESS`.

---

### Question System

```text
QUESTION_VOCABULARY.question_id
→ QUESTION.id

QUESTION_VOCABULARY.vocabulary_id
→ VOCABULARY.id

EXAM_QUESTION.exam_id
→ EXAM.id

EXAM_QUESTION.question_id
→ QUESTION.id
```

Hai bảng này là Junction Entity:

```text
QUESTION
    ↕
QUESTION_VOCABULARY
    ↕
VOCABULARY
```

và:

```text
EXAM
    ↕
EXAM_QUESTION
    ↕
QUESTION
```

---

### Exam System

```text
EXAM_REQUIREMENT.exam_id
→ EXAM.id

EXAM_ATTEMPT.user_id
→ USER_PROFILE.id

EXAM_ATTEMPT.exam_id
→ EXAM.id
```

Một `ExamAttempt` luôn phải thuộc về một User và một Exam tồn tại.

---

## 2.2.2.3. Unique Constraints

Foreign Key chỉ đảm bảo bản ghi tham chiếu tồn tại. Các Unique Constraint tiếp tục đảm bảo một số quan hệ không bị tạo trùng.

### Building

```text
UNIQUE(BUILDING.code)
```

Ví dụ:

```text
HOUSING
ROAD
PARK
SCHOOL
```

Mỗi Building Code chỉ xuất hiện một lần.

---

### Theme

```text
UNIQUE(THEME.code)
```

---

### Blueprint

Blueprint phải được xác định duy nhất bởi:

```text
(building_id, target_level)
```

Do đó:

```text
UNIQUE(BLUEPRINT.building_id, BLUEPRINT.target_level)
```

Ví dụ:

```text
HOUSING + 2
→ BLUEPRINT_HOUSING_LV2
```

không thể tồn tại thêm một Blueprint thứ hai cũng đại diện cho `HOUSING + Lv2`.

Đây là constraint quan trọng để thực hiện quyết định chuẩn hóa mới:

> Một Blueprint đại diện cho đúng một Building và một Target Level.

`BUILDING_LEVEL` không lưu `blueprint_id`; quan hệ giữa hai khái niệm được xác định bằng:

```text
BUILDING_LEVEL.building_id
=
BLUEPRINT.building_id

BUILDING_LEVEL.level
=
BLUEPRINT.target_level
```

Như vậy không cần lưu cùng một quan hệ ở hai nơi.

---

### User Blueprint Inventory

```text
UNIQUE(USER_BLUEPRINT.user_id, USER_BLUEPRINT.blueprint_id)
```

Một User chỉ có một dòng inventory cho mỗi loại Blueprint.

Ví dụ:

```text
User A
BLUEPRINT_HOUSING_LV2 → quantity = 2
```

thay vì:

```text
User A → BLUEPRINT_HOUSING_LV2 → quantity = 1
User A → BLUEPRINT_HOUSING_LV2 → quantity = 1
```

Quantity được cộng dồn trong cùng một record. Cách này phù hợp với mô hình `USER_BLUEPRINT` đã được chọn.

---

### User Building

```text
UNIQUE(USER_BUILDING.user_id, USER_BUILDING.building_id)
```

Một User chỉ có một trạng thái đối với một loại Building.

Ví dụ:

```text
User A + Housing
```

chỉ được có một `USER_BUILDING`.

---

### Vocabulary Progress

```text
UNIQUE(USER_VOCAB_PROGRESS.user_id, USER_VOCAB_PROGRESS.vocabulary_id)
```

Một User chỉ có một Progress record cho một Vocabulary.

Điều này phù hợp với nguyên tắc:

> Một Vocabulary Card là duy nhất đối với mỗi người chơi; Card xuất hiện lại chỉ làm thay đổi Mastery, không tạo Progress record mới.

---

### Exam Requirement

```text
UNIQUE(EXAM_REQUIREMENT.exam_id)
```

Mỗi Exam chỉ có đúng một `EXAM_REQUIREMENT`.

Quan hệ:

```text
EXAM 1 ─── 1 EXAM_REQUIREMENT
```

---

### Code Fields

Các trường `code` dùng cho Static Content phải unique:

```text
THEME.code
BUILDING.code
BLUEPRINT.code
EXAM.code
```

Mục đích là tránh việc cùng một mã được dùng cho hai Content Definition khác nhau.

---

## 2.2.2.4. NOT NULL Constraints

Các field cần thiết để xác định Entity hoặc thực hiện quan hệ chính không nên cho phép `NULL`.

Ví dụ:

```text
THEME.code
THEME.name

BUILDING.code
BUILDING.theme_id
BUILDING.max_level

BUILDING_LEVEL.building_id
BUILDING_LEVEL.level
BUILDING_LEVEL.knowledge_cost
BUILDING_LEVEL.construction_time

BLUEPRINT.code
BLUEPRINT.building_id
BLUEPRINT.target_level

EXAM.code
EXAM.building_id
EXAM.reward_blueprint_id
```

Đối với Player State:

```text
USER_PROFILE.knowledge_points
USER_PROFILE.hourglass_count
USER_PROFILE.blueprint_shards

USER_BUILDING.user_id
USER_BUILDING.building_id
USER_BUILDING.current_level
USER_BUILDING.is_unlocked
USER_BUILDING.status

USER_VOCAB_PROGRESS.user_id
USER_VOCAB_PROGRESS.vocabulary_id
USER_VOCAB_PROGRESS.mastery_score

USER_BLUEPRINT.user_id
USER_BLUEPRINT.blueprint_id
USER_BLUEPRINT.quantity

EXAM_ATTEMPT.user_id
EXAM_ATTEMPT.exam_id
EXAM_ATTEMPT.status
```

Các thông tin thời gian như `started_at`, `finish_at`, `completed_at` có thể `NULL` vì chúng chỉ xuất hiện ở một số trạng thái.

Ví dụ:

```text
USER_BUILDING.status = IDLE
→ started_at = NULL
→ finish_at = NULL
```

Trong khi:

```text
USER_BUILDING.status = UPGRADING
→ started_at != NULL
→ finish_at != NULL
```

---

## 2.2.2.5. CHECK Constraints

Một số giá trị có thể được bảo vệ trực tiếp ở Database bằng `CHECK`.

### Resource không được âm

```text
CHECK(knowledge_points >= 0)

CHECK(hourglass_count >= 0)

CHECK(blueprint_shards >= 0)
```

Inventory Blueprint cũng không được âm:

```text
CHECK(USER_BLUEPRINT.quantity >= 0)
```

---

### Mastery Score

Mastery đã được định nghĩa nằm trong:

```text
0 ≤ mastery_score ≤ max_mastery
```

Nếu `max_mastery` được lưu hoặc truy xuất theo Rank, Database cần đảm bảo `mastery_score >= 0`. Phần giới hạn trên có thể được kiểm tra ở Domain Logic nếu `max_mastery` là cấu hình động.

---

### Building Level

```text
CHECK(level >= 1)

CHECK(current_level >= 0)

CHECK(target_level >= 1)
```

`current_level = 0` vẫn được giữ vì MVP cho phép một Building chưa được mở khóa.

---

### Quantity

```text
CHECK(quantity >= 0)
```

---

### Exam Requirement

```text
CHECK(required_card_count >= 0)

CHECK(required_knowledge_points >= 0)

CHECK(required_blueprint_shards >= 0)
```

---

## 2.2.2.6. ON DELETE / ON UPDATE Strategy

MVP sử dụng nguyên tắc:

> Không Cascade tùy tiện đối với Static Content có thể đang được Player State tham chiếu.

Mục tiêu là tránh trường hợp xóa một Content Definition làm mất lịch sử hoặc inventory của người chơi.

### Theme → Building / Vocabulary

Đề xuất:

```text
ON DELETE RESTRICT
ON UPDATE CASCADE
```

Không cho phép xóa Theme nếu vẫn còn Building hoặc Vocabulary sử dụng Theme đó.

---

### Building → BuildingLevel / Blueprint / Exam

Đề xuất:

```text
ON DELETE RESTRICT
ON UPDATE CASCADE
```

Không xóa Building Definition khi vẫn còn Level, Blueprint hoặc Exam phụ thuộc.

---

### Blueprint → UserBlueprint / Exam

Đề xuất:

```text
ON DELETE RESTRICT
ON UPDATE CASCADE
```

Không xóa Blueprint khi nó còn tồn tại trong Inventory của User hoặc được Exam sử dụng làm Reward.

Điều này đặc biệt quan trọng vì Blueprint là Static Content nhưng `USER_BLUEPRINT` là Player State.

---

### UserProfile → Player State

Đối với Guest User, nếu một User bị xóa hoàn toàn, các Player State thuộc User đó có thể sử dụng:

```text
ON DELETE CASCADE
```

cho:

```text
USER_BUILDING
USER_VOCAB_PROGRESS
USER_BLUEPRINT
EXAM_ATTEMPT
```

Lý do là các record này không có ý nghĩa độc lập khi User đã bị xóa.

---

### Exam → ExamRequirement

Đề xuất:

```text
ON DELETE CASCADE
```

vì `EXAM_REQUIREMENT` là dữ liệu phụ thuộc trực tiếp vào Exam.

Tuy nhiên, nếu hệ thống sau này cần lưu lịch sử Exam lâu dài, việc xóa Exam sẽ không được thực hiện tùy tiện.

---

### Exam → ExamAttempt

Đề xuất:

```text
ON DELETE RESTRICT
```

Không nên xóa Exam khi đã có `EXAM_ATTEMPT`, vì Attempt là lịch sử gameplay của User.

---

### Question / Vocabulary → Junction Tables

Đối với:

```text
QUESTION_VOCABULARY
EXAM_QUESTION
```

có thể sử dụng:

```text
ON DELETE CASCADE
```

vì đây là Junction Entity phụ thuộc trực tiếp vào Entity cha.

Ví dụ:

```text
DELETE QUESTION
        ↓
DELETE QUESTION_VOCABULARY
DELETE EXAM_QUESTION
```

Tuy nhiên, trong Production cần cân nhắc Soft Delete nếu Question Bank hoặc Exam History phải được bảo toàn.

---

## 2.2.2.7. Referential Integrity Rules

Từ các Foreign Key và Unique Constraint ở trên, một số nguyên tắc toàn vẹn được hình thành:

### Rule 1 — Blueprint phải thuộc Building hợp lệ

Không thể tồn tại:

```text
BLUEPRINT
building_id = 999
```

nếu `BUILDING.id = 999` không tồn tại.

---

### Rule 2 — Blueprint không được trùng Building + Target Level

Không được có:

```text
BLUEPRINT_A
HOUSING + Lv2

BLUEPRINT_B
HOUSING + Lv2
```

do:

```text
UNIQUE(building_id, target_level)
```

---

### Rule 3 — User chỉ sở hữu Blueprint tồn tại

```text
USER_BLUEPRINT.blueprint_id
→ BLUEPRINT.id
```

Không thể có inventory tham chiếu tới Blueprint đã không tồn tại.

---

### Rule 4 — User chỉ có một Building State cho mỗi Building

```text
UNIQUE(user_id, building_id)
```

đảm bảo một User không có hai trạng thái khác nhau cho cùng một Building.

---

### Rule 5 — User chỉ có một Progress cho mỗi Vocabulary

```text
UNIQUE(user_id, vocabulary_id)
```

đảm bảo Collection và Mastery luôn được cập nhật trên cùng một Progress record.

---

### Rule 6 — Exam Reward phải là Blueprint hợp lệ

```text
EXAM.reward_blueprint_id
→ BLUEPRINT.id
```

Do đó không thể tồn tại Exam reward một Blueprint không tồn tại.

---

### Rule 7 — Exam Requirement phải thuộc Exam tồn tại

```text
EXAM_REQUIREMENT.exam_id
→ EXAM.id
```

và:

```text
UNIQUE(exam_id)
```

đảm bảo mỗi Exam có tối đa một Requirement record.

---

## 2.2.2.8. Business-level Consistency Rules

Một số rule quan trọng không nên chỉ dựa vào Database Constraint mà phải được đảm bảo ở Domain Service + Transaction.

Đây là các Rule đã được xác định cho cơ chế Exam và Upgrade.

### Exam Entry Cost

User chỉ được Start Exam khi thỏa mãn toàn bộ Requirement:

```text
Collection Count >= Required Card Count
Knowledge Points >= Required Knowledge
Blueprint Shards >= Required Blueprint Shards
Building Level hợp lệ
```

Nếu không đủ:

```text
Exam không bắt đầu
Resources không bị trừ
```

Nếu đủ:

```text
BEGIN

Deduct Knowledge Points
Deduct Blueprint Shards
Create ExamAttempt(IN_PROGRESS)

COMMIT
```

Cơ chế này đã được xác định rõ trong thiết kế Exam mới.

---

### Exam Pass

Khi User Pass:

```text
Verify ExamAttempt
Verify Result
    ↓
Find reward_blueprint_id
    ↓
Create / Update USER_BLUEPRINT
    ↓
quantity += 1
    ↓
ExamAttempt = PASSED
```

Toàn bộ thay đổi phải nằm trong một Transaction để tránh trạng thái:

```text
Blueprint đã cộng
nhưng Attempt chưa chuyển PASSED
```

Quy tắc Pass này là Business Rule, không phải chỉ là FK Constraint.

---

### Exam Fail

Khi Fail:

```text
ExamAttempt.status = FAILED
```

và:

```text
Không refund resource
Không tạo Blueprint
Không reset Collection
Không reset Mastery
```

Tài nguyên đã được tiêu thụ từ thời điểm Start Exam.

---

### Building Upgrade

Khi User nâng Building lên Level tiếp theo:

```text
current_level = 1
target_level = 2
```

Backend xác định:

```text
(BUILDING, target_level)
        ↓
BLUEPRINT
```

Sau đó kiểm tra:

```text
Knowledge Points >= knowledge_cost

USER_BLUEPRINT.quantity >= 1
```

Nếu đủ:

```text
Knowledge Points - knowledge_cost
Blueprint quantity - 1
UserBuilding.status = UPGRADING
```

Khi hoàn thành:

```text
current_level = target_level
```

Blueprint vì vậy đại diện cho **quyền nâng tới một Target Level cụ thể**, còn `BUILDING_LEVEL` giữ Cost và Construction Time của Level đó.

---

## 2.2.2.9. Tóm tắt Constraints chính

Sau khi hoàn thiện, các Constraint quan trọng nhất của Data Model là:

```text
PRIMARY KEY
    ↓
Uniquely identify each record

FOREIGN KEY
    ↓
Protect referential integrity

UNIQUE
    ↓
Prevent duplicate logical records

NOT NULL
    ↓
Protect required data

CHECK
    ↓
Protect valid value range

ON DELETE / ON UPDATE
    ↓
Control lifecycle of related records

TRANSACTION
    ↓
Protect business consistency
```

Có thể tóm tắt các Unique Constraint chính:

```text
UNIQUE(THEME.code)

UNIQUE(BUILDING.code)

UNIQUE(BLUEPRINT.code)

UNIQUE(BLUEPRINT.building_id, BLUEPRINT.target_level)

UNIQUE(EXAM.code)

UNIQUE(EXAM_REQUIREMENT.exam_id)

UNIQUE(USER_BUILDING.user_id, USER_BUILDING.building_id)

UNIQUE(USER_VOCAB_PROGRESS.user_id, USER_VOCAB_PROGRESS.vocabulary_id)

UNIQUE(USER_BLUEPRINT.user_id, USER_BLUEPRINT.blueprint_id)
```

Điểm quan trọng nhất của phần này là Database không chỉ mô tả quan hệ trong ERD mà còn **bảo vệ các quyết định thiết kế đã được Freeze**.

Ví dụ:

```text
BUILDING + target_level
        ↓
BLUEPRINT
```

được bảo vệ bằng:

```text
UNIQUE(building_id, target_level)
```

Trong khi:

```text
Exam
 ↓
Consume Entry Cost
 ↓
ExamAttempt
 ↓
PASS
 ↓
USER_BLUEPRINT
```

được bảo vệ bởi **Foreign Key + Transaction + Business Rule**, chứ không cố gắng nhồi toàn bộ logic vào Database Constraint.

Đây là ranh giới mình muốn giữ giữa **Database Integrity** và **Domain/Business Logic** trong LinguaCity.

### 2.2.3. Unique Constraints
- `UNIQUE(user_id, building_id)`.
- `UNIQUE(user_id, vocabulary_id)`.
- `UNIQUE(user_id, blueprint_id)`.
- `UNIQUE(user_id, blueprint_id)`.
- Các mã `code` unique.

### 2.2.4. Index Design
Dự kiến cần đánh giá index cho:
- `Vocabulary(theme_id, level)`.
- `UserVocabProgress(user_id, vocabulary_id)`.
- `UserBuilding(user_id, building_id)`.
- `Question(content_type, skill, question_type)`.
- `Exam(building_id, target_level)`.
- `Blueprint(building_id, target_level)`.
- `UserBlueprint(user_id, blueprint_id)`.
- `ExamAttempt(user_id, exam_id, status)`.

### 2.2.5. Data Normalization
Kiểm tra việc tách:
- Static Content.
- Player State.
- Question payload.
- Junction relationships.

### 2.2.6. PostgreSQL/JPA Mapping
Chuyển ERD thành:
- Entity relation.
- `@ManyToOne`.
- `@OneToMany`.
- `@EmbeddedId` hoặc composite key cho junction table nếu cần.
- Enum strategy.
- JSONB mapping.

### 2.2.7. Transaction Boundaries
Xác định các thao tác phải atomic, ví dụ:

```text
Start Exam
   ↓
Validate Requirements
   ↓
Consume Entry Cost
   ↓
Create ExamAttempt
```

và khi hoàn thành:

```text
Pass Exam
   ↓
Validate Attempt + Answers
   ↓
Grant Blueprint
   ↓
Update ExamAttempt
```

Upgrade cũng phải atomic:

```text
Validate Knowledge + Blueprint
   ↓
Consume Resources
   ↓
Set target_level / status = UPGRADING
```

Không được xảy ra trạng thái:

```text
Blueprint đã cộng
nhưng Building/Exam state chưa cập nhật
```

### 2.2.8. Derived State
Xác định cái gì:
- Lưu trực tiếp.
- Tính động.

Ví dụ:

```text
Collection Count → Derived
Level Mastery → Derived
Exam Unlock → Derived
Weight → Derived
Building Upgrade Requirement → Derived from BuildingLevel
Blueprint Ownership → Stored in UserBlueprint
```

Trong khi:

```text
mastery_score → Stored
first_seen_at → Stored
current_level → Stored
resources → Stored
```

---

# 40. Trạng thái hiện tại của Giai đoạn 2

```text
                    GIAI ĐOẠN 2
                         │
             ┌───────────┴───────────┐
             │                       │
       2.1 Domain Model
       2.1.5 Vocabulary Freeze
       Exam / Blueprint Freeze
             │
             └───────────┬───────────┘
                         ↓
                      ✅ DONE
                         │
                         ↓
                  2.2 ERD + DB
                         │
                         ↓
                  🟡 IN PROGRESS
                         │
                         ↓
             2.3 Data Flow / Sequence
                         ↓
             2.4 PostgreSQL/JPA Schema
                         ↓
                  2.5 API Contract
                         ↓
              2.6 Room + DAO Design
                         ↓
               2.7 Repository + Sync
                         ↓
                2.8 MVI + Navigation
                         ↓
                    2.9 UI/UX
```

