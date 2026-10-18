CREATE TABLE user_profiles (
    id UUID PRIMARY KEY,
    knowledge_points INTEGER NOT NULL DEFAULT 0
        CHECK (knowledge_points >= 0),
    hourglass_count INTEGER NOT NULL DEFAULT 0
        CHECK (hourglass_count >= 0),
    blueprint_shards INTEGER NOT NULL DEFAULT 0
        CHECK (blueprint_shards >= 0)
);