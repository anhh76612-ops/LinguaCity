package com.project.linguacity.di

import android.content.Context
import androidx.room.Room
import com.project.linguacity.data.local.AppDatabase
import com.project.linguacity.data.local.user.UserProfileDao
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {

    @Provides
    @Singleton
    fun provideAppDatabase(
        @ApplicationContext context: Context
    ): AppDatabase {
        return Room.databaseBuilder(
            context,
            AppDatabase::class.java,
            "linguacity.db"
        ).build()
    }

    @Provides
    fun provideUserProfileDao(
        database: AppDatabase
    ): UserProfileDao {
        return database.userProfileDao()
    }
}