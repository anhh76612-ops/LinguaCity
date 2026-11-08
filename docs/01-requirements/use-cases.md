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
| UC_02 | Complete Tutorial (Hoàn thành hướng dẫn) | Guest | FR-USER-04, FR-TUT-01..05 | VS1 / Tutorial | ✅ Tutorial thư ký (TC-TUT-01..09); vào nhà 3D + tuỳ biến ở M7/M8 |
| UC_03 | Sync Static Content (Tải nội dung học theo gói) | Guest, System | FR-SYS-02 | VS2 | 🟡 Specified (ADR-012) |
| UC_04 | View Vocabulary & Flashcard | Guest | FR-LEARN-01, 02 | VS2 | 🟡 Specified |
| UC_05 | Take Learning Session (Làm bài học) | Guest | FR-LEARN-03, 04, 05 | VS3 | 🟡 Specified (ADR-013) |
| UC_06 | View Exam Center | Guest | FR-EXAM-01 | VS4 | 🟡 Specified (ADR-015) |
| UC_07 | Start Exam | Guest | FR-EXAM-02, 04 | VS4 | 🟡 Specified (ADR-015) |
| UC_08 | Submit Exam | Guest | FR-EXAM-03 | VS4 | 🟡 Specified (ADR-015) |
| UC_09 | View City (Xem thành phố) | Guest | FR-CITY-01, 02 | TS-UNITY / VS5 | ⬜ |
| UC_10 | Upgrade Building | Guest, System | FR-CITY-03, FR-SYS-04 | VS5 | 🟡 Specified (ADR-015) |
| UC_11 | Speed Up with Hourglass | Guest | FR-CITY-04 | VS5+ | ⬜ |
| UC_12 | Collect Knowledge Points | Guest, System | FR-CITY-05 | VS5+ | ⬜ |
| UC_13 | View & Equip Titles (Xem và đeo danh hiệu) | Guest | FR-ACH-01..03 | VS3+ | 🟡 Specified |
| UC_14 | Customize Avatar & House (Tuỳ biến nhân vật, nhà) | Guest | FR-COS-01..03 | VS3+ | 🟡 Specified |
| UC_15 | Enter Building (Vào công trình) | Guest | FR-CITY-07, FR-UI-04 | VS3+ | 🟡 Specified |
| UC_16 | Main Quests (Nhiệm vụ chính tuyến) | Guest | FR-QUEST-01, 03 | Đợt 2 | 🟡 Specified (ADR-015) |
| UC_17 | Daily Quests (Nhiệm vụ hằng ngày) | Guest, System | FR-QUEST-02, 03 | Đợt 2 | 🟡 Specified (ADR-015) |
| UC_18 | Resolve City Event (Giải sự kiện thành phố) | Guest | FR-CITY-06 | Đợt 2 | 🟡 Specified (ADR-015) |
| UC_19 | Practice (Luyện tập mọi chủ đề) | Guest | FR-PRAC-01..03 | Đợt 2 | 🟡 Specified (ADR-015) |
| UC_20 | Day Streak (Chuỗi ngày) | Guest, System | FR-STREAK-01, 02 | Đợt 2 | 🟡 Specified (ADR-015) |

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
| **Luồng thay thế** | 4a. UUID đã tồn tại → trả hồ sơ cũ, **không tạo mới, không ghi đè tài nguyên** (BR-USER-04).<br>3a. (VS2, 08/11/2026) Mất mạng nhưng Room đã có hồ sơ của UUID này → dùng hồ sơ cache để vào game đọc offline (ADR-004, FR-SYS-03). Chưa có hồ sơ → báo lỗi + Thử lại. |
| **Ngoại lệ** | E1. Thiếu header `X-Guest-UUID` → HTTP 400.<br>E2. UUID sai định dạng → HTTP 400.<br>E3. Backend không phản hồi / mất mạng → màn hình hiện "Không thể khởi tạo người chơi." kèm thông báo lỗi. ⬜ Chưa có nút **Thử lại** (cần bổ sung). |
| **Business Rules** | BR-USER-01 … BR-USER-05 (xem `05-implementation/vertical-slices/vs1-vs2-handover.md` §3) |
| **API / Dữ liệu** | `POST /api/v1/users/onboard` · bảng `user_profiles` · Room `UserProfileEntity` · DataStore `GuestIdStore` |
| **Code** | `backend/.../identity/service/UserOnboardingService.java` · `mobile/.../domain/usecase/OnboardUserUseCase.kt` · `presentation/onboarding/*` |

