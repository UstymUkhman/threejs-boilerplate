import type Worker from '@/utils/worker';
import type { EventCallback } from './EventHandlers';

type Handler = (event: Event, data: EventCallback) => void;
type EventHandlers = Record<string, Handler>;

export default class EventsProxy
{
  private proxyId = 0;
  public readonly id = this.proxyId++;

  public constructor (
    private readonly element: HTMLCanvasElement,
    private readonly worker: Worker,
    handlers: EventHandlers
  ) {
    const eventHandlers = Object.entries(handlers);
    const { clientWidth, clientHeight } = this.element;

    this.worker.post('setEventTarget', { id: this.id });
    this.sendSizeEvent(clientWidth, clientHeight);

    for (const [event, handler] of eventHandlers) {
      this.element.addEventListener(event, event =>
        handler(event, this.sendEvent.bind(this))
      );
    }
  }

  private sendEvent (event: unknown): void {
    this.worker.post('handleEvent', {
      id: this.id, event
    });
  }

  public sendSizeEvent (width: number, height: number): void {
    const rect = this.element.getBoundingClientRect();

    this.sendEvent({
      top: rect.top, left: rect.left,
      type: 'size', width, height
    });
  }
}
