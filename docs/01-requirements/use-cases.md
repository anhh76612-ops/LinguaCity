# LINGUACITY — MÔ HÌNH HÓA YÊU CẦU (USE CASE)

**Tương ứng báo cáo:** Chương 2 — 2.1 Tác nhân · 2.2 Danh sách chức năng · 2.3 Lược đồ chức năng · 2.4 Đặc tả chức năng
**Nguồn EA:** `diagrams/ea-model/LinguaCity Project Model.eapx` → package `02_Use_Case_Model`
**Quy tắc:** Danh sách UC tổng được lập **trước** (mức tên + 1 dòng). Đặc tả chi tiết (mục 4) chỉ viết **khi bắt đầu Slice tương ứng**.

---

## 1. TÁC NHÂN (ACTORS)

| Tác nhân | Mô tả | Phạm vi |
| :--- | :--- | :--- |
| **Người chơi khách (Guest Player)** | Người học dùng app trên một thiết bị, định danh bằng Guest UUID, không đăng nhập | MVP |
| **Hệ thống Backend (System / Timer)** | Tác nhân thời gian: hoàn tất xây dựng theo Server Time, sinh Knowledge Points thụ động | MVP |
| **Quản trị nội dung (Content Admin)** | Nạp từ vựng, câu hỏi, cấu hình bài thi. Trong MVP thực hiện bằng **SQL seed**, chưa có giao diện | MVP (không có UI) |
| Học sinh / Giáo viên / Quản trị viên | Tài khoản đăng ký, lớp học, giao bài, dashboard web | Future (VS6+) — **không vẽ vào sơ đồ MVP** |

---

## 2. DANH SÁCH USE CASE

| Mã UC | Tên | Tác nhân | Yêu cầu | Slice | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| UC_01 | Onboard User (Khởi tạo người chơi khách) | Guest | FR-USER-01, 02 | VS1 | ✅ Implemented |
| UC_02 | Complete Tutorial (Hoàn thành hướng dẫn) | Guest | FR-USER-04 | VS1 | 🟡 In-Progress |
| UC_03 | Sync Static Content (Tải nội dung học) | Guest, System | FR-SYS-02 | VS2 | ⬜ |
| UC_04 | View Vocabulary & Flashcard | Guest | FR-LEARN-01, 02 | VS2 | ⬜ |
| UC_05 | Take Learning Session (Làm bài học) | Guest | FR-LEARN-03, 04, 05 | VS3 | ⬜ |
| UC_06 | View Exam Center | Guest | FR-EXAM-01 | VS4 | ⬜ |
| UC_07 | Start Exam | Guest | FR-EXAM-02, 04 | VS4 | ⬜ |
| UC_08 | Submit Exam | Guest | FR-EXAM-03 | VS4 | ⬜ |
| UC_09 | View City (Xem thành phố) | Guest | FR-CITY-01, 02 | TS-UNITY / VS5 | ⬜ |
| UC_10 | Upgrade Building | Guest, System | FR-CITY-03, FR-SYS-04 | VS5 | ⬜ |
| UC_11 | Speed Up with Hourglass | Guest | FR-CITY-04 | VS5+ | ⬜ |
| UC_12 | Collect Knowledge Points | Guest, System | FR-CITY-05 | VS5+ | ⬜ |

> ⚠️ Mã UC_02… là **đề xuất mới**. Khi tạo trong EA, dùng đúng các mã này để Traceability khớp.

---

## 3. LƯỢC ĐỒ CHỨC NĂNG (USE CASE DIAGRAM)

- ⬜ Vẽ **Use Case Diagram tổng MVP** trong EA (package `02_Use_Case_Model`), export PNG vào `diagrams/images/use-case-mvp.png` rồi chèn vào đây.
- Sơ đồ VS1 đã có trong EA: *Use Case Diagram - VS1 Guest Onboarding*.

Phác thảo tạm (để vẽ lại trong EA):

```text
                 ┌──────────── LinguaCity (MVP) ─────────────┐
                 │  (UC_01 Onboard User)                     │
                 │  (UC_02 Complete Tutorial)                │
 Guest Player ───┤  (UC_04 View Vocabulary & Flashcard)      │
                 │  (UC_05 Take Learning Session)            │
                 │  (UC_06/07/08 Exam Center, Start, Submit) │
                 │  (UC_09 View City) ──include── (UC_10 Upgrade Building)
                 │  (UC_03 Sync Static Content)              ├─── System / Timer
                 │  (UC_12 Collect Knowledge Points)         │
                 └───────────────────────────────────────────┘
```

---

## 4. ĐẶC TẢ USE CASE

Mẫu bảng đặc tả dùng chung (giống báo cáo mẫu):

