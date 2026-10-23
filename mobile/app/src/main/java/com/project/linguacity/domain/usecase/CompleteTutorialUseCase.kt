package com.project.linguacity.domain.usecase

import com.project.linguacity.domain.repository.UserRepository
import javax.inject.Inject

class CompleteTutorialUseCase @Inject constructor(
    private val userRepository: UserRepository
) {

    suspend operator fun invoke(): Boolean {
        return userRepository.completeTutorial()
    }
}