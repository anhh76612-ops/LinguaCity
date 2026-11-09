package com.linguacity.backend.learning.engine;

import java.time.Duration;
import java.time.LocalDateTime;

/**
 * Mastery Engine v2 (ADR-017) dùng chung cho bài học và bài thi:
 * - Đúng +1 (kẹp ở {@code max}), không giới hạn số lần mỗi ngày.
 * - Sai: giữ nguyên (không còn −1).
 * - Giảm theo thời gian: cứ mỗi {@code decayDays} ngày liền không trả lời đúng thì −1, kẹp ở 0.
 * - Tốt nghiệp: đã chạm max ({@code graduatedAt} khác null) thì không bao giờ giảm nữa.
 *
 * Điểm lưu trong DB là điểm "gốc" tại lần trả lời đúng gần nhất; điểm hiển thị luôn tính qua
 * {@link #effective}. Lần trả lời đúng kế tiếp lấy điểm đã giảm làm gốc rồi mới +1.
 */
public final class MasteryEngine {

    private MasteryEngine() {
    }

    public static int apply(int current, boolean correct, int max) {
        return correct ? Math.min(max, current + 1) : Math.max(0, Math.min(max, current));
    }

    /** Điểm sau khi trừ phần quên theo thời gian (tính lười, không cần job nền). */
    public static int effective(int stored, LocalDateTime lastCorrectAt, LocalDateTime graduatedAt,
            LocalDateTime now, int decayDays) {
        if (graduatedAt != null || lastCorrectAt == null || decayDays <= 0 || now == null) {
            return stored;
        }
        long days = Duration.between(lastCorrectAt, now).toDays();
        long steps = Math.max(0, days / decayDays);
        return (int) Math.max(0, stored - steps);
    }
}
