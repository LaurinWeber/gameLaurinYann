import Ball from "./ball.js";

import Paddle_player from "./paddle_player";
import Paddle_AI from "./paddle_AI";

import InputHandler_player from "./inputHandler_player";
import InputHandler_AI from "./inputHandler_AI";

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

    start(){

        this.gamestate = GAMESTATE.MENU;

        this.paddle_player = new Paddle_player(this);
        this.paddle_AI = new Paddle_AI(this)
        this.ball = new Ball(this);

        this.gameObjects = [
            this.paddle_player,
            this.paddle_AI,
            this.ball
        ];

        new InputHandler_player(this.paddle_player, this);
        new InputHandler_AI(this.paddle_AI, this);

    }

    update(deltaTime){
        //Stop updating when paused or in Menu
        if (this.gamestate === GAMESTATE.PAUSED){
            return;
        }
        this.gameObjects.forEach((object)=>object.update(deltaTime));
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