package com.project.linguacity.presentation.exam

import com.project.linguacity.ui.components.*
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.project.linguacity.domain.model.learning.LessonItem
import com.project.linguacity.domain.model.progression.ExamAttempt
import com.project.linguacity.domain.model.progression.ExamResult
import com.project.linguacity.domain.model.progression.ExamStatus
import com.project.linguacity.presentation.lesson.QuestionBody
import com.project.linguacity.ui.loading.DelayedLoading
import com.project.linguacity.ui.loading.LoadingKind

/**
 * SCR-10 Trung tâm thi, SCR-11 Làm bài, SCR-12 Kết quả (UC_06/07/08). Câu trả lời giữ trong
 * máy tới lúc nộp; server chấm một lần (BR-EXAM-05).
 */
@Composable
fun ExamScreen(
    onBack: () -> Unit,
    onLearn: () -> Unit,
    onUpgraded: () -> Unit,
    viewModel: ExamViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsState()
    val snackbar = remember { SnackbarHostState() }
    LaunchedEffect(state.message) {
        state.message?.let { text ->
            snackbar.showSnackbar(text)
            viewModel.messageShown()
        }
    }
    if (state.confirmFee) {
        FeeDialog(
            state.status,
            onConfirm = viewModel::confirmStart,
            onDismiss = viewModel::dismissFee
        )
    }

    Column(
        Modifier.fillMaxSize().statusBarsPadding().navigationBarsPadding().imePadding()
            .padding(16.dp)
    ) {
        Row {
            CozyTextButton(onClick = onBack) { Text("‹ Quay lại") }
        }
        val result = state.result
        val attempt = state.attempt
        val status = state.status
        when {
            result != null -> ResultView(result, onLearn = onLearn, onUpgrade = onUpgraded)
            state.loading -> DelayedLoading(LoadingKind.LESSON)
            attempt != null && state.reviewing -> ReviewView(state, attempt, viewModel)
            attempt != null -> TakeView(state, attempt, viewModel)
            status != null -> {
                if (state.showTip) {
                    MaiTip(viewModel::dismissTip)
                }
                CenterView(status, state.busy, viewModel::start)
            }
            else -> Text("Công trình này chưa có bài thi.")
        }
        SnackbarHost(snackbar)
    }
}

// ---------- SCR-10 ----------

@Composable
private fun ColumnScope.CenterView(status: ExamStatus, busy: Boolean, onStart: () -> Unit) {
    Column(
        Modifier.weight(1f).verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(
            "📝 Thi lên ${status.buildingCode?.displayName ?: ""} Lv ${status.targetLevel}",
            style = MaterialTheme.typography.titleLarge
        )
        Text(
            "${status.questionCount} câu · đậu khi đúng ≥ ${status.passPercent}% · " +
                "không giới hạn giờ",
            style = MaterialTheme.typography.bodyMedium
        )
        CozyCard(Modifier.fillMaxWidth()) {
            Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Text("Điều kiện", fontWeight = FontWeight.SemiBold)
                RequirementLine(
                    "Từ đã sưu tầm: ${status.collected}/${status.requiredWords}",
                    status.missingWords == 0
                )
                RequirementLine(
                    "Phí thi: ${status.requiredKnowledge} KP (bạn có ${status.knowledgePoints})",
                    status.missingKnowledge == 0
                )
                if (status.requiredShards > 0) {
                    RequirementLine(
                        "Mảnh bản vẽ: ${status.shards}/${status.requiredShards}",
                        status.missingShards == 0
                    )
                }
                status.requiredBuilding?.let { required ->
                    RequirementLine(
                        "${required.displayName} đạt Lv ${status.requiredBuildingLevel}",
                        !status.missingBuilding
                    )
                }
            }
        }
        if (!status.available && !status.passed && status.activeAttemptId == null) {
            Text(
                "Mẹo của Mai: học thêm ở công trình, làm nhiệm vụ hằng ngày và giúp cư dân để " +
                    "đủ điều kiện nhé!",
                style = MaterialTheme.typography.bodySmall
            )
        }
    }
    val label = when {
        status.passed -> "Đã có bản vẽ — ra thẻ công trình để nâng cấp"
        status.activeAttemptId != null -> "Làm tiếp bài thi"
        else -> "Bắt đầu thi"
    }
    CozyButton(
        onClick = onStart,
        enabled = !busy && !status.passed && (status.available || status.activeAttemptId != null),
        modifier = Modifier.fillMaxWidth()
    ) {
        Text(label)
    }
}

/** Mai giới thiệu luật thi lần đầu (ADR-015 §2). */
@Composable
private fun MaiTip(onDismiss: () -> Unit) {
    CozyCard(Modifier.fillMaxWidth().padding(bottom = 12.dp)) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
            Text("👩‍🏫 Mai", fontWeight = FontWeight.SemiBold)
            Text(
                "Đây là Trung tâm thi! Đủ điều kiện thì đóng phí KP để thi. Đậu sẽ nhận bản vẽ " +
                    "để nâng cấp công trình. Trượt thì mất phí nhưng thi lại lúc nào cũng được, " +
                    "và bài đang làm dở vẫn được giữ.",
                style = MaterialTheme.typography.bodyMedium
            )
            CozyTextButton(onClick = onDismiss) { Text("Mình hiểu rồi") }
        }
    }
}

