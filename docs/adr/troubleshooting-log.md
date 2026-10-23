# NHẬT KÝ KHẮC PHỤC SỰ CỐ (TROUBLESHOOTING LOG)

> Mỗi sự cố ghi theo mẫu: **Triệu chứng → Nguyên nhân → Giải pháp → Bài học**. Sự cố mới ghi tiếp ở cuối file, kèm Vertical Slice phát sinh.
> Đây là nguồn chính cho mục "Khó khăn gặp phải" trong Chương 6 và Phần Kết luận của báo cáo.

| # | Sự cố | Slice | Trạng thái |
| :--- | :--- | :--- | :--- |
| 1 | Git Root của Monorepo | Setup | ✅ |
| 2 | Cú pháp Version Catalog | Setup | ✅ |
| 3 | Project JDK is not defined | Setup | ✅ |
| 4 | Database `linguacity_db` does not exist | Setup | ✅ |
| 5 | PostgreSQL password authentication failed | VS1 | ✅ |
| 6 | Android chặn HTTP cleartext | VS1 | ✅ |
| 7 | Emulator không gọi được `localhost` | VS1 | ✅ |
| 8 | Lỗi parse XML AndroidManifest (dấu phẩy thừa) | VS1 | ✅ |

---

### 🛠️ Sự cố 1: Lỗi chưa đăng ký Git Root của Monorepo
*   **Triệu chứng:** Hệ thống cảnh báo nhận diện file nằm ngoài vùng theo dõi của Git, không thể kiểm soát lịch sử commit của thư mục ứng dụng di động.
*   **Nguyên nhân:** Dự án được thiết lập theo cấu trúc Monorepo (thư mục `mobile`, `backend` và `docs` nằm ngang hàng nhau). Khi khởi tạo dự án Android Studio bên trong thư mục `mobile`, Android Studio tự tạo một Git repository riêng độc lập với Git Root tổng của dự án.
*   **Giải pháp:** Xóa thư mục `.git` thừa bên trong thư mục `mobile`, cập nhật lại file `.gitignore` tổng ở thư mục gốc của Monorepo, sau đó chạy lệnh cấu hình lại Git Root để quản lý tập trung toàn bộ dự án dưới một Git duy nhất.

### 🛠️ Sự cố 2: Lỗi cú pháp Version Catalog trong build.gradle.kts
*   **Triệu chứng:** Đồng bộ Gradle thất bại với thông báo lỗi: `Unresolved reference: jetbrains/version catalog`.
*   **Nguyên nhân:** Có sự sai lệch về cú pháp đặt tên bí danh (alias) mặc định của Kotlin plugin giữa phiên bản Android Studio mới và cấu hình lưu trữ trong tệp `libs.versions.toml`.
*   **Giải pháp:** Thực hiện đồng bộ hóa lại Gradle (Gradle Sync) và sửa định nghĩa plugin trong file `build.gradle.kts` từ dạng cũ `libs.plugins.jetbrains.kotlin.android` về cấu trúc chuẩn hiện đại là `libs.plugins.kotlin.android`. Hệ thống sau đó đã thông báo **BUILD SUCCESSFUL**.

### 🛠️ Sự cố 3: Lỗi "Project JDK is not defined" tại Android Studio
*   **Triệu chứng:** Android Studio không thể biên dịch mã nguồn Gradle, báo lỗi thiếu JDK biên dịch.
*   **Nguyên nhân:** Dự án sử dụng cấu hình Gradle Toolchain yêu cầu JDK 17, tuy nhiên môi trường Android Studio cục bộ chưa được thiết lập đường dẫn JDK tương thích.
*   **Giải pháp:** Mở trực tiếp file cấu hình build hệ thống `build.gradle.kts`, sử dụng tính năng tải xuống tự động của Android Studio để tải bản JDK 17 trực tiếp từ giao diện IDE và trỏ classpath Gradle biên dịch về thư mục JDK vừa tải.

### 🛠️ Sự cố 4: Lỗi FATAL database "linguacity_db" does not exist (Spring Boot)
*   **Triệu chứng:** Ứng dụng Backend Spring Boot crash ngay khi khởi động với thông báo lỗi kết nối PostgreSQL.
*   **Nguyên nhân:** Nhóm phát triển lầm tưởng rằng cấu hình tự động của JPA Hibernate `ddl-auto=update` sẽ tự khởi động toàn bộ hạ tầng bao gồm cả database đích. Tuy nhiên thực tế, Hibernate chỉ có khả năng tự động tạo bảng (Tables), tạo khóa (Keys) và chỉ mục (Indexes) chứ **không thể tự tạo cơ sở dữ liệu gốc (Database Schema)**.
*   **Giải pháp:** Truy cập vào công cụ quản trị PostgreSQL (pgAdmin 4), chạy lệnh khởi tạo cơ sở dữ liệu gốc `CREATE DATABASE linguacity_db;` thủ công trước, sau đó mới tiến hành chạy ứng dụng Spring Boot.

### 🛠️ Sự cố 5: PostgreSQL `password authentication failed for user "postgres"` (VS1)
*   **Nguyên nhân:** Thông tin datasource trong cấu hình Spring Boot không khớp mật khẩu PostgreSQL cục bộ.
*   **Giải pháp:** Đưa mật khẩu ra biến môi trường `SPRING_DATASOURCE_PASSWORD` hoặc file `backend/config/local.properties` (đã được Git bỏ qua). Xem README gốc.
*   **Bài học:** Không commit mật khẩu; tách cấu hình theo máy ngay từ đầu.

### 🛠️ Sự cố 6: `CLEARTEXT communication to 10.0.2.2 not permitted` (VS1)
*   **Nguyên nhân:** Android mặc định chặn HTTP không mã hóa.
*   **Giải pháp:** Thêm quyền `INTERNET` và `android:usesCleartextTraffic="true"` — **chỉ cho môi trường local**.
*   **Bài học:** Ghi nợ kỹ thuật: production phải dùng HTTPS hoặc `network_security_config` giới hạn theo domain.

### 🛠️ Sự cố 7: Emulator không truy cập được Backend qua `localhost` (VS1)
*   **Nguyên nhân:** `localhost` bên trong Emulator là chính Emulator, không phải máy host.
*   **Giải pháp:** Retrofit dùng `http://10.0.2.2:8080/`. Điện thoại thật dùng IP LAN của máy chạy Backend.

### 🛠️ Sự cố 8: Lỗi parse XML AndroidManifest (VS1, 18/10/2026)
*   **Triệu chứng:** `assembleDebug` thất bại do Manifest parse lỗi tại dòng 18.
*   **Nguyên nhân:** Dấu phẩy thừa sau khai báo `MainActivity`.
*   **Giải pháp:** Xóa dấu phẩy, build lại thành công. Chi tiết: `05-implementation/plans/2026-10-18-build-and-identity.md`.
