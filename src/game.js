import Paddle from "./paddle.js";
import Paddle2 from "./paddle2.js";
import Ball from "./ball.js";
import InputHandler from "./inputHandler.js";
import InputHandler2 from "./inputHandler2.js";

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

        this.paddle = new Paddle(this);
        this.paddle2 = new Paddle2(this)

        this.ball = new Ball(this);

        this.gameObjects = [
            this.paddle,
            this.paddle2,
            this.ball
        ];

        new InputHandler(this.paddle, this);
        new InputHandler2(this.paddle2, this);

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