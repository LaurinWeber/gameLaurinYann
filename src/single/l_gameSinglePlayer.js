import L_paddle_player from "./player/l_paddle_player.js";
import L_paddle_AI from "./ai/l_paddle_AI.js";

import L_inputHandler_player from "./player/l_inputHandler_player.js";
import L_inputHandler_AI from "./ai/l_inputHandler_AI.js";
import L_ball from "./l_ball.js";
import L_special_ball from "./level/special/l_specail_ball.js";
import L_special_wall from "./level/special/l_specail_wall.js";
import {L_level} from "./level/l_level.js";

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
        this.level = new L_level(this);
        //this.specials_ball = new L_special_ball(this);
        //this.specials_wall = new L_special_wall(this);
        this.gameObjects = [
            this.paddle_player,
            this.paddle_AI,
            this.level,
            //this.specials_ball,
            //this.specials_wall,
            this.ball
        ];



        new L_inputHandler_player(this.paddle_player, this);
        this.ai = new L_inputHandler_AI(this.paddle_AI, this.ball, this);

    }

    update(){

        //Check player score to GameOver
        if (this.ball.scorePlayer === 15 ||this.ball.scoreEnemy === 15){
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