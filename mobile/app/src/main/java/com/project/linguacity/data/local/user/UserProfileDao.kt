package com.project.linguacity.data.local.user

import androidx.room.Dao
import androidx.room.Query
import androidx.room.Upsert
import kotlinx.coroutines.flow.Flow

@Dao
interface UserProfileDao {

    @Upsert
    suspend fun upsert(userProfile: UserProfileEntity)

    @Query("SELECT * FROM user_profiles WHERE id = :userId LIMIT 1")
    suspend fun getById(userId: String): UserProfileEntity?

    @Query("SELECT * FROM user_profiles WHERE id = :userId LIMIT 1")
    fun observeById(userId: String): Flow<UserProfileEntity?>
}