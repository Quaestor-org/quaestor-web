import { fetchLessonsByCourse } from '@/lib/dal';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export async function LessonList({ courseId }: { courseId: string }) {
  const lessons = await fetchLessonsByCourse(courseId);

  if (lessons.length === 0) {
    return <p className="text-zinc-500">No lessons available yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {lessons.map((lesson, index) => (
        <Link key={lesson.id} href={`/courses/${courseId}/lessons/${lesson.id}`} className="group">
          <Card className="h-full transition-shadow hover:shadow-md border-zinc-200">
            <CardHeader>
              <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                {index + 1}. {lesson.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">{lesson.material?.[0]}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
