import L_paddle_player from "./objects/l_paddle_player.js";
import L_paddle_enemy from "./objects/l_paddle_enemy.js";

import L_inputHandler_player from "./inputHandler/l_inputHandler_player.js";
import InputHandler_enemy from "./inputHandler/l_inputHandler_enemy.js";
import L_inputHandler_AI from "./inputHandler/l_inputHandler_AI.js";
import L_ball from "./objects/l_ball.js";
import {L_level} from "./level/l_level.js";
import L_wall from "./objects/l_wall.js";

import Sound from "../yann/sound.js";

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    HOME: 2,
    GAMEOVER: 3,
    START: 4,
    END: 5
};

const PLAYERMODE = {
    MULTI: 0,
    SINGLE: 1,
    LEADER: 2
};

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.sound = new Sound();
    }

    create(context, menu) {
        this.context = context;
        this.menu = menu;
        this.paddle_player = new L_paddle_player(this);
        this.paddle_AI = new L_paddle_enemy(this)
        this.ball = new L_ball(this);
        this.wall = new L_wall(this);
        this.level = new L_level(this);

        this.gameObjects = [
            this.paddle_player,
            this.paddle_AI,
            this.level,
            this.wall,
            this.ball
        ];

        if (this.menu.playermode == PLAYERMODE.SINGLE) {
            this.playerHandeler = new L_inputHandler_player(this.paddle_player, this.menu);
            this.ai = new L_inputHandler_AI(this.paddle_AI, this.ball, this);
        }

        if (this.menu.playermode == PLAYERMODE.MULTI) {
            this.playerHandeler = new L_inputHandler_player(this.paddle_player, this.menu);
            this.enemyHandler = new InputHandler_enemy(this.paddle_AI);
        }
    }

    restart(){
        //reset score
        this.ball.scorePlayer = 0;
        this.ball.scoreEnemy = 0;

        //reset life
        this.level.life_Player = 3;
        this.level.life_Enemy = 3;

        //reset ballposition & direction
        this.ball.position.x = this.gameWidth / 2 - this.ball.size / 2;
        this.ball.position.y = this.gameHeight / 2 - this.ball.size / 2;
        this.ball.velocity_Y = 0;
        this.ball.velocity_X = - this.ball.speedStart;

        //reset Ball speed
        this.ball.speed = this.ball.speedStart;

        //reset paddlepositions
        this.paddle_player.position.y = this.gameHeight / 2 - this.paddle_player.height/2;
        this.paddle_AI.position.y = this.gameHeight / 2 - this.paddle_AI.height/2;

        //reset paddle size
        this.paddle_player.height = 150;
        this.paddle_AI.height = 150;

        if (this.menu.playermode == PLAYERMODE.SINGLE) {
            this.enemyHandler = null;
            this.ai = new L_inputHandler_AI(this.paddle_AI, this.ball, this);
        }

        if (this.menu.playermode == PLAYERMODE.MULTI) {
            this.ai = null;
            this.enemyHandler = new InputHandler_enemy(this.paddle_AI);
        }

    }

    //before draw
    update() {
        if(this.level.life_Enemy == 0 || this.level.life_Player == 0){
            this.menu.gamestate = GAMESTATE.GAMEOVER;
            return;
        }
        if (this.menu.playermode == PLAYERMODE.SINGLE) {
            if(this.ai == null){
                this.ai = new L_inputHandler_AI(this.paddle_AI, this.ball, this);
            }
            this.ai.ai();
        }
        this.gameObjects.forEach((object) => object.update());
    }

    //after update
    draw(context) {
        this.gameObjects.forEach((object) => object.draw(context));
    }
}
