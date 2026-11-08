package com.project.linguacity.presentation.city

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.presentation.city.home.BuildingSheet
import com.project.linguacity.presentation.city.home.DockAction
import com.project.linguacity.presentation.city.home.DockTray
import com.project.linguacity.presentation.city.home.EventLetter
import com.project.linguacity.presentation.city.home.HomeDock
import com.project.linguacity.presentation.city.home.HomeHud
import com.project.linguacity.presentation.city.home.InteriorPanel
import com.project.linguacity.presentation.city.home.QuestPanel
import com.project.linguacity.presentation.city.home.QuestTarget
import com.project.linguacity.presentation.city.web.WebCityRenderer
import com.project.linguacity.presentation.quest.QuestsViewModel
import com.project.linguacity.presentation.tutorial.LocalSpotlight
import com.project.linguacity.presentation.tutorial.SecretaryOverlay
import com.project.linguacity.presentation.tutorial.SpotKeys
import com.project.linguacity.presentation.tutorial.TutorialNav
import com.project.linguacity.presentation.tutorial.TutorialViewModel
import com.project.linguacity.presentation.tutorial.rememberSpotlightRegistry
import com.project.linguacity.presentation.tutorial.spotlightTarget
import com.project.linguacity.ui.icons.LinguaIcons
import com.project.linguacity.ui.loading.DestinationLoading
import com.project.linguacity.ui.loading.LoadingKind
import kotlinx.coroutines.launch

/**
 * SCR-04 City View (S2: Home "Cozy Toy Town"). Bản đồ chiếm toàn màn hình; UI Compose nằm đè lên:
 *
 *   ┌ HUD: avatar + sao cấp + chuỗi ngày ─────────── ví (KP, ⏳, mảnh) + ⚙ ┐
 *   │ Bảng "Việc hôm nay" (trái, thu gọn được)                               │
 *   │                         bản đồ + nhân vật                              │
 *   │ [thẻ công trình 3 nấc / lá thư sự kiện / bảng trong nhà]               │
 *   └ 📬 Bưu điện ─────────────────────────────────────── 🧰 Xưởng  🏗 Xây ┘
 *
 * Chạm công trình hoặc bấm "Đi tới": nhân vật đi bộ tới cổng (city-web), thẻ công trình mở.
 * Muốn dùng bản dự phòng: truyền renderer = ComposeCityRenderer.
 */
