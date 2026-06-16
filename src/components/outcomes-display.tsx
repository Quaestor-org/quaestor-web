import { fetchOutcomes } from "@/lib/dal";
import { OutcomeCard } from "./OutcomeCard";

export default async function OutcomesDisplay() {
  const outcomes = (await fetchOutcomes())._unsafeUnwrap();
  const sortedOutcomes = [...outcomes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return sortedOutcomes.length === 0 ? (
    <p className="text-zinc-500">
      You haven't completed any lessons yet. Head over to the Courses page to
      start learning!
    </p>
  ) : (
    <div className="space-y-6">
      {sortedOutcomes.map((outcome) => (
        <OutcomeCard
          key={outcome.id}
          id={outcome.id}
          lessonTitle={outcome.lessonTitle}
          score={outcome.score}
          totalQuestions={outcome.totalQuestions}
          aiSummary={outcome.aiSummary}
          createdAt={outcome.createdAt}
        />
      ))}
    </div>
  );
}
