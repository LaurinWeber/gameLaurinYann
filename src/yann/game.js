import Paddle from "./paddle.js";
import Paddle2 from "./paddle2.js";
import SpecialPaddle from "./special_paddle.js";
import Ball from "./ball.js";
import InputHandler from "./inputHandler.js";
import InputHandler2 from "./inputHandler2.js";
import Sound from "./sound.js";

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
};

export default class Game {


    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    start() {

        this.gamestate = GAMESTATE.MENU;

        this.paddle = new Paddle(this);
        this.paddle2 = new Paddle2(this);

        this.specialPaddle = new SpecialPaddle(this);

        this.ball = new Ball(this);

        this.sound = new Sound();

        new InputHandler(this.paddle, this);
        new InputHandler2(this.paddle2, this);

        this.gameObjects = [
            this.paddle,
            this.paddle2,
            this.specialPaddle,
            this.ball
        ];
    }


    update(deltaTime) {

        //Check player score to GameOver
        if (this.ball.scorePlayer1 === 5 || this.ball.scorePlayer2 === 5) {
            this.gamestate = GAMESTATE.GAMEOVER;
        }

        //Stop updating when paused or in Menu
        if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.GAMEOVER) {
            return;
        }

        this.gameObjects.forEach((object) => object.update(deltaTime));

    }


    draw(context) {

        this.gameObjects.forEach((object) => object.draw(context));

        //Draw pause screen
        if (this.gamestate === GAMESTATE.PAUSED) {
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle = "#00b3b3"
            context.fill();

            //Draw "Paused" Test ont the screen
            context.font = "30px Arial";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }

        //Draw Game over screen
        if (this.gamestate === GAMESTATE.GAMEOVER) {
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle = "#00b3b3"
            context.fill();

            //Draw "Game Over" the screen
            context.font = "30px Arial";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText("Game over", this.gameWidth / 2, this.gameHeight / 2);
        }

    }

    togglePause() {
        //Pause
        if (this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }


}