-- ADR-017: Kinh tế v2 (Gạch, Gỗ) + Mastery v2 (giảm theo thời gian, tốt nghiệp).
BEGIN;

ALTER TABLE user_profiles
    ADD COLUMN bricks INT NOT NULL DEFAULT 0 CHECK (bricks >= 0),
    ADD COLUMN wood   INT NOT NULL DEFAULT 0 CHECK (wood >= 0);

ALTER TABLE user_vocab_progress
    ADD COLUMN last_correct_at TIMESTAMP NULL,
    ADD COLUMN graduated_at    TIMESTAMP NULL;

-- Người chơi cũ: lấy lần ôn gần nhất làm mốc trả lời đúng cho các từ đã sưu tầm,
-- để không bị trừ Mastery ngay sau khi nâng cấp.
UPDATE user_vocab_progress
SET last_correct_at = last_reviewed_at
WHERE collected_at IS NOT NULL AND last_reviewed_at IS NOT NULL;

-- Từ đã đạt max trước khi có luật tốt nghiệp: coi như đã tốt nghiệp (max theo độ khó, ADR-013).
UPDATE user_vocab_progress p
SET graduated_at = p.updated_at
FROM vocabularies v
WHERE v.id = p.vocabulary_id
  AND p.mastery_score >= CASE v.difficulty_rank
        WHEN 'D' THEN 10 WHEN 'C' THEN 15 WHEN 'B' THEN 20 ELSE 25 END;

COMMIT;
