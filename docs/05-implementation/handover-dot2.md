# Phiếu bàn giao đợt 2: chat code → chat test

Kế hoạch: [plans/2026-11-08-m11-progression.md](plans/2026-11-08-m11-progression.md).

**Chat code (ổ C)**ư
- Viết code, migration, nội dung, tài liệu thiết kế.
- Chỉ biên dịch và chạy `check_style.py`, không viết hay chạy test.

**Chat test (ổ D)**
- Viết test và chạy test; định nghĩa TC trong `docs/06-testing/test-plan.md` và ghi kết quả thật vào đó.
- Review code theo [coding-style.md](coding-style.md).
- Không sửa code ứng dụng. Lỗi tìm được thì ghi lại, người dùng chuyển cho chat code.

Mỗi mốc có một mục bên dưới, mục mới nhất ở cuối.

---

## M11: Quy ước trình bày code (08/11/2026)

**Nhánh:** `feat/m11-code-style` (tách từ `main` @ `a6ff6d0`)

**Commit:**

| Commit | Nội dung |
| --- | --- |
| `44a8b28` | `coding-style.md`, `.editorconfig`, `tools/check_style.py`, kế hoạch đợt 2 |
| `de3c121` | A: chỉ khoảng trắng (tab → 4 dấu cách, city-web thụt lề 2 → 4) |
| `4a2d1fd` | B: ngắt dòng ≤ 100, mỗi dòng một lệnh, `if/for/else` luôn có ngoặc |
| `e269edc` | C1: đổi tên biến mơ hồ |
| `88faf03` | C2: tách hàm dài, thụt lề nối tiếp bội của 4, `check_style --functions` |

**Phạm vi:** khoảng 230 file Java / Kotlin / TS.
- Không đổi API, không đổi tên trường JSON / DTO / cột DB, không đổi hợp đồng bản đồ.
- Chủ ý không đổi hành vi.

### Chat code đã kiểm

- Biên dịch qua: `backend` (`compileJava compileTestJava`), `mobile` (`compileDebugKotlin compileDebugUnitTestKotlin`), `city-web` (`npm run typecheck`).
- `python tools/check_style.py` → **0 lỗi** trên 234 file.
- `python database/seed/housing_level1.py` sinh ra SQL giống hệt bản cũ (so bằng `cmp`).
- **Chưa chạy test nào.**

### Việc của chat test

1. **Chạy lại toàn bộ test hiện có.** Kỳ vọng: không test nào đổi kết quả.
   - `cd backend; .\gradlew.bat test` (trước M11: 48/48 đạt)
   - `cd mobile; .\gradlew.bat testDebugUnitTest assembleDebug`
   - `cd city-web; npm run build`
2. **Commit A chỉ đổi khoảng trắng:** `git diff -w --ignore-blank-lines 44a8b28 de3c121` phải rỗng.
3. **Review theo `coding-style.md`:** đọc lướt diff B / C1 / C2, chú ý chỗ ngắt dòng khó đọc hoặc tên mới chưa rõ nghĩa.
4. **Soi kỹ 3 chỗ thay đổi có thể ảnh hưởng hành vi:**
   - **`LearningSessionRepository.countCompletedBetween`** thay cho phương thức derived query tên dài, giờ là `@Query` JPQL viết tay.
     - Lỗi JPQL sẽ làm **Spring context không khởi động** (mọi test backend đều đỏ).
     - Nếu context khởi động được, cần kiểm hệ số KP theo số phiên trong ngày (`dailySessionIndex`, `dailyMultiplier`): bài thứ 6 trong ngày phải có ×0.2.
   - **`LearningService`** được tách hàm.
     - Thứ tự gọi `random` giữ nguyên (chọn từ → chọn câu đọc → chọn câu viết từng từ → xáo câu viết).
     - Cần kiểm lại luồng học, bài kiểm tra trình độ, nộp đáp án, kết thúc phiên (gồm gọi kết thúc lần hai và phiên hết hạn).
   - **`LessonScreen.QuestionBody`** (giờ là public) và **`CityScreen.BuildingCard`** được tách composable.
     - Giao diện không đổi.
     - Nếu có emulator: mở một bài học (trắc nghiệm + điền từ), màn kết quả, thẻ công trình (Học / Xây / Thẻ từ / Vào nhà).
