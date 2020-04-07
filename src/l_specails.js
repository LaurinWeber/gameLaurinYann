export default class L_specials {

    constructor(game) {

        this.image = document.getElementById("img_bigger_red");

        // get game boundaries
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;

        //define span object size
        this.size = 30 *2;

        this.counter = 0;
        this.hide = 0;
        this.drawer = false;
        this.spanHit = false;

                this.sizes = {
                    1: 50,
                    2: 40,
                    3: 30,
                    4: 20,
                    5: 10
                };
        //total of 9 different positions
        this.spanPos = {x: 1 * this.gameWidth / 4, y: 1 * this.gameHeight / 4}; // first position in top left corner, (x*2, y*2) -> center.
        this.position = {x: 20, y: 20};

    }

    // after update
    draw(context) {
        if (this.drawer) {
            context.drawImage(this.image,this.position.x,this.position.y,this.size,this.size);
            context.font = "bold 24px Arial";

            /*
            context.fillStyle = "#ffffff"
            context.fillRect(this.position.x, this.position.y, this.size, this.size);
             */
        }
    }

    //before draw
    update() {

        if (this.counter == 120 || this.spanHit) {
            this.rand_X = (Math.floor(Math.random() * 3) + 1); //get random number between 1 -3
            this.rand_Y = (Math.floor(Math.random() * 3) + 1); //get random number between 1 -3

            if(this.rand_X != 2){ // except center
                this.position.x = (this.rand_X * this.spanPos.x) - this.size / 2;
                this.position.y = (this.rand_Y * this.spanPos.y) - this.size / 2;
                this.counter = 0;
                this.drawer = true;
            }


        } else {
            //check if span was hit by the ball, if so change ball size
            if (this.game.ball.position.x > this.position.x &&
                this.game.ball.position.x < this.position.x + this.size/2) {
                if(this.game.ball.position.y > this.position.y &&
                    this.game.ball.position.y < this.position.y + this.size/2){
                    this.game.ball.size = (this.sizes[(Math.floor(Math.random() * 5) + 1)]);
                    this.spanHit = true
                }
            }

            this.spanHit = false;
            this.counter++;
            this.hide++;
        }
    }
}