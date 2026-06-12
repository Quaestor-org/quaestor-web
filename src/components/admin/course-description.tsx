export default async function CourseDescription({
  courseDescriptionPromise,
}: {
  courseDescriptionPromise: Promise<string | undefined>;
}) {
  const courseDescription = await courseDescriptionPromise;
  return <p className="text-zinc-500 mt-2">{courseDescription}</p>;
}
