import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in duration-500">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900">
        Welcome to LearnerPro
      </h1>
      <p className="text-lg md:text-xl text-zinc-600 max-w-2xl">
        The simplest way to learn new skills. Start exploring our courses and
        take quizzes to test your knowledge.
      </p>
      <div className="flex gap-4">
        <Link
          href="/courses"
          className={buttonVariants({
            size: "lg",
            className: "rounded-full px-8",
          })}
        >
          Browse Courses
        </Link>
        <Link
          href="/outcomes"
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className: "rounded-full px-8",
          })}
        >
          View Outcomes
        </Link>
      </div>
    </div>
  );
}
