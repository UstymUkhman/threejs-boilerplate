import { version } from '../package.json';
import { describe, test, expect } from 'vitest';

describe('Constants', () => {
  test('VERSION', () => {
    expect(VERSION).toStrictEqual(version);
  });

  test('DEBUG', () => {
    expect(DEBUG).toStrictEqual(false);
  });
});
