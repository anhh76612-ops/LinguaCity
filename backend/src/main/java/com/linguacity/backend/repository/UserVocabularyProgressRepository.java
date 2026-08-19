package com.linguacity.backend.repository;
import com.linguacity.backend.entity.UserVocabularyProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserVocabularyProgressRepository extends JpaRepository<UserVocabularyProgress, Long> {
    List<UserVocabularyProgress> findByUserId(Long userId);
}