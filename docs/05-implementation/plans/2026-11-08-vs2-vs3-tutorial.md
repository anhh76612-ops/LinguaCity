# Đợt lớn: đóng VS1 → VS2 Nội dung → VS3 Học → Tutorial thư ký → Tuỳ biến → Giao diện

## Context
- Bước 2 (WebView) và bước 3 (hợp đồng CityState) đã xong, người dùng đã commit trên `feat/android-city-webview`.
- Người dùng muốn gộp VS1 (đóng) + VS2 + VS3 vào một đợt, và bổ sung:
  - tutorial có nhân vật thư ký, bài kiểm tra trình độ;
  - danh hiệu;
  - vào bên trong công trình (House 3D);
  - tuỳ biến nhân vật và nhà;
  - Splash/Loading, menu nổi, cài đặt xoay màn hình;
  - hiệu ứng tải: skeleton, shared element, progressive loading, motion choreography.
- Hiện trạng:
  - VS1 code xong, thiếu nghiệm thu TC-VS1-13..17.
  - VS2/VS3 chưa có code, chưa có seed, chưa có endpoint content hay learning, chưa có đặc tả UC_03/04/05.
  - Backend: Spring Boot 4.1, JPA, H2 cho test, SQL migration viết tay `database/migration/V00N__*.sql`.
  - Mobile: Room v2, Retrofit, MVI, Hilt.
  - city-web: Three.js, bridge v1 (ADR-011).
- Mọi quyết định bên dưới **đã được người dùng chốt** qua 6 lượt hỏi. Mục "Đề xuất chi tiết" là thiết kế tôi soạn theo yêu cầu "lên kế hoạch giúp tôi"; người dùng duyệt qua kế hoạch này.
- **Không commit/push/PR**: mỗi mốc soạn sẵn lời commit để người dùng tự làm.

## Quyết định đã chốt
| Chủ đề | Chốt |
|---|---|
| Đồng bộ nội dung tĩnh | **Gói theo Level, tải khi cần**, mỗi gói có `version`. Kiểu **pull** khi mở app hoặc quay lại foreground. Khoá gói thiết kế sẵn để sau thêm phạm vi "lớp học" và FCM push. Không làm WebSocket hay FCM đợt này |
| Lần đầu không mạng | Chặn ở SCR-03 + nút Thử lại |
| Header | `X-Guest-UUID` bắt buộc cho mọi API |
| Phạm vi VS2 | Đủ như SRS DoD: Theme, Building, **building_themes (n-n)**, BuildingLevel, Vocabulary, Question (không có đáp án), QuestionVocabulary, Blueprint, Exam, ExamRequirement, ExamQuestion. Chấm thi vẫn là VS4 |
| Theme | Nhiều theme mỗi công trình, thêm bảng `building_themes`, sửa schema §5.1 |
| Seed | Tôi soạn, **chỉ House** (Level 1). Công trình khác hiện bảng "Chưa xây" |
| Phiên học | Phiên trên server (`learning_sessions` + `learning_session_items`): 10 từ / 20 câu |
| KP | Theo phiên: đúng × hệ số + thưởng mốc. Hệ số nằm trong cấu hình |
| Chống cày | N phiên đầu mỗi ngày nhận đủ KP, sau đó giảm. Mastery vẫn tăng bình thường |
| Gián đoạn | Phiên còn hiệu lực 30 phút. Quá hạn thì giữ mastery, mất KP cuối phiên |
| max_mastery | Theo độ khó: D=10, C=15, B=20, A=25, nằm trong cấu hình |
| Sưu tầm | Từ được tính "đã sưu tầm" khi **trả lời đúng 1 lần** (sửa ADR-005, ghi ADR mới) |
| Nguồn từ khi học | Level = level công trình + 1 (level 0 học từ Level 1), học được ở mọi công trình, có trộn từ ôn |
| Chọn từ | Ưu tiên từ chưa sưu tầm → mastery thấp, bỏ từ vừa ôn trong 10 phút, ngẫu nhiên trong nhóm. **Ghi chú tương lai: thay bằng thuật toán phức tạp hơn** (trọng số / Spaced Repetition) |
| Chấm FILL_BLANK | trim, gộp khoảng trắng, không phân biệt hoa/thường; `metadata.acceptedAnswers`. **Tương lai: AI chấm** |
| Phản hồi | Hiện ngay sau mỗi câu, lời lẽ tự nhiên do thư ký nói. **Tương lai: AI viết giải thích theo câu trả lời** |
| Thư ký | Chân dung 2D + hộp thoại chữ chạy + spotlight khoanh nút, overlay Compose |
| Bài kiểm tra trình độ | 30 câu từ 20 từ House Lv1, độ khó tăng dần. **Sau đó luôn học thêm 1 phiên** ở House rồi mới xây |
| Danh hiệu | Khung achievements (dễ/khó/ẩn) + danh hiệu tutorial và học. Đeo 1 danh hiệu lên HUD, có màn bộ sưu tập (danh hiệu ẩn hiện "???") |
| Top 10% | Cần ≥50 bài tutorial, nếu chưa đủ thì dùng ngưỡng cố định. Chỉ xét một lần lúc nộp |
| Vào công trình | Kết hợp: avatar đi bộ tới cửa + camera zoom + **House có nội thất 3D (nhà trống)**. Công trình khác dùng màn Compose |
| Sau tutorial | Chọn ngoại hình nhân vật (phối bộ phận low-poly) và kiểu nhà (tường, sàn). Mẫu có sẵn, mở dần bằng KP hoặc danh hiệu. Đồ nội thất để sau |
| Menu | **Nút menu nổi** trên bản đồ, có hiệu ứng khi tap, và loading screen phù hợp cho mỗi điểm đến |
| Xoay màn hình | Tự động / Dọc / Ngang (DataStore) |
| Thứ tự | Làm theo lớp, giao diện sau |

