package com.linguacity.backend.auth.security;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Tham số controller nhận người gọi đã xác thực: kiểu {@code UUID} (id hồ sơ) hoặc
 * {@link AuthUser}. Thay cho {@code @RequestHeader("X-Guest-UUID")} từ VS6.
 */
@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
public @interface CurrentUser {

    /** {@code false}: không có người dùng thì nhận {@code null} thay vì báo 401. */
    boolean required() default true;
}
