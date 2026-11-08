package com.project.linguacity.presentation.city.web

import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.city.CityEvent
import com.project.linguacity.presentation.city.AvatarLook
import com.project.linguacity.presentation.city.BuildingView
import com.project.linguacity.presentation.city.HouseLook
import com.project.linguacity.presentation.city.CityMapIntent
import com.project.linguacity.presentation.city.CityRenderState
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/** Kiểm tra "hợp đồng" JSON với city-web/src/bridge/cityState.ts. */
class CityBridgeJsonTest {

    @Test
    fun encodeState_dungTenTruongMaBanDoDoc() {
        val json = CityBridgeJson.encodeState(
            CityRenderState(
                buildings = listOf(
                    BuildingView(BuildingCode.SCHOOL, level = 2, upgrading = true, progress = 0.5f),
                    BuildingView(BuildingCode.PARK, level = 0, upgrading = false, progress = 0f)
                ),
                events = listOf(CityEvent("evt-1"))
            )
        )
        assertEquals(
            """{"v":1,"buildings":[{"code":"SCHOOL","level":2,"upgrading":true,"progress":0.5},""" +
                """{"code":"PARK","level":0,"upgrading":false,"progress":0.0}],"events":[{"id":"evt-1","kind":"GRAMMAR"}],""" +
                """"player":{"appearance":{"skin":"#f1c7a5","hairStyle":"short","hairColor":"#4a3426",""" +
                """"shirt":"#4db6ac","pants":"#3949ab","accessory":"none"}},"houseStyle":{"wall":"#f3e7d3","floor":"oak"}}""",
            json
        )
    }

    @Test
    fun decodeIntent_baLoaiHopLe() {
        assertEquals(CityMapIntent.Ready, CityBridgeJson.decodeIntent("""{"type":"Ready"}"""))
        assertEquals(
            CityMapIntent.BuildingTapped(BuildingCode.PARK),
            CityBridgeJson.decodeIntent("""{"type":"BuildingTapped","buildingCode":"PARK"}""")
        )
        assertEquals(
            CityMapIntent.CityEventTapped("evt-1"),
            CityBridgeJson.decodeIntent("""{"type":"CityEventTapped","eventId":"evt-1"}""")
        )
    }

    @Test
    fun encodeState_khongGuiFocus_vaGuiNgoaiHinhDaChon() {
        val json = CityBridgeJson.encodeState(
            CityRenderState(
                buildings = emptyList(), events = emptyList(),
                avatar = AvatarLook.DEFAULT.copy(hairStyle = "spiky", accessory = "glasses"),
                house = HouseLook("#cfe7d6", "checker"),
                focus = BuildingCode.HOUSING
            )
        )
        assertTrue(json.contains(""""hairStyle":"spiky""""))
        assertTrue(json.contains(""""accessory":"glasses""""))
        assertTrue(json.contains(""""houseStyle":{"wall":"#cfe7d6","floor":"checker"}"""))
        assertTrue("focus là lệnh, không phải state", !json.contains("focus"))
    }

    @Test
    fun encodePreview_chiCoPlayer() {
        assertEquals(
            """{"v":1,"player":{"appearance":{"skin":"#f1c7a5","hairStyle":"short","hairColor":"#4a3426",""" +
                """"shirt":"#4db6ac","pants":"#3949ab","accessory":"none"}}}""",
            CityBridgeJson.encodePreview(AvatarLook.DEFAULT)
        )
    }

    @Test
    fun decodeIntent_vaoRaCongTrinh() {
        assertEquals(
            CityMapIntent.BuildingEntered(BuildingCode.HOUSING),
            CityBridgeJson.decodeIntent("""{"type":"BuildingEntered","buildingCode":"HOUSING"}""")
        )
        assertEquals(
            CityMapIntent.BuildingExited(BuildingCode.SCHOOL),
            CityBridgeJson.decodeIntent("""{"type":"BuildingExited","buildingCode":"SCHOOL"}""")
        )
        assertNull(CityBridgeJson.decodeIntent("""{"type":"BuildingEntered","buildingCode":"CASTLE"}"""))
        assertNull(CityBridgeJson.decodeIntent("""{"type":"BuildingExited"}"""))
    }

    @Test
    fun decodeIntent_duLieuSaiTraVeNullKhongCrash() {
        val bad = listOf(
            "khong phai json",
            """{"type":"BuildingTapped","buildingCode":"CASTLE"}""",
            """{"type":"CityEventTapped","eventId":""}""",
            """{"type":"Unknown"}""",
            """{}"""
        )
        bad.forEach { assertNull("Phải bỏ qua: $it", CityBridgeJson.decodeIntent(it)) }
    }

    @Test
    fun decodeIntent_boQuaTruongLa() {
        val intent = CityBridgeJson.decodeIntent("""{"type":"Ready","version":2}""")
        assertTrue(intent is CityMapIntent.Ready)
    }
}
