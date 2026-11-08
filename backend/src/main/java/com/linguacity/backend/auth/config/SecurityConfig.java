package com.linguacity.backend.auth.config;

import com.linguacity.backend.auth.security.AccountRequiredFilter;
import com.linguacity.backend.auth.security.CurrentUserArgumentResolver;
import com.linguacity.backend.auth.security.JwtAuthenticationFilter;
import com.linguacity.backend.auth.security.JwtService;
import com.linguacity.backend.auth.security.LegacyGuestResolver;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

/**
 * Spring Security cho API REST không trạng thái (ADR-016): không session, không CSRF (không dùng
 * cookie), xác thực bằng Bearer JWT. Lỗi 401/403 trả JSON cùng định dạng {@code ErrorResponse}.
 */
@Configuration
public class SecurityConfig implements WebMvcConfigurer {

    private final LegacyGuestResolver legacy;

    public SecurityConfig(UserProfileRepository profiles, AuthProperties properties) {
        this.legacy = new LegacyGuestResolver(profiles, properties);
    }

    /** Route mở: lấy token, refresh, quên mật khẩu, và onboard của app bản cũ. */
    private static final String[] PUBLIC_POST = {
        "/api/v1/auth/guest",
        "/api/v1/auth/guest/claim",
        "/api/v1/auth/register",
        "/api/v1/auth/login",
        "/api/v1/auth/google",
        "/api/v1/auth/facebook",
        "/api/v1/auth/refresh",
        "/api/v1/auth/logout",
        "/api/v1/auth/password/forgot",
        "/api/v1/auth/password/reset",
        "/api/v1/users/onboard"
    };

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            JwtService jwt,
            UserProfileRepository profiles,
            AuthProperties properties) throws Exception {
        JwtAuthenticationFilter jwtFilter = new JwtAuthenticationFilter(jwt, legacy);
        AccountRequiredFilter accountFilter = new AccountRequiredFilter(profiles, properties);

        http
                .csrf(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .logout(AbstractHttpConfigurer::disable)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, PUBLIC_POST).permitAll()
                        .requestMatchers("/error").permitAll()
                        .anyRequest().authenticated())
                .exceptionHandling(errors -> errors
                        .authenticationEntryPoint((request, response, exception) ->
                                writeError(response, HttpServletResponse.SC_UNAUTHORIZED,
                                        "UNAUTHENTICATED", "Authentication required"))
                        .accessDeniedHandler((request, response, exception) ->
                                writeError(response, HttpServletResponse.SC_FORBIDDEN,
                                        "FORBIDDEN", "Access denied")))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterAfter(accountFilter, JwtAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new CurrentUserArgumentResolver(legacy));
    }

    private static void writeError(
            HttpServletResponse response, int status, String code, String message)
            throws java.io.IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"code\":\"" + code + "\",\"message\":\"" + message + "\"}");
    }
}
