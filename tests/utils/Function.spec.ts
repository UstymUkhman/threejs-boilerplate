import { debounce, throttle } from '@/utils/Function';
import { describe, beforeEach, afterEach, test, expect, vi } from 'vitest';

describe('Function', () => {
  const callback = vi.fn();

  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.restoreAllMocks(); });

  test('debounce', () => {
    let debounced = vi.fn(debounce(callback, 500));

    debounced();
    debounced();

    expect(callback).toHaveBeenCalledOnce();
    vi.advanceTimersByTime(600);

    expect(callback).toHaveBeenCalledOnce();
    debounced = vi.fn(debounce(callback, 500, false));

    debounced();
    debounced();
    debounced();

    expect(callback).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('throttle', () => {
    callback.mockClear();
    let throttled = vi.fn(throttle(callback, 500));

    throttled();
    throttled();
    throttled();

    expect(callback).toHaveBeenCalledOnce();

    callback.mockClear();
    throttled = vi.fn(throttle(callback, Infinity));

    throttled();
    throttled();
    throttled();

    expect(callback).toHaveBeenCalledOnce();

    vi.advanceTimersByTime(600);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
