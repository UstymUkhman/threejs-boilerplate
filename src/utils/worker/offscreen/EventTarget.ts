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

  private readonly noop = (): void => void 0;
  private readonly styleRules: Styles = {};
  public readonly focus = this.noop;

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public readonly setPointerCapture = (pointerId: number): void => void 0;
  public readonly releasePointerCapture = (pointerId: number): void => void 0;
  /* eslint-enable @typescript-eslint/no-unused-vars */

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
