package com.project.linguacity.ui.motion

import androidx.compose.animation.AnimatedVisibilityScope
import androidx.compose.animation.ExperimentalSharedTransitionApi
import androidx.compose.animation.SharedTransitionScope
import androidx.compose.runtime.compositionLocalOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.composed

/*
 * Shared Element Transition (FR-UI-04): thẻ từ trong danh sách "bay" vào vị trí flashcard.
 * AppNavHost bọc NavHost bằng SharedTransitionLayout và cung cấp hai scope này cho các màn cần.
 */

@OptIn(ExperimentalSharedTransitionApi::class)
val LocalSharedScope = compositionLocalOf<SharedTransitionScope?> { null }

val LocalNavAnimScope = compositionLocalOf<AnimatedVisibilityScope?> { null }

/**
 * Gắn phần tử vào cặp chuyển cảnh dùng chung có khoá [key]. Không có scope / tắt hiệu ứng thì bỏ
 * qua.
 */
@OptIn(ExperimentalSharedTransitionApi::class)
fun Modifier.sharedCard(key: String): Modifier = composed {
    val shared = LocalSharedScope.current
    val anim = LocalNavAnimScope.current
    if (shared == null || anim == null || LocalReduceMotion.current) {
        this
    }
    else with(shared) { this@composed.sharedBounds(rememberSharedContentState(key), anim) }
}
