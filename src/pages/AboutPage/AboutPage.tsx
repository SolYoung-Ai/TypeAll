import { Image } from '@/components/ui/image';
import { Card, CardContent } from '@/components/ui/card';
import { SITE } from '@/config/site';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold">关于{SITE.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{SITE.tagline}</p>
      </div>

      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <Image src={SITE.ownerImg} alt={SITE.ownerName} className="h-16 w-16 rounded-full object-cover" />
          <div className="min-w-0 flex-1">
            <div className="font-semibold">
              {SITE.ownerName} · {SITE.ownerTitle}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{SITE.ownerBio}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href="#douyin"
                className="inline-flex items-center gap-2 rounded-lg px-1.5 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Image src={SITE.douyinImg} alt="抖音 SolYoung" className="h-5 w-5 rounded" />
                SolYoung
              </a>
              <a
                href="#xiaohongshu"
                className="inline-flex items-center gap-2 rounded-lg px-1.5 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Image src={SITE.xiaohongshuImg} alt="小红书 SolYoung" className="h-5 w-5 rounded" />
                SolYoung
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-3 p-6">
          <h2 className="font-semibold">关于本站</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            本站聚合 13 套主流人格与性格测试，分为学术量表、流行测评与趣味娱乐三类。本站由 AI 辅助搭建，作者没有编程经验，界面力求简洁易用，结果报告逐维度给出解读与相处建议。
          </p>
          <h2 className="pt-2 font-semibold">免责声明</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{SITE.disclaimer}</p>
        </CardContent>
      </Card>
    </div>
  );
}
