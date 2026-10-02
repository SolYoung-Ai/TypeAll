import { useState } from 'react';
import TestCard from '@/components/TestCard';
import { ALL_TESTS } from '@/data/registry';
import type { TestCategory } from '@/data/types';
import { cn } from '@/lib/utils';

const FILTERS: { key: TestCategory | 'all'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'academic', label: '学术量表' },
  { key: 'popular', label: '流行测评' },
  { key: 'fun', label: '娱乐测试' },
];

export default function TestsPage() {
  const [f, setF] = useState<TestCategory | 'all'>('all');
  const [kw, setKw] = useState('');
  const base = f === 'all' ? ALL_TESTS : ALL_TESTS.filter((t) => t.category === f);
  const kwTrim = kw.trim().toLowerCase();
  const list = kwTrim
    ? base.filter(
        (t) =>
          t.name.toLowerCase().includes(kwTrim) ||
          t.desc.toLowerCase().includes(kwTrim),
      )
    : base;
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">全部测试</h1>
      <p className="mt-1 text-sm text-muted-foreground">共 {ALL_TESTS.length} 套人格测试，按可信度分级</p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((x) => (
            <button
              key={x.key}
              type="button"
              onClick={() => setF(x.key)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm transition-colors',
                f === x.key
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground',
              )}
            >
              {x.label}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={kw}
          onChange={(e) => setKw(e.target.value)}
          placeholder="搜索测试，如 MBTI、大五、九型…"
          className="ml-auto h-9 w-full max-w-xs rounded-lg border border-border bg-card px-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/30"
        />
      </div>
      {kwTrim && (
        <p className="mt-3 text-xs text-muted-foreground">
          搜索「{kwTrim}」共找到 {list.length} 套测试
        </p>
      )}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <TestCard key={t.id} test={t} />
        ))}
      </div>
      {list.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted-foreground">没有找到匹配的测试，换个关键词试试。</p>
      )}
    </div>
  );
}
