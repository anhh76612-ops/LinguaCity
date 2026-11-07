package com.project.linguacity.data.repository

import com.project.linguacity.data.local.preferences.GuestIdStore
import com.project.linguacity.data.local.user.UserProfileDao
import com.project.linguacity.data.local.user.UserProfileEntity
import com.project.linguacity.data.remote.user.OnboardingApi
import com.project.linguacity.domain.model.UserProfile
import com.project.linguacity.domain.repository.UserRepository
import java.io.IOException
import javax.inject.Inject

class UserRepositoryImpl @Inject constructor(
    private val guestIdStore: GuestIdStore,
    private val onboardingApi: OnboardingApi,
    private val userProfileDao: UserProfileDao
) : UserRepository {

    override suspend fun onboardUser(): UserProfile {
        val guestUuid = guestIdStore.getOrCreateGuestUuid()

        val response = try {
            onboardingApi.onboardUser(guestUuid)
        } catch (offline: IOException) {
            // ADR-004 / FR-SYS-03: mất mạng nhưng máy đã có hồ sơ → vào game bằng bản cache để đọc offline
            // (flashcard, danh sách từ). Lần đầu chưa có hồ sơ thì vẫn báo lỗi như cũ (BR-CONTENT-08).
            val cached = userProfileDao.getById(guestUuid) ?: throw offline
            return cached.toDomain()
        }

        val entity = UserProfileEntity(
            id = response.userId,
            knowledgePoints = response.knowledgePoints,
            hourglassCount = response.hourglassCount,
            blueprintShards = response.blueprintShards,
            tutorialCompleted = response.tutorialCompleted,
            tutorialStep = response.tutorialStep,
            // danh hiệu đang đeo không có trong response onboard: giữ giá trị cũ trong máy
            equippedTitle = userProfileDao.getById(response.userId)?.equippedTitle
        )

        userProfileDao.upsert(entity)

        return entity.toDomain()
    }

    private fun UserProfileEntity.toDomain() = UserProfile(
        id = id,
        knowledgePoints = knowledgePoints,
        hourglassCount = hourglassCount,
        blueprintShards = blueprintShards,
        tutorialCompleted = tutorialCompleted,
        tutorialStep = tutorialStep,
        equippedTitle = equippedTitle
    )

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