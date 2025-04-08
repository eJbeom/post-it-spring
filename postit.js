import Point from "./point.js";
import { bogan } from "./utils.js";

const DEFAULT_FOLD = 15;
const DEFAULT_SIZE = 200;
const DEFAULT_COLOR = "white";
const DEFAULT_SHADOW_ALPHA = 0.25;
const DEFAULT_SHADOW_BLUR = 0.8;
const DEFAULT_GRADIENT_STRENGTH = 0.22;
const SPRING_FORCE = 0.23;

export default class PostIt {
  constructor({
    x,
    y,
    fold = DEFAULT_FOLD,
    width = DEFAULT_SIZE,
    height = DEFAULT_SIZE,
    color = DEFAULT_COLOR,
    shadowAlpha = DEFAULT_SHADOW_ALPHA,
    shadowBlur = DEFAULT_SHADOW_BLUR,
    gradientStrength = DEFAULT_GRADIENT_STRENGTH,
  }) {
    this.pos = new Point(x, y);
    this.fold = fold;
    this.w = width;
    this.h = height - this.fold;
    this._h = this.h;
    this.color = color;

    this.shadowAlpha = shadowAlpha;
    this.shadowBlur = shadowBlur;
    this.shadowOffsetY = this.fold / 2;
    this._shadowOffsetY = this.shadowOffsetY;
    this.gradientY = 1 - (this.fold / 2) * 0.01;
    this._gradientY = this.gradientY;
    this.gradientStrength = gradientStrength;
    this._gradientStrength = this.gradientStrength;
  }

  resize(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }

  animate(ctx) {
    ctx.shadowColor = `rgba(0,0,0,${this.shadowAlpha})`;
    ctx.shadowOffsetY = this.shadowOffsetY;
    ctx.shadowBlur = this.shadowBlur;

    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);

    ctx.fillStyle = this.createLinearGradient(ctx);
    ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
  }

  createLinearGradient(ctx) {
    const gradient = ctx.createLinearGradient(
      this.pos.x,
      this.pos.y,
      this.pos.x,
      this.pos.y + this.h
    );
    gradient.addColorStop(this.gradientY, "rgba(0,0,0,0)");
    gradient.addColorStop(1, `rgba(0,0,0,${this.gradientStrength})`);

    return gradient;
  }

  isCollide(pos) {
    if (
      pos.x >= this.pos.x &&
      pos.x <= this.pos.x + this.w &&
      pos.y >= this.pos.y &&
      pos.y <= this.pos.y + this.h
    ) {
      return true;
    }
    return false;
  }

  animateFold(pos) {
    if (
      pos.x >= this.pos.x &&
      pos.x <= this.pos.x + this.w &&
      pos.y >= this.pos.y + this.h - this.shadowOffsetY / 2 &&
      pos.y <= this.pos.y + this._h + this.fold
    ) {
      return true;
    }
    return false;
  }

  unFolding() {
    if (this.h <= this._h + this.fold) {
      this.h++;
      this.shadowOffsetY -= this._shadowOffsetY / this.fold;
      this.gradientStrength -= this._gradientStrength / this.fold;
      const cal = Math.floor(((1 - this._gradientY) / this.fold) * 1000) / 1000;
      this.gradientY += cal;
    }
  }

  folding() {
    this.h = bogan(this.h, this._h, SPRING_FORCE);
    this.shadowOffsetY = bogan(
      this.shadowOffsetY,
      this._shadowOffsetY,
      SPRING_FORCE
    );
    this.gradientStrength = bogan(
      this.gradientStrength,
      this._gradientStrength,
      SPRING_FORCE
    );
    this.gradientY = bogan(this.gradientY, this._gradientY, SPRING_FORCE);
  }
}
