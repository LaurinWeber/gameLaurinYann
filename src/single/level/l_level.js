import l_specail_ball from "./special/l_specail_ball.js";
import l_specail_wall from "./special/l_specail_wall.js";
import l_specail_nothing from "./special/l_specail_nothing.js";
import l_special_paddle from "./special/l_special_paddle.js";

export class L_level {

    constructor(game) {
        this.game = game
        this.i = 0;

        this.level = [new l_specail_nothing(game), new l_specail_ball(game), new l_specail_wall(game), new l_special_paddle(game)];
        this.run = {nothing: false, ball: false, wall : false,paddle:false };
    }

    // after update
    draw(context) {
        this.level[1].draw(context);
        this.level[2].draw(context);
    }

    //before draw
    update() {
        this.levels();
        this.level[1].update();
        this.level[2].update();
    }

    levels() {
        if(this.currentScoreE != this.game.ball.scoreEnemy){
            if (this.game.ball.scoreEnemy==3) {
                //level up
                this.i++;
                this.currentScoreE = this.game.ball.scoreEnemy;
                this.game.ball.scoreEnemy = 0;
                this.game.ball.scorePlayer = 0;
            }
        }
        if(this.currentScoreP != this.game.ball.scorePlayer){
            if (this.game.ball.scoreEnemy==3) {
                //level up
                this.i++;
                this.currentScoreP = this.game.ball.scorePlayer;
                this.game.ball.scoreEnemy = 0;
                this.game.ball.scorePlayer = 0;
            }
        }
    }
}