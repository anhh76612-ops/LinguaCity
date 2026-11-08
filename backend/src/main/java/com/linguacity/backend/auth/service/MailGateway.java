package com.linguacity.backend.auth.service;

/** Gửi email. Bản mặc định dùng SMTP; chưa cấu hình SMTP thì chỉ ghi log (dev). */
public interface MailGateway {

    void send(String to, String subject, String body);
}
