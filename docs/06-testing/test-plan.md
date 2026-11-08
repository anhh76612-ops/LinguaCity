# LINGUACITY — KẾ HOẠCH & KẾT QUẢ KIỂM THỬ

**Tương ứng báo cáo:** Chương 6.2 — Kiểm thử
**Quy tắc:** Mỗi Slice thêm một mục test. Một Slice chỉ được đánh dấu **VERIFIED** khi mọi test case của nó có kết quả.

---

## 1. CHIẾN LƯỢC KIỂM THỬ

| Mức | Công cụ | Phạm vi | Ghi chú |
| :--- | :--- | :--- | :--- |
| Unit test Backend | JUnit 5 + Mockito | Service (logic nghiệp vụ) | Chạy `.\backend\gradlew.bat -p backend test` |
| Integration test Backend | Spring Boot Test + MockMvc + H2 | Controller → Service → JPA | H2 trong bộ nhớ, **không** thay thế test PostgreSQL thật |
| API thủ công | Postman / `Invoke-RestMethod` | Hợp đồng API | Lưu collection vào `06-testing/postman/` ⬜ |
| Unit test Android | JUnit + ⬜ (MockK / Turbine) | UseCase, ViewModel | ⬜ Chưa có test Android |
| Kiểm thử thủ công E2E | Emulator + PostgreSQL local | Toàn luồng | Chụp màn hình làm minh chứng (Hình 6.x) |
| Unity | ⬜ Unity Test Framework | CityBridge parse JSON | Từ TS-UNITY |

**Mẫu test case** (giống báo cáo mẫu):

| Mã | Mô tả | Tiền điều kiện | Bước thực hiện | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Loại | Trạng thái |

---

## 2. VS1 — GUEST ONBOARDING (UC_01)

| Mã | Mô tả | Tiền điều kiện | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Loại | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC-VS1-01 | Tạo Guest mới với tài nguyên 0 | UUID chưa tồn tại | UUID mới | Tạo `UserProfile`, 3 tài nguyên = 0 | Đạt | Unit (`createsNewGuestWithZeroResources`) | ✅ |
| TC-VS1-02 | Guest cũ giữ tài nguyên, không lưu lại | UUID đã có (42/3/7) | UUID cũ | Trả hồ sơ cũ, không gọi `save` | Đạt | Unit (`existingGuestKeepsResourcesAndIsNotSavedAgain`) | ✅ |
| TC-VS1-03 | Hợp đồng JSON của API onboard | Backend chạy (H2) | UUID hợp lệ | 200, đủ trường `id, knowledgePoints, hourglassCount, blueprintShards` | Đạt | Integration (`onboardEndpointPreservesResponseContract`) | ✅ |
| TC-VS1-04 | Thiếu header `X-Guest-UUID` | | Không có header | 400 | Đạt | Integration (`missingGuestHeaderIsRejected`) | ✅ |
| TC-VS1-05 | UUID sai định dạng | | `not-a-uuid` | 400 | Đạt | Integration (`malformedGuestUuidIsRejected`) | ✅ |
| TC-VS1-06 | Room lưu hồ sơ sau khi gọi API | App + Backend chạy | Mở app lần đầu | Có bản ghi `UserProfileEntity` | Đạt (08/11/2026): Room `user_profiles` có 1 bản ghi với UUID của Guest, đọc trực tiếp file DB qua `adb run-as` | Thủ công | ✅ |
| TC-VS1-07 | Mở lại app giữ cùng UUID | Đã onboard | Tắt/mở app | Cùng UUID, không tạo trùng | Đạt (08/11/2026): sau khi tắt/mở và cài bản mới đè lên, UUID `23261bb5…` giữ nguyên, PostgreSQL không có bản ghi trùng | Thủ công | ✅ |
| TC-VS1-08 | Backend không chạy | Tắt Backend | Mở app | Màn hình lỗi, không crash | Đạt (08/11/2026): hiện "Không thể khởi tạo người chơi." + nút Thử lại, không crash (Hình 6.4) | Thủ công | ✅ |

