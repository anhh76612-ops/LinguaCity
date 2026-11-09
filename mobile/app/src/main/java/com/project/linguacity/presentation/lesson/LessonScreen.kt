package com.project.linguacity.presentation.lesson

import android.view.HapticFeedbackConstants
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.tween
import androidx.compose.animation.slideInVertically
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import kotlinx.coroutines.delay
import com.project.linguacity.presentation.characters.BoMood
import com.project.linguacity.presentation.characters.BoPortrait
import com.project.linguacity.presentation.characters.EchoMood
import com.project.linguacity.presentation.characters.EchoPortrait
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.project.linguacity.domain.model.learning.AnswerFeedback
import com.project.linguacity.domain.model.learning.LessonItem
import com.project.linguacity.domain.model.learning.LessonResult
import com.project.linguacity.presentation.tutorial.MaiMood
import com.project.linguacity.presentation.tutorial.MaiPortrait
import com.project.linguacity.presentation.tutorial.TutorialGuide
import com.project.linguacity.ui.components.BrickProgressBar
import com.project.linguacity.ui.components.ClayCard
import com.project.linguacity.ui.components.CozyBubbleText
import com.project.linguacity.ui.components.CozyTag
import com.project.linguacity.ui.components.JellyButton
import com.project.linguacity.ui.components.JellyIconButton
import com.project.linguacity.ui.components.JellySize
import com.project.linguacity.ui.components.JellyVariant
import com.project.linguacity.ui.components.LinguaIcon
import com.project.linguacity.ui.components.clay
import com.project.linguacity.ui.components.rememberPressProgress
import com.project.linguacity.ui.icons.LinguaIcons
import com.project.linguacity.ui.loading.DelayedLoading
import com.project.linguacity.ui.loading.LoadingKind
import com.project.linguacity.ui.motion.LocalReduceMotion
import com.project.linguacity.ui.motion.staggeredAppear
import com.project.linguacity.ui.theme.Brand
import com.project.linguacity.ui.theme.LinguaTextStyles
import com.project.linguacity.ui.theme.LinguaTheme

/** Màu bảng phấn của lớp học (cố định, giống nhau ngày và đêm). */
private val Chalkboard = Color(0xFF2F5D50)
private val ChalkboardEdge = Color(0xFF1F4238)
private val Chalk = Color(0xFFF3F1E7)

/**
 * SCR-08 Bài học + SCR-09 Kết quả (UC_05), S4 "Cozy Toy Town": bài học diễn ra trong lớp học —
 * nền giấy kẻ ô, đề bài viết trên bảng phấn, đáp án là các khối thạch, mỗi câu đúng xếp thêm một
 * viên gạch. Trả lời sai: khối lắc nhẹ, đổi màu cam đất sét và sheet giải thích hiện lên (không có
 * chữ "SAI RỒI").
 */
@Composable
fun LessonScreen(
    onExit: () -> Unit,
    viewModel: LessonViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsState()
    LaunchedEffect(Unit) { viewModel.onIntent(LessonIntent.Start) }

    Box(Modifier.fillMaxSize().background(LinguaTheme.colors.paper)) {
        GridPaper()
        Column(
            Modifier.fillMaxSize().statusBarsPadding().navigationBarsPadding().imePadding()
                .padding(16.dp)
        ) {
            val problem = state.problem
            val result = state.result
            when {
                problem != null -> ProblemView(
                    problem,
                    state.problemMessage,
                    onRetry = { viewModel.onIntent(LessonIntent.Retry) },
                    onExit = onExit
                )
                result != null -> ResultView(result, state.newAchievementNames, onExit)
                state.completing -> DelayedLoading(LoadingKind.MEDAL)
                state.loading || state.session == null -> DelayedLoading(LoadingKind.LESSON)
                else -> QuestionView(state, onIntent = viewModel::onIntent, onExit = onExit)
            }
        }
    }
}

/** Nền giấy kẻ ô vở học sinh. */
@Composable
private fun GridPaper() {
    val line = LinguaTheme.colors.line
    Canvas(Modifier.fillMaxSize()) {
        val step = 22.dp.toPx()
        var x = 0f
        while (x < size.width) {
            drawLine(line, Offset(x, 0f), Offset(x, size.height), 1f)
            x += step
        }
        var y = 0f
        while (y < size.height) {
            drawLine(line, Offset(0f, y), Offset(size.width, y), 1f)
            y += step
        }
    }
}

