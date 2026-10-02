import { Link } from 'react-router-dom';
import TestCard from '@/components/TestCard';
import { Image } from '@/components/ui/image';
import { ALL_TESTS } from '@/data/registry';
import { SITE } from '@/config/site';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const hot = ALL_TESTS.slice(0, 6);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="py-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{SITE.name}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{SITE.tagline}</p>
        <Button asChild className="mt-6">
          <Link to="/tests">
            浏览全部测试
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <a
          href={SITE.personalSite}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <Image src={SITE.ownerImg} alt={SITE.ownerName} className="h-6 w-6 rounded-full object-cover" />
          防伪 · 作者个人网站
          <ArrowRight className="h-4 w-4" />
        </a>
      </section>

      <section className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">热门测试</h2>
          <Link to="/tests" className="text-sm text-primary">
            查看全部
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hot.map((t) => (
            <TestCard key={t.id} test={t} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">测试分类说明</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {(['academic', 'popular', 'fun'] as const).map((c) => (
            <div key={c} className="rounded-xl border bg-card p-5">
              <div className="font-semibold">{SITE.categoryMeta[c].label}</div>
              <p className="mt-1 text-sm text-muted-foreground">{SITE.categoryMeta[c].desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
