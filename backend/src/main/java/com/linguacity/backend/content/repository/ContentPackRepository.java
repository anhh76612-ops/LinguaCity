package com.linguacity.backend.content.repository;

import com.linguacity.backend.content.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ContentPackRepository extends JpaRepository<ContentPack, Long> {

    List<ContentPack> findByScopeOrderByIdAsc(String scope);

    Optional<ContentPack> findByScopeAndCode(String scope, String code);

    Optional<ContentPack> findByScopeAndBuildingIdAndLevel(
            String scope, Long buildingId, Integer level);
}
