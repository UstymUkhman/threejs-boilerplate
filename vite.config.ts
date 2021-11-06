import path from 'path';
import { defineConfig } from 'vite';

import glsl from 'vite-plugin-glsl';
import { version } from './package.json';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  assetsInclude: ['fbx', 'glb', 'gltf', 'wat'],
  plugins: [svelte(), glsl()],
  base: './',

  define: {
    'import.meta.env.BUILD': JSON.stringify(version)
  },

  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@scss': path.resolve(__dirname, 'src/scss'),
      '@': path.resolve(__dirname, 'src')
    }
  },

  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true
  }
});
