package com.project.linguacity.presentation.onboarding

import com.project.linguacity.ui.components.*
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.project.linguacity.presentation.splash.BrandedSplash

@Composable
fun OnboardingScreen(
    viewModel: OnboardingViewModel = hiltViewModel(),
    onOnboardingSuccess: (tutorialCompleted: Boolean) -> Unit,
    onNeedsAuth: () -> Unit
) {
    val state by viewModel.state.collectAsState()

    /*
     * Khi màn hình được mở lần đầu,
     * tự động gửi Intent.Onboard đến ViewModel.
     */
    LaunchedEffect(Unit) {
        viewModel.onIntent(OnboardingIntent.Onboard)
    }

    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {

        when {
            // SCR-14: thay vòng xoay bằng Splash có thương hiệu (thành phố mọc lên + tên game)
            state.isLoading -> {
                BrandedSplash()
            }

            state.needsAuth -> {
                LaunchedEffect(Unit) { onNeedsAuth() }
            }

            state.userProfile != null -> {
                val tutorialCompleted = state.userProfile!!.tutorialCompleted

                LaunchedEffect(state.userProfile) {
                    onOnboardingSuccess(tutorialCompleted)
                }
            }

            state.error != null -> {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center,
                    modifier = Modifier.padding(24.dp)
                ) {
                    Text(
                        text = "Không thể khởi tạo người chơi."
                    )

                    Text(
                        text = state.error ?: "",
                        textAlign = TextAlign.Center
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    CozyButton(
                        onClick = { viewModel.onIntent(OnboardingIntent.Retry) }
                    ) {
                        Text(text = "Thử lại")
                    }
                }
            }
        }
    }
}
