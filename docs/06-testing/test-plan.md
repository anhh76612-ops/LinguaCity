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
=======
| TC-CITY-01 | `enterBuilding('HOUSING')` (Housing Lv ≥ 1) | Avatar đi tới cửa, camera phóng to, màn mờ, cảnh nội thất 3D; phát `BuildingEntered` | Đạt (trình duyệt, 08/11): hoạt cảnh đúng thứ tự, intent `BuildingEntered:HOUSING` | Thủ công (city-web) | ✅ |
| TC-CITY-02 | Trong nhà: chạm sàn, đổi `houseStyle` | Avatar đi tới điểm chạm (kẹp trong phòng); tường/sàn đổi ngay | Đạt: sàn `checker` + tường `#cfe7d6` dựng lại tức thì, avatar đổi ngoại hình tại chỗ | Thủ công (city-web) | ✅ |
| TC-CITY-03 | `exitBuilding()` | Ra cửa, camera về đúng chỗ cũ; phát `BuildingExited` | Đạt: `BuildingExited:HOUSING`; gọi lại khi đã ở ngoài → `false` | Thủ công (city-web) | ✅ |
| TC-CITY-04 | Lệnh sai / chồng lệnh | Mã lạ hoặc đang có hoạt cảnh → trả `false`, không đổi cảnh | Đạt: `enterBuilding('CASTLE')` → `false` | Thủ công (city-web) | ✅ |
| TC-CITY-05 | `?mode=avatar-preview` | Avatar trên bệ xoay, đổi ngoại hình qua `setState({player})` | Đạt: mũ + tóc búi + màu mới hiện đúng, kéo ngang xoay được | Thủ công (city-web) | ✅ |
| TC-CITY-06 | Hợp đồng JSON Kotlin ⇄ bản đồ (M7) | `player`, `houseStyle` đúng tên trường; `focus` không nằm trong state; đọc `BuildingEntered/Exited`, bỏ mã lạ | Đạt: `CityBridgeJsonTest` (7 test) | Unit | ✅ |
| TC-CITY-07 | Vào/ra nhà trên emulator | Thẻ Housing → "Vào nhà" → bảng trong nhà; "Ra ngoài" / phím Back → về phố | | E2E (emulator) | ⬜ |
| TC-COS-01 | Đổi ngoại hình | Mã sai category → 400; đúng → lưu | Đạt: mặc định `SKIN_2`/`WALL_CREAM`; sai nhóm → 400 `WRONG_CATEGORY`, mã lạ → `UNKNOWN`, thiếu trường → 400 (không lưu gì); hợp lệ → lưu và `GET /users/me` trả cùng cấu hình | Integration (`CosmeticFlowTests`) | ✅ |
| TC-COS-02 | Mở mẫu tường bằng KP | Thiếu KP → 409; đủ → trừ KP, mở | Đạt: dùng khi chưa mở → 400 `LOCKED`; 50 KP mua WALL_SKY (60) → 409 `INSUFFICIENT_KP`, `missingKnowledge = 10`; 100 KP → còn 40, mở; mua lại → 409 `ALREADY_UNLOCKED`; sau đó lưu được | Integration (`CosmeticFlowTests`) | ✅ |
| TC-COS-03 | Món FREE / ACHIEVEMENT không bán; mã lạ | 409 `NOT_PURCHASABLE`; 404; KP không đổi | Đạt | Integration (`CosmeticFlowTests`) | ✅ |
| TC-COS-04 | Món ACHIEVEMENT | Chưa có danh hiệu → khoá; có `GOOD_START` → WALL_BRICK dùng được, không trừ KP | Đạt | Integration (`CosmeticFlowTests`) | ✅ |
| TC-COS-05 | Danh mục trong CORE + dịch sang giá trị vẽ | `cosmetics[]` có `priceKp`, `assetKey`; app dịch mã → asset_key, mã lạ → mặc định | Đạt: `CosmeticFlowTests.catalogInCore`, `LookResolverTest` (6 test) | Integration + Unit | ✅ |
| TC-COS-06 | V005 trên PostgreSQL thật | Migration chạy sạch; CORE version +1; curl 4 endpoint | Đạt (08/11/2026, PostgreSQL 17): migration chạy sạch (`CREATE TABLE`, `INSERT 0 39`, `UPDATE 1` cho CORE version, `CREATE TABLE`, `COMMIT`); `cosmetic_items` đủ 8 nhóm / 39 món (ACCESSORY 3, FLOOR 5, HAIR_COLOR 6, HAIR_STYLE 4, PANTS_COLOR 4, SHIRT_COLOR 6, SKIN 5, WALL 6). Manifest `CORE v3`; `GET /content/core` có 39 món (FREE/KP/ACHIEVEMENT, WALL_SKY 60 KP `#cfe0f0`, FLOOR_CARPET ← `COLLECTOR`). curl với khách mới (0 KP): `GET /users/me/cosmetics` 200, 32 món mở + cấu hình mặc định; `PUT /users/me/avatar` hợp lệ 200, `hairStyle: HAIR_BROWN` → 400 `INVALID_COSMETIC` `WRONG_CATEGORY`; `PUT /users/me/house-style` WALL_MINT/FLOOR_TILE 200, WALL_SKY → 400 `LOCKED`; `POST /cosmetics/WALL_SKY/unlock` → 409 `INSUFFICIENT_KP` (`missingKnowledge 60`), WALL_CREAM → 409 `NOT_PURCHASABLE`, NOPE → 404 `COSMETIC_NOT_FOUND`; `GET /users/me` trả avatar + houseStyle đã lưu. Mua thành công khi đủ KP chỉ kiểm ở Integration (TC-COS-02) | E2E (PostgreSQL) + curl | ✅ |
| TC-COS-07 | Màn Tuỳ biến trên emulator | Đổi tóc/áo → xem trước 3D đổi ngay; Lưu → avatar trên bản đồ đổi; mua tường bằng KP → HUD trừ KP; tường/sàn áp vào nội thất và tường ngoài Housing | | E2E (emulator) | ⬜ |
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

---

## 8. ĐỢT 2 · M11: QUY ƯỚC TRÌNH BÀY CODE (hồi quy) ✅

Kiểm trên `feat/m12-progression` @ `9989d13` ở ổ D. Code backend / mobile / city-web giống hệt
`feat/m11-code-style` @ `60f5cac` (`git diff --stat 60f5cac 9989d13 -- backend mobile city-web` rỗng),
nên kết quả dưới đây là kết quả của M11.

