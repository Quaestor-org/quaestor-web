import Link from "next/link";

export default async function SimpleLink({
  pathPromise,
  text,
}: {
  pathPromise: Promise<string>;
  text: string;
}) {
  const path = await pathPromise;
  return (
    <Link
      href={path}
      className="text-sm text-zinc-500 hover:text-zinc-900 mb-4 inline-block"
    >
      {text}
    </Link>
  );
}
