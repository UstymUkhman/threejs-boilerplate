import { vi } from 'vitest';
import { Color } from 'three/src/math/Color';

export const WebGLRenderer = vi.fn().mockImplementation(() => {
  const canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');

  return {
    debug: { checkShaderErrors: true },
    getClearColor: () => new Color(),
    shadowMap: { enabled: false },

    setPixelRatio: vi.fn(),
    setClearColor: vi.fn(),
    domElement: canvas,

    setSize: vi.fn(),
    dispose: vi.fn(),
    render: vi.fn()
  };
});
