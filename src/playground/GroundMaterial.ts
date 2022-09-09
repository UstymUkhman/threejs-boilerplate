import type { MeshPhongMaterialParameters } from 'three/src/materials/MeshPhongMaterial';
import { MeshPhongMaterial } from 'three/src/materials/MeshPhongMaterial';
import type { Shader } from 'three/src/renderers/shaders/ShaderLib';

import fragPars from '@/shaders/ground/pars.frag';
import vertPars from '@/shaders/ground/pars.vert';

import fragment from '@/shaders/ground/main.frag';
import vertex from '@/shaders/ground/main.vert';

export default class GroundMaterial extends MeshPhongMaterial
{
  private readonly cellSize = 25.0;

  public constructor (parameters: MeshPhongMaterialParameters = {}) {
    super(parameters);
    this.setValues(parameters);
  }

  private updateDefaultVertexShader (shader: Shader): void {
    shader.vertexShader = `${vertPars}
    ${shader.vertexShader.replace(
      'void main() {',
      `void main() {
        ${vertex}`
    )}`;
  }

  private updateDefaultFragmentShader (shader: Shader): void {
    shader.fragmentShader = `
    ${fragPars}
    ${shader.fragmentShader.replace(
      '#include <output_fragment>', `
      ${fragment}`
    )}`;
  }

  public override onBeforeCompile (shader: Shader) {
    shader.uniforms.cellSize = { value: this.cellSize };

    this.updateDefaultFragmentShader(shader);
    this.updateDefaultVertexShader(shader);

    this.needsUpdate = true;
  }
}
