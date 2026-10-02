// 测试注册表：汇总全部 13 套测试
// EXPORTS: ALL_TESTS, getTest
import type { ITestDef } from '@/data/types';
import { BIGFIVE_TEST, PF16_TEST, HEXACO_TEST, EPQ_TEST, ATTACHMENT_TEST, EQ_TEST } from './tests/academic';
import { MBTI_TEST, ENNEAGRAM_TEST, DISC_TEST, KEIRSEY_TEST, GALLUP_TEST } from './tests/popular';
import { COLOR_TEST, ANIMAL_TEST } from './tests/fun';

export const ALL_TESTS: ITestDef[] = [
  BIGFIVE_TEST,
  PF16_TEST,
  HEXACO_TEST,
  EPQ_TEST,
  ATTACHMENT_TEST,
  EQ_TEST,
  MBTI_TEST,
  ENNEAGRAM_TEST,
  DISC_TEST,
  KEIRSEY_TEST,
  GALLUP_TEST,
  COLOR_TEST,
  ANIMAL_TEST,
];

export function getTest(id: string): ITestDef | undefined {
  return ALL_TESTS.find((t) => t.id === id);
}