## 3. VS1 — COMPLETE TUTORIAL (UC_02) ✅

Test tự động: `backend/src/test/java/com/linguacity/backend/identity/TutorialTests.java` (7 test, chạy 24/10/2026: 13/13 test Backend đạt).


| Mã | Mô tả | Tiền điều kiện | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Loại | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC-VS1-09 | Hoàn thành tutorial | UUID đã onboard | UUID | 200 `{ tutorialCompleted: true }`, DB = true | Đạt | Unit (`completesTutorialForExistingGuest`) + Integration (`completeEndpointReturnsTutorialCompleted`) | ✅ |
| TC-VS1-10 | UUID chưa onboard | | UUID mới | 404 + `{ message: "User profile not found" }` | Đạt | Unit (`unknownGuestIsReportedAsNotFound`) + Integration (`completeEndpointReturns404WithErrorBodyForUnknownGuest`) | ✅ |
| TC-VS1-11 | Gọi 2 lần (idempotent) | Đã hoàn thành | UUID | Vẫn true, **không** ghi DB lần 2 | Đạt | Unit (`completingTwiceIsIdempotentAndDoesNotSaveAgain`) | ✅ |
| TC-VS1-12 | Thiếu / sai header | | Không header / `not-a-uuid` | 400 + `{ message: "Missing header X-Guest-UUID" }` / `"Invalid X-Guest-UUID"` | Đạt | Integration (`missingGuestHeaderReturns400WithErrorBody`, `malformedGuestUuidReturns400WithErrorBody`) | ✅ |
| TC-VS1-13 | Cột `tutorial_completed` có trong PostgreSQL thật | Chạy `V002__add_tutorial_completed.sql` | | Cột tồn tại, `NOT NULL DEFAULT false` | Đạt (08/11/2026): trước khi chạy V002 cột chưa có; chạy V002 → `boolean NOT NULL DEFAULT false`, 2 hồ sơ cũ nhận `false` | Thủ công (`psql` + `information_schema`) | ✅ |
| TC-VS1-14 | Room nâng cấp v1 → v2 không mất dữ liệu | App cũ (v1) đã cài, đã onboard | Cài APK mới đè lên | App mở bình thường, hồ sơ cũ còn, `tutorialCompleted = false` | Đạt (08/11/2026): APK v1 build từ commit `cdbdcdc`; sau khi cài đè `PRAGMA user_version` 1 → 2, hồ sơ giữ nguyên UUID, `tutorialCompleted = 0`, app mở vào Tutorial (Hình 6.1) | Thủ công | ✅ |
| TC-VS1-15 | Luồng màn hình lần đầu | Xóa dữ liệu app | Mở app | Onboarding → Tutorial (3 bước) → Home | Đạt (08/11/2026): Tutorial 1/3 → 3/3 → "Bắt đầu" → City; PostgreSQL `tutorial_completed = true` (Hình 6.2) | Thủ công E2E | ✅ |
| TC-VS1-16 | Luồng màn hình lần sau | Đã hoàn thành tutorial | Tắt/mở app | Onboarding → Home (bỏ qua Tutorial) | Đạt (08/11/2026): mở thẳng City (Hình 6.3) | Thủ công E2E | ✅ |
| TC-VS1-17 | Nút Thử lại | Tắt Backend | Mở app → bật Backend → bấm Thử lại | Vào được màn hình tiếp theo | Đạt (08/11/2026): lỗi kết nối + Thử lại (Hình 6.4); bật Backend, bấm Thử lại → Tutorial 1/3 (Hình 6.5) | Thủ công E2E | ✅ |

## 4. VS2 — STATIC CONTENT (UC_03, UC_04) ✅

Test tự động backend: `backend/src/test/java/com/linguacity/backend/content/ContentApiTests.java` (6 test, H2). Chạy 08/11/2026: 19/19 test backend đạt.

