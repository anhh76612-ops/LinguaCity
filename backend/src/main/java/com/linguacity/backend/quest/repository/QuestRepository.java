package com.linguacity.backend.quest.repository;

import com.linguacity.backend.quest.entity.Quest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestRepository extends JpaRepository<Quest, String> {

    List<Quest> findByKindOrderBySortOrderAsc(String kind);
}
