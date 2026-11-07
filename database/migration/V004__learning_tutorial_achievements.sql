-- VS3 / UC_05 Learning Session · UC_02 Tutorial thư ký · UC_13 Danh hiệu · một phần VS5 (user_buildings)
-- Thiết kế: docs/03-architecture/system-design.md §10.2.2 · ADR-013, ADR-014
-- Chạy:  psql -U postgres -d linguacity_db -v ON_ERROR_STOP=1 -f database/migration/V004__learning_tutorial_achievements.sql

BEGIN;

-- ---------- Danh hiệu (nội dung tĩnh, thuộc gói CORE) ----------
CREATE TABLE achievements (
    code           VARCHAR(50)  PRIMARY KEY,
    name           VARCHAR(100) NOT NULL,
    description    TEXT         NOT NULL,
    tier           VARCHAR(10)  NOT NULL CHECK (tier IN ('EASY', 'HARD', 'HIDDEN')),
    condition_type VARCHAR(40)  NOT NULL,
    threshold      INT          NOT NULL DEFAULT 0,
    sort_order     INT          NOT NULL DEFAULT 0
);

INSERT INTO achievements (code, name, description, tier, condition_type, threshold, sort_order) VALUES
    ('NEW_RESIDENT', 'Cư dân mới',        'Hoàn thành hướng dẫn và dọn vào ngôi nhà đầu tiên.',              'EASY',   'TUTORIAL_DONE',           0,  1),
    ('GOOD_START',   'Khởi đầu suôn sẻ',  'Trả lời đúng hơn 15 từ trong bài kiểm tra trình độ.',             'EASY',   'PLACEMENT_WORDS_CORRECT', 15, 2),
    ('COLLECTOR',    'Nhà sưu tầm',       'Sưu tầm đủ mọi từ của một Level ở một công trình.',               'EASY',   'LEVEL_COLLECTED',         0,  3),
    ('TOP_ENTRANT',  'Thủ khoa nhập học', 'Điểm kiểm tra trình độ cao hơn 90% người chơi.',                  'HARD',   'PLACEMENT_TOP_PERCENT',   90, 4),
    ('DILIGENT',     'Chăm chỉ',          'Hoàn thành bài học 3 ngày liên tiếp.',                            'HARD',   'STREAK_DAYS',             3,  5),
    ('FLAWLESS',     'Hoàn hảo',          'Đúng tuyệt đối 30/30 câu bài kiểm tra trình độ.',                 'HIDDEN', 'PLACEMENT_PERFECT',       30, 6),
    ('COMBO10',      'Liên hoàn',         'Trả lời đúng 10 câu liên tiếp trong một bài học.',                'HIDDEN', 'ANSWER_STREAK',           10, 7);

-- CORE nay có thêm danh mục danh hiệu → tăng version để app tải lại (ADR-012)
UPDATE content_packs SET version = version + 1, updated_at = now() WHERE code = 'CORE';

-- ---------- Hồ sơ người chơi ----------
ALTER TABLE user_profiles
    ADD COLUMN version                   BIGINT      NOT NULL DEFAULT 0,          -- Optimistic Locking (FR-SYS-05)
    ADD COLUMN tutorial_step             VARCHAR(30) NOT NULL DEFAULT 'INTRO',    -- ADR-014
    ADD COLUMN equipped_achievement_code VARCHAR(50) REFERENCES achievements (code),
    ADD COLUMN avatar_config             JSONB,                                    -- M8 (V005 thêm danh mục)
    ADD COLUMN house_style               JSONB;

-- Người chơi đã xong tutorial bản cũ (3 trang) coi như đã DONE
UPDATE user_profiles SET tutorial_step = 'DONE' WHERE tutorial_completed = TRUE;

