import { Suspense } from "react";
import Header from "@/components/header";
import LessonsDisplay from "@/components/lessons-display";
import { fetchCourseData } from "@/lib/dal";

export default async function CoursePage(props: PageProps<"/courses/[id]">) {
  const dataPromise = props.params.then((p) =>
    fetchCourseData(p.id),
  );
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Suspense>
        <Header
          descriptionPromise={dataPromise.then((data) => data?.course?.description)}
          titlePromise={dataPromise.then((data) => data?.course?.title)}
          path={"courses"}
        />
      </Suspense>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-zinc-900">Lessons</h2>
        <Suspense>
          <LessonsDisplay
            lessonsPromise={dataPromise.then((data)=>data.lessons)}
            courseIdPromise={dataPromise.then((data) => data?.course?.id)}
          />
        </Suspense>
      </div>
    </div>
  );
}
