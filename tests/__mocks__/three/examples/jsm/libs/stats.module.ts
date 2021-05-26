const showPanel = jest.fn();
const begin = jest.fn();
const end = jest.fn();

export default jest.fn().mockImplementation(() => {
  const canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');

  return {
    domElement: canvas,
    showPanel,
    begin,
    end
  };
});
