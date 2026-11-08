# ADR-017: Kinh tế v2 (Gạch, Gỗ, Năng lượng, Town Level, thuế) và Mastery v2 (giảm theo thời gian, FSRS)

| Mục | Nội dung |
| :--- | :--- |
| **Trạng thái** | 🟡 Proposed (08/11/2026). Accepted khi người dùng duyệt bảng cân bằng §6 |
| **Giai đoạn** | Redesign "Cozy Toy Town", lát cắt S3 |
| **Thay thế một phần** | ADR-013 (Mastery ±1); ADR-015 §3 (công thức nâng cấp), §6 (luyện tập đổi Mastery, giới hạn lượt/ngày) |
| **Liên quan** | [cozy-toy-town-concept.md](../04-ui/redesign/cozy-toy-town-concept.md) §4 · `MasteryEngine.java` · `VocabProgressRecorder.java` · `LearningService.java` · `PracticeService.java` · `WordSelector.java` |

## Context

Bản thiết kế lại UI đặt việc học làm trung tâm của kinh tế thành phố: **học từ mới ra Gạch, ôn ra Gỗ, thi đạt ra Bản vẽ**. Luật hiện tại không hỗ trợ điều đó:

1. **Mastery chỉ có ±1** (`MasteryEngine.apply`). Trả lời sai bị trừ, nên người chơi sợ sai. Không có cơ chế quên theo thời gian, nên công trình không thể "xuống cấp" khi bỏ ôn.
2. **Luyện tập đổi Mastery** một lần mỗi từ mỗi ngày (ADR-015 §6). Người dùng muốn Mastery chỉ phản ánh bài học và bài thi.
3. **Chỉ có một loại tiền là KP**, nên không tách được động lực "học mới" và "ôn cũ".
4. **Giới hạn luyện tập theo số lượt** (`DAILY_LIMIT`) chặn đúng hoạt động người dùng muốn khuyến khích khi đã hết từ mới.

## Decision

### 1. Mastery v2

| Luật | Giá trị |
| :--- | :--- |
| Trả lời đúng trong **bài học (LEARNING, EVENT) hoặc bài thi** | +1, kẹp ở `max` (D10/C15/B20/A25, giữ nguyên ADR-013). Không giới hạn số lần mỗi ngày |
| Trả lời sai | **Giữ nguyên** (bỏ −1) |
| Luyện tập (`PRACTICE_*`) và Xưởng bảo trì | **Không đổi Mastery**. Vẫn sưu tầm từ (BR-PRAC-04), vẫn cập nhật FSRS |
| Giảm theo thời gian | Cứ mỗi **7 ngày liền** không có lần trả lời đúng (`last_correct_at`) thì −1, kẹp ở 0 |
| Tốt nghiệp | Khi `mastery_score = max` thì đặt `graduated_at`; từ đó **không bao giờ giảm nữa** |
| Nhiệm vụ ngày | Câu hỏi chỉ lấy từ công trình đã mở và từ đã sưu tầm. Từ mới xuất hiện với xác suất thấp (mặc định 10%); nếu gặp thì ghi `first_seen_at` và +1 khi đúng |

**Cách tính giảm**: tính lười khi đọc, không cần job nền.

```
weeks = floor((now - max(last_correct_at, last_decay_applied_at)) / 7 ngày)
nếu graduated_at == null và weeks > 0:
    mastery_score = max(0, mastery_score - weeks)
    last_decay_applied_at += weeks * 7 ngày
```

Áp mỗi khi đọc `user_vocab_progress`, trong `VocabProgressRecorder` và trong API danh sách từ, để mọi màn thấy cùng một con số.

`MasteryEngine.apply(current, correct, max)` đổi thành: `correct ? min(max, current + 1) : current`.

### 2. FSRS: lịch ôn chạy ngầm

- Mỗi lần trả lời một từ (ở **mọi** chế độ, kể cả luyện tập và Xưởng) thì cập nhật trạng thái FSRS của từ đó: `stability`, `difficulty`, `due_at`, `reps`, `lapses`.
  - Đúng ứng với rating *Good*, sai ứng với *Again*.
  - Dùng tham số mặc định của FSRS-5.
