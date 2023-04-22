import { describe, test, expect, vi } from 'vitest';
import { Vector3 } from 'three/src/math/Vector3';
import GUIControls from '@/sandbox/GUIControls';
vi.mock('three/src/renderers/WebGLRenderer');
import type { Controller } from 'lil-gui';
import Sandbox from '@/sandbox';
import GUI from 'lil-gui';

interface PublicGUIControls {
  update(camera: Vector3, target: Vector3): void;
  readonly cameraPosition: Vector3;
  readonly cameraTarget: Vector3;
  readonly gui: GUI;
  dispose(): void;
}

describe('GUIControls', () => {
  const guiControls = new GUIControls(new Sandbox()) as unknown as PublicGUIControls;

  const testChildren = (children: Controller[]) => children.forEach(child =>
    expect(child._onChange()).toStrictEqual(undefined)
  );

  test('Defined', () => {
    expect(guiControls).toBeDefined();
    expect(guiControls).toBeInstanceOf(GUIControls);
  });

  test('update', () => {
    const camera = new Vector3().random();
    const target = new Vector3().random();

    guiControls.update(camera, target);

    expect(guiControls.cameraPosition.equals(camera)).toStrictEqual(true);
    expect(guiControls.cameraTarget.equals(target)).toStrictEqual(true);
  });

  test('updateSceneControls', () => {
    const sceneFolder = guiControls.gui.children[0] as GUI;
    testChildren(sceneFolder.children as Controller[]);
  });

  test('updateCameraControls', () => {
    const cameraFolder = guiControls.gui.children[1] as GUI;

    cameraFolder.children.forEach(child =>
      child instanceof GUI
        ? testChildren(child.children as Controller[])
        : expect(child._onChange()).toStrictEqual(undefined)
    );
  });

  test('createLightsControls', () => {
    const lightsFolder = guiControls.gui.children[2] as GUI;

    lightsFolder.children.forEach(light =>
      (light as GUI).children.forEach(child =>
        child instanceof GUI
          ? child.children.forEach(child =>
            child instanceof GUI
              ? testChildren(child.children as Controller[])
              : expect(child._onChange()).toStrictEqual(undefined)
          )
          : expect(child._onChange()).toStrictEqual(undefined)
      )
    );
  });

  test('updateGroundControls', () => {
    const groundFolder = guiControls.gui.children[3] as GUI;
    testChildren(groundFolder.children as Controller[]);
  });

  test('updateFogControls', () => {
    const fogFolder = guiControls.gui.children[4] as GUI;
    testChildren(fogFolder.children as Controller[]);
  });

  test('dispose', () => {
    const dispose = vi.fn(guiControls.dispose.bind(guiControls));
    dispose();
    expect(dispose).toHaveReturnedWith(undefined);
  });
});
