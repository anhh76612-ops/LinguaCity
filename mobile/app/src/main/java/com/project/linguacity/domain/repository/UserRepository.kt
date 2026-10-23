package com.project.linguacity.domain.repository

import com.project.linguacity.domain.model.UserProfile

interface UserRepository {

    suspend fun onboardUser(): UserProfile
    suspend fun completeTutorial(): Boolean
}