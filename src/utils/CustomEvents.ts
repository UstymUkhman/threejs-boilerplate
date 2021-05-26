type Callback = (event: Event) => void;
type Callbacks = Map<string, Callback>;
type Events = Map<string, Event>;

export class Event extends CustomEvent<unknown> {
  public data: unknown = null;
}

export class CustomEvents
{
  private static readonly events: Events = new Map();
  private static readonly callbacks: Callbacks = new Map();

  public static add (name: string, callback: Callback): void {
    this.callbacks.set(name, callback);
    this.events.set(name, new Event(name));
    document.addEventListener(name, callback as EventListener, false);
  }

  public static dispatch (name: string, data: unknown = null): void {
    const event = this.events.get(name);

    if (event) {
      event.data = data;
      document.dispatchEvent(event);
    }
  }

  public static remove (name: string): void {
    const callback = this.callbacks.get(name) as EventListener;
    document.removeEventListener(name, callback, false);

    this.callbacks.delete(name);
    this.events.delete(name);
  }

  public static dispose (): void {
    this.callbacks.clear();
    this.events.clear();
  }
}