5. **Gợi ý thêm** (không bắt buộc): một test cho `tools/check_style.py`, ví dụ chạy trên file mẫu có lỗi rồi kiểm mã thoát là 1.

### Ghi chú

- Còn khoảng 30 hàm dài hơn giới hạn, phần lớn là hàm dựng hình 3D ở city-web. Danh sách ở `coding-style.md` §8; chạy `python tools/check_style.py --functions` để xem. Đây là nợ kỹ thuật đã ghi nhận, chưa phải lỗi.
- Script ngắt dòng tự động có thể để lại vài chỗ đúng cú pháp nhưng khó đọc. Ghi lại file:dòng để chat code sửa.

---

## M12: Thiết kế (08/11/2026)

**Nhánh:** `feat/m12-progression`, tách từ `feat/m11-code-style`. Merge PR M11 trước PR này.

### Tài liệu đã viết

| Tài liệu | Nội dung |
| --- | --- |
| [ADR-015](../adr/ADR-015-progression-after-level-one.md) | Quyết định của đợt 2: bài học 20/30, sửa lỗi kẹt, thi, nâng cấp, nhiệm vụ, sự kiện, luyện tập, chuỗi, nội dung mới |
| [system-design §11](../03-architecture/system-design.md) | Bảng V006, API (body JSON + mã lỗi), cấu hình `linguacity.balance.*`, Room v6, traceability. §4.1–4.3 và §7.2.4–7.2.6 được đánh dấu "thay bởi §11" |
| [use-cases](../01-requirements/use-cases.md) | Đặc tả UC_06/07/08/10 + UC_16..UC_20 (§4.9–4.17). Luật **BR-EXAM-01..07, BR-UPG-01..03, BR-QUEST-01..05, BR-EVT-01..04, BR-PRAC-01..04, BR-STREAK-01..03, BR-ACH-05, BR-LEARN-09**. BR-LEARN-01 đổi thành 20 từ / 30 câu |
| [requirements-catalog](../01-requirements/requirements-catalog.md) | FR-EXAM / CITY-03 / CITY-06 → Specified; thêm FR-QUEST-01..03, FR-PRAC-01..03, FR-STREAK-01..02 |
| [screen-catalog](../04-ui/screen-catalog.md) | Mô tả SCR-10/11/12/23/24/25 (§3.4–3.9) |

### Việc của chat test

1. **Viết TC vào `test-plan.md`** từ các luật BR và mã lỗi trong system-design §11. Gợi ý nhóm:
   - TC-EXAM (đủ / thiếu điều kiện, resume, nộp thiếu, nộp đôi, đậu / trượt, Mastery, `ALREADY_PASSED`);
   - TC-UPG (thiếu bản vẽ / mảnh / KP, `MAX_LEVEL`, `BUSY`, hoàn tất theo giờ server);
   - TC-QUEST (chính tuyến suy ra từ trạng thái, nhận đôi, hằng ngày làm mới 0h, thưởng hôm nay);
   - TC-EVT (sinh ≤ 3 mỗi ngày, chỉ từ đã sưu tầm, 4/5 đậu, trượt vẫn mở);
   - TC-PRAC (giới hạn lượt, giới hạn từ mới, thưởng một lần mỗi ngày mỗi từ);
   - TC-STREAK (cộng, về 1, về 0, trao / thu hồi danh hiệu, gỡ khi đang đeo);
   - TC-LEARN (30 câu, hết lỗi kẹt: người xây lúc có 25/30 từ vẫn học được 5 từ Lv1 còn thiếu).
2. **Review tài liệu:** chỗ nào mâu thuẫn hoặc chưa đủ để viết test thì ghi lại cho chat code.

### Ghi chú

ADR-015 đang ở trạng thái **Proposed**. Người dùng duyệt bảng cân bằng (ADR-015 §8, system-design §11.7). Chat code làm tiếp M13 theo bảng này; số liệu nào đổi thì chỉ cần sửa dữ liệu hoặc cấu hình.

---

## M13: Dữ liệu (08/11/2026)

**Nhánh:** `feat/m12-progression`

### File

| File | Nội dung |
| --- | --- |
| `database/migration/V006__progression.sql` | Schema theo system-design §11.1 |
| `database/migration/V007__content_house2_school1.sql` | **Sinh tự động** bởi `database/seed/v007.py` |
| `database/seed/content_lib.py` | Thư viện sinh SQL dùng chung cho gói từ |
| `database/seed/housing_level2.py`, `school_level1.py` | 30 + 30 từ |

