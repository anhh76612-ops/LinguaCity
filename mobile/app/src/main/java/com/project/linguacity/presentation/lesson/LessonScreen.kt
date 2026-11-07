package com.project.linguacity.presentation.lesson

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.project.linguacity.domain.model.learning.AnswerFeedback
import com.project.linguacity.domain.model.learning.LessonItem
import com.project.linguacity.domain.model.learning.LessonResult

private val Good = Color(0xFF2E7D32)
private val Bad = Color(0xFFC62828)

/**
 * SCR-08 Bài học + SCR-09 Kết quả (UC_05). Bản chức năng; thư ký Mai dạng chân dung + hiệu ứng ở M6/M9.
 */
@Composable
fun LessonScreen(
    onExit: () -> Unit,
    viewModel: LessonViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsState()
    LaunchedEffect(Unit) { viewModel.onIntent(LessonIntent.Start) }

    Column(Modifier.fillMaxSize().statusBarsPadding().navigationBarsPadding().imePadding().padding(16.dp)) {
        val problem = state.problem
        val result = state.result
        when {
            problem != null -> ProblemView(problem, state.problemMessage, onRetry = { viewModel.onIntent(LessonIntent.Retry) }, onExit = onExit)
            result != null -> ResultView(result, state.newAchievementNames, onExit)
            state.loading || state.completing || state.session == null -> Box(Modifier.fillMaxSize(), Alignment.Center) {
                Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    CircularProgressIndicator()
                    Text(if (state.completing) "Mai đang chấm điểm…" else "Mai đang soạn bài cho bạn…")
                }
            }
            else -> QuestionView(state, onIntent = viewModel::onIntent, onExit = onExit)
        }
    }
}

@Composable
private fun ColumnScope.QuestionView(state: LessonUiState, onIntent: (LessonIntent) -> Unit, onExit: () -> Unit) {
    val session = state.session ?: return
    val item = state.current ?: return
    val total = session.items.size

    Row(verticalAlignment = Alignment.CenterVertically) {
        TextButton(onClick = onExit) { Text("‹ Thoát") }
        Spacer(Modifier.weight(1f))
        Text("Câu ${state.index + 1}/$total · ✅ ${state.correctSoFar}", style = MaterialTheme.typography.labelLarge)
    }
    LinearProgressIndicator(progress = { (state.index + if (state.feedback != null) 1 else 0).toFloat() / total },
        modifier = Modifier.fillMaxWidth())
    if (session.placement) {
        Text(tierLabel(item.question.tier), style = MaterialTheme.typography.labelMedium, modifier = Modifier.padding(top = 8.dp))
    }

    Column(Modifier.weight(1f).verticalScroll(rememberScrollState()).padding(vertical = 16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text(item.question.text, style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.SemiBold)
        item.question.sentence?.let {
            Card(Modifier.fillMaxWidth()) {
                Text(it.replace("___", "_____"), style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(16.dp))
            }
        }
        item.question.hint?.let { Text("Gợi ý: $it", style = MaterialTheme.typography.bodyMedium) }

        if (item.question.multipleChoice) {
            item.question.options.forEach { option ->
                OptionButton(option, item, state.chosen, state.feedback, enabled = state.feedback == null && !state.submitting) {
                    onIntent(LessonIntent.Choose(option))
                }
            }
        } else {
            OutlinedTextField(
                value = state.input,
                onValueChange = { onIntent(LessonIntent.Input(it)) },
                label = { Text("Gõ từ tiếng Anh") },
                singleLine = true,
                enabled = state.feedback == null && !state.submitting,
                keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
                keyboardActions = KeyboardActions(onDone = { onIntent(LessonIntent.Submit) }),
                modifier = Modifier.fillMaxWidth()
            )
            if (state.feedback == null) {
                Button(onClick = { onIntent(LessonIntent.Submit) }, enabled = state.input.isNotBlank() && !state.submitting,
                    modifier = Modifier.fillMaxWidth()) { Text(if (state.submitting) "Đang chấm…" else "Kiểm tra") }
            }
        }
    }

    AnimatedVisibility(state.feedback != null) {
        state.feedback?.let { FeedbackPanel(it, state.maiLine, last = state.index + 1 >= total) { onIntent(LessonIntent.Next) } }
    }
}

@Composable
private fun OptionButton(option: String, item: LessonItem, chosen: String?, feedback: AnswerFeedback?, enabled: Boolean, onClick: () -> Unit) {
    val color = when {
        feedback == null -> null
        option == feedback.correctAnswer -> Good
        option == chosen -> Bad
        else -> null
    }
    OutlinedButton(
        onClick = onClick,
        enabled = enabled,
        modifier = Modifier.fillMaxWidth(),
        colors = if (color != null) ButtonDefaults.outlinedButtonColors(disabledContainerColor = color.copy(alpha = 0.15f),
            disabledContentColor = color) else ButtonDefaults.outlinedButtonColors()
    ) { Text(option, modifier = Modifier.padding(vertical = 4.dp)) }
}

@Composable
private fun FeedbackPanel(fb: AnswerFeedback, maiLine: String?, last: Boolean, onNext: () -> Unit) {
    val tone = if (fb.isCorrect) Good else Bad
    Card(Modifier.fillMaxWidth(), colors = CardDefaults.cardColors(containerColor = tone.copy(alpha = 0.10f))) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text("Mai: ${maiLine ?: ""}", color = tone, fontWeight = FontWeight.SemiBold)
            if (!fb.isCorrect) Text("Đáp án: ${fb.correctAnswer}", fontWeight = FontWeight.Bold)
            fb.explanation?.let { Text(it, style = MaterialTheme.typography.bodyMedium) }
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("Mastery ${fb.masteryAfter}/${fb.maxMastery}", style = MaterialTheme.typography.labelMedium)
                LinearProgressIndicator(progress = { fb.masteryAfter.toFloat() / fb.maxMastery }, modifier = Modifier.weight(1f))
            }
            Button(onClick = onNext, modifier = Modifier.fillMaxWidth()) { Text(if (last) "Xem kết quả" else "Câu tiếp") }
        }
    }
}

