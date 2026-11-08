package com.project.linguacity.presentation.tutorial

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.project.linguacity.data.local.preferences.SettingsStore
import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.content.packCode
import com.project.linguacity.domain.model.player.BuildOutcome
import com.project.linguacity.domain.repository.CityRepository
import com.project.linguacity.domain.repository.ContentRepository
import com.project.linguacity.domain.repository.LearningRepository
import com.project.linguacity.domain.repository.PlayerRepository
import com.project.linguacity.domain.repository.UserRepository
import com.project.linguacity.presentation.common.friendlyNetworkError
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

data class TutorialUiState(
    val script: GuideScript? = null,
    val lineIndex: Int = 0,
    val busy: Boolean = false,
    val message: String? = null
) {
    val line: GuideLine? get() = script?.lines?.getOrNull(lineIndex)
    val isLastLine: Boolean get() = script != null && lineIndex >= script.lines.lastIndex
}

/** Điểm đến mà overlay yêu cầu màn City điều hướng tới. */
sealed interface TutorialNav {
    data object Placement : TutorialNav
    data class Lesson(val code: BuildingCode) : TutorialNav
}

/**
 * Điều phối tutorial thư ký (ADR-014). Bước hiện tại luôn lấy từ server (qua Room); ViewModel chỉ
 * chọn
 * kịch bản và gọi đúng API khi người chơi bấm nút của Mai (BR-TUT-01, BR-TUT-02).
 */
@HiltViewModel
class TutorialViewModel @Inject constructor(
    private val player: PlayerRepository,
    private val city: CityRepository,
    private val users: UserRepository,
    content: ContentRepository,
    learning: LearningRepository,
    private val settings: SettingsStore
) : ViewModel() {

    private val _state = MutableStateFlow(TutorialUiState())
    val state: StateFlow<TutorialUiState> = _state.asStateFlow()

    private val _nav = MutableSharedFlow<TutorialNav>(extraBufferCapacity = 1)
    val nav: SharedFlow<TutorialNav> = _nav.asSharedFlow()

    init {
        viewModelScope.launch {
            combine(
                player.observeProfile(),
                city.city,
                content.observeBuildingLevels(),
                combine(
                    content.observePackWordIds(),
                    learning.observeProgress()
                ) { packs, progress ->
                    packs[packCode(
                        BuildingCode.HOUSING.name,
                        1
                    )].orEmpty().count { progress[it]?.collected == true }
                },
                settings.settings
            ) { profile, cityState, levels, collected, appSettings ->
                if (profile?.tutorialStep == "DONE" && appSettings.replayTour) {
                    return@combine TutorialGuide.replayTour()
                }
                val house = cityState.building(BuildingCode.HOUSING)
                val lv1 = levels.firstOrNull { it.buildingCode == BuildingCode.HOUSING.name
                    && it.level == 1 }
                profile?.let {
                    TutorialGuide.script(
                        GuideContext(
                            step = it.tutorialStep,
                            collected = collected,
                            requiredCollected = lv1?.requiredCollected ?: 20,
                            knowledgePoints = it.knowledgePoints,
                            buildCost = lv1?.knowledgeCost ?: 100,
                            houseLevel = house?.level ?: 0,
                            houseUpgrading = house?.isUpgrading == true
                        )
                    )
                }
            }.collect { script ->
                _state.update { current ->
                    if (current.script?.id == script?.id) {  // giữ câu đang đọc
                        current.copy(script = script)
                    }
                    else current.copy(script = script, lineIndex = 0, busy = false)
                }
            }
        }
    }

    fun next() {
        _state.update { if (it.isLastLine) it else it.copy(lineIndex = it.lineIndex + 1) }
    }

    fun act() {
        val script = _state.value.script ?: return
        if (_state.value.busy) {
            return
        }
        when (script.action) {
            GuideAction.NONE -> Unit
            GuideAction.START_PLACEMENT -> run {
                player.advanceTutorial("PLACEMENT")
                _nav.tryEmit(TutorialNav.Placement)
            }
            GuideAction.RESUME_PLACEMENT -> _nav.tryEmit(TutorialNav.Placement)
            GuideAction.START_LESSON -> _nav.tryEmit(TutorialNav.Lesson(BuildingCode.HOUSING))
            GuideAction.BUILD -> run {
                when (val outcome = city.build(BuildingCode.HOUSING)) {
                    BuildOutcome.Started, BuildOutcome.Busy -> Unit
                    is BuildOutcome.NotMet -> message("Còn thiếu một chút nữa — học thêm bài nhé!")
                    BuildOutcome.Offline -> message("Cần kết nối mạng để xây nhé.")
                    BuildOutcome.NeedsExam -> runCatching { city.refresh() }
                    is BuildOutcome.Failed -> message(outcome.message)
                }
            }
            // M7 sẽ chèn cảnh avatar đi vào nhà + nội thất 3D trước bước này; M8 thay CUSTOMIZE
            // bằng màn tuỳ biến thật.
            GuideAction.ENTER_HOUSE -> run { player.advanceTutorial("CUSTOMIZE") }
            GuideAction.FINISH_CUSTOMIZE -> run { player.advanceTutorial("TOUR") }
            GuideAction.FINISH_REPLAY -> run { settings.setReplayTour(false) }
            GuideAction.FINISH_TUTORIAL -> run {
                users.completeTutorial()
                runCatching { player.refresh() }
            }
        }
    }

    fun messageShown() = _state.update { it.copy(message = null) }

    private fun message(text: String) = _state.update { it.copy(message = text) }

    private fun run(block: suspend () -> Unit) {
        _state.update { it.copy(busy = true) }
        viewModelScope.launch {
            try {
                block()
            } catch (e: Exception) {
                // Server từ chối (vd. bước đã đổi ở máy khác): đọc lại hồ sơ để đồng bộ bước
                // (BR-TUT-01).
                runCatching { player.refresh() }
                message(friendlyNetworkError(e))
            } finally {
                _state.update { it.copy(busy = false) }
            }
        }
    }
}
