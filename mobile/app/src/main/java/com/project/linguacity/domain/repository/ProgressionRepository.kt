package com.project.linguacity.domain.repository

import com.project.linguacity.domain.model.city.BuildingCode
import com.project.linguacity.domain.model.progression.ExamAttempt
import com.project.linguacity.domain.model.progression.ExamResult
import com.project.linguacity.domain.model.progression.ExamStatus
import com.project.linguacity.domain.model.progression.PracticeStatus
import com.project.linguacity.domain.model.progression.QuestsOverview

/**
 * Thi, nhiệm vụ và trạng thái luyện tập (ADR-015). Chỉ online (ADR-004): mọi lỗi đổi thành
 * ProgressionException.
 */
interface ProgressionRepository {

    suspend fun exams(building: BuildingCode): List<ExamStatus>

    suspend fun startExam(code: String): ExamAttempt

    suspend fun attempt(id: Long): ExamAttempt

    /** answers: thứ tự câu → câu trả lời. */
    suspend fun submit(attemptId: Long, answers: Map<Int, String>): ExamResult

    suspend fun quests(): QuestsOverview

    suspend fun claim(code: String)

    suspend fun practiceStatus(): PracticeStatus
}