### Nội dung V007

- **Hai gói mới:**
  - HOUSING:2: từ 31–60, câu 91–180;
  - SCHOOL:1: từ 61–90, câu 181–270.
- **Tăng version:** CORE và HOUSING:1.
- **Mảnh cần để nâng cấp:** `required_shards` Lv2 = 3, Lv3 = 6.
- **Bài thi `EXAM_HOUSING_LV2`:**
  - yêu cầu 45 từ, 200 KP, School Lv1, đậu ≥ 80%;
  - pool thêm 10 câu (93, 102, …, 174), tổng 20 câu.
- **Dữ liệu trò chơi:**
  - 5 nhiệm vụ MAIN + 5 DAILY + `DAILY_BONUS`;
  - 10 mẫu sự kiện;
  - 4 danh hiệu chuỗi `STREAK_3/10/20/30` (`revocable`).

### Chat code đã kiểm

- `v007.py` tự kiểm dữ liệu trước khi sinh: đủ 30 từ mỗi gói, không trùng từ, mỗi câu tier 2/3 có đúng một chỗ trống `___`, có đủ 2 câu ví dụ.
- `check_style.py` 0 lỗi.
- **Chưa chạy SQL trên PostgreSQL**, vì chat code không có mật khẩu DB.

### Việc của chat test và người dùng

1. **Người dùng chạy hai migration theo thứ tự** (nhớ đặt `$env:PGCLIENTENCODING = "UTF8"` trước):
   ```powershell
   & "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -d linguacity_db -v ON_ERROR_STOP=1 -f database/migration/V006__progression.sql
   & "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -d linguacity_db -v ON_ERROR_STOP=1 -f database/migration/V007__content_house2_school1.sql
   ```
2. **Đếm sau khi chạy.** Kỳ vọng:
   - `vocabularies` = 90; `questions` = 270;
   - `exam_questions` của `EXAM_HOUSING_LV2` = 20;
   - `quests` = 11; `city_event_templates` = 10; achievements thêm 4;
   - `content_packs` có HOUSING:2 và SCHOOL:1, CORE và HOUSING:1 tăng version;
   - `learning_sessions_type_check` nhận được `PRACTICE_REVIEW`.
3. **Soát nội dung:** đọc lướt 60 từ trong `housing_level2.py` / `school_level1.py`. Kiểm IPA, nghĩa, câu ví dụ, và đáp án trong câu tier 2 / tier 3 có khớp chỗ trống không. Một số câu dùng `___s` / `___d`; đáp án vẫn là dạng gốc, và dạng số nhiều / quá khứ nằm trong `accepted_answers`.

Lưu ý: **V006 đổi `learning_sessions.building_id` thành cho phép NULL.** Test H2 tạo schema từ entity, nên chỉ kiểm được khi M14 sửa entity tương ứng.

---

## M14: Backend (08/11/2026)

**Nhánh:** `feat/m12-progression`. Câu hỏi Q1–Q10 của chat test đã được chốt ở [system-design §11.10](../03-architecture/system-design.md).

### API mới (đặc tả: system-design §11)

| Nhóm | Endpoint |
| --- | --- |
| Thi | `GET /exams?building=`, `POST /exams/{code}/start`, `GET /exam-attempts/{id}`, `POST /exam-attempts/{id}/submit` |
| Nâng cấp | `POST /buildings/{code}/build` giờ xây được mọi level. Lỗi mới: `MAX_LEVEL`, `NEEDS_BLUEPRINT`, `REQUIREMENTS_NOT_MET` có thêm `missingShards` |
| Nhiệm vụ | `GET /quests`, `POST /quests/{code}/claim` |
| Luyện tập | `GET /learning/practice/status`, `POST /learning/practice` |
| Sự kiện | `POST /events/{id}/start`; trả lời và kết thúc dùng chung `/learning/sessions/{id}/…` |
| `GET /city` | thêm `blueprints`, `profile`, `streak`; `events` giờ là sự kiện thật |
| `GET /users/me` | `stats` thêm `bestStreak`; `streakDays` giờ là chuỗi ngày theo ADR-015 |
| Gói nội dung | `buildingLevels[].requiredShards`, `exams[].passPercent`, `requirement.requiredBuildingCode/Level`, `achievements[].revocable` |

