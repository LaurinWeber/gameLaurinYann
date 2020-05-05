export default class InputHandler {

    constructor(paddle, game) {

        document.addEventListener("keydown", event => {

            switch (event.keyCode) {
                case 16:
                    paddle.moveUp(); //shift
                    break;
                case 17:
                    paddle.moveDown(); //ctrl
                    break;
                case 27:
                    game.togglePause(); //ESC to pause the game
                    break;
            }
        });

        //Stopping the paddle when key released

        document.addEventListener("keyup", event => {

            switch (event.keyCode) {
                case 16:
                    if (paddle.speed < 0) {
                        paddle.stop();
                    }

                    break;
                case 17:
                    if (paddle.speed > 0) {
                        paddle.stop();
                    }
                    break;

            }
        });


    }

}