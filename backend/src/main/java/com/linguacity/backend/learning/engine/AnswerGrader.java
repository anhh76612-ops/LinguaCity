package com.linguacity.backend.learning.engine;

import java.util.List;
import java.util.Locale;

/**
 * Chấm câu trả lời (ADR-013): bỏ khoảng trắng đầu/cuối, gộp khoảng trắng giữa, không phân biệt hoa/thường;
 * so với đáp án chuẩn hoặc một trong {@code accepted_answers}.
 * Ghi chú tương lai (future-expansion §6): câu gần đúng ("tickets") sẽ do AI chấm.
 */
public final class AnswerGrader {

    private AnswerGrader() {
    }

    public static String normalize(String raw) {
        if (raw == null) {
            return "";
        }
        return raw.trim().replaceAll("\\s+", " ").toLowerCase(Locale.ROOT);
    }

    public static boolean isCorrect(String given, String answer, List<String> accepted) {
        String g = normalize(given);
        if (g.isEmpty()) {
            return false;
        }
        if (g.equals(normalize(answer))) {
            return true;
        }
        return accepted != null && accepted.stream().anyMatch(a -> g.equals(normalize(a)));
    }
}
