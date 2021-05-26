import { capitalize, camelCase } from '@/utils/String';

describe('String', () => {
  test('capitalize', () => {
    const name = 'yet another zombie horror';
    const capitalized = 'Yet another zombie horror';
    expect(capitalize(name)).toStrictEqual(capitalized);
  });

  test('camelCase', () => {
    const name = 'YetAnotherZombieHorror';
    const camelCased = 'yetAnotherZombieHorror';
    expect(camelCase(name)).toStrictEqual(camelCased);
  });
});
