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
import { useUpdateQuestionMutation } from "@/lib/mutations";
import { AddQuestionSchema } from "@/lib/schemas";
import type { Question } from "@/lib/types";

export function EditQuestionDialog({ question }: { question: Question }) {
  const [open, setOpen] = useState(false);
  const mutation = useUpdateQuestionMutation();

  const initialCorrectAnswer = (() => {
    const idx = question.answers.findIndex((a) => a.isCorrect);
    if (idx === 0) return "answer1";
    if (idx === 1) return "answer2";
    if (idx === 2) return "answer3";
    return "answer4";
  })();

  const form = useForm({
    defaultValues: {
      text: question.text,
      answer1: question.answers[0]?.text || "",
      answer2: question.answers[1]?.text || "",
      answer3: question.answers[2]?.text || "",
      answer4: question.answers[3]?.text || "",
      correctAnswer: initialCorrectAnswer as
        | "answer1"
        | "answer2"
        | "answer3"
        | "answer4",
      lessonId: question.lessonId,
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync({ id: question.id, data: value });
      setOpen(false);
    },
    validators: {
      onBlur: AddQuestionSchema,
      onSubmit: AddQuestionSchema,
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
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
          <DialogDescription>
            Update the question and answers details.
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
          <form.Field name="text">
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-zinc-900"
                >
                  Question Text
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  placeholder="e.g. What is a component?"
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <p className="text-xs text-red-500">
                    {field.state.meta.errors[0]?.message}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <div className="space-y-4 pt-4 border-t">
            <h2 className="text-sm font-medium text-zinc-900">Answers</h2>
            <p className="text-xs text-zinc-500">
              Select the radio button next to the correct answer. Minimum 2
              answers required.
            </p>

            <form.Field name="correctAnswer">
              {(correctField) => (
                <div className="space-y-3">
                  {(["answer1", "answer2", "answer3", "answer4"] as const).map(
                    (ansName, index) => {
                      return (
                        <div
                          key={ansName}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="radio"
                            name={correctField.name}
                            value={ansName}
                            checked={correctField.state.value === ansName}
                            onChange={() => correctField.handleChange(ansName)}
                            className="h-4 w-4 text-zinc-900 border-zinc-300 focus:ring-zinc-900"
                          />
                          <form.Field name={ansName}>
                            {(field) => (
                              <div className="flex-1">
                                <input
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={(e) =>
                                    field.handleChange(e.target.value)
                                  }
                                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900"
                                  placeholder={`Answer ${index + 1}`}
                                />
                                {field.state.meta.isTouched &&
                                field.state.meta.errors.length ? (
                                  <p className="text-xs text-red-500 mt-1">
                                    {field.state.meta.errors[0]?.message}
                                  </p>
                                ) : null}
                              </div>
                            )}
                          </form.Field>
                        </div>
                      );
                    },
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex justify-end pt-4 border-t">
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
