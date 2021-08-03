import { EventsManager, EventData } from './EventsManager';
import Playground from '@/Playground';

// Hack for three.js OrbitControls:
(self.document as unknown) = null;

class PlaygroundWorker
{
  private playground!: Playground;
  private events = new EventsManager();

  public takeControl (params: OffscreenParams): void {
    const target = this.events.getTarget(params.elementId);
    const canvas = params.element as unknown as HTMLCanvasElement;

    this.playground = new Playground(canvas, null, params.pixelRatio);
    this.playground.createControls(target as HTMLCanvasElement);
  }

  public setEventTarget (data: EventData): void {
    this.events.setTarget(data);
  }

  public handleEvent (data: EventData): void {
    this.events.handleEvent(data);
  }

  public resize (size: SizeParams): void {
    const { width, height, ratio } = size;
    this.playground.resize(width, height, ratio);
  }
}

export const PlaygroundManager = new PlaygroundWorker();

export type OffscreenParams = {
  element: OffscreenCanvas,
  pixelRatio: number,
  elementId: string
};

export type SizeParams = {
  height: number,
  width: number,
  ratio: number
};