- `due_at` dùng cho:
  - **độ nứt** và **thuế** của công trình (§4);
  - **chọn từ** trong `WordSelector` (ưu tiên từ đã quá hạn);
  - **danh sách Xưởng**.
- Mastery là con số người chơi nhìn thấy. FSRS là lịch nội bộ. Hai thứ cố ý tách nhau, để luật Mastery đơn giản và dễ hiểu.
- **Tinh chỉnh**: khi có đủ log thật (khoảng 1.000 lượt ôn trở lên mỗi người), huấn luyện lại tham số bằng optimizer FSRS. Đây là bước "học máy" thực sự, có thể làm offline bằng Python.

### 3. Tài nguyên mới (`user_profiles`)

| Cột | Kiểu | Ghi chú |
| :--- | :--- | :--- |
| `knowledge_points` | giữ nguyên | UI hiển thị là **Vàng 🪙** |
| `bricks` | int ≥ 0 | 🧱 từ bài học có từ mới |
| `wood` | int ≥ 0 | 🪵 từ ôn tập, Xưởng, flashcard |
| `stamina` | int 0..`stamina_max` | ⚡ |
| `stamina_max` | int, mặc định 5 | tăng khi lên Town Level |
| `stamina_refilled_on` | date (giờ Việt Nam) | hồi đầy lười khi đọc, sang ngày mới thì đặt `stamina = stamina_max` |
| `town_xp`, `town_level` | int | XP từ mọi hoạt động học |
| `checked_in_on` | date | điểm danh hằng ngày (+1 ⚡, +50 🪙) |

**Luật năng lượng**:
- Bắt đầu phiên LEARNING có từ mới mà `stamina = 0`: phiên vẫn chạy nhưng **không có từ mới** (chuyển thành ôn), không cho 🧱 và lương giảm.
- Trừ 1 ⚡ khi phiên hoàn thành, hoặc khi phiên hết hạn/bỏ dở mà đã gặp từ 50% số từ mới.
- Thay giới hạn `DAILY_LIMIT` của luyện tập: luyện tập **không còn giới hạn lượt**. Chống cày bằng cách: luyện tập không cho 🧱, 🪵 chỉ được thưởng lần đầu mỗi từ mỗi ngày (giữ `last_rewarded_on`).

### 4. Thuế và độ nứt

- Mỗi công trình tính `overdue_days` = số ngày quá hạn lớn nhất (theo `due_at`) trong các từ đã sưu tầm thuộc công trình đó. Bỏ qua từ đã tốt nghiệp.

| `overdue_days` | `crack_level` | `tax_rate` |
| :--- | :--- | :--- |
| 0 | 0 | 100% |
| ≥ 1 | 1 | 75% |
| ≥ 3 | 2 | 50% (bật nhắc nhở) |
| ≥ 7 | 3 | 25% (tối thiểu) |

- Thuế cơ bản theo Lv công trình, thu mỗi 4 giờ, tối đa tích 3 kỳ.
- Thêm `user_buildings.tax_collected_at`. API `POST /buildings/{code}/collect-tax`.
- Thêm `crack_level` và `tax_rate` vào `GET /city` và bridge.
- **Nhắc nhở**:
  - Khi có công trình `crack_level ≥ 2`, `GET /city` trả `reminders[]`, để Fixy (client) xử lý lúc online.
  - Job hằng ngày gửi push "từ Mai" nếu người chơi không mở app quá 24 giờ. Push cần FCM, nên để ở lát cắt sau.

### 5. Thi công

- `POST /buildings/{code}/build` cho Lv*n* → Lv*n+1* cần **📐 bản vẽ (công trình, n+1) + 🧩 + 🪵 + 🧱 + 🪙**.
  - Cột mới trong `building_levels`: `required_bricks`, `required_wood`.
  - Lỗi `REQUIREMENTS_NOT_MET` thêm `missingBricks` và `missingWood`.
- Bỏ đường "nâng cấp bằng mảnh không cần thi", nếu client còn giữ.
- Lv0 → Lv1 giữ luật ADR-014 (từ đã sưu tầm + 🪙), cộng thêm 🧱.

### 6. Bảng cân bằng khởi điểm (đổi được qua `BalanceProperties`)

