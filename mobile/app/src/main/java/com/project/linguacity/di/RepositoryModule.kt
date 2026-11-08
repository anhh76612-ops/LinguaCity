package com.project.linguacity.di

import com.project.linguacity.data.repository.ContentRepositoryImpl
import com.project.linguacity.data.repository.CosmeticRepositoryImpl
import com.project.linguacity.data.repository.CityRepositoryImpl
import com.project.linguacity.data.repository.LearningRepositoryImpl
import com.project.linguacity.data.repository.PlayerRepositoryImpl
import com.project.linguacity.data.repository.UserRepositoryImpl
import com.project.linguacity.domain.repository.CityRepository
import com.project.linguacity.domain.repository.ContentRepository
import com.project.linguacity.domain.repository.CosmeticRepository
import com.project.linguacity.domain.repository.LearningRepository
import com.project.linguacity.domain.repository.PlayerRepository
import com.project.linguacity.domain.repository.UserRepository
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {

    @Binds
    @Singleton
    abstract fun bindUserRepository(
        implementation: UserRepositoryImpl
    ): UserRepository

    @Binds
    @Singleton
    abstract fun bindContentRepository(
        implementation: ContentRepositoryImpl
    ): ContentRepository

    // M5: thành phố thật (GET /city, cache Room) thay cho FakeCityRepository.
    @Binds
    @Singleton
    abstract fun bindCityRepository(
        implementation: CityRepositoryImpl
    ): CityRepository

    @Binds
    @Singleton
    abstract fun bindLearningRepository(implementation: LearningRepositoryImpl): LearningRepository

    @Binds
    @Singleton
    abstract fun bindPlayerRepository(implementation: PlayerRepositoryImpl): PlayerRepository

    @Binds
    @Singleton
    abstract fun bindCosmeticRepository(implementation: CosmeticRepositoryImpl): CosmeticRepository
}