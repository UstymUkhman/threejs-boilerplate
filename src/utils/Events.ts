type Callback = (event: Event) => unknown;

class Event extends CustomEvent<unknown> {
  public data?: unknown;
}

class EventEmitter
{
  private readonly target = new EventTarget();
  private readonly events: Map<string, Event> = new Map();
  private readonly callbacks: Map<string, Callback[]> = new Map();

  public add (name: string, callback: Callback): void {
    const callbacks = this.callbacks.get(name);

    callbacks
      ? callbacks.push(callback)
      : this.callbacks.set(name, [callback]);

    this.events.set(name, new Event(name));
    this.target.addEventListener(name, callback as EventListener, false);
  }

  public dispatch (name: string, data?: unknown): void {
    const event = this.events.get(name);
    if (!event) return;

    event.data = data;
    this.target.dispatchEvent(event);
  }

  public remove (name: string, callback?: Callback): void {
    const callbacks = this.callbacks.get(name);

    if (callbacks && callback) {
      const index = callbacks.indexOf(callback);
      const listener = callback as EventListener;

      index !== -1 && callbacks.splice(index, 1.0);
      this.target.removeEventListener(name, listener, false);
    }

    if (!callback) {
      callbacks?.forEach(callback =>
        this.target.removeEventListener(name, callback as EventListener, false)
      );

      this.callbacks.delete(name);
      this.events.delete(name);
    }
  }

  public dispose (): void {
    this.callbacks.clear();
    this.events.clear();
  }
}

const Emitter = new EventEmitter();
export { Event, Emitter };
