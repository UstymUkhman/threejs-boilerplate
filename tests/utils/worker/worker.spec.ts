import Worker from '@/utils/worker';

describe('Worker', () => {
  const worker = new Worker();

  test('Create', () => {
    expect(worker).toBeInstanceOf(Worker);
  });

  test('add', () => {
    const add = jest.fn(worker.add.bind(worker, 'message', () => null));
    add();
    expect(add).toHaveReturnedWith(undefined);
  });

  test('get', () => {
    const get = jest.fn(worker.get.bind(worker, 'message'));
    get();
    expect(get).toHaveReturnedWith(undefined);
  });

  test('onMessage', () => {
    const event = new MessageEvent('error', {
      data: { name: 'message', response: null }
    });

    const workerPrototype = Object.getPrototypeOf(worker);
    const onMessage = jest.fn(workerPrototype.onMessage.bind(workerPrototype, event));

    onMessage(event);
    expect(onMessage).toHaveReturnedWith(undefined);
  });

  test('onError', () => {
    const event = new MessageEvent('error');
    const workerPrototype = Object.getPrototypeOf(worker);
    const onError = jest.fn(workerPrototype.onError.bind(workerPrototype, event));

    onError(event);
    expect(onError).toHaveReturnedWith(undefined);
  });

  test('remove', () => {
    const remove = jest.fn(worker.remove.bind(worker));
    remove('message');
    expect(remove).toHaveReturnedWith(undefined);
  });
});
