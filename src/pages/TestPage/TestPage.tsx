import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTest } from '@/data/registry';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { saveAttempt } from '@/lib/history';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import type { IOption } from '@/data/types';
import { cn } from '@/lib/utils';

export default function TestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const test = id ? getTest(id) : undefined;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(IOption | null)[]>(() =>
    test ? new Array(test.questions.length).fill(null) : [],
  );

  if (!test) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <p className="text-muted-foreground">未找到该测试。</p>
        <Link to="/tests" className="mt-2 inline-block text-sm text-primary underline">
          返回测试列表
        </Link>
      </div>
    );
  }

  const total = test.questions.length;
  const q = test.questions[current];
  const answered = answers.filter(Boolean).length;
  const sel = answers[current];

  const pick = (o: IOption) => setAnswers((prev) => prev.map((x, i) => (i === current ? o : x)));

  const submit = () => {
    if (answered < total) {
      const next = answers.findIndex((x) => !x);
      toast.error(`还有 ${total - answered} 题未作答`);
      if (next >= 0) setCurrent(next);
      return;
    }
    const result = test.compute(answers as IOption[]);
    const attempt = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}`,
      testId: test.id,
      testName: test.name,
      result,
      at: Date.now(),
    };
    saveAttempt(attempt);
    navigate(`/result/${test.id}/${attempt.id}`);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link to="/tests" className="text-sm text-muted-foreground hover:text-foreground">
        ← 返回测试列表
      </Link>
      <h1 className="mt-2 text-xl font-bold">{test.name}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{test.desc}</p>
      <div className="mt-1 text-xs text-muted-foreground">
        {test.trust} · {test.time}
      </div>

      <Progress className="mt-5" value={((current + 1) / total) * 100} aria-label="答题进度" />

      <div className="mt-6 rounded-xl border bg-card p-6">
        <div className="text-base font-medium">
          {current + 1}. {q.q}
        </div>
        <div className="mt-4 space-y-2">
          {q.opts.map((o, i) => (
            <button
              key={i}
              type="button"
              onClick={() => pick(o)}
              className={cn(
                'w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors',
                sel === o
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {o.text}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Button type="button" variant="outline" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
          <ChevronLeft className="h-4 w-4" />
          上一题
        </Button>
        <span className="text-sm text-muted-foreground">
          {current + 1} / {total}
        </span>
        {current < total - 1 ? (
          <Button type="button" disabled={!sel} onClick={() => setCurrent((c) => c + 1)}>
            下一题
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button type="button" disabled={answered < total} onClick={submit}>
            <Check className="h-4 w-4" />
            提交答卷
          </Button>
        )}
      </div>
    </div>
  );
}
