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
import androidx.compose.runtime.LaunchedEffect
import androidx.hilt.navigation.compose.hiltViewModel
import com.project.linguacity.data.remote.auth.SessionEvent
import com.project.linguacity.domain.repository.AuthResult
import com.project.linguacity.presentation.auth.AccountScreen
import com.project.linguacity.presentation.auth.ForgotPasswordScreen
import com.project.linguacity.presentation.auth.LoginScreen
import com.project.linguacity.presentation.auth.RegisterScreen
import com.project.linguacity.presentation.auth.SaveProgressScreen
import com.project.linguacity.presentation.auth.SessionViewModel
import com.project.linguacity.presentation.auth.VerifyEmailScreen
import com.project.linguacity.presentation.auth.WelcomeScreen
import com.project.linguacity.presentation.profile.ProfileScreen
import com.project.linguacity.presentation.designsystem.DesignGalleryScreen
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
import com.project.linguacity.presentation.exam.ExamScreen
import com.project.linguacity.presentation.lesson.LessonScreen
import com.project.linguacity.presentation.onboarding.OnboardingScreen
import com.project.linguacity.presentation.practice.PracticeScreen
import com.project.linguacity.presentation.quest.QuestsScreen
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

/**
 * SCR-08/09 Bài học. `placement = true` là bài kiểm tra trình độ (ADR-014, M6); `practiceMode`
 * khác rỗng là luyện tập (SCR-24); `eventId > 0` là sự kiện thành phố (SCR-25). LessonViewModel
 * đọc tham số theo tên.
 */
@Serializable
data class LessonRoute(
    val buildingCode: String = "HOUSING",
    val placement: Boolean = false,
    val practiceMode: String = "",
    val themes: String = "",
    val wordCount: Int = 20,
    val eventId: Long = 0L
)

/** SCR-10/11/12 Thi lên level. ExamViewModel đọc `buildingCode` theo tên. */
@Serializable
data class ExamRoute(val buildingCode: String)

/** SCR-23 Nhiệm vụ & Chuỗi. */
@Serializable
object QuestsRoute

/** SCR-24 Luyện tập. */
@Serializable
object PracticeRoute

/** SCR-18 Bộ sưu tập danh hiệu. */
@Serializable
object AchievementsRoute

/** SCR-19 Hồ sơ. */
@Serializable
object ProfileRoute

/** SCR-21 Cài đặt. */
@Serializable
object SettingsRoute

/** Màn "Bộ giao diện" (S1, chỉ bản debug): xem token và component trên máy thật. */
@Serializable
object DesignGalleryRoute

/** SCR-20 Tuỳ biến nhân vật / nhà (M8). CustomizeViewModel đọc `houseTab` theo tên. */
@Serializable
data class CustomizeRoute(val houseTab: Boolean = false)

/** SCR-07. */
@Serializable
data class FlashcardRoute(val buildingCode: String, val level: Int, val startIndex: Int)

// ---------- VS6: đăng nhập / đăng ký (ADR-016) ----------

/** SCR-20 Màn chào: đăng nhập, đăng ký, Google, Facebook, chơi ngay (khách). */
@Serializable
object WelcomeRoute

/** SCR-22 */
@Serializable
object LoginRoute

/** SCR-21 */
@Serializable
object RegisterRoute

/** SCR-24. `reload`: xác minh xong phải tải lại hồ sơ (tài khoản mới, chưa có thành phố). */
@Serializable
data class VerifyEmailRoute(val reload: Boolean)

/** SCR-25 */
@Serializable
object ForgotPasswordRoute

/** SCR-23 Lưu tiến trình: khách xong tutorial bắt buộc gắn tài khoản. */
@Serializable
object SaveProgressRoute

/** SCR-26 */
@Serializable
object AccountRoute

/** Các màn xác thực: không mở chồng màn "Lưu tiến trình" lên chúng. */
private val AUTH_ROUTES = listOf(
    "WelcomeRoute",
    "LoginRoute",
    "RegisterRoute",
    "VerifyEmailRoute",
    "ForgotPasswordRoute",
    "SaveProgressRoute",
    "OnboardingRoute"
)

