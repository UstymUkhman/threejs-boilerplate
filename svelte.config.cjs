'use strict';

/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const env = require('yargs').argv.env;
const sveltePreprocess = require('svelte-preprocess');

/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = {
  css: false,
  preprocess: sveltePreprocess({
    globalStyle: { sourceMap: env !== 'build' },
    typescript: { tsconfigFile: './tsconfig.json' },

    scss: { importer: [url => !url.indexOf('@scss') && {
      file: url.replace('@scss', path.resolve(__dirname, 'src/scss'))
    }]}
  })
};
