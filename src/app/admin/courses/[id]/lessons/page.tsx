import Link from "next/link";
import { Suspense } from "react";
import { AddLessonDialog } from "@/components/admin/AddLessonDialog";
import CourseDescription from "@/components/admin/course-description";
import CourseTitleHeader from "@/components/admin/course-title-header";
import LessonsDisplay from "@/components/lessons-display";
import { fetchCourseData } from "@/lib/dal";

export default async function AdminLessonPage(
  props: PageProps<"/admin/courses/[id]/lessons/[lessonId]">,
) {
  const dataPromise = props.params.then((p) => fetchCourseData(p.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <Link
          href="/admin"
          className="text-sm text-zinc-500 hover:text-zinc-900 mb-4 inline-block"
        >
          &larr; Back to Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <Suspense>
            <CourseTitleHeader
              courseTitlePromise={dataPromise.then(
                (data) => data.course?.title,
              )}
            />
          </Suspense>
          <Suspense>
            <AddLessonDialog
              courseIdPromise={dataPromise.then((data) => data.course?.id)}
            />
          </Suspense>
        </div>
        <Suspense>
          <CourseDescription
            courseDescriptionPromise={dataPromise.then(
              (data) => data.course?.description,
            )}
          />
        </Suspense>
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
            <Suspense>
              <LessonsDisplay
                lessonsPromise={dataPromise.then((data) => data.lessons)}
              />
            </Suspense>
          </table>
        </div>
      </div>
    </div>
  );
}
