import type { Vector3 } from 'three/src/math/Vector3';
import type MainScene from './MainScene';
import { Color } from '@/utils/Color';
import { Config } from './Config';
import GUI from 'lil-gui';

export default class GUIControls
{
  private readonly gui = new GUI({ width: 245, injectStyles: true });
  private readonly cameraPosition = Config.Camera.position.clone();

  public constructor (private readonly main: MainScene) {
    this.createSceneControls();
    this.createFogControls();
    this.createCameraControls();
    this.createGroundControls();
  }

  private createSceneControls (): void {
    const sceneFolder = this.gui.addFolder('Scene');

    const scene = {
      color: Config.Background,
      controls: true,
      pause: false
    };

    sceneFolder.addColor(scene, 'color').name('Background').onChange((color: number) =>
      this.main.background = color
    );

    sceneFolder.add(scene, 'controls').name('Controls').onChange((enabled: boolean) =>
      this.main.controls = enabled
    );

    sceneFolder.add(scene, 'pause').name('Pause').onChange((pause: boolean) =>
      this.main.pause = pause
    );
  }

  private createFogControls (): void {
    const fogFolder = this.gui.addFolder('Fog');
    const fog = { ...Config.Fog };

    fogFolder.addColor(fog, 'color').name('Color').onChange(() =>
      this.main.updateFog(fog)
    );

    fogFolder.add(fog, 'near', 1.0, 1e3).name('Near').onChange(() =>
      this.main.updateFog(fog)
    );

    fogFolder.add(fog, 'far', 1.0, 1e3).name('Far').onChange(() =>
      this.main.updateFog(fog)
    );

    fogFolder.add(fog, 'visible').name('Visible').onChange(() =>
      this.main.updateFog(fog)
    );
  }

  private createCameraControls (): void {
    const cameraFolder = this.gui.addFolder('Camera');
    const camera = { ...Config.Camera };

    cameraFolder.add(camera, 'fov', 1.0, 100.0).name('Field of View').onChange(() =>
      this.main.updateCamera(camera)
    );

    cameraFolder.add(camera, 'near', 0.1, 1.0).name('Near Plane').onChange(() =>
      this.main.updateCamera(camera)
    );

    cameraFolder.add(camera, 'far', 1.0, 2e3).name('Far Plane').onChange(() =>
      this.main.updateCamera(camera)
    );

    const position = cameraFolder.addFolder('Position');

    position.add(this.cameraPosition, 'x').onChange(() =>
      this.main.updateCameraPosition(this.cameraPosition)
    ).decimals(3).listen();

    position.add(this.cameraPosition, 'y').onChange(() =>
      this.main.updateCameraPosition(this.cameraPosition)
    ).decimals(3).listen();

    position.add(this.cameraPosition, 'z').onChange(() =>
      this.main.updateCameraPosition(this.cameraPosition)
    ).decimals(3).listen();
  }

  private createGroundControls (): void {
    const groundFolder = this.gui.addFolder('Ground');

    const ground = {
      color: Color.WHITE,
      scale: 500.0
    };

    groundFolder.addColor(ground, 'color').name('Color').onChange((color: number) =>
      this.main.groundColor = color
    );

    groundFolder.add(ground, 'scale', 1, 1e3).name('Size').onChange((size: number) =>
      this.main.groundSize = size / 500.0
    );
  }

  public update (camera: Vector3): void {
    this.cameraPosition.copy(camera);
  }

  public dispose (): void {
    this.gui.destroy();
  }
}
