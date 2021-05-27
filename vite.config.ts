import path from 'path';
import { defineConfig } from 'vite';
import { version } from './package.json';
import svelte from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  assetsInclude: ['fbx', 'glb', 'gltf', 'wat'],
  plugins: [svelte()],

  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    __BUILD_VERSION__: JSON.stringify(version)
  },

  resolve: { alias: {
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@scss': path.resolve(__dirname, 'src/scss'),
    '@': path.resolve(__dirname, 'src')
  }},

  build: {
    polyfillDynamicImport: true
  },

  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true
  }
});
