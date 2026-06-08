import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourseAction, createLessonAction, createQuestionAction, deleteCourseAction, deleteLessonAction, deleteQuestionAction } from "./actions";

export function useCreateCourseMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { title: string; description: string }) => {
      return await createCourseAction(data);
    },
    onSuccess: () => {
      // Could invalidate queries here if we were querying via react-query
      // but since we rely on Server Components, the revalidatePath in the action does the work.
    },
  });
}

export function useCreateLessonMutation(courseId: string) {
  return useMutation({
    mutationFn: async (data: { title: string; material: string }) => {
      return await createLessonAction(courseId, data);
    },
  });
}

export function useCreateQuestionMutation(lessonId: string) {
  return useMutation({
    mutationFn: async (data: {
      text: string;
      answer1: string;
      answer2: string;
      answer3: string;
      answer4: string;
      correctAnswer: string;
    }) => {
      return await createQuestionAction(lessonId, data);
    },
  });
}

export function useDeleteCourseMutation() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteCourseAction(id);
    },
  });
}

export function useDeleteLessonMutation(courseId: string) {
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteLessonAction(id, courseId);
    },
  });
}

export function useDeleteQuestionMutation(courseId: string, lessonId: string) {
  return useMutation({
    mutationFn: async (questionId: string) => {
      return await deleteQuestionAction(questionId, courseId, lessonId);
    },
  });
}
