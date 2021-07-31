import Playground from '@/Playground';
import Viewport from '@/utils/Viewport';

export const initialize = (scene: HTMLCanvasElement, pixelRatio: number): void => {
  const playground = new Playground(scene, pixelRatio);

  playground.createControls();

  playground.createStats(stats =>
    document.body.appendChild(stats)
  );

  Viewport.addResizeCallback((width: number, height: number, ratio: number): void => {
    playground.resize(width, height, ratio);

    scene.height = height;
    scene.width = width;
  });
};
