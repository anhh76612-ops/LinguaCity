package com.linguacity.backend.common.exception;

import org.springframework.http.HttpStatus;

/**
 * Lỗi nghiệp vụ có sẵn mã HTTP và mã lỗi máy đọc được. Các lỗi mới kế thừa lớp này
 * thay vì thêm một handler riêng vào {@link ApiExceptionHandler}.
 */
public class ApiException extends RuntimeException {

    private final HttpStatus status;
    private final String code;

    public ApiException(HttpStatus status, String code, String message) {
        super(message);
        this.status = status;
        this.code = code;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getCode() {
        return code;
    }
}
