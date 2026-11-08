-- Đợt 2 (M13) · ADR-015 Tiến trình sau Lv1: thi, nâng cấp, nhiệm vụ, sự kiện, luyện tập, chuỗi
-- Thiết kế: docs/03-architecture/system-design.md §11.1 · BR-EXAM/UPG/QUEST/EVT/PRAC/STREAK
-- Chỉ có SCHEMA. Dữ liệu (nội dung HOUSING:2, SCHOOL:1, nhiệm vụ, sự kiện, danh hiệu) ở V007.
-- Chạy:  psql -U postgres -d linguacity_db -v ON_ERROR_STOP=1 -f database/migration/V006__progression.sql

BEGIN;

-- ---------- Thi (VS4) ----------
ALTER TABLE exams
    ADD COLUMN pass_percent INT NOT NULL DEFAULT 80 CHECK (pass_percent BETWEEN 1 AND 100);

ALTER TABLE exam_requirements
    ADD COLUMN required_building_id    BIGINT REFERENCES buildings (id),
    ADD COLUMN required_building_level INT NOT NULL DEFAULT 0 CHECK (required_building_level >= 0);

CREATE TABLE exam_attempts (
    id            BIGSERIAL   PRIMARY KEY,
    user_id       UUID        NOT NULL REFERENCES user_profiles (id) ON DELETE CASCADE,
    exam_id       BIGINT      NOT NULL REFERENCES exams (id),
    status        VARCHAR(20) NOT NULL CHECK (status IN ('IN_PROGRESS', 'PASSED', 'FAILED')),
    correct_count INT         NOT NULL DEFAULT 0 CHECK (correct_count >= 0),
    total_count   INT         NOT NULL CHECK (total_count > 0),
    started_at    TIMESTAMP   NOT NULL,
    completed_at  TIMESTAMP,
    version       BIGINT      NOT NULL DEFAULT 0
);
-- BR-EXAM-03: mỗi người chơi tối đa một lượt dở cho mỗi bài thi (chặn cả hai request song song)
CREATE UNIQUE INDEX uq_active_attempt ON exam_attempts (user_id, exam_id) WHERE status = 'IN_PROGRESS';
CREATE INDEX idx_attempt_user ON exam_attempts (user_id, exam_id, status);

CREATE TABLE exam_attempt_questions (
    attempt_id     BIGINT    NOT NULL REFERENCES exam_attempts (id) ON DELETE CASCADE,
    question_id    BIGINT    NOT NULL REFERENCES questions (id),
    vocabulary_id  BIGINT    NOT NULL REFERENCES vocabularies (id),
    question_order INT       NOT NULL CHECK (question_order > 0),
    answer_given   TEXT,
    is_correct     BOOLEAN,
    answered_at    TIMESTAMP,
    PRIMARY KEY (attempt_id, question_id),
    CONSTRAINT uq_attempt_order UNIQUE (attempt_id, question_order)
);

CREATE TABLE user_blueprints (
    id           BIGSERIAL PRIMARY KEY,
    user_id      UUID      NOT NULL REFERENCES user_profiles (id) ON DELETE CASCADE,
    blueprint_id BIGINT    NOT NULL REFERENCES blueprints (id),
    quantity     INT       NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    CONSTRAINT uq_user_blueprint UNIQUE (user_id, blueprint_id)
);

-- ---------- Nâng cấp (VS5) ----------
ALTER TABLE building_levels
    ADD COLUMN required_shards INT NOT NULL DEFAULT 0 CHECK (required_shards >= 0);

-- ---------- Phiên học: luyện tập + sự kiện (không gắn công trình) ----------
ALTER TABLE learning_sessions DROP CONSTRAINT learning_sessions_type_check;
ALTER TABLE learning_sessions ADD CONSTRAINT learning_sessions_type_check
    CHECK (type IN ('LEARNING', 'PLACEMENT', 'PRACTICE_REVIEW', 'PRACTICE_MIXED', 'EVENT'));
