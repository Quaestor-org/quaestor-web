'use server';

import { createOutcome, fetchLessonData } from '@/lib/dal';
import { updateOutcomeSummary } from '@/lib/db';

export async function submitQuizAction(data: { lessonId: string, answers: Record<string, string> }) {
  const { lesson, questions } = await fetchLessonData(data.lessonId);
  if (!lesson) {
    throw new Error('Lesson not found');
  }

  let score = 0;
  questions.forEach(q => {
    const selectedAnswerId = data.answers[q.id];
    const correctAnswer = q.answers.find(a => a.isCorrect);
    if (correctAnswer && correctAnswer.id === selectedAnswerId) {
      score += 1;
    }
  });

  const outcome = await createOutcome({
    lessonId: data.lessonId,
    score,
    totalQuestions: questions.length,
  });

  // Simulate AI streaming summary later.
  // For now we just add a mock AI summary after a short delay.
  setTimeout(async () => {
    const aiSummary = `AI Summary: The user scored ${score} out of ${questions.length} on ${lesson.title}. They show good understanding but could review the missed topics.`;
    await updateOutcomeSummary(outcome.id, aiSummary);
  }, 2000);

  return { success: true, outcomeId: outcome.id, score, totalQuestions: questions.length };
}
