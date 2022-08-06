/// <reference types="vitest" />

import { resolve } from 'path';
import glsl from 'vite-plugin-glsl';
import solid from 'vite-plugin-solid';
import { version } from './package.json';
import { UserConfigExport, defineConfig } from 'vite';

export default ({ mode }: { mode: string }): UserConfigExport =>
  defineConfig({
    base: './',
    plugins: [solid(), glsl()],
    build: { target: 'esnext' },
    assetsInclude: ['fbx', 'glb', 'gltf'],

    resolve: {
      alias: {
        '@assets': resolve(__dirname, 'src/assets'),
        '@scss': resolve(__dirname, 'src/scss'),
        '@': resolve(__dirname, 'src')
      }
    },

    define: {
      DEBUG: mode !== 'production' && false,
      VERSION: JSON.stringify(version)
    },

    test: {
      setupFiles: ['vitest-canvas-mock.ts'],
      transformMode: { web: [/.[jt]sx?/] },
      deps: { inline: [/solid-js/] },
      environment: 'jsdom',
      isolate: false
    },

    css: {
      modules: {
        localsConvention: 'camelCaseOnly'
      }
    },

    server: {
      host: '0.0.0.0',
      port: 8080,
      open: true
    }
  });
