import { resolve } from 'path';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import solid from 'vite-plugin-solid';
import { version } from './package.json';

export default ({ mode }: { mode: string }) =>
  defineConfig({
    base: './',
    plugins: [solid(), glsl()],
    build: { target: 'esnext' },
    assetsInclude: ['**/*.fbx', '**/*.glb', '**/*.gltf'],

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
