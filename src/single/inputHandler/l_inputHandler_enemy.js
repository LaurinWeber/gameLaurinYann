export default class InputHandler_enemy {

    constructor(paddle) {

        document.addEventListener("keydown", event => {

            switch (event.keyCode) {
                case 38:
                    paddle.moveUp();//Hoch
                    break;
                case 40:
                    paddle.moveDown(); //Runter
                    break;
            }
        });

        //Stopping the paddle when key released

        document.addEventListener("keyup", event => {

            switch (event.keyCode) {
                case 38:
                    if (paddle.speed < 0) {
                        paddle.stop();
                    }

                    break;
                case 40:
                    if (paddle.speed > 0) {
                        paddle.stop();
                    }
                    break;

            }
        });


    }

}