## Thiết kế VS2: gói nội dung theo Level
```text
App mở / quay lại foreground
  → GET /api/v1/content/manifest  (nhỏ: version core + version từng gói)
  → core đổi version?  → GET /api/v1/content/core
  → gói cần (level hiện tại + level kế của mỗi công trình) mới hoặc đổi version?
       → GET /api/v1/content/packs/{buildingCode}/{level}
  → Room @Upsert trong withTransaction, lưu version đã có vào bảng content_pack_state
```
- **core:** themes, buildings, building_themes, building_levels, blueprints, danh mục achievements, danh mục cosmetics.
- **pack (building, level):**
  - vocabularies thuộc các theme của công trình ở level đó;
  - questions **không có `answer`/`acceptedAnswers`**;
  - question_vocabularies;
  - exams + exam_requirements + exam_questions có target_level tương ứng.
- **DB:** bảng `content_packs(id, scope VARCHAR DEFAULT 'GLOBAL', building_id, level, version, updated_at)`. Sau này `scope` = mã lớp.
- **Seed House Level 1 (V003):**
  - 30 từ chủ đề Daily Life + House, mức TOEIC 450–750, có IPA, nghĩa, 1–2 ví dụ, độ khó D/C.
  - Khoảng 90 câu hỏi, mỗi từ có 3 câu:
    - MULT_CHOICE nhận nghĩa (READING);
    - FILL_BLANK có gợi ý (WRITING);
    - FILL_BLANK trong ngữ cảnh, có từ gần nghĩa làm nhiễu.
  - `explanation` viết giọng người thật.
  - 1 exam `EXAM_HOUSING_LV2` cùng requirement và blueprint để đủ phạm vi DoD; chấm thi thuộc VS4.
  - `building_levels` cho 4 công trình, level 1..3. HOUSING L1 tốn 100 KP và xây trong 10 giây (tutorial).
- **Mobile:**
  - Room v3 + `MIGRATION_2_3`, entity và DAO cho 11 bảng; TypeConverter cho `examples`; `metadata` lưu dạng String.
  - `ContentApi`, DTO, `data/mapper/*`, `ContentRepository`, `SyncContentUseCase`.
  - SCR-03 hiển thị tiến trình theo gói.
  - SCR-06 danh sách từ và SCR-07 flashcard (lật thẻ) đọc từ Room, dùng được offline.