| Mục | Nội dung |
| :--- | :--- |
| Mã / Tên | |
| Tác nhân | |
| Mô tả | |
| Tiền điều kiện | |
| Hậu điều kiện | |
| Luồng chính | |
| Luồng thay thế / ngoại lệ | |
| Business Rules | |
| API / Dữ liệu | |

### 4.1. UC_01 — Onboard User ✅

| Mục | Nội dung |
| :--- | :--- |
| **Mã / Tên** | UC_01 — Onboard User (Khởi tạo người chơi khách) |
| **Tác nhân** | Guest Player |
| **Mô tả** | Lần đầu mở app, hệ thống tạo định danh khách và hồ sơ người chơi trên Server mà không cần đăng nhập. Những lần sau dùng lại hồ sơ cũ. |
| **Tiền điều kiện** | App đã cài; thiết bị có mạng; Backend đang chạy. |
| **Hậu điều kiện** | Có đúng một bản ghi `user_profiles` cho UUID; Room lưu `UserProfileEntity`; DataStore lưu UUID. |
| **Luồng chính** | 1. Người chơi mở app → màn hình Onboarding hiển thị loading.<br>2. App đọc Guest UUID từ DataStore; nếu chưa có thì sinh UUID mới và lưu lại (BR-USER-01, 02).<br>3. App gọi `POST /api/v1/users/onboard` với header `X-Guest-UUID`.<br>4. Backend tìm `UserProfile` theo UUID; chưa có thì tạo mới với tài nguyên = 0 (BR-USER-03, 05).<br>5. Backend trả `OnboardUserResponse` (id, knowledgePoints, hourglassCount, blueprintShards).<br>6. App lưu hồ sơ vào Room và báo thành công. |
| **Luồng thay thế** | 4a. UUID đã tồn tại → trả hồ sơ cũ, **không tạo mới, không ghi đè tài nguyên** (BR-USER-04). |
| **Ngoại lệ** | E1. Thiếu header `X-Guest-UUID` → HTTP 400.<br>E2. UUID sai định dạng → HTTP 400.<br>E3. Backend không phản hồi / mất mạng → màn hình hiện "Không thể khởi tạo người chơi." kèm thông báo lỗi. ⬜ Chưa có nút **Thử lại** (cần bổ sung). |
| **Business Rules** | BR-USER-01 … BR-USER-05 (xem `05-implementation/vertical-slices/vs1-vs2-handover.md` §3) |
| **API / Dữ liệu** | `POST /api/v1/users/onboard` · bảng `user_profiles` · Room `UserProfileEntity` · DataStore `GuestIdStore` |
| **Code** | `backend/.../identity/service/UserOnboardingService.java` · `mobile/.../domain/usecase/OnboardUserUseCase.kt` · `presentation/onboarding/*` |

### 4.2. UC_02 — Complete Tutorial 🟡 (viết tiếp khi làm xong)

| Mục | Nội dung |
| :--- | :--- |
| **Mã / Tên** | UC_02 — Complete Tutorial |
| **Tác nhân** | Guest Player |
| **Mô tả** | Sau khi xem xong hướng dẫn lần đầu, hệ thống ghi nhận để không hiển thị lại. |
| **Tiền điều kiện** | UC_01 thành công (đã có `UserProfile`). |
| **Hậu điều kiện** | `user_profiles.tutorial_completed = true`. |
| **Luồng chính** | 1. ⬜ Người chơi đi hết các bước hướng dẫn (nội dung chưa chốt — GDD §3.2).<br>2. App gọi `POST /api/v1/users/me/tutorial/complete` với `X-Guest-UUID`.<br>3. Backend đặt `tutorialCompleted = true`, trả `{ tutorialCompleted: true }`. |
| **Ngoại lệ** | E1. UUID chưa onboard → HTTP 404 `{ message: "User profile not found" }`.<br>E2. Thiếu/sai header → HTTP 400 `{ message: "Missing header X-Guest-UUID" / "Invalid X-Guest-UUID" }`.<br>E3. Mất mạng khi bấm Bắt đầu → hiện lỗi, nút đổi thành **Thử lại**. |
| **Business Rules** | BR-USER-06: Hoàn thành tutorial là thao tác idempotent — gọi nhiều lần vẫn trả `true`, chỉ ghi DB ở lần đầu. |
| **API / Dữ liệu** | `POST /api/v1/users/me/tutorial/complete` · cột `tutorial_completed` (`database/migration/V002`) · Room v2 `UserProfileEntity.tutorialCompleted` (`MIGRATION_1_2`) |
| **Code** | `TutorialService.java` · `CompleteTutorialUseCase.kt` · `presentation/tutorial/*` · `presentation/navigation/AppNavHost.kt` |

### 4.3. UC_03 … UC_12
⬜ Viết khi bắt đầu Slice tương ứng (xem Docs checklist trong `05-implementation/vertical-slices/vs1-vs2-handover.md` §27).
