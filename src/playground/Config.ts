import { Vector3 } from 'three/src/math/Vector3';
import { Color } from '@/utils/Color';

export namespace Config
{
  export const Background = Color.FOG;

  export const Fog = {
    color: Color.FOG,
    visible: true,
    near: 100.0,
    far: 250.0
  };

  export const Camera = {
    fov: 50.0,
    near: 0.1,
    far: 500.0,
    position: new Vector3(0.0, 25.0, -50.0)
  };
}
