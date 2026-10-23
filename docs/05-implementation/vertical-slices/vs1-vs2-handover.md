# LinguaCity — Vertical Slice Progress & Handover Plan

> Tài liệu dùng làm **bảng bàn giao/điều phối Vertical Slice**: ghi lại những gì đã quyết định, những gì đã làm xong, kiến thức đã học qua VS1, các điểm còn tồn tại, và kế hoạch triển khai VS2 để một nhóm khác có thể tiếp tục mà không cần hỏi lại toàn bộ lịch sử.

---

## 0. Trạng thái hiện tại

### Product / Architecture

- Product: **LinguaCity**
- Chiến lược phát triển: **Vertical Slice (VS)**
- MVP hiện tại: game học tập kết hợp phát triển thành phố ảo.
- Nguyên tắc sản phẩm: **tiến bộ học tập trực tiếp quyết định tiến bộ của thành phố**.
- SRS là nơi trả lời **WHAT**.
- System Design là nơi trả lời **HOW / kiến trúc kỹ thuật**.
- EA là **living model + traceability/progress dashboard**.
- ADR là nơi ghi **quyết định thực tế, lỗi và bài học trong quá trình triển khai**.

System Design hiện tại được đánh dấu là baseline MVP đã đóng băng; nó bao gồm Domain Entities, Database ERD, Data Flow/Sequence, API Contract, Room Schema, Repository/Clean Architecture và Traceability. 

### Toolchain hiện tại

**Backend**
- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA / Hibernate
- PostgreSQL

**Mobile**
- Kotlin
- Jetpack Compose
- Clean Architecture
- MVI + StateFlow
- Hilt
- Room
- Kotlinx Serialization
- Retrofit + OkHttp
- DataStore

### Development environment decision

Đã thống nhất dùng **JDK 17** cho cả Backend và Mobile.
Máy vẫn có JDK 21/JDK 25 nhưng project nên build bằng JDK 17 để đồng nhất với baseline Backend và tránh biến động toolchain.

---

# 1. Vertical Slice 1 — Guest Onboarding

## 1.1. Mục tiêu

VS1 phải chứng minh được một luồng người dùng hoàn chỉnh:

```text
Android
  ↓
Guest UUID
  ↓
DataStore
  ↓
Retrofit
  ↓
POST /api/v1/users/onboard
  ↓
Spring Boot
  ↓
Service
  ↓
Repository
  ↓
PostgreSQL
  ↓
Response DTO
  ↓
Android
  ↓
Room
```

Đây là lát cắt đi từ UI xuống persistence và quay lại UI.

SRS yêu cầu Guest UUID được tạo cục bộ trên Mobile và đăng ký thành công với Spring Boot Backend. Definition of Done của MVP cũng đặt đây là mốc đầu tiên. 

---

# 2. EA — VS1 đã thiết kế những gì?

## 2.1. Package structure

```text
LinguaCity Project Model
├── 01_Requirements_Model
│   ├── Requirements_Diagram
│   └── REQ_01: Guest User Identification
│
├── 02_Use_Case_Model
│   ├── Use Case Diagram - VS1 Guest Onboarding
│   ├── Guest User
│   └── UC_01: Onboard User
│
├── 03_Logical_Model
│   └── UserProfile
│
├── 04_Behavioral_Model
│   └── Sequence Diagram - VS1 Guest Onboarding
│
├── 05_Physical_Database_Model
│   └── Physical Data Model - VS1
│       └── user_profiles
│
└── 06_Component_API_Model
    ├── API Model - VS1 Guest Onboarding
    ├── IOnboardingAPI
    ├── Android Client
    └── User API
```

Cấu trúc package này phù hợp với 6 view được System Design quy định cho EA.

## 2.2. Traceability VS1

```text
REQ_01
  ↓
UC_01: Onboard User
  ↓
UserProfile
  ↓
POST /api/v1/users/onboard
  ↓
user_profiles
  ↓
UserProfileEntity
```

### Lưu ý còn tồn tại

Traceability Matrix trong System Design hiện vẫn ghi:

```text
REQ_01 → UC_00
```

trong khi EA và kế hoạch triển khai hiện tại đã dùng:

```text
REQ_01 → UC_01
```

