import type { Vector3 } from 'three/src/math/Vector3';
import { describe, test, expect, vi } from 'vitest';
import GUIControls from '@/playground/GUIControls';

import { Vector } from '@/utils/Vector';
import Playground from '@/playground';

vi.mock('three/src/renderers/WebGLRenderer');

interface PublicGUIControls {
  readonly cameraPosition: Vector3;
  readonly cameraTarget: Vector3;
  update(camera: Vector3, target: Vector3): void;
  dispose(): void;
}

describe('GUIControls', () => {
  const gui = new GUIControls(new Playground()) as unknown as PublicGUIControls;

  test('Create', () => {
    expect(gui).toBeDefined();
    expect(gui).toBeInstanceOf(GUIControls);
  });

  test('update', () => {
    const camera = Vector.random();
    const target = Vector.random();

    gui.update(camera, target);

    expect(gui.cameraPosition.equals(camera)).toStrictEqual(true);
    expect(gui.cameraTarget.equals(target)).toStrictEqual(true);
  });

  test('dispose', () => {
    const dispose = vi.fn(gui.dispose.bind(gui));
    dispose();
    expect(dispose).toHaveReturnedWith(undefined);
  });
});
