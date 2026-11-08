# Đợt 2: Quy ước code Murach → Thi, Nâng cấp, Nhiệm vụ, Sự kiện, Luyện tập, Chuỗi

## Context

- **Quy ước code:** người dùng muốn áp quy tắc trình bày code của Murach cho toàn dự án (Java, Kotlin, TypeScript), giới hạn 100 ký tự mỗi dòng. Làm **trước** mọi tính năng, trong các commit chỉ đổi trình bày.
- **Vòng chơi đang đứt sau House Lv1.**
  - Chưa có API thi (VS4) và chưa có nâng cấp (VS5). `CityService.build` trả `409 ALREADY_BUILT` từ Lv1 trở lên.
  - Có lỗi kẹt tiến độ: lên Lv1, phiên học chuyển sang Level 2 (chưa có nội dung) và không còn đưa ra từ Level 1 chưa sưu tầm.
- **Người dùng chốt gộp VS4 + VS5 vào đợt này, cộng thêm:**
  - nhiệm vụ chính tuyến (sau House Lv1 là xây School…);
  - nhiệm vụ ngoại tuyến gồm cả đố nhanh khi chạm sự kiện "!" lẫn nhiệm vụ hằng ngày;
  - chế độ Luyện tập mọi chủ đề (Ôn từ đã học / Hỗn hợp, có giới hạn trong ngày);
  - Chuỗi ngày (học bài + hoàn thành nhiệm vụ) kèm danh hiệu theo mốc, mất khi đứt chuỗi;
  - bài học 20 từ / 30 câu;
  - nội dung mới HOUSING:2 và SCHOOL:1, từ đơn giản nhưng soạn kỹ.
- **Độ khó và kiểu câu hỏi mới để sau.** Đợt này lo luồng chơi trước.

Quy ước làm việc:
- **Git:** chat code tạo nhánh khi cần và **tự commit** (mỗi mốc / mỗi bước A/B/C của M11 một
  commit, kèm dòng `Co-Authored-By`). **Người dùng tự push** và mở PR.
- Bridge giữ v1, chỉ thêm trường tuỳ chọn.
- Migration chạy tay; không chat nào nhập mật khẩu DB.

## Phân vai hai chat

| | Chat 1: viết code (chat này, ổ C) | Chat 2: test (người dùng mở, ổ D) |
| --- | --- | --- |
| Làm | Code, migration, nội dung seed, tài liệu thiết kế (ADR, use-case, system-design, screen-catalog, `coding-style.md`) | **Viết test** (backend `*Tests.java`, mobile `src/test`), định nghĩa TC trong `test-plan.md`, **chạy test**, review code theo `coding-style.md`, chạy E2E (curl, emulator), ghi kết quả thật vào `test-plan.md` |
| Không làm | Không viết hay sửa file test, không ghi `test-plan.md`. Chỉ **biên dịch** (`compileJava`, `compileDebugKotlin`, `npm run typecheck`) và chạy `check_style.py` trước khi commit, để bàn giao code build được | Không sửa code ứng dụng; lỗi tìm được thì ghi lại để người dùng chuyển cho chat 1 |
| Thư mục | `C:\Users\ADMIN\Documents\LinguaCity` | `D:\LinguaCity\LinguaCity`, `git fetch` + checkout nhánh chat 1 sau khi người dùng push |

**Phiếu bàn giao** (chat 1 gửi khi xong mỗi mốc; người dùng dán sang chat 2):
- mốc, nhánh, mã commit, danh sách file đổi;
- hành vi cần kiểm: API mới (đường dẫn, mã lỗi), luật nghiệp vụ, ca biên, mã TC đề xuất;
- chỗ cần soi kỹ, việc chưa làm, việc cần người dùng (chạy migration, emulator).

Chat 1 không chờ kết quả test để làm mốc kế, trừ hai điểm dừng (sau M12 để duyệt thiết kế; trước E2E).
Lỗi chat 2 báo lại → chat 1 sửa bằng commit mới trên nhánh đang làm.