### 4.2. UC_02 — Complete Tutorial ✅ (bản 3 bước, nghiệm thu 08/11/2026)

> Bản 3 trang bên dưới đã nghiệm thu ở VS1 và **sẽ được thay** bởi §4.2b (tutorial thư ký, ADR-014).

| Mục | Nội dung |
| :--- | :--- |
| **Mã / Tên** | UC_02 — Complete Tutorial |
| **Tác nhân** | Guest Player |
| **Mô tả** | Sau khi xem xong hướng dẫn lần đầu, hệ thống ghi nhận để không hiển thị lại. |
| **Tiền điều kiện** | UC_01 thành công (đã có `UserProfile`). |
| **Hậu điều kiện** | `user_profiles.tutorial_completed = true`. |
| **Luồng chính** | 1. Người chơi đi hết 3 trang hướng dẫn (Học từ vựng → … → Xây thành phố) rồi bấm **Bắt đầu**.<br>2. App gọi `POST /api/v1/users/me/tutorial/complete` với `X-Guest-UUID`.<br>3. Backend đặt `tutorialCompleted = true`, trả `{ tutorialCompleted: true }`. |
| **Ngoại lệ** | E1. UUID chưa onboard → HTTP 404 `{ message: "User profile not found" }`.<br>E2. Thiếu/sai header → HTTP 400 `{ message: "Missing header X-Guest-UUID" / "Invalid X-Guest-UUID" }`.<br>E3. Mất mạng khi bấm Bắt đầu → hiện lỗi, nút đổi thành **Thử lại**. |
| **Business Rules** | BR-USER-06: Hoàn thành tutorial là thao tác idempotent — gọi nhiều lần vẫn trả `true`, chỉ ghi DB ở lần đầu. |
| **API / Dữ liệu** | `POST /api/v1/users/me/tutorial/complete` · cột `tutorial_completed` (`database/migration/V002`) · Room v2 `UserProfileEntity.tutorialCompleted` (`MIGRATION_1_2`) |
| **Code** | `TutorialService.java` · `CompleteTutorialUseCase.kt` · `presentation/tutorial/*` · `presentation/navigation/AppNavHost.kt` |

### 4.2b. UC_02 — Complete Tutorial (bản thư ký, ADR-014) ✅ (M6, 08/11/2026)

| Mục | Nội dung |
| :--- | :--- |
| **Mã / Tên** | UC_02 — Complete Tutorial (tutorial thư ký) |
| **Tác nhân** | Guest Player |
| **Mô tả** | Thư ký Mai dẫn người chơi đi một vòng chơi thật: kiểm tra trình độ → học ở House → xây House Lv1 → vào nhà, chọn ngoại hình → làm quen các chức năng. |
| **Tiền điều kiện** | UC_01 thành công; UC_03 đã tải CORE + `HOUSING:1`. |
| **Hậu điều kiện** | `tutorial_step = DONE`, `tutorial_completed = true`, House Lv1, có `avatar_config` và `house_style`, có danh hiệu `NEW_RESIDENT`. |
| **Luồng chính** | 1. (`INTRO`) Thành phố có 4 lô đất cắm biển "Chưa xây". Mai chào và giới thiệu → `PUT /users/me/tutorial/step {PLACEMENT}`.<br>2. (`PLACEMENT`) `POST /tutorial/placement` → làm 30 câu, độ khó tăng dần, Mai phản hồi sau mỗi câu (UC_05 bước 3–5).<br>3. `complete` → màn kết quả: điểm, số từ sưu tầm, danh hiệu, KP (đúng×3 + 100). Server đặt `LEARN_HOUSE`.<br>4. (`LEARN_HOUSE`) Mai khoanh lô House → avatar đi tới, camera zoom (UC_15) → bảng nhiệm vụ → "Học" → 1 phiên học (UC_05). Server đặt `BUILD_HOUSE`.<br>5. (`BUILD_HOUSE`) Nút "Xây" sáng khi đủ 20/30 từ và 100 KP → `POST /buildings/HOUSING/build` → giàn giáo 10 giây → `GET /city` thấy Lv1. Server đặt `ENTER_HOUSE`.<br>6. (`ENTER_HOUSE`) Mai mời vào nhà → avatar đi vào → nội thất 3D nhà trống. App đặt `CUSTOMIZE`.<br>7. (`CUSTOMIZE`) Chọn ngoại hình (UC_14), rồi chọn tường/sàn. App đặt `TOUR`.<br>8. (`TOUR`) Mai giới thiệu menu nổi (Thẻ từ, Danh hiệu, Hồ sơ, Cài đặt), HUD, cách đeo danh hiệu → `POST /users/me/tutorial/complete`. |
| **Luồng thay thế** | 5a. Chưa đủ 20 từ → Mai gợi ý học thêm một phiên ở House (quay lại bước 4).<br>*. Thoát app ở bất kỳ bước nào → mở lại thì `GET /users/me` trả `tutorialStep`, app tiếp tục đúng bước. Phiên PLACEMENT/LEARNING còn hạn thì làm tiếp. |
| **Ngoại lệ** | E1. Mất mạng giữa bài → giữ màn hình, hiện nút Thử lại (BR-LEARN-07).<br>E2. Chuyển bước sai thứ tự → 409 `INVALID_STEP`, app đọc lại bước từ server. |
| **Business Rules** | BR-TUT-01..05, BR-LEARN-01..08, BR-ACH-01..03 |
| **API / Dữ liệu** | system-design §10.4.3 · `user_profiles.tutorial_step` · `learning_sessions(type=PLACEMENT)` · `user_buildings` |

