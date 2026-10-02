import { useEffect, useRef } from 'react';

// giscus 评论区：基于 GitHub Discussions，支持评论 / 回复 / 点赞
// 访客需 GitHub 登录后即可发言（giscus.app 生成的配置）
// 采用：giscus client 脚本已在 index.html <head> 静态加载，这里用 innerHTML
// 插入带属性的 <giscus-widget>，让属性在自定义元素升级之前就存在，giscus
// 才能正确读取仓库配置（直接用 createElement+setAttribute 会因元素先升级
// 而读不到属性，iframe 里出现 repo=undefined）。
export default function CommentSection() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = boxRef.current;
    if (!host || host.querySelector('giscus-widget')) return;
    host.innerHTML =
      '<giscus-widget repo="SolYoung-work/personality-hub" ' +
      'repoid="R_kgDOU4dm7A" ' +
      'category="Announcements" ' +
      'categoryid="DIC_kwDOU4dm7M4DG3yp" ' +
      'mapping="pathname" ' +
      'strict="0" ' +
      'reactions-enabled="1" ' +
      'emit-metadata="0" ' +
      'input-position="bottom" ' +
      'theme="preferred_color_scheme" ' +
      'lang="zh-CN" ' +
      'loading="lazy"></giscus-widget>';
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
