import { Assets } from '@/utils/AssetsLoader';
import { RGBAFormat } from 'three/src/constants';
import { describe, test, expect, vi } from 'vitest';
import { CubeTexture } from 'three/src/textures/CubeTexture';
import { LoadingManager } from 'three/src/loaders/LoadingManager';

describe('AssetsLoader', () => {
  const loader = new Assets.Loader();

  Object.assign(loader, {
    getPromiseCallbacks: (
      resolve: (asset?: unknown | PromiseLike<unknown>) => void,
      reject: (error: ErrorEvent) => void
    ) => ({
      onLoad: (asset: unknown) => {
        if (asset instanceof CubeTexture) {
          asset.format = RGBAFormat;
        }

        resolve(asset);
      },

      onProgress: vi.fn,
      onError: (error: ErrorEvent) => reject(error)
    })
  });

  test('Create', () => {
    expect(Assets.Loader).toBeDefined();
    expect(loader).toBeInstanceOf(LoadingManager);
  });

  test.fails('loadCubeTexture', async () => {
    await expect(loader.loadCubeTexture('')).rejects.toBe(Error);
  }, 500);

  test.fails('loadTexture', async () => {
    await expect(loader.loadTexture('')).rejects.toBe(Error);
  }, 500);

  test.fails('loadGLTF', async () => {
    await expect(loader.loadGLTF('')).rejects.toBe(Error);
  }, 500);

  test.fails('loadAudio', async () => {
    await expect(loader.loadAudio('')).rejects.toBe(Error);
  }, 500);

  test('onProgress', () => {
    const onProgress = vi.fn(loader.onProgress);
    onProgress('', 1, 1);
    expect(onProgress).toHaveReturnedWith(undefined);
  });

  test('onError', () => {
    const onError = vi.fn(loader.onError);
    onError('');
    expect(onError).toHaveReturnedWith(undefined);
  });

  test('onStart', () => {
    const onStart = vi.fn(loader.onStart);
    onStart();
    expect(onStart).toHaveReturnedWith(undefined);
  });

  test('onLoad', () => {
    const onLoad = vi.fn(loader.onLoad);
    onLoad();
    expect(onLoad).toHaveReturnedWith(undefined);
  });
});
