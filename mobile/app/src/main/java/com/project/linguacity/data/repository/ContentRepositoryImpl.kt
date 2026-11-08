package com.project.linguacity.data.repository

import androidx.room.withTransaction
import com.project.linguacity.data.local.AppDatabase
import com.project.linguacity.data.local.content.ContentDao
import com.project.linguacity.data.local.content.ContentPackStateEntity
import com.project.linguacity.data.local.player.AchievementEntity
import com.project.linguacity.data.local.player.CosmeticItemEntity
import com.project.linguacity.data.local.player.PlayerDao
import com.project.linguacity.data.local.preferences.GuestIdStore
import com.project.linguacity.data.mapper.toDomain
import com.project.linguacity.data.mapper.toRows
import com.project.linguacity.data.remote.content.ContentApi
import com.project.linguacity.domain.content.PackSelector
import com.project.linguacity.domain.model.content.BuildingLevelInfo
import com.project.linguacity.domain.model.content.SyncProgress
import com.project.linguacity.domain.model.content.SyncReport
import com.project.linguacity.domain.model.content.Vocabulary
import com.project.linguacity.domain.model.content.packCode
import com.project.linguacity.domain.repository.ContentRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import javax.inject.Inject
import javax.inject.Singleton

/**
 * UC_03 (system-design §10.3.1). Mỗi gói được ghi trong MỘT transaction: xoá dòng cũ của gói →
 * upsert dòng mới
 * → lưu version (BR-CONTENT-05). Lỗi giữa chừng thì transaction huỷ, gói giữ nguyên bản cũ.
 */
@Singleton
class ContentRepositoryImpl @Inject constructor(
    private val api: ContentApi,
    private val db: AppDatabase,
    private val dao: ContentDao,
    private val playerDao: PlayerDao,
    private val guestIdStore: GuestIdStore
) : ContentRepository {

    // Mở app và quay lại foreground có thể gọi sync gần như cùng lúc: chỉ cho chạy một lượt.
    private val mutex = Mutex()

    override suspend fun hasCore(): Boolean =
        dao.packStates().any { it.code == PackSelector.CORE }

    override suspend fun sync(
        currentLevels: Map<String, Int>,
        onProgress: (SyncProgress) -> Unit
    ): SyncReport = mutex.withLock {
        val guest = guestIdStore.getOrCreateGuestUuid()
        val manifest = api.manifest(guest).packs.map { it.toDomain() }
        val local = dao.packStates().associate { it.code to it.version }
        val queue = PackSelector.toDownload(manifest, currentLevels, local)
        val wanted = PackSelector.wanted(manifest, currentLevels).map { it.code }

        queue.forEachIndexed { index, ref ->
            onProgress(SyncProgress(index, queue.size, ref.code))
            if (ref.code == PackSelector.CORE) saveCore(guest) else savePack(
                guest,
                ref.buildingCode!!,
                ref.level!!
            )
        }
        onProgress(SyncProgress(queue.size, queue.size, null))

        val downloaded = queue.map { it.code }
        SyncReport(downloaded = downloaded, upToDate = wanted - downloaded.toSet())
    }

    private suspend fun saveCore(guest: String) {
        val core = api.core(guest)
        val rows = core.toRows()
        db.withTransaction {
            dao.clearThemes()
            dao.clearBuildings()
            dao.clearBuildingThemes()
            dao.clearBuildingLevels()
            dao.clearBlueprints()
            dao.upsertThemes(rows.themes)
            dao.upsertBuildings(rows.buildings)
            dao.upsertBuildingThemes(rows.buildingThemes)
            dao.upsertBuildingLevels(rows.buildingLevels)
            dao.upsertBlueprints(rows.blueprints)
            playerDao.clearAchievements()
            playerDao.upsertAchievements(core.achievements.map {
                AchievementEntity(
                    it.code,
                    it.name,
                    it.description,
                    it.tier,
                    it.hidden,
                    it.sortOrder
                )
            })
            playerDao.clearCosmetics()
            playerDao.upsertCosmetics(core.cosmetics.map {
                CosmeticItemEntity(
                    it.code,
                    it.category,
                    it.name,
                    it.unlockType,
                    it.priceKp,
                    it.achievementCode,
                    it.assetKey,
                    it.sortOrder
                )
            })
            val state = ContentPackStateEntity(core.code, core.version, System.currentTimeMillis())
            dao.upsertPackState(state)
        }
    }

    private suspend fun savePack(guest: String, buildingCode: String, level: Int) {
        val pack = api.pack(guest, buildingCode, level)
        val rows = pack.toRows()
        val code = pack.code
        db.withTransaction {
            dao.deleteVocabularies(code)
            dao.deleteQuestions(code)
            dao.deleteQuestionVocabularies(code)
            dao.deleteExams(code)
            dao.deleteExamRequirements(code)
            dao.deleteExamQuestions(code)
            dao.upsertVocabularies(rows.vocabularies)
            dao.upsertQuestions(rows.questions)
            dao.upsertQuestionVocabularies(rows.questionVocabularies)
            dao.upsertExams(rows.exams)
            dao.upsertExamRequirements(rows.examRequirements)
            dao.upsertExamQuestions(rows.examQuestions)
            val state = ContentPackStateEntity(code, pack.version, System.currentTimeMillis())
            dao.upsertPackState(state)
        }
    }

    override fun observeVocabularies(buildingCode: String, level: Int): Flow<List<Vocabulary>> =
        dao.observeVocabularies(packCode(
            buildingCode,
            level
        )).map { list -> list.map { it.toDomain() } }

    override fun observePackWordIds(): Flow<Map<String, Set<Long>>> =
        dao.observeVocabularyPacks().map { rows -> rows.groupBy(
            { it.packCode },
            { it.id }
        ).mapValues { it.value.toSet() } }

    override fun observeBuildingLevels(): Flow<List<BuildingLevelInfo>> =
        dao.observeBuildingLevels().map { list -> list.map { it.toDomain() } }
}
