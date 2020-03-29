
export default class Ball {

    constructor(game){

        this.image = document.getElementById("img_ball");

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;

        this.position = {x: 10, y: 10};

        this.speed ={x: 4, y: 2};

        this.size = 20;

        this.score1 = 0;
        this.score2 = 0;

    }


    draw(context){
        context.drawImage(this.image,this.position.x,this.position.y,this.size,this.size);
        context.font = "bold 24px Arial";
        context.fillText(this.score1, 0, 300);
        context.fillText(this.score2, 785, 300);
    }

    update(deltaTime){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        //collision left/right
        if (this.position.x + this.size > this.gameWidth || this.position.x < 0){
            this.speed.x =- this.speed.x;
        }

        //collison bottom
        if (this.position.y + this.size > this.gameHeight){
            this.score1++;
            this.speed.y =- this.speed.y;
        }

        //collison top
        if (this.position.y < 0){
            this.score2++;
            this.speed.y =- this.speed.y;
        }

        //collision with paddle
        let bottomOfBall = this.position.y + this.size;
        let topOfPaddle = this.game.paddle.position.y;
        let leftSideOfPaddle = this.game.paddle.position.x;
        let rightSideOfPaddle = this.game.paddle.position.x + this.game.paddle.width;

        if (bottomOfBall >= topOfPaddle && this.position.x >= leftSideOfPaddle && this.position.x + this.size <= rightSideOfPaddle){
            this.speed.y =- this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }

        //collision with paddle2
        let topOfBall2 = this.position.y + (1/2*this.size);
        let bottomOfPaddle2 = this.game.paddle2.position.y + this.game.paddle.height;
        let leftSideOfPaddle2 = this.game.paddle2.position.x;
        let rightSideOfPaddle2 = this.game.paddle2.position.x + this.game.paddle2.width;

        console.log();

        if (topOfBall2 <= bottomOfPaddle2 && this.position.x >= leftSideOfPaddle2 && this.position.x + this.size <= rightSideOfPaddle2){
            this.speed.y =- this.speed.y;
            this.position.y = this.game.paddle2.position.y + this.size;
        }

    }

}