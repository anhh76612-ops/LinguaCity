package com.linguacity.backend.auth.service;

import com.linguacity.backend.auth.entity.AuthProvider;

/** Kiểm tra token do Google/Facebook cấp cho app, trả hồ sơ đã xác nhận. */
public interface SocialTokenVerifier {

    AuthProvider provider();

    /** Ném {@code ApiException} 401 PROVIDER_TOKEN_INVALID khi token không hợp lệ. */
    SocialProfile verify(String token);
}
