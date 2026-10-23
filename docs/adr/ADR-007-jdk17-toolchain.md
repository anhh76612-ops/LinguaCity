# ADR-007: Thống nhất JDK 17 cho Backend và Mobile

| Mục | Nội dung |
| :--- | :--- |
| **Trạng thái** | ✅ Accepted |
| **Giai đoạn** | VS1 (Setup môi trường) |
| **Liên quan** | ADR-002 · troubleshooting-log #3 · README gốc |

## Context
Máy phát triển có cùng lúc JDK 17, 21 và 25. Ban đầu Gradle 8.13 chạy trên JDK 25, gây lỗi không ổn định khi build Android và Backend.

## Decision
Dùng **JDK 17** cho cả `backend/` và `mobile/` (Gradle JDK trong Android Studio cũng đặt là 17).

## Reason
Khớp baseline Backend (Java 17 + Spring Boot), giảm biến động toolchain giữa hai dự án Gradle độc lập.

## Alternatives
- JDK 21 (LTS mới hơn): chưa cần tính năng nào của 21; tăng rủi ro tương thích plugin Android.
- Mỗi project một JDK: dễ nhầm khi chạy lệnh từ terminal.

## Consequence
Mọi lệnh build trong README đều đặt `$env:JAVA_HOME = 'C:\Program Files\Java\jdk-17'` trước khi chạy.

## Lesson
Toolchain phải được chốt **trước** khi viết dòng code đầu tiên, và ghi rõ vào README.
