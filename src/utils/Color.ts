import type { ColorRepresentation } from 'three/src/utils';
import type { ColorSpace } from 'three/src/constants';
import { Color } from 'three/src/math/Color';

export default class extends Color
{
  public constructor(r?: ColorRepresentation, g?: number, b?: number) {
    r && g && b ? super(r as number, g, b) : super(r);
  }

  public blend (target: typeof this | string, p = 0.5, colorSpace?: ColorSpace): Color {
    const tColor = typeof target === 'string'
      ? this.hexToRGB(target) : {
        r: target.r,
        g: target.g,
        b: target.b
      };

    return this.setStyle(
      `#${(0x100000000 +
        (Math.round(((tColor.r - this.r) * p) + this.r) * 0x10000) +
        (Math.round(((tColor.g - this.g) * p) + this.g) * 0x100) +
        Math.round(((tColor.b - this.b) * p) + this.b)
      ).toString(16).slice(3)}`.toUpperCase(),
      colorSpace
    );
  }

  public override getHexString (colorSpace?: ColorSpace): string {
    return `#${super.getHexString(colorSpace)}`;
  }

  public hexToRGB (hex: string) {
    const color = parseInt(hex.slice(1), 16);

    return {
      r: (color >> 16) & 255,
      g: (color >> 8) & 255,
      b: color & 255
    };
  }
}
