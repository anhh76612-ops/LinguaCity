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
| TC-VS1-06 | Room lưu hồ sơ sau khi gọi API | App + Backend chạy | Mở app lần đầu | Có bản ghi `UserProfileEntity` | Đạt (theo handover §9) | Thủ công | ✅ ⬜ thiếu ảnh minh chứng |
| TC-VS1-07 | Mở lại app giữ cùng UUID | Đã onboard | Tắt/mở app | Cùng UUID, không tạo trùng | Đạt (theo handover §9) | Thủ công | ✅ ⬜ thiếu ảnh minh chứng |
| TC-VS1-08 | Backend không chạy | Tắt Backend | Mở app | Màn hình lỗi, không crash | Đạt (theo handover §9) | Thủ công | ✅ ⬜ thiếu ảnh minh chứng |

## 3. VS1 — COMPLETE TUTORIAL (UC_02) 🟡

Test tự động: `backend/src/test/java/com/linguacity/backend/identity/TutorialTests.java` (7 test, chạy 24/10/2026: 13/13 test Backend đạt).


| Mã | Mô tả | Tiền điều kiện | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Loại | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC-VS1-09 | Hoàn thành tutorial | UUID đã onboard | UUID | 200 `{ tutorialCompleted: true }`, DB = true | Đạt | Unit (`completesTutorialForExistingGuest`) + Integration (`completeEndpointReturnsTutorialCompleted`) | ✅ |
| TC-VS1-10 | UUID chưa onboard | | UUID mới | 404 + `{ message: "User profile not found" }` | Đạt | Unit (`unknownGuestIsReportedAsNotFound`) + Integration (`completeEndpointReturns404WithErrorBodyForUnknownGuest`) | ✅ |
| TC-VS1-11 | Gọi 2 lần (idempotent) | Đã hoàn thành | UUID | Vẫn true, **không** ghi DB lần 2 | Đạt | Unit (`completingTwiceIsIdempotentAndDoesNotSaveAgain`) | ✅ |
| TC-VS1-12 | Thiếu / sai header | | Không header / `not-a-uuid` | 400 + `{ message: "Missing header X-Guest-UUID" }` / `"Invalid X-Guest-UUID"` | Đạt | Integration (`missingGuestHeaderReturns400WithErrorBody`, `malformedGuestUuidReturns400WithErrorBody`) | ✅ |
| TC-VS1-13 | Cột `tutorial_completed` có trong PostgreSQL thật | Chạy `V002__add_tutorial_completed.sql` | | Cột tồn tại, `NOT NULL DEFAULT false` | ⬜ | Thủ công | ⬜ |
| TC-VS1-14 | Room nâng cấp v1 → v2 không mất dữ liệu | App cũ (v1) đã cài, đã onboard | Cài APK mới đè lên | App mở bình thường, hồ sơ cũ còn, `tutorialCompleted = false` | ⬜ | Thủ công | ⬜ |
| TC-VS1-15 | Luồng màn hình lần đầu | Xóa dữ liệu app | Mở app | Onboarding → Tutorial (3 bước) → Home | ⬜ | Thủ công E2E | ⬜ |
| TC-VS1-16 | Luồng màn hình lần sau | Đã hoàn thành tutorial | Tắt/mở app | Onboarding → Home (bỏ qua Tutorial) | ⬜ | Thủ công E2E | ⬜ |
| TC-VS1-17 | Nút Thử lại | Tắt Backend | Mở app → bật Backend → bấm Thử lại | Vào được màn hình tiếp theo | ⬜ | Thủ công E2E | ⬜ |

## 4. VS2 trở đi
⬜ Thêm bảng test case khi bắt đầu Slice (dựa trên Acceptance Criteria trong handover §19).

---

## 5. MINH CHỨNG
Ảnh chụp lưu tại `diagrams/images/test/` với tên `6.x-<ma-test>.png` để khớp số Hình trong báo cáo.
