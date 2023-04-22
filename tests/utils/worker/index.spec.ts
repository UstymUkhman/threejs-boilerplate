import '@vitest/web-worker';
import Worker from '@/utils/worker';
import { describe, test, expect, vi } from 'vitest';

type EventParams = Record<string, unknown>;
type Callback = (data: unknown) => void;

interface PublicWorker {
  add(event: string, callback: Callback, params?: EventParams): void;
  post (event: string, params?: EventParams): void;
  onMessage(event: MessageEvent): void;
  remove (event: string): void;
  dispose(): void;
}

describe('Worker', () => {
  const worker = new Worker() as unknown as PublicWorker;

  test('Defined', () => {
    expect(worker).toBeInstanceOf(Worker);
  });

  test('add', () => {
    const add = worker.add('event', vi.fn);
    expect(add).toStrictEqual(undefined);
  });

  test('post', () => {
    const post = worker.post('event');
    expect(post).toStrictEqual(undefined);
  });

  test('onMessage', () => {
    const event = new MessageEvent('message', {
      data: { name: 'event', response: null }
    });

    const callback = vi.fn();
    worker.add('event', callback);

    worker.onMessage(event);
    expect(callback).toHaveBeenCalledWith(null);
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
