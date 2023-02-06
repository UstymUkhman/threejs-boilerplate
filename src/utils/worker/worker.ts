export const worker: Worker = self as never;

worker.onerror = error => console.error(error);

worker.onmessage = message => {
  const { event, params } = message.data;

  console.info('Worker Event:', event);
  console.table(params);

  worker.postMessage({
    response: params,
    name: event
  });
};
