package com.project.linguacity.ui.icons

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.addPathNodes
import androidx.compose.ui.unit.dp
import com.project.linguacity.ui.theme.Brand

/*
 * Bộ icon đất sét duotone (concept §9.5), lưới 24dp, thay cho emoji. Mỗi icon có lớp bóng đậm ở
 * dưới và vệt sáng ở trên, giống khối đất sét. Màu cố định theo thương hiệu, không tint theo theme.
 * Dùng: `LinguaIcon(LinguaIcons.Coin, "Vàng")` hoặc `Image(LinguaIcons.Coin, …)`.
 */

private val White = Color(0xFFFFFFFF)
private val Glow = Color(0x99FFFFFF)

internal class IconScope(private val builder: ImageVector.Builder) {
    fun path(
        d: String,
        fill: Color? = null,
        stroke: Color? = null,
        width: Float = 0f,
        alpha: Float = 1f
    ) {
        builder.addPath(
            pathData = addPathNodes(d),
            fill = fill?.let { SolidColor(it) },
            fillAlpha = alpha,
            stroke = stroke?.let { SolidColor(it) },
            strokeAlpha = alpha,
            strokeLineWidth = width,
            strokeLineCap = StrokeCap.Round,
            strokeLineJoin = StrokeJoin.Round
        )
    }

    fun circle(cx: Float, cy: Float, r: Float, fill: Color? = null, stroke: Color? = null, width: Float = 0f) =
        ellipse(cx, cy, r, r, fill, stroke, width)

    fun ellipse(
        cx: Float, cy: Float, rx: Float, ry: Float,
        fill: Color? = null, stroke: Color? = null, width: Float = 0f
    ) = path(
        "M${cx - rx},${cy}a$rx,$ry 0 1,0 ${2 * rx},0a$rx,$ry 0 1,0 ${-2 * rx},0Z",
        fill, stroke, width
    )

    fun rect(
        x: Float, y: Float, w: Float, h: Float, r: Float = 0f,
        fill: Color? = null, stroke: Color? = null, width: Float = 0f
    ) {
        val rr = r.coerceAtMost(minOf(w, h) / 2)
        path(
            if (rr == 0f) "M$x,${y}h${w}v${h}h${-w}Z"
            else "M${x + rr},${y}h${w - 2 * rr}a$rr,$rr 0 0 1 $rr,${rr}v${h - 2 * rr}" +
                "a$rr,$rr 0 0 1 ${-rr},${rr}h${-(w - 2 * rr)}a$rr,$rr 0 0 1 ${-rr},${-rr}" +
                "v${-(h - 2 * rr)}a$rr,$rr 0 0 1 $rr,${-rr}Z",
            fill, stroke, width
        )
    }

    fun polygon(vararg points: Float, fill: Color) {
        val d = StringBuilder("M${points[0]},${points[1]}")
        for (i in 2 until points.size step 2) d.append("L${points[i]},${points[i + 1]}")
        path(d.append('Z').toString(), fill)
    }
}

internal fun icon(name: String, viewport: Float = 24f, block: IconScope.() -> Unit): ImageVector {
    val builder = ImageVector.Builder(name, 24.dp, 24.dp, viewport, viewport)
    IconScope(builder).block()
    return builder.build()
}

object LinguaIcons {

    // ---------- Tài nguyên ----------

    /** 🪙 Vàng (KP). */
    val Coin by lazy {
        icon("Coin") {
            circle(12f, 13f, 9f, Brand.GoldEdge)
            circle(12f, 11.5f, 9f, Brand.Gold)
            circle(12f, 11.5f, 5.5f, stroke = Brand.GoldEdge, width = 1.6f)
            path("M8,7.5a5,5 0 0 1 4,-2", stroke = Glow, width = 1.6f)
        }
    }

    /** 🧱 Gạch: từ học mới. */
    val Brick by lazy {
        icon("Brick") {
            rect(3f, 8f, 18f, 11f, 2.5f, Brand.BrickEdge)
            rect(3f, 6f, 18f, 11f, 2.5f, Brand.Brick)
            path("M3,11.5h18M10,6v5.5M14,11.5v5.5", stroke = Brand.BrickEdge, width = 1.4f)
            path("M5.5,8h4", stroke = Glow, width = 1.4f)
        }
    }

