import { Suspense } from "react";
import HeaderLessonFallback from "@/components/fallbacks/lesson-header-fallback";
import LessonMaterialFallback from "@/components/fallbacks/lesson-material-fallback";
import QuizFormFallback from "@/components/fallbacks/quiz-form-fallback";
import Header from "@/components/header";
import { QuizForm } from "@/components/QuizForm";
import LessonMaterial from "@/components/lesson-material";
import { fetchLessonData } from "@/lib/dal";
import type { Answer, ClientQuestion, Question } from "@/lib/types";

export default async function LessonPage(
  props: PageProps<"/courses/[id]/lessons/[lessonId]">,
) {
  function parseParams(p: string | string[] | undefined): string {
    return Array.isArray(p) ? p[0] : (p ?? "");
  }
  const idPromise = props.params.then((p) => parseParams(p.id));
  const lessonIdPromise = props.params.then((p) => parseParams(p.lessonId));
  const dataPromise = props.params.then((p) =>
    fetchLessonData(parseParams(p.lessonId)),
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-3xl mx-auto">
      <Suspense fallback={<HeaderLessonFallback />}>
        <Header
          idPromise={idPromise}
          titlePromise={dataPromise.then((data) =>
            data && "lesson" in data ? data.lesson?.title : undefined,
          )}
          path={"courses"}
        />
      </Suspense>

      <Suspense fallback={<LessonMaterialFallback />}>
        <LessonMaterial
          materialPromise={dataPromise.then((data) =>
            data && "lesson" in data ? data.lesson?.material : undefined,
          )}
        />
      </Suspense>

      <div className="pt-8 border-t border-zinc-200 mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-zinc-900">
          Knowledge Check
        </h2>
        <Suspense fallback={<QuizFormFallback />}>
          <QuizForm
            lessonIdPromise={lessonIdPromise}
            questionsPromise={dataPromise.then((data) =>
              data && "questions" in data
                ? (data.questions?.map((q: Question) => ({
                    id: q.id,
                    text: q.text,
                    answers: q.answers.map((a: Answer) => ({
                      id: a.id,
                      text: a.text,
                    })),
                  })) as ClientQuestion[])
                : undefined,
            )}
          />
        </Suspense>
      </div>
    </div>
  );
}
