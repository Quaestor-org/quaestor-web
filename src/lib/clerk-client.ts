"use client";

export function isAdminClient(id: string) {
  const raw = process.env.NEXT_PUBLIC_ADMIN_IDS || "";

  // This regex removes [ ] and " characters before splitting
  const adminIds = raw.replace(/[[\]" ]/g, "").split(",");

  const isIncluded = adminIds.includes(id);

  console.log("Cleaned IDs:", adminIds);
  console.log("Checking ID:", id);
  console.log("Result:", isIncluded);

  return isIncluded;
}
