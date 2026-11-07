# LINGUACITY — QUYẾT ĐỊNH KIẾN TRÚC (ADR) & BÀI HỌC KINH NGHIỆM

> Mỗi quyết định kiến trúc là **một file riêng** để dễ truy vết và dễ đổi trạng thái. File tổng hợp cũ được lưu tại `../archive/architectural-decisions-lessons.md`.
> Trong báo cáo, các ADR được dùng cho: Chương 6.1.2 (lý do chọn công nghệ) và Phần Kết luận (bài học).

## Danh sách ADR

| ID | Quyết định | Trạng thái |
| :--- | :--- | :--- |
| [ADR-001](ADR-001-mobile-tech-stack.md) | Mobile: Kotlin, Compose, Clean Architecture, MVI, Hilt, Kotlinx Serialization | ✅ Accepted |
| [ADR-002](ADR-002-backend-tech-stack.md) | Backend: Java 17, Spring Boot, JPA LAZY-first, PostgreSQL JSONB | ✅ Accepted |
| [ADR-003](ADR-003-data-model-evolution.md) | Tiến hóa mô hình dữ liệu Prototype → v4 (3NF) | ✅ Accepted |
| [ADR-004](ADR-004-offline-read-only.md) | Offline Read-Only thay cho Two-way Sync | ✅ Accepted |
| [ADR-005](ADR-005-exam-unlock-collection-progress.md) | Mở khóa bài thi bằng Collection Progress | ✅ Accepted |
| [ADR-006](ADR-006-mvp-skill-scope.md) | MVP chỉ Reading + Writing | ✅ Accepted |
| [ADR-007](ADR-007-jdk17-toolchain.md) | Thống nhất JDK 17 | ✅ Accepted |
| [ADR-008](ADR-008-guest-first-no-login.md) | Guest-first, chưa làm Login | ✅ Accepted |
| [ADR-009](ADR-009-unity-as-library.md) | Kotlin chủ + Unity nhúng cho City View | 🟡 Proposed |
| [ADR-010](ADR-010-city-view-threejs-webview.md) | City View bằng Three.js (web), nhúng qua WebView — đề xuất thay ADR-009 | 🟡 Proposed |

Nhật ký sự cố: [troubleshooting-log.md](troubleshooting-log.md)

## Trạng thái ADR

```text
PROPOSED    → đã đề xuất, chưa kiểm chứng
ACCEPTED    → đã chốt, đang áp dụng
SUPERSEDED  → bị thay bởi ADR khác (ghi rõ "Superseded by ADR-xxx")
REJECTED    → đã thử và loại bỏ (giữ lại để nhớ lý do)
```

## Mẫu ADR mới

```markdown
# ADR-0xx: <Tên quyết định>

| Mục | Nội dung |
| :--- | :--- |
| **Trạng thái** | 🟡 Proposed |
| **Giai đoạn** | VSx |
| **Liên quan** | SRS §… · UC_… · file code … |

## Context
## Decision
## Reason
## Alternatives
## Consequence
## Lesson
```

---

## KẾT LUẬN & BÀI HỌC CHO BẢN THÂN

Trải qua quá trình tái cấu trúc thiết kế của dự án **LinguaCity**, bài học lớn nhất rút ra là: **"Hãy chuẩn bị kỹ lưỡng về mặt kiến trúc, thay vì vội vàng lao vào viết các tính năng"**.

1.  **Sự tách biệt rạch ròi giữa Static Content và Player State** chính là chìa khóa giúp giữ cho hệ thống luôn sạch sẽ, dễ mở rộng và dễ đồng bộ.
2.  **Nguyên tắc Server Authority** giúp bảo vệ tính toàn vẹn của nền kinh tế trong game, biến Room thành một Operational Cache hiệu quả, giảm tải độ phức tạp của code Mobile đi rất nhiều.
3.  **Học tập qua sai lầm:** Những lỗi hệ thống hay sự thay đổi logic chính là tư liệu học tập quý giá nhất để rèn luyện tư duy của một Kiến trúc sư Phần mềm thực thụ.
