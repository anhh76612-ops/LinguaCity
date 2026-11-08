package com.project.linguacity.data.local.player

import androidx.room.Dao
import androidx.room.Query
import androidx.room.Upsert
import kotlinx.coroutines.flow.Flow

@Dao
interface PlayerDao {

    @Upsert suspend fun upsertProgress(items: List<UserVocabProgressEntity>)

    @Query("SELECT * FROM user_vocab_progress WHERE vocabularyId = :id")
    suspend fun progress(id: Long): UserVocabProgressEntity?

    @Query("SELECT * FROM user_vocab_progress")
    fun observeProgress(): Flow<List<UserVocabProgressEntity>>

    @Upsert suspend fun upsertBuildings(items: List<UserBuildingEntity>)

    @Query("SELECT * FROM user_buildings")
    fun observeBuildings(): Flow<List<UserBuildingEntity>>

    @Upsert suspend fun upsertAchievements(items: List<AchievementEntity>)

    @Query("DELETE FROM achievements") suspend fun clearAchievements()

    @Query("SELECT * FROM achievements ORDER BY sortOrder")
    fun observeAchievements(): Flow<List<AchievementEntity>>

    @Upsert suspend fun upsertEarned(items: List<UserAchievementEntity>)

    @Query("DELETE FROM user_achievements") suspend fun clearEarned()

    @Query("SELECT * FROM user_achievements")
    fun observeEarned(): Flow<List<UserAchievementEntity>>

    // ---------- v5: tuỳ biến (M8) ----------
    @Upsert suspend fun upsertCosmetics(items: List<CosmeticItemEntity>)

    @Query("DELETE FROM cosmetic_items") suspend fun clearCosmetics()

    @Query("SELECT * FROM cosmetic_items ORDER BY category, sortOrder")
    fun observeCosmetics(): Flow<List<CosmeticItemEntity>>

    @Upsert suspend fun upsertUnlocked(items: List<UnlockedCosmeticEntity>)

    @Query("DELETE FROM unlocked_cosmetics") suspend fun clearUnlocked()

    @Query("SELECT * FROM unlocked_cosmetics")
    fun observeUnlocked(): Flow<List<UnlockedCosmeticEntity>>
}
