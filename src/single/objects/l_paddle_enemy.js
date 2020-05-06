const PLAYERMODE = {
    MULTI: 0,
    SINGLE: 1,
    LEADER: 2
};

export default class L_paddle_enemy {

    constructor(game) {

        this.game = game;
        // get game boundaries
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        //define Paddle size
        this.width = 30;
        this.height = 150;

        //define paddle speed
        this.maxSpeed = 7; //in game
        this.speed = 0; //at pause, start

        //define start position
        this.position = {
            x: this.gameWidth - 50 - this.width,
            y: game.gameHeight / 2 - this.height / 2
        };

    }

    moveUp() {
        this.speed = -this.maxSpeed;
    }

    moveDown() {
        this.speed = this.maxSpeed;
    }

    stop() {
        this.speed = 0;
    }

    draw(context) {
        context.fillStyle = "#ffffff"
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.y += this.speed;

        //define boundary Bottom
        if (this.position.y > this.gameHeight - this.height) {
            this.position.y = this.gameHeight - this.height;
        }

        //define boundary Top
        if (this.position.y < 1) {
            this.position.y = 1;
        }
        if (true){
            console.log("Stop");
            this.speed = 0; // set this so after one update keydown is being nutralised.. stop movement!
        }

    }
}