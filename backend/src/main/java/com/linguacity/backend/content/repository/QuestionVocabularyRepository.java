package com.linguacity.backend.content.repository;

import com.linguacity.backend.content.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface QuestionVocabularyRepository extends JpaRepository<QuestionVocabulary, QuestionVocabularyId> {

    List<QuestionVocabulary> findByIdVocabularyIdIn(Collection<Long> vocabularyIds);

    List<QuestionVocabulary> findByIdQuestionIdIn(Collection<Long> questionIds);
}
