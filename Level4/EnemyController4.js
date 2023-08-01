import Enemy from "../Level4/Enemy4.js";
import MovingDirection from "../Level4/MovingDirection4.js";

export default class EnemyController {
  // represents the pattern for enemies and the different numbers are the different enemies
  enemyMap = [
    [6, 4, 0, 4, 6, 6, 0, 4, 4, 6],
    [4, 0, 4, 4, 4, 4, 0, 4, 4, 4],
    [0, 6, 6, 5, 0, 5, 5, 0, 6, 6],
    [6, 6, 6, 0, 5, 5, 5, 0, 6, 6],
    [4, 6, 0, 4, 6, 4, 6, 4, 0, 4],
    [6, 0, 6, 6, 6, 0, 6, 6, 0, 6],
  ];

  enemyRows = [];

  currentDirection = MovingDirection.right;
  xVelocity = 0;
  yVelocity = 0;
  defaultXVelocity = 1;
  defaultYVelocity = 1;
  moveDownTimerDefault = 30;
  moveDownTimer = this.moveDownTimerDefault;
  fireBulletTimerDefault = 60;
  fireBulletTimer = this.fireBulletTimerDefault;
  highestRow = this.enemyMap[this.enemyMap.length - 1];

  // this gives the enemies the same parameters as the canvas
  constructor(canvas, enemyBulletController, playerBulletController) {
    this.canvas = canvas;
    this.enemyBulletController = enemyBulletController;
    this.playerBulletController = playerBulletController;

    this.enemyDeathSound = new Audio("../assets/sounds/enemy-death.wav");
    this.enemyDeathSound.volume = 0.2;

    this.createEnemies();
  }

  // this will draw the enemies onto the canvas
  draw(ctx) {
    this.decrementMoveDownTimer();
    this.updateVelocityAndDirection();
    this.collisionDetection();
    this.drawEnemies(ctx);
    this.resetMoveDownTimer();
    this.fireBullet();
  }

  collisionDetection() {
    this.enemyRows.forEach((enemyRow) => {
      enemyRow.forEach((enemy, enemyIndex) => {
        //checks if there are any collisions between enemy and bullets
        if (this.playerBulletController.collideWith(enemy)) {
          // plays sound when enemy is hit and resets sound
          this.enemyDeathSound.currentTime = 0;
          this.enemyDeathSound.play();
          enemyRow.splice(enemyIndex, 1);
        }
      });
    });
    this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
  }

  // handles enemies firing bullets
  fireBullet() {
    this.fireBulletTimer--;
    if (this.fireBulletTimer <= 0) {
      // resets fire bullet timer
      this.fireBulletTimer = this.fireBulletTimerDefault;
      const allEnemies = this.enemyRows.flat();
      const enemyIndex = Math.floor(Math.random() * allEnemies.length);
      const enemy = allEnemies[enemyIndex];
      this.enemyBulletController.shoot(enemy.x + enemy.width / 2, enemy.y, -3);
      console.log(enemyIndex);
    }
  }

  resetMoveDownTimer() {
    if (this.moveDownTimer <= 0) {
      this.moveDownTimer = this.moveDownTimerDefault;
    }
  }

  decrementMoveDownTimer() {
    if (
      this.currentDirection === MovingDirection.downLeft ||
      this.currentDirection === MovingDirection.downRight
    ) {
      this.moveDownTimer--;
    }
  }

  // changes moving direction of enemies based on row
  updateVelocityAndDirection() {
    // this loops over each enemy row
    for (const enemyRow of this.enemyRows) {
      if (this.currentDirection == MovingDirection.right) {
        this.xVelocity = this.defaultXVelocity;
        this.yVelocity = 0;
        const rightMostEnemy = enemyRow[enemyRow.length - 1];
        if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
          this.currentDirection = MovingDirection.downLeft;
          break;
        }
      } else if (this.currentDirection === MovingDirection.downLeft) {
        if (this.moveDown(MovingDirection.left)) {
          break;
        }
      } else if (this.currentDirection === MovingDirection.left) {
        this.xVelocity = -this.defaultXVelocity;
        this.yVelocity = 0;
        const leftMostEnemy = enemyRow[0];
        if (leftMostEnemy.x <= 0) {
          this.currentDirection = MovingDirection.downRight;
          break;
        }
      } else if (this.currentDirection === MovingDirection.downRight) {
        if (this.moveDown(MovingDirection.right)) {
          break;
        }
      }
    }
  }

  moveDown(newDirection) {
    this.xVelocity = 0;
    this.yVelocity = this.defaultYVelocity;
    if (this.moveDownTimer <= 0) {
      this.currentDirection = newDirection;
      return true;
    }
    return false;
  }

  drawEnemies(ctx) {
    this.enemyRows.flat().forEach((enemy) => {
      enemy.move(this.xVelocity, this.yVelocity);
      enemy.draw(ctx);
    });
  }

  createEnemies() {
    // this adds the same number of enemyMap rows to the enemyRows array
    this.enemyMap.forEach((row, rowIndex) => {
      this.enemyRows[rowIndex] = [];
      // enemyNumber is the type of enemy and enemyInex is its posistion in the array
      row.forEach((enemyNumber, enemyIndex) => {
        // checks if there is an enemy (0 means no enemy)
        if (enemyNumber > 0) {
          // this puts enemy in row and determines space between them with * num
          this.enemyRows[rowIndex].push(
            new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber)
          );
        }
      });
    });
  }

  collideWith(sprite) {
    return this.enemyRows.flat().some((enemy) => enemy.collideWith(sprite));
  }
}
