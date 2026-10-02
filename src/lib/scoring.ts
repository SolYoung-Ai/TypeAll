// 通用计分工具
// EXPORTS: sumW, pctOf, levelOf, buildDimensionPoints
import type { IOption, IDimensionPoint } from '@/data/types';

export function sumW(answers: IOption[], key: string): number {
  return answers.reduce((s, a) => s + (a.w?.[key] ?? 0), 0);
}

export function pctOf(raw: number, min: number, max: number): number {
  const span = max - min;
  if (span <= 0) return 50;
  return Math.round(((raw - min) / span) * 100);
}

export function levelOf(pct: number): 'low' | 'mid' | 'high' {
  if (pct < 40) return 'low';
  if (pct > 60) return 'high';
  return 'mid';
}

export interface DimCalc {
  key: string;
  label: string;
  raw: number;
  min: number;
  max: number;
}

export function buildDimensionPoints(calcs: DimCalc[]): IDimensionPoint[] {
  return calcs.map((c) => {
    const percent = pctOf(c.raw, c.min, c.max);
    return { key: c.key, label: c.label, raw: c.raw, percent, level: levelOf(percent) };
  });
}
