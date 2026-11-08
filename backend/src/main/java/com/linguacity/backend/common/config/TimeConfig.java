package com.linguacity.backend.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Clock;

/**
 * Một {@link Clock} dùng chung để mọi phép tính thời gian theo giờ server (FR-SYS-04) có thể giả
 * lập trong test.
 */
@Configuration
public class TimeConfig {

    @Bean
    public Clock clock() {
        return Clock.systemUTC();
    }
}
