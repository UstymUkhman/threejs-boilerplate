import { Vector3 } from 'three/src/math/Vector3';

export namespace Vector {
  export const UP       = new Vector3( 0,  1,  0);
  export const DOWN     = new Vector3( 0, -1,  0);

  export const RIGHT    = new Vector3( 1,  0,  0);
  export const LEFT     = new Vector3(-1,  0,  0);

  export const FORWARD  = new Vector3( 0,  0,  1);
  export const BACKWARD = new Vector3( 0,  0, -1);

  export const near = (p: Vector3, c: Vector3, r = 1): boolean =>
    Math.pow(p.x - c.x, 2) + Math.pow(p.z - c.z, 2) < Math.pow(r, 2);

  export const random = (): Vector3 => new Vector3(
    Math.random() * 2.0 - 1.0,
    Math.random() * 2.0 - 1.0,
    Math.random() * 2.0 - 1.0
  );
}
