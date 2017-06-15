import Detector from 'three/examples/js/Detector';
import Stats from 'three/examples/js/libs/stats.min';

export default class Experiment
{
  constructor() {
    this._name = 'Experiment';

    this._canvas = null;
    this._stats = null;

    this._width = null;
    this._height = null;
  }

  init(canvas) {
    if (!Detector.webgl) {
      return false;
    }

    this._canvas = canvas;
    return true;
  }

  startExperiment() {
  }

  showStats() {
    if (!this._stats) {
      this._stats = new Stats();
    }

    document.body.appendChild(this._stats.dom);
  }

  hideStats() {
    this._stats.dom.parentNode.removeChild(this._stats.dom);
  }

  resize(width, height) {
    this._width = width;
    this._height = height;

    this._canvas.width = this._width;
    this._canvas.height = this._height;
  }
}