| Mã | Mô tả | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Loại | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC-VS2-01 | Manifest liệt kê CORE + HOUSING:1 | `GET /content/manifest` | 200, có version từng gói | Đạt; PostgreSQL thật: `CORE v1`, `HOUSING:1 v1` | Integration (`manifestListsEveryPackWithItsVersion`) + curl | ✅ |
| TC-VS2-02 | CORE đủ bảng | `GET /content/core` | themes, buildings (themeCodes n-n), buildingLevels, blueprints, achievements, cosmetics | Đạt; PostgreSQL: 4 công trình, HOUSING = [DAILY_LIFE, HOUSE], 12 building_levels, 8 blueprints. achievements/cosmetics rỗng cho tới V004/V005 | Integration (`coreContainsWorldDataWithManyThemesPerBuilding`) + curl | ✅ |
| TC-VS2-03 | Gói HOUSING:1 | `GET /content/packs/HOUSING/1` | 30 từ, câu hỏi, exam `EXAM_HOUSING_LV2` | Đạt; PostgreSQL: 30 từ, 90 câu, 90 liên kết, 1 exam (yêu cầu 30 thẻ / 200 KP), 39 KB, 0,16 s | Integration (`packContainsOnlyThisBuildingAndLevel`) + curl | ✅ |
| TC-VS2-04 | Gói không có đáp án | Gói HOUSING:1 | JSON không chứa `answer`, `acceptedAnswers`, `explanation` | Đạt (H2 + PostgreSQL) | Integration (`packNeverLeaksAnswers`) | ✅ |
| TC-VS2-05 | Gói không tồn tại | `/content/packs/ROAD/1` | 404 `PACK_NOT_FOUND` | Đạt | Integration (`unknownPackIs404WithCode`) | ✅ |
| TC-VS2-06 | Thiếu header | Không `X-Guest-UUID` | 400 | Đạt: 400 `MISSING_HEADER`; UUID sai → 400 | Integration (`headerIsRequired`) | ✅ |
| TC-VS2-07 | Room lưu gói, không trùng | Sync 2 lần | Số dòng không đổi, `content_pack_state.version` đúng | Đạt (08/11/2026): mở lại app → vẫn 30 từ / 90 câu / 90 liên kết; `CORE v1`, `HOUSING:1 v1`. Unit: `PackSelectorTest` (4), `ContentMapperTest` (4) | Unit + E2E (đọc file Room qua `adb run-as`) | ✅ |
| TC-VS2-08 | Gói đổi version | Tăng version trên DB | App tải lại đúng gói đó | Đạt: đặt `HOUSING:1` version 2 trên PostgreSQL → đưa app ra nền rồi mở lại → log `Đã tải gói mới: [HOUSING:1]`, Room ghi version 2, vẫn 30 từ (không trùng) | E2E | ✅ |
| TC-VS2-09 | Đọc offline | Chế độ máy bay | Danh sách từ + flashcard hiện đủ | Đạt: bật chế độ máy bay → app vẫn vào City (hồ sơ cache), danh sách 30 từ và flashcard 5/30 hiện đủ (Hình 6.6, 6.7) | E2E | ✅ |
| TC-VS2-10 | Lần đầu không mạng | Xoá dữ liệu, tắt mạng | Báo cần mạng + Thử lại | Đạt: chặn ngay ở SCR-01 (onboarding cũng cần mạng) với câu "Lần đầu vào game cần kết nối mạng…" (Hình 6.8); bật mạng, bấm Thử lại → SCR-03 tải CORE + HOUSING:1 → Tutorial | E2E | ✅ |
| TC-VS2-11 | Seed V003 chạy trên PostgreSQL thật | `psql -f V003…` | Không lỗi; đếm dòng đúng | Đạt: 7 themes, 4 buildings, 7 building_themes, 12 building_levels, 8 blueprints, 30 từ, 90 câu, 1 exam / 10 câu, 2 packs | Thủ công | ✅ |

## 5. VS3 — LEARNING SESSION (UC_05) ✅

Test tự động backend (08/11/2026): 42/42 đạt — `LearningEngineTests` (5), `LearningFlowTests` (15, H2 + đồng hồ giả), `AchievementServiceTests` (3). E2E trên PostgreSQL thật: onboard → bài trình độ → học ở House → xây → `GET /city` (script `e2e_m4.py`).

