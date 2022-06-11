import path from 'path';
import { defineConfig } from 'vite';

import glsl from 'vite-plugin-glsl';
import solid from 'vite-plugin-solid';
import { version } from './package.json';

export default defineConfig({
  base: './',
  plugins: [solid(), glsl()],
  assetsInclude: ['fbx', 'glb', 'gltf'],

  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@scss': path.resolve(__dirname, 'src/scss'),
      '@': path.resolve(__dirname, 'src')
    }
  },

  define: {
    'import.meta.env.BUILD': JSON.stringify(version)
  },

  build: {
    polyfillDynamicImport: false,
    target: 'esnext'
  },

  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true
  }
});
