import type { Event } from 'three/src/core/EventDispatcher';
import EventTarget from './EventTarget';

export class EventsManager
{
  private readonly targets: Record<string, EventTarget> = {};

  public setTarget (data: EventData): void {
    this.targets[data.id] = new EventTarget();
  }

  public getTarget (id: string): HTMLElement {
    const target = this.targets[id];

    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (target as any).ownerDocument = target
    ) as unknown as HTMLElement;
  }

  public handleEvent (data: EventData): void {
    this.targets[data.id].handleEvent(data.event);
  }
}

export type EventData = {
  stopPropagation: () => void,
  preventDefault: () => void,

  event: Event,
  id: string
};
