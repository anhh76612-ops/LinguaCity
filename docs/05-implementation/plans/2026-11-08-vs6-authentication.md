# Kế hoạch chi tiết VS6: Đăng nhập / Đăng ký, gắn tài khoản, bảo mật phiên

> **Trạng thái (08/11/2026):** M17–M20 đã code trên nhánh `feat/vs6-auth` (chưa commit). Còn lại:
> người dùng chạy migration V008, cấu hình Google/Facebook/SMTP, rồi M21 (E2E).
> Thiết kế chốt ở [ADR-016](../../adr/ADR-016-authentication-jwt.md).
>
> **Khác so với bản kế hoạch:**
> - Mobile chưa gỡ tham số `@Header("X-Guest-UUID")` khỏi các interface Retrofit; `AuthInterceptor`
>   gỡ header đó và gắn Bearer khi có phiên. Dọn ở VS7 cùng lúc tắt cờ legacy.
> - `POST /users/onboard` giữ nguyên đường dẫn, giờ đọc người gọi từ token (hoặc header cũ).
> - Dữ liệu thời gian dùng `LocalDateTime` (UTC) như các bảng trước, không dùng `Instant`.

## Bối cảnh
- VS4 (thi) và VS5 (nâng cấp) đã merge (PR #8). Hiện mọi API nhận danh tính chỉ qua header
  `X-Guest-UUID`, nên ai biết UUID là đóng giả được người chơi.
- Người dùng đã chốt:
  1. Mở app lần đầu → **màn Đăng nhập / Đăng ký**, có nút **"Chơi ngay (khách)"**.
  2. Người chơi khách **bắt buộc đăng nhập/đăng ký sau khi xong tutorial** để chơi tiếp.
     Tiến trình khách được gắn vào tài khoản, không mất.
  3. Cách đăng nhập: **Email + mật khẩu**, **Google** (Credential Manager), **Facebook**.
  4. **Quên mật khẩu và xác minh email** làm ngay trong VS6.
  5. **Lưu đăng nhập:** luôn nhớ, refresh token 30 ngày, tự gia hạn mỗi lần mở app.
- Kết quả mong muốn: người chơi có tài khoản thật, đăng nhập được trên máy khác và lấy lại
  thành phố. Đây là nền cho VS7 (phân quyền) và cho Web sau này.
- File kế hoạch cũ `docs/05-implementation/plans/2026-11-08-vs6-authentication.md` sẽ được
  **viết lại** theo nội dung dưới đây.

## Ngoài phạm vi
- Role Student/Teacher → VS7. Sign in with Apple (chưa có bản iOS). Web dashboard. 2FA.
- Bridge city-web giữ v1, không đổi.

## Cách làm trong phiên này (người dùng chốt)
- Code ngay tại `D:\LinguaCity\LinguaCity`: tạo nhánh `feat/vs6-auth` từ `main` (giữ nguyên các
  file test chưa track hiện có), làm lần lượt M17 → M20.
- **Không commit, không push.** Chỉ biên dịch (`gradlew compileJava`, `gradlew compileDebugKotlin`)
  và chạy `check_style.py`. Xong thì gửi người dùng danh sách lệnh `git add` / `git commit`
  (chia theo mốc) / `git push` để tự chạy.
- Phần cần bí mật (OAuth client, SMTP, JWT secret) để placeholder trong `application.properties`
  đọc từ biến môi trường; người dùng tự điền.

## 1. Luồng người dùng (mobile)

```
Mở app ── có refresh token hợp lệ? ──có──► refresh ngầm ──► Thành phố
   │không
   ▼
SCR-20 Màn chào: [Đăng nhập] [Đăng ký] [Google] [Facebook] [Chơi ngay (khách)]
   │khách                                                   │tài khoản
   ▼                                                        ▼
POST /auth/guest ─► Tutorial (VS1–VS3 như cũ) ──xong──► SCR-23 "Lưu tiến trình"
                                                        (bắt buộc, không có nút bỏ qua)
                                                        Đăng ký / Google / Facebook / Đăng nhập
                                                        → gắn vào user_profile của khách
```
- Khách cũ (cài bản trước VS6, đã qua tutorial): mở bản mới → `claim` lấy token → thấy ngay SCR-23.
- Màn SCR-23 chặn mọi API game trừ `auth/*`. Server cũng chặn: khách đã xong tutorial gọi API
  game → `403 ACCOUNT_REQUIRED`. Luật nằm ở server, không chỉ ở client.
- Đăng nhập tài khoản A trên máy đang có khách chưa gắn → hỏi xác nhận; giữ tài khoản A,
  khách trên máy bị bỏ (vẫn còn trên server, không xoá).
- Đăng xuất → thu hồi refresh token, xoá cache Room theo người dùng, quay về SCR-20.

## 2. Quyết định kỹ thuật

| Vấn đề | Quyết định |
| --- | --- |
| Access token | JWT HS256, 15 phút; claim `sub` = `user_profile_id`, `typ` = `GUEST`/`ACCOUNT`, `ev` = email đã xác minh |
| Refresh token | 32 byte ngẫu nhiên, 30 ngày, **xoay vòng** mỗi lần refresh, DB chỉ lưu SHA-256; gửi lại token đã dùng → thu hồi cả họ (`family_id`) |
| "Luôn nhớ" | Mỗi lần mở app gọi refresh → hạn 30 ngày tính lại. Không mở app quá 30 ngày → đăng nhập lại |
| Nơi lưu trên máy | EncryptedSharedPreferences (khoá trong Android Keystore) |
| Mật khẩu | BCrypt cost 12; 8–72 ký tự, có chữ và số |
| Email + mật khẩu | Đăng ký → gửi **OTP 6 số** (10 phút) xác minh email. Chưa xác minh vẫn chơi được, có banner nhắc; quên mật khẩu chỉ dùng được với email đã xác minh |
| Quên mật khẩu | `forgot` gửi OTP 6 số (10 phút, tối đa 5 lần nhập sai) → `reset` đặt mật khẩu mới → thu hồi **mọi** refresh token. Luôn trả 200 kể cả email không tồn tại (không lộ tài khoản) |
| Gửi mail | Spring Mail (SMTP), cấu hình qua biến môi trường; dev dùng Gmail App Password hoặc Mailpit chạy local; interface `MailSender` để sau đổi sang Resend |
| Google | Credential Manager + `GetGoogleIdOption` → app gửi ID token → backend kiểm tra bằng `google-api-client` (`GoogleIdTokenVerifier`, `aud` = Web client id) |
| Facebook | Facebook Login SDK Android → app gửi access token → backend gọi Graph `debug_token` (kiểm `app_id`, `is_valid`) rồi `/me?fields=id,email,name` |
| Một tài khoản, nhiều cách đăng nhập | Bảng `auth_identities` (provider + subject). Email trùng với tài khoản có sẵn: **chỉ tự gộp khi provider báo email đã xác minh** (Google luôn có; Facebook chỉ trả email đã xác minh); nếu không → `409 EMAIL_BELONGS_TO_OTHER_ACCOUNT`, gợi ý đăng nhập cách cũ rồi gắn thêm ở Cài đặt |
| Khách cũ | `POST /auth/guest/claim {guestUuid}` cấp token **một lần** (`claimed_at`) |
| Header cũ | Cờ `linguacity.auth.legacy-guest-header` (bật trong VS6 để bản app cũ không gãy, tắt ở VS7) |
| Controller | `@CurrentUser UUID userId` (argument resolver đọc `SecurityContext`), service không đổi |
| Chống dò | Đăng nhập: 5 lần sai / 15 phút theo email + 20 / 15 phút theo IP → `429`. OTP: 5 lần sai thì huỷ mã; gửi lại tối thiểu 60 giây |
| Bí mật | `LINGUACITY_JWT_SECRET`, `GOOGLE_WEB_CLIENT_ID`, `FACEBOOK_APP_ID/SECRET`, `SMTP_*` lấy từ biến môi trường, không commit |
| Xoá tài khoản | `DELETE /auth/account` (Google Play bắt buộc): nhập lại mật khẩu hoặc đăng nhập lại provider → ẩn danh hoá `user_profile`, xoá identities và tokens |

## 3. API (`/api/v1/auth`)

| Endpoint | Auth | Mô tả / lỗi |
| --- | --- | --- |
| `POST /guest` | — | Tạo khách + cặp token (thay `onboard`, giữ `onboard` làm alias) |
| `POST /guest/claim` | — | `409 GUEST_ALREADY_CLAIMED`, `404` |
| `POST /register` | Bearer khách (tuỳ chọn) | `{email,password,displayName}`; có token khách → gắn vào profile đó; không có → profile mới. `409 EMAIL_TAKEN`, `400 WEAK_PASSWORD` |
| `POST /login` | — | `401 INVALID_CREDENTIALS`, `429 TOO_MANY_ATTEMPTS` |
| `POST /google` | Bearer khách (tuỳ chọn) | `{idToken}`; `401 PROVIDER_TOKEN_INVALID`, `409 EMAIL_BELONGS_TO_OTHER_ACCOUNT` |
| `POST /facebook` | Bearer khách (tuỳ chọn) | `{accessToken}`; lỗi như trên |
| `POST /refresh` | — | `{refreshToken}` → cặp mới; `401 REFRESH_INVALID` |
| `POST /logout` | Bearer | Thu hồi họ token hiện tại |
| `POST /email/verify/send`, `POST /email/verify` | Bearer | `{code}`; `400 OTP_INVALID`, `410 OTP_EXPIRED`, `429` |
| `POST /password/forgot`, `POST /password/reset` | — | `{email}` / `{email,code,newPassword}` |
| `POST /identities/{provider}` | Bearer tài khoản | Gắn thêm Google/Facebook/mật khẩu |
| `GET /me` | Bearer | `{userId,type,email,emailVerified,providers[]}` |
| `DELETE /account` | Bearer | Xoá tài khoản |

Khi đăng nhập Google/Facebook bằng token khách mà identity đó **đã thuộc tài khoản khác**
→ trả `409 IDENTITY_LINKED_ELSEWHERE` kèm cờ để app hỏi "Đăng nhập tài khoản cũ và bỏ khách?".

## 4. Dữ liệu (M18, migration chạy tay bằng psql)
- `user_accounts`: `user_profile_id` PK/FK, `email` (unique, lower-case, nullable), `email_verified_at`,
  `password_hash` (nullable), `display_name`, `created_at`, `last_login_at`, `deleted_at`.
- `auth_identities`: `id`, `user_profile_id`, `provider` (`PASSWORD`/`GOOGLE`/`FACEBOOK`),
  `provider_subject`, `email_at_link`, `created_at`; unique (`provider`, `provider_subject`).
- `refresh_tokens`: `id`, `user_profile_id`, `token_hash` unique, `family_id`, `device_name`,
  `expires_at`, `revoked_at`, `replaced_by_id`, `created_at`.
- `one_time_codes`: `id`, `user_profile_id`, `purpose` (`VERIFY_EMAIL`/`RESET_PASSWORD`),
  `code_hash`, `attempts`, `expires_at`, `used_at`, `created_at`.
- `login_attempts`: `key` (email hoặc IP), `failed_count`, `window_start`.
- `user_profiles.claimed_at`.

## 5. Các mốc (giữ cách chia việc hai chat như đợt 2)

**Bước 0** — Đóng VS4/VS5: chat 2 chạy xong test và E2E M14–M16, README đổi ✅. Nhánh
`feat/vs6-auth` từ `main`.

**M17: Thiết kế (1 commit) → dừng để người dùng duyệt**
- Viết lại `docs/05-implementation/plans/2026-11-08-vs6-authentication.md` theo file này.
- `docs/adr/ADR-016-authentication-jwt.md` (mới); sửa `ADR-008` thành "khách tạm thời, bắt buộc
  gắn tài khoản sau tutorial".
- `use-cases.md`: UC_13 Register, UC_14 Login (email/Google/Facebook), UC_15 Link Guest,
  UC_16 Refresh/Logout, UC_17 Verify Email, UC_18 Reset Password, UC_19 Delete Account.
- `requirements-catalog.md`: `FR-AUTH-01..10`, `NFR-SEC-01..05`.
- `system-design.md` §12 (API trên), `screen-catalog.md` SCR-20..26.
- Chat 2 viết TC-VS6-xx vào `test-plan.md`.

**M18: Migration** (bảng ở mục 4).

**M19: Backend** — package `auth`:
- `build.gradle.kts`: `spring-boot-starter-security`, `spring-boot-starter-mail`, `jjwt`,
  `google-api-client`.
- `JwtService`, `RefreshTokenService`, `PasswordAuthService`, `GoogleTokenVerifier`,
  `FacebookTokenVerifier`, `OtpService`, `MailSender` (SMTP), `AccountLinkService`, `AuthController`.
- `SecurityConfig` (stateless), `JwtAuthenticationFilter`, `LegacyGuestHeaderFilter`,
  `AccountRequiredFilter` (khách đã xong tutorial → 403, dựa trên `TutorialStep` sẵn có trong
  `identity/entity`), `@CurrentUser`.
- Commit riêng: đổi 9 controller (`city`, `content`, `cosmetic`, `event`, `exam`, `identity`,
  `learning`, `player`, `quest`) từ `@RequestHeader("X-Guest-UUID")` sang `@CurrentUser`.
- Lỗi mới thêm vào error handler chung trong `common`.

**M20: Mobile**
- `data/remote/auth` (Retrofit), `data/local/preferences/TokenStore` (mã hoá).
- OkHttp `AuthInterceptor` + `TokenAuthenticator` (refresh khi 401, có khoá để không refresh song
  song, refresh hỏng → về SCR-20).
- Credential Manager (Google), Facebook Login SDK; `AuthRepository`.
- Màn Compose: SCR-20 Màn chào, SCR-21 Đăng ký, SCR-22 Đăng nhập, SCR-23 Lưu tiến trình (sau
  tutorial), SCR-24 Nhập OTP, SCR-25 Quên / đặt lại mật khẩu, SCR-26 Tài khoản (trong Cài đặt:
  email, phương thức đã gắn, đăng xuất, xoá tài khoản).
- Điều hướng khởi động: token → Thành phố; Guest UUID cũ → claim; không có gì → SCR-20.
- Bỏ header `X-Guest-UUID` khỏi API.

**Dừng trước M21:** người dùng chạy migration; tạo OAuth client Google (SHA-1 debug), Facebook
App (key hash); đặt biến môi trường JWT/SMTP.

**M21: E2E (chat 2)** — xem phần Kiểm tra.

## 6. Việc người dùng phải tự làm (không chat nào nhập bí mật)
- Google Cloud Console: OAuth client loại Web + Android (package, SHA-1).
- Meta for Developers: Facebook App, bật Facebook Login, thêm key hash Android.
- SMTP: Gmail App Password hoặc chạy Mailpit local.
- Đặt biến môi trường cho backend.

## 7. Rủi ro
- Khách cũ bị claim trước bởi người biết UUID: chấp nhận trong MVP, ghi trong ADR-016.
- Refresh song song gây "dùng lại" token → mất phiên: khoá trong `TokenAuthenticator`, có test riêng.
- Facebook có thể không trả email (tài khoản đăng ký bằng số điện thoại) → cho phép tài khoản
  không có email; quên mật khẩu không áp dụng.
- Phạm vi lớn (3 provider + OTP): nếu trễ, tách Facebook sang VS6.1 mà không ảnh hưởng thiết kế.

## Kiểm tra
- **Backend (chat 2):** unit test `JwtService`, `RefreshTokenService` (xoay vòng, dùng lại → thu
  hồi họ), `OtpService`, `AccountLinkService` (gộp email đã xác minh, xung đột 409); MockMvc cho
  filter (không token / hết hạn / header cũ khi cờ tắt → 401; khách đã xong tutorial → 403).
  Verifier Google/Facebook dùng mock.
- **Mobile:** test `TokenAuthenticator` (refresh một lần cho nhiều 401 song song), `AuthRepository`,
  điều hướng khởi động.
- **E2E:** curl đủ chuỗi khách → tutorial → bị 403 → register → verify OTP (Mailpit) → logout →
  login lại → `GET /city` giống hệt; quên mật khẩu → mọi phiên cũ bị đăng xuất; 6 lần sai → 429.
  Emulator: đăng nhập Google và Facebook thật; tắt app 1 ngày vẫn vào thẳng thành phố; gỡ cài,
  đăng nhập lại → khôi phục nhà, danh hiệu, chuỗi ngày; bản app cũ vẫn chạy khi cờ header bật.
