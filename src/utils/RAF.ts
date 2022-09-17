type Callback = (delta?: number) => void;

class RequestAnimationFrame
{
  private raf!: number;
  private paused = true;

  private readonly callbacks: Callback[] = [];
  private readonly onUpdate = this.update.bind(this);

  public add(callback: Callback): void {
    const index = this.callbacks.indexOf(callback);
    if (index === -1) this.callbacks.push(callback);
  }

  private update(delta?: number): void {
    for (let c = this.callbacks.length; c--; ) this.callbacks[c](delta);
    this.raf = requestAnimationFrame(this.onUpdate);
  }

  public remove(callback: Callback): void {
    const index = this.callbacks.indexOf(callback);
    if (index !== -1) this.callbacks.splice(index, 1);
  }

  public dispose(): void {
    cancelAnimationFrame(this.raf);
    this.callbacks.splice(0);
  }

  public set pause(paused: boolean) {
    if (this.paused === paused) return;

    ((this.paused = paused))
      ? cancelAnimationFrame(this.raf)
      : (this.raf = requestAnimationFrame(this.onUpdate));
  }
}

export default new RequestAnimationFrame();
