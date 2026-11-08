-- Đợt 3 (M18) · VS6 / ADR-016 Xác thực: tài khoản, đăng nhập nhiều cách, refresh token, OTP
-- Thiết kế: docs/05-implementation/plans/2026-11-08-vs6-authentication.md §4
-- Chạy:  psql -U postgres -d linguacity_db -v ON_ERROR_STOP=1 -f database/migration/V008__authentication.sql

BEGIN;

-- Khách cũ (trước VS6) đổi Guest UUID lấy token đúng một lần
ALTER TABLE user_profiles
    ADD COLUMN claimed_at TIMESTAMP;

-- Một hồ sơ chơi có tối đa một tài khoản. Không có dòng nào = khách.
CREATE TABLE user_accounts (
    user_profile_id   UUID         PRIMARY KEY REFERENCES user_profiles (id) ON DELETE CASCADE,
    email             VARCHAR(254),
    email_verified_at TIMESTAMP,
    password_hash     VARCHAR(100),
    display_name      VARCHAR(50),
    created_at        TIMESTAMP    NOT NULL,
    last_login_at     TIMESTAMP,
    deleted_at        TIMESTAMP
);
-- Email luôn lưu chữ thường; chỉ tài khoản chưa xoá mới giữ chỗ email
CREATE UNIQUE INDEX uq_account_email ON user_accounts (email)
    WHERE email IS NOT NULL AND deleted_at IS NULL;

-- Các cách đăng nhập gắn vào một tài khoản (PASSWORD / GOOGLE / FACEBOOK)
CREATE TABLE auth_identities (
    id               BIGSERIAL    PRIMARY KEY,
    user_profile_id  UUID         NOT NULL REFERENCES user_accounts (user_profile_id)
                                  ON DELETE CASCADE,
    provider         VARCHAR(20)  NOT NULL CHECK (provider IN ('PASSWORD', 'GOOGLE', 'FACEBOOK')),
    provider_subject VARCHAR(255) NOT NULL,
    email_at_link    VARCHAR(254),
    created_at       TIMESTAMP    NOT NULL,
    CONSTRAINT uq_identity UNIQUE (provider, provider_subject),
    CONSTRAINT uq_identity_per_user UNIQUE (user_profile_id, provider)
);

-- Refresh token xoay vòng; chỉ lưu SHA-256 (hex)
CREATE TABLE refresh_tokens (
    id              BIGSERIAL   PRIMARY KEY,
    user_profile_id UUID        NOT NULL REFERENCES user_profiles (id) ON DELETE CASCADE,
    token_hash      VARCHAR(64) NOT NULL UNIQUE,
    family_id       UUID        NOT NULL,
    device_name     VARCHAR(100),
    expires_at      TIMESTAMP   NOT NULL,
    revoked_at      TIMESTAMP,
    replaced_by_id  BIGINT      REFERENCES refresh_tokens (id),
    created_at      TIMESTAMP   NOT NULL
);
CREATE INDEX idx_refresh_family ON refresh_tokens (family_id);
CREATE INDEX idx_refresh_user ON refresh_tokens (user_profile_id);

-- Mã OTP 6 số cho xác minh email và đặt lại mật khẩu; chỉ lưu SHA-256
CREATE TABLE one_time_codes (
    id              BIGSERIAL   PRIMARY KEY,
    user_profile_id UUID        NOT NULL REFERENCES user_profiles (id) ON DELETE CASCADE,
    purpose         VARCHAR(20) NOT NULL CHECK (purpose IN ('VERIFY_EMAIL', 'RESET_PASSWORD')),
    code_hash       VARCHAR(64) NOT NULL,
    attempts        INT         NOT NULL DEFAULT 0 CHECK (attempts >= 0),
    expires_at      TIMESTAMP   NOT NULL,
    used_at         TIMESTAMP,
    created_at      TIMESTAMP   NOT NULL
);
CREATE INDEX idx_otp_user ON one_time_codes (user_profile_id, purpose);

-- Đếm lần đăng nhập sai theo email ("email:...") hoặc IP ("ip:...")
CREATE TABLE login_attempts (
    attempt_key  VARCHAR(300) PRIMARY KEY,
    failed_count INT          NOT NULL DEFAULT 0 CHECK (failed_count >= 0),
    window_start TIMESTAMP    NOT NULL
);

COMMIT;