**Quyết định cần chốt:** giữ `UC_01` và sửa Traceability Matrix cho nhất quán.

---

# 3. VS1 Business Rules

Bộ rule tối thiểu đã thống nhất:

### BR-USER-01
Guest UUID được Client tạo.

### BR-USER-02
Guest UUID được lưu cục bộ trên thiết bị.

### BR-USER-03
Một Guest UUID chỉ tương ứng với tối đa một UserProfile.

### BR-USER-04
Onboarding bằng UUID đã tồn tại không tạo UserProfile mới.

### BR-USER-05
UserProfile mới bắt đầu với:

```text
knowledge_points = 0
hourglass_count = 0
blueprint_shards = 0
```

### Rule kiến trúc nền tảng
Player State gameplay-critical được Server Authority xử lý; Mobile không tự quyết định các thay đổi tài nguyên.

System Design xác định Backend là Server Authority cho Player State và mọi thay đổi gameplay-critical phải được xử lý online tại Backend trước khi đồng bộ về Room.

### Việc EA còn phải hoàn tất
- Tạo 5 Business Rule trong `05_Business_Rules` hoặc package Business Rules phù hợp.
- Gắn chúng với REQ_01 / UC_01 theo cách tổ chức traceability bạn đã thống nhất.
- Đặt UC_01 thành `In-Progress` trong lúc triển khai.
- Sau khi nghiệm thu đủ thì đổi UC_01 và các element liên quan thành `Implemented/Verified`.

---

# 4. VS1 Database — PostgreSQL

## 4.1. Quyết định schema

Đã reset database thử nghiệm và tạo lại bảng:

```sql
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY,
    knowledge_points INTEGER NOT NULL DEFAULT 0
        CHECK (knowledge_points >= 0),
    hourglass_count INTEGER NOT NULL DEFAULT 0
        CHECK (hourglass_count >= 0),
    blueprint_shards INTEGER NOT NULL DEFAULT 0
        CHECK (blueprint_shards >= 0)
);
```

Schema hiện tại khớp baseline:

```text
id                  UUID PK
knowledge_points    INT NOT NULL DEFAULT 0
hourglass_count     INT NOT NULL DEFAULT 0
blueprint_shards    INT NOT NULL DEFAULT 0
```

`id` của UserProfile chính là Guest UUID; không tạo thêm cột `guest_uuid`.

## 4.2. Quyết định không giữ các field cũ

Schema cũ từng có các field như:
- `username`
- `full_id`
- `id BIGINT IDENTITY`

Các field này đã bị loại khỏi VS1 vì không thuộc schema baseline hiện tại.

## 4.3. Migration artifact

Đã có ý tưởng lưu SQL migration đầu tiên:

```text
database/
└── migration/
    └── V001__create_user_profiles.sql
```

Nên duy trì convention:

```text
V002__...
V003__...
...
```

cho các Slice sau.

---

# 5. VS1 Backend — những gì đã triển khai

## 5.1. Cấu trúc

```text
com.linguacity.backend
├── controller
│   └── UserProfileController.java
├── dto
│   └── user
│       └── OnboardUserResponse.java
├── entity
│   └── UserProfile.java
├── repository
│   └── UserProfileRepository.java
├── service
│   └── UserOnboardingService.java
└── BackendApplication.java
```

## 5.2. Entity

```text
UserProfile
├── UUID id
├── Integer knowledgePoints
├── Integer hourglassCount
└── Integer blueprintShards
```

Ánh xạ:

```text
PostgreSQL                 Java

user_profiles      ↔      UserProfile

id UUID             ↔     UUID id
knowledge_points   ↔     Integer knowledgePoints
hourglass_count    ↔     Integer hourglassCount
blueprint_shards   ↔     Integer blueprintShards
```

## 5.3. Repository

```java
public interface UserProfileRepository
        extends JpaRepository<UserProfile, UUID> {
}
```

Kiến thức đã học:

- `@Repository` chỉ là annotation đánh dấu Spring Repository.
- Với Spring Data JPA, interface kế thừa `JpaRepository` được framework tạo implementation tự động nên không cần tự thêm `@Repository`.
- `JpaRepository<UserProfile, UUID>` cho biết Entity là `UserProfile`, khóa chính là `UUID`.

