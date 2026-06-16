import { Pool } from "@neondatabase/serverless";
import { cacheTag } from "next/cache";

import type { Answer, Course, Lesson, Question, UserOutcome } from "./types";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function getCourses(): Promise<Course[]> {
  "use cache";
  cacheTag("courses"); 
  const { rows } = await pool.query("SELECT * FROM courses");
  return rows as Course[];
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  "use cache";
  cacheTag("courses", `course-${id}`);
  const { rows } = await pool.query("SELECT * FROM courses WHERE id = $1", [
    id,
  ]);
  return rows[0] as Course | undefined;
}

export async function getLessonsByCourse(courseId: string): Promise<Lesson[]> {
  "use cache";
  cacheTag(`lessons-${courseId}`);
  const { rows } = await pool.query(
    'SELECT id, course_id as "courseId", title, material FROM lessons WHERE course_id = $1',
    [courseId],
  );
  return rows as Lesson[];
}

export async function getLessonById(id: string): Promise<Lesson | undefined> {
  "use cache";
  cacheTag(`lesson-${id}`);
  const { rows } = await pool.query(
    'SELECT id, course_id as "courseId", title, material FROM lessons WHERE id = $1',
    [id],
  );
  return rows[0] as Lesson | undefined;
}

export async function getQuestionsByLesson(
  lessonId: string,
): Promise<Question[]> {
  "use cache";
  cacheTag(`questions-${lessonId}`);
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

export async function getQuestionById(
  id: string,
): Promise<Question | undefined> {
  "use cache";
  cacheTag(`question-${id}`);
  const { rows } = await pool.query(
    'SELECT id, lesson_id as "lessonId", text FROM questions WHERE id = $1',
    [id],
  );
  if (rows.length === 0) return undefined;
  const q = rows[0];
  const { rows: answers } = await pool.query(
    'SELECT id, text, is_correct as "isCorrect" FROM answers WHERE question_id = $1',
    [id],
  );
  return {
    ...q,
    answers: answers as Answer[],
  } as Question;
}

export async function getOutcomes(userId: string): Promise<UserOutcome[]> {
  "use cache";
  cacheTag(`outcomes-${userId}`);
  const { rows } = await pool.query(
    'SELECT id, user_id as "userId", lesson_id as "lessonId", score, total_questions as "totalQuestions", ai_summary as "aiSummary", created_at as "createdAt" FROM user_outcomes WHERE user_id = $1 ORDER BY created_at DESC',
    [userId],
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

export async function createCourse(
  id: string,
  title: string,
  description: string,
) {
  await pool.query(
    "INSERT INTO courses (id, title, description) VALUES ($1, $2, $3)",
    [id, title, description],
  );
}

export async function deleteCourse(id: string) {
  await pool.query("DELETE FROM courses WHERE id = $1", [id]);
}

export async function createLesson(
  id: string,
  courseId: string,
  title: string,
  material: string,
) {
  const paragraphs = material.split("\n").filter((p) => p.trim() !== "");
  await pool.query(
    "INSERT INTO lessons (id, course_id, title, material) VALUES ($1, $2, $3, $4)",
    [id, courseId, title, JSON.stringify(paragraphs)],
  );
}

export async function deleteLesson(id: string) {
  await pool.query("DELETE FROM lessons WHERE id = $1", [id]);
}

export async function createQuestionWithAnswers(
  qId: string,
  lessonId: string,
  text: string,
  answers: { text: string; isCorrect: boolean; aId: string }[],
) {
  await pool.query(
    "INSERT INTO questions (id, lesson_id, text) VALUES ($1, $2, $3)",
    [qId, lessonId, text],
  );

  for (const ans of answers) {
    await pool.query(
      "INSERT INTO answers (id, question_id, text, is_correct) VALUES ($1, $2, $3, $4)",
      [ans.aId, qId, ans.text, ans.isCorrect],
    );
  }
}

export async function deleteQuestion(id: string) {
  await pool.query("DELETE FROM questions WHERE id = $1", [id]);
}

export async function updateCourse(
  id: string,
  title: string,
  description: string,
) {
  await pool.query(
    "UPDATE courses SET title = $1, description = $2 WHERE id = $3",
    [title, description, id],
  );
}

export async function updateLesson(
  id: string,
  title: string,
  material: string,
) {
  const paragraphs = material.split("\n").filter((p) => p.trim() !== "");
  await pool.query(
    "UPDATE lessons SET title = $1, material = $2 WHERE id = $3",
    [title, JSON.stringify(paragraphs), id],
  );
}

export async function updateQuestionWithAnswers(
  qId: string,
  text: string,
  answers: { text: string; isCorrect: boolean; aId: string }[],
) {
  await pool.query("UPDATE questions SET text = $1 WHERE id = $2", [text, qId]);

  await pool.query("DELETE FROM answers WHERE question_id = $1", [qId]);

  for (const ans of answers) {
    await pool.query(
      "INSERT INTO answers (id, question_id, text, is_correct) VALUES ($1, $2, $3, $4)",
      [ans.aId, qId, ans.text, ans.isCorrect],
    );
  }
}
