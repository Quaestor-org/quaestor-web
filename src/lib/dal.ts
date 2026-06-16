import { auth } from "@clerk/nextjs/server";
import { err, ok, type Result } from "neverthrow";
import { connection } from "next/server";
import { isAdmin } from "./clerk";
import * as db from "./db";
import type { Course, Lesson, Question, UserOutcome } from "./types";

export async function fetchCourses(
  query?: string,
): Promise<Result<Course[], Error>> {
  try {
    const { userId } = await auth();
    if (!userId) return err(new Error("Unauthorized"));

    let courses = await db.getCourses();
    if (query) {
      const lowerQuery = query.toLowerCase();
      courses = courses.filter(
        (c) =>
          c.title.toLowerCase().includes(lowerQuery) ||
          c.description.toLowerCase().includes(lowerQuery),
      );
    }
    return ok(courses);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

export async function fetchCourseData(
  courseId: string,
): Promise<Result<{ course: Course | undefined; lessons: Lesson[] }, Error>> {
  try {
    const { userId } = await auth();
    if (!userId) return err(new Error("Unauthorized"));

    const course = await db.getCourseById(courseId);
    const lessons = await db.getLessonsByCourse(courseId);
    return ok({ course, lessons });
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

export async function fetchLessonData(
  lessonId: string,
): Promise<Result<{ lesson: Lesson | undefined; questions: Question[] }, Error>> {
  try {
    const { userId } = await auth();
    if (!userId) return err(new Error("Unauthorized"));

    const lesson = await db.getLessonById(lessonId);
    const questions = await db.getQuestionsByLesson(lessonId);
    return ok({ lesson, questions });
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

export async function fetchQuestionData(
  id: string,
): Promise<Result<Question | undefined, Error>> {
  try {
    const { userId } = await auth();
    if (!userId) return err(new Error("Unauthorized"));

    const question = await db.getQuestionById(id);
    return ok(question);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

export async function fetchOutcomes(): Promise<Result<UserOutcome[], Error>> {
  try {
    await connection();
    const { userId } = await auth();
    if (!userId) return err(new Error("Unauthorized"));

    const outcomes = await db.getOutcomes(userId);
    const resolved = await Promise.all(
      outcomes.map(async (o) => {
        const lesson = await db.getLessonById(o.lessonId);
        return {
          ...o,
          lessonTitle: lesson?.title || "Unknown Lesson",
        };
      }),
    );
    return ok(resolved);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

export async function createOutcome(data: {
  lessonId: string;
  lessonTitle: string;
  score: number;
  totalQuestions: number;
}): Promise<Result<UserOutcome, Error>> {
  try {
    const { userId } = await auth();
    if (!userId) return err(new Error("Unauthorized"));

    const outcome = await db.saveOutcome({
      userId,
      lessonId: data.lessonId,
      lessonTitle: data.lessonTitle,
      score: data.score,
      totalQuestions: data.totalQuestions,
      aiSummary: null,
    });
    return ok(outcome);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

async function verifyAdmin() {
  const { userId } = await auth.protect();

  if (!userId || isAdmin(userId)) throw new Error("Unauthorized");
}

export async function createCourse(data: {
  title: string;
  description: string;
}): Promise<Result<string, Error>> {
  try {
    await verifyAdmin();
    const id = `c_${Math.random().toString(36).substring(7)}`;
    await db.createCourse(id, data.title, data.description);
    return ok(id);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

export async function deleteCourse(id: string): Promise<Result<void, Error>> {
  try {
    await verifyAdmin();
    await db.deleteCourse(id);
    return ok(undefined);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

export async function createLesson(
  courseId: string,
  data: { title: string; material: string },
): Promise<Result<string, Error>> {
  try {
    await verifyAdmin();
    const id = `l_${Math.random().toString(36).substring(7)}`;
    await db.createLesson(id, courseId, data.title, data.material);
    return ok(id);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

export async function deleteLesson(id: string): Promise<Result<void, Error>> {
  try {
    await verifyAdmin();
    await db.deleteLesson(id);
    return ok(undefined);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

export async function createQuestion(
  lessonId: string,
  data: {
    text: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswer: string;
  },
): Promise<Result<string, Error>> {
  try {
    await verifyAdmin();
    const qId = `q_${Math.random().toString(36).substring(7)}`;
    const answers = [];
    const answersList = [data.answer1, data.answer2, data.answer3, data.answer4];
    for (let i = 0; i < 4; i++) {
      const ansText = answersList[i];
      const isCorrect = data.correctAnswer === `answer${i + 1}`;
      if (ansText) {
        answers.push({
          aId: `a_${Math.random().toString(36).substring(7)}`,
          text: ansText,
          isCorrect,
        });
      }
    }
    await db.createQuestionWithAnswers(qId, lessonId, data.text, answers);
    return ok(qId);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

export async function deleteQuestion(id: string): Promise<Result<void, Error>> {
  try {
    await verifyAdmin();
    await db.deleteQuestion(id);
    return ok(undefined);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

export async function updateCourse(
  id: string,
  data: { title: string; description: string },
): Promise<Result<void, Error>> {
  try {
    await verifyAdmin();
    await db.updateCourse(id, data.title, data.description);
    return ok(undefined);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

export async function updateLesson(
  id: string,
  data: { title: string; material: string },
): Promise<Result<void, Error>> {
  try {
    await verifyAdmin();
    await db.updateLesson(id, data.title, data.material);
    return ok(undefined);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

export async function updateQuestion(
  id: string,
  data: {
    text: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswer: string;
  },
): Promise<Result<void, Error>> {
  try {
    await verifyAdmin();
    const answers = [];
    const answersList = [data.answer1, data.answer2, data.answer3, data.answer4];
    for (let i = 0; i < 4; i++) {
      const ansText = answersList[i];
      const isCorrect = data.correctAnswer === `answer${i + 1}`;
      if (ansText) {
        answers.push({
          aId: `a_${Math.random().toString(36).substring(7)}`,
          text: ansText,
          isCorrect,
        });
      }
    }
    await db.updateQuestionWithAnswers(id, data.text, answers);
    return ok(undefined);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}
