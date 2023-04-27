import { Color } from 'three/src/math/Color';
import { describe, test, expect } from 'vitest';
import { blend, getRGB, getHex, getInt, random } from '@/utils/Color';

describe('Color', () => {
  const gray = { r: 0.5, g: 0.5, b: 0.5 };
  const lightGray = new Color(0xbbbbbb).convertLinearToSRGB();

  test('blend', () => {
    expect(blend({ r: 0, g: 0, b: 0 }, gray, 0)).toStrictEqual('#000000');
    expect(blend(gray, { r: 1, g: 1, b: 1 }, 1)).toStrictEqual('#ffffff');

    expect(blend(lightGray, gray, 0)).toStrictEqual('#bbbbbb');
    expect(blend(lightGray, gray, 1)).toStrictEqual('#7f7f7f');

    expect(blend('#ffffff', '#000000')).toStrictEqual('#808080');
    expect(blend(0x000000, 0xffffff)).toStrictEqual('#808080');
  });

  test('getRGB', () => {
    expect(getRGB(Color.NAMES.gray, 255)).toStrictEqual({ r: 128, g: 128, b: 128 });
    expect(getRGB('#bbbbbb', 255)).toStrictEqual({ r: 187, g: 187, b: 187 });
    expect(getRGB(Color.NAMES.white)).toStrictEqual({ r: 1, g: 1, b: 1 });
    expect(getRGB('#000000')).toStrictEqual({ r: 0, g: 0, b: 0 });
  });

  test('getHex', () => {
    expect(getHex(Color.NAMES.white)).toStrictEqual('#ffffff');
    expect(getHex(lightGray)).toStrictEqual('#bbbbbb');
    expect(getHex(gray)).toStrictEqual('#7f7f7f');
  });

  test('getInt', () => {
    expect(getInt('#ffffff')).toStrictEqual(Color.NAMES.white);
    expect(getInt(lightGray)).toStrictEqual(0xbbbbbb);
    expect(getInt(gray)).toStrictEqual(0x7f7f7f);
  });

  test('random', () => {
    const color = random();
    expect(color).toBeLessThan(0xffffff);
    expect(color).toBeGreaterThanOrEqual(0);
  });
});
