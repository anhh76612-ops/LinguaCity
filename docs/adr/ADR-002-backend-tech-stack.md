# ADR-002: Ngăn xếp công nghệ Backend (Java 17, Spring Boot, JPA LAZY-first, PostgreSQL JSONB)

| Mục | Nội dung |
| :--- | :--- |
| **Trạng thái** | ✅ Accepted |
| **Giai đoạn** | Giai đoạn 1–2 |
| **Liên quan** | SRS §5.2 · System Design Ch.5 |

> Nội dung bên dưới được tách nguyên văn từ báo cáo ADR tổng hợp cũ (`archive/architectural-decisions-lessons.md`). Theo mẫu ADR của dự án: **Context → Decision → Reason → Alternatives → Consequence → Lesson**.

### 2. Ngăn xếp công nghệ phía Backend (Backend Tech Stack)
Kiến trúc Backend được thiết kế nhằm mục đích đảm bảo **Server Authority (Uy quyền tối cao của Máy chủ)**:

*   **Java 17 & Spring Boot:**
    *   *Quyết định:* Sử dụng JDK 17 kết hợp framework Spring Boot để xây dựng RESTful API.
    *   *Lý do:* JDK 17 cung cấp các tính năng hiện đại (như Records) giúp tối ưu hóa bộ nhớ, Spring Boot có hệ sinh thái mạnh mẽ hỗ trợ tối đa việc xử lý Transactions và kết nối Database an toàn.
*   **Spring Data JPA (Hibernate) với chiến lược LAZY-first:**
    *   *Quyết định:* Bắt buộc cấu hình `FetchType.LAZY` cho tất cả các quan hệ `@ManyToOne`, `@OneToMany` hoặc `@ManyToMany`.
    *   *Lý do:* Loại bỏ triệt để vấn đề truy vấn thừa $N+1$ Query. Chỉ thực hiện JOIN thực sự khi có yêu cầu bằng cách dùng `JOIN FETCH` trong các câu truy vấn JPQL tùy biến tại tầng Repository.
*   **Cơ sở dữ liệu PostgreSQL & JSONB:**
    *   *Quyết định:* Sử dụng PostgreSQL làm cơ sở dữ liệu quan hệ chính, hỗ trợ ánh xạ các trường dữ liệu động như ví dụ từ vựng (`examples`) và cấu trúc bài tập của Mini-game (`metadata`) dưới định dạng cột **JSONB**.
    *   *Lý do:* PostgreSQL xử lý truy vấn JSONB cực kỳ tối ưu. Việc sử dụng JSONB giúp hệ thống lưu trữ được nhiều biến thể game tùy biến (như câu hỏi trắc nghiệm, trò chơi ghép cặp, sắp xếp từ...) mà không cần phải thiết kế hàng chục bảng con rườm rà, tránh phình to cơ sở dữ liệu vật lý.
