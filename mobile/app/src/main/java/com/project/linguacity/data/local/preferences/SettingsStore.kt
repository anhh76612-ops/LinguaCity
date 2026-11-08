package com.project.linguacity.data.local.preferences

import android.content.Context
import android.content.pm.ActivityInfo
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton

private val Context.settingsStore by preferencesDataStore(name = "linguacity_settings")

/** Xoay màn hình (FR-UI-05). */
enum class OrientationSetting(val label: String) {
    AUTO("Tự động"),
    PORTRAIT("Dọc"),
    LANDSCAPE("Ngang");

    /** Giá trị cho Activity.requestedOrientation. */
    val activityValue: Int
        get() = when (this) {
            AUTO -> ActivityInfo.SCREEN_ORIENTATION_FULL_USER
            PORTRAIT -> ActivityInfo.SCREEN_ORIENTATION_USER_PORTRAIT
            LANDSCAPE -> ActivityInfo.SCREEN_ORIENTATION_USER_LANDSCAPE
        }
}

data class AppSettings(
    val orientation: OrientationSetting = OrientationSetting.AUTO,
    val reduceMotion: Boolean = false,
    /**
     * Người chơi bấm "Xem lại hướng dẫn": City hiện lại tour (chỉ phía app, không đổi bước server).
     */
    val replayTour: Boolean = false
)

/**
 * Cài đặt cục bộ của thiết bị (DataStore riêng "linguacity_settings"). Không phải Player State nên
 * không
 * gửi lên server (khác ngoại hình/kiểu nhà ở M8).
 */
@Singleton
class SettingsStore @Inject constructor(@ApplicationContext private val context: Context) {

    private val orientationKey = stringPreferencesKey("orientation")
    private val reduceMotionKey = booleanPreferencesKey("reduce_motion")
    private val replayTourKey = booleanPreferencesKey("replay_tour")

    val settings: Flow<AppSettings> = context.settingsStore.data.map { p ->
        AppSettings(
            orientation = p[orientationKey]?.let {
                runCatching { OrientationSetting.valueOf(it) }.getOrNull()
            }
                ?: OrientationSetting.AUTO,
            reduceMotion = p[reduceMotionKey] ?: false,
            replayTour = p[replayTourKey] ?: false
        )
    }

    suspend fun setOrientation(value: OrientationSetting) = context.settingsStore.edit {
        it[orientationKey] = value.name
    }

    suspend fun setReduceMotion(value: Boolean) = context.settingsStore.edit {
        it[reduceMotionKey] = value
    }

    suspend fun setReplayTour(value: Boolean) = context.settingsStore.edit {
        it[replayTourKey] = value
    }
}
