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
| [ADR-011](ADR-011-city-state-contract.md) | Hai hợp đồng City View (API / Bridge), Kotlin tính tiến độ, `level 0` = chưa xây | 🟡 Proposed |
| [ADR-012](ADR-012-content-packs-by-level.md) | Nội dung tĩnh chia gói theo (công trình, Level), tải khi cần, kiểu pull; sẵn `scope` cho lớp học | 🟡 Proposed |
| [ADR-013](ADR-013-server-learning-session.md) | Phiên học do server quản lý; sưu tầm = đúng lần đầu (sửa ADR-005); chống cày KP | 🟡 Proposed |
| [ADR-014](ADR-014-secretary-tutorial-placement.md) | Tutorial thư ký + bài kiểm tra trình độ + xây House thật | 🟡 Proposed |
| [ADR-015](ADR-015-progression-after-level-one.md) | Tiến trình sau Lv1: thi, nâng cấp, nhiệm vụ, sự kiện, luyện tập, chuỗi; bài học 20 từ / 30 câu | 🟡 Proposed |
| [ADR-017](ADR-017-economy-v2-mastery-decay.md) | Kinh tế v2 (Gạch, Gỗ, Năng lượng, Town Level, thuế); Mastery v2: sai không trừ, giảm theo thời gian, FSRS | 🟡 Proposed |
| [ADR-018](ADR-018-ai-characters-content-pipeline.md) | AI cho nhân vật (chat trực tuyến có giới hạn) + pipeline LLM sinh nội dung offline | 🟡 Proposed |

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
