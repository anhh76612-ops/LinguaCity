package com.project.linguacity.data.local

import androidx.room.TypeConverter
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.Json

/** §6.2: mảng `examples` lưu thành chuỗi JSON trong SQLite. */
class Converters {

    private val stringList = ListSerializer(String.serializer())

    @TypeConverter
    fun fromStringList(value: List<String>): String = Json.encodeToString(stringList, value)

    @TypeConverter
    fun toStringList(value: String): List<String> =
        if (value.isBlank()) emptyList() else Json.decodeFromString(stringList, value)
}