| Tham số | Giá trị |
| :--- | :--- |
| `stamina-max-default` | 5 |
| `new-words-per-session` | 8 (bài 20 từ: 8 từ mới + 12 từ ôn) |
| Lương bài học | 🪙 như hiện tại, +1 🧱 mỗi từ mới sưu tầm |
| Ôn, luyện tập, Xưởng | +1 🪵 mỗi từ đúng (lần đầu trong ngày), 🪙 bằng 50% bài học |
| Điểm danh | +1 ⚡, +50 🪙 |
| `mastery-decay-days` | 7 |
| `quest-new-word-chance` | 0,10 |
| Thuế cơ bản Lv1/Lv2/Lv3 | 20 / 40 / 70 🪙 mỗi 4 giờ |
| Thi công House Lv2 | 1 📐, 3 🧩, 300 🪙, 20 🧱, 15 🪵 |

## Reason

- **Sai không trừ Mastery**: người dùng chốt, khớp nguyên tắc "sai không bị phạt". Giảm theo thời gian phản ánh việc quên tốt hơn phạt ngay khi sai.
- **Tách Mastery và FSRS**: Mastery phải dễ hiểu (người chơi thấy +1). FSRS cần nhiều biến và thay đổi liên tục, nên không hợp để hiển thị.
- **Tính giảm lười khi đọc**: giống cách hoàn tất xây (FR-SYS-04) và chuỗi ngày (ADR-015 §7). Không cần scheduler, không lệch khi server tắt.
- **Gạch/Gỗ**: biến lời khuyên sư phạm "học mới phải đi kèm ôn cũ" thành ràng buộc kinh tế mà người chơi tự cảm nhận được.
- **Năng lượng giới hạn từ mới chứ không giới hạn việc học**: tránh quá tải (khoảng 40 từ mới/ngày) mà không chặn ôn tập.

## Alternatives

- **Giữ −1 khi sai và thêm decay**: bị loại theo lựa chọn của người dùng.
- **Dùng FSRS thay hẳn Mastery**: bị loại. Retrievability (xác suất nhớ) khó giải thích cho người chơi, và phải đổi UI ở mọi nơi.
- **Job nền giảm Mastery hằng đêm**: bị loại. Thêm hạ tầng, và dữ liệu lệch khi job lỗi.
- **Năng lượng hồi theo giờ**: bị loại. Tạo áp lực canh đồng hồ, trái nguyên tắc 5.

## Consequence

- **Migration V008 (schema)**:
  - `user_vocab_progress`: `last_correct_at`, `last_decay_applied_at`, `graduated_at`, `fsrs_stability`, `fsrs_difficulty`, `due_at`, `reps`, `lapses`.
  - `user_profiles`: tài nguyên mới (§3).
  - `building_levels`: `required_bricks`, `required_wood`.
  - `user_buildings`: `tax_collected_at`.
  - Backfill `last_correct_at = last_reviewed_at` cho từ đã sưu tầm.
- **Code backend**:
  - `MasteryEngine`, `VocabProgressRecorder` (thêm decay và FSRS).
  - `LearningService.recordProgress`: luyện tập không áp Mastery.
  - `PracticeService`: bỏ `DAILY_LIMIT`, thêm thưởng 🪵.
  - `WordSelector`: ưu tiên `due_at`.
  - `ExamService`, `BuildingService`, `QuestTracker`.
- **Test**:
  - Sửa TC-VS3-03 trong `LearningEngineTests`: sai giờ giữ nguyên.
  - Thêm test: decay sau 7 và 14 ngày, không decay khi tốt nghiệp, luyện tập không đổi Mastery, ⚡ hết thì không có từ mới, thuế theo `crack_level`.
- **App**:
  - Room migration.
  - HUD hiển thị 🪙 🧱 🪵 ⚡ ⭐.
  - Bridge thêm `crackLevel`, `taxRate`, `townLevel`.
- **Tài liệu**: GDD §Mastery, use-cases BR-PRAC-03, requirements FR-PRAC-03 đánh dấu "thay bởi ADR-017".

## Lesson

Đổi một luật đếm cần kiểm cả trạng thái đang dở (bài học từ ADR-015). Ở đây có hai chỗ:
- Người chơi cũ có Mastery đã bị −1 do sai, nên **không hoàn lại**.
- Từ đã đạt max trước khi có luật tốt nghiệp thì backfill `graduated_at = updated_at`.