    /** 🪵 Gỗ: từ ôn tập. */
    val Wood by lazy {
        icon("Wood") {
            rect(3f, 7f, 15f, 10f, 5f, Brand.WoodDark)
            rect(3f, 7f, 13f, 10f, 5f, Brand.Wood)
            ellipse(17f, 12f, 4f, 5f, Brand.WoodPale)
            ellipse(17f, 12f, 2f, 2.6f, stroke = Brand.WoodDark, width = 1.2f)
            path("M5.5,9.5h6", stroke = Glow, width = 1.3f)
        }
    }

    /** ⚡ Năng lượng. */
    val Bolt by lazy {
        icon("Bolt") {
            path("M13.5,2L5,13.5h6l-1.5,8.5L19,10h-6Z", Brand.JellyEdge)
            path("M13,1.5L5,12.5h6L9.8,20L18,9.5h-6Z", Brand.Jelly)
        }
    }

    /** ⭐ XP / Town Level. */
    val Star by lazy {
        icon("Star") {
            path(
                "M12,3.5l2.6,5.3l5.9,0.9l-4.3,4.1l1,5.8L12,16.9l-5.2,2.7l1,-5.8l-4.3,-4.1l5.9,-0.9Z",
                Brand.Gold, Brand.GoldEdge, 1.4f
            )
        }
    }

    /** ⏳ Đồng hồ cát: tăng tốc xây. */
    val Hourglass by lazy {
        icon("Hourglass") {
            rect(5f, 2.5f, 14f, 3f, 1.5f, Brand.WoodDark)
            rect(5f, 18.5f, 14f, 3f, 1.5f, Brand.WoodDark)
            path(
                "M7,5.5h10c0,4 -5,4.5 -5,6.5s5,2.5 5,6.5H7c0,-4 5,-4.5 5,-6.5S7,9.5 7,5.5Z",
                Brand.SkyPale, Brand.SkyEdge, 1.3f
            )
            path("M9,17.5h6l-3,-3Z", Brand.Gold)
        }
    }

    /** 📐 Bản vẽ công trình (có được khi thi đạt). */
    val Blueprint by lazy {
        icon("Blueprint") {
            rect(3f, 4f, 18f, 16f, 2.5f, Brand.SkyEdge)
            rect(3f, 4f, 18f, 14f, 2.5f, Brand.Sky)
            path("M6,14l3,-5l3,3l2,-2l4,4", stroke = White, width = 1.5f)
            path("M6,7h5", stroke = White, width = 1.4f)
        }
    }

    /** 🧩 Mảnh bản vẽ: vật liệu tiêu hao khi thi công. */
    val BlueprintShard by lazy {
        icon("BlueprintShard") {
            path("M4,6l9,-2l2,4l5,1l-2,11l-10,1l-2,-5l2,-4Z", Brand.SkyEdge)
            path("M4,5l9,-2l2,4l5,1l-2,10l-10,1l-2,-5l2,-4Z", Brand.Sky)
            path("M8,13l2.5,-3l2,2l3,-3", stroke = White, width = 1.4f)
        }
    }

    // ---------- Học tập ----------

    /** 🔥 Chuỗi ngày. */
    val Flame by lazy {
        icon("Flame") {
            path("M12,2.5c1,3.5 5.5,5.5 5.5,10.5a5.5,5.5 0 0 1 -11,0c0,-2.5 1.5,-4 2.5,-5c0,2 1,3 2,3c0,-3 0,-6 1,-8.5Z", Brand.Brick)
            path("M12,10c0.6,2 3,3 3,5.5a3,3 0 0 1 -6,0c0,-1.5 1,-2.5 1.6,-3c0.2,1 0.7,1.5 1.4,1.5c-0.3,-1.5 -0.4,-2.8 0,-4Z", Brand.Gold)
        }
    }

