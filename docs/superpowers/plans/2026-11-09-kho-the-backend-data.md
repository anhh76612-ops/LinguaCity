# Kho thẻ — Backend + Dữ liệu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chuẩn bị toàn bộ dữ liệu mà giao diện Kho thẻ cần: thời điểm trả lời đúng gần nhất, cụm từ / câu giải thích / icon cho từ vựng, tuỳ chọn riêng của từng thẻ trên máy, chế độ đọc thẻ, và mặc định xoay ngang.

**Architecture:** Backend Spring Boot thêm cột `last_correct_at` và ba trường nội dung, trả qua API sẵn có. Migration Postgres `V008` sinh bằng script Python như V007. App Android nâng Room lên v6 (AutoMigration, chỉ thêm cột cho phép NULL và thêm bảng), nối DTO → Room → domain, thêm repository tuỳ chọn thẻ và hai khoá cài đặt. Không có UI trong kế hoạch này.

**Tech Stack:** Java 21 + Spring Boot + JPA (test trên H2), PostgreSQL, Python 3 (sinh SQL), Kotlin + Room + kotlinx.serialization + DataStore + Hilt, JUnit4.

**Spec:** `docs/04-ui/redesign/2026-11-09-kho-the-design.md` (mục 3, 4, 9)

## Global Constraints

