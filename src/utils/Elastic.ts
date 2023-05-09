import { Vector2 as TVector2 } from 'three/src/math/Vector2';
import { Vector3 as TVector3 } from 'three/src/math/Vector3';
import { DELTA_FRAME } from '@/utils/Number';

export namespace Elastic
{
  export class Number
  {
    private current: number;
    private target: number;
    public speed = 10.0;

    public constructor (value: number) {
      this.target = this.current = value;
    }

    public update (delta: number = DELTA_FRAME): void {
      const dist = this.target - this.current;
      this.current += dist * (this.speed * delta);
    }

    public set (target: number): void {
      this.target = target;
    }

    public get value (): number {
      return this.current;
    }
  }

  export class Vector2
  {
    private readonly current = new TVector2();
    private readonly target = new TVector2();
    public speed = 10;

    public constructor (value: TVector2) {
      this.current.copy(value);
      this.target.copy(value);
    }

    public set (x: number, y: number): void {
      this.target.set(x, y);
    }

    public copy (target: TVector2): void {
      this.target.copy(target);
    }

    public update (delta: number = DELTA_FRAME): void {
      const x = this.target.x - this.current.x;
      const y = this.target.y - this.current.y;

      this.current.x += x * (this.speed * delta);
      this.current.y += y * (this.speed * delta);
    }

    public get value (): TVector2 {
      return this.current;
    }

    public get x (): number {
      return this.current.x;
    }

    public get y (): number {
      return this.current.y;
    }
  }

  export class Vector3
  {
    private readonly current = new TVector3();
    private readonly target = new TVector3();
    public speed = 10;

    public constructor (value: TVector3) {
      this.current.copy(value);
      this.target.copy(value);
    }

    public set (x: number, y: number, z: number): void {
      this.target.set(x, y, z);
    }

    public copy (target: TVector3): void {
      this.target.copy(target);
    }

    public update (delta: number = DELTA_FRAME): void {
      const x = this.target.x - this.current.x;
      const y = this.target.y - this.current.y;
      const z = this.target.z - this.current.z;

      this.current.x += x * (this.speed * delta);
      this.current.y += y * (this.speed * delta);
      this.current.z += z * (this.speed * delta);
    }

    public get value (): TVector3 {
      return this.current;
    }

    public get x (): number {
      return this.current.x;
    }

    public get y (): number {
      return this.current.y;
    }

    public get z (): number {
      return this.current.z;
    }
  }
}
