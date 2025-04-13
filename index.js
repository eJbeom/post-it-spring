import Point from "./point.js";
import PostItManager from "./postitManager.js";
import PostIt from "./postit.js";

const POSTIT_WIDTH = 200;
const POSTIT_HEIGHT = 200;

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.mouse = new Point();
    this.postitManager = new PostItManager();

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));

    window.addEventListener("mousemove", this.onMove.bind(this));
    window.addEventListener("mousedown", this.onClick.bind(this));

    this.animate();
  }

  resize() {
    this.stageWidth = window.innerWidth;
    this.stageHeight = window.innerHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    // this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.postitManager.animate(this.ctx);
    this.postitManager.animateFolds(this.mouse);
  }

  onMove(e) {
    this.mouse.x = e.offsetX;
    this.mouse.y = e.offsetY;
  }

  onClick() {
    this.postitManager.add(
      new PostIt({
        x: this.mouse.x,
        y: this.mouse.y,
        width: POSTIT_WIDTH,
        height: POSTIT_HEIGHT,
        fold: 30,
        color: "rgb(255, 255, 255)",
      })
    );
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new App();
});