@Composable
private fun ColumnScope.QuestionView(
    state: LessonUiState,
    onIntent: (LessonIntent) -> Unit,
    onExit: () -> Unit
) {
    val session = state.session ?: return
    val item = state.current ?: return
    val total = session.items.size

    QuestionHeader(state, total, onExit)
    if (session.placement) {
        val previousTier = session.items.getOrNull(state.index - 1)?.question?.tier
        PlacementTip(item.question.tier, showMai = state.feedback == null &&
            previousTier != item.question.tier)
    }

    // S5: Echo canh ở bảng, Bơ ngồi cạnh đáp án. Chưa chọn sau 8 giây thì Echo ngáp, Bơ ra hiệu.
    var idle by remember(state.index) { mutableStateOf(false) }
    LaunchedEffect(state.index, state.feedback) {
        idle = false
        if (state.feedback == null) {
            delay(8_000)
            idle = true
        }
    }
    val tutors = !session.placement

    Column(
        Modifier.weight(1f).verticalScroll(rememberScrollState()).padding(vertical = 16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        if (tutors) EchoRow(state.feedback, idle && state.hint == null)
        QuestionBody(
            hintedOption = state.hint?.option,
            item = item,
            chosen = state.chosen,
            input = state.input,
            feedback = state.feedback,
            submitting = state.submitting,
            onChoose = { option -> onIntent(LessonIntent.Choose(option)) },
            onInput = { text -> onIntent(LessonIntent.Input(text)) },
            onSubmit = { onIntent(LessonIntent.Submit) }
        )
        if (tutors) {
            BoRow(state, idle) { onIntent(LessonIntent.AskHint) }
        }
    }

    AnimatedVisibility(
        state.feedback != null,
        enter = if (LocalReduceMotion.current) androidx.compose.animation.fadeIn()
        else slideInVertically { it / 2 } + androidx.compose.animation.fadeIn()
    ) {
        state.feedback?.let { feedback ->
            FeedbackSheet(feedback, state.maiLine, last = state.index + 1 >= total) {
                onIntent(LessonIntent.Next)
            }
        }
    }
}

/** Thanh trên cùng: nút về, hàng gạch tiến độ (mỗi câu đúng một viên), số câu. */
@Composable
private fun QuestionHeader(state: LessonUiState, total: Int, onExit: () -> Unit) {
    val c = LinguaTheme.colors
    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(12.dp)) {
        JellyIconButton(LinguaIcons.BackWood, "Thoát bài học", onExit, diameter = 44.dp)
        Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(4.dp)) {
            // tối đa 15 viên cho vừa màn hình; bài dài thì mỗi viên ứng với nhiều câu
            val bricks = minOf(total, 15).coerceAtLeast(1)
            val correct = state.correctSoFar
            BrickProgressBar(
                filled = (correct * bricks / total.coerceAtLeast(1)).coerceIn(0, bricks),
                total = bricks,
                brickWidth = 14.dp,
                brickHeight = 12.dp
            )
            Text(
                "Câu ${state.index + 1}/$total · đúng ${state.correctSoFar}",
                style = MaterialTheme.typography.labelMedium, color = c.inkSoft
            )
        }
    }
}

/** Nhãn mức khó của bài kiểm tra trình độ; Mai nhắc ở câu đầu mỗi mức (ADR-014). */
@Composable
private fun PlacementTip(tier: Int, showMai: Boolean) {
    val c = LinguaTheme.colors
    CozyTag(tierLabel(tier), Modifier.padding(top = 10.dp), icon = LinguaIcons.Target)
    if (!showMai) {
        return
    }
    ClayCard(Modifier.fillMaxWidth().padding(top = 8.dp), color = c.board, corner = 18.dp,
        contentPadding = PaddingValues(10.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            MaiPortrait(
                if (tier == 3) MaiMood.SURPRISED else MaiMood.ENCOURAGE,
                Modifier.size(44.dp)
            )
            Spacer(Modifier.width(10.dp))
            Text(
                "Mai: ${TutorialGuide.placementTip(tier)}",
                style = MaterialTheme.typography.bodyMedium, color = c.ink
            )
        }
    }
}

