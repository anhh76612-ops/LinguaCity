package com.linguacity.backend.auth.service;

import com.linguacity.backend.auth.entity.AuthProvider;

/**
 * Thông tin đã được nhà cung cấp xác nhận.
 *
 * @param emailVerified chỉ {@code true} khi nhà cung cấp bảo đảm email thuộc về người dùng
 */
public record SocialProfile(
        AuthProvider provider,
        String subject,
        String email,
        boolean emailVerified,
        String name) {
}
