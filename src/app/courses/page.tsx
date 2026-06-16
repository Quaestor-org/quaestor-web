import { Suspense } from "react";
import CoursesDisplay from "@/components/courses-display";
import CoursesHeader from "@/components/courses-header";
import CoursesDisplayFallback from "@/components/fallbacks/courses-display-fallback";
import { fetchCourses } from "@/lib/dal";
import { parseParams } from "@/lib/utils";

export default function CoursesPage(props: PageProps<"/courses">) {
  const coursesPromise = props.searchParams.then((p) =>
    fetchCourses(parseParams(p.q)).then((r) => r._unsafeUnwrap()),
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <CoursesHeader />
      <Suspense fallback={<CoursesDisplayFallback />}>
        <CoursesDisplay coursesPromise={coursesPromise} />
      </Suspense>
    </div>
  );
}
