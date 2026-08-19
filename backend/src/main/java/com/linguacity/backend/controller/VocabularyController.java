package com.linguacity.backend.controller;

import com.linguacity.backend.entity.Vocabulary;
import com.linguacity.backend.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vocabularies")
public class VocabularyController {

    private final VocabularyRepository vocabularyRepository;

    public VocabularyController(VocabularyRepository vocabularyRepository) {
        this.vocabularyRepository = vocabularyRepository;
    }

    // API 1: Lấy toàn bộ danh sách từ vựng
    // Endpoint: GET http://localhost:8080/api/vocabularies
    @GetMapping
    public List<Vocabulary> getAllVocabularies() {
        return vocabularyRepository.findAll();
    }

    // API 2: Lấy từ vựng theo công trình và cấp độ
    // Endpoint: GET http://localhost:8080/api/vocabularies/filter?building=HOUSING&level=1
    @GetMapping("/filter")
    public List<Vocabulary> getVocabulariesByBuildingAndLevel(
            @RequestParam String building,
            @RequestParam Integer level) {
        return vocabularyRepository.findByBuildingTypeAndLevelRequired(building, level);
    }

    // API 3: Thêm 1 từ vựng mới vào cơ sở dữ liệu
    // Endpoint: POST http://localhost:8080/api/vocabularies
    @PostMapping
    public Vocabulary createVocabulary(@RequestBody Vocabulary vocabulary) {
        return vocabularyRepository.save(vocabulary);
    }
}