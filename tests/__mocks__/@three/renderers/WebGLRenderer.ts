const setPixelRatio = jest.fn();
const setSize = jest.fn();
const dispose = jest.fn();
const render = jest.fn();

const WebGLRenderer = jest.fn().mockImplementation(() => {
  const canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');

  return {
    shadowMap: { enabled: false },
    setPixelRatio: setPixelRatio,
    domElement: canvas,
    setSize: setSize,
    dispose: dispose,
    render: render
  };
});

export {
  WebGLRenderer,
  setPixelRatio,
  render
};
