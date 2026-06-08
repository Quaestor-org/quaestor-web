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
  const outcomes = await db.getOutcomes();
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
  // Hardcoded user for now
  return await db.saveOutcome({
    userId: "u1",
    lessonId: data.lessonId,
    lessonTitle: data.lessonTitle,
    score: data.score,
    totalQuestions: data.totalQuestions,
    aiSummary: null,
  });
}