## Bước 0: chuẩn bị nhánh

Bản ở ổ C đang chậm 6 commit so với `origin/main` và có `README.md` chưa commit. Lần lượt:
1. `git checkout main`
2. `git pull`
3. `git checkout -b feat/m11-code-style` (README.md đi theo, commit riêng `docs: viết lại README`).

Nhánh: `feat/m11-code-style` cho M11 (PR riêng vì diff rất lớn, chỉ đổi trình bày). Sau khi người
dùng merge, chat 1 tạo `feat/m12-progression` từ `main` cho M12–M16, mỗi mốc một commit.

## M11: Quy ước trình bày code (Murach, chỉnh cho dự án)

**1. Viết `docs/05-implementation/coding-style.md`.** Năm nhóm quy tắc của người dùng, đã chỉnh cho Java/Kotlin/TS:

- **Thụt lề và khoảng trắng**
  - 4 dấu cách cho Java, Kotlin, TS, SQL, CSS. JSON/YAML giữ 2. Không dùng tab.
  - Ngoặc `{` cùng dòng (K&R, chuẩn của cả 3 ngôn ngữ); `} else {` cùng dòng.
  - Cách quanh toán tử, sau dấu phẩy.
  - Dòng trống tách khối khai báo / xử lý / trả về; tối đa 1 dòng trống liên tiếp.
- **Đặt tên**
  - Biến, tham số, **hàm**: camelCase, theo chuẩn ngôn ngữ thay cho PascalCase của C#.
  - Lớp: PascalCase. Hàm `@Composable` cũng PascalCase (ngoại lệ của Compose).
  - Hằng số và giá trị enum: UPPER_SNAKE_CASE.
  - Cấm tên mơ hồ (`ub`, `lv1`, `p`, `st`, `c`, `r`, `tmp`). Được phép: `i`/`j`, `e` trong catch, `it` trong lambda ngắn; viết tắt nghiệp vụ `id`, `dto`, `kp`, `uuid`, `api`.
- **Câu lệnh**
  - Mỗi dòng một lệnh; không viết `a(); b()` trên một dòng.
  - `if/for/while` trong Java/TS luôn có ngoặc và thân xuống dòng. Kotlin cho phép `if` dạng biểu thức ngắn.
  - Tối đa 100 ký tự. Ngoại lệ: dòng import/package, URL.
- **Comment:** viết *vì sao*, không lặp lại *cái gì*. Javadoc/KDoc ở đầu lớp và hàm phức tạp. Không để code bị comment-out.
- **Tổ chức**
  - Java: hằng → field → constructor → public → private helper → kiểu lồng.
  - Kotlin: thuộc tính/`init` → hàm public → private → `companion object` cuối.
  - Hàm ≤ ~40 dòng (Composable ≤ ~60); lồng ≤ 3 cấp; dùng guard clause.
- **Ràng buộc đổi tên** (đổi là hỏng hợp đồng): không đổi tên trường JSON/DTO, cột/bảng DB, entity/cột Room, đường dẫn API, trường bridge, khoá `SavedStateHandle`, thuộc tính của route `@Serializable`.
- **Không động vào:** `database/migration/V001–V005` (đã chạy), Room `schemas/*.json`, `package-lock.json`, `dist/`, `build/`.

**2. Công cụ.**
- `.editorconfig` ở gốc: indent, `max_line_length=100`, charset, trim, final newline, kèm vài khoá `ij_*` cho IntelliJ/Android Studio (giữ CRLF như hiện tại).
- `tools/check_style.py` (Python thuần): báo dòng >100, tab, khoảng trắng cuối dòng, nhiều lệnh trên một dòng (heuristic `;`).
- Không thêm Spotless/ktlint, vì chúng áp phong cách riêng.

