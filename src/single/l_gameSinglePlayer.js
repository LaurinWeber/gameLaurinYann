import L_paddle_player from "./objects/l_paddle_player.js";
import L_paddle_AI from "./objects/l_paddle_AI.js";

import L_inputHandler_player from "./inputHandler/l_inputHandler_player.js";
import L_inputHandler_AI from "./inputHandler/l_inputHandler_AI.js";
import L_ball from "./objects/l_ball.js";
import L_special_ball from "./level/special/l_specail_ball.js";
import L_special_wall from "./level/special/l_specail_wall.js";
import {L_level} from "./level/l_level.js";
import L_wall from "./objects/l_wall.js";

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

        this.iconWidth = 130;
        this.iconHeight = 120;
        this.spacer = 50;
        this.x1 = this.gameWidth / 2 - this.iconWidth / 2 - this.iconWidth - this.spacer;
        this.x2 = this.gameWidth / 2 - this.iconWidth / 2;
        this.x3 = this.gameWidth / 2 + this.iconWidth / 2 + this.spacer;
        this.y1 = 3 * this.gameHeight / 5;
        this.hover = false;


        // get imgs
        this.restart = document.getElementById("img_restart");
        this.restart_hover = document.getElementById("img_restart_hover");
        this.resume = document.getElementById("img_resume");
        this.resume_hover = document.getElementById("img_resume_hover");
        this.home = document.getElementById("img_home");
        this.home_hover = document.getElementById("img_home_hover");

        this.onHover = Array(false, false, false);
        this.onClick = Array(false, false, false);
    }

    create(context) {
        this.context = context;
        this.gamestate = GAMESTATE.MENU;

        this.paddle_player = new L_paddle_player(this);
        this.paddle_AI = new L_paddle_AI(this)
        this.ball = new L_ball(this);
        this.wall = new L_wall(this);
        this.level = new L_level(this);

        //this.specials_ball = new L_special_ball(this);
        //this.specials_wall = new L_special_wall(this);
        this.gameObjects = [
            this.paddle_player,
            this.paddle_AI,
            this.level,
            //this.specials_ball,
            //this.specials_wall,
            this.wall,
            this.ball
        ];


        new L_inputHandler_player(this.paddle_player, this);
        this.ai = new L_inputHandler_AI(this.paddle_AI, this.ball, this);

    }

    update() {

        //Check player score to GameOver
        if (this.ball.scorePlayer === 15 || this.ball.scoreEnemy === 15) {
            this.gamestate = GAMESTATE.GAMEOVER;
        }

        //Stop updating when paused or in Menu
        if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.GAMEOVER) {
            return;
        }
        this.ai.ai();
        this.gameObjects.forEach((object) => object.update());

    }


    draw(context) {
        this.gameObjects.forEach((object) => object.draw(context));


        //Draw pause screen
        if (this.gamestate === GAMESTATE.PAUSED) {
            this.pauseMenu(context);
        }

        //Draw Game over screen
        if (this.gamestate === GAMESTATE.GAMEOVER) {
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle = "#666666"
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


    pauseMenu(context) {
        //background
        context.rect(0, 0, this.gameWidth, this.gameHeight);
        context.fillStyle = "#666666"
        context.fill();

        //Draw "Paused" Test ont the screen
        context.font = "30px Arial";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("GAME - Paused", this.gameWidth / 2, 2 * this.gameHeight / 5 - this.spacer);

        //draw line to separate buttons and text
        context.beginPath();
        context.moveTo(this.gameWidth / 4, 2 * this.gameHeight / 5);
        context.lineTo(3 * this.gameWidth / 4, 2 * this.gameHeight / 5);
        context.lineWidth = 2;
        context.strokeStyle = "#fff";
        context.stroke();

        //Draw Buttons
        // on hover
        if (this.onHover[0] == false) {
            context.drawImage(this.restart, this.x1, this.y1, this.iconWidth, this.iconHeight);
        } else {
            context.drawImage(this.restart_hover, this.x1, this.y1, this.iconWidth, this.iconHeight);
        }
        if (this.onHover[1] == false) {
            context.drawImage(this.resume, this.x2, this.y1, this.iconWidth, this.iconHeight);
        } else {
            context.drawImage(this.resume_hover, this.x2, this.y1, this.iconWidth, this.iconHeight);
        }
        if (this.onHover[2] == false) {
            context.drawImage(this.home, this.x3, this.y1, this.iconWidth, this.iconHeight);
        } else {
            context.drawImage(this.home_hover, this.x3, this.y1, this.iconWidth, this.iconHeight);
        }
        //onClick
        // on hover
        if (this.onClick[0]) {
            // restart
        }
        if (this.onClick[1]) {
            this.gamestate = GAMESTATE.RUNNING;
            for(var i = 0; i< this.onHover.length; i++){
                this.onHover[i] = false;
                this.onClick[i] = false;
            }
        }

        if (this.onClick[2]) {
            //home
        }

    }

    mouse(x, y) {
        for(var i = 0; i< this.onHover.length; i++){
            this.onHover[i] = false;
        }
        if (this.onRestart(x, y)) {
            this.onHover[0] = true;
        }
        if (this.onResume(x, y)) {
            this.onHover[1] = true;
        }
        if (this.onHome(x, y)) {
            this.onHover[2] = true;
        }
        console.log("x: " + x + "  y: " + y);
        console.log("x2: " + this.x1 + "  y2: " + this.y1);
    }

    mouseClick(x, y) {
        if (this.onRestart(x, y)) {
            this.onClick[0] = true;
        }
        if (this.onResume(x, y)) {
            this.onClick[1] = true;
        }
        if (this.onHome(x, y)) {
            this.onClick[2] = true;
        }
    }

    onRestart(x, y) {
        if (x >= this.x1 && x <= this.x1 + this.iconWidth &&
            y >= this.y1 && y <= this.y1 + this.iconHeight) {
            return true;
        } else {
            return false;
        }
    }

    onResume(x, y) {
        if (x >= this.x2 && x <= this.x2 + this.iconWidth &&
            y >= this.y1 && y <= this.y1 + this.iconHeight) {
            return true;
        } else {
            return false;
        }
    }

    onHome(x, y) {
        if (x >= this.x3 && x <= this.x3 + this.iconWidth &&
            y >= this.y1 && y <= this.y1 + this.iconHeight) {
            return true;
        } else {
            return false;
        }
    }
}