### Thay đổi hành vi có thể làm test cũ đỏ

- **Bài học đổi cỡ:** `LearningFlowTests` đang kỳ vọng phiên 10 từ / 20 câu, giờ là **20 từ / 30 câu** (`words-per-session=20`, `questions-per-session=30`).
  - Câu đọc 1–20, câu viết 21–30.
  - Phiên chỉ có câu viết cho 10 từ ưu tiên nhất.
- **Chọn từ (BR-LEARN-09):** pool gồm mọi từ của level 1..level học. Từ chưa sưu tầm đứng trước, từ đã sưu tầm đứng sau để ôn.
- **`CompleteResultDto`:** thêm `shardsAwarded` và `eventResolved`, chỉ có mặt với phiên EVENT. `collection` = null với phiên luyện tập / sự kiện.
- **`LearningSessionRepository.countCompletedBetween`** (đã đổi ở M11) vẫn dùng cho hệ số KP trong ngày.

### Lớp mới

- **Dữ liệu và service:**
  - `exam/` (ExamService);
  - `quest/` (QuestService, QuestTracker);
  - `event/` (CityEventService);
  - `player/service/StreakService`.
- **Trong `learning/service/`:** `PracticeService`, `SessionFactory`, `VocabProgressRecorder`, `QuestionViews`.
- **Entity mới:** `ExamAttempt`, `ExamAttemptQuestion`, `UserBlueprint`, `Quest`, `UserQuest`, `CityEventTemplate`, `UserCityEvent`.

### Chat code đã kiểm

- `compileJava compileTestJava` qua; `check_style.py` 0 lỗi.
- **Chưa chạy test nào.**

### Việc của chat test

1. **Chạy test cũ** và sửa những assertion chỉ đổi vì cỡ bài 20/30 (ghi rõ trong commit test).
2. **Viết test mới** theo TC đã định nghĩa. Seed H2 cần thêm:
   - `BuildingLevel` Lv2 có `requiredShards`;
   - `Blueprint` (HOUSING, 2);
   - `Exam` + `ExamRequirement` + `ExamQuestion`;
   - `Quest` (MAIN, DAILY, BONUS);
   - `CityEventTemplate`;
   - các danh hiệu `STREAK_*` có `revocable = true`.
3. **Ca nên soi kỹ:**
   - **Thi:**
     - hai lệnh `submit` song song → chỉ +1 bản vẽ (`@Version`);
     - `start` lần hai → 200, không trừ phí lần nữa;
     - trượt → không hoàn phí.
   - **Luyện tập:**
     - cùng một từ đúng hai lần trong ngày → chỉ lần đầu có KP / Mastery;
     - lượt thứ 2 của chế độ Ôn → 409 `DAILY_LIMIT`.
   - **Sự kiện:**
     - mở sự kiện B khi A còn dở → phiên A hết hạn, B tạo được;
     - đúng 4/5 → +1 mảnh, +15 KP, sự kiện biến khỏi `/city`.
   - **Chuỗi** (dùng `MutableClock`):
     - ngày 1, 2, 3 → được `STREAK_3`;
     - bỏ một ngày → chuỗi về 0, mất `STREAK_3`, gỡ nếu đang đeo;
     - DILIGENT **không** bị thu hồi.
   - **Nhiệm vụ:**
     - chính tuyến nhận theo thứ tự;
     - nhận trước khi xong → 409 `NOT_COMPLETED`;
     - `DAILY_BONUS` chỉ nhận được khi cả 3 nhiệm vụ hằng ngày đã xong.
4. **E2E trên PostgreSQL** (người dùng chạy V006, V007 trước): đi theo luồng ở mục "Kiểm tra cuối" của kế hoạch.

## M15: Mobile (08/11/2026)

**Nhánh:** `feat/m12-progression`. Room giữ v5; ghi chú ở [system-design §11.8](../03-architecture/system-design.md).

### Màn hình mới

| Màn | File | Vào từ |
| --- | --- | --- |
| SCR-10/11/12 Thi | `presentation/exam/ExamScreen.kt`, `ExamViewModel.kt` | Thẻ công trình Lv ≥ 1 chưa có bản vẽ: nút "📝 Thi lên Lv N" |
| SCR-23 Nhiệm vụ & Chuỗi | `presentation/quest/QuestsScreen.kt`, `QuestsViewModel.kt` | Chip 🔥 trên HUD, mục 📜 trong menu nổi |
| SCR-24 Luyện tập | `presentation/practice/PracticeScreen.kt`, `PracticeViewModel.kt` | Mục 🎯 trong menu nổi |
| SCR-25 Sự kiện | `EventCard` trong `CityScreen.kt` | Chạm dấu "!" trên bản đồ |

