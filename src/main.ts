import App from '@/App.svelte';
import Viewport from '@/utils/Viewport';

const pixelRatio = window.devicePixelRatio || 1.0;
const root = document.getElementById('root') as Element;
const scene = root.firstElementChild as HTMLCanvasElement;

scene.height = Viewport.size.height;
scene.width = Viewport.size.width;

'transferControlToOffscreen' in scene
  ? import('@/offscreen').then(offscreen =>
    offscreen.initialize(scene, pixelRatio)
  )

  : import('@/onscreen').then(onscreen =>
    onscreen.initialize(scene, pixelRatio)
  );

export default new App({ target: root });
