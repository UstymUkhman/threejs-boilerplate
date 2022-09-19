import { random, min, max } from '@/utils/Array';
import { describe, test, expect } from 'vitest';
import { randomInt } from '@/utils/Number';

describe('Array', () => {
  test('random', () => {
    const randomNumber = () => Math.random() * 1e3 | 0;
    const randomString = () => String.fromCharCode(randomInt(65, 90));

    const numberArray = Array.from({ length: 25 }).map(randomNumber);
    const stringArray = Array.from({ length: 25 }).map(randomString);

    const mixedArray = Array.from({ length: 25 }).map(() =>
      Math.random() < 0.5 ? randomNumber() : randomString()
    );

    expect(numberArray.includes(random(numberArray))).toStrictEqual(true);
    expect(stringArray.includes(random(stringArray))).toStrictEqual(true);
    expect(mixedArray.includes(random(mixedArray))).toStrictEqual(true);
  });

  test('min', () => {
    expect(min([-Infinity, -25, 0, 12, 100])).toStrictEqual(-Infinity);
    expect(min([Infinity, -12, -100, 0, 25])).toStrictEqual(-100);
    expect(min([50, 100, 42, 8, 75, 15, 12])).toStrictEqual(8);
  });

  test('max', () => {
    expect(max([Infinity, -12, -100, 0, 25])).toStrictEqual(Infinity);
    expect(max([65536, 42, 8, 75, 15, 4096])).toStrictEqual(65536);
    expect(max([-Infinity, -999, -12, -100])).toStrictEqual(-12);
  });
});
