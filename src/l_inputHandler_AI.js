export default class L_inputHandler_AI {

    // player on the left
    // AI on the right of the canvas


    constructor(paddle_AI, ball, game) {
        this.game = game;
        this.paddle_AI = paddle_AI;
        this.ball = ball;

    }//end constructor

    ai() {
        //this.min = 0.78;
        //this.max = .98
        //random number for speed to get some varity into the game
        //this.paddle_AI.speed = this.paddle_AI.speed * Math.random()*(this.max-this.min) + this.min;
        //this.paddle_AI.stop();// like letting go the key (keyUp)
        // 1.) if pos.Ball "X" > 0 -> move paddle to the center
        if (this.ball.velocity_X > 0) {
            //alert("Ball X: " + this.ball.position.x);
            //alert("Ball Y: " + this.ball.position.y);
            if (this.ball.position.y > Math.trunc(this.paddle_AI.position.y+this.paddle_AI.height/2)) {
                //alert("before MoveDown1: " + this.paddle_AI.position.y);
                this.paddle_AI.moveDown();

                //alert("after MoveDown1: " + this.paddle_AI.position.y);
            }
            if (this.ball.position.y <  Math.trunc(this.paddle_AI.position.y+this.paddle_AI.height/2)) { // ball not in center.. - this.ball.size/2
                //("before MoveUp1: " + this.paddle_AI.position.y);
                this.paddle_AI.moveUp();
                //alert("after MoveUp1: " + this.paddle_AI.position.y);
            }

        }
        if (this.ball.velocity_X < 0){
            // positioning the paddle always back to the center, after hit
            // paddle above court center
           if (this.game.gameHeight / 2 - Math.trunc(this.paddle_AI.position.y + this.paddle_AI.height / 2) < -this.paddle_AI.speed ) {
                   this.paddle_AI.moveUp();
            }
            // paddle below court center
            if (this.game.gameHeight / 2 - Math.trunc(this.paddle_AI.position.y + this.paddle_AI.height / 2) > 0-this.paddle_AI.speed ) {
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