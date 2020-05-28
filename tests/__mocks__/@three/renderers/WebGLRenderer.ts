const setPixelRatio = jest.fn();
const setSize = jest.fn();
const dispose = jest.fn();
const render = jest.fn();

// tslint:disable-next-line: space-within-parens
const WebGLRenderer = jest.fn().mockImplementation(() => {
  const canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');

  return {
    shadowMap: { enabled: false },
    domElement: canvas,
    setPixelRatio,
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
