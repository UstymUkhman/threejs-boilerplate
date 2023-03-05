import type { ColorRepresentation } from 'three/src/utils';
import type { ColorSpace } from 'three/src/constants';
import { Color } from 'three/src/math/Color';

export default class extends Color
{
  public constructor(r?: ColorRepresentation, g?: number, b?: number) {
    r && g && b ? super(r as number, g, b) : super(r);
  }

  public blend (target: Color | string, p = 0.5, colorSpace?: ColorSpace): Color {
    const cColor = this.getRGB(this.multiplyScalar(255));

    const tColor = target instanceof Color
      ? target.getRGB(target.multiplyScalar(255))
      : this.hexToRGB(target);

    return this.setStyle(
      `#${(0x100000000 +
        (Math.round(((tColor.r - cColor.r) * p) + cColor.r) * 0x10000) +
        (Math.round(((tColor.g - cColor.g) * p) + cColor.g) * 0x100) +
        Math.round(((tColor.b - cColor.b) * p) + cColor.b)
      ).toString(16).slice(3)}`, colorSpace
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
