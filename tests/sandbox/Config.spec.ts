import { Vector2 } from 'three/src/math/Vector2';
import { Vector3 } from 'three/src/math/Vector3';
import { describe, test, expect } from 'vitest';
import { Euler } from 'three/src/math/Euler';
import { Config } from '@/sandbox/Config';

describe('Config', () => {
  test('Scene', () => {
    expect(Config.Scene.background).toBeTypeOf('number');
    expect(Config.Scene.toneMapping).toBeTypeOf('number');
    expect(Config.Scene.outputColorSpace).toBeTypeOf('string');
    expect(Config.Scene.toneMappingExposure).toBeTypeOf('number');
  });

  test('Camera', () => {
    expect(Config.Camera.position).toBeInstanceOf(Vector3);
    expect(Config.Camera.target).toBeInstanceOf(Vector3);
    expect(Config.Camera.fov).toBeTypeOf('number');
    expect(Config.Camera.near).toBeTypeOf('number');
    expect(Config.Camera.far).toBeTypeOf('number');
  });

  test('Lights', () => {
    expect(Config.Lights.ambient.color).toBeTypeOf('number');
    expect(Config.Lights.ambient.intensity).toBeTypeOf('number');

    expect(Config.Lights.directional.position).toBeInstanceOf(Vector3);
    expect(Config.Lights.directional.rotation).toBeInstanceOf(Euler);
    expect(Config.Lights.directional.color).toBeTypeOf('number');
    expect(Config.Lights.directional.intensity).toBeTypeOf('number');

    expect(Config.Lights.directional.shadow.mapSize).toBeInstanceOf(Vector2);
    expect(Config.Lights.directional.shadow.cast).toBeTypeOf('boolean');

    expect(Config.Lights.directional.shadow.camera.bottom).toBeTypeOf('number');
    expect(Config.Lights.directional.shadow.camera.right).toBeTypeOf('number');
    expect(Config.Lights.directional.shadow.camera.left).toBeTypeOf('number');
    expect(Config.Lights.directional.shadow.camera.near).toBeTypeOf('number');
    expect(Config.Lights.directional.shadow.camera.far).toBeTypeOf('number');
    expect(Config.Lights.directional.shadow.camera.top).toBeTypeOf('number');

    expect(Config.Lights.directional.helper.color).toBeTypeOf('number');
    expect(Config.Lights.directional.helper.visible).toBeTypeOf('boolean');
    expect(Config.Lights.directional.helper.size).toBeTypeOf('number');
  });

  test('Ground', () => {
    expect(Config.Ground.color).toBeTypeOf('number');
    expect(Config.Ground.size).toBeTypeOf('number');
    expect(Config.Ground.cell).toBeTypeOf('number');
  });

  test('Fog', () => {
    expect(Config.Fog.color).toBeTypeOf('number');
    expect(Config.Fog.visible).toBeTypeOf('boolean');
    expect(Config.Fog.near).toBeTypeOf('number');
    expect(Config.Fog.far).toBeTypeOf('number');
  });
});
