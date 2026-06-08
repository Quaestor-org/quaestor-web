# LearnerPro / Quaestor Web 🎓

A modern, high-performance learning management platform built with the latest React 19 and Next.js 16 capabilities. Designed for a blazing-fast user experience with streaming, granular suspense, and beautiful UI fallbacks.

## 🚀 Features

- **Modern Architecture**: Built on Next.js 16 App Router using React 19's `use()` hook for granular data streaming and promise resolution.
- **Granular Suspense**: Elegant loading states utilizing isolated component boundaries with animated skeleton fallbacks, ensuring users never see a jarring blocked UI.
- **Robust Data Fetching**: Powered by `@tanstack/react-query` for reliable client-side caching and `@tanstack/react-form` for fully typed form handling.
- **Polished UI/UX**: Constructed with [shadcn/ui](https://ui.shadcn.com/) and Tailwind CSS, providing an accessible, clean, and professional aesthetic right out of the box.
- **Server Actions**: Secure mutation logic managed via Next.js Server Actions, keeping sensitive execution logic strictly on the backend.
- **AI-Ready Outcomes**: An outcomes tracking system designed to integrate dynamically updated AI-generated summaries via auto-polling.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Package Manager**: [Bun](https://bun.sh/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State/Mutations**: [TanStack Query & Form](https://tanstack.com/)

## 📦 Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh/) installed on your machine.

### Installation

1. Clone the repository
2. Install the dependencies:

```bash
bun install
```

### Running the Development Server

Start the local development environment:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the platform.

### Building for Production

To create an optimized production build:

```bash
bun run build
bun run start
```

## 🏗 Project Structure

- `src/app/` - The Next.js App Router containing pages for Courses, Lessons, and Outcomes.
- `src/components/` - Highly reusable UI components.
- `src/components/fallbacks/` - Granular Skeleton loaders to handle React Suspense boundaries seamlessly.
- `src/lib/` - Shared utilities, types, and the Data Access Layer (DAL).

## 📄 License

This software is provided under a Custom License Agreement. 

It is free to use, modify, and distribute for **educational, non-commercial purposes**. 

Patrick MacDonald and the GitHub organization `Quaestor-org` retain unrestricted rights to use this software for any purpose, including commercial ventures. Any commercial use by individuals or entities outside of Patrick MacDonald and `Quaestor-org` requires a separate commercial license. 

Please see the [LICENSE.md](./LICENSE.md) file for full details.
