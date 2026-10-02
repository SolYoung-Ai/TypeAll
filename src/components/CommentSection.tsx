import { useEffect, createElement } from 'react';

// giscus 评论区：基于 GitHub Discussions，支持评论 / 回复 / 点赞
// 访客需 GitHub 登录后即可发言（giscus.app 生成的配置）
const GISCUS_REPO = 'SolYoung-work/personality-hub';
const GISCUS_REPO_ID = 'R_kgDOU4dm7A';
const GISCUS_CATEGORY = 'Announcements';
const GISCUS_CATEGORY_ID = 'DIC_kwDOU4dm7M4DG3yp';

const attrs: Record<string, string> = {
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
  useEffect(() => {
    // 注入 giscus client 脚本（注册 <giscus-widget> 自定义元素），仅注入一次
    if (document.querySelector('script[data-giscus-script]')) return;
    const s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    s.async = true;
    s.setAttribute('data-giscus-script', '');
    document.head.appendChild(s);
  }, []);

  return (
    <section className="mt-12">
      <h2 className="text-base font-semibold">评论区</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        登录 GitHub 后即可留言、回复与点赞
      </p>
      <div className="mt-4">{createElement('giscus-widget', attrs)}</div>
    </section>
  );
}

