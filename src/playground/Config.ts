import { Vector2 } from 'three/src/math/Vector2';
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
    position: new Vector3(0.0, 25.0, -50.0),
    target: new Vector3(0.0, 0.0, 25.0),
    fov: 50.0,
    near: 0.1,
    far: 500.0
  };

  export const Lights = {
    ambient: {
      color: Color.WHITE,
      intensity: 0.25
    },

    directional: {
      position: new Vector3(-5.0, 10.0, 15.0),
      color: Color.WHITE,
      intensity: 1.0,

      shadow: {
        mapSize: new Vector2(1024.0, 1024.0),
        cast: true,

        camera: {
          bottom: -25.0,
          right: 25.0,
          left: -25.0,
          near: 1.0,
          far: 50.0,
          top: 15.0
        }
      }
    }
  };

  export const Ground = {
    color: Color.WHITE,
    size: 500.0,
    cell: 26.0
  };
}
