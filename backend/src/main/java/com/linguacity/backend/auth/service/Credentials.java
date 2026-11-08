package com.linguacity.backend.auth.service;

import com.linguacity.backend.common.exception.ApiException;
import org.springframework.http.HttpStatus;

import java.util.Locale;
import java.util.regex.Pattern;

/** Chuẩn hoá email và kiểm tra độ mạnh mật khẩu (ADR-016). */
public final class Credentials {

    private static final Pattern EMAIL = Pattern.compile("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$");
    private static final int MIN_PASSWORD = 8;
    /** BCrypt chỉ dùng 72 byte đầu. */
    private static final int MAX_PASSWORD = 72;

    private Credentials() {
    }

    public static String normalizeEmail(String email) {
        if (email == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_EMAIL", "Email is required");
        }
        String normalized = email.trim().toLowerCase(Locale.ROOT);
        if (normalized.length() > 254 || !EMAIL.matcher(normalized).matches()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_EMAIL", "Email is invalid");
        }
        return normalized;
    }

    public static void requireStrongPassword(String password) {
        boolean ok = password != null
                && password.length() >= MIN_PASSWORD
                && password.length() <= MAX_PASSWORD
                && password.chars().anyMatch(Character::isLetter)
                && password.chars().anyMatch(Character::isDigit);
        if (!ok) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "WEAK_PASSWORD",
                    "Password needs 8-72 characters with letters and digits");
        }
    }
}
