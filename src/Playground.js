import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MeshPhongMaterial } from 'three/src/materials/MeshPhongMaterial';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { DirectionalLight } from 'three/src/lights/DirectionalLight';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { BoxGeometry } from 'three/src/geometries/BoxGeometry';
import { AmbientLight } from 'three/src/lights/AmbientLight';
import { GridHelper } from 'three/src/helpers/GridHelper';

import Stats from 'three/examples/js/libs/stats.min';
import { Scene } from 'three/src/scenes/Scene';
import { Mesh } from 'three/src/objects/Mesh';
import { Color } from 'three/src/math/Color';
import { Fog } from 'three/src/scenes/Fog';

const GROUND = 0x888888;
const WHITE = 0xFFFFFF;
const FOG = 0xA0A0A0;

export default class Playground {
  constructor () {
    this.setSize();

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

  setSize () {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.ratio = this.width / this.height;
  }

  createScene () {
    this.scene = new Scene();
    this.scene.background = new Color(FOG);
    this.scene.fog = new Fog(FOG, 50, 500);
  }

  createCamera () {
    this.camera = new PerspectiveCamera(45, this.ratio, 1, 500);
    this.camera.position.set(0, 10, -50);
    this.camera.lookAt(0, 0, 0);
  }

  createLights () {
    const directional = new DirectionalLight(WHITE, 1);
    const ambient = new AmbientLight(WHITE);

    directional.position.set(-5, 10, 15);
    directional.castShadow = true;

    directional.shadow.camera.bottom = -25;
    directional.shadow.camera.right = 25;
    directional.shadow.camera.left = -25;
    directional.shadow.camera.top = 15;

    directional.shadow.mapSize.x = 1024;
    directional.shadow.mapSize.y = 1024;

    directional.shadow.camera.near = 2;
    directional.shadow.camera.far = 50;

    this.scene.add(directional);
    this.scene.add(ambient);
  }

  createGround () {
    const ground = new Mesh(
      new BoxGeometry(500, 500, 1),
      new MeshPhongMaterial({
        depthWrite: false,
        color: GROUND
      })
    );

    ground.rotateX(-Math.PI / 2);
    ground.receiveShadow = true;
    this.scene.add(ground);

    const grid = new GridHelper(500, 50, 0, 0);
    grid.material.transparent = true;
    grid.material.opacity = 0.2;
    this.scene.add(grid);
  }

  createRenderer () {
    this.renderer = new WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;

    document.body.appendChild(this.renderer.domElement);
  }

  createControls () {
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.target.set(0, 0, 25);
    this.orbitControls.update();
  }

  createEvents () {
    this._onResize = this.onResize.bind(this);
    window.addEventListener('resize', this._onResize, false);
  }

  createStats () {
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.domElement);
  }

  render () {
    this.stats.begin();
    this.orbitControls.update();
    this.renderer.render(this.scene, this.camera);

    this.raf = requestAnimationFrame(this.render.bind(this));
    this.stats.end();
  }

  onResize () {
    this.setSize();
    this.camera.aspect = this.ratio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  destroy () {
    window.removeEventListener('resize', this._onResize, false);
    document.body.removeChild(this.renderer.domElement);
    document.body.removeChild(this.stats.domElement);
    cancelAnimationFrame(this.raf);

    delete this.orbitControls;
    delete this.renderer;
    delete this.camera;
    delete this.scene;
    delete this.stats;
  }
}
