import Link from "next/link";
import type { Course } from "@/lib/types";
import { DeleteCourseButton } from "./admin/DeleteCourseButton";
import { EditCourseDialog } from "./admin/EditCourseDialog";

export default async function CoursesDisplay({
  coursesPromise,
}: {
  coursesPromise: Promise<Course[]>;
}) {
  const courses = await coursesPromise;
  return (
    <tbody>
      {courses.map((course) => (
        <tr key={course.id} className="border-b last:border-0 hover:bg-zinc-50">
          <td className="px-6 py-4 font-medium text-zinc-900">
            {course.title}
          </td>
          <td className="px-6 py-4 text-zinc-500 truncate max-w-md">
            {course.description}
          </td>
          <td className="px-6 py-4 text-right space-x-4">
            <Link
              href={`/admin/courses/${course.id}/lessons`}
              className="text-blue-600 hover:underline font-medium"
            >
              Manage Lessons
            </Link>
            <EditCourseDialog course={course} />
            <DeleteCourseButton id={course.id} />
          </td>
        </tr>
      ))}
      {courses.length === 0 && (
        <tr>
          <td colSpan={3} className="px-6 py-8 text-center text-zinc-500">
            No courses found. Create one to get started.
          </td>
        </tr>
      )}
    </tbody>
  );
}
