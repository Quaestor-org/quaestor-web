import Link from "next/link";

export default function HeaderLessonFallback() {
  return (
    <div>
      <Link
        href={`/courses/`}
        className="text-sm text-blue-600 hover:underline mb-4 inline-block"
        aria-disabled={true}
      >
        &larr; Back to Course
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        Loading lesson...
      </h1>
    </div>
  );
}
