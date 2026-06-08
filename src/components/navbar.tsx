"use client";

import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export function NavBar() {
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
