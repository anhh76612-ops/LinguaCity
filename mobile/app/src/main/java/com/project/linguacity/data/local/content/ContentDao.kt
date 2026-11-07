package com.project.linguacity.data.local.content

import androidx.room.Dao
import androidx.room.Query
import androidx.room.Upsert
import kotlinx.coroutines.flow.Flow

@Dao
interface ContentDao {

    // ---------- trạng thái gói ----------
    @Query("SELECT * FROM content_pack_state")
    suspend fun packStates(): List<ContentPackStateEntity>

    @Upsert
    suspend fun upsertPackState(state: ContentPackStateEntity)

    // ---------- CORE ----------
    @Upsert suspend fun upsertThemes(items: List<ThemeEntity>)
    @Upsert suspend fun upsertBuildings(items: List<BuildingEntity>)
    @Upsert suspend fun upsertBuildingThemes(items: List<BuildingThemeEntity>)
    @Upsert suspend fun upsertBuildingLevels(items: List<BuildingLevelEntity>)
    @Upsert suspend fun upsertBlueprints(items: List<BlueprintEntity>)

    @Query("DELETE FROM themes") suspend fun clearThemes()
    @Query("DELETE FROM buildings") suspend fun clearBuildings()
    @Query("DELETE FROM building_themes") suspend fun clearBuildingThemes()
    @Query("DELETE FROM building_levels") suspend fun clearBuildingLevels()
    @Query("DELETE FROM blueprints") suspend fun clearBlueprints()

    @Query("SELECT * FROM buildings ORDER BY sortOrder")
    suspend fun buildings(): List<BuildingEntity>

    @Query("SELECT * FROM building_levels ORDER BY buildingCode, level")
    fun observeBuildingLevels(): Flow<List<BuildingLevelEntity>>

    // ---------- gói (công trình, level) ----------
    @Upsert suspend fun upsertVocabularies(items: List<VocabularyEntity>)
    @Upsert suspend fun upsertQuestions(items: List<QuestionEntity>)
    @Upsert suspend fun upsertQuestionVocabularies(items: List<QuestionVocabularyEntity>)
    @Upsert suspend fun upsertExams(items: List<ExamEntity>)
    @Upsert suspend fun upsertExamRequirements(items: List<ExamRequirementEntity>)
    @Upsert suspend fun upsertExamQuestions(items: List<ExamQuestionEntity>)

    @Query("DELETE FROM vocabularies WHERE packCode = :pack") suspend fun deleteVocabularies(pack: String)
    @Query("DELETE FROM questions WHERE packCode = :pack") suspend fun deleteQuestions(pack: String)
    @Query("DELETE FROM question_vocabularies WHERE packCode = :pack") suspend fun deleteQuestionVocabularies(pack: String)
    @Query("DELETE FROM exams WHERE packCode = :pack") suspend fun deleteExams(pack: String)
    @Query("DELETE FROM exam_requirements WHERE packCode = :pack") suspend fun deleteExamRequirements(pack: String)
    @Query("DELETE FROM exam_questions WHERE packCode = :pack") suspend fun deleteExamQuestions(pack: String)

    @Query("SELECT * FROM vocabularies WHERE packCode = :pack ORDER BY id")
    fun observeVocabularies(pack: String): Flow<List<VocabularyEntity>>

    @Query("SELECT id, packCode FROM vocabularies")
    fun observeVocabularyPacks(): Flow<List<VocabularyPackRow>>

    @Query("SELECT COUNT(*) FROM vocabularies")
    suspend fun vocabularyCount(): Int
}

/** Một từ thuộc gói nào — để đếm tiến độ sưu tầm theo gói. */
data class VocabularyPackRow(val id: Long, val packCode: String)
