package com.linguacity.backend.content.repository;

import com.linguacity.backend.content.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface ThemeRepository extends JpaRepository<Theme, Long> {

    List<Theme> findByCodeIn(Collection<String> codes);
}
