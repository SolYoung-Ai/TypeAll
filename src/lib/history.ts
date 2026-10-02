// 测试历史记录（localStorage，带项目命名空间，数据仅保存在本机浏览器）
// EXPORTS: IAttempt, saveAttempt, loadAttempts, clearAttempts
import type { TestResult } from '@/data/types';

const NS = 'personality-hub';

export interface IAttempt {
  id: string;
  testId: string;
  testName: string;
  result: TestResult;
  at: number;
}

function safeGet<T>(k: string, fb: T): T {
  try {
    const v = localStorage.getItem(`${NS}:${k}`);
    return v ? (JSON.parse(v) as T) : fb;
  } catch {
    return fb;
  }
}

function safeSet(k: string, v: unknown): void {
  try {
    localStorage.setItem(`${NS}:${k}`, JSON.stringify(v));
  } catch {
    /* 隐私模式静默降级 */
  }
}

export function loadAttempts(): IAttempt[] {
  return safeGet<IAttempt[]>('attempts', []);
}

export function saveAttempt(attempt: IAttempt): IAttempt[] {
  const all = loadAttempts();
  const next = [attempt, ...all].slice(0, 50);
  safeSet('attempts', next);
  return next;
}

export function clearAttempts(): void {
  safeSet('attempts', []);
}