| Mã | Mô tả | Kết quả mong đợi | Kết quả thực tế | Loại | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC-STYLE-01 | Test backend không đổi kết quả | Mọi test cũ đạt | Đạt (08/11/2026): `gradlew test` **49/49**, 0 lỗi, 0 bỏ qua (Achievement 3, BackendApplication 1, ContentApi 6, CosmeticFlow 6, Tutorial 8, UserOnboarding 5, LearningEngine 5, LearningFlow 15). Phiếu ghi "48/48" là số cũ: số `@Test` trước (`a6ff6d0`) và sau M11 bằng nhau | Integration + Unit | ✅ |
| TC-STYLE-02 | Test mobile + build APK | Mọi test cũ đạt, APK build được | Đạt: `testDebugUnitTest assembleDebug` BUILD SUCCESSFUL, **38/38** test (10 lớp), `app-debug.apk` 17,3 MB | Unit + build | ✅ |
| TC-STYLE-03 | city-web build | `npm run build` thành công | Đạt: 38 module, `index-*.js` 601 kB (cảnh báo chunk > 500 kB có từ trước) | Build | ✅ |
| TC-STYLE-04 | Commit A chỉ đổi khoảng trắng | `git diff -w --ignore-blank-lines 44a8b28 de3c121` rỗng | Đạt: rỗng (61 file, +2440 / −2444 dòng chỉ là khoảng trắng) | Review | ✅ |
| TC-STYLE-05 | `check_style.py` | 0 lỗi | Đạt: 238 file, 0 lỗi, mã thoát 0 | Tool | ✅ |
| TC-STYLE-06 | File test chỉ đổi trình bày | Không đổi assertion | Đạt: so token (bỏ khoảng trắng) `a6ff6d0`↔`60f5cac` trên `backend/src/test`, `mobile/app/src/test`: chỉ có gộp import, thêm `{}`, xuống dòng comment, nối chuỗi `+`, tách biến `unknownBuilding`. Ngắt dòng trong raw string JSON (`ContentMapperTest`, `LearningMapperTest`) chỉ nằm **giữa** các token JSON, giá trị không đổi | Review (script so token) | ✅ |
| TC-STYLE-07 | Chuỗi trong code ứng dụng không đổi nội dung khi ngắt dòng | Mọi literal (sau khi gộp `+`) giống bản cũ | Đạt: 9 file có khác biệt, đều đã soát tay. Gồm đổi tên biến bên trong template (`p`→`profile`, `r`→`result`, `b`→`building`…), hoist biến (`nextLevel`, `levelText`, `collectedText`, `title`, `wordsNeeded`) và tách template thành `` `…; ` + '…' `` (`cityState.ts`). Văn bản hiển thị giống hệt | Review (script so chuỗi) | ✅ |
| TC-STYLE-08 | `countCompletedBetween` (JPQL viết tay) | Context khởi động; bài thứ 6 trong ngày ×0.2 | Đạt: JPQL `count(s) … completedAt >= :from and completedAt < :to` khớp nghĩa derived query cũ; context khởi động (49/49); TC-VS3-10 đạt (5 × 120 + 24) | Review + Integration | ✅ |
| TC-STYLE-09 | Tách hàm `LearningService` | Thứ tự `random`, KP, idempotent, `@Version` không đổi | Đạt: thứ tự gọi `random` giữ nguyên (chọn từ → READING/WRITING từng từ → xáo câu viết); `kpFor` tương đương công thức cũ (PLACEMENT: `dailyIndex 0`, ×1.0); `complete` vẫn `saveAndFlush` trước khi cộng KP; TC-VS3-02/07/11/12/14 và TC-TUT-* đạt | Review + Integration | ✅ |
| TC-STYLE-10 | `QuestionBody`, `BuildingCard` → `NextLevelInfo` tách composable | Giao diện không đổi | Đọc code: điều kiện `next == null \|\| upgrading` và nội dung chữ giống bản cũ. **Chưa chạy emulator** | Review + E2E | 🟡 |

---

## 9. ĐỢT 2 · M13: MIGRATION V006, V007 VÀ NỘI DUNG ✅ (DB tạm)

Chạy trên **cụm PostgreSQL 17.11 tạm** (`initdb` trong thư mục scratch, cổng 55432, chỉ localhost),
áp lần lượt V001 → V007 lên DB trống. Không đụng `linguacity_db` của người dùng. Chưa chạy trên DB
dev thật đang có dữ liệu.

| Mã | Mô tả | Kết quả mong đợi | Kết quả thực tế | Loại | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC-DB-01 | V001 → V007 chạy sạch | `ON_ERROR_STOP=1`, không lỗi | Đạt: 7/7 file mã thoát 0, không ERROR / WARNING | E2E (PostgreSQL tạm) | ✅ |
| TC-DB-02 | Số dòng nội dung | 90 từ, 270 câu, pool 20, 11 nhiệm vụ, 10 sự kiện, +4 danh hiệu | Đạt: `vocabularies` 90, `questions` 270, `exam_questions(EXAM_HOUSING_LV2)` 20, `quests` 11 (5 MAIN + 5 DAILY + 1 BONUS), `city_event_templates` 10, `achievements` 11 (4 `revocable`) | E2E (PostgreSQL tạm) | ✅ |
| TC-DB-03 | Gói và version | HOUSING:2, SCHOOL:1 mới; CORE, HOUSING:1 tăng | Đạt: CORE v4, HOUSING:1 v2, HOUSING:2 v1, SCHOOL:1 v1 | E2E | ✅ |
| TC-DB-04 | Cân bằng trong DB | Bảng §11.7 / kế hoạch | Đạt: House Lv2 300 KP / 3600 s / 3 mảnh; Lv3 800 KP / 6 mảnh; School Lv1 150 KP / 60 s / 20 từ; requirement 45 từ + 200 KP + `required_building_id = 4` (SCHOOL) Lv1; theme HOUSING level 1–2 = 60 từ | E2E | ✅ |
| TC-DB-05 | CHECK `learning_sessions.type` mở rộng | Nhận `PRACTICE_*`, `EVENT` | Đạt (đọc schema sau V006) | E2E | ✅ |
| TC-DB-06 | Sequence sau khi chèn id cố định | `last_value` = max id | Đạt: `vocabularies_id_seq` 90, `questions_id_seq` 270 | E2E | ✅ |
| TC-DB-07 | Toàn vẹn câu hỏi mới (91–270) | 0 vi phạm | Đạt, 10 phép kiểm đều 0 dòng: MC có đủ 4 lựa chọn khác nhau, chứa đáp án; mỗi câu điền đúng 1 `___`; hint tier 2 khớp độ dài, chữ đầu và chữ cuối; tier 2 và tier 3 đều có `explanation`; `___s`/`___d` có dạng biến đổi trong `accepted_answers`; mỗi từ đúng 3 câu TARGET tier 1/2/3; đủ IPA, nghĩa, 2 ví dụ; không trùng từ hay trùng nghĩa trong 90 từ; pool thi chỉ gồm câu của từ HOUSING level 1–2 | E2E (SQL kiểm) | ✅ |
| TC-DB-08 | V007 chạy lần 2 | Không nhân đôi dữ liệu | Đạt theo cấu trúc: cả file nằm trong `BEGIN…COMMIT`, chèn id cố định nên lần 2 lỗi khoá chính và rollback hết | Review | ✅ |
| TC-DB-09 | V006, V007 trên `linguacity_db` thật | Chạy sạch; đếm như TC-DB-02 | Người dùng chạy (cần mật khẩu DB) | E2E | ⬜ |
| TC-DB-10 | Soát nội dung 60 từ bằng mắt | IPA, nghĩa, ví dụ hợp lý | Người dùng đọc lướt `housing_level2.py`, `school_level1.py` | Thủ công | ⬜ |

