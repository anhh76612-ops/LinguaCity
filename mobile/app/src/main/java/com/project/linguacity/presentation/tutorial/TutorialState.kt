package com.project.linguacity.presentation.tutorial

data class TutorialState(
    val currentStep: Int = 0,
    val isSubmitting: Boolean = false,
    val isCompleted: Boolean = false,
    val error: String? = null
) {
    val isLastStep: Boolean
        get() = currentStep == TutorialSteps.all.lastIndex
}

/**
 * Nội dung tạm thời, lấy từ Core Loop trong GDD §3.
 * Nội dung chính thức chốt ở GDD §3.2.
 */
object TutorialSteps {
    val all = listOf(
        "Học từ vựng" to "Mỗi công trình có một chủ đề. Học từ vựng để thu thập thẻ.",
        "Thi sát hạch" to "Thu thập đủ thẻ để mở bài thi tại Trường học. Vượt qua để nhận Bản vẽ.",
        "Xây thành phố" to "Dùng Bản vẽ và Điểm Tri Thức để nâng cấp công trình."
    )
}
