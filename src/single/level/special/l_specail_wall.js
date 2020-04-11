import l_wall from "../../l_wall.js";

export default class L_special_wall {

    constructor(game) {

        this.img_wall = document.getElementById("img_wall_stat");
        this.img_moving = document.getElementById("img_moving");

        // get game boundaries
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;

        //define Paddle size
        this.size = 80;
        this.move = false;

        this.counter = 0;
        this.first = true;

        //define wall speed when moving
        this.speed = 0; //at pause, start
        this.maxSpeed = 2;

        this.posX = [2, 6]; //except center (amount of columns)
        this.posY = [1, 2, 3]; // amount of rows can be adjusted as ..100
        this.time = 300; //can be adjusted = "time" that the special effect stays on screen

        //total of 9 different positions
        this.spanPos = {
            x: 1 * this.gameWidth / (8),
            y: 1 * this.gameHeight / (this.posY.length + 1)
        }; // first position in top left corner, (x*2, y*2) -> center.

        this.position = {x: -100, y: -100};
        this.static = new l_wall(this.game, -100, -100, false);
    }

    // after update
    draw(context) {
        if (this.drawerWallStatic) {
            context.drawImage(this.img_wall, this.position.x, this.position.y, this.static.width, this.static.height);
            context.font = "bold 24px Arial";
            this.static.draw(context);
        }
        if (this.drawerWallMoving) {
            context.drawImage(this.img_moving, this.position.x, this.position.y, this.size, this.size);
            context.font = "bold 24px Arial";
            this.static.draw(context);
        }
    }

    //before draw
    update() {
        this.wallRebounce();

        if (this.counter === this.time) {
            // chose new icon to appear
            this.index = Math.floor(Math.random() * 2) + 1;
            if(this.first){
                this.index=1;
            }
        }

        //this.index = 1;
        switch (this.index) {
            case 1:
                this.drawerWallMoving = false;
                this.drawerWallStatic = true;
                this.wallStatic();
                this.static.update();
                break;
            case 2:
                this.drawerWallStatic = false;
                this.drawerWallMoving = true;
                this.wallMoving();

                break;
            default:
                break;
        }
        if(this.move){
            this.static.wallMoving();
            this.static.update();
        }
        this.counter++;
    }

    positionIcon() {
        this.rand_X = (Math.floor(Math.random() * this.posX.length)); //get random number between 1 -2
        this.rand_Y = (Math.floor(Math.random() * this.posY.length)); //get random number between 1 -3

        this.position.x = (this.posX[this.rand_X] * this.spanPos.x) - this.size / 2;
        this.position.y = (this.posY[this.rand_Y] * this.spanPos.y) - this.size / 2;

        this.counter = 0;
    }

    hit() {
        //check if span was hit by the ball, if so change ball size
        if (this.game.ball.position.x >= this.position.x &&
            this.game.ball.position.x <= this.position.x + this.size) {
            if (this.game.ball.position.y >= this.position.y &&
                this.game.ball.position.y <= this.position.y + this.size) {
                return true;
            }
        }
    }

    resetPos() {
        //change position of span -> after hit
        this.position.x = -100;
        this.position.y = -100;
    }

    wallStatic() {
        if (this.counter === this.time) {
            this.positionIcon();
        } else if (this.hit()) {
            this.static.position.x = this.position.x;
            this.static.position.y = this.position.y;
            this.resetPos();
            this.first = false;
        }
    }

    wallMoving() {
        if (this.counter === this.time) {
            this.positionIcon();
        } else if (this.hit()) {
            this.resetPos();
            this.static.speed = this.static.maxSpeed;
            this.static.wallMoving();// up and down on Y axis
            if(!this.move){
               this.move = true
            }
            else{
                this.move = false;
            }
        }
    }

    wallRebounce(){
        if(this.game.ball.velocity_X > 0){ //moving right
            if(this.game.ball.position.x + this.game.ball.size > this.static.position.x &&
            this.game.ball.position.x + this.game.ball.size < this.static.position.x+this.static.width){ // on height of paddle x -axe
                if(this.game.ball.position.y + this.game.ball.size > this.static.position.y && this.game.ball.position.y < this.static.position.y + this.static.height){
                    this.game.ball.velocity_X = -this.game.ball.velocity_X;
                }

            }
        }
        if(this.game.ball.velocity_X < 0){ //moving left
            if(this.game.ball.position.x > this.static.position.x &&
            this.game.ball.position.x < this.static.position.x + this.static.width){
                if(this.game.ball.position.y + this.game.ball.size > this.static.position.y
                && this.game.ball.position.y < this.static.position.y + this.static.height){
                    this.game.ball.velocity_X = -this.game.ball.velocity_X;
                }
            }
        }
    }

}