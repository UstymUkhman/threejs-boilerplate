import { AsBind } from 'as-bind/dist/as-bind.esm';

export default (async (): Promise<unknown> => {
  return (
    await AsBind.instantiate(fetch('/bin/optimized.wasm'), {
      index: {
        log: (message: string): void => console.log(message)
      },

      env: {
        memory: new WebAssembly.Memory({ initial: 256, maximum: 512 })
      }
    })
  ).exports;
})();