import l_specail_ball from "./special/l_specail_ball.js";
import l_specail_wall from "./special/l_specail_wall.js";
import l_specail_nothing from "./special/l_specail_nothing.js";
import l_special_paddle from "./special/l_special_paddle.js";

export class L_level {

    constructor(game) {
        this.game = game
        this.i = 0;
        this.life_Enemy = 3;
        this.life_Player = 3;
        this.level = [new l_special_paddle(game)]; //new l_specail_nothing(game), new l_specail_ball(game), new l_specail_wall(game),
        this.heart = document.getElementById("img_heart");
    }

    // after update
    draw(context) {
        // draw hearts <3 to show # life left
        //context.fillText(this.life_Player, this.game.gameWidth / 2 - 200, 50);

        this.width1 = this.game.gameWidth / 2 - 50 -50; // space center + width icon
        this.spacer1 = -75;
        for(var i = 0; i<this.life_Player;i++){
            //draw heart
            context.drawImage(this.heart,this.width1, 30, 50, 50);
            this.width1 = this.width1 + this.spacer1;
        }

        this.width = this.game.gameWidth / 2 + 50;
        this.spacer = 50 +25;
        for(var i = 0; i<this.life_Enemy;i++){
            //draw heart
            context.drawImage(this.heart,this.width, 30, 50, 50);
            this.width = this.width + this.spacer;
        }

        this.level[this.i].draw(context);

    }

    //before draw
    update() {
        this.levels();
        this.level[this.i].update();
    }

    levels() {
        if (this.game.ball.scoreEnemy == 3) {
            //level up
            this.i++;
            if (this.i == this.level.length) {
                this.i = 0;
            }
            this.life_Player--;
            if (this.life_Player == 0) {
                this.game.gamestate = 3;
            }
            this.game.ball.scoreEnemy = 0;
            this.game.ball.scorePlayer = 0;
        }

        if (this.game.ball.scorePlayer == 3) {
            //level up
            this.i++;
            if (this.i == this.level.length) {
                this.i = 0;
            }
            this.life_Enemy--;
            if (this.life_Enemy == 0) {
                this.game.gamestate = 3;
            }
            this.game.ball.scoreEnemy = 0;
            this.game.ball.scorePlayer = 0;
        }
    }
}