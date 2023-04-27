import type { Vector3 } from 'three/src/math/Vector3';
import { Config } from '@/sandbox/Config';
import type Sandbox from '@/sandbox';
import '@/sandbox/CustomToneMapping';

import {
  NoToneMapping,
  SRGBColorSpace,
  LinearToneMapping,
  CineonToneMapping,
  CustomToneMapping,
  ReinhardToneMapping,
  LinearSRGBColorSpace,
  ACESFilmicToneMapping
} from 'three/src/constants';
import GUI from 'lil-gui';

export default class GUIControls
{
  private readonly gui = new GUI({ width: 250.0, injectStyles: true });
  private readonly cameraPosition = Config.Camera.position.clone();
  private readonly cameraTarget = Config.Camera.target.clone();

  public constructor (private readonly scene: Sandbox) {
    this.createSceneControls();
    this.createCameraControls();
    this.createLightsControls();
    this.createGroundControls();
    this.createFogControls();
    this.gui.close();
  }

  private createSceneControls (): void {
    const toneMapping = {
      NoToneMapping,
      LinearToneMapping,
      CineonToneMapping,
      CustomToneMapping,
      ReinhardToneMapping,
      ACESFilmicToneMapping
    };

    const sceneFolder = this.gui.addFolder('Scene').close();
    const scene = { ...Config.Scene, controls: true, pause: false };
    const outputColorSpace = { Linear: LinearSRGBColorSpace, SRGB: SRGBColorSpace };

    sceneFolder.addColor(scene, 'background').name('Background').onChange((color: number) =>
      this.scene.background = color
    );

    sceneFolder.add(toneMapping, 'toneMapping', Object.keys(toneMapping)).name('Tone Mapping')
      .setValue('ACESFilmicToneMapping').onChange((mapping: keyof typeof toneMapping) => {
        scene.toneMapping = toneMapping[mapping];
        this.scene.updateRenderer(scene);
      });

    sceneFolder.add(scene, 'toneMappingExposure', 0.0, 2.5).name('Tone Mapping Exposure').onChange(() =>
      this.scene.updateRenderer(scene)
    );

    sceneFolder.add(outputColorSpace, 'outputColorSpace', Object.keys(outputColorSpace)).name('Output Color Space')
      .setValue('Linear').onChange((encoding: keyof typeof outputColorSpace) => {
        scene.outputColorSpace = outputColorSpace[encoding];
        this.scene.updateRenderer(scene);
      });

    sceneFolder.add(scene, 'controls').name('Controls').onChange((enabled: boolean) =>
      this.scene.controls = enabled
    ).listen();

    sceneFolder.add(scene, 'pause').name('Pause').onChange((pause: boolean) => {
      this.scene.pause = pause;
      scene.controls = !pause;
    });
  }

  private createCameraControls (): void {
    const camera = { ...Config.Camera };
    const cameraFolder = this.gui.addFolder('Camera').close();

    cameraFolder.add(camera, 'fov', 1.0, 100.0).name('Field of View').onChange(() =>
      this.scene.updateCamera(camera)
    );

    cameraFolder.add(camera, 'near', 0.1, 1.0).name('Near Plane').onChange(() =>
      this.scene.updateCamera(camera)
    );

    cameraFolder.add(camera, 'far', 1.0, 2e3).name('Far Plane').onChange(() =>
      this.scene.updateCamera(camera)
    );

    const position = cameraFolder.addFolder('Position').close();

    position.add(this.cameraPosition, 'x').onChange(() =>
      this.scene.updateCameraPosition(this.cameraPosition, this.cameraTarget)
    ).decimals(3).listen();

    position.add(this.cameraPosition, 'y').onChange(() =>
      this.scene.updateCameraPosition(this.cameraPosition, this.cameraTarget)
    ).decimals(3).listen();

    position.add(this.cameraPosition, 'z').onChange(() =>
      this.scene.updateCameraPosition(this.cameraPosition, this.cameraTarget)
    ).decimals(3).listen();

    const target = cameraFolder.addFolder('Target').close();

    target.add(this.cameraTarget, 'x').onChange(() =>
      this.scene.updateCameraPosition(this.cameraPosition, this.cameraTarget)
    ).decimals(3).listen();

    target.add(this.cameraTarget, 'y').onChange(() =>
      this.scene.updateCameraPosition(this.cameraPosition, this.cameraTarget)
    ).decimals(3).listen();

    target.add(this.cameraTarget, 'z').onChange(() =>
      this.scene.updateCameraPosition(this.cameraPosition, this.cameraTarget)
    ).decimals(3).listen();
  }

