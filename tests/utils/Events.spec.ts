import { describe, test, expect, vi } from 'vitest';
import { Event, Emitter } from '@/utils/Events';

describe('Event', () => {
  const event = new Event('event');
  const timestamp = Date.now();
  event.data = timestamp;

  test('Defined', () => {
    expect(Event).toBeDefined();
    expect(event).toBeInstanceOf(Event);
    expect(event.data).toStrictEqual(timestamp);
  });
});

describe('Emitter', () => {
  const event = new Event('time');
  const timestamp = Date.now();
  event.data = timestamp;
  const cb = vi.fn();

  const callback = vi.fn((event: Event) => {
    expect(event).toStrictEqual(event);
    expect(event.data).toStrictEqual(timestamp);
  });

  test('Defined', () => expect(Emitter).toBeDefined());

  test('add & dispatch', () => {
    Emitter.add('time', cb);
    Emitter.add('time', callback);
    Emitter.dispatch('time', timestamp);

    expect(callback).toHaveBeenCalledWith(event);
    expect(cb).toHaveBeenCalled();
  });

  test('remove', () => {
    vi.useFakeTimers();

    Emitter.remove('time', cb);
    Emitter.dispatch('time', timestamp);
    setTimeout(() => expect(cb).not.toHaveBeenCalled());

    Emitter.remove('time');
    Emitter.dispatch('time', timestamp);
    setTimeout(() => expect(callback).not.toHaveBeenCalled());

    vi.useRealTimers();
  });

  test('dispose', () => {
    const cb = vi.fn();
    Emitter.add('event', cb);
    Emitter.dispose();

    Emitter.dispatch('event');
    expect(cb).not.toHaveBeenCalled();
  });
});
