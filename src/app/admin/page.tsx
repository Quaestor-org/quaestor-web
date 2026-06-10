import Link from "next/link";
import { AddCourseDialog } from "@/components/admin/AddCourseDialog";
import { DeleteCourseButton } from "@/components/admin/DeleteCourseButton";
import { fetchCourses } from "@/lib/dal";

export default async function AdminCourses() {
  const courses = await fetchCourses();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Admin Courses Page
        </h1>
        <AddCourseDialog />
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 border-b text-zinc-600 font-medium">
              <tr>
                <th className="px-6 py-3">Course Title</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b last:border-0 hover:bg-zinc-50"
                >
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
                    <DeleteCourseButton id={course.id} />
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-8 text-center text-zinc-500"
                  >
                    No courses found. Create one to get started.
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
