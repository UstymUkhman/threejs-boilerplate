import {
  fisherYates,
  durstenfeld,
  shuffle,
  random,
  min,
  max
} from '@/utils/Array';

import { randomInt } from '@/utils/Number';
import { describe, test, expect } from 'vitest';

describe('Array', () => {
  const randomNumber = () => Math.random() * 1e3 | 0;
  const randomString = () => String.fromCharCode(randomInt(65, 90));

  const numberArray = () => Array.from({ length: 25 }).map(randomNumber);
  const stringArray = () => Array.from({ length: 25 }).map(randomString);

  const mixedArray = () => Array.from({ length: 25 }).map(() =>
    Math.random() < 0.5 ? randomNumber() : randomString()
  );

  test('fisherYates', () => {
    const numbers = numberArray();
    const strings = stringArray();
    const mixes = mixedArray();

    const numbersLength = numbers.length;
    const stringsLength = strings.length;
    const mixesLength = mixes.length;

    fisherYates(numbers);
    fisherYates(strings);
    fisherYates(mixes);

    expect(numbers.length).toStrictEqual(numbersLength);
    expect(strings.length).toStrictEqual(stringsLength);
    expect(mixes.length).toStrictEqual(mixesLength);
  });

  test('durstenfeld', () => {
    const numbers = numberArray();
    const strings = stringArray();
    const mixes = mixedArray();

    const numbersLength = numbers.length;
    const stringsLength = strings.length;
    const mixesLength = mixes.length;

    durstenfeld(numbers);
    durstenfeld(strings);
    durstenfeld(mixes);

    expect(numbers.length).toStrictEqual(numbersLength);
    expect(strings.length).toStrictEqual(stringsLength);
    expect(mixes.length).toStrictEqual(mixesLength);
  });

  test('shuffle', () => {
    const numbers = numberArray();
    const strings = stringArray();
    const mixes = mixedArray();

    const numbersLength = numbers.length;
    const stringsLength = strings.length;
    const mixesLength = mixes.length;

    shuffle(numbers);
    shuffle(strings);
    shuffle(mixes);

    expect(numbers.length).toStrictEqual(numbersLength);
    expect(strings.length).toStrictEqual(stringsLength);
    expect(mixes.length).toStrictEqual(mixesLength);
  });

  test('random', () => {
    const numbers = numberArray();
    const strings = stringArray();
    const mixes = mixedArray();

    expect(numbers.includes(random(numbers))).toStrictEqual(true);
    expect(strings.includes(random(strings))).toStrictEqual(true);
    expect(mixes.includes(random(mixes))).toStrictEqual(true);
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
