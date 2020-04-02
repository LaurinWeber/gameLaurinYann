export default class Paddle2 {

    constructor(game){

        this.gameWidth = game.gameWidth;
        this.gameHight = game.gameHeight;

        this.width = 30;
        this.height = 150;

        this.maxSpeed = 7;
        this.speed = 0;

        this.position = {
            x: this.gameWidth - 50 - this.width,
            y: game.gameHeight / 2 - this.height / 2
        };

    }

    moveUp(){
        this.speed =-this.maxSpeed;
    }

    moveDown(){
        this.speed = this.maxSpeed;
    }

    stop(){
        this.speed = 0;
    }

    draw(context){
        console.log("drawing")
        context.fillStyle = "#ffffff"
        context.fillRect(this.position.x,this.position.y,this.width,this.height);

    }

    update(deltaTime){

        this.position.y += this.speed;

        //define boundary Bottom
        if (this.position.y > this.gameHight - this.height) {
            this.position.y = this.gameHight - this.height;
        }

        //define boundary Top
        if (this.position.y < 1) {
            this.position.y = 1;
        }
    }

}