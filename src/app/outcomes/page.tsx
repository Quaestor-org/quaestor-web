import { Suspense } from "react";
import OutcomesDisplayFallback from "@/components/fallbacks/outcomes-display-fallback";
import OutcomesDisplay from "@/components/outcomes-display";

export default function OutcomesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        Your Learning Outcomes
      </h1>
      <Suspense fallback={<OutcomesDisplayFallback />}>
        <OutcomesDisplay />
      </Suspense>
    </div>
  );
}
