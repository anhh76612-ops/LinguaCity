package com.linguacity.backend.auth.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.HexFormat;

/** SHA-256 và sinh chuỗi ngẫu nhiên cho refresh token và OTP. */
final class Hashing {

    private static final SecureRandom RANDOM = new SecureRandom();

    private Hashing() {
    }

    static String sha256(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] bytes = digest.digest(value.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(bytes);
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException(exception);
        }
    }

    /** 32 byte ngẫu nhiên, mã hoá base64url không dấu {@code =}. */
    static String randomToken() {
        byte[] bytes = new byte[32];
        RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    /** Mã 6 chữ số, có thể bắt đầu bằng 0. */
    static String randomOtp() {
        return String.format("%06d", RANDOM.nextInt(1_000_000));
    }

    /** So sánh hằng thời gian để không lộ thông tin qua thời gian phản hồi. */
    static boolean sameHash(String a, String b) {
        return MessageDigest.isEqual(
                a.getBytes(StandardCharsets.UTF_8), b.getBytes(StandardCharsets.UTF_8));
    }
}
