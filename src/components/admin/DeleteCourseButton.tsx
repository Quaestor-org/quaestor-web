"use client";

import { useDeleteCourseMutation } from "@/lib/mutations";

export function DeleteCourseButton({ id }: { id: string }) {
  const mutation = useDeleteCourseMutation();

  return (
    <button
      onClick={() => {
        if (confirm("Are you sure you want to delete this course?")) {
          mutation.mutate(id);
        }
      }}
      disabled={mutation.isPending}
      className="text-red-600 hover:underline font-medium disabled:opacity-50 disabled:no-underline"
    >
      {mutation.isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
