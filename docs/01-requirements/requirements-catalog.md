# LINGUACITY — DANH MỤC YÊU CẦU (REQUIREMENTS CATALOG)

**Tương ứng báo cáo:** Chương 1.3 — Xác định yêu cầu (1.3.1 Yêu cầu chức năng nghiệp vụ · 1.3.2 Yêu cầu chức năng hệ thống · 1.3.3 Yêu cầu phi chức năng)
**Nguồn:** [srs-mvp.md](srs-mvp.md), [GDD](../02-game-design/gdd.md), các ADR
**Trạng thái:** 🟡 Khung đã có mã số — cột "Slice" cho biết yêu cầu được đặc tả chi tiết ở Vertical Slice nào

> **Cách dùng:** Mỗi yêu cầu có một mã cố định. Mã này được dùng xuyên suốt: Use Case → EA (Requirement Model) → API → Test case. Khi làm một Slice, đổi trạng thái của yêu cầu tương ứng.
> **Ký hiệu trạng thái:** ⬜ Proposed · 🟡 In-Progress · ✅ Implemented · ☑️ Verified

---

## 1. YÊU CẦU CHỨC NĂNG NGHIỆP VỤ

### Bảng 1.1: Người chơi — Định danh & Khởi tạo (`FR-USER`)

| Mã | Yêu cầu | Mô tả ngắn | Slice | Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| FR-USER-01 | Vào game không cần đăng nhập | Lần đầu mở app, hệ thống tạo Guest UUID cục bộ và đăng ký với Backend | VS1 | ✅ |
| FR-USER-02 | Giữ tiến trình khi mở lại app | Cùng thiết bị → cùng UUID → cùng hồ sơ, không tạo trùng | VS1 | ✅ |
| FR-USER-03 | Xem tài nguyên hiện có | Knowledge Points, Hourglass, Blueprint Shards | VS1/VS5 | 🟡 (API có, UI chưa) |
| FR-USER-04 | Hoàn thành Tutorial lần đầu | Đánh dấu đã xem hướng dẫn, không hiện lại | VS1 | 🟡 |

### Bảng 1.2: Người chơi — Học tập (`FR-LEARN`)

| Mã | Yêu cầu | Mô tả ngắn | Slice | Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| FR-LEARN-01 | Xem danh sách từ vựng theo công trình/Level | Đọc từ Room, dùng được khi offline | VS2 | ⬜ |
| FR-LEARN-02 | Xem Flashcard | Từ, nghĩa, IPA, câu ví dụ; offline | VS2 | ⬜ |
| FR-LEARN-03 | Tham gia bài học | 20 câu hỏi từ 10 từ vựng; cần online | VS3 | ⬜ |
| FR-LEARN-04 | Nhận kết quả và Knowledge Points | Server chấm, cập nhật Mastery | VS3 | ⬜ |
| FR-LEARN-05 | Xem tiến độ thu thập (Collection Progress) | Ví dụ 32/40 từ của Level 1 | VS3 | ⬜ |

### Bảng 1.3: Người chơi — Thi sát hạch (`FR-EXAM`)

| Mã | Yêu cầu | Mô tả ngắn | Slice | Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| FR-EXAM-01 | Xem danh sách bài thi tại School | Trạng thái khóa/mở theo `ExamRequirement` | VS4 | ⬜ |
| FR-EXAM-02 | Bắt đầu thi | Trừ phí đầu vào, tạo snapshot đề | VS4 | ⬜ |
| FR-EXAM-03 | Nộp bài và nhận kết quả | Server chấm; Pass → Blueprint | VS4 | ⬜ |
| FR-EXAM-04 | Tiếp tục bài thi dang dở | Resume Attempt `IN_PROGRESS` | VS4 | ⬜ |

### Bảng 1.4: Người chơi — Thành phố (`FR-CITY`)

| Mã | Yêu cầu | Mô tả ngắn | Slice | Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| FR-CITY-01 | Xem thành phố với 4 công trình | City View (Unity, đường lui Compose) | TS-UNITY / VS5 | ⬜ |
| FR-CITY-02 | Xem chi tiết công trình | Level hiện tại, chi phí nâng cấp | VS5 | ⬜ |
| FR-CITY-03 | Nâng cấp công trình | Dùng Blueprint + Knowledge Points; chờ thời gian thực | VS5 | ⬜ |
| FR-CITY-04 | Tua nhanh bằng Hourglass | | VS5+ | ⬜ |
| FR-CITY-05 | Thu hoạch Knowledge Points từ Housing | | VS5+ | ⬜ |
| FR-CITY-06 | Giải City Event (Grammar) | Dấu (!) trên bản đồ | Sau MVP | ⬜ |

