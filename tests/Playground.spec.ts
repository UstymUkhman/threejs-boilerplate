jest.mock('three/src/renderers/WebGLRenderer');
import Playground from '@/Playground';

describe('Playground', () => {
  const playground = new Playground();
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

  test('createControls', () => {
    const createControls = jest.fn(playgroundPrototype.createControls.bind(playground));
    createControls();
    expect(createControls).toHaveReturnedWith(undefined);
  });

  test('createStats', () => {
    const createStats = jest.fn(playgroundPrototype.createStats.bind(playground));
    createStats();
    expect(createStats).toHaveReturnedWith(undefined);
  });

  test('resize', () => {
    const resize = jest.fn(playgroundPrototype.resize.bind(playground));
    resize();
    expect(resize).toHaveReturnedWith(undefined);
  });

  it('render', () => {
    const render = jest.fn(playground.render.bind(playground));
    render();
    expect(render).toHaveReturnedWith(undefined);
  });

  test('destroy', () => {
    const destroy = jest.fn(playground.destroy.bind(playground));
    destroy();
    expect(destroy).toHaveReturnedWith(undefined);
  });

  test('domElement', () => {
    expect(playground.domElement.tagName).toStrictEqual('CANVAS');
  });
});
