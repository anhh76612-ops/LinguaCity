package com.linguacity.backend.event.service;

import com.linguacity.backend.common.config.BalanceProperties;
import com.linguacity.backend.common.exception.ApiException;
import com.linguacity.backend.common.time.Times;
import com.linguacity.backend.event.entity.CityEventTemplate;
import com.linguacity.backend.event.entity.UserCityEvent;
import com.linguacity.backend.event.repository.CityEventTemplateRepository;
import com.linguacity.backend.event.repository.UserCityEventRepository;
import com.linguacity.backend.identity.entity.TutorialStep;
import com.linguacity.backend.identity.entity.UserProfile;
import com.linguacity.backend.learning.repository.UserVocabProgressRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Sự kiện thành phố (dấu "!" trên bản đồ, ADR-015 §5, BR-EVT-01..04). Sinh lười khi người chơi
 * mở thành phố; giải bằng một phiên học kiểu EVENT (LearningService).
 */
@Service
@Transactional
public class CityEventService {

    private final CityEventTemplateRepository templates;
    private final UserCityEventRepository events;
    private final UserVocabProgressRepository progress;
    private final BalanceProperties balance;
    private final Clock clock;

    public CityEventService(
            CityEventTemplateRepository templates,
            UserCityEventRepository events,
            UserVocabProgressRepository progress,
            BalanceProperties balance,
            Clock clock) {
        this.templates = templates;
        this.events = events;
        this.progress = progress;
        this.balance = balance;
        this.clock = clock;
    }

    /** Một sự kiện trong {@code GET /city}. {@code eventId} là chuỗi cho bridge bản đồ. */
    public record CityEventDto(
            String eventId,
            long id,
            String buildingCode,
            String residentName,
            String situation,
            String status) {}

    /**
     * Sự kiện còn mở của hôm nay; sinh thêm cho đủ {@code event-per-day} nếu người chơi đã xong
     * tutorial và đã sưu tầm đủ từ (BR-EVT-01).
     */
    public List<CityEventDto> todayEvents(UserProfile profile) {
        UUID userId = profile.getId();
        if (profile.getTutorialStep() != TutorialStep.DONE) {
            return List.of();
        }
        long collected = progress.countByUserIdAndCollectedAtIsNotNull(userId);
        if (collected < balance.getEventMinCollected()) {
            return List.of();
        }

        LocalDate today = Times.localDate(Times.nowUtc(clock), balance.zone());
        List<UserCityEvent> rows = new ArrayList<>(
                events.findByUserIdAndSpawnDateOrderByIdAsc(userId, today));
        if (rows.size() < balance.getEventPerDay()) {
            rows.addAll(spawn(userId, today, rows));
        }
        Map<String, CityEventTemplate> byCode = templates.findAll().stream()
                .collect(Collectors.toMap(CityEventTemplate::getCode, Function.identity()));
        return rows.stream()
                .filter(row -> UserCityEvent.OPEN.equals(row.getStatus()))
                .map(row -> toDto(row, byCode.get(row.getTemplateCode())))
                .toList();
    }

    /** Sự kiện của người chơi còn mở; không có thì 404, đã giải thì 409. */
    public UserCityEvent requireOpen(UUID userId, Long eventId) {
        UserCityEvent event = events.findById(eventId)
                .filter(row -> row.getUserId().equals(userId))
                .orElseThrow(() -> ApiException.notFound(
                        "EVENT_NOT_FOUND", "No event " + eventId));
        if (UserCityEvent.RESOLVED.equals(event.getStatus())) {
            throw ApiException.conflict("EVENT_RESOLVED", "This event is already resolved");
        }
        return event;
    }

    public void attachSession(UserCityEvent event, UUID sessionId) {
        event.setSessionId(sessionId);
        events.save(event);
    }

    /** Đánh dấu đã giải sự kiện gắn với phiên này. Trả true nếu vừa chuyển sang RESOLVED. */
    public boolean resolveBySession(UUID sessionId, LocalDateTime now) {
        return events.findBySessionId(sessionId)
                .filter(event -> UserCityEvent.OPEN.equals(event.getStatus()))
                .map(event -> {
                    event.setStatus(UserCityEvent.RESOLVED);
                    event.setResolvedAt(now);
                    events.save(event);
                    return true;
                })
                .orElse(false);
    }

    /** Chọn mẫu chưa dùng hôm nay, cố định theo (người chơi, ngày). */
    private List<UserCityEvent> spawn(UUID userId, LocalDate today, List<UserCityEvent> existing) {
        Set<String> used = existing.stream()
                .map(UserCityEvent::getTemplateCode)
                .collect(Collectors.toSet());
        List<CityEventTemplate> pool = templates.findAllByOrderBySortOrderAsc().stream()
                .filter(template -> !used.contains(template.getCode()))
                .collect(Collectors.toCollection(ArrayList::new));
        long seed = userId.getMostSignificantBits() ^ today.toEpochDay() * 31;
        Collections.shuffle(pool, new Random(seed));

        int missing = balance.getEventPerDay() - existing.size();
        List<UserCityEvent> created = new ArrayList<>();
        for (CityEventTemplate template : pool.subList(0, Math.min(missing, pool.size()))) {
            UserCityEvent event = new UserCityEvent();
            event.setUserId(userId);
            event.setTemplateCode(template.getCode());
            event.setSpawnDate(today);
            created.add(events.save(event));
        }
        return created;
    }

    private static CityEventDto toDto(UserCityEvent event, CityEventTemplate template) {
        return new CityEventDto(
                "evt-" + event.getId(),
                event.getId(),
                template.getBuildingCode(),
                template.getResidentName(),
                template.getSituation(),
                event.getStatus());
    }
}
