import { randomInt, random as randomFloat } from '@/utils/Number';

export function fisherYates<T>(a: T[], c = a.length, r = 0): void {
  while (c) {
    r = (randomFloat(0, 1) * c--) | 0;
    [a[c], a[r]] = [a[r], a[c]];
  }
}

export function durstenfeld<T>(a: T[]): void {
  for (let c = a.length; c--; ) {
    const r = Math.floor(randomFloat(0, 1) * (c + 1));
    [a[c], a[r]] = [a[r], a[c]];
  }
}

export function shuffle<T>(a: T[]): T[] {
  return a.sort(() => randomFloat(0, 1) - 0.5);
}

export function random<T>(a: T[]): T {
  return a[randomInt(0, a.length - 1)];
}

export function min (a: number[]) {
  let l = a.length, m = Infinity;
  while (l--) if (a[l] < m) m = a[l];
  return m;
}

export function max (a: number[]) {
  let l = a.length, m = -Infinity;
  while (l--) if (a[l] > m) m = a[l];
  return m;
}
