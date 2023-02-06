type Callback = (
  width: number,
  height: number,
  ratio: number
) => void;

type Size = {
  width: number,
  height: number,
  ratio: number
};

class Viewport
{
  private width = window.innerWidth;
  private height = window.innerHeight;
  private ratio = this.width / this.height;

  private readonly callbacks: Array<Callback> = [];
  private readonly update = this.updateSize.bind(this);
  private readonly root = document.documentElement.style;

  public constructor () {
    window.addEventListener('resize', this.update, false);
    this.updateSize();
  }

  public addResizeCallback (callback: Callback) {
    const index = this.callbacks.indexOf(callback);
    index === -1 && this.callbacks.push(callback);
  }

  public removeResizeCallback (callback: Callback) {
    const index = this.callbacks.indexOf(callback);
    index !== -1 && this.callbacks.splice(index, 1);
  }

  private updateSize () {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.ratio = this.width / this.height;

    this.root.setProperty('--ratio', `${this.ratio}`);
    this.root.setProperty('--width', `${this.width}px`);
    this.root.setProperty('--height', `${this.height}px`);

    for (let c = this.callbacks.length; c--;)
      this.callbacks[c](this.width, this.height, this.ratio);
  }

  public dispose () {
    window.removeEventListener('resize', this.update, false);
    this.callbacks.length = 0;
  }

  public get size (): Size {
    return {
      height: this.height,
      width: this.width,
      ratio: this.ratio
    };
  }
}

export default new Viewport();
