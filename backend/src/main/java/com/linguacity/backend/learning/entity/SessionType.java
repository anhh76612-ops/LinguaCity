package com.linguacity.backend.learning.entity;

public enum SessionType {
    /** Phiên học thường ở một công trình: 20 từ / 30 câu (ADR-013, ADR-015 §1). */
    LEARNING,
    /** Bài kiểm tra trình độ trong tutorial: 30 câu từ 20 từ (ADR-014). */
    PLACEMENT,
    /** Luyện tập — chỉ từ đã sưu tầm (ADR-015 §6). */
    PRACTICE_REVIEW,
    /** Luyện tập — từ đã học + từ mới (ADR-015 §6). */
    PRACTICE_MIXED,
    /** Giải sự kiện thành phố: 5 câu về từ đã sưu tầm (ADR-015 §5). */
    EVENT;

    public boolean isPractice() {
        return this == PRACTICE_REVIEW || this == PRACTICE_MIXED;
    }
}
