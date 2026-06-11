"use client";

import { useDeleteQuestionMutation } from "@/app/admin/mutations";

export function DeleteQuestionButton({ id }: { id: string }) {
  const mutation = useDeleteQuestionMutation();

  return (
    <button
      type="button"
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
