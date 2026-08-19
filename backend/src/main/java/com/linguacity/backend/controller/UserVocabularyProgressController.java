package com.linguacity.backend.controller;

import com.linguacity.backend.entity.UserVocabularyProgress;
import com.linguacity.backend.repository.UserVocabularyProgressRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class UserVocabularyProgressController {

    private final UserVocabularyProgressRepository progressRepository;

    public UserVocabularyProgressController(UserVocabularyProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    // Lấy toàn bộ tiến độ học từ vựng của một người chơi
    @GetMapping("/user/{userId}")
    public List<UserVocabularyProgress> getProgressByUser(@PathVariable Long userId) {
        return progressRepository.findByUserId(userId);
    }
}