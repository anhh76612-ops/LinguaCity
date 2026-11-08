package com.linguacity.backend.learning.engine;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

/**
 * Chọn từ cho một phiên học (ADR-013, BR-LEARN-08) — bản đơn giản, dễ kiểm thử:
 * <ol>
 *   <li>Từ "nguội" (chưa ôn trong {@code cooldown}) trước, từ vừa ôn chỉ dùng khi không đủ.</li>
 *   <li>Trong mỗi nhóm: Level đang học trước từ ôn Level cũ; chưa sưu tầm trước đã sưu tầm; Mastery
 * thấp trước.</li>
 *   <li>Cùng hạng thì xáo ngẫu nhiên.</li>
 * </ol>
 * GHI CHÚ TƯƠNG LAI (người dùng yêu cầu ghi lại): thay bằng thuật toán trọng số / Spaced Repetition
 * (future-expansion §6, mục 1).
 */
public final class WordSelector {

    private WordSelector() {
    }

    /**
     * @param review true nếu là từ ôn của Level thấp hơn (chỉ dùng khi Level đang học không đủ từ).
     */
    public record Candidate(long vocabularyId, boolean review, boolean collected, int mastery,
                            LocalDateTime lastReviewedAt) {
    }

    public static List<Long> select(
            List<Candidate> pool, int count, LocalDateTime now, Duration cooldown, Random random) {
        LocalDateTime coolBefore = now.minus(cooldown);
        List<Candidate> fresh = new ArrayList<>();
        List<Candidate> recent = new ArrayList<>();
        for (Candidate c : pool) {
            (c.lastReviewedAt() == null || c.lastReviewedAt().isBefore(coolBefore) ? fresh : recent)
                    .add(c);
        }
        List<Long> result = new ArrayList<>();
        for (List<Candidate> group : List.of(fresh, recent)) {
            for (Candidate c : ranked(group, random)) {
                if (result.size() == count) {
                    return result;
                }
                result.add(c.vocabularyId());
            }
        }
        return result;
    }

    private static List<Candidate> ranked(List<Candidate> list, Random random) {
        List<Candidate> shuffled = new ArrayList<>(list);
        Collections.shuffle(shuffled, random); // sort ổn định giữ thứ tự xáo trong cùng hạng
        shuffled.sort(Comparator.comparing(Candidate::review)
                .thenComparing(Candidate::collected)
                .thenComparingInt(Candidate::mastery));
        return shuffled;
    }
}
