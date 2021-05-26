declare module 'worker-loader!*' {
  class WebpackWorker extends Worker
  {
    public constructor();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public onmessage: (event: MessageEvent<any>) => void;

    public onerror: (error: ErrorEvent) => void;
  }

  export default WebpackWorker;
}
