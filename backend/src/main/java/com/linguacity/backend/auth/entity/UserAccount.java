package com.linguacity.backend.auth.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Tài khoản gắn với một hồ sơ chơi. Hồ sơ không có dòng ở đây là khách. Tiến trình vẫn nằm ở
 * {@code user_profiles}, nên gắn tài khoản không phải sao chép dữ liệu.
 */
@Entity
@Table(name = "user_accounts")
@Getter
@Setter
public class UserAccount {

    @Id
    @Column(name = "user_profile_id", nullable = false)
    private UUID userProfileId;

    /** Luôn chữ thường; có thể rỗng (Facebook đăng ký bằng số điện thoại). */
    @Column(name = "email", length = 254)
    private String email;

    @Column(name = "email_verified_at")
    private LocalDateTime emailVerifiedAt;

    /** BCrypt; rỗng khi tài khoản chỉ đăng nhập bằng Google/Facebook. */
    @Column(name = "password_hash", length = 100)
    private String passwordHash;

    @Column(name = "display_name", length = 50)
    private String displayName;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "last_login_at")
    private LocalDateTime lastLoginAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    public boolean isEmailVerified() {
        return emailVerifiedAt != null;
    }
}
