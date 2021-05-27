import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MeshPhongMaterial } from 'three/src/materials/MeshPhongMaterial';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { PCFSoftShadowMap, sRGBEncoding } from 'three/src/constants';
import { DirectionalLight } from 'three/src/lights/DirectionalLight';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';

import { BoxGeometry } from 'three/src/geometries/BoxGeometry';
import type { Material } from 'three/src/materials/Material';
import { AmbientLight } from 'three/src/lights/AmbientLight';
import { GridHelper } from 'three/src/helpers/GridHelper';
import Stats from 'three/examples/jsm/libs/stats.module';

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
  private scene = new Scene();

  private width: number = window.innerWidth;
  private height: number = window.innerHeight;
  private ratio: number = this.width / this.height;

  private camera = new PerspectiveCamera(45, this.ratio, 1, 500);
  private _onResize: EventListenerOrEventListenerObject = () => null;
  private renderer = new WebGLRenderer({ antialias: true, alpha: false });
  private controls = new OrbitControls(this.camera, this.renderer.domElement);

  public constructor () {
    this.createScene();
    this.createCamera();
    this.createLights();
    this.createGround();

    this.createRenderer();
    this.createControls();
    this.createEvents();
    this.createStats();

    this.raf = requestAnimationFrame(this.render.bind(this));
  }

  private setSize (): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.ratio = this.width / this.height;
  }

  private createScene (): void {
    this.scene.background = Color.getClass(Color.LIGHT);
    this.scene.fog = new Fog(Color.LIGHT, 50, 250);
  }

  private createCamera (): void {
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

  private createRenderer (): void {
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setSize(this.width, this.height);

    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.setClearColor(0x222222, 1);
    this.renderer.shadowMap.enabled = true;
  }

  private createControls (): void {
    this.controls.target.set(0, 0, 25);
    this.controls.update();
  }

  private createEvents (): void {
    this._onResize = this.onResize.bind(this);
    window.addEventListener('resize', this._onResize, false);
  }

  private createStats (): void {
    if (document.body.lastElementChild?.id !== 'stats') {
      this.stats = Stats();
      this.stats.showPanel(0);

      this.stats.domElement.id = 'stats';
      document.body.appendChild(this.stats.domElement);
    }
  }

  public render (): void {
    this.stats?.begin();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);

    this.raf = requestAnimationFrame(this.render.bind(this));
    this.stats?.end();
  }

  public onResize (): void {
    this.setSize();
    this.camera.aspect = this.ratio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  public destroy (): void {
    this.renderer.domElement.parentNode?.removeChild(this.renderer.domElement);
    this.stats && document.body.removeChild(this.stats.domElement);
    window.removeEventListener('resize', this._onResize, false);

    cancelAnimationFrame(this.raf);

    this.controls.dispose();
    this.renderer.dispose();
    this.scene.clear();
  }

  public get domElement (): HTMLCanvasElement {
    return this.renderer.domElement;
  }
}
