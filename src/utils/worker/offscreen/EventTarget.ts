import { Event, EventDispatcher } from 'three/src/core/EventDispatcher';

type Styles = Record<string, unknown>;

type ClientRect = {
  type  ?: string,
  width  : number,
  height : number,

  bottom : number,
  right  : number,
  left   : number,
  top    : number
};

export default class EventTarget extends EventDispatcher
{
  private top = 0.0;
  private left = 0.0;
  private width = 0.0;
  private height = 0.0;

  private readonly styleRules: Styles = {};
  private readonly noop = () => void 0;
  public readonly focus = this.noop;

  public constructor () {
    super();
  }

  private setBoundingClientRect (event: Event): void {
    this.height = event.height;
    this.width = event.width;
    this.left = event.left;
    this.top = event.top;
  }

  public getBoundingClientRect (): ClientRect {
    const bottom = this.top + this.height;
    const right = this.left + this.width;

    return {
      left: this.left, bottom,
      top: this.top, right,
      height: this.height,
      width: this.width
    };
  }

  public handleEvent (event: Event): void {
    if (event.type === 'size') {
      return this.setBoundingClientRect(event);
    }

    event.stopPropagation = this.noop;
    event.preventDefault = this.noop;
    this.dispatchEvent(event);
  }

  public get clientHeight (): number {
    return this.height;
  }

  public get clientWidth (): number {
    return this.width;
  }

  public get style (): Styles {
    return this.styleRules;
  }
}
