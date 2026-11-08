package com.linguacity.backend.content.repository;

import com.linguacity.backend.content.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface VocabularyRepository extends JpaRepository<Vocabulary, Long> {

    List<Vocabulary> findByThemeIdInAndLevelOrderByIdAsc(Collection<Long> themeIds, Integer level);

    List<Vocabulary> findByThemeIdIn(Collection<Long> themeIds);
}
