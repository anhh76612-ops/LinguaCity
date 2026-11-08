# LINGUACITY — GAME DESIGN DOCUMENT (GDD)

**Tên dự án:** LinguaCity (Thành phố Ngôn ngữ)
**Loại tài liệu:** Game Design Document — mô tả **trải nghiệm chơi** (cái người chơi thấy và cảm nhận)
**Người thực hiện:** Nông Hoàng Anh
**Trạng thái:** 🟡 Living document — phần Core Loop đã chốt, phần Balance và Art còn mở

> **Phân vai tài liệu**
> - SRS (`01-requirements/srs-mvp.md`) trả lời **hệ thống phải làm gì**.
> - GDD (tài liệu này) trả lời **người chơi trải nghiệm gì, game vận hành ra sao**.
> - System Design (`03-architecture/system-design.md`) trả lời **xây dựng kỹ thuật như thế nào**.
>
> Phần Cơ chế cốt lõi (mục 3–4) được chuyển từ SRS sang đây để SRS chỉ còn yêu cầu, không lẫn thiết kế game.

---

## 1. TRIẾT LÝ THIẾT KẾ (PRODUCT PRINCIPLE)

> **"Tiến bộ học tập trực tiếp quyết định tiến bộ của thành phố."**

Vòng lặp Học tập (Learning Loop) và Vòng lặp Thành phố (City Loop) không tồn tại độc lập mà phải giao nhau tại một "nút thắt" bắt buộc. Người chơi không thể chỉ phát triển thành phố mà không học tập, và ngược lại.

---

## 2. THẾ GIỚI GAME: CÔNG TRÌNH = CHỦ ĐỀ (THEME), KHÔNG PHẢI KỸ NĂNG

Mỗi công trình liên kết với **một hoặc nhiều** Theme (bảng `building_themes`, system-design §10.2.1), không khóa cứng với kỹ năng để tránh coupling (xem ADR-003, Case 1). Nội dung được tải theo gói (công trình, Level) — ADR-012.

| Công trình | Theme từ vựng | Vai trò trong game |
| :--- | :--- | :--- |
| 🏠 **Housing (Nhà ở)** | Daily Life, House | Sinh Knowledge Points thụ động |
| 🛣️ **Road (Đường xá)** | Transportation, Vehicles | ⬜ Chưa chốt vai trò phụ |
| 🌳 **Park (Công viên)** | Environment, Social | ⬜ Chưa chốt vai trò phụ |
| 🏫 **School (Trường học)** | Education | **Exam Center** — nơi chứa các bài thi nâng cấp cho mọi công trình |

Trong MVP, mọi công trình chỉ dùng **Reading** và **Writing** (trắc nghiệm, điền từ) — xem ADR-006.

**Trường học (School) — Trung tâm khảo thí:** Bài thi sát hạch (Exam) khi Pass trả về một Bản vẽ cụ thể (`reward_blueprint_id`) tương ứng với công trình và Level cần mở khóa.

---

## 3. CORE LOOP (VÒNG LẶP KÉP)

```text
   ┌──────────────────────────────────────────────────────────────┐
   │                                                              │
   ▼                                                              │
[1. HỌC]  ──thu thập thẻ──►  [2. MỞ KHÓA THI]  ──đủ tài nguyên──► [3. THI SÁT HẠCH]
 Kotlin                        Kotlin                              Kotlin
   ▲                                                              │ Pass → Blueprint
   │                                                              ▼
   └──── mở khóa Level từ vựng mới ◄──── [4. XÂY DỰNG / NÂNG CẤP] ◄┘
                                          Unity (hiển thị) + Kotlin (gọi API)
```

1. **Học tập (Learn):** Học từ vựng của công trình hiện tại để tích lũy Collection Progress. Mỗi lần tham gia bài học có **20 câu hỏi tạo từ 10 từ vựng** khác nhau lấy trong bể; hoàn thành nhận Knowledge Points theo mức điểm.
2. **Mở khóa bài thi (Unlock Exam):** Khi số thẻ từ vựng đã thu thập (Collection Progress) đạt ngưỡng trong cấu hình `ExamRequirement` (ví dụ 40/40 từ của Level 1) — xem ADR-005.
3. **Thi sát hạch (Start & Pass Exam):** Tiêu thụ Knowledge Points + Blueprint Shards để tham gia. Pass → nhận Blueprint cụ thể. Fail → **không hoàn lại** chi phí, tiến độ từ vựng giữ nguyên, được ôn và thi lại.
4. **Xây dựng (Build/Upgrade):** Tiêu thụ Blueprint + Knowledge Points để nâng cấp công trình. Quá trình xây chạy theo thời gian thực (kiểm tra bằng **Server Time**). Hoàn tất → mở khóa Level từ vựng tiếp theo.

