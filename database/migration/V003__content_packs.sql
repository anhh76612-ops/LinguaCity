-- VS2 / UC_03 Sync Static Content — nội dung tĩnh chia gói theo (công trình, Level)
-- Thiết kế: docs/03-architecture/system-design.md §5.1 + §10.2.1 · ADR-012
-- Chạy:  psql -U postgres -d linguacity_db -v ON_ERROR_STOP=1 -f database/migration/V003__content_packs.sql
-- Phần seed (từ INSERT INTO vocabularies trở đi) được sinh bởi database/seed/housing_level1.py.

BEGIN;

-- ---------- Nội dung tĩnh ----------
CREATE TABLE themes (
    id          BIGSERIAL PRIMARY KEY,
    code        VARCHAR(50)  NOT NULL UNIQUE,
    name        VARCHAR(100) NOT NULL,
    description TEXT
);

-- v3.3: bỏ buildings.theme_id, dùng bảng nối building_themes (n-n)
CREATE TABLE buildings (
    id         BIGSERIAL PRIMARY KEY,
    code       VARCHAR(50)  NOT NULL UNIQUE,
    name       VARCHAR(100) NOT NULL,
    max_level  INT          NOT NULL CHECK (max_level > 0),
    sort_order INT          NOT NULL DEFAULT 0
);

CREATE TABLE building_themes (
    building_id BIGINT NOT NULL REFERENCES buildings (id) ON DELETE CASCADE,
    theme_id    BIGINT NOT NULL REFERENCES themes (id) ON DELETE RESTRICT,
    PRIMARY KEY (building_id, theme_id)
);

CREATE TABLE building_levels (
    building_id        BIGINT NOT NULL REFERENCES buildings (id) ON DELETE CASCADE,
    level              INT    NOT NULL CHECK (level > 0),
    knowledge_cost     INT    NOT NULL CHECK (knowledge_cost >= 0),
    construction_time  BIGINT NOT NULL CHECK (construction_time >= 0), -- giây
    required_collected INT    NOT NULL DEFAULT 0 CHECK (required_collected >= 0),
    PRIMARY KEY (building_id, level)
);

CREATE TABLE blueprints (
    id           BIGSERIAL PRIMARY KEY,
    code         VARCHAR(50) NOT NULL UNIQUE,
    building_id  BIGINT      NOT NULL REFERENCES buildings (id) ON DELETE CASCADE,
    target_level INT         NOT NULL CHECK (target_level > 1),
    UNIQUE (building_id, target_level)
);

CREATE TABLE vocabularies (
    id              BIGSERIAL PRIMARY KEY,
    word            VARCHAR(100) NOT NULL,
    meaning         TEXT         NOT NULL,
    word_type       VARCHAR(20)  NOT NULL,
    ipa             VARCHAR(100),
    examples        JSONB,
    image_url       VARCHAR(255),
    theme_id        BIGINT       NOT NULL REFERENCES themes (id) ON DELETE RESTRICT,
    level           INT          NOT NULL CHECK (level > 0),
    difficulty_rank VARCHAR(5)   NOT NULL
);

CREATE TABLE questions (
    id               BIGSERIAL PRIMARY KEY,
    content_type     VARCHAR(20) NOT NULL,
    skill            VARCHAR(20) NOT NULL,
    question_type    VARCHAR(30) NOT NULL,
    tier             SMALLINT    NOT NULL DEFAULT 1 CHECK (tier BETWEEN 1 AND 3),
    question_text    TEXT,
    answer           TEXT        NOT NULL, -- chỉ ở server (NFR-01)
    accepted_answers JSONB,                -- chỉ ở server (ADR-013)
    explanation      TEXT,
    audio_url        VARCHAR(255),
    metadata         JSONB                 -- KHÔNG BAO GIỜ chứa đáp án
);

CREATE TABLE question_vocabularies (
    question_id   BIGINT      NOT NULL REFERENCES questions (id) ON DELETE CASCADE,
    vocabulary_id BIGINT      NOT NULL REFERENCES vocabularies (id) ON DELETE CASCADE,
    relation_type VARCHAR(20) NOT NULL,
    PRIMARY KEY (question_id, vocabulary_id)
);

CREATE TABLE exams (
    id                  BIGSERIAL PRIMARY KEY,
    code                VARCHAR(50) NOT NULL UNIQUE,
    building_id         BIGINT      NOT NULL REFERENCES buildings (id) ON DELETE RESTRICT,
    target_level        INT         NOT NULL,
    reward_blueprint_id BIGINT      NOT NULL REFERENCES blueprints (id) ON DELETE RESTRICT,
    question_count      INT         NOT NULL DEFAULT 10 CHECK (question_count > 0),
    FOREIGN KEY (building_id, target_level) REFERENCES blueprints (building_id, target_level)
);

CREATE TABLE exam_requirements (
    id                        BIGSERIAL PRIMARY KEY,
    exam_id                   BIGINT NOT NULL UNIQUE REFERENCES exams (id) ON DELETE CASCADE,
    required_card_count       INT    NOT NULL DEFAULT 0 CHECK (required_card_count >= 0),
    required_knowledge        INT    NOT NULL DEFAULT 0 CHECK (required_knowledge >= 0),
    required_blueprint_shards INT    NOT NULL DEFAULT 0 CHECK (required_blueprint_shards >= 0)
);

CREATE TABLE exam_questions (
    exam_id     BIGINT NOT NULL REFERENCES exams (id) ON DELETE CASCADE,
    question_id BIGINT NOT NULL REFERENCES questions (id) ON DELETE CASCADE,
    PRIMARY KEY (exam_id, question_id)
);

-- ADR-012: mỗi gói có version riêng; scope sau này = mã lớp học
CREATE TABLE content_packs (
    id          BIGSERIAL PRIMARY KEY,
    code        VARCHAR(80) NOT NULL UNIQUE,
    scope       VARCHAR(50) NOT NULL DEFAULT 'GLOBAL',
    building_id BIGINT REFERENCES buildings (id) ON DELETE CASCADE,
    level       INT,
    version     INT         NOT NULL DEFAULT 1 CHECK (version > 0),
    updated_at  TIMESTAMP   NOT NULL DEFAULT now(),
    CHECK ((building_id IS NULL) = (level IS NULL)),
    UNIQUE (scope, building_id, level)
);

