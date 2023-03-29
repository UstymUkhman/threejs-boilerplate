import { resolve } from 'path';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import solid from 'vite-plugin-solid';
import { version } from './package.json';

export default ({ mode }: { mode: string }) =>
  defineConfig({
    assetsInclude: ['**/*.bin', '**/*.fbx', '**/*.glb', '**/*.gltf'],

    resolve: {
      conditions: ['development', 'browser'],

      alias: {
        '@assets': resolve('src/assets'),
        '@scss': resolve('src/scss'),
        '@': resolve('src')
      }
    },

    define: {
      DEBUG: mode !== 'production' && false,
      VERSION: JSON.stringify(version)
    },

    css: {
      modules: {
        localsConvention: 'camelCaseOnly'
      }
    },

    plugins: [
      solid(), glsl({
      compress: mode === 'production',
      root: '/src/shaders/'
    })],

    build: {
      target: 'esnext',
      sourcemap: true
    },

    server: {
      host: '0.0.0.0',
      port: 8080,
      open: true
    },

    base: './'
  });
