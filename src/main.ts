import Playground from '@/Playground';

export default new Playground();

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
