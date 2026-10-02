import { useEffect, useRef } from 'react';

// giscus 评论区：基于 GitHub Discussions，支持评论 / 回复 / 点赞
// 访客需 GitHub 登录后即可发言（giscus.app 生成的配置）
// 用原生 DOM 创建 <giscus-widget> 并 setAttribute，避免 React 对自定义元素
// 属性传递失效（camelCase 属性不会作为 attribute 落到元素上）导致 giscus 读不到仓库配置。
const GISCUS_REPO = 'SolYoung-work/personality-hub';
const GISCUS_REPO_ID = 'R_kgDOU4dm7A';
const GISCUS_CATEGORY = 'Announcements';
const GISCUS_CATEGORY_ID = 'DIC_kwDOU4dm7M4DG3yp';

const WIDGET_ATTRS: Record<string, string> = {
  repo: GISCUS_REPO,
  repoid: GISCUS_REPO_ID,
  category: GISCUS_CATEGORY,
  categoryid: GISCUS_CATEGORY_ID,
  mapping: 'pathname',
  strict: '0',
  'reactions-enabled': '1',
  'emit-metadata': '0',
  'input-position': 'bottom',
  theme: 'preferred_color_scheme',
  lang: 'zh-CN',
  loading: 'lazy',
};

export default function CommentSection() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = boxRef.current;
    if (!host) return;

    // 注入 giscus client 脚本（注册 <giscus-widget> 自定义元素），仅一次
    const ensureScript = (): Promise<void> => {
      if (document.querySelector('script[data-giscus-script]')) return Promise.resolve();
      return new Promise((resolve) => {
        const s = document.createElement('script');
        s.src = 'https://giscus.app/client.js';
        s.async = true;
        s.setAttribute('data-giscus-script', '');
        s.onload = () => resolve();
        document.head.appendChild(s);
      });
    };

    ensureScript().then(() => {
      if (host.querySelector('giscus-widget')) return;
      const el = document.createElement('giscus-widget');
      for (const [k, v] of Object.entries(WIDGET_ATTRS)) {
        el.setAttribute(k, v);
      }
      host.appendChild(el);
    });
  }, []);

  return (
    <section className="mt-12">
      <h2 className="text-base font-semibold">评论区</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        登录 GitHub 后即可留言、回复与点赞
      </p>
      <div ref={boxRef} className="mt-4" />
    </section>
  );
}
