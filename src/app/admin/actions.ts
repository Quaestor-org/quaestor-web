'use server';

import * as dal from '@/lib/dal';

export async function createCourseAction(data: { title: string; description: string }) {
  const id = await dal.createCourse(data);
  return { success: true, id };
}

export async function deleteCourseAction(id: string) {
  await dal.deleteCourse(id);
  return { success: true };
}

export async function createLessonAction(courseId: string, data: { title: string; material: string }) {
  const id = await dal.createLesson(courseId, data);
  return { success: true, id };
}

export async function deleteLessonAction(id: string) {
  await dal.deleteLesson(id);
  return { success: true };
}

export async function createQuestionAction(lessonId: string, data: { text: string; answer1: string; answer2: string; answer3: string; answer4: string; correctAnswer: string }) {
  const id = await dal.createQuestion(lessonId, data);
  return { success: true, id };
}

export async function deleteQuestionAction(questionId: string) {
  await dal.deleteQuestion(questionId);
  return { success: true };
}
