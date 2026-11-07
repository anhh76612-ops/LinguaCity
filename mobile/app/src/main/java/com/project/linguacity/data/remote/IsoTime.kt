package com.project.linguacity.data.remote

import java.util.Calendar
import java.util.TimeZone

/**
 * Đọc thời gian ISO-8601 UTC của server ("2026-11-07T18:57:23.525205Z") thành epoch millis.
 * Tự viết vì minSdk 24 chưa có java.time.Instant (cần API 26 hoặc desugaring).
 */
object IsoTime {
    private val pattern = Regex("""^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?Z$""")

    fun parseMillis(text: String?): Long? {
        val m = pattern.matchEntire(text ?: return null) ?: return null
        val (y, mo, d, h, mi, s) = m.destructured
        val calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC")).apply {
            clear()
            set(y.toInt(), mo.toInt() - 1, d.toInt(), h.toInt(), mi.toInt(), s.toInt())
        }
        val fraction = m.groupValues[7].padEnd(3, '0').take(3).toInt()
        return calendar.timeInMillis + fraction
    }
}