| Mã | Mô tả | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Loại | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC-VS3-01 | Tạo phiên | `POST /learning/sessions {HOUSING}` | 201, 20 câu (10 READING rồi 10 WRITING), không đáp án | Đạt: 201, 20 câu, câu 1–10 READING, 11–20 WRITING, 10 từ khác nhau, JSON không có answer/explanation/acceptedAnswers. PostgreSQL thật: 20 câu R×10 + W×10 | Integration (`LearningFlowTests`.sessionHasTwentyItems…) + E2E | ✅ |
| TC-VS3-02 | Làm tiếp phiên ACTIVE | Gọi tạo lần 2 | 200, cùng `sessionId` | Đạt: gọi lần 2 trả 200 cùng `sessionId` | Integration (`LearningFlowTests`) | ✅ |
| TC-VS3-03 | Chấm đúng/sai + Mastery | Đáp án đúng rồi sai | +1 / −1, kẹp 0..max theo độ khó | Đạt: sai → 0 (kẹp), đúng → 1; trần 10/15 theo độ khó D/C | Unit (`LearningEngineTests`) + Integration | ✅ |
| TC-VS3-04 | Chuẩn hoá điền từ | `"  Rent "`, `"RENT"`, `"rents"` | đúng, đúng, sai | Đạt | Unit (`gradingIgnoresCaseAndExtraSpacesButNotSpelling`) | ✅ |
| TC-VS3-05 | `accepted_answers` | Đáp án phụ | Đúng | Đạt: `neighbour` cho đáp án `neighbor` | Unit (`acceptedAnswersAreAlsoCorrect`) | ✅ |
| TC-VS3-06 | Nộp lại một câu | Nộp câu 1 hai lần | 409 `ALREADY_ANSWERED` | Đạt: 409 `ALREADY_ANSWERED` | Integration (`LearningFlowTests`) | ✅ |
| TC-VS3-07 | Phiên hết hạn | Giờ server > `expires_at` | 410; Mastery câu đã nộp giữ nguyên; không KP | Đạt: tua đồng hồ 31 phút → 410 `SESSION_EXPIRED`, phiên `EXPIRED`, Mastery câu đã nộp còn, KP = 0, mở phiên mới được | Integration (`LearningFlowTests`.expiredSession…) | ✅ |
| TC-VS3-08 | Sưu tầm = đúng lần đầu | Sai rồi đúng | `collected_at` ghi ở lần đúng, `collectedNow = true` một lần | Đạt: sai → `collectedNow=false`; đúng (câu WRITING cùng từ, có khoảng trắng + viết hoa) → `collectedNow=true` | Integration (`LearningFlowTests`) | ✅ |
| TC-VS3-09 | KP cuối phiên | 17/20 | 85 + 20 = 105 | Đạt: 85 + 20 = 105, hồ sơ KP = 105. PostgreSQL: 20/20 → 100 + 20 = 120 | Integration (`LearningFlowTests`) + E2E | ✅ |
| TC-VS3-10 | Giảm KP theo ngày | Phiên thứ 6 trong ngày | × 0.2 | Đạt: 5 phiên đầu 120 KP, phiên 6 = 24 (×0.2) | Integration (`LearningFlowTests`.sixthSession…) | ✅ |
| TC-VS3-11 | `complete` khi còn câu | 19/20 câu | 409 `INCOMPLETE` | Đạt: 409 `INCOMPLETE` | Integration (`LearningFlowTests`) | ✅ |
| TC-VS3-12 | `complete` idempotent | Gọi 2 lần | Kết quả như nhau, KP chỉ cộng 1 lần | Đạt: gọi lại trả cùng `kpAwarded`, KP hồ sơ không đổi; nộp tiếp → 409 `SESSION_CLOSED` | Integration (`LearningFlowTests`) | ✅ |
| TC-VS3-13 | Chọn từ ưu tiên | Có từ chưa sưu tầm và từ đã sưu tầm | Từ chưa sưu tầm được chọn trước; từ vừa ôn < 10 phút bị bỏ | Đạt; PostgreSQL: sau bài trình độ (20 từ đã sưu tầm) phiên học chọn đúng 10 từ còn lại | Unit (`selectorPrefersUncollected…`) + E2E | ✅ |
| TC-VS3-14 | Optimistic Locking | Hai `complete` song song | Không mất KP / không cộng đôi | Đạt: bản phiên cũ (version cũ) ghi đè sau khi đã complete → `ObjectOptimisticLockingFailureException` (API trả 409 `CONCURRENT_UPDATE`) | Integration (`LearningFlowTests`.staleSession…) | ✅ |
| TC-VS3-15 | Xem mastery offline | Học xong → máy bay | Danh sách từ hiện ✓ và Mastery | Đạt (08/11/2026): bật chế độ máy bay, mở lại app → danh sách House Lv1 "Đã sưu tầm 13/30", dấu ✅ và Mastery 2/10 (Hình 6.10) | E2E | ✅ |
| TC-VS3-16 | Mất mạng giữa bài | Tắt mạng câu 5 → bật → Thử lại | Làm tiếp câu 5 | Đạt: tắt mạng ở câu 5 → "Mất kết nối… câu bạn đang làm vẫn được giữ" (Hình 6.9); bật mạng, bấm Thử lại → server chấm đúng câu 5, hiện phản hồi. Thoát giữa bài rồi bấm Học lại → tiếp tục đúng câu 5/20 (TC-VS3-02 phía app) | E2E | ✅ |

