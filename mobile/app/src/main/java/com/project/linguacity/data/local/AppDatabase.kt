package com.project.linguacity.data.local

import androidx.room.Database
import androidx.room.RoomDatabase
import androidx.room.migration.Migration
import androidx.sqlite.db.SupportSQLiteDatabase
import com.project.linguacity.data.local.user.UserProfileDao
import com.project.linguacity.data.local.user.UserProfileEntity

@Database(
    entities = [UserProfileEntity::class],
    version = 2,
    exportSchema = true
)
abstract class AppDatabase : RoomDatabase() {

    abstract fun userProfileDao(): UserProfileDao
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
