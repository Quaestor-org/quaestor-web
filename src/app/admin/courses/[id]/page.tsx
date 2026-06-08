import { fetchCourseData } from "@/lib/dal";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddLessonDialog } from "@/components/admin/AddLessonDialog";
import { DeleteLessonButton } from "@/components/admin/DeleteLessonButton";

export default async function AdminCoursePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { course, lessons } = await fetchCourseData(params.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <Link href="/admin" className="text-sm text-zinc-500 hover:text-zinc-900 mb-4 inline-block">&larr; Back to Dashboard</Link>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            {course.title}
          </h1>
          <AddLessonDialog courseId={course.id} />
        </div>
        <p className="text-zinc-500 mt-2">{course.description}</p>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 border-b text-zinc-600 font-medium">
              <tr>
                <th className="px-6 py-3">Lesson Title</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson.id} className="border-b last:border-0 hover:bg-zinc-50">
                  <td className="px-6 py-4 font-medium text-zinc-900">{lesson.title}</td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <Link href={`/admin/courses/${course.id}/lessons/${lesson.id}`} className="text-blue-600 hover:underline font-medium">
                      Manage Questions
                    </Link>
                    <DeleteLessonButton id={lesson.id} courseId={course.id} />
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
          </table>
        </div>
      </div>
    </div>
  );
}
