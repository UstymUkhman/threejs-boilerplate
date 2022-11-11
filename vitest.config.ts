import { mergeConfig } from 'vite';
import viteConfig from './vite.config';
import { defineConfig } from 'vitest/config';

export default mergeConfig(
  viteConfig({ mode: 'test' }),
  defineConfig({
    test: {
      transformMode: { web: [/\.[jt]sx?$/] },
      setupFiles: ['tests/canvas.mock.ts'],
      deps: { inline: [/solid-js/] },
      environment: 'jsdom',
      isolate: false
    }
  })
);