  private createLightsControls (): void {
    const ambient = { ...Config.Lights.ambient };
    const directional = { ...Config.Lights.directional };

    const lightsFolder = this.gui.addFolder('Lights').close();
    const ambientFolder = lightsFolder.addFolder('Ambient').close();
    const directionalFolder = lightsFolder.addFolder('Directional').close();

    ambientFolder.addColor(ambient, 'color').name('Color').onChange(() =>
      this.scene.updateAmbient(ambient)
    );

    ambientFolder.add(ambient, 'intensity', 0.0, 1.0).name('Intensity').onChange(() =>
      this.scene.updateAmbient(ambient)
    );

    directionalFolder.addColor(directional, 'color').name('Color').onChange(() =>
      this.scene.updateDirectional(directional)
    );

    directionalFolder.add(directional, 'intensity', 0.0, 1.0).name('Intensity').onChange(() =>
      this.scene.updateDirectional(directional)
    );

    directionalFolder.add(directional.shadow, 'cast').name('Cast Shadow').onChange(() =>
      this.scene.updateDirectional(directional)
    );

    directionalFolder.add(directional.helper, 'visible').name('Helper').onChange(() =>
      this.scene.updateDirectional(directional)
    );

    const position = directionalFolder.addFolder('Position').close();

    position.add(directional.position, 'x').onChange(() =>
      this.scene.updateDirectional(directional)
    ).decimals(3);

    position.add(directional.position, 'y').onChange(() =>
      this.scene.updateDirectional(directional)
    ).decimals(3);

    position.add(directional.position, 'z').onChange(() =>
      this.scene.updateDirectional(directional)
    ).decimals(3);

    const rotation = directionalFolder.addFolder('Rotation').close();

    rotation.add(directional.rotation, 'x').onChange(() =>
      this.scene.updateDirectional(directional)
    ).decimals(3);

    rotation.add(directional.rotation, 'y').onChange(() =>
      this.scene.updateDirectional(directional)
    ).decimals(3);

    rotation.add(directional.rotation, 'z').onChange(() =>
      this.scene.updateDirectional(directional)
    ).decimals(3);

    const shadowFolder = directionalFolder.addFolder('Shadow').close();
    const cameraFolder = shadowFolder.addFolder('Camera').close();

    cameraFolder.add(directional.shadow.camera, 'top').onChange(() =>
      this.scene.updateDirectional(directional)
    ).decimals(3);

    cameraFolder.add(directional.shadow.camera, 'right').onChange(() =>
      this.scene.updateDirectional(directional)
    ).decimals(3);

    cameraFolder.add(directional.shadow.camera, 'bottom').onChange(() =>
      this.scene.updateDirectional(directional)
    ).decimals(3);

    cameraFolder.add(directional.shadow.camera, 'left').onChange(() =>
      this.scene.updateDirectional(directional)
    ).decimals(3);

    cameraFolder.add(directional.shadow.camera, 'near').onChange(() =>
      this.scene.updateDirectional(directional)
    ).decimals(3);

    cameraFolder.add(directional.shadow.camera, 'far').onChange(() =>
      this.scene.updateDirectional(directional)
    ).decimals(3);

    const mapSize = shadowFolder.addFolder('Map Size').close();

    mapSize.add(directional.shadow.mapSize, 'x').onChange(() =>
      this.scene.updateDirectional(directional)
    ).decimals(3);

    mapSize.add(directional.shadow.mapSize, 'y').onChange(() =>
      this.scene.updateDirectional(directional)
    ).decimals(3);
  }

  private createGroundControls (): void {
    const ground = { ...Config.Ground };
    const groundFolder = this.gui.addFolder('Ground').close();

    groundFolder.addColor(ground, 'color').name('Color').onChange(() =>
      this.scene.updateGround(ground)
    );

    groundFolder.add(ground, 'size', 1, 1e3).name('Size').onChange(() =>
      this.scene.updateGround(ground)
    );

    groundFolder.add(ground, 'cell', 2, 1e2).name('Cell').onChange(() =>
      this.scene.updateGround(ground)
    ).step(2);
  }

  private createFogControls (): void {
    const fog = { ...Config.Fog };
    const fogFolder = this.gui.addFolder('Fog').close();

    fogFolder.addColor(fog, 'color').name('Color').onChange(() =>
      this.scene.updateFog(fog)
    );

    fogFolder.add(fog, 'near', 1.0, 1e3).name('Near').onChange(() =>
      this.scene.updateFog(fog)
    );

    fogFolder.add(fog, 'far', 1.0, 1e3).name('Far').onChange(() =>
      this.scene.updateFog(fog)
    );

    fogFolder.add(fog, 'visible').name('Visible').onChange(() =>
      this.scene.updateFog(fog)
    );
  }

  public update (camera: Vector3, target: Vector3): void {
    this.cameraPosition.copy(camera);
    this.cameraTarget.copy(target);
  }

  public dispose (): void {
    this.gui.destroy();
  }
}
