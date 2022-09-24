import type { DirectionalLightHelper } from 'three/src/helpers/DirectionalLightHelper';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import type { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import type { DirectionalLight } from 'three/src/lights/DirectionalLight';
import type { PublicGroundMaterial } from './GroundMaterial.spec';
import type { AmbientLight } from 'three/src/lights/AmbientLight';
import type GroundMaterial from '@/playground/GroundMaterial';

import { describe, test, expect, vi } from 'vitest';
import type { Scene } from 'three/src/scenes/Scene';
import type { Mesh } from 'three/src/objects/Mesh';
import { Vector3 } from 'three/src/math/Vector3';
import { Config } from '@/playground/Config';
import { Fog } from 'three/src/scenes/Fog';
import { Vector } from '@/utils/Vector';
import Playground from '@/playground';
import { Color } from '@/utils/Color';

vi.mock('three/src/renderers/WebGLRenderer');

interface PublicPlayground {
  updateDirectional: (directional: typeof Config.Lights.directional) => void;
  updateCameraPosition: (position: Vector3, target: Vector3) => void;
  updateAmbient: (ambient: typeof Config.Lights.ambient) => void;
  updateCamera: (ambient: typeof Config.Camera) => void;
  updateGround: (ground: typeof Config.Ground) => void;
  updateFog: (ground: typeof Config.Fog) => void;

  get domElement (): HTMLCanvasElement;
  set controls (enabled: boolean);
  set pause (paused: boolean);
  destroy: () => void;

  helper: DirectionalLightHelper;
  directional: DirectionalLight;
  orbitControls: OrbitControls;
  camera: PerspectiveCamera;
  ambient: AmbientLight;
  ground: Mesh;
  scene: Scene;
}

describe('Playground', () => {
  const playground = new Playground() as unknown as PublicPlayground;

  test('Create', () => {
    expect(Playground).toBeDefined();
    expect(playground).toBeInstanceOf(Playground);
  });

  test('resize', () => {
    const playgroundPrototype = Object.getPrototypeOf(playground);
    const resize = vi.fn(playgroundPrototype.resize.bind(playground));

    resize();
    expect(resize).toHaveReturnedWith(undefined);
  });

  test('destroy', () => {
    const destroy = vi.fn(playground.destroy.bind(playground));
    destroy();
    expect(destroy).toHaveReturnedWith(undefined);
  });

  test('domElement', () => {
    expect(playground.domElement.tagName).toStrictEqual('CANVAS');
  });

  test('controls', () => {
    playground.controls = false;
    expect(playground.orbitControls.enabled).toStrictEqual(false);

    playground.controls = true;
    expect(playground.orbitControls.enabled).toStrictEqual(true);
  });

  test('pause', () => {
    playground.pause = true;
    expect(playground.orbitControls.enabled).toStrictEqual(false);

    playground.pause = false;
    expect(playground.orbitControls.enabled).toStrictEqual(true);
  });

  test('updateAmbient', () => {
    playground.updateAmbient(Config.Lights.ambient);

    expect(playground.ambient.intensity).toStrictEqual(
      Config.Lights.ambient.intensity
    );

    expect(playground.ambient.color.equals(
      Color.getClass(Config.Lights.ambient.color)
    )).toStrictEqual(true);
  });

  test('updateDirectional', () => {
    const directional = Config.Lights.directional;

    expect(playground.helper.visible).toStrictEqual(directional.helper.visible);
    expect(playground.directional.intensity).toStrictEqual(directional.intensity);

    expect(playground.directional.shadow.camera.bottom).toStrictEqual(
      directional.shadow.camera.bottom
    );

    expect(playground.directional.shadow.camera.right).toStrictEqual(
      directional.shadow.camera.right
    );

    expect(playground.directional.shadow.camera.left).toStrictEqual(
      directional.shadow.camera.left
    );

    expect(playground.directional.shadow.camera.top).toStrictEqual(
      directional.shadow.camera.top
    );

    expect(playground.directional.shadow.camera.near).toStrictEqual(
      directional.shadow.camera.near
    );

    expect(playground.directional.shadow.camera.far).toStrictEqual(
      directional.shadow.camera.far
    );

    expect(playground.directional.castShadow).toStrictEqual(
      directional.shadow.cast
    );

    expect(playground.directional.shadow.mapSize.equals(
      directional.shadow.mapSize
    )).toStrictEqual(true);

    expect(playground.directional.position.equals(
      directional.position
    )).toStrictEqual(true);

    expect(playground.directional.rotation.equals(
      directional.rotation
    )).toStrictEqual(true);

    expect(playground.directional.color.equals(
      Color.getClass(directional.color)
    )).toStrictEqual(true);
  });

  test('updateFog', () => {
    const fog = playground.scene.fog as Fog;
    playground.updateFog(Config.Fog);

    expect(fog).toBeInstanceOf(Fog);
    expect(fog.near).toStrictEqual(Config.Fog.near);
    expect(fog.far).toStrictEqual(Config.Fog.far);

    expect(fog.color.equals(
      Color.getClass(Config.Fog.color)
    )).toStrictEqual(true);

    playground.updateFog({ ...Config.Fog, visible: false });
    expect(playground.scene.fog).toStrictEqual(null);
  });

  test('updateCamera', () => {
    playground.updateCamera(Config.Camera);

    expect(playground.camera.fov).toStrictEqual(Config.Camera.fov);
    expect(playground.camera.near).toStrictEqual(Config.Camera.near);
    expect(playground.camera.far).toStrictEqual(Config.Camera.far);
  });

  test('updateCameraPosition', () => {
    const target = Vector.random();
    const position = Vector.random();

    playground.updateCameraPosition(position, target);

    expect(playground.orbitControls.target.equals(target)).toStrictEqual(true);
    expect(playground.camera.position.equals(position)).toStrictEqual(true);
  });

  test('updateGround', () => {
    playground.updateGround(Config.Ground);
    const groundScale = new Vector3(1.0, 1.0, 1.0);

    expect(playground.ground.scale.equals(groundScale)).toStrictEqual(true);

    expect((playground.ground.material as unknown as GroundMaterial).color.equals(
      Color.getClass(Config.Ground.color))
    ).toStrictEqual(true);

    expect(
      (playground.ground.material as unknown as PublicGroundMaterial).cellSize.value
    ).toStrictEqual(Config.Ground.cell);
  });
});
