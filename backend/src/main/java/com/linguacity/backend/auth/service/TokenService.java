package com.linguacity.backend.auth.service;

import com.linguacity.backend.auth.config.AuthProperties;
import com.linguacity.backend.auth.dto.AuthDtos.TokenResponse;
import com.linguacity.backend.auth.entity.RefreshToken;
import com.linguacity.backend.auth.entity.UserAccount;
import com.linguacity.backend.auth.repository.RefreshTokenRepository;
import com.linguacity.backend.auth.repository.UserAccountRepository;
import com.linguacity.backend.auth.security.AuthUser;
import com.linguacity.backend.auth.security.JwtService;
import com.linguacity.backend.common.exception.ApiException;
import com.linguacity.backend.common.time.Times;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

/**
 * Cấp cặp access + refresh token và xoay vòng refresh token (ADR-016). "Luôn nhớ đăng nhập": mỗi
 * lần refresh, hạn 30 ngày được tính lại từ đầu.
 */
@Service
public class TokenService {

    private final RefreshTokenRepository refreshTokens;
    private final UserAccountRepository accounts;
    private final JwtService jwt;
    private final AuthProperties properties;
    private final Clock clock;

    public TokenService(
            RefreshTokenRepository refreshTokens,
            UserAccountRepository accounts,
            JwtService jwt,
            AuthProperties properties,
            Clock clock) {
        this.refreshTokens = refreshTokens;
        this.accounts = accounts;
        this.jwt = jwt;
        this.properties = properties;
        this.clock = clock;
    }

    /** Lần đăng nhập mới: mở một họ token mới. */
    @Transactional
    public TokenResponse issue(UUID userId, String deviceName) {
        return issueInFamily(userId, UUID.randomUUID(), deviceName).response();
    }

    /**
     * Đổi refresh token lấy cặp mới. Token đã dùng hoặc đã thu hồi bị gửi lại → coi là bị đánh
     * cắp, thu hồi cả họ. Việc thu hồi chạy trong transaction riêng để không bị rollback cùng lỗi.
     */
    @Transactional(noRollbackFor = ApiException.class)
    public TokenResponse refresh(String rawToken, String deviceName) {
        RefreshToken current = find(rawToken).orElseThrow(TokenService::invalid);
        LocalDateTime now = Times.nowUtc(clock);
        if (current.getRevokedAt() != null || current.getReplacedById() != null) {
            refreshTokens.revokeFamily(current.getFamilyId(), now);
            throw invalid();
        }
        if (!current.getExpiresAt().isAfter(now)) {
            throw invalid();
        }
        String device = deviceName != null ? deviceName : current.getDeviceName();
        Issued next = issueInFamily(current.getUserProfileId(), current.getFamilyId(), device);
        current.setRevokedAt(now);
        current.setReplacedById(next.entity().getId());
        refreshTokens.save(current);
        return next.response();
    }

    /** Đăng xuất một máy: thu hồi họ token chứa token này. Token lạ thì bỏ qua. */
    @Transactional
    public void revoke(String rawToken) {
        find(rawToken).ifPresent(token ->
                refreshTokens.revokeFamily(token.getFamilyId(), Times.nowUtc(clock)));
    }

    /** Đăng xuất mọi máy (đổi mật khẩu, xoá tài khoản). */
    @Transactional(propagation = Propagation.MANDATORY)
    public void revokeAll(UUID userId) {
        refreshTokens.revokeAllForUser(userId, Times.nowUtc(clock));
    }

    private Optional<RefreshToken> find(String rawToken) {
        if (rawToken == null || rawToken.isBlank()) {
            return Optional.empty();
        }
        return refreshTokens.findByTokenHash(Hashing.sha256(rawToken));
    }

    private Issued issueInFamily(UUID userId, UUID familyId, String deviceName) {
        LocalDateTime now = Times.nowUtc(clock);
        String raw = Hashing.randomToken();

        RefreshToken token = new RefreshToken();
        token.setUserProfileId(userId);
        token.setTokenHash(Hashing.sha256(raw));
        token.setFamilyId(familyId);
        token.setDeviceName(trimDevice(deviceName));
        token.setCreatedAt(now);
        token.setExpiresAt(now.plusDays(properties.getRefreshTtlDays()));
        refreshTokens.save(token);

        Optional<UserAccount> account = accounts.findByUserProfileIdAndDeletedAtIsNull(userId);
        AuthUser.Type type = account.isPresent() ? AuthUser.Type.ACCOUNT : AuthUser.Type.GUEST;
        boolean verified = account.map(UserAccount::isEmailVerified).orElse(false);
        String access = jwt.issue(userId, type, verified);
        TokenResponse response = new TokenResponse(
                access, raw, jwt.ttlSeconds(), userId, type.name(), verified);
        return new Issued(token, response);
    }

    private static String trimDevice(String deviceName) {
        if (deviceName == null || deviceName.isBlank()) {
            return null;
        }
        String trimmed = deviceName.trim();
        return trimmed.length() > 100 ? trimmed.substring(0, 100) : trimmed;
    }

    private static ApiException invalid() {
        return new ApiException(
                HttpStatus.UNAUTHORIZED, "REFRESH_INVALID", "Refresh token is invalid or expired");
    }

    private record Issued(RefreshToken entity, TokenResponse response) {
    }
}