**3. Commit A: chỉ khoảng trắng** (tự động bằng script).
- Tab → space (`BackendApplication*.java`).
- TS từ 2 → 4 dấu cách.
- Xoá khoảng trắng cuối dòng, gộp dòng trống thừa.
- Kiểm tra: `git diff -w` gần như rỗng.

**4. Commit B: trình bày tay, theo kết quả `check_style.py`.**
- Ngắt khoảng 1.170 dòng >100 ký tự.
- Tách lệnh gộp, thêm ngoặc cho `if`.
- Sắp lại thứ tự thành viên lớp. Kotlin không đổi thứ tự thuộc tính/`init` với nhau, vì đổi là đổi nghĩa.
- Đổi tên biến cục bộ mơ hồ.

**5. Commit C: tách hàm quá dài / lồng sâu.** Chỉ những chỗ rõ ràng (ví dụ `LearningService`, `LessonScreen.QuestionView`), không đổi hành vi.

**Chat 1 trước mỗi commit:** biên dịch (`backend: gradlew compileJava compileTestJava`,
`mobile: gradlew compileDebugKotlin compileDebugUnitTestKotlin`, `city-web: npm run typecheck`) +
`python tools/check_style.py` → 0 lỗi. File test cũng được định dạng lại (chỉ trình bày, không đổi
logic) vì quy ước áp cho toàn dự án.

**Chat 2:** chạy toàn bộ test hiện có (`gradlew test`, `testDebugUnitTest assembleDebug`,
`npm run build`) để chứng minh M11 không đổi hành vi; review `git diff -w` của commit A gần như rỗng.

## M12: Thiết kế trước khi code (theo handover §27)

- **ADR-015 "Tiến trình sau Lv1".** Thay phần mâu thuẫn trong ADR-005, GDD §6.1, system-design §4.1–4.3 và §7.2.4–7.2.6.
- **`use-cases.md`:** viết đặc tả UC_06/07/08 (thi) và UC mới cho Nâng cấp, Nhiệm vụ, Sự kiện, Luyện tập, Chuỗi. Thêm luật `BR-EXAM-*`, `BR-QUEST-*`, `BR-EVENT-*`, `BR-PRAC-*`, `BR-STREAK-*`.
- **`system-design.md`:**
  - API mới, bảng mới, Room v6.
  - Lỗi theo chuẩn §10.4 (409 + `code` + `details`, không dùng 400 như bản vẽ cũ).
  - Bảng cân bằng §10.6.
- **`screen-catalog.md`:**
  - Mô tả thành phần SCR-10/11/12.
  - Màn mới: SCR-23 Nhiệm vụ & Chuỗi, SCR-24 Luyện tập, SCR-25 Sự kiện (đố nhanh).
  - Cập nhật SCR-05 (nâng cấp), SCR-13 (chip 🔥 chuỗi), SCR-22 (menu).
- **`test-plan.md`:** do **chat 2** viết (TC-EXAM, TC-UPG, TC-QUEST, TC-EVT, TC-PRAC, TC-STREAK),
  dựa trên luật BR-* và API trong tài liệu chat 1 vừa viết.

### Bảng cân bằng mặc định

Mọi số đều là khoá `linguacity.balance.*` hoặc dữ liệu DB, đổi được không cần sửa code.

