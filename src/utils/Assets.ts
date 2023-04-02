import { CubeTextureLoader } from 'three/src/loaders/CubeTextureLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { LoadingManager } from 'three/src/loaders/LoadingManager';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

import { CubeTexture } from 'three/src/textures/CubeTexture';
import { AudioLoader } from 'three/src/loaders/AudioLoader';
import type { Texture } from 'three/src/textures/Texture';
import { RGBAFormat } from 'three/src/constants';
import { Emitter } from '@/utils/Events';

export namespace Assets
{
  type Resolve<Asset> = (asset?: Asset | PromiseLike<Asset>) => void;
  type ProgressEventTarget = EventTarget & { responseURL: string };
  type Asset = GLTF | Texture | AudioBuffer | CubeTexture;

  type Callbacks = {
    onProgress: (event: ProgressEvent<EventTarget>) => void;
    onError: (error: ErrorEvent) => void;
    onLoad: (asset: Asset) => void;
  }

  class Manager extends LoadingManager
  {
    private readonly textures = ['px', 'nx', 'py', 'ny', 'pz', 'nz'];

    private readonly cubeTexture = new CubeTextureLoader(this);
    private readonly texture = new TextureLoader(this);
    private readonly audio = new AudioLoader(this);
    private readonly gltf = new GLTFLoader(this);

    private readonly modelBasePath = './assets/models/';
    private readonly audioBasePath = './assets/sounds/';
    private readonly textureBasePath = './assets/images/';

    private publicFolder = true;

    private getPromiseCallbacks (
      resolve: Resolve<Asset>, reject: (error: ErrorEvent) => void
    ): Callbacks {
      return {
        onLoad: asset => {
          if (asset instanceof CubeTexture) {
            asset.format = RGBAFormat;
          }

          resolve(asset);
        },

        onProgress: event => this.onProgress(
          (event.target as ProgressEventTarget)?.responseURL, event.loaded, event.total
        ),

        onError: error => reject(error)
      };
    }

    public async loadCubeTexture (
      images: string | string[], textures?: string[], ext = 'png'
    ): Promise<CubeTexture> {
      return await new Promise((resolve, reject) => {
        if (Array.isArray(images)) textures = images;

        else {
          if (!this.publicFolder) throw TypeError(
            '"images" must be a "string[]" when "publicFolder" option is disabled.'
          );

          this.cubeTexture.setPath(`${this.textureBasePath}${images}/`);
          textures ??= this.textures.map(name => `${name}.${ext}`);
        }

        const promise = this.getPromiseCallbacks(resolve as Resolve<Asset>, reject);
        this.cubeTexture.load(textures, promise.onLoad, promise.onProgress, promise.onError);
      });
    }

    public async loadGLTF (file: string): Promise<GLTF> {
      return await new Promise((resolve, reject) => {
        const promise = this.getPromiseCallbacks(resolve as Resolve<Asset>, reject);

        this.publicFolder && this.gltf.setPath(this.modelBasePath);
        this.gltf.load(file, promise.onLoad, promise.onProgress, promise.onError);
      });
    }

    public async loadTexture (file: string): Promise<Texture> {
      return await new Promise((resolve, reject) => {
        const promise = this.getPromiseCallbacks(resolve as Resolve<Asset>, reject);

        this.publicFolder && this.texture.setPath(this.textureBasePath);
        this.texture.load(file, promise.onLoad, promise.onProgress, promise.onError);
      });
    }

    public async loadAudio (file: string): Promise<AudioBuffer> {
      return await new Promise((resolve, reject) => {
        const promise = this.getPromiseCallbacks(resolve as Resolve<Asset>, reject);

        this.publicFolder && this.audio.setPath(this.audioBasePath);
        this.audio.load(file, promise.onLoad, promise.onProgress, promise.onError);
      });
    }

    public override onProgress = (url: string, loaded: number, total: number): void => {
      url && Emitter.dispatch(Loading.Progress, loaded * 100 / total);
    };

    public override onError = (url: string): void => {
      console.error(`Error occurred loading ${url}.`);
    };

    public override onStart = (): void => {
      Emitter.dispatch(Loading.Start);
    };

    public override onLoad = (): void => {
      Emitter.dispatch(Loading.Complete);
    };

    public set usePublicFolder (use: boolean) {
      this.publicFolder = use;
    }
  }

  export const Loader = new Manager();

  export enum Loading {
    Complete = 'Loading::Complete',
    Progress = 'Loading::Progress',
    Start    = 'Loading::Start'
  }
}
