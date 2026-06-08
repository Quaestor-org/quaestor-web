import { OutcomeCard } from "@/components/OutcomeCard";
import { fetchLessonData, fetchOutcomes } from "@/lib/dal";

// We need a helper to get lesson titles since outcome only stores lessonId
async function getLessonTitle(lessonId: string) {
  const data = await fetchLessonData(lessonId);
  return data?.lesson?.title || "Unknown Lesson";
}

export default async function OutcomesPage() {
  const outcomes = await fetchOutcomes();

  // Sort by newest first
  const sortedOutcomes = [...outcomes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const _pendingSummaries = sortedOutcomes.some((o) => o.aiSummary === null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        Your Learning Outcomes
      </h1>

      {sortedOutcomes.length === 0 ? (
        <p className="text-zinc-500">
          You haven't completed any lessons yet. Head over to the Courses page
          to start learning!
        </p>
      ) : (
        <div className="space-y-6">
          {sortedOutcomes.map(async (outcome) => {
            const lessonTitle = await getLessonTitle(outcome.lessonId);
            return (
              <OutcomeCard
                key={outcome.id}
                id={outcome.id}
                lessonTitle={lessonTitle}
                score={outcome.score}
                totalQuestions={outcome.totalQuestions}
                aiSummary={outcome.aiSummary}
                createdAt={outcome.createdAt}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
