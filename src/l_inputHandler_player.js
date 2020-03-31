export default class L_inputHandler_player {

    constructor(paddle_player, game) {

        document.addEventListener("keydown", event => {

            switch (event.keyCode) {
                case 16: // shift -> up
                    paddle_player.moveUp();
                    event.preventDefault();
                    break;
                case 17: // ctl -> down
                    paddle_player.moveDown();
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
                case 16:
                    paddle_player.stop();
                    event.preventDefault();
                    break;
                case 17:
                    paddle_player.stop();
                    event.preventDefault();
                    break;
            }
        });


    }

}