### 4.3. UC_03 — Sync Static Content (gói theo Level) 🟡

| Mục | Nội dung |
| :--- | :--- |
| **Tác nhân** | Guest Player, System |
| **Mô tả** | Tải nội dung tĩnh từ Backend về Room theo từng gói (CORE + mỗi cặp công trình–Level) để đọc được khi offline. |
| **Tiền điều kiện** | UC_01 thành công. |
| **Hậu điều kiện** | Room có CORE và các gói cần dùng; `content_pack_state` lưu version của từng gói. |
| **Luồng chính** | 1. Mở app hoặc quay lại foreground → SCR-03 hoặc chạy ngầm.<br>2. Gọi `GET /content/manifest`.<br>3. So version với Room; nếu cần thì tải `/content/core`.<br>4. Với mỗi gói cần (Level hiện tại và Level kế của từng công trình) chưa có hoặc đã đổi version → `GET /content/packs/{b}/{l}` → Room `withTransaction`: xoá dòng cũ của gói, `@Upsert` dòng mới, lưu version.<br>5. Vào thành phố. |
| **Ngoại lệ** | E1. Lần đầu, không có mạng (chưa có CORE) → SCR-03 báo cần mạng, có nút Thử lại.<br>E2. Có cache nhưng không có mạng → vào game bằng cache, không báo lỗi.<br>E3. Lỗi giữa chừng một gói → transaction huỷ, gói giữ bản cũ. |
| **Business Rules** | BR-CONTENT-01..08 |
| **API / Dữ liệu** | system-design §10.4.1 · `content_packs` · Room v3 |

### 4.4. UC_04 — View Vocabulary & Flashcard 🟡

| Mục | Nội dung |
| :--- | :--- |
| **Tác nhân** | Guest Player |
| **Mô tả** | Xem danh sách từ theo công trình/Level và lật flashcard (từ, IPA, nghĩa, ví dụ), dùng được cả khi offline. |
| **Tiền điều kiện** | Gói của cặp công trình–Level đã có trong Room. |
| **Luồng chính** | 1. Menu nổi → "Thẻ từ", hoặc "Học từ" trong công trình.<br>2. Chọn công trình và Level → danh sách từ (hiện skeleton trong lúc đọc Room). Từ đã sưu tầm có dấu ✓ và thanh Mastery.<br>3. Chạm một từ → flashcard bay ra (shared element). Lật thẻ để xem nghĩa và ví dụ, vuốt sang từ kế. |
| **Ngoại lệ** | E1. Gói chưa tải (Level chưa mở) → hiện "Mở khoá khi xây Lv…". |
| **Business Rules** | BR-CONTENT-02, BR-CONTENT-06, BR-LEARN-06 |
| **API / Dữ liệu** | Chỉ đọc Room: `VocabularyEntity`, `UserVocabProgressEntity` |

### 4.5. UC_05 — Take Learning Session 🟡

