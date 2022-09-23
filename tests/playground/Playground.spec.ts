import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { describe, test, expect, vi } from 'vitest';
import Playground from '@/playground';

vi.mock('three/src/renderers/WebGLRenderer');

interface PublicPlayground {
  orbitControls: OrbitControls;
  get domElement (): HTMLCanvasElement;
  set controls (enabled: boolean);
  set pause (paused: boolean);
  destroy: () => void;
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
});
