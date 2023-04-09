import '@vitest/web-worker';
import Worker from '@/utils/worker';
import { describe, test, expect, vi } from 'vitest';

describe('Worker', () => {
  const worker = new Worker();

  test('Defined', () => {
    expect(worker).toBeInstanceOf(Worker);
  });

  test('add', () => {
    const add = worker.add('event', vi.fn);
    expect(add).toStrictEqual(undefined);
  });

  test('get', () => {
    const get = worker.get('event');
    expect(get).toStrictEqual(undefined);
  });

  test('onMessage', () => {
    const event = new MessageEvent('message', {
      data: { name: 'message', response: null }
    });

    const workerPrototype = Object.getPrototypeOf(worker);
    const onMessage = vi.fn(workerPrototype.onMessage.bind(workerPrototype, event));

    onMessage(event);
    expect(onMessage).toHaveReturnedWith(undefined);
  });

  test('onError', () => {
    const event = new MessageEvent('error');
    const workerPrototype = Object.getPrototypeOf(worker);
    const onError = vi.fn(workerPrototype.onError.bind(workerPrototype, event));

    onError(event);
    expect(onError).toHaveReturnedWith(undefined);
  });

  test('remove', () => {
    const remove = vi.fn(worker.remove.bind(worker));
    remove('message');
    expect(remove).toHaveReturnedWith(undefined);
  });

  test('dispose', () => {
    const dispose = vi.fn(worker.dispose.bind(worker));
    dispose();
    expect(dispose).toHaveReturnedWith(undefined);
  });
});
