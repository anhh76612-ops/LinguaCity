package com.project.linguacity.di

import com.project.linguacity.data.remote.city.CityApi
import com.project.linguacity.data.remote.content.ContentApi
import com.project.linguacity.data.remote.learning.LearningApi
import com.project.linguacity.data.remote.player.PlayerApi
import com.project.linguacity.data.remote.user.OnboardingApi
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import retrofit2.Retrofit
import retrofit2.converter.kotlinx.serialization.asConverterFactory
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {

    private const val BASE_URL = "http://10.0.2.2:8080/"

    @Provides
    @Singleton
    fun provideJson(): Json {
        return Json {
            ignoreUnknownKeys = true
        }
    }

    @Provides
    @Singleton
    fun provideRetrofit(json: Json): Retrofit {
        val contentType = "application/json".toMediaType()

        return Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(
                json.asConverterFactory(contentType)
            )
            .build()
    }

    @Provides
    @Singleton
    fun provideOnboardingApi(
        retrofit: Retrofit
    ): OnboardingApi {
        return retrofit.create(OnboardingApi::class.java)
    }

    @Provides
    @Singleton
    fun provideContentApi(retrofit: Retrofit): ContentApi = retrofit.create(ContentApi::class.java)

    @Provides
    @Singleton
    fun provideLearningApi(retrofit: Retrofit): LearningApi =
        retrofit.create(LearningApi::class.java)

    @Provides
    @Singleton
    fun provideCityApi(retrofit: Retrofit): CityApi = retrofit.create(CityApi::class.java)

    @Provides
    @Singleton
    fun providePlayerApi(retrofit: Retrofit): PlayerApi = retrofit.create(PlayerApi::class.java)
}
