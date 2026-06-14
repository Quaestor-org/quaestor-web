import Link from "next/link";
import type { Course } from "@/lib/types";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default async function CoursesDisplay({
  coursesPromise,
}: {
  coursesPromise: Promise<Course[]>;
}) {
  const courses = await coursesPromise;
  return courses.length === 0 ? (
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
  );
}
