import { useEffect, useRef } from 'react';

// giscus 评论区：基于 GitHub Discussions，支持评论 / 回复 / 点赞
// 访客需 GitHub 登录后即可发言。
// 关键：giscus 的 client.js 是从「它自身的 <script> 标签的 data-* 属性」读取
// 配置（data-repo、data-repo-id、data-theme 等），并创建一个 iframe 插入到该
// script 标签之后。因此这里在评论区位置动态创建一个带 data-* 属性的 giscus
// 脚本，iframe 就会渲染在评论区容器内。
const GISCUS_DATA: Record<string, string> = {
  repo: 'SolYoung-work/personality-hub',
  repoId: 'R_kgDOU4dm7A',
  category: 'Announcements',
  categoryId: 'DIC_kwDOU4dm7M4DG3yp',
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'preferred_color_scheme',
  lang: 'zh-CN',
  loading: 'lazy',
};

export default function CommentSection() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = boxRef.current;
    if (!host || host.querySelector('script[data-giscus-script]')) return;

    const s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    s.async = true;
    s.setAttribute('data-giscus-script', '');
    for (const [k, v] of Object.entries(GISCUS_DATA)) {
      s.dataset[k] = v;
    }
    host.appendChild(s);
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
