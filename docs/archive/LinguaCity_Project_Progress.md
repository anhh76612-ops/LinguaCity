# LINGUACITY — PROJECT PROGRESS TRACKING

## Current Milestone

**Phase 2 — System Design**

### Completed

- [x] Requirements baseline / SRS
- [x] Iterative / Agile-oriented development direction
- [x] Core Learning Loop + City Loop
- [x] Static Content / Player State separation
- [x] Theme Entity
- [x] Building → Theme
- [x] UserProfile as UUID-based Guest identity
- [x] UserBuilding design
- [x] UserVocabProgress design
- [x] Exam → ExamQuestion → Question
- [x] Question Bank
- [x] Question metadata JSONB strategy
- [x] Vocabulary Card concept
- [x] Collection Progress vs Mastery Progress separation
- [x] Difficulty Rank
- [x] Per-Rank max mastery
- [x] Mastery update rule: correct +1 / wrong -1
- [x] Mastery clamped to 0..max_mastery
- [x] Level-based difficulty distribution
- [x] Dynamic weighted random selection concept
- [x] Recent-use penalty/cooldown concept
- [x] Flashcard Collection concept
- [x] Exam unlock by collected-card threshold

### Current Prototype Status

#### Backend
- [x] Spring Boot project
- [x] PostgreSQL database
- [x] UserProfile prototype
- [x] Building prototype
- [x] Vocabulary prototype
- [x] UserVocabularyProgress prototype
- [x] Repository layer prototypes
- [x] Controller/API prototypes
- [ ] Refactor UserProfile ID from Long to UUID
- [ ] Split Building into Building + UserBuilding
- [ ] Add Theme
- [ ] Replace Vocabulary buildingType with theme relationship
- [ ] Add Question Bank
- [ ] Add Exam / ExamQuestion
- [ ] Add DTO / Service / Mapper layers
- [ ] Implement server-authoritative validation
- [ ] Implement synchronization endpoints

#### Mobile
- [x] Android project initialized
- [x] Kotlin + Compose
- [x] Clean Architecture package structure
- [x] MVI + StateFlow decision
- [x] Hilt base setup
- [x] Retrofit dependency/setup direction
- [x] Room dependency/setup direction
- [x] Kotlinx Serialization decision
- [ ] Implement Room entities
- [ ] Implement DAO
- [ ] Implement TypeConverter
- [ ] Implement DTOs
- [ ] Implement Retrofit services
- [ ] Implement Repository
- [ ] Implement Use Cases
- [ ] Implement Learning Session
- [ ] Implement Weighted Random Card Selector
- [ ] Implement Mastery Engine
- [ ] Implement MVI screens
- [ ] Implement Flashcard Collection UI
- [ ] Implement Exam flow

### Next Immediate Step

**2.3 — Data Flow & Sequence Diagrams**

First design these flows:

1. First Launch → Guest UUID creation → Backend registration.
2. Pull Static Content → Retrofit → Repository → Room → UI.
3. Start Learning Session → Card Selection → Mini-game → Mastery update.
4. Collection threshold reached → Exam Unlock.
5. Exam Pass → Server validation → Blueprint/Building update → Room sync.

### Game Balance Parameters Still Open

The following values remain configurable and should be tuned after prototype testing:

- Exact difficulty distribution beyond current examples.
- `max_mastery` values by rank.
- Dynamic weight calculation formula.
- Recent-use cooldown/penalty duration or strength.

The core rules are frozen: correct answer `+1`, wrong answer `-1`, mastery clamped to `0..max_mastery`.
