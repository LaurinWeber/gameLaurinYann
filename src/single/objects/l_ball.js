var counter = 0;

export default class L_ball {


    constructor(game) {
        // pass ref
        this.game = game;

        // get img from the ball
        this.image = document.getElementById("img_ball");
        this.size = 50; // define size (x = 20 & y = 20 px)

        // define boundaries for the ball, as already defined in game.js
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        // define start pos of the ball
        this.position = {x: this.gameWidth / 2 - this.size / 2, y: this.gameHeight / 2 - this.size / 2};

        // start speed
        this.speedStart = 5;
        this.speed = this.speedStart; // speed during game
        // start direction (the player starts)
        this.velocity_X = -5;
        this.velocity_Y = 0;

        this.speedMax = 25;

        this.angle = {
            top: 45,
            upperCenter: 20,
            center: 0,
            lowerCenter: -20,
            bottom: -45
        };
        // radiants needed, as Math.cos(param) takes radiants as parameters..
        this.radiant = {
            top: this.angle.top * Math.PI / 180,
            upperCenter: this.angle.upperCenter * Math.PI / 180,
            center: this.angle.center * Math.PI / 180,
            lowerCenter: this.angle.lowerCenter * Math.PI / 180,
            bottom: this.angle.bottom * Math.PI / 180
        }

        // couter for the score
        this.scorePlayer = 0;
        this.scoreEnemy = 0;
    }

