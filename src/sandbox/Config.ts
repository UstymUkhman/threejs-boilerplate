import {
  type ToneMapping,
  type SRGBColorSpace,
  LinearSRGBColorSpace,
  ACESFilmicToneMapping
} from 'three/src/constants';

import { Color } from 'three/src/math/Color';
import { Euler } from 'three/src/math/Euler';
import { Vector3 } from 'three/src/math/Vector3';
import { Vector2 } from 'three/src/math/Vector2';

type OutputColorSpace =
  typeof SRGBColorSpace |
  typeof LinearSRGBColorSpace;

export namespace Config
{
  export const Scene = {
    outputColorSpace: LinearSRGBColorSpace as OutputColorSpace,
    toneMapping: ACESFilmicToneMapping as ToneMapping,
    background: Color.NAMES.whitesmoke,
    toneMappingExposure: 1.5
  };

  export const Camera = {
    position: new Vector3(0.0, 25.0, 50.0),
    target: new Vector3(0.0, 0.0, -25.0),
    fov: 50.0,
    near: 0.1,
    far: 500.0
  };

  export const Lights = {
    ambient: {
      color: Color.NAMES.white,
      intensity: 0.25
    },

    directional: {
      position: new Vector3(-15.0, 25.0, 50.0),
      rotation: new Euler(0.785, 0.0, 0.25),
      color: Color.NAMES.white,
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
      },

      helper: {
        color: Color.NAMES.white,
        visible: DEBUG,
        size: 10.0
      }
    }
  };

  export const Ground = {
    color: Color.NAMES.white,
    size: 500.0,
    cell: 26.0
  };

  export const Fog = {
    color: Color.NAMES.whitesmoke,
    visible: true,
    near: 100.0,
    far: 250.0
  };
}
