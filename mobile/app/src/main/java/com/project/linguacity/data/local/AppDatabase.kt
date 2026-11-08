package com.project.linguacity.data.local

import androidx.room.AutoMigration
import androidx.room.Database
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import androidx.room.migration.Migration
import androidx.sqlite.db.SupportSQLiteDatabase
import com.project.linguacity.data.local.content.BlueprintEntity
import com.project.linguacity.data.local.content.BuildingEntity
import com.project.linguacity.data.local.content.BuildingLevelEntity
import com.project.linguacity.data.local.content.BuildingThemeEntity
import com.project.linguacity.data.local.content.ContentDao
import com.project.linguacity.data.local.content.ContentPackStateEntity
import com.project.linguacity.data.local.content.ExamEntity
import com.project.linguacity.data.local.content.ExamQuestionEntity
import com.project.linguacity.data.local.content.ExamRequirementEntity
import com.project.linguacity.data.local.content.QuestionEntity
import com.project.linguacity.data.local.content.QuestionVocabularyEntity
import com.project.linguacity.data.local.content.ThemeEntity
import com.project.linguacity.data.local.content.VocabularyEntity
import com.project.linguacity.data.local.player.AchievementEntity
import com.project.linguacity.data.local.player.CosmeticItemEntity
import com.project.linguacity.data.local.player.UnlockedCosmeticEntity
import com.project.linguacity.data.local.player.PlayerDao
import com.project.linguacity.data.local.player.UserAchievementEntity
import com.project.linguacity.data.local.player.UserBuildingEntity
import com.project.linguacity.data.local.player.UserVocabProgressEntity
import com.project.linguacity.data.local.user.UserProfileDao
import com.project.linguacity.data.local.user.UserProfileEntity

/**
 * v1 → v2: thêm tutorialCompleted (UC_02, migration viết tay).
 * v2 → v3: thêm 12 bảng nội dung tĩnh (VS2). Chỉ thêm bảng mới nên dùng AutoMigration:
 *          Room so sánh schemas/…/2.json với 3.json và tự sinh các câu CREATE TABLE.
 * v3 → v4: Player State (VS3): tiến độ từ, công trình, danh hiệu + 2 cột hồ sơ (có DEFAULT) → vẫn
 * AutoMigration.
 * v4 → v5: Tuỳ biến (M8): 2 bảng mới + 2 cột hồ sơ cho phép NULL → AutoMigration.
 */
@Database(
    entities = [
        UserProfileEntity::class,
        ThemeEntity::class,
        BuildingEntity::class,
        BuildingThemeEntity::class,
        BuildingLevelEntity::class,
        BlueprintEntity::class,
        VocabularyEntity::class,
        QuestionEntity::class,
        QuestionVocabularyEntity::class,
        ExamEntity::class,
        ExamRequirementEntity::class,
        ExamQuestionEntity::class,
        ContentPackStateEntity::class,
        UserVocabProgressEntity::class,
        UserBuildingEntity::class,
        AchievementEntity::class,
        UserAchievementEntity::class,
        CosmeticItemEntity::class,
        UnlockedCosmeticEntity::class
    ],
    version = 6,
    exportSchema = true,
    autoMigrations = [
        AutoMigration(from = 2, to = 3),
        AutoMigration(from = 3, to = 4),
        AutoMigration(from = 4, to = 5),
        // v6 (ADR-017): Gạch, Gỗ
        AutoMigration(from = 5, to = 6)
    ]
)
@TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase() {

    abstract fun userProfileDao(): UserProfileDao

    abstract fun contentDao(): ContentDao

    abstract fun playerDao(): PlayerDao
}

/**
 * v1 → v2: thêm cột tutorialCompleted (UC_02).
 * Room lưu Boolean dưới dạng INTEGER (0/1).
 */
val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(db: SupportSQLiteDatabase) {
        db.execSQL(
            "ALTER TABLE user_profiles ADD COLUMN tutorialCompleted INTEGER NOT NULL DEFAULT 0"
        )
    }
}