| Mục | Nội dung |
| :--- | :--- |
| **Tác nhân** | Guest Player |
| **Mô tả** | Làm một phiên 30 câu (20 từ; ADR-015, trước đó 20 câu / 10 từ) tại một công trình. Server chấm từng câu, cập nhật Mastery, ghi nhận từ sưu tầm được, và cộng KP khi kết thúc phiên. |
| **Tiền điều kiện** | Đang online; công trình có từ ở Level đang học. |
| **Hậu điều kiện** | `user_vocab_progress` được cập nhật; phiên chuyển `COMPLETED`; KP được cộng; có thể nhận danh hiệu. |
| **Luồng chính** | 1. Trong công trình bấm "Bắt đầu bài học" → `POST /learning/sessions`.<br>2. Hiện câu hỏi (trắc nghiệm hoặc điền từ).<br>3. Người chơi trả lời → `POST …/answer`.<br>4. Hiện kết quả ngay: Mai phản hồi tự nhiên, đáp án đúng, giải thích, Mastery mới. Có hiệu ứng "thẻ mới" khi vừa sưu tầm được từ.<br>5. Lặp lại tới câu cuối (30).<br>6. `POST …/complete` → SCR-09: điểm, KP (cơ bản + thưởng + hệ số theo ngày), tiến độ sưu tầm, danh hiệu mới. |
| **Luồng thay thế** | 1a. Đang có phiên ACTIVE còn hạn → server trả lại phiên đó, app nhảy tới câu chưa nộp. |
| **Ngoại lệ** | E1. Mất mạng → giữ nguyên câu, hiện nút Thử lại.<br>E2. Quá 30 phút → 410: phiên hết hạn, Mastery của các câu đã nộp được giữ, không có KP, mời bắt đầu phiên mới.<br>E3. Nộp lại câu đã nộp → 409; app bỏ qua và đọc lại phiên. |
| **Business Rules** | BR-LEARN-01..08, BR-ACH-01..03 |
| **API / Dữ liệu** | system-design §10.4.2 · `learning_sessions`, `learning_session_items`, `user_vocab_progress`, `user_profiles` |

### 4.6. UC_13 — View & Equip Titles 🟡
- **Luồng:**
  1. Menu nổi → Danh hiệu. Danh hiệu xếp theo lưới Dễ / Khó / Ẩn: chưa có thì mờ, danh hiệu Ẩn chưa có thì hiện "???".
  2. Chạm danh hiệu đã có → "Đeo" → `PUT /users/me/equipped-title`.
  3. Danh hiệu đang đeo hiện trên HUD và trong Hồ sơ.
- **Business Rules:** BR-ACH-01..04.

### 4.7. UC_14 — Customize Avatar & House 🟡
> M8 đã cài: API + màn SCR-20 (vào từ HUD 🎨 hoặc "Trang trí" trong nhà). Chưa có: lối vào từ bước tutorial `CUSTOMIZE` và từ Hồ sơ (M9).

- **Luồng:**
  1. Ở tutorial (bước `CUSTOMIZE`) hoặc trong Hồ sơ: chọn màu da, kiểu tóc, màu tóc, màu áo, màu quần, phụ kiện. Xem trước bằng mô hình 3D xoay → `PUT /users/me/avatar`.
  2. Trong nhà: chọn tường và sàn. Món đang khoá hiện giá KP hoặc danh hiệu cần có → mua bằng `POST /cosmetics/{code}/unlock` → lưu bằng `PUT /users/me/house-style`.
- **Business Rules:** BR-COS-01..03.

### 4.8. UC_15 — Enter Building 🟡
> M7 đã cài: bước 1, 2 (House, trạm nhiệm vụ là bảng Compose đè lên cảnh 3D; trạm chạm được trong cảnh để sau), 5. Bước 3–4 vẫn dùng thẻ công trình (SCR-05).

- **Luồng:**
  1. Chạm công trình → avatar người chơi đi bộ tới cửa → camera bay vào (city-web `enterBuilding`).
  2. House Lv ≥ 1: cảnh nội thất 3D với các "trạm nhiệm vụ" chạm được (Học, Bài học, Thẻ từ, Trang trí).
  3. Công trình khác: màn Compose "bên trong" có cùng các nhiệm vụ.
  4. Lô đất Lv0: bảng nhiệm vụ "Học để xây" kèm nút Xây.
  5. "Ra ngoài" → camera lùi về thành phố (`exitBuilding`).

### 4.9. UC_06 — View Exam Center 🟡 (ADR-015)

