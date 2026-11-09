package com.linguacity.backend.auth.service;

import com.linguacity.backend.common.exception.ApiException;
import org.springframework.http.HttpStatus;

final class SocialErrors {

    private SocialErrors() {
    }

    static ApiException invalidToken() {
        return new ApiException(HttpStatus.UNAUTHORIZED, "PROVIDER_TOKEN_INVALID",
                "Sign-in token from the provider is invalid");
    }
}
