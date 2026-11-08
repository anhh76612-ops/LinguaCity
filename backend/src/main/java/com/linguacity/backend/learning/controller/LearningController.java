package com.linguacity.backend.learning.controller;

import com.linguacity.backend.learning.dto.LearningDtos.*;
import com.linguacity.backend.learning.service.LearningService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/** UC_05 Take Learning Session + bài kiểm tra trình độ (system-design §10.4.2, §10.4.3). */
@RestController
@RequestMapping("/api/v1")
public class LearningController {

    private final LearningService learning;

    public LearningController(LearningService learning) {
        this.learning = learning;
    }

    @PostMapping("/learning/sessions")
    public ResponseEntity<SessionDto> start(@RequestHeader("X-Guest-UUID") UUID guest,
                                            @RequestBody StartSessionRequest body) {
        LearningService.Started started = learning.start(
                guest, body.buildingCode() == null ? "" : body.buildingCode());
        return ResponseEntity.status(started.created() ? HttpStatus.CREATED : HttpStatus.OK)
                .body(started.session());
    }

    @GetMapping("/learning/sessions/{id}")
    public SessionDto get(@RequestHeader("X-Guest-UUID") UUID guest, @PathVariable UUID id) {
        return learning.get(guest, id);
    }

    @PostMapping("/learning/sessions/{id}/items/{itemNo}/answer")
    public AnswerResultDto answer(@RequestHeader("X-Guest-UUID") UUID guest, @PathVariable UUID id,
                                  @PathVariable int itemNo, @RequestBody AnswerRequest body) {
        return learning.answer(guest, id, itemNo, body.answer());
    }

    @PostMapping("/learning/sessions/{id}/complete")
    public CompleteResultDto complete(
            @RequestHeader("X-Guest-UUID") UUID guest, @PathVariable UUID id) {
        return learning.complete(guest, id);
    }

    @PostMapping("/tutorial/placement")
    public ResponseEntity<SessionDto> placement(@RequestHeader("X-Guest-UUID") UUID guest) {
        LearningService.Started started = learning.startPlacement(guest);
        return ResponseEntity.status(started.created() ? HttpStatus.CREATED : HttpStatus.OK)
                .body(started.session());
    }
}
