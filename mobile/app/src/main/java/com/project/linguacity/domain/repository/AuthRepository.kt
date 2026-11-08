package com.project.linguacity.domain.repository

import com.project.linguacity.data.local.preferences.AuthSession
import com.project.linguacity.data.remote.auth.MeDto

/**
 * Kết quả đăng nhập. {@code switchedUser}: hồ sơ trên máy đã đổi (sang người khác, hoặc trước đó
 * chưa có phiên) nên phải tải lại từ đầu; {@code false} khi chỉ gắn tài khoản cho khách hiện tại.
 */
data class AuthResult(val switchedUser: Boolean, val type: String, val emailVerified: Boolean)

/** Đăng nhập, đăng ký, gắn tài khoản (ADR-016, UC_13–UC_19). */
interface AuthRepository {

    fun session(): AuthSession?

    /**
     * Gọi khi mở app. Có phiên → refresh ngầm để gia hạn 30 ngày ("luôn nhớ"); khách bản cũ chỉ
     * có Guest UUID → đổi lấy token. Trả {@code false} khi phải vào màn chào.
     */
    suspend fun ensureSession(): Boolean

    suspend fun playAsGuest()

    suspend fun register(email: String, password: String, displayName: String?): AuthResult

    suspend fun login(email: String, password: String): AuthResult

    /** {@code provider}: GOOGLE hoặc FACEBOOK. */
    suspend fun social(provider: String, token: String, confirmDiscardGuest: Boolean): AuthResult

    suspend fun me(): MeDto

    suspend fun sendVerifyEmail()

    suspend fun verifyEmail(code: String): MeDto

    suspend fun forgotPassword(email: String)

    suspend fun resetPassword(email: String, code: String, newPassword: String)

    suspend fun linkSocial(provider: String, token: String): MeDto

    suspend fun linkPassword(email: String?, password: String): MeDto

    suspend fun logout()

    suspend fun deleteAccount(password: String?, provider: String?, providerToken: String?)
}
