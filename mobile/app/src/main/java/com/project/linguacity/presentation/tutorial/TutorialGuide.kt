package com.project.linguacity.presentation.tutorial

/**
 * Kịch bản tutorial thư ký Mai (ADR-014, UC_02 §4.2b). Hàm thuần: từ bước server + trạng thái thành
 * phố
 * → những câu Mai nói, nút nào được khoanh sáng, và hành động ở câu cuối. Test được trên JVM
 * (TutorialGuideTest).
 */
enum class MaiMood { GREET, HAPPY, ENCOURAGE, SURPRISED }

enum class GuideAction {
    NONE,
    START_PLACEMENT,
    RESUME_PLACEMENT,
    START_LESSON,
    BUILD,
    ENTER_HOUSE,
    FINISH_CUSTOMIZE,
    FINISH_TUTORIAL,
    /** Xem lại tour từ Cài đặt — chỉ phía app, không đổi bước server. */
    FINISH_REPLAY
}

/** Khoá các phần tử có thể được khoanh sáng (đăng ký bằng Modifier.spotlightTarget). */
object SpotKeys {
    const val LEARN = "learn"
    const val BUILD = "build"
    const val KP = "kp"
    const val ACHIEVEMENTS = "achievements"
    const val CARD = "card"
    const val VOCAB = "vocab"
    const val MENU = "menu"
}

data class GuideLine(val text: String, val mood: MaiMood, val target: String? = null)

data class GuideScript(
    /** Đổi id → overlay quay về câu đầu. Cùng id (vd. KP tăng) thì giữ nguyên câu đang đọc. */
    val id: String,
    val lines: List<GuideLine>,
    val action: GuideAction,
    val actionLabel: String?,
    /** Mai tự mở thẻ House để chỉ vào nút Học / Xây. */
    val selectHousing: Boolean = false
)

data class GuideContext(
    val step: String,
    val collected: Int,
    val requiredCollected: Int,
    val knowledgePoints: Int,
    val buildCost: Int,
    val houseLevel: Int,
    val houseUpgrading: Boolean
)

object TutorialGuide {

    fun script(ctx: GuideContext): GuideScript? = when (ctx.step) {
        "INTRO" -> GuideScript(
            id = "intro",
            lines = listOf(
                GuideLine("Chào bạn! Mình là Mai, thư ký của thành phố LinguaCity.", MaiMood.GREET),
                GuideLine(
                    "Ở đây, mỗi từ tiếng Anh bạn học được sẽ giúp thành phố lớn lên. Bây giờ cả " +
                    "4 lô đất vẫn đang trống trơn.",
                    MaiMood.HAPPY
                ),
                GuideLine(
                    "Mình làm một bài kiểm tra trình độ nho nhỏ trước nhé: 30 câu về nhà cửa và " +
                    "sinh hoạt, khó dần lên. Từ nào bạn trả lời đúng sẽ vào bộ sưu tầm luôn!",
                    MaiMood.ENCOURAGE
                )
            ),
            action = GuideAction.START_PLACEMENT, actionLabel = "Bắt đầu kiểm tra"
        )
        "PLACEMENT" -> GuideScript(
            id = "placement",
            lines = listOf(GuideLine(
                "Bài kiểm tra trình độ vẫn đang chờ bạn đó. Làm tiếp nhé, Mai giữ nguyên chỗ bạn " +
                "đang làm dở!",
                MaiMood.ENCOURAGE
            )),
            action = GuideAction.RESUME_PLACEMENT, actionLabel = "Làm tiếp"
        )
        "LEARN_HOUSE" -> GuideScript(
            id = "learn-house",
            lines = listOf(
                GuideLine(
                    "Kết quả đẹp lắm! Giờ mình cùng xây ngôi nhà đầu tiên — Housing.",
                    MaiMood.HAPPY,
                    SpotKeys.CARD
                ),
                GuideLine(
                    "Trước khi xây, học một bài ngắn ở đây nhé: 20 câu, Mai ưu tiên những từ bạn " +
                    "chưa thuộc.",
                    MaiMood.ENCOURAGE,
                    SpotKeys.LEARN
                )
            ),
            action = GuideAction.START_LESSON, actionLabel = "Học ngay", selectHousing = true
        )
        "BUILD_HOUSE" -> buildHouse(ctx)
        "ENTER_HOUSE" -> GuideScript(
            id = "enter-house",
            lines = listOf(
                GuideLine("Ngôi nhà đầu tiên của bạn xong rồi kìa!", MaiMood.SURPRISED),
                GuideLine("Vào bên trong xem thử nhé.", MaiMood.HAPPY)
            ),
            action = GuideAction.ENTER_HOUSE, actionLabel = "Vào nhà"
        )
        "CUSTOMIZE" -> GuideScript(
            id = "customize",
            lines = listOf(
                GuideLine(
                    "Bên trong vẫn còn trống. Lát nữa bạn sẽ được chọn ngoại hình nhân vật, màu " +
                    "tường và sàn ở đây.",
                    MaiMood.GREET
                )
            ),
            action = GuideAction.FINISH_CUSTOMIZE, actionLabel = "Tiếp tục"
        )
        "TOUR" -> GuideScript(
            id = "tour",
            lines = listOf(
                GuideLine(
                    "Đây là Điểm Tri Thức (KP). Học càng chăm, càng nhiều KP để xây và nâng cấp.",
                    MaiMood.HAPPY,
                    SpotKeys.KP
                ),
                GuideLine(
                    "Còn đây là menu: Thẻ từ, Danh hiệu, Hồ sơ và Cài đặt. Danh hiệu có loại dễ, " +
                    "loại khó, và cả… loại ẩn nữa đó!",
                    MaiMood.SURPRISED,
                    SpotKeys.MENU
                ),
                GuideLine(
                    "Chạm vào một công trình để Học, Xây hoặc lật Thẻ từ. Thẻ từ xem được cả khi " +
                    "không có mạng.",
                    MaiMood.ENCOURAGE,
                    SpotKeys.VOCAB
                ),
                GuideLine(
                    "Các công trình khác sẽ mở dần khi có bài học mới. Chúc bạn xây một thành " +
                    "phố thật đẹp nha!",
                    MaiMood.GREET
                )
            ),
            action = GuideAction.FINISH_TUTORIAL, actionLabel = "Bắt đầu chơi", selectHousing = true
        )
        else -> null // DONE hoặc bước lạ: không hiện Mai
    }

