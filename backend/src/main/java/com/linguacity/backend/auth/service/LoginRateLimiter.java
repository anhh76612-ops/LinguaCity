package com.linguacity.backend.auth.service;

import com.linguacity.backend.auth.config.AuthProperties;
import com.linguacity.backend.auth.entity.LoginAttempt;
import com.linguacity.backend.auth.repository.LoginAttemptRepository;
import com.linguacity.backend.common.exception.ApiException;
import com.linguacity.backend.common.time.Times;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.LocalDateTime;

/**
 * Chống dò mật khẩu: tối đa N lần sai trong một cửa sổ, đếm riêng theo email và theo IP (ADR-016).
 */
@Service
public class LoginRateLimiter {

    private final LoginAttemptRepository attempts;
    private final AuthProperties properties;
    private final Clock clock;

    public LoginRateLimiter(
            LoginAttemptRepository attempts, AuthProperties properties, Clock clock) {
        this.attempts = attempts;
        this.properties = properties;
        this.clock = clock;
    }

    public void check(String email, String ip) {
        if (isBlocked("email:" + email, properties.getLoginMaxPerEmail())
                || isBlocked("ip:" + ip, properties.getLoginMaxPerIp())) {
            throw new ApiException(HttpStatus.TOO_MANY_REQUESTS, "TOO_MANY_ATTEMPTS",
                    "Too many failed logins, try again later");
        }
    }

    public void recordFailure(String email, String ip) {
        increment("email:" + email);
        increment("ip:" + ip);
    }

    public void reset(String email) {
        attempts.deleteById("email:" + email);
    }

    private boolean isBlocked(String key, int max) {
        return attempts.findById(key)
                .filter(attempt -> !windowExpired(attempt))
                .map(attempt -> attempt.getFailedCount() >= max)
                .orElse(false);
    }

    private void increment(String key) {
        LoginAttempt attempt = attempts.findById(key).orElseGet(() -> {
            LoginAttempt created = new LoginAttempt();
            created.setAttemptKey(key);
            return created;
        });
        if (attempt.getWindowStart() == null || windowExpired(attempt)) {
            attempt.setFailedCount(0);
            attempt.setWindowStart(Times.nowUtc(clock));
        }
        attempt.setFailedCount(attempt.getFailedCount() + 1);
        attempts.save(attempt);
    }

    private boolean windowExpired(LoginAttempt attempt) {
        LocalDateTime end =
                attempt.getWindowStart().plusMinutes(properties.getLoginWindowMinutes());
        return !end.isAfter(Times.nowUtc(clock));
    }
}
