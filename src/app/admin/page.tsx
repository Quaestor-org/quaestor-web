import { Suspense } from "react";
import { AddCourseDialog } from "@/components/admin/AddCourseDialog";
import CourseDisplay from "@/components/course-display";
import { fetchCourses } from "@/lib/dal";

export default async function AdminCourses() {
  const coursesPromise = fetchCourses();

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
            <Suspense>
              {" "}
              <CourseDisplay coursesPromise={coursesPromise} />
            </Suspense>
          </table>
        </div>
      </div>
    </div>
  );
}
