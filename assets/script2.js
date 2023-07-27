import BulletController from "./BulletController";

BulletController

//const playerBulletcontroller goes above enemycontroller and player
// 10 refereneces maximum bullets per screen
//red is the color of the bullets
//true references the sound

const playerBulletController = new BulletController(canvas,10, "red",true)


// add playerBulletController into new Player() line 18

// in function game() add:
//playerBulletController.draw(ctx);

//below title on index.html add <link rel="shortcut icon" href="#"/>

//NEXT COMMIT

//const enemyBulletcontroller goes above enemycontroller and player
// 10 refereneces maximum bullets per screen//could add more per level
//red is the color of the bullets
//true references the sound

const enemyBulletcontrollerBulletController = new BulletController(canvas,4, "red",true)
// add enemyBulletController into new enemycontorller() line 17

// in enemycontroller.js add enemybullet controller in line 23 in constructor

//on 25 add 
this.enemyBulletcontroller = enemyBulletcontroller

// on 22 add fireBulletTImerDefault = 100
// time that will when to fire bullet
// fireBulletTimer = this.fireBulletTimerDefault;

//inside draw method add this.firebullet()

fireBullet