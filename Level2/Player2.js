export default class Player {
  rightPressed = false;
  leftPressed = false;
  shootPressed = false;

  constructor(canvas, velocity, bulletController) {
    this.canvas = canvas;
    this.velocity = velocity;
    this.bulletController = bulletController;

    if (window.innerWidth <= 650) {
      this.x = this.canvas.width / 2.2;
      this.y = this.canvas.height - 50;
      this.width = 50;
      this.height = 48;
    } else {
      this.x = this.canvas.width / 2.2;
      this.y = this.canvas.height - 70;
      this.width = 70;
      this.height = 68;
    }
    this.image = new Image();
    this.image.src = "../assets/images/playerMotion.gif";

    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
    document.addEventListener("keydown", function (event) {
      // Check if the pressed key is the spacebar (key code: 32)
      if (event.keyCode === 32) {
        // Prevent the default action of the spacebar (scrolling down the page)
        event.preventDefault();
      }
    });
  }

  draw(ctx) {
    if (this.shootPressed) {
      this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
    }
    this.move();
    this.collideWithWalls();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  collideWithWalls() {
    //left
    if (this.x < 0) {
      this.x = 0;
    }
    //right
    if (this.x > this.canvas.width - this.width) {
      this.x = this.canvas.width - this.width;
    }
  }

  move() {
    if (this.rightPressed) {
      this.x += this.velocity;
    } else if (this.leftPressed) {
      this.x += -this.velocity;
    }
  }

  keydown = (event) => {
    if (event.code == "ArrowRight") {
      this.rightPressed = true;
    }
    if (event.code == "ArrowLeft") {
      this.leftPressed = true;
    }
    if (event.code == "Space") {
      this.shootPressed = true;
    }
  };
  keyup = (event) => {
    if (event.code == "ArrowRight") {
      this.rightPressed = false;
    }
    if (event.code == "ArrowLeft") {
      this.leftPressed = false;
    }
    if (event.code == "Space") {
      this.shootPressed = false;
    }
  };
}
