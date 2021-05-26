const setPixelRatio = jest.fn();
const setClearColor = jest.fn();

const setSize = jest.fn();
const dispose = jest.fn();
const render = jest.fn();

const WebGLRenderer = jest.fn().mockImplementation(() => {
  const canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');

  return {
    shadowMap: { enabled: false },
    domElement: canvas,
    setPixelRatio,
    setClearColor,
    setSize,
    dispose,
    render
  };
});

export {
  WebGLRenderer,
  setPixelRatio,
  render
};