---

## 10. ĐỢT 2 · TIẾN TRÌNH SAU LV1 (ADR-015, M14–M16) 🟡 (4 lỗi, xem §10.10)

Viết từ BR-* trong `use-cases.md` §5 và API trong system-design §11. Backend: Integration test
(H2 + `MutableClock`) trong các lớp đề xuất ở cột Loại. Mobile: unit test thuần (JUnit 4). Mục
**Câu hỏi mở** ở cuối là những chỗ tài liệu chưa đủ để chốt kết quả mong đợi. TC nào phụ thuộc
câu hỏi mở thì ghi mã câu hỏi (Q*n*).

### 10.1. Bài học 20 / 30 và hết kẹt (BR-LEARN-01, 09)

| Mã | Mô tả | Kết quả mong đợi | Kết quả thực tế | Loại | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC-LEARN-01 | Cỡ phiên LEARNING | 201, 30 câu: 1–20 READING (20 từ khác nhau), 21–30 WRITING cho 10 từ trong 20 từ đó; không có đáp án | Đạt: 30 câu, 1–20 READING (20 từ), 21–30 WRITING (10 từ nằm trong 20 từ đó), không có đáp án; `LearningFlowTests`.sessionHasThirtyItems… | Integration (`LearningFlowTests`) | ✅ |
| TC-LEARN-02 | Hết kẹt sau Lv1 | Xây House Lv1 khi có 25/30 từ Lv1 → phiên kế có đủ 5 từ Lv1 còn thiếu (cùng từ Lv2) | Đạt: xây Lv1 khi có 20/30 từ → phiên kế `vocabLevel 2` vẫn có đủ 10 từ Lv1 chưa sưu tầm; `LearningFlowTests`.learningAtHouse… | Integration (`LearningFlowTests`) | ✅ |
| TC-LEARN-03 | Ưu tiên từ chưa sưu tầm qua mọi level ≤ level học | Còn từ chưa sưu tầm thì không chọn từ ôn | Đạt gián tiếp qua TC-LEARN-02 (chưa viết unit riêng cho `WordSelector`) | Unit (`LearningEngineTests`) | 🟡 |
| TC-LEARN-04 | KP với phiên 30 câu | đúng×5 + 20 nếu ≥ 80% (≥ 24/30); bài thứ 6 ×0.2 | Đạt: 25/30 → 125 + 20 = 145 KP; 30/30 → 170, bài thứ 6 → 34 (×0.2) | Integration | ✅ |
| TC-LEARN-05 | Placement không đổi | Vẫn 30 câu tier 1→3, KP đúng×3 + 100 | Đạt: test placement cũ không đổi vẫn xanh | Integration | ✅ |
| TC-LEARN-06 | Assertion cũ phải sửa theo 20/30 | TC-VS3-01 (20 câu), TC-VS3-09 (17/20), TC-VS3-10 (`answerItems(…, 20, 20)` → 120 KP) cập nhật theo cỡ mới | Đã sửa 5 test của `LearningFlowTests` (chỉ đổi số theo 20/30; cuối test xây nhà `ALREADY_BUILT` → `NO_CONTENT` vì seed không có Lv2) | Integration | ✅ |

### 10.2. Thi (UC_06–08, BR-EXAM-01..07)