### Luồng

- **Thi:**
  - SCR-10 hiện checklist (từ, KP, mảnh, công trình cần có).
  - "Bắt đầu thi" mở hộp xác nhận phí. Nếu đang có lượt dở thì vào lại lượt đó, không hỏi phí.
  - SCR-11: câu trả lời giữ trong ViewModel tới lúc nộp; "Xem lại" liệt kê câu chưa trả lời; "Nộp bài" chỉ bật khi đủ câu.
  - SCR-12: đậu thì báo bản vẽ, nút "Về thành phố"; trượt thì nút "Học thêm" (mở LessonRoute của công trình).
- **Nâng cấp:** có bản vẽ thì thẻ công trình hiện "📐 Nâng cấp lên Lv N", gọi lại `build`. Lỗi `NEEDS_BLUEPRINT` / `MAX_LEVEL` / thiếu mảnh hiện bằng snackbar.
- **Sự kiện:** thẻ cư dân → "Giúp" mở `LessonRoute(eventId = id)` (phiên 5 câu). Kết quả hiện `EventRewardCard` (mảnh nhận được hoặc "thử lại").
- **Luyện tập:**
  - chọn Ôn / Hỗn hợp, chủ đề (rỗng = tất cả), 10 hoặc 20 từ;
  - mở `LessonRoute(practiceMode, themes, wordCount)`;
  - số lượt còn lại tải lại mỗi lần màn ON_RESUME;
  - hết lượt → nút tắt; server trả 409 `DAILY_LIMIT` thì màn bài học hiện "Hết lượt hôm nay".
- **LessonRoute** thêm tham số mặc định `practiceMode`, `themes`, `wordCount`, `eventId`; `buildingCode` mặc định `HOUSING`.
- Tiêu đề kết quả: "Kết quả luyện tập" / "Kết quả giúp cư dân". Thẻ bộ sưu tầm ẩn khi `collection = null`.
- Tutorial: "20 câu" → "30 câu".

### Chat code đã kiểm

- `compileDebugKotlin compileDebugUnitTestKotlin` qua (cần `ANDROID_HOME`, bản ổ C không có `local.properties`).
- `check_style.py` 0 lỗi.
- **Chưa chạy test, chưa mở emulator.**

### Việc của chat test

1. **Test cũ có thể đỏ:**
   - `CityRepository.resolveEvent` đã bỏ;
   - `BuildOutcome.NotMet` thêm `missingShards` (mặc định 0);
   - `CityEvent` thêm trường (đều có mặc định);
   - `LessonSession.buildingCode` thành nullable.
2. **Test thuần đề xuất:**
   - `ExamViewModel` với repository giả: `start` có lượt dở → không hỏi phí; `next` ở câu cuối → `reviewing`; `submit` chỉ gửi câu không rỗng; lỗi `INCOMPLETE` → quay về xem lại;
   - `PracticeUiState.usesLeft` / `canStart` theo từng chế độ;
   - `QuestsViewModel.claim` chặn bấm hai lần;
   - mapper `CityRepositoryImpl`: `blueprints` → `hasBlueprintFor`, `events` → `CityEvent.serverId`;
   - `FloatingMenuTest`: menu giờ có thêm 📜 và 🎯.
3. **Emulator (sau khi người dùng chạy V006, V007 và backend mới):** chụp SCR-10/11/12/23/24/25.

### Chưa làm

- Gợi ý Mai lần đầu mở Trung tâm thi; nhãn "mất khi đứt chuỗi" ở SCR-18.
- Lịch chuỗi 7 ngày: API chưa trả lịch sử, màn chỉ hiện hai điều kiện của hôm nay.

## M16: city-web (08/11/2026)

**Nhánh:** `feat/m12-progression`.

- Bản đồ đã vẽ dấu (!) theo `events[].id` từ trước (`Citizens.syncEvents`), nên không phải đổi cách vẽ.
- **Hợp đồng bridge (vẫn `v: 1`):**
  - `events[].kind` nhận thêm `HELP`, giá trị lạ coi là `GRAMMAR`;
  - thêm `buildingCode` tuỳ chọn; mã lạ bỏ qua. Bản đồ hiện chưa dùng trường này để chọn người mang dấu.
