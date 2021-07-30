import App from '@/App.svelte';
import Viewport from '@/utils/Viewport';

const pixelRatio = window.devicePixelRatio || 1.0;
const root = document.getElementById('root') as Element;
const scene = root.firstElementChild as HTMLCanvasElement;
const offscreenCanvas = 'transferControlToOffscreen' in scene;

scene.height = Viewport.size.height;
scene.width = Viewport.size.width;

!offscreenCanvas
  ? import('@/Playground').then(Playground => {
    const playground = new Playground.default(scene, pixelRatio);
    playground.createControls();

    playground.createStats(stats =>
      document.body.appendChild(stats)
    );

    Viewport.addResizeCallback((width: number, height: number, ratio: number): void => {
      playground.resize(width, height, ratio);

      scene.height = height;
      scene.width = width;
    });
  })

  : import('@/offscreen').then(offscreen =>
    offscreen.initialize(scene, pixelRatio)
  );

export default new App({ target: root });
