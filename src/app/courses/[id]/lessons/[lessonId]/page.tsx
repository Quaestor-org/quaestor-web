import { fetchLessonData } from '@/lib/dal';
import { notFound } from 'next/navigation';
import { QuizForm } from '@/components/QuizForm';
import Link from 'next/link';

export default async function LessonPage({ params }: { params: Promise<{ id: string, lessonId: string }> }) {
  const resolvedParams = await params;
  const { lesson, questions } = await fetchLessonData(resolvedParams.lessonId);

  if (!lesson) {
    notFound();
  }

  // Sanitize questions for the client (do not send isCorrect)
  const safeQuestions = questions.map(q => ({
    id: q.id,
    text: q.text,
    answers: q.answers.map(a => ({ id: a.id, text: a.text }))
  }));

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-3xl mx-auto">
      <div>
        <Link href={`/courses/${resolvedParams.id}`} className="text-sm text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Course
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{lesson.title}</h1>
      </div>

      <div className="prose prose-zinc max-w-none text-lg">
        {lesson.material?.map((paragraph, idx) => (
          <p key={idx} className="mb-4 text-zinc-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="pt-8 border-t border-zinc-200 mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-zinc-900">Knowledge Check</h2>
        <QuizForm lessonId={lesson.id} questions={safeQuestions} />
      </div>
    </div>
  );
}