| Mục | Giá trị |
| --- | --- |
| Bài học (cả tutorial) | 20 từ / 30 câu: 20 câu nhận nghĩa, 10 câu điền từ |
| Chọn từ (sửa kẹt) | Ưu tiên từ **chưa sưu tầm** ở mọi level ≤ level học (level công trình + 1), rồi mới tới từ ôn |
| House Lv0→1 | Giữ nguyên: 20 từ HOUSING:1 + 100 KP |
| School Lv0→1 | 20 từ SCHOOL:1 + 150 KP, 60 giây |
| Thi lên House Lv2 | Mở thi khi:<br>• đã sưu tầm **45/60 từ House** (đếm từ thuộc chủ đề của công trình, level 1–2)<br>• có 200 KP<br>• đã xây **School Lv1**, nhiệm vụ chính tuyến<br><br>Cách thi:<br>• 10 câu rút ngẫu nhiên từ pool 20 câu (Lv1 + Lv2)<br>• đậu khi ≥ 80%<br>• trượt thì không hoàn phí<br>• không giới hạn giờ<br>• đang dở thì vào lại được (resume)<br>• Mastery ±1 cho từ TARGET |
| Thưởng thi đậu | 1 bản vẽ `BLUEPRINT_HOUSING_LV2` (`user_blueprints`) |
| Nâng House Lv1→2 | Tốn 1 bản vẽ + **3 blueprint_shards** + 300 KP, xây 1 giờ |
| Sự kiện "!" | Tối đa 3 mỗi ngày.<br>• Một cư dân nhờ việc; đố 5 câu từ các từ đã sưu tầm.<br>• Đúng ≥ 4/5: +1 mảnh, +15 KP.<br>• Trượt: sự kiện vẫn còn, làm lại được. |
| Nhiệm vụ hằng ngày | 3 nhiệm vụ mỗi ngày, rút từ mẫu:<br>• học 1 bài<br>• sưu tầm 5 từ mới<br>• giải 1 sự kiện<br>• đúng liên tiếp 10 câu<br>• ôn 10 từ<br><br>Thưởng:<br>• mỗi nhiệm vụ +1 mảnh, +10 KP, bấm nhận<br>• xong cả 3 thêm +1 mảnh<br><br>Reset 0h giờ Việt Nam. |
| Chính tuyến | Chuỗi nhiệm vụ, mỗi bước có thưởng KP/mảnh:<br>1. Xây House Lv1<br>2. Sưu tầm 20 từ School<br>3. Xây School Lv1<br>4. Thi đậu House Lv2<br>5. Nâng House Lv2 |
| Luyện tập: Ôn | Chỉ từ đã sưu tầm, mọi chủ đề hoặc chủ đề tự chọn.<br>• 1 lần mỗi ngày, có KP + Mastery. |
| Luyện tập: Hỗn hợp | Từ đã học + từ mới.<br>• Tối đa 3 lần mỗi ngày.<br>• Tối đa 20 từ mới mỗi ngày.<br>• Một từ cũ chỉ được thưởng / tăng Mastery lần đầu trong ngày. |
| Cỡ bài luyện tập | Chọn 10 hoặc 20 từ (câu = 1,5 × số từ) |
| Chuỗi | Một ngày được tính khi có ≥ 1 bài học hoàn thành **và** ≥ 1 nhiệm vụ hằng ngày hoàn thành. Hiện 🔥N trên HUD. |
| Danh hiệu chuỗi | `STREAK_3` "Người giữ lửa", `STREAK_10`, `STREAK_20`, `STREAK_30`.<br>• Mốc lưu trong DB.<br>• **Mất khi đứt chuỗi**; nếu đang đeo thì tự gỡ. |

**Giả định cần xác nhận lúc duyệt kế hoạch:**
- Câu "cập nhật theo tuần" hiểu là: các mốc chuỗi nằm trong DB nên có thể chỉnh hằng tuần không cần sửa code, còn danh hiệu được xét lại mỗi khi sang ngày.
- DILIGENT giữ là danh hiệu vĩnh viễn.

## M13: Dữ liệu (migration + nội dung)

**`V006__progression.sql`: schema.**
- `exam_attempts`, `exam_attempt_questions`, `user_blueprints`: theo system-design §5.1.13–16, kèm `uq_active_attempt`.
- `building_levels.required_shards`.
- `exam_requirements.required_building_id` + `required_building_level` (điều kiện School Lv1).
- Mở rộng CHECK `learning_sessions.type`: thêm `PRACTICE_REVIEW`, `PRACTICE_MIXED`, `EVENT`.
- `learning_sessions.exam`: không cần, thi dùng bảng riêng.
- Nhiệm vụ:
  - `quests (code, kind MAIN/DAILY, title, description, goal_type, goal_ref, goal_value, reward_kp, reward_shards, prerequisite_code, sort_order)`
  - `user_quests (user_id, quest_code, period_date NULL cho MAIN, progress, completed_at, claimed_at)`
