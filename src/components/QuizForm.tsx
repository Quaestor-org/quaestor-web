"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { use } from "react";
import { submitQuizAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ClientQuestion } from "@/lib/types";

export function QuizForm({
  lessonIdPromise,
  questionsPromise,
}: {
  lessonIdPromise: Promise<string>;
  questionsPromise: Promise<ClientQuestion[] | undefined>;
}) {
  const lessonId = use(lessonIdPromise);
  const questions = use(questionsPromise);
  const qs = questions ?? [];
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: submitQuizAction,
    onSuccess: () => {
      router.push("/outcomes");
      router.refresh();
    },
  });

  const form = useForm({
    defaultValues: {
      answers: qs.reduce((acc, q) => {
        acc[q.id] = "";
        return acc;
      }, {} as Record<string, string>),
    },
    onSubmit: async ({ value }) => {
      mutation.mutate({ lessonId, answers: value.answers });
    },
  });

  if (qs.length === 0) {
    return <p className="text-zinc-500">No questions for this lesson.</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-8"
    >
      {qs.map((q, index) => (
        <Card key={q.id} className="border-zinc-200 shadow-sm">
          <CardContent className="pt-6">
            <h3 className="font-medium text-lg text-zinc-900 mb-4">
              {index + 1}. {q.text}
            </h3>
            <form.Field
              name={`answers.${q.id}`}
              validators={{
                onChange: ({ value }) =>
                  !value ? "Please select an answer" : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-3">
                  <RadioGroup
                    onValueChange={field.handleChange}
                    value={field.state.value}
                    className="flex flex-col space-y-2"
                  >
                    {q.answers.map((a) => (
                      <div key={a.id} className="flex items-center space-x-3">
                        <RadioGroupItem value={a.id} id={a.id} />
                        <Label
                          htmlFor={a.id}
                          className="font-normal text-base text-zinc-700 cursor-pointer"
                        >
                          {a.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {field.state.meta.errors ? (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>
          </CardContent>
        </Card>
      ))}

      <Button
        type="submit"
        disabled={mutation.isPending}
        className="w-full sm:w-auto px-8"
      >
        {mutation.isPending ? "Submitting..." : "Submit Quiz"}
      </Button>
      {mutation.isError && (
        <p className="text-sm text-red-500 mt-2">
          Error submitting quiz. Please try again.
        </p>
      )}
    </form>
  );
}
