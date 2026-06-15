"use client";

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { isAdminClient } from "@/lib/clerk-client";

export function NavBar() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight">
          Quaestor
        </Link>
        <div className="h-8 w-20 bg-zinc-100 animate-pulse rounded" />{" "}
        {/* Simple skeleton */}
      </header>
    );
  }
  console.log(user?.id, isLoaded, isAdminClient(user?.id || ""));
  const isAdminValue = isLoaded && isAdminClient(user?.id || "");

  return (
    <header className="border-b px-6 py-4 flex items-center justify-between">
      <Link href="/" className="font-bold text-xl tracking-tight">
        Quaestor
      </Link>
      <nav className="space-x-6 text-sm font-medium text-zinc-600">
        <Link href="/courses" className="hover:text-zinc-900 transition-colors">
          Courses
        </Link>
        <Link
          href="/outcomes"
          className="hover:text-zinc-900 transition-colors"
        >
          Outcomes
        </Link>
        {isAdminValue && (
          <Link
            href="/admin"
            className="hover:text-zinc-900 transition-colors font-semibold"
          >
            Admin
          </Link>
        )}
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button
              type="button"
              className="hover:text-zinc-900 transition-colors"
            >
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button
              type="button"
              className="bg-zinc-900 text-white px-3 py-1.5 rounded-md hover:bg-zinc-800 transition-colors"
            >
              Sign Up
            </button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </nav>
    </header>
  );
}
