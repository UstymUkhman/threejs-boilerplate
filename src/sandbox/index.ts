import type { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial';
import { DirectionalLightHelper } from 'three/src/helpers/DirectionalLightHelper';
import type { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import type { MeshToonMaterial } from 'three/src/materials/MeshToonMaterial';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { DirectionalLight } from 'three/src/lights/DirectionalLight';
import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';

import type { Material } from 'three/src/materials/Material';
import { AmbientLight } from 'three/src/lights/AmbientLight';
import Stats from 'three/examples/jsm/libs/stats.module';
import type { Object3D } from 'three/src/core/Object3D';
import { PCFSoftShadowMap } from 'three/src/constants';
import type { Vector3 } from 'three/src/math/Vector3';
import GroundMaterial from '@/sandbox/GroundMaterial';

import { DoubleSide } from 'three/src/constants';
import GUIControls from '@/sandbox/GUIControls';
import { Scene } from 'three/src/scenes/Scene';
import { Mesh } from 'three/src/objects/Mesh';
import { Color } from 'three/src/math/Color';

import { Fog } from 'three/src/scenes/Fog';
import { Config } from '@/sandbox/Config';
import Viewport from '@/utils/Viewport';
import { PI } from '@/utils/Number';
import RAF from '@/utils/RAF';

export default class Sandbox
{
  private readonly groundSize = Config.Ground.size;
  private readonly update = this.render.bind(this);

  private helper!: DirectionalLightHelper;
  private directional!: DirectionalLight;
  private orbitControls!: OrbitControls;
  private readonly scene = new Scene();

  private camera!: PerspectiveCamera;
  private guiControls!: GUIControls;
  private renderer!: WebGLRenderer;
  private ambient!: AmbientLight;

  private ground!: Mesh;
  private stats?: Stats;

  public constructor () {
    this.createScene();
    this.createCamera();
    this.createLights();
    this.createGround();

    this.createRenderer();
    this.createControls();
    this.createStats();

    RAF.add(this.update);
    RAF.pause = false;
  }

  private createScene (): void {
    const { background } = Config.Scene;
    this.scene.background = new Color();
    this.background = background;
    this.updateFog(Config.Fog);
  }

  private createCamera (): void {
    const { fov, near, far, position } = Config.Camera;
    this.camera = new PerspectiveCamera(fov, Viewport.size.ratio, near, far);
    this.camera.position.copy(position);
  }

  private createLights (): void {
    const { ambient, directional } = Config.Lights;

    this.ambient = new AmbientLight(ambient.color, ambient.intensity);
    this.directional = new DirectionalLight(directional.color, directional.intensity);
    this.helper = new DirectionalLightHelper(this.directional, directional.helper.size, directional.helper.color);

    this.updateDirectional(directional);
    this.scene.add(this.directional);
    this.scene.add(this.ambient);
    this.scene.add(this.helper);
  }

  private createGround (): void {
    const { color, size } = Config.Ground;

    this.ground = new Mesh(
      new PlaneGeometry(size, size),
      new GroundMaterial({ side: DoubleSide, color })
    );

    this.ground.receiveShadow = true;
    this.ground.rotateX(-PI.d2);
    this.scene.add(this.ground);
  }

  private createRenderer (): void {
    const { toneMappingExposure, outputColorSpace, background, toneMapping } = Config.Scene;
    this.renderer = new WebGLRenderer({ powerPreference: 'high-performance', antialias: true });

    this.renderer.setSize(Viewport.size.width, Viewport.size.height);
    this.renderer.debug.checkShaderErrors = import.meta.env.DEV;
    this.renderer.toneMappingExposure = toneMappingExposure;

    this.renderer.outputColorSpace = outputColorSpace;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setPixelRatio(devicePixelRatio);

    this.renderer.setClearColor(background, 1.0);
    this.renderer.toneMapping = toneMapping;
    this.renderer.shadowMap.enabled = true;
  }

  private createControls (): void {
    this.orbitControls = new OrbitControls(this.camera, this.canvas);
    this.orbitControls.target.copy(Config.Camera.target);

    this.orbitControls.enablePan = import.meta.env.DEV;
    Viewport.addResizeCallback(this.resize.bind(this));

    this.guiControls = new GUIControls(this);
    this.orbitControls.enableDamping = true;

    this.orbitControls.maxPolarAngle = 1.5;
    this.orbitControls.minPolarAngle = 0.5;

    this.orbitControls.rotateSpeed = 0.5;
    this.orbitControls.enableZoom = true;

    this.orbitControls.update();
  }

  private createStats (): void {
    if (document.body.lastElementChild?.id !== 'stats') {
      this.stats = new Stats();
      this.stats.showPanel(0);
      this.stats.dom.id = 'stats';
      document.body.appendChild(this.stats.dom);
    }
  }

  private resize (width: number, height: number, ratio: number): void {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private render (): void {
    this.stats?.begin();

    this.orbitControls.update();
    this.renderer.render(this.scene, this.camera);
    this.guiControls.update(this.camera.position, this.orbitControls.target);

    this.stats?.end();
  }

  public dispose (): void {
    this.disposeNode(this.scene);
    this.orbitControls.dispose();
    this.guiControls.dispose();
    this.stats?.dom.remove();

    RAF.remove(this.update);
    this.renderer.dispose();
    this.canvas.remove();
    this.scene.clear();
  }

  private disposeNode(node: Object3D): void {
    node.traverse((child?: Object3D) => {
      if (child instanceof Mesh) {
        const mesh = child as Mesh;
        mesh.geometry?.dispose();

        !mesh.material
          ? (child = undefined)
          : !Array.isArray(mesh.material)
          ? this.disposeMaterial(mesh.material)
          : mesh.material.forEach(this.disposeMaterial);
      }

      child = undefined;
    });
  }

  private disposeMaterial(material: Material): void {
    (material as MeshStandardMaterial).displacementMap?.dispose();
    (material as MeshStandardMaterial).metalnessMap?.dispose();
    (material as MeshStandardMaterial).roughnessMap?.dispose();

    (material as MeshStandardMaterial).emissiveMap?.dispose();
    (material as MeshStandardMaterial).normalMap?.dispose();
    (material as MeshStandardMaterial).alphaMap?.dispose();

    (material as MeshStandardMaterial).lightMap?.dispose();
    (material as MeshBasicMaterial).specularMap?.dispose();
    (material as MeshToonMaterial).gradientMap?.dispose();

    (material as MeshStandardMaterial).bumpMap?.dispose();
    (material as MeshStandardMaterial).envMap?.dispose();
    (material as MeshStandardMaterial).aoMap?.dispose();
    (material as MeshStandardMaterial).map?.dispose();

    material.dispose();
  }

  public get canvas (): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  public set background (color: number) {
    (this.scene.background as Color).set(color);
    this.renderer?.setClearColor(color, 1.0);
  }

  public set controls (enabled: boolean) {
    this.orbitControls.enabled = enabled;
  }

  public set pause (paused: boolean) {
    this.controls = !paused;
    RAF.pause = paused;
  }

  public updateRenderer (scene: typeof Config.Scene): void {
    this.renderer.toneMappingExposure = scene.toneMappingExposure;
    this.renderer.outputColorSpace = scene.outputColorSpace;
    this.renderer.toneMapping = scene.toneMapping;
  }

  public updateCamera (camera: typeof Config.Camera): void {
    const { fov, near, far } = camera;
    this.camera.fov = fov;
    this.camera.near = near;
    this.camera.far = far;
    this.camera.updateProjectionMatrix();
  }

  public updateCameraPosition (position: Vector3, target: Vector3): void {
    this.orbitControls.target.copy(target);
    this.camera.position.copy(position);
  }

  public updateAmbient (ambient: typeof Config.Lights.ambient): void {
    const { color, intensity } = ambient;
    this.ambient.intensity = intensity;
    this.ambient.color.set(color);
  }

  public updateDirectional (directional: typeof Config.Lights.directional): void {
    const { bottom, right, left, top, near, far } = directional.shadow.camera;
    const { color, intensity, position, rotation, shadow } = directional;

    this.directional.shadow.mapSize.copy(shadow.mapSize);
    this.helper.visible = directional.helper.visible;

    this.directional.shadow.camera.bottom = bottom;
    this.directional.shadow.camera.right = right;
    this.directional.shadow.camera.left = left;
    this.directional.shadow.camera.top = top;

    this.directional.shadow.camera.near = near;
    this.directional.castShadow = shadow.cast;
    this.directional.shadow.camera.far = far;

    this.directional.position.copy(position);
    this.directional.rotation.copy(rotation);
    this.directional.intensity = intensity;
    this.directional.color.set(color);
  }

  public updateGround (ground: typeof Config.Ground): void {
    const { color, size, cell } = ground;
    (this.ground.material as GroundMaterial).color.set(color);
    (this.ground.material as GroundMaterial).cell = cell;
    this.ground.scale.setScalar(size / this.groundSize);
  }

  public updateFog (fog: typeof Config.Fog): void {
    const { visible, color, near, far } = fog;
    this.scene.fog = visible ? new Fog(color, near, far) : null;

    if (this.scene.fog) {
      (this.scene.fog as Fog).near = near;
      (this.scene.fog as Fog).far = far;
      this.scene.fog.color.set(color);
    }
  }
}
