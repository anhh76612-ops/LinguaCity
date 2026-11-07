package com.project.linguacity.domain.repository

import com.project.linguacity.domain.model.learning.AnswerFeedback
import com.project.linguacity.domain.model.learning.LessonResult
import com.project.linguacity.domain.model.learning.LessonSession
import com.project.linguacity.domain.model.learning.VocabProgress
import kotlinx.coroutines.flow.Flow

/** UC_05. Mọi lỗi được đổi thành LearningException (OFFLINE, EXPIRED, …). */
interface LearningRepository {
    suspend fun startLesson(buildingCode: String): LessonSession
    suspend fun startPlacement(): LessonSession
    suspend fun session(id: String): LessonSession
    suspend fun answer(sessionId: String, itemNo: Int, answer: String): AnswerFeedback
    suspend fun complete(sessionId: String): LessonResult

    /** Kéo toàn bộ tiến độ từ server về Room (FR-SYS-03). */
    suspend fun refreshProgress()
    fun observeProgress(): Flow<Map<Long, VocabProgress>>
}
