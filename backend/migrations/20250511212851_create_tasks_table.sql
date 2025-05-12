-- Add migration script here
CREATE TYPE magnitude_type AS ENUM ('NotTrivial', 'Trivial', 'Important');
CREATE TYPE difficulty_type AS ENUM ('Easy', 'Medium', 'Hard');

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    finish_date TIMESTAMPTZ NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    magnitude magnitude_type NOT NULL,
    difficulty difficulty_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    assigned_member_id VARCHAR(255)
);