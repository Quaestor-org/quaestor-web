import { Suspense } from "react";
import HeaderFallback from "@/components/fallbacks/header-fallback";
import LessonsDisplayFallback from "@/components/fallbacks/lessons-display-fallback";
import Header from "@/components/header";
import LessonsDisplay from "@/components/lessons-display";
import { fetchCourseData } from "@/lib/dal";

export default function CoursePage(props: PageProps<"/courses/[id]">) {
  const dataPromise = props.params.then((p) =>
    fetchCourseData(p.id).then((r) => r._unsafeUnwrap()),
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Suspense fallback={<HeaderFallback />}>
        <Header
          descriptionPromise={dataPromise.then(
            (data) => data?.course?.description,
          )}
          titlePromise={dataPromise.then((data) => data?.course?.title)}
          path={"courses"}
        />
      </Suspense>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-zinc-900">Lessons</h2>
        <Suspense fallback={<LessonsDisplayFallback />}>
          <LessonsDisplay
            lessonsPromise={dataPromise.then((data) => data.lessons)}
          />
        </Suspense>
      </div>
    </div>
  );
}
