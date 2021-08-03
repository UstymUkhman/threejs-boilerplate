jest.mock('three/src/renderers/WebGLRenderer');
import Playground from '@/Playground';

describe('Playground', () => {
  const playground = new Playground(document.createElement('canvas'));
  const playgroundPrototype = Object.getPrototypeOf(playground);

  test('Create', () => {
    expect(Playground).toBeDefined();
    expect(playground).toBeInstanceOf(Playground);
  });

  test('createScene', () => {
    const createScene = jest.fn(playgroundPrototype.createScene.bind(playground));
    createScene();
    expect(createScene).toHaveReturnedWith(undefined);
  });

  test('createCamera', () => {
    const createCamera = jest.fn(playgroundPrototype.createCamera.bind(playground));
    createCamera();
    expect(createCamera).toHaveReturnedWith(undefined);
  });

  test('createLights', () => {
    const createLights = jest.fn(playgroundPrototype.createLights.bind(playground));
    createLights();
    expect(createLights).toHaveReturnedWith(undefined);
  });

  test('createGround', () => {
    const createGround = jest.fn(playgroundPrototype.createGround.bind(playground));
    createGround();
    expect(createGround).toHaveReturnedWith(undefined);
  });

  test('createRenderer', () => {
    const createRenderer = jest.fn(playgroundPrototype.createRenderer.bind(playground));
    createRenderer();
    expect(createRenderer).toHaveReturnedWith(undefined);
  });

  test('render', () => {
    const render = jest.fn(playgroundPrototype.render.bind(playground));
    render();
    expect(render).toHaveReturnedWith(undefined);
  });

  test('createControls', () => {
    const createControls = jest.fn(playground.createControls.bind(playground));
    createControls();
    expect(createControls).toHaveReturnedWith(undefined);
  });

  test('resize', () => {
    const ratio = window.innerWidth / window.innerHeight;
    const resize = jest.fn(playground.resize.bind(playground));

    resize(window.innerWidth, window.innerHeight, ratio);
    expect(resize).toHaveReturnedWith(undefined);
  });

  test('destroy', () => {
    const destroy = jest.fn(playground.destroy.bind(playground));
    destroy();
    expect(destroy).toHaveReturnedWith(undefined);
  });
});
