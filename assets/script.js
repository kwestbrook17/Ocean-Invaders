// This controller allows for the modules of js to be imported and used
import EnemyController from "./EnemyController.js";

import Player from "../Player";

const player = new Player(canvas, 3);

const canvas = document.getElementById("game");
// ctx allows you to draw and manipulate 2D graphics (you pass 2D as an argument for 2 demensional drawings)
const ctx = canvas.getContext("2d");

//sets the size of canvas
canvas.width = 600;
canvas.height = 600;

const background = new Image();

// sets background for canvas
background.src = "assets/images/ocean-background.jpg";

const enemyController = new EnemyController(canvas);

function game() {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  enemyController.draw(ctx);
  player.draw(ctx);
}

//this interval makes the game fucntion execute 60 times every sec (60fps)
setInterval(game, 1000 / 60);
