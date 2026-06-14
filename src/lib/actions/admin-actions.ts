"use server";

import { revalidatePath } from "next/cache";
import * as dal from "@/lib/dal";

export async function createCourseAction(data: {
  title: string;
  description: string;
}) {
  const id = await dal.createCourse(data);
  revalidatePath("/admin");
  revalidatePath("/courses");
  return { success: true, id };
}

export async function updateCourseAction(
  id: string,
  data: { title: string; description: string },
) {
  await dal.updateCourse(id, data);
  revalidatePath("/admin");
  revalidatePath("/courses");
  return { success: true };
}

export async function deleteCourseAction(id: string) {
  await dal.deleteCourse(id);
  revalidatePath("/admin");
  revalidatePath("/courses");
  return { success: true };
}

export async function createLessonAction(
  courseId: string,
  data: { title: string; material: string },
) {
  const id = await dal.createLesson(courseId, data);
  revalidatePath("/admin/courses/[id]/lessons", "page");
  revalidatePath("/courses/[id]", "page");
  return { success: true, id };
}

export async function updateLessonAction(
  id: string,
  data: { title: string; material: string },
) {
  await dal.updateLesson(id, data);
  revalidatePath("/admin/courses/[id]/lessons", "page");
  revalidatePath("/courses/[id]", "page");
  return { success: true };
}

export async function deleteLessonAction(id: string) {
  await dal.deleteLesson(id);
  revalidatePath("/admin/courses/[id]/lessons", "page");
  revalidatePath("/courses/[id]", "page");
  return { success: true };
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
  const id = await dal.createQuestion(lessonId, data);
  revalidatePath("/admin/courses/[id]/lessons/[lessonId]", "page");
  revalidatePath("/courses/[id]/lessons/[lessonId]", "page");
  return { success: true, id };
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
  await dal.updateQuestion(id, data);
  revalidatePath("/admin/courses/[id]/lessons/[lessonId]", "page");
  revalidatePath("/courses/[id]/lessons/[lessonId]", "page");
  return { success: true };
}

export async function deleteQuestionAction(questionId: string) {
  await dal.deleteQuestion(questionId);
  revalidatePath("/admin/courses/[id]/lessons/[lessonId]", "page");
  revalidatePath("/courses/[id]/lessons/[lessonId]", "page");
  return { success: true };
}
