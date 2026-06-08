import type { Course, Lesson, Question, UserOutcome } from './types';

// Mock data
export const courses: Course[] = [
  { id: 'c1', title: 'Introduction to React', description: 'Learn the basics of React' },
  { id: 'c2', title: 'Advanced Next.js', description: 'Server components, actions, and more' },
];

export const lessons: Lesson[] = [
  { 
    id: 'l1', 
    courseId: 'c1', 
    title: 'React Components', 
    material: [
      'Components are the building blocks of any React application. Think of them as independent, reusable pieces of UI.',
      'A component is fundamentally a JavaScript function that returns React elements describing what should appear on the screen.',
      'By breaking down your UI into components, you can manage the complexity of your applications and reuse code effectively across your projects. This modular approach is essential for maintaining large codebases.'
    ]
  },
  { 
    id: 'l2', 
    courseId: 'c1', 
    title: 'State and Props', 
    material: [
      'State and Props are two of the most important concepts in React. They control how data flows through your components.',
      'Props (short for properties) are used to pass data from a parent component down to a child component. They are read-only.',
      'State, on the other hand, is managed within the component itself. When a component’s state changes, React will re-render that component to reflect the new data.'
    ]
  },
  { 
    id: 'l3', 
    courseId: 'c2', 
    title: 'Server Components', 
    material: [
      'React Server Components (RSC) allow developers to build applications that span the server and client. They execute only on the server, resulting in zero bundle size for the components themselves.',
      'By moving data fetching and initial rendering to the server, we can significantly reduce the amount of JavaScript sent to the browser, leading to faster load times.',
      'Unlike traditional SSR (Server-Side Rendering), Server Components can be rendered without losing the client-side state of your interactive components.'
    ]
  },
];

export const questions: Question[] = [
  {
    id: 'q1',
    lessonId: 'l1',
    text: 'What is a component?',
    answers: [
      { id: 'a1', text: 'A reusable piece of UI', isCorrect: true },
      { id: 'a2', text: 'A database table', isCorrect: false },
      { id: 'a3', text: 'A network protocol', isCorrect: false },
    ],
  },
  {
    id: 'q2',
    lessonId: 'l1',
    text: 'Can components have state?',
    answers: [
      { id: 'a4', text: 'Yes', isCorrect: true },
      { id: 'a5', text: 'No', isCorrect: false },
    ],
  },
  {
    id: 'q3',
    lessonId: 'l3',
    text: 'Where do Server Components render?',
    answers: [
      { id: 'a6', text: 'On the server', isCorrect: true },
      { id: 'a7', text: 'In the browser', isCorrect: false },
      { id: 'a8', text: 'On both', isCorrect: false },
    ],
  }
];

export let outcomes: UserOutcome[] = [];

// Mock DB functions
export async function getCourses() {
  return courses;
}

export async function getCourseById(id: string) {
  return courses.find(c => c.id === id);
}

export async function getLessonsByCourse(courseId: string) {
  return lessons.filter(l => l.courseId === courseId);
}

export async function getLessonById(id: string) {
  return lessons.find(l => l.id === id);
}

export async function getQuestionsByLesson(lessonId: string) {
  return questions.filter(q => q.lessonId === lessonId);
}

export async function getOutcomes() {
  return outcomes;
}

export async function saveOutcome(outcome: Omit<UserOutcome, 'id' | 'createdAt'>) {
  const newOutcome: UserOutcome = {
    ...outcome,
    id: Math.random().toString(36).substring(7),
    createdAt: new Date().toISOString(),
  };
  outcomes.push(newOutcome);
  return newOutcome;
}

export async function updateOutcomeSummary(id: string, aiSummary: string) {
  const index = outcomes.findIndex(o => o.id === id);
  if (index !== -1) {
    outcomes[index] = { ...outcomes[index], aiSummary };
    return outcomes[index];
  }
  return null;
}
