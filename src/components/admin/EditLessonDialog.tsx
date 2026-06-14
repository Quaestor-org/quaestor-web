"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateLessonMutation } from "@/lib/mutations";
import { AddLessonSchema } from "@/lib/schemas";
import type { Lesson } from "@/lib/types";

export function EditLessonDialog({ lesson }: { lesson: Lesson }) {
  const [open, setOpen] = useState(false);
  const mutation = useUpdateLessonMutation();

  const form = useForm({
    defaultValues: {
      title: lesson.title,
      material: lesson.material.join("\n\n"),
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync({ id: lesson.id, data: value });
      setOpen(false);
    },
    validators: {
      onBlur: AddLessonSchema,
      onSubmit: AddLessonSchema,
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="text-blue-600 hover:underline font-medium"
          />
        }
      >
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Lesson</DialogTitle>
          <DialogDescription>
            Update the details for this lesson.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6 pt-4"
        >
          <form.Field name="title">
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-zinc-900"
                >
                  Lesson Title
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  placeholder="e.g. Components and Props"
                />
                {field.state.meta.errors && field.state.meta.isTouched ? (
                  <p className="text-xs text-red-500">
                    {field.state.meta.errors[0]?.message}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field name="material">
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-zinc-900"
                >
                  Lesson Material (Paragraphs)
                </label>
                <p className="text-xs text-zinc-500">
                  Separate paragraphs with a new line.
                </p>
                <textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none font-mono text-sm"
                  placeholder="First paragraph...&#10;&#10;Second paragraph..."
                />
                {field.state.meta.errors && field.state.meta.isTouched ? (
                  <p className="text-xs text-red-500">
                    {field.state.meta.errors[0]?.message}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-zinc-900 text-white px-6 py-2 rounded-md hover:bg-zinc-800 transition-colors font-medium disabled:opacity-50"
            >
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
