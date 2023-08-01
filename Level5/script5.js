// This controller allows for the modules of js to be imported and used
import EnemyController from "../level5/EnemyController5.js";
import Player from "../level5/Player5.js";
import BulletController from "../level5/BulletController5.js";

const canvas = document.getElementById("game");
const menuBtn = document.getElementById("menu");
const restartBtn = document.getElementById("restart");
// ctx allows you to draw and manipulate 2D graphics (you pass 2D as an argument for 2-dimensional drawings)
const ctx = canvas.getContext("2d");

//sets the size of canvas
canvas.width = 600;
canvas.height = 600;
const background = new Image();
// sets the background for the canvas
background.src = "../assets/images/pixelBackground.png";

// 10 references maximum bullets per screen
// red is the color of the bullets
// true references the sound
const playerBulletController = new BulletController(
  canvas,
  10,
  "rgb(0, 255, 0)",
  true
);
const enemyBulletController = new BulletController(
  canvas,
  4,
  "rgb(255, 255, 0)",
  false
);
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;
let playerInitials = "";

// Function to save initials and score to local storage
function saveData() {
  const initialsInput = document.getElementById("initialsInput");
  playerInitials = initialsInput.value.trim().toUpperCase();
  if (playerInitials) {
    // Save the player's initials and score to local storage with a key "highScores"
    const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScores.push({ initials: playerInitials });
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Redirect to highscores.html after saving initials
    window.location.href = "../highscore.html";
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
    if (isGameOver && !didWin) {
      restartBtn.style.display = "block";
    }
    if (didWin) {
      // Get the reference to the initials input field using its ID
      const initialsInput = document.getElementById("initialsInput");
      const userInput = document.getElementById("user-input");

      // Calculate the position for the initials input field in the middle of the screen
      const inputTop = window.innerHeight / 2 - initialsInput.offsetHeight / 2;
      const inputLeft = window.innerWidth / 2 - initialsInput.offsetWidth / 2;

      // Set the display and position styles for the initials input field
      initialsInput.classList.remove("hidden");
      initialsInput.style.top = inputTop + "px";
      initialsInput.style.left = inputLeft + "px";
      initialsInput.style.backgroundColor = "blue"; // Set the background color to blue
      initialsInput.style.color = "white";
      initialsInput.style.fontFamily = "pixel, sans-serif";
      // Set a higher z-index so the input field is on top of the canvas
      canvas.style.zIndex = "0";

      // Create the save button
      const saveButton = document.querySelector(".initial");

      // Calculate the position for the save button just below the input field
      const buttonTop = inputTop + initialsInput.offsetHeight + 10;
      const buttonLeft = window.innerWidth / 2 - saveButton.offsetWidth / 2;

      // Set the display and position styles for the save button
      saveButton.classList.remove("hidden");
      saveButton.style.top = buttonTop + "px";
      saveButton.style.left = buttonLeft + "px";
      saveButton.style.backgroundColor = "blue"; // Set the background color to green
      saveButton.style.color = "white"; // Set the text color to white
      saveButton.style.fontFamily = "pixel, sans-serif";

      saveButton.addEventListener("click", saveData);
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
  setInterval(game, 1000 / 60);
}

// Call the startGame function to start the game
startGame();

menuBtn.addEventListener("click", () => {
  location.href = "index.html";
});
restartBtn.addEventListener("click", () => {
  location.href = "../game.html";
});
