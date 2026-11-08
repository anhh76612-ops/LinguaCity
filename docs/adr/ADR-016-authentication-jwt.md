# ADR-016: Xác thực bằng JWT, tài khoản và gắn tiến trình khách (VS6)

| Mục | Nội dung |
| :--- | :--- |
| **Trạng thái** | 🟡 Proposed — đã cài đặt trên nhánh `feat/vs6-auth`, chờ người dùng duyệt và chạy E2E |
| **Giai đoạn** | VS6 |
| **Liên quan** | ADR-008 (được sửa bởi ADR này) · future-expansion.md §3, §5.1 · kế hoạch `05-implementation/plans/2026-11-08-vs6-authentication.md` · migration `V008__authentication.sql` |

## Context
- Tới VS5, mọi API nhận danh tính chỉ qua header `X-Guest-UUID`. Ai biết UUID là đóng giả được người chơi; mất máy là mất thành phố.
- Người dùng chốt cho VS6:
  1. mở app lần đầu vào **màn Đăng nhập / Đăng ký**, có nút **"Chơi ngay (khách)"**;
  2. khách **bắt buộc** gắn tài khoản **sau khi xong tutorial**, tiến trình được giữ;
  3. đăng nhập bằng **email + mật khẩu**, **Google**, **Facebook**;
  4. **quên mật khẩu** và **xác minh email** bằng OTP làm ngay trong VS6;
  5. **luôn nhớ đăng nhập** 30 ngày, tự gia hạn mỗi lần mở app.

## Decision

### Token
| | Quyết định |
| --- | --- |
| Access token | JWT HS256, 15 phút. Claim: `sub` = id `user_profiles`, `typ` = `GUEST`/`ACCOUNT`, `ev` = email đã xác minh |
| Refresh token | 32 byte ngẫu nhiên, 30 ngày, **xoay vòng** mỗi lần dùng. DB chỉ lưu SHA-256. Mỗi lần đăng nhập mở một họ (`family_id`); token đã dùng bị gửi lại → thu hồi cả họ |
| Luôn nhớ | App gọi `/auth/refresh` mỗi lần mở → hạn 30 ngày tính lại |
| Bí mật ký | `LINGUACITY_JWT_SECRET` (≥ 32 byte). Rỗng: server tự sinh khoá ngẫu nhiên (chỉ dev) |
| Lưu trên máy | EncryptedSharedPreferences (khoá AES trong Android Keystore); loại khỏi sao lưu |

### Danh tính
- Tiến trình **luôn nằm ở `user_profiles`**. Tài khoản là dòng `user_accounts` trỏ 1-1 vào hồ sơ → gắn tài khoản cho khách không phải sao chép dữ liệu.
- `auth_identities` (provider + subject) cho phép một tài khoản có nhiều cách đăng nhập.
- Đăng nhập Google/Facebook có email trùng tài khoản sẵn có: **chỉ tự gộp khi nhà cung cấp xác nhận email** (Google `email_verified`; Facebook chỉ trả email đã xác minh). Ngược lại `409 EMAIL_BELONGS_TO_OTHER_ACCOUNT`.
- Máy đang có khách chưa gắn mà đăng nhập vào tài khoản khác: server trả `409 IDENTITY_LINKED_ELSEWHERE`; app hỏi, gửi lại với `confirmDiscardGuest = true`. Khách bị bỏ lại trên server, **không gộp hai thành phố**.
- Khách bắt buộc gắn tài khoản: `AccountRequiredFilter` trả `403 ACCOUNT_REQUIRED` cho mọi API ngoài `/api/v1/auth/**` khi token `GUEST` và `tutorial_completed = true`. Luật ở server, app chỉ hiển thị.

### Tương thích app bản cũ
- Cờ `linguacity.auth.legacy-guest-header` (bật trong VS6, tắt ở VS7): header `X-Guest-UUID` vẫn được nhận cho hồ sơ **chưa claim**.
- `POST /auth/guest/claim` đổi Guest UUID cũ lấy token **đúng một lần** (`claimed_at`). Sau đó header cũ không dùng được cho hồ sơ đó.
- App bản cũ (principal `LEGACY`) không bị chặn bởi luật bắt buộc tài khoản.

### OTP và chống dò
- OTP 6 số, 10 phút, sai 5 lần thì huỷ, gửi lại cách ≥ 60 giây; chỉ lưu SHA-256.
- Quên mật khẩu chỉ với email đã xác minh; luôn trả `204` (không lộ email). Đặt lại xong → thu hồi mọi refresh token.
- Đăng nhập: 5 lần sai / 15 phút theo email, 20 / 15 phút theo IP → `429 TOO_MANY_ATTEMPTS`. Email không tồn tại vẫn so BCrypt với hash giả để thời gian phản hồi như nhau.
- Mật khẩu: BCrypt cost 12, 8–72 ký tự, có chữ và số.

### Xoá tài khoản (Google Play bắt buộc)
- `DELETE /auth/account` cần xác thực lại (mật khẩu, hoặc token mới của Google/Facebook). Xoá mọi identity, ẩn danh hoá `user_accounts` (`deleted_at`, xoá email/hash), thu hồi mọi refresh token. Hồ sơ chơi còn lại nhưng không ai đăng nhập vào được.

## Alternatives
- **Session cookie** thay JWT: đơn giản cho Web nhưng mobile phải giữ cookie và cần CSRF; Web sau này vẫn dùng được Bearer.
- **Firebase Auth**: nhanh, nhưng thêm phụ thuộc ngoài và mất phần học Spring Security mà dự án nhắm tới.
- **Bắt đăng nhập ngay từ đầu (bỏ khách)**: người chơi mới phải điền form trước khi thấy game; người dùng chọn giữ khách tới hết tutorial.
- **Gộp thành phố khách vào tài khoản có sẵn**: quá phức tạp (hai bộ công trình, từ, danh hiệu); để sau nếu cần.

## Consequence
- Mọi controller nhận người gọi qua `@CurrentUser UUID` thay vì `@RequestHeader("X-Guest-UUID")`.
- Thiếu hoặc sai danh tính giờ trả `401 UNAUTHENTICATED` (trước là `400 MISSING_HEADER`); test TC-VS1-12, TC-VS2-06 đã đổi theo.
- Mobile: các interface Retrofit cũ vẫn khai báo `@Header("X-Guest-UUID")`; `AuthInterceptor` gỡ header này và gắn Bearer khi đã có phiên. Dọn các tham số đó là việc nhỏ ở VS7 (cùng lúc tắt cờ legacy).
- Rủi ro chấp nhận: ai biết Guest UUID của khách bản cũ có thể claim trước chủ thật (UUID không lộ ra ngoài).

## Lesson
Tách **danh tính** (`user_accounts`, `auth_identities`) khỏi **tiến trình** (`user_profiles`) từ VS1 (ADR-008) khiến VS6 chỉ cần thêm bảng, không phải di chuyển dữ liệu chơi.