/**
 * Phần thân một câu hỏi: đề trên bảng phấn, câu có chỗ trống, gợi ý và chỗ trả lời (khối thạch
 * hoặc ô gõ). Không giữ trạng thái — dùng chung cho bài học, bài thi và sự kiện thành phố.
 */
@Composable
fun QuestionBody(
    item: LessonItem,
    /** S5: phương án Bơ đang chỉ (viền vàng nét đứt), có thể nhầm. */
    hintedOption: String? = null,
    chosen: String?,
    input: String,
    feedback: AnswerFeedback?,
    submitting: Boolean,
    onChoose: (String) -> Unit,
    onInput: (String) -> Unit,
    onSubmit: () -> Unit
) {
    val c = LinguaTheme.colors
    val question = item.question
    val enabled = feedback == null && !submitting

    // bảng phấn
    Box(
        Modifier
            .fillMaxWidth()
            .clay(Chalkboard, ChalkboardEdge, Color(0x22FFFFFF), c.clayShadow, 6.dp, 18.dp)
            .border(5.dp, c.wood, RoundedCornerShape(18.dp))
            .padding(horizontal = 18.dp, vertical = 16.dp)
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Text(
                question.text,
                style = MaterialTheme.typography.titleLarge,
                color = Chalk
            )
            question.sentence?.let { sentence ->
                Text(
                    sentence.replace("___", "_____"),
                    style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Medium),
                    color = Chalk.copy(alpha = 0.92f)
                )
            }
        }
    }
    question.hint?.let { hint ->
        Row(verticalAlignment = Alignment.CenterVertically) {
            LinguaIcon(LinguaIcons.BookOpen, null, Modifier.size(20.dp))
            Text(
                "Gợi ý: $hint",
                Modifier.padding(start = 6.dp),
                style = MaterialTheme.typography.bodyMedium, color = c.inkSoft
            )
        }
    }

    if (question.multipleChoice) {
        question.options.forEach { option ->
            AnswerBrick(option, chosen, feedback, enabled, hinted = option == hintedOption) {
                onChoose(option)
            }
        }
        return
    }
    OutlinedTextField(
        value = input,
        onValueChange = onInput,
        label = { Text("Gõ từ tiếng Anh") },
        singleLine = true,
        enabled = enabled,
        shape = RoundedCornerShape(16.dp),
        textStyle = LinguaTextStyles.button.copy(fontSize = 20.sp, color = c.ink),
        colors = OutlinedTextFieldDefaults.colors(
            focusedContainerColor = c.board, unfocusedContainerColor = c.board,
            disabledContainerColor = c.board,
            focusedBorderColor = c.cta, unfocusedBorderColor = c.line
        ),
        keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
        keyboardActions = KeyboardActions(onDone = { onSubmit() }),
        modifier = Modifier.fillMaxWidth()
    )
    if (feedback == null) {
        JellyButton(
            if (submitting) "Đang chấm…" else "Kiểm tra",
            onSubmit,
            enabled = input.isNotBlank() && !submitting,
            modifier = Modifier.fillMaxWidth()
        )
    }
}

/**
 * Đáp án dạng khối thạch: chạm thì lún và nảy; đáp án đúng chuyển xanh thạch, đáp án sai đã chọn
 * lắc 2 nhịp rồi đổi cam đất sét (concept §9.3).
 */
