import Link from "next/link";

export default async function HeaderLesson({
  idPromise,
  lessonTitlePromise,
}: {
  idPromise: Promise<string>;
  lessonTitlePromise: Promise<string | undefined>;
}) {
  const [id, title] = await Promise.all([idPromise, lessonTitlePromise]);
  return (
    <div>
      <Link
        href={`/courses/${id}`}
        className="text-sm text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to Course
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        {title}
      </h1>
    </div>
  );
}
