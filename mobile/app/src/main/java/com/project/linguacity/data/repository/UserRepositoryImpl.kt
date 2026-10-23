package com.project.linguacity.data.repository

import com.project.linguacity.data.local.preferences.GuestIdStore
import com.project.linguacity.data.local.user.UserProfileDao
import com.project.linguacity.data.local.user.UserProfileEntity
import com.project.linguacity.data.remote.user.OnboardingApi
import com.project.linguacity.domain.model.UserProfile
import com.project.linguacity.domain.repository.UserRepository
import javax.inject.Inject

class UserRepositoryImpl @Inject constructor(
    private val guestIdStore: GuestIdStore,
    private val onboardingApi: OnboardingApi,
    private val userProfileDao: UserProfileDao
) : UserRepository {

    override suspend fun onboardUser(): UserProfile {
        val guestUuid = guestIdStore.getOrCreateGuestUuid()

        val response = onboardingApi.onboardUser(guestUuid)

        val entity = UserProfileEntity(
            id = response.userId,
            knowledgePoints = response.knowledgePoints,
            hourglassCount = response.hourglassCount,
            blueprintShards = response.blueprintShards,
            tutorialCompleted = response.tutorialCompleted
        )

        userProfileDao.upsert(entity)

        return UserProfile(
            id = entity.id,
            knowledgePoints = entity.knowledgePoints,
            hourglassCount = entity.hourglassCount,
            blueprintShards = entity.blueprintShards,
            tutorialCompleted = entity.tutorialCompleted
        )
    }

    override suspend fun completeTutorial(): Boolean {
        val guestUuid = guestIdStore.getOrCreateGuestUuid()

        val response = onboardingApi.completeTutorial(guestUuid)

        // Server là nguồn sự thật: chỉ ghi Room sau khi Backend xác nhận.
        userProfileDao.getById(guestUuid)?.let { cached ->
            userProfileDao.upsert(cached.copy(tutorialCompleted = response.tutorialCompleted))
        }

        return response.tutorialCompleted
    }
}