    /** 📖 Sổ tay từ vựng. */
    val BookOpen by lazy {
        icon("BookOpen") {
            path("M2.5,6c3,-1.5 6,-1.5 9.5,1v13c-3.5,-2.5 -6.5,-2.5 -9.5,-1Z", Brand.Sky, Brand.SkyEdge, 1.2f)
            path("M21.5,6c-3,-1.5 -6,-1.5 -9.5,1v13c3.5,-2.5 6.5,-2.5 9.5,-1Z", Brand.SkyPale, Brand.SkyEdge, 1.2f)
            path("M15,10c1.5,-0.6 3,-0.6 4.5,0M15,13c1.5,-0.6 3,-0.6 4.5,0", stroke = Brand.SkyEdge, width = 1.1f)
        }
    }

    /** 🎯 Mục tiêu ngày: bia gỗ. */
    val Target by lazy {
        icon("Target") {
            circle(12f, 13f, 9f, Brand.WoodDark)
            circle(12f, 12f, 9f, Brand.Wood)
            circle(12f, 12f, 6f, Brand.Cream)
            circle(12f, 12f, 3f, Brand.Brick)
            path("M12,12L20,4", stroke = Brand.Ink, width = 1.6f)
            path("M18,3h3v3", stroke = Brand.Ink, width = 1.4f)
        }
    }

    /** ✅ Hoàn thành: tích thạch xanh. */
    val CheckRound by lazy {
        icon("CheckRound") {
            circle(12f, 13f, 9f, Brand.JellyEdge)
            circle(12f, 11.5f, 9f, Brand.Jelly)
            path("M7.5,11.5l3,3l6,-6", stroke = White, width = 2.4f)
        }
    }

    // ---------- Đô thị ----------

    val Hammer by lazy {
        icon("Hammer") {
            rect(10.5f, 9f, 3f, 13f, 1.5f, Brand.Wood, Brand.WoodDark, 1f)
            rect(4f, 3f, 16f, 6.5f, 2.5f, Brand.Slate)
            rect(4f, 3f, 16f, 5f, 2.5f, Brand.DustEdge)
        }
    }

    /** 🏗 Cần cẩu: công trình đang nâng cấp. */
    val Crane by lazy {
        icon("Crane") {
            rect(6f, 5f, 2.5f, 16f, 0f, Brand.Gold, Brand.GoldEdge, 0.8f)
            rect(3f, 4f, 18f, 2.5f, 0f, Brand.Gold, Brand.GoldEdge, 0.8f)
            path("M17,6.5v5", stroke = Brand.Slate, width = 1.2f)
            rect(15f, 11.5f, 4f, 3f, 0.8f, Brand.Brick)
            rect(3f, 20f, 9f, 2f, 1f, Brand.WoodDark)
        }
    }

    val Road by lazy {
        icon("Road") {
            path("M7,21L10,3h4l3,18Z", Brand.SlateDeep)
            path("M7,20L10,3h4l3,17Z", Brand.Slate)
            path("M12,5v2.5M12,10v3M12,16v3", stroke = Brand.Gold, width = 1.5f)
        }
    }

    /** 🔒 Ổ khoá đất sét: chưa mở khoá. */
    val Locked by lazy {
        icon("Locked") {
            path("M8,11V8a4,4 0 0 1 8,0v3", stroke = Brand.DustEdge, width = 2.4f)
            rect(5f, 10f, 14f, 11f, 3f, Brand.DustEdge)
            rect(5f, 10f, 14f, 9.5f, 3f, Brand.Dust)
            circle(12f, 14.5f, 1.6f, Brand.SlateDeep)
        }
    }

    val Fog by lazy {
        icon("Fog") {
            path("M5,16a4,4 0 0 1 1,-7.9a5.5,5.5 0 0 1 10.6,1a3.5,3.5 0 0 1 1.4,6.9Z", Brand.DustEdge)
            path("M5,15a4,4 0 0 1 1,-7.9a5.5,5.5 0 0 1 10.6,1a3.5,3.5 0 0 1 1.4,6.9Z", Brand.Dust)
            path("M4,19h12M8,21.5h12", stroke = Brand.DustEdge, width = 1.5f)
        }
    }