## 5.4. Service

`UserOnboardingService` chứa business logic:

```text
nhận UUID
  ↓
findById(UUID)
  ↓
đã tồn tại?
  ├── Có → trả UserProfile hiện tại
  └── Không
        ↓
      tạo UserProfile
        ↓
      resource = 0
        ↓
      save()
```

Kiến thức đã học:

> **Service không phải interface bắt buộc.** Thông thường là class chứa business logic/application logic.

## 5.5. DTO

Đã tạo:

```text
OnboardUserResponse
├── userId
├── knowledgePoints
├── hourglassCount
└── blueprintShards
```

Quyết định:

> Không trả trực tiếp JPA Entity qua REST Controller.

System Design quy định Controller dùng DTO để ẩn persistence model và kiểm soát payload REST.

## 5.6. Controller

Endpoint:

```http
POST /api/v1/users/onboard
```

Header:

```http
X-Guest-UUID: <UUID>
```

Body:

```text
empty
```

Response:

```json
{
  "userId": "...",
  "knowledgePoints": 0,
  "hourglassCount": 0,
  "blueprintShards": 0
}
```

## 5.7. Backend test đã hoàn thành

Đã test bằng Postman:

### Request lần 1
UUID chưa tồn tại:
- tạo UserProfile
- lưu PostgreSQL

### Request lần 2
Dùng cùng UUID:
- tìm thấy record hiện tại
- không tạo duplicate

Database chỉ giữ một UserProfile cho UUID đó.

=> BR-USER-03 và BR-USER-04 đã được kiểm chứng bằng test thủ công.

---

# 6. VS1 Android — những gì đã triển khai

## 6.1. Local persistence

```text
data
└── local
    ├── AppDatabase.kt
    ├── user
    │   ├── UserProfileEntity.kt
    │   └── UserProfileDao.kt
    └── preferences
        └── GuestIdStore.kt
```

### UserProfileEntity

```text
id: String
knowledgePoints: Int
hourglassCount: Int
blueprintShards: Int
```

UUID được lưu trên SQLite dưới dạng String.

### UserProfileDao

Có:
- `upsert(...)`
- `getById(...)`
- `observeById(...)`

### AppDatabase

Room database version 1, chứa `UserProfileEntity`.

### Hilt DatabaseModule

Hilt tạo:
- `AppDatabase`
- `UserProfileDao`

## 6.2. Guest UUID

`GuestIdStore`:

```text
getOrCreateGuestUuid()
```

Logic:

```text
DataStore có UUID?
  ├── Có → trả UUID cũ
  └── Không
       ↓
     UUID.randomUUID()
       ↓
     lưu DataStore
       ↓
     trả UUID mới
```

Mục đích: app không tạo User mới mỗi lần mở.

## 6.3. Retrofit

```text
data
└── remote
    └── user
        ├── OnboardingApi.kt
        └── OnboardUserResponseDto.kt
```

API:

```kotlin
@POST("api/v1/users/onboard")
suspend fun onboardUser(
    @Header("X-Guest-UUID") guestUuid: String
): OnboardUserResponseDto
```

Kiến thức đã học:

- Retrofit interface là contract cho HTTP API.
- Retrofit tự tạo implementation runtime.
- `@POST` mô tả HTTP method.
- `@Header` đưa giá trị vào HTTP header.
- `suspend` cho phép gọi network bằng coroutine.

## 6.4. Domain

```text
domain
├── model
│   └── UserProfile.kt
├── repository
│   └── UserRepository.kt
└── usecase
    └── OnboardUserUseCase.kt
```

Domain chỉ biết:
- UserProfile
- UserRepository
- UseCase

Không phụ thuộc trực tiếp vào Retrofit/Room/DataStore.

## 6.5. Repository implementation

```text
data
└── repository
    └── UserRepositoryImpl.kt
```

Nhiệm vụ:

```text
GuestIdStore
    ↓
OnboardingApi
    ↓
DTO
    ↓
UserProfileEntity
    ↓
Room upsert
    ↓
Domain UserProfile
```

Đây là điểm kết hợp các nguồn dữ liệu trong Data Layer.

## 6.6. Hilt

Đã tạo:
- `NetworkModule`
- `DatabaseModule`
- `RepositoryModule`

