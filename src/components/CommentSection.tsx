import Giscus from '@giscus/react';

// giscus 评论区：基于 GitHub Discussions，支持评论 / 回复 / 点赞
// 访客需 GitHub 登录后即可发言（giscus.app 生成的配置，官方 React 组件渲染）
export default function CommentSection() {
  return (
    <section className="mt-12">
      <h2 className="text-base font-semibold">评论区</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        登录 GitHub 后即可留言、回复与点赞
      </p>
      <div className="mt-4">
        <Giscus
          repo="SolYoung-work/personality-hub"
          repoId="R_kgDOU4dm7A"
          category="Announcements"
          categoryId="DIC_kwDOU4dm7M4DG3yp"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme="preferred_color_scheme"
          lang="zh-CN"
          loading="lazy"
        />
      </div>
    </section>
  );
}