    /** 🪙 Thuế sẵn sàng thu: túi tiền. */
    val Tax by lazy {
        icon("Tax") {
            path("M9,5h6l-1.5,3h-3Z", Brand.WoodDark)
            path("M10,8h4c4,2 6,6 6,9a4,4 0 0 1 -4,4H8a4,4 0 0 1 -4,-4c0,-3 2,-7 6,-9Z", Brand.Wood)
            circle(12f, 15f, 3.2f, Brand.Gold, Brand.GoldEdge, 1f)
        }
    }

    // ---------- Điều hướng và hệ thống ----------

    val HomeTown by lazy {
        icon("HomeTown") {
            polygon(3f, 11f, 12f, 3.5f, 21f, 11f, fill = Brand.Brick)
            rect(5.5f, 10f, 13f, 11f, 2f, Brand.WoodDark)
            rect(5.5f, 10f, 13f, 9.5f, 2f, Brand.Cream)
            rect(10f, 14f, 4f, 6.5f, 1f, Brand.Ink)
        }
    }

    /** Nút quay lại: mũi tên gỗ. */
    val BackWood by lazy {
        icon("BackWood") {
            path("M10,5L3,12l7,7v-4h9a2,2 0 0 0 2,-2v-2a2,2 0 0 0 -2,-2h-9Z", Brand.WoodDark)
            path("M10,4L3,11l7,7v-4h9a2,2 0 0 0 2,-2v-2a2,2 0 0 0 -2,-2h-9Z", Brand.Wood)
            path("M11,9h7", stroke = Glow, width = 1.3f)
        }
    }

    /** 📬 Bưu điện. */
    val Mail by lazy {
        icon("Mail") {
            rect(6f, 14f, 3f, 8f, 0f, Brand.WoodDark)
            path("M3,9a5,5 0 0 1 5,-5h8a5,5 0 0 1 5,5v6H3Z", Brand.BrickEdge)
            path("M3,9a5,5 0 0 1 5,-5h8a5,5 0 0 1 5,5v4.5H3Z", Brand.Brick)
            rect(6f, 8f, 7f, 2f, 1f, Brand.Cream)
            rect(17f, 2f, 1.6f, 7f, 0f, Brand.WoodDark)
            rect(17f, 2f, 4f, 3f, 0f, Brand.Gold)
        }
    }

    /** 🧰 Xưởng bảo trì. */
    val Toolbox by lazy {
        icon("Toolbox") {
            path("M9,7V5.5A1.5,1.5 0 0 1 10.5,4h3A1.5,1.5 0 0 1 15,5.5V7", stroke = Brand.WoodDark, width = 2f)
            rect(3f, 7f, 18f, 13f, 3f, Brand.CtaEdge)
            rect(3f, 7f, 18f, 11f, 3f, Brand.Cta)
            rect(3f, 11.5f, 18f, 2f, 0f, Brand.CtaEdge)
            rect(10.5f, 10.5f, 3f, 4f, 1f, Brand.Cream)
        }
    }

    /** 🏗 Xây dựng (danh mục kéo thả). */
    val Build by lazy {
        icon("Build") {
            rect(4f, 18f, 16f, 3f, 1f, Brand.WoodDark)
            path("M14,18V4h2v14ZM6,4h14v2H6Z", Brand.Gold)
            path("M9,6v3", stroke = Brand.Slate, width = 1.2f)
            rect(7f, 9f, 4f, 3f, 0.8f, Brand.Brick)
        }
    }

    val Settings by lazy {
        icon("Settings") {
            path(
                "M12,2.5l1.6,2.4l2.8,-0.8l0.6,2.9l2.8,0.9l-0.9,2.8l2,2l-2,2l0.9,2.8l-2.8,0.9l-0.6,2.9l-2.8,-0.8" +
                    "L12,21.5l-1.6,-2.4l-2.8,0.8l-0.6,-2.9l-2.8,-0.9l0.9,-2.8l-2,-2l2,-2l-0.9,-2.8l2.8,-0.9l0.6,-2.9l2.8,0.8Z",
                Brand.Wood, Brand.WoodDark, 1.2f
            )
            circle(12f, 12f, 3.2f, Brand.Cream, Brand.WoodDark, 1.2f)
        }
    }

