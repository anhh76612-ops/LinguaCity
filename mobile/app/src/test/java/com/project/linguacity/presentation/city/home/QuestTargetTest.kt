package com.project.linguacity.presentation.city.home

import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.city.BuildingState
import com.project.linguacity.domain.model.city.CityEvent
import com.project.linguacity.domain.model.city.CityState
import com.project.linguacity.domain.model.progression.Quest
import org.junit.Assert.assertEquals
import org.junit.Test

/** S2: nút "Đi tới" của bảng nhiệm vụ dẫn người chơi tới đúng nơi. */
class QuestTargetTest {

    private fun quest(code: String) = Quest(
        code = code, kind = "DAILY", title = code, description = "", progress = 0, goal = 1,
        completed = false, claimed = false, rewardKp = 0, rewardShards = 0
    )

    private val city = CityState(
        buildings = listOf(
            BuildingState(BuildingCode.HOUSING, level = 2),
            BuildingState(BuildingCode.SCHOOL, level = 1),
            BuildingState(BuildingCode.PARK, level = 0),
            BuildingState(BuildingCode.ROAD, level = 0)
        )
    )

    @Test
    fun nhiemVuChinh_theoTenCongTrinh() {
        assertEquals(QuestTarget.Building(BuildingCode.HOUSING), questTarget(quest("MAIN_BUILD_HOUSE"), city))
        assertEquals(QuestTarget.Building(BuildingCode.SCHOOL), questTarget(quest("MAIN_LEARN_SCHOOL"), city))
        assertEquals(
            QuestTarget.Building(BuildingCode.HOUSING),
            questTarget(quest("MAIN_PASS_HOUSE_EXAM"), city)
        )
    }

    @Test
    fun suKien_moTheCuDanNeuCo_khongThiVeNhaO() {
        val withEvent = city.copy(events = listOf(CityEvent("evt-9")))
        assertEquals(QuestTarget.Event("evt-9"), questTarget(quest("DAILY_EVENT"), withEvent))
        assertEquals(QuestTarget.Building(BuildingCode.HOUSING), questTarget(quest("DAILY_EVENT"), city))
    }

    @Test
    fun onBai_moLuyenTap() {
        assertEquals(QuestTarget.Practice, questTarget(quest("DAILY_REVIEW"), city))
    }

    @Test
    fun hocChungChung_toiCongTrinhDangXayThapNhat() {
        // SCHOOL Lv1 thấp hơn HOUSING Lv2; công trình Lv0 chưa xây thì bỏ qua
        assertEquals(QuestTarget.Building(BuildingCode.SCHOOL), questTarget(quest("DAILY_LESSON"), city))
    }
}
