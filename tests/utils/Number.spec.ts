import { smoothstep, mix, map, randomInt, clamp, random, lerp, PI } from '@/utils/Number';

describe('Number', () => {
  test('smoothstep', () => {
    expect(smoothstep(0, 1, 0)).toStrictEqual(0);
    expect(smoothstep(0, 1, 0.5)).toStrictEqual(0.5);
    expect(smoothstep(0, 1, 2)).toStrictEqual(1);
  });

  test('mix', () => {
    expect(mix(1, 2, 1)).toStrictEqual(2);
    expect(mix(1, 2, 0.5)).toStrictEqual(1.5);
    expect(mix(1, 2, 2)).toStrictEqual(3);
  });

  test('map', () => {
    expect(map(0, 1, 2)).toStrictEqual(1);
    expect(map(1.5, 1, 2)).toStrictEqual(1);
    expect(map(3, 1, 2)).toStrictEqual(2);
  });

  test('randomInt', () => {
    const int = randomInt(50, 100);
    expect(int).toBeLessThanOrEqual(100);
    expect(int).toBeGreaterThanOrEqual(50);
    expect(randomInt(1, 1)).toStrictEqual(1);
  });

  test('clamp', () => {
    expect(clamp(0.5)).toStrictEqual(0.5);
    expect(clamp(0, 1, 2)).toStrictEqual(1);
    expect(clamp(3, 1, 2)).toStrictEqual(2);
  });

  test('random', () => {
    const rand = random(1, 2);
    expect(rand).toBeLessThan(2);
    expect(rand).toBeGreaterThan(1);
    expect(random(0, 0.5)).toBeLessThan(0.5);
  });

  test('lerp', () => {
    expect(lerp(1, 2, 0)).toStrictEqual(1);
    expect(lerp(1, 2, 0.5)).toStrictEqual(1.5);
    expect(lerp(1, 2, 1)).toStrictEqual(2);
  });

  test('PI', () => {
    expect(PI.m2).toStrictEqual(Math.PI * 2);
    expect(PI.d2).toStrictEqual(Math.PI / 2);
    expect(Object.isFrozen(PI)).toStrictEqual(true);
  });
});
