import Color from '@/utils/Color';
import { describe, test, expect } from 'vitest';
import { Color as TColor } from 'three/src/math/Color';

describe('Color', () => {
  const color = new Color(0x000000);

  test('Create', () => {
    expect(color).toBeInstanceOf(TColor);
    expect(new Color(1.0, 1.0, 1.0)).toBeInstanceOf(TColor);
  });

  test('blend', () => {
    expect(color.blend('#ffffff', 0.0).getHexString()).toStrictEqual('#000000');

    color.set(0xffffff);
    expect(color.blend(new Color(0.0), 0.25).getHexString()).toStrictEqual('#bfbfbf');

    color.set(0x8a0707);
    expect(color.blend('#ffffff', 0.25).getHexString()).toStrictEqual('#a74545');

    color.set(0x8a0707);
    expect(color.blend(new Color(0.0), 0.25).getHexString()).toStrictEqual('#680505');

    color.set(0x8a0707);
    expect(color.blend('#000000').getHexString()).toStrictEqual('#450404');

    color.set(0x8a0707);
    expect(color.blend(new Color(0xffffff)).getHexString()).toStrictEqual('#c58383');

    color.set(0xffffff);
    expect(color.blend('#8a0707').getHexString()).toStrictEqual('#c58383');

    color.set(0x000000);
    expect(color.blend(new Color(0x8a0707)).getHexString()).toStrictEqual('#450404');

    color.set(0x8a0707);
    expect(color.blend('#ffffff', 0.75).getHexString()).toStrictEqual('#e2c1c1');

    color.set(0x8a0707);
    expect(color.blend(new Color(0.0), 0.75).getHexString()).toStrictEqual('#230202');

    color.set(0xffffff);
    expect(color.blend('#000000', 0.75).getHexString()).toStrictEqual('#404040');

    color.set(0x000000);
    expect(color.blend(new Color(0x8a0707), 1.0).getHexString()).toStrictEqual('#8a0707');
  });

  test('getHexString', () => {
    color.set(0.0);
    expect(color.getHexString()).toStrictEqual('#000000');
  });

  test('hexToRGB', () => {
    expect(color.hexToRGB('#8a0707')).toStrictEqual({
      r: 138.0, g: 7.0, b: 7.0
    });
  });
});
