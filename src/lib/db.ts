import { Pool } from "@neondatabase/serverless";
import type { Course, Lesson, Question, UserOutcome } from "./types";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function getCourses(): Promise<Course[]> {
  const { rows } = await pool.query("SELECT * FROM courses");
  return rows as Course[];
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  const { rows } = await pool.query("SELECT * FROM courses WHERE id = $1", [
    id,
  ]);
  return rows[0] as Course | undefined;
}

export async function getLessonsByCourse(courseId: string): Promise<Lesson[]> {
  const { rows } = await pool.query(
    'SELECT id, course_id as "courseId", title, material FROM lessons WHERE course_id = $1',
    [courseId],
  );
  return rows as Lesson[];
}

export async function getLessonById(id: string): Promise<Lesson | undefined> {
  const { rows } = await pool.query(
    'SELECT id, course_id as "courseId", title, material FROM lessons WHERE id = $1',
    [id],
  );
  return rows[0] as Lesson | undefined;
}

export async function getQuestionsByLesson(
  lessonId: string,
): Promise<Question[]> {
  const { rows: questions } = await pool.query(
    'SELECT id, lesson_id as "lessonId", text FROM questions WHERE lesson_id = $1',
    [lessonId],
  );

  if (questions.length === 0) return [];

  const questionIds = questions.map((q) => q.id);

  // Create placeholders for the IN clause like $1, $2, $3
  const placeholders = questionIds.map((_, i) => `$${i + 1}`).join(",");
  const { rows: answers } = await pool.query(
    `SELECT id, question_id as "questionId", text, is_correct as "isCorrect" FROM answers WHERE question_id IN (${placeholders})`,
    questionIds,
  );

  return questions.map((q) => ({
    ...q,
    answers: answers.filter((a) => a.questionId === q.id),
  })) as Question[];
}

export async function getOutcomes(): Promise<UserOutcome[]> {
  const { rows } = await pool.query(
    'SELECT id, user_id as "userId", lesson_id as "lessonId", score, total_questions as "totalQuestions", ai_summary as "aiSummary", created_at as "createdAt" FROM user_outcomes ORDER BY created_at DESC',
  );
  return rows.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
  })) as UserOutcome[];
}

export async function saveOutcome(
  outcome: Omit<UserOutcome, "id" | "createdAt">,
): Promise<UserOutcome> {
  const id = Math.random().toString(36).substring(7); // Can be replaced by gen_random_uuid() in postgres later
  const { rows } = await pool.query(
    `INSERT INTO user_outcomes (id, user_id, lesson_id, score, total_questions, ai_summary) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING id, user_id as "userId", lesson_id as "lessonId", score, total_questions as "totalQuestions", ai_summary as "aiSummary", created_at as "createdAt"`,
    [
      id,
      outcome.userId,
      outcome.lessonId,
      outcome.score,
      outcome.totalQuestions,
      outcome.aiSummary,
    ],
  );

  const saved = rows[0];
  return {
    ...saved,
    createdAt: saved.createdAt.toISOString(),
  } as UserOutcome;
}

export async function updateOutcomeSummary(
  id: string,
  aiSummary: string,
): Promise<UserOutcome | null> {
  const { rows } = await pool.query(
    `UPDATE user_outcomes 
     SET ai_summary = $1 
     WHERE id = $2 
     RETURNING id, user_id as "userId", lesson_id as "lessonId", score, total_questions as "totalQuestions", ai_summary as "aiSummary", created_at as "createdAt"`,
    [aiSummary, id],
  );

  if (rows.length === 0) return null;

  const updated = rows[0];
  return {
    ...updated,
    createdAt: updated.createdAt.toISOString(),
  } as UserOutcome;
}
