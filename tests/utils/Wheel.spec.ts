import wheel from '@/utils/Wheel';
import { describe, test, expect, vi } from 'vitest';

describe('Wheel', () => {
  test('callback', () => {
    const wheelEvent = new WheelEvent('wheel');
    const wheelCallback = vi.fn(wheel.bind(null, wheelEvent));

    wheelCallback();

    expect(wheelCallback).toReturnWith({
      pixelX: 0.0, pixelY: 0.0,
      spinX: 0.0, spinY: 0.0
    });
  });
});
