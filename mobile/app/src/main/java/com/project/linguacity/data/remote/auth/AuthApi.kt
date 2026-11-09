package com.project.linguacity.data.remote.auth

import retrofit2.Call
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.HTTP
import retrofit2.http.POST
import retrofit2.http.Path

/** {@code /api/v1/auth} (ADR-016). Token hiện tại được AuthInterceptor gắn tự động. */
interface AuthApi {

    @POST("api/v1/auth/guest")
    suspend fun guest(@Body body: DeviceDto): TokenResponseDto

    @POST("api/v1/auth/guest/claim")
    suspend fun claim(@Body body: ClaimDto): TokenResponseDto

    @POST("api/v1/auth/register")
    suspend fun register(@Body body: RegisterDto): TokenResponseDto

    @POST("api/v1/auth/login")
    suspend fun login(@Body body: LoginDto): TokenResponseDto

    @POST("api/v1/auth/google")
    suspend fun google(@Body body: SocialDto): TokenResponseDto

    @POST("api/v1/auth/facebook")
    suspend fun facebook(@Body body: SocialDto): TokenResponseDto

    @POST("api/v1/auth/refresh")
    suspend fun refresh(@Body body: RefreshDto): TokenResponseDto

    @POST("api/v1/auth/logout")
    suspend fun logout(@Body body: LogoutDto): Response<Unit>

    @GET("api/v1/auth/me")
    suspend fun me(): MeDto

    @POST("api/v1/auth/email/verify/send")
    suspend fun sendVerifyEmail(): Response<Unit>

    @POST("api/v1/auth/email/verify")
    suspend fun verifyEmail(@Body body: CodeDto): MeDto

    @POST("api/v1/auth/password/forgot")
    suspend fun forgotPassword(@Body body: EmailDto): Response<Unit>

    @POST("api/v1/auth/password/reset")
    suspend fun resetPassword(@Body body: ResetDto): Response<Unit>

    @POST("api/v1/auth/identities/{provider}")
    suspend fun link(@Path("provider") provider: String, @Body body: LinkDto): MeDto

    @HTTP(method = "DELETE", path = "api/v1/auth/account", hasBody = true)
    suspend fun deleteAccount(@Body body: DeleteAccountDto): Response<Unit>
}

/**
 * Refresh đồng bộ cho TokenAuthenticator. Dùng OkHttpClient riêng không có authenticator để không
 * lặp vô hạn.
 */
interface RefreshApi {

    @POST("api/v1/auth/refresh")
    fun refresh(@Body body: RefreshDto): Call<TokenResponseDto>
}
