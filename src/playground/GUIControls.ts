import type { Color as ThreeColor } from 'three/src/math/Color';
import { Fog } from 'three/src/scenes/Fog';
import type MainScene from './MainScene';
import { Color } from '@/utils/Color';
import GUI from 'lil-gui';

export default class GUIControls
{
  private readonly gui = new GUI({ width: 245, injectStyles: true });

  public constructor (private readonly main: MainScene) {
    const scene = {
      color: Color.FOG,
      fog: true
    };

    const sceneFolder = this.gui.addFolder('Scene');

    sceneFolder.addColor(scene, 'color').name('Background').onChange((color: number) => {
      (this.main.scene.background as ThreeColor).set(color);
      this.main.scene.fog?.color.set(color);
    });

    sceneFolder.add(scene, 'fog').name('Fog').onChange((enabled: boolean) =>
      this.main.scene.fog = enabled ? new Fog(scene.color, 100, 250) : null
    );
  }

  public dispose (): void {
    this.gui.destroy();
  }
}
