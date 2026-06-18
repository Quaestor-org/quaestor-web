"use server";

import { updateTag } from "next/cache";
import { createOutcome, fetchLessonData } from "@/lib/dal";
import { updateOutcomeSummary } from "@/lib/db";

export async function submitQuizAction(data: {
  lessonId: string;
  lessonTitle: string;
  answers: Record<string, string>;
}) {
  const lessonDataResult = await fetchLessonData(data.lessonId);
  return lessonDataResult.match(
    async ({ lesson, questions }) => {
      if (!lesson) {
        return { success: false, error: "Lesson not found" };
      }

      let score = 0;
      questions.forEach((q) => {
        const selectedAnswerId = data.answers[q.id];
        const correctAnswer = q.answers.find((a) => a.isCorrect);
        if (correctAnswer && correctAnswer.id === selectedAnswerId) {
          score += 1;
        }
      });

      const outcomeResult = await createOutcome({
        lessonId: data.lessonId,
        lessonTitle: data.lessonTitle,
        score,
        totalQuestions: questions.length,
      });

      return outcomeResult.match(
        (outcome) => {
          // Invalidate user outcomes cache tag
          updateTag(`outcomes-${outcome.userId}`);

          // Simulate AI streaming summary later.
          // For now we just add a mock AI summary after a short delay.
          setTimeout(async () => {
            const aiSummary = `AI Summary: The user scored ${score} out of ${questions.length} on ${lesson.title}. They show good understanding but could review the missed topics.`;
            await updateOutcomeSummary(outcome.id, aiSummary);
            updateTag(`outcomes-${outcome.userId}`);
          }, 2000);

          return {
            success: true,
            outcomeId: outcome.id,
            score,
            totalQuestions: questions.length,
          };
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
