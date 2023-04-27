import type { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import type { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { describe, test, expect, vi } from 'vitest';
import type { Scene } from 'three/src/scenes/Scene';
import { Vector2 } from 'three/src/math/Vector2';
vi.mock('three/src/renderers/WebGLRenderer');
import { Config } from '@/sandbox/Config';
import Sandbox from '@/sandbox';

interface PublicSandbox {
  resize: (width: number, height: number, ratio: number) => void;
  updateFog: (fog: typeof Config.Fog) => void;
  domElement: HTMLCanvasElement;
  camera: PerspectiveCamera;
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

  test('domElement', () => {
    expect(sandbox.domElement.tagName).toStrictEqual('CANVAS');
  });

  test('dispose', () => {
    expect(sandbox.dispose()).toStrictEqual(undefined);
  });

  test('updateFog', () => {
    sandbox.updateFog({ ...Config.Fog, visible: false });
    expect(sandbox.scene.fog).toBeNull();
  });
});