Quan hệ:

```text
Hilt
├── Retrofit → OnboardingApi
├── Room → UserProfileDao
├── DataStore → GuestIdStore
└── UserRepository → UserRepositoryImpl
```

## 6.7. Presentation

Đã tạo:

```text
presentation
└── onboarding
    ├── OnboardingIntent.kt
    ├── OnboardingState.kt
    ├── OnboardingViewModel.kt
    └── OnboardingScreen.kt
```

MVI flow:

```text
Intent
  ↓
ViewModel
  ↓
UseCase
  ↓
Repository
  ↓
StateFlow
  ↓
Compose
```

## 6.8. MainActivity

Đã nối:

```text
MainActivity
    ↓
OnboardingScreen
```

Onboarding tự kích hoạt:

```text
LaunchedEffect
    ↓
OnboardingIntent.Onboard
```

---

# 7. Các vấn đề kỹ thuật đã gặp và đã xử lý

## 7.1. PostgreSQL authentication

Lỗi:

```text
password authentication failed for user "postgres"
```

Đã xử lý bằng cách sửa thông tin datasource để Spring Boot đăng nhập đúng PostgreSQL.

## 7.2. JDK / Gradle

Ban đầu:
- Java 25
- Gradle 8.13

Đã quyết định dùng JDK 17 cho project.

## 7.3. Android cleartext HTTP

Emulator không cho phép HTTP:

```text
CLEARTEXT communication to 10.0.2.2 not permitted
```

Đã thêm:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

và:

```xml
android:usesCleartextTraffic="true"
```

Đây là cấu hình **development local**, không phải cấu hình production.

## 7.4. Android Emulator → Host machine

Retrofit dùng:

```text
http://10.0.2.2:8080/
```

vì Backend chạy trên máy host.

Không dùng `localhost` từ Android Emulator để truy cập Backend trên máy tính.

---

# 8. VS1 — kiến thức cần học sau khi hoàn thành

Đây là phần quan trọng đối với mục tiêu học tập của project.

## Backend

Cần hiểu được:
- JPA Entity
- Primary Key UUID
- `@Entity`, `@Table`, `@Id`, `@Column`
- Spring Dependency Injection
- Service vs Repository vs Controller
- Spring Data `JpaRepository`
- `Optional`
- DTO và Entity mapping
- REST endpoint
- Request Header
- HTTP status
- Transaction boundary
- Hibernate tạo SQL như thế nào
- PostgreSQL constraint
- Idempotent onboarding

## Android

Cần hiểu được:
- Clean Architecture
- Domain vs Data vs Presentation
- Interface/implementation
- Repository pattern
- Use Case
- Retrofit
- Kotlin `suspend`
- Coroutine
- StateFlow
- MVI
- Compose state
- Hilt dependency graph
- Room
- DAO
- Entity
- DataStore
- DTO → Entity → Domain mapping
- Android Emulator networking

## Cross-cutting

Cần hiểu:
- Server Authority
- Local cache vs Server source of truth
- API contract
- Traceability
- Vertical Slice
- Business Rule
- Definition of Done
- ADR

---

# 9. Những thứ VS1 chưa hoàn thiện về mặt “formal acceptance”

VS1 đã chạy được luồng chính, nhưng trước khi đóng Slice chính thức cần kiểm tra:

### EA

- [x] Thêm 5 BR-USER vào model.
- [x] Sửa Traceability `UC_00` → `UC_01`.
- [x] Xóa/đảm bảo không có UserProfile duplicate trong EA.
- [x] Trace REQ_01 → UC_01 → UserProfile → API → DB → Room.
- [x] Đổi Status của các element sau nghiệm thu:
  - UC_01
  - UserProfile
  - user_profiles
  - API element
  - các artifact thực sự đã code

### Code / architecture

- [x] Xác nhận Room thực sự chứa UserProfile sau API response.
- [x] Xác nhận UUID giữ nguyên khi app restart.
- [x] Xác nhận app restart không tạo duplicate User.
- [x] Test Backend unavailable.
- [x] Test API thiếu `X-Guest-UUID`.
- [x] Test UUID không hợp lệ.
- [x] Xác nhận mapping DTO → Entity → Domain.
- [x] Xác nhận Hilt graph hoàn chỉnh.

