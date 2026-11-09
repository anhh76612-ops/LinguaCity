-- Kho thẻ: lần cuối trả lời đúng của một từ (docs/04-ui/redesign/2026-11-09-kho-the-design.md §9).
-- Dòng cũ để null; app tính từ firstSeenAt.
-- Chạy:  psql -U postgres -d linguacity_db -v ON_ERROR_STOP=1 -f database/migration/V008__vocab_progress_last_correct_at.sql

BEGIN;

ALTER TABLE user_vocab_progress ADD COLUMN last_correct_at TIMESTAMP;

COMMIT;
