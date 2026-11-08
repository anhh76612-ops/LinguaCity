package com.project.linguacity.presentation.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.toRoute
import com.project.linguacity.presentation.achievements.AchievementsScreen
import com.project.linguacity.presentation.city.CityScreen
import com.project.linguacity.presentation.customize.CustomizeScreen
import com.project.linguacity.presentation.lesson.LessonScreen
import com.project.linguacity.presentation.onboarding.OnboardingScreen
import com.project.linguacity.presentation.sync.SyncScreen
import com.project.linguacity.presentation.tutorial.TutorialScreen
import com.project.linguacity.presentation.vocabulary.FlashcardScreen
import com.project.linguacity.presentation.vocabulary.VocabularyListScreen
import kotlinx.serialization.Serializable

// Navigation Type-Safe: mỗi điểm đến là một object/class @Serializable, không dùng String route.
@Serializable
object OnboardingRoute

/** SCR-03: tải nội dung (UC_03), rồi đi tiếp tới Tutorial hoặc City. */
@Serializable
data class SyncRoute(val tutorialCompleted: Boolean)

@Serializable
object TutorialRoute

@Serializable
object HomeRoute

/** SCR-06. Tên tham số buildingCode/level được VocabularyViewModel đọc từ SavedStateHandle. */
@Serializable
data class VocabularyRoute(val buildingCode: String, val level: Int)

/** SCR-08/09 Bài học. `placement = true` là bài kiểm tra trình độ (ADR-014, M6). LessonViewModel đọc tham số theo tên. */
@Serializable
data class LessonRoute(val buildingCode: String, val placement: Boolean = false)

/** SCR-18 Bộ sưu tập danh hiệu. */
@Serializable
object AchievementsRoute

/** SCR-20 Tuỳ biến nhân vật / nhà (M8). CustomizeViewModel đọc `houseTab` theo tên. */
@Serializable
data class CustomizeRoute(val houseTab: Boolean = false)

/** SCR-07. */
@Serializable
data class FlashcardRoute(val buildingCode: String, val level: Int, val startIndex: Int)

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
                    navController.navigate(SyncRoute(tutorialCompleted)) {
                        popUpTo(OnboardingRoute) { inclusive = true }
                    }
                }
            )
        }

        composable<SyncRoute> { entry ->
            val route = entry.toRoute<SyncRoute>()
            SyncScreen(
                onFinished = {
                    val next: Any = if (route.tutorialCompleted) HomeRoute else TutorialRoute
                    navController.navigate(next) {
                        popUpTo<SyncRoute> { inclusive = true }
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
            CityScreen(
                onOpenVocabulary = { code, level -> navController.navigate(VocabularyRoute(code.name, level)) },
                onStartLesson = { code -> navController.navigate(LessonRoute(code.name)) },
                onOpenAchievements = { navController.navigate(AchievementsRoute) },
                onOpenCustomize = { house -> navController.navigate(CustomizeRoute(house)) }
            )
        }

        composable<LessonRoute> {
            LessonScreen(onExit = { navController.popBackStack() })
        }

        composable<CustomizeRoute> {
            CustomizeScreen(onBack = { navController.popBackStack() })
        }

        composable<AchievementsRoute> {
            AchievementsScreen(onBack = { navController.popBackStack() })
        }

        composable<VocabularyRoute> { entry ->
            val route = entry.toRoute<VocabularyRoute>()
            VocabularyListScreen(
                onBack = { navController.popBackStack() },
                onOpenCard = { index -> navController.navigate(FlashcardRoute(route.buildingCode, route.level, index)) }
            )
        }

        composable<FlashcardRoute> { entry ->
            FlashcardScreen(
                startIndex = entry.toRoute<FlashcardRoute>().startIndex,
                onBack = { navController.popBackStack() }
            )
        }
    }
}
