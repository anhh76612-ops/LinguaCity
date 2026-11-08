-- M8 · UC_14 Tuỳ biến nhân vật và nhà
-- Thiết kế: docs/03-architecture/system-design.md §10.2.3, §10.4.4 · BR-COS-01..03
-- Chạy:  psql -U postgres -d linguacity_db -v ON_ERROR_STOP=1 -f database/migration/V005__cosmetics.sql

BEGIN;

-- ---------- Danh mục món tuỳ biến (nội dung tĩnh, thuộc gói CORE) ----------
-- asset_key: giá trị city-web dùng để VẼ (màu "#rrggbb" hoặc từ khoá kiểu dáng), xem system-design §9.2.2.
CREATE TABLE cosmetic_items (
    code             VARCHAR(50)  PRIMARY KEY,
    category         VARCHAR(20)  NOT NULL CHECK (category IN
                         ('SKIN', 'HAIR_STYLE', 'HAIR_COLOR', 'SHIRT_COLOR', 'PANTS_COLOR', 'ACCESSORY', 'WALL', 'FLOOR')),
    name             VARCHAR(100) NOT NULL,
    unlock_type      VARCHAR(20)  NOT NULL CHECK (unlock_type IN ('FREE', 'KP', 'ACHIEVEMENT')),
    price_kp         INT          NOT NULL DEFAULT 0 CHECK (price_kp >= 0),
    achievement_code VARCHAR(50)  NULL REFERENCES achievements (code),
    asset_key        VARCHAR(100) NOT NULL,
    sort_order       INT          NOT NULL DEFAULT 0,
    CHECK ((unlock_type = 'KP' AND price_kp > 0) OR (unlock_type <> 'KP')),
    CHECK ((unlock_type = 'ACHIEVEMENT') = (achievement_code IS NOT NULL))
);

