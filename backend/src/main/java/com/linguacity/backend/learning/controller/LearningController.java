package com.linguacity.backend.learning.controller;

import com.linguacity.backend.auth.security.CurrentUser;
import com.linguacity.backend.learning.dto.LearningDtos.*;
import com.linguacity.backend.learning.service.LearningService;
import com.linguacity.backend.learning.service.PracticeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/** UC_05 Take Learning Session + bài kiểm tra trình độ (system-design §10.4.2, §10.4.3). */
@RestController
@RequestMapping("/api/v1")
public class LearningController {

    private final LearningService learning;
    private final PracticeService practice;

    public LearningController(LearningService learning, PracticeService practice) {
        this.learning = learning;
        this.practice = practice;
    }

    @PostMapping("/learning/sessions")
    public ResponseEntity<SessionDto> start(
            @CurrentUser UUID guest,
            @RequestBody StartSessionRequest body) {
        LearningService.Started started = learning.start(
                guest, body.buildingCode() == null ? "" : body.buildingCode());
        return ResponseEntity.status(started.created() ? HttpStatus.CREATED : HttpStatus.OK)
                .body(started.session());
    }

    @GetMapping("/learning/sessions/{id}")
    public SessionDto get(@CurrentUser UUID guest, @PathVariable UUID id) {
        return learning.get(guest, id);
    }

    @PostMapping("/learning/sessions/{id}/items/{itemNo}/answer")
    public AnswerResultDto answer(
            @CurrentUser UUID guest,
            @PathVariable UUID id,
            @PathVariable int itemNo,
            @RequestBody AnswerRequest body) {
        return learning.answer(guest, id, itemNo, body.answer());
    }

    /** S5: gợi ý của Bơ cho câu chưa trả lời. */
    @PostMapping("/learning/sessions/{id}/items/{itemNo}/hint")
    public com.linguacity.backend.learning.dto.LearningDtos.HintDto hint(
            @CurrentUser UUID guest, @PathVariable UUID id, @PathVariable int itemNo) {
        return learning.hint(guest, id, itemNo);
    }

    @PostMapping("/learning/sessions/{id}/complete")
    public CompleteResultDto complete(
            @CurrentUser UUID guest, @PathVariable UUID id) {
        return learning.complete(guest, id);
    }

    @PostMapping("/tutorial/placement")
    public ResponseEntity<SessionDto> placement(@CurrentUser UUID guest) {
        LearningService.Started started = learning.startPlacement(guest);
        return ResponseEntity.status(started.created() ? HttpStatus.CREATED : HttpStatus.OK)
                .body(started.session());
    }

    /** Luyện tập mọi chủ đề (ADR-015 §6). */
    @GetMapping("/learning/practice/status")
    public PracticeStatusDto practiceStatus(@CurrentUser UUID guest) {
        return practice.status(guest);
    }

    @PostMapping("/learning/practice")
    public ResponseEntity<SessionDto> startPractice(
            @CurrentUser UUID guest,
            @RequestBody(required = false) PracticeRequest body) {
        LearningService.Started started = practice.start(guest, body);
        return ResponseEntity.status(started.created() ? HttpStatus.CREATED : HttpStatus.OK)
                .body(started.session());
    }
}
