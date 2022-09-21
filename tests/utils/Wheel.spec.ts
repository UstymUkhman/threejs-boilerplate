import wheel from '@/utils/Wheel';
import { describe, test, expect } from 'vitest';

type LegacyWheelEvent = WheelEvent & {
  wheelDeltaX?: number;
  wheelDeltaY?: number;
  wheelDelta?: number;
  HORIZONTAL_AXIS?: 1;
  VERTICAL_AXIS?: 2;
  axis?: 1 | 2;
}

describe('Wheel', () => {
  const wheelEvent = new WheelEvent('wheel') as LegacyWheelEvent;

  test('callback idle', () => {
    const position = wheel(wheelEvent);

    expect(position).toStrictEqual({
      pixelX: 0.0, pixelY: 0.0,
      spinX: 0.0, spinY: 0.0
    });
  });

  test('callback axis', () => {
    wheelEvent.axis = 1.0;
    wheelEvent.HORIZONTAL_AXIS = 1.0;
    const position = wheel(wheelEvent);

    expect(position).toStrictEqual({
      pixelX: 0.0, pixelY: 0.0,
      spinX: 0.0, spinY: 0.0
    });
  });

  test('callback detail', () => {
    const position = wheel({ ...wheelEvent, detail: 1.0 });

    expect(position.pixelX).toStrictEqual(10.0);
    expect(position.pixelY).toStrictEqual(0.0);
    expect(position.spinX).toStrictEqual(1.0);
    expect(position.spinY).toStrictEqual(0.0);
  });

  test('callback delta', () => {
    const position = wheel({
      ...wheelEvent,
      deltaX: 1.0,
      deltaY: 1.0
    });

    expect(position.pixelX).toStrictEqual(1.0);
    expect(position.pixelY).toStrictEqual(1.0);
    expect(position.spinX).toStrictEqual(1.0);
    expect(position.spinY).toStrictEqual(1.0);
  });

  test('callback delta', () => {
    const position = wheel({
      ...wheelEvent,
      deltaX: -1.0,
      deltaY: -1.0
    });

    expect(position.pixelX).toStrictEqual(-1.0);
    expect(position.pixelY).toStrictEqual(-1.0);
    expect(position.spinX).toStrictEqual(-1.0);
    expect(position.spinY).toStrictEqual(-1.0);
  });

  test('callback wheelDelta', () => {
    const delta = 1.0 / 12.0;
    wheelEvent.wheelDelta = 1.0;
    wheelEvent.wheelDeltaX = 1.0;
    wheelEvent.wheelDeltaY = 1.0;
    const position = wheel(wheelEvent);

    expect(position.pixelX).toBeCloseTo(-delta, 3);
    expect(position.pixelY).toStrictEqual(0.0);
    expect(position.spinX).toBeCloseTo(-delta * 0.1, 3);
    expect(position.spinY).toStrictEqual(0.0);
  });

  test('callback deltaMode = -1.0', () => {
    const position = wheel({
      ...wheelEvent,
      deltaX: 1.0,
      deltaY: 1.0,
      deltaMode: -1.0
    });

    expect(position.pixelX).toStrictEqual(800.0);
    expect(position.pixelY).toStrictEqual(800.0);
    expect(position.spinX).toBeCloseTo(-1.0 / 120.0, 3);
    expect(position.spinY).toStrictEqual(1.0);
  });

  test('callback deltaMode = 0.0', () => {
    const position = wheel({
      ...wheelEvent,
      deltaX: 1.0,
      deltaY: 1.0,
      deltaMode: 0.0
    });

    expect(position.pixelX).toStrictEqual(1.0);
    expect(position.pixelY).toStrictEqual(1.0);
    expect(position.spinX).toBeCloseTo(-1.0 / 120.0, 3);
    expect(position.spinY).toStrictEqual(1.0);
  });

  test('callback deltaMode = 1.0', () => {
    const position = wheel({
      ...wheelEvent,
      deltaX: 1.0,
      deltaY: 1.0,
      deltaMode: 1.0
    });

    expect(position.pixelX).toStrictEqual(40.0);
    expect(position.pixelY).toStrictEqual(40.0);
    expect(position.spinX).toBeCloseTo(-1.0 / 120.0);
    expect(position.spinY).toStrictEqual(1.0);
  });
});
