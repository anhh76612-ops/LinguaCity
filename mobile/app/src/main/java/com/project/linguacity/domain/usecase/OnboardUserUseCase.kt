package com.project.linguacity.domain.usecase

import com.project.linguacity.domain.model.UserProfile
import com.project.linguacity.domain.repository.UserRepository
import javax.inject.Inject

class OnboardUserUseCase @Inject constructor(
    private val userRepository: UserRepository
) {

    suspend operator fun invoke(): UserProfile {
        return userRepository.onboardUser()
    }
}