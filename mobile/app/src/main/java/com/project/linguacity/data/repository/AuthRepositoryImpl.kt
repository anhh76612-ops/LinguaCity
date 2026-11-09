package com.project.linguacity.data.repository

import com.project.linguacity.data.local.UserDataCleaner
import com.project.linguacity.data.local.preferences.AuthSession
import com.project.linguacity.data.local.preferences.GuestIdStore
import com.project.linguacity.data.local.preferences.TokenStore
import com.project.linguacity.data.remote.auth.AuthApi
import com.project.linguacity.data.remote.auth.ClaimDto
import com.project.linguacity.data.remote.auth.CodeDto
import com.project.linguacity.data.remote.auth.DeleteAccountDto
import com.project.linguacity.data.remote.auth.DeviceDto
import com.project.linguacity.data.remote.auth.EmailDto
import com.project.linguacity.data.remote.auth.LinkDto
import com.project.linguacity.data.remote.auth.LoginDto
import com.project.linguacity.data.remote.auth.LogoutDto
import com.project.linguacity.data.remote.auth.MeDto
import com.project.linguacity.data.remote.auth.RefreshDto
import com.project.linguacity.data.remote.auth.RegisterDto
import com.project.linguacity.data.remote.auth.ResetDto
import com.project.linguacity.data.remote.auth.SocialDto
import com.project.linguacity.data.remote.auth.TokenAuthenticator
import com.project.linguacity.data.remote.auth.TokenResponseDto
import com.project.linguacity.domain.repository.AuthRepository
import com.project.linguacity.domain.repository.AuthResult
import retrofit2.HttpException
import java.io.IOException
import javax.inject.Inject

class AuthRepositoryImpl @Inject constructor(
    private val api: AuthApi,
    private val store: TokenStore,
    private val guestIdStore: GuestIdStore,
    private val cleaner: UserDataCleaner
) : AuthRepository {

    private val device: String get() = TokenAuthenticator.deviceName()

    override fun session(): AuthSession? = store.session()

    override suspend fun ensureSession(): Boolean {
        val session = store.session()
        if (session != null) {
            return try {
                store.save(api.refresh(RefreshDto(session.refreshToken, device)))
                true
            } catch (offline: IOException) {
                // Mất mạng: giữ phiên, vào game đọc offline
                true
            } catch (http: HttpException) {
                if (http.code() == 401) {
                    store.clear()
                    cleaner.clear()
                    false
                } else {
                    true
                }
            }
        }
        val legacy = guestIdStore.legacyGuestUuid() ?: return false
        return try {
            store.save(api.claim(ClaimDto(legacy, device)))
            guestIdStore.clearLegacy()
            true
        } catch (http: HttpException) {
            // Đã claim (cài lại app) hoặc không còn trên server: phải đăng nhập
            guestIdStore.clearLegacy()
            false
        }
    }

    override suspend fun playAsGuest() {
        val before = store.session()?.userId
        store.save(api.guest(DeviceDto(device)))
        if (before != null) {
            cleaner.clear()
        }
    }

    override suspend fun register(
        email: String,
        password: String,
        displayName: String?
    ): AuthResult = signIn {
        api.register(RegisterDto(email.trim(), password, displayName?.trim(), device))
    }

    override suspend fun login(email: String, password: String): AuthResult = signIn {
        api.login(LoginDto(email.trim(), password, device))
    }

    override suspend fun social(
        provider: String,
        token: String,
        confirmDiscardGuest: Boolean
    ): AuthResult = signIn {
        val body = SocialDto(token, device, confirmDiscardGuest)
        if (provider == "GOOGLE") api.google(body) else api.facebook(body)
    }

    override suspend fun me(): MeDto = api.me()

    override suspend fun sendVerifyEmail() {
        api.sendVerifyEmail().throwIfFailed()
    }

    override suspend fun verifyEmail(code: String): MeDto {
        val me = api.verifyEmail(CodeDto(code.trim()))
        if (me.emailVerified) {
            store.markEmailVerified()
        }
        return me
    }

    override suspend fun forgotPassword(email: String) {
        api.forgotPassword(EmailDto(email.trim())).throwIfFailed()
    }

    override suspend fun resetPassword(email: String, code: String, newPassword: String) {
        api.resetPassword(ResetDto(email.trim(), code.trim(), newPassword)).throwIfFailed()
    }

    override suspend fun linkSocial(provider: String, token: String): MeDto =
        api.link(provider, LinkDto(token = token))

    override suspend fun linkPassword(email: String?, password: String): MeDto =
        api.link("PASSWORD", LinkDto(email = email?.trim(), password = password))

    override suspend fun logout() {
        val refresh = store.session()?.refreshToken
        if (refresh != null) {
            runCatching { api.logout(LogoutDto(refresh)) }
        }
        store.clear()
        guestIdStore.clearLegacy()
        cleaner.clear()
    }

    override suspend fun deleteAccount(
        password: String?,
        provider: String?,
        providerToken: String?
    ) {
        api.deleteAccount(DeleteAccountDto(password, provider, providerToken)).throwIfFailed()
        store.clear()
        guestIdStore.clearLegacy()
        cleaner.clear()
    }

    /** Gọi API đăng nhập, lưu token, xoá dữ liệu người cũ nếu đổi sang hồ sơ khác. */
    private suspend fun signIn(call: suspend () -> TokenResponseDto): AuthResult {
        val before = store.session()?.userId
        val token = call()
        store.save(token)
        val switched = before != null && before != token.userId
        if (switched) {
            cleaner.clear()
        }
        return AuthResult(switched || before == null, token.type, token.emailVerified)
    }

    private fun retrofit2.Response<Unit>.throwIfFailed() {
        if (!isSuccessful) {
            throw HttpException(this)
        }
    }
}
