export default class PostItManager {
  constructor() {
    this.posts = [];
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

  add(postit) {
    this.posts.push(postit);
  }
}
