import L_inputHandler_player from "./inputHandler/l_inputHandler_player.js";
import InputHandler_enemy from "./inputHandler/l_inputHandler_enemy.js";
import L_inputHandler_AI from "./inputHandler/l_inputHandler_AI.js";
import Game from "./game.js";

import Sound from "./sound/sound.js";

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

export default class Menu {
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
        this.yLegend = 4 * this.gameHeight / 5;

        this.y2 = this.gameHeight / 2 - this.iconWidth2;


        this.sound = new Sound();
        this.onSound = true;

        this.legend = document.getElementById("img_legend");
        this.background = document.getElementById("img_background");

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

        this.x = document.getElementById("img_x");
        this.on = document.getElementById("img_on");
        this.off = document.getElementById("img_off");

        this.onHover = Array(false, false, false, false, false, false);//restart, resume, home, singleplayer, multi, exit
        this.onClick = Array(false, false, false, false, false, false);
    }

    create(context) {
        this.context = context;
        this.gamestate = GAMESTATE.HOME;
    }

    //before draw
    update() {
        //Stop updating when paused or in Menu
        if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.GAMEOVER || this.gamestate === GAMESTATE.HOME)
            return;

        if (this.playermode == PLAYERMODE.SINGLE || this.playermode == PLAYERMODE.MULTI && this.gamestate != GAMESTATE.PAUSED && this.gamestate != GAMESTATE.GAMEOVER)
            this.Game.update();

    }

    //after update
    draw(context) {
        //Draw pause screen
        if (this.gamestate === GAMESTATE.PAUSED) {
            this.pauseMenu(context);
            return;
        }
        //Draw home menu screen
        if (this.gamestate === GAMESTATE.HOME) {
            this.homeMenu(context);
            return;
        }
        //Draw Game over screen
        if (this.gamestate === GAMESTATE.GAMEOVER) {
            this.gameOverMenu(context);
            return;
        }
        if (this.playermode == PLAYERMODE.SINGLE || this.playermode == PLAYERMODE.MULTI && this.gamestate != GAMESTATE.PAUSED && this.gamestate != GAMESTATE.GAMEOVER && this.gamestate != GAMESTATE.HOME)
            this.Game.draw(context);


    }

    togglePause() {
        if (this.gamestate == GAMESTATE.HOME)
            return;
        //Pause
        if (this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }

    /// ==============================================================================================
    homeMenu(context) {
        //background
        context.rect(0, 0, this.gameWidth, this.gameHeight);
        context.fillStyle = "#666666"
        context.fill();

        context.drawImage(this.background, 0, 0, this.gameWidth, this.gameHeight);
        //draw music icon -> sound on / off


        if (this.onSound) {
            context.drawImage(this.on, this.gameWidth - 80, 30, 50, 50);
        } else {
            context.drawImage(this.off, this.gameWidth - 80, 30, 50, 50);
        }


        context.drawImage(this.legend, this.gameWidth / 2 - 755 / 2 / 2, this.y1 - 50, 755 / 2, 568 / 2); // legende

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

        //onClick
        //1player
        if (this.onClick[3]) {
            this.sound.playSound("sounds/button.mp3",this);
            this.playermode = PLAYERMODE.SINGLE;
            this.gamestate = GAMESTATE.RUNNING;
            if (this.Game == null) {
                this.Game = new Game(this.gameWidth, this.gameHeight);
                this.Game.create(context, this);
            } else {
                this.Game.restart();
            }

            for (var i = 0; i < this.onHover.length; i++) {
                this.onHover[i] = false;
                this.onClick[i] = false;
            }
        }
        //2player
        if (this.onClick[4]) {
            this.sound.playSound("sounds/button.mp3",this);
            this.playermode = PLAYERMODE.MULTI;
            this.gamestate = GAMESTATE.RUNNING;
            if (this.Game == null) {
                this.Game = new Game(this.gameWidth, this.gameHeight);
                this.Game.create(context, this);
            } else {
                this.Game.restart();
            }

            for (var i = 0; i < this.onHover.length; i++) {
                this.onHover[i] = false;
                this.onClick[i] = false;
            }
        }
        if (this.onClick[5]) { //Sound on/Off "X"
            this.sound.playSound("sounds/button.mp3",this);
            if (this.onSound) {
                this.onSound = false
            } else {
                this.onSound = true;
            }
            for (var i = 0; i < this.onHover.length; i++) {
                this.onHover[i] = false;
                this.onClick[i] = false;
            }
        }
    }

    /// ==============================================================================================
    gameOverMenu(context) {
        this.gamestate = GAMESTATE.GAMEOVER;
        context.rect(0, 0, this.gameWidth, this.gameHeight);
        context.fillStyle = "#666666"
        context.fill();
        context.drawImage(this.background, 0, 0, this.gameWidth, this.gameHeight);

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
        if (this.onClick[0]) {// restart
            this.sound.playSound("sounds/button.mp3",this);
            this.Game.restart();
            this.gamestate = GAMESTATE.RUNNING;
            for (var i = 0; i < this.onHover.length; i++) {
                this.onHover[i] = false;
                this.onClick[i] = false;
            }
        }

        if (this.onClick[2]) {
            //home
            this.sound.playSound("sounds/button.mp3",this);
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
        context.drawImage(this.background, 0, 0, this.gameWidth, this.gameHeight);

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
        if (this.onHover[5] == false) { //draw X
            context.drawImage(this.x, this.gameWidth - 80, 30, 50, 50);
        } else {
            context.drawImage(this.x, this.gameWidth - 80, 40, 50, 50);
        }
        //onClick
        if (this.onClick[0]) {// restart
            this.sound.playSound("sounds/button.mp3",this);
            this.Game.restart();
            this.gamestate = GAMESTATE.RUNNING;
            for (var i = 0; i < this.onHover.length; i++) {
                this.onHover[i] = false;
                this.onClick[i] = false;
            }
        }

        if (this.onClick[1]) { //resume
            this.sound.playSound("sounds/button.mp3",this);
            this.gamestate = GAMESTATE.RUNNING;
            for (var i = 0; i < this.onHover.length; i++) {
                this.onHover[i] = false;
                this.onClick[i] = false;
            }
        }

        if (this.onClick[2]) {//home
            this.sound.playSound("sounds/button.mp3",this);
            this.gamestate = GAMESTATE.HOME;
            for (var i = 0; i < this.onHover.length; i++) {
                this.onHover[i] = false;
                this.onClick[i] = false;
            }
        }

        if (this.onClick[5]) { //exit "X"
            this.sound.playSound("sounds/button.mp3",this);
            this.gamestate = GAMESTATE.RUNNING;
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
        if (this.onExit(x, y)) {
            this.onHover[5] = true;
        }
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
        if (this.onExit(x, y)) {
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

    onExit(x, y) {
        //draw X
        if (x >= this.gameWidth - 80 && x <= this.gameWidth - 30 &&
            y >= 30 && y <= 80) {
            return true;
        } else {
            return false;
        }
    }
}
