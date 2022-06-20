import { vi } from 'vitest';

export const WebGLRenderer = vi.fn().mockImplementation(() => {
  const canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');

  return {
    shadowMap: { enabled: false },
    setPixelRatio: vi.fn(),
    setClearColor: vi.fn(),
    domElement: canvas,

    setSize: vi.fn(),
    dispose: vi.fn(),
    render: vi.fn()
  };
});
