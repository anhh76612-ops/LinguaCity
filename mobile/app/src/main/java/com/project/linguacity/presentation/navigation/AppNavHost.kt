package com.project.linguacity.presentation.navigation

import androidx.compose.animation.ExperimentalSharedTransitionApi
import androidx.compose.animation.SharedTransitionLayout
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInHorizontally
import androidx.compose.animation.slideOutHorizontally
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import com.project.linguacity.presentation.profile.ProfileScreen
import com.project.linguacity.presentation.settings.SettingsScreen
import com.project.linguacity.ui.motion.LocalNavAnimScope
import com.project.linguacity.ui.motion.LocalReduceMotion
import com.project.linguacity.ui.motion.LocalSharedScope
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
import com.project.linguacity.presentation.vocabulary.FlashcardScreen
import com.project.linguacity.presentation.vocabulary.VocabularyListScreen
import kotlinx.serialization.Serializable

// Navigation Type-Safe: mỗi điểm đến là một object/class @Serializable, không dùng String route.
@Serializable
object OnboardingRoute

/** SCR-03: tải nội dung (UC_03), rồi vào City. Tutorial thư ký chạy ngay trên City (ADR-014). */
@Serializable
data class SyncRoute(val tutorialCompleted: Boolean)

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

/** SCR-19 Hồ sơ. */
@Serializable
object ProfileRoute

/** SCR-21 Cài đặt. */
@Serializable
object SettingsRoute

/** SCR-20 Tuỳ biến nhân vật / nhà (M8). CustomizeViewModel đọc `houseTab` theo tên. */
@Serializable
data class CustomizeRoute(val houseTab: Boolean = false)

/** SCR-07. */
@Serializable
data class FlashcardRoute(val buildingCode: String, val level: Int, val startIndex: Int)

@OptIn(ExperimentalSharedTransitionApi::class)
@Composable
fun AppNavHost(
    navController: NavHostController = rememberNavController()
) {
    // FR-UI-04: chuyển cảnh giữa các màn (mờ + trượt nhẹ); tắt khi người chơi chọn giảm hiệu ứng.
    val duration = if (LocalReduceMotion.current) 0 else 260
    SharedTransitionLayout {
        CompositionLocalProvider(LocalSharedScope provides this) {
            NavHost(
                navController = navController,
                startDestination = OnboardingRoute,
                enterTransition = { fadeIn(tween(duration)) + slideInHorizontally(tween(duration)) { it / 10 } },
                exitTransition = { fadeOut(tween(duration)) },
                popEnterTransition = { fadeIn(tween(duration)) },
                popExitTransition = { fadeOut(tween(duration)) + slideOutHorizontally(tween(duration)) { it / 10 } }
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

                composable<SyncRoute> {
                    SyncScreen(
                        onFinished = {
                            navController.navigate(HomeRoute) {
                                popUpTo<SyncRoute> { inclusive = true }
                            }
                        }
                    )
                }

                // Màn chính sau onboarding là City View (SCR-04); tutorial thư ký chạy ngay trên đó.
                composable<HomeRoute> {
                    CityScreen(
                        onOpenVocabulary = { code, level -> navController.navigate(VocabularyRoute(code.name, level)) },
                        onStartLesson = { code -> navController.navigate(LessonRoute(code.name)) },
                        onOpenAchievements = { navController.navigate(AchievementsRoute) },
                        onStartPlacement = { navController.navigate(LessonRoute("HOUSING", placement = true)) },
                        onOpenProfile = { navController.navigate(ProfileRoute) },
                        onOpenSettings = { navController.navigate(SettingsRoute) },
                        onOpenCustomize = { house -> navController.navigate(CustomizeRoute(house)) }
                    )
                }

                composable<LessonRoute> {
                    LessonScreen(onExit = { navController.popBackStack() })
                }

                composable<AchievementsRoute> {
                    AchievementsScreen(onBack = { navController.popBackStack() })
                }

                composable<CustomizeRoute> {
                    CustomizeScreen(onBack = { navController.popBackStack() })
                }

                composable<ProfileRoute> {
                    ProfileScreen(
                        onBack = { navController.popBackStack() },
                        onOpenAchievements = { navController.navigate(AchievementsRoute) }
                    )
                }

                composable<SettingsRoute> {
                    SettingsScreen(
                        onBack = { navController.popBackStack() },
                        onReplayTour = { navController.popBackStack(HomeRoute, inclusive = false) }
                    )
                }

                composable<VocabularyRoute> { entry ->
                    val route = entry.toRoute<VocabularyRoute>()
                    CompositionLocalProvider(LocalNavAnimScope provides this) {
                        VocabularyListScreen(
                            onBack = { navController.popBackStack() },
                            onOpenCard = { index -> navController.navigate(FlashcardRoute(route.buildingCode, route.level, index)) }
                        )
                    }
                }

                composable<FlashcardRoute> { entry ->
                    CompositionLocalProvider(LocalNavAnimScope provides this) {
                        FlashcardScreen(
                            startIndex = entry.toRoute<FlashcardRoute>().startIndex,
                            onBack = { navController.popBackStack() }
                        )
                    }
                }
            }
        }
    }
}
