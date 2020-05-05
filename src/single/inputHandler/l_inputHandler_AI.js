export default class L_inputHandler_AI {

    // player on the left
    // AI on the right of the canvas
    constructor(paddle_AI, ball, game) {
        this.game = game;
        this.paddle_AI = paddle_AI;
        this.ball = ball;


    }//end constructor

    ai() {
        this.min = .9;
        this.max = .95
        //random number for speed to get some variety into the game
        this.rand = this.paddle_AI.maxSpeed * Math.random() * (this.max - this.min) + this.min;

        //console.log(this.paddle_AI.speed)
        let pBall = Math.round((this.ball.position.y + this.ball.size / 2) / this.paddle_AI.maxSpeed) * this.paddle_AI.maxSpeed;
        let pPaddle = Math.round((this.paddle_AI.position.y + this.paddle_AI.height / 2) / this.paddle_AI.maxSpeed) * this.paddle_AI.maxSpeed;
        let pCenter = Math.round((this.game.gameHeight / 2) / this.paddle_AI.maxSpeed) * this.paddle_AI.maxSpeed;
        //console.log("pBall : " + pBall);
        //console.log("pPaddle : " + pPaddle);

        // ball is moving to the right
        if (this.ball.velocity_X > 0) {
            //ball is moving straight
            if (this.ball.velocity_Y == 0) {
                pPaddle = Math.round((this.paddle_AI.position.y + 1 * this.paddle_AI.height / 3) / this.paddle_AI.maxSpeed) * this.paddle_AI.maxSpeed;
                if (pBall > pPaddle) {
                    this.paddle_AI.moveDown();
                }
                if (pBall < pPaddle) {
                    this.paddle_AI.moveUp();
                }
            }
            //ball is moving down
            if (this.ball.velocity_Y > 0) {
                pPaddle = Math.round((this.paddle_AI.position.y + 2 * this.paddle_AI.height / 3) / this.paddle_AI.maxSpeed) * this.paddle_AI.maxSpeed;
                if (pBall > pPaddle) {
                    this.paddle_AI.moveDown();
                }
            }
            //ball is moving up
            if (this.ball.velocity_Y < 0) {
                pPaddle = Math.round((this.paddle_AI.position.y + 1 * this.paddle_AI.height / 3) / this.paddle_AI.maxSpeed) * this.paddle_AI.maxSpeed;
                if (pBall < pPaddle) {
                    /*//random number for speed to get some varity into the game
                    this.rand = this.paddle_AI.maxSpeed*Math.random()*(this.max-this.min) + this.min;
                    this.paddle_AI.speed = this.paddle_AI.speed*this.rand;*/
                    this.paddle_AI.moveUp();
                }
            }
        }

        // ball is moving to the left
        if (this.ball.velocity_X < 0) {
            // positioning the paddle always back to the center, after hit
            //if ((pCenter - pPaddle < 0 || pCenter - pPaddle - this.paddle_AI.speedMax > 0) &&
              //  (pCenter - pPaddle - this.paddle_AI.speedMax < 0 || pCenter - pPaddle + this.paddle_AI.speedMax > 0)) {
                if (pCenter - pPaddle < 0) {
                    // paddle above court center
                    this.paddle_AI.moveUp();
                }
                // paddle below court center
                if (pCenter - pPaddle > 0) {
                    this.paddle_AI.moveDown();
                }
            //}
        }
    }
}
