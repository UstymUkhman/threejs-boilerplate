/// <reference types="./canvas.mock" />
import { afterAll, vi } from 'vitest';

type GlobalTest = typeof globalThis & {
  jest?: typeof vi
};

(global as GlobalTest).jest = vi;

import getCanvasWindow from 'jest-canvas-mock/lib/window';
const canvasWindow = getCanvasWindow({ document: window.document });

const apis = [
  'CanvasRenderingContext2D',
  'createImageBitmap',
  'CanvasGradient',
  'CanvasPattern',
  'TextMetrics',
  'ImageBitmap',
  'ImageData',
  'DOMMatrix',
  'Path2D'
] as const;

apis.forEach(api => {
  global[api] = canvasWindow[api];
  global.window[api] = canvasWindow[api];
});

afterAll(() => { delete (global as GlobalTest).jest; });
