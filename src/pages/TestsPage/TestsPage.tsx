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
  const list = f === 'all' ? ALL_TESTS : ALL_TESTS.filter((t) => t.category === f);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">全部测试</h1>
      <p className="mt-1 text-sm text-muted-foreground">共 {ALL_TESTS.length} 套人格测试，按可信度分级</p>
      <div className="mt-5 flex flex-wrap gap-2">
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
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <TestCard key={t.id} test={t} />
        ))}
      </div>
    </div>
  );
}
