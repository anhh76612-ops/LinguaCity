package com.project.linguacity

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.project.linguacity.presentation.onboarding.OnboardingScreen
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        enableEdgeToEdge()

        setContent {
            OnboardingScreen(
                onOnboardingSuccess = {
                    // Tạm thời chưa làm gì.
                    // Sau này sẽ chuyển sang CityScreen.
                }
            )
        }
    }
}