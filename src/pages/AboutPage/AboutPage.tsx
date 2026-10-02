import { useState } from 'react';
import { Image } from '@/components/ui/image';
import { Card, CardContent } from '@/components/ui/card';
import { SITE } from '@/config/site';
import wechatQr from '@/assets/wechat-qr.png';

export default function AboutPage() {
  const [showQr, setShowQr] = useState(false);
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
            <a
              href={SITE.personalSite}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              访问我的个人网站
              <span aria-hidden>→</span>
            </a>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-3 p-6">
          <h2 className="font-semibold">关于本站</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            本站聚合 25 套全网主流性格测试，分为学术量表、流行测评与趣味娱乐三类。本站由 AI 辅助搭建，界面力求简洁易用，结果报告逐维度给出解读与相处建议。
          </p>
          <h2 className="pt-2 font-semibold">免责声明</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{SITE.disclaimer}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent
          className="flex cursor-pointer items-center justify-between gap-3 p-6 transition-colors hover:bg-accent/50"
          onClick={() => setShowQr(true)}
        >
          <div>
            <div className="text-lg font-bold">广告位招租</div>
            <p className="mt-1 text-sm text-muted-foreground">
              位置可指定 · 长期稳定运营 · 价格超低，欢迎扫码洽谈
            </p>
          </div>
          <span aria-hidden className="text-muted-foreground">→</span>
        </CardContent>
      </Card>

      {showQr && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowQr(false)}
        >
          <div
            className="w-full max-w-xs rounded-2xl border bg-background p-6 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={wechatQr} alt="扫码添加微信洽谈广告" className="mx-auto w-full max-w-[240px] rounded-xl" />
            <p className="mt-3 text-sm text-muted-foreground">扫二维码，添加我为朋友，洽谈广告合作</p>
            <button
              className="mt-3 inline-flex rounded-full border px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setShowQr(false)}
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
