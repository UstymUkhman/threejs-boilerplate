jest.mock('@three/renderers/WebGLRenderer');
import Playground from '@/Playground';

describe('Playground', () => {
  it('Importing Playground', () => {
    expect(Playground).toBeDefined();
  });

  it('Creating Playground', () => {
    const playground = new Playground();
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

  it('Rendering Playground', () => {
    const playground = new Playground();
    const _render = jest.fn();

    playground.render();
    _render();

    expect(_render).toHaveBeenCalled();
  });

  it('Resizing Playground', () => {
    const playground = new Playground();
    const _onResize = jest.fn();

    playground.onResize();
    _onResize();

    expect(_onResize).toHaveBeenCalled();
  });

  it('Destroy Playground', () => {
    const playground = new Playground();
    const _destroy = jest.fn();

    playground.destroy();
    _destroy();

    expect(_destroy).toHaveBeenCalled();
  });
});