- Sự kiện:
  - `city_event_templates (code, resident_name, building_code, situation_text, sort)`
  - `user_city_events (id, user_id, template_code, spawn_date, status OPEN/RESOLVED, session_id)`
- Chuỗi:
  - `achievements.revocable BOOLEAN DEFAULT FALSE`
  - `user_profiles.streak_days`, `streak_last_date`

**`V007__content_house2_school1.sql`: nội dung.**
- Sinh bằng script mới `database/seed/housing_level2.py` và `school_level1.py`, cùng khuôn `housing_level1.py`.
- **HOUSING:2 và SCHOOL:1: mỗi gói 30 từ.** Mỗi từ có:
  - IPA, nghĩa tiếng Việt, 2 câu ví dụ;
  - 3 câu hỏi theo tier, gồm câu tier 2 có mẹo nhớ và câu tier 3 có giải thích từ dễ nhầm;
  - chủ đề, độ khó.
- **Pool thi:** 20 câu cho `EXAM_HOUSING_LV2`. Cập nhật requirement (45 từ, 200 KP, cần School Lv1).
- **`building_levels`:** House Lv2 cần `required_shards = 3`.
- **Dữ liệu trò chơi:**
  - 10 mẫu sự kiện (cư dân + tình huống tiếng Việt);
  - 5 mẫu nhiệm vụ hằng ngày + 5 bước chính tuyến;
  - 4 danh hiệu chuỗi;
  - tăng version CORE, HOUSING:1; thêm gói HOUSING:2, SCHOOL:1.
- **Theme của School:** kiểm tra lại `building_themes` lúc làm.

**Nghiệm thu nội dung:** người dùng đọc lướt 60 từ trong file seed trước khi chạy migration.

## M14: Backend

Tái dùng có sẵn:
- `LearningService`: `newSession`, `saveItems`, `targetQuestions`, `toDto`, `complete`.
- `AnswerGrader`, `MasteryEngine`, `WordSelector`.
- `CityService.completeIfDue`, `ensureRows`.
- `ApiException`, `BalanceProperties`, `Times`.
- `AchievementService.grant` / `evaluateAfterSession`.
- `ContentService.vocabularyIdsOf`.

**Learning**
- Cỡ bài 20/30 (`words-per-session`, `questions-per-session`).
- Sửa chọn level/từ để hết kẹt.
- Thêm `POST /learning/practice {mode: REVIEW|MIXED, themes[], wordCount}`:
  - kiểm giới hạn ngày (409 `DAILY_LIMIT` kèm `details.resetsAt`);
  - thưởng/Mastery một lần mỗi từ mỗi ngày.
- Tách nhánh KP theo `SessionType` trong `complete` (hiện mọi loại khác PLACEMENT đều rơi vào công thức LEARNING).

**`exam/` (gói mới)**
- `GET /exams?building=` trả trạng thái + từng điều kiện còn thiếu.
- `POST /exams/{code}/start`:
  - đủ điều kiện → 201 tạo lượt thi + câu hỏi (không kèm đáp án);
  - đang có lượt dở → 200 trả lượt đó;
  - thiếu điều kiện → 409 `REQUIREMENTS_NOT_MET {missing:{collected, knowledge, building}}`.
- `POST /exam-attempts/{id}/submit {answers[]}`:
  - chấm điểm, Mastery TARGET, đậu thì `user_blueprints +1`;
  - trả điểm + giải thích từng câu.
- `@Transactional`, khoá `@Version`.

