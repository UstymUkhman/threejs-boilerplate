import { Color as TColor } from 'three/src/math/Color';
import { Color } from '@/utils/Color';

describe('Color', () => {
  const rgb: Color.RGB = { r: 138, g: 7, b: 7 };
  const hexString: string = '#8A0707';
  const hexNumber: number = 0x8A0707;

  test('blend', () => {
    const BLACK = '#000000';
    const WHITE = '#FFFFFF';

    expect(Color.blend(hexString, WHITE, 0)).toStrictEqual(hexString);
    expect(Color.blend(WHITE, BLACK, 0.25)).toStrictEqual('#BFBFBF');
    expect(Color.blend(hexString, WHITE, 0.25)).toStrictEqual('#A74545');
    expect(Color.blend(hexString, BLACK, 0.25)).toStrictEqual('#680505');

    expect(Color.blend(hexString, BLACK)).toStrictEqual('#450404');
    expect(Color.blend(hexString, WHITE)).toStrictEqual('#C58383');
    expect(Color.blend(WHITE, hexString)).toStrictEqual('#C58383');
    expect(Color.blend(BLACK, hexString)).toStrictEqual('#450404');

    expect(Color.blend(hexString, WHITE, 0.75)).toStrictEqual('#E2C1C1');
    expect(Color.blend(hexString, BLACK, 0.75)).toStrictEqual('#230202');
    expect(Color.blend(WHITE, BLACK, 0.75)).toStrictEqual('#404040');
    expect(Color.blend(hexString, BLACK, 1)).toStrictEqual(BLACK);
  });

  test('getClass', () => {
    const red = new TColor(hexNumber);
    expect(Color.getClass(hexNumber)).toStrictEqual(red);
    expect(Color.getClass(hexString)).toStrictEqual(red);

    expect(Color.getClass(hexNumber)).toBeInstanceOf(TColor);
    expect(Color.getClass(hexString)).toBeInstanceOf(TColor);
  });

  test('rgbToHEX', () => {
    expect(Color.rgbToHEX(rgb)).toStrictEqual(hexString);
  });

  test('hexToRGB', () => {
    expect(Color.hexToRGB(hexString)).toStrictEqual(rgb);
  });
});
