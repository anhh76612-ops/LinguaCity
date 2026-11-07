package com.linguacity.backend.common.dto;

/**
 * Định dạng lỗi chung (FR-SYS-06). {@code code} giúp app phân biệt các lỗi cùng mã HTTP (system-design §10.4).
 */
public record ErrorResponse(String code, String message) {}