## Thiết kế VS3: phiên học do server quản lý
**API:**
- `POST /api/v1/learning/sessions {buildingCode}`
  - Server chọn 10 từ và 20 câu, lưu phiên, trả `{sessionId, expiresAt, items[{itemId, vocabularyCard, question (không đáp án)}]}`.
  - Nếu đang có phiên ACTIVE chưa hết hạn ở công trình đó thì trả lại phiên cũ để làm tiếp.
- `GET /api/v1/learning/sessions/{id}`: lấy lại phiên.
- `POST /api/v1/learning/sessions/{id}/items/{itemId}/answer {answer}`
  - Trả `{isCorrect, correctAnswer, explanation, masteryAfter, maxMastery, collectedNow}`.
  - Mỗi item chỉ nộp được 1 lần; nộp lần nữa → 409.
  - Hết hạn → 410.
- `POST /api/v1/learning/sessions/{id}/complete`
  - Trả `{correct, total, kpAwarded, dailySessionIndex, collection{collected,total}, newAchievements[]}`.
  - Cộng KP vào `user_profiles` trong cùng `@Transactional`, dùng `@Version` (trả nợ FR-SYS-05).
- `GET /api/v1/users/me/vocab-progress?since=`: đồng bộ mastery và trạng thái sưu tầm về Room, để xem offline (ADR-004).

**Logic (gói `learning`, cấu hình qua `@ConfigurationProperties linguacity.balance.*`):**
- `MasteryEngine`: đúng +1, sai −1, kẹp trong `0..maxMastery(difficultyRank)`. Chỉ áp cho từ **TARGET** (giống quy tắc thi). VS4 dùng lại.
- `collected_at`: lần đầu trả lời đúng. `first_seen_at`: lần đầu được nộp. `last_reviewed_at`: mỗi lần nộp.
- `KP = correct × 5 + (tỉ lệ ≥ 80% ? 20 : 0)`.
- Phiên thứ > 5 trong ngày nhân hệ số 0.2. Ngày tính theo múi UTC+7 (cấu hình).
- Chọn từ:
  1. Nhóm 1: chưa sưu tầm, Level đang học.
  2. Nhóm 2: mastery thấp.
  3. Bỏ từ có `last_reviewed_at` trong 10 phút.
  4. Shuffle trong nhóm.
  5. Mỗi từ lấy 2 câu: 1 READING + 1 WRITING.
- Chấm: hàm `normalize()` và `acceptedAnswers`, có unit test.

**Mobile:**
- Room v4: `UserVocabProgressEntity`, `LearningApi`, `LearningRepository`, MVI cho SCR-08 (bài học) và SCR-09 (kết quả).
- Mất mạng giữa phiên: thông báo, giữ màn hình, cho Thử lại. Mở lại app trong 30 phút thì làm tiếp.

## Tutorial thư ký (thay Tutorial 3 bước hiện tại)
Nhân vật: **"Mai — thư ký thành phố"**, tên đề xuất, có thể đổi. Có 4 biểu cảm: chào, vui, động viên, ngạc nhiên. Tutorial lưu `tutorial_step` trên server để thoát app vẫn làm tiếp đúng bước. Không có nút bỏ qua.

