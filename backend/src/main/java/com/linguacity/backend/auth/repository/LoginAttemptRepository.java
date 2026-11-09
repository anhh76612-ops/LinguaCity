package com.linguacity.backend.auth.repository;

import com.linguacity.backend.auth.entity.LoginAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginAttemptRepository extends JpaRepository<LoginAttempt, String> {
}
