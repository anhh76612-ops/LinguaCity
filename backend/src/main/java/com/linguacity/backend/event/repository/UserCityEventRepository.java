package com.linguacity.backend.event.repository;

import com.linguacity.backend.event.entity.UserCityEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserCityEventRepository extends JpaRepository<UserCityEvent, Long> {

    List<UserCityEvent> findByUserIdAndSpawnDateOrderByIdAsc(UUID userId, LocalDate spawnDate);

    Optional<UserCityEvent> findBySessionId(UUID sessionId);
}
