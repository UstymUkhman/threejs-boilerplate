jest.mock('three/src/renderers/WebGLRenderer');
import Playground from '@/Playground';

describe('Playground', () => {
  const playground = new Playground();

  it('Import', () => {
    expect(Playground).toBeDefined();
  });

  it('Create', () => {
    expect(playground).toBeInstanceOf(Playground);

    const _setSize = jest.fn();
    const _createScene = jest.fn();
    const _createCamera = jest.fn();
    const _createLights = jest.fn();
    const _createGround = jest.fn();

    const _createRenderer = jest.fn();
    const _createControls = jest.fn();
    const _createEvents = jest.fn();
    const _createStats = jest.fn();

    _setSize();
    _createScene();
    _createCamera();
    _createLights();
    _createGround();

    _createRenderer();
    _createControls();
    _createEvents();
    _createStats();

    expect(_setSize).toHaveBeenCalled();
    expect(_createScene).toHaveBeenCalled();
    expect(_createCamera).toHaveBeenCalled();
    expect(_createLights).toHaveBeenCalled();
    expect(_createGround).toHaveBeenCalled();

    expect(_createRenderer).toHaveBeenCalled();
    expect(_createControls).toHaveBeenCalled();
    expect(_createEvents).toHaveBeenCalled();
    expect(_createStats).toHaveBeenCalled();
  });

  it('Render', () => {
    const _render = jest.fn();

    playground.render();
    _render();

    expect(_render).toHaveBeenCalled();
  });

  it('Resize', () => {
    const _onResize = jest.fn();
    const _setSize = jest.fn();

    playground.onResize();

    _onResize();
    _setSize();

    expect(_onResize).toHaveBeenCalled();
    expect(_setSize).toHaveBeenCalled();
  });

  it('DOM Element', () => {
    expect(playground.domElement.tagName).toStrictEqual('CANVAS');
  });

  it('Destroy', () => {
    const _destroy = jest.fn();

    playground.destroy();
    _destroy();

    expect(_destroy).toHaveBeenCalled();
  });
});
