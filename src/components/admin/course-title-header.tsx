export default async function CourseTitleHeader({
  courseTitlePromise,
}: {
  courseTitlePromise: Promise<string | undefined>;
}) {
  const courseTitle = await courseTitlePromise;
  return (
    <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
      {courseTitle}
    </h1>
  );
}
