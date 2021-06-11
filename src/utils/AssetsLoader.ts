import { CubeTextureLoader } from 'three/src/loaders/CubeTextureLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { LoadingManager } from 'three/src/loaders/LoadingManager';

import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { CubeTexture } from 'three/src/textures/CubeTexture';
import { AudioLoader } from 'three/src/loaders/AudioLoader';

import { generateUUID } from 'three/src/math/MathUtils';
import { CustomEvents } from '@/utils/CustomEvents';
import { RGBFormat } from 'three/src/constants';

export namespace Assets
{
  export type Animations = Array<import('three/src/animation/AnimationClip').AnimationClip>;
  type Resolve<Asset> = (asset?: Asset | PromiseLike<Asset>) => void;

  export type Texture = import ('three/src/textures/Texture').Texture;
  export type GLTFModel = { scene: GLTF, animations?: Animations };
  export type GLTF = import('three/src/objects/Group').Group;

  type ProgressEventTarget = EventTarget & { responseURL: string };
  type Assets = Texture | CubeTexture | GLTFModel | AudioBuffer;
  type Reject = (error: ErrorEvent) => void;

  export interface Callbacks {
    onProgress: (event: ProgressEvent<EventTarget>) => void;
    onLoad: (asset: Assets) => void;
    onError: Reject;
  }

  export class Loader extends LoadingManager
  {
    private readonly cubeTexture = new CubeTextureLoader(this);
    private readonly texture = new TextureLoader(this);
    private readonly gltf = new GLTFLoader(this);
    private readonly audio = new AudioLoader();

    private readonly textureBasePath = './assets/images';
    private readonly modelBasePath = './assets/models/';
    private readonly audioBasePath = './assets/sounds/';

    private readonly uuid = generateUUID();

    private readonly cubeTextures = [
      'px.jpg', 'nx.jpg',
      'py.jpg', 'ny.jpg',
      'pz.jpg', 'nz.jpg'
    ];

    private getPromiseCallbacks (resolve: Resolve<Assets>, reject: Reject): Callbacks {
      return {
        onLoad: asset => {
          if (asset instanceof CubeTexture) {
            asset.format = RGBFormat;
          }

          resolve(asset);
        },

        onProgress: event => this.onProgress(
          (event.target as ProgressEventTarget).responseURL, event.loaded, event.total
        ),

        onError: error => reject(error)
      };
    }

    public async loadCubeTexture (folder: string): Promise<CubeTexture> {
      return await new Promise((resolve, reject) => {
        const promise = this.getPromiseCallbacks(resolve as Resolve<Assets>, reject);

        this.cubeTexture.setPath(`${this.textureBasePath}/${folder}/`);
        this.cubeTexture.load(this.cubeTextures, promise.onLoad, promise.onProgress, promise.onError);
      });
    }

    public async loadTexture (file: string): Promise<Texture> {
      return await new Promise((resolve, reject) => {
        const promise = this.getPromiseCallbacks(resolve as Resolve<Assets>, reject);

        this.texture.setPath(`${this.textureBasePath}/`);
        this.texture.load(file, promise.onLoad, promise.onProgress, promise.onError);
      });
    }

    public async loadGLTF (file: string): Promise<GLTFModel> {
      return await new Promise((resolve, reject) => {
        const promise = this.getPromiseCallbacks(resolve as Resolve<Assets>, reject);

        this.gltf.setPath(this.modelBasePath);
        this.gltf.load(file, promise.onLoad, promise.onProgress, promise.onError);
      });
    }

    public async loadAudio (file: string): Promise<AudioBuffer> {
      return await new Promise((resolve, reject) => {
        const promise = this.getPromiseCallbacks(resolve as Resolve<Assets>, reject);

        this.audio.setPath(this.audioBasePath);
        this.audio.load(file, promise.onLoad, promise.onProgress, promise.onError);
      });
    }

    public override onProgress = (url: string, loaded: number, total: number): void => {
      const progress = loaded * 100 / total;

      CustomEvents.dispatch('loading:progress', {
        uuid: this.uuid,
        progress
      });
    }

    public override onStart = (): void => {
      CustomEvents.dispatch('loading:start', this.uuid);
    }

    public override onError = (url: string): void => {
      console.error(`Error occurred loading ${url}.`);
    }

    public override onLoad = (): void => {
      CustomEvents.dispatch('loading:end', this.uuid);
    }
  }
}
