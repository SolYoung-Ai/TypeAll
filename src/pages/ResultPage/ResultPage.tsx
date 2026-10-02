import { useParams, Link } from 'react-router-dom';
import { getTest } from '@/data/registry';
import { loadAttempts } from '@/lib/history';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SITE } from '@/config/site';
import { RefreshCcw, ArrowLeft, Info, Check, TriangleAlert, Handshake, ShieldAlert, Wrench } from 'lucide-react';
import type { IDimensionPoint, TestResult, ITypePoint } from '@/data/types';
import { cn } from '@/lib/utils';

function pick(level: IDimensionPoint['level'], a?: string, b?: string, c?: string): string | undefined {
  return level === 'low' ? a : level === 'high' ? c : b;
}

function Field({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 shrink-0 text-primary/70">{icon}</span>
      <div>
        <div className="text-xs font-medium text-muted-foreground">{label}</div>
        <div className="mt-0.5 text-sm leading-relaxed">{value}</div>
      </div>
    </div>
  );
}

function DimensionCard({ d, testId }: { d: IDimensionPoint; testId: string }) {
  const test = getTest(testId);
  const meta = test?.dimensionMeta?.find((m) => m.key === d.key);
  const overview = meta ? pick(d.level, meta.low, meta.mid, meta.high) : undefined;
  const adv = meta ? pick(d.level, meta.advLow, meta.advMid, meta.advHigh) : undefined;
  const risk = meta ? pick(d.level, meta.riskLow, meta.riskMid, meta.riskHigh) : undefined;
  const match = meta ? pick(d.level, meta.matchLow, meta.matchMid, meta.matchHigh) : undefined;
  const pit = meta ? pick(d.level, meta.pitLow, meta.pitMid, meta.pitHigh) : undefined;
  const tip = meta ? pick(d.level, meta.tipLow, meta.tipMid, meta.tipHigh) : undefined;
  const color = d.level === 'high' ? 'text-emerald-600' : d.level === 'low' ? 'text-amber-600' : 'text-sky-600';

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{d.label}</CardTitle>
          <span className={cn('text-sm font-semibold', color)}>{d.percent}%</span>
        </div>
        <Progress className="mt-2" value={d.percent} aria-label={`${d.label} 得分`} />
      </CardHeader>
      <CardContent className="space-y-3 pt-2">
        {overview && <p className="text-sm text-muted-foreground">{overview}</p>}
        <Field icon={<Check className="h-4 w-4" />} label="优势" value={adv} />
        <Field icon={<TriangleAlert className="h-4 w-4" />} label="潜在短板" value={risk} />
        <Field icon={<Handshake className="h-4 w-4" />} label="适合的相处模式" value={match} />
        <Field icon={<ShieldAlert className="h-4 w-4" />} label="容易踩坑的场景" value={pit} />
        <Field icon={<Wrench className="h-4 w-4" />} label="自我调整建议" value={tip} />
      </CardContent>
    </Card>
  );
}

