"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     startTransition(() => {
  //       const params = new URLSearchParams(searchParams.toString());
  //       if (query) {
  //         params.set("q", query);
  //       } else {
  //         params.delete("q");
  //       }
  //       router.push(`/courses?${params.toString()}`);
  //     });
  //   }, 300);

  //   return () => clearTimeout(timeoutId);
  // }, [query, router, searchParams]);

  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-4 w-4" />
      <Input
        type="search"
        placeholder="Search courses..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 rounded-full border-zinc-200 focus-visible:ring-zinc-900"
      />
      {isPending && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">
          Searching...
        </span>
      )}
    </div>
  );
}