### Architecture debt cần theo dõi, chưa phải blocker VS1

System Design có quy định Optimistic Locking (`@Version`) trên UserProfile để chống race condition. Đây chưa được triển khai trong VS1 hiện tại; ghi lại như một technical debt/hardening item thay vì tự mở rộng Scope VS1.

---

# 10. Definition of Done — VS1

VS1 được xem là **Implemented** khi:

```text
[ ] Guest UUID được tạo trên Mobile
[ ] UUID được lưu DataStore
[ ] Mobile gọi POST /api/v1/users/onboard
[ ] Backend nhận X-Guest-UUID
[ ] Backend tạo User nếu chưa tồn tại
[ ] Backend không tạo duplicate nếu UUID đã tồn tại
[ ] PostgreSQL lưu đúng UserProfile
[ ] Backend trả DTO
[ ] Android nhận DTO
[ ] Android lưu UserProfile vào Room
[ ] Android có thể đọc UserProfile từ Room
[ ] App restart vẫn giữ cùng Guest UUID
[ ] Không có lỗi Cleartext/network local
[ ] EA traceability hoàn chỉnh
[ ] Business Rules được ghi nhận
```

Nếu tất cả điều trên đều đạt, đổi:

```text
UC_01 → Implemented / Verified
```

và các element tương ứng thành `Implemented/Verified`.

---

# 11. Quyết định sản phẩm sau VS1: chưa làm Login/Register

Không mở rộng VS1 sang:
- Login
- Register
- Forgot Password
- Teacher
- Student
- Admin
- Server/Tenant
- Class
- Course
- Teacher Content Authoring

Các tính năng này được coi là **Future Expansion**, chưa thuộc MVP hiện tại.

Lý do:
- SRS hiện tại chỉ yêu cầu Guest onboarding ở bước đầu.
- Mở Login/Role sẽ tạo thêm một domain Identity/Authorization riêng.
- Làm ngay sẽ phá nguyên tắc Vertical Slice nhỏ, dễ làm project phình scope.

---

# 12. VS2 — Static Content Bootstrap / Content Sync

## 12.1. Mục tiêu

Sau khi biết **ai là người chơi** (VS1), VS2 phải làm cho app biết **thế giới game và nội dung học tập là gì**.

Luồng mong muốn:

```text
Android
  ↓
GET static content APIs
  ↓
Spring Boot
  ↓
PostgreSQL
  ↓
Response DTO
  ↓
Android
  ↓
Room
  ↓
City / Vocabulary UI có dữ liệu
```

Mục tiêu VS2 bám trực tiếp Definition of Done:

> Mobile gọi API Spring Boot thành công để tải Vocabulary, Themes, Buildings, Exams và lưu vào Room để phục vụ cache.

SRS cũng xác định Static Content là dữ liệu Read-Only và được Backend phân phối xuống Mobile rồi cache trong Room để hỗ trợ Offline Read-Only.

---

# 13. VS2 — Business Goal

Người dùng sau khi onboarding thành công phải có thể:
1. Nhận dữ liệu thế giới game từ Server.
2. Lưu dữ liệu đó vào Room.
3. Đọc dữ liệu từ Room.
4. Không cần gọi mạng cho lần render đọc nội dung đã cache.
5. Không được phép tự sửa Static Content từ Mobile.

### Business Rules dự kiến cho VS2

#### BR-CONTENT-01
Static Content là dữ liệu do Server quản lý.

#### BR-CONTENT-02
Mobile chỉ có quyền Read-Only đối với Static Content trong MVP.

#### BR-CONTENT-03
Static Content được đồng bộ từ Backend xuống Room.

#### BR-CONTENT-04
Room dùng `@Upsert` khi cập nhật Static Content.

#### BR-CONTENT-05
Nếu cùng một Content ID được tải lại, không tạo duplicate.

#### BR-CONTENT-06
Offline chỉ đọc dữ liệu đã cache; không thực hiện Push Sync thay đổi Static Content.

#### BR-CONTENT-07
Các nội dung cần bảo mật như đáp án chuẩn của Question không được lưu vào Room.

System Design quy định rõ Question trong Room phải bỏ `answer`, và Static Content được cache Read-Only.

