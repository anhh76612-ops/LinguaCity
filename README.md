# LinguaCity

Game học tiếng Anh kết hợp phát triển thành phố. Hiện tại đã triển khai luồng khởi tạo người chơi khách (VS1); nội dung học tập, bài thi và nâng cấp công trình thuộc các lát cắt tiếp theo.

## Cấu trúc

```text
LinguaCity/
├── backend/      Spring Boot, Java 17, PostgreSQL
├── mobile/       Android, Kotlin, Jetpack Compose
├── database/     SQL migration lưu trong repository
├── city-web/     City View: bản đồ thành phố 3D isometric (Three.js, TypeScript, Vite)
└── docs/         Yêu cầu, thiết kế game, kiến trúc, ADR, kiểm thử — mục lục tại docs/README.md
```

City View đang được làm thành dự án web `city-web/` (xem `city-web/README.md` và `docs/adr/ADR-010-city-view-threejs-webview.md`, đề xuất thay cho hướng Unity ở ADR-009). Chạy thử: `cd city-web; npm install; npm run dev`.

Backend và Mobile là hai dự án Gradle độc lập. Mở `backend/` và `mobile/` riêng trong IDE, hoặc liên kết hai dự án Gradle nếu mở thư mục gốc.

### Backend: chia package theo nghiệp vụ

```text
com.linguacity.backend/
├── BackendApplication.java
└── identity/
    ├── controller/UserProfileController.java
    ├── service/UserOnboardingService.java
    ├── repository/UserProfileRepository.java
    ├── entity/UserProfile.java
    └── dto/OnboardUserResponse.java
```

`identity` hiện quản lý Guest UUID và hồ sơ người chơi. Đây là module ở mức package trong một ứng dụng Spring Boot. `auth` (đăng nhập, xác thực), `learning`, `exam` và `building` sẽ được thêm khi có chức năng thực tế; chưa phải các module Gradle hay dịch vụ riêng.

### Trách nhiệm Mobile và Backend

| Phần | Trách nhiệm |
| --- | --- |
| Backend Controller | Nhận HTTP request và trả response DTO. |
| Backend Service | Xử lý nghiệp vụ và kiểm soát thay đổi trạng thái người chơi. |
| Backend Repository | Đọc/ghi PostgreSQL qua JPA. |
| Mobile Presentation | Giao diện Compose, tương tác, trạng thái màn hình và ViewModel. |
| Mobile Domain | UseCase, model và interface Repository cho phía ứng dụng. |
| Mobile Data | Retrofit gọi API, Room lưu cache và DataStore lưu Guest UUID. |
| Mobile DI | Hilt kết nối các đối tượng phụ thuộc. |

Mobile không chỉ chứa giao diện: ứng dụng còn điều phối việc gọi API, lưu cache và cập nhật trạng thái màn hình. Backend là nơi quyết định điểm, kết quả thi, tài nguyên và nâng cấp công trình. Offline chỉ đọc nội dung đã cache theo thiết kế MVP.

## Chạy Backend trên Windows

1. Cài JDK 17 và chạy PostgreSQL trên `localhost:5432`.
2. Tạo database `linguacity_db` nếu chưa tồn tại. Kiểm tra thông tin kết nối trong `backend/src/main/resources/application.properties`. Đặt mật khẩu bằng biến môi trường `SPRING_DATASOURCE_PASSWORD`, hoặc tạo `backend/config/local.properties` với thuộc tính `spring.datasource.password` của máy bạn (file này được Git bỏ qua). Có thể ghi đè URL và tên đăng nhập bằng `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`.
3. Trong PowerShell tại thư mục gốc:

```powershell
$env:JAVA_HOME = 'C:\Program Files\Java\jdk-17'
.\backend\gradlew.bat -p backend bootRun
```

Thay đường dẫn JDK nếu cài ở vị trí khác. Backend mặc định chạy cổng 8080. Cấu hình phát triển hiện dùng Hibernate `ddl-auto=update`; Hibernate không tạo database gốc. Các file trong `database/migration` chưa được tự động chạy bằng Flyway/Liquibase.

Thử onboarding khi Backend đang chạy, trong cửa sổ PowerShell khác:

```powershell
$guestId = [guid]::NewGuid().ToString()
Invoke-RestMethod -Method Post -Uri 'http://localhost:8080/api/v1/users/onboard' -Headers @{ 'X-Guest-UUID' = $guestId }
```

Gọi lại với cùng `$guestId` để sử dụng lại hồ sơ hiện có.

## Chạy Android

1. Mở `mobile/` bằng Android Studio, chọn Gradle JDK 17, đồng bộ Gradle.
2. Cài Android SDK Platform 36 và thiết lập SDK trong `mobile/local.properties` nếu máy chưa có.
3. Chạy Backend rồi mở Android Emulator và Run cấu hình `app`.

```powershell
$env:JAVA_HOME = 'C:\Program Files\Java\jdk-17'
.\mobile\gradlew.bat -p mobile :app:assembleDebug
```

APK: `mobile/app/build/outputs/apk/debug/app-debug.apk`.

`NetworkModule` đang trỏ tới `http://10.0.2.2:8080/`, là địa chỉ truy cập máy host từ Android Emulator. Điện thoại thật cần địa chỉ LAN của máy chạy Backend. HTTP cleartext hiện được bật cho chạy local.

Màn hình hiện có loading/error cho onboarding; khi thành công, callback trong `MainActivity` chưa điều hướng và màn hình có thể trống. Chưa có CityScreen. Đây là trạng thái UI hiện tại, không phải bằng chứng ứng dụng bị crash.

## Kiểm tra

```powershell
$env:JAVA_HOME = 'C:\Program Files\Java\jdk-17'
.\backend\gradlew.bat -p backend test bootJar
```

Kiểm tra Backend dùng H2 trong bộ nhớ, không dùng PostgreSQL thật: kiểm tra Guest mới, giữ tài nguyên Guest cũ, hợp đồng JSON, header thiếu/sai và luồng Spring MVC → JPA sau khi chuyển package. Vẫn cần kiểm tra tích hợp với PostgreSQL thật và Android Emulator khi chạy local.
