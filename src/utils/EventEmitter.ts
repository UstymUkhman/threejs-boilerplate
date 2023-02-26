export class Event extends CustomEvent<unknown> {
  public data: unknown = null;
}

type Callback = (event: Event) => unknown;
type Callbacks = Map<string, Callback[]>;
type Events = Map<string, Event>;

export class EventEmitter
{
  private static readonly target = new EventTarget();
  private static readonly events: Events = new Map();
  private static readonly callbacks: Callbacks = new Map();

  public static add (name: string, callback: Callback): void {
    const callbacks = this.callbacks.get(name);

    callbacks
      ? callbacks.push(callback)
      : this.callbacks.set(name, [callback]);

    this.events.set(name, new Event(name));
    this.target.addEventListener(name, callback as EventListener, false);
  }

  public static dispatch (name: string, data: unknown = null): void {
    const event = this.events.get(name);

    if (event) {
      event.data = data;
      this.target.dispatchEvent(event);
    }
  }

  public static remove (name: string, callback?: Callback): void {
    const callbacks = this.callbacks.get(name);

    if (callbacks && callback) {
      const index = callbacks.indexOf(callback);
      const listener = callback as EventListener;

      if (index !== -1) callbacks.splice(index, 1.0);
      this.target.removeEventListener(name, listener, false);
    }

    !callback && callbacks?.forEach(callback =>
      this.target.removeEventListener(name, callback as EventListener, false)
    );

    if (!callbacks?.length) {
      this.callbacks.delete(name);
      this.events.delete(name);
    }
  }

  public static dispose (): void {
    this.callbacks.clear();
    this.events.clear();
  }
}
