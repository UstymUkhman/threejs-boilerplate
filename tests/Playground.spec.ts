import Playground from '@/Playground';
import { describe, test, expect, vi } from 'vitest';

vi.mock('three/src/renderers/WebGLRenderer');

describe('Playground', () => {
  const playground = new Playground();
  const playgroundPrototype = Object.getPrototypeOf(playground);

  test('Create', () => {
    expect(Playground).toBeDefined();
    expect(playground).toBeInstanceOf(Playground);
  });

  test('createScene', () => {
    const createScene = vi.fn(playgroundPrototype.createScene.bind(playground));
    createScene();
    expect(createScene).toHaveReturnedWith(undefined);
  });

  test('createCamera', () => {
    const createCamera = vi.fn(playgroundPrototype.createCamera.bind(playground));
    createCamera();
    expect(createCamera).toHaveReturnedWith(undefined);
  });

  test('createLights', () => {
    const createLights = vi.fn(playgroundPrototype.createLights.bind(playground));
    createLights();
    expect(createLights).toHaveReturnedWith(undefined);
  });

  test('createGround', () => {
    const createGround = vi.fn(playgroundPrototype.createGround.bind(playground));
    createGround();
    expect(createGround).toHaveReturnedWith(undefined);
  });

  test('createRenderer', () => {
    const createRenderer = vi.fn(playgroundPrototype.createRenderer.bind(playground));
    createRenderer();
    expect(createRenderer).toHaveReturnedWith(undefined);
  });

  test('createControls', () => {
    const createControls = vi.fn(playgroundPrototype.createControls.bind(playground));
    createControls();
    expect(createControls).toHaveReturnedWith(undefined);
  });

  test('createStats', () => {
    const createStats = vi.fn(playgroundPrototype.createStats.bind(playground));
    createStats();
    expect(createStats).toHaveReturnedWith(undefined);
  });

  test('resize', () => {
    const resize = vi.fn(playgroundPrototype.resize.bind(playground));
    resize();
    expect(resize).toHaveReturnedWith(undefined);
  });

  test('render', () => {
    const render = vi.fn(playground.render.bind(playground));
    render();
    expect(render).toHaveReturnedWith(undefined);
  });

  test('destroy', () => {
    const destroy = vi.fn(playground.destroy.bind(playground));
    destroy();
    expect(destroy).toHaveReturnedWith(undefined);
  });

  test('domElement', () => {
    expect(playground.domElement.tagName).toStrictEqual('CANVAS');
  });
});