-- ---------- Chỉ mục (§5.2) ----------
CREATE INDEX idx_building_theme_reverse ON building_themes (theme_id);
CREATE INDEX idx_vocab_pool ON vocabularies (theme_id, level, difficulty_rank);
CREATE INDEX idx_question_filter ON questions (content_type, skill, question_type);
CREATE INDEX idx_exam_lookup ON exams (building_id, target_level);
CREATE INDEX idx_q_vocab_reverse ON question_vocabularies (vocabulary_id);

-- ---------- Dữ liệu thế giới ----------
INSERT INTO themes (code, name, description) VALUES
    ('DAILY_LIFE',     'Daily Life',     'Sinh hoạt hằng ngày: mua sắm, việc nhà, lịch hẹn'),
    ('HOUSE',          'House',          'Nhà cửa: thuê nhà, đồ đạc, sửa chữa'),
    ('TRANSPORTATION', 'Transportation', 'Giao thông, đi lại'),
    ('VEHICLES',       'Vehicles',       'Phương tiện'),
    ('ENVIRONMENT',    'Environment',    'Môi trường'),
    ('SOCIAL',         'Social',         'Giao tiếp xã hội'),
    ('EDUCATION',      'Education',      'Học tập, trường lớp');

INSERT INTO buildings (code, name, max_level, sort_order) VALUES
    ('HOUSING', 'Nhà ở',      3, 1),
    ('ROAD',    'Đường xá',   3, 2),
    ('PARK',    'Công viên',  3, 3),
    ('SCHOOL',  'Trường học', 3, 4);

INSERT INTO building_themes (building_id, theme_id)
SELECT b.id, t.id FROM buildings b JOIN themes t ON
    (b.code = 'HOUSING' AND t.code IN ('DAILY_LIFE', 'HOUSE')) OR
    (b.code = 'ROAD'    AND t.code IN ('TRANSPORTATION', 'VEHICLES')) OR
    (b.code = 'PARK'    AND t.code IN ('ENVIRONMENT', 'SOCIAL')) OR
    (b.code = 'SCHOOL'  AND t.code IN ('EDUCATION'));

-- GDD §6.1 (🟡 chỉnh sau): HOUSING Lv1 rẻ và nhanh cho tutorial (ADR-014)
INSERT INTO building_levels (building_id, level, knowledge_cost, construction_time, required_collected)
SELECT b.id, l.level,
       CASE WHEN l.level = 1 AND b.code = 'HOUSING' THEN 100 WHEN l.level = 1 THEN 150 WHEN l.level = 2 THEN 300 ELSE 800 END,
       CASE WHEN l.level = 1 AND b.code = 'HOUSING' THEN 10  WHEN l.level = 1 THEN 60  WHEN l.level = 2 THEN 3600 ELSE 14400 END,
       CASE WHEN l.level = 1 THEN 20 ELSE 0 END
FROM buildings b CROSS JOIN (VALUES (1), (2), (3)) AS l(level);

INSERT INTO blueprints (code, building_id, target_level)
SELECT 'BLUEPRINT_' || b.code || '_LV' || l.level, b.id, l.level
FROM buildings b CROSS JOIN (VALUES (2), (3)) AS l(level);

INSERT INTO content_packs (code, scope, building_id, level, version) VALUES ('CORE', 'GLOBAL', NULL, NULL, 1);
INSERT INTO content_packs (code, scope, building_id, level, version)
SELECT 'HOUSING:1', 'GLOBAL', id, 1, 1 FROM buildings WHERE code = 'HOUSING';

