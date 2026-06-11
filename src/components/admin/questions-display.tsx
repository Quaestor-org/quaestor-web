import type { Question } from "@/lib/types";
import { DeleteQuestionButton } from "./DeleteQuestionButton";

export default async function QuestionsDisplay({
  questionsPromise,
}: {
  questionsPromise: Promise<Question[]>;
}) {
  const questions = await questionsPromise;
  return (
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
            <DeleteQuestionButton id={question.id} />
          </td>
        </tr>
      ))}
      {questions.length === 0 && (
        <tr>
          <td colSpan={2} className="px-6 py-8 text-center text-zinc-500">
            No questions found in this lesson. Create one to get started.
          </td>
        </tr>
      )}
    </tbody>
  );
}
