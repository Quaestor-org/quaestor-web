import { fetchCourses } from '@/lib/dal';
import { SearchBar } from '@/components/SearchBar';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q : undefined;
  const courses = await fetchCourses(q);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Courses</h1>
        <SearchBar />
      </div>

      {courses.length === 0 ? (
        <p className="text-zinc-500">No courses found matching your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`} className="group">
              <Card className="h-full transition-shadow hover:shadow-md border-zinc-200">
                <CardHeader>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