| Mã | Mô tả | Kết quả mong đợi | Kết quả thực tế | Loại | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC-EXAM-01 | `GET /exams?building=HOUSING` khi thiếu | `available=false`; `missing = {collected: 45−n, knowledge, shards: 0, building: true}`; `progress` đúng | Đạt: `progress.collected 38`, `missing {collected 7, knowledge 0, building true}`, `available false` | Integration (`ExamFlowTests`) | ✅ |
| TC-EXAM-02 | Đếm từ theo công trình | Từ SCHOOL / ROAD đã sưu tầm **không** tính; từ HOUSING Lv1 + Lv2 (gồm DAILY_LIFE) có tính; từ HOUSING sưu tầm qua luyện tập có tính (BR-PRAC-04) | Đạt: 10 từ SCHOOL đã sưu tầm không được tính | Integration | ✅ |
| TC-EXAM-03 | Thiếu từng điều kiện → start | 409 `REQUIREMENTS_NOT_MET`, `details.missing` đúng từng khoá; KP không bị trừ | Đạt: 409 `REQUIREMENTS_NOT_MET`, `missing.knowledge 50`, `building true`; KP không đổi | Integration | ✅ |
| TC-EXAM-04 | Đủ điều kiện → start | 201; 10 câu từ pool 20, `order` 1..10 không trùng; JSON không có `answer` / `acceptedAnswers` / `explanation`; KP −200 | Đạt: 201, 10 câu khác nhau, order 1..10; body không có answer / acceptedAnswers / explanation; KP 250 → 50 | Integration | ✅ |
| TC-EXAM-05 | Resume | `start` lần 2 → 200 cùng `attemptId`, cùng thứ tự câu, KP không trừ lần nữa; `GET /exam-attempts/{id}` cùng dạng | Đạt: start lần 2 → 200 cùng `attemptId`, cùng câu 1; KP vẫn 50; `activeAttemptId` hiện trong `GET /exams` | Integration | ✅ |
| TC-EXAM-06 | Hai `start` song song | Chỉ 1 lượt `IN_PROGRESS` (`uq_active_attempt`); lệnh thua → 200 lượt đó hoặc 409 `CONCURRENT_UPDATE`, KP chỉ trừ 1 lần | Chưa kiểm: H2 tạo schema từ entity nên không có chỉ mục một phần `uq_active_attempt`; cần kiểm trên PostgreSQL | Integration | ⬜ |
| TC-EXAM-07 | Nộp thiếu câu | 409 `INCOMPLETE`, `details.missingOrders` đúng; lượt vẫn `IN_PROGRESS` | Đạt: thiếu câu 10 + câu 1 chỉ có khoảng trắng → 409 `INCOMPLETE`, `missingOrders [1, 10]`; lượt vẫn `IN_PROGRESS` | Integration | ✅ |
| TC-EXAM-08 | Đậu biên 8/10 | `PASSED`, `scorePercent 80`; `user_blueprints(BLUEPRINT_HOUSING_LV2).quantity = 1`; `items[]` có đáp án đúng + giải thích | Đạt: 8/10 → PASSED, `scorePercent 80`, bản vẽ quantity 1; câu sai có `correctAnswer` + `explanation` | Integration | ✅ |
| TC-EXAM-09 | Trượt biên 7/10 | `FAILED`; không bản vẽ; KP không hoàn; `start` lại → 201 lượt mới, trừ phí mới | Đạt: 7/10 → FAILED, không bản vẽ, KP 450 → 250 không hoàn; start lại → 201 lượt mới, KP → 50 | Integration | ✅ |
| TC-EXAM-10 | Mastery khi nộp | Từ TARGET đúng +1, sai −1 (kẹp); từ chưa sưu tầm trả lời đúng → được sưu tầm | Đạt: đúng +1, sai −1 (kẹp 0); từ Lv2 chưa sưu tầm trả lời đúng → được sưu tầm | Integration | ✅ |
| TC-EXAM-11 | Nộp đôi | Lần 2 → 409 `ATTEMPT_CLOSED`; Mastery và bản vẽ không cộng lần 2 | Đạt (nộp lần lượt): lần 2 → 409 `ATTEMPT_CLOSED`, bản vẽ vẫn 1. Chưa kiểm hai lệnh nộp song song | Integration | 🟡 |
| TC-EXAM-12 | Đã đậu | Còn bản vẽ → `start` 409 `ALREADY_PASSED`; sau khi nâng lên Lv2 (bản vẽ đã dùng) vẫn 409; `GET /exams` `passed=true` | Đạt: còn bản vẽ → 409 `ALREADY_PASSED`; `passed true`. Phần "đã nâng Lv2" đúng theo code (`currentLevel ≥ targetLevel`), chưa có test riêng | Integration | ✅ |
| TC-EXAM-13 | Không tìm thấy / không phải của mình | Mã lạ → 404 `EXAM_NOT_FOUND`; lượt của người khác → 404 `ATTEMPT_NOT_FOUND` | Đạt: 404 `EXAM_NOT_FOUND`; lượt của người khác → 404 `ATTEMPT_NOT_FOUND` (GET và submit) | Integration | ✅ |
| TC-EXAM-14 | Chấm đáp án điền từ | Viết hoa, thừa khoảng trắng → đúng; `accepted_answers` (`mortgages`) → đúng | Đạt: `"  H1-3 "` và `alt-…` được chấm đúng | Integration | ✅ |
| TC-EXAM-15 | Tiến độ nhiệm vụ | Đậu → MAIN `MAIN_PASS_HOUSE_EXAM` hoàn thành | Chưa có test riêng (MAIN `EXAM_PASSED` suy ra từ lượt PASSED) | Integration (`QuestFlowTests`) | ⬜ |
| TC-EXAM-16 | `ExamEligibility` (mobile) | Checklist x/45, KP, School Lv1 đúng với DTO; nút sáng chỉ khi đủ | Không test được: app không có hàm `ExamEligibility` thuần, mapper thi là `private` (N1) | Unit (mobile) | ⬜ |

### 10.3. Nâng cấp (UC_10, BR-UPG-01..03)

| Mã | Mô tả | Kết quả mong đợi | Kết quả thực tế | Loại | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC-UPG-01 | Lv1 → 2 không có bản vẽ | 409 `NEEDS_BLUEPRINT`, `details.blueprintCode = BLUEPRINT_HOUSING_LV2`; không trừ gì | Đạt: 409 `NEEDS_BLUEPRINT`, `blueprintCode BLUEPRINT_HOUSING_LV2`; KP/mảnh không đổi | Integration (`UpgradeFlowTests`) | ✅ |
| TC-UPG-02 | Có bản vẽ, thiếu mảnh / KP | 409 `REQUIREMENTS_NOT_MET`, `missingShards` / `missingKnowledge` đúng; không trừ gì | Đạt: `missingShards 2`, `missingKnowledge 200`; bản vẽ, KP, mảnh không đổi | Integration | ✅ |
| TC-UPG-03 | Đủ điều kiện | 200 UPGRADING; trừ 1 bản vẽ, 3 mảnh, 300 KP; `finishAt = now + 3600 s` | Đạt: 200 UPGRADING → Lv2; 320 KP / 4 mảnh → 20 / 1; bản vẽ 1 → 0 | Integration | ✅ |
| TC-UPG-04 | Đang xây | Gọi lại → 409 `BUSY` | Đạt: 409 `BUSY` | Integration | ✅ |
| TC-UPG-05 | Hoàn tất lười | Tua đồng hồ 3599 s → còn UPGRADING; 3600 s → `GET /city` Lv2, IDLE | Đạt: 3599 s → UPGRADING; 3600 s → Lv2 IDLE | Integration (`MutableClock`) | ✅ |
| TC-UPG-06 | Lv0 → 1 giữ luật cũ | Không cần bản vẽ; thiếu từ → `missingCollected` | Đạt: `LearningFlowTests` (`missingCollected 20`, không cần bản vẽ) | Integration | ✅ |
| TC-UPG-07 | Lv tối đa / thiếu cấu hình | 409 `MAX_LEVEL`; 409 `NO_CONTENT` khi không có `building_levels` | Đạt: Lv2/max 2 → 409 `MAX_LEVEL`; SCHOOL Lv1 không có cấu hình Lv2 → 409 `NO_CONTENT` | Integration | ✅ |
| TC-UPG-08 | `GET /city` | `blueprints[]` chỉ gồm `quantity > 0`; có `profile` | Đạt: `blueprints[]` có bản vẽ sau khi đậu, rỗng sau khi dùng; có `profile` | Integration | ✅ |

### 10.4. Nhiệm vụ (UC_16, UC_17, BR-QUEST-01..05)

