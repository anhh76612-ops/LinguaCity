# ADR-013: Phiên học do server quản lý; "sưu tầm" = trả lời đúng lần đầu; chống cày KP

| Mục | Nội dung |
| :--- | :--- |
| **Trạng thái** | 🟡 Proposed (08/11/2026). Chờ cài đặt ở VS3. |
| **Giai đoạn** | VS3 |
| **Liên quan** | ADR-004 · **sửa một phần ADR-005** (định nghĩa Collection Progress) · FR-LEARN-03..05 · UC_05 · system-design §3.3, §4.4, §7.2.2, §7.2.3 (được thay bởi §10.3, §10.4.2) |

## Context
- GDD: một bài học có **20 câu hỏi từ 10 từ** và thưởng Knowledge Points "theo mức điểm".
- API cũ (§7.2.2/§7.2.3) chỉ có "lấy 1 câu" và "nộp 1 câu", không có khái niệm phiên. Nếu không có phiên:
  - Một `questionId` có thể nộp lại vô hạn để cày Mastery và KP (NFR-02).
  - Không có chỗ tính KP "theo mức điểm của cả bài".
  - Không làm tiếp được khi mất mạng giữa bài.
- Nhiều thông số còn để trống (⬜): `max_mastery`, cách chọn từ, chuẩn hoá câu điền từ, thời điểm một từ được tính "đã sưu tầm".

## Decision
1. **Phiên học trên server:**
   - Bảng `learning_sessions` + `learning_session_items`. Server chọn sẵn 10 từ × 2 câu (1 READING trắc nghiệm, 1 WRITING điền từ) và lưu lại.
   - Mỗi item **chỉ nộp được một lần**: nộp lại trả 409.
   - Bài kiểm tra trình độ ở tutorial dùng cùng cơ chế với `type = PLACEMENT` (ADR-014).
2. **Phản hồi ngay sau mỗi câu:** đúng/sai, đáp án đúng, lời giải thích viết tự nhiên, Mastery mới.
3. **KP tính khi kết thúc phiên:**
   - `KP = đúng × 5 + (tỉ lệ đúng ≥ 80% ? 20 : 0)`.
   - Mỗi ngày (múi giờ Asia/Ho_Chi_Minh), 5 phiên đầu nhận đủ KP; từ phiên thứ 6, KP × 0.2.
   - Mastery luôn được tính bình thường.
   - Mọi hệ số nằm trong `linguacity.balance.*`.
4. **Gián đoạn:**
   - Phiên còn hiệu lực 30 phút (phiên PLACEMENT là 24 giờ). Mở lại app trong thời hạn thì làm tiếp từ câu chưa nộp.
   - Quá hạn thì phiên thành `EXPIRED`: Mastery của các câu đã nộp được giữ, nhưng không có KP cuối phiên.
5. **Mastery Engine:**
   - Đúng +1, sai −1, kẹp trong `0..max_mastery`.
   - **`max_mastery` theo độ khó của từ:** D=10, C=15, B=20, A=25. Điều này sửa §3.3, vốn ghi "theo Level".
   - Chỉ áp cho từ `TARGET` của câu hỏi, giống quy tắc chấm thi.
6. **"Đã sưu tầm" (Collection Progress) = trả lời đúng một từ lần đầu** (`user_vocab_progress.collected_at`).
   - Đây là **sửa ADR-005**, vốn định nghĩa là "đã gặp ít nhất 1 lần" (`first_seen_at`).
   - `first_seen_at` vẫn được ghi ở lần nộp đầu tiên, nhưng không còn dùng để mở bài thi.
7. **Chọn từ (bản đơn giản để test, sẽ thay sau):**
   1. Ưu tiên từ **chưa sưu tầm** ở Level đang học.
   2. Sau đó tới từ có **Mastery thấp**.
   3. Bỏ qua từ vừa ôn trong 10 phút, trừ khi không đủ từ.
   4. Xáo ngẫu nhiên trong cùng nhóm.
   - Level đang học = level công trình + 1, kể cả level 0. Thiếu từ thì lấy thêm từ đã sưu tầm ở Level thấp hơn để ôn.
   - **Ghi chú tương lai:** thay bằng thuật toán trọng số hoặc Spaced Repetition (future-expansion).
8. **Chấm câu điền từ:**
   - So sánh sau khi `trim`, gộp khoảng trắng và không phân biệt hoa/thường, với `answer` hoặc với danh sách `accepted_answers`.
   - `accepted_answers` là cột riêng chỉ có trên server, **không** nằm trong `metadata` gửi xuống app.
   - **Ghi chú tương lai:** AI chấm các câu gần đúng.

## Reason
| Tiêu chí | Phiên trên server (chọn) | Từng câu (API cũ) |
| :--- | :--- | :--- |
| Chống nộp lại / cày điểm | ✅ Item nộp 1 lần | 🔴 Nộp vô hạn |
| Tính KP theo cả bài | ✅ Có `complete` | 🔴 Không có điểm kết thúc |
| Làm tiếp sau khi mất mạng | ✅ Lấy lại phiên | 🟡 App tự nhớ, dễ lệch |
| Độ phức tạp | 🟡 Thêm 2 bảng | ✅ |

Về việc "sưu tầm = đúng 1 lần" thay vì "đã gặp": "đã gặp" dễ bị cày bằng cách mở phiên rồi bỏ. Ngưỡng mở thi (ExamRequirement) nên phản ánh việc người chơi **đã biết từ ít nhất một lần**.

## Alternatives
- **Giới hạn cứng số phiên mỗi ngày:** chặn người muốn học thêm, đi ngược mục tiêu "ham học".
- **Không giới hạn:** mở đường cày KP để nâng cấp nhà quá nhanh.
- **Spaced Repetition (SM-2) ngay từ MVP:** cần thêm cột `interval`/`ease` và khó kiểm thử. Để giai đoạn sau.

## Consequence
- 🟢 Mọi điểm số và KP đều do server tính, có test.
- 🟢 Một Mastery Engine dùng chung cho VS4 (thi).
- 🟡 ADR-005 phải đọc kèm ADR-013. `exam_requirements.required_card_count` giờ được hiểu là số từ **đã sưu tầm**.
- 🟡 `user_profiles` thêm cột `version` (Optimistic Locking, trả nợ FR-SYS-05) vì có nhiều chỗ cộng/trừ KP.

## Lesson
Thao tác "cộng điểm" nào cũng cần một **đơn vị giao dịch có trạng thái** (phiên, lượt thi). Không có nó, server không phân biệt được "câu trả lời mới" với "câu trả lời gửi lại".