| Bước | Người chơi thấy | Logic / server |
|---|---|---|
| T0 | Splash → onboarding → SCR-03 tải core + gói HOUSING:1 (loading có mẹo của Mai) | `POST onboard`, content sync |
| T1 | Thành phố trống: 4 lô đất cắm biển "Chưa xây". Mai xuất hiện, giới thiệu: "Học từ để xây thành phố" | step = INTRO |
| T2 | Bài kiểm tra trình độ: 30 câu từ 20 từ House L1, 3 nấc khó (10 trắc nghiệm nhận nghĩa → 10 điền từ có gợi ý → 10 điền trong ngữ cảnh có nhiễu). Mai phản hồi sau mỗi câu | Phiên `type=PLACEMENT`. Câu đúng thì mastery +1 và từ được sưu tầm |
| T3 | Kết quả: điểm x/30, số từ đã sưu tầm, danh hiệu nhận được, KP | KP = đúng × 3 + **quà chào mừng 100 KP** (đủ xây House Lv1). Xét danh hiệu |
| T4 | Mai spotlight lô House → avatar đi tới, camera zoom → bảng nhiệm vụ lô đất → "Học" | Bắt buộc 1 phiên học ở House, ưu tiên từ chưa sưu tầm |
| T5 | Học xong → về bảng → nút "Xây" sáng lên khi sưu tầm ≥ 20/30 và có ≥ 100 KP (chưa đủ thì Mai gợi ý học thêm một phiên) → giàn giáo 10 giây → House Lv1 | `POST /buildings/HOUSING/build` (lv0→1, kiểm tra điều kiện, trừ KP, hẹn giờ), `GET /city` thật |
| T6 | Mai mời vào nhà → avatar đi vào cửa, zoom → nội thất 3D nhà trống → chọn ngoại hình nhân vật → chọn tường và sàn | Lưu `avatar_config`, `house_style` |
| T7 | Tour chức năng: nút menu nổi (Thẻ từ, Danh hiệu, Hồ sơ, Cài đặt), HUD tài nguyên, đeo danh hiệu, cách học ở công trình khác khi mở | `POST /tutorial/complete` (đã có), step = DONE. Thưởng danh hiệu dễ "Cư dân mới" |

Hệ quả: T5 cần một phần nhỏ của VS5 (`user_buildings`, xây lv0→1, `GET /city` thật). Tôi chỉ làm đúng phần đó; nâng cấp Lv1→Lv2 cần thi (VS4) và chưa làm.

## Danh hiệu (đề xuất tên, người dùng sửa được)
| Mã | Loại | Điều kiện |
|---|---|---|
| NEW_RESIDENT "Cư dân mới" | Dễ | Hoàn thành tutorial |
| GOOD_START "Khởi đầu suôn sẻ" | Dễ | Bài trình độ đúng > 15 từ (khác nhau) |
| TOP_ENTRANT "Thủ khoa nhập học" | Khó | Điểm tutorial cao hơn 90% người chơi (≥50 mẫu), chưa đủ mẫu thì ≥ 27/30 |
| FLAWLESS "Hoàn hảo" | Ẩn | Đúng 30/30 bài trình độ |
| COLLECTOR "Nhà sưu tầm" | Dễ | Sưu tầm đủ một Level của một công trình |
| DILIGENT "Chăm chỉ" | Khó | Học 3 ngày liên tiếp |
| COMBO10 "Liên hoàn" | Ẩn | 10 câu đúng liên tiếp trong một phiên |

- Bảng `achievements` (code, tier, hidden, condition_type, threshold) và `user_achievements`; `user_profiles.equipped_achievement_code`.
- Server xét sau mỗi `complete`, trả về `newAchievements`.
- API: `GET /users/me/achievements`, `PUT /users/me/equipped-title`.
- Màn bộ sưu tập: danh hiệu ẩn chưa có thì hiện "???". Có hiệu ứng nhận danh hiệu.

## Tuỳ biến (cosmetics)
- **Nhân vật** dùng chung kiểu low-poly với người dân city-web: màu da, 4 kiểu tóc + màu tóc, màu áo, màu quần, phụ kiện (mũ, kính, không có). Có xem trước 3D xoay được. Miễn phí, đổi lại được trong Hồ sơ.
- **Nhà:** tường và sàn, mỗi loại có 2 mẫu miễn phí; các mẫu khác mở bằng KP hoặc danh hiệu. Áp dụng cho nội thất 3D và ngoại thất trên bản đồ.
- **Dữ liệu:**
  - Danh mục `cosmetic_items` (code, category, unlock_type FREE|KP|ACHIEVEMENT, price, achievement_code, asset_key) nằm trong core.
  - `user_cosmetics`.
  - `user_profiles.avatar_config` và `house_style` dạng JSONB.