## 6. TUTORIAL THƯ KÝ, DANH HIỆU, TUỲ BIẾN 🟡 (backend phần lớn ✅)

| Mã | Mô tả | Kết quả mong đợi | Kết quả thực tế | Loại | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC-TUT-01 | Chuyển bước hợp lệ / sai | `INTRO→PLACEMENT` 200; `INTRO→TOUR` 409 | Đạt: `INTRO→TOUR` 409 `INVALID_STEP` (kèm `details.current`), `INTRO→PLACEMENT` 200, gọi lại 200 | Integration (`LearningFlowTests`) | ✅ |
| TC-TUT-02 | Phiên PLACEMENT | 30 câu, tier 1→2→3, từ 20 từ House Lv1 | Đạt: 30 câu, tier 1 (1–10) → 2 (11–20) → 3 (21–30), 20 từ khác nhau; gọi khi chưa tới bước → 409 | Integration (`LearningFlowTests`) + E2E | ✅ |
| TC-TUT-03 | KP placement | đúng×3 + 100; bước → `LEARN_HOUSE` | Đạt: 30/30 → 190 KP; PostgreSQL 24/30 → 172 KP; bước → `LEARN_HOUSE` | Integration (`LearningFlowTests`) + E2E | ✅ |
| TC-TUT-04 | Học xong ở House | bước → `BUILD_HOUSE` | Đạt | Integration (`LearningFlowTests`) + E2E | ✅ |
| TC-TUT-05 | Xây khi thiếu điều kiện | 409 `REQUIREMENTS_NOT_MET` kèm số thiếu | Đạt: `details.missingCollected = 20`, `missingKnowledge = 100` | Integration (`LearningFlowTests`) | ✅ |
| TC-TUT-06 | Xây đủ điều kiện | Trừ 100 KP, UPGRADING 10 s; `GET /city` sau 10 s → Lv1, bước → `ENTER_HOUSE` | Đạt: KP 150 → 50, UPGRADING; gọi xây lại → `BUSY`; +11 s → Lv1 IDLE, bước `ENTER_HOUSE`; xây tiếp → `ALREADY_BUILT`. PostgreSQL thật cũng đạt | Integration (`LearningFlowTests`) + E2E | ✅ |
| TC-TUT-07 | `tutorial/complete` sai bước | 409; ở `TOUR` → `DONE` + `NEW_RESIDENT` | Đạt (M6, 08/11/2026): bước `BUILD_HOUSE` → 409 `INVALID_STEP` + `details.current`, không ghi DB; ở `TOUR` → `DONE` + `NEW_RESIDENT` | Unit (`completingBeforeTheTourStepIsRejected`) + Integration | ✅ |
| TC-TUT-08 | Làm tiếp sau khi tắt app | Tắt giữa bài PLACEMENT → mở lại đúng câu | Đạt: làm 12/30 câu bài trình độ rồi `force-stop` app → mở lại, Mai nói "Bài kiểm tra trình độ vẫn đang chờ bạn đó…" + nút Làm tiếp → vào đúng câu 13/30, ✅ 12 (Hình 6.12) | E2E | ✅ |
| TC-TUT-09 | Toàn bộ tutorial | Xoá dữ liệu → đi hết T0–T7 | Đạt: xoá dữ liệu → Mai chào 3 câu → bài trình độ 30/30 (190 KP; GOOD_START, FLAWLESS, TOP_ENTRANT, COMBO10) → Mai khoanh nút Học → bài 18/20 (+110 KP) → khoanh nút Xây → chờ 10 s → nhà Lv1 → Vào nhà → (CUSTOMIZE giữ chỗ cho M8) → tour 4 câu khoanh KP / Danh hiệu / Thẻ từ → Bắt đầu chơi → Mai biến mất, KP 200 (Hình 4.14–4.17, 6.13, 6.14) | E2E | ✅ |
| TC-ACH-01 | GOOD_START | 16 từ đúng → có; 15 → không | Đạt: 15 từ → không, 16 từ → có | Integration (`LearningFlowTests`.goodStart…) | ✅ |
| TC-ACH-02 | TOP_ENTRANT | < 50 mẫu: 27/30 có, 26/30 không; ≥ 50 mẫu: so phần trăm | Đạt: < 50 mẫu: 27 có / 26 không; ≥ 50 mẫu (45 bài 20/30 + 5 bài 29/30): 25 có, 20 không | Unit (`AchievementServiceTests`) + Integration | ✅ |
| TC-ACH-03 | FLAWLESS / COMBO10 | 30/30; chuỗi 10 câu đúng | Đạt: 30/30 → FLAWLESS + COMBO10 (+ GOOD_START, TOP_ENTRANT) | Integration (`LearningFlowTests`) | ✅ |
| TC-ACH-04 | Đeo danh hiệu | Chưa có → 409; có → HUD hiển thị | Đạt (phần server): chưa có → 409 `NOT_EARNED`; có → `equippedTitle`; `null` → tháo. HUD ở M9 | Integration (`LearningFlowTests`) | ✅ |
| TC-COS-01 | Đổi ngoại hình | Mã sai category → 400; đúng → lưu | | Integration | ⬜ |
| TC-COS-02 | Mở mẫu tường bằng KP | Thiếu KP → 409; đủ → trừ KP, mở | | Integration | ⬜ |
| TC-UI-01 | Xoay màn hình | Dọc / Ngang / Tự động có hiệu lực ngay và giữ sau khi mở lại | Đạt (08/11/2026): chọn Ngang → `requestedOrientation=USER_LANDSCAPE`, cửa sổ `ROTATION_90`, City 2340×1080 (Hình 4.22); Dọc / Tự động trở lại; lưu trong DataStore `linguacity_settings` | E2E | ✅ |
| TC-UI-02 | Tắt hiệu ứng | Chuyển cảnh không còn animation dài | Đạt: bật "Giảm hiệu ứng chuyển động" → câu của Mai hiện đủ ngay (không còn chữ chạy, không có nút "Bỏ qua chữ"); mọi animation dùng `LocalReduceMotion` (thời lượng 0). Chưa đo bằng công cụ trên máy thật | E2E + đọc code | ✅ |

