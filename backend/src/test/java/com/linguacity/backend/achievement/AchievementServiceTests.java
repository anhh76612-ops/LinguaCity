package com.linguacity.backend.achievement;

import com.linguacity.backend.achievement.repository.AchievementRepository;
import com.linguacity.backend.achievement.repository.UserAchievementRepository;
import com.linguacity.backend.achievement.service.AchievementService;
import com.linguacity.backend.common.config.BalanceProperties;
import com.linguacity.backend.identity.repository.UserProfileRepository;
import com.linguacity.backend.learning.entity.LearningSession;
import com.linguacity.backend.learning.entity.SessionStatus;
import com.linguacity.backend.learning.entity.SessionType;
import com.linguacity.backend.learning.repository.LearningSessionRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

/** TC-ACH-02 (đủ ≥ 50 mẫu: so phần trăm) và chuỗi ngày học cho DILIGENT. */
class AchievementServiceTests {

    private final LearningSessionRepository sessions = mock(LearningSessionRepository.class);
    private final AchievementService service = new AchievementService(mock(AchievementRepository.class),
            mock(UserAchievementRepository.class), sessions, mock(UserProfileRepository.class), new BalanceProperties());

    // TC-ACH-02
    @Test
    void withFiftySamplesTopEntrantMeansBetterThanNinetyPercent() {
        List<Integer> others = new ArrayList<>(Collections.nCopies(45, 20)); // 45 bài được 20/30
        others.addAll(Collections.nCopies(5, 29));                          // 5 bài được 29/30
        when(sessions.correctCountsOfOthers(eq(SessionType.PLACEMENT), eq(SessionStatus.COMPLETED), any()))
                .thenReturn(others);

        assertTrue(service.isTopEntrant(placement(25)));  // cao hơn 45/50 = 90% → đạt
        assertFalse(service.isTopEntrant(placement(20))); // không cao hơn ai
        assertTrue(service.isTopEntrant(placement(28)));
    }

    @Test
    void belowFiftySamplesUsesTheFixedThreshold() {
        when(sessions.correctCountsOfOthers(any(), any(), any())).thenReturn(Collections.nCopies(49, 10));
        assertTrue(service.isTopEntrant(placement(27)));
        assertFalse(service.isTopEntrant(placement(26))); // cao hơn mọi người nhưng chưa đủ mẫu
    }

    @Test
    void streakCountsConsecutiveDaysInVietnamTime() {
        UUID user = UUID.randomUUID();
        // 08/11 10:00 VN = 03:00Z. Phiên lúc 07/11 23:30 VN (16:30Z) vẫn tính là ngày 07/11.
        LocalDateTime now = LocalDateTime.of(2026, 11, 8, 3, 0);
        when(sessions.completedAtSince(eq(user), eq(SessionStatus.COMPLETED), any())).thenReturn(List.of(
                LocalDateTime.of(2026, 11, 8, 1, 0),    // 08/11
                LocalDateTime.of(2026, 11, 7, 16, 30),  // 07/11 23:30 VN
                LocalDateTime.of(2026, 11, 6, 2, 0),    // 06/11
                LocalDateTime.of(2026, 11, 4, 2, 0)));  // 04/11 — đứt chuỗi ở 05/11
        assertEquals(3, service.streakDays(user, now));
    }

    private static LearningSession placement(int correct) {
        LearningSession s = new LearningSession();
        s.setId(UUID.randomUUID());
        s.setType(SessionType.PLACEMENT);
        s.setCorrectCount(correct);
        s.setTotalCount(30);
        return s;
    }
}