---

# 14. VS2 — Scope đề xuất

## In Scope

Đề xuất VS2 tập trung vào nhóm Static Content cơ bản:

```text
Theme
Building
BuildingLevel
Vocabulary
```

Sau khi bộ này chạy ổn, mới mở rộng:

```text
Blueprint
Question
QuestionVocabulary
Exam
ExamRequirement
ExamQuestion
```

### Vì sao không tải cả 10 entity ngay?

Có thể tải tất cả về mặt kỹ thuật, nhưng cho mục tiêu học tập và kiểm soát Vertical Slice, nên làm theo một lõi nhỏ:

```text
Theme
  ↓
Building
  ↓
Vocabulary
```

vì đây là dữ liệu đủ để bắt đầu làm City + Learning mà chưa cần chạm sâu vào Exam.

---

# 15. VS2 — EA cần chuẩn bị

## Requirements

Thêm requirement cụ thể cho Static Content, ví dụ:

```text
REQ_02: Static Content Availability
```

Không sửa REQ_01.

## Use Case

Tạo:

```text
Actor:
Guest User

UC_02:
Sync Static Content
```

Nếu muốn chính xác hơn theo góc nhìn hệ thống:

```text
UC_02: Load Static Content
```

### Use Case objective

```text
Guest User mở app
    ↓
hệ thống kiểm tra static content local
    ↓
nếu chưa có / cần refresh
    ↓
lấy từ Backend
    ↓
lưu Room
```

## Logical Model

Thêm dần:

```text
Theme
Building
BuildingLevel
Vocabulary
```

và quan hệ:

```text
Theme 1 ─── * Building
Theme 1 ─── * Vocabulary
Building 1 ─── * BuildingLevel
```

## Physical Model

Thêm PostgreSQL tables tương ứng.

## Mobile Physical Model

Thêm:

```text
ThemeEntity
BuildingEntity
BuildingLevelEntity
VocabularyEntity
```

## Component/API Model

Thêm API contract cho content read.

## Behavioral Model

Tạo:

```text
Sequence Diagram - VS2 Static Content Sync
```

---

# 16. VS2 — Backend work packages

## BE-01 — Database

Tạo tables:

```text
themes
buildings
building_levels
vocabularies
```

Theo schema baseline:

- `themes.id` BIGSERIAL
- `buildings.id` BIGSERIAL
- `buildings.theme_id` FK
- `building_levels` PK composite `(building_id, level)`
- `vocabularies.theme_id` FK
- Vocabulary `examples` là JSONB
- naming PostgreSQL dùng snake_case

## BE-02 — JPA Entity

Tạo:

```text
Theme.java
Building.java
BuildingLevel.java
Vocabulary.java
```

Chú ý:
- quan hệ LAZY-first
- Composite key cho BuildingLevel
- JSONB mapping cho Vocabulary.examples

## BE-03 — Repository

```text
ThemeRepository
BuildingRepository
BuildingLevelRepository
VocabularyRepository
```

## BE-04 — DTO

Không trả JPA Entity trực tiếp.

Tạo response DTO tương ứng.

## BE-05 — Service

Tạo Content Service chịu trách nhiệm load/read content.

## BE-06 — Controller

Tối thiểu cần API cho Static Content.

Một cách tổ chức có thể là:

```text
GET /api/v1/content/themes
GET /api/v1/content/buildings
GET /api/v1/content/vocabularies
```

Việc chọn chính xác endpoint cần được chốt trong VS2 trước khi code và phản ánh đồng thời lên EA + API contract.

---

# 17. VS2 — Android work packages

## M-01 — Room Entities

```text
ThemeEntity
BuildingEntity
BuildingLevelEntity
VocabularyEntity
```

## M-02 — DAO

Ví dụ:

```text
ThemeDao
BuildingDao
BuildingLevelDao
VocabularyDao
```

Các read query nên trả `Flow` khi UI cần stream dữ liệu thay đổi.

## M-03 — Retrofit API

Tạo API interfaces cho các endpoint đã chốt.

## M-04 — DTO

Tạo Network DTO tương ứng.

## M-05 — Mapper

VS2 là lúc nên tách mapper riêng thay vì để mapping trực tiếp trong Repository.

