import Playground from '@/Playground';
import Viewport from '@/utils/Viewport';
import Stats from 'three/examples/jsm/libs/stats.module';

const createStats = (): Stats => {
  const stats = Stats();
  stats.showPanel(0);

  stats.domElement.id = 'stats';
  document.body.appendChild(stats.domElement);

  return stats;
};

export const initialize = (scene: HTMLCanvasElement, pixelRatio: number): void => {
  const playground = new Playground(scene, createStats(), pixelRatio);
  playground.createControls();

  Viewport.addResizeCallback((width: number, height: number, ratio: number): void => {
    playground.resize(width, height, ratio);

    scene.height = height;
    scene.width = width;
  });
};
