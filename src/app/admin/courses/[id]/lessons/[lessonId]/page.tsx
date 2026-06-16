import { Suspense } from "react";
import { AddQuestionDialog } from "@/components/admin/AddQuestionDialog";
import LessonTitleQuestionPage from "@/components/admin/lesson-title-question-page";
import QuestionsDisplay from "@/components/admin/questions-display";
import SimpleLink from "@/components/link";
import { fetchLessonData } from "@/lib/dal";

export default function AdminQuestionsPage(
  props: PageProps<"/admin/courses/[id]/lessons/[lessonId]">,
) {
  const dataPromise = props.params.then((p) =>
    fetchLessonData(p.lessonId).then((r) => r._unsafeUnwrap()),
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <Suspense>
          <SimpleLink
            pathPromise={props.params.then(
              (p) => `/admin/courses/${p.id}/lessons`,
            )}
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
            <Suspense>
              <QuestionsDisplay
                questionsPromise={dataPromise.then((data) => data.questions)}
              />
            </Suspense>
          </table>
        </div>
      </div>
    </div>
  );
}
