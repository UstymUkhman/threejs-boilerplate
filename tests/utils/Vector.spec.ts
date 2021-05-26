import { Vector3 } from 'three/src/math/Vector3';
import { Vector } from '@/utils/Vector';

describe('Vector', () => {
  test('UP', () => {
    expect(Vector.UP).toStrictEqual(new Vector3(0, 1, 0));
  });

  test('DOWN', () => {
    expect(Vector.DOWN).toStrictEqual(new Vector3(0, -1, 0));
  });

  test('RIGHT', () => {
    expect(Vector.RIGHT).toStrictEqual(new Vector3(1, 0, 0));
  });

  test('LEFT', () => {
    expect(Vector.LEFT).toStrictEqual(new Vector3(-1, 0, 0));
  });

  test('FORWARD', () => {
    expect(Vector.FORWARD).toStrictEqual(new Vector3(0, 0, 1));
  });

  test('BACKWARD', () => {
    expect(Vector.BACKWARD).toStrictEqual(new Vector3(0, 0, -1));
  });

  test('near', () => {
    const p = new Vector3(0, 0, 0);
    const c = new Vector3(1, 0, 1);

    expect(Vector.near(p, c)).toStrictEqual(false);
    expect(Vector.near(p, c, 2)).toStrictEqual(true);
    expect(Vector.near(c, p)).toStrictEqual(false);
  });

  test('random', () => {
    const randomVector = Vector.random();
    expect(randomVector.x).toBeLessThan(1);
    expect(randomVector.x).toBeGreaterThanOrEqual(-1);

    expect(randomVector.y).toBeLessThan(1);
    expect(randomVector.y).toBeGreaterThanOrEqual(-1);

    expect(randomVector.z).toBeLessThan(1);
    expect(randomVector.z).toBeGreaterThanOrEqual(-1);
  });
});
