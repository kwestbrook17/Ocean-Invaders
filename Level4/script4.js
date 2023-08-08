// This controller allows for the modules of js to be imported and used
import EnemyController from "../Level4/EnemyController4.js";
import Player from "../Level4/Player4.js";
import BulletController from "../Level4/BulletController4.js";

const canvas = document.getElementById("game");
const restartBtn = document.getElementById("restart");
const menuBtn = document.getElementById("menu");
// ctx allows you to draw and manipulate 2D graphics (you pass 2D as an argument for 2-dimensional drawings)
const ctx = canvas.getContext("2d");

//sets the size of canvas
function checkWindowWidth() {
  if (window.innerWidth <= 650) {
    console.log("Window width is 600 pixels or less.");
    canvas.width = 400;
    canvas.height = 400;
  } else {
    canvas.width = 600;
    canvas.height = 600;
    console.log("Window width is greater than 600 pixels.");
  }
}

// Check window width when the page loads
checkWindowWidth();

const background = new Image();
// sets the background for the canvas
background.src = "../assets/images/background4.png";

// 10 references maximum bullets per screen
// red is the color of the bullets
// true references the sound
const playerBulletController = new BulletController(
  canvas,
  10,
  "rgb(0, 255, 0)",
  true
);
const enemyBulletController = new BulletController(canvas, 4, "red", false);
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;
let playerScore = 0;

// Function to display game over and high scores
function displayGameOver() {
  if (isGameOver) {
    let text = didWin ? "You Win" : "Game Over";
    let textOffset = didWin ? 3.5 : 5;

    ctx.fillStyle = "white";
    if (window.innerWidth <= 650) {
      ctx.font = "30px pixel";
    } else {
      ctx.font = "44px pixel";
    }
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    if (isGameOver && !didWin) {
      restartBtn.style.display = "block";
    }
    if (didWin) {
      setTimeout(() => {
        window.location.href = "../Level5/Level5.html";
      }, 2000); // 2 seconds
    }
  }
}

// Function to check if the game is over
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

  if (enemyController.highestRow.y <= canvas.height) {
    isGameOver = true;
  }

  // to change levels
  if (enemyController.enemyRows.length === 0) {
    didWin = true;
    isGameOver = true;
  }
}

// Game function to handle drawing and updating game elements
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

// Function to update the player's score and call game function repeatedly
function startGame() {
  playerScore = 0;
  setInterval(game, 1000 / 60);
}

// Call the startGame function to start the game
startGame();

restartBtn.addEventListener("click", () => {
  location.href = "../game.html";
});
menuBtn.addEventListener("click", () => {
  location.href = "../index.html";
});
window.addEventListener("resize", checkWindowWidth);