| Mục | Nội dung |
| :--- | :--- |
| **Tác nhân** | Guest Player |
| **Mô tả** | Xem bài thi lên level của một công trình, kèm từng điều kiện đã đủ hay còn thiếu. |
| **Tiền điều kiện** | Đang online. Công trình đã đạt Lv ≥ 1 và chưa tối đa. |
| **Luồng chính** | 1. Mở thẻ công trình, bấm "Thi lên Lv*n+1*". App gọi `GET /exams?building=` rồi mở SCR-10.<br>2. SCR-10 hiện checklist, mỗi điều kiện kèm ✓ hoặc số còn thiếu:<br>• từ đã sưu tầm của công trình (ví dụ 38/45)<br>• KP (phí thi)<br>• mảnh<br>• công trình điều kiện (ví dụ School Lv1)<br>3. Đủ hết thì nút "Bắt đầu thi" sáng lên (UC_07). |
| **Luồng thay thế** | 2a. Đang có lượt dở → nút "Làm tiếp".<br>2b. Đã đậu → hiện "Đã có bản vẽ" và nút "Nâng cấp" (UC_10). |
| **Ngoại lệ** | E1. Mất mạng → thông báo cần mạng, nút Thử lại. |
| **Business Rules** | BR-EXAM-01, 02, 07 |

### 4.10. UC_07 — Start Exam 🟡

| Mục | Nội dung |
| :--- | :--- |
| **Tác nhân** | Guest Player |
| **Tiền điều kiện** | Đủ mọi điều kiện của UC_06. |
| **Hậu điều kiện** | Đã trừ phí. Có lượt thi `IN_PROGRESS` với đề đã chốt (snapshot). |
| **Luồng chính** | 1. Bấm "Bắt đầu thi" → hộp xác nhận phí ("Dùng 200 KP?").<br>2. Đồng ý → `POST /exams/{code}/start` (201).<br>3. SCR-11 hiện lần lượt từng câu. Câu trả lời giữ trong máy, chưa gửi lên.<br>4. Người chơi có thể quay lại câu trước, và xem lại toàn bộ trước khi nộp (UC_08). |
| **Luồng thay thế** | 2a. Đã có lượt dở → server trả lại lượt đó (200), không trừ phí lần nữa (FR-EXAM-04). |
| **Ngoại lệ** | E1. Thiếu điều kiện → 409 `REQUIREMENTS_NOT_MET`, app hiện điều kiện còn thiếu.<br>E2. Đã đậu → 409 `ALREADY_PASSED`. |
| **Business Rules** | BR-EXAM-01..04 |

### 4.11. UC_08 — Submit Exam 🟡

| Mục | Nội dung |
| :--- | :--- |
| **Tác nhân** | Guest Player, System |
| **Hậu điều kiện** | Lượt thi chuyển PASSED / FAILED. Mastery của các từ TARGET được cập nhật. Nếu đậu thì có thêm 1 bản vẽ. |
| **Luồng chính** | 1. Ở màn xem lại, bấm "Nộp bài" → `POST /exam-attempts/{id}/submit` gửi mọi câu trả lời.<br>2. Server chấm và áp Mastery.<br>3. SCR-12 hiện:<br>• điểm và % so với điểm đậu<br>• từng câu: đáp án của mình, đáp án đúng, giải thích<br>• nếu đậu: hiệu ứng nhận bản vẽ, nút "Nâng cấp ngay"<br>• nếu trượt: lời động viên của Mai và nút "Học thêm". |
| **Ngoại lệ** | E1. Thiếu câu → 409 `INCOMPLETE` với `missingOrders`, app nhảy tới câu đầu tiên còn trống.<br>E2. Nộp lại → 409 `ATTEMPT_CLOSED`, app đọc lại kết quả.<br>E3. Mất mạng → giữ nguyên câu trả lời trong máy, nút Thử lại. |
| **Business Rules** | BR-EXAM-04..07, BR-LEARN-03, 04 |

### 4.12. UC_10 — Upgrade Building 🟡

| Mục | Nội dung |
| :--- | :--- |
| **Tác nhân** | Guest Player, System |
| **Tiền điều kiện** | Công trình đang IDLE và chưa tối đa. Có bản vẽ của level kế. |
| **Luồng chính** | 1. Thẻ công trình hiện điều kiện: bản vẽ ✓, mảnh 2/3, KP 300.<br>2. Bấm "Nâng cấp" → `POST /buildings/{code}/build`.<br>3. Server trừ 1 bản vẽ, mảnh và KP, rồi chuyển UPGRADING theo giờ server.<br>4. Bản đồ hiện giàn giáo kèm %. Khi tới `finishAt`, lần `GET /city` sau sẽ hoàn tất (FR-SYS-04). |
| **Ngoại lệ** | E1. Thiếu bản vẽ → 409 `NEEDS_BLUEPRINT`, app gợi ý đi thi (UC_06).<br>E2. Thiếu mảnh hoặc KP → 409 `REQUIREMENTS_NOT_MET`, app gợi ý nhiệm vụ / sự kiện.<br>E3. Đang xây → 409 `BUSY`. |
| **Business Rules** | BR-UPG-01..03 |