-- ===== Seed: từ vựng House Level 1 (sinh bởi database/seed/housing_level1.py) =====
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (1, 'rent', 'tiền thuê nhà', 'NOUN', '/rent/', '["My rent is due on the first day of every month.", "The rent includes water but not electricity."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'HOUSE'), 1, 'D');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (2, 'landlord', 'chủ nhà (người cho thuê)', 'NOUN', '/ˈlændlɔːd/', '["Our landlord fixed the heater in one day.", "Call the landlord if the roof leaks."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'HOUSE'), 1, 'D');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (3, 'tenant', 'người thuê nhà', 'NOUN', '/ˈtenənt/', '["The new tenant moved in last week.", "Tenants must give one month''s notice before leaving."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'HOUSE'), 1, 'C');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (4, 'lease', 'hợp đồng thuê', 'NOUN', '/liːs/', '["We signed a one-year lease.", "Read the lease carefully before you sign it."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'HOUSE'), 1, 'C');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (5, 'deposit', 'tiền đặt cọc', 'NOUN', '/dɪˈpɒzɪt/', '["You will get your deposit back when you leave.", "The deposit is equal to one month''s rent."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'HOUSE'), 1, 'C');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (6, 'utilities', 'các dịch vụ tiện ích (điện, nước, ga)', 'NOUN', '/juːˈtɪlətiz/', '["The rent does not include utilities.", "Utilities cost about $100 a month."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'HOUSE'), 1, 'C');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (7, 'furniture', 'đồ nội thất', 'NOUN', '/ˈfɜːnɪtʃə(r)/', '["The apartment comes with furniture.", "We bought some new furniture for the living room."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'HOUSE'), 1, 'D');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (8, 'appliance', 'thiết bị gia dụng', 'NOUN', '/əˈplaɪəns/', '["The kitchen has new appliances.", "Turn off all appliances before you leave."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'HOUSE'), 1, 'C');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (9, 'neighbor', 'hàng xóm', 'NOUN', '/ˈneɪbə(r)/', '["Our neighbor has a friendly dog.", "I borrowed a ladder from my neighbor."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'HOUSE'), 1, 'D');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (10, 'apartment', 'căn hộ', 'NOUN', '/əˈpɑːtmənt/', '["She lives in a small apartment downtown.", "The apartment is on the fifth floor."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'HOUSE'), 1, 'D');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (11, 'repair', 'sửa chữa', 'VERB', '/rɪˈpeə(r)/', '["Can you repair the broken window?", "It took two days to repair the roof."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'HOUSE'), 1, 'D');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (12, 'renovate', 'cải tạo, tân trang', 'VERB', '/ˈrenəveɪt/', '["They plan to renovate the kitchen next year.", "The old hotel was renovated in 2024."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'HOUSE'), 1, 'C');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (13, 'spacious', 'rộng rãi', 'ADJECTIVE', '/ˈspeɪʃəs/', '["The living room is bright and spacious.", "We need a more spacious car for the family."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'HOUSE'), 1, 'C');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (14, 'maintenance', 'sự bảo trì', 'NOUN', '/ˈmeɪntənəns/', '["The building is closed for maintenance.", "Regular maintenance keeps the elevator safe."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'HOUSE'), 1, 'C');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (15, 'relocate', 'chuyển đến nơi ở/làm việc mới', 'VERB', '/ˌriːləʊˈkeɪt/', '["The company will relocate to Da Nang.", "We relocated last spring for my new job."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'HOUSE'), 1, 'C');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (16, 'groceries', 'thực phẩm, hàng tạp hoá', 'NOUN', '/ˈɡrəʊsəriz/', '["I buy groceries every Saturday.", "Can you help me carry the groceries?"]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'DAILY_LIFE'), 1, 'D');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (17, 'laundry', 'quần áo cần giặt; việc giặt giũ', 'NOUN', '/ˈlɔːndri/', '["I do the laundry on Sundays.", "There is a laundry room in the basement."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'DAILY_LIFE'), 1, 'D');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (18, 'commute', 'đi lại hằng ngày (giữa nhà và nơi làm)', 'VERB', '/kəˈmjuːt/', '["I commute to work by bus.", "She commutes for an hour every day."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'DAILY_LIFE'), 1, 'C');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (19, 'schedule', 'lịch trình', 'NOUN', '/ˈʃedjuːl/', '["My schedule is very busy this week.", "Check the bus schedule before you leave."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'DAILY_LIFE'), 1, 'D');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (20, 'errand', 'việc vặt (đi mua đồ, gửi thư…)', 'NOUN', '/ˈerənd/', '["I have a few errands to run this afternoon.", "He went out to do some errands."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'DAILY_LIFE'), 1, 'C');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (21, 'recipe', 'công thức nấu ăn', 'NOUN', '/ˈresəpi/', '["This recipe needs three eggs.", "My grandmother gave me her soup recipe."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'DAILY_LIFE'), 1, 'D');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (22, 'receipt', 'hoá đơn, biên lai (sau khi trả tiền)', 'NOUN', '/rɪˈsiːt/', '["Keep the receipt in case you want to return it.", "The cashier forgot to give me a receipt."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'DAILY_LIFE'), 1, 'D');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (23, 'budget', 'ngân sách', 'NOUN', '/ˈbʌdʒɪt/', '["We have a small budget for the trip.", "Make a monthly budget to save money."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'DAILY_LIFE'), 1, 'D');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (24, 'chore', 'việc nhà', 'NOUN', '/tʃɔː(r)/', '["Washing dishes is my least favorite chore.", "The children help with the chores."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'DAILY_LIFE'), 1, 'D');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (25, 'routine', 'thói quen hằng ngày', 'NOUN', '/ruːˈtiːn/', '["Exercise is part of my morning routine.", "Babies need a regular routine."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'DAILY_LIFE'), 1, 'D');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (26, 'convenient', 'tiện lợi, thuận tiện', 'ADJECTIVE', '/kənˈviːniənt/', '["The supermarket is very convenient.", "Is 3 p.m. a convenient time for you?"]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'DAILY_LIFE'), 1, 'D');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (27, 'purchase', 'mua (trang trọng)', 'VERB', '/ˈpɜːtʃəs/', '["You can purchase tickets online.", "We purchased a new fridge last week."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'DAILY_LIFE'), 1, 'C');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (28, 'bill', 'hoá đơn (cần thanh toán)', 'NOUN', '/bɪl/', '["The electricity bill was high this month.", "Can we have the bill, please?"]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'DAILY_LIFE'), 1, 'D');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (29, 'appointment', 'cuộc hẹn', 'NOUN', '/əˈpɔɪntmənt/', '["I have a dentist appointment at 10.", "Please call to make an appointment."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'DAILY_LIFE'), 1, 'D');
INSERT INTO vocabularies (id, word, meaning, word_type, ipa, examples, image_url, theme_id, level, difficulty_rank) VALUES (30, 'subscribe', 'đăng ký (dùng dịch vụ định kỳ)', 'VERB', '/səbˈskraɪb/', '["I subscribe to a music streaming service.", "Subscribe to our newsletter for updates."]'::jsonb, NULL, (SELECT id FROM themes WHERE code = 'DAILY_LIFE'), 1, 'C');
SELECT setval(pg_get_serial_sequence('vocabularies', 'id'), (SELECT MAX(id) FROM vocabularies));

-- ===== Câu hỏi: 3 câu mỗi từ (tier 1 trắc nghiệm, tier 2 điền có gợi ý, tier 3 điền theo ngữ cảnh) =====
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (1, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "rent" mean?', 'tiền thuê nhà', '[]'::jsonb, '"rent" /rent/ nghĩa là tiền thuê nhà. Ví dụ: My rent is due on the first day of every month.', NULL, '{"options": ["việc vặt (đi mua đồ, gửi thư…)", "tiền thuê nhà", "hợp đồng thuê", "cải tạo, tân trang"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (1, 1, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (2, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: tiền thuê nhà)', 'rent', '[]'::jsonb, '"Rent" là khoản bạn trả đều đặn để được ở nhà người khác — nhớ là trả hằng tháng nhé.', NULL, '{"sentence": "I pay the ___ to my landlord every month.", "hint": "r _ _ t"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (2, 1, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (3, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'rent', '[]'::jsonb, 'Đáp án là "rent": khoản trả hằng tháng để ở. Đừng nhầm với "deposit" — tiền cọc chỉ đưa một lần lúc dọn vào.', NULL, '{"sentence": "The ___ for this two-bedroom apartment is $900 a month."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (3, 1, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (4, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "landlord" mean?', 'chủ nhà (người cho thuê)', '[]'::jsonb, '"landlord" /ˈlændlɔːd/ nghĩa là chủ nhà (người cho thuê). Ví dụ: Our landlord fixed the heater in one day.', NULL, '{"options": ["rộng rãi", "công thức nấu ăn", "chủ nhà (người cho thuê)", "tiền đặt cọc"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (4, 2, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (5, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: chủ nhà (người cho thuê))', 'landlord', '["landlady"]'::jsonb, '"Landlord" là người sở hữu và cho thuê nhà. Người đi thuê thì gọi là "tenant".', NULL, '{"sentence": "The ___ owns the building and rents it out to us.", "hint": "l _ _ _ _ _ _ d"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (5, 2, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (6, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'landlord', '["landlady"]'::jsonb, 'Người sở hữu căn hộ và chịu trách nhiệm sửa chữa là "landlord". "Tenant" là phía đi thuê, nên không hợp ở đây.', NULL, '{"sentence": "If the sink breaks, you should contact the ___ because he owns the apartment."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (6, 2, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (7, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "tenant" mean?', 'người thuê nhà', '[]'::jsonb, '"tenant" /ˈtenənt/ nghĩa là người thuê nhà. Ví dụ: The new tenant moved in last week.', NULL, '{"options": ["các dịch vụ tiện ích (điện, nước, ga)", "sự bảo trì", "hoá đơn, biên lai (sau khi trả tiền)", "người thuê nhà"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (7, 3, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (8, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: người thuê nhà)', 'tenant', '["tenants"]'::jsonb, '"Tenant" là người đi thuê. Mẹo nhớ: tenant ở trong "ten"-ant — người "ở" chứ không phải người "sở hữu".', NULL, '{"sentence": "A ___ is a person who pays rent to live in a place.", "hint": "t _ _ _ _ t"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (8, 3, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (9, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'tenant', '["tenants"]'::jsonb, 'Lá thư gửi cho những người đang ở thuê trong toà nhà, nên là "tenant". Nếu là "landlord" thì chỉ có một người thôi.', NULL, '{"sentence": "Every ___ in the building received a letter about the new parking rules."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (9, 3, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (10, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "lease" mean?', 'hợp đồng thuê', '[]'::jsonb, '"lease" /liːs/ nghĩa là hợp đồng thuê. Ví dụ: We signed a one-year lease.', NULL, '{"options": ["hợp đồng thuê", "đồ nội thất", "chuyển đến nơi ở/làm việc mới", "ngân sách"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (10, 4, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (11, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: hợp đồng thuê)', 'lease', '[]'::jsonb, '"Lease" là hợp đồng thuê nhà có thời hạn, ví dụ "a one-year lease".', NULL, '{"sentence": "Before moving in, you must sign a ___ with the owner.", "hint": "l _ _ _ e"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (11, 4, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (12, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'lease', '[]'::jsonb, 'Thứ có ngày hết hạn và có thể "renew" (gia hạn) là hợp đồng thuê — "lease". "Rent" là số tiền, không "hết hạn" được.', NULL, '{"sentence": "Our ___ ends in June, so we need to decide whether to renew it."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (12, 4, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (13, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "deposit" mean?', 'tiền đặt cọc', '[]'::jsonb, '"deposit" /dɪˈpɒzɪt/ nghĩa là tiền đặt cọc. Ví dụ: You will get your deposit back when you leave.', NULL, '{"options": ["việc nhà", "tiền đặt cọc", "thiết bị gia dụng", "thực phẩm, hàng tạp hoá"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (13, 5, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (14, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: tiền đặt cọc)', 'deposit', '[]'::jsonb, '"Deposit" là tiền cọc, trả một lần và thường được hoàn lại khi trả nhà.', NULL, '{"sentence": "We paid a ___ before we got the keys to the apartment.", "hint": "d _ _ _ _ _ t"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (14, 5, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (15, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'deposit', '[]'::jsonb, 'Khoản tiền bị giữ lại vì làm hỏng đồ là tiền cọc — "deposit". Tiền thuê hằng tháng ("rent") thì đã trả rồi, không bị "giữ lại".', NULL, '{"sentence": "The landlord kept part of the ___ because the carpet was damaged."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (15, 5, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (16, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "utilities" mean?', 'các dịch vụ tiện ích (điện, nước, ga)', '[]'::jsonb, '"utilities" /juːˈtɪlətiz/ nghĩa là các dịch vụ tiện ích (điện, nước, ga). Ví dụ: The rent does not include utilities.', NULL, '{"options": ["quần áo cần giặt; việc giặt giũ", "thói quen hằng ngày", "các dịch vụ tiện ích (điện, nước, ga)", "hàng xóm"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (16, 6, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (17, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: các dịch vụ tiện ích (điện, nước, ga))', 'utilities', '["utility"]'::jsonb, '"Utilities" gom chung điện, nước, ga… — thường dùng số nhiều.', NULL, '{"sentence": "Electricity, water and gas are called ___.", "hint": "u _ _ _ _ _ _ _ s"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (17, 6, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (18, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'utilities', '["utility"]'::jsonb, 'Câu này hỏi các dịch vụ đi kèm nhà như điện, nước, internet — đó là "utilities". "Appliances" là máy móc trong nhà, không phải dịch vụ.', NULL, '{"sentence": "Is the internet included in the ___, or do I pay for it separately?"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (18, 6, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (19, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "furniture" mean?', 'đồ nội thất', '[]'::jsonb, '"furniture" /ˈfɜːnɪtʃə(r)/ nghĩa là đồ nội thất. Ví dụ: The apartment comes with furniture.', NULL, '{"options": ["căn hộ", "đi lại hằng ngày (giữa nhà và nơi làm)", "tiện lợi, thuận tiện", "đồ nội thất"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (19, 7, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (20, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: đồ nội thất)', 'furniture', '[]'::jsonb, '"Furniture" là danh từ không đếm được: nói "some furniture" hoặc "a piece of furniture", không nói "furnitures".', NULL, '{"sentence": "Tables, chairs and beds are all ___.", "hint": "f _ _ _ _ _ _ _ e"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (20, 7, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (21, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'furniture', '[]'::jsonb, 'Căn hộ trống trơn thì cần mua bàn ghế, giường tủ — "furniture". Lưu ý không thêm "s" nhé.', NULL, '{"sentence": "We need to buy some ___ because the apartment is completely empty."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (21, 7, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (22, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "appliance" mean?', 'thiết bị gia dụng', '[]'::jsonb, '"appliance" /əˈplaɪəns/ nghĩa là thiết bị gia dụng. Ví dụ: The kitchen has new appliances.', NULL, '{"options": ["thiết bị gia dụng", "sửa chữa", "lịch trình", "mua (trang trọng)"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (22, 8, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (23, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: thiết bị gia dụng)', 'appliance', '["appliances"]'::jsonb, '"Appliance" là máy móc dùng điện trong nhà: tủ lạnh, máy giặt, lò vi sóng…', NULL, '{"sentence": "A washing machine is a household ___.", "hint": "a _ _ _ _ _ _ _ e"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (23, 8, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (24, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'appliance', '["appliances"]'::jsonb, 'Tủ lạnh là một thiết bị điện gia dụng — "appliance". "Furniture" là bàn ghế, giường tủ, không chạy bằng điện.', NULL, '{"sentence": "The refrigerator is the most expensive ___ in our kitchen."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (24, 8, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (25, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "neighbor" mean?', 'hàng xóm', '[]'::jsonb, '"neighbor" /ˈneɪbə(r)/ nghĩa là hàng xóm. Ví dụ: Our neighbor has a friendly dog.', NULL, '{"options": ["hoá đơn (cần thanh toán)", "hàng xóm", "cải tạo, tân trang", "việc vặt (đi mua đồ, gửi thư…)"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (25, 9, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (26, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: hàng xóm)', 'neighbor', '["neighbour"]'::jsonb, '"Neighbor" (Anh-Mỹ) hay "neighbour" (Anh-Anh) đều đúng — người sống cạnh nhà bạn.', NULL, '{"sentence": "The person who lives next door is your ___.", "hint": "n _ _ _ _ _ _ r"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (26, 9, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (27, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'neighbor', '["neighbour"]'::jsonb, 'Người sống gần và giúp tưới cây khi bạn đi vắng — "neighbor". Cách viết "neighbour" cũng được chấp nhận.', NULL, '{"sentence": "My ___ always waters my plants when I go on vacation."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (27, 9, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (28, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "apartment" mean?', 'căn hộ', '[]'::jsonb, '"apartment" /əˈpɑːtmənt/ nghĩa là căn hộ. Ví dụ: She lives in a small apartment downtown.', NULL, '{"options": ["công thức nấu ăn", "cuộc hẹn", "căn hộ", "rộng rãi"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (28, 10, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (29, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: căn hộ)', 'apartment', '["flat"]'::jsonb, '"Apartment" là căn hộ trong một toà nhà nhiều tầng. Người Anh hay nói "flat".', NULL, '{"sentence": "We live in an ___ on the third floor of a big building.", "hint": "a _ _ _ _ _ _ _ t"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (29, 10, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (30, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'apartment', '["flat"]'::jsonb, 'Một căn có hai phòng ngủ và ban công trong toà nhà — "apartment" (hoặc "flat").', NULL, '{"sentence": "Their new ___ has two bedrooms and a balcony with a view of the river."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (30, 10, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (31, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "repair" mean?', 'sửa chữa', '[]'::jsonb, '"repair" /rɪˈpeə(r)/ nghĩa là sửa chữa. Ví dụ: Can you repair the broken window?', NULL, '{"options": ["sự bảo trì", "hoá đơn, biên lai (sau khi trả tiền)", "đăng ký (dùng dịch vụ định kỳ)", "sửa chữa"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (31, 11, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (32, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: sửa chữa)', 'repair', '["fix"]'::jsonb, '"Repair" là sửa cái đang hỏng cho dùng lại được, giống "fix".', NULL, '{"sentence": "The plumber came to ___ the leaking pipe.", "hint": "r _ _ _ _ r"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (32, 11, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (33, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'repair', '["fix"]'::jsonb, 'So sánh giữa sửa cái cũ và mua cái mới → "repair" (hoặc "fix"). "Renovate" là cải tạo cả căn phòng, không dùng cho một cái máy.', NULL, '{"sentence": "It is cheaper to ___ the old washing machine than to buy a new one."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (33, 11, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (34, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "renovate" mean?', 'cải tạo, tân trang', '[]'::jsonb, '"renovate" /ˈrenəveɪt/ nghĩa là cải tạo, tân trang. Ví dụ: They plan to renovate the kitchen next year.', NULL, '{"options": ["cải tạo, tân trang", "chuyển đến nơi ở/làm việc mới", "ngân sách", "tiền thuê nhà"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (34, 12, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (35, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: cải tạo, tân trang)', 'renovate', '[]'::jsonb, '"Renovate" là cải tạo cho mới lại cả một không gian — lớn hơn "repair" nhiều.', NULL, '{"sentence": "We want to ___ the old bathroom and make it look modern.", "hint": "r _ _ _ _ _ _ e"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (35, 12, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (36, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'renovate', '[]'::jsonb, 'Làm mới cả ngôi nhà trước khi bán — "renovate". "Repair" chỉ là sửa chỗ hỏng.', NULL, '{"sentence": "The owners decided to ___ the whole house before selling it."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (36, 12, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (37, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "spacious" mean?', 'rộng rãi', '[]'::jsonb, '"spacious" /ˈspeɪʃəs/ nghĩa là rộng rãi. Ví dụ: The living room is bright and spacious.', NULL, '{"options": ["chủ nhà (người cho thuê)", "rộng rãi", "thực phẩm, hàng tạp hoá", "việc nhà"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (37, 13, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (38, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: rộng rãi)', 'spacious', '[]'::jsonb, '"Spacious" đi từ "space" (không gian) — nhiều không gian tức là rộng rãi.', NULL, '{"sentence": "The room is very ___, so we can fit a big sofa in it.", "hint": "s _ _ _ _ _ _ s"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (38, 13, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (39, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'spacious', '[]'::jsonb, 'So với căn studio chật, nhà ba phòng ngủ cho cảm giác "spacious" — rộng rãi. "Convenient" là tiện lợi, không nói về kích thước.', NULL, '{"sentence": "After living in a tiny studio, the new three-bedroom house felt very ___."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (39, 13, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (40, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "maintenance" mean?', 'sự bảo trì', '[]'::jsonb, '"maintenance" /ˈmeɪntənəns/ nghĩa là sự bảo trì. Ví dụ: The building is closed for maintenance.', NULL, '{"options": ["thói quen hằng ngày", "người thuê nhà", "sự bảo trì", "quần áo cần giặt; việc giặt giũ"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (40, 14, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (41, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: sự bảo trì)', 'maintenance', '[]'::jsonb, '"Maintenance" là việc bảo trì định kỳ để mọi thứ không hỏng — khác với "repair" là sửa khi đã hỏng.', NULL, '{"sentence": "The elevator is not working today because of ___.", "hint": "m _ _ _ _ _ _ _ _ _ e"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (41, 14, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (42, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'maintenance', '[]'::jsonb, 'Phí hằng tháng trả cho việc giữ gìn khu vực chung luôn tốt — "maintenance". Chú ý chính tả: main-te-nance.', NULL, '{"sentence": "The monthly fee covers cleaning and ___ of the shared areas."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (42, 14, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (43, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "relocate" mean?', 'chuyển đến nơi ở/làm việc mới', '[]'::jsonb, '"relocate" /ˌriːləʊˈkeɪt/ nghĩa là chuyển đến nơi ở/làm việc mới. Ví dụ: The company will relocate to Da Nang.', NULL, '{"options": ["đi lại hằng ngày (giữa nhà và nơi làm)", "tiện lợi, thuận tiện", "hợp đồng thuê", "chuyển đến nơi ở/làm việc mới"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (43, 15, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (44, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: chuyển đến nơi ở/làm việc mới)', 'relocate', '["move"]'::jsonb, '"Relocate" = move to a new place, thường dùng khi chuyển nhà hoặc chuyển văn phòng vì công việc.', NULL, '{"sentence": "My family had to ___ to another city for my father''s job.", "hint": "r _ _ _ _ _ _ e"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (44, 15, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (45, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'relocate', '["move"]'::jsonb, 'Chuyển cả nơi sống sang nước khác theo văn phòng — "relocate". "Renovate" là sửa sang, không phải chuyển đi.', NULL, '{"sentence": "Many employees did not want to ___ when the office moved overseas."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (45, 15, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (46, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "groceries" mean?', 'thực phẩm, hàng tạp hoá', '[]'::jsonb, '"groceries" /ˈɡrəʊsəriz/ nghĩa là thực phẩm, hàng tạp hoá. Ví dụ: I buy groceries every Saturday.', NULL, '{"options": ["thực phẩm, hàng tạp hoá", "lịch trình", "mua (trang trọng)", "tiền đặt cọc"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (46, 16, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (47, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: thực phẩm, hàng tạp hoá)', 'groceries', '["grocery"]'::jsonb, '"Groceries" là đồ ăn và đồ dùng mua ở siêu thị, thường dùng số nhiều.', NULL, '{"sentence": "I need to buy ___ like milk, eggs and bread.", "hint": "g _ _ _ _ _ _ _ s"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (47, 16, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (48, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'groceries', '["grocery"]'::jsonb, 'Tiền mua thực phẩm hằng tuần cho cả nhà — "groceries". "Bills" là hoá đơn phải trả như điện nước.', NULL, '{"sentence": "We spend about $60 a week on ___ for the whole family."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (48, 16, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (49, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "laundry" mean?', 'quần áo cần giặt; việc giặt giũ', '[]'::jsonb, '"laundry" /ˈlɔːndri/ nghĩa là quần áo cần giặt; việc giặt giũ. Ví dụ: I do the laundry on Sundays.', NULL, '{"options": ["các dịch vụ tiện ích (điện, nước, ga)", "quần áo cần giặt; việc giặt giũ", "việc vặt (đi mua đồ, gửi thư…)", "hoá đơn (cần thanh toán)"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (49, 17, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (50, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: quần áo cần giặt; việc giặt giũ)', 'laundry', '[]'::jsonb, '"Do the laundry" = giặt đồ. Đây là cụm cố định rất hay gặp.', NULL, '{"sentence": "I have to do the ___ because I have no clean clothes.", "hint": "l _ _ _ _ _ y"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (50, 17, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (51, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'laundry', '[]'::jsonb, 'Đống quần áo bẩn cạnh máy giặt — "laundry". Từ này không đếm được nên không thêm "s".', NULL, '{"sentence": "There is a pile of dirty ___ next to the washing machine."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (51, 17, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (52, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "commute" mean?', 'đi lại hằng ngày (giữa nhà và nơi làm)', '[]'::jsonb, '"commute" /kəˈmjuːt/ nghĩa là đi lại hằng ngày (giữa nhà và nơi làm). Ví dụ: I commute to work by bus.', NULL, '{"options": ["cuộc hẹn", "đồ nội thất", "đi lại hằng ngày (giữa nhà và nơi làm)", "công thức nấu ăn"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (52, 18, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (53, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: đi lại hằng ngày (giữa nhà và nơi làm))', 'commute', '[]'::jsonb, '"Commute" là chuyến đi lặp lại mỗi ngày giữa nhà và chỗ làm/chỗ học.', NULL, '{"sentence": "Many people ___ to the city center by train every morning.", "hint": "c _ _ _ _ _ e"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (53, 18, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (54, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'commute', '[]'::jsonb, 'Thời gian đi lại mỗi chiều giữa nhà và công ty — "commute". "Relocate" là chuyển hẳn đến nơi mới, chỉ làm một lần.', NULL, '{"sentence": "Living near the office means I only ___ for ten minutes each way."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (54, 18, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (55, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "schedule" mean?', 'lịch trình', '[]'::jsonb, '"schedule" /ˈʃedjuːl/ nghĩa là lịch trình. Ví dụ: My schedule is very busy this week.', NULL, '{"options": ["hoá đơn, biên lai (sau khi trả tiền)", "đăng ký (dùng dịch vụ định kỳ)", "thiết bị gia dụng", "lịch trình"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (55, 19, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (56, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: lịch trình)', 'schedule', '[]'::jsonb, '"Schedule" là danh sách việc theo giờ. Người Mỹ đọc /ˈskedʒuːl/, người Anh đọc /ˈʃedjuːl/.', NULL, '{"sentence": "Let me check my ___ to see if I am free on Friday.", "hint": "s _ _ _ _ _ _ e"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (56, 19, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (57, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'schedule', '[]'::jsonb, '"Behind schedule" = trễ so với lịch. Đây là cụm cố định — "routine" không đi với "behind".', NULL, '{"sentence": "The train is running ten minutes behind ___ because of the rain."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (57, 19, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (58, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "errand" mean?', 'việc vặt (đi mua đồ, gửi thư…)', '[]'::jsonb, '"errand" /ˈerənd/ nghĩa là việc vặt (đi mua đồ, gửi thư…). Ví dụ: I have a few errands to run this afternoon.', NULL, '{"options": ["việc vặt (đi mua đồ, gửi thư…)", "ngân sách", "tiền thuê nhà", "hàng xóm"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (58, 20, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (59, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: việc vặt (đi mua đồ, gửi thư…))', 'errand', '["errands"]'::jsonb, '"Run an errand" là đi làm một việc vặt nhỏ bên ngoài, như ra bưu điện hay ngân hàng.', NULL, '{"sentence": "I need to run an ___: go to the post office and the bank.", "hint": "e _ _ _ _ d"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (59, 20, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (60, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'errand', '["errands"]'::jsonb, 'Đi làm vài việc lặt vặt trước khi cửa hàng đóng — "errands". "Chores" là việc nhà làm trong nhà.', NULL, '{"sentence": "She left work early to run a few ___ before the shops closed."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (60, 20, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (61, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "recipe" mean?', 'công thức nấu ăn', '[]'::jsonb, '"recipe" /ˈresəpi/ nghĩa là công thức nấu ăn. Ví dụ: This recipe needs three eggs.', NULL, '{"options": ["căn hộ", "công thức nấu ăn", "việc nhà", "chủ nhà (người cho thuê)"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (61, 21, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (62, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: công thức nấu ăn)', 'recipe', '[]'::jsonb, '"Recipe" đọc là /ˈresəpi/ (3 âm tiết) — đừng nhầm với "receipt" (hoá đơn).', NULL, '{"sentence": "Follow the ___ carefully if you want the cake to be good.", "hint": "r _ _ _ _ e"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (62, 21, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (63, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'recipe', '[]'::jsonb, 'Muốn tự nấu lại món canh thì cần công thức — "recipe". "Receipt" là tờ hoá đơn, nghe giống nhưng nghĩa khác hẳn.', NULL, '{"sentence": "Can you share the ___ for this soup? I want to cook it at home."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (63, 21, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (64, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "receipt" mean?', 'hoá đơn, biên lai (sau khi trả tiền)', '[]'::jsonb, '"receipt" /rɪˈsiːt/ nghĩa là hoá đơn, biên lai (sau khi trả tiền). Ví dụ: Keep the receipt in case you want to return it.', NULL, '{"options": ["người thuê nhà", "sửa chữa", "hoá đơn, biên lai (sau khi trả tiền)", "thói quen hằng ngày"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (64, 22, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (65, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: hoá đơn, biên lai (sau khi trả tiền))', 'receipt', '[]'::jsonb, '"Receipt" là tờ giấy chứng nhận bạn **đã** trả tiền. Chữ "p" câm: /rɪˈsiːt/.', NULL, '{"sentence": "Please keep your ___ if you want to return the shirt.", "hint": "r _ _ _ _ _ t"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (65, 22, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (66, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'receipt', '[]'::jsonb, 'Muốn hoàn tiền thì cần bằng chứng đã mua — "receipt". "Bill" là hoá đơn bạn **cần** trả, chưa trả.', NULL, '{"sentence": "I can''t get a refund because I lost the ___."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (66, 22, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (67, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "budget" mean?', 'ngân sách', '[]'::jsonb, '"budget" /ˈbʌdʒɪt/ nghĩa là ngân sách. Ví dụ: We have a small budget for the trip.', NULL, '{"options": ["tiện lợi, thuận tiện", "hợp đồng thuê", "cải tạo, tân trang", "ngân sách"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (67, 23, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (68, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: ngân sách)', 'budget', '[]'::jsonb, '"Budget" là số tiền bạn dự định chi cho một việc.', NULL, '{"sentence": "Our ___ for food is $300 a month.", "hint": "b _ _ _ _ t"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (68, 23, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (69, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'budget', '[]'::jsonb, '"Outside our budget" = vượt quá số tiền định chi. Còn "bill" là hoá đơn cụ thể, không có nghĩa này.', NULL, '{"sentence": "The new sofa was too expensive, so it was outside our ___."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (69, 23, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (70, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "chore" mean?', 'việc nhà', '[]'::jsonb, '"chore" /tʃɔː(r)/ nghĩa là việc nhà. Ví dụ: Washing dishes is my least favorite chore.', NULL, '{"options": ["việc nhà", "mua (trang trọng)", "tiền đặt cọc", "rộng rãi"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (70, 24, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (71, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: việc nhà)', 'chore', '["chores"]'::jsonb, '"Chore" là việc nhà nhàm chán phải làm thường xuyên: rửa bát, lau nhà…', NULL, '{"sentence": "Cleaning the bathroom is my least favorite ___.", "hint": "c _ _ _ e"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (71, 24, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (72, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'chore', '["chores"]'::jsonb, 'Việc nhà chia nhau làm — "chores". "Errands" là việc vặt phải ra ngoài làm.', NULL, '{"sentence": "On weekends the whole family shares the household ___ like cooking and cleaning."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (72, 24, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (73, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "routine" mean?', 'thói quen hằng ngày', '[]'::jsonb, '"routine" /ruːˈtiːn/ nghĩa là thói quen hằng ngày. Ví dụ: Exercise is part of my morning routine.', NULL, '{"options": ["sự bảo trì", "thói quen hằng ngày", "hoá đơn (cần thanh toán)", "các dịch vụ tiện ích (điện, nước, ga)"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (73, 25, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (74, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: thói quen hằng ngày)', 'routine', '[]'::jsonb, '"Routine" là chuỗi việc bạn làm theo cùng một thứ tự mỗi ngày.', NULL, '{"sentence": "My morning ___ is: wake up, shower, and have breakfast.", "hint": "r _ _ _ _ _ e"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (74, 25, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (75, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'routine', '[]'::jsonb, 'Việc làm đều đặn mỗi ngày, trở thành nếp sống — "routine". "Schedule" thiên về lịch hẹn theo giờ cụ thể.', NULL, '{"sentence": "Going for a run before work has become part of my daily ___."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (75, 25, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (76, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "convenient" mean?', 'tiện lợi, thuận tiện', '[]'::jsonb, '"convenient" /kənˈviːniənt/ nghĩa là tiện lợi, thuận tiện. Ví dụ: The supermarket is very convenient.', NULL, '{"options": ["đồ nội thất", "chuyển đến nơi ở/làm việc mới", "tiện lợi, thuận tiện", "cuộc hẹn"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (76, 26, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (77, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: tiện lợi, thuận tiện)', 'convenient', '[]'::jsonb, '"Convenient" = tiện lợi, dễ dàng cho bạn. Trái nghĩa là "inconvenient".', NULL, '{"sentence": "The apartment is ___ because it is close to the bus stop.", "hint": "c _ _ _ _ _ _ _ _ t"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (77, 26, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (78, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'convenient', '[]'::jsonb, 'Làm việc mà không cần ra khỏi nhà → thuận tiện — "convenient". "Spacious" nói về độ rộng, không hợp ngữ cảnh.', NULL, '{"sentence": "Online banking is ___ because you can pay bills without leaving home."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (78, 26, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (79, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "purchase" mean?', 'mua (trang trọng)', '[]'::jsonb, '"purchase" /ˈpɜːtʃəs/ nghĩa là mua (trang trọng). Ví dụ: You can purchase tickets online.', NULL, '{"options": ["đăng ký (dùng dịch vụ định kỳ)", "thiết bị gia dụng", "thực phẩm, hàng tạp hoá", "mua (trang trọng)"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (79, 27, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (80, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: mua (trang trọng))', 'purchase', '["buy"]'::jsonb, '"Purchase" = buy, nhưng trang trọng hơn — rất hay gặp trong thông báo và bài thi TOEIC.', NULL, '{"sentence": "You can ___ tickets at the front desk or online.", "hint": "p _ _ _ _ _ _ e"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (80, 27, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (81, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'purchase', '["buy"]'::jsonb, 'Mua hai món được tặng món thứ ba → "purchase" (hoặc "buy"). "Subscribe" là đăng ký dùng định kỳ, không phải mua từng món.', NULL, '{"sentence": "Customers who ___ two items will receive a third one for free."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (81, 27, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (82, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "bill" mean?', 'hoá đơn (cần thanh toán)', '[]'::jsonb, '"bill" /bɪl/ nghĩa là hoá đơn (cần thanh toán). Ví dụ: The electricity bill was high this month.', NULL, '{"options": ["hoá đơn (cần thanh toán)", "tiền thuê nhà", "hàng xóm", "quần áo cần giặt; việc giặt giũ"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (82, 28, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (83, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: hoá đơn (cần thanh toán))', 'bill', '[]'::jsonb, '"Bill" là hoá đơn ghi số tiền bạn cần trả: điện, nước, nhà hàng…', NULL, '{"sentence": "I have to pay the water ___ before Friday.", "hint": "b _ _ l"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (83, 28, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (84, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'bill', '[]'::jsonb, 'Hoá đơn có hạn thanh toán ngày 15 — "bill". "Receipt" là giấy nhận sau khi đã trả xong.', NULL, '{"sentence": "The phone ___ is due on the 15th, so don''t forget to pay it."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (84, 28, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (85, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "appointment" mean?', 'cuộc hẹn', '[]'::jsonb, '"appointment" /əˈpɔɪntmənt/ nghĩa là cuộc hẹn. Ví dụ: I have a dentist appointment at 10.', NULL, '{"options": ["đi lại hằng ngày (giữa nhà và nơi làm)", "cuộc hẹn", "chủ nhà (người cho thuê)", "căn hộ"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (85, 29, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (86, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: cuộc hẹn)', 'appointment', '[]'::jsonb, '"Make an appointment" = đặt lịch hẹn, thường với bác sĩ, ngân hàng, cơ quan.', NULL, '{"sentence": "I made an ___ with the doctor for Tuesday morning.", "hint": "a _ _ _ _ _ _ _ _ _ t"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (86, 29, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (87, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'appointment', '[]'::jsonb, 'Cuộc gặp đã đặt giờ với giám đốc ngân hàng — "appointment". "Schedule" là cả lịch trình, không phải một cuộc hẹn.', NULL, '{"sentence": "Please arrive ten minutes early for your ___ with the bank manager."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (87, 29, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (88, 'VOCABULARY', 'READING', 'MULT_CHOICE', 1, 'What does "subscribe" mean?', 'đăng ký (dùng dịch vụ định kỳ)', '[]'::jsonb, '"subscribe" /səbˈskraɪb/ nghĩa là đăng ký (dùng dịch vụ định kỳ). Ví dụ: I subscribe to a music streaming service.', NULL, '{"options": ["sửa chữa", "lịch trình", "đăng ký (dùng dịch vụ định kỳ)", "người thuê nhà"]}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (88, 30, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (89, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 2, 'Điền từ còn thiếu (gợi ý: đăng ký (dùng dịch vụ định kỳ))', 'subscribe', '[]'::jsonb, '"Subscribe to" = đăng ký nhận/đều đặn trả tiền cho một dịch vụ. Nhớ đi với giới từ "to".', NULL, '{"sentence": "I ___ to a magazine that arrives every month.", "hint": "s _ _ _ _ _ _ _ e"}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (89, 30, 'TARGET');
INSERT INTO questions (id, content_type, skill, question_type, tier, question_text, answer, accepted_answers, explanation, audio_url, metadata) VALUES (90, 'VOCABULARY', 'WRITING', 'FILL_BLANK', 3, 'Điền một từ phù hợp vào chỗ trống', 'subscribe', '[]'::jsonb, 'Đăng ký nhận bản tin định kỳ — "subscribe". "Purchase" là mua một lần, không đi với "to our newsletter".', NULL, '{"sentence": "If you ___ to our newsletter, you will get a 10% discount code."}'::jsonb);
INSERT INTO question_vocabularies (question_id, vocabulary_id, relation_type) VALUES (90, 30, 'TARGET');
SELECT setval(pg_get_serial_sequence('questions', 'id'), (SELECT MAX(id) FROM questions));

-- ===== Bài thi Housing Lv2 (VS4 mới chấm; ở đây chỉ để gói đủ phạm vi DoD): 10 câu tier 3 =====
INSERT INTO exams (code, building_id, target_level, reward_blueprint_id, question_count) VALUES ('EXAM_HOUSING_LV2', (SELECT id FROM buildings WHERE code = 'HOUSING'), 2, (SELECT id FROM blueprints WHERE code = 'BLUEPRINT_HOUSING_LV2'), 10);
INSERT INTO exam_requirements (exam_id, required_card_count, required_knowledge, required_blueprint_shards) VALUES ((SELECT id FROM exams WHERE code = 'EXAM_HOUSING_LV2'), 30, 200, 0);
INSERT INTO exam_questions (exam_id, question_id) VALUES ((SELECT id FROM exams WHERE code = 'EXAM_HOUSING_LV2'), 3);
INSERT INTO exam_questions (exam_id, question_id) VALUES ((SELECT id FROM exams WHERE code = 'EXAM_HOUSING_LV2'), 12);
INSERT INTO exam_questions (exam_id, question_id) VALUES ((SELECT id FROM exams WHERE code = 'EXAM_HOUSING_LV2'), 21);
INSERT INTO exam_questions (exam_id, question_id) VALUES ((SELECT id FROM exams WHERE code = 'EXAM_HOUSING_LV2'), 30);
INSERT INTO exam_questions (exam_id, question_id) VALUES ((SELECT id FROM exams WHERE code = 'EXAM_HOUSING_LV2'), 39);
INSERT INTO exam_questions (exam_id, question_id) VALUES ((SELECT id FROM exams WHERE code = 'EXAM_HOUSING_LV2'), 48);
INSERT INTO exam_questions (exam_id, question_id) VALUES ((SELECT id FROM exams WHERE code = 'EXAM_HOUSING_LV2'), 57);
INSERT INTO exam_questions (exam_id, question_id) VALUES ((SELECT id FROM exams WHERE code = 'EXAM_HOUSING_LV2'), 66);
INSERT INTO exam_questions (exam_id, question_id) VALUES ((SELECT id FROM exams WHERE code = 'EXAM_HOUSING_LV2'), 75);
INSERT INTO exam_questions (exam_id, question_id) VALUES ((SELECT id FROM exams WHERE code = 'EXAM_HOUSING_LV2'), 84);

COMMIT;
