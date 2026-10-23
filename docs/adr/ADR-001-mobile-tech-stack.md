# ADR-001: Ngăn xếp công nghệ Mobile (Kotlin, Compose, Clean Architecture, MVI, Hilt)

| Mục | Nội dung |
| :--- | :--- |
| **Trạng thái** | ✅ Accepted |
| **Giai đoạn** | Giai đoạn 1–2 (Requirements & Design) |
| **Liên quan** | SRS §5.1 · System Design Ch.7 · ADR-009 |

> Nội dung bên dưới được tách nguyên văn từ báo cáo ADR tổng hợp cũ (`archive/architectural-decisions-lessons.md`). Theo mẫu ADR của dự án: **Context → Decision → Reason → Alternatives → Consequence → Lesson**.

### 1. Ngăn xếp công nghệ Mobile App (Mobile Tech Stack)
Trong quá trình khởi tạo ứng dụng Android, nhóm phát triển đã đưa ra các quyết định công nghệ quan trọng để đối phó với sự phức tạp của cơ chế Game hóa (Gamification) và mô hình dữ liệu cục bộ.

```
┌────────────────────────────────────────────────────────┐
│                      PRESENTATION                      │
│       Jetpack Compose (UI)  ◄───►  MVI + StateFlow     │
└───────────────────────────┬────────────────────────────┘
                            │ (Hilt Dependency Injection)
┌───────────────────────────▼────────────────────────────┐
│                         DOMAIN                         │
│             UseCases / Pure Domain Models              │
└───────────────────────────▲────────────────────────────┘
                            │ (Repository Pattern)
┌───────────────────────────┴────────────────────────────┐
│                          DATA                          │
│    Room DB (Local Operational) ◄──► Retrofit (Network) │
└────────────────────────────────────────────────────────┘
```

*   **Kotlin & Jetpack Compose:**
    *   *Quyết định:* Sử dụng Kotlin làm ngôn ngữ phát triển và Jetpack Compose làm framework xây dựng giao diện khai báo (Declarative UI).
    *   *Lý do:* Kotlin tối ưu tốt với Null-safety, Coroutines và Data class, rất thích hợp cho xử lý các State game phức tạp. Jetpack Compose giúp đồng bộ trạng thái giao diện mượt mà theo luồng state một chiều, giảm tối đa mã boilerplate so với XML truyền thống.
*   **Kiến trúc Clean Architecture:**
    *   *Quyết định:* Phân rã mã nguồn thành 3 phân tầng độc lập: `presentation`, `domain`, và `data`.
    *   *Lý do:* Đảm bảo tính lỏng lẻo (decoupling) giữa giao diện, logic nghiệp vụ và các cổng truy cập ngoại vi (Room Database, API Client). Khi cần đổi thư viện lưu trữ hay cập nhật giao diện, tầng logic nghiệp vụ (`domain`) vẫn được giữ an toàn.
*   **MVI (Model-View-Intent) + StateFlow thay vì MVVM:**
    *   *Quyết định:* Quy hoạch toàn bộ trạng thái màn hình về một Data Class duy nhất dưới dạng luồng dữ liệu một chiều (Unidirectional Data Flow) sử dụng StateFlow.
    *   *Lý do:* Ứng dụng tích hợp gameplay chứa quá nhiều biến trạng thái hoạt động song song (tài nguyên, đồng hồ đếm ngược, cấp độ nhà, tiến độ từ vựng, kết quả kiểm tra). Việc dùng MVVM truyền thống với nhiều biến LiveData/StateFlow rời rạc rất dễ dẫn đến trạng thái bất đồng bộ UI và gây ra lỗi hiển thị. MVI tạo ra "Single Source of Truth" cho UI để đảm bảo giao diện luôn phản ánh đúng 100% trạng thái dữ liệu hiện có.
*   **Hilt làm công cụ Dependency Injection thay vì Koin:**
    *   *Quyết định:* Sử dụng Hilt để quản lý phụ thuộc (DI) cho hệ thống.
    *   *Lý do:* Dù Koin dễ cấu hình hơn, nhưng trong một dự án Clean Architecture đa module, Hilt cung cấp khả năng kiểm tra lỗi phụ thuộc ngay trong thời gian biên dịch (Compile-time safety) thay vì gây ra crash bất ngờ khi ứng dụng chạy (Runtime crash) như Koin.
*   **Kotlinx Serialization thay vì Gson/Moshi:**
    *   *Quyết định:* Sử dụng Kotlinx Serialization làm thư viện Serialization chính thức cho cả Retrofit và Room TypeConverter.
    *   *Lý do:* Là thư viện native của Kotlin, hỗ trợ tuyệt đối Null-safety. Quyết định kiến trúc bắt buộc Backend trả về cấu trúc câu ví dụ (`examples`) dưới dạng mảng JSON (JSON Array) tĩnh. Kotlinx Serialization ánh xạ trực tiếp mảng này thành `List<String>` ở DTO, sau đó Room TypeConverter chuyển đổi thành chuỗi lưu vào SQLite, triệt tiêu hoàn toàn việc deserialize 2 lần (double-deserialization) gây lãng phí tài nguyên CPU của thiết bị.
*   **Jetpack Compose Navigation Type-Safe (phiên bản 2.8.x):**
    *   *Quyết định:* Loại bỏ hoàn toàn String Route truyền thống, sử dụng các Data Class/Object tĩnh để định nghĩa điểm đến trong đồ thị điều hướng.
    *   *Lý do:* Tránh lỗi gõ sai đường dẫn dẫn tới crash ứng dụng, đảm bảo tính an toàn dữ liệu tuyệt đối khi truyền tham số giữa các màn hình.