**City**
- `POST /buildings/{code}/build` dùng chung cho mọi cấp:
  - Lv0→1 như cũ;
  - Lv≥1 cần bản vẽ (building, level+1) + mảnh + KP.
  - Lỗi: 409 `NEEDS_BLUEPRINT`, `REQUIREMENTS_NOT_MET {missingShards, missingKnowledge}`, `MAX_LEVEL`.
- `GET /city` thêm `blueprints` và sự kiện thật trong `events`.

**`quest/` (gói mới)**
- `GET /quests` (chính tuyến + 3 nhiệm vụ hôm nay, tạo lười khi gọi), `POST /quests/{code}/claim`.
- Tiến độ được cộng qua `QuestTracker.record(userId, goalType, amount)`, gọi từ:
  - learning complete;
  - event resolve;
  - build/upgrade;
  - exam pass;
  - từ mới được sưu tầm.

**`event/` (gói mới)**
- Sinh sự kiện lười trong `GET /city` (tối đa 3 mỗi ngày).
- `POST /events/{id}/start` → phiên `EVENT` 5 câu, tái dùng engine.
- `complete` → thưởng + đánh dấu RESOLVED.

**Chuỗi**
- Cập nhật `streak_days` khi một ngày đạt cả hai điều kiện.
- Đứt chuỗi: kiểm lúc `GET /users/me` / `GET /quests` → thu hồi danh hiệu `revocable` và gỡ nếu đang đeo.
- `PlayerDto.stats` thêm `streakDays`, `bestStreak`.

**Test (chat 2 viết, H2 + `MutableClock`)**
- Lớp mới đề xuất: `ExamFlowTests`, `UpgradeFlowTests`, `QuestFlowTests`, `CityEventTests`,
  `PracticeLimitTests`, `StreakTests`.
- `LearningFlowTests` hiện có sẽ cần sửa cho cỡ bài 20/30 và ca kẹt: chat 1 ghi rõ trong phiếu
  bàn giao những assertion cũ bị đổi (ví dụ số câu mỗi phiên).

## M15: Mobile

**Data**
- Room v6 (AutoMigration 5→6): `UserBlueprintEntity`, cột chuỗi trong profile.
- Nhiệm vụ / sự kiện / thi chỉ online, không cache.
- API mới trong `ExamApi`, `QuestApi`, `EventApi`; mở rộng `LearningApi.practice`, `CityApi` (blueprints/events).
- Repository trả outcome dạng sealed như `BuildOutcome`.

**UI chung:** tách `QuestionBody` / `ProblemView` khỏi `LessonScreen` thành composable public để thi, sự kiện và luyện tập dùng chung.

**Màn hình**
- **SCR-10 Trung tâm thi:**
  - checklist điều kiện (từ x/45, KP, School Lv1);
  - nút Thi, có hộp xác nhận phí.
- **SCR-11 Làm bài:**
  - đi từng câu, lưu tạm trong ViewModel và `SavedStateHandle`;
  - xem lại trước khi nộp.
- **SCR-12 Kết quả:** đậu/trượt, điểm, giải thích, hiệu ứng nhận bản vẽ.
- **SCR-05 thẻ công trình:**
  - nút "Thi lên Lv2";
  - khi có bản vẽ thì có nút "Nâng cấp", kèm dòng điều kiện (bản vẽ ✓, mảnh 2/3, KP).
- **SCR-23 Nhiệm vụ & Chuỗi:**
  - tab Chính tuyến / Hằng ngày, nút Nhận;
  - lịch chuỗi 7 ngày;
  - vào từ menu nổi (thêm mục 📜) và chip 🔥 trên HUD.
- **SCR-24 Luyện tập:**
  - chọn Ôn / Hỗn hợp, chủ đề, 10/20 từ;
  - hiện lượt còn lại trong ngày;
  - chạy bằng `LessonRoute(mode=…)`.
- **SCR-25 Sự kiện:**
  - chạm "!" → thẻ cư dân + tình huống → đố 5 câu → thưởng.
  - `CityMapIntent.CityEventTapped` đã có sẵn.