### 4.13. UC_16 — Main Quests (Nhiệm vụ chính tuyến) 🟡

1. Menu nổi → Nhiệm vụ (SCR-23), tab Chính tuyến.
2. Màn hiện các bước đã xong và bước hiện tại, kèm tiến độ (ví dụ "Xây School Lv1: 0/1").
3. Bước đã đạt → nút "Nhận" → `POST /quests/{code}/claim` → nhận KP và mảnh, bước kế tiếp mở ra.

**Business Rules:** BR-QUEST-01, 02, 05.

### 4.14. UC_17 — Daily Quests (Nhiệm vụ hằng ngày) 🟡

1. Tab Hằng ngày có 3 nhiệm vụ của hôm nay, kèm tiến độ và giờ làm mới (0h giờ Việt Nam).
2. Làm việc tương ứng trong game: học bài, giải sự kiện… Tiến độ tự cộng trên server.
3. Nhiệm vụ xong → "Nhận". Xong cả 3 → nhận thêm "Thưởng hôm nay".

**Business Rules:** BR-QUEST-03..05, BR-STREAK-01.

### 4.15. UC_18 — Resolve City Event (Giải sự kiện thành phố) 🟡

1. Dấu "!" trên một công trình → chạm vào → SCR-25: thẻ cư dân và tình huống, ví dụ "Bà Lan cần đọc giúp hợp đồng thuê nhà".
2. Bấm "Giúp" → `POST /events/{id}/start` → làm 5 câu về các từ đã sưu tầm, dùng màn câu hỏi chung.
3. `complete` → đúng ≥ 4/5 thì nhận mảnh + KP, dấu "!" biến mất. Trượt thì sự kiện vẫn còn.

**Business Rules:** BR-EVT-01..04.

### 4.16. UC_19 — Practice (Luyện tập mọi chủ đề) 🟡

1. Menu nổi → Luyện tập (SCR-24) → chọn:
   - chế độ Ôn (chỉ từ đã học) hoặc Hỗn hợp (thêm từ mới);
   - chủ đề (một, nhiều, hoặc tất cả);
   - cỡ bài 10 hoặc 20 từ.
2. Màn hiện số lượt còn lại hôm nay và số từ mới còn được học.
3. "Bắt đầu" → `POST /learning/practice` → làm bài bằng màn bài học (SCR-08/09).

**Ngoại lệ:** hết lượt → 409 `DAILY_LIMIT`, app hiện giờ làm mới.

**Business Rules:** BR-PRAC-01..04.

### 4.17. UC_20 — Day Streak (Chuỗi ngày) 🟡

1. HUD có chip 🔥*N*. Chạm vào → SCR-23, khu chuỗi gồm:
   - lịch 7 ngày;
   - hôm nay đã "học bài" và "xong nhiệm vụ" chưa.
2. Đạt mốc 3 / 10 / 20 / 30 ngày → nhận danh hiệu chuỗi.
3. Bỏ một ngày → chuỗi về 0, danh hiệu chuỗi bị thu hồi. Màn Danh hiệu ghi rõ "mất khi đứt chuỗi".

**Business Rules:** BR-STREAK-01..03, BR-ACH-05.

### 4.18. UC_09, UC_11, UC_12
⬜ UC_09 (xem thành phố) đã có ở M5 nhưng chưa viết đặc tả. UC_11 (Hourglass) và UC_12 (thu KP từ Housing) để sau MVP.

---

## 5. BUSINESS RULES (VS2, VS3, Tutorial, Danh hiệu, Tuỳ biến, Đợt 2)

> BR-USER-01..06: xem handover §3 và mục 4.2 ở trên.

