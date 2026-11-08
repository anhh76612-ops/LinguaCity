# LINGUACITY — TÀI LIỆU DỰ ÁN

Game mobile học tiếng Anh (TOEIC) kết hợp xây dựng thành phố. **Kotlin** là ứng dụng chủ (màn hình học tập, flashcard, thi), thành phố hiển thị bằng **Three.js trong WebView** (prototype `city-web/`, ADR-010 — đề xuất thay hướng Unity của ADR-009), **Spring Boot + PostgreSQL** là Backend.

**Bắt đầu từ đây:** [00-overview/learning-roadmap.md](00-overview/learning-roadmap.md) — danh sách việc cần làm tiếp theo.

---

## 1. Cấu trúc thư mục ↔ Chương báo cáo

| Thư mục | Nội dung | Chương báo cáo | Trạng thái |
| :--- | :--- | :--- | :--- |
| [00-overview/](00-overview/) | [Tổng quan dự án](00-overview/project-overview.md), [Lộ trình học](00-overview/learning-roadmap.md), thuật ngữ | Phần mở đầu | 🟡 |
| [01-requirements/](01-requirements/) | [SRS](01-requirements/srs-mvp.md), [Danh mục yêu cầu](01-requirements/requirements-catalog.md), [Use Case](01-requirements/use-cases.md), [Khảo sát](01-requirements/market-survey.md) | Ch.1, Ch.2 | 🟡 |
| [02-game-design/](02-game-design/) | [GDD](02-game-design/gdd.md): core loop, tài nguyên, balance, art | Ch.1 (nghiệp vụ), Ch.3.4 (công thức) | 🟡 |
| [03-architecture/](03-architecture/) | [System Design v3.1](03-architecture/system-design.md) (ERD, ràng buộc, sequence, API, Room, Kotlin+Unity), [Future Expansion](03-architecture/future-expansion.md) | Ch.3, Ch.5, Ch.6.1 | ✅ baseline · 🟡 Ch.9 |
| [04-ui/](04-ui/) | [Danh sách màn hình & sơ đồ chuyển đổi](04-ui/screen-catalog.md) | Ch.4 | 🟡 |
| [05-implementation/](05-implementation/) | [Handover VS1/VS2](05-implementation/vertical-slices/vs1-vs2-handover.md), [kế hoạch kỹ thuật](05-implementation/plans/), bài học [WebView](05-implementation/city-webview-integration.md), [VS2→giao diện](05-implementation/vs2-vs3-tutorial-ui-lessons.md) | Ch.6.1 | 🟡 |
| [06-testing/](06-testing/) | [Test plan & test case](06-testing/test-plan.md) | Ch.6.2 | 🟡 |
| [adr/](adr/) | [ADR-001 → 009](adr/README.md), [nhật ký sự cố](adr/troubleshooting-log.md) | Ch.6.1.2, Kết luận | ✅ |
| [diagrams/](diagrams/) | `images/` (ERD, drawio), `ea-model/` (Enterprise Architect) | Hình trong báo cáo | — |
| [archive/](archive/) | Bản nháp và phiên bản cũ — **chỉ để tham khảo, không cập nhật** | — | 🗄️ |

**Ký hiệu:** ✅ ổn định · 🟡 đang bổ sung · ⬜ chưa bắt đầu · 🗄️ lưu trữ

---

## 2. Thứ tự đọc

1. `00-overview/project-overview.md` — dự án là gì, phạm vi.
2. `01-requirements/srs-mvp.md` → `requirements-catalog.md` → `use-cases.md` — hệ thống phải làm gì (**WHAT**).
3. `02-game-design/gdd.md` — người chơi trải nghiệm gì.
4. `03-architecture/system-design.md` — xây dựng như thế nào (**HOW**).
5. `adr/README.md` — vì sao chọn như vậy (**WHY**).
6. `05-implementation/vertical-slices/vs1-vs2-handover.md` — đã làm gì, làm tiếp gì.

---

## 3. Quy tắc cập nhật tài liệu

- **Khung toàn cục làm trước, chi tiết viết theo Vertical Slice.** Mỗi Slice có Docs checklist (handover §27).
- Mã định danh dùng xuyên suốt: `FR-xxx`/`NFR-xx` (yêu cầu) → `UC_xx` (use case) → `SCR-xx` (màn hình) → `TC-VSx-xx` (test case) → `ADR-0xx` (quyết định).
- Quyết định mới → file ADR mới; lỗi mới → `adr/troubleshooting-log.md`. Không sửa ADR đã Accepted, chỉ tạo ADR mới "Superseded by".
- Ảnh cho báo cáo đặt tên theo số Hình: `diagrams/images/<nhóm>/<chương>.<số>-<mô-tả>.png`.

---

## 4. Tiến độ Vertical Slice

| Slice | Nội dung | Trạng thái |
| :--- | :--- | :--- |
| VS1 | Guest Onboarding + Tutorial | ✅ Verified (08/11/2026, TC-VS1-01..17) |
| VS2 | Static Content Bootstrap (gói theo Level) | ✅ Implemented (08/11/2026, TC-VS2-01..11) |
| VS3 | Vocabulary Learning (phiên học trên server) | ✅ Implemented (08/11/2026, TC-VS3-01..16) |
| VS4 | Exam | ⬜ |
| City View | Three.js + WebView (ADR-010, ADR-011) | ✅ dữ liệu thật từ `GET /city` (M5); 🟡 đo FPS máy thật |
| Tutorial thư ký | Mai + bài kiểm tra trình độ + xây House (ADR-014) | ✅ (M6, TC-TUT-01..09); vào nhà 3D / tuỳ biến ở M7/M8 (nhánh riêng) |
| Danh hiệu | 7 danh hiệu dễ / khó / ẩn | ✅ (M4–M5, TC-ACH-01..04) |
| Giao diện | Splash, loading, menu nổi, HUD, Hồ sơ, Cài đặt, hiệu ứng | ✅ (M9, TC-UI-01/02) |
| VS5 | Building Upgrade + City View | ⬜ |
| VS6+ | Auth, Teacher/Student, Web, Cộng đồng | Future — [future-expansion.md](03-architecture/future-expansion.md) |
