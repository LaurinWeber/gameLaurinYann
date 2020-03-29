export default class Paddle2 {

    constructor(game){

        this.gameWidth = game.gameWidth;

        this.width = 150;
        this.height = 30;

        this.maxSpeed = 7;
        this.speed = 0;

        this.position = {
            x: game.gameWidth / 2 - this.width / 2,
            y: 10 //Muss noch korrigiert werden, ist hart codiert
        };

    }

    moveLeft(){
        this.speed =-this.maxSpeed;
    }

    moveRight(){
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

        this.position.x += this.speed;

        if(this.position.x < 0){
            this.position.x =0;
        }

        if(this.position.x + this.width > this.gameWidth){
            this.position.x =this.gameWidth-this.width;
        }
    }

}