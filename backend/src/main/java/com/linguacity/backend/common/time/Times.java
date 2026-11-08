package com.linguacity.backend.common.time;

import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;

/**
 * Quy ước thời gian: cột TIMESTAMP trong DB lưu giờ **UTC** dạng LocalDateTime; API trả {@link
 * Instant}.
 * "Một ngày" (chống cày KP, chuỗi ngày học) tính theo múi giờ cấu hình (Asia/Ho_Chi_Minh).
 */
public final class Times {

    private Times() {
    }

    public static LocalDateTime nowUtc(Clock clock) {
        return LocalDateTime.now(clock.withZone(ZoneOffset.UTC));
    }

    public static Instant toInstant(LocalDateTime utc) {
        return utc == null ? null : utc.toInstant(ZoneOffset.UTC);
    }

    public static LocalDate localDate(LocalDateTime utc, ZoneId zone) {
        return utc.atOffset(ZoneOffset.UTC).atZoneSameInstant(zone).toLocalDate();
    }

    /** [đầu ngày, đầu ngày hôm sau) của ngày chứa {@code utc} theo {@code zone}, đổi lại về UTC. */
    public static LocalDateTime[] dayRangeUtc(LocalDateTime utc, ZoneId zone) {
        LocalDate day = localDate(utc, zone);
        LocalDateTime start = day.atStartOfDay(zone).withZoneSameInstant(ZoneOffset.UTC)
                .toLocalDateTime();
        LocalDateTime end = day.plusDays(1).atStartOfDay(zone).withZoneSameInstant(ZoneOffset.UTC)
                .toLocalDateTime();
        return new LocalDateTime[]{start, end};
    }
}