    /** 📒 Sổ sách của Mai. */
    val Ledger by lazy {
        icon("Ledger") {
            rect(4f, 3f, 15f, 18f, 2.5f, Brand.WoodDark)
            rect(5.5f, 3f, 13.5f, 17f, 2f, Brand.Paper, Brand.WoodDark, 1f)
            path("M8.5,8h7M8.5,11h7M8.5,14h4", stroke = Brand.Slate, width = 1.2f)
            circle(17.5f, 17f, 3.5f, Brand.Gold, Brand.GoldEdge, 1f)
        }
    }

    val Newspaper by lazy {
        icon("Newspaper") {
            rect(3f, 5f, 18f, 15f, 2f, Brand.DustEdge)
            rect(3f, 5f, 18f, 13.5f, 2f, Brand.Paper, Brand.Slate, 1f)
            rect(5.5f, 7.5f, 6f, 4.5f, 1f, Brand.Sky)
            path("M13.5,8h5M13.5,10.5h5M5.5,14.5h13", stroke = Brand.Slate, width = 1.2f)
        }
    }

    // ---------- Trạng thái ----------

    /** ! Sự kiện. */
    val Event by lazy {
        icon("Event") {
            circle(12f, 13f, 9f, Brand.GoldEdge)
            circle(12f, 11.5f, 9f, Brand.Gold)
            rect(10.6f, 5.5f, 2.8f, 8f, 1.4f, Brand.Ink)
            circle(12f, 16.5f, 1.6f, Brand.Ink)
        }
    }

    /** ? Nhiệm vụ. */
    val Quest by lazy {
        icon("Quest") {
            circle(12f, 13f, 9f, Brand.SkyEdge)
            circle(12f, 11.5f, 9f, Brand.Sky)
            path("M9.3,8.8a2.8,2.8 0 1 1 3.8,2.6c-0.8,0.4 -1.1,0.9 -1.1,1.8", stroke = Brand.Ink, width = 2.2f)
            circle(12f, 16.3f, 1.4f, Brand.Ink)
        }
    }

    /** Vết nứt (dùng cho cả 3 mức, mức hiển thị bằng số vết). */
    val Crack by lazy {
        icon("Crack") {
            rect(3f, 4f, 18f, 17f, 3f, Brand.DustEdge)
            rect(3f, 4f, 18f, 15.5f, 3f, Brand.Paper)
            path("M12,4l-2,4l3,2l-3,4l2,2l-1,3.5", stroke = Brand.ClayError, width = 1.6f)
        }
    }

    /** Danh sách để màn Bộ giao diện hiển thị. */
    val all: List<Pair<String, ImageVector>> by lazy {
        listOf(
            "Vàng" to Coin, "Gạch" to Brick, "Gỗ" to Wood, "Năng lượng" to Bolt, "Sao XP" to Star,
            "Đồng hồ cát" to Hourglass, "Bản vẽ" to Blueprint, "Mảnh bản vẽ" to BlueprintShard,
            "Chuỗi ngày" to Flame, "Sổ tay từ" to BookOpen, "Mục tiêu" to Target, "Hoàn thành" to CheckRound,
            "Sửa chữa" to Hammer, "Nâng cấp" to Crane, "Đường" to Road, "Khoá" to Locked, "Sương mù" to Fog,
            "Thuế" to Tax, "Về thị trấn" to HomeTown, "Quay lại" to BackWood, "Bưu điện" to Mail,
            "Xưởng" to Toolbox, "Xây dựng" to Build, "Cài đặt" to Settings, "Sổ sách" to Ledger,
            "Báo" to Newspaper, "Sự kiện" to Event, "Nhiệm vụ" to Quest, "Nứt" to Crack
        )
    }
}
