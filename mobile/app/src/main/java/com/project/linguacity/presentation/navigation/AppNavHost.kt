package com.project.linguacity.presentation.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.project.linguacity.presentation.city.CityScreen
import com.project.linguacity.presentation.onboarding.OnboardingScreen
import com.project.linguacity.presentation.tutorial.TutorialScreen
import kotlinx.serialization.Serializable

// Navigation Type-Safe: mỗi điểm đến là một object @Serializable, không dùng String route.
@Serializable
object OnboardingRoute

@Serializable
object TutorialRoute

@Serializable
object HomeRoute

@Composable
fun AppNavHost(
    navController: NavHostController = rememberNavController()
) {
    NavHost(
        navController = navController,
        startDestination = OnboardingRoute
    ) {
        composable<OnboardingRoute> {
            OnboardingScreen(
                onOnboardingSuccess = { tutorialCompleted ->
                    // Xóa Onboarding khỏi back stack: bấm Back không quay lại màn loading.
                    if (tutorialCompleted) {
                        navController.navigate(HomeRoute) {
                            popUpTo(OnboardingRoute) { inclusive = true }
                        }
                    } else {
                        navController.navigate(TutorialRoute) {
                            popUpTo(OnboardingRoute) { inclusive = true }
                        }
                    }
                }
            )
        }

        composable<TutorialRoute> {
            TutorialScreen(
                onTutorialCompleted = {
                    navController.navigate(HomeRoute) {
                        popUpTo(TutorialRoute) { inclusive = true }
                    }
                }
            )
        }

        // Màn chính sau onboarding/tutorial là City View (SCR-04).
        composable<HomeRoute> {
            CityScreen()
        }
    }
}