> **Ngoài MVP (Future Expansion):** Teacher, Student, Class, Assignment, Dashboard Web, Cộng đồng — xem [future-expansion.md](../03-architecture/future-expansion.md). Không đưa vào bảng này cho tới khi bắt đầu VS6.

---

## 2. YÊU CẦU CHỨC NĂNG HỆ THỐNG (`FR-SYS`)

| Mã | Yêu cầu | Mô tả ngắn | Slice | Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| FR-SYS-01 | Server Authority | Mọi thay đổi Player State do Backend quyết định | Mọi slice | ✅ (nguyên tắc) |
| FR-SYS-02 | Tải và cache Static Content | Backend → Room | VS2 | ⬜ |
| FR-SYS-03 | Đồng bộ On-Demand | Khi khởi động/có mạng: tải Player State từ Server ghi đè Room | VS2+ | ⬜ |
| FR-SYS-04 | Hoàn tất xây dựng theo Server Time | Không tin giờ thiết bị | VS5 | ⬜ |
| FR-SYS-05 | Chống request lặp | Optimistic Locking `@Version` trên `UserProfile` | Hardening | ⬜ (nợ kỹ thuật VS1) |
| FR-SYS-06 | Trả lỗi thống nhất | Body lỗi dạng `ErrorResponse` (400/404/409) | VS1 | 🟡 (đã có 404) |
| FR-SYS-07 | Cầu nối Kotlin ↔ Unity | Gửi `CityState`, nhận intent | TS-UNITY | ⬜ |

---

## 3. YÊU CẦU PHI CHỨC NĂNG (`NFR`)

| Mã | Nhóm | Yêu cầu | Cách đo / kiểm chứng | Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| NFR-01 | Bảo mật | Đáp án câu hỏi không gửi xuống Client trước khi nộp | Kiểm tra DTO, test API | ⬜ |
| NFR-02 | Bảo mật | Không tin dữ liệu tài nguyên/thời gian từ Client | Review Service; test gửi giá trị giả | ⬜ |
| NFR-03 | Khả dụng | Đọc từ vựng/Flashcard khi offline (ADR-004) | Bật chế độ máy bay, mở Flashcard | ⬜ |
| NFR-04 | Hiệu năng | Mở app → vào màn hình chính ≤ 3 giây khi đã có cache | Đo trên Emulator/thiết bị thật | ⬜ |
| NFR-05 | Hiệu năng | API phản hồi ≤ 500 ms ở môi trường local | Log thời gian / Postman | ⬜ |
| NFR-06 | Hiệu năng | City View (Unity) ≥ 30 FPS trên máy tầm trung | Unity Profiler | ⬜ |
| NFR-07 | Dung lượng | APK ≤ 150 MB khi đã nhúng Unity | Ghi kích thước APK mỗi lần build | ⬜ |
| NFR-08 | Tương thích | Android `minSdk` ⬜ (chốt khi Tech Spike: Unity yêu cầu tối thiểu) | Build và chạy trên Emulator | ⬜ |
| NFR-09 | Toàn vẹn dữ liệu | Thao tác thi/nâng cấp là Atomic (`@Transactional`) | Test lỗi giữa chừng không mất tài nguyên | ⬜ |
| NFR-10 | Bảo trì | Clean Architecture; Entity không trả trực tiếp qua API | Review cấu trúc package | ✅ |
| NFR-11 | Khả dụng | Giao diện tiếng Việt; nội dung học bằng tiếng Anh | Review UI | ⬜ |
| NFR-12 | Mở rộng | Thêm Web client/Auth mà không đổi Core Data Model | Đối chiếu future-expansion.md | ✅ (thiết kế) |

> Các con số (3 giây, 500 ms, 30 FPS, 150 MB) là **mục tiêu đề xuất** — cần bạn xác nhận hoặc chỉnh lại trước khi đưa vào báo cáo.
