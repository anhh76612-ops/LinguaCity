package com.linguacity.backend.auth.service;

import com.linguacity.backend.auth.config.AuthProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * Gửi mail qua SMTP ({@code spring.mail.*}). Khi {@code spring.mail.host} rỗng, nội dung mail chỉ
 * được ghi ra log để dev đọc mã OTP — không dùng cách này trên môi trường thật.
 */
@Service
public class SmtpMailGateway implements MailGateway {

    private static final Logger LOG = LoggerFactory.getLogger(SmtpMailGateway.class);

    private final ObjectProvider<JavaMailSender> sender;
    private final AuthProperties properties;
    private final String host;

    public SmtpMailGateway(
            ObjectProvider<JavaMailSender> sender,
            AuthProperties properties,
            @Value("${spring.mail.host:}") String host) {
        this.sender = sender;
        this.properties = properties;
        this.host = host;
    }

    @Override
    public void send(String to, String subject, String body) {
        JavaMailSender mail = sender.getIfAvailable();
        if (host == null || host.isBlank() || mail == null) {
            LOG.warn("SMTP not configured, mail to {} not sent. Subject: {}\n{}",
                    to, subject, body);
            return;
        }
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(properties.getMailFrom());
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        try {
            mail.send(message);
        } catch (MailException exception) {
            LOG.error("Could not send mail to {}", to, exception);
        }
    }
}
