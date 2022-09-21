import { Assets } from '@/utils/AssetsLoader';
// import { Group } from 'three/src/objects/Group';
// import { RGBAFormat } from 'three/src/constants';

import { describe, test, expect, vi } from 'vitest';
// import { Texture } from 'three/src/textures/Texture';
// import { CubeTexture } from 'three/src/textures/CubeTexture';
import { LoadingManager } from 'three/src/loaders/LoadingManager';

describe('AssetsLoader', () => {
  const loader = new Assets.Loader();

  test('Create', () => {
    expect(Assets.Loader).toBeDefined();
    expect(loader).toBeInstanceOf(LoadingManager);
  });

  /* test('getPromiseCallbacks', () => {
    const loaderPrototype = Object.getPrototypeOf(loader);
    const getPromiseCallbacks = vi.fn(loaderPrototype.getPromiseCallbacks.bind(loader));

    new Promise((resolve, reject) => {
      const callbacks = getPromiseCallbacks(resolve, reject) as Assets.Callbacks;
      expect(callbacks.onLoad(new CubeTexture())).toHaveReturnedWith(undefined);
    }).then(asset => {
      expect(asset).toBeInstanceOf(CubeTexture);
      expect((asset as CubeTexture).format).toStrictEqual(RGBAFormat);
    });

    new Promise((resolve, reject) => {
      const callbacks = getPromiseCallbacks(resolve, reject) as Assets.Callbacks;
      expect(callbacks.onProgress(new ProgressEvent('loading'))).toHaveReturnedWith(undefined);
    });

    new Promise((resolve, reject) => {
      const error = new ErrorEvent('loading');
      const callbacks = getPromiseCallbacks(resolve, reject) as Assets.Callbacks;
      expect(callbacks.onError(error)).rejects.toStrictEqual(error);
    });
  }); */

  /* test('loadCubeTexture', async () => {
    const cubeTexture = await loader.loadCubeTexture('');
    expect(cubeTexture).toBeInstanceOf(CubeTexture);
    expect(cubeTexture.images.length).toStrictEqual(6);
  }); */

  /* test('loadTexture', async () => {
    const texture = await loader.loadTexture('');
    expect(texture).toBeInstanceOf(Texture);
    expect(texture.image).toBeInstanceOf(Image);
  }); */

  /* test('loadGLTF', async () => {
    const model = await loader.loadGLTF('');
    expect(model.scene).toBeInstanceOf(Group);
    expect(model).toEqual({ scene: new Group() });
  }); */

  /* test('loadAudio', async () => {
    const audio = await loader.loadAudio('');
    expect(audio).toBeInstanceOf(AudioBuffer);
  }); */

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
