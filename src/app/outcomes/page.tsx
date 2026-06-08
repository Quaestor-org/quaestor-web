import { Suspense } from "react";
import OutcomesDisplay from "@/components/outcomes-display";
import OutcomesDisplayFallback from "@/components/fallbacks/outcomes-display-fallback";
import { fetchOutcomes } from "@/lib/dal";

export default async function OutcomesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        Your Learning Outcomes
      </h1>
      <Suspense fallback={<OutcomesDisplayFallback />}>
        <OutcomesDisplay outcomesPromise={fetchOutcomes()} />
      </Suspense>
    </div>
  );
}