| Mã | Mô tả | Kết quả mong đợi | Kết quả thực tế | Loại | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC-QUEST-01 | Chính tuyến suy ra từ trạng thái | Người chơi cũ đã có House Lv1 → `MAIN_BUILD_HOUSE` completed ngay, chưa claimed | Đạt: House Lv1 sẵn → `MAIN_BUILD_HOUSE` completed, chưa claimed; School Lv1 sẵn → bước 3 completed ngay khi mở | Integration (`QuestFlowTests`) | ✅ |
| TC-QUEST-02 | Chỉ bước hiện tại | `main` = các bước đã nhận + đúng 1 bước hiện tại; claim bước chưa mở → 409 `NOT_COMPLETED` | Đạt: `main` = bước đã nhận + 1 bước hiện tại; claim bước chưa mở → 409 `NOT_COMPLETED` | Integration | ✅ |
| TC-QUEST-03 | Claim | 200, cộng KP + mảnh đúng bảng `quests`; bước kế mở | Đạt: +30 KP; bước 2 +40 KP +1 mảnh | Integration | ✅ |
| TC-QUEST-04 | Claim đôi | 409 `ALREADY_CLAIMED`; tài nguyên không đổi | Đạt: 409 `ALREADY_CLAIMED` (MAIN, DAILY, BONUS), KP không đổi | Integration | ✅ |
| TC-QUEST-05 | Claim chưa xong / mã lạ | 409 `NOT_COMPLETED`; 404 `QUEST_NOT_FOUND` | Đạt: 5/20 → 409 `NOT_COMPLETED`; mã lạ → 404 `QUEST_NOT_FOUND` | Integration | ✅ |
| TC-QUEST-06 | Hằng ngày: 3 nhiệm vụ cố định theo (người chơi, ngày) | Gọi `GET /quests` nhiều lần cùng ngày → cùng 3 mã; tạo lười | Đạt: 3 mã khác nhau, gọi lại giống hệt; `resetsAt 17:00:00Z` | Integration | ✅ |
| TC-QUEST-07 | Làm mới 0h giờ VN | Tua tới 16:59:59Z → cùng bộ; 17:00:00Z → bộ ngày mới, tiến độ 0; `resetsAt` đúng | Đạt: 16:59:59Z cùng bộ; 17:00:00Z bộ mới, progress 0, `resetsAt` đổi; `StreakTests` | Integration (`MutableClock`) | ✅ |
| TC-QUEST-08 | Bộ đếm từng `goal_type` | `LESSON_COMPLETED` +1 / phiên LEARNING hoặc PRACTICE (EVENT không tính); `NEW_WORDS` +1 / từ sưu tầm lần đầu; `EVENT_RESOLVED`; `STREAK_CORRECT` lấy max trong ngày; `REVIEW_WORDS` +1 / câu cho từ đã sưu tầm | Đạt: một bài 30/30 xong `LESSON_COMPLETED`, `NEW_WORDS`, `REVIEW_WORDS`; phiên EVENT không tính `LESSON_COMPLETED`; `STREAK_CORRECT` lấy max (5 → 10) | Integration | ✅ |
| TC-QUEST-09 | Nhiệm vụ không được chọn hôm nay | Không cộng tiến độ, không claim được | Đạt: claim `DAILY_EVENT` khi không thuộc bộ hôm nay → 404 | Integration | ✅ |
| TC-QUEST-10 | `DAILY_BONUS` | Claim khi mới xong 2/3 → 409 `NOT_COMPLETED`; xong 3/3 → 200 với thưởng theo bảng (Q1) | Đạt: 2/3 → 409; 3/3 → +20 KP +1 mảnh (Q1: theo bảng `quests`) | Integration | ✅ |
| TC-QUEST-11 | Mảnh chỉ từ nhiệm vụ / sự kiện | Bài học, thi, luyện tập không cộng `blueprint_shards` | Đạt một phần: bài học không cho mảnh; nguồn mảnh khác chưa soát hết | Integration | 🟡 |
| TC-QUEST-12 | Mapper DTO nhiệm vụ (mobile) | JSON §11.4 → domain đúng, `dailyBonus`, `streak` | Không test được: mapper nhiệm vụ là `private` trong `ProgressionRepositoryImpl` (N1) | Unit (mobile) | ⬜ |

### 10.5. Sự kiện thành phố (UC_18, BR-EVT-01..04)

| Mã | Mô tả | Kết quả mong đợi | Kết quả thực tế | Loại | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC-EVT-01 | Chưa đủ điều kiện | Tutorial chưa DONE hoặc < 5 từ đã sưu tầm → `events = []` | Đạt: chưa DONE hoặc 4 từ → `[]`; 5 từ → 3 sự kiện | Integration (`CityEventTests`) | ✅ |
| TC-EVT-02 | Sinh tối đa 3 mỗi ngày | `GET /city` nhiều lần → luôn 3, mẫu không trùng; cố định theo (người chơi, ngày) | Đạt: 3 sự kiện, 3 mẫu khác nhau, gọi lại cùng id | Integration | ✅ |
| TC-EVT-03 | Không cộng dồn | Ngày mới → bộ 3 sự kiện mới; sự kiện OPEN hôm qua không còn trong `events` | Đạt: hôm sau 3 sự kiện mới, sự kiện hôm qua không còn trong `events`. Nhưng vẫn `start` được sự kiện hôm qua (B4) | Integration (`MutableClock`) | 🟡 |
| TC-EVT-04 | Start | 201 phiên `EVENT` 5 câu, mọi từ đều đã sưu tầm; gọi lại → 200 cùng phiên | Đạt: 201 `EVENT` 5 câu, mọi từ đã sưu tầm; gọi lại → 200 cùng phiên | Integration | ✅ |
| TC-EVT-05 | Đậu 4/5 | +1 mảnh, +15 KP; `eventResolved=true`, `shardsAwarded=1`; sự kiện RESOLVED, mất khỏi `events`; `DAILY_EVENT` +1 | **Lỗi B1**: thưởng đúng (+15 KP, +1 mảnh, `eventResolved true`, mất khỏi `/city`), nhưng start lại sự kiện đã giải → **500** thay vì 409 `EVENT_RESOLVED` | Integration | ❌ |
| TC-EVT-06 | Trượt 3/5 | Không thưởng; sự kiện vẫn OPEN; start lại → 201 phiên mới | Đạt: 3/5 → 0 KP, 0 mảnh, `eventResolved false`; còn 3 sự kiện; start lại → 201 phiên mới | Integration | ✅ |
| TC-EVT-07 | KP và Mastery của phiên EVENT | Không KP theo câu, không bonus, không hệ số ngày; Mastery vẫn ±1; không tính vào `dailySessionIndex` | Đạt: không có `dailySessionIndex`; câu đúng vẫn +1 Mastery | Integration | ✅ |
| TC-EVT-08 | Lỗi | Đã RESOLVED → 409 `EVENT_RESOLVED`; id của người khác / lạ → 404 `EVENT_NOT_FOUND` | **Lỗi B1**: sự kiện của người khác / id lạ → **500** thay vì 404 `EVENT_NOT_FOUND` | Integration | ❌ |
| TC-EVT-09 | Hai sự kiện cùng lúc | Đang dở phiên của sự kiện A, start sự kiện B (Q5) | Đạt (Q5): start B → phiên A `EXPIRED`; start A lại → 201 phiên mới | Integration | ✅ |
| TC-EVT-10 | Bridge bản đồ | `events[]` có `eventId`, `buildingCode`; dấu "!" đúng lô; chạm → `CityEventTapped` | Đạt phần hợp đồng: `CityBridgeJsonTest` (HELP + buildingCode) và kiểm `normalizeState` 10/10 ca. Emulator chưa chạy | Unit (mobile `CityBridgeJsonTest`) + E2E | 🟡 |

