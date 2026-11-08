package com.linguacity.backend.auth.service;

import com.linguacity.backend.auth.config.AuthProperties;
import com.linguacity.backend.auth.entity.OneTimeCode;
import com.linguacity.backend.auth.entity.OtpPurpose;
import com.linguacity.backend.auth.repository.OneTimeCodeRepository;
import com.linguacity.backend.common.exception.ApiException;
import com.linguacity.backend.common.time.Times;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Mã OTP 6 số qua email (xác minh email, đặt lại mật khẩu). Hết hạn sau {@code otpTtlMinutes},
 * sai quá {@code otpMaxAttempts} lần thì mã bị huỷ, gửi lại cách nhau ít nhất
 * {@code otpResendSeconds}.
 */
@Service
public class OtpService {

    private final OneTimeCodeRepository codes;
    private final MailGateway mail;
    private final AuthProperties properties;
    private final Clock clock;

    public OtpService(
            OneTimeCodeRepository codes,
            MailGateway mail,
            AuthProperties properties,
            Clock clock) {
        this.codes = codes;
        this.mail = mail;
        this.properties = properties;
        this.clock = clock;
    }

    @Transactional
    public void send(UUID userId, OtpPurpose purpose, String email) {
        LocalDateTime now = Times.nowUtc(clock);
        codes.findFirstByUserProfileIdAndPurposeOrderByCreatedAtDesc(userId, purpose)
                .filter(last -> last.getCreatedAt()
                        .plusSeconds(properties.getOtpResendSeconds()).isAfter(now))
                .ifPresent(last -> {
                    throw new ApiException(HttpStatus.TOO_MANY_REQUESTS, "OTP_TOO_SOON",
                            "Please wait before requesting a new code");
                });

        String code = Hashing.randomOtp();
        OneTimeCode entity = new OneTimeCode();
        entity.setUserProfileId(userId);
        entity.setPurpose(purpose);
        entity.setCodeHash(Hashing.sha256(code));
        entity.setCreatedAt(now);
        entity.setExpiresAt(now.plusMinutes(properties.getOtpTtlMinutes()));
        codes.save(entity);

        mail.send(email, subject(purpose), body(purpose, code));
    }

    /** Mã đúng thì đánh dấu đã dùng; sai thì tăng số lần sai rồi báo lỗi. */
    @Transactional(noRollbackFor = ApiException.class)
    public void verify(UUID userId, OtpPurpose purpose, String code) {
        OneTimeCode entity = codes
                .findFirstByUserProfileIdAndPurposeOrderByCreatedAtDesc(userId, purpose)
                .filter(last -> last.getUsedAt() == null)
                .orElseThrow(() -> new ApiException(
                        HttpStatus.BAD_REQUEST, "OTP_INVALID", "Code is invalid"));
        LocalDateTime now = Times.nowUtc(clock);
        if (!entity.getExpiresAt().isAfter(now)
                || entity.getAttempts() >= properties.getOtpMaxAttempts()) {
            throw new ApiException(
                    HttpStatus.GONE, "OTP_EXPIRED", "Code expired, request a new one");
        }
        if (code == null || !Hashing.sameHash(Hashing.sha256(code.trim()), entity.getCodeHash())) {
            entity.setAttempts(entity.getAttempts() + 1);
            codes.save(entity);
            throw new ApiException(HttpStatus.BAD_REQUEST, "OTP_INVALID", "Code is invalid");
        }
        entity.setUsedAt(now);
        codes.save(entity);
    }

    private static String subject(OtpPurpose purpose) {
        if (purpose == OtpPurpose.VERIFY_EMAIL) {
            return "LinguaCity - Mã xác minh email";
        }
        return "LinguaCity - Mã đặt lại mật khẩu";
    }

    private String body(OtpPurpose purpose, String code) {
        String action = purpose == OtpPurpose.VERIFY_EMAIL
                ? "xác minh email"
                : "đặt lại mật khẩu";
        return "Mã " + action + " của bạn là: " + code + "\n\n"
                + "Mã có hiệu lực trong " + properties.getOtpTtlMinutes() + " phút. "
                + "Nếu bạn không yêu cầu, hãy bỏ qua email này.";
    }
}
