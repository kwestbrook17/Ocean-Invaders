import BulletController from "./BulletController";

BulletController

//const playerBulletcontroller goes above enemycontroller and player
// 10 refereneces maximum bullets per screen
//red is the color of the bullets
//true references the sound

const playerBulletController = new BulletController(canvas,10, "red",true)

// add playerBulletController into new Player() line 6

// in function game() add:
//playerBulletController.draw(ctx);

//below title on index.html add <link rel="shortcut icon" href="#"/>