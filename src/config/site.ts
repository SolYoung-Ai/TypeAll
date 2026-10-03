// 站点集中配置（改品牌信息只动这里）
// EXPORTS: SITE, BASE

const BASE = (import.meta.env.MIAODA_CLIENT_BASE_PATH || '').replace(/\/$/, '') + '/';

export const SITE = {
  name: '快测',
  shortName: '快测',
  tagline: '聚合全网主流性格测试的一站式平台',
  logoImg: `${BASE}logo.png`,
  ownerImg: `${BASE}solyoung.jpg`,
  ownerName: 'Solyoung',
  ownerTitle: '站点作者',
  ownerBio: '记录我的创作、实践，以及正在发生的可能。',
  personalSite: 'https://solyoung.top/',
  douyinImg: `${BASE}douyin.png`,
  xiaohongshuImg: `${BASE}xiaohongshu.png`,
  footerNote: '性格测试集合站 · 作者 Solyoung',
  copyright: '© 2026 快测 · 保留所有权利',
  disclaimer:
    '本网站所有测评仅供娱乐与自我参考，不能替代心理咨询师、精神科医生的专业评估，请勿将结果作为婚恋、招聘、升学等重大决策的唯一依据。',
  categoryMeta: {
    academic: { label: '学术专业量表', color: 'text-blue-600 bg-blue-50', star: 5, desc: '具备心理学实证基础，适合深度自我觉察' },
    popular: { label: '流行人格测评', color: 'text-amber-600 bg-amber-50', star: 3, desc: '网络热门，仅供个人参考，学术存在争议' },
    fun: { label: '趣味娱乐测试', color: 'text-gray-600 bg-gray-100', star: 1, desc: '休闲玩乐，无严谨心理学效度，请勿当真' },
  } as const,
};

export const BASE_PATH = BASE;
