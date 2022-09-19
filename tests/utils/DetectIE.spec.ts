import '@/utils/DetectIE';
import { describe, test, expect } from 'vitest';

describe('DetectIE', () => {
  test('className', () => {
    expect(document.documentElement.className).toStrictEqual('');
  });
});
