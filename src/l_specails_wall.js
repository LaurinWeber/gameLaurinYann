export default class L_specials_wall {

    constructor(game) {

        this.img_wall = document.getElementById("img_wall");

        // get game boundaries
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        //define Paddle size
        this.width = 30;
        this.height = 100;

        //define paddle speed
        this.speed = 0; //at pause, start
        this.maxSpeed = 10;

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