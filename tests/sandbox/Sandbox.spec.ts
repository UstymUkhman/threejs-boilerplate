import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial';
import type { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { MeshToonMaterial } from 'three/src/materials/MeshToonMaterial';
import type { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { BoxGeometry } from 'three/src/geometries/BoxGeometry';
import type { Material } from 'three/src/materials/Material';
import { Texture } from 'three/src/textures/Texture';
import { describe, test, expect, vi } from 'vitest';
import type { Scene } from 'three/src/scenes/Scene';
import { Vector2 } from 'three/src/math/Vector2';
import { Mesh } from 'three/src/objects/Mesh';
vi.mock('three/src/renderers/WebGLRenderer');
import { Config } from '@/sandbox/Config';
import Sandbox from '@/sandbox';

interface PublicSandbox {
  resize: (width: number, height: number, ratio: number) => void;
  updateFog: (fog: typeof Config.Fog) => void;
  camera: PerspectiveCamera;
  canvas: HTMLCanvasElement;
  renderer: WebGLRenderer;
  dispose: () => void;
  scene: Scene;
}

describe('Sandbox', () => {
  const sandbox = new Sandbox() as unknown as PublicSandbox;

  test('Defined', () => {
    expect(Sandbox).toBeDefined();
    expect(sandbox).toBeInstanceOf(Sandbox);
  });

  test('resize', () => {
    const ratio = 16.0 / 9.0;
    const rendererSize = new Vector2();
    const size = new Vector2(16.0, 9.0);

    sandbox.resize(size.x, size.y, ratio);
    sandbox.renderer.getSize(rendererSize);

    expect(sandbox.camera.aspect).toBeCloseTo(ratio);
    expect(rendererSize.equals(size)).toStrictEqual(true);
  });

  test('canvas', () => {
    expect(sandbox.canvas.tagName).toStrictEqual('CANVAS');
  });

  test('dispose', () => {
    const box = new Mesh(new BoxGeometry());

    (box.material as Material).dispose();
    (box.material as Material | undefined) = undefined;

    sandbox.scene.add(box);

    const toonMaterial = new MeshToonMaterial();
    const basicMaterial = new MeshBasicMaterial();
    const standardMaterial = new MeshStandardMaterial();

    standardMaterial.displacementMap = new Texture();
    standardMaterial.metalnessMap = new Texture();
    standardMaterial.roughnessMap = new Texture();

    standardMaterial.emissiveMap = new Texture();
    standardMaterial.normalMap = new Texture();
    standardMaterial.alphaMap = new Texture();

    standardMaterial.lightMap = new Texture();
    basicMaterial.specularMap = new Texture();
    toonMaterial.gradientMap = new Texture();

    standardMaterial.bumpMap = new Texture();
    standardMaterial.envMap = new Texture();
    standardMaterial.aoMap = new Texture();
    standardMaterial.map = new Texture();

    sandbox.scene.add(new Mesh(new BoxGeometry(), [
      basicMaterial, toonMaterial, standardMaterial
    ]));

    expect(sandbox.dispose()).toStrictEqual(undefined);
  });

  test('updateFog', () => {
    sandbox.updateFog({ ...Config.Fog, visible: false });
    expect(sandbox.scene.fog).toBeNull();
  });
});
