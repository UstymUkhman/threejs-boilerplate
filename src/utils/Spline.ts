import { lerp as defaultLerp } from '@/utils/Number';

export default class Spline
{
  private length = 0;
  private readonly points: [number, number][] = [];
  public constructor (private readonly lerp = defaultLerp) {}

  public addPoint (time: number, value: number): void {
    this.length = this.points.push([time, value]);
  }

  public getValue (delta: number): number {
    let p1 = 0;

    for (let p = 0; p < this.length; p++) {
      if (this.points[p][0] >= delta) break;
      p1 = p;
    }

    const p2 = Math.min(this.length - 1, p1 + 1);

    return p1 === p2 ? this.points[p1][1] : this.lerp(
      this.points[p1][1], this.points[p2][1],

      (delta - this.points[p1][0]) / (
        this.points[p2][0] - this.points[p1][0]
      )
    );
  }

  public dispose (): void {
    this.length = this.points.length = 0.0;
  }
}
