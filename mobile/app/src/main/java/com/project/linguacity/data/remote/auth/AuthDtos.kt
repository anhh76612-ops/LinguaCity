package com.project.linguacity.data.remote.auth

import kotlinx.serialization.Serializable

/** Cặp token server trả sau đăng nhập / đăng ký / refresh (ADR-016). */
@Serializable
data class TokenResponseDto(
    val accessToken: String,
    val refreshToken: String,
    val expiresIn: Long = 900,
    val userId: String,
    /** GUEST hoặc ACCOUNT */
    val type: String,
    val emailVerified: Boolean = false
)

@Serializable
data class DeviceDto(val deviceName: String? = null)

@Serializable
data class ClaimDto(val guestUuid: String, val deviceName: String? = null)

@Serializable
data class RegisterDto(
    val email: String,
    val password: String,
    val displayName: String? = null,
    val deviceName: String? = null
)

@Serializable
data class LoginDto(val email: String, val password: String, val deviceName: String? = null)

@Serializable
data class SocialDto(
    val token: String,
    val deviceName: String? = null,
    val confirmDiscardGuest: Boolean = false
)

@Serializable
data class RefreshDto(val refreshToken: String, val deviceName: String? = null)

@Serializable
data class LogoutDto(val refreshToken: String)

@Serializable
data class CodeDto(val code: String)

@Serializable
data class EmailDto(val email: String)

@Serializable
data class ResetDto(val email: String, val code: String, val newPassword: String)

@Serializable
data class LinkDto(
    val token: String? = null,
    val email: String? = null,
    val password: String? = null
)

@Serializable
data class DeleteAccountDto(
    val password: String? = null,
    val provider: String? = null,
    val providerToken: String? = null
)

@Serializable
data class MeDto(
    val userId: String,
    val type: String,
    val email: String? = null,
    val emailVerified: Boolean = false,
    val displayName: String? = null,
    val providers: List<String> = emptyList()
)
