import L_paddle_AI from "./l_paddle_AI.js";

export default class L_inputHandler_AI {

    // player on the left
    // AI on the right of the canvas

    constructor(l_paddle_AI, game)  {

        // 1.) if pos.Ball "X" > 0 -> move paddle to the center

            // 2.) if pos.Ball "Y" > pos. paddle_AI "Y" 

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


    }

}