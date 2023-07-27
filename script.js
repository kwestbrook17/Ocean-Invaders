// This controller allows for the modules of js to be imported and used
import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("game");
// ctx allows you to draw and manipulate 2D graphics (you pass 2D as an argument for 2 demensional drawings)
const ctx = canvas.getContext("2d");

//sets the size of canvas
canvas.width = 600;
canvas.height = 600;

const background = new Image();
// sets background for canvas
background.src = "assets/images/ocean-background.jpg";

// 10 refereneces maximum bullets per screen
//red is the color of the bullets
//true references the sound
const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyBulletController = new BulletController(canvas, 4, "white", false);
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;

function game() {
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();
  if (!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
  }
}

//this interval makes the game fucntion execute 60 times every sec (60fps)
setInterval(game, 1000 / 60);
