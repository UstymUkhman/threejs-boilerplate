import { describe, test, expect, vi } from 'vitest';
import { EventEmitter, Event } from '@/utils/EventEmitter';

describe('Event', () => {
  const event = new Event('event');
  const timestamp = Date.now();
  event.data = timestamp;

  test('Create', () => {
    expect(Event).toBeDefined();
    expect(event).toBeInstanceOf(Event);
    expect(event.data).toStrictEqual(timestamp);
  });
});

describe('EventEmitter', () => {
  const event = new Event('time');
  const timestamp = Date.now();
  event.data = timestamp;
  const cb = vi.fn();

  const callback = vi.fn((event: Event) => {
    expect(event).toStrictEqual(event);
    expect(event.data).toStrictEqual(timestamp);
  });

  test('Create', () => expect(EventEmitter).toBeDefined());

  test('add & dispatch', () => {
    EventEmitter.add('time', cb);
    EventEmitter.add('time', callback);
    EventEmitter.dispatch('time', timestamp);

    expect(callback).toHaveBeenCalledWith(event);
    expect(cb).toHaveBeenCalled();
  });

  test('remove', () => {
    vi.useFakeTimers();

    EventEmitter.remove('time', cb);
    EventEmitter.dispatch('time', timestamp);
    setTimeout(() => expect(cb).not.toHaveBeenCalled());

    EventEmitter.remove('time');
    EventEmitter.dispatch('time', timestamp);
    setTimeout(() => expect(callback).not.toHaveBeenCalled());

    vi.useRealTimers();
  });

  test('dispose', () => {
    const cb = vi.fn();
    EventEmitter.add('event', cb);
    EventEmitter.dispose();

    EventEmitter.dispatch('event');
    expect(cb).not.toHaveBeenCalled();
  });
});
