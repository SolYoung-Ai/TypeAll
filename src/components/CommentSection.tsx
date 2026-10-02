import { useEffect, useRef } from 'react';

// giscus 评论区：基于 GitHub Discussions，支持评论 / 回复 / 点赞
// 访客需 GitHub 登录后即可发言（giscus.app 生成的配置）
// 采用：动态注入 giscus client 脚本（注册 <giscus-widget>）+ 原生 setAttribute
// 设置属性，确保脚本一定能加载、属性一定能落到元素上（React 对自定义元素
// 的属性传递容易失效，官方 React 组件的脚本加载在部分环境也不稳定）。
const GISCUS_REPO = 'SolYoung-work/personality-hub';
const GISCUS_REPO_ID = 'R_kgDOU4dm7A';
const GISCUS_CATEGORY = 'Announcements';
const GISCUS_CATEGORY_ID = 'DIC_kwDOU4dm7M4DG3yp';

// giscus-widget 自定义元素使用小写 attribute（DOM attribute 不区分大小写）
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

    // 动态注入 giscus client 脚本（注册 <giscus-widget>），仅一次
    const ensureScript = (): Promise<void> => {
      if (document.querySelector('script[data-giscus-script]')) return Promise.resolve();
      return new Promise((resolve) => {
        const s = document.createElement('script');
        s.src = 'https://giscus.app/client.js';
        s.async = true;
        s.setAttribute('data-giscus-script', '');
        s.onload = () => resolve();
        s.onerror = () => resolve();
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