@Composable
private fun AnswerBrick(
    option: String,
    chosen: String?,
    feedback: AnswerFeedback?,
    enabled: Boolean,
    hinted: Boolean = false,
    onClick: () -> Unit
) {
    val c = LinguaTheme.colors
    val reduce = LocalReduceMotion.current
    val view = LocalView.current
    val isRight = feedback != null && option == feedback.correctAnswer
    val isWrongPick = feedback != null && !feedback.isCorrect && option == chosen
    val isPicked = feedback == null && option == chosen
    val (face, edge) = when {
        isRight -> c.jelly to c.jellyEdge
        isWrongPick -> c.clayError to c.clayErrorEdge
        isPicked -> c.gold to c.goldEdge
        else -> c.board to c.line
    }
    val shake = remember(option) { Animatable(0f) }
    LaunchedEffect(isWrongPick) {
        if (isWrongPick) {
            view.performHapticFeedback(HapticFeedbackConstants.LONG_PRESS)
            if (!reduce) {
                repeat(2) {
                    shake.animateTo(-8f, tween(38, easing = LinearEasing))
                    shake.animateTo(8f, tween(38, easing = LinearEasing))
                }
                shake.animateTo(0f, tween(30))
            }
        }
    }
    val interaction = remember { MutableInteractionSource() }
    val press = rememberPressProgress(interaction, if (enabled) HapticFeedbackConstants.KEYBOARD_TAP else null)
    Row(
        Modifier
            .fillMaxWidth()
            .graphicsLayer { translationX = shake.value * density }
            .then(
                if (hinted && feedback == null) {
                    Modifier.border(3.dp, c.gold, RoundedCornerShape(18.dp)).padding(3.dp)
                } else {
                    Modifier
                }
            )
            .clay(face, edge, c.whiteGlow, c.clayShadow, if (isWrongPick) 3.dp else 5.dp, 16.dp, press = press)
            .clickable(
                interactionSource = interaction, indication = null, enabled = enabled,
                role = Role.Button, onClick = onClick
            )
            .padding(horizontal = 16.dp, vertical = 14.dp)
            .semantics {
                contentDescription = when {
                    isRight -> "$option, đáp án đúng"
                    isWrongPick -> "$option, bạn đã chọn, chưa đúng"
                    else -> option
                }
            },
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            option,
            Modifier.weight(1f),
            style = LinguaTextStyles.button.copy(fontSize = 18.sp),
            color = if (face == c.board) c.ink else c.onFill
        )
        when {
            isRight -> LinguaIcon(LinguaIcons.CheckRound, null, Modifier.size(24.dp))
            isWrongPick -> LinguaIcon(LinguaIcons.Hammer, null, Modifier.size(22.dp))
        }
    }
}

/** S5: Giáo sư Echo cạnh bảng phấn, phản ứng theo kết quả. */
@Composable
private fun EchoRow(feedback: AnswerFeedback?, yawning: Boolean) {
    val c = LinguaTheme.colors
    val (mood, line) = when {
        feedback?.isCorrect == true -> EchoMood.PLEASED to "Hừm, chấp nhận được."
        feedback != null -> EchoMood.STERN to "Chưa đúng. Trò đọc kỹ lời giải thích."
        yawning -> EchoMood.YAWN to "Haaa… (ngáp)"
        else -> EchoMood.READ to "Trò đọc kỹ đề rồi hẵng chọn."
    }
    Row(verticalAlignment = Alignment.Bottom, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        EchoPortrait(mood, Modifier.size(72.dp), look = Offset(0.4f, 0.8f))
        SpeechBubble("Echo", line)
    }
}

/** S5: Gấu Bơ cạnh đáp án: nhắc bài (tối đa [MAX_HINTS] lần), mừng hoặc xin lỗi sau khi chấm. */
@Composable
private fun BoRow(state: LessonUiState, idle: Boolean, onAsk: () -> Unit) {
    val hint = state.hint
    val fb = state.feedback
    val (mood, line) = when {
        fb != null && hint?.kind == "POINT" && hint.option != fb.correctAnswer ->
            BoMood.SORRY to "Ối… tại hạ nhìn nhầm. Xin lỗi huynh đài!"
        fb?.isCorrect == true && hint != null -> BoMood.CHEER to "Thấy chưa! Tại hạ nhắc chuẩn mà!"
        fb?.isCorrect == true -> BoMood.CHEER to "Huynh giỏi quá, khỏi cần tại hạ nhắc!"
        fb != null -> BoMood.IDLE to "Không sao, tại hạ cũng hay sai câu này mà."
        hint?.kind == "POINT" -> BoMood.HINT to "Psst… lão sư không để ý, ô \"${hint.option}\" đó!"
        hint != null -> BoMood.HINT to buildString {
            append("Psst… chữ đầu là \"${hint.letter.orEmpty()}\"")
            hint.meaning?.let { append(", nghĩa là \"$it\"") }
            append(".")
        }
        idle -> BoMood.HINT to "Lão sư ngáp rồi… huynh có cần tại hạ nhắc không?"
        else -> BoMood.IDLE to "Hehe, tại hạ ngồi đây ăn bánh."
    }
    Row(
        Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.Bottom,
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            SpeechBubble("Bơ", line)
            if (fb == null && hint == null && state.hintsLeft > 0) {
                JellyButton(
                    if (state.hinting) "Bơ đang nghĩ…" else "Nhờ Bơ (còn ${state.hintsLeft})",
                    onAsk,
                    variant = if (idle) JellyVariant.Gold else JellyVariant.Secondary,
                    size = JellySize.Mini,
                    enabled = !state.hinting
                )
            }
        }
        BoPortrait(mood, Modifier.size(80.dp), look = Offset(-0.3f, -0.7f))
    }
}

