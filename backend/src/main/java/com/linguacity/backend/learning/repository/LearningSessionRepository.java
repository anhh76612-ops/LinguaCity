package com.linguacity.backend.learning.repository;

import com.linguacity.backend.learning.entity.LearningSession;
import com.linguacity.backend.learning.entity.SessionStatus;
import com.linguacity.backend.learning.entity.SessionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LearningSessionRepository extends JpaRepository<LearningSession, UUID> {

    Optional<LearningSession> findFirstByUserIdAndBuildingIdAndTypeAndStatus(
            UUID userId, Long buildingId, SessionType type, SessionStatus status);

    Optional<LearningSession> findFirstByUserIdAndTypeAndStatus(
            UUID userId, SessionType type, SessionStatus status);

    /** Số phiên đã hoàn thành trong khoảng [from, to) — đếm phiên thứ mấy trong ngày (§10.6). */
    @Query("select count(s) from LearningSession s where s.userId = :user and s.type = :type"
            + " and s.status = :status and s.completedAt >= :from and s.completedAt < :to")
    long countCompletedBetween(
            @Param("user") UUID userId,
            @Param("type") SessionType type,
            @Param("status") SessionStatus status,
            @Param("from") LocalDateTime from,
            @Param("to") LocalDateTime to);

    @Query("select s.correctCount from LearningSession s"
            + " where s.type = :type and s.status = :status and s.id <> :exclude")
    List<Integer> correctCountsOfOthers(
            @Param("type") SessionType type,
            @Param("status") SessionStatus status,
            @Param("exclude") UUID exclude);

    @Query("select s.completedAt from LearningSession s"
            + " where s.userId = :user and s.status = :status and s.completedAt >= :since")
    List<LocalDateTime> completedAtSince(
            @Param("user") UUID user,
            @Param("status") SessionStatus status,
            @Param("since") LocalDateTime since);
}
