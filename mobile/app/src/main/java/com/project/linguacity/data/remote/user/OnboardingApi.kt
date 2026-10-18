package com.project.linguacity.data.remote.user

import retrofit2.http.Header
import retrofit2.http.POST

interface OnboardingApi {

    @POST("api/v1/users/onboard")
    suspend fun onboardUser(
        @Header("X-Guest-UUID") guestUuid: String
    ): OnboardUserResponseDto
}