export default async function LessonMaterial({
  materialPromise,
}: {
  materialPromise: Promise<string[] | undefined>;
}) {
  const material = await materialPromise;
  const paragraphCounts = new Map<string, number>();

  return (
    <div className="prose prose-zinc max-w-none text-lg">
      {material?.map((paragraph) => {
        const count = paragraphCounts.get(paragraph) ?? 0;
        paragraphCounts.set(paragraph, count + 1);

        return (
          <p
            key={`${paragraph}-${count}`}
            className="mb-4 text-zinc-700 leading-relaxed"
          >
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}
