package com.project.linguacity.presentation.common

import retrofit2.HttpException
import java.io.IOException

/**
 * Đổi lỗi kỹ thuật thành câu người chơi hiểu được (ghi nhận khi nghiệm thu VS1: màn lỗi từng hiện
 * nguyên văn
 * "failed to connect to /10.0.2.2 …").
 */
fun friendlyNetworkError(e: Throwable, firstRun: Boolean = false): String = when (e) {
    is IOException ->
        if (firstRun) {
            "Lần đầu vào game cần kết nối mạng để tải nội dung học. Kiểm tra Wi-Fi/4G rồi thử " +
            "lại nhé."
        }
        else "Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại nhé."
    is HttpException -> "Máy chủ đang gặp sự cố (mã ${e.code()}). Thử lại sau ít phút nhé."
    else -> "Có lỗi không mong muốn. Thử lại nhé."
}
