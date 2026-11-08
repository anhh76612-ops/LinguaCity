# ADR-014: Tutorial có nhân vật thư ký, bài kiểm tra trình độ và xây House thật

| Mục | Nội dung |
| :--- | :--- |
| **Trạng thái** | ✅ Accepted (08/11/2026, M6). Đã cài và chạy E2E trên emulator (TC-TUT-01..09). Bước ENTER_HOUSE / CUSTOMIZE tạm chỉ có lời Mai; cảnh nội thất 3D và tuỳ biến làm ở M7/M8 (nhánh riêng). |
| **Giai đoạn** | Sau VS3 (dùng nội dung VS2 và phiên học VS3) |
| **Liên quan** | ADR-013 · UC_02 · FR-TUT-01..05 · FR-ACH · system-design §10.3.4, §10.4.3 · GDD §3.2 |

## Context
- Tutorial VS1 chỉ là 3 trang chữ rồi đánh dấu `tutorial_completed`. Người chơi chưa học từ nào, chưa xây gì.
- Người dùng muốn:
  - Một **thư ký hệ thống** dẫn người chơi qua **bài kiểm tra trình độ 20 từ**.
  - Sau đó **học một phiên ở House** để mở khoá House từ Lv0 lên Lv1, kết hợp với số từ đã đúng ở bài kiểm tra.
  - Các công trình khác hiện bảng "Chưa xây".
  - Hướng dẫn các chức năng chính; có danh hiệu để tạo hứng thú.

## Decision
1. **Nhân vật:** "Mai, thư ký thành phố" (tên đề xuất, có thể đổi).
   - Chân dung 2D có 4 biểu cảm (chào, vui, động viên, ngạc nhiên).
   - Hộp thoại chữ chạy và lớp **spotlight** làm tối màn hình, khoanh sáng đúng nút cần bấm.
   - Overlay Compose dùng lại được ở mọi màn hình và cho lời phản hồi đúng/sai.
2. **Trạng thái tutorial lưu trên server:** `user_profiles.tutorial_step`. Thoát app thì mở lại đúng bước. Không có nút bỏ qua.

   | Bước | Ai chuyển bước | Nội dung |
   | :--- | :--- | :--- |
   | `INTRO` | app → `PLACEMENT` | Thành phố trống, Mai giới thiệu |
   | `PLACEMENT` | server, khi phiên PLACEMENT `complete` → `LEARN_HOUSE` | Bài kiểm tra trình độ |
   | `LEARN_HOUSE` | server, khi phiên LEARNING đầu tiên ở House `complete` → `BUILD_HOUSE` | Bắt buộc học 1 phiên ở House |
   | `BUILD_HOUSE` | server, khi House đạt Lv1 (hoàn tất xây, lazy) → `ENTER_HOUSE` | Bấm Xây, chờ giàn giáo 10 giây |
   | `ENTER_HOUSE` | app → `CUSTOMIZE` | Avatar đi vào nhà, nội thất 3D |
   | `CUSTOMIZE` | app → `TOUR` | Chọn ngoại hình nhân vật, tường và sàn |
   | `TOUR` | `POST /tutorial/complete` → `DONE` | Giới thiệu menu nổi, HUD, danh hiệu |
3. **Bài kiểm tra trình độ** (phiên `PLACEMENT`):
   - **30 câu từ 20 từ** House Level 1, độ khó tăng dần:
     - 10 câu **dễ** (tier 1): trắc nghiệm nhận nghĩa.
     - 10 câu **vừa** (tier 2): điền từ có gợi ý chữ cái.
     - 10 câu **khó** (tier 3): điền từ trong ngữ cảnh, có từ gần nghĩa làm nhiễu.
   - Câu đúng thì Mastery +1 và từ được sưu tầm (ADR-013).
   - **KP** = đúng × 3 + **quà chào mừng 100 KP**, vừa đủ chi phí xây House Lv1.
4. **Xây House Lv0 → Lv1** cần `building_levels.required_collected` = **20/30** từ Level 1 đã sưu tầm và 100 KP. Thời gian xây 10 giây (cấu hình).
   - Lv0→Lv1 không cần bài thi hay bản vẽ. Lv1→Lv2 trở đi theo VS4/VS5.
   - Dù đã đủ 20 từ sau bài kiểm tra, tutorial **vẫn bắt học 1 phiên** để người chơi biết cách học.
5. **Danh hiệu tutorial:**

   | Danh hiệu | Loại | Điều kiện |
   | :--- | :--- | :--- |
   | GOOD_START | Dễ | Đúng > 15 từ (khác nhau) trong bài trình độ |
   | TOP_ENTRANT | Khó | Điểm cao hơn 90% người chơi, khi đã có ≥ 50 bài; trước đó cần ≥ 27/30 |
   | FLAWLESS | Ẩn | 30/30 |
   | NEW_RESIDENT | Dễ | Hoàn thành tutorial |

   Danh hiệu chỉ xét một lần, không bao giờ thu hồi.

## Reason
- Bài kiểm tra trình độ vừa đo được người chơi, vừa cho họ **sưu tầm ngay** những từ đã biết. Người giỏi xây nhà sớm hơn, nhưng ai cũng phải trải qua vòng học → xây → vào nhà, nên học được cả vòng lặp chính của game trong vài phút.
- Lưu bước trên server (không chỉ DataStore) để Server Authority quyết định khi nào được xây, và để xoá dữ liệu app vẫn tiếp tục đúng chỗ.

## Alternatives
- **Giữ 3 trang tĩnh:** người chơi không thật sự làm gì, không có cảm giác tiến bộ.
- **Bài kiểm tra độc lập, không gắn với House:** mất mối nối "học → xây", là cốt lõi của game.
- **Nhân vật 3D trên bản đồ:** chỉ sống được trên màn thành phố, không theo sang các màn Compose.

## Consequence
- 🟡 Tutorial phụ thuộc VS2 (gói `HOUSING:1`), VS3 (phiên học) và một phần nhỏ của VS5 (`user_buildings`, xây Lv0→1, `GET /city`). Phần VS5 đó được làm sớm, chỉ cho Lv0→1.
- 🟡 `POST /users/me/tutorial/complete` chỉ thành công ở bước `TOUR` (hoặc đã `DONE`, trường hợp idempotent). Các test TC-VS1-09..11 phải cập nhật tiền điều kiện.
- 🟢 Overlay thư ký dùng lại được cho phản hồi bài học và các hướng dẫn tính năng sau này.

## Lesson
Tutorial tốt nhất là **chơi thật một vòng ngắn của vòng lặp chính**, không phải đọc mô tả về nó.
