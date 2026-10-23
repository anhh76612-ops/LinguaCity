# Build recovery and identity package implementation plan

**Goal:** Restore the Android debug build and group existing guest onboarding by business capability.

**Architecture:** Keep one Spring Boot Gradle project. Move the five existing onboarding types under `com.linguacity.backend.identity`, preserving controller/service/repository/entity/dto responsibilities, endpoint, JSON fields and PostgreSQL table. Keep mobile's Data/Domain/Presentation architecture. Auth remains future work.

**Tech stack:** Java 17, Spring Boot, JPA, PostgreSQL; Kotlin, Compose, Room, Retrofit, Hilt.

**Approved scope:** User selected package-based identity organization and authorized implementation details in chat on 2026-10-18.

## Constraints

- Preserve existing uncommitted work; edit this checkout without resetting/staging/committing it.
- Preserve POST /api/v1/users/onboard, X-Guest-UUID, response fields and user_profiles schema.
- No empty auth/learning/exam/building packages or Gradle subprojects.
- Do not introduce new gameplay or authentication behavior.

## Tasks

- [x] Reproduce manifest XML parse failure, remove the comma after MainActivity, parse again and assembleDebug with JDK 17.
- [x] Add onboarding regression checks at the intended identity imports; demonstrate that they fail before the package move.
- [x] Move controller, service, repository, entity and DTO to identity and update imports.
- [x] Run the Backend checks and bootJar; isolate context tests from the user's PostgreSQL using an in-memory test database if needed.
- [x] Write README startup instructions and explain mobile/backend responsibilities; inspect final diff and artifacts.

## Verification focus

- A new UUID starts with zero resources; an existing UUID returns existing resources without saving a replacement.
- Valid UUID requests return the same JSON fields; missing/invalid UUID returns HTTP 400.
- Spring scanning finds the relocated controller/service/repository/entity.
- Android API path and DTO stay compatible.
- Build evidence does not imply an emulator/PostgreSQL end-to-end session was run.

## Execution record

- Manifest parse failed at line 18 on a comma; parser and Android assembleDebug passed after its removal.
- Gradle requires access to the user's cache outside the workspace; requested approved execution rather than changing global configuration.
- Ruling: perform work in the existing checkout to preserve the user's staged and unstaged changes; no commits are created.
- Regression checks failed on missing identity imports before the move, then all six Backend tests passed after the move (five contract/service checks and one full Spring MVC/JPA test).
- Backend test bootJar passed with H2 isolated from the user's PostgreSQL. APK was installed successfully and MainActivity launched successfully on emulator-5554.
- Backend bootRun connected to local PostgreSQL 17.11 and started on port 8080 using JDK 17.0.12.
- Independent scoped review found no material issues. git diff --check passed.
