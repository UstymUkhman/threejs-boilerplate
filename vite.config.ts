import { resolve } from 'path';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import solid from 'vite-plugin-solid';
import { version } from './package.json';

export default ({ mode }: { mode: string }) =>
  defineConfig({
    base: './',
    plugins: [solid(), glsl()],
    assetsInclude: ['**/*.fbx', '**/*.glb', '**/*.gltf'],

    define: {
      DEBUG: mode !== 'production' && false,
      VERSION: JSON.stringify(version)
    },

    resolve: {
      conditions: ['development', 'browser'],

      alias: {
        '@assets': resolve('src/assets'),
        '@scss': resolve('src/scss'),
        '@': resolve('src')
      }
    },

    css: {
      modules: {
        localsConvention: 'camelCaseOnly'
      }
    },

    build: {
      target: 'esnext',
      sourcemap: true
    },

    server: {
      host: '0.0.0.0',
      port: 8080,
      open: true
    }
  });
