export type Course = {
  id: string;
  title: string;
  description: string;
};

export type Lesson = {
  id: string;
  courseId: string;
  title: string;
  material: string[];
};

export type Answer = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: string;
  lessonId: string;
  text: string;
  answers: Answer[];
};

export type UserOutcome = {
  id: string;
  userId: string;
  lessonId: string;
  score: number;
  totalQuestions: number;
  aiSummary: string | null;
  createdAt: string;
};

export type ClientQuestion = {
  id: string;
  text: string;
  answers: { id: string; text: string }[];
};
