import { Direction } from '@/utils/Direction';
import { describe, test, expect } from 'vitest';
import { Vector3 } from 'three/src/math/Vector3';

describe('Direction', () => {
  test('UP', () => expect(Direction.UP).toStrictEqual(new Vector3(0, 1, 0)));
  test('RIGHT', () => expect(Direction.RIGHT).toStrictEqual(new Vector3(1, 0, 0)));

  test('FORWARD', () => expect(Direction.FORWARD).toStrictEqual(new Vector3(0, 0, 1)));
  test('BACKWARD', () => expect(Direction.BACKWARD).toStrictEqual(new Vector3(0, 0, -1)));

  test('LEFT', () => expect(Direction.LEFT).toStrictEqual(new Vector3(-1, 0, 0)));
  test('DOWN', () => expect(Direction.DOWN).toStrictEqual(new Vector3(0, -1, 0)));
});
