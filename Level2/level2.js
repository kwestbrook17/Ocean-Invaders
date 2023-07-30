// This controller allows for the modules of js to be imported and used
import EnemyController from "./level2EnemyController.js";
import Player from "./Player2.js";
import BulletController from "./BulletController2.js";

const canvas = document.getElementById("game");
const restartBtn = document.getElementById("restart")
const menuBtn = document.getElementById("menu")
// ctx allows you to draw and manipulate 2D graphics (you pass 2D as an argument for 2 demensional drawings)
const ctx = canvas.getContext("2d");

//sets the size of canvas
canvas.width = 600;
canvas.height = 600;

const background = new Image();
// sets background for canvas
background.src = "../assets/images/pixelOcean.png";

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
//Game Over display/where we can add new levels
function displayGameOver() {
  if (isGameOver) {
    let text = didWin ? "You Win" : "Game Over";
    let textOffset = didWin ? 3.5 : 5;

    ctx.fillStyle = "white";
    ctx.font = "44px pixel";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    restartBtn.style.display = 'block'
    if (didWin) {
      setTimeout(() => {
        window.location.href = "../level3/level3.html";
      }, 2000); // 2 seconds
    }
  }
}
//Add return to menu function on loss
function checkGameOver() {
  if (isGameOver) {
    return;
  }

  if (enemyBulletController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.collideWith(player)) {
    isGameOver = true;
  }

  // to change levels
  if (enemyController.enemyRows.length === 0) {
    didWin = true;
    isGameOver = true;
  }
}
//this interval makes the game fucntion execute 60 times every sec (60fps)
setInterval(game, 1000 / 60);

restartBtn.addEventListener("click", () => {
  location.href = '../game.html';
  });
  menuBtn.addEventListener("click", ()=>{
    location.href = "../index.html"
  })
