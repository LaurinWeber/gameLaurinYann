export default class L_inputHandler_AI {

    // player on the left
    // AI on the right of the canvas
    constructor(paddle_AI, ball, game) {
        this.game = game;
        this.paddle_AI = paddle_AI;
        this.ball = ball;


    }//end constructor

    ai() {
        this.min = 0.4;
        this.max = .8

        //console.log(this.paddle_AI.speed)
        let pBall = Math.round((this.ball.position.y + this.ball.size /2) /this.paddle_AI.maxSpeed)*this.paddle_AI.maxSpeed;
        let pPaddle = Math.round((this.paddle_AI.position.y+this.paddle_AI.height/2) /this.paddle_AI.maxSpeed)*this.paddle_AI.maxSpeed;
        let pCenter =  Math.round((this.game.gameHeight / 2) /this.paddle_AI.maxSpeed)*this.paddle_AI.maxSpeed;
        //console.log("pBall : " + pBall);
        //console.log("pPaddle : " + pPaddle);

        //this.paddle_AI.stop();// like letting go the key (keyUp)
        // 1.) if pos.Ball "X" > 0 -> move paddle to the center
        if (this.ball.velocity_X > 0) {
            if (pBall > pPaddle){
                //random number for speed to get some varity into the game
                this.rand = this.paddle_AI.maxSpeed*Math.random()*(this.max-this.min) + this.min;
                this.paddle_AI.speed = this.paddle_AI.maxSpeed*this.rand;
                this.paddle_AI.moveDown();
            }
            if (pBall < pPaddle)  {
                //random number for speed to get some varity into the game
                this.rand = this.paddle_AI.maxSpeed*Math.random()*(this.max-this.min) + this.min;
                this.paddle_AI.speed = this.paddle_AI.speed*this.rand;
                this.paddle_AI.moveUp();
            }
        }

        if (this.ball.velocity_X < 0){
            // positioning the paddle always back to the center, after hit
            // paddle above court center
           if (pCenter - pPaddle < 0 ) {
                   this.paddle_AI.moveUp();
            }
            // paddle below court center
            if (pCenter - pPaddle > 0 ) {
                this.paddle_AI.moveDown();
            }
        }
    }

    /* ==================================================================================
            document.addEventListener("keydown", event => {

                switch (event.keyCode) {
                    case 38: // shift -> up
                        l_paddle_AI.moveUp();
                        event.preventDefault();
                        break;
                    case 40: // ctl -> down
                        l_paddle_AI.moveDown();
                        event.preventDefault();
                        break;
                }
            });

            //Stopping the paddle when key released
            document.addEventListener("keyup", event => {

                switch (event.keyCode) {
                    case 38:
                        l_paddle_AI.stop();
                        event.preventDefault();
                        break;
                    case 40:
                        l_paddle_AI.stop();
                        event.preventDefault();
                        break;
                }
            });

    */


}