---

## 7. MINH CHỨNG
Ảnh chụp lưu tại `diagrams/images/test/` với tên `6.x-<ma-test>.png` để khớp số Hình trong báo cáo.

| Hình | File | Test case |
| :--- | :--- | :--- |
| 6.1 | `6.1-tc-vs1-14.png` | TC-VS1-14: app mở vào Tutorial sau khi nâng Room v1 → v2 |
| 6.2 | `6.2-tc-vs1-15.png` | TC-VS1-15: City sau khi hoàn thành Tutorial |
| 6.3 | `6.3-tc-vs1-16.png` | TC-VS1-16: mở lại app vào thẳng City |
| 6.4 | `6.4-tc-vs1-17-loi.png` | TC-VS1-08, TC-VS1-17: Backend tắt |
| 6.5 | `6.5-tc-vs1-17-thu-lai.png` | TC-VS1-17: sau khi bấm Thử lại |
| 6.6 | `6.6-tc-vs2-09-offline-flashcard.png` | TC-VS2-09: flashcard khi bật chế độ máy bay |
| 6.7 | `6.7-tc-vs2-09-offline-list.png` | TC-VS2-09: danh sách từ khi offline |
| 6.8 | `6.8-tc-vs2-10-first-run-offline.png` | TC-VS2-10: lần đầu mở app không có mạng |
| 6.9 | `6.9-tc-vs3-16-offline-mid-lesson.png` | TC-VS3-16: mất mạng giữa bài |
| 6.10 | `6.10-tc-vs3-15-offline-progress.png` | TC-VS3-15: tiến độ sưu tầm khi offline |
| 6.11 | `6.11-tc-tut-05-build-not-met.png` | TC-TUT-05 phía app: "Cần sưu tầm thêm 10 từ để xây nhé." |
| 6.12 | `6.12-tc-tut-08-resume.png` | TC-TUT-08: mở lại app giữa bài trình độ |
| 6.13 | `6.13-tc-tut-09-placement-result.png` | TC-TUT-09: kết quả bài trình độ 30/30 |
| 6.14 | `6.14-tc-tut-09-done.png` | TC-TUT-09: xong tutorial |
| 6.15 | `6.15-tc-ui-replay-tour.png` | Xem lại hướng dẫn từ Cài đặt (tour chạy lại, nút "Đã hiểu") |

