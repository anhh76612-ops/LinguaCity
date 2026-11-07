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

## 5. VS3 — LEARNING SESSION (UC_05) ⬜

| Mã | Mô tả | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Loại | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC-VS3-01 | Tạo phiên | `POST /learning/sessions {HOUSING}` | 201, 20 câu (10 READING rồi 10 WRITING), không đáp án | | Integration | ⬜ |
| TC-VS3-02 | Làm tiếp phiên ACTIVE | Gọi tạo lần 2 | 200, cùng `sessionId` | | Integration | ⬜ |
| TC-VS3-03 | Chấm đúng/sai + Mastery | Đáp án đúng rồi sai | +1 / −1, kẹp 0..max theo độ khó | | Unit | ⬜ |
| TC-VS3-04 | Chuẩn hoá điền từ | `"  Rent "`, `"RENT"`, `"rents"` | đúng, đúng, sai | | Unit | ⬜ |
| TC-VS3-05 | `accepted_answers` | Đáp án phụ | Đúng | | Unit | ⬜ |
| TC-VS3-06 | Nộp lại một câu | Nộp câu 1 hai lần | 409 `ALREADY_ANSWERED` | | Integration | ⬜ |
| TC-VS3-07 | Phiên hết hạn | Giờ server > `expires_at` | 410; Mastery câu đã nộp giữ nguyên; không KP | | Unit | ⬜ |
| TC-VS3-08 | Sưu tầm = đúng lần đầu | Sai rồi đúng | `collected_at` ghi ở lần đúng, `collectedNow = true` một lần | | Unit | ⬜ |
| TC-VS3-09 | KP cuối phiên | 17/20 | 85 + 20 = 105 | | Unit | ⬜ |
| TC-VS3-10 | Giảm KP theo ngày | Phiên thứ 6 trong ngày | × 0.2 | | Unit | ⬜ |
| TC-VS3-11 | `complete` khi còn câu | 19/20 câu | 409 `INCOMPLETE` | | Integration | ⬜ |
| TC-VS3-12 | `complete` idempotent | Gọi 2 lần | Kết quả như nhau, KP chỉ cộng 1 lần | | Integration | ⬜ |
| TC-VS3-13 | Chọn từ ưu tiên | Có từ chưa sưu tầm và từ đã sưu tầm | Từ chưa sưu tầm được chọn trước; từ vừa ôn < 10 phút bị bỏ | | Unit | ⬜ |
| TC-VS3-14 | Optimistic Locking | Hai `complete` song song | Không mất KP / không cộng đôi | | Integration | ⬜ |
| TC-VS3-15 | Xem mastery offline | Học xong → máy bay | Danh sách từ hiện ✓ và Mastery | | E2E | ⬜ |
| TC-VS3-16 | Mất mạng giữa bài | Tắt mạng câu 5 → bật → Thử lại | Làm tiếp câu 5 | | E2E | ⬜ |

## 6. TUTORIAL THƯ KÝ, DANH HIỆU, TUỲ BIẾN ⬜

| Mã | Mô tả | Kết quả mong đợi | Kết quả thực tế | Loại | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC-TUT-01 | Chuyển bước hợp lệ / sai | `INTRO→PLACEMENT` 200; `INTRO→TOUR` 409 | | Integration | ⬜ |
| TC-TUT-02 | Phiên PLACEMENT | 30 câu, tier 1→2→3, từ 20 từ House Lv1 | | Unit | ⬜ |
| TC-TUT-03 | KP placement | đúng×3 + 100; bước → `LEARN_HOUSE` | | Unit | ⬜ |
| TC-TUT-04 | Học xong ở House | bước → `BUILD_HOUSE` | | Unit | ⬜ |
| TC-TUT-05 | Xây khi thiếu điều kiện | 409 `REQUIREMENTS_NOT_MET` kèm số thiếu | | Integration | ⬜ |
| TC-TUT-06 | Xây đủ điều kiện | Trừ 100 KP, UPGRADING 10 s; `GET /city` sau 10 s → Lv1, bước → `ENTER_HOUSE` | | Integration | ⬜ |
| TC-TUT-07 | `tutorial/complete` sai bước | 409; ở `TOUR` → `DONE` + `NEW_RESIDENT` | | Integration | ⬜ |
| TC-TUT-08 | Làm tiếp sau khi tắt app | Tắt giữa bài PLACEMENT → mở lại đúng câu | | E2E | ⬜ |
| TC-TUT-09 | Toàn bộ tutorial | Xoá dữ liệu → đi hết T0–T7 | | E2E | ⬜ |
| TC-ACH-01 | GOOD_START | 16 từ đúng → có; 15 → không | | Unit | ⬜ |
| TC-ACH-02 | TOP_ENTRANT | < 50 mẫu: 27/30 có, 26/30 không; ≥ 50 mẫu: so phần trăm | | Unit | ⬜ |
| TC-ACH-03 | FLAWLESS / COMBO10 | 30/30; chuỗi 10 câu đúng | | Unit | ⬜ |
| TC-ACH-04 | Đeo danh hiệu | Chưa có → 409; có → HUD hiển thị | | Integration + E2E | ⬜ |
| TC-COS-01 | Đổi ngoại hình | Mã sai category → 400; đúng → lưu | | Integration | ⬜ |
| TC-COS-02 | Mở mẫu tường bằng KP | Thiếu KP → 409; đủ → trừ KP, mở | | Integration | ⬜ |
| TC-UI-01 | Xoay màn hình | Dọc / Ngang / Tự động có hiệu lực ngay và giữ sau khi mở lại | | E2E | ⬜ |
| TC-UI-02 | Tắt hiệu ứng | Chuyển cảnh không còn animation dài | | E2E | ⬜ |

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

**Ghi nhận khi nghiệm thu (chưa phải lỗi chặn):**
- Màn lỗi hiện nguyên văn lỗi kỹ thuật (`failed to connect to /10.0.2.2 …`). Nên thay bằng câu dễ hiểu ở mốc giao diện.
- Trên emulator, bản đồ City mất khoảng 10–15 giây để vẽ khung hình đầu. Cần màn Loading (mốc giao diện) và đo lại trên máy thật (ADR-010).
- Cột `tutorial_completed` chưa có trên PostgreSQL dev: migration viết tay phải chạy thủ công (troubleshooting #9). Từ VS2 đặt `ddl-auto=none` (troubleshooting #10).
