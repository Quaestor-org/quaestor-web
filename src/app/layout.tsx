import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Providers } from "@/components/Providers";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LearnerPro",
  description: "A platform for learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-950">
        <ClerkProvider>
          <Providers>
            <header className="border-b px-6 py-4 flex items-center justify-between">
              <Link href="/" className="font-bold text-xl tracking-tight">
                Quaestor
              </Link>
              <nav className="space-x-6 text-sm font-medium text-zinc-600">
                <Link
                  href="/courses"
                  className="hover:text-zinc-900 transition-colors"
                >
                  Courses
                </Link>
                <Link
                  href="/outcomes"
                  className="hover:text-zinc-900 transition-colors"
                >
                  Outcomes
                </Link>
              </nav>
            </header>
            <main className="flex-1 max-w-5xl mx-auto w-full p-6 sm:p-10">
              {children}
            </main>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
