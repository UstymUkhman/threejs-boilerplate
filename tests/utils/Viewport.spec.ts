import Viewport from '@/utils/Viewport';
import { describe, test, expect, vi } from 'vitest';

describe('Viewport', () => {
  const callback = () => void 0;

  test('Create', () => {
    expect(Viewport).toBeDefined();
  });

  test('addResizeCallback', () => {
    const addResizeCallback = vi.fn(Viewport.addResizeCallback.bind(Viewport));
    addResizeCallback(callback);
    expect(addResizeCallback).toHaveReturnedWith(undefined);
  });

  test('updateScreen', () => {
    const viewportPrototype = Object.getPrototypeOf(Viewport);
    const updateScreen = vi.fn(viewportPrototype.updateScreen.bind(Viewport));

    updateScreen();
    expect(updateScreen).toHaveReturnedWith(undefined);
  });

  test('removeResizeCallback', () => {
    const removeResizeCallback = vi.fn(Viewport.removeResizeCallback.bind(Viewport));
    removeResizeCallback(callback);
    expect(removeResizeCallback).toHaveReturnedWith(undefined);
  });

  test('dispose', () => {
    const dispose = vi.fn(Viewport.dispose.bind(Viewport));
    dispose();
    expect(dispose).toHaveReturnedWith(undefined);
  });

  test('size', () => {
    const height = window.innerHeight;
    const width = window.innerWidth;

    const ratio = width / height;
    const size = Viewport.size;

    expect(size.width).toStrictEqual(width);
    expect(size.height).toStrictEqual(height);
    expect(size.ratio).toStrictEqual(ratio);
  });
});
