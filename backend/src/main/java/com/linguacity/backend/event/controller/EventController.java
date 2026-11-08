package com.linguacity.backend.event.controller;

import com.linguacity.backend.auth.security.CurrentUser;
import com.linguacity.backend.learning.dto.LearningDtos.SessionDto;
import com.linguacity.backend.learning.service.LearningService;
import com.linguacity.backend.learning.service.PracticeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

/** UC_18: bắt đầu giải sự kiện thành phố (system-design §11.5). Nộp câu dùng API phiên học. */
@RestController
@RequestMapping("/api/v1/events")
public class EventController {

    private final PracticeService practice;

    public EventController(PracticeService practice) {
        this.practice = practice;
    }

    @PostMapping("/{id}/start")
    public ResponseEntity<SessionDto> start(
            @CurrentUser UUID guest, @PathVariable Long id) {
        LearningService.Started started = practice.startEvent(guest, id);
        return ResponseEntity.status(started.created() ? HttpStatus.CREATED : HttpStatus.OK)
                .body(started.session());
    }
}