- **API:** `GET /users/me/cosmetics`, `POST /cosmetics/{code}/unlock`, `PUT /users/me/avatar`, `PUT /users/me/house-style`.

## city-web (chỉ thêm trường tuỳ chọn, bridge vẫn v1 theo quy tắc ADR-011)
- State thêm `player.appearance` và `houseStyle`.
- Lệnh mới: `LinguaCity.enterBuilding(code)`. Avatar đi tới cửa, camera bay vào, rồi emit intent mới `BuildingEntered`. Có `exitBuilding()` để làm ngược lại.
- Cảnh `interior/house`: phòng trống low-poly, tường và sàn theo `houseStyle`, avatar đi lại; dùng `mergeColored` và bake như các builder hiện có.
- Chế độ `avatar-preview`: avatar xoay trên bệ, dùng cho màn chọn ngoại hình.
- Test bằng `tsc`, bảng debug và trình duyệt.

## Giao diện (mốc cuối)
- **Splash:**
  - `core-splashscreen` của Android 12 có logo động.
  - Sau đó Splash Compose (logo + bóng thành phố) trong lúc khởi tạo DataStore và kiểm tra onboarding.
- **Loading theo điểm đến:**
  - vào nhà: cửa mở và fade;
  - Thẻ từ: chồng thẻ xoè ra;
  - Danh hiệu: huy chương xoay;
  - Hồ sơ: avatar hiện dần.
  - Kèm mẹo của Mai. Chỉ hiện nếu tải lâu hơn khoảng 150 ms, tránh nháy.
- **Nút menu nổi:**
  - Tap thì nút xoay 45°, các mục bung theo cung tròn, cách nhau ~40 ms, kèm rung nhẹ.
  - Chọn một mục thì chuyển sang loading tương ứng.
  - Ẩn khi đang học hoặc trong tutorial, trừ bước T7.
- **Skeleton/shimmer** cho danh sách từ, bộ sưu tập danh hiệu, hồ sơ.
- **Shared element** (`SharedTransitionLayout`): thẻ từ trong danh sách → flashcard; biểu tượng công trình → tiêu đề màn công trình.
- **Progressive loading:** chữ lấy từ Room hiện trước, ảnh dùng placeholder mờ rồi mới nét.
- **Motion choreography:** phần tử fade + trượt lên lần lượt, cách nhau 40–60 ms.
- **Cài đặt:**
  - xoay màn hình (Tự động/Dọc/Ngang) qua `requestedOrientation`;
  - bật/tắt hiệu ứng chuyển động (tắt thì mọi animation rút ngắn);
  - xem lại tour hướng dẫn (chỉ T7).
- **HUD:** KP, Hourglass, Blueprint Shards, danh hiệu đang đeo.
- **Hồ sơ:** avatar, danh hiệu, số từ đã sưu tầm, chuỗi ngày học.

## Tiến độ (cập nhật 08/11/2026)
- ✅ M0–M6, M9, M10 xong (commit trên nhánh `feat/vs2-vs3-tutorial`; từ M6 Claude commit theo yêu cầu, không push).
- ⏭️ M7 (city-web: avatar, nội thất House 3D) và M8 (tuỳ biến) — người dùng làm ở nhánh khác.
- Bài học tổng kết: [vs2-vs3-tutorial-ui-lessons.md](../vs2-vs3-tutorial-ui-lessons.md).