- **Mai:** một gợi ý khi lần đầu mở Trung tâm thi và khi có bước chính tuyến mới (`SettingsStore` lưu cờ đã xem).
- **Danh hiệu:** nhãn "mất khi đứt chuỗi" ở SCR-18.
- **Gỡ chỗ cũ:** bỏ thông báo "sắp có!" ở `NeedsExam`.

**Test thuần (chat 2 viết, JUnit 4).** Chat 1 giữ logic kiểm được ở dạng hàm thuần để dễ test:
- mapper DTO thi/nhiệm vụ;
- hàm điều kiện thi (`ExamEligibility`);
- `MaiLines` cho thi;
- `FloatingMenuTest` cho 6 mục.

## M16: city-web (nhỏ)

- Kiểm tra `events` trong state hiển thị đúng dấu "!" theo `buildingCode`.
- Housing L2 và School L1 đã có hình. Không đổi hợp đồng ngoài trường tuỳ chọn.

## Kiểm tra cuối (E2E, chat 2)

1. **Người dùng chạy V006, V007 bằng psql** (`PGCLIENTENCODING=UTF8`); chat 2 đếm số dòng nội dung.
2. **Chat 2 gọi API bằng curl trên backend thật**, đi đủ luồng:
   - onboard → placement → học → xây House Lv1;
   - học School → xây School;
   - nhiệm vụ và sự kiện để lấy mảnh;
   - thi trượt / thi đậu;
   - nâng cấp House Lv2;
   - giới hạn luyện tập (409 `DAILY_LIMIT`);
   - đứt chuỗi thì mất danh hiệu (dùng `MutableClock` trong test; trên DB thật thì kiểm phần còn lại).
3. **Emulator Pixel_5:** đi cả vòng trên, chụp ảnh SCR-10/11/12/23/24/25 cho báo cáo; ghi kết quả vào test-plan.
4. **Chạy lại:** test backend, test mobile + assemble, city-web build, `check_style.py`.

## File chính

- **Docs:** `docs/05-implementation/coding-style.md` (mới), `docs/adr/ADR-015-*.md` (mới), `docs/01-requirements/use-cases.md`, `docs/03-architecture/system-design.md`, `docs/04-ui/screen-catalog.md`, `docs/06-testing/test-plan.md`.
- **Công cụ:** `.editorconfig`, `tools/check_style.py`.
- **Database:** `database/migration/V006__progression.sql`, `V007__content_house2_school1.sql`, `database/seed/housing_level2.py`, `school_level1.py`.
- **Backend:**
  - `learning/service/LearningService.java`, `city/service/CityService.java`, `achievement/service/AchievementService.java`, `common/config/BalanceProperties.java`, `application.properties`;
  - gói mới `exam/`, `quest/`, `event/`.
- **Mobile:**
  - `data/local/AppDatabase.kt` (v6), `data/remote/*Api.kt`, `presentation/lesson/*`, `presentation/city/CityScreen.kt` + `CityViewModel.kt`, `presentation/navigation/AppNavHost.kt`;
  - thư mục mới `presentation/exam/`, `quest/`, `practice/`, `event/`.

## Thứ tự và điểm dừng

1. **M11:** 3 commit A/B/C → phiếu bàn giao → người dùng push → chat 2 chạy test cũ.
2. **M12:** tài liệu, 1 commit. **Dừng** để người dùng duyệt ADR-015 và bảng cân bằng; chat 2 viết TC.
3. **M13 → M14 → M15 → M16:** mỗi mốc 1 commit (biên dịch được) + phiếu bàn giao; chat 2 viết
   test và chạy song song, lỗi báo về chat 1 sửa.
4. **E2E** (chat 2, người dùng chạy migration và emulator).

Mốc nào quá lớn cho một phiên thì làm tiếp ở phiên sau theo đúng thứ tự này.
