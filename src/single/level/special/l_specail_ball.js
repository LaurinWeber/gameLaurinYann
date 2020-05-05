export default class L_special_ball {

    constructor(game) {
        this.img_plus = document.getElementById("img_plus");
        this.img_minus = document.getElementById("img_minus");
        this.img_bunny = document.getElementById("img_bunny");
        this.img_turtle = document.getElementById("img_turtle");

        // get game boundaries
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;

        //define span object size
        this.size = 80;
        this.counter = 0;
        this.sizes = [10, 20, 30, 40, 50];

        this.posX = [2, 6]; //except center (amount of columns)
        this.posY = [1, 2, 3, 4, 5, 6, 7, 8]; // amount of rows can be adjusted as ..100
        this.time = 300; //can be adjusted = "time" that the special effect stays on screen

        //total of 9 different positions
        this.spanPos = {
            x: 1 * this.gameWidth / 8,//(this.posX.length + 2),
            y: 1 * this.gameHeight / (this.posY.length + 1)
        }; // first position in top left corner, (x*2, y*2) -> center.
        this.position = {x: 20, y: 20};
    }

    // after update
    draw(context) {

        if (this.drawerBallSmaller) {
            context.drawImage(this.img_minus, this.position.x, this.position.y, this.size, this.size);
            context.font = "bold 24px Arial";
        }
        if (this.drawerBallBigger) {
            context.drawImage(this.img_plus, this.position.x, this.position.y, this.size, this.size);
            context.font = "bold 24px Arial";
        }
        if (this.drawerBallFaster) {
            context.drawImage(this.img_bunny, this.position.x, this.position.y, this.size, this.size);
            context.font = "bold 24px Arial";
        }
        if (this.drawerBallSlower) {
            context.drawImage(this.img_turtle, this.position.x, this.position.y, this.size, this.size);
            context.font = "bold 24px Arial";
        }

    }

    //before draw
    update() {
        //reset
        this.drawerBallSmaller = false;
        this.drawerBallBigger = false;
        this.drawerBallSlower = false;
        this.drawerBallFaster = false;

        if (this.counter === this.time) {
            // chose new icon to appear
            this.index = Math.floor(Math.random() * 4) + 1;
            // when ball already biggest size -> cannot get bigger
            if (this.game.ball.size === this.sizes[4] && this.index === 2) {
                this.index = 1;
            }
            // when ball already smallest size -> cannot get smaller
            if (this.game.ball.size === this.sizes[0] && this.index === 1) {
                this.index = 2;
            }
            //when ball min. speed -> cannot get slower..
            if (this.game.ball.speed === this.game.ball.speedStart && this.index == 3) {
                this.index = 4;
            }
        }
        switch (this.index) {
            case 1:
                this.ballSmaller();
                this.drawerBallSmaller = true;
                break;
            case 2:
                this.ballBigger();
                this.drawerBallBigger = true;
                break;
            case 3:
                this.ballSlower();
                this.drawerBallSlower = true;
                break;
            case 4:
                this.ballFaster();
                this.drawerBallFaster = true;
                break;
            default:
                break;
        }
        this.counter++;
    }

    positionIcon() {
        this.rand_X = (Math.floor(Math.random() * this.posX.length)); //get random number between 1 -2
        this.rand_Y = (Math.floor(Math.random() * this.posY.length)); //get random number between 1 -3

        this.position.x = (this.posX[this.rand_X] * this.spanPos.x) - this.size / 2;
        this.position.y = (this.posY[this.rand_Y] * this.spanPos.y) - this.size / 2;

        this.counter = 0;
    }

    hit() {
        //check if span was hit by the ball, if so change ball size
        if (this.game.ball.position.x >= this.position.x &&
            this.game.ball.position.x <= this.position.x + this.size) {
            if (this.game.ball.position.y >= this.position.y &&
                this.game.ball.position.y <= this.position.y + this.size) {
                return true;
            }
        }
    }

    resetPos() {
        //change position of span -> after hit
        this.position.x = -100;
        this.position.y = -100;
    }

    ballSmaller() {
        if (this.counter === this.time) {
            this.positionIcon();
        } else if (this.hit()) {
            this.resetPos();
            for (var i = 0; i < this.sizes.length; i++) {
                if (this.game.ball.size == this.sizes[i]) {
                    this.game.ball.size = this.sizes[i - 1];
                    return;
                }
            }
        }
    }

    ballBigger() {
        if (this.counter === this.time) {
            this.positionIcon();
        } else if (this.hit()) {
            //change position of span
            this.resetPos();
            for (var i = 0; i < this.sizes.length; i++) {
                if (this.game.ball.size == this.sizes[i]) {
                    this.game.ball.size = this.sizes[i + 1];
                    return;
                }
            }
        }
    }

    ballSlower() {
        if (this.counter === this.time) {
            this.positionIcon();
        } else if (this.hit()) {
            this.resetPos();
            this.game.ball.speed = this.game.ball.speedStart;
        }
    }


    ballFaster() {
        if (this.counter === this.time) {
            this.positionIcon();
        } else if (this.hit()) {
            this.resetPos();
            if (!(this.game.ball.speed == this.game.ball.speedMax || this.game.ball.speed >= this.game.ball.speedMax))
                this.game.ball.speed = this.game.ball.speed + 8; //increase speed
        }
    }
}