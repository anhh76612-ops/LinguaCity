package com.project.linguacity.data.local.preferences

import android.content.Context
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.first
import javax.inject.Inject
import javax.inject.Singleton
import java.util.UUID

private val Context.dataStore by preferencesDataStore(
    name = "linguacity_preferences"
)

/**
 * Id hồ sơ của người chơi hiện tại, dùng làm khoá dữ liệu Room và header cũ. Từ VS6 (ADR-016) id
 * lấy từ phiên đăng nhập trong {@link TokenStore}; Guest UUID tự sinh chỉ còn với app bản cũ và
 * được đổi lấy token một lần (claim) khi mở bản mới.
 */
@Singleton
class GuestIdStore @Inject constructor(
    @ApplicationContext private val context: Context,
    private val tokenStore: TokenStore
) {

    private val guestUuidKey: Preferences.Key<String> =
        stringPreferencesKey("guest_uuid")

    /** Guest UUID của app bản cũ chưa đổi lấy token, nếu có. */
    suspend fun legacyGuestUuid(): String? = context.dataStore.data.first()[guestUuidKey]

    suspend fun clearLegacy() {
        context.dataStore.edit { data -> data.remove(guestUuidKey) }
    }

    suspend fun getOrCreateGuestUuid(): String {
        tokenStore.session()?.let { return it.userId }
        val preferences = context.dataStore.data.first()

        val existingUuid = preferences[guestUuidKey]

        if (existingUuid != null) {
            return existingUuid
        }

        val newUuid = UUID.randomUUID().toString()

        context.dataStore.edit { data ->
            data[guestUuidKey] = newUuid
        }

        return newUuid
    }
}
