import { Elastic } from '@/utils/Elastic';
import { describe, test, expect } from 'vitest';
import { Vector2 } from 'three/src/math/Vector2';
import { Vector3 } from 'three/src/math/Vector3';

describe('Elastic', () => {
  test('Number', () => {
    const elasticNumber = new Elastic.Number(1);
    expect(elasticNumber.value).toStrictEqual(1);

    elasticNumber.set(2);
    elasticNumber.update();
    expect(elasticNumber.value).toBeCloseTo(1.166);

    elasticNumber.update();
    expect(elasticNumber.value).toBeCloseTo(1.305);
  });

  test('Vector2', () => {
    const vector = new Vector2(1, 1);
    const elasticVector = new Elastic.Vector2(vector);

    elasticVector.copy(vector);
    expect(elasticVector.value).toStrictEqual(vector);

    elasticVector.set(2, 2);
    elasticVector.update();
    vector.setScalar(1.166);

    expect(elasticVector.x).toBeCloseTo(vector.x);
    expect(elasticVector.y).toBeCloseTo(vector.y);

    elasticVector.update();
    vector.setScalar(1.305);

    expect(elasticVector.x).toBeCloseTo(vector.x);
    expect(elasticVector.y).toBeCloseTo(vector.y);
  });

  test('Vector3', () => {
    const vector = new Vector3(1, 1, 1);
    const elasticVector = new Elastic.Vector3(vector);

    elasticVector.copy(vector);
    expect(elasticVector.value).toStrictEqual(vector);

    elasticVector.set(2, 2, 2);
    elasticVector.update();
    vector.setScalar(1.166);

    expect(elasticVector.x).toBeCloseTo(vector.x);
    expect(elasticVector.y).toBeCloseTo(vector.y);
    expect(elasticVector.z).toBeCloseTo(vector.z);

    elasticVector.update();
    vector.setScalar(1.305);

    expect(elasticVector.x).toBeCloseTo(vector.x);
    expect(elasticVector.y).toBeCloseTo(vector.y);
    expect(elasticVector.z).toBeCloseTo(vector.z);
  });
});
