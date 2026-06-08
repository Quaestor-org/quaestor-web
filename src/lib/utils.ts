import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseParams(p: string | string[] | undefined): string {
  return Array.isArray(p) ? p[0] : (p ?? "");
}
