import { fetchQuestionsByLesson } from '@/lib/dal';
import { QuizForm } from '@/components/QuizForm';

export async function QuizSection({ lessonId }: { lessonId: string }) {
  const questions = await fetchQuestionsByLesson(lessonId);

  // Sanitize questions for the client (do not send isCorrect)
  const safeQuestions = questions.map(q => ({
    id: q.id,
    text: q.text,
    answers: q.answers.map(a => ({ id: a.id, text: a.text }))
  }));

  return <QuizForm lessonId={lessonId} questions={safeQuestions} />;
}
