import Link from "next/link";
import type { Lesson } from "@/lib/types";
import { DeleteLessonButton } from "./DeleteLessonButton";
import { EditLessonDialog } from "./EditLessonDialog";

export default async function LessonsTableBody({
  lessonsPromise,
}: {
  lessonsPromise: Promise<Lesson[]>;
}) {
  const lessons = await lessonsPromise;

  return (
    <tbody>
      {lessons.map((lesson) => (
        <tr key={lesson.id} className="border-b last:border-0 hover:bg-zinc-50">
          <td className="px-6 py-4 font-medium text-zinc-900">
            {lesson.title}
          </td>
          <td className="px-6 py-4 text-right space-x-4">
            <Link
              href={`/admin/courses/${lesson.courseId}/lessons/${lesson.id}`}
              className="text-blue-600 hover:underline font-medium"
            >
              Manage Questions
            </Link>
            <EditLessonDialog lesson={lesson} />
            <DeleteLessonButton id={lesson.id} />
          </td>
        </tr>
      ))}
      {lessons.length === 0 && (
        <tr>
          <td colSpan={2} className="px-6 py-8 text-center text-zinc-500">
            No lessons found in this course. Create one to get started.
          </td>
        </tr>
      )}
    </tbody>
  );
}