@Composable
private fun SpeechBubble(name: String, text: String) {
    val c = LinguaTheme.colors
    Column(
        Modifier
            .clip(RoundedCornerShape(16.dp))
            .background(c.board)
            .border(1.5.dp, c.line, RoundedCornerShape(16.dp))
            .padding(horizontal = 12.dp, vertical = 8.dp)
    ) {
        Text(name, style = MaterialTheme.typography.labelMedium, color = c.woodDark)
        Text(text, style = MaterialTheme.typography.bodyMedium, color = c.ink)
    }
}

/**
 * Sheet sau khi trả lời. Đúng: lời khen + 1 viên gạch. Sai: tông cam đất sét dịu, đáp án đúng và
 * lời giải thích — câu sai được ghi để ôn lại (Xưởng bảo trì).
 */
@Composable
private fun FeedbackSheet(fb: AnswerFeedback, maiLine: String?, last: Boolean, onNext: () -> Unit) {
    val c = LinguaTheme.colors
    ClayCard(
        Modifier.fillMaxWidth(),
        color = if (fb.isCorrect) (if (c.isDark) Color(0xFF2F5A27) else Color(0xFFE5F3DC)) else c.clayErrorBg,
        edge = if (fb.isCorrect) c.jellyEdge else c.clayError,
        corner = 24.dp
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                MaiPortrait(if (fb.isCorrect) MaiMood.HAPPY else MaiMood.ENCOURAGE, Modifier.size(44.dp))
                Column(Modifier.padding(start = 10.dp).weight(1f)) {
                    Text(
                        if (fb.isCorrect) "Chính xác! +1 viên gạch" else "Ôi, suýt chút nữa là đúng rồi!",
                        style = MaterialTheme.typography.titleMedium, color = c.ink
                    )
                    maiLine?.let {
                        Text("Mai: $it", style = MaterialTheme.typography.bodySmall, color = c.inkSoft)
                    }
                }
            }
            if (!fb.isCorrect) {
                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("Đáp án:", style = MaterialTheme.typography.bodyMedium, color = c.ink)
                    Text(
                        fb.correctAnswer,
                        Modifier.clip(RoundedCornerShape(10.dp)).background(c.jelly).padding(horizontal = 10.dp, vertical = 3.dp),
                        style = LinguaTextStyles.button, color = c.onFill
                    )
                }
            }
            fb.explanation?.let { Text(it, style = MaterialTheme.typography.bodyMedium, color = c.ink) }
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("Mastery ${fb.masteryAfter}/${fb.maxMastery}", style = MaterialTheme.typography.labelMedium, color = c.inkSoft)
                Box(Modifier.weight(1f).height(10.dp).clip(RoundedCornerShape(5.dp)).background(c.dustGray)) {
                    Box(
                        Modifier.fillMaxWidth((fb.masteryAfter.toFloat() / fb.maxMastery.coerceAtLeast(1)).coerceIn(0f, 1f))
                            .height(10.dp).clip(RoundedCornerShape(5.dp)).background(c.sky)
                    )
                }
            }
            JellyButton(
                if (last) "Xem kết quả" else "Câu tiếp",
                onNext,
                variant = if (fb.isCorrect) JellyVariant.Success else JellyVariant.Primary,
                modifier = Modifier.fillMaxWidth()
            )
        }
    }
}