ALTER TABLE learning_sessions ALTER COLUMN building_id DROP NOT NULL;
-- uq_active_session (user_id, building_id, type) không chặn được NULL → thêm chỉ mục riêng
CREATE UNIQUE INDEX uq_active_free_session ON learning_sessions (user_id, type)
    WHERE status = 'ACTIVE' AND building_id IS NULL;

-- BR-PRAC-03: luyện tập chỉ thưởng mỗi từ một lần mỗi ngày
ALTER TABLE user_vocab_progress ADD COLUMN last_rewarded_on DATE;

-- ---------- Nhiệm vụ ----------
CREATE TABLE quests (
    code              VARCHAR(40)  PRIMARY KEY,
    kind              VARCHAR(10)  NOT NULL CHECK (kind IN ('MAIN', 'DAILY', 'BONUS')),
    title             VARCHAR(100) NOT NULL,
    description       TEXT         NOT NULL,
    goal_type         VARCHAR(30)  NOT NULL,
    goal_ref          VARCHAR(50),
    goal_value        INT          NOT NULL CHECK (goal_value > 0),
    reward_kp         INT          NOT NULL DEFAULT 0 CHECK (reward_kp >= 0),
    reward_shards     INT          NOT NULL DEFAULT 0 CHECK (reward_shards >= 0),
    prerequisite_code VARCHAR(40)  REFERENCES quests (code),
    sort_order        INT          NOT NULL DEFAULT 0
);

CREATE TABLE user_quests (
    id           BIGSERIAL   PRIMARY KEY,
    user_id      UUID        NOT NULL REFERENCES user_profiles (id) ON DELETE CASCADE,
    quest_code   VARCHAR(40) NOT NULL REFERENCES quests (code),
    period_date  DATE,
    progress     INT         NOT NULL DEFAULT 0 CHECK (progress >= 0),
    completed_at TIMESTAMP,
    claimed_at   TIMESTAMP
);
-- MAIN: một dòng mỗi người chơi (period_date NULL); DAILY / BONUS: một dòng mỗi ngày
CREATE UNIQUE INDEX uq_user_main_quest ON user_quests (user_id, quest_code) WHERE period_date IS NULL;
CREATE UNIQUE INDEX uq_user_daily_quest ON user_quests (user_id, quest_code, period_date)
    WHERE period_date IS NOT NULL;

-- ---------- Sự kiện thành phố ----------
CREATE TABLE city_event_templates (
    code          VARCHAR(40)  PRIMARY KEY,
    building_code VARCHAR(50)  NOT NULL REFERENCES buildings (code),
    resident_name VARCHAR(50)  NOT NULL,
    situation     TEXT         NOT NULL,
    sort_order    INT          NOT NULL DEFAULT 0
);

CREATE TABLE user_city_events (
    id            BIGSERIAL   PRIMARY KEY,
    user_id       UUID        NOT NULL REFERENCES user_profiles (id) ON DELETE CASCADE,
    template_code VARCHAR(40) NOT NULL REFERENCES city_event_templates (code),
    spawn_date    DATE        NOT NULL,
    status        VARCHAR(20) NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'RESOLVED')),
    session_id    UUID        REFERENCES learning_sessions (id),
    resolved_at   TIMESTAMP,
    CONSTRAINT uq_user_event_day UNIQUE (user_id, template_code, spawn_date)
);
CREATE INDEX idx_user_event_day ON user_city_events (user_id, spawn_date);

-- ---------- Chuỗi ngày + danh hiệu thu hồi được ----------
ALTER TABLE user_profiles
    ADD COLUMN streak_days      INT  NOT NULL DEFAULT 0 CHECK (streak_days >= 0),
    ADD COLUMN best_streak      INT  NOT NULL DEFAULT 0 CHECK (best_streak >= 0),
    ADD COLUMN streak_last_date DATE;

ALTER TABLE achievements ADD COLUMN revocable BOOLEAN NOT NULL DEFAULT FALSE;

COMMIT;
