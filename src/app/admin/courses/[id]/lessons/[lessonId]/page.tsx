import Link from "next/link";
import { notFound } from "next/navigation";
import { AddQuestionDialog } from "@/components/admin/AddQuestionDialog";
import { DeleteQuestionButton } from "@/components/admin/DeleteQuestionButton";
import { fetchLessonData } from "@/lib/dal";

export default async function AdminLessonPage(props: {
  params: Promise<{ id: string; lessonId: string }>;
}) {
  const params = await props.params;
  const { lesson, questions } = await fetchLessonData(params.lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <Link
          href={`/admin/courses/${params.id}`}
          className="text-sm text-zinc-500 hover:text-zinc-900 mb-4 inline-block"
        >
          &larr; Back to Course
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            {lesson.title} - Questions
          </h1>
          <AddQuestionDialog lessonId={lesson.id} />
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
