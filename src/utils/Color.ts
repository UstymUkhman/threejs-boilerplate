import { Color as TColor } from 'three/src/math/Color';

export namespace Color
{
  export type RGB = { r: number, g: number, b: number };

  export const BLACK = 0x000000;
  export const DARK  = 0x222222;
  export const LIGHT = 0xBBBBBB;
  export const WHITE = 0xFFFFFF;

  export const blend = (initial: string, target: string, p = 0.5): string => {
    const iColor: RGB = hexToRGB(initial);
    const tColor: RGB = hexToRGB(target);

    return `#${(0x100000000 +
      (Math.round(((tColor.r - iColor.r) * p) + iColor.r) * 0x10000) +
      (Math.round(((tColor.g - iColor.g) * p) + iColor.g) * 0x100) +
      Math.round(((tColor.b - iColor.b) * p) + iColor.b)
    ).toString(16).slice(3)}`.toUpperCase();
  };

  export const getClass = (color: number | string): TColor => {
    return new TColor(color);
  };

  export const rgbToHEX = (rgb: RGB): string => {
    return `#${(
      (1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b
    ).toString(16).slice(1)}`.toUpperCase();
  };

  export const hexToRGB = (hex: string): RGB => {
    const color = parseInt(hex.slice(1), 16);

    return {
      r: (color >> 16) & 255,
      g: (color >> 8) & 255,
      b: color & 255
    };
  };
}
