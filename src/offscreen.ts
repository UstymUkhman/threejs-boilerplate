import Worker from '@/utils/worker';
import Viewport from '@/utils/Viewport';

import EventsProxy from '@/utils/worker/offscreen/EventsProxy';
import * as EventHandlers from '@/utils/worker/offscreen/EventHandlers';

export const initialize = (scene: HTMLCanvasElement, pixelRatio: number): void => {
  const worker = new Worker();

  const proxy = new EventsProxy(scene, worker, {
    contextmenu: EventHandlers.preventDefault,
    keydown: EventHandlers.onKeydownEvent,
    wheel: EventHandlers.onWheelEvent,

    touchstart: EventHandlers.onTouchEvent,
    touchmove: EventHandlers.onTouchEvent,
    touchend: EventHandlers.onTouchEvent,

    pointerdown: EventHandlers.onMouseEvent,
    pointermove: EventHandlers.onMouseEvent,
    pointerup: EventHandlers.onMouseEvent,

    mousedown: EventHandlers.onMouseEvent,
    mousemove: EventHandlers.onMouseEvent,
    mouseup: EventHandlers.onMouseEvent
  });

  Viewport.addResizeCallback((width: number, height: number, ratio: number): void => {
    worker.post('resize', { width, height, ratio });
    proxy.sendSizeEvent(width, height);
  });

  worker.transfer(scene.transferControlToOffscreen(), {
    elementId: proxy.id, pixelRatio
  });
};
