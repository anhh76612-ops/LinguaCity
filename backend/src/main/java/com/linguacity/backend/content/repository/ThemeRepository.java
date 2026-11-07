package com.linguacity.backend.content.repository;

import com.linguacity.backend.content.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThemeRepository extends JpaRepository<Theme, Long> {
}
