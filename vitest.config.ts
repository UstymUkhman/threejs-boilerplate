import { mergeConfig } from 'vite';
import viteConfig from './vite.config';
import { defineConfig } from 'vitest/config';

export default mergeConfig(
  viteConfig({ mode: 'test' }),
  defineConfig({
    test: {
      setupFiles: ['tests/canvas.mock.ts'],
      transformMode: { web: [/.[jt]sx?/] },
      deps: { inline: [/solid-js/] },
      environment: 'jsdom',
      isolate: false
    }
  })
);
