// import Playground from '@/Playground';

// export default new Playground();

// import wasmBuffer from './bin/optimized.wasm';

// const binary = new Uint8Array(wasmBuffer);
// const wasmModule = new WebAssembly.Module(binary);

// const memory = new WebAssembly.Memory({ initial: 256, maximum: 256 });
// const instance = new WebAssembly.Instance(wasmModule, { env: { memory } })
//   .exports;

// async function handleRequest() {
//   return new Response(String((instance as any).fib(12)));
// }

// addEventListener('fetch', (event: any) => {
//   event.respondWith(handleRequest());
// });

// function start(wasmBuffer: typeof import('optimized.wasm')) {
//   console.log("All modules loaded");
//   // wasmBuffer.add(1 + 2);

//   const binary = new Uint8Array(wasmBuffer);
//   const wasmModule = new WebAssembly.Module(binary);

//   const memory = new WebAssembly.Memory({ initial: 256, maximum: 256 });
//   const instance = new WebAssembly.Instance(wasmModule, { env: { memory } })
//     .exports;
// }

// async function load() {
//   start(await import('optimized.wasm'));
// }

// load();

(async () => {
  const importObject = {
    env: {
      abort(_msg: any, _file: any, line: any, column: any) {
        console.log(_msg);
        console.log(_file);
        console.log(line);
        console.log(column);
        console.error("abort called at index.ts:" + line + ":" + column);
      }
    },

    module: {
      log: (message: string) => console.log(message)
    }
  };
  const module = await WebAssembly.instantiateStreaming(
    fetch('/bin/optimized.wasm'), importObject
  );

  const mod = module.instance.exports;
  console.log((mod as any).fact(12));
})();