### 10.6. Luyện tập (UC_19, BR-PRAC-01..04)

| Mã | Mô tả | Kết quả mong đợi | Kết quả thực tế | Loại | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC-PRAC-01 | Cỡ bài | `wordCount` 10 → 15 câu, 20 → 30 câu; giá trị khác hoặc `mode` lạ → 400 `INVALID_BODY` | Đạt: 10 từ → 15 câu; `mode XYZ` / `wordCount 15` → 400 `INVALID_BODY` | Integration (`PracticeLimitTests`) | ✅ |
| TC-PRAC-02 | REVIEW chỉ từ đã sưu tầm | Mọi từ trong phiên đều đã sưu tầm; chưa sưu tầm từ nào → 409 `NO_CONTENT` | Đạt: chỉ từ đã sưu tầm; chưa có từ → 409 `NO_CONTENT` | Integration | ✅ |
| TC-PRAC-03 | Lọc chủ đề | `themeCodes: ["HOUSE"]` → chỉ từ chủ đề HOUSE; `[]` → mọi chủ đề | Đạt: `["education"]` → chỉ 10 từ trong 12 từ EDUCATION đã sưu tầm | Integration | ✅ |
| TC-PRAC-04 | Giới hạn REVIEW 1 / ngày | Lượt 2 → 409 `DAILY_LIMIT` `{mode: REVIEW, used: 1, limit: 1, resetsAt}` | Đạt: lượt 2 → 409 `DAILY_LIMIT {mode REVIEW, used 1, limit 1, resetsAt 17:00Z}` | Integration | ✅ |
| TC-PRAC-05 | Giới hạn MIXED 3 / ngày | Lượt 4 → 409 `DAILY_LIMIT`; resume phiên dở (200) không tính thêm lượt (Q3) | Đạt: lượt 4 → 409; resume (200) không tính lượt; phiên bỏ dở hết hạn vẫn mất lượt (Q3) | Integration | ✅ |
| TC-PRAC-06 | Làm mới 0h giờ VN | Sau 17:00Z mở lại được; `resetsAt` đúng | Đạt: hôm sau mở lại được; `StreakTests` | Integration (`MutableClock`) | ✅ |
| TC-PRAC-07 | Giới hạn 20 từ mới / ngày | Tổng từ mới qua luyện tập trong ngày ≤ 20 (Q4) | Đạt: 3 lượt × 20 từ → 10 + 10 + 0 từ mới = 20; `newWords.used 20` | Integration | ✅ |
| TC-PRAC-08 | Thưởng một lần mỗi từ mỗi ngày | Từ X đúng lần 1 → +3 KP, Mastery +1, `last_rewarded_on = hôm nay`; phiên khác cùng ngày đúng X → vẫn chấm đúng, 0 KP, Mastery không đổi; hôm sau → thưởng lại | **Lỗi B2**: phần thưởng đúng (10 từ → 30 KP, Mastery +1 một lần dù đúng 2 lần; hôm sau thưởng lại). Nhưng trả lời **sai** thì mỗi lần đều −1 Mastery (từ sai 2 lần: 5 → 3) | Integration | ❌ |
| TC-PRAC-09 | Từ mới được sưu tầm | MIXED đúng từ HOUSING chưa sưu tầm → `collectedNow`; `GET /exams` tăng `progress.collected` | Đạt: từ mới Hỗn hợp đúng → sưu tầm; `GET /exams` tăng đúng số từ mới | Integration | ✅ |
| TC-PRAC-10 | `GET /learning/practice/status` | `used/limit` từng chế độ, `newWords`, `themes[{collected,total}]` khớp sau mỗi lượt | Đạt: `review/mixed used/limit`, `themes[EDUCATION] 12/30` | Integration | ✅ |

### 10.7. Chuỗi ngày và danh hiệu (UC_20, BR-STREAK-01..03, BR-ACH-05)

| Mã | Mô tả | Kết quả mong đợi | Kết quả thực tế | Loại | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC-STREAK-01 | Chỉ một điều kiện | Học bài mà chưa xong nhiệm vụ hằng ngày → chưa tính; ngược lại cũng chưa tính | Đạt: học bài nhưng chưa xong nhiệm vụ → `days 0`, `lessonDone true`, `questDone false` | Integration (`StreakTests`) | ✅ |
| TC-STREAK-02 | Đủ cả hai | Ngày đầu → `streak_days = 1`, `todayCounted = true`; làm thêm trong ngày không cộng lần 2 | Đạt: ngày đầu `days 1`; học thêm trong ngày không cộng | Integration | ✅ |
| TC-STREAK-03 | Ngày liên tiếp | Ngày D và D+1 đều đủ → 2; `best_streak` cập nhật | Đạt: 3 ngày liên tiếp → 3, `best 3` | Integration (`MutableClock`) | ✅ |
| TC-STREAK-04 | Nghỉ đúng một ngày rồi quay lại | Đọc `/users/me` ở D+2 khi D+1 trống → 0; đủ điều kiện ở D+2 → 1; `best_streak` giữ | Đạt: bỏ 1 ngày → `/users/me` `streakDays 0`, `bestStreak 3`; đủ điều kiện → 1 | Integration | ✅ |
| TC-STREAK-05 | Chưa đứt khi hôm nay chưa xong | Ở D+1, chưa làm gì → `/users/me` vẫn trả chuỗi của D | Đạt: sáng hôm sau chưa học vẫn `days 1`, `todayCounted false` | Integration | ✅ |
| TC-STREAK-06 | Trao `STREAK_3` | Ngày thứ 3 liên tiếp → `newAchievements` có `STREAK_3` | **Lỗi B3**: `STREAK_3` được trao (có trong `/users/me/achievements`) nhưng không có trong `newAchievements` của lệnh vừa đạt (chỉ có `DILIGENT`) | Integration | ❌ |
| TC-STREAK-07 | Thu hồi và gỡ khi đứt | Đang đeo `STREAK_3`, đứt chuỗi → `user_achievements` mất `STREAK_3`, `equipped_achievement_code = null`; danh hiệu không `revocable` (`GOOD_START`, `DILIGENT`) còn nguyên | Đạt: đứt chuỗi → mất `STREAK_3`, `equippedTitle` bị gỡ; `DILIGENT` còn | Integration | ✅ |
| TC-STREAK-08 | Trao lại | Sau khi bị thu hồi, đạt lại 3 ngày → được trao lại | Đạt: 3 ngày liên tiếp mới → `STREAK_3` được trao lại | Integration | ✅ |
| TC-STREAK-09 | Ranh giới ngày giờ VN | Học 16:59Z và 17:01Z → hai ngày khác nhau | Đạt: 23:58 và 0:02 giờ VN là hai ngày → chuỗi 2 | Integration | ✅ |
| TC-STREAK-10 | `DILIGENT` sau khi đổi nghĩa chuỗi | Hành vi không đổi so với trước đợt 2 (Q8) | Đạt (Q8): `DILIGENT` vẫn trao theo luật cũ, không bị thu hồi | Integration (`AchievementServiceTests`) | ✅ |
| TC-STREAK-11 | `PlayerDto.stats` | `streakDays`, `bestStreak` đúng | Đạt: `stats.streakDays`, `stats.bestStreak` | Integration | ✅ |

