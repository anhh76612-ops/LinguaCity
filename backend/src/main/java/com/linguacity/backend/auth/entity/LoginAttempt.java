package com.linguacity.backend.auth.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/** Số lần đăng nhập sai trong một cửa sổ thời gian, theo email hoặc theo IP. */
@Entity
@Table(name = "login_attempts")
@Getter
@Setter
public class LoginAttempt {

    /** {@code email:<email>} hoặc {@code ip:<địa chỉ>}. */
    @Id
    @Column(name = "attempt_key", nullable = false, length = 300)
    private String attemptKey;

    @Column(name = "failed_count", nullable = false)
    private int failedCount;

    @Column(name = "window_start", nullable = false)
    private LocalDateTime windowStart;
}
