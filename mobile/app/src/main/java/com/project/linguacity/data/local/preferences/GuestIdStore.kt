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

@Singleton
class GuestIdStore @Inject constructor(
    @ApplicationContext private val context: Context
) {

    private val guestUuidKey: Preferences.Key<String> =
        stringPreferencesKey("guest_uuid")

    suspend fun getOrCreateGuestUuid(): String {
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
