package com.project.linguacity.data.local.user

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "user_profiles")
data class UserProfileEntity(

    @PrimaryKey
    val id: String,

    val knowledgePoints: Int = 0,

    val hourglassCount: Int = 0,

    val blueprintShards: Int = 0
)