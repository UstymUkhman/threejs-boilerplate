import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MeshPhongMaterial } from 'three/src/materials/MeshPhongMaterial';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { PCFSoftShadowMap, sRGBEncoding } from 'three/src/constants';
import { DirectionalLight } from 'three/src/lights/DirectionalLight';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';

import { BoxGeometry } from 'three/src/geometries/BoxGeometry';
import type Stats from 'three/examples/jsm/libs/stats.module';
import type { Material } from 'three/src/materials/Material';
import { AmbientLight } from 'three/src/lights/AmbientLight';
import { GridHelper } from 'three/src/helpers/GridHelper';

import { Scene } from 'three/src/scenes/Scene';
import { Mesh } from 'three/src/objects/Mesh';
import { Fog } from 'three/src/scenes/Fog';
import { Color } from '@/utils/Color';

interface GridMaterial extends Material {
  transparent: boolean
  opacity: number
}

export default class Playground {
  private raf: number;
  private stats?: Stats;
  private controls?: OrbitControls;

  private renderer!: WebGLRenderer;
  private camera!: PerspectiveCamera;

  private readonly scene = new Scene();
  private onRender = this.render.bind(this);

  public constructor (private readonly canvas: HTMLCanvasElement, pixelRatio?: number) {
    this.createScene();
    this.createCamera();
    this.createLights();
    this.createGround();

    this.createRenderer(pixelRatio);
    this.raf = requestAnimationFrame(this.onRender);
  }

  private createScene (): void {
    this.scene.background = Color.getClass(Color.LIGHT);
    this.scene.fog = new Fog(Color.LIGHT, 50, 250);
  }

  private createCamera (): void {
    const aspect = this.canvas.width / this.canvas.height;
    this.camera = new PerspectiveCamera(45, aspect, 1, 500);

    this.camera.position.set(0, 10, -50);
    this.camera.lookAt(0, 0, 0);
  }

  private createLights (): void {
    const directional = new DirectionalLight(Color.WHITE, 1);
    const ambient = new AmbientLight(Color.WHITE);

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
    const ground = new Mesh(
      new BoxGeometry(500, 500, 1),
      new MeshPhongMaterial({
        color: Color.LIGHT,
        depthWrite: false
      })
    );

    ground.rotateX(-Math.PI / 2);
    ground.receiveShadow = true;
    this.scene.add(ground);

    const grid = new GridHelper(500, 50, 0, 0);
    (grid.material as GridMaterial).transparent = true;
    (grid.material as GridMaterial).opacity = 0.25;
    this.scene.add(grid);
  }

  private createRenderer (pixelRatio?: number): void {
    const { width, height } = this.canvas;

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false
    });

    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setPixelRatio(pixelRatio || 1.0);
    this.renderer.setSize(width, height, false);

    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.setClearColor(0x222222, 1);
    this.renderer.shadowMap.enabled = true;
  }

  private render (): void {
    this.raf = requestAnimationFrame(this.onRender);
    this.renderer.render(this.scene, this.camera);

    this.controls?.update();
    this.stats?.update();
  }

  public createControls (target = this.renderer.domElement): void {
    import('three/examples/jsm/controls/OrbitControls').then(Controls => {
      this.controls = new Controls.OrbitControls(this.camera, target);
      this.controls.target.set(0, 0, 25);
      this.controls.update();
    });
  }

  public createStats (onCreate?: (stats: HTMLDivElement) => void): void {
    import('three/examples/jsm/libs/stats.module').then(Stats => {
      this.stats = Stats.default();
      this.stats.showPanel(0);

      this.stats.domElement.id = 'stats';
      onCreate && onCreate(this.stats.domElement);
    });
  }

  public resize (width: number, height: number, ratio: number): void {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  public destroy (): void {
    this.renderer.domElement.parentNode?.removeChild(this.renderer.domElement);
    cancelAnimationFrame(this.raf);

    this.controls?.dispose();
    this.renderer.dispose();
    this.scene.clear();
  }
}