@OptIn(ExperimentalSharedTransitionApi::class)
@Composable
fun AppNavHost(
    navController: NavHostController = rememberNavController(),
    session: SessionViewModel = hiltViewModel()
) {
    // Vào lại từ đầu (tải hồ sơ + nội dung) và xoá cả back stack.
    val restart = {
        navController.navigate(OnboardingRoute) {
            popUpTo(navController.graph.id) { inclusive = true }
        }
    }
    // Xong đăng nhập/đăng ký: đổi người hoặc chưa có thành phố → tải lại; chỉ gắn tài khoản cho
    // khách đang chơi → quay lại thành phố.
    val finishAuth = { result: AuthResult ->
        if (result.switchedUser || !navController.popBackStack(HomeRoute, inclusive = false)) {
            restart()
        }
    }
    val toWelcome = {
        navController.navigate(WelcomeRoute) {
            popUpTo(navController.graph.id) { inclusive = true }
        }
    }
    LaunchedEffect(Unit) {
        session.events.collect { event ->
            val route = navController.currentDestination?.route.orEmpty()
            when (event) {
                SessionEvent.Expired -> toWelcome()
                SessionEvent.AccountRequired ->
                    if (AUTH_ROUTES.none { route.contains(it) }) {
                        navController.navigate(SaveProgressRoute) { launchSingleTop = true }
                    }
            }
        }
    }

    // FR-UI-04: chuyển cảnh giữa các màn (mờ + trượt nhẹ); tắt khi người chơi chọn giảm hiệu ứng.
    val duration = if (LocalReduceMotion.current) 0 else 260
    SharedTransitionLayout {
        CompositionLocalProvider(LocalSharedScope provides this) {
            NavHost(
                navController = navController,
                startDestination = OnboardingRoute,
                enterTransition = {
                    fadeIn(tween(duration)) + slideInHorizontally(tween(duration)) { it / 10 }
                },
                exitTransition = { fadeOut(tween(duration)) },
                popEnterTransition = { fadeIn(tween(duration)) },
                popExitTransition = {
                    fadeOut(tween(duration)) + slideOutHorizontally(tween(duration)) { it / 10 }
                }
            ) {
                composable<OnboardingRoute> {
                    OnboardingScreen(
                        onOnboardingSuccess = { tutorialCompleted ->
                            // Xóa Onboarding khỏi back stack: bấm Back không quay lại màn loading.
                            navController.navigate(SyncRoute(tutorialCompleted)) {
                                popUpTo(OnboardingRoute) { inclusive = true }
                            }
                        },
                        onNeedsAuth = toWelcome
                    )
                }

                composable<WelcomeRoute> {
                    WelcomeScreen(
                        onSignedIn = { restart() },
                        onLogin = { navController.navigate(LoginRoute) },
                        onRegister = { navController.navigate(RegisterRoute) }
                    )
                }

                composable<SaveProgressRoute> {
                    SaveProgressScreen(
                        onSignedIn = finishAuth,
                        onLogin = { navController.navigate(LoginRoute) },
                        onRegister = { navController.navigate(RegisterRoute) }
                    )
                }

                composable<LoginRoute> {
                    LoginScreen(
                        onBack = { navController.popBackStack() },
                        onSignedIn = finishAuth,
                        onForgot = { navController.navigate(ForgotPasswordRoute) }
                    )
                }

                composable<RegisterRoute> {
                    RegisterScreen(
                        onBack = { navController.popBackStack() },
                        onRegistered = { result ->
                            navController.navigate(VerifyEmailRoute(result.switchedUser)) {
                                popUpTo<RegisterRoute> { inclusive = true }
                            }
                        }
                    )
                }

                composable<VerifyEmailRoute> { entry ->
                    val reload = entry.toRoute<VerifyEmailRoute>().reload
                    VerifyEmailScreen(
                        onDone = {
                            if (reload) {
                                restart()
                            } else if (
                                !navController.popBackStack(SaveProgressRoute, inclusive = true)
                            ) {
                                navController.popBackStack()
                            }
                        }
                    )
                }

                composable<ForgotPasswordRoute> {
                    ForgotPasswordScreen(
                        onBack = { navController.popBackStack() },
                        onDone = { navController.popBackStack() }
                    )
                }

                composable<AccountRoute> {
                    AccountScreen(
                        onBack = { navController.popBackStack() },
                        onVerifyEmail = { navController.navigate(VerifyEmailRoute(false)) },
                        onSignedOut = toWelcome
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

                // Màn chính sau onboarding là City View (SCR-04); tutorial thư ký chạy ngay trên
                // đó.
                composable<HomeRoute> {
                    CityScreen(
                        onOpenVocabulary = {
                            code,
                            level -> navController.navigate(VocabularyRoute(code.name, level))
                        },
                        onStartLesson = { code -> navController.navigate(LessonRoute(code.name)) },
                        onOpenAchievements = { navController.navigate(AchievementsRoute) },
                        onStartPlacement = { navController.navigate(LessonRoute(
                            "HOUSING",
                            placement = true
                        )) },
                        onOpenProfile = { navController.navigate(ProfileRoute) },
                        onOpenSettings = { navController.navigate(SettingsRoute) },
                        onOpenCustomize = { house ->
                            navController.navigate(CustomizeRoute(house))
                        },
                        onOpenExam = { code -> navController.navigate(ExamRoute(code.name)) },
                        onOpenQuests = { navController.navigate(QuestsRoute) },
                        onOpenPractice = { navController.navigate(PracticeRoute) },
                        onStartEvent = { id -> navController.navigate(LessonRoute(eventId = id)) }
                    )
                }

                composable<LessonRoute> {
                    LessonScreen(onExit = { navController.popBackStack() })
                }

                composable<ExamRoute> { entry ->
                    val code = entry.toRoute<ExamRoute>().buildingCode
                    ExamScreen(
                        onBack = { navController.popBackStack() },
                        onLearn = {
                            navController.navigate(LessonRoute(code)) {
                                popUpTo<ExamRoute> { inclusive = true }
                            }
                        },
                        onUpgraded = { navController.popBackStack(HomeRoute, inclusive = false) }
                    )
                }

                composable<QuestsRoute> {
                    QuestsScreen(onBack = { navController.popBackStack() })
                }

                composable<PracticeRoute> {
                    PracticeScreen(
                        onBack = { navController.popBackStack() },
                        onStart = { mode, themes, count ->
                            navController.navigate(
                                LessonRoute(practiceMode = mode, themes = themes, wordCount = count)
                            )
                        }
                    )
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
                        onReplayTour = {
                            navController.popBackStack(HomeRoute, inclusive = false)
                        },
                        onOpenAccount = { navController.navigate(AccountRoute) },
                        onOpenDesignGallery = { navController.navigate(DesignGalleryRoute) }
                    )
                }

                composable<DesignGalleryRoute> {
                    DesignGalleryScreen(onBack = { navController.popBackStack() })
                }

                composable<VocabularyRoute> { entry ->
                    val route = entry.toRoute<VocabularyRoute>()
                    CompositionLocalProvider(LocalNavAnimScope provides this) {
                        VocabularyListScreen(
                            onBack = { navController.popBackStack() },
                            onOpenCard = { index -> navController.navigate(FlashcardRoute(
                                route.buildingCode,
                                route.level,
                                index
                            )) }
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
