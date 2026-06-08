import { SearchBar } from "./SearchBar";

export default function CoursesHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        Courses
      </h1>
      <SearchBar />
    </div>
  );
}
