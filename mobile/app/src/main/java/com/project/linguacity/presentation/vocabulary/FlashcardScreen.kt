package com.project.linguacity.presentation.vocabulary

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.project.linguacity.domain.model.content.Vocabulary
import com.project.linguacity.ui.loading.DelayedLoading
import com.project.linguacity.ui.loading.LoadingKind
import com.project.linguacity.ui.motion.sharedCard

/**
 * SCR-07 Flashcard (UC_04): vuốt ngang qua các thẻ, chạm để lật (mặt trước: từ + IPA; mặt sau: nghĩa + ví dụ).
 * Xem thẻ KHÔNG đổi Mastery (BR-LEARN-06). Chạy offline vì chỉ đọc Room.
 */
@OptIn(ExperimentalFoundationApi::class)
@Composable
fun FlashcardScreen(
    startIndex: Int,
    onBack: () -> Unit,
    viewModel: VocabularyViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsState()

    Column(Modifier.fillMaxSize().statusBarsPadding().padding(16.dp)) {
        TextButton(onClick = onBack) { Text("‹ Danh sách") }
        if (state.words.isEmpty()) {
            DelayedLoading(LoadingKind.CARDS)
            return@Column
        }
        val pager = rememberPagerState(initialPage = startIndex.coerceIn(0, state.words.lastIndex)) { state.words.size }
        Text(
            "${pager.currentPage + 1} / ${state.words.size}",
            style = MaterialTheme.typography.labelLarge,
            modifier = Modifier.align(Alignment.CenterHorizontally)
        )
        HorizontalPager(
            state = pager,
            contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 24.dp),
            pageSpacing = 16.dp,
            modifier = Modifier.fillMaxWidth().weight(1f)
        ) { page ->
            FlipCard(state.words[page])
        }
        Text(
            "Chạm để lật thẻ · vuốt để sang thẻ khác",
            style = MaterialTheme.typography.bodySmall,
            modifier = Modifier.align(Alignment.CenterHorizontally).padding(top = 8.dp)
        )
    }
}

@Composable
private fun FlipCard(word: Vocabulary) {
    var flipped by rememberSaveable(word.id) { mutableStateOf(false) }
    val rotation by animateFloatAsState(if (flipped) 180f else 0f, tween(400), label = "flip")

    Box(Modifier.fillMaxSize(), Alignment.Center) {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .aspectRatio(0.7f)
                .sharedCard("word-${word.id}") // thẻ trong danh sách "bay" tới đây (shared element)
                .graphicsLayer {
                    rotationY = rotation
                    cameraDistance = 12f * density
                }
                .clickable { flipped = !flipped },
            elevation = CardDefaults.cardElevation(6.dp)
        ) {
            // Qua 90° thì đổi sang mặt sau và lật ngược nội dung lại để chữ không bị soi gương.
            val showBack = rotation > 90f
            Column(
                Modifier.fillMaxSize().padding(24.dp).graphicsLayer { if (showBack) rotationY = 180f },
                verticalArrangement = Arrangement.spacedBy(12.dp, Alignment.CenterVertically),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                if (!showBack) {
                    Text(word.word, style = MaterialTheme.typography.displaySmall, fontWeight = FontWeight.Bold)
                    word.ipa?.let { Text(it, style = MaterialTheme.typography.titleMedium) }
                    Text(word.wordType.lowercase(), style = MaterialTheme.typography.labelMedium, fontStyle = FontStyle.Italic)
                } else {
                    Text(word.meaning, style = MaterialTheme.typography.headlineSmall, textAlign = TextAlign.Center)
                    word.examples.forEach {
                        Text("“$it”", style = MaterialTheme.typography.bodyMedium, textAlign = TextAlign.Center, fontStyle = FontStyle.Italic)
                    }
                }
            }
        }
    }
}