### 3.1. Sự kiện thành phố (City Events)
Bài tập Ngữ pháp (Grammar) xuất hiện dưới dạng dấu chấm than (!) trên bản đồ (ví dụ: giúp người dân điền đúng thì ngữ pháp). Trả lời đúng nhận Knowledge Points và Blueprint Shard.
- Unity: hiển thị dấu (!) và gửi `CityEventTapped(eventId)` về Kotlin.
- Kotlin: mở màn hình câu hỏi, gọi Backend chấm điểm.

### 3.2. Tutorial lần đầu: thư ký Mai (ADR-014)
- VS1 có bản 3 trang (đã nghiệm thu). Bản mới **chơi thật một vòng**:
  1. kiểm tra trình độ 30 câu / 20 từ House Lv1, độ khó tăng dần;
  2. bắt buộc học 1 phiên ở House;
  3. xây House Lv0→1 (cần 20/30 từ + 100 KP, xây 10 giây);
  4. vào nhà 3D, chọn ngoại hình nhân vật và tường/sàn;
  5. tour chức năng.
- Chạy trong Kotlin (overlay Compose: chân dung 2D + chữ chạy + spotlight), bước lưu trên server, **không cho bỏ qua**.
- Phần thưởng: KP = đúng×3 + 100 quà chào mừng; danh hiệu GOOD_START (>15 từ), TOP_ENTRANT (top 10% / ≥27/30), FLAWLESS (ẩn, 30/30), NEW_RESIDENT (xong tutorial).

### 3.3. Danh hiệu (Titles)
- Ba nhóm: **Dễ** (ai chăm cũng có), **Khó** (cần giỏi/kiên trì), **Ẩn** (chỉ có khi vô tình làm được; điều kiện không hiển thị).
- Đeo một danh hiệu, hiện trên HUD và Hồ sơ. Danh sách ban đầu: system-design §10.5.

### 3.4. Tuỳ biến
- **Nhân vật** low-poly như người dân city-web: màu da, kiểu tóc + màu tóc, màu áo, màu quần, phụ kiện. Miễn phí.
- **Nhà:** tường và sàn, mỗi loại 2 mẫu miễn phí; mẫu khác mở bằng KP hoặc danh hiệu. Đồ nội thất: giai đoạn sau.

---

## 4. HỆ THỐNG TÀI NGUYÊN & KINH TẾ

| Tài nguyên | Cách kiếm | Cách tiêu | Lưu ở |
| :--- | :--- | :--- | :--- |
| **Knowledge Points** (Điểm Tri Thức) — tiền tệ chính | Thu hoạch thụ động từ Housing; làm bài học; bài kiểm tra trình độ + quà chào mừng; City Events | Phí thi; phí xây/nâng cấp; mở mẫu tường/sàn | `user_profiles.knowledge_points` |
| **Hourglass** (Đồng hồ cát) | ⬜ Chưa chốt | Tua nhanh thời gian xây | `user_profiles.hourglass_count` |
| **Blueprint Shards** (Mảnh bản vẽ) — item nút thắt | Nhiệm vụ hằng ngày, City Events (Grammar) | Phí đầu vào bài thi | `user_profiles.blueprint_shards` |
| **Blueprint** (Bản vẽ) | Pass Exam | Nâng cấp công trình đúng loại + đúng level | `user_blueprints` |

**Quy tắc đã đóng băng (Freeze):**
- Exam Entry Cost bị trừ ngay khi Start Exam; Fail không hoàn lại.
- Pass nhận Blueprint cụ thể, gắn với Building + Target Level.
- Upgrade dùng Blueprint của Target Level.
- Mastery: đúng `+1`, sai `-1`, giới hạn trong `0..max_mastery` (xem System Design §3.3).
- (08/11/2026, ADR-013) `max_mastery` theo độ khó: **D=10, C=15, B=20, A=25**. Một từ "đã sưu tầm" khi trả lời đúng lần đầu.
- (08/11/2026, ADR-013) Bài học: **KP = đúng×5 + 20 nếu ≥80%**; 5 phiên đầu mỗi ngày nhận đủ, từ phiên thứ 6 × 0.2. Phiên hết hạn sau 30 phút.

