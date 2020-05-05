export default class L_inputHandler_player {

    constructor(l_paddle_player, menu) {

        document.addEventListener("keydown", event => {

            switch (event.keyCode) {
                case 87: // w -> up
                    l_paddle_player.moveUp();
                    event.preventDefault();
                    break;
                case 83: // s -> down
                    l_paddle_player.moveDown();
                    event.preventDefault();
                    break;
                case 27: // ESC to pause the game
                    menu.togglePause();
                    event.preventDefault();
                    break;
            }
        });

        //Stopping the paddle when key released
        document.addEventListener("keyup", event => {

            switch (event.keyCode) {
                case 87: //w
                    l_paddle_player.stop();
                    event.preventDefault();
                    break;
                case 83: //s
                    l_paddle_player.stop();
                    event.preventDefault();
                    break;
            }
        });


    }

}