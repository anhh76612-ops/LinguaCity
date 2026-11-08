package com.linguacity.backend.auth.security;

import java.util.UUID;

/**
 * Người gọi API đã xác thực, đặt vào {@code SecurityContext} bởi {@link JwtAuthenticationFilter}.
 *
 * @param userId id của {@code user_profiles}
 * @param type   khách, tài khoản, hay app bản cũ gửi header {@code X-Guest-UUID}
 */
public record AuthUser(UUID userId, Type type) {

    public enum Type {
        GUEST,
        ACCOUNT,
        LEGACY
    }

    public boolean isGuest() {
        return type == Type.GUEST || type == Type.LEGACY;
    }
}