function TypePrimary({ result, testId }: { result: TestResult; testId: string }) {
  const test = getTest(testId);
  const meta = result.primaryKey && test?.typesMeta ? test.typesMeta[result.primaryKey] : undefined;
  if (!meta) return null;
  return (
    <Card className="border-primary/30">
      <CardHeader>
        <Badge className="w-fit">你的主导类型</Badge>
        <CardTitle className="text-lg">{meta.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {meta.desc && <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{meta.desc}</p>}
        <Field icon={<Check className="h-4 w-4" />} label="优势" value={meta.adv} />
        <Field icon={<TriangleAlert className="h-4 w-4" />} label="潜在短板" value={meta.risk} />
        <Field icon={<Handshake className="h-4 w-4" />} label="适合的相处模式" value={meta.match} />
        <Field icon={<ShieldAlert className="h-4 w-4" />} label="容易踩坑的场景" value={meta.pit} />
        <Field icon={<Wrench className="h-4 w-4" />} label="自我调整建议" value={meta.tip} />
      </CardContent>
    </Card>
  );
}

function TypeRanks({ types }: { types: ITypePoint[] }) {
  const max = types.length ? types[0].score : 1;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">各类型得分排序</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {types.map((t, i) => (
          <div key={t.key} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className={cn(i === 0 ? 'font-semibold' : 'text-muted-foreground')}>
                {i === 0 && '★ '}
                {t.name}
              </span>
              <span className="text-xs text-muted-foreground">{t.score}</span>
            </div>
            <Progress value={max ? (t.score / max) * 100 : 0} aria-label={`${t.name} 得分`} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function MbtiCard({ result }: { result: TestResult }) {
  const m = result.mbti;
  if (!m) return null;
  return (
    <Card className="border-primary/30">
      <CardHeader>
        <Badge className="w-fit">你的人格类型</Badge>
        <CardTitle className="text-lg">{m.code}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          {m.letterDesc.map((line, i) => (
            <p key={i} className="text-sm text-muted-foreground">
              {line}
            </p>
          ))}
        </div>
        <Field icon={<Check className="h-4 w-4" />} label="核心优势" value={m.adv} />
        <Field icon={<TriangleAlert className="h-4 w-4" />} label="潜在短板" value={m.risk} />
        <Field icon={<Handshake className="h-4 w-4" />} label="适合的相处模式" value={m.match} />
        <Field icon={<ShieldAlert className="h-4 w-4" />} label="压力状态与踩坑场景" value={m.pit} />
        <Field icon={<Wrench className="h-4 w-4" />} label="成长发展建议" value={m.tip} />
      </CardContent>
    </Card>
  );
}

function AttachmentCard({ result }: { result: TestResult }) {
  const a = result.attachment;
  if (!a) return null;
  return (
    <Card className="border-primary/30">
      <CardHeader>
        <Badge className="w-fit">你的依恋类型</Badge>
        <CardTitle className="text-lg">{a.type}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
        <Field icon={<Check className="h-4 w-4" />} label="优势" value={a.adv} />
        <Field icon={<TriangleAlert className="h-4 w-4" />} label="潜在短板" value={a.risk} />
        <Field icon={<Handshake className="h-4 w-4" />} label="适合的相处模式" value={a.match} />
        <Field icon={<ShieldAlert className="h-4 w-4" />} label="容易踩坑的场景" value={a.pit} />
        <Field icon={<Wrench className="h-4 w-4" />} label="改善实操建议" value={a.tip} />
      </CardContent>
    </Card>
  );
}

function Body({ result, testId }: { result: TestResult; testId: string }) {
  if (result.kind === 'dimension') {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {result.dimensions?.map((d) => (
          <DimensionCard key={d.key} d={d} testId={testId} />
        ))}
      </div>
    );
  }
  if (result.kind === 'mbti') return <MbtiCard result={result} />;
  if (result.kind === 'attachment') return <AttachmentCard result={result} />;
  return (
    <div className="space-y-4">
      <TypePrimary result={result} testId={testId} />
      {result.types && result.types.length > 1 && <TypeRanks types={result.types} />}
    </div>
  );
}

export default function ResultPage() {
  const { id, attemptId } = useParams();
  const test = id ? getTest(id) : undefined;
  const attempts = loadAttempts();
  const attempt = attemptId ? attempts.find((a) => a.id === attemptId) : attempts[0];

  if (!test || !attempt) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <p className="text-muted-foreground">未找到该份报告（历史记录保存在本机浏览器，清除缓存会丢失）。</p>
        <Link to="/tests" className="mt-2 inline-block text-sm text-primary underline">
          去重新测试
        </Link>
      </div>
    );
  }

  const { result } = attempt;

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{test.trust}</Badge>
          {result.primaryName && <Badge className="bg-primary/10 text-primary">{result.primaryName}</Badge>}
        </div>
        <h1 className="mt-2 text-2xl font-bold">{test.name} · 测评报告</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{result.summary}</p>
      </div>

      <Body result={result} testId={test.id} />

      <Card className="border-muted">
        <CardContent className="flex items-start gap-2 p-4 text-sm text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{result.disclaimer}</span>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <Button asChild>
          <Link to={`/test/${test.id}`}>
            <RefreshCcw className="h-4 w-4" />
            重新测试
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/tests">
            <ArrowLeft className="h-4 w-4" />
            返回测试列表
          </Link>
        </Button>
      </div>

      {attempts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">我的历史记录（本机保存）</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {attempts.map((a) => (
              <Link
                key={a.id}
                to={`/result/${a.testId}/${a.id}`}
                className={cn(
                  'flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors',
                  a.id === attempt.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40',
                )}
              >
                <span>{a.testName}</span>
                <span className="text-xs text-muted-foreground">
                  {a.result.primaryName ?? '已完成'} · {new Date(a.at).toLocaleDateString()}
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      <p className="text-center text-xs text-muted-foreground">
        {SITE.name} · {SITE.copyright}
      </p>
    </div>
  );
}