```text
data/mapper/
├── ThemeMapper.kt
├── BuildingMapper.kt
├── BuildingLevelMapper.kt
└── VocabularyMapper.kt
```

## M-06 — Repository

Tổ chức read-through / sync:

```text
Room kiểm tra local
   ↓
nếu cần sync
   ↓
Retrofit
   ↓
DTO
   ↓
Entity
   ↓
Room @Upsert
   ↓
UI đọc Room
```

## M-07 — Presentation

Tạo một màn hình test đơn giản:

```text
StaticContentDebugScreen
```

hoặc một City Screen rất tối giản có thể render:

```text
Buildings
Vocabulary count
Theme count
```

Mục tiêu của VS2 là chứng minh dữ liệu thật đã vào app, chưa phải UI final.

---

# 18. VS2 — Flow đề xuất

```text
App start
  ↓
Onboarding completed
  ↓
Check local static content
  ↓
Need sync?
  ├── No
  │    ↓
  │  Room
  │    ↓
  │  UI
  │
  └── Yes
       ↓
   Retrofit
       ↓
   Backend
       ↓
   PostgreSQL
       ↓
   DTO
       ↓
   Mapper
       ↓
   Room @Upsert
       ↓
   Room Flow
       ↓
   UI
```

---

# 19. VS2 Acceptance Criteria

Một nhóm khác chỉ được đánh VS2 `Verified` khi:

```text
[ ] Theme API hoạt động
[ ] Building API hoạt động
[ ] BuildingLevel API hoạt động
[ ] Vocabulary API hoạt động
[ ] Backend đọc đúng PostgreSQL
[ ] JPA Entity mapping đúng schema
[ ] DTO không trả persistence Entity trực tiếp
[ ] Android Retrofit nhận đúng DTO
[ ] Mapper hoạt động
[ ] Room lưu được Static Content
[ ] @Upsert không tạo duplicate
[ ] UI đọc được dữ liệu từ Room
[ ] Có thể đọc cached content khi Offline
[ ] Room Question sau này không lưu answer
[ ] EA traceability hoàn chỉnh
[ ] Business Rules được cập nhật
[ ] ADR ghi lại vấn đề phát sinh nếu có
```

---

# 20. VS2 — Không nằm trong Scope

Không làm trong VS2:

```text
Login
Register
Teacher
Student
Admin
Multi-Tenant
Class
Course
Teacher authoring
Exam submission
Building upgrade
Mastery Engine
```

Những phần này sẽ được đưa vào các Slice riêng.

---

# 21. Tiến độ tổng thể sau VS1

```text
VS1 — Guest Onboarding
├── PostgreSQL                    ✅
├── Spring Boot API               ✅
├── Postman                       ✅
├── Android Data Layer            ✅
├── Android Presentation          ✅
├── End-to-end network flow       ✅
├── Duplicate prevention          ✅
├── Formal EA/BR finalization     🟡
└── Tutorial completion (UC_02)   🟡  ← đang làm (API xong, thiếu test/migration/UI)

VS2 — Static Content
├── Business Rules                ⬜
├── EA                            ⬜
├── PostgreSQL content            ⬜
├── Spring Boot content API       ⬜
├── Room content                  ⬜
├── Retrofit content              ⬜
├── Mapper                        ⬜
├── Offline read                  ⬜
└── Acceptance test               ⬜

VS3 — Vocabulary Learning
VS4 — Exam
TS-UNITY — Tech Spike Unity as a Library (ADR-009, tối đa 1–2 tuần)
VS5 — Building Upgrade (City View: Unity nếu TS-UNITY đạt, ngược lại Compose)
```

> **Cập nhật 20/10/2026:** chèn **TS-UNITY** trước VS5. TS-UNITY có thể làm sớm hơn (ngay sau VS2) nếu muốn biết sớm Unity có khả thi không — nó không phụ thuộc VS3/VS4.

SRS Definition of Done hiện tại đi theo đúng thứ tự logic: Guest User → Static Content → Offline Learning → Online Learning → Exam → Building Upgrade → On-Demand Sync.

---

# 22. Handover protocol cho bất kỳ nhóm nào tiếp quản

Mỗi Vertical Slice phải có đúng 8 phần:

