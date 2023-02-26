type Callback = (delta: number, time: number) => void;

class RAF
{
  private raf!: number;
  private paused = true;
  private lastTime = 0.0;

  private readonly callbacks: Callback[] = [];
  private readonly onUpdate = this.update.bind(this);

  public add(callback: Callback): void {
    const index = this.callbacks.indexOf(callback);
    index === -1 && this.callbacks.push(callback);
  }

  private update(time: number): void {
    this.raf = requestAnimationFrame(this.onUpdate);
    const delta = time - (this.lastTime || 0.0);

    for (let c = this.callbacks.length; c--; )
      this.callbacks[c](delta, time);

    this.lastTime = time;
  }

  public remove(callback: Callback): void {
    const index = this.callbacks.indexOf(callback);
    index !== -1 && this.callbacks.splice(index, 1);
  }

  public dispose(): void {
    cancelAnimationFrame(this.raf);
    this.callbacks.length = 0;
  }

  public set pause(paused: boolean) {
    if (this.paused !== paused)
      ((this.paused = paused))
        ? cancelAnimationFrame(this.raf)
        : (this.raf = requestAnimationFrame(this.onUpdate));
  }
}

export default new RAF();