    /** Tour chạy lại từ Cài đặt (người chơi đã DONE). */
    fun replayTour(): GuideScript {
        val tour = script(GuideContext("TOUR", 0, 0, 0, 0, 0, false))!!
        return tour.copy(
            id = "tour-replay",
            action = GuideAction.FINISH_REPLAY,
            actionLabel = "Đã hiểu"
        )
    }

    private fun buildHouse(ctx: GuideContext): GuideScript {
        if (ctx.houseUpgrading) {
            return GuideScript(
                id = "build-waiting",
                lines = listOf(GuideLine(
                    "Thợ đang xây rồi… chỉ khoảng 10 giây thôi, đợi Mai chút nhé!",
                    MaiMood.HAPPY,
                    SpotKeys.CARD
                )),
                action = GuideAction.NONE, actionLabel = null, selectHousing = true
            )
        }
        val missingWords = (ctx.requiredCollected - ctx.collected).coerceAtLeast(0)
        val missingKp = (ctx.buildCost - ctx.knowledgePoints).coerceAtLeast(0)
        if (missingWords == 0 && missingKp == 0) {
            return GuideScript(
                id = "build-ready",
                lines = listOf(
                    GuideLine(
                        "Bạn đã sưu tầm ${ctx.collected} thẻ từ (cần ${ctx.requiredCollected}) " +
                        "và có ${ctx.knowledgePoints} KP — đủ để xây rồi!",
                        MaiMood.HAPPY,
                        SpotKeys.CARD
                    ),
                    GuideLine("Bấm Xây nào!", MaiMood.ENCOURAGE, SpotKeys.BUILD)
                ),
                action = GuideAction.BUILD, actionLabel = "Xây nhà", selectHousing = true
            )
        }
        val need = buildList {
            if (missingWords > 0) {
                add("$missingWords thẻ từ")
            }
            if (missingKp > 0) {
                add("$missingKp KP")
            }
        }.joinToString(" và ")
        return GuideScript(
            id = "build-learn-more",
            lines = listOf(GuideLine(
                "Còn thiếu $need nữa là xây được. Mình học thêm một bài nhé!",
                MaiMood.ENCOURAGE,
                SpotKeys.LEARN
            )),
            action = GuideAction.START_LESSON, actionLabel = "Học thêm", selectHousing = true
        )
    }

    /** Lời Mai nói trong bài kiểm tra trình độ khi chuyển sang mức khó mới (câu 1, 11, 21). */
    fun placementTip(tier: Int): String = when (tier) {
        1 -> "Mức 1: chọn nghĩa đúng của từ. Khởi động nhẹ nhàng thôi!"
        2 -> "Mức 2: giờ thử gõ từ tiếng Anh nhé, Mai có gợi ý chữ cái đầu và cuối."
        else -> "Mức 3: không còn gợi ý nữa, đọc kỹ câu và cẩn thận mấy từ na ná nhau nha!"
    }
}
