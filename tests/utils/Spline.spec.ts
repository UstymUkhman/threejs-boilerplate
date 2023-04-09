import Spline from '@/utils/Spline';
import { describe, test, expect, vi } from 'vitest';

describe('Spline', () => {
  const spline = new Spline();

  test('Defined', () => {
    expect(spline).toBeDefined();
    expect(spline).toBeInstanceOf(Spline);
  });

  test('addPoint', () => {
    const addPoint = vi.fn(spline.addPoint.bind(spline));

    addPoint(0, 0);
    expect(addPoint).toHaveReturnedWith(undefined);

    addPoint(1, 1);
    expect(addPoint).toHaveReturnedWith(undefined);
  });

  test('getValue', () => {
    const getValue = vi.fn(spline.getValue.bind(spline));

    getValue(0.0);
    expect(getValue).toHaveReturnedWith(0.0);

    getValue(0.5);
    expect(getValue).toHaveReturnedWith(0.5);

    getValue(1.5);
    expect(getValue).toHaveReturnedWith(1.0);
  });

  test('dispose', () => {
    const dispose = vi.fn(spline.dispose.bind(spline));
    dispose();
    expect(dispose).toHaveReturnedWith(undefined);
  });
});
