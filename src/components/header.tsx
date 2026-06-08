import Link from "next/link";

export default async function Header({
  idPromise,
  descriptionPromise,
  titlePromise,
  path,
}: {
  idPromise?: Promise<string>;
  descriptionPromise?: Promise<string | undefined>;
  titlePromise: Promise<string | undefined>;
  path: string;
}) {
  const [id, title, description] = await Promise.all([
    idPromise,
    titlePromise,
    descriptionPromise,
  ]);
  return (
    <div>
      <Link
        href={`/${path}/${id ?? ""}`}
        className="text-sm text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to Course
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        {title}
      </h1>
      {description && (
        <p className="text-lg text-zinc-600 mt-2">{description}</p>
      )}
    </div>
  );
}
