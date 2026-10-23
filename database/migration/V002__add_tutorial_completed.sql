-- VS1 / UC_02 Complete Tutorial
-- DEFAULT FALSE giúp các hồ sơ đã tồn tại có giá trị hợp lệ ngay khi thêm cột NOT NULL.
ALTER TABLE user_profiles
    ADD COLUMN tutorial_completed BOOLEAN NOT NULL DEFAULT FALSE;
