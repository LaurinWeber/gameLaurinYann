export default class L_specials_wall {

    constructor(game) {

        this.img_wall = document.getElementById("img_wall");

        // get game boundaries
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;

        //define Paddle size
        this.width = 30;
        this.height = 100;

        //define paddle speed
        this.speed = 0; //at pause, start
        this.maxSpeed = 2;

        //define start position
        this.position = {
            x: this.gameWidth /2 - this.width/2,
            y: 0
        };
    }

    // after update
    draw(context) {
            context.drawImage(this.img_wall, this.position.x, this.position.y, this.width, this.height);
            context.font = "bold 24px Arial";
    }

    //before draw
    update() {
        if (this.game.ball.position.x < this.position.x + this.width + this.game.ball.size && this.game.ball.position.x > this.position.x  - this.game.ball.size) { //Ball on height of wall
            if (this.game.ball.position.y - this.game.ball.size / 2 > this.position.y && this.game.ball.position.y < this.position.y + this.height) { // ball hits wall
                this.game.ball.velocity_X = -this.game.ball.velocity_X;
            }
        }
        //define boundary Bottom
        if (this.position.y > this.gameHeight - this.height && this.speed > 0) {
            this.speed =- this.maxSpeed;
        }

        //define boundary Top
        if (this.position.y < 1 && this.speed <= 0) {
            this.speed = this.maxSpeed;
        }
        this.position.y += this.speed;
    }

}