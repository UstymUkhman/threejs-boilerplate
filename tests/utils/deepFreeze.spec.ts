import deepFreeze from '@/utils/deepFreeze';
import { describe, test, expect } from 'vitest';

describe('deepFreeze', () => {
  test('Create', () => {
    const frozen = deepFreeze({
      propriety: 'value',

      nested: {
        array: [0],
        propriety: 'value',
        deep: { propriety: 'value' }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;

    expect(Object.isFrozen(deepFreeze({}))).toStrictEqual(true);
    expect(() => { frozen.nested.array[0] = 1; }).toThrow(TypeError);
    expect(() => { frozen.nested.propriety = ''; }).toThrow(TypeError);
    expect(() => { frozen.nested.deep.propriety = ''; }).toThrow(TypeError);
  });
});