@Composable
fun CityScreen(
    onOpenVocabulary: (BuildingCode, Int) -> Unit = { _, _ -> },
    onStartLesson: (BuildingCode) -> Unit = {},
    onOpenAchievements: () -> Unit = {},
    onStartPlacement: () -> Unit = {},
    onOpenProfile: () -> Unit = {},
    onOpenSettings: () -> Unit = {},
    /** Đợt 2 (ADR-015): thi lên level, nhiệm vụ, luyện tập, giải sự kiện. */
    onOpenExam: (BuildingCode) -> Unit = {},
    onOpenQuests: () -> Unit = {},
    onOpenPractice: () -> Unit = {},
    onStartEvent: (Long) -> Unit = {},
    /** M8: màn Tuỳ biến; houseTab = mở thẳng tab Nhà (từ nút Trang trí trong nhà). */
    onOpenCustomize: (houseTab: Boolean) -> Unit = {},
    renderer: CityRenderer = WebCityRenderer,
    viewModel: CityViewModel = hiltViewModel(),
    tutorial: TutorialViewModel = hiltViewModel(),
    quests: QuestsViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsState()
    val guide by tutorial.state.collectAsState()
    val questState by quests.state.collectAsState()
    val snackbar = remember { SnackbarHostState() }
    val spotlight = rememberSpotlightRegistry()
    val scope = rememberCoroutineScope()
    var tray by rememberSaveable { mutableStateOf<DockTray?>(null) }

    // Tutorial thư ký (ADR-014): điều hướng theo nút của Mai; tự mở thẻ House khi Mai cần chỉ vào
    // nút Học/Xây.
    LaunchedEffect(Unit) {
        tutorial.nav.collect { nav ->
            when (nav) {
                TutorialNav.Placement -> onStartPlacement()
                is TutorialNav.Lesson -> onStartLesson(nav.code)
            }
        }
    }
    LaunchedEffect(guide.script?.id) {
        if (guide.script?.selectHousing == true) {
            viewModel.onIntent(CityIntent.Map(CityMapIntent.BuildingTapped(BuildingCode.HOUSING)))
        }
    }
    LaunchedEffect(guide.message) {
        guide.message?.let { text ->
            snackbar.showSnackbar(text)
            tutorial.messageShown()
        }
    }

    // Mỗi lần màn City quay lại foreground: tải lại thành phố, nhiệm vụ + kiểm tra gói nội dung mới
    // (ADR-012, kiểu pull).
    val lifecycleOwner = LocalLifecycleOwner.current
    DisposableEffect(lifecycleOwner) {
        val observer = LifecycleEventObserver { _, event ->
            if (event == Lifecycle.Event.ON_START) {
                viewModel.onIntent(CityIntent.AppForeground)
                quests.load()
            }
        }
        lifecycleOwner.lifecycle.addObserver(observer)
        onDispose { lifecycleOwner.lifecycle.removeObserver(observer) }
    }

    LaunchedEffect(state.message) {
        state.message?.let {
            snackbar.showSnackbar(it)
            viewModel.onIntent(CityIntent.MessageShown)
        }
    }
    LaunchedEffect(questState.message) {
        questState.message?.let {
            snackbar.showSnackbar(it)
            quests.messageShown()
        }
    }

    val render = state.render // dữ liệu để vẽ (hợp đồng B), tính lại mỗi lần state đổi
    val outside = state.focus == null && state.inside == null
    val soon: () -> Unit = { scope.launch { snackbar.showSnackbar("Tính năng này sắp ra mắt.") } }
    val goTo: (QuestTarget) -> Unit = { target ->
        tray = null
        when (target) {
            is QuestTarget.Building -> viewModel.onIntent(CityIntent.WalkTo(target.code))
            is QuestTarget.Event ->
                viewModel.onIntent(CityIntent.Map(CityMapIntent.CityEventTapped(target.eventId)))
            QuestTarget.Practice -> onOpenPractice()
        }
    }

    CompositionLocalProvider(LocalSpotlight provides spotlight) {
    Box(Modifier.fillMaxSize()) {
        renderer.Render(
            state = render,
            onIntent = { viewModel.onIntent(CityIntent.Map(it)) },
            modifier = Modifier.fillMaxSize()
        )

        // SCR-15: bản đồ cần vài giây cho khung hình đầu → loading "Mai đang dựng thành phố"
        if (!state.mapReady) {
            DestinationLoading(
                LoadingKind.CITY,
                Modifier.background(MaterialTheme.colorScheme.background)
            )
        }

        // M7: phím Back khi đang ở trong công trình = "Ra ngoài" (chưa vào xong thì nuốt phím)
        BackHandler(enabled = state.focus != null || state.inside != null) {
            viewModel.onIntent(CityIntent.ExitBuilding)
        }
        // Back khi đang mở ngăn dock: đóng ngăn trước
        BackHandler(enabled = tray != null && outside) { tray = null }

        Column(
            Modifier.align(Alignment.TopStart).fillMaxWidth().statusBarsPadding().padding(12.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            HomeHud(
                profile = state.profile,
                avatar = state.avatar,
                // tạm: tổng level công trình, thay bằng Town Level thật ở ADR-017
                townLevel = state.city.buildings.sumOf { it.level }.coerceAtLeast(1),
                streakDays = state.city.streakDays,
                titleName = state.equippedTitleName,
                onOpenProfile = onOpenProfile,
                onOpenQuests = onOpenQuests,
                onOpenAchievements = onOpenAchievements,
                onOpenSettings = onOpenSettings
            )
            if (outside) {
                QuestPanel(
                    quests = questState,
                    city = state.city,
                    onGo = goTo,
                    onClaim = quests::claim,
                    onOpenAll = onOpenQuests
                )
            }
        }

        Column(
            modifier = Modifier.align(Alignment.BottomCenter).fillMaxWidth().navigationBarsPadding()
                .padding(12.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            SnackbarHost(snackbar)
            // M7: đang ở trong nhà → bảng trong nhà thay cho thẻ công trình
            state.inside?.let { code ->
                if (state.focus == code) {
                    val vocabularyLevel = maxOf(1, render.building(code)?.level ?: 1)
                    InteriorPanel(
                        onLearn = { onStartLesson(code) },
                        onVocabulary = { onOpenVocabulary(code, vocabularyLevel) },
                        onDecorate = { onOpenCustomize(true) },
                        onExit = { viewModel.onIntent(CityIntent.ExitBuilding) }
                    )
                }
            }
            val selected = state.selected?.takeIf { state.focus == null }?.let { render.building(it) }
            val event = state.selectedEvent?.takeIf { state.focus == null }
            when {
                selected != null -> {
                    val learnLevel = minOf(3, selected.level + 1)
                    BuildingSheet(
                        building = selected,
                        next = state.nextLevelInfo(selected.code, selected.level),
                        collected = state.collectionOf(selected.code, learnLevel),
                        busy = state.building,
                        hasBlueprint = state.city.hasBlueprintFor(selected.code, selected.level + 1),
                        onBuild = { viewModel.onIntent(CityIntent.BuildSelected) },
                        onEnter = { viewModel.onIntent(CityIntent.EnterSelected) },
                        onLearn = { onStartLesson(selected.code) },
                        onVocabulary = { onOpenVocabulary(selected.code, maxOf(1, selected.level)) },
                        onExam = { onOpenExam(selected.code) },
                        onClose = { viewModel.onIntent(CityIntent.DismissSelection) }
                    )
                }
                event != null -> EventLetter(
                    event = event,
                    onHelp = {
                        viewModel.onIntent(CityIntent.DismissEvent)
                        onStartEvent(event.serverId)
                    },
                    onClose = { viewModel.onIntent(CityIntent.DismissEvent) }
                )
                outside -> HomeDock(
                    open = tray,
                    onToggle = { t -> tray = if (tray == t) null else t },
                    mailActions = listOf(
                        DockAction("Nhiệm vụ", LinguaIcons.Quest) { tray = null; onOpenQuests() },
                        DockAction("Danh hiệu", LinguaIcons.Star) { tray = null; onOpenAchievements() },
                        DockAction("Hồ sơ", LinguaIcons.Ledger) { tray = null; onOpenProfile() },
                        DockAction("Bạn bè", LinguaIcons.Mail, enabled = false, onClick = soon)
                    ),
                    workshopActions = listOf(
                        DockAction("Thẻ từ", LinguaIcons.BookOpen) {
                            tray = null
                            val house = state.city.building(BuildingCode.HOUSING)
                            onOpenVocabulary(BuildingCode.HOUSING, maxOf(1, house?.level ?: 1))
                        },
                        DockAction("Luyện tập", LinguaIcons.Target) { tray = null; onOpenPractice() },
                        DockAction("Tuỳ biến", LinguaIcons.Settings) {
                            tray = null
                            onOpenCustomize(false)
                        }
                    ),
                    buildings = render.buildings,
                    onGoBuilding = { code ->
                        tray = null
                        viewModel.onIntent(CityIntent.WalkTo(code))
                    },
                    mailBadge = questState.overview?.let { o ->
                        (o.daily + o.main + listOfNotNull(o.dailyBonus)).count { it.claimable }
                    } ?: 0,
                    dockModifier = Modifier.spotlightTarget(SpotKeys.MENU)
                )
            }
        }

        SecretaryOverlay(guide, onNext = tutorial::next, onAct = tutorial::act)
    }
    }
}
