# LINGUACITY — TỔNG QUAN DỰ ÁN (PHẦN MỞ ĐẦU)

**Tên dự án:** LinguaCity (Thành phố Ngôn ngữ)
**Loại dự án:** Game mobile học tiếng Anh (TOEIC) kết hợp xây dựng thành phố
**Người thực hiện:** Nông Hoàng Anh
**Tương ứng báo cáo:** PHẦN MỞ ĐẦU (1. Lý do · 2. Mục tiêu · 3. Đối tượng · 4. Phạm vi · 5. Phương pháp · 6. Kết quả dự kiến)
**Trạng thái:** 🟡 Khung đã có nội dung từ SRS — các mục ⬜ cần bạn viết thêm bằng lời văn của mình

---

## 1. LÝ DO THỰC HIỆN ĐỀ TÀI

Việc học từ vựng và ngữ pháp TOEIC truyền thống thường mang tính lặp lại và dễ gây nhàm chán. Mặc dù gamification (game hóa) đã được áp dụng ở nhiều ứng dụng (như Duolingo), nhưng chúng thường dừng lại ở việc "tích điểm, đua top".

LinguaCity được định hướng xa hơn: xây dựng một **Learning Game** thực thụ, nơi kết quả học tập được liên kết trực tiếp với quá trình quy hoạch và phát triển một thành phố ảo.

⬜ Bổ sung: số liệu từ khảo sát (xem [market-survey.md](../01-requirements/market-survey.md)) và lý do cá nhân (vừa học vừa làm: Android, Spring Boot, Unity).

## 2. MỤC TIÊU ĐỀ TÀI

**Mục tiêu sản phẩm**
- Giúp người học duy trì việc học từ vựng TOEIC bằng vòng lặp *Học → Thi → Xây dựng*.
- Cho phép học từ vựng/Flashcard khi không có mạng.

**Mục tiêu kỹ thuật / học tập**
- Xây dựng app Android theo Clean Architecture + MVI (Kotlin, Jetpack Compose, Hilt, Room, Retrofit).
- Xây dựng Backend theo nguyên tắc Server Authority (Spring Boot, JPA, PostgreSQL).
- Thử nghiệm tích hợp Unity vào app Android (Unity as a Library — ADR-009).
- Thực hành quy trình Vertical Slice, EA Traceability và ghi ADR.

## 3. ĐỐI TƯỢNG NGHIÊN CỨU

- **Người dùng mục tiêu:** ⬜ (gợi ý: sinh viên/người đi làm đang ôn TOEIC mục tiêu 450–750, dùng điện thoại Android).
- **Đối tượng kỹ thuật:** Gamification trong giáo dục; kiến trúc Mobile–Backend có Server Authority; tích hợp game engine vào ứng dụng native.

## 4. PHẠM VI NGHIÊN CỨU

| Trong phạm vi (MVP) | Ngoài phạm vi (Future Expansion) |
| :--- | :--- |
| Android (Kotlin) + Unity cho City View | iOS |
| Guest User (không đăng nhập) | Đăng nhập, Teacher/Student, lớp học |
| Kỹ năng Reading + Writing (ADR-006) | Listening, Speaking |
| 4 công trình: Housing, Road, Park, School | Công trình mới, sự kiện mùa |
| Offline Read-Only (ADR-004) | Đồng bộ hai chiều, nhiều thiết bị |
| Nội dung nạp bằng SQL seed | Trang quản trị nội dung |
| — | Web theo dõi tiến độ, cộng đồng |

## 5. PHƯƠNG PHÁP THỰC HIỆN

- **Mô hình phát triển:** Iterative / Agile-oriented theo **Vertical Slice** — mỗi Slice đi từ UI → API → DB và chạy được (xem [vs1-vs2-handover.md](../05-implementation/vertical-slices/vs1-vs2-handover.md)).
- **Quy trình mỗi Slice:** Business Rule → EA → API/DB contract → Code từ dưới lên → Tích hợp → Test → Cập nhật EA → ADR → **Cập nhật docs**.
- **Công cụ mô hình hóa:** Enterprise Architect (Requirement, Use Case, Logical, Behavioral, Physical, Component).
- **Tài liệu:** Khung toàn cục làm trước; chi tiết từng chức năng viết theo Slice ([learning-roadmap.md](learning-roadmap.md)).

## 6. KẾT QUẢ DỰ KIẾN

- App Android chạy được trọn vòng lặp MVP (Definition of Done tại [SRS §6](../01-requirements/srs-mvp.md)).
- Backend REST API có test tự động.
- Bộ tài liệu: SRS, GDD, System Design, ADR, Test plan, mô hình EA có Traceability.
- ⬜ Báo cáo cuối kỳ (.docx) ghép từ bộ tài liệu này.

---

## 7. THUẬT NGỮ (GLOSSARY)

| Thuật ngữ | Giải thích |
| :--- | :--- |
| Vertical Slice (VS) | Một lát cắt chức năng đi xuyên mọi tầng (UI → API → DB), chạy được độc lập |
| Server Authority | Backend là nơi duy nhất quyết định điểm, tài nguyên, kết quả thi |
| Static Content | Nội dung tĩnh do hệ thống định nghĩa (Theme, Vocabulary, Question, Exam…) |
| Player State | Trạng thái riêng của từng người chơi (tài nguyên, tiến độ, công trình…) |
| Guest UUID | Định danh người chơi do thiết bị sinh, không cần đăng nhập |
| Collection Progress | Số thẻ từ vựng người chơi đã gặp ít nhất một lần |
| Mastery Score | Điểm thông thạo của một thẻ từ vựng (đúng +1, sai −1) |
| Blueprint / Shard | Bản vẽ nâng cấp công trình / Mảnh bản vẽ dùng làm phí thi |
| Unity as a Library (UaaL) | Cách nhúng Unity vào app Android native dưới dạng module thư viện |
| ADR | Architecture Decision Record — bản ghi một quyết định kiến trúc |
| EA | Enterprise Architect — công cụ mô hình hóa UML/ERD |
| Tech Spike | Thử nghiệm kỹ thuật nhỏ, có giới hạn thời gian, để kiểm chứng một quyết định |
