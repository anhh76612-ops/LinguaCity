package com.linguacity.backend.learning.engine;

/**
 * Mastery Engine dùng chung cho học và thi (system-design §3.3): đúng +1, sai −1, kẹp trong 0..max.
 * {@code max} lấy theo độ khó của từ (ADR-013, BalanceProperties.maxMastery).
 */
public final class MasteryEngine {

    private MasteryEngine() {
    }

    public static int apply(int current, boolean correct, int max) {
        int next = current + (correct ? 1 : -1);
        return Math.max(0, Math.min(max, next));
    }
}