### 10.8. Mobile và E2E

| Mã | Mô tả | Kết quả mong đợi | Kết quả thực tế | Loại | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC-M15-01 | Room v5 → v6 (AutoMigration) | Giữ dữ liệu; cột mới có mặc định | Không áp dụng: M15 giữ Room v5 (system-design §11.8) | E2E (emulator) | — |
| TC-M15-02 | `FloatingMenuTest` 6 mục | Có 📜 Nhiệm vụ và Luyện tập, đúng thứ tự | Đạt phần hình học: 6 mục nằm đều trên cung 90° (`FloatingMenuTest`). Danh sách mục nằm trong composable, chưa unit test được | Unit (mobile) | 🟡 |
| TC-M15-03 | `MaiLines` cho thi | Câu cho đậu / trượt / lần đầu mở Trung tâm thi | Chưa làm ở M15 (mục "Chưa làm" của phiếu) | Unit (mobile) | ⬜ |
| TC-M15-04 | Bỏ thông báo "sắp có!" ở `NeedsExam` | Thay bằng nút "Thi lên Lv2" | | E2E | ⬜ |
| TC-E2E-01 | Cả vòng trên PostgreSQL thật (curl) | onboard → placement → học → House Lv1 → học School → School Lv1 → nhiệm vụ + sự kiện lấy mảnh → thi trượt / đậu → nâng House Lv2 → `DAILY_LIMIT` | | E2E (curl) | ⬜ |
| TC-E2E-02 | Emulator Pixel_5 cả vòng | Ảnh SCR-10/11/12/23/24/25 | | E2E (emulator) | ⬜ |

### 10.9. Câu hỏi mở cho chat code (từ review tài liệu M12 và dữ liệu M13)

| Mã | Vấn đề | Chỗ | Đề xuất |
| :--- | :--- | :--- | :--- |
| Q1 | **Thưởng `DAILY_BONUS` không khớp.** V007 ghi `reward_kp = 20, reward_shards = 1`; ví dụ JSON ở system-design §11.4 là `rewardKp: 0`; kế hoạch ghi "xong cả 3 thêm +1 mảnh" | V007, §11.4 | Chốt một con số, sửa chỗ còn lại |
| Q2 | ADR-015 §2 gọi cột là `required_building_code`, nhưng V006 và §11.1 là `required_building_id` (API trả `requiredBuildingCode`) | ADR-015 §2 | Sửa câu chữ trong ADR |
| Q3 | **Lượt luyện tập được tính lúc nào:** khi `POST /learning/practice` trả 201, hay khi `complete`? Phiên bỏ dở hoặc hết hạn có mất lượt không? | §11.6, BR-PRAC-01 | Ghi rõ vào BR-PRAC-01 |
| Q4 | **Từ mới trong MIXED:** một bài có bao nhiêu từ mới / từ ôn? Nếu chỉ còn 3 suất từ mới thì sao: bù bằng từ ôn hay 409? §11.6 đếm giới hạn lúc *sưu tầm*, nên nếu lúc chọn từ không chặn thì một bài 20 từ có thể vượt 20 từ mới / ngày | ADR-015 §6, §11.6 | Chặn lúc chọn từ, ghi tỉ lệ |
| Q5 | `uq_active_free_session (user_id, type)` chỉ cho **một** phiên EVENT ACTIVE mỗi người. Đang dở sự kiện A mà start sự kiện B thì DB báo lỗi unique (sẽ thành 500) nếu service không xử lý. Tài liệu chưa nói nên trả gì | V006, §11.5 | Đặc tả: huỷ phiên A, trả 409 có mã riêng, hoặc gắn phiên theo `user_city_events` |
| Q6 | Sự kiện bắt đầu lúc 23:55 và complete sau 0h (giờ VN): còn thưởng không (BR-EVT-04)? | BR-EVT-04 | Ghi rõ |
| Q7 | **"Nhiệm vụ hằng ngày hoàn thành"** trong BR-STREAK-01 là đạt tiến độ (`completed_at`) hay đã bấm Nhận (`claimed_at`)? | BR-STREAK-01, §11.6 | Ghi rõ; §11.6 đang ngầm hiểu là `completed_at` |
| Q8 | **`DILIGENT` và `STREAK_*` cùng `condition_type = STREAK_DAYS`** (DILIGENT `threshold 3`). Nếu M14 xét `STREAK_DAYS` theo `streak_days` mới (cần cả nhiệm vụ) thì nghĩa của DILIGENT ("học 3 ngày liên tiếp") đổi theo; ngược lại thì hai danh hiệu cùng loại nhưng tính khác nhau | V007, ADR-015 §7 | Tách `condition_type` (ví dụ `LESSON_DAYS` cho DILIGENT) hoặc ghi rõ |
| Q9 | Mẫu sự kiện gắn cả PARK / ROAD / SCHOOL (6/10 mẫu). Người chơi mới thường chỉ có House: có sinh sự kiện "!" trên lô **chưa xây** không? | §11.5, `city_event_templates` | Chỉ chọn mẫu của công trình Lv ≥ 1, hoặc ghi rõ là được |
| Q10 | Pool thi 20 câu **toàn tier 3 điền từ** (10 câu Lv1 + 10 câu Lv2), cần đúng 8/10 câu khó nhất mới đậu. Đúng với ADR-015 §8, nhưng nên để người dùng xác nhận lúc duyệt bảng cân bằng | ADR-015 §8 | Người dùng xác nhận |
| Q11 | Phiếu M11 ghi backend "48/48", thực chạy 49/49 (số test không đổi qua M11) | `handover-dot2.md` | Sửa số trong phiếu |

