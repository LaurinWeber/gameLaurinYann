export default class L_wall {

    constructor(game, x ,y, moving) {

        this.img_wall = document.getElementById("img_wall");

        // get game boundaries
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;

        //define Paddle size
        this.width = 30;
        this.height = 100;

        //define wall speed when moving
        this.speed = 0; //at pause, start
        this.maxSpeed = 2;

        this.position = {x: x, y: y};

        this.moving = moving;
    }

    // after update
    draw(context) {
        context.drawImage(this.img_wall, this.position.x, this.position.y, this.width, this.height);
        context.font = "bold 24px Arial";
    }

    //before draw
    update() {
        if (this.moving) {
            this.wallMoving();
        }
    }


    //up and down
    wallMoving() {
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