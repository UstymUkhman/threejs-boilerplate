import { describe, test, expect } from 'vitest';
import { capitalize, camelCase } from '@/utils/String';

describe('String', () => {
  test('capitalize', () => {
    const name = 'three.js boilerplate';
    const capitalized = 'Three.js boilerplate';
    expect(capitalize(name)).toStrictEqual(capitalized);
  });

  test('camelCase', () => {
    const name = 'Three JS Boilerplate';
    const camelCased = 'threeJsBoilerplate';
    expect(camelCase(name)).toStrictEqual(camelCased);
  });
});
