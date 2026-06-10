import { z } from "zod";

// Base schemas corresponding to our database tables

export const CourseSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export const LessonSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  title: z.string().min(1, "Title is required"),
  material: z
    .array(z.string())
    .min(1, "At least one paragraph of material is required"),
});

export const AnswerSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Answer text is required"),
  isCorrect: z.boolean(),
});

export const QuestionSchema = z.object({
  id: z.string(),
  lessonId: z.string(),
  text: z.string().min(1, "Question text is required"),
  answers: z.array(AnswerSchema).min(2, "At least two answers are required"),
});

export const UserOutcomeSchema = z.object({
  id: z.string(),
  userId: z.string(),
  lessonId: z.string(),
  lessonTitle: z.string(),
  score: z.number().int().min(0),
  totalQuestions: z.number().int().min(1),
  aiSummary: z.string().nullable().optional(),
  createdAt: z.string(),
});

// "Add" schemas for forms and API validation

export const AddCourseSchema = CourseSchema.omit({ id: true });
export type AddCourseInput = z.infer<typeof AddCourseSchema>;

export const AddLessonSchema = LessonSchema.omit({
  id: true,
  courseId: true,
}).extend({
  courseId: z.string().optional(), // Often provided by URL or context, so make it optional in the form
});
export type AddLessonInput = z.infer<typeof AddLessonSchema>;

export const AddAnswerSchema = AnswerSchema.omit({ id: true });
export type AddAnswerInput = z.infer<typeof AddAnswerSchema>;


export const AddQuestionSchema = z.object({
  text: z.string().min(1, "Question text is required"),
  answer1: z.string().min(1, "Answer 1 is required"),
  answer2: z.string().min(1, "Answer 2 is required"),
  answer3: z.string(),
  answer4: z.string(),
  correctAnswer: z.enum(["answer1", "answer2", "answer3", "answer4"]),
  lessonId: z.string(),
});

export type AddQuestionInput = z.infer<typeof AddQuestionSchema>;