---

## 5. PHÂN VAI HIỂN THỊ: UNITY vs KOTLIN

Theo ADR-009 (🟡 Proposed): Kotlin là ứng dụng chủ, Unity chỉ hiển thị City View.
ADR-010 (🟡 Proposed) đề xuất thay Unity bằng **Three.js chạy trong WebView** (prototype: `city-web/`); nguyên tắc phân vai bên dưới giữ nguyên, chỉ đổi công nghệ vẽ City View.

| Trải nghiệm | Làm bằng | Ghi chú |
| :--- | :--- | :--- |
| Splash / Đồng bộ dữ liệu | Kotlin (Compose) | Onboarding Guest, tải Static Content |
| City View (bản đồ, 4 công trình, hiệu ứng xây dựng, dấu (!)) | **Three.js/WebView** theo ADR-010 (trước đó: Unity, ADR-009; đường lui: Compose) | Chỉ nhận `CityState`, gửi intent về Kotlin |
| Chi tiết / bên trong công trình | city-web (avatar đi vào, zoom; **nội thất 3D cho House**) + Kotlin (bảng nhiệm vụ) | UC_15 |
| Học từ vựng, Flashcard, Mini-game | Kotlin (Compose) | Hỗ trợ offline đọc (ADR-004) |
| Exam Center | Kotlin (Compose) | Bắt buộc online |
| Tutorial | Kotlin (overlay thư ký Compose) | ADR-014 |

---

## 6. NỘI DUNG CẦN BỔ SUNG (⬜)

### 6.1. Cân bằng game (Game Balance) — để mở, chỉnh sau khi có prototype

> **Đợt 2 (ADR-015):** đã chốt điểm đậu bài thi (80%), phí thi, điều kiện nâng cấp, nguồn mảnh (nhiệm vụ + sự kiện), giới hạn luyện tập, chuỗi ngày. Bảng đầy đủ: system-design §11.7 và ADR-015 §8.
- 🟡 Giá xây / thời gian xây (seed V003, chỉnh sau): Lv1 = 100 KP / 10 giây (House, tutorial); các công trình khác Lv1 = 150 KP / 60 giây; Lv2 = 300 KP / 1 giờ; Lv3 = 800 KP / 4 giờ.
- ⬜ Tốc độ sinh Knowledge Points của Housing.
- 🟡 Level tối đa của mỗi công trình: 3.
- ✅ `max_mastery` theo Difficulty Rank (D10/C15/B20/A25); cooldown 10 phút. 🟡 Cách chọn thẻ hiện là bản đơn giản (chưa sưu tầm → Mastery thấp); **sẽ thay bằng trọng số / Spaced Repetition** (future-expansion §6).
- ⬜ Difficulty distribution cho các Level cao.
- ⬜ Cách chấm điểm Exam và ngưỡng Pass.
- ⬜ Nguồn kiếm Hourglass.

> Nguyên tắc (SRS Appendix A.5): **không hardcode Game Balance vào SRS**; các giá trị nằm trong bảng cấu hình (`building_levels`, `exam_requirements`) hoặc Constants ở Backend.

### 6.2. Phong cách hình ảnh & âm thanh (Art & Audio Direction)
- 🟡 Góc nhìn: **3D low-poly isometric** (camera trực giao), bản đồ diorama 24×24 ô, hai trục đường cắt nhau, 4 lô công trình — xem `city-web/`.
- 🟡 Bảng màu pastel (`city-web/src/core/palette.ts`); người dân dạng chibi đầu to, dựng bằng khối, số dân = 3 + 2 × level Housing.
- 🟡 Nguồn asset: không dùng asset ngoài — mọi mô hình dựng bằng code (không vướng giấy phép).
- ⬜ Âm thanh: nhạc nền, hiệu ứng đúng/sai, hoàn thành xây dựng.

### 6.3. Tiến trình người chơi (Progression)
- 🟡 House Level 1 có 30 từ (seed duy nhất ở đợt này); xây Lv1 cần sưu tầm 20/30. House mở đầu tiên (tutorial). Road/Park/School chưa có nội dung, hiện biển "Chưa xây".
- ⬜ Nhiệm vụ hằng ngày (Daily Quest) — nội dung và phần thưởng.
