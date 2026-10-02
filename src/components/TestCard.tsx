import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import type { ITestDef } from '@/data/types';
import { SITE } from '@/config/site';
import { cn } from '@/lib/utils';

export default function TestCard({ test }: { test: ITestDef }) {
  const cat = SITE.categoryMeta[test.category];
  return (
    <Link to={`/test/${test.id}`} className="block h-full">
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardContent className="flex h-full flex-col gap-2 p-5">
          <div className="flex items-center justify-between">
            <Badge className={cn(cat.color, 'font-normal')}>{cat.label}</Badge>
            <div className="flex text-amber-400" aria-label={`可信度 ${cat.star} 星`}>
              {Array.from({ length: cat.star }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
          </div>
          <div className="text-base font-semibold">{test.name}</div>
          <p className="line-clamp-2 text-sm text-muted-foreground">{test.desc}</p>
          <div className="mt-auto flex items-center justify-between pt-1 text-xs text-muted-foreground">
            <span>{test.trust}</span>
            <span>{test.time}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
