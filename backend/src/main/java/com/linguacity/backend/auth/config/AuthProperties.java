package com.linguacity.backend.auth.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.ArrayList;
import java.util.List;

/**
 * Thông số xác thực (ADR-016). Bí mật (khoá JWT, Facebook secret) chỉ đến từ biến môi trường, không
 * commit.
 */
@ConfigurationProperties(prefix = "linguacity.auth")
@Getter
@Setter
public class AuthProperties {

    /** Khoá ký HS256, tối thiểu 32 byte. Rỗng: tự sinh khoá ngẫu nhiên (chỉ dev/test). */
    private String jwtSecret = "";
    private int accessTtlMinutes = 15;
    private int refreshTtlDays = 30;

    /** Cho phép header {@code X-Guest-UUID} của app bản cũ (tắt ở VS7). */
    private boolean legacyGuestHeader = true;
    /** Khách đã xong tutorial phải gắn tài khoản mới gọi được API game. */
    private boolean requireAccountAfterTutorial = true;

    /** Client id (loại Web) mà ID token Google phải có trong {@code aud}. */
    private List<String> googleClientIds = new ArrayList<>();
    private String facebookAppId = "";
    private String facebookAppSecret = "";

    private String mailFrom = "no-reply@linguacity.local";
    private int otpTtlMinutes = 10;
    private int otpMaxAttempts = 5;
    private int otpResendSeconds = 60;

    private int loginMaxPerEmail = 5;
    private int loginMaxPerIp = 20;
    private int loginWindowMinutes = 15;
}