## Các mốc (mỗi mốc chạy được, có test, có lời commit gợi ý)
| Mốc | Nội dung | Kiểm chứng |
|---|---|---|
| M0 | Đóng VS1: TC-VS1-13..17, ảnh minh chứng, nút Thử lại nếu thiếu, cập nhật docs §27 | backend test, E2E emulator + PostgreSQL |
| M1 | **Docs trước khi code** (xem mục Tài liệu). Người dùng duyệt | review |
| M2 | VS2 backend: V003 (schema + building_themes + content_packs + seed House), gói `content`, 3 endpoint, test | `./gradlew test`, curl với PostgreSQL thật |
| M3 | VS2 mobile: Room v3, sync, SCR-03/06/07 bản cơ bản, City đọc building_levels | unit test mapper/repo; bật chế độ máy bay vẫn xem được flashcard |
| M4 | VS3 backend: V004 (user_vocab_progress, learning_sessions/items, user_buildings, achievements, `@Version`, tutorial_step), MasteryEngine, chấm, KP, chống cày, hết hạn, danh hiệu, build lv0→1, GET /city | test: clamp, nộp 2 lần → 409, hết hạn → 410, KP giảm sau phiên 5, normalize, xét danh hiệu, percentile |
| M5 | VS3 mobile: SCR-08/09, đồng bộ progress, `CityRepositoryImpl` thật thay `FakeCityRepository`, màn danh hiệu cơ bản | emulator: học → mastery đổi trong Room; offline thì không học được |
| M6 | Tutorial: overlay thư ký (chân dung, chữ chạy, spotlight), state machine T0–T7, bài trình độ, thưởng, làm tiếp sau khi tắt app | E2E: xoá dữ liệu app → đi hết tutorial; tắt app giữa T2 thì mở lại đúng bước |
| M7 | city-web: avatar, enterBuilding/zoom, nội thất House 3D, avatar-preview + phía Kotlin | trình duyệt + emulator |
| M8 | Cosmetics: V005, API, màn chọn nhân vật và kiểu nhà, mở khoá bằng KP/danh hiệu | test unlock (thiếu KP → 4xx) |
| M9 | Giao diện: Splash, Loading, menu nổi, cài đặt, skeleton, shared element, progressive, choreography, HUD, Hồ sơ | emulator: dọc/ngang, tắt hiệu ứng |
| M10 | Chốt: test-plan TC-VS2/VS3/TUT, screen-catalog, bài học `docs/05-implementation/*.md`, lời commit | — |

## Tài liệu (M1, cập nhật tiếp ở từng mốc)
- `use-cases.md`:
  - đặc tả UC_03 Sync, UC_04 Flashcard, UC_05 Learning Session;
  - viết lại UC_02 Tutorial theo T0–T7;
  - thêm UC cho danh hiệu và tuỳ biến.
- `requirements-catalog.md`: FR-LEARN-01..05, thêm FR-TUT, FR-ACH, FR-COS, FR-UI (splash, loading, menu, xoay).
- `system-design.md`:
  - §5.1: bảng mới, `building_themes`, `content_packs`, `learning_sessions`, `achievements`, `cosmetics`, `user_buildings`;
  - §7.2: các endpoint mới; §4: sequence sync và phiên học;
  - §3.3: max_mastery theo độ khó;
  - §8.2 traceability.
- ADR mới:
  - ADR-012: gói nội dung theo Level + pull, hướng FCM/lớp học sau này.
  - ADR-013: phiên học trên server; sưu tầm = đúng 1 lần (sửa ADR-005); chống cày.
  - ADR-014: tutorial thư ký + bài kiểm tra trình độ.
- `gdd.md`: chốt các số balance kể trên. Business rules BR-CONTENT, BR-LEARN, BR-TUT, BR-ACH.
- `future-expansion.md`, ghi chú theo yêu cầu người dùng:
  1. thuật toán chọn từ phức tạp (trọng số / Spaced Repetition);
  2. AI chấm FILL_BLANK;
  3. AI viết phản hồi và giải thích;
  4. lớp học / giáo viên / AI tạo nội dung + FCM push (+ WebSocket nếu cần chat);
  5. nội thất 3D cho các công trình khác + đồ nội thất;
  6. seed cho Road, Park, School.

## Kiểm chứng tổng
- Mỗi mốc: backend `./gradlew test`, mobile `./gradlew testDebugUnitTest assembleDebug`, city-web `npm run typecheck && npm run build`, tất cả xanh.
- E2E trên emulator Pixel_5 với PostgreSQL và backend thật. Ghi kết quả thật (Đạt / Không đạt / Chưa kiểm) vào test-plan kèm ảnh. Không đánh Verified khi còn TC chưa đạt.
- Cuối mỗi mốc: `git status` chỉ có thay đổi chưa commit, kèm lời commit gợi ý.
