package com.linguacity.backend.auth.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;
import java.util.UUID;

/** Request/response của {@code /api/v1/auth} (ADR-016, system-design §12). */
public final class AuthDtos {

    private AuthDtos() {
    }

    /**
     * Cặp token trả về sau mọi lần đăng nhập / đăng ký / refresh.
     *
     * @param expiresIn số giây access token còn hiệu lực
     * @param type      {@code GUEST} hoặc {@code ACCOUNT}
     */
    public record TokenResponse(
            String accessToken,
            String refreshToken,
            long expiresIn,
            UUID userId,
            String type,
            boolean emailVerified) {
    }

    public record GuestRequest(String deviceName) {
    }

    public record ClaimRequest(UUID guestUuid, String deviceName) {
    }

    public record RegisterRequest(
            String email, String password, String displayName, String deviceName) {
    }

    public record LoginRequest(String email, String password, String deviceName) {
    }

    /**
     * Đăng nhập Google ({@code token} = ID token) hoặc Facebook ({@code token} = access token).
     *
     * @param confirmDiscardGuest {@code true} khi người dùng đã đồng ý bỏ tiến trình khách trên máy
     *                            để vào tài khoản có sẵn
     */
    public record SocialRequest(String token, String deviceName, Boolean confirmDiscardGuest) {
    }

    public record RefreshRequest(String refreshToken, String deviceName) {
    }

    public record LogoutRequest(String refreshToken) {
    }

    public record VerifyEmailRequest(String code) {
    }

    public record ForgotPasswordRequest(String email) {
    }

    public record ResetPasswordRequest(String email, String code, String newPassword) {
    }

    /**
     * Gắn thêm cách đăng nhập: {@code token} cho Google/Facebook, email + mật khẩu cho
     * PASSWORD.
     */
    public record LinkIdentityRequest(String token, String email, String password) {
    }

    /** Xác thực lại trước khi xoá: mật khẩu, hoặc token mới của Google/Facebook. */
    public record DeleteAccountRequest(String password, String provider, String providerToken) {
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public record MeResponse(
            UUID userId,
            String type,
            String email,
            boolean emailVerified,
            String displayName,
            List<String> providers) {
    }
}