INSERT INTO cosmetic_items (code, category, name, unlock_type, price_kp, achievement_code, asset_key, sort_order) VALUES
    -- Nhân vật: miễn phí toàn bộ (BR-COS-01)
    ('SKIN_1',        'SKIN',        'Da sáng',        'FREE', 0, NULL, '#f9dcc4', 1),
    ('SKIN_2',        'SKIN',        'Da hồng',        'FREE', 0, NULL, '#f1c7a5', 2),
    ('SKIN_3',        'SKIN',        'Da trung bình',  'FREE', 0, NULL, '#e3ad86', 3),
    ('SKIN_4',        'SKIN',        'Da ngăm',        'FREE', 0, NULL, '#c98f66', 4),
    ('SKIN_5',        'SKIN',        'Da nâu',         'FREE', 0, NULL, '#9c6b4c', 5),
    ('HAIR_SHORT',    'HAIR_STYLE',  'Tóc ngắn',       'FREE', 0, NULL, 'short',   1),
    ('HAIR_LONG',     'HAIR_STYLE',  'Tóc dài',        'FREE', 0, NULL, 'long',    2),
    ('HAIR_BUN',      'HAIR_STYLE',  'Tóc búi',        'FREE', 0, NULL, 'bun',     3),
    ('HAIR_SPIKY',    'HAIR_STYLE',  'Tóc dựng',       'FREE', 0, NULL, 'spiky',   4),
    ('HAIR_BLACK',    'HAIR_COLOR',  'Đen',            'FREE', 0, NULL, '#2b2522', 1),
    ('HAIR_BROWN',    'HAIR_COLOR',  'Nâu',            'FREE', 0, NULL, '#4a3426', 2),
    ('HAIR_CHESTNUT', 'HAIR_COLOR',  'Hạt dẻ',         'FREE', 0, NULL, '#7a4b2a', 3),
    ('HAIR_BLONDE',   'HAIR_COLOR',  'Vàng',           'FREE', 0, NULL, '#e6c27a', 4),
    ('HAIR_BLUE',     'HAIR_COLOR',  'Xanh khói',      'FREE', 0, NULL, '#5b6b8c', 5),
    ('HAIR_ROSE',     'HAIR_COLOR',  'Hồng đất',       'FREE', 0, NULL, '#b05a6a', 6),
    ('SHIRT_TEAL',    'SHIRT_COLOR', 'Xanh ngọc',      'FREE', 0, NULL, '#4db6ac', 1),
    ('SHIRT_RED',     'SHIRT_COLOR', 'Đỏ',             'FREE', 0, NULL, '#e57373', 2),
    ('SHIRT_BLUE',    'SHIRT_COLOR', 'Xanh dương',     'FREE', 0, NULL, '#64b5f6', 3),
    ('SHIRT_GREEN',   'SHIRT_COLOR', 'Xanh lá',        'FREE', 0, NULL, '#81c784', 4),
    ('SHIRT_ORANGE',  'SHIRT_COLOR', 'Cam',            'FREE', 0, NULL, '#ffb74d', 5),
    ('SHIRT_PURPLE',  'SHIRT_COLOR', 'Tím',            'FREE', 0, NULL, '#ba68c8', 6),
    ('PANTS_NAVY',    'PANTS_COLOR', 'Xanh navy',      'FREE', 0, NULL, '#3949ab', 1),
    ('PANTS_SLATE',   'PANTS_COLOR', 'Xám xanh',       'FREE', 0, NULL, '#455a64', 2),
    ('PANTS_BROWN',   'PANTS_COLOR', 'Nâu',            'FREE', 0, NULL, '#5d4037', 3),
    ('PANTS_CHARCOAL','PANTS_COLOR', 'Than chì',       'FREE', 0, NULL, '#37474f', 4),
    ('ACC_NONE',      'ACCESSORY',   'Không',          'FREE', 0, NULL, 'none',    1),
    ('ACC_GLASSES',   'ACCESSORY',   'Kính',           'FREE', 0, NULL, 'glasses', 2),
    ('ACC_HAT',       'ACCESSORY',   'Mũ phớt',        'FREE', 0, NULL, 'hat',     3),
    -- Nhà: 2 mẫu miễn phí mỗi loại, còn lại mở bằng KP hoặc danh hiệu (BR-COS-02)
    ('WALL_CREAM',    'WALL',        'Kem',            'FREE',        0,   NULL,          '#f3e7d3', 1),
    ('WALL_MINT',     'WALL',        'Bạc hà',         'FREE',        0,   NULL,          '#cfe7d6', 2),
    ('WALL_SKY',      'WALL',        'Xanh trời',      'KP',          60,  NULL,          '#cfe0f0', 3),
    ('WALL_PEACH',    'WALL',        'Đào',            'KP',          60,  NULL,          '#f2c9a8', 4),
    ('WALL_BRICK',    'WALL',        'Gạch nung',      'ACHIEVEMENT', 0,   'GOOD_START',  '#d98c6a', 5),
    ('WALL_LAVENDER', 'WALL',        'Oải hương',      'ACHIEVEMENT', 0,   'DILIGENT',    '#dcd0ec', 6),
    ('FLOOR_OAK',     'FLOOR',       'Gỗ sồi',         'FREE',        0,   NULL,          'oak',     1),
    ('FLOOR_TILE',    'FLOOR',       'Gạch men',       'FREE',        0,   NULL,          'tile',    2),
    ('FLOOR_WALNUT',  'FLOOR',       'Gỗ óc chó',      'KP',          80,  NULL,          'walnut',  3),
    ('FLOOR_CHECKER', 'FLOOR',       'Bàn cờ',         'KP',          120, NULL,          'checker', 4),
    ('FLOOR_CARPET',  'FLOOR',       'Thảm đỏ',        'ACHIEVEMENT', 0,   'COLLECTOR',   'carpet',  5);

-- CORE nay có thêm danh mục tuỳ biến → tăng version để app tải lại (ADR-012)
UPDATE content_packs SET version = version + 1, updated_at = now() WHERE code = 'CORE';

-- ---------- Món người chơi đã mua bằng KP ----------
-- Món FREE luôn có; món ACHIEVEMENT có khi giữ danh hiệu tương ứng → không lưu ở đây (BR-COS-02).
CREATE TABLE user_cosmetics (
    user_id     UUID        NOT NULL REFERENCES user_profiles (id) ON DELETE CASCADE,
    item_code   VARCHAR(50) NOT NULL REFERENCES cosmetic_items (code),
    unlocked_at TIMESTAMP   NOT NULL,
    PRIMARY KEY (user_id, item_code)
);

COMMIT;
