package com.project.linguacity.data.repository

import com.project.linguacity.data.local.player.CardPrefsDao
import com.project.linguacity.data.local.player.CardPrefsEntity
import com.project.linguacity.domain.model.learning.CardPrefs
import com.project.linguacity.domain.repository.CardPrefsRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class CardPrefsRepositoryImpl @Inject constructor(
    private val dao: CardPrefsDao
) : CardPrefsRepository {

    override fun observeAll(): Flow<Map<Long, CardPrefs>> =
        dao.observeAll().map { rows -> rows.associate { it.vocabularyId to it.toDomain() } }

    override suspend fun setFavorite(id: Long, favorite: Boolean) =
        update(id, System.currentTimeMillis()) { it.copy(favorite = favorite) }

    override suspend fun setUserScale(id: Long, scale: Float) =
        update(id, System.currentTimeMillis()) {
            it.copy(userScale = scale.coerceIn(MIN_SCALE, MAX_SCALE))
        }

    override suspend fun setNote(id: Long, note: String) =
        update(id, System.currentTimeMillis()) { it.copy(note = note) }

    override suspend fun markSelfCheck(id: Long, nowMillis: Long) =
        update(id, nowMillis) { it.copy(lastSelfCheckAtMillis = nowMillis) }

    private suspend fun update(
        id: Long,
        nowMillis: Long,
        change: (CardPrefsEntity) -> CardPrefsEntity
    ) {
        val old = dao.get(id) ?: CardPrefsEntity(vocabularyId = id, updatedAtMillis = nowMillis)
        dao.upsert(change(old).copy(updatedAtMillis = nowMillis))
    }

    private fun CardPrefsEntity.toDomain() = CardPrefs(
        vocabularyId = vocabularyId,
        favorite = favorite,
        userScale = userScale,
        note = note,
        lastSelfCheckAtMillis = lastSelfCheckAtMillis
    )

    private companion object {
        const val MIN_SCALE = 0.3f
        const val MAX_SCALE = 4f
    }
}
