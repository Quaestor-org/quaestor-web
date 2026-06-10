import Link from "next/link";
import { Suspense } from "react";
import { AddQuestionDialog } from "@/components/admin/AddQuestionDialog";
import { DeleteQuestionButton } from "@/components/admin/DeleteQuestionButton";
import LessonTitleQuestionPage from "@/components/admin/lesson-title-question-page";
import SimpleLink from "@/components/link";
import { fetchLessonData } from "@/lib/dal";

export default function AdminQuestionsPage(
  props: PageProps<"/admin/courses/[id]/lessons/[lessonId]">,
) {
  const dataPromise = props.params.then((p) => fetchLessonData(p.lessonId));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <Suspense>
          <SimpleLink
            pathPromise={props.params.then((p) => `/admin/courses/${p.id}/lessons`)}
            text={"&larr; Back to Lessons"}
          />
        </Suspense>
       
        <div className="flex items-center justify-between">
          <Suspense>
            <LessonTitleQuestionPage
              lessonTitlePromise={dataPromise.then(
                (data) => data.lesson?.title,
              )}
            />
          </Suspense>
          <Suspense>
            <AddQuestionDialog
              lessonIdPromise={dataPromise.then((data) => data.lesson?.id)}
            />
          </Suspense>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 border-b text-zinc-600 font-medium">
              <tr>
                <th className="px-6 py-3">Question Text</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <tr
                  key={question.id}
                  className="border-b last:border-0 hover:bg-zinc-50"
                >
                  <td className="px-6 py-4 font-medium text-zinc-900">
                    {question.text}
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <DeleteQuestionButton
                      id={question.id}
                      courseId={params.id}
                      lessonId={params.lessonId}
                    />
                  </td>
                </tr>
              ))}
              {questions.length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    className="px-6 py-8 text-center text-zinc-500"
                  >
                    No questions found in this lesson. Create one to get
                    started.
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
