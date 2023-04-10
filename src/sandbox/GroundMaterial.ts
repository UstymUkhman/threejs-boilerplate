import type { MeshPhongMaterialParameters } from 'three/src/materials/MeshPhongMaterial';
import { MeshPhongMaterial } from 'three/src/materials/MeshPhongMaterial';
import type { Shader } from 'three/src/renderers/shaders/ShaderLib';

import parsVert from '@/shaders/ground/pars.vert';
import mainVert from '@/shaders/ground/main.vert';
import parsFrag from '@/shaders/ground/pars.frag';
import mainFrag from '@/shaders/ground/main.frag';

import { Config } from '@/sandbox/Config';

export default class GroundMaterial extends MeshPhongMaterial
{
  private cellSize = { value: Config.Ground.cell };

  public constructor (parameters: MeshPhongMaterialParameters = {}) {
    super(parameters);
    this.setValues(parameters);
  }

  private updateDefaultVertexShader (shader: Shader): void {
    shader.vertexShader = `${parsVert}
    ${shader.vertexShader.replace(
      'void main() {',
      `void main() {
        ${mainVert}`
    )}`;
  }

  private updateDefaultFragmentShader (shader: Shader): void {
    shader.fragmentShader = `${parsFrag}
    ${shader.fragmentShader.replace(
      '#include <output_fragment>', `
      ${mainFrag}`
    )}`;
  }

  public override onBeforeCompile (shader: Shader) {
    shader.uniforms.cellSize = this.cellSize;

    this.updateDefaultFragmentShader(shader);
    this.updateDefaultVertexShader(shader);

    this.needsUpdate = true;
  }

  public set cell (size: number) {
    this.cellSize.value = size;
  }
}
