package com.project.linguacity.presentation.lesson

/**
 * Lời phản hồi của thư ký Mai sau mỗi câu — viết như người thật nói, không máy móc (yêu cầu người
 * dùng).
 * Chọn theo {@code seed} (số câu) để không đổi câu khi màn hình vẽ lại.
 * Ghi chú tương lai (future-expansion §6, mục 3): AI viết lời giải thích theo đúng câu sai của
 * người chơi.
 */
object MaiLines {

    private val correct = listOf(
        "Chuẩn luôn!",
        "Đúng rồi, giỏi ghê!",
        "Chính xác! Bạn nhớ từ này rồi đó.",
        "Tuyệt vời, cứ thế phát huy nhé!",
        "Quá đỉnh!",
        "Đúng rồi nè, nhanh ghê."
    )

    private val wrong = listOf(
        "Tiếc ghê, suýt nữa thôi.",
        "Chưa đúng, nhưng không sao — đọc giải thích là nhớ liền.",
        "Từ này hơi lắt léo, mình xem lại nhé.",
        "Sai một chút thôi, lần sau chắc chắn được!",
        "Đừng nản nha, ai mới học cũng nhầm chỗ này."
    )

    fun forAnswer(isCorrect: Boolean, streak: Int, collectedNow: Boolean, seed: Int): String {
        val base = (if (isCorrect) correct else wrong).let { it[Math.floorMod(
            seed * 7 + 3,
            it.size
        )] }
        val extra = buildList {
            if (isCorrect && streak >= 3 && streak % 5 != 0) {
                add("$streak câu liền rồi đó!")
            }
            if (isCorrect && streak > 0 && streak % 5 == 0) {
                add("Chuỗi $streak câu đúng, đỉnh thật sự!")
            }
            if (collectedNow) {
                add("Thêm một thẻ mới vào bộ sưu tầm 🎴")
            }
        }
        return (listOf(base) + extra).joinToString(" ")
    }

    fun forResult(correct: Int, total: Int): String {
        val ratio = if (total == 0) 0.0 else correct.toDouble() / total
        return when {
            ratio >= 1.0 -> "Không sai câu nào! Mình phải ghi tên bạn lên bảng vàng mới được."
            ratio >= 0.8 -> "Làm tốt lắm! Thành phố đang lớn lên nhờ bạn đó."
            ratio >= 0.5 -> "Ổn rồi! Ôn thêm chút nữa là nhớ hết thôi."
            else -> "Khởi đầu nào cũng khó. Mình học lại lần nữa nhé, Mai ở đây với bạn."
        }
    }
}
