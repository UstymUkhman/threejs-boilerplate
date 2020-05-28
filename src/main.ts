import { REVISION } from '@three/constants';
import Playground from '@/Playground';
import { VERSION } from 'lodash';

import anime from 'animejs';
import WASM from '@/wasm';

// tslint:disable: space-within-parens
WASM.then((wasm: any) => {
  for (let l = 0; l < 3; l++) console.log();
  wasm.print('🔥🔥🔥 AssemblyScript rulez! 🔥🔥🔥\n');

  wasm.print('three.js   ' + wasm.version(REVISION) + ' 💪\n');
  wasm.print('anime.js   ' + wasm.version(anime.version) + ' 🎉\n');
  wasm.print('lodash     ' + wasm.version(VERSION) + ' 🚀');

  for (let l = 0; l < 3; l++) console.log();
});
// tslint:enable: space-within-parens

export default new Playground();
