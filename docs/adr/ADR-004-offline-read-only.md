# ADR-004: Chiến lược Offline Read-Only thay cho Two-way Sync

| Mục | Nội dung |
| :--- | :--- |
| **Trạng thái** | ✅ Accepted |
| **Giai đoạn** | Giai đoạn 2 |
| **Liên quan** | SRS §2.4 · NFR-03 |

> Nội dung bên dưới được tách nguyên văn từ báo cáo ADR tổng hợp cũ (`archive/architectural-decisions-lessons.md`). Theo mẫu ADR của dự án: **Context → Decision → Reason → Alternatives → Consequence → Lesson**.

```
                       [ OFFLINE STATE ]
                 Người dùng mất kết nối Internet
                                │
                 ┌──────────────┴──────────────┐
                 ▼                             ▼
        [ ĐƯỢC PHÉP ĐỌC ]             [ KHÔNG ĐƯỢC GHI ]
      ✔ Đọc từ vựng đã cache        ✘ Trả lời câu hỏi
      ✔ Xem Flashcard, IPA         ✘ Làm bài thi sát hạch
      ✔ Xem Mastery hiện tại        ✘ Nâng cấp công trình
      (Đọc dữ liệu từ Room)        (Yêu cầu mạng & Backend)
```

### 1. Sự thay đổi về Chiến lược Ngoại tuyến (Offline & Sync Strategy)
*   **Ý tưởng sơ khởi (Two-way Sync / Outbox Pattern):** 
    Tài liệu cũ thiết kế ứng dụng cho phép hoạt động học tập, làm Quiz và thi cử diễn ra 100% Offline. Tiến trình học tập, điểm Mastery và tài nguyên sẽ được tích lũy tạm thời ở cơ sở dữ liệu cục bộ (Room), sau đó được đưa vào hàng chờ đồng bộ (`SyncOperationEntity`, `Local Outbox`) để đẩy ngược lên Spring Boot và đồng bộ hóa hai chiều khi có mạng trở lại.
*   **Kiến trúc chính thức (Offline Read-Only):**
    Quyết định kiến trúc đóng băng (Freeze) cho phiên bản MVP: **Chuyển sang Offline Read-Only**.
    *   *Offline (Được phép):* Người chơi chỉ được phép truy xuất, xem danh sách từ vựng, đọc thẻ flashcard, nghĩa từ, phiên âm IPA đã được lưu và cache sẵn trong Room Database từ các phiên làm việc Online trước đó.
    *   *Online (Bắt buộc):* Mọi hành động làm biến đổi trạng thái người chơi (Gameplay-critical state) như: Cập nhật điểm Mastery, chấm điểm trả lời câu hỏi, Start/Submit bài thi sát hạch, nâng cấp công trình, cộng/trừ tài nguyên **bắt buộc phải có mạng và xử lý trực tiếp bởi Backend**.
    *   *Lý do:* Việc cho phép Client tự chấm điểm và cập nhật tiến độ khi offline tạo ra lỗ hổng bảo mật cực kỳ lớn (người chơi dễ dàng can thiệp cơ sở dữ liệu SQLite cục bộ để hack tài nguyên và tiến độ game). Đồng thời, việc đồng bộ hai chiều (Two-way sync) và giải quyết xung đột dữ liệu (Conflict Resolution) khi người dùng học trên nhiều thiết bị cực kỳ phức tạp và không khả thi đối với tiến độ phát triển MVP.
