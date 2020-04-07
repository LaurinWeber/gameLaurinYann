import L_paddle_player from "./l_paddle_player.js";
import L_paddle_AI from "./l_paddle_AI.js";

import L_inputHandler_player from "./l_inputHandler_player.js";
import L_inputHandler_AI from "./l_inputHandler_AI.js";
import L_ball from "./l_ball.js";
import L_specials from "./l_specails.js";

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
};


export default class L_gameSinglePlayer {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    create(){

        this.gamestate = GAMESTATE.MENU;

        this.paddle_player = new L_paddle_player(this);
        this.paddle_AI = new L_paddle_AI(this)
        this.ball = new L_ball(this);
        this.specials = new L_specials(this);
        this.gameObjects = [
            this.paddle_player,
            this.paddle_AI,
            this.ball,
            this.specials
        ];



        new L_inputHandler_player(this.paddle_player);
        this.ai = new L_inputHandler_AI(this.paddle_AI, this.ball, this);

    }

    update(){

        //Check player score to GameOver

        if (this.ball.scorePlayer === 5 ||this.ball.scoreEnemy === 5){
            this.gamestate = GAMESTATE.GAMEOVER;
        }

        //Stop updating when paused or in Menu
        if (this.gamestate === GAMESTATE.PAUSED ||this.gamestate === GAMESTATE.GAMEOVER){
            return;
        }
        this.ai.ai();
        this.gameObjects.forEach((object)=>object.update());

    }


    draw(context){
        this.gameObjects.forEach((object)=>object.draw(context));


        //Draw pause screen
        if (this.gamestate === GAMESTATE.PAUSED){
            context.rect(0,0,this.gameWidth,this.gameHeight);
            context.fillStyle = "#00b3b3"
            context.fill();

            //Draw "Paused" Test ont the screen
            context.font = "30px Arial";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }

        //Draw Game over screen
        if (this.gamestate === GAMESTATE.GAMEOVER){
            context.rect(0,0,this.gameWidth,this.gameHeight);
            context.fillStyle = "#00b3b3"
            context.fill();

            //Draw "Game Over" the screen
            context.font = "30px Arial";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText("Game over", this.gameWidth / 2, this.gameHeight / 2);
        }

    }

    togglePause(){
        //Pause
        if (this.gamestate == GAMESTATE.PAUSED){
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }

}