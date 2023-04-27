import { vi } from 'vitest';
import { Vector2 } from 'three/src/math/Vector2';

export const WebGLRenderer = vi.fn().mockImplementation(() => {
  const canvas = document.createElementNS(
    'http://www.w3.org/1999/xhtml',
    'canvas'
  );

  const size = new Vector2();

  return {
    setSize: vi.fn().mockImplementation(
      (width: number, height: number) => size.set(width, height)
    ),

    getSize: vi.fn().mockImplementation(
      (vec: Vector2) => vec.copy(size)
    ),

    debug: { checkShaderErrors: true },
    shadowMap: { enabled: false },

    setPixelRatio: vi.fn(),
    setClearColor: vi.fn(),
    domElement: canvas,
    dispose: vi.fn(),
    render: vi.fn()
  };
});
