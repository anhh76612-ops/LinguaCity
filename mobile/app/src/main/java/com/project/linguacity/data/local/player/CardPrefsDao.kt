package com.project.linguacity.data.local.player

import androidx.room.Dao
import androidx.room.Query
import androidx.room.Upsert
import kotlinx.coroutines.flow.Flow

@Dao
interface CardPrefsDao {

    @Upsert suspend fun upsert(row: CardPrefsEntity)

    @Query("SELECT * FROM user_card_prefs WHERE vocabularyId = :id")
    suspend fun get(id: Long): CardPrefsEntity?

    @Query("SELECT * FROM user_card_prefs")
    fun observeAll(): Flow<List<CardPrefsEntity>>
}