```text
1. Scope
2. Business Rules
3. EA / Traceability
4. Database
5. Backend
6. Android (+ Unity nếu Slice chạm City View)
7. Integration Test
8. Acceptance / ADR
9. Docs checklist (§27)
```

Không được bắt đầu code Slice mới nếu chưa rõ:

```text
What
Why
Rule
API
DB
Owner
Acceptance
```

### Mỗi task nên được ghi theo format

```text
Task ID:
VS2-BE-01

Task:
Create Theme entity

Input:
PostgreSQL themes table

Expected:
Theme.java maps 1:1 with themes

Dependencies:
VS2-DB-01

Status:
TODO / IN_PROGRESS / BLOCKED / DONE / VERIFIED

Evidence:
file path / test / screenshot / API response

Notes:
...
```

---

# 23. Definition of statuses

```text
PROPOSED
→ mới tồn tại trong thiết kế

IN-PROGRESS
→ đang code

IMPLEMENTED
→ code xong

VERIFIED
→ test + acceptance đạt

BLOCKED
→ đang bị dependency/lỗi chặn
```

Có thể dùng `Implemented` hoặc `Verified` theo cách bạn đang cấu hình status trong EA.

---

# 24. Cách ghi ADR

Mỗi ADR nên trả lời:

```text
Context
Decision
Reason
Alternatives
Consequence
Lesson
```

Ví dụ VS1:

```text
ADR-001
Decision:
Use JDK 17 for project

Context:
Gradle 8.13 + initial JDK 25 environment

Reason:
Align with backend baseline and reduce toolchain variability

Consequence:
Both projects use JDK 17

Lesson:
Build toolchain must be fixed early
```

---

# 25. Chốt trạng thái VS1

### Kết luận

**VS1 đã hoàn thành phần IMPLEMENTATION/INTEGRATION chính.**

Nó chưa nên được gọi là **VERIFIED/FORMALLY CLOSED** cho đến khi hoàn tất những item formal còn lại:

```text
EA Business Rules
Traceability
UC_00 → UC_01 correction
Room persistence evidence
Restart persistence evidence
Final acceptance
```

Sau khi các item đó hoàn thành, VS1 có thể đóng:

```text
VS1 = VERIFIED
```

và chuyển sang VS2.

---

# 26. Nguyên tắc tiếp tục dự án

Từ VS2 trở đi, không làm theo kiểu:

```text
"tạo hết class trước"
```

Mà làm:

```text
Business Rule
   ↓
EA
   ↓
API/DB contract
   ↓
Bottom-Up implementation
   ↓
Integration
   ↓
Test
   ↓
EA Status
   ↓
ADR
```

Mỗi Slice phải tạo ra **một sản phẩm chạy được**, không chỉ một tập class.

---

# 27. Docs checklist cho mỗi Vertical Slice (bổ sung 20/10/2026)

Tài liệu được viết **theo Slice**: làm tới đâu, bổ sung tới đó. Một Slice chỉ được đổi sang `VERIFIED` khi checklist này xong.

```text
[ ] 01-requirements/requirements-catalog.md   → đổi trạng thái FR/NFR của Slice          (Báo cáo Ch.1.3)
[ ] 01-requirements/use-cases.md              → bảng đặc tả UC của Slice                 (Ch.2.4)
[ ] 02-game-design/gdd.md                     → chốt các thông số balance Slice dùng     (Ch.3.4 công thức)
[ ] 03-architecture/system-design.md          → bảng DB, API contract, sequence thực tế  (Ch.3, Ch.5)
[ ] 04-ui/screen-catalog.md                   → wireframe/ảnh + bảng thành phần + biến cố (Ch.4)
[ ] 06-testing/test-plan.md                   → test case + kết quả + ảnh minh chứng      (Ch.6.2)
[ ] adr/                                      → ADR mới nếu có quyết định; troubleshooting-log nếu có lỗi
[ ] EA                                        → đổi Status element, cập nhật Traceability
[ ] docs/README.md                            → cập nhật bảng trạng thái
```

**Mẹo:** viết đặc tả UC và wireframe **trước khi code** Slice (đó là "bản vẽ"), còn sequence, test case và ADR viết **sau khi code** (đó là "biên bản").

