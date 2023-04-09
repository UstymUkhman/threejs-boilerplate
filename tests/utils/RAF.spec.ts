import RAF from '@/utils/RAF';
import { describe, test, expect, vi } from 'vitest';

describe('RAF', () => {
  const call = () => void 0;

  test('Defined', () => {
    expect(RAF).toBeDefined();
  });

  test('add', () => {
    const add = vi.fn(RAF.add.bind(RAF, call));
    add();
    expect(add).toHaveReturnedWith(undefined);

    add();
    expect(add).toHaveReturnedWith(undefined);
  });

  test('update', () => {
    const RAFPrototype = Object.getPrototypeOf(RAF);
    const update = vi.fn(RAFPrototype.update.bind(RAF));

    update();
    expect(update).toHaveReturnedWith(undefined);
  });

  test('remove', () => {
    const remove = vi.fn(RAF.remove.bind(RAF, call));
    remove();
    expect(remove).toHaveReturnedWith(undefined);
  });

  test('dispose', () => {
    const dispose = vi.fn(RAF.dispose.bind(RAF));
    dispose();
    expect(dispose).toHaveReturnedWith(undefined);
  });

  test('pause', () => {
    RAF.pause = true;
    expect(RAF.pause).toStrictEqual(undefined);

    RAF.pause = false;
    expect(RAF.pause).toStrictEqual(undefined);

    RAF.pause = true;
    expect(RAF.pause).toStrictEqual(undefined);
  });
});
