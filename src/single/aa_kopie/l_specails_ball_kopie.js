export default class L_specials_ball {

    constructor(game) {

        this.img_resize = document.getElementById("img_resize");
        this.img_bunny = document.getElementById("img_bunny");
        this.img_turtle = document.getElementById("img_turtle");

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
        this.posY = [1, 2, 3, 4, 5, 6, 7, 8]; // amount of rows can be adjusted as ..100
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
        if (this.drawerBallResize) {
            context.drawImage(this.img_resize, this.position.x, this.position.y, this.size, this.size);
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
        if (this.counter === this.time) {
            this.index = Math.floor(Math.random() * 3) + 1;
        }
        switch (this.index) {
            case 1:
                this.ballResize();
                break;
            case 2:
                this.ballSpeed(+1);
                break;
            case 3:
                this.ballSpeed(-1);
                break;
            default:
                break;
        }

        this.counter++;
    }

    ballResize() {
        this.drawerBallFaster = false;
        this.drawerBallSlower = false;
        if (this.counter === this.time) {
            this.rand_X = (Math.floor(Math.random() * this.posX.length)); //get random number between 1 -2
            this.rand_Y = (Math.floor(Math.random() * this.posY.length)); //get random number between 1 -3

            this.position.x = (this.posX[this.rand_X] * this.spanPos.x) - this.size / 2;
            this.position.y = (this.posY[this.rand_Y] * this.spanPos.y) - this.size / 2;

            this.counter = 0;
            this.drawerBallResize = true;

        } else {
            //check if span was hit by the ball, if so change ball size
            if (this.game.ball.position.x >= this.position.x &&
                this.game.ball.position.x <= this.position.x + this.size / 2) {
                if (this.game.ball.position.y >= this.position.y &&
                    this.game.ball.position.y <= this.position.y + this.size / 2) {
                    //change position of span
                    this.position.x = -100;
                    this.position.y = -100;
                    this.game.ball.size = (this.sizes[(Math.floor(Math.random() * 5) + 1)]);
                }
            }

        }
    }

    ballSpeed(speed) {
        this.drawerBallResize = false;

        if (this.counter === this.time) {
            this.rand_Xsp = (Math.floor(Math.random() * this.posX.length)); //get random number between 1 -2
            this.rand_Ysp = (Math.floor(Math.random() * this.posY.length)); //get random number between 1 -3

            this.position.x = (this.posX[this.rand_Xsp] * this.spanPos.x) - this.size / 2;
            this.position.y = (this.posY[this.rand_Ysp] * this.spanPos.y) - this.size / 2;

            this.counter = 0;
            if (speed > 0) {
                this.drawerBallFaster = true;
                this.drawerBallSlower = false;
            } else {
                this.drawerBallFaster = false;
                this.drawerBallSlower = true;

            }

        } else {
            //check if span was hit by the ball, if so change ball size
            if (this.game.ball.position.x >= this.position.x &&
                this.game.ball.position.x <= this.position.x + this.size / 2) {
                if (this.game.ball.position.y >= this.position.y &&
                    this.game.ball.position.y <= this.position.y + this.size / 2) {
                    //change position of span
                    this.position.x = -100;
                    this.position.y = -100;
                    if(speed > 0){
                        this.game.ball.speed = this.game.ball.speed + speed;
                    }
                    else{
                        this.game.ball.speed = this.game.ball.speedStart;
                    }
                }
            }
        }
    }
}