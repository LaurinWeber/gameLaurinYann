import Paddle from "./paddle.js";
import Paddle2 from "./paddle2.js";
import Ball from "./ball.js";
import InputHandler from "./inputHandler.js";
import InputHandler2 from "./inputHandler2.js";

export default class Game {


    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    start(){


        this.paddle = new Paddle(this);
        this.paddle2 = new Paddle2(this)

        this.ball = new Ball(this);

        this.gameObjects = [
            this.paddle,
            this.paddle2,
            this.ball
        ];

        new InputHandler(this.paddle);
        new InputHandler2(this.paddle2);

    }



    update(deltaTime){

        this.gameObjects.forEach((object)=>object.update(deltaTime));

    }


    draw(context){

        this.gameObjects.forEach((object)=>object.draw(context));

    }

}