import type { Vector3 } from 'three/src/math/Vector3';
import { Config } from '@/playground/Config';
import type Playground from '@/playground';
import GUI from 'lil-gui';

export default class GUIControls
{
  private readonly gui = new GUI({ width: 250.0, injectStyles: true });
  private readonly cameraPosition = Config.Camera.position.clone();
  private readonly cameraTarget = Config.Camera.target.clone();

  public constructor (private readonly main: Playground) {
    this.createSceneControls();
    this.createCameraControls();
    this.createLightsControls();
    this.createGroundControls();
    this.createFogControls();
    this.gui.close();
  }

  private createSceneControls (): void {
    const sceneFolder = this.gui.addFolder('Scene').close();
    const scene = { color: Config.Background, controls: true, pause: false };

    sceneFolder.addColor(scene, 'color').name('Background').onChange((color: number) =>
      this.main.background = color
    );

    sceneFolder.add(scene, 'controls').name('Controls').onChange((enabled: boolean) =>
      this.main.controls = enabled
    ).listen();

    sceneFolder.add(scene, 'pause').name('Pause').onChange((pause: boolean) => {
      this.main.pause = pause;
      scene.controls = !pause;
    });
  }

  private createCameraControls (): void {
    const camera = { ...Config.Camera };
    const cameraFolder = this.gui.addFolder('Camera').close();

    cameraFolder.add(camera, 'fov', 1.0, 100.0).name('Field of View').onChange(() =>
      this.main.updateCamera(camera)
    );

    cameraFolder.add(camera, 'near', 0.1, 1.0).name('Near Plane').onChange(() =>
      this.main.updateCamera(camera)
    );

    cameraFolder.add(camera, 'far', 1.0, 2e3).name('Far Plane').onChange(() =>
      this.main.updateCamera(camera)
    );

    const position = cameraFolder.addFolder('Position').close();

    position.add(this.cameraPosition, 'x').onChange(() =>
      this.main.updateCameraPosition(this.cameraPosition, this.cameraTarget)
    ).decimals(3).listen();

    position.add(this.cameraPosition, 'y').onChange(() =>
      this.main.updateCameraPosition(this.cameraPosition, this.cameraTarget)
    ).decimals(3).listen();

    position.add(this.cameraPosition, 'z').onChange(() =>
      this.main.updateCameraPosition(this.cameraPosition, this.cameraTarget)
    ).decimals(3).listen();

    const target = cameraFolder.addFolder('Target').close();

    target.add(this.cameraTarget, 'x').onChange(() =>
      this.main.updateCameraPosition(this.cameraPosition, this.cameraTarget)
    ).decimals(3).listen();

    target.add(this.cameraTarget, 'y').onChange(() =>
      this.main.updateCameraPosition(this.cameraPosition, this.cameraTarget)
    ).decimals(3).listen();

    target.add(this.cameraTarget, 'z').onChange(() =>
      this.main.updateCameraPosition(this.cameraPosition, this.cameraTarget)
    ).decimals(3).listen();
  }

  private createGroundControls (): void {
    const ground = { ...Config.Ground };
    const groundFolder = this.gui.addFolder('Ground').close();

    groundFolder.addColor(ground, 'color').name('Color').onChange(() =>
      this.main.updateGround(ground)
    );

    groundFolder.add(ground, 'size', 1, 1e3).name('Size').onChange(() =>
      this.main.updateGround(ground)
    );

    groundFolder.add(ground, 'cell', 2, 1e2).name('Cell').onChange(() =>
      this.main.updateGround(ground)
    ).step(2);
  }

  private createLightsControls (): void {
    const ambient = { ...Config.Lights.ambient };
    const directional = { ...Config.Lights.directional };

    const lightsFolder = this.gui.addFolder('Lights').close();
    const ambientFolder = lightsFolder.addFolder('Ambient').close();
    const directionalFolder = lightsFolder.addFolder('Directional').close();

    ambientFolder.addColor(ambient, 'color').name('Color').onChange(() =>
      this.main.updateAmbient(ambient)
    );

    ambientFolder.add(ambient, 'intensity', 0.0, 1.0).name('Intensity').onChange(() =>
      this.main.updateAmbient(ambient)
    );

    directionalFolder.addColor(directional, 'color').name('Color').onChange(() =>
      this.main.updateDirectional(directional)
    );

    directionalFolder.add(directional, 'intensity', 0.0, 1.0).name('Intensity').onChange(() =>
      this.main.updateDirectional(directional)
    );

    directionalFolder.add(directional.shadow, 'cast').name('Cast Shadow').onChange(() =>
      this.main.updateDirectional(directional)
    );

    directionalFolder.add(directional.helper, 'visible').name('Helper').onChange(() =>
      this.main.updateDirectional(directional)
    );

    const position = directionalFolder.addFolder('Position').close();

    position.add(directional.position, 'x').onChange(() =>
      this.main.updateDirectional(directional)
    ).decimals(3);

    position.add(directional.position, 'y').onChange(() =>
      this.main.updateDirectional(directional)
    ).decimals(3);

    position.add(directional.position, 'z').onChange(() =>
      this.main.updateDirectional(directional)
    ).decimals(3);

    const rotation = directionalFolder.addFolder('Rotation').close();

    rotation.add(directional.rotation, 'x').onChange(() =>
      this.main.updateDirectional(directional)
    ).decimals(3);

    rotation.add(directional.rotation, 'y').onChange(() =>
      this.main.updateDirectional(directional)
    ).decimals(3);

    rotation.add(directional.rotation, 'z').onChange(() =>
      this.main.updateDirectional(directional)
    ).decimals(3);

    const shadowFolder = directionalFolder.addFolder('Shadow').close();
    const cameraFolder = shadowFolder.addFolder('Camera').close();

    cameraFolder.add(directional.shadow.camera, 'top').onChange(() =>
      this.main.updateDirectional(directional)
    ).decimals(3);

    cameraFolder.add(directional.shadow.camera, 'right').onChange(() =>
      this.main.updateDirectional(directional)
    ).decimals(3);

    cameraFolder.add(directional.shadow.camera, 'bottom').onChange(() =>
      this.main.updateDirectional(directional)
    ).decimals(3);

    cameraFolder.add(directional.shadow.camera, 'left').onChange(() =>
      this.main.updateDirectional(directional)
    ).decimals(3);

    cameraFolder.add(directional.shadow.camera, 'near').onChange(() =>
      this.main.updateDirectional(directional)
    ).decimals(3);

    cameraFolder.add(directional.shadow.camera, 'far').onChange(() =>
      this.main.updateDirectional(directional)
    ).decimals(3);

    const mapSize = shadowFolder.addFolder('Map Size').close();

    mapSize.add(directional.shadow.mapSize, 'x').onChange(() =>
      this.main.updateDirectional(directional)
    ).decimals(3);

    mapSize.add(directional.shadow.mapSize, 'y').onChange(() =>
      this.main.updateDirectional(directional)
    ).decimals(3);
  }

  private createFogControls (): void {
    const fog = { ...Config.Fog };
    const fogFolder = this.gui.addFolder('Fog').close();

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

  public update (camera: Vector3, target: Vector3): void {
    this.cameraPosition.copy(camera);
    this.cameraTarget.copy(target);
  }

  public dispose (): void {
    this.gui.destroy();
  }
}
