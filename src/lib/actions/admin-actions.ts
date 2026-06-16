"use server";

import { updateTag } from "next/cache";
import * as dal from "@/lib/dal";

export async function createCourseAction(data: {
  title: string;
  description: string;
}) {
  const result = await dal.createCourse(data);
  return result.match(
    (id) => {
      updateTag("courses");
      return { success: true, id };
    },
    (error) => {
      return { success: false, error: error.message };
    },
  );
}

export async function updateCourseAction(
  id: string,
  data: { title: string; description: string },
) {
  const result = await dal.updateCourse(id, data);
  return result.match(
    () => {
      updateTag("courses");
      updateTag(`course-${id}`);
      return { success: true };
    },
    (error) => {
      return { success: false, error: error.message };
    },
  );
}

export async function deleteCourseAction(id: string) {
  const result = await dal.deleteCourse(id);
  return result.match(
    () => {
      updateTag("courses");
      updateTag(`course-${id}`);
      return { success: true };
    },
    (error) => {
      return { success: false, error: error.message };
    },
  );
}

export async function createLessonAction(
  courseId: string,
  data: { title: string; material: string },
) {
  const result = await dal.createLesson(courseId, data);
  return result.match(
    (id) => {
      updateTag(`lessons-${courseId}`);
      return { success: true, id };
    },
    (error) => {
      return { success: false, error: error.message };
    },
  );
}

export async function updateLessonAction(
  id: string,
  data: { title: string; material: string },
) {
  const lessonResult = await dal.fetchLessonData(id);
  return lessonResult.match(
    async ({ lesson }) => {
      if (!lesson) {
        return { success: false, error: "Lesson not found" };
      }
      const updateResult = await dal.updateLesson(id, data);
      return updateResult.match(
        () => {
          updateTag(`lesson-${id}`);
          updateTag(`lessons-${lesson.courseId}`);
          return { success: true };
        },
        (error) => {
          return { success: false, error: error.message };
        },
      );
    },
    (error) => {
      return { success: false, error: error.message };
    },
  );
}

export async function deleteLessonAction(id: string) {
  const lessonResult = await dal.fetchLessonData(id);
  return lessonResult.match(
    async ({ lesson }) => {
      if (!lesson) {
        return { success: false, error: "Lesson not found" };
      }
      const deleteResult = await dal.deleteLesson(id);
      return deleteResult.match(
        () => {
          updateTag(`lesson-${id}`);
          updateTag(`lessons-${lesson.courseId}`);
          return { success: true };
        },
        (error) => {
          return { success: false, error: error.message };
        },
      );
    },
    (error) => {
      return { success: false, error: error.message };
    },
  );
}

export async function createQuestionAction(
  lessonId: string,
  data: {
    text: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswer: string;
  },
) {
  const result = await dal.createQuestion(lessonId, data);
  return result.match(
    (id) => {
      updateTag(`questions-${lessonId}`);
      return { success: true, id };
    },
    (error) => {
      return { success: false, error: error.message };
    },
  );
}

export async function updateQuestionAction(
  id: string,
  data: {
    text: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswer: string;
  },
) {
  const qResult = await dal.fetchQuestionData(id);
  return qResult.match(
    async (question) => {
      if (!question) {
        return { success: false, error: "Question not found" };
      }
      const updateResult = await dal.updateQuestion(id, data);
      return updateResult.match(
        () => {
          updateTag(`questions-${question.lessonId}`);
          updateTag(`question-${id}`);
          return { success: true };
        },
        (error) => {
          return { success: false, error: error.message };
        },
      );
    },
    (error) => {
      return { success: false, error: error.message };
    },
  );
}

export async function deleteQuestionAction(questionId: string) {
  const qResult = await dal.fetchQuestionData(questionId);
  return qResult.match(
    async (question) => {
      if (!question) {
        return { success: false, error: "Question not found" };
      }
      const deleteResult = await dal.deleteQuestion(questionId);
      return deleteResult.match(
        () => {
          updateTag(`questions-${question.lessonId}`);
          updateTag(`question-${questionId}`);
          return { success: true };
        },
        (error) => {
          return { success: false, error: error.message };
        },
      );
    },
    (error) => {
      return { success: false, error: error.message };
    },
  );
}
