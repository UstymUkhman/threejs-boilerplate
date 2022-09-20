import parsVert from '@/shaders/ground/pars.vert';
import mainVert from '@/shaders/ground/main.vert';
import parsFrag from '@/shaders/ground/pars.frag';
import mainFrag from '@/shaders/ground/main.frag';
import { describe, test, expect } from 'vitest';

describe('Ground', () => {
  test('pars.vert', () => {
    expect(parsVert.length).toBeGreaterThan(0.0);
    expect(parsVert.includes('groundUV')).toStrictEqual(true);
  });

  test('main.vert', () => {
    expect(mainVert.length).toBeGreaterThan(0.0);
    expect(mainVert.includes('groundUV')).toStrictEqual(true);
  });

  test('pars.frag', () => {
    expect(parsFrag.length).toBeGreaterThan(0.0);
    expect(parsFrag.includes('groundUV')).toStrictEqual(true);
    expect(parsFrag.includes('cellSize')).toStrictEqual(true);
  });

  test('main.frag', () => {
    expect(mainFrag.length).toBeGreaterThan(0.0);
    expect(mainFrag.includes('groundUV')).toStrictEqual(true);
    expect(mainFrag.includes('cellSize')).toStrictEqual(true);
    expect(mainFrag.includes('#include <output_fragment>')).toStrictEqual(true);
  });
});
