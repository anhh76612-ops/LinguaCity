# ADR-008: Guest-first — chưa làm Login/Register trong MVP

| Mục | Nội dung |
| :--- | :--- |
| **Trạng thái** | ✅ Accepted — **được sửa bởi ADR-016 (VS6)** |
| **Giai đoạn** | VS1 (Guest Onboarding) |
| **Liên quan** | SRS §5.1 · UC_01 · future-expansion.md (VS6–VS7) · handover §11 |

## Context
Sau khi VS1 chạy được luồng Guest UUID, có xu hướng mở rộng ngay sang Login, Register, Teacher/Student.

## Decision
Không mở rộng VS1 sang Login, Register, Forgot Password, Teacher, Student, Admin, Tenant, Class, Course hay Teacher Content Authoring. Những tính năng này là **Future Expansion** (VS6 trở đi).

## Reason
- SRS chỉ yêu cầu Guest onboarding ở bước đầu.
- Login/Role tạo thêm một domain Identity/Authorization riêng.
- Làm ngay sẽ phá nguyên tắc Vertical Slice nhỏ, làm project phình scope.

## Alternatives
- Làm JWT ngay từ VS1: chứng minh được Spring Security sớm, nhưng chưa chứng minh giá trị chính của sản phẩm (Learn → Exam → Build).

## Consequence
- `UserProfile` giữ "thuần khiết": chỉ ID và tài nguyên, **không có Role**.
- Khi có Auth, bảng `Identity` riêng liên kết 1-1 với `UserProfile` (xem future-expansion.md, Quyết định 1).

## Lesson
Ưu tiên Core Loop trước Authentication: *Prepare the architecture, not the feature.*

## Cập nhật VS6 (ADR-016)
Khách giờ chỉ là **tạm thời**: mở app vào màn Đăng nhập / Đăng ký, có nút "Chơi ngay (khách)"; khách
xong tutorial bắt buộc gắn tài khoản (email, Google, Facebook) để chơi tiếp. Thiết kế tách
`user_accounts` khỏi `user_profiles` đúng như Consequence ở trên.
