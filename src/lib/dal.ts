import { auth } from "@clerk/nextjs/server";
import { connection } from "next/server";
import * as db from "./db";

export async function fetchCourses(query?: string) {
  let courses = await db.getCourses();
  if (query) {
    const lowerQuery = query.toLowerCase();
    courses = courses.filter(
      (c) =>
        c.title.toLowerCase().includes(lowerQuery) ||
        c.description.toLowerCase().includes(lowerQuery),
    );
  }
  return courses;
}

export async function fetchCourseData(courseId: string) {
  const course = await db.getCourseById(courseId);
  const lessons = await db.getLessonsByCourse(courseId);
  return { course, lessons };
}

export async function fetchLessonData(lessonId: string) {
  const lesson = await db.getLessonById(lessonId);
  const questions = await db.getQuestionsByLesson(lessonId);
  return { lesson, questions };
}

export async function fetchOutcomes() {
  await connection();
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const outcomes = await db.getOutcomes(userId);
  return Promise.all(
    outcomes.map(async (o) => {
      const lesson = await db.getLessonById(o.lessonId);
      return {
        ...o,
        lessonTitle: lesson?.title || "Unknown Lesson",
      };
    }),
  );
}

export async function createOutcome(data: {
  lessonId: string;
  lessonTitle: string;
  score: number;
  totalQuestions: number;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return await db.saveOutcome({
    userId,
    lessonId: data.lessonId,
    lessonTitle: data.lessonTitle,
    score: data.score,
    totalQuestions: data.totalQuestions,
    aiSummary: null,
  });
}

async function verifyAdmin() {
  const { userId, has } = await auth();
  if (!userId || !has({ role: 'org:admin' })) throw new Error("Unauthorized");
}

export async function createCourse(data: { title: string; description: string }) {
  await verifyAdmin();
  const id = `c_${Math.random().toString(36).substring(7)}`;
  await db.createCourse(id, data.title, data.description);
  return id;
}

export async function deleteCourse(id: string) {
  await verifyAdmin();
  await db.deleteCourse(id);
}

export async function createLesson(courseId: string, data: { title: string; material: string }) {
  await verifyAdmin();
  const id = `l_${Math.random().toString(36).substring(7)}`;
  await db.createLesson(id, courseId, data.title, data.material);
  return id;
}

export async function deleteLesson(id: string) {
  await verifyAdmin();
  await db.deleteLesson(id);
}

export async function createQuestion(lessonId: string, data: { text: string; answer1: string; answer2: string; answer3: string; answer4: string; correctAnswer: string }) {
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
        isCorrect
      });
    }
  }
  await db.createQuestionWithAnswers(qId, lessonId, data.text, answers);
  return qId;
}

export async function deleteQuestion(id: string) {
  await verifyAdmin();
  await db.deleteQuestion(id);
}
