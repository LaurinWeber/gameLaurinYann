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
        this.position = {x: this.gameWidth / 2, y: this.gameHeight / 2};

        // start speed
        this.speedStart = 5;
        this.speed = this.speedStart; // speed during game
        // start direction (the player starts)
        this.velocity_X = -5;
        this.velocity_Y = 0;

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
        this.context = context;
        context.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
        context.font = "bold 24px Arial";
        context.fillText(this.scorePlayer, 5, 300);
        context.fillText(this.scoreEnemy, 785, 300);
    }

    //ball moves
    update() {
        //player
        let player_x = this.game.paddle_player.position.x;
        let player_y = this.game.paddle_player.position.y;
        // AI
        let ai_x = this.game.paddle_AI.position.x; //constant
        let ai_y = this.game.paddle_AI.position.y;
        // size of paddle
        let paddle_height = this.game.paddle_player.height; // constant
        let paddle_width = this.game.paddle_player.width; // constant

        // ------------------------------------ ball moving to the left ------------------------------------
        if (this.velocity_X < 0) {
            this.position.x += this.velocity_X;
            this.position.y += this.velocity_Y;
            //paddle (left)
            if (this.position.x < player_x + paddle_width && this.position.x > player_x) { //Ball on height of paddle player
                if (this.position.y + this.size > player_y && this.position.y < player_y + paddle_height) { // ball hits paddle
                    this.speed++; // everytime player hits paddle accelerating the ball
                    //define hitzone
                    //1.) hit at top "border" of paddle (rebounce: 45°)
                    if (this.position.y + this.size > player_y && this.position.y + this.size <= player_y + 20) {
                        // calculate velocities
                        this.velocity_X = 1 * Math.cos(this.radiant.top) * this.speed;
                        //alert("Velocity X: " + this.velocity_X);
                        this.velocity_Y = -1 * Math.sin(this.radiant.top) * this.speed;
                        //alert("Velocity Y: " + this.velocity_Y);
                    }
                    //2.) hit at upper center section of paddle (rebounce: 20°)
                    if (this.position.y + this.size > player_y + 20 && this.position.y < player_y + (paddle_height / 3)) {
                        // calculate velocities
                        this.velocity_X = 1 * Math.cos(this.radiant.upperCenter) * this.speed;
                        this.velocity_Y = -1 * Math.sin(this.radiant.upperCenter) * this.speed;
                    }
                    //3.) hit at center of paddle (rebounce: 0°)
                    if (this.position.y + this.size > player_y + (paddle_height / 3) && this.position.y < player_y + (2 * paddle_height / 3)) {
                        // calculate velocities
                        this.velocity_X = Math.cos(this.radiant.center) * this.speed;
                        this.velocity_Y = Math.sin(this.radiant.center) * this.speed;
                    }
                    //4.) hit at lower center section of paddle (rebounce: -20°)
                    if (this.position.y + this.size > player_y + 2 * paddle_height / 3 && this.position.y < player_y + paddle_height - 20) {
                        // calculate velocities
                        this.velocity_X = (1 * Math.cos(this.radiant.lowerCenter)) * this.speed;
                        this.velocity_Y = (-1 * Math.sin(this.radiant.lowerCenter)) * this.speed;
                    }
                    //5.) hit at bottom "border" of paddle (rebounce: -45°)
                    if (this.position.y >= player_y + paddle_height - 20 && this.position.y < player_y + paddle_height) {
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
        }//end moving to left

        // ------------------------------------ ball moving to the right ------------------------------------
        else if (this.velocity_X > 0) {
            this.position.x += this.velocity_X;
            this.position.y += this.velocity_Y;
            // paddle (right)
            if (this.position.x < ai_x +paddle_width +this.size  && this.position.x > ai_x -this.size) { //Ball on height paddle ai
                if (this.position.y + this.size > ai_y && this.position.y < ai_y + paddle_height) { // ball hits paddel
                    this.speed++; // everytime ai hits paddle accelerating the ball
                    //define hitzone
                    //1.) hit at top "border" of paddle (rebounce: 45°)
                    if (this.position.y + this.size > ai_y && this.position.y + this.size <= ai_y + 20) {
                        // calculate velocities
                        this.velocity_X = -1 * Math.cos(this.radiant.top) * this.speed;
                        this.velocity_Y = -1 * Math.sin(this.radiant.top) * this.speed;
                    }
                    //2.) hit at upper center section of paddle (rebounce: 20°)
                    if (this.position.y + this.size > ai_y + 20 && this.position.y < ai_y + (paddle_height / 3)) {
                        // calculate velocities
                        this.velocity_X = -1 * Math.cos(this.radiant.upperCenter) * this.speed;
                        this.velocity_Y = -1 * Math.sin(this.radiant.upperCenter) * this.speed;
                    }
                    //3.) hit at center of paddle (rebounce: 0°)
                    if (this.position.y + this.size > ai_y + (paddle_height / 3) && this.position.y < ai_y + (2 * paddle_height / 3)) {
                        // calculate velocities
                        this.velocity_X = -Math.cos(this.radiant.center) * this.speed;
                        this.velocity_Y = Math.sin(this.radiant.center) * this.speed;
                    }
                    //4.) hit at lower center section of paddle (rebounce: -20°)
                    if (this.position.y + this.size > ai_y + 2 * paddle_height / 3 && this.position.y < ai_y + paddle_height - 20) {
                        // calculate velocities
                        this.velocity_X = (-1 * Math.cos(this.radiant.lowerCenter)) * this.speed;
                        this.velocity_Y = (-1 * Math.sin(this.radiant.lowerCenter)) * this.speed;
                    }
                    //5.) hit at bottom "border" of paddle (rebounce: -45°)
                    if (this.position.y >= ai_y + paddle_height - 20 && this.position.y < ai_y + paddle_height) {
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
        }//end moving right

        // ------------------------------------ count the scores ------------------------------------
        // aiScore
        if (this.position.x <= 0 ) {
            this.scoreEnemy++;
            this.speed = this.speedStart;
            this.velocity_Y = 0;
            this.velocity_X = -this.speed;
            this.position.x = this.gameWidth / 2 + this.size/2;
            this.position.y = this.gameHeight / 2 + this.size /2;
        }
        // playerScore
        if (this.position.x + this.size >= this.gameWidth) {
            this.scorePlayer++;
            this.speed = this.speedStart;
            this.velocity_Y = 0;
            this.velocity_X = this.speed;
            this.position.x = this.gameWidth / 2 + this.size/2;
            this.position.y = this.gameHeight / 2 + this.size /2;
        }
    }// end Update

}// end class