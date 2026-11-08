package com.linguacity.backend.cosmetic.repository;

import com.linguacity.backend.cosmetic.entity.CosmeticItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CosmeticItemRepository extends JpaRepository<CosmeticItem, String> {

    List<CosmeticItem> findAllByOrderByCategoryAscSortOrderAsc();
}
