import Playground from '../src/Playground';

test('Importing Playground', () => {
  expect(Playground).toBeDefined();
});

test('Creating Playground', () => {
  const playground = new Playground();
  expect(playground).toBeInstanceOf(Playground);

  expect(playground.setSize).toHaveBeenCalled();
  expect(playground.createScene).toHaveBeenCalled();
  expect(playground.createCamera).toHaveBeenCalled();
  expect(playground.createLights).toHaveBeenCalled();
  expect(playground.createGround).toHaveBeenCalled();

  expect(playground.createRenderer).toHaveBeenCalled();
  expect(playground.createControls).toHaveBeenCalled();
  expect(playground.createEvents).toHaveBeenCalled();
  expect(playground.createStats).toHaveBeenCalled();
});
