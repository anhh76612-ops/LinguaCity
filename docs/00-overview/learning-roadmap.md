# LINGUACITY — LỘ TRÌNH VỪA HỌC VỪA LÀM (VIỆC CẦN LÀM TRƯỚC KHI CODE TIẾP)

**Cập nhật:** 20/10/2026
**Cách dùng:** Làm theo thứ tự A → D. Mỗi việc có: **Làm gì · File · Học được gì · Xong khi**. Đánh dấu `[x]` khi xong.
**Nguyên tắc tài liệu:** khung toàn cục làm trước (nhóm B), chi tiết viết theo Slice (Docs checklist — handover §27).

---

## A. ĐÓNG VS1 (code + docs) — làm ngay, vì Tutorial đang dở

### [~] A1. Thêm migration cho cột `tutorial_completed` — file `V002` đã có (24/10), **bạn còn phải chạy trên PostgreSQL local**
- **Làm gì:** Tạo `database/migration/V002__add_tutorial_completed.sql` (`ALTER TABLE user_profiles ADD COLUMN tutorial_completed BOOLEAN NOT NULL DEFAULT FALSE;`). Cân nhắc thêm `nullable = false` cho `@Column` trong `UserProfile.java` để Entity khớp DB.
- **Học được gì:** Vì sao `ddl-auto=update` làm Entity và file SQL lệch nhau (schema drift); vì sao dự án thật dùng Flyway/Liquibase.
- **Xong khi:** Chạy SQL trên PostgreSQL local, cột tồn tại; TC-VS1-13 đạt.

### [x] A2. Viết test cho Tutorial (TC-VS1-09 → 12) — xong 24/10, 13/13 test đạt
- **Làm gì:** Thêm test vào `backend/src/test/.../identity/` theo mẫu `UserOnboardingTests.java`: thành công, UUID chưa onboard → 404, gọi 2 lần, thiếu/sai header → 400.
- **Học được gì:** Mockito cho Service, MockMvc cho Controller, `@RestControllerAdvice` (`ApiExceptionHandler`) trả lỗi thống nhất.
- **Xong khi:** `.\backend\gradlew.bat -p backend test` xanh; cập nhật cột "Kết quả thực tế" trong `06-testing/test-plan.md`.

### [~] A3. Nối Tutorial và điều hướng phía Android — code xong 24/10, **bạn còn phải chạy TC-VS1-14 → 17 trên Emulator**
- **Làm gì:** Dùng `CompleteTutorialUseCase` từ một ViewModel; thay callback rỗng trong `MainActivity` bằng Navigation Type-Safe (Onboarding → Tutorial → màn hình tạm "Home"). Thêm nút **Thử lại** cho màn hình lỗi Onboarding.
- **Học được gì:** Compose Navigation Type-Safe, MVI (thêm `Intent` mới), cách giữ logic trong ViewModel thay vì Activity.
- **Xong khi:** Mở app lần đầu thấy Tutorial; lần sau bỏ qua Tutorial; mất mạng có nút Thử lại.

### [ ] A4. Cập nhật docs của VS1
- **Làm gì:**
  - Thêm `POST /api/v1/users/me/tutorial/complete` vào API Contract `03-architecture/system-design.md` §7.2 (theo mẫu §7.2.1).
  - Hoàn thiện đặc tả UC_02 trong `01-requirements/use-cases.md`, ghi BR-USER-06 vào handover §3.
  - Chụp ảnh minh chứng TC-VS1-06/07/08 và màn hình SCR-01 → `diagrams/images/test/`, `diagrams/images/ui/`.
- **Học được gì:** Viết API Contract và đặc tả UC — đúng phần chiếm nhiều trang nhất trong báo cáo mẫu.
- **Xong khi:** Docs checklist (handover §27) của VS1 tick đủ.

### [ ] A5. Đồng bộ EA với mã mới
- **Làm gì:** Trong EA: đổi `REQ_01` → `FR-USER-01/02`, thêm `UC_02 Complete Tutorial`, kiểm tra Traceability theo `system-design.md` §8.2 (bản v3.1). Đổi Status UC_01 → `Verified` khi A1–A4 xong.
- **Học được gì:** Traceability từ yêu cầu tới code.
- **Xong khi:** Ma trận trong EA khớp §8.2.

### [ ] A6. Commit
- **Làm gì:** Commit phần Tutorial (code) và phần sắp xếp docs thành **2 commit riêng** để lịch sử dễ đọc.
- **Xong khi:** `git status` sạch.

---

## B. DỰNG KHUNG TOÀN CỤC (docs) — làm một lần, trước VS2

### [ ] B1. Khảo sát sản phẩm tương tự
- **Làm gì:** Điền `01-requirements/market-survey.md`: dùng thử Duolingo, Quizlet, 1 app TOEIC, 1 game xây thành phố; chụp hình; (tùy chọn) Google Form 5–10 câu cho 20–30 người.
- **Học được gì:** Lập luận "sản phẩm của mình khác gì" — câu hỏi chắc chắn gặp khi bảo vệ.
- **Xong khi:** Có bảng so sánh và 3–5 kết luận.

