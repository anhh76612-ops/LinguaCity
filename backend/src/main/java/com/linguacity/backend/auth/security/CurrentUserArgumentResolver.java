package com.linguacity.backend.auth.security;

import com.linguacity.backend.common.exception.ApiException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.util.UUID;

/** Đọc {@link AuthUser} từ {@code SecurityContext} cho tham số có {@link CurrentUser}. */
public class CurrentUserArgumentResolver implements HandlerMethodArgumentResolver {

    private final LegacyGuestResolver legacy;

    /**
     * @param legacy dùng khi request không đi qua filter chain của Spring Security (MockMvc dựng
     *               bằng {@code webAppContextSetup} không kèm filter)
     */
    public CurrentUserArgumentResolver(LegacyGuestResolver legacy) {
        this.legacy = legacy;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        Class<?> type = parameter.getParameterType();
        return parameter.hasParameterAnnotation(CurrentUser.class)
                && (type == UUID.class || type == AuthUser.class);
    }

    @Override
    public Object resolveArgument(
            MethodParameter parameter,
            ModelAndViewContainer container,
            NativeWebRequest request,
            WebDataBinderFactory binderFactory) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuthUser user = authentication != null && authentication.getPrincipal() instanceof AuthUser
                ? (AuthUser) authentication.getPrincipal()
                : null;
        if (user == null) {
            HttpServletRequest http = request.getNativeRequest(HttpServletRequest.class);
            user = http == null ? null : legacy.resolve(http).orElse(null);
        }
        CurrentUser annotation = parameter.getParameterAnnotation(CurrentUser.class);
        if (user == null) {
            if (annotation != null && !annotation.required()) {
                return null;
            }
            throw new ApiException(
                    HttpStatus.UNAUTHORIZED, "UNAUTHENTICATED", "Authentication required");
        }
        return parameter.getParameterType() == UUID.class ? user.userId() : user;
    }
}
