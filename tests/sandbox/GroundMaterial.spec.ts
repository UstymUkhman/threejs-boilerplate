import { MeshPhongMaterial } from 'three/src/materials/MeshPhongMaterial';
import GroundMaterial from '@/sandbox/GroundMaterial';
import { describe, test, expect, vi } from 'vitest';

export interface PublicGroundMaterial {
  cellSize: { value: number };
  set cell (size: number);
}

describe('GroundMaterial', () => {
  const ground = new GroundMaterial() as unknown as PublicGroundMaterial;

  test('Defined', () => {
    expect(ground).toBeDefined();
    expect(ground).toBeInstanceOf(GroundMaterial);
    expect(ground).toBeInstanceOf(MeshPhongMaterial);
  });

  test('onBeforeCompile', () => {
    const groundPrototype = Object.getPrototypeOf(ground);
    const shader = { fragmentShader: '', vertexShader: '', uniforms: {} };
    const onBeforeCompile = vi.fn(groundPrototype.onBeforeCompile.bind(ground));

    onBeforeCompile(shader);
    expect(onBeforeCompile).toHaveReturnedWith(undefined);
  });

  test('cell', () => {
    const size = Math.random() * 1e2 | 0;
    ground.cell = size;
    expect(ground.cellSize.value).toStrictEqual(size);
  });
});
