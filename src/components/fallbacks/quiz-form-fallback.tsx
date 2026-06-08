import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function QuizFormFallback() {
  return (
    <div className="space-y-8 w-full">
      {[1, 2].map((i) => (
        <Card key={i} className="border-zinc-200 shadow-sm w-full">
          <CardContent className="pt-6">
            <Skeleton className="h-6 w-3/4 mb-6" />
            <div className="space-y-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex items-center space-x-3">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-48" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      <Skeleton className="h-10 w-32 rounded-lg" />
    </div>
  );
}
