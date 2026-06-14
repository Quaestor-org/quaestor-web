"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateCourseMutation } from "@/lib/mutations";
import { AddCourseSchema } from "@/lib/schemas";

export function AddCourseDialog() {
  const [open, setOpen] = useState(false);
  const mutation = useCreateCourseMutation();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
      setOpen(false);
      form.reset();
    },
    validators: { onBlur: AddCourseSchema, onSubmit: AddCourseSchema },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors text-sm font-medium"
          />
        }
      >
        Add Course
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new course.
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
                  Course Title
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  placeholder="e.g. Introduction to GraphQL"
                />
                {field.state.meta.errors?.length &&
                field.state.meta.isTouched ? (
                  <p className="text-xs text-red-500">
                    {field.state.meta.errors[0]?.message}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field
            name="description"
            validators={{
              onChange: z
                .string()
                .min(10, "Description must be at least 10 characters"),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-zinc-900"
                >
                  Description
                </label>
                <textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
                  placeholder="Describe what students will learn..."
                />
                {field.state.meta.errors?.length &&
                field.state.meta.isTouched ? (
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
              {mutation.isPending ? "Creating..." : "Create Course"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
