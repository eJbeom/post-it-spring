import PostIt from "./postit.js";

export default class PostItManager {
  constructor({ number = 0, width = 200, height = 200 }) {
    this.posts = Array.from({ length: number }, () => new PostIt({}));
    this.w = width;
    this.h = height;
  }

  animate(ctx) {
    for (const post of this.posts) {
      post.animate(ctx);
    }
  }

  animateFolds(pos) {
    for (const post of this.posts) {
      post.animateFold(pos);
    }
  }

  add(pos) {
    this.posts.push(
      new PostIt({ x: pos.x, y: pos.y, width: this.w, height: this.h })
    );
  }
}
