package com.linguacity.backend.learning.service;

import com.linguacity.backend.content.entity.Question;
import com.linguacity.backend.learning.dto.LearningDtos.QuestionView;
import org.springframework.stereotype.Component;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

/** Chuyển câu hỏi sang dạng gửi cho app và đọc danh sách đáp án chấp nhận (dùng chung). */
@Component
public class QuestionViews {

    private final ObjectMapper json;

    public QuestionViews(ObjectMapper json) {
        this.json = json;
    }

    /** Câu hỏi gửi cho app: cố ý KHÔNG có answer / acceptedAnswers / explanation (NFR-01). */
    public QuestionView viewOf(Question question) {
        return new QuestionView(
                question.getId(),
                question.getSkill(),
                question.getQuestionType(),
                question.getTier(),
                question.getQuestionText(),
                metadataOf(question));
    }

    public JsonNode metadataOf(Question question) {
        return question.getMetadata() == null ? null : json.readTree(question.getMetadata());
    }

    /** Câu có chỗ trống (metadata.sentence) nếu là câu điền từ; không có thì null. */
    public String sentenceOf(Question question) {
        JsonNode metadata = metadataOf(question);
        if (metadata == null || !metadata.has("sentence")) {
            return null;
        }
        return metadata.get("sentence").asString();
    }

    public List<String> acceptedAnswers(Question question) {
        String raw = question.getAcceptedAnswers();
        if (raw == null || raw.isBlank()) {
            return List.of();
        }
        return json.readValue(raw, new TypeReference<List<String>>() {
        });
    }
}
