package com.linguacity.backend.learning;

import com.linguacity.backend.learning.engine.AnswerGrader;
import com.linguacity.backend.learning.engine.MasteryEngine;
import com.linguacity.backend.learning.engine.WordSelector;
import com.linguacity.backend.learning.engine.WordSelector.Candidate;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

/** Hàm thuần của phiên học: chấm, Mastery, chọn từ (ADR-013). */
class LearningEngineTests {

    // TC-VS3-04: chuẩn hoá câu điền từ
    @Test
    void gradingIgnoresCaseAndExtraSpacesButNotSpelling() {
        assertTrue(AnswerGrader.isCorrect("  Rent ", "rent", List.of()));
        assertTrue(AnswerGrader.isCorrect("RENT", "rent", List.of()));
        assertTrue(AnswerGrader.isCorrect("tiền   thuê  nhà", "tiền thuê nhà", List.of()));
        assertFalse(AnswerGrader.isCorrect("rents", "rent", List.of()));
        assertFalse(AnswerGrader.isCorrect("", "rent", List.of()));
        assertFalse(AnswerGrader.isCorrect(null, "rent", List.of()));
    }

    // TC-VS3-05: đáp án phụ
    @Test
    void acceptedAnswersAreAlsoCorrect() {
        assertTrue(AnswerGrader.isCorrect("Neighbour", "neighbor", List.of("neighbour")));
        assertFalse(AnswerGrader.isCorrect("neighbours", "neighbor", List.of("neighbour")));
    }

    // TC-VS3-03: +1 / −1, kẹp 0..max
    @Test
    void masteryMovesByOneAndIsClamped() {
        assertEquals(1, MasteryEngine.apply(0, true, 10));
        assertEquals(0, MasteryEngine.apply(0, false, 10));
        assertEquals(10, MasteryEngine.apply(10, true, 10));
        assertEquals(14, MasteryEngine.apply(15, false, 15));
    }

    // TC-VS3-13: chưa sưu tầm → Mastery thấp; bỏ từ vừa ôn < 10 phút; Level đang học trước từ ôn
    @Test
    void selectorPrefersUncollectedThenWeakAndSkipsRecentlyReviewed() {
        LocalDateTime now = LocalDateTime.of(2026, 11, 8, 3, 0);
        List<Candidate> pool = List.of(
                new Candidate(1, false, true, 9, now.minusDays(1)),      // đã sưu tầm, mạnh
                new Candidate(2, false, true, 2, now.minusDays(1)),      // đã sưu tầm, yếu
                new Candidate(3, false, false, 0, null),                 // chưa sưu tầm
                // chưa sưu tầm nhưng vừa ôn
                new Candidate(4, false, false, 0, now.minusMinutes(3)),
                new Candidate(5, true, true, 0, now.minusDays(2)),       // từ ôn Level cũ
                new Candidate(6, false, false, 1, now.minusHours(1))     // chưa sưu tầm, Mastery 1
        );
        List<Long> chosen = WordSelector.select(
                pool, 4, now, Duration.ofMinutes(10), new Random(1));
        assertEquals(List.of(3L, 6L, 2L, 1L), chosen);

        // Không đủ từ "nguội" thì mới dùng tới từ vừa ôn và từ ôn Level cũ
        List<Long> all = WordSelector.select(pool, 10, now, Duration.ofMinutes(10), new Random(1));
        assertEquals(List.of(3L, 6L, 2L, 1L, 5L, 4L), all);
    }

    @Test
    void sameRankIsShuffled() {
        LocalDateTime now = LocalDateTime.of(2026, 11, 8, 3, 0);
        List<Candidate> pool = java.util.stream.LongStream.rangeClosed(1, 20)
                .mapToObj(i -> new Candidate(i, false, false, 0, null)).toList();
        List<Long> a = WordSelector.select(pool, 10, now, Duration.ofMinutes(10), new Random(1));
        List<Long> b = WordSelector.select(pool, 10, now, Duration.ofMinutes(10), new Random(2));
        assertEquals(10, a.size());
        assertNotEquals(a, b);
    }
}
