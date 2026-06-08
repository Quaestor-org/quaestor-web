"use client";

import { useDeleteQuestionMutation } from "@/app/admin/mutations";

export function DeleteQuestionButton({ id, courseId, lessonId }: { id: string; courseId: string; lessonId: string }) {
  const mutation = useDeleteQuestionMutation(courseId, lessonId);

  return (
    <button
      onClick={() => {
        if (confirm("Are you sure you want to delete this question?")) {
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