**E2E app VS3 (08/11/2026, emulator + PostgreSQL thật):** Room v3 → v4 (AutoMigration) giữ nguyên dữ liệu; City dùng dữ liệu thật (4 lô Lv0); bài 20 câu: câu 1 chọn sai → đỏ/xanh + đáp án + giải thích + Mastery 0/10; kết quả 17/20 → 105 KP (85 + 20), sưu tầm 10/30, danh hiệu "Liên hoàn" (Hình 4.10, 4.11); bấm Xây khi mới 10/20 từ → "Cần sưu tầm thêm 10 từ để xây nhé."; danh hiệu: 2/7, đeo "Cư dân mới" → HUD hiện tên (Hình 4.12).

**E2E giao diện M9 (08/11/2026):** splash hệ thống (ngôi nhà vector) → Splash Compose khi onboarding → loading "Mai đang dựng thành phố" cho tới khi bản đồ vẽ xong; HUD 💡/⏳/🧩 + danh hiệu; menu nổi bung 4 mục theo cung (Hình 4.19) và mở đúng Thẻ từ, Danh hiệu, Hồ sơ (Hình 4.20), Cài đặt (Hình 4.21); chạm thẻ "rent" → flashcard 1/30 (shared element); xem lại tour từ Cài đặt chạy 4 câu rồi tắt. Skeleton/loading theo điểm đến chỉ hiện khi dữ liệu về chậm hơn 150 ms — với Room trên emulator gần như không thấy, đúng chủ đích.

**Ghi nhận khi nghiệm thu (chưa phải lỗi chặn):**
- Màn lỗi hiện nguyên văn lỗi kỹ thuật (`failed to connect to /10.0.2.2 …`). Nên thay bằng câu dễ hiểu ở mốc giao diện.
- Trên emulator, bản đồ City mất khoảng 10–15 giây để vẽ khung hình đầu. Cần màn Loading (mốc giao diện) và đo lại trên máy thật (ADR-010).
- Cột `tutorial_completed` chưa có trên PostgreSQL dev: migration viết tay phải chạy thủ công (troubleshooting #9). Từ VS2 đặt `ddl-auto=none` (troubleshooting #10).
