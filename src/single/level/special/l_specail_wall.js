export default class L_special_wall {

    constructor(game) {

        this.img_wall = document.getElementById("img_wall");
        this.img_wall = document.getElementById("img_moving");

        // get game boundaries
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;

        //define Paddle size
        this.width = 30;
        this.height = 100;

        this.counter = 0;

        //define wall speed when moving
        this.speed = 0; //at pause, start
        this.maxSpeed = 2;

        this.posX = [2, 6]; //except center (amount of columns)
        this.posY = [1, 2, 3]; // amount of rows can be adjusted as ..100
        this.time = 300; //can be adjusted = "time" that the special effect stays on screen

        //total of 9 different positions
        this.spanPos = {
            x: 1 * this.gameWidth / (this.posX.length + 2),
            y: 1 * this.gameHeight / (this.posY.length + 1)
        }; // first position in top left corner, (x*2, y*2) -> center.

        this.position = {x: 20, y: 20};

        /*//define start position
        this.position = {
            x: this.gameWidth / 2 - this.width / 2,
            y: 0
        };*/
    }

    // after update
    draw(context) {
        if(this.drawerWallStatic){
            context.drawImage(this.img_wall, this.position.x, this.position.y, this.width, this.height);
            context.font = "bold 24px Arial";
        }
        if(this.drawerWallMoving){
            context.drawImage(this.img_wall, this.position.x, this.position.y, this.width, this.height);
            context.font = "bold 24px Arial";
        }
    }

    //before draw
    update() {
        //reset
        this.drawerWallStatic = false;
        this.drawerWallMoving = false;
        this.index = 2;
        switch (this.index) {
            case 1:
                this.wallStatic();
                this.drawerWallStatic = true;
                break;
            case 2:
                this.wallMoving();
                this.drawerWallMoving = true;
                break;
            default:
                break;
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
    wallIcon() {
        if (this.counter === this.time) {
            this.positionIcon();
        } else if (this.hit()) {
            this.resetPos();
            for (var i = 0; i < this.sizes.length; i++) {
                if (this.game.ball.size == this.sizes[i]) {
                    this.game.ball.size = this.sizes[i-1];
                    return;
                }
            }
        }
    }

    wallStatic() {
        this.position.y = this.position.y;
        this.position.x = this.position.x;
    }

    //up and down
    wallMoving() {
        if (this.game.ball.position.x < this.position.x + this.width + this.game.ball.size && this.game.ball.position.x > this.position.x - this.game.ball.size) { //Ball on height of wall
            if (this.game.ball.position.y - this.game.ball.size > this.position.y && this.game.ball.position.y < this.position.y + this.height) { // ball hits wall
                this.game.ball.velocity_X = -this.game.ball.velocity_X;
            }
        }
        //define boundary Bottom
        if (this.position.y > this.gameHeight - this.height && this.speed > 0) {
            this.speed = -this.maxSpeed;
        }

        //define boundary Top
        if (this.position.y < 1 && this.speed <= 0) {
            this.speed = this.maxSpeed;
        }
        this.position.y += this.speed;
    }


}