import { DirectionalLightHelper } from 'three/src/helpers/DirectionalLightHelper';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { PCFSoftShadowMap, sRGBEncoding } from 'three/src/constants';
import { DirectionalLight } from 'three/src/lights/DirectionalLight';
import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import type { Color as ThreeColor } from 'three/src/math/Color';
import { AmbientLight } from 'three/src/lights/AmbientLight';
import Stats from 'three/examples/jsm/libs/stats.module';
import type { Vector3 } from 'three/src/math/Vector3';

import { DoubleSide } from 'three/src/constants';
import { Scene } from 'three/src/scenes/Scene';
import GroundMaterial from './GroundMaterial';
import { Mesh } from 'three/src/objects/Mesh';
import { Fog } from 'three/src/scenes/Fog';
import GUIControls from './GUIControls';
import Viewport from '@/utils/Viewport';
import { Color } from '@/utils/Color';
import { PI } from '@/utils/Number';
import { Config } from './Config';

export default class Playground
{
  private readonly groundSize = Config.Ground.size;

  private helper!: DirectionalLightHelper;
  private directional!: DirectionalLight;
  private orbitControls!: OrbitControls;
  private camera!: PerspectiveCamera;

  private guiControls!: GUIControls;
  private renderer!: WebGLRenderer;
  private ambient!: AmbientLight;
  private scene = new Scene();

  private paused = false;
  private ground!: Mesh;
  private stats?: Stats;
  private raf: number;

  public constructor () {
    this.createScene();
    this.createCamera();
    this.createLights();
    this.createGround();

    this.createRenderer();
    this.createControls();
    this.createStats();

    Viewport.addResizeCallback(this.resize.bind(this));
    this.raf = requestAnimationFrame(this.render.bind(this));
  }

  private createScene (): void {
    this.scene.background = Color.getClass(0);
    this.background = Config.Background;
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
    this.renderer = new WebGLRenderer({ powerPreference: 'high-performance', antialias: true });

    this.renderer.setSize(Viewport.size.width, Viewport.size.height);
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setClearColor(Color.BLACK, 1.0);

    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
  }

  private createControls (): void {
    this.orbitControls = new OrbitControls(this.camera, this.domElement);
    this.orbitControls.target.copy(Config.Camera.target);
    this.guiControls = new GUIControls(this);
    this.orbitControls.update();
  }

  private createStats (): void {
    if (document.body.lastElementChild?.id !== 'stats') {
      this.stats = Stats();
      this.stats.showPanel(0);
      this.stats.domElement.id = 'stats';
      document.body.appendChild(this.stats.domElement);
    }
  }

  private resize (width: number, height: number, ratio: number): void {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public render (): void {
    this.stats?.begin();

    if (!this.paused) {
      this.orbitControls.update();
      this.renderer.render(this.scene, this.camera);
      this.guiControls.update(this.camera.position, this.orbitControls.target);
    }

    this.raf = requestAnimationFrame(this.render.bind(this));
    this.stats?.end();
  }

  public destroy (): void {
    this.renderer.domElement.remove();
    this.stats?.domElement.remove();
    cancelAnimationFrame(this.raf);

    this.orbitControls.dispose();
    this.guiControls.dispose();
    this.renderer.dispose();
    this.scene.clear();
  }

  public get domElement (): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  public set background (color: number) {
    (this.scene.background as ThreeColor).set(color);
  }

  public set controls (enabled: boolean) {
    this.orbitControls.enabled = enabled;
  }

  public set pause (paused: boolean) {
    this.controls = !paused;
    this.paused = paused;
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

  public updateFog (fog: typeof Config.Fog): void {
    const { visible, color, near, far } = fog;
    this.scene.fog = visible ? new Fog(color, near, far) : null;

    if (this.scene.fog) {
      (this.scene.fog as Fog).near = near;
      (this.scene.fog as Fog).far = far;
      this.scene.fog.color.set(color);
    }
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

  public updateGround (ground: typeof Config.Ground): void {
    const { color, size, cell } = ground;
    (this.ground.material as GroundMaterial).color.set(color);
    (this.ground.material as GroundMaterial).cell = cell;
    this.ground.scale.setScalar(size / this.groundSize);
  }
}
