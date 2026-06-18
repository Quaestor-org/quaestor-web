export default async function LessonTitleQuestionPage({
  lessonTitlePromise,
}: {
  lessonTitlePromise: Promise<string | undefined>;
}) {
  const lessonTitle = await lessonTitlePromise;
  return (
    <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
      {lessonTitle} - Questions
    </h1>
  );
}
