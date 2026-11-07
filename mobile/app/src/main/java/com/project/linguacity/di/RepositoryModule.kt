package com.project.linguacity.di

import com.project.linguacity.data.repository.FakeCityRepository
import com.project.linguacity.data.repository.UserRepositoryImpl
import com.project.linguacity.domain.repository.CityRepository
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

    // Tạm dùng dữ liệu giả lập; đến VS5 đổi sang CityRepositoryImpl gọi Backend ở đúng chỗ này.
    @Binds
    @Singleton
    abstract fun bindCityRepository(
        implementation: FakeCityRepository
    ): CityRepository
}