@Composable
private fun ResultView(r: LessonResult, achievementNames: List<String>, onExit: () -> Unit) {
    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()), horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(14.dp)) {
        Spacer(Modifier.height(24.dp))
        Text(if (r.placement) "Kết quả kiểm tra trình độ" else "Kết quả bài học", style = MaterialTheme.typography.titleLarge)
        Text("${r.correct}/${r.total}", style = MaterialTheme.typography.displayMedium, fontWeight = FontWeight.Bold)
        Text("Mai: ${MaiLines.forResult(r.correct, r.total)}", textAlign = TextAlign.Center)
        Card(Modifier.fillMaxWidth()) {
            Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Text("+${r.kpAwarded} Điểm Tri Thức (KP)", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                if (r.kpBase != null && r.kpBonus != null) {
                    val bonusLabel = if (r.placement) "quà chào mừng" else "thưởng"
                    Text("${r.kpBase} + ${r.kpBonus} $bonusLabel", style = MaterialTheme.typography.bodySmall)
                }
                if ((r.dailyMultiplier ?: 1.0) < 1.0) {
                    Text("Bài thứ ${r.dailySessionIndex} hôm nay: KP còn ×${r.dailyMultiplier}. Mai vẫn ghi nhận Mastery đầy đủ nhé!",
                        style = MaterialTheme.typography.bodySmall)
                }
                Text("Tổng: ${r.knowledgePoints} KP", style = MaterialTheme.typography.bodySmall)
            }
        }
        Card(Modifier.fillMaxWidth()) {
            Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Text("Bộ sưu tầm Level ${r.collectionLevel}: ${r.collected}/${r.collectionTotal} thẻ", fontWeight = FontWeight.SemiBold)
                LinearProgressIndicator(progress = { if (r.collectionTotal == 0) 0f else r.collected.toFloat() / r.collectionTotal },
                    modifier = Modifier.fillMaxWidth())
            }
        }
        if (achievementNames.isNotEmpty()) {
            Text("Danh hiệu mới", style = MaterialTheme.typography.titleMedium)
            achievementNames.forEach {
                Text("🏅 $it", modifier = Modifier.background(MaterialTheme.colorScheme.secondaryContainer, RoundedCornerShape(12.dp))
                    .padding(horizontal = 14.dp, vertical = 8.dp))
            }
        }
        Button(onClick = onExit, modifier = Modifier.fillMaxWidth()) { Text("Về thành phố") }
    }
}

@Composable
private fun ProblemView(problem: LessonProblem, message: String?, onRetry: () -> Unit, onExit: () -> Unit) {
    val (title, body, retry) = when (problem) {
        LessonProblem.OFFLINE -> Triple("Mất kết nối", "Bài học cần mạng để Mai chấm điểm. Câu bạn đang làm vẫn được giữ — có mạng rồi bấm Thử lại nhé.", "Thử lại")
        LessonProblem.EXPIRED -> Triple("Bài học đã hết hạn", "Bài học chỉ giữ trong 30 phút. Mastery của các câu đã làm vẫn được lưu, nhưng không có KP cuối bài. Làm bài mới nhé?", "Bắt đầu bài mới")
        LessonProblem.NO_CONTENT -> Triple("Chưa có bài học", "Công trình này chưa có từ vựng. Mai sẽ báo bạn khi có nội dung mới!", null)
        LessonProblem.INVALID_STEP -> Triple("Chưa tới bước này", message ?: "", null)
        LessonProblem.OTHER -> Triple("Có lỗi xảy ra", message ?: "Thử lại sau ít phút nhé.", "Thử lại")
    }
    Column(Modifier.fillMaxSize(), verticalArrangement = Arrangement.spacedBy(16.dp, Alignment.CenterVertically),
        horizontalAlignment = Alignment.CenterHorizontally) {
        Text(title, style = MaterialTheme.typography.titleLarge)
        Text(body, textAlign = TextAlign.Center)
        retry?.let { Button(onClick = onRetry) { Text(it) } }
        TextButton(onClick = onExit) { Text("Về thành phố") }
    }
}

private fun tierLabel(tier: Int) = when (tier) {
    1 -> "Mức 1 · Nhận nghĩa"
    2 -> "Mức 2 · Điền từ có gợi ý"
    else -> "Mức 3 · Điền từ theo ngữ cảnh"
}
