CREATE TABLE courses (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE lessons (
    id VARCHAR(255) PRIMARY KEY,
    course_id VARCHAR(255) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    material JSONB NOT NULL -- Stores array of strings for paragraphs
);

CREATE TABLE questions (
    id VARCHAR(255) PRIMARY KEY,
    lesson_id VARCHAR(255) NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    text TEXT NOT NULL
);

CREATE TABLE answers (
    id VARCHAR(255) PRIMARY KEY,
    question_id VARCHAR(255) NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE user_outcomes (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    lesson_id VARCHAR(255) NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    ai_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_lessons_course_id ON lessons(course_id);
CREATE INDEX idx_questions_lesson_id ON questions(lesson_id);
CREATE INDEX idx_answers_question_id ON answers(question_id);
CREATE INDEX idx_user_outcomes_user_id ON user_outcomes(user_id);
CREATE INDEX idx_user_outcomes_lesson_id ON user_outcomes(lesson_id);
