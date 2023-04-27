import { Assets } from '@/utils/Assets';
import { RGBAFormat } from 'three/src/constants';
import { describe, test, expect, vi } from 'vitest';
import { CubeTexture } from 'three/src/textures/CubeTexture';
import { LoadingManager } from 'three/src/loaders/LoadingManager';

type Callbacks = {
  onProgress: (event: ProgressEvent<EventTarget>) => void;
  onError: (error: ErrorEvent) => void;
  onLoad: (asset: unknown) => void;
}

describe('Assets Loader', () => {
  const loaderPrototype = Object.getPrototypeOf(Assets.Loader);
  const getPromiseCallbacks = vi.fn(loaderPrototype.getPromiseCallbacks.bind(loaderPrototype));

  test('Defined', () => {
    expect(Assets.Loader).toBeDefined();
    expect(Assets.Loader).toBeInstanceOf(LoadingManager);
  });

  test('getPromiseCallbacks.onLoad', async () => {
    const asset = await new Promise((resolve, reject) => {
      const callbacks = getPromiseCallbacks(resolve, reject) as Callbacks;
      expect(callbacks.onLoad(new CubeTexture())).toHaveReturnedWith(undefined);
    });

    expect(asset).toBeInstanceOf(CubeTexture);
    expect((asset as CubeTexture).format).toStrictEqual(RGBAFormat);
  }, 500);

  test('getPromiseCallbacks.onProgress', () => {
    const target = new EventTarget();

    const event = new ProgressEvent(
      Assets.Loading.Progress, { loaded: 0, total: 1 }
    );

    target.addEventListener(Assets.Loading.Progress, vi.fn());

    new Promise((resolve, reject) => {
      const callbacks = (
        Assets.Loader as unknown as {
          getPromiseCallbacks: (
            resolve: (asset?: unknown | PromiseLike<unknown>) => void,
            reject: (error: ErrorEvent) => void
          ) => Callbacks
        })
        .getPromiseCallbacks(resolve, reject);

      target.dispatchEvent(event);
      expect(callbacks.onProgress(event)).toThrow(TypeError);
    });
  }, 500);

  test.fails('getPromiseCallbacks.onError', async () => {
    await new Promise((resolve, reject) => {
      const error = new ErrorEvent('Loading::Error');
      const callbacks = getPromiseCallbacks(resolve, reject) as Callbacks;
      expect(callbacks.onError(error)).rejects.toStrictEqual(error);
    });
  }, 500);

  test.fails('loadCubeTexture [public]', async () => {
    await expect(Assets.Loader.loadCubeTexture('')).rejects.toBe(Error);
  }, 500);

  test.fails('loadCubeTexture [public] (Array)', async () => {
    await expect(Assets.Loader.loadCubeTexture([''])).rejects.toBe(Error);
  }, 500);

  test.fails('loadGLTF [public]', async () => {
    await expect(Assets.Loader.loadGLTF('')).rejects.toBe(Error);
  }, 500);

  test.fails('loadTexture [public]', async () => {
    await expect(Assets.Loader.loadTexture('')).rejects.toBe(Error);
  }, 500);

  test.fails('loadAudio [public]', async () => {
    await expect(Assets.Loader.loadAudio('')).rejects.toBe(Error);
  }, 500);

  test.fails('loadCubeTexture [assets]', async () => {
    Assets.Loader.usePublicFolder = false;
    await expect(Assets.Loader.loadCubeTexture('')).rejects.toBe(TypeError);
  }, 500);

  test.fails('loadCubeTexture [assets] (Array)', async () => {
    Assets.Loader.usePublicFolder = false;
    await expect(Assets.Loader.loadCubeTexture([''])).rejects.toBe(Error);
  }, 500);

  test.fails('loadGLTF [assets]', async () => {
    Assets.Loader.usePublicFolder = false;
    await expect(Assets.Loader.loadGLTF('')).rejects.toBe(Error);
  }, 500);

  test.fails('loadTexture [assets]', async () => {
    Assets.Loader.usePublicFolder = false;
    await expect(Assets.Loader.loadTexture('')).rejects.toBe(Error);
  }, 500);

  test.fails('loadAudio [assets]', async () => {
    Assets.Loader.usePublicFolder = false;
    await expect(Assets.Loader.loadAudio('')).rejects.toBe(Error);
  }, 500);

  test('onProgress', () => {
    const onProgress = vi.fn(Assets.Loader.onProgress);
    onProgress('', 0, 1);
    expect(onProgress).toHaveReturnedWith(undefined);

    onProgress('https://threejs.org/', 1, 1);
    expect(onProgress).toHaveReturnedWith(undefined);
  });

  test('onError', () => {
    const onError = vi.fn(Assets.Loader.onError);
    onError('');
    expect(onError).toHaveReturnedWith(undefined);
  });

  test('onStart', () => {
    const onStart = vi.fn(Assets.Loader.onStart);
    onStart();
    expect(onStart).toHaveReturnedWith(undefined);
  });

  test('onLoad', () => {
    const onLoad = vi.fn(Assets.Loader.onLoad);
    onLoad();
    expect(onLoad).toHaveReturnedWith(undefined);
  });
});