@Composable
private fun ResultView(result: LessonResult, achievementNames: List<String>, onExit: () -> Unit) {
    val c = LinguaTheme.colors
    Column(
        Modifier.fillMaxSize().verticalScroll(rememberScrollState()),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        Spacer(Modifier.height(16.dp))
        Text(
            when {
                result.placement -> "Kết quả kiểm tra trình độ"
                result.isEvent -> "Kết quả giúp cư dân"
                result.isPractice -> "Kết quả luyện tập"
                else -> "Tan ca! Lương hôm nay"
            },
            style = MaterialTheme.typography.titleLarge, color = c.ink,
            modifier = Modifier.staggeredAppear(0)
        )
        CozyBubbleText(
            "${result.correct}/${result.total}",
            Modifier.staggeredAppear(1, stepMillis = 90),
            fontSize = 56.sp
        )
        Row(
            Modifier.staggeredAppear(2, stepMillis = 90),
            verticalAlignment = Alignment.CenterVertically
        ) {
            MaiPortrait(MaiMood.HAPPY, Modifier.size(48.dp))
            Text(
                "Mai: ${MaiLines.forResult(result.correct, result.total)}",
                Modifier.padding(start = 10.dp),
                style = MaterialTheme.typography.bodyMedium, color = c.ink
            )
        }
        KnowledgeCard(result, Modifier.staggeredAppear(3, stepMillis = 90))
        if (result.isEvent) {
            EventRewardCard(result, Modifier.staggeredAppear(4, stepMillis = 90))
        } else if (result.collectionTotal > 0) {
            CollectionCard(result, Modifier.staggeredAppear(4, stepMillis = 90))
        }
        NewAchievements(achievementNames, firstIndex = 5)
        JellyButton(
            "Về thành phố", onExit, size = JellySize.Large,
            leadingIcon = LinguaIcons.HomeTown, modifier = Modifier.fillMaxWidth()
        )
    }
}

/** KP nhận được dạng thẻ thưởng: phần cơ bản + thưởng, và lời nhắc khi đã qua số bài đủ KP. */
@Composable
private fun KnowledgeCard(result: LessonResult, modifier: Modifier) {
    val c = LinguaTheme.colors
    ClayCard(modifier.fillMaxWidth(), color = c.board, corner = 20.dp) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            LinguaIcon(LinguaIcons.Coin, null, Modifier.size(44.dp))
            Column(Modifier.padding(start = 12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text("+${result.kpAwarded} KP", style = MaterialTheme.typography.headlineSmall, color = c.ink)
                if (result.kpBase != null && result.kpBonus != null) {
                    val bonusLabel = if (result.placement) "quà chào mừng" else "thưởng"
                    Text("${result.kpBase} + ${result.kpBonus} $bonusLabel", style = MaterialTheme.typography.bodySmall, color = c.inkSoft)
                }
                if ((result.dailyMultiplier ?: 1.0) < 1.0) {
                    Text(
                        "Bài thứ ${result.dailySessionIndex} hôm nay: KP còn ×${result.dailyMultiplier}. " +
                            "Mai vẫn ghi nhận Mastery đầy đủ nhé!",
                        style = MaterialTheme.typography.bodySmall, color = c.inkSoft
                    )
                }
                Text("Ví: ${result.knowledgePoints} KP", style = MaterialTheme.typography.labelMedium, color = c.inkSoft)
            }
        }
    }
}

/** Sự kiện thành phố: đúng đủ số câu thì nhận mảnh bản vẽ (ADR-015 §5). */
@Composable
private fun EventRewardCard(result: LessonResult, modifier: Modifier) {
    val c = LinguaTheme.colors
    ClayCard(modifier.fillMaxWidth(), color = c.board, corner = 20.dp) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            LinguaIcon(LinguaIcons.BlueprintShard, null, Modifier.size(40.dp))
            Text(
                if (result.eventResolved == true) "Cảm ơn bạn! +${result.shardsAwarded ?: 0} mảnh bản vẽ"
                else "Chưa đủ rồi, thử lại sự kiện này nhé!",
                Modifier.padding(start = 12.dp),
                style = MaterialTheme.typography.titleSmall, color = c.ink
            )
        }
    }
}

