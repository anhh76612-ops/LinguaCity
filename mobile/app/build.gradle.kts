plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)

    id("com.google.devtools.ksp")
    id("com.google.dagger.hilt.android")
    id("org.jetbrains.kotlin.plugin.serialization")
}

android {
    namespace = "com.project.linguacity"
    compileSdk {
        version = release(36)
    }

    defaultConfig {
        applicationId = "com.project.linguacity"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
    buildFeatures {
        compose = true
    }
}

// City View (ADR-010): bản đồ city-web được build riêng bằng Node (`cd city-web && npm run build`).
// Task dưới chép city-web/dist vào build/generated/cityAssets/city/ và khai báo thư mục đó là assets,
// nên APK có assets/city/index.html mà không phải commit file build vào Git.
val cityWebDist = rootProject.file("../city-web/dist")
val cityAssetsDir = layout.buildDirectory.dir("generated/cityAssets")
val syncCityWeb by tasks.registering(Sync::class) {
    from(cityWebDist)
    into(cityAssetsDir.map { it.dir("city") })
    doFirst {
        if (!cityWebDist.resolve("index.html").exists()) {
            logger.warn("City View: chưa có city-web/dist. Chạy: cd city-web && npm install && npm run build")
        }
    }
}
android.sourceSets.getByName("main").assets.srcDir(cityAssetsDir.get().asFile)
tasks.named("preBuild") { dependsOn(syncCityWeb) }

// Room ghi schema JSON của từng version vào app/schemas để review migration trong Git.
ksp {
    arg("room.schemaLocation", "$projectDir/schemas")
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.compose.ui.test.junit4)
    debugImplementation(libs.androidx.compose.ui.tooling)
    debugImplementation(libs.androidx.compose.ui.test.manifest)

    // 1. Navigation Compose (Type-Safe)
    implementation("androidx.navigation:navigation-compose:2.8.0")

    // 2. Kotlinx Serialization
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.3")

    // 3. Hilt (Dependency Injection)
    implementation("com.google.dagger:hilt-android:2.51.1")
    ksp("com.google.dagger:hilt-compiler:2.51.1")
    implementation("androidx.hilt:hilt-navigation-compose:1.2.0")

    // 4. Room (Offline-first Database)
    implementation("androidx.room:room-runtime:2.6.1")
    implementation("androidx.room:room-ktx:2.6.1")
    ksp("androidx.room:room-compiler:2.6.1")

    // 5. Retrofit & OkHttp (Gọi API)
    implementation("com.squareup.retrofit2:retrofit:2.11.0")
    implementation("com.squareup.retrofit2:converter-kotlinx-serialization:2.11.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.12.0")

    implementation("androidx.datastore:datastore-preferences:1.1.1")

    // 6. WebView hiện đại: WebViewAssetLoader, WebMessageListener (City View, ADR-010)
    implementation("androidx.webkit:webkit:1.12.1")

    // M9 / FR-UI-01: splash hệ thống Android 12+ (có bản tương thích cho API thấp hơn)
    implementation("androidx.core:core-splashscreen:1.0.1")
}