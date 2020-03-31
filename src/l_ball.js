

export default class L_ball {

    constructor(game){
        // pass ref
        this.game = game;

        // get img from the ball
        this.image = document.getElementById("img_ball");
        this.size = 20; // define size (x = 20 & y = 20 px)

        // define boundaries for the ball, as already defined in game.js
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        // define start pos of the ball
        this.position = {x: this.gameWidth/2, y: this.gameHeight/2};

        // start speed
        this.speed = 5;
        // start direction (the player starts)
        this.velocity_X = -5;
        this.velocity_Y = 0;

        this.angle = {top: 45, upperCenter: 20, center: 0, lowerCenter: -20, bottom: -45};

        // ball launch, game (Anspiel)
        this.launch = true;

        // couter for the score
        this.scorePlayer = 0;
        this.scoreEnemy = 0;
    }

    // draw ball and score
    draw(context){
        context.drawImage(this.image,this.position.x,this.position.y,this.size,this.size);
        context.font = "bold 24px Arial";
        context.fillText(this.scorePlayer, 0, 300);
        context.fillText(this.scoreEnemy, 785, 300);
    }


    update(deltaTime){
        // position of paddels
        //player
        let player_x = this.game.paddle_player.position.x; //constant
        let player_y = this.game.paddle_player.position.y;
        // AI
        let ai_x = this.game.paddle_AI.position.x; //constant
        let ai_y = this.game.paddle_AI.position.y;

        // size of paddle
        let paddle_height = this.game.paddle_player.height; // constant
        let paddle_width = this.game.paddle_player.width; // constant

        // ball moving to the left
        if(this.velocity_X < 0){
            if(this.position.x == player_x + paddle_width){ //Ball on height of paddle player



            }
        }
        // ball moving to the right
        else if(this.velocity_X > 0) {
            if(this.position.y == ai_x){ //Ball on height paddle ai



            }
        }



        /*
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
        }*/

    }

}