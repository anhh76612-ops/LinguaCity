package com.project.linguacity.data.local.preferences

import android.content.Context
import android.content.SharedPreferences
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import com.project.linguacity.data.remote.auth.TokenResponseDto
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject
import javax.inject.Singleton

/** Phiên đăng nhập đang lưu trên máy. */
data class AuthSession(
    val accessToken: String,
    val refreshToken: String,
    val userId: String,
    /** GUEST hoặc ACCOUNT */
    val type: String,
    val emailVerified: Boolean
) {
    val isGuest: Boolean get() = type == "GUEST"
}

/**
 * Lưu token trong EncryptedSharedPreferences (khoá AES nằm trong Android Keystore, ADR-016).
 * "Luôn nhớ đăng nhập": token còn đó cho tới khi đăng xuất hoặc refresh token hết hạn (30 ngày
 * không mở app). File này bị loại khỏi sao lưu (backup_rules.xml) vì khoá Keystore không đi theo.
 */
@Singleton
class TokenStore @Inject constructor(@ApplicationContext context: Context) {

    private val prefs: SharedPreferences = open(context)

    @Volatile
    private var cached: AuthSession? = read()

    fun session(): AuthSession? = cached

    @Synchronized
    fun save(token: TokenResponseDto) {
        prefs.edit()
            .putString(KEY_ACCESS, token.accessToken)
            .putString(KEY_REFRESH, token.refreshToken)
            .putString(KEY_USER, token.userId)
            .putString(KEY_TYPE, token.type)
            .putBoolean(KEY_VERIFIED, token.emailVerified)
            .apply()
        cached = AuthSession(
            token.accessToken,
            token.refreshToken,
            token.userId,
            token.type,
            token.emailVerified
        )
    }

    @Synchronized
    fun markEmailVerified() {
        val current = cached ?: return
        prefs.edit().putBoolean(KEY_VERIFIED, true).apply()
        cached = current.copy(emailVerified = true)
    }

    @Synchronized
    fun clear() {
        prefs.edit().clear().apply()
        cached = null
    }

    private fun read(): AuthSession? {
        val access = prefs.getString(KEY_ACCESS, null) ?: return null
        val refresh = prefs.getString(KEY_REFRESH, null) ?: return null
        val user = prefs.getString(KEY_USER, null) ?: return null
        val type = prefs.getString(KEY_TYPE, null) ?: return null
        return AuthSession(access, refresh, user, type, prefs.getBoolean(KEY_VERIFIED, false))
    }

    private companion object {
        const val FILE = "linguacity_auth"
        const val KEY_ACCESS = "access_token"
        const val KEY_REFRESH = "refresh_token"
        const val KEY_USER = "user_id"
        const val KEY_TYPE = "type"
        const val KEY_VERIFIED = "email_verified"

        fun open(context: Context): SharedPreferences = try {
            create(context)
        } catch (broken: Exception) {
            // Khoá Keystore mất (khôi phục máy, cài lại): xoá file hỏng, người chơi đăng nhập lại
            context.deleteSharedPreferences(FILE)
            create(context)
        }

        fun create(context: Context): SharedPreferences {
            val key = MasterKey.Builder(context)
                .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
                .build()
            return EncryptedSharedPreferences.create(
                context,
                FILE,
                key,
                EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
                EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
            )
        }
    }
}