### 10.10. Kết quả chạy M14–M16 (08/11/2026, chat test, ổ D @ `cd87d4a`)

**Tổng:**

| Phần | Lệnh | Kết quả |
| :--- | :--- | :--- |
| Backend | `gradlew test` | **87 test: 82 đạt, 5 đỏ**, ứng với 4 lỗi B1–B4 bên dưới (B1 làm đỏ 2 test). 49 test cũ đều đạt sau khi sửa assertion |
| Mobile | `testDebugUnitTest assembleDebug` | **46/46 đạt**, APK build được |
| city-web | `npm run build` + kiểm `normalizeState` | Build OK; 10/10 ca đạt (script esbuild + node, không nằm trong repo vì city-web chưa có bộ chạy test) |
| Quy ước | `python tools/check_style.py` | 282 file, 0 lỗi (gồm file test mới) |

**Test cũ phải sửa vì thay đổi chủ ý (không phải lỗi):**
- `LearningFlowTests` (5 test): cỡ bài 20 câu → 30 câu, KP 105 → 145 (25/30), 120 / 24 → 170 / 34; cuối
  test xây nhà `ALREADY_BUILT` → `NO_CONTENT` (seed không có Lv2). Thêm kiểm hết kẹt (TC-LEARN-02).
- `CityBridgeJsonTest.encodeState_dungTenTruongMaBanDoDoc`: `CityEvent` mặc định giờ là `kind HELP`
  (M16); sửa kỳ vọng và thêm `buildingCode`.

**Test mới:**
- Backend `progression/`: `ProgressionTestBase` (seed + helper), `ProgressionFlowTests` (28 test: thi,
  nâng cấp, nhiệm vụ, sự kiện, luyện tập), `StreakTests` (10 test, context + đồng hồ riêng để tua ngày).
- Mobile: `ProgressionJsonTest` (4), `PracticeUiStateTest` (3), `FloatingMenuTest` +1.

**Lỗi cho chat code:**

| Mã | Mức | Lỗi | Tái hiện | Chỗ nghi | Test |
| :--- | :--- | :--- | :--- | :--- | :--- |
| B1 | **Cao** | `POST /events/{id}/start` trả **500** thay vì 409 `EVENT_RESOLVED` / 404 `EVENT_NOT_FOUND` | Giải xong một sự kiện rồi bấm lại dấu "!" cũ (bản đồ chưa kịp tải lại), hoặc gửi id của người khác | `CityEventService` là `@Transactional` mặc định; `requireOpen` ném `ApiException` bên trong transaction của `PracticeService.startEvent` → transaction bị đánh dấu rollback-only → lúc commit Spring ném `UnexpectedRollbackException`. `noRollbackFor = ApiException.class` ở `PracticeService` không cứu được vì bean bên trong đã đánh dấu | `ProgressionFlowTests.solvingFourOfFive…`, `anotherPlayersEventIsNotFound` |
| B2 | Trung bình | Luyện tập: trả lời **sai** một từ nhiều lần trong ngày thì mỗi lần đều −1 Mastery (BR-PRAC-03 nói "đổi Mastery một lần mỗi ngày") | Ôn 10 từ Mastery 5, sai hết → từ có 2 câu còn 3 | `LearningService.isRewardable` chỉ chặn khi `last_rewarded_on = hôm nay`, mà ngày này chỉ ghi ở câu **đúng** (`rewardPracticeAnswer`) | `ProgressionFlowTests.wrongPracticeAnswersChangeMasteryAtMostOnceADay` |
| B3 | Thấp | Danh hiệu chuỗi vừa đạt (`STREAK_3`) được lưu nhưng **không có trong `newAchievements`**, nên app không báo | Ba ngày liên tiếp học bài có `DAILY_LESSON`; `complete` ngày 3 chỉ trả `["DILIGENT"]` | `LearningService.afterComplete`: `tracker.record(LESSON_COMPLETED)` làm nhiệm vụ xong → `QuestTracker.update` gọi `streak.recordActivity` (trao danh hiệu, **bỏ** kết quả); lệnh `streak.recordActivity` thứ hai ngay sau đó trả `[]` vì hôm nay đã tính | `StreakTests.theNewStreakTitleIsReportedByTheCallThatEarnedIt` |
| B4 | Thấp (Q6) | Sự kiện OPEN của **hôm qua** vẫn `start` được (201), dù đã biến khỏi `/city` (BR-EVT-04) | Hôm qua có sự kiện, hôm nay gọi `POST /events/{idHômQua}/start` | `CityEventService.requireOpen` không so `spawnDate` với hôm nay | `StreakTests.yesterdaysEventCannotBeStartedAnyMore` (chấp nhận 404 hoặc 409) |

**Ghi nhận (không phải lỗi):**
- N1. Mapper DTO → domain của thi / nhiệm vụ / `/city` ở mobile đều `private`
  (`ProgressionRepositoryImpl`, `CityRepositoryImpl`), nên TC-EXAM-16, TC-QUEST-12 không unit test được.
  Đề xuất: chuyển sang `data/mapper/ProgressionMapper.kt` như `LearningMapper`.
- N2. Test `ExamViewModel`, `QuestsViewModel` (đề xuất trong phiếu M15) cần thêm
  `kotlinx-coroutines-test` vào `testImplementation`. Chưa thêm vì là đổi cấu hình build.
- N3. Bridge app gửi `"buildingCode": null` khi sự kiện không gắn công trình; `normalizeState` coi như
  không có, vô hại.
- N4. TC-EXAM-06 (hai `start` song song) chỉ kiểm được trên PostgreSQL: H2 sinh schema từ entity nên
  không có `uq_active_attempt`.
- N5. Q2, Q6, Q9, Q11 chưa có trong bảng chốt §11.10. Q6 nay là lỗi B4. Q9: đọc code thì
  `CityEventService.spawn` không lọc theo level công trình, nên sự kiện có thể gắn vào lô chưa xây
  (chưa có test khẳng định).
