package com.project.linguacity.presentation.tutorial

import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.runtime.snapshots.SnapshotStateMap
import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.geometry.Rect
import androidx.compose.ui.layout.boundsInRoot
import androidx.compose.ui.layout.onGloballyPositioned

/**
 * Sổ ghi vị trí các phần tử có thể được Mai khoanh sáng (spotlight). Phần tử tự đăng ký bằng
 * [spotlightTarget]; overlay đọc vị trí theo khoá (SpotKeys).
 */
class SpotlightRegistry {
    val rects: SnapshotStateMap<String, Rect> = mutableStateMapOf()
}

val LocalSpotlight = staticCompositionLocalOf<SpotlightRegistry?> { null }

@Composable
fun rememberSpotlightRegistry() = remember { SpotlightRegistry() }

fun Modifier.spotlightTarget(key: String): Modifier = composed {
    val registry = LocalSpotlight.current
    if (registry == null) this else this.onGloballyPositioned { registry.rects[key] = it.boundsInRoot() }
}
