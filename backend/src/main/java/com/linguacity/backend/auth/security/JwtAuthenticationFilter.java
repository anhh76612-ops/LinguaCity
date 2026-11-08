package com.linguacity.backend.auth.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

/**
 * Đọc {@code Authorization: Bearer <JWT>}; token hỏng hay hết hạn thì bỏ qua, để route cần đăng
 * nhập trả 401 và app refresh. Khi cờ {@code legacy-guest-header} bật, header
 * {@code X-Guest-UUID} của app bản cũ vẫn được nhận — trừ hồ sơ đã đổi sang token (claimed).
 */
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwt;
    private final LegacyGuestResolver legacy;

    public JwtAuthenticationFilter(JwtService jwt, LegacyGuestResolver legacy) {
        this.jwt = jwt;
        this.legacy = legacy;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        resolve(request).ifPresent(user -> {
            var authority = new SimpleGrantedAuthority("ROLE_" + user.type().name());
            var authentication =
                    new UsernamePasswordAuthenticationToken(user, null, List.of(authority));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        });
        chain.doFilter(request, response);
    }

    private Optional<AuthUser> resolve(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return jwt.parse(header.substring("Bearer ".length()).trim());
        }
        return legacy.resolve(request);
    }
}
