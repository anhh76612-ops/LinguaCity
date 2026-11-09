package com.linguacity.backend.auth.security;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/** Ghi lỗi JSON cùng định dạng {@code ErrorResponse} từ filter (chưa vào tới controller). */
final class ErrorWriter {

    private ErrorWriter() {
    }

    static void write(HttpServletResponse response, int status, String code, String message)
            throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(
                "{\"code\":\"" + code + "\",\"message\":\"" + escape(message) + "\"}");
    }

    private static String escape(String value) {
        return value.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