| Mã | Quy tắc |
| :--- | :--- |
| BR-CONTENT-01 | Nội dung tĩnh do server quản lý; Mobile chỉ đọc. |
| BR-CONTENT-02 | Nội dung được cache trong Room để đọc offline (flashcard, danh sách từ). |
| BR-CONTENT-03 | Nội dung chia gói: CORE + mỗi cặp (công trình, Level). Mỗi gói có `version`. |
| BR-CONTENT-04 | App chỉ tải gói cần dùng (Level hiện tại và Level kế) khi chưa có hoặc đã đổi version. Tải kiểu pull khi mở app hoặc quay lại foreground. |
| BR-CONTENT-05 | Cập nhật gói là nguyên tử (`withTransaction`): xoá dòng cũ của gói rồi `@Upsert`; cùng ID thì không tạo bản ghi trùng. |
| BR-CONTENT-06 | Offline chỉ được đọc; không có Push Sync. |
| BR-CONTENT-07 | `answer`, `accepted_answers` và `explanation` không bao giờ xuống app trước khi nộp câu (NFR-01). |
| BR-CONTENT-08 | Lần đầu mở app mà không có mạng thì không vào được game (cần onboarding và CORE). |
| BR-LEARN-01 | Một phiên = 20 từ / 30 câu: 20 câu READING trắc nghiệm, 10 câu WRITING điền từ cho 10 từ ưu tiên nhất (ADR-015; trước đó 10 từ × 2 câu). Phiên PLACEMENT = 30 câu từ 20 từ, tier tăng dần 1→3. |
| BR-LEARN-02 | Mỗi câu trong phiên chỉ nộp được một lần. |
| BR-LEARN-03 | Mastery: đúng +1, sai −1, kẹp trong `0..max_mastery(độ khó)`; chỉ tính cho từ TARGET. |
| BR-LEARN-04 | Một từ "đã sưu tầm" khi được trả lời đúng lần đầu và không bao giờ mất trạng thái này. |
| BR-LEARN-05 | KP cuối phiên = đúng×5 + (tỉ lệ đúng ≥80% thì +20). Từ phiên thứ 6 trong ngày (múi giờ Asia/Ho_Chi_Minh), KP nhân 0.2. Phiên PLACEMENT: đúng×3 + 100. |
| BR-LEARN-06 | Xem flashcard không làm thay đổi Mastery hay trạng thái sưu tầm. |
| BR-LEARN-07 | Phiên hết hạn sau 30 phút (PLACEMENT: 24 giờ). Hết hạn thì giữ Mastery đã nộp nhưng không có KP. |
| BR-LEARN-08 | Thứ tự chọn từ: chưa sưu tầm → Mastery thấp; bỏ qua từ vừa ôn trong 10 phút. Level đang học = level công trình + 1. |
| BR-TUT-01 | Tutorial lưu `tutorial_step` trên server; không có nút bỏ qua. |
| BR-TUT-02 | App chỉ được tự chuyển `INTRO→PLACEMENT`, `ENTER_HOUSE→CUSTOMIZE`, `CUSTOMIZE→TOUR`. Các bước còn lại do server chuyển. |
| BR-TUT-03 | Xây Lv0→Lv1 cần đủ `required_collected` từ Level 1 đã sưu tầm và đủ `knowledge_cost` KP; không cần bài thi. |
| BR-TUT-04 | Tutorial luôn bắt học 1 phiên ở House trước khi xây, kể cả khi bài trình độ đã đủ từ. |
| BR-TUT-05 | `tutorial/complete` chỉ thành công ở bước `TOUR`, hoặc khi đã `DONE` (idempotent). |
| BR-ACH-01 | Danh hiệu do server xét và trao; mỗi danh hiệu một lần, không thu hồi (trừ danh hiệu `revocable`, BR-ACH-05). |
| BR-ACH-02 | Danh hiệu Ẩn không lộ điều kiện cho tới khi đạt. |
| BR-ACH-03 | TOP_ENTRANT so với ≥ 50 bài PLACEMENT trước đó; chưa đủ mẫu thì cần ≥ 27/30. |
| BR-ACH-04 | Chỉ đeo được danh hiệu đã có; đeo tối đa một danh hiệu. |
| BR-COS-01 | Ngoại hình nhân vật miễn phí và đổi được bất cứ lúc nào. |
| BR-COS-02 | Tường và sàn: mỗi loại có 2 mẫu FREE; mẫu khác mở bằng KP (server kiểm tra và trừ ngay) hoặc khi có danh hiệu. |
| BR-COS-03 | Cấu hình ngoại hình và nhà lưu trên server (Player State). |
| BR-ACH-05 | Danh hiệu `revocable` (danh hiệu chuỗi) bị thu hồi khi điều kiện không còn đúng; nếu đang đeo thì gỡ. Đạt lại thì được trao lại. |
| BR-LEARN-09 | Pool từ của bài học gồm mọi từ **chưa sưu tầm** ở level ≤ level học (= level công trình + 1), cộng từ đã sưu tầm để ôn. Không có ngõ cụt khi xây lúc chưa sưu tầm đủ (ADR-015 §1). |
| BR-EXAM-01 | Điều kiện thi: số từ đã sưu tầm *thuộc công trình* (gói level 1..target), KP, mảnh, và công trình điều kiện (`required_building_*`). |
| BR-EXAM-02 | KP và mảnh là phí thi, trừ khi bắt đầu (`@Transactional`); trượt không hoàn. |
| BR-EXAM-03 | Mỗi người chơi có tối đa một lượt `IN_PROGRESS` cho mỗi bài thi; `start` lần nữa trả lại lượt đó, không trừ phí. |
| BR-EXAM-04 | Đề là snapshot `question_count` câu rút ngẫu nhiên từ pool; không gửi đáp án xuống app trước khi nộp (NFR-01). |
| BR-EXAM-05 | Nộp một lần cho mọi câu. Server chấm và áp Mastery ±1 cho từ TARGET. Đậu khi đúng ≥ `pass_percent` % (mặc định 80). |
| BR-EXAM-06 | Đậu → +1 bản vẽ (công trình, target_level). Không giới hạn số lần thi lại. |
| BR-EXAM-07 | Đã có bản vẽ còn dùng được, hoặc công trình đã ≥ target_level, thì không thi được (`ALREADY_PASSED`). |
| BR-UPG-01 | Nâng Lv*n*→*n+1* (*n* ≥ 1) cần 1 bản vẽ (công trình, *n+1*) + `required_shards` mảnh + `knowledge_cost` KP; trừ cả ba khi bắt đầu. |
| BR-UPG-02 | Thời gian xây theo giờ server; hoàn tất lười khi đọc (FR-SYS-04). Đang xây thì không nâng tiếp. |
| BR-UPG-03 | Lv0→1 giữ luật cũ (từ đã sưu tầm + KP, không cần bản vẽ, BR-TUT-03). |
| BR-QUEST-01 | Chính tuyến là chuỗi bước có thứ tự (`prerequisite_code`). Chỉ bước hiện tại nhận được; tiến độ suy ra từ trạng thái. |
| BR-QUEST-02 | Mỗi nhiệm vụ chỉ nhận thưởng một lần (MAIN) hoặc một lần mỗi ngày (DAILY). |
| BR-QUEST-03 | Mỗi ngày (giờ Việt Nam) có `daily-quest-count` nhiệm vụ hằng ngày, chọn cố định theo (người chơi, ngày). Tiến độ đếm trên server. |
| BR-QUEST-04 | Xong mọi nhiệm vụ hằng ngày của hôm nay thì được nhận `DAILY_BONUS`. |
| BR-QUEST-05 | Mảnh (`blueprint_shards`) chỉ đến từ nhiệm vụ và sự kiện. |
| BR-EVT-01 | Sự kiện chỉ xuất hiện sau tutorial và khi đã sưu tầm ≥ `event-min-collected` từ; tối đa `event-per-day` sự kiện mỗi ngày. |
| BR-EVT-02 | Câu hỏi sự kiện chỉ lấy từ đã sưu tầm. Không có KP theo câu, nhưng vẫn có Mastery. |
| BR-EVT-03 | Đúng ≥ `event-pass-correct`/`event-questions` → +mảnh, +KP, sự kiện RESOLVED. Trượt thì sự kiện vẫn mở. |
| BR-EVT-04 | Sự kiện chưa giải không cộng dồn sang ngày sau (mỗi ngày bộ sự kiện mới). |
| BR-PRAC-01 | Ôn: chỉ từ đã sưu tầm, `practice-review-per-day` lượt/ngày. Hỗn hợp: thêm từ mới, `practice-mixed-per-day` lượt/ngày. |
| BR-PRAC-02 | Tối đa `practice-new-words-per-day` từ mới mỗi ngày qua luyện tập. |
| BR-PRAC-03 | Mỗi từ chỉ được thưởng KP và đổi Mastery một lần mỗi ngày qua luyện tập (`last_rewarded_on`). |
| BR-PRAC-04 | Từ mới trả lời đúng trong luyện tập vẫn được sưu tầm và tính cho điều kiện thi của công trình chứa từ đó. |
| BR-STREAK-01 | Một ngày được tính vào chuỗi khi có ≥ 1 phiên LEARNING/PRACTICE hoàn thành **và** ≥ 1 nhiệm vụ hằng ngày hoàn thành. |
| BR-STREAK-02 | Hôm qua được tính → chuỗi +1; không → chuỗi = 1. Ngày cuối được tính trước hôm qua → chuỗi = 0. |
| BR-STREAK-03 | Danh hiệu chuỗi (mốc trong bảng `achievements`) trao khi đạt mốc, thu hồi khi đứt chuỗi. |
