import L_paddle_player from "./objects/l_paddle_player.js";
import L_paddle_AI from "./objects/l_paddle_AI.js";

import L_inputHandler_player from "./inputHandler/l_inputHandler_player.js";
import L_inputHandler_AI from "./inputHandler/l_inputHandler_AI.js";
import L_ball from "./objects/l_ball.js";
import L_special_ball from "./level/special/l_specail_ball.js";
import L_special_wall from "./level/special/l_specail_wall.js";
import {L_level} from "./level/l_level.js";
import L_wall from "./objects/l_wall.js";

import Sound from "../sound.js";

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    HOME: 2,
    GAMEOVER: 3,
    START: 4,
    END: 5
};

const PLAYERMODE = {
    MULLTI: 0,
    SINGLE: 1,
    LEADER: 2
};

export default class L_gameSinglePlayer {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.iconWidth = 130;
        this.iconHeight = 120;
        this.iconWidth2 = 200;
        this.iconHeight2 = 180;
        this.spacer = 50;
        // pause, gameover
        this.x1 = this.gameWidth / 2 - this.iconWidth / 2 - this.iconWidth - this.spacer;
        this.x2 = this.gameWidth / 2 - this.iconWidth / 2;
        this.x3 = this.gameWidth / 2 + this.iconWidth / 2 + this.spacer;
        this.y1 = 3 * this.gameHeight / 5;
        // home
        this.x4 = this.gameWidth / 2 - 10 - this.iconWidth2;
        this.x5 = this.gameWidth / 2 + 10;
        this.x6 = this.gameWidth / 2 - 420 / 2;

        this.y2 = this.gameHeight / 5;
        this.y3 = 3 * this.gameHeight / 5;

        this.sound = new Sound();

        // get imgs
        this.restart = document.getElementById("img_restart");
        this.restart_hover = document.getElementById("img_restart_hover");
        this.resume = document.getElementById("img_resume");
        this.resume_hover = document.getElementById("img_resume_hover");
        this.home = document.getElementById("img_home");
        this.home_hover = document.getElementById("img_home_hover");

        this.singlePlayer = document.getElementById("img_singlePlayer");
        this.singlePlayer_hover = document.getElementById("img_singlePlayer_hover");
        this.multiPlayer = document.getElementById("img_multiPlayer");
        this.multiPlayer_hover = document.getElementById("img_multiPlayer_hover");
        this.leaderboard = document.getElementById("img_leaderboard");
        this.leaderboard_hover = document.getElementById("img_leaderboard_hover");

        this.board = document.getElementById("img_board");
        this.x = document.getElementById("img_x");
        this.on = document.getElementById("img_on");


