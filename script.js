// This controller allows for the modules of js to be imported and used
import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("game");
// ctx allows you to draw and manipulate 2D graphics (you pass 2D as an argument for 2-dimensional drawings)
const ctx = canvas.getContext("2d");

// sets the size of the canvas
canvas.width = 600;
canvas.height = 600;

const background = new Image();
// sets the background for the canvas
background.src = "assets/images/ocean-background.jpg";

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
    ctx.font = "70px Arial";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);

    if (didWin) {
      setTimeout(() => {
        window.location.href = "level2/level2.html";
      }, 2000); // 2 seconds
    } else {
      // Draw the input initials field on the canvas
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fillRect(canvas.width / 4, canvas.height / 2 - 40, canvas.width / 2, 80);

      ctx.font = "30px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText("Enter Initials:", canvas.width / 2, canvas.height / 2);

      const initialsInput = document.getElementById("initialsInput");
      initialsInput.style.display = "block";
      initialsInput.style.position = "absolute";
      initialsInput.style.top = canvas.height / 2 + 5 + "px";
      initialsInput.style.left = canvas.width / 2 + 70 + "px";

      const saveButton = document.querySelector(".initial");
      saveButton.style.display = "block";
      saveButton.style.position = "absolute";
      saveButton.style.top = canvas.height / 2 + 5 + "px";
      saveButton.style.left = canvas.width / 2 + 70 + initialsInput.offsetWidth + 10 + "px";
       saveButton.addEventListener("click", saveData);
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

// Spotify API
createPlaylistIframe();

function createPlaylistIframe() {
  const playlistId = "5x9iRviSpvJv4rrHFT3WP0";
  const iframe = document.createElement("iframe");
  iframe.title = "Spotify Embed: Recommendation Playlist";
  iframe.src = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.style.minHeight = "360px";
  iframe.frameBorder = "0";
  iframe.allow =
    "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
  iframe.loading = "lazy";

  const playlistContainer = document.getElementById("playlist-container");
  playlistContainer.appendChild(iframe);
}

})