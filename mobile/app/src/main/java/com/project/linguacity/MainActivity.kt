package com.project.linguacity

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.project.linguacity.data.local.preferences.AppSettings
import com.project.linguacity.data.local.preferences.SettingsStore
import com.project.linguacity.presentation.navigation.AppNavHost
import com.project.linguacity.ui.motion.LocalReduceMotion
import com.project.linguacity.ui.theme.LinguaCityTheme
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    @Inject
    lateinit var settingsStore: SettingsStore

    override fun onCreate(savedInstanceState: Bundle?) {
        // SCR-14: splash hệ thống phải cài TRƯỚC super.onCreate (core-splashscreen).
        installSplashScreen()
        super.onCreate(savedInstanceState)

        enableEdgeToEdge()

        setContent {
            val settings by settingsStore.settings.collectAsState(initial = AppSettings())
            // FR-UI-05: xoay màn hình theo cài đặt, có hiệu lực ngay khi đổi.
            LaunchedEffect(settings.orientation) {
                requestedOrientation = settings.orientation.activityValue
            }
            CompositionLocalProvider(LocalReduceMotion provides settings.reduceMotion) {
                LinguaCityTheme {
                    AppNavHost()
                }
            }
        }
    }
}
