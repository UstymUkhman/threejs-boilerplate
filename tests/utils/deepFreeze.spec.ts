import deepFreeze from '@/utils/deepFreeze';

describe('deepFreeze', () => {
  test('Create', () => {
    const frozen = deepFreeze({
      propriety: 'value',

      nested: {
        array: [0],
        propriety: 'value',
        deep: { propriety: 'value' }
      }
    }) as any;

    expect(Object.isFrozen(deepFreeze({}))).toStrictEqual(true);
    expect(() => { frozen.nested.array[0] = 1; }).toThrow(TypeError);
    expect(() => { frozen.nested.propriety = ''; }).toThrow(TypeError);
    expect(() => { frozen.nested.deep.propriety = ''; }).toThrow(TypeError);
  });
});
