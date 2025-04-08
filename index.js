import Point from "./point.js";
import PostIt from "./postit.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.mouse = new Point();

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));

    this.postit = new PostIt({
      x: this.stageWidth / 2 - 100,
      y: this.stageHeight / 2 - 100,
    });

    window.addEventListener("mousemove", this.onMove.bind(this));

    this.animate();
  }

  resize() {
    this.stageWidth = window.innerWidth;
    this.stageHeight = window.innerHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.rectX = this.stageWidth / 2;
    this.rectY = this.stageHeight / 2;

    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.postit.animate(this.ctx);
    if (this.postit.isCollide(this.mouse)) {
      if (this.postit.animateFold(this.mouse)) {
        this.postit.unFolding();
        document.body.style.cursor = "pointer";
      }
    } else {
      this.postit.folding();
      document.body.style.cursor = "default";
    }
  }

  onMove(e) {
    this.mouse.x = e.offsetX;
    this.mouse.y = e.offsetY;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new App();
});
