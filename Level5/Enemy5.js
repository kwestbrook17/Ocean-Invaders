export default class Enemy {
  constructor(x, y, imageNumber) {
    this.x = x;
    this.y = y;

    if (window.innerWidth <= 650) {
      this.width = 70; // make these the same as the image dimensions
      this.height = 50; // make these the same as the image dimensions
    } else {
      this.width = 98; // make these the same as the image dimensions
      this.height = 74; // make these the same as the image dimensions
    }
    this.image = new Image();
    // need to put numbers on images we use for the enemys
    this.image.src = `../assets/images/enemy${imageNumber}.png`;
  }

  draw(ctx) {
    //puts enemies on screen
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move(xVelocity, yVelocity) {
    this.x += xVelocity;
    this.y += yVelocity;
  }
  collideWith(sprite) {
    if (
      this.x + this.width > sprite.x &&
      this.x < sprite.x + sprite.width &&
      this.y + this.height > sprite.y &&
      this.y < sprite.y + sprite.height
    ) {
      return true;
    } else {
      return false;
    }
  }
}
