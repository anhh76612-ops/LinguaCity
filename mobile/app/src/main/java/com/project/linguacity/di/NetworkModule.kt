package com.project.linguacity.di

import com.project.linguacity.BuildConfig
import com.project.linguacity.data.remote.auth.AuthApi
import com.project.linguacity.data.remote.auth.AuthInterceptor
import com.project.linguacity.data.remote.auth.RefreshApi
import com.project.linguacity.data.remote.auth.TokenAuthenticator
import com.project.linguacity.data.remote.progression.ProgressionApi
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
import okhttp3.OkHttpClient
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {

    /** Lấy từ `API_BASE_URL` trong mobile/local.properties; mặc định http://10.0.2.2:8080/ (emulator). */
    private val BASE_URL = BuildConfig.API_BASE_URL

    @Provides
    @Singleton
    fun provideJson(): Json {
        return Json {
            ignoreUnknownKeys = true
        }
    }

    /**
     * Client chính: gắn Bearer token và tự refresh khi gặp 401 (ADR-016).
     */
    @Provides
    @Singleton
    fun provideOkHttpClient(
        authInterceptor: AuthInterceptor,
        tokenAuthenticator: TokenAuthenticator
    ): OkHttpClient = OkHttpClient.Builder()
        .addInterceptor(authInterceptor)
        .authenticator(tokenAuthenticator)
        .build()

    @Provides
    @Singleton
    fun provideRetrofit(json: Json, client: OkHttpClient): Retrofit {
        val contentType = "application/json".toMediaType()

        return Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(client)
            .addConverterFactory(
                json.asConverterFactory(contentType)
            )
            .build()
    }

    /** Refresh token đi bằng client trần (không interceptor/authenticator) để không lặp. */
    @Provides
    @Singleton
    fun provideRefreshApi(json: Json): RefreshApi = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .client(OkHttpClient())
        .addConverterFactory(json.asConverterFactory("application/json".toMediaType()))
        .build()
        .create(RefreshApi::class.java)

    @Provides
    @Singleton
    fun provideAuthApi(retrofit: Retrofit): AuthApi = retrofit.create(AuthApi::class.java)

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

    @Provides
    @Singleton
    fun provideProgressionApi(retrofit: Retrofit): ProgressionApi =
        retrofit.create(ProgressionApi::class.java)
}
