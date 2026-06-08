import { fetchCourseData } from '@/lib/dal';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { course, lessons } = await fetchCourseData(resolvedParams.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <Link href="/courses" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Courses
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{course.title}</h1>
        <p className="text-lg text-zinc-600 mt-2">{course.description}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-zinc-900">Lessons</h2>
        {lessons.length === 0 ? (
          <p className="text-zinc-500">No lessons available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons.map((lesson, index) => (
              <Link key={lesson.id} href={`/courses/${course.id}/lessons/${lesson.id}`} className="group">
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
        )}
      </div>
    </div>
  );
}
