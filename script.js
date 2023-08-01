// This controller allows for the modules of js to be imported and used
import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("game");
const restartBtn = document.getElementById("restart");
const menuBtn = document.getElementById("menu");
// ctx allows you to draw and manipulate 2D graphics (you pass 2D as an argument for 2-dimensional drawings)
const ctx = canvas.getContext("2d");

//sets the size of canvas
canvas.width = 600;
canvas.height = 600;

const background = new Image();
// sets the background for the canvas
background.src = "assets/images/pixelBackground.png";

// 10 references maximum bullets per screen
// red is the color of the bullets
// true references the sound
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
let playerInitials = "";
let playerScore = 0;

// Function to save initials and score to local storage
function saveData() {
  const initialsInput = document.getElementById("initialsInput");
  playerInitials = initialsInput.value.trim().toUpperCase();
  if (playerInitials) {
    // Save the player's initials and score to local storage with a key "highScores"
    const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScores.push({ initials: playerInitials, score: playerScore });
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Redirect to highscores.html after saving initials
    window.location.href = "highscore.html";
  }
}

// Function to retrieve the player's initials from local storage
function getPlayerInitials() {
  const storedInitials = localStorage.getItem("playerInitials");
  if (storedInitials) {
    playerInitials = storedInitials;
  }
}

// Function to display game over and high scores
function displayGameOver() {
  if (isGameOver) {
    getPlayerInitials(); // Retrieve the player's initials from local storage
    let text = didWin ? "You Win" : "Game Over";
    let textOffset = didWin ? 3.5 : 5;

    ctx.fillStyle = "white";
    ctx.font = "44px pixel";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);

    if (didWin) {
      setTimeout(() => {
        window.location.href = "level2/level2.html";
      }, 2000); // 2 seconds
    }
  }
}

// Function to update the player's score
function updateScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.style.display = "block";
  scoreElement.innerText = `Your Score: ${playerScore}`;
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
  setInterval(updateScore, 1000);
}

// Call the startGame function to start the game
startGame();

restartBtn.addEventListener("click", () => {
  location.reload();
});
menuBtn.addEventListener("click", () => {
  location.href = "index.html";
});
