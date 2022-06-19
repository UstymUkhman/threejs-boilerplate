import { vi } from 'vitest';

const setPixelRatio = vi.fn();
const setClearColor = vi.fn();

const setSize = vi.fn();
const dispose = vi.fn();
const render = vi.fn();

const WebGLRenderer = vi.fn().mockImplementation(() => {
  const canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');

  return {
    shadowMap: { enabled: false },
    domElement: canvas,
    setPixelRatio,
    setClearColor,
    setSize,
    dispose,
    render
  };
});

export {
  WebGLRenderer,
  setPixelRatio,
  render
};
