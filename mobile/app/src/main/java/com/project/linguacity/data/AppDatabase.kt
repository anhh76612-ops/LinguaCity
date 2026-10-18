package com.project.linguacity.data.local

import androidx.room.Database
import androidx.room.RoomDatabase
import com.project.linguacity.data.local.user.UserProfileDao
import com.project.linguacity.data.local.user.UserProfileEntity

@Database(
    entities = [UserProfileEntity::class],
    version = 1,
    exportSchema = true
)
abstract class AppDatabase : RoomDatabase() {

    abstract fun userProfileDao(): UserProfileDao
}