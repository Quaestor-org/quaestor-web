"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateLessonMutation } from "@/app/admin/mutations";

export function AddLessonDialog({ courseId }: { courseId: string }) {
  const [open, setOpen] = useState(false);
  const mutation = useCreateLessonMutation(courseId);

  const form = useForm({
    defaultValues: {
      title: "",
      material: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
      setOpen(false);
      form.reset();
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors text-sm font-medium">
          Add Lesson
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Lesson</DialogTitle>
          <DialogDescription>
            Add a new lesson to this course.
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
          <form.Field
            name="title"
            validators={{
              onChange: z.string().min(3, "Title must be at least 3 characters"),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="text-sm font-medium text-zinc-900">
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
                {field.state.meta.errors ? (
                  <p className="text-xs text-red-500">{field.state.meta.errors}</p>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field
            name="material"
            validators={{
              onChange: z.string().min(10, "Material must be at least 10 characters"),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="text-sm font-medium text-zinc-900">
                  Lesson Material (Paragraphs)
                </label>
                <p className="text-xs text-zinc-500">Separate paragraphs with a new line.</p>
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
                {field.state.meta.errors ? (
                  <p className="text-xs text-red-500">{field.state.meta.errors}</p>
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
              {mutation.isPending ? "Creating..." : "Create Lesson"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
