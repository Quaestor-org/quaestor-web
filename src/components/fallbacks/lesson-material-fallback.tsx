import { Skeleton } from "@/components/ui/skeleton";

export default function LessonMaterialFallback() {
  return (
    <div className="prose prose-zinc max-w-none text-lg space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full mt-6" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}
