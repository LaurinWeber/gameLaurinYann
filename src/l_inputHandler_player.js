export default class L_inputHandler_player {

    constructor(l_paddle_player) {

        document.addEventListener("keydown", event => {

            switch (event.keyCode) {
                case 38: // shift -> up
                    l_paddle_player.moveUp();
                    event.preventDefault();
                    break;
                case 40: // ctl -> down
                    l_paddle_player.moveDown();
                    event.preventDefault();
                    break;
                case 27: // ESC to pause the game
                    game.togglePause();
                    event.preventDefault();
                    break;
            }
        });

        //Stopping the paddle when key released
        document.addEventListener("keyup", event => {

            switch (event.keyCode) {
                case 38:
                    l_paddle_player.stop();
                    event.preventDefault();
                    break;
                case 40:
                    l_paddle_player.stop();
                    event.preventDefault();
                    break;
            }
        });


    }

}