package com.linguacity.backend.exam.controller;

import com.linguacity.backend.exam.dto.ExamDtos.AttemptDto;
import com.linguacity.backend.exam.dto.ExamDtos.ExamListDto;
import com.linguacity.backend.exam.dto.ExamDtos.ExamResultDto;
import com.linguacity.backend.exam.dto.ExamDtos.SubmitRequest;
import com.linguacity.backend.exam.service.ExamService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/** UC_06/07/08: bài thi lên level (system-design §11.2). */
@RestController
@RequestMapping("/api/v1")
public class ExamController {

    private final ExamService exams;

    public ExamController(ExamService exams) {
        this.exams = exams;
    }

    @GetMapping("/exams")
    public ExamListDto list(@RequestHeader("X-Guest-UUID") UUID guest,
            @RequestParam("building") String buildingCode) {
        return exams.exams(guest, buildingCode);
    }

    @PostMapping("/exams/{code}/start")
    public ResponseEntity<AttemptDto> start(@RequestHeader("X-Guest-UUID") UUID guest,
            @PathVariable String code) {
        ExamService.Started started = exams.start(guest, code);
        return ResponseEntity.status(started.created() ? HttpStatus.CREATED : HttpStatus.OK)
                .body(started.attempt());
    }

    @GetMapping("/exam-attempts/{id}")
    public AttemptDto attempt(@RequestHeader("X-Guest-UUID") UUID guest, @PathVariable Long id) {
        return exams.attempt(guest, id);
    }

    @PostMapping("/exam-attempts/{id}/submit")
    public ExamResultDto submit(@RequestHeader("X-Guest-UUID") UUID guest, @PathVariable Long id,
            @RequestBody(required = false) SubmitRequest body) {
        return exams.submit(guest, id, body == null ? List.of() : body.answers());
    }
}
