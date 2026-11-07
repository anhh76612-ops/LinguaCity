package com.linguacity.backend.common.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Map;

/**
 * Định dạng lỗi chung (FR-SYS-06). {@code code} giúp app phân biệt các lỗi cùng mã HTTP (system-design §10.4);
 * {@code details} (tuỳ chọn) mang thêm dữ liệu, ví dụ còn thiếu bao nhiêu từ/KP để xây.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ErrorResponse(String code, String message, Map<String, Object> details) {

    public ErrorResponse(String code, String message) {
        this(code, message, null);
    }
}
