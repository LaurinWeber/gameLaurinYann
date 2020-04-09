export default class L_special_paddle {

    constructor(game) {

        this.img_paddle_smaller = document.getElementById("img_smaller_paddle");
        this.img_paddle_bigger = document.getElementById("img_bigger_paddle");
        this.img_paddle_faster = document.getElementById("img_faster_paddle");
        this.img_paddle_slower = document.getElementById("img_slower_paddle");

        // get game boundaries
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;

        //define span object size
        this.size = 80;
        this.counter = 0;
        this.index = 1;
        this.sizes = {
            1: 50,
            2: 40,
            3: 30,
            4: 20,
            5: 10
        };
        this.posX = [1, 3]; //except center (amount of columns)
        this.posY = [1, 2, 3]; // amount of rows can be adjusted as ..100
        this.time = 150; //can be adjusted = "time" that the special effect stays on screen

        //total of 9 different positions
        this.spanPos = {
            x: 1 * this.gameWidth / (this.posX.length + 2),
            y: 1 * this.gameHeight / (this.posY.length + 1)
        }; // first position in top left corner, (x*2, y*2) -> center.
        this.position = {x: 20, y: 20};
    }

    // after update
    draw(context) {
        if (this.drawerPaddleSmaller) {
            context.drawImage(this.img_paddle_smaller, this.position.x, this.position.y, this.size, this.size);
            context.font = "bold 24px Arial";
        }
        if (this.drawerPaddleBigger) {
            context.drawImage(this.img_paddle_bigger, this.position.x, this.position.y, this.size, this.size);
            context.font = "bold 24px Arial";
        }
        if (this.drawerPaddleFaster) {
            context.drawImage(this.img_paddle_faster, this.position.x, this.position.y, this.size, this.size);
            context.font = "bold 24px Arial";
        }
        if (this.drawerPaddleSlower) {
            context.drawImage(this.img_paddle_slower, this.position.x, this.position.y, this.size, this.size);
            context.font = "bold 24px Arial";
        }

    }

    //before draw
    update() {
        if (this.counter === this.time) {
            this.index = Math.floor(Math.random() * 4) + 1; //problem as you took factor *3 -> out of bounce so default was called that did nothing, and also the color of the arrows were black
        }

        switch (this.index) {
            case 1:
                this.paddleSmaller();
                break;
            case 2:
                this.paddleBigger();
                break;
            case 3:
                this.paddleFaster();
                break;
            case 4:
                this.paddleSlower();
                break;
            default:
                break;
        }

        this.counter++;
    }

    paddleSmaller() {
        this.drawerPaddleBigger = false;
        if (this.counter === this.time) {
            this.rand_X = (Math.floor(Math.random() * this.posX.length)); //get random number between 1 -2
            this.rand_Y = (Math.floor(Math.random() * this.posY.length)); //get random number between 1 -3

            this.position.x = (this.posX[this.rand_X] * this.spanPos.x) - this.size / 2;
            this.position.y = (this.posY[this.rand_Y] * this.spanPos.y) - this.size / 2;

            this.counter = 0;
            this.drawerPaddleSmaller = true;

        } else {
            console.log("Position " +this.game.ball.position.x);
            //check if span was hit by the ball, if so change paddle size
            if (this.game.ball.position.x >= this.position.x &&
                this.game.ball.position.x <= this.position.x + this.size) {
                if (this.game.ball.position.y >= this.position.y &&
                    this.game.ball.position.y <= this.position.y + this.size) {
                    //change position of span
                    this.position.x = -100;
                    this.position.y = -100;
                    //Change paddle size smaller
                    if (this.game.ball.velocity_X > 0) { //Ball moving to right
                        this.game.paddle2.height = 100; //Make paddle2 smaller
                    }
                    else if(this.game.ball.velocity_X < 0){ //Ball moving to left
                        this.game.paddle.height = 100; //Make paddle1 smaller
                    }
                }
            }
        }
    }

    paddleBigger() {
        this.drawerPaddleSmaller = false;
        if (this.counter === this.time) {
            this.rand_X = (Math.floor(Math.random() * this.posX.length)); //get random number between 1 -2
            this.rand_Y = (Math.floor(Math.random() * this.posY.length)); //get random number between 1 -3

            this.position.x = (this.posX[this.rand_X] * this.spanPos.x) - this.size / 2;
            this.position.y = (this.posY[this.rand_Y] * this.spanPos.y) - this.size / 2;

            this.counter = 0;
            this.drawerPaddleBigger = true;

        } else {
            //check if span was hit by the ball, if so change paddle size
            if (this.game.ball.position.x >= this.position.x &&
                this.game.ball.position.x <= this.position.x + this.size) {
                if (this.game.ball.position.y >= this.position.y &&
                    this.game.ball.position.y <= this.position.y + this.size) {
                    //change position of span
                    this.position.x = -100;
                    this.position.y = -100;
                    if (this.game.ball.velocity_X > 0) {//Ball moving to right
                        this.game.paddle.height = 200; //Make paddle1 bigger
                    }
                    else if(this.game.ball.velocity_X < 0){//Ball moving to left
                        this.game.paddle2.height = 200; //Make paddle2 bigger
                    }
                }
            }

        }
    }

    paddleFaster() {
        this.drawerPaddleSmaller = false;
        this.drawerPaddleBigger = false;
        this.drawerPaddleSlower = false;
        if (this.counter === this.time) {
            this.rand_X = (Math.floor(Math.random() * this.posX.length)); //get random number between 1 -2
            this.rand_Y = (Math.floor(Math.random() * this.posY.length)); //get random number between 1 -3

            this.position.x = (this.posX[this.rand_X] * this.spanPos.x) - this.size / 2;
            this.position.y = (this.posY[this.rand_Y] * this.spanPos.y) - this.size / 2;

            this.counter = 0;
            this.drawerPaddleFaster = true;

        } else {
            //check if span was hit by the ball, if so change paddle size
            if (this.game.ball.position.x >= this.position.x &&
                this.game.ball.position.x <= this.position.x + this.size) {
                if (this.game.ball.position.y >= this.position.y &&
                    this.game.ball.position.y <= this.position.y + this.size) {
                    //change position of span
                    this.position.x = -100;
                    this.position.y = -100;
                    if (this.game.ball.velocity_X > 0) {//Ball moving to right
                        this.game.paddle.maxSpeed = 10; //Make paddle1 faster
                    }
                    else if(this.game.ball.velocity_X < 0){//Ball moving to left
                        this.game.paddle2.maxSpeed = 10; //Make paddle2 faster
                    }
                }
            }

        }
    }

    paddleSlower() {
        this.drawerPaddleSmaller = false;
        this.drawerPaddleBigger = false;
        this.drawerPaddleFaster= false;
        if (this.counter === this.time) {
            this.rand_X = (Math.floor(Math.random() * this.posX.length)); //get random number between 1 -2
            this.rand_Y = (Math.floor(Math.random() * this.posY.length)); //get random number between 1 -3

            this.position.x = (this.posX[this.rand_X] * this.spanPos.x) - this.size / 2;
            this.position.y = (this.posY[this.rand_Y] * this.spanPos.y) - this.size / 2;

            this.counter = 0;
            this.drawerPaddleSlower = true;

        } else {
            //check if span was hit by the ball, if so change paddle size
            if (this.game.ball.position.x >= this.position.x &&
                this.game.ball.position.x <= this.position.x + this.size) {
                if (this.game.ball.position.y >= this.position.y &&
                    this.game.ball.position.y <= this.position.y + this.size) {
                    //change position of span
                    this.position.x = -100;
                    this.position.y = -100;
                    if (this.game.ball.velocity_X > 0) {//Ball moving to right
                        this.game.paddle2.maxSpeed = 3; //Make paddle1 slower
                    }
                    else if(this.game.ball.velocity_X < 0){//Ball moving to left
                        this.game.paddle.maxSpeed= 3; //Make paddle2 slower
                    }
                }
            }

        }
    }


}