@Composable
private fun RequirementLine(text: String, met: Boolean) {
    Text((if (met) "✅ " else "⬜ ") + text, style = MaterialTheme.typography.bodyMedium)
}

@Composable
private fun FeeDialog(status: ExamStatus?, onConfirm: () -> Unit, onDismiss: () -> Unit) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Bắt đầu thi?") },
        text = {
            Text(
                "Dùng ${status?.requiredKnowledge ?: 0} KP làm phí thi. " +
                    "Trượt thì không hoàn lại, nhưng bạn được thi lại bất cứ lúc nào."
            )
        },
        confirmButton = { CozyTextButton(onClick = onConfirm) { Text("Thi") } },
        dismissButton = { CozyTextButton(onClick = onDismiss) { Text("Để sau") } }
    )
}

// ---------- SCR-11 ----------

@Composable
private fun ColumnScope.TakeView(state: ExamUiState, attempt: ExamAttempt, vm: ExamViewModel) {
    val question = attempt.questions.getOrNull(state.index) ?: return
    val total = attempt.questions.size
    Text("Câu ${state.index + 1}/$total · đã trả lời ${state.answeredCount}")
    LinearProgressIndicator(
        progress = { state.answeredCount.toFloat() / total },
        modifier = Modifier.fillMaxWidth()
    )
    val answer = state.answers[question.order].orEmpty()
    Column(
        Modifier.weight(1f).verticalScroll(rememberScrollState()).padding(vertical = 12.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        QuestionBody(
            item = LessonItem(question.order, 0, false, null, question.question),
            chosen = answer,
            input = answer,
            feedback = null,
            submitting = false,
            onChoose = vm::answer,
            onInput = vm::answer,
            onSubmit = vm::next
        )
        if (question.question.multipleChoice && answer.isNotBlank()) {
            Text("Đã chọn: $answer", fontWeight = FontWeight.SemiBold)
        }
    }
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        CozyOutlinedButton(onClick = { vm.goTo(state.index - 1) }, enabled = state.index > 0) {
            Text("‹ Câu trước")
        }
        Spacer(Modifier.weight(1f))
        CozyTextButton(onClick = vm::review) { Text("Xem lại") }
        CozyButton(onClick = vm::next) { Text(if (state.index + 1 >= total) "Xong" else "Câu sau ›") }
    }
}

@Composable
private fun ColumnScope.ReviewView(state: ExamUiState, attempt: ExamAttempt, vm: ExamViewModel) {
    Text("Xem lại trước khi nộp", style = MaterialTheme.typography.titleLarge)
    Column(
        Modifier.weight(1f).verticalScroll(rememberScrollState()).padding(vertical = 12.dp),
        verticalArrangement = Arrangement.spacedBy(6.dp)
    ) {
        attempt.questions.forEachIndexed { index, question ->
            val answer = state.answers[question.order]
            val shown = if (answer.isNullOrBlank()) "⬜ chưa trả lời" else "✏️ $answer"
            Text(
                "Câu ${question.order}: $shown",
                modifier = Modifier.fillMaxWidth().clickable { vm.goTo(index) }.padding(8.dp)
            )
        }
    }
    val missing = attempt.questions.size - state.answeredCount
    if (missing > 0) {
        Text("Còn $missing câu chưa trả lời — chạm vào câu để làm tiếp.")
    }
    CozyButton(
        onClick = vm::submit,
        enabled = missing == 0 && !state.busy,
        modifier = Modifier.fillMaxWidth()
    ) {
        Text(if (state.busy) "Đang chấm…" else "Nộp bài")
    }
}

// ---------- SCR-12 ----------

@Composable
private fun ColumnScope.ResultView(result: ExamResult, onLearn: () -> Unit, onUpgrade: () -> Unit) {
    Column(
        Modifier.weight(1f).verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        Text(
            if (result.passed) "🎉 ĐẬU" else "Chưa đậu lần này",
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold
        )
        Text(
            "${result.correct}/${result.total} · ${result.scorePercent}% " +
                "(cần ${result.passPercent}%)"
        )
        if (result.passed && result.blueprintTargetLevel != null) {
            CozyCard(Modifier.fillMaxWidth()) {
                Text(
                    "📐 Nhận bản vẽ Lv ${result.blueprintTargetLevel}! Ra thẻ công trình và bấm " +
                        "Nâng cấp nhé.",
                    modifier = Modifier.padding(16.dp)
                )
            }
        } else if (!result.passed) {
            Text("Mai: Đừng nản! Học thêm vài bài rồi quay lại thi nhé — từ đã học vẫn giữ nguyên.")
        }
        result.items.forEach { item ->
            CozyCard(Modifier.fillMaxWidth()) {
                Column(Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text("${if (item.isCorrect) "✅" else "❌"} Câu ${item.order}")
                    item.sentence?.let { Text(it) }
                    Text("Bạn: ${item.given.orEmpty()} · Đáp án: ${item.correctAnswer}")
                    item.explanation?.let { Text(it, style = MaterialTheme.typography.bodySmall) }
                }
            }
        }
    }
    if (result.passed) {
        CozyButton(onClick = onUpgrade, modifier = Modifier.fillMaxWidth()) { Text("Về thành phố") }
    } else {
        CozyButton(onClick = onLearn, modifier = Modifier.fillMaxWidth()) { Text("Học thêm") }
    }
}
