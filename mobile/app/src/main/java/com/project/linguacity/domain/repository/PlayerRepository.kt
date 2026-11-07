package com.project.linguacity.domain.repository

import com.project.linguacity.domain.model.UserProfile
import com.project.linguacity.domain.model.player.AchievementView
import kotlinx.coroutines.flow.Flow

interface PlayerRepository {
    fun observeProfile(): Flow<UserProfile?>
    fun observeAchievements(): Flow<List<AchievementView>>

    /** GET /users/me + /users/me/achievements → Room. */
    suspend fun refresh()
    suspend fun equip(code: String?)

    /** PUT /users/me/tutorial/step — chỉ các bước app được tự chuyển (BR-TUT-02). */
    suspend fun advanceTutorial(step: String)
}
