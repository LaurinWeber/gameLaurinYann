export default class InputHandler2 {

    constructor(paddle) {

        document.addEventListener("keydown", event => {

            switch (event.keyCode) {
                case 65:
                    paddle.moveLeft();
                    break;
                case 68:
                    paddle.moveRight(); //-->
                    break;
            }
        });

        //Stopping the paddle when key released

        document.addEventListener("keyup", event => {

            switch (event.keyCode) {
                case 65:
                    if (paddle.speed < 0) {
                        paddle.stop();
                    }

                    break;
                case 68:
                    if (paddle.speed > 0) {
                        paddle.stop();
                    }
                    break;

            }
        });


    }

}