    // draw ball and score
    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
        context.font = "bold 24px Arial";
        context.fillText(this.scorePlayer, 5 + 2, 300);
        context.fillText(this.scoreEnemy, 785, 300);


    }

    //ball moves
    update() {
        this.position.x += this.velocity_X;
        this.position.y += this.velocity_Y;
        if (this.velocity_X < 0) { // ball moving to the left
            this.paddle_left();//rebounce
            this.wallRebounce_left();
        }//end moving to left
        else if (this.velocity_X > 0) { // ball moving to the right
            this.paddle_right();//rebounce
            this.wallRebounce_right();
        }//end moving right
        this.scores();
    }// end Update

    // rebounce on left paddle
    paddle_left() {
        //player
        let player_x = this.game.paddle_player.position.x;
        let player_y = this.game.paddle_player.position.y;

        // size of paddle
        let player_height = this.game.paddle_player.height; // constant
        let player_width = this.game.paddle_player.width; // constant

        //paddle (left)
        if (this.position.x < player_x + player_width && this.position.x > player_x) { //Ball on height of paddle player
            if (this.position.y + this.size > player_y && this.position.y < player_y + player_height) { // ball hits paddle
                this.game.sound.playSound("sounds/bounce.mp3");
                if (!(this.speed == this.speedMax || this.speed >= this.speedMax))
                    this.speed++; // everytime player hits paddle accelerating the ball
                //define hitzone
                //1.) hit at top "border" of paddle (rebounce: 45°)
                if (this.position.y + this.size > player_y && this.position.y + this.size / 2 <= player_y + player_height * .05) { //5% of paddle height = hitzone 45°
                    // calculate velocities
                    this.velocity_X = 1 * Math.cos(this.radiant.top) * this.speed;
                    //alert("Velocity X: " + this.velocity_X);
                    this.velocity_Y = -1 * Math.sin(this.radiant.top) * this.speed;
                    //alert("Velocity Y: " + this.velocity_Y);
                }
                //2.) hit at upper center section of paddle (rebounce: 20°)
                if (this.position.y + this.size / 2 > player_y + player_height * .05 &&
                    this.position.y + this.size / 2 < player_y + player_height * .05 + ((player_height - 2 * (player_height * .05)) / 3)) {
                    // calculate velocities
                    this.velocity_X = 1 * Math.cos(this.radiant.upperCenter) * this.speed;
                    this.velocity_Y = -1 * Math.sin(this.radiant.upperCenter) * this.speed;
                }
                //3.) hit at center of paddle (rebounce: 0°)
                if (this.position.y + this.size / 2 >= player_y + player_height * .05 + ((player_height - 2 * (player_height * .05)) / 3) &&
                    this.position.y + this.size / 2 <= player_y + player_height * .05 + 2 * ((player_height - 2 * (player_height * .05)) / 3)) {
                    // calculate velocities
                    this.velocity_X = Math.cos(this.radiant.center) * this.speed;
                    this.velocity_Y = Math.sin(this.radiant.center) * this.speed;
                }
                //4.) hit at lower center section of paddle (rebounce: -20°)
                if (this.position.y + this.size / 2 > player_y + player_height * .05 + 2 * ((player_height - 2 * (player_height * .05)) / 3) &&
                    this.position.y + this.size / 2 < player_y + player_height - player_height * .05) {
                    // calculate velocities
                    this.velocity_X = (1 * Math.cos(this.radiant.lowerCenter)) * this.speed;
                    this.velocity_Y = (-1 * Math.sin(this.radiant.lowerCenter)) * this.speed;
                }
                //5.) hit at bottom "border" of paddle (rebounce: -45°)
                if (this.position.y + this.size / 2 >= player_y + player_height - player_height * .05 &&
                    this.position.y < player_y + player_height) {
                    // calculate velocities
                    this.velocity_X = 1 * Math.cos(this.radiant.bottom) * this.speed;
                    this.velocity_Y = -1 * Math.sin(this.radiant.bottom) * this.speed;
                }
            }
        }
        // when ball hits the wall (top or bottom) then inverse y.position of ball
        if (this.position.y < 0 || this.position.y + this.size > this.gameHeight) {
            this.velocity_Y = -this.velocity_Y;
        }
    }

    //rebounce on right paddle
    paddle_right() {
        let ai_x = this.game.paddle_AI.position.x; //constant
        let ai_y = this.game.paddle_AI.position.y;

        let ai_height = this.game.paddle_AI.height;
        let ai_width = this.game.paddle_AI.width;
        // paddle (right)
        if (this.position.x + this.size > ai_x && this.position.x + this.size < ai_x + ai_width) { //Ball on height paddle ai
            if (this.position.y + this.size > ai_y && this.position.y < ai_y + ai_height) { // ball hits paddel
                this.game.sound.playSound("sounds/bounce.mp3");
                if (!(this.speed == this.speedMax || this.speed >= this.speedMax))
                    this.speed++; // everytime ai hits paddle accelerating the ball
                //define hitzone
                //1.) hit at top "border" of paddle (rebounce: 45°)
                if (this.position.y + this.size > ai_y && this.position.y + this.size / 2 <= ai_y + ai_height * .05) { //5% of paddle height = hitzone 45°
                    // calculate velocities
                    this.velocity_X = -1 * Math.cos(this.radiant.top) * this.speed;
                    //alert("Velocity X: " + this.velocity_X);
                    this.velocity_Y = -1 * Math.sin(this.radiant.top) * this.speed;
                    //alert("Velocity Y: " + this.velocity_Y);
                }
                //2.) hit at upper center section of paddle (rebounce: 20°)
                if (this.position.y + this.size / 2 > ai_y + ai_height * .05 &&
                    this.position.y + this.size / 2 < ai_y + ai_height * .05 + ((ai_height - 2 * (ai_height * .05)) / 3)) {
                    // calculate velocities
                    this.velocity_X = -1 * Math.cos(this.radiant.upperCenter) * this.speed;
                    this.velocity_Y = -1 * Math.sin(this.radiant.upperCenter) * this.speed;
                }
                //3.) hit at center of paddle (rebounce: 0°)
                if (this.position.y + this.size / 2 >= ai_y + ai_height * .05 + ((ai_height - 2 * (ai_height * .05)) / 3) &&
                    this.position.y + this.size / 2 <= ai_y + ai_height * .05 + 2 * ((ai_height - 2 * (ai_height * .05)) / 3)) {
                    // calculate velocities
                    this.velocity_X = -Math.cos(this.radiant.center) * this.speed;
                    this.velocity_Y = Math.sin(this.radiant.center) * this.speed;
                }
                //4.) hit at lower center section of paddle (rebounce: -20°)
                if (this.position.y + this.size / 2 > ai_y + ai_height * .05 + 2 * ((ai_height - 2 * (ai_height * .05)) / 3) &&
                    this.position.y + this.size / 2 < ai_y + ai_height - ai_height * .05) {
                    // calculate velocities
                    this.velocity_X = (-1 * Math.cos(this.radiant.lowerCenter)) * this.speed;
                    this.velocity_Y = (-1 * Math.sin(this.radiant.lowerCenter)) * this.speed;
                }
                //5.) hit at bottom "border" of paddle (rebounce: -45°)
                if (this.position.y + this.size / 2 >= ai_y + ai_height - ai_height * .05 &&
                    this.position.y < ai_y + ai_height) {
                    // calculate velocities
                    this.velocity_X = -1 * Math.cos(this.radiant.bottom) * this.speed;
                    this.velocity_Y = -1 * Math.sin(this.radiant.bottom) * this.speed;
                }
            }
        }
        // wall, rebounce
        if (this.position.y < 0 || this.position.y + this.size > this.gameHeight) {
            this.velocity_Y = -this.velocity_Y;
        }
    }

    scores() {
        // aiScore
        if (this.position.x <= 0) {
            this.game.sound.playSound("sounds/score.mp3");
            this.scoreEnemy++;
            this.speed = this.speedStart;
            this.velocity_Y = 0;
            this.velocity_X = -this.speed;
            this.position.x = this.gameWidth / 2 - this.size / 2;
            this.position.y = this.gameHeight / 2 - this.size / 2;
        }
        // playerScore
        if (this.position.x + this.size >= this.gameWidth) {
            this.game.sound.playSound("sounds/score.mp3");
            this.scorePlayer++;
            this.speed = this.speedStart;
            this.velocity_Y = 0;
            this.velocity_X = this.speed;
            this.position.x = this.gameWidth / 2 - this.size / 2;
            this.position.y = this.gameHeight / 2 - this.size / 2;
        }
    }

    wallRebounce_right() {
        if (this.game.ball.velocity_X > 0) { //moving right
            if (this.game.ball.position.x + this.game.ball.size > this.game.wall.position.x &&
                this.game.ball.position.x + this.game.ball.size < this.game.wall.position.x + this.game.wall.width) { // on height of paddle x -axe
                if (this.game.ball.position.y + this.game.ball.size > this.game.wall.position.y && this.game.ball.position.y < this.game.wall.position.y + this.game.wall.height) {
                    this.game.ball.velocity_X = -this.game.ball.velocity_X;
                }
            }
        }
    }

    wallRebounce_left() {
        if (this.game.ball.velocity_X < 0) { //moving left
            if (this.game.ball.position.x > this.game.wall.position.x &&
                this.game.ball.position.x < this.game.wall.position.x + this.game.wall.width) {
                if (this.game.ball.position.y + this.game.ball.size > this.game.wall.position.y
                    && this.game.ball.position.y < this.game.wall.position.y + this.game.wall.height) {
                    this.game.ball.velocity_X = -this.game.ball.velocity_X;
                }
            }
        }
    }

}// end class