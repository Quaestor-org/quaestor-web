import { Skeleton } from "@/components/ui/skeleton";

export default function HeaderFallback() {
  return (
    <div>
      <div className="mb-4 inline-block">
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-9 w-64 mb-2" />
      <Skeleton className="h-6 w-full max-w-2xl mt-2" />
    </div>
  );
}