- Không có UI. Không đụng `docs/adr/README.md`, `presentation/navigation/AppNavHost.kt` (đang sửa dở của người dùng).
- **Sắp quên** = `now − (lastCorrectAt ?: firstSeenAt) > 7 ngày`. Từ không có `firstSeenAt` = chưa gặp, không hiển thị.
- `last_correct_at` ghi **mỗi lần trả lời đúng ở bất kỳ nguồn nào** đi qua `VocabProgressRecorder` (bài học, luyện tập, sự kiện, thi). Lý do: người dùng định nghĩa "lâu không trả lời đúng"; ADR-017 tự quyết lại khi làm decay. Cập nhật spec §9 cho khớp (Task 1).
- Không làm decay Mastery, không cộng Gỗ.
- Dữ liệu cũ: `last_correct_at` để NULL (không backfill).
- `collocations`: 2–3 cụm/từ; `explanation`: 1 câu tiếng Việt; `iconKey`: một giá trị trong `ICON_KEYS` (Task 3). Chỉ viết cho 30 từ **HOUSING:1** (id 1–30); các từ khác NULL.
- Đổi nội dung HOUSING:1 ⇒ tăng `content_packs.version` của `HOUSING:1` (ADR-012) để app tải lại.
- Room: v5 → v6 bằng **một** `AutoMigration(from = 5, to = 6)`; mọi cột mới phải cho phép NULL hoặc có DEFAULT.
- Mặc định xoay: `OrientationSetting.LANDSCAPE`. Mặc định chế độ đọc: `CardReadMode.GRID`.
- Commit message tiếng Việt theo kiểu repo (`feat(backend): …`, `feat(mobile): …`), kết thúc bằng `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Trả lời sai sau khi đã đúng** không được xoá `lastCorrectAt` — test trong Task 1.
2. **JSON pack cũ không có trường mới** (server chưa nâng, cache cũ) vẫn parse được, trường mới = rỗng/NULL — test trong Task 4.
3. **Đồng bộ tiến độ đè dữ liệu cục bộ mới hơn bằng NULL**: `refreshProgress` nhận `lastCorrectAt = null` từ server không được làm mất giá trị app vừa ghi sau `answer()` khi server thực ra đã có — server là nguồn sự thật nên chấp nhận giá trị server; test khẳng định mapping lấy đúng giá trị server (Task 5).
4. **Giá trị cài đặt lạ trong DataStore** (chuỗi enum cũ/sai) rơi về mặc định thay vì crash — test trong Task 7.
5. **Tự kiểm tra hai lần trong cùng ngày** bị chặn, sang ngày mới (theo giờ máy) được phép — test trong Task 6.

---

### Task 1: Backend — ghi và trả `lastCorrectAt`

**Files:**
- Modify: `backend/src/main/java/com/linguacity/backend/learning/entity/UserVocabProgress.java`
- Modify: `backend/src/main/java/com/linguacity/backend/learning/service/VocabProgressRecorder.java`
- Modify: `backend/src/main/java/com/linguacity/backend/learning/dto/LearningDtos.java` (record `ProgressItemDto`)
- Modify: `backend/src/main/java/com/linguacity/backend/learning/service/LearningService.java` (`progressSince`)
- Modify: `docs/04-ui/redesign/2026-11-09-kho-the-design.md` §9 (dòng "Lần cuối trả lời đúng": "ghi mỗi lần trả lời đúng qua `VocabProgressRecorder`")
- Test: `backend/src/test/java/com/linguacity/backend/learning/LearningFlowTests.java`

**Interfaces:**
- Produces: cột JPA `last_correct_at` (`LocalDateTime lastCorrectAt`); JSON `GET /api/v1/users/me/vocab-progress` → mỗi item có `"lastCorrectAt"` (ISO Instant hoặc `null`), đặt **sau** `lastReviewedAt` trong record.

- [ ] **Step 1: Viết test hỏng** — theo khuôn các test progress sẵn có trong `LearningFlowTests` (dòng ~160):
  - `correctAnswerSetsLastCorrectAt`: trả lời đúng một câu → `progress.findByUserIdAndVocabularyId(...)` có `lastCorrectAt` == thời điểm clock của test; `GET /vocab-progress` có `$.items[0].lastCorrectAt` không null.
  - `wrongAnswerKeepsPreviousLastCorrectAt`: đúng rồi sai cùng từ → `lastCorrectAt` vẫn là thời điểm lần đúng.
  - `wrongFirstAnswerLeavesLastCorrectAtNull`: chỉ trả lời sai → `lastCorrectAt` null, `firstSeenAt` không null.
- [ ] **Step 2: Chạy, xác nhận hỏng** — `cd backend && ./gradlew test --tests "*LearningFlowTests*"` → FAIL (không có `getLastCorrectAt`).
- [ ] **Step 3: Cài đặt** — thêm `@Column(name = "last_correct_at") private LocalDateTime lastCorrectAt;`; trong `VocabProgressRecorder.record` đặt `row.setLastCorrectAt(now)` khi `correct`; thêm `Instant lastCorrectAt` vào `ProgressItemDto` và map bằng `Times.toInstant(row.getLastCorrectAt())`. Sửa spec §9.
- [ ] **Step 4: Chạy lại** — cùng lệnh, rồi `./gradlew test` toàn bộ → PASS.
- [ ] **Step 5: Commit** — `feat(backend): ghi last_correct_at khi trả lời đúng và trả trong vocab-progress`

### Task 2: Backend — trường nội dung `collocations`, `explanation`, `iconKey`

**Files:**
- Modify: `backend/src/main/java/com/linguacity/backend/content/entity/Vocabulary.java`
- Modify: `backend/src/main/java/com/linguacity/backend/content/dto/ContentDtos.java` (record `VocabularyDto`)
- Modify: `backend/src/main/java/com/linguacity/backend/content/service/ContentService.java` (hàm dựng `VocabularyDto`, dòng ~294)
- Test: `backend/src/test/java/com/linguacity/backend/content/ContentApiTests.java`

**Interfaces:**
- Produces: cột `collocations` (JSON, `@JdbcTypeCode(SqlTypes.JSON)` như `examples`), `explanation` (text), `icon_key` (varchar 40). JSON pack: mỗi phần tử `vocabularies[]` thêm `"collocations": [string]` (luôn là mảng, rỗng khi NULL), `"explanation": string|null`, `"iconKey": string|null` — thêm vào **cuối** record `VocabularyDto`.

- [ ] **Step 1: Viết test hỏng** — trong `ContentApiTests`, helper tạo từ (dòng ~232) nhận thêm tuỳ chọn; test:
  - `packExposesCollocationsExplanationAndIconKey`: từ có `collocations = ["pay the rent","monthly rent"]`, `explanation = "Khoản trả hằng tháng."`, `iconKey = "key"` → `$.vocabularies[0].collocations[1]` = `"monthly rent"`, `.explanation`, `.iconKey` đúng.
  - `packReturnsEmptyCollocationsWhenNull`: từ không có ba trường → `collocations` = `[]`, `explanation` và `iconKey` = null.
- [ ] **Step 2: Chạy, xác nhận hỏng** — `./gradlew test --tests "*ContentApiTests*"` → FAIL.
- [ ] **Step 3: Cài đặt** — ba field entity; map `collocations` bằng `stringList(...)` sẵn có trong `ContentService`.
- [ ] **Step 4: Chạy lại** — `./gradlew test` → PASS.
- [ ] **Step 5: Commit** — `feat(backend): thêm collocations, explanation, iconKey vào gói nội dung`

### Task 3: Dữ liệu — script sinh `V008__kho_the.sql`

**Files:**
- Create: `database/seed/housing_level1_extras.py`
- Create: `database/seed/v008.py`
- Create (sinh ra): `database/migration/V008__kho_the.sql`

**Interfaces:**
- Consumes: tên cột từ Task 1 và Task 2.
- Produces: `housing_level1_extras.EXTRAS: dict[str, tuple[list[str], str, str]]` — khoá là `word` đúng như trong `housing_level1.WORDS` (30 từ: rent, landlord, tenant, lease, deposit, utilities, furniture, appliance, neighbor, apartment, repair, renovate, spacious, maintenance, relocate, groceries, laundry, commute, schedule, errand, recipe, receipt, budget, chore, routine, convenient, purchase, bill, appointment, subscribe); giá trị `(collocations, explanation, icon_key)`. `ICON_KEYS` (tập cố định, app sẽ vẽ theo bộ này ở kế hoạch UI): `key, person, people, document, coin, bolt, sofa, appliance, home, tools, ruler, box, cart, basket, bus, calendar, checklist, receipt, wallet, broom, clock, star, bag, bill, bell`.

- [ ] **Step 1: Viết `v008.py` với kiểm tra trước** — theo khuôn `v007.py` (docstring "Chạy", `HERE`, `OUTPUT`, `HEADER` ghi "FILE SINH TỰ ĐỘNG bởi database/seed/v008.py"). Hàm `validate(words, extras, icon_keys)` raise `SystemExit` với thông báo rõ khi: thiếu/thừa từ so với `housing_level1.WORDS`; số cụm ngoài 2–3; `explanation` rỗng; `icon_key` không thuộc `ICON_KEYS`.
- [ ] **Step 2: Chạy với `EXTRAS = {}`, xác nhận dừng** — `python database/seed/v008.py` → thoát với lỗi liệt kê 30 từ thiếu.
- [ ] **Step 3: Viết nội dung `EXTRAS`** cho 30 từ (cụm từ tiếng Anh tự nhiên, câu giải thích tiếng Việt ngắn theo giọng các câu `explanation` sẵn có trong `housing_level1.py`).
- [ ] **Step 4: Sinh SQL** — `v008.py` ghi trong một `BEGIN; … COMMIT;`:
  - `ALTER TABLE user_vocab_progress ADD COLUMN last_correct_at TIMESTAMP NULL;`
  - `ALTER TABLE vocabularies ADD COLUMN collocations JSONB NULL, ADD COLUMN explanation TEXT NULL, ADD COLUMN icon_key VARCHAR(40) NULL;`
  - 30 câu `UPDATE vocabularies SET collocations = '[…]'::jsonb, explanation = …, icon_key = … WHERE id = <id> AND word = '<word>';` (id lấy theo thứ tự `WORDS`, bắt đầu từ 1; dùng `content_lib.q` để escape).
  - `UPDATE content_packs SET version = version + 1, updated_at = now() WHERE code = 'HOUSING:1';`
- [ ] **Step 5: Chạy và kiểm** — `python database/seed/v008.py` rồi `grep -c "^UPDATE vocabularies" database/migration/V008__kho_the.sql` → `30`. Nếu có Postgres local: `psql -U postgres -d linguacity_db -v ON_ERROR_STOP=1 -f database/migration/V008__kho_the.sql` → `COMMIT`.
- [ ] **Step 6: Commit** — `feat(data): V008 cụm từ, giải thích, icon cho HOUSING:1 và cột last_correct_at`

### Task 4: App — Room v6 và trường nội dung mới

**Files:**
- Modify: `mobile/app/src/main/java/com/project/linguacity/data/remote/content/ContentApi.kt` (`VocabularyDto`)
- Modify: `mobile/app/src/main/java/com/project/linguacity/data/local/content/ContentEntities.kt` (`VocabularyEntity`)
- Modify: `mobile/app/src/main/java/com/project/linguacity/domain/model/content/Content.kt` (`Vocabulary`)
- Modify: `mobile/app/src/main/java/com/project/linguacity/data/mapper/ContentMapper.kt` (dựng `VocabularyEntity` dòng ~72, `VocabularyEntity.toDomain()` dòng ~121)
- Modify: `mobile/app/src/main/java/com/project/linguacity/data/local/player/PlayerEntities.kt` (`UserVocabProgressEntity`)
- Create: `mobile/app/src/main/java/com/project/linguacity/data/local/player/CardPrefsEntity.kt`
- Modify: `mobile/app/src/main/java/com/project/linguacity/data/local/AppDatabase.kt` (version 6, thêm entity, `AutoMigration(from = 5, to = 6)`, cập nhật KDoc v5 → v6)
- Create (sinh ra): `mobile/app/schemas/com.project.linguacity.data.local.AppDatabase/6.json`
- Test: `mobile/app/src/test/java/com/project/linguacity/data/mapper/ContentMapperTest.kt`

**Interfaces:**
- Produces:
  - `VocabularyDto` thêm `collocations: List<String> = emptyList()`, `explanation: String? = null`, `iconKey: String? = null`.
  - `VocabularyEntity` và domain `Vocabulary` thêm cùng ba trường, cùng kiểu, cùng mặc định (entity cần mặc định cột: `collocations` lưu qua `Converters` như `examples`, khai báo `@ColumnInfo(defaultValue = "[]")`).
  - `UserVocabProgressEntity` thêm `firstSeenAtMillis: Long? = null`, `lastCorrectAtMillis: Long? = null`.
  - `@Entity(tableName = "user_card_prefs", primaryKeys = ["vocabularyId"]) data class CardPrefsEntity(vocabularyId: Long, favorite: Boolean = false, userScale: Float = 1f, note: String = "", lastSelfCheckAtMillis: Long? = null, updatedAtMillis: Long)`.

- [ ] **Step 1: Viết test hỏng** trong `ContentMapperTest`:
  - `pack maps collocations explanation and icon key`: JSON pack có từ với `"collocations":["pay the rent"],"explanation":"Khoản trả hằng tháng.","iconKey":"key"` → `toRows().vocabularies.single()` có đủ ba giá trị, và `.toDomain()` cũng vậy.
  - `old pack json without new fields still parses`: JSON pack không có ba trường → `collocations == emptyList()`, `explanation == null`, `iconKey == null`.
- [ ] **Step 2: Chạy, xác nhận hỏng** — `cd mobile && ./gradlew :app:testDebugUnitTest --tests "*ContentMapperTest*"` → lỗi biên dịch / FAIL.
- [ ] **Step 3: Cài đặt** các trường và mapper; thêm `CardPrefsEntity` vào `@Database(entities)`; nâng version, thêm AutoMigration.
- [ ] **Step 4: Chạy lại + build sinh schema** — lệnh test ở Step 2 → PASS; `./gradlew :app:assembleDebug` → BUILD SUCCESSFUL và có file `schemas/.../6.json`.
- [ ] **Step 5: Commit** (kèm `6.json`) — `feat(mobile): Room v6 — trường nội dung Kho thẻ, mốc tiến độ, bảng user_card_prefs`

### Task 5: App — đồng bộ mốc tiến độ và hàm "sắp quên"

**Files:**
- Modify: `mobile/app/src/main/java/com/project/linguacity/data/remote/learning/LearningApi.kt` (`ProgressItemDto` thêm `lastCorrectAt: String? = null`)
- Modify: `mobile/app/src/main/java/com/project/linguacity/data/mapper/LearningMapper.kt` (hàm mới)
- Modify: `mobile/app/src/main/java/com/project/linguacity/data/repository/LearningRepositoryImpl.kt` (`refreshProgress`, `answer`, `observeProgress`)
- Modify: `mobile/app/src/main/java/com/project/linguacity/domain/model/learning/Lesson.kt` (`VocabProgress`)
- Test: `mobile/app/src/test/java/com/project/linguacity/data/mapper/LearningMapperTest.kt`, Create: `mobile/app/src/test/java/com/project/linguacity/domain/learning/VocabProgressTest.kt`

**Interfaces:**
- Consumes: `UserVocabProgressEntity.firstSeenAtMillis`, `.lastCorrectAtMillis` (Task 4).
- Produces:
  - `fun ProgressItemDto.toEntity(): UserVocabProgressEntity` trong `LearningMapper.kt` (dùng `IsoTime.parseMillis` cho cả ba mốc).
  - `VocabProgress` thêm `firstSeenAtMillis: Long? = null`, `lastCorrectAtMillis: Long? = null`, và hai thuộc tính/hàm: `val seen: Boolean` (= `firstSeenAtMillis != null`), `fun isStale(nowMillis: Long, staleDays: Int = 7): Boolean`.
  - `const val STALE_DAYS = 7` cạnh `VocabProgress`.

- [ ] **Step 1: Viết test hỏng**
  - `LearningMapperTest.progress item maps all timestamps`: JSON `{"vocabularyId":3,"masteryScore":4,"maxMastery":10,"collected":true,"firstSeenAt":"2026-11-01T00:00:00Z","lastReviewedAt":"2026-11-08T00:00:00Z","lastCorrectAt":"2026-11-02T00:00:00Z"}` → `toEntity()` có ba mốc millis đúng.
  - `LearningMapperTest.progress item without lastCorrectAt maps null`: thiếu khoá → `lastCorrectAtMillis == null`.
  - `VocabProgressTest`: với `now = 2026-11-09T00:00Z`:
    - `lastCorrect 6 ngày trước → isStale false`;
    - `lastCorrect 8 ngày trước → true`;
    - `lastCorrect null, firstSeen 8 ngày trước → true`;
    - `lastCorrect null, firstSeen 2 ngày trước → false`;
    - `chưa gặp (cả hai null) → isStale false, seen false`;
    - đúng biên `7 ngày tròn → false` (điều kiện là `>`).
- [ ] **Step 2: Chạy, xác nhận hỏng** — `./gradlew :app:testDebugUnitTest --tests "*LearningMapperTest*" --tests "*VocabProgressTest*"` → FAIL.
- [ ] **Step 3: Cài đặt**
  - `refreshProgress` dùng `toEntity()`.
  - `answer()` giữ `firstSeenAtMillis = before?.firstSeenAtMillis ?: now`, `lastCorrectAtMillis = if (result.isCorrect) now else before?.lastCorrectAtMillis`.
  - `observeProgress` truyền hai mốc sang `VocabProgress`.
- [ ] **Step 4: Chạy lại** → PASS; chạy cả `./gradlew :app:testDebugUnitTest` → PASS.
- [ ] **Step 5: Commit** — `feat(mobile): đồng bộ firstSeenAt/lastCorrectAt và quy tắc thẻ sắp quên`

### Task 6: App — repository tuỳ chọn thẻ

**Files:**
- Create: `mobile/app/src/main/java/com/project/linguacity/data/local/player/CardPrefsDao.kt`
- Create: `mobile/app/src/main/java/com/project/linguacity/domain/model/learning/CardPrefs.kt`
- Create: `mobile/app/src/main/java/com/project/linguacity/domain/repository/CardPrefsRepository.kt`
- Create: `mobile/app/src/main/java/com/project/linguacity/data/repository/CardPrefsRepositoryImpl.kt`
- Modify: `mobile/app/src/main/java/com/project/linguacity/data/local/AppDatabase.kt` (`abstract fun cardPrefsDao(): CardPrefsDao`)
- Modify: `mobile/app/src/main/java/com/project/linguacity/di/DatabaseModule.kt` (provide DAO) và `di/RepositoryModule.kt` (`@Binds` cho `CardPrefsRepository`)
- Test: Create `mobile/app/src/test/java/com/project/linguacity/domain/learning/CardPrefsTest.kt`

**Interfaces:**
- Consumes: `CardPrefsEntity` (Task 4).
- Produces:
  - `data class CardPrefs(val vocabularyId: Long, val favorite: Boolean = false, val userScale: Float = 1f, val note: String = "", val lastSelfCheckAtMillis: Long? = null)` + `fun canSelfCheck(nowMillis: Long, zone: java.time.ZoneId): Boolean` (true nếu chưa từng, hoặc ngày lịch theo `zone` của lần trước khác ngày của `now`).
  - `interface CardPrefsRepository { fun observeAll(): Flow<Map<Long, CardPrefs>>; suspend fun setFavorite(id: Long, favorite: Boolean); suspend fun setUserScale(id: Long, scale: Float); suspend fun setNote(id: Long, note: String); suspend fun markSelfCheck(id: Long, nowMillis: Long) }` — mỗi lệnh ghi đọc dòng cũ (hoặc mặc định) rồi `@Upsert` với `updatedAtMillis = now`. `setUserScale` kẹp trong `[0.3f, 4f]`.
  - DAO: `@Upsert suspend fun upsert(row: CardPrefsEntity)`, `@Query suspend fun get(id: Long): CardPrefsEntity?`, `@Query fun observeAll(): Flow<List<CardPrefsEntity>>`.

- [ ] **Step 1: Viết test hỏng** `CardPrefsTest` (zone `Asia/Ho_Chi_Minh`):
  - `never checked → canSelfCheck true`;
  - `checked 10:00 same local day → false`;
  - `checked 23:30 yesterday, now 00:10 → true`;
  - `checked 23:30 UTC = 06:30 local today → false` (khẳng định dùng giờ máy, không dùng UTC).
- [ ] **Step 2: Chạy, xác nhận hỏng** — `./gradlew :app:testDebugUnitTest --tests "*CardPrefsTest*"` → FAIL.
- [ ] **Step 3: Cài đặt** domain, DAO, repository, DI.
- [ ] **Step 4: Chạy lại + build** — test PASS; `./gradlew :app:assembleDebug` → BUILD SUCCESSFUL (Hilt bind đúng).
- [ ] **Step 5: Commit** — `feat(mobile): lưu yêu thích, cỡ thẻ, ghi chú, tự kiểm tra trên máy`

### Task 7: App — chế độ đọc thẻ và mặc định xoay ngang

**Files:**
- Modify: `mobile/app/src/main/java/com/project/linguacity/data/local/preferences/SettingsStore.kt`
- Test: Create `mobile/app/src/test/java/com/project/linguacity/data/local/preferences/SettingsParsingTest.kt`
- Modify: `docs/04-ui/screen-catalog.md` dòng SCR-21: thêm "mặc định Ngang (Kho thẻ 2026-11-09)".

**Interfaces:**
- Produces:
  - `enum class CardReadMode { GRID, BENTO }`.
  - `internal fun parseOrientation(raw: String?): OrientationSetting` (NULL/lạ → `LANDSCAPE`), `internal fun parseReadMode(raw: String?): CardReadMode` (NULL/lạ → `GRID`).
  - `AppSettings.orientation` mặc định `LANDSCAPE`; `SettingsStore.cardReadMode: Flow<CardReadMode>`, `suspend fun setCardReadMode(value: CardReadMode)` (khoá `"card_read_mode"`).

- [ ] **Step 1: Viết test hỏng** `SettingsParsingTest`: `null → LANDSCAPE`, `"PORTRAIT" → PORTRAIT`, `"AUTO" → AUTO`, `"sideways" → LANDSCAPE`; `null → GRID`, `"BENTO" → BENTO`, `"masonry" → GRID`; `AppSettings().orientation == LANDSCAPE`.
- [ ] **Step 2: Chạy, xác nhận hỏng** — `./gradlew :app:testDebugUnitTest --tests "*SettingsParsingTest*"` → FAIL.
- [ ] **Step 3: Cài đặt** — thay đoạn parse inline trong `settings` bằng `parseOrientation`; thêm read mode.
- [ ] **Step 4: Chạy lại** — PASS; toàn bộ `./gradlew :app:testDebugUnitTest` PASS.
- [ ] **Step 5: Commit** — `feat(mobile): chế độ đọc thẻ và mặc định xoay ngang`

---

## Kiểm chứng cuối
- `cd backend && ./gradlew test` → PASS.
- `cd mobile && ./gradlew :app:testDebugUnitTest :app:assembleDebug` → PASS.
- `python database/seed/v008.py` chạy lại cho ra file giống hệt (idempotent) — `git diff --exit-code database/migration/V008__kho_the.sql`.
- Thủ công (nếu có Postgres + emulator): chạy V008, mở app đã cài bản v5 → không crash (AutoMigration), sau đồng bộ gói HOUSING:1 có cụm từ trong Room.
