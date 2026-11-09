package com.linguacity.backend.auth.security;

import com.linguacity.backend.auth.config.AuthProperties;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Khách (token GUEST) đã xong tutorial phải gắn tài khoản mới gọi được API game: trả
 * {@code 403 ACCOUNT_REQUIRED}, app chuyển sang màn "Lưu tiến trình". Luật nằm ở server để app
 * sửa đổi cũng không vượt qua được. App bản cũ (LEGACY) không bị chặn để không gãy.
 */
public class AccountRequiredFilter extends OncePerRequestFilter {

    private final UserProfileRepository profiles;
    private final AuthProperties properties;

    public AccountRequiredFilter(UserProfileRepository profiles, AuthProperties properties) {
        this.profiles = profiles;
        this.properties = properties;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        if (mustLink(request)) {
            ErrorWriter.write(response, HttpServletResponse.SC_FORBIDDEN, "ACCOUNT_REQUIRED",
                    "Create an account or sign in to keep playing");
            return;
        }
        chain.doFilter(request, response);
    }

    private boolean mustLink(HttpServletRequest request) {
        if (!properties.isRequireAccountAfterTutorial()) {
            return false;
        }
        String path = request.getRequestURI().substring(request.getContextPath().length());
        if (!path.startsWith("/api/v1/") || path.startsWith("/api/v1/auth/")) {
            return false;
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof AuthUser user)
                || user.type() != AuthUser.Type.GUEST) {
            return false;
        }
        return profiles.findById(user.userId())
                .map(UserProfile::isTutorialCompleted)
                .orElse(false);
    }
}