### [ ] B2. Hoàn thiện Phần mở đầu
- **Làm gì:** Điền các mục ⬜ trong `00-overview/project-overview.md` (đối tượng người dùng, lý do cá nhân), dùng số liệu từ B1.
- **Xong khi:** Không còn ⬜ ở mục 1–4.

### [ ] B3. Xác nhận yêu cầu phi chức năng
- **Làm gì:** Duyệt các con số NFR-04 → NFR-08 trong `01-requirements/requirements-catalog.md` (3 giây, 500 ms, 30 FPS, 150 MB); sửa nếu thấy không hợp lý.
- **Xong khi:** Bỏ dòng ghi chú "mục tiêu đề xuất" ở cuối file.

### [ ] B4. Vẽ Use Case Diagram tổng MVP trong EA
- **Làm gì:** Theo danh sách UC_01 → UC_12 trong `use-cases.md` §2; export PNG vào `diagrams/images/use-case-mvp.png`.
- **Học được gì:** include/extend, ranh giới hệ thống, tách actor System/Timer.
- **Xong khi:** Ảnh được chèn vào `use-cases.md` §3.

### [ ] B5. Chốt các quyết định GDD ảnh hưởng tới Unity
- **Làm gì:** Trong `02-game-design/gdd.md`: chọn góc nhìn (2D top-down / isometric / 3D low-poly), nguồn asset, Tutorial chạy ở Kotlin hay Unity, Chi tiết công trình là màn Compose hay overlay Unity.
- **Học được gì:** Tách "thiết kế game" khỏi "yêu cầu hệ thống".
- **Xong khi:** GDD §3.2, §5, §6.2 không còn ⬜ ở các mục này.

### [ ] B6. Duyệt sơ đồ chuyển màn hình
- **Làm gì:** Xem `04-ui/screen-catalog.md` §2; sửa luồng nếu muốn khác. (Tùy chọn) phác wireframe giấy/Figma cho SCR-04 City View.
- **Xong khi:** Sơ đồ được chốt; vẽ lại trong EA hoặc draw.io nếu cần.

---

## C. CHUẨN BỊ UNITY — làm song song với VS2

### [ ] C1. Cài đặt và học nền tảng
- **Làm gì:** Cài Unity Hub + một bản **Unity LTS** có **Android Build Support** (SDK/NDK/OpenJDK). Học Unity Essentials và C# cơ bản (MonoBehaviour, Scene, Prefab, Input chạm, Sprite/Tilemap hoặc 3D tùy B5).
- **Học được gì:** Nền tảng Unity đủ để làm Tech Spike.
- **Xong khi:** Build được một scene trống ra APK chạy trên Emulator.

### [ ] C2. Tạo project `unity/` trong repo
- **Làm gì:** Tạo project Unity tại `LinguaCity/unity/`; thêm vào `.gitignore` gốc: `unity/Library/`, `unity/Temp/`, `unity/Logs/`, `unity/Build/`, `unity/UserSettings/`.
- **Xong khi:** `git status` chỉ thấy `Assets/`, `Packages/`, `ProjectSettings/`.

### [ ] C3. Chọn thời điểm làm Tech Spike TS-UNITY
- **Làm gì:** Quyết định làm ngay sau VS2 (biết sớm rủi ro) hay sau VS4 (theo thứ tự cũ). Ghi vào handover §21.
- **Gợi ý:** làm sớm — nếu Unity không khả thi, bạn đổi hướng khi chưa tốn công vẽ thành phố.
- **Xong khi:** Có ngày dự kiến; tiêu chí đạt theo `adr/ADR-009-unity-as-library.md`.

---

## D. TRƯỚC KHI CODE VS2 (Static Content) — "bản vẽ" của Slice

### [ ] D1. Business Rules VS2
- **Làm gì:** Chốt các BR dự kiến ở handover §13 (đổi từ "dự kiến" sang chính thức).

### [ ] D2. Đặc tả UC_03, UC_04
- **Làm gì:** Viết bảng đặc tả trong `use-cases.md` §4 theo mẫu UC_01.

### [ ] D3. Wireframe SCR-03, SCR-06, SCR-07
- **Làm gì:** Phác wireframe, điền bảng thành phần trong `04-ui/screen-catalog.md`.

### [ ] D4. API Contract + bảng DB VS2
- **Làm gì:** Kiểm tra lại `system-design.md` Chương 5, 7 cho `themes`, `buildings`, `vocabularies`; viết migration `V003__…` (và các file tiếp theo).

Sau D1–D4 → bắt đầu code VS2 theo handover §14–§18, cuối Slice làm Docs checklist §27.

---

## Tóm tắt thứ tự

```text
A1 → A2 → A3 → A4 → A5 → A6      (đóng VS1)
B1 … B6                          (khung báo cáo — có thể xen kẽ với C)
C1 → C2 → C3                     (Unity)
D1 → D4 → code VS2               (Slice tiếp theo)
```
