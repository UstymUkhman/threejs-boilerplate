import { ShaderChunk } from 'three/src/renderers/shaders/ShaderChunk';
import customToneMapping from '@/shaders/mapping/custom.frag';
import defaultMapping from '@/shaders/mapping/pars.frag';

ShaderChunk.tonemapping_pars_fragment =
  ShaderChunk.tonemapping_pars_fragment.replace(
    defaultMapping, customToneMapping
);