- File đổi: `city-web/src/bridge/cityState.ts`, `mobile/.../city/web/CityBridgeJson.kt`, system-design §9.2.1.
- **Đã kiểm:** `npm run typecheck`, `compileDebugKotlin compileDebugUnitTestKotlin`, `check_style.py` 0 lỗi.

### Việc của chat test

- `normalizeState`: `kind: "HELP"` giữ nguyên; `kind: "XYZ"` → `GRAMMAR`; `buildingCode: "SCHOOL"` giữ nguyên, `"FOO"` → không có.
- `CityBridgeJsonTest` (nếu có): chuỗi state có thêm `buildingCode`.
- Trên emulator: sự kiện hôm nay hiện dấu (!) trên người dân; giải xong thì dấu biến mất sau khi `GET /city` tải lại.

## Đợt 2: tổng kết cho E2E

**Commit:** M11 (44a8b28 … 60f5cac), M12 f95b393, M13 9989d13, M14 517bcd5, M15 589a9da, M16 (commit này).

**Người dùng làm trước E2E:**
1. Push nhánh `feat/m12-progression`.
2. Chạy V006, V007 bằng psql (`$env:PGCLIENTENCODING="UTF8"`).
3. Chạy backend mới từ bản đã checkout nhánh này.

**Còn mở:** Q10 (pool thi toàn câu tier 3, đậu 8/10) chờ người dùng quyết; các mục "Chưa làm" của M15.

## M15b: Phần còn lại của M15 (08/11/2026)

- **Mai ở Trung tâm thi:** lần đầu mở SCR-10 hiện thẻ giải thích luật; bấm "Mình hiểu rồi" thì lưu cờ `exam_tip_seen` (SettingsStore) và không hiện lại.
- **SCR-18:** danh hiệu `STREAK_*` có nhãn "🔥 Mất khi đứt chuỗi ngày" (nhận theo tiền tố mã, vì Room v5 chưa có cột revocable).
- **Lịch chuỗi 7 ngày:** `GET /quests` thêm `streakWeek: boolean[7]` (cũ trước, hôm nay cuối; một ngày = có bài học + nhiệm vụ hằng ngày, BR-STREAK-01). SCR-23 hiện hàng 🔥/⬜. `GET /city` không đổi.
- **Chat test:** kiểm `streakWeek` bằng `MutableClock` (ngày đủ / thiếu một điều kiện); test `QuestsDto` cũ cần thêm tham số thứ 6.

## Sửa lỗi B1–B4 (từ test-plan §10.10)

| Mã | Sửa | File |
| --- | --- | --- |
| B1 | `CityEventService.requireOpen` thêm `@Transactional(noRollbackFor = ApiException.class)`: lỗi nghiệp vụ không còn đánh dấu rollback-only → trả đúng 409 `EVENT_RESOLVED` / 404 `EVENT_NOT_FOUND` | `event/service/CityEventService.java` |
| B2 | Luyện tập: câu **đầu tiên** trong ngày của một từ (đúng hay sai) ghi `last_rewarded_on`; các câu sau cùng ngày không đổi Mastery. KP vẫn chỉ cộng khi đúng. Hệ quả: nếu câu đầu sai thì hôm đó từ ấy không còn được KP | `learning/service/LearningService.java` |
| B3 | `QuestTracker.record/recordMax` trả danh hiệu chuỗi vừa trao; `afterComplete` gộp với `streak.recordActivity` → `STREAK_3` có trong `newAchievements` của `complete`. Còn hở: nếu nhiệm vụ xong ngay lúc **trả lời câu** (`NEW_WORDS`, `REVIEW_WORDS`, `STREAK_CORRECT`) thì danh hiệu trao lúc đó chưa được báo (API answer không có `newAchievements`) | `quest/service/QuestTracker.java`, `LearningService.java` |
| B4 | `requireOpen` từ chối sự kiện của ngày khác: 409 `EVENT_EXPIRED` | `CityEventService.java` |

Chưa làm: N1 (tách mapper mobile ra `ProgressionMapper`), N2 (thêm `kotlinx-coroutines-test`), Q9 (lọc sự kiện theo công trình đã xây).
