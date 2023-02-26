import { CubeTextureLoader } from 'three/src/loaders/CubeTextureLoader';
import type { AnimationClip } from 'three/src/animation/AnimationClip';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { LoadingManager } from 'three/src/loaders/LoadingManager';

import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { CubeTexture } from 'three/src/textures/CubeTexture';
import { AudioLoader } from 'three/src/loaders/AudioLoader';
import type { Texture } from 'three/src/textures/Texture';

import { generateUUID } from 'three/src/math/MathUtils';
import type { Group } from 'three/src/objects/Group';
import { EventEmitter } from '@/utils/EventEmitter';
import { RGBAFormat } from 'three/src/constants';

export namespace Assets
{
  export type GLTF = Group;
  export type Animations = Array<AnimationClip>;
  export type GLTFModel = { scene: GLTF, animations?: Animations };

  type Resolve<Asset> = (asset?: Asset | PromiseLike<Asset>) => void;
  type ProgressEventTarget = EventTarget & { responseURL: string };
  type Assets = Texture | CubeTexture | GLTFModel | AudioBuffer;
  type Reject = (error: ErrorEvent) => void;

  type Callbacks = {
    onProgress: (event: ProgressEvent<EventTarget>) => void;
    onLoad: (asset: Assets) => void;
    onError: Reject;
  }

  export class Loader extends LoadingManager
  {
    private readonly audioBasePath = './assets/sounds/';
    private readonly modelBasePath = './assets/models/';
    private readonly textureBasePath = './assets/images';

    private readonly cubeTexture = new CubeTextureLoader(this);
    private readonly texture = new TextureLoader(this);
    private readonly audio = new AudioLoader(this);
    private readonly gltf = new GLTFLoader(this);

    private readonly uuid = generateUUID();

    private readonly cubeTextures = [
      'px.jpg', 'nx.jpg',
      'py.jpg', 'ny.jpg',
      'pz.jpg', 'nz.jpg'
    ];

    private publicFolder = true;

    private getPromiseCallbacks (resolve: Resolve<Assets>, reject: Reject): Callbacks {
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

    public async loadCubeTexture (folder: string): Promise<CubeTexture> {
      return await new Promise((resolve, reject) => {
        const path = this.publicFolder ? `${this.textureBasePath}/` : '';
        const promise = this.getPromiseCallbacks(resolve as Resolve<Assets>, reject);

        this.cubeTexture.setPath(`${path}${folder}/`).load(
          this.cubeTextures, promise.onLoad, promise.onProgress, promise.onError
        );
      });
    }

    public async loadTexture (file: string): Promise<Texture> {
      return await new Promise((resolve, reject) => {
        const promise = this.getPromiseCallbacks(resolve as Resolve<Assets>, reject);

        this.publicFolder && this.texture.setPath(`${this.textureBasePath}/`);
        this.texture.load(file, promise.onLoad, promise.onProgress, promise.onError);
      });
    }

    public async loadGLTF (file: string): Promise<GLTFModel> {
      return await new Promise((resolve, reject) => {
        const promise = this.getPromiseCallbacks(resolve as Resolve<Assets>, reject);

        this.publicFolder && this.gltf.setPath(this.modelBasePath);
        this.gltf.load(file, promise.onLoad, promise.onProgress, promise.onError);
      });
    }

    public async loadAudio (file: string): Promise<AudioBuffer> {
      return await new Promise((resolve, reject) => {
        const promise = this.getPromiseCallbacks(resolve as Resolve<Assets>, reject);

        this.publicFolder && this.audio.setPath(this.audioBasePath);
        this.audio.load(file, promise.onLoad, promise.onProgress, promise.onError);
      });
    }

    public override onProgress = (url: string, loaded: number, total: number): void => {
      const progress = loaded * 100 / total;

      EventEmitter.dispatch('Loading::Progress', {
        uuid: this.uuid,
        progress
      });
    };

    public override onError = (url: string): void => {
      console.error(`Error occurred loading ${url}.`);
    };

    public override onStart = (): void => {
      EventEmitter.dispatch('Loading::Start', this.uuid);
    };

    public override onLoad = (): void => {
      EventEmitter.dispatch('Loading::Complete', this.uuid);
    };

    public set usePublicFolder (use: boolean) {
      this.publicFolder = use;
    }
  }
}