-- ---------- Công trình của người chơi (§5.1.12; dùng sớm cho xây House Lv0→1) ----------
CREATE TABLE user_buildings (
    id            BIGSERIAL PRIMARY KEY,
    user_id       UUID        NOT NULL REFERENCES user_profiles (id) ON DELETE CASCADE,
    building_id   BIGINT      NOT NULL REFERENCES buildings (id) ON DELETE RESTRICT,
    current_level INT         NOT NULL DEFAULT 0 CHECK (current_level >= 0),
    target_level  INT         CHECK (target_level > current_level),
    is_unlocked   BOOLEAN     NOT NULL DEFAULT FALSE,
    status        VARCHAR(20) NOT NULL DEFAULT 'IDLE',
    started_at    TIMESTAMP,
    finish_at     TIMESTAMP,
    CONSTRAINT uq_user_building UNIQUE (user_id, building_id)
);

-- ---------- Tiến độ từ vựng (§5.1.14 + collected_at, updated_at) ----------
CREATE TABLE user_vocab_progress (
    id               BIGSERIAL PRIMARY KEY,
    user_id          UUID      NOT NULL REFERENCES user_profiles (id) ON DELETE CASCADE,
    vocabulary_id    BIGINT    NOT NULL REFERENCES vocabularies (id) ON DELETE RESTRICT,
    mastery_score    INT       NOT NULL DEFAULT 0 CHECK (mastery_score >= 0),
    first_seen_at    TIMESTAMP,
    last_reviewed_at TIMESTAMP,
    collected_at     TIMESTAMP,                      -- ADR-013: lần đầu trả lời đúng
    updated_at       TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT uq_user_vocab UNIQUE (user_id, vocabulary_id)
);
CREATE INDEX idx_vocab_progress_sync ON user_vocab_progress (user_id, updated_at);

-- ---------- Phiên học (ADR-013) ----------
CREATE TABLE learning_sessions (
    id             UUID        PRIMARY KEY,
    user_id        UUID        NOT NULL REFERENCES user_profiles (id) ON DELETE CASCADE,
    building_id    BIGINT      NOT NULL REFERENCES buildings (id),
    vocab_level    INT         NOT NULL,
    type           VARCHAR(20) NOT NULL CHECK (type IN ('LEARNING', 'PLACEMENT')),
    status         VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'COMPLETED', 'EXPIRED')),
    started_at     TIMESTAMP   NOT NULL,
    expires_at     TIMESTAMP   NOT NULL,
    completed_at   TIMESTAMP,
    total_count    INT         NOT NULL,
    correct_count  INT         NOT NULL DEFAULT 0,
    current_streak INT         NOT NULL DEFAULT 0,
    best_streak    INT         NOT NULL DEFAULT 0,
    kp_awarded     INT,
    version        BIGINT      NOT NULL DEFAULT 0    -- chống complete hai lần song song (TC-VS3-14)
);
CREATE UNIQUE INDEX uq_active_session ON learning_sessions (user_id, building_id, type) WHERE status = 'ACTIVE';
CREATE INDEX idx_session_user_completed ON learning_sessions (user_id, status, completed_at);

CREATE TABLE learning_session_items (
    session_id    UUID    NOT NULL REFERENCES learning_sessions (id) ON DELETE CASCADE,
    item_no       INT     NOT NULL CHECK (item_no > 0),
    question_id   BIGINT  NOT NULL REFERENCES questions (id),
    vocabulary_id BIGINT  NOT NULL REFERENCES vocabularies (id),
    answer_given  TEXT,
    is_correct    BOOLEAN,
    answered_at   TIMESTAMP,
    PRIMARY KEY (session_id, item_no)
);

-- ---------- Danh hiệu của người chơi ----------
CREATE TABLE user_achievements (
    user_id          UUID        NOT NULL REFERENCES user_profiles (id) ON DELETE CASCADE,
    achievement_code VARCHAR(50) NOT NULL REFERENCES achievements (code),
    earned_at        TIMESTAMP   NOT NULL,
    PRIMARY KEY (user_id, achievement_code)
);

COMMIT;
