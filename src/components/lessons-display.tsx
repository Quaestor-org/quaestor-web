import Link from "next/link";
import type { Lesson } from "@/lib/types";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default async function LessonsDisplay({
  lessonsPromise,
}: {
  lessonsPromise: Promise<Lesson[]>;
}) {
  const lessons = await lessonsPromise;

  return lessons.length === 0 ? (
    <p className="text-zinc-500">No lessons available yet.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {lessons.map((lesson: Lesson, index: number) => (
        <Link
          key={lesson.id}
          href={`/courses/${lesson.courseId}/lessons/${lesson.id}`}
          className="group"
        >
          <Card className="h-full transition-shadow hover:shadow-md border-zinc-200">
            <CardHeader>
              <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                {index + 1}. {lesson.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {lesson.material?.[0]}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