@Composable
private fun CollectionCard(result: LessonResult, modifier: Modifier) {
    val c = LinguaTheme.colors
    ClayCard(modifier.fillMaxWidth(), color = c.board, corner = 20.dp) {
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                LinguaIcon(LinguaIcons.Brick, null, Modifier.size(32.dp))
                Text(
                    "Bộ sưu tầm Lv ${result.collectionLevel}: ${result.collected}/${result.collectionTotal} từ",
                    Modifier.padding(start = 10.dp),
                    style = MaterialTheme.typography.titleSmall, color = c.ink
                )
            }
            val bricks = 10
            val filled = if (result.collectionTotal == 0) 0 else result.collected * bricks / result.collectionTotal
            BrickProgressBar(filled.coerceIn(0, bricks), bricks, brickWidth = 24.dp)
        }
    }
}

@Composable
private fun NewAchievements(names: List<String>, firstIndex: Int) {
    if (names.isEmpty()) {
        return
    }
    val c = LinguaTheme.colors
    Text("Danh hiệu mới", style = MaterialTheme.typography.titleMedium, color = c.ink)
    names.forEachIndexed { index, name ->
        Row(
            Modifier
                .staggeredAppear(firstIndex + index, stepMillis = 120)
                .clip(RoundedCornerShape(14.dp))
                .background(Brand.Gold.copy(alpha = 0.25f))
                .padding(horizontal = 14.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            LinguaIcon(LinguaIcons.Star, null, Modifier.size(22.dp))
            Text(name, Modifier.padding(start = 8.dp), style = MaterialTheme.typography.titleSmall, color = c.ink)
        }
    }
}

@Composable
private fun ProblemView(
    problem: LessonProblem,
    message: String?,
    onRetry: () -> Unit,
    onExit: () -> Unit
) {
    val (title, body, retry) = when (problem) {
        LessonProblem.OFFLINE -> Triple(
            "Mất kết nối",
            "Bài học cần mạng để Mai chấm điểm. Câu bạn đang làm vẫn được giữ — có mạng rồi bấm " +
            "Thử lại nhé.",
            "Thử lại"
        )
        LessonProblem.EXPIRED -> Triple(
            "Bài học đã hết hạn",
            "Bài học chỉ giữ trong 30 phút. Mastery của các câu đã làm vẫn được lưu, nhưng không " +
            "có KP cuối bài. Làm bài mới nhé?",
            "Bắt đầu bài mới"
        )
        LessonProblem.NO_CONTENT -> Triple(
            "Chưa có bài học",
            "Công trình này chưa có từ vựng. Mai sẽ báo bạn khi có nội dung mới!",
            null
        )
        LessonProblem.INVALID_STEP -> Triple("Chưa tới bước này", message ?: "", null)
        LessonProblem.DAILY_LIMIT -> Triple(
            "Hết lượt hôm nay",
            "Bạn đã dùng hết lượt luyện tập kiểu này hôm nay. Mai mở lại lúc 0 giờ nhé!",
            null
        )
        LessonProblem.CLOSED -> Triple(
            "Đã xong rồi",
            "Việc này đã được giải quyết. Quay lại thành phố xem việc khác nhé!",
            null
        )
        LessonProblem.OTHER -> Triple(
            "Có lỗi xảy ra",
            message ?: "Thử lại sau ít phút nhé.",
            "Thử lại"
        )
    }
    val c = LinguaTheme.colors
    Column(
        Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.spacedBy(16.dp, Alignment.CenterVertically),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        MaiPortrait(MaiMood.WORRIED, Modifier.size(72.dp))
        Text(title, style = MaterialTheme.typography.titleLarge, color = c.ink)
        Text(body, textAlign = TextAlign.Center, color = c.ink)
        retry?.let { JellyButton(it, onRetry) }
        JellyButton("Về thành phố", onExit, variant = JellyVariant.Secondary)
    }
}

private fun tierLabel(tier: Int) = when (tier) {
    1 -> "Mức 1 · Nhận nghĩa"
    2 -> "Mức 2 · Điền từ có gợi ý"
    else -> "Mức 3 · Điền từ theo ngữ cảnh"
}
