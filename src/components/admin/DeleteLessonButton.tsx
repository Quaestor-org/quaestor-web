"use client";

import { useDeleteLessonMutation } from "@/app/admin/mutations";

export function DeleteLessonButton({ id }: { id: string; courseId?: string }) {
  const mutation = useDeleteLessonMutation();

  return (
    <button
      onClick={() => {
        if (confirm("Are you sure you want to delete this lesson?")) {
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
