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

export default class MainScene
{
  private orbitControls!: OrbitControls;
  private camera!: PerspectiveCamera;
  private guiControls!: GUIControls;
  private renderer!: WebGLRenderer;

  private paused = false;
  private ground!: Mesh;
  private scene!: Scene;
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
    this.scene = new Scene();
    const { visible, color, near, far } = Config.Fog;

    if (visible) this.scene.fog = new Fog(color, near, far);
    this.scene.background = Color.getClass(Config.Background);
  }

  private createCamera (): void {
    const { fov, near, far, position } = Config.Camera;
    this.camera = new PerspectiveCamera(fov, Viewport.size.ratio, near, far);
    this.camera.position.copy(position);
  }

  private createLights (): void {
    const directional = new DirectionalLight(Color.WHITE);
    const ambient = new AmbientLight(Color.WHITE, 0.25);

    directional.position.set(-5, 10, 15);
    directional.castShadow = true;

    directional.shadow.camera.bottom = -25;
    directional.shadow.camera.right = 25;
    directional.shadow.camera.left = -25;
    directional.shadow.camera.top = 15;

    directional.shadow.mapSize.x = 1024;
    directional.shadow.mapSize.y = 1024;

    directional.shadow.camera.near = 1;
    directional.shadow.camera.far = 50;

    this.scene.add(directional);
    this.scene.add(ambient);
  }

  private createGround (): void {
    this.ground = new Mesh(
      new PlaneGeometry(500, 500),
      new GroundMaterial({ color: Color.WHITE, side: DoubleSide })
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
    this.orbitControls.target.set(0.0, 0.0, 25.0);
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
      this.guiControls.update(this.camera.position);
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

  public updateFog (fog: typeof Config.Fog): void {
    this.scene.fog = fog.visible ? new Fog(fog.color, fog.near, fog.far) : null;

    if (!this.scene.fog) return;
    this.scene.fog.color.set(fog.color);
    (this.scene.fog as Fog).near = fog.near;
    (this.scene.fog as Fog).far = fog.far;
  }

  public updateCamera (camera: typeof Config.Camera): void {
    this.camera.fov = camera.fov;
    this.camera.near = camera.near;
    this.camera.far = camera.far;
    this.camera.updateProjectionMatrix();
  }

  public updateCameraPosition (position: Vector3): void {
    this.camera.position.copy(position);
  }

  public set groundColor (color: number) {
    (this.ground.material as GroundMaterial).color.set(color);
  }

  public set groundSize (size: number) {
    this.ground.scale.setScalar(size);
  }
}
