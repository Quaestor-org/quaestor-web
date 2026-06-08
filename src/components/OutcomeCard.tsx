import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface OutcomeCardProps {
  id: string;
  lessonTitle: string;
  score: number;
  totalQuestions: number;
  aiSummary: string | null;
  createdAt: string;
}

export function OutcomeCard({
  lessonTitle,
  score,
  totalQuestions,
  aiSummary,
  createdAt,
}: OutcomeCardProps) {
  return (
    <Card className="border-zinc-200 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">{lessonTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-zinc-500">Score:</div>
          <div className="text-lg font-semibold text-zinc-900">
            {score} / {totalQuestions}
          </div>
        </div>
        <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100">
          <h4 className="text-sm font-medium text-zinc-700 mb-2">AI Summary</h4>
          {aiSummary ? (
            <p className="text-zinc-600 text-sm leading-relaxed">{aiSummary}</p>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="animate-pulse flex space-x-2">
                <div className="h-2 w-2 bg-zinc-300 rounded-full"></div>
                <div className="h-2 w-2 bg-zinc-300 rounded-full"></div>
                <div className="h-2 w-2 bg-zinc-300 rounded-full"></div>
              </div>
              <span className="text-sm text-zinc-400">AI is analyzing your results...</span>
            </div>
          )}
        </div>
        <div className="text-xs text-zinc-400">
          Completed on {new Date(createdAt).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
