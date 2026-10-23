# ADR-005: Mở khóa bài thi bằng Collection Progress thay vì 100% tiến độ

| Mục | Nội dung |
| :--- | :--- |
| **Trạng thái** | ✅ Accepted |
| **Giai đoạn** | Giai đoạn 2 |
| **Liên quan** | GDD §3 · System Design §3.3 |

> Nội dung bên dưới được tách nguyên văn từ báo cáo ADR tổng hợp cũ (`archive/architectural-decisions-lessons.md`). Theo mẫu ADR của dự án: **Context → Decision → Reason → Alternatives → Consequence → Lesson**.

### 2. Sự thay đổi về Điều kiện mở khóa thi sát hạch (Exam Unlock Mechanics)
*   **Ý tưởng sơ khởi:** Bài thi sát hạch tại School chỉ được mở khóa khi **tiến độ của công trình tương ứng đạt 100%**.
*   **Quyết định chính thức:** Điều kiện mở khóa được chuyển sang **Collection Progress (Tiến độ thu thập thẻ từ vựng)**.
    *   Hệ thống tách biệt hai khái niệm: `Collection Progress` (Số thẻ người chơi đã gặp ít nhất một lần - `first_seen_at != NULL`) và `Mastery Progress` (Điểm thông thạo của từng thẻ).
    *   Chỉ cần tổng số thẻ người chơi đã gặp trong Level hiện tại đạt đủ ngưỡng quy định trong bảng cấu hình `ExamRequirement` (Ví dụ: Đã gặp đủ 40/40 từ của Level 1) thì bài thi nâng cấp tại School sẽ sáng lên.
    *   *Lý do:* Việc bắt buộc đạt 100% Mastery cho tất cả các từ trước khi thi gây ức chế lớn cho người học (do cơ chế Spaced Repetition có độ trễ). Chuyển sang Collection Progress giúp tạo động lực học tập hợp lý hơn: Khuyến khích người chơi nỗ lực "gặp mặt" đủ bộ từ vựng trước khi bước vào kỳ thi đánh giá.
