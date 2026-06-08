'use server';

import { Pool } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function createCourseAction(data: { title: string; description: string }) {
  const { userId, has } = await auth();
  if (!userId || !has({ role: 'org:admin' })) throw new Error("Unauthorized");

  const id = `c_${Math.random().toString(36).substring(7)}`;
  const title = data.title;
  const description = data.description;
  
  await pool.query('INSERT INTO courses (id, title, description) VALUES ($1, $2, $3)', [id, title, description]);
  revalidatePath('/admin');
  return { success: true, id };
}

export async function deleteCourseAction(id: string) {
  const { userId, has } = await auth();
  if (!userId || !has({ role: 'org:admin' })) throw new Error("Unauthorized");

  await pool.query('DELETE FROM courses WHERE id = $1', [id]);
  revalidatePath('/admin');
  return { success: true };
}

export async function createLessonAction(courseId: string, data: { title: string; material: string }) {
  const { userId, has } = await auth();
  if (!userId || !has({ role: 'org:admin' })) throw new Error("Unauthorized");

  const id = `l_${Math.random().toString(36).substring(7)}`;
  const title = data.title;
  const material = data.material;
  
  const paragraphs = material.split('\n').filter(p => p.trim() !== '');
  await pool.query('INSERT INTO lessons (id, course_id, title, material) VALUES ($1, $2, $3, $4)', [id, courseId, title, JSON.stringify(paragraphs)]);
  revalidatePath(`/admin/courses/${courseId}`);
  return { success: true, id };
}

export async function deleteLessonAction(id: string, courseId: string) {
  const { userId, has } = await auth();
  if (!userId || !has({ role: 'org:admin' })) throw new Error("Unauthorized");

  await pool.query('DELETE FROM lessons WHERE id = $1', [id]);
  revalidatePath(`/admin/courses/${courseId}`);
  return { success: true };
}

export async function createQuestionAction(lessonId: string, data: { text: string; answer1: string; answer2: string; answer3: string; answer4: string; correctAnswer: string }) {
  const { userId, has } = await auth();
  if (!userId || !has({ role: 'org:admin' })) throw new Error("Unauthorized");

  const qId = `q_${Math.random().toString(36).substring(7)}`;
  const text = data.text;
  
  await pool.query('INSERT INTO questions (id, lesson_id, text) VALUES ($1, $2, $3)', [qId, lessonId, text]);
  
  // Create 4 answers
  const answersList = [data.answer1, data.answer2, data.answer3, data.answer4];
  for (let i = 0; i < 4; i++) {
    const ansText = answersList[i];
    const isCorrect = data.correctAnswer === `answer${i + 1}`;
    if (ansText) {
      const aId = `a_${Math.random().toString(36).substring(7)}`;
      await pool.query('INSERT INTO answers (id, question_id, text, is_correct) VALUES ($1, $2, $3, $4)', [aId, qId, ansText, isCorrect]);
    }
  }
  
  revalidatePath(`/admin/lessons/${lessonId}`);
  return { success: true, id: qId };
}

export async function deleteQuestionAction(questionId: string, courseId: string, lessonId: string) {
  const { userId, has } = await auth();
  if (!userId || !has({ role: 'org:admin' })) throw new Error("Unauthorized");

  await pool.query('DELETE FROM questions WHERE id = $1', [questionId]);
  revalidatePath(`/admin/courses/${courseId}/lessons/${lessonId}`);
  return { success: true };
}