        this.onHover = Array(false, false, false, false, false, false);//restart, resume, home, singleplayer, multi, leaderboard
        this.onClick = Array(false, false, false, false, false, false);
    }

    create(context) {
        this.context = context;
        this.gamestate = GAMESTATE.HOME;
        this.playermode = null;

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

    //before draw
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

    //after update
    draw(context) {
        this.gameObjects.forEach((object) => object.draw(context));

        //Draw pause screen
        if (this.gamestate === GAMESTATE.PAUSED) {
            this.pauseMenu(context);
        }
        //Draw home menu screen
        if (this.gamestate === GAMESTATE.HOME) {
            this.homeMenu(context);
        }
        //Draw Game over screen
        if (this.gamestate === GAMESTATE.GAMEOVER) {
            this.gameOverMenu(context);
        }
        //draw Leaderboard Screen
        if (this.gamestate === GAMESTATE.HOME && this.playermode === PLAYERMODE.LEADER) {
            this.leaderMenu(context);
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

    /// ==============================================================================================
    leaderMenu(context) {
        //background
        context.rect(0, 0, this.gameWidth, this.gameHeight);
        context.fillStyle = "#666666"
        context.fill();

        //draw background -> board
        context.drawImage(this.board, this.gameWidth / 2 - 250, this.gameHeight / 2 - 250, 500, 500);

        //draw X
        context.drawImage(this.x, this.gameWidth -80, 30, 50, 50);

        // onclick "X"
    }

    /// ==============================================================================================
    homeMenu(context) {
        //background
        context.rect(0, 0, this.gameWidth, this.gameHeight);
        context.fillStyle = "#666666"
        context.fill();

        //draw music icon -> sound on / off
        context.drawImage(this.on, this.gameWidth -80, 30, 50, 50);

        //buttons
        // on hover
        //1player
        if (this.onHover[3] == false) {
            context.drawImage(this.singlePlayer, this.x4, this.y2, this.iconWidth2, this.iconHeight2);
        } else {
            context.drawImage(this.singlePlayer_hover, this.x4, this.y2, this.iconWidth2, this.iconHeight2);
        }
        //2player
        if (this.onHover[4] == false) {
            context.drawImage(this.multiPlayer, this.x5, this.y2, this.iconWidth2, this.iconHeight2);
        } else {
            context.drawImage(this.multiPlayer_hover, this.x5, this.y2, this.iconWidth2, this.iconHeight2);
        }
        //leaderboard
        if (this.onHover[5] == false) {
            context.drawImage(this.leaderboard, this.x6, this.y3, 420, 100);
        } else {
            context.drawImage(this.leaderboard_hover, this.x6, this.y3, 420, 100);
        }
        //onClick
        //1player
        if (this.onClick[3]) {
            this.playermode = PLAYERMODE.SINGLE;
            this.gamestate = GAMESTATE.RUNNING;
            for (var i = 0; i < this.onHover.length; i++) {
                this.onHover[i] = false;
                this.onClick[i] = false;
            }
        }
        //2player
        if (this.onClick[4]) {
            this.playermode = PLAYERMODE.MULLTI;
            this.gamestate = GAMESTATE.RUNNING;
            for (var i = 0; i < this.onHover.length; i++) {
                this.onHover[i] = false;
                this.onClick[i] = false;
            }
        }
        //leaderboard
        if (this.onClick[5]) {
            this.playermode = PLAYERMODE.LEADER;
            for (var i = 0; i < this.onHover.length; i++) {
                this.onHover[i] = false;
                this.onClick[i] = false;
            }
        }

    }

    /// ==============================================================================================
    gameOverMenu(context) {
        context.rect(0, 0, this.gameWidth, this.gameHeight);
        context.fillStyle = "#666666"
        context.fill();

        //Draw "GAME-OVER" Test ont the screen
        context.font = "30px Arial";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("GAME - OVER", this.gameWidth / 2, 2 * this.gameHeight / 5 - this.spacer);

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
        if (this.onHover[2] == false) {
            context.drawImage(this.home, this.x3, this.y1, this.iconWidth, this.iconHeight);
        } else {
            context.drawImage(this.home_hover, this.x3, this.y1, this.iconWidth, this.iconHeight);
        }
        //onClick
        if (this.onClick[0]) {
            // restart
            this.create(context);
        }

        if (this.onClick[2]) {
            //home
            this.gamestate = GAMESTATE.HOME;
            for (var i = 0; i < this.onHover.length; i++) {
                this.onHover[i] = false;
                this.onClick[i] = false;
            }
        }

    }

    /// ==============================================================================================
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

        //draw X
        context.drawImage(this.x, this.gameWidth -80, 30, 50, 50);

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
        if (this.onClick[0]) {
            // restart
            this.create(context);
        }
        if (this.onClick[1]) {
            this.gamestate = GAMESTATE.RUNNING;
            for (var i = 0; i < this.onHover.length; i++) {
                this.onHover[i] = false;
                this.onClick[i] = false;
            }
        }

        if (this.onClick[2]) {
            //home
            this.gamestate = GAMESTATE.HOME;
            for (var i = 0; i < this.onHover.length; i++) {
                this.onHover[i] = false;
                this.onClick[i] = false;
            }
        }

    }

    mouse(x, y) {
        for (var i = 0; i < this.onHover.length; i++) {
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
        if (this.onSingle(x, y)) {
            this.onHover[3] = true;
        }
        if (this.onMulti(x, y)) {
            this.onHover[4] = true;
        }
        if (this.onLeader(x, y)) {
            this.onHover[5] = true;
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
        if (this.onSingle(x, y)) {
            this.onClick[3] = true;
        }
        if (this.onMulti(x, y)) {
            this.onClick[4] = true;
        }
        if (this.onLeader(x, y)) {
            this.onClick[5] = true;
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

    onSingle(x, y) {
        if (x >= this.x4 && x <= this.x4 + this.iconWidth2 &&
            y >= this.y2 && y <= this.y2 + this.iconHeight2) {
            return true;
        } else {
            return false;
        }
    }

    onMulti(x, y) {
        if (x >= this.x5 && x <= this.x5 + this.iconWidth2 &&
            y >= this.y2 && y <= this.y2 + this.iconHeight2) {
            return true;
        } else {
            return false;
        }
    }

    onLeader(x, y) {
        if (x >= this.x6 && x <= this.x6 + 420 &&
            y >= this.y3 && y <= this.y3 + 100) {
            return true;
        } else {
            return false;
        }
    }

    /// ==============================